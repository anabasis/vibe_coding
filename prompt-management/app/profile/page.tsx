"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { toast } = useToast();
  const [nickname, setNickname] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (user) {
      setNickname(user.nickname);
    }
  }, [isAuthenticated, user, router]);

  const handleSave = () => {
    if (nickname.trim()) {
      updateProfile(nickname);
      setIsEditing(false);
      toast({
        title: "프로필이 저장되었습니다",
        description: "변경사항이 저장되었습니다.",
      });
    }
  };

  const handleImageUpload = () => {
    // Mock image upload - in production, this would upload to Supabase Storage
    toast({
      title: "이미지 업로드",
      description: "프로필 이미지 업로드 기능은 준비 중입니다.",
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">프로필 관리</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>프로필 정보</CardTitle>
            <CardDescription>회원님의 프로필 정보를 관리하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.avatar_url || "/placeholder.svg"}
                  alt={user.nickname}
                />
                <AvatarFallback className="text-2xl">
                  {user.nickname[0]}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={handleImageUpload}>
                프로필 이미지 변경
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" value="user@example.com" disabled />
              <p className="text-xs text-muted-foreground">
                이메일은 수정할 수 없습니다
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">닉네임</Label>
              <div className="flex gap-2">
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  disabled={!isEditing}
                />
                {isEditing ? (
                  <>
                    <Button onClick={handleSave}>저장</Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setNickname(user.nickname);
                      }}
                    >
                      취소
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>수정하기</Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>정보 수정일</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(user.updated_at).toLocaleDateString("ko-KR")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
