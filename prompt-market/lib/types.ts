// Core data types for the Prompt Discovery application based on PRD

// User profile (profiles table)
export interface Profile {
  id: string; // uuid, PK, FK to auth.users.id
  nickname: string;
  avatar_url?: string;
  updated_at: string;
}

// Prompt (prompts table)
export interface Prompt {
  id: string; // uuid, PK
  created_at: string;
  title: string;
  description: string;
  price: number; // integer
  prompt_text: string; // 실제 프롬프트 본문(구매 후 노출)
  image_urls: string[];
  tags: string[];
  rating: number; // numeric, default 0
  review_count: number; // int, default 0
  download_count: number; // int, default 0
  view_count: number; // int, default 0
  file_url?: string; // 구매자용 다운로드 파일 경로
  is_published: boolean; // default true
}

// Cart item (carts table)
export interface CartItem {
  id: number; // bigint, PK
  created_at: string;
  user_id: string; // uuid, FK to auth.users.id
  prompt_id: string; // uuid, FK to prompts.id
  prompt?: Prompt; // joined data
}

// Purchase (purchases table)
export interface Purchase {
  id: string; // uuid, PK
  created_at: string;
  buyer_id: string; // uuid, FK to auth.users
  prompt_id: string; // uuid, FK to prompts
  payment_order_id: string; // text, unique - 토스페이먼츠 주문 ID
  prompt?: Prompt; // joined data
}

// Seller waitlist (seller_waitlist table)
export interface SellerWaitlist {
  id: string; // uuid, PK
  created_at: string;
  name: string;
  email: string;
  portfolio_url: string;
  categories: string[];
  message: string;
  processed: boolean; // default false
}

// Auth state
export interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
}

// Legacy types for backward compatibility (will be removed later)
export interface User {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string;
  createdAt: string;
}
