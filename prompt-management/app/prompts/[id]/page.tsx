"use client";

import { use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Copy, Check } from "lucide-react";
import { mockPrompts } from "@/lib/mock-data";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const prompt = mockPrompts.find((p) => p.id === id);

  if (!prompt) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">프롬프트를 찾을 수 없습니다</h1>
        <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
      </div>
    );
  }

  // Mock purchased status - in real app, this would check purchases table
  const isPurchased = false;

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "로그인이 필요합니다",
        description: "구매하려면 로그인해주세요.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    // TODO: Implement direct purchase flow
    toast({
      title: "구매 기능 준비 중",
      description: "곧 제공될 예정입니다.",
    });
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt_text);
      setCopied(true);
      toast({
        title: "복사되었습니다",
        description: "프롬프트가 클립보드에 복사되었습니다.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "프롬프트 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={prompt.image_urls?.[0] || "/placeholder.svg"}
                alt={prompt.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Additional Images Gallery */}
            {prompt.image_urls.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {prompt.image_urls.slice(1).map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={imageUrl}
                      alt={`${prompt.title} 예시 ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{prompt.title}</h1>
              <p className="text-muted-foreground">
                생성일: {new Date(prompt.created_at).toLocaleDateString()}
              </p>
            </div>

            <Separator className="my-4" />

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">설명</h2>
              <p className="text-muted-foreground leading-relaxed">
                {prompt.description}
              </p>
            </div>

            <Separator className="my-4" />

            {/* Prompt Content Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">프롬프트 내용</h2>
              {isPurchased ? (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-green-600">
                        구매 완료
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyPrompt}
                        className="flex items-center gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            복사됨
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            복사
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {prompt.prompt_text}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-4">
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <p className="text-muted-foreground">
                        구매 후 내용을 확인하실 수 있습니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <Separator className="my-4" />

            {!isPurchased && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <Button onClick={handleBuyNow} className="w-full">
                    바로 구매하기
                  </Button>
                </CardContent>
              </Card>
            )}

            <Button variant="ghost" className="w-full">
              <Heart className="mr-2 h-4 w-4" />
              찜하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
