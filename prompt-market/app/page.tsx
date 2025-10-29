import { PromptCard } from "@/components/prompt-card";
import { mockPrompts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Star, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  // 인기 프롬프트 6개만 표시 (랜딩용)
  const featuredPrompts = mockPrompts.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 text-balance">
            최고의 AI 프롬프트를 발견하세요
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            전문가들이 검증한 고품질 프롬프트로 AI 작업의 효율을 극대화하세요
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/prompts">
              <Button size="lg" className="text-lg px-8">
                프롬프트 탐색하기
              </Button>
            </Link>
            <Link href="/seller/waitlist">
              <Button variant="outline" size="lg" className="text-lg px-8">
                판매자 신청
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            왜 Prompt Discovery인가요?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">검증된 품질</h3>
              <p className="text-muted-foreground">
                전문가들이 직접 검토하고 테스트한 고품질 프롬프트만을 제공합니다
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">커뮤니티 기반</h3>
              <p className="text-muted-foreground">
                다양한 분야의 전문가들이 참여하는 활발한 커뮤니티
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">즉시 사용</h3>
              <p className="text-muted-foreground">
                구매 즉시 프롬프트를 복사하고 다운로드하여 바로 활용하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">인기 프롬프트</h2>
            <p className="text-lg text-muted-foreground mb-8">
              가장 많이 구매되고 높은 평점을 받은 프롬프트들
            </p>
            <Link href="/prompts">
              <Button variant="outline">전체 보기</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
          <p className="text-lg text-muted-foreground mb-8">
            수천 개의 프롬프트 중에서 당신에게 맞는 것을 찾아보세요
          </p>
          <Link href="/prompts">
            <Button size="lg" className="text-lg px-8">
              프롬프트 탐색하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
