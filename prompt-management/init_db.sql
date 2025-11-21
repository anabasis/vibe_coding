-- SQLite Database Schema for Prompt Management
-- Database: prompt_management.db

-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- profiles table (사용자 프로필)
CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY, -- uuid
    nickname TEXT NOT NULL,
    avatar_url TEXT,
    updated_at TEXT NOT NULL -- ISO8601 timestamp
);

-- prompts table (프롬프트 상품)
CREATE TABLE IF NOT EXISTS prompts (
    id TEXT PRIMARY KEY, -- uuid
    created_at TEXT NOT NULL, -- ISO8601 timestamp
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    prompt_text TEXT NOT NULL, -- 실제 프롬프트 본문
    image_urls TEXT NOT NULL DEFAULT '[]', -- JSON array
    tags TEXT NOT NULL DEFAULT '[]', -- JSON array
    rating REAL NOT NULL DEFAULT 0,
    review_count INTEGER NOT NULL DEFAULT 0,
    download_count INTEGER NOT NULL DEFAULT 0,
    view_count INTEGER NOT NULL DEFAULT 0,
    file_url TEXT, -- 구매자용 다운로드 파일 경로
    is_published INTEGER NOT NULL DEFAULT 1 -- boolean (0 or 1)
);

-- carts table (장바구니)
CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL, -- ISO8601 timestamp
    user_id TEXT NOT NULL, -- uuid, FK to auth.users.id (참조만, 실제 FK는 없음)
    prompt_id TEXT NOT NULL, -- uuid, FK to prompts.id
    FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE,
    UNIQUE(user_id, prompt_id) -- 중복 담기 방지
);

-- purchases table (구매 기록)
CREATE TABLE IF NOT EXISTS purchases (
    id TEXT PRIMARY KEY, -- uuid
    created_at TEXT NOT NULL, -- ISO8601 timestamp
    buyer_id TEXT NOT NULL, -- uuid, FK to auth.users.id (참조만, 실제 FK는 없음)
    prompt_id TEXT NOT NULL, -- uuid, FK to prompts.id
    payment_order_id TEXT NOT NULL UNIQUE, -- 토스페이먼츠 주문 ID
    FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE
);

-- seller_waitlist table (판매자 웨이팅 리스트)
CREATE TABLE IF NOT EXISTS seller_waitlist (
    id TEXT PRIMARY KEY, -- uuid
    created_at TEXT NOT NULL, -- ISO8601 timestamp
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    portfolio_url TEXT NOT NULL,
    categories TEXT NOT NULL DEFAULT '[]', -- JSON array
    message TEXT NOT NULL,
    processed INTEGER NOT NULL DEFAULT 0 -- boolean (0 or 1)
);

-- mcp_servers table (MCP 서버)
CREATE TABLE IF NOT EXISTS mcp_servers (
    id TEXT PRIMARY KEY, -- uuid
    created_at TEXT NOT NULL, -- ISO8601 timestamp
    updated_at TEXT NOT NULL, -- ISO8601 timestamp
    name TEXT NOT NULL,
    description TEXT,
    endpoint TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'inactive', -- 'active', 'inactive', 'error'
    last_health_check TEXT, -- ISO8601 timestamp
    config TEXT, -- JSON object
    metadata TEXT -- JSON object
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_prompts_id ON prompts(id);
CREATE INDEX IF NOT EXISTS idx_prompts_is_published ON prompts(is_published);
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_prompt_id ON carts(prompt_id);
CREATE INDEX IF NOT EXISTS idx_purchases_buyer_id ON purchases(buyer_id);
CREATE INDEX IF NOT EXISTS idx_purchases_prompt_id ON purchases(prompt_id);
CREATE INDEX IF NOT EXISTS idx_purchases_payment_order_id ON purchases(payment_order_id);
CREATE INDEX IF NOT EXISTS idx_seller_waitlist_processed ON seller_waitlist(processed);
CREATE INDEX IF NOT EXISTS idx_mcp_servers_status ON mcp_servers(status);


