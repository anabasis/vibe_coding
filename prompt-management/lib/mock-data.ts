import type { Prompt, Profile, User } from "./types";

// Mock profiles data (profiles table)
export const mockProfiles: Profile[] = [
  {
    id: "1",
    nickname: "프롬프트마스터",
    avatar_url: "/user-profile-illustration.png",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

// Mock prompts data (prompts table)
export const mockPrompts: Prompt[] = [
  {
    id: "1",
    created_at: "2024-01-15T00:00:00Z",
    title: "ChatGPT 블로그 글쓰기 프롬프트",
    description:
      "고품질 블로그 콘텐츠를 작성하는 데 최적화된 프롬프트입니다. SEO 최적화와 독자 참여를 고려한 구조로 설계되었습니다.",
    price: 15000,
    prompt_text:
      "당신은 전문적인 블로그 작가입니다. 다음 주제에 대해 SEO 최적화된 고품질 블로그 포스트를 작성해주세요:\n\n주제: [주제 입력]\n\n요구사항:\n1. 제목은 클릭을 유도하는 매력적인 제목으로 작성\n2. 도입부에서 독자의 관심을 끌 수 있는 훅(Hook) 사용\n3. 본문은 3-5개의 섹션으로 구성\n4. 각 섹션마다 소제목과 구체적인 예시 포함\n5. 마무리에서는 행동 유도(CTA) 포함\n6. SEO 키워드를 자연스럽게 포함\n7. 읽기 쉬운 문단 구조로 작성",
    image_urls: ["/blog-writing-ai.jpg"],
    tags: ["콘텐츠 제작", "블로그", "SEO"],
    rating: 4.8,
    review_count: 24,
    download_count: 156,
    view_count: 892,
    file_url: "/downloads/blog-writing-prompt.txt",
    is_published: true,
  },
  {
    id: "2",
    created_at: "2024-01-20T00:00:00Z",
    title: "마케팅 카피라이팅 프롬프트",
    description:
      "효과적인 마케팅 문구를 생성하는 프롬프트입니다. 다양한 플랫폼과 타겟 고객에 맞춰 최적화할 수 있습니다.",
    price: 20000,
    prompt_text:
      "당신은 경험이 풍부한 마케팅 카피라이터입니다. 다음 정보를 바탕으로 효과적인 마케팅 카피를 작성해주세요:\n\n제품/서비스: [제품명]\n타겟 고객: [고객층]\n핵심 가치 제안: [주요 혜택]\n플랫폼: [광고 매체]\n\n요구사항:\n1. 고객의 페인 포인트를 정확히 파악하여 공감대 형성\n2. 제품의 핵심 가치를 명확하게 전달\n3. 감정적 어필과 논리적 근거의 균형\n4. 행동 유도가 명확한 CTA 포함\n5. 플랫폼 특성에 맞는 톤앤매너 적용\n6. AIDA 공식(AIDA: Attention, Interest, Desire, Action) 활용",
    image_urls: ["/marketing-copywriting.jpg"],
    tags: ["마케팅", "카피라이팅", "광고"],
    rating: 4.9,
    review_count: 18,
    download_count: 203,
    view_count: 1156,
    file_url: "/downloads/marketing-copywriting-prompt.txt",
    is_published: true,
  },
  {
    id: "3",
    created_at: "2024-02-01T00:00:00Z",
    title: "이미지 생성 프롬프트 팩",
    description:
      "Midjourney, DALL-E, Stable Diffusion에 최적화된 이미지 생성 프롬프트 모음입니다.",
    price: 25000,
    prompt_text:
      '다양한 AI 이미지 생성 도구에 최적화된 프롬프트 모음입니다:\n\n## Midjourney 프롬프트\n- 기본 구조: [주제], [스타일], [퀄리티], [비율]\n- 예시: "A futuristic cityscape, cyberpunk style, highly detailed, 4K resolution, --ar 16:9 --v 5"\n\n## DALL-E 프롬프트\n- 구체적이고 명확한 설명 사용\n- 예시: "A minimalist logo design featuring a mountain silhouette in blue and white colors, clean typography, professional business style"\n\n## Stable Diffusion 프롬프트\n- 키워드 기반 구조\n- 예시: "portrait, woman, professional headshot, studio lighting, high quality, detailed, 8k"\n\n## 공통 팁\n1. 구체적인 키워드 사용\n2. 스타일과 퀄리티 지시어 포함\n3. 색상과 조명 명시\n4. 원하지 않는 요소 제외 (negative prompt)\n5. 비율과 해상도 설정',
    image_urls: ["/ai-image-generation-concept.png"],
    tags: ["이미지 생성", "AI 아트", "디자인"],
    rating: 4.7,
    review_count: 31,
    download_count: 278,
    view_count: 1456,
    file_url: "/downloads/image-generation-prompts.txt",
    is_published: true,
  },
  {
    id: "4",
    created_at: "2024-02-10T00:00:00Z",
    title: "코드 리뷰 자동화 프롬프트",
    description:
      "코드 품질을 향상시키는 자동화된 코드 리뷰 프롬프트입니다. 다양한 프로그래밍 언어를 지원합니다.",
    price: 30000,
    prompt_text:
      "당신은 시니어 소프트웨어 엔지니어입니다. 다음 코드를 리뷰하고 개선 사항을 제안해주세요:\n\n```\n[코드 입력]\n```\n\n리뷰 기준:\n1. **코드 품질**: 가독성, 유지보수성, 성능\n2. **보안**: 잠재적 보안 취약점\n3. **베스트 프랙티스**: 언어별 관례와 패턴 준수\n4. **에러 처리**: 예외 상황 대응\n5. **테스트**: 테스트 가능성과 커버리지\n6. **문서화**: 주석과 문서의 적절성\n\n리뷰 형식:\n- ✅ 잘된 점\n- ⚠️ 개선이 필요한 점\n- 🔧 구체적인 수정 제안\n- 📚 참고 자료 및 추가 학습 권장\n\n각 항목에 대해 구체적인 예시와 함께 설명해주세요.",
    image_urls: ["/code-review-automation.jpg"],
    tags: ["개발", "코드 리뷰", "프로그래밍"],
    rating: 4.6,
    review_count: 12,
    download_count: 89,
    view_count: 567,
    file_url: "/downloads/code-review-prompt.txt",
    is_published: true,
  },
  {
    id: "5",
    created_at: "2024-02-15T00:00:00Z",
    title: "소셜미디어 콘텐츠 생성기",
    description:
      "인스타그램, 트위터, 페이스북용 매력적인 소셜미디어 콘텐츠를 생성하는 프롬프트입니다.",
    price: 18000,
    prompt_text:
      "당신은 소셜미디어 마케팅 전문가입니다. 다음 정보를 바탕으로 각 플랫폼에 최적화된 콘텐츠를 생성해주세요:\n\n브랜드: [브랜드명]\n타겟 고객: [고객층]\n콘텐츠 목적: [목표]\n플랫폼: [인스타그램/트위터/페이스북]\n\n## 플랫폼별 최적화\n\n### 인스타그램\n- 시각적 요소 강조\n- 해시태그 5-10개 포함\n- 스토리용 텍스트도 함께 제공\n\n### 트위터\n- 280자 제한 내에서 핵심 메시지 전달\n- 트렌드 해시태그 활용\n- 리트윗을 유도하는 문구 포함\n\n### 페이스북\n- 커뮤니티 참여 유도\n- 긴 형태의 스토리텔링 가능\n- 댓글과 공유를 유도하는 질문 포함\n\n## 공통 요소\n1. 브랜드 톤앤매너 일관성\n2. 고객 참여 유도\n3. 명확한 행동 유도\n4. 시각적 매력성\n5. 공유 가능성",
    image_urls: ["/social-media-content.png"],
    tags: ["소셜미디어", "마케팅", "콘텐츠"],
    rating: 4.5,
    review_count: 22,
    download_count: 167,
    view_count: 934,
    file_url: "/downloads/social-media-content-prompt.txt",
    is_published: true,
  },
  {
    id: "6",
    created_at: "2024-02-20T00:00:00Z",
    title: "이메일 마케팅 템플릿",
    description:
      "높은 오픈율과 클릭률을 달성하는 이메일 마케팅 프롬프트 템플릿입니다.",
    price: 22000,
    prompt_text:
      "당신은 이메일 마케팅 전문가입니다. 다음 정보를 바탕으로 효과적인 이메일을 작성해주세요:\n\n브랜드: [브랜드명]\n타겟 고객: [고객층]\n이메일 목적: [목표]\n제품/서비스: [제품명]\n\n## 이메일 구조\n\n### 제목 (Subject Line)\n- 클릭을 유도하는 매력적인 제목 3가지 옵션 제공\n- 개인화 요소 포함\n- 긴급성이나 호기심 유발\n\n### 프리헤더 (Preheader)\n- 제목을 보완하는 추가 정보\n- 90자 이내로 작성\n\n### 본문\n1. **인사말**: 개인화된 인사\n2. **도입부**: 고객의 관심사와 연결\n3. **본문**: 핵심 메시지와 혜택 전달\n4. **CTA**: 명확한 행동 유도\n5. **마무리**: 브랜드 톤앤매너 유지\n\n### 모바일 최적화\n- 짧은 문단 사용\n- 큰 버튼과 링크\n- 읽기 쉬운 폰트 크기\n\n## 성과 측정 요소\n- 오픈율 향상\n- 클릭률 증가\n- 전환율 개선\n- 구독 해지율 감소",
    image_urls: ["/email-marketing-template.png"],
    tags: ["이메일 마케팅", "마케팅", "비즈니스"],
    rating: 4.8,
    review_count: 19,
    download_count: 134,
    view_count: 723,
    file_url: "/downloads/email-marketing-template.txt",
    is_published: true,
  },
];

// Legacy mock data for backward compatibility
export const mockUsers: User[] = [
  {
    id: "1",
    email: "user@example.com",
    nickname: "프롬프트마스터",
    profileImage: "/user-profile-illustration.png",
    createdAt: "2024-01-01T00:00:00Z",
  },
];
