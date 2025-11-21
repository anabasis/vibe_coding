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
  Play,
  Square,
  RefreshCw,
  Server,
  Activity,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import type { MCPServer } from "@/lib/types";

// Mock data - 실제로는 API에서 가져옴
const mockMCPServers: MCPServer[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Context7 MCP Server",
    description: "Context7 기반 MCP 서버",
    endpoint: "http://localhost:3001/mcp",
    status: "active",
    last_health_check: new Date().toISOString(),
    config: {},
  },
  {
    id: "2",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Sequential Thinking MCP",
    description: "Sequential Thinking 기반 MCP 서버",
    endpoint: "http://localhost:3002/mcp",
    status: "inactive",
    last_health_check: new Date().toISOString(),
    config: {},
  },
];

export default function AdminMCPPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [servers, setServers] = useState<MCPServer[]>(mockMCPServers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<MCPServer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    endpoint: "",
    config: "{}",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleOpenDialog = (server?: MCPServer) => {
    if (server) {
      setEditingServer(server);
      setFormData({
        name: server.name,
        description: server.description || "",
        endpoint: server.endpoint,
        config: JSON.stringify(server.config || {}, null, 2),
      });
    } else {
      setEditingServer(null);
      setFormData({
        name: "",
        description: "",
        endpoint: "",
        config: "{}",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingServer(null);
    setFormData({
      name: "",
      description: "",
      endpoint: "",
      config: "{}",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = JSON.parse(formData.config);
      if (editingServer) {
        // Update existing server
        setServers(
          servers.map((s) =>
            s.id === editingServer.id
              ? {
                  ...s,
                  name: formData.name,
                  description: formData.description,
                  endpoint: formData.endpoint,
                  config,
                  updated_at: new Date().toISOString(),
                }
              : s
          )
        );
        toast({
          title: "서버가 업데이트되었습니다",
          description: `${formData.name} 서버 정보가 수정되었습니다.`,
        });
      } else {
        // Create new server
        const newServer: MCPServer = {
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          name: formData.name,
          description: formData.description,
          endpoint: formData.endpoint,
          status: "inactive",
          config,
        };
        setServers([...servers, newServer]);
        toast({
          title: "서버가 추가되었습니다",
          description: `${formData.name} 서버가 등록되었습니다.`,
        });
      }
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "오류",
        description: "설정 JSON이 올바르지 않습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (serverId: string) => {
    if (confirm("정말 이 서버를 삭제하시겠습니까?")) {
      setServers(servers.filter((s) => s.id !== serverId));
      toast({
        title: "서버가 삭제되었습니다",
        description: "MCP 서버가 목록에서 제거되었습니다.",
      });
    }
  };

  const handleStatusChange = (serverId: string, newStatus: MCPServer["status"]) => {
    setServers(
      servers.map((s) =>
        s.id === serverId
          ? {
              ...s,
              status: newStatus,
              last_health_check: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          : s
      )
    );
    toast({
      title: "서버 상태가 변경되었습니다",
      description: `서버 상태가 ${newStatus === "active" ? "활성화" : "비활성화"}되었습니다.`,
    });
  };

  const handleHealthCheck = (serverId: string) => {
    // 실제로는 API 호출로 건강 체크 수행
    setServers(
      servers.map((s) =>
        s.id === serverId
          ? {
              ...s,
              last_health_check: new Date().toISOString(),
              status: s.status === "active" ? "active" : "active",
            }
          : s
      )
    );
    toast({
      title: "건강 체크 완료",
      description: "서버 상태를 확인했습니다.",
    });
  };

  const getStatusBadge = (status: MCPServer["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">활성</Badge>;
      case "inactive":
        return <Badge variant="secondary">비활성</Badge>;
      case "error":
        return <Badge variant="destructive">오류</Badge>;
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">MCP 서버 관리</h1>
            <p className="text-muted-foreground">
              Model Context Protocol 서버를 등록하고 관리합니다
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                서버 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingServer ? "서버 수정" : "새 서버 추가"}
                </DialogTitle>
                <DialogDescription>
                  MCP 서버 정보를 입력하세요
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">서버 이름</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="예: Context7 MCP Server"
                  />
                </div>
                <div>
                  <Label htmlFor="description">설명</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="서버에 대한 설명을 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="endpoint">엔드포인트 URL</Label>
                  <Input
                    id="endpoint"
                    type="url"
                    value={formData.endpoint}
                    onChange={(e) =>
                      setFormData({ ...formData, endpoint: e.target.value })
                    }
                    required
                    placeholder="http://localhost:3001/mcp"
                  />
                </div>
                <div>
                  <Label htmlFor="config">설정 (JSON)</Label>
                  <Textarea
                    id="config"
                    value={formData.config}
                    onChange={(e) =>
                      setFormData({ ...formData, config: e.target.value })
                    }
                    className="font-mono text-sm"
                    rows={6}
                    placeholder='{"key": "value"}'
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                  >
                    취소
                  </Button>
                  <Button type="submit">
                    {editingServer ? "수정" : "추가"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 서버</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{servers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">활성 서버</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {servers.filter((s) => s.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">비활성 서버</CardTitle>
              <Square className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {servers.filter((s) => s.status === "inactive").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">오류 서버</CardTitle>
              <Activity className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {servers.filter((s) => s.status === "error").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Servers Table */}
        <Card>
          <CardHeader>
            <CardTitle>서버 목록</CardTitle>
            <CardDescription>
              등록된 MCP 서버 목록입니다. 서버를 클릭하여 상세 정보를 확인하거나
              수정할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>엔드포인트</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>마지막 체크</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      등록된 서버가 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  servers.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{server.name}</div>
                          {server.description && (
                            <div className="text-sm text-muted-foreground">
                              {server.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {server.endpoint}
                        </code>
                      </TableCell>
                      <TableCell>{getStatusBadge(server.status)}</TableCell>
                      <TableCell>
                        {server.last_health_check
                          ? new Date(server.last_health_check).toLocaleString()
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleHealthCheck(server.id)}
                            title="건강 체크"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          {server.status === "active" ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleStatusChange(server.id, "inactive")
                              }
                              title="비활성화"
                            >
                              <Square className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleStatusChange(server.id, "active")
                              }
                              title="활성화"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(server)}
                            title="수정"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(server.id)}
                            title="삭제"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}








