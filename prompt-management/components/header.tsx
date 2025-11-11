"use client";

import Link from "next/link";
import { useState } from "react";
import { User, LogOut, Menu, X, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center px-4">
        {/* Left side - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-28 items-center justify-center rounded-lg bg-primary">
            <span className="text-2xl font-bold text-primary-foreground">
              OSSLAB
            </span>
          </div>
          <span className="text-2xl font-bold">Prompt Discovery</span>
        </Link>

        {/* Center - Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 mx-auto">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            홈
          </Link>
          <Link
            href="/prompts"
            className="text-sm font-medium hover:text-primary"
          >
            프롬프트
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto mr-2"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Right side - Auth */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.avatar_url || "/placeholder.svg"}
                      alt={user.nickname}
                    />
                    <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar_url || "/placeholder.svg"}
                      alt={user.nickname}
                    />
                    <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{user.nickname}</p>
                    <p className="text-xs text-muted-foreground">
                      프롬프트마스터
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    프로필 관리
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/purchase-history" className="cursor-pointer">
                    구매 내역
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/prompts" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    프롬프트 관리
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/mcp" className="cursor-pointer">
                    <Server className="mr-2 h-4 w-4" />
                    MCP 서버 관리
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button>로그인</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="px-4 py-4 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-sm font-medium hover:text-primary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                홈
              </Link>
              <Link
                href="/prompts"
                className="block text-sm font-medium hover:text-primary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                프롬프트
              </Link>
            </div>

            <div className="border-t pt-4">
              {/* Auth Section */}
              {isAuthenticated && user ? (
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 py-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={user.avatar_url || "/placeholder.svg"}
                        alt={user.nickname}
                      />
                      <AvatarFallback className="text-xs">
                        {user.nickname[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.nickname}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="block text-sm hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    프로필 관리
                  </Link>
                  <Link
                    href="/purchase-history"
                    className="block text-sm hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    구매 내역
                  </Link>
                  <Link
                    href="/admin/prompts"
                    className="block text-sm hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    프롬프트 관리
                  </Link>
                  <Link
                    href="/admin/mcp"
                    className="block text-sm hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    MCP 서버 관리
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block text-sm hover:text-primary py-2 w-full text-left"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block text-sm font-medium hover:text-primary py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
