"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, Download, Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Prompt } from "@/lib/types";

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "즐겨찾기에서 제거" : "즐겨찾기에 추가",
      description: isFavorited
        ? "즐겨찾기에서 제거되었습니다."
        : "즐겨찾기에 추가되었습니다.",
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group w-full max-w-xs">
      <Link href={`/prompts/${prompt.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={prompt.image_urls?.[0] || "/placeholder.svg"}
            alt={prompt.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {/* Favorite Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
            onClick={handleToggleFavorite}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>

          {/* Tags */}
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="absolute top-2 left-2 flex gap-1">
              <Badge variant="secondary" className="text-xs">
                {prompt.tags?.[0]}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-3">
          <h3 className="font-semibold text-base mb-2 line-clamp-1">
            {prompt.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {prompt.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{(prompt.rating || 0).toFixed(1)}</span>
              <span>({prompt.review_count || 0})</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{prompt.view_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              <span>{prompt.download_count || 0}</span>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-3 pt-0">
        <Link href={`/prompts/${prompt.id}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full text-xs">
            상세보기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
