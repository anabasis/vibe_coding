"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  BarChart3,
  Users,
  DollarSign,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { mockPrompts } from "@/lib/mock-data";
import type { Prompt } from "@/lib/types";

export default function AdminPromptsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    prompt_text: "",
    tags: "",
    image_urls: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // 실제로는 관리자 권한 체크 필요
    setPrompts(mockPrompts);
  }, [isAuthenticated, router]);

  const handleCreatePrompt = () => {
    const newPrompt: Prompt = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      title: formData.title,
      description: formData.description,
      price: formData.price,
      prompt_text: formData.prompt_text,
      image_urls: formData.image_urls
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      rating: 0,
      review_count: 0,
      download_count: 0,
      view_count: 0,
      is_published: true,
    };

    setPrompts([newPrompt, ...prompts]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast({
      title: "프롬프트 생성 완료",
      description: "새로운 프롬프트가 성공적으로 생성되었습니다.",
    });
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setFormData({
      title: prompt.title,
      description: prompt.description,
      price: prompt.price,
      prompt_text: prompt.prompt_text,
      tags: prompt.tags.join(", "),
      image_urls: prompt.image_urls.join(", "),
    });
  };

  const handleUpdatePrompt = () => {
    if (!editingPrompt) return;

    const updatedPrompts = prompts.map((p) =>
      p.id === editingPrompt.id
        ? {
            ...p,
            title: formData.title,
            description: formData.description,
            price: formData.price,
            prompt_text: formData.prompt_text,
            image_urls: formData.image_urls
              .split(",")
              .map((url) => url.trim())
              .filter(Boolean),
            tags: formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          }
        : p
    );

    setPrompts(updatedPrompts);
    setEditingPrompt(null);
    resetForm();
    toast({
      title: "프롬프트 수정 완료",
      description: "프롬프트가 성공적으로 수정되었습니다.",
    });
  };

  const handleDeletePrompt = (promptId: string) => {
    setPrompts(prompts.filter((p) => p.id !== promptId));
    toast({
      title: "프롬프트 삭제 완료",
      description: "프롬프트가 성공적으로 삭제되었습니다.",
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      prompt_text: "",
      tags: "",
      image_urls: "",
    });
  };

  const totalRevenue = prompts.reduce(
    (sum, prompt) => sum + (prompt.price || 0) * (prompt.download_count || 0),
    0
  );
  const totalDownloads = prompts.reduce(
    (sum, prompt) => sum + (prompt.download_count || 0),
    0
  );
  const totalViews = prompts.reduce(
    (sum, prompt) => sum + (prompt.view_count || 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">프롬프트 관리</h1>
          <p className="text-muted-foreground">
            프롬프트를 등록, 수정, 삭제하고 판매 현황을 확인하세요
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 프롬프트</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{prompts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 다운로드</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDownloads}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 조회수</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 매출</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRevenue.toLocaleString()}원
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />새 프롬프트 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>새 프롬프트 추가</DialogTitle>
                <DialogDescription>
                  새로운 프롬프트를 등록하세요
                </DialogDescription>
              </DialogHeader>
              <PromptForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreatePrompt}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Prompts Table */}
        <Card>
          <CardHeader>
            <CardTitle>프롬프트 목록</CardTitle>
            <CardDescription>등록된 모든 프롬프트를 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>제목</TableHead>
                  <TableHead>가격</TableHead>
                  <TableHead>태그</TableHead>
                  <TableHead>다운로드</TableHead>
                  <TableHead>조회수</TableHead>
                  <TableHead>평점</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prompts.map((prompt) => (
                  <TableRow key={prompt.id}>
                    <TableCell className="font-medium">
                      {prompt.title}
                    </TableCell>
                    <TableCell>
                      {(prompt.price || 0).toLocaleString()}원
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {prompt.tags?.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {prompt.tags && prompt.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{prompt.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{prompt.download_count || 0}</TableCell>
                    <TableCell>{prompt.view_count || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{(prompt.rating || 0).toFixed(1)}</span>
                        <span className="text-muted-foreground">
                          ({prompt.review_count || 0})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={prompt.is_published ? "default" : "secondary"}
                      >
                        {prompt.is_published ? "공개" : "비공개"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditPrompt(prompt)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/prompts/${prompt.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePrompt(prompt.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog
          open={!!editingPrompt}
          onOpenChange={() => setEditingPrompt(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>프롬프트 수정</DialogTitle>
              <DialogDescription>프롬프트 정보를 수정하세요</DialogDescription>
            </DialogHeader>
            <PromptForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleUpdatePrompt}
              onCancel={() => setEditingPrompt(null)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function PromptForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
}: {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="프롬프트 제목"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">가격 (원)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
            }
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">설명</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="프롬프트 설명"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="prompt_text">프롬프트 내용</Label>
        <Textarea
          id="prompt_text"
          value={formData.prompt_text}
          onChange={(e) =>
            setFormData({ ...formData, prompt_text: e.target.value })
          }
          placeholder="실제 프롬프트 내용"
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="마케팅, 콘텐츠, 이미지생성"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_urls">이미지 URL (쉼표로 구분)</Label>
        <Input
          id="image_urls"
          value={formData.image_urls}
          onChange={(e) =>
            setFormData({ ...formData, image_urls: e.target.value })
          }
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button onClick={onSubmit}>수정</Button>
      </div>
    </div>
  );
}
