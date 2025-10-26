# bolt.new용 이미지 갤러리 웹사이트 프롬프트

## 개요

GitHub 저장소의 이미지들을 부드러운 애니메이션, 호버 효과와 함께 표시하고 Buy Me a Coffee 통합 기능을 포함한 현대적이고 반응형 이미지 갤러리 웹사이트를 React를 사용하여 만들어주세요.

## 사용자 설정 섹션

이 프롬프트를 사용하기 전에 다음 플레이스홀더를 실제 값으로 교체하세요:

```
[YOUR_BUYMEACOFFEE_WIDGET_SCRIPT]
<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.bu...

[YOUR_CDN_URL]
https://cdn.jsdelivr.net/gh/...
```

## 메인 프롬프트

다음 사양으로 React 기반 이미지 갤러리 웹사이트를 만들어주세요:

### 핵심 기능

1. 이미지 로딩 시스템
   - GitHub 저장소에서 번호가 매겨진 PNG 이미지(1.png, 2.png, 3.png 등)를 자동으로 감지하고 로드
   - 더 빠른 로딩을 위해 CDN URL 사용: [YOUR_CDN_URL]
   - HEAD 요청으로 사용 가능한 이미지 확인
   - 3번 연속 실패 후 확인 중단
   - 이미지 확인 중 로딩 스켈레톤 표시
2. 레이아웃 & 디자인
   - 반응형 그리드 레이아웃 (모바일 1열, 태블릿 2열, 데스크톱 3열, xl 화면 4열)
   - CSS 변수를 사용한 다크/라이트 모드 지원
   - "Image Gallery" 제목의 현대적인 그라데이션 헤더
   - 부드러운 애니메이션과 트랜지션
   - 이미지 컨테이너에 둥근 모서리 (rounded-2xl)
   - 스케일과 그림자 변형을 포함한 호버 효과
3. Buy Me a Coffee 통합

   - 정확한 위젯 스크립트 추가 (예시):

   ```jsx
   import React, { useEffect } from "react";

   export default function Buymeacoffee() {
     useEffect(() => {
       const script = document.createElement("script");
       const div = document.getElementById("supportByBMC");
       script.setAttribute("data-name", "BMC-Widget");
       script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
       script.setAttribute("data-id", "evavic44");
       script.setAttribute(
         "data-description",
         "Support me on Buy me a coffee!"
       );
       script.setAttribute(
         "data-message",
         "Thank you for visiting my website. If this app has helped you in anyway, consider buying us a coffee. ✨😎"
       );
       script.setAttribute("data-color", "#FFDD00");
       script.setAttribute("data-position", "Right");
       script.setAttribute("data-x_margin", "18");
       script.setAttribute("data-y_margin", "18");
       script.async = true;
       document.head.appendChild(script);
       script.onload = function () {
         var evt = document.createEvent("Event");
         evt.initEvent("DOMContentLoaded", false, false);
         window.dispatchEvent(evt);
       };

       div.appendChild(script);
     }, []);

     return <div id="supportByBMC"></div>;
   }
   ```

   ```jsx
   // Add this inside the page you want to import the widget
   import CoffeeWidget from "../Components/CoffeeWidget";

   <CoffeeWidget />;
   ```

   - 컴포넌트 언마운트 시 적절한 정리 보장

4. 이미지 기능
   - 이미지 다운로드: 호버 시 나타나는 각 이미지에 다운로드 버튼 추가
   - 소셜 미디어 공유: Twitter, Facebook, LinkedIn 공유 버튼 추가
   - 이 버튼들에 lucide-react 라이브러리 아이콘 사용 가능
   - 버튼들은 이미지 호버 시 오버레이에 나타나야 함
5. 스타일링 요구사항
   - Tailwind CSS 사용
   - CSS 변수:
   ```
   --background: #0f0f0f (다크) / #fafafa (라이트)
   --foreground: #f5f5f5 (다크) / #0a0a0a (라이트)
   --card: #1a1a1a (다크) / #ffffff (라이트)
   --card-hover: #262626 (다크) / #f5f5f5 (라이트)
   --accent: #5F7FFF
   ```
   - 애니메이션: 초기 로드 시 fadeIn, 로딩 상태 시 shimmer
   - 부드러운 트랜지션을 포함한 호버 애니메이션
6. 이미지 컴포넌트 구조
   ```
   // 각 이미지 카드는 다음을 포함해야 함:
   - 정사각형 비율 컨테이너
   - 그라데이션이 있는 호버 오버레이
   - 호버 시 이미지 제목/번호 표시
   - 다운로드 버튼 (아이콘)
   - 공유 버튼 (Twitter, Facebook, LinkedIn 아이콘)
   - 부드러운 스케일과 그림자 트랜지션
   ```
7. 성능 최적화
   - 처음 4개 이미지에 우선 로딩
   - 뷰포트에 기반한 반응형 이미지 크기
   - 스크롤 아래 이미지에 대한 지연 로딩
8. 에러 처리
   - 사용 가능한 이미지가 없을 때 "이미지를 찾을 수 없습니다" 메시지 표시
   - 이미지 로드 실패에 대한 우아한 에러 처리

### 기술 구현 세부사항

    - React 훅 사용 (useState, useEffect)
    - 적절한 TypeScript 타입을 포함한 깔끔한 컴포넌트 구조
    - SEO를 위한 메타데이터 구성

### 다운로드 기능

```
// 다운로드 함수 구현
const downloadImage = (imageUrl, imageName) => {
  // fetch와 blob을 사용한 다운로드 로직 생성
  // 적절한 파일명으로 다운로드 트리거
};
```

### 공유 기능

```
// 공유 함수 구현
const shareOnTwitter = (imageUrl) => {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=이 이미지를 확인해보세요!`);
};

const shareOnFacebook = (imageUrl) => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`);
};

const shareOnLinkedIn = (imageUrl) => {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`);
};
```

모든 인터랙티브 요소들이 적절한 호버 상태를 가지고 있고 전체 경험이 부드럽고 현대적이어야 합니다. 갤러리는 모든 기기 크기에서 완벽하게 작동해야 합니다.
