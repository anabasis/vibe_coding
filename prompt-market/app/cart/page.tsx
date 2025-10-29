"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, clearCart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "로그인이 필요합니다",
        description: "결제하려면 로그인해주세요.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    // Mock checkout - in production, this would integrate with TossPayments
    toast({
      title: "결제가 완료되었습니다",
      description: "구매 내역에서 확인하실 수 있습니다.",
    });

    // Save purchases to localStorage
    const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
    const newPurchases = items.map((item) => ({
      id: `purchase-${Date.now()}-${item.prompt_id}`,
      created_at: new Date().toISOString(),
      buyer_id: "1", // Mock user ID
      prompt_id: item.prompt_id,
      payment_order_id: `order-${Date.now()}-${item.prompt_id}`,
      prompt: item.prompt,
    }));
    localStorage.setItem(
      "purchases",
      JSON.stringify([...purchases, ...newPurchases])
    );

    clearCart();
    router.push("/purchases");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-bold mb-4">
                장바구니가 비어있습니다
              </h2>
              <p className="text-muted-foreground mb-6">
                마음에 드는 프롬프트를 장바구니에 담아보세요
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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center">장바구니</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.prompt?.image_urls?.[0] || "/placeholder.svg"}
                        alt={item.prompt?.title || "프롬프트"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 line-clamp-1">
                        {item.prompt?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {item.prompt?.description}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {(item.prompt?.price || 0).toLocaleString()}원
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.prompt_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">주문 요약</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      총 {items.length}개의 상품
                    </span>
                    <span>{items.length}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">상품 금액</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold">총 주문금액</span>
                  <span className="text-2xl font-bold text-primary">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  결제하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
