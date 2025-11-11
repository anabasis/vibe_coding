"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Copy, Check } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import type { Purchase } from "@/lib/types";

export default function PurchasesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Load purchases from localStorage
    const savedPurchases = localStorage.getItem("purchases");
    if (savedPurchases) {
      setPurchases(JSON.parse(savedPurchases));
    }
  }, [isAuthenticated, router]);

  const handleCopyPrompt = async (promptText: string, purchaseId: string) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedItems((prev) => new Set(prev).add(purchaseId));
      toast({
        title: "복사되었습니다",
        description: "프롬프트가 클립보드에 복사되었습니다.",
      });
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(purchaseId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "프롬프트 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  if (purchases.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-bold mb-4">구매 내역이 없습니다</h2>
              <p className="text-muted-foreground mb-6">
                프롬프트를 구매하고 여기서 확인하세요
              </p>
              <Button onClick={() => router.push("/")}>
                프롬프트 둘러보기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">구매 내역</h1>

        <div className="space-y-4">
          {purchases.map((purchase) => (
            <Card key={purchase.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={
                        purchase.prompt?.image_urls?.[0] || "/placeholder.svg"
                      }
                      alt={purchase.prompt?.title || "프롬프트"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold mb-1">
                          {purchase.prompt?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          구매일:{" "}
                          {new Date(purchase.created_at).toLocaleDateString(
                            "ko-KR"
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          주문번호: {purchase.payment_order_id}
                        </p>
                      </div>
                      <Badge variant="default">구매 완료</Badge>
                    </div>
                    <p className="text-lg font-bold text-primary mb-3">
                      {(purchase.prompt?.price || 0).toLocaleString()}원
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleCopyPrompt(
                            purchase.prompt?.prompt_text || "",
                            purchase.id
                          )
                        }
                      >
                        {copiedItems.has(purchase.id) ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            복사됨
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            프롬프트 복사
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(`/prompts/${purchase.prompt_id}`)
                        }
                      >
                        <Download className="mr-2 h-4 w-4" />
                        상세보기
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
