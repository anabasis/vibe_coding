import { PromptCard } from "@/components/prompt-card";
import { mockPrompts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  // 인기 프롬프트 6개만 표시 (랜딩용)
  const featuredPrompts = mockPrompts.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Featured Prompts Section */}
      <section className="py-4 px-4 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">인기 프롬프트</h2>
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
    </div>
  );
}
