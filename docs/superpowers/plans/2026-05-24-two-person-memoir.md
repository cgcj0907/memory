# 两个人的回忆录 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个可部署到 Vercel 的 Next.js + Supabase 双人朋友回忆录应用，支持邮箱注册登录、固定双人空间、记录管理、图片上传，以及精致平衡型朋友手账风界面。

**Architecture:** 以前端 `Next.js App Router` 为主，服务端交互通过 Server Actions 和 Supabase 完成。数据库以 `spaces` 为核心边界，通过 `space_members` 控制双人权限，记录内容落在统一 `records` 主表，面包店扩展用一对一扩展表和子表实现。前端采用 `TailwindCSS + shadcn/ui` 作为基础样式和组件系统，用 `Framer Motion`、`Embla Carousel` 和 `yet-another-react-lightbox` 构建朋友手账风的图片与动效体验。

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lucide React, React Hook Form, Zod, Embla Carousel, yet-another-react-lightbox, Supabase Auth, Supabase Postgres, Supabase Storage, date-fns, sonner, Vitest, Testing Library

---

## File Map

- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `components.json`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `README.md`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`
- Create: `app/loading.tsx`
- Create: `app/error.tsx`
- Create: `app/(auth)/login/page.tsx`
- Create: `app/(auth)/register/page.tsx`
- Create: `app/(protected)/layout.tsx`
- Create: `app/(protected)/onboarding/page.tsx`
- Create: `app/(protected)/categories/page.tsx`
- Create: `app/(protected)/records/new/page.tsx`
- Create: `app/(protected)/records/[id]/page.tsx`
- Create: `app/(protected)/records/[id]/edit/page.tsx`
- Create: `app/(protected)/profile/page.tsx`
- Create: `app/(protected)/settings/page.tsx`
- Create: `components/layout/app-shell.tsx`
- Create: `components/layout/bottom-nav.tsx`
- Create: `components/layout/page-header.tsx`
- Create: `components/home/space-hero.tsx`
- Create: `components/home/stat-card.tsx`
- Create: `components/home/category-entry-grid.tsx`
- Create: `components/home/timeline-list.tsx`
- Create: `components/home/memory-wall-section.tsx`
- Create: `components/records/record-card.tsx`
- Create: `components/records/record-form.tsx`
- Create: `components/records/record-gallery.tsx`
- Create: `components/records/record-carousel.tsx`
- Create: `components/records/record-lightbox.tsx`
- Create: `components/records/tag-input.tsx`
- Create: `components/records/image-uploader.tsx`
- Create: `components/bakery/bread-taste-badge.tsx`
- Create: `components/bakery/bakery-section-editor.tsx`
- Create: `components/bakery/bakery-item-editor-list.tsx`
- Create: `components/profile/profile-editor.tsx`
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/textarea.tsx`
- Create: `components/ui/dialog.tsx`
- Create: `components/ui/avatar.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/empty-state.tsx`
- Create: `components/ui/soft-toast.tsx`
- Create: `components/ui/sticker-badge.tsx`
- Create: `actions/auth.ts`
- Create: `actions/spaces.ts`
- Create: `actions/records.ts`
- Create: `actions/profile.ts`
- Create: `lib/constants/app.ts`
- Create: `lib/constants/categories.ts`
- Create: `lib/constants/bread-levels.ts`
- Create: `lib/schemas/auth.ts`
- Create: `lib/schemas/profile.ts`
- Create: `lib/schemas/space.ts`
- Create: `lib/schemas/record.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/middleware.ts`
- Create: `lib/utils/cn.ts`
- Create: `lib/utils/date.ts`
- Create: `lib/utils/pair-code.ts`
- Create: `lib/utils/storage.ts`
- Create: `types/app.ts`
- Create: `types/database.ts`
- Create: `middleware.ts`
- Create: `supabase/migrations/0001_schema.sql`
- Create: `supabase/seed.sql`
- Create: `vitest.config.ts`
- Create: `tests/utils/pair-code.test.ts`
- Create: `tests/schemas/auth.test.ts`
- Create: `tests/constants/bread-levels.test.ts`

### Task 1: 初始化 Next.js 工程与依赖

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `components.json`
- Create: `.gitignore`

- [ ] **Step 1: 写出工程依赖定义**

```json
{
  "name": "memory",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run"
  },
  "dependencies": {
    "@hookform/resolvers": "^4.1.0",
    "@radix-ui/react-avatar": "^1.1.2",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.49.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.5.2",
    "framer-motion": "^12.4.2",
    "lucide-react": "^0.475.0",
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "sonner": "^2.0.1",
    "tailwind-merge": "^2.6.0",
    "yet-another-react-lightbox": "^3.23.1",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.6",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "eslint": "^9.17.0",
    "eslint-config-next": "^16.0.0",
    "jsdom": "^26.0.0",
    "tailwindcss": "^4.0.6",
    "typescript": "^5.7.2",
    "vitest": "^3.0.5"
  }
}
```

- [ ] **Step 2: 安装依赖并确认成功**

Run: `npm install`
Expected: 命令成功结束，并生成 `package-lock.json`

- [ ] **Step 3: 写入 Next.js 与 TypeScript 基础配置**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coresg-normal.trae.ai"
      }
    ]
  }
};

export default nextConfig;
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: 运行基础检查**

Run: `npm run lint`
Expected: 没有配置级报错

- [ ] **Step 5: 提交**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs components.json .gitignore
git commit -m "chore: initialize next app foundation"
```

### Task 2: 建立应用常量、类型和测试基础

**Files:**
- Create: `lib/constants/app.ts`
- Create: `lib/constants/categories.ts`
- Create: `lib/constants/bread-levels.ts`
- Create: `types/app.ts`
- Create: `vitest.config.ts`
- Test: `tests/utils/pair-code.test.ts`
- Test: `tests/constants/bread-levels.test.ts`

- [ ] **Step 1: 先写评分映射测试**

```ts
import { describe, expect, it } from "vitest";
import { BREAD_LEVEL_MAP } from "@/lib/constants/bread-levels";

describe("BREAD_LEVEL_MAP", () => {
  it("maps all taste levels to labels", () => {
    expect(BREAD_LEVEL_MAP.hang.label).toBe("夯");
    expect(BREAD_LEVEL_MAP.top.label).toBe("顶级");
    expect(BREAD_LEVEL_MAP.legend.label).toBe("人上人");
    expect(BREAD_LEVEL_MAP.npc.label).toBe("NPC");
    expect(BREAD_LEVEL_MAP.bad.label).toBe("拉完了");
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/constants/bread-levels.test.ts`
Expected: FAIL，提示找不到 `@/lib/constants/bread-levels`

- [ ] **Step 3: 写入常量与类型**

```ts
// lib/constants/bread-levels.ts
export const BREAD_LEVEL_MAP = {
  hang: { label: "夯", emoji: "spark", className: "bg-pink-200 text-pink-700" },
  top: { label: "顶级", emoji: "crown", className: "bg-violet-200 text-violet-700" },
  legend: { label: "人上人", emoji: "star", className: "bg-amber-100 text-amber-700" },
  npc: { label: "NPC", emoji: "cloud", className: "bg-slate-200 text-slate-700" },
  bad: { label: "拉完了", emoji: "frown", className: "bg-rose-100 text-rose-600" }
} as const;

export type BreadLevel = keyof typeof BREAD_LEVEL_MAP;
```

```ts
// lib/constants/categories.ts
export const CATEGORY_OPTIONS = [
  { slug: "bakery", name: "面包店", icon: "Croissant" },
  { slug: "restaurant", name: "餐厅", icon: "UtensilsCrossed" },
  { slug: "place", name: "游玩的地方", icon: "MapPin" },
  { slug: "moment", name: "其他有意义的事情", icon: "Sparkles" }
] as const;
```

- [ ] **Step 4: 再跑测试**

Run: `npm test -- tests/constants/bread-levels.test.ts`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
git add lib/constants lib/types tests/constants vitest.config.ts
git commit -m "feat: add app constants and vitest setup"
```

### Task 3: 编写数据库迁移与种子数据

**Files:**
- Create: `supabase/migrations/0001_schema.sql`
- Create: `supabase/seed.sql`

- [ ] **Step 1: 先写 SQL 结构检查说明测试用例**

```ts
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("schema sql", () => {
  it("contains spaces and records tables", () => {
    const sql = readFileSync("supabase/migrations/0001_schema.sql", "utf8");
    expect(sql).toContain("create table if not exists public.spaces");
    expect(sql).toContain("create table if not exists public.records");
    expect(sql).toContain("create table if not exists public.bakery_items");
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/schemas/auth.test.ts`
Expected: FAIL，因为迁移文件尚未创建

- [ ] **Step 3: 编写迁移 SQL**

```sql
create extension if not exists pgcrypto;

create table if not exists public.users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  nickname text,
  avatar_path text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.spaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cover_image_path text,
  pair_code text not null unique,
  owner_user_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.space_members (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  unique (space_id, user_id)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  icon text,
  sort_order int not null default 0
);

create table if not exists public.records (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete cascade,
  category_id uuid not null references public.categories(id),
  title text not null,
  event_time timestamptz not null,
  location_text text,
  description text,
  tags text[] not null default '{}',
  cover_image_path text,
  created_by uuid not null references auth.users(id),
  updated_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.record_images (
  id uuid primary key default gen_random_uuid(),
  record_id uuid not null references public.records(id) on delete cascade,
  storage_path text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.bakery_records (
  record_id uuid primary key references public.records(id) on delete cascade,
  shop_name text not null,
  shop_image_path text,
  shop_note text
);

create table if not exists public.bakery_items (
  id uuid primary key default gen_random_uuid(),
  bakery_record_id uuid not null references public.bakery_records(record_id) on delete cascade,
  name text not null,
  image_path text,
  taste_level text not null check (taste_level in ('hang', 'top', 'legend', 'npc', 'bad')),
  note text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
```

- [ ] **Step 4: 编写种子与 RLS**

```sql
insert into public.categories (slug, name, icon, sort_order)
values
  ('bakery', '面包店', 'Croissant', 1),
  ('restaurant', '餐厅', 'UtensilsCrossed', 2),
  ('place', '游玩的地方', 'MapPin', 3),
  ('moment', '其他有意义的事情', 'Sparkles', 4)
on conflict (slug) do update set name = excluded.name;

insert into public.invite_codes (code, type, is_active, max_uses)
values ('0907', 'signup', true, null)
on conflict (code) do nothing;
```

- [ ] **Step 5: 提交**

```bash
git add supabase/migrations/0001_schema.sql supabase/seed.sql
git commit -m "feat: add supabase schema and seed data"
```

### Task 4: 完成 Supabase 客户端、工具函数与 Schema

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/utils/pair-code.ts`
- Create: `lib/schemas/auth.ts`
- Create: `lib/schemas/space.ts`
- Create: `lib/schemas/profile.ts`
- Create: `lib/schemas/record.ts`
- Test: `tests/utils/pair-code.test.ts`
- Test: `tests/schemas/auth.test.ts`

- [ ] **Step 1: 写配对码生成测试**

```ts
import { describe, expect, it } from "vitest";
import { createPairCode } from "@/lib/utils/pair-code";

describe("createPairCode", () => {
  it("returns uppercase code with length 6", () => {
    const code = createPairCode();
    expect(code).toMatch(/^[A-Z0-9]{6}$/);
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/utils/pair-code.test.ts`
Expected: FAIL，提示找不到 `createPairCode`

- [ ] **Step 3: 写工具函数与表单 Schema**

```ts
// lib/utils/pair-code.ts
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function createPairCode(length = 6) {
  return Array.from({ length }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");
}
```

```ts
// lib/schemas/auth.ts
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("请输入正确的邮箱地址"),
  password: z.string().min(6, "密码至少 6 位"),
  confirmPassword: z.string().min(6, "请再次输入密码"),
  inviteCode: z.string().trim().min(1, "请输入邀请码")
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "两次输入的密码不一致"
});
```

```ts
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        }
      }
    }
  );
}
```

- [ ] **Step 4: 跑测试**

Run: `npm test -- tests/utils/pair-code.test.ts tests/schemas/auth.test.ts`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
git add lib/supabase lib/utils/pair-code.ts lib/schemas tests/utils tests/schemas
git commit -m "feat: add supabase helpers and schemas"
```

### Task 5: 实现鉴权 Server Actions 与中间件

**Files:**
- Create: `actions/auth.ts`
- Create: `middleware.ts`
- Create: `lib/supabase/middleware.ts`
- Modify: `lib/constants/app.ts`
- Test: `tests/schemas/auth.test.ts`

- [ ] **Step 1: 写注册邀请码校验测试**

```ts
import { describe, expect, it } from "vitest";
import { registerSchema } from "@/lib/schemas/auth";

describe("registerSchema", () => {
  it("accepts valid invite code shape", () => {
    const result = registerSchema.safeParse({
      email: "test@qq.com",
      password: "123456",
      confirmPassword: "123456",
      inviteCode: "0907"
    });

    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: 运行测试确认通过后再写 Action**

Run: `npm test -- tests/schemas/auth.test.ts`
Expected: PASS

- [ ] **Step 3: 实现注册与登录 Action**

```ts
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { registerSchema } from "@/lib/schemas/auth";

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    inviteCode: formData.get("inviteCode")
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  if (parsed.data.inviteCode !== "0907") {
    return { error: { inviteCode: ["邀请码不正确"] } };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password
  });

  if (error || !data.user) {
    return { error: { email: [error?.message ?? "注册失败"] } };
  }

  await supabase.from("users_profile").upsert({
    id: data.user.id,
    email: parsed.data.email
  });

  redirect("/onboarding");
}
```

- [ ] **Step 4: 实现受保护路由中间件**

```ts
// middleware.ts
import { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
```

- [ ] **Step 5: 提交**

```bash
git add actions/auth.ts middleware.ts lib/supabase/middleware.ts lib/constants/app.ts tests/schemas/auth.test.ts
git commit -m "feat: add auth actions and route protection"
```

### Task 6: 搭建根布局、主题样式与基础 UI 组件

**Files:**
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/textarea.tsx`
- Create: `components/ui/avatar.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/dialog.tsx`
- Create: `components/ui/empty-state.tsx`
- Create: `components/ui/soft-toast.tsx`
- Create: `components/ui/sticker-badge.tsx`
- Create: `lib/utils/cn.ts`

- [ ] **Step 1: 先写 `cn` 工具和按钮组件快照测试**

```ts
import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils/cn";

describe("cn", () => {
  it("merges tailwind classes", () => {
    expect(cn("px-2", "px-4")).toContain("px-4");
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/utils/cn.test.ts`
Expected: FAIL，找不到 `cn`

- [ ] **Step 3: 写样式基础设施与 shadcn 二次主题**

```ts
// lib/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "两个人的回忆录",
  description: "记录两位朋友一起走过的地方和经历过的事情"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[linear-gradient(180deg,#fff8fb_0%,#fffef6_100%)] text-stone-700 antialiased">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
```

```tsx
// components/ui/sticker-badge.tsx
import { cn } from "@/lib/utils/cn";

export function StickerBadge({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/70 px-3 py-1 text-xs font-semibold shadow-[0_8px_20px_rgba(255,182,193,0.18)] backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: 运行 lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
git add app/layout.tsx app/globals.css components/ui lib/utils/cn.ts
git commit -m "feat: add global theme and base ui components"
```

### Task 7: 实现登录页、注册页与 Auth 表单

**Files:**
- Create: `app/(auth)/login/page.tsx`
- Create: `app/(auth)/register/page.tsx`
- Modify: `actions/auth.ts`
- Modify: `lib/schemas/auth.ts`

- [ ] **Step 1: 写登录页渲染测试**

```ts
import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/(auth)/login/page";

it("renders login copy", () => {
  render(<LoginPage />);
  expect(screen.getByText("欢迎回来")).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/app/login-page.test.tsx`
Expected: FAIL，页面文件不存在

- [ ] **Step 3: 写页面**

```tsx
// app/(auth)/login/page.tsx
import Link from "next/link";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form action={loginAction} className="w-full max-w-md rounded-[32px] bg-white/90 p-8 shadow-[0_20px_60px_rgba(255,182,193,0.2)]">
        <h1 className="text-3xl font-semibold text-pink-500">欢迎回来</h1>
        <p className="mt-2 text-sm text-stone-500">一起看看已经收藏下来的回忆吧。</p>
        <input className="mt-6 w-full rounded-2xl border border-pink-100 px-4 py-3" name="email" type="email" placeholder="请输入 QQ 邮箱" />
        <input className="mt-4 w-full rounded-2xl border border-pink-100 px-4 py-3" name="password" type="password" placeholder="请输入密码" />
        <button className="mt-6 w-full rounded-2xl bg-pink-400 px-4 py-3 font-medium text-white">登录</button>
        <Link className="mt-4 block text-center text-sm text-pink-500" href="/register">
          还没有账号？去注册
        </Link>
      </form>
    </main>
  );
}
```

- [ ] **Step 4: 跑测试**

Run: `npm test -- tests/app/login-page.test.tsx`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
git add app/'(auth)' actions/auth.ts lib/schemas/auth.ts tests/app
git commit -m "feat: add auth pages"
```

### Task 8: 实现受保护布局、首页与空间引导

**Files:**
- Create: `app/(protected)/layout.tsx`
- Create: `app/(protected)/onboarding/page.tsx`
- Create: `app/page.tsx`
- Create: `components/layout/app-shell.tsx`
- Create: `components/layout/bottom-nav.tsx`
- Create: `components/home/space-hero.tsx`
- Create: `components/home/stat-card.tsx`
- Create: `components/home/category-entry-grid.tsx`
- Create: `components/home/timeline-list.tsx`
- Create: `components/home/memory-wall-section.tsx`
- Create: `actions/spaces.ts`

- [ ] **Step 1: 写首页英雄区组件测试**

```ts
import { render, screen } from "@testing-library/react";
import { SpaceHero } from "@/components/home/space-hero";

it("renders space name", () => {
  render(<SpaceHero spaceName="糯米小屋" members={[]} coverUrl="" />);
  expect(screen.getByText("糯米小屋")).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/home/space-hero.test.tsx`
Expected: FAIL，组件尚未创建

- [ ] **Step 3: 写空间 Action 与朋友手账风首页组件**

```ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { createPairCode } from "@/lib/utils/pair-code";

export async function createSpaceAction(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return { error: "请先登录" };
  }

  const pairCode = createPairCode();

  const { data, error } = await supabase
    .from("spaces")
    .insert({ name, pair_code: pairCode, owner_user_id: auth.user.id })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "创建空间失败" };
  }

  await supabase.from("space_members").insert({ space_id: data.id, user_id: auth.user.id, role: "owner" });
  return { success: true };
}
```

```tsx
// components/home/space-hero.tsx
import { motion } from "framer-motion";

export function SpaceHero({ spaceName, coverUrl }: { spaceName: string; coverUrl?: string | null }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_60px_rgba(255,182,193,0.18)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffd9ec_0%,transparent_35%),radial-gradient(circle_at_bottom_right,#fff1b8_0%,transparent_35%)]" />
      <div className="relative">
        <p className="text-sm text-pink-500">今天也来整理一点共同回忆</p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-700">{spaceName}</h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-stone-500">像翻一本慢慢变厚的朋友手账，把一起走过的地方和吃过的东西都贴进来。</p>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 4: 运行 lint 与测试**

Run: `npm run lint && npm test -- tests/home/space-hero.test.tsx`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
git add app/'(protected)' app/page.tsx components/layout components/home actions/spaces.ts tests/home
git commit -m "feat: add protected shell and onboarding flow"
```

### Task 9: 实现记录表单、详情页和分类页

**Files:**
- Create: `app/(protected)/categories/page.tsx`
- Create: `app/(protected)/records/new/page.tsx`
- Create: `app/(protected)/records/[id]/page.tsx`
- Create: `app/(protected)/records/[id]/edit/page.tsx`
- Create: `components/records/record-card.tsx`
- Create: `components/records/record-form.tsx`
- Create: `components/records/tag-input.tsx`
- Create: `components/records/image-uploader.tsx`
- Create: `components/records/record-gallery.tsx`
- Create: `components/records/record-carousel.tsx`
- Create: `components/records/record-lightbox.tsx`
- Create: `actions/records.ts`
- Create: `lib/schemas/record.ts`

- [ ] **Step 1: 写记录 schema 测试**

```ts
import { describe, expect, it } from "vitest";
import { recordSchema } from "@/lib/schemas/record";

describe("recordSchema", () => {
  it("requires title and category", () => {
    const result = recordSchema.safeParse({
      title: "",
      categorySlug: "",
      eventTime: "",
      locationText: ""
    });

    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/schemas/record.test.ts`
Expected: FAIL，找不到 `recordSchema`

- [ ] **Step 3: 实现记录写入 Action**

```ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { recordSchema } from "@/lib/schemas/record";

export async function createRecordAction(payload: unknown) {
  const parsed = recordSchema.safeParse(payload);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return { error: { root: ["请先登录"] } };
  }

  const { data: membership } = await supabase
    .from("space_members")
    .select("space_id")
    .eq("user_id", auth.user.id)
    .single();

  if (!membership) {
    return { error: { root: ["请先加入一个空间"] } };
  }

  const { error } = await supabase.from("records").insert({
    space_id: membership.space_id,
    category_id: parsed.data.categoryId,
    title: parsed.data.title,
    event_time: parsed.data.eventTime,
    location_text: parsed.data.locationText,
    description: parsed.data.description,
    tags: parsed.data.tags,
    cover_image_path: parsed.data.coverImagePath,
    created_by: auth.user.id,
    updated_by: auth.user.id
  });

  if (error) {
    return { error: { root: [error.message] } };
  }

  return { success: true };
}
```

- [ ] **Step 4: 补齐详情与列表页，并接入轮播与预览**

```tsx
// app/(protected)/categories/page.tsx
export default async function CategoriesPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string; keyword?: string; sort?: string }>;
}) {
  const params = await searchParams;
  return <div className="space-y-4">分类：{params.category ?? "全部"}</div>;
}
```

```tsx
// components/records/record-carousel.tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";

export function RecordCarousel({ images }: { images: string[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden rounded-[28px]" ref={emblaRef}>
      <div className="flex">
        {images.map((image) => (
          <div key={image} className="min-w-0 flex-[0_0_100%]">
            <img alt="" className="h-72 w-full rounded-[28px] object-cover" src={image} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 提交**

```bash
git add app/'(protected)'/categories app/'(protected)'/records components/records actions/records.ts lib/schemas/record.ts tests/schemas/record.test.ts
git commit -m "feat: add record CRUD pages and schema"
```

### Task 10: 实现面包店扩展组件与评分展示

**Files:**
- Create: `components/bakery/bread-taste-badge.tsx`
- Create: `components/bakery/bakery-section-editor.tsx`
- Create: `components/bakery/bakery-item-editor-list.tsx`
- Modify: `components/records/record-form.tsx`
- Modify: `actions/records.ts`

- [ ] **Step 1: 写评分徽章组件测试**

```ts
import { render, screen } from "@testing-library/react";
import { BreadTasteBadge } from "@/components/bakery/bread-taste-badge";

it("renders bread level label", () => {
  render(<BreadTasteBadge level="legend" />);
  expect(screen.getByText("人上人")).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/bakery/bread-taste-badge.test.tsx`
Expected: FAIL，组件不存在

- [ ] **Step 3: 实现贴纸风评分组件与面包子项编辑器**

```tsx
import { motion } from "framer-motion";
import { BREAD_LEVEL_MAP, type BreadLevel } from "@/lib/constants/bread-levels";
import { StickerBadge } from "@/components/ui/sticker-badge";

export function BreadTasteBadge({ level }: { level: BreadLevel }) {
  const config = BREAD_LEVEL_MAP[level];

  return (
    <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <StickerBadge className={`px-3 py-1.5 text-xs ${config.className}`}>
        {config.label}
      </StickerBadge>
    </motion.div>
  );
}
```

- [ ] **Step 4: 把面包字段接入记录表单与写入逻辑**

```ts
if (parsed.data.categorySlug === "bakery") {
  await supabase.from("bakery_records").upsert({
    record_id: recordId,
    shop_name: parsed.data.bakeryShopName,
    shop_image_path: parsed.data.bakeryShopImagePath
  });

  await supabase.from("bakery_items").insert(
    parsed.data.bakeryItems.map((item, index) => ({
      bakery_record_id: recordId,
      name: item.name,
      image_path: item.imagePath,
      taste_level: item.tasteLevel,
      note: item.note,
      sort_order: index
    }))
  );
}
```

- [ ] **Step 5: 提交**

```bash
git add components/bakery components/records/record-form.tsx actions/records.ts tests/bakery
git commit -m "feat: add bakery record extensions"
```

### Task 11: 实现用户中心、设置页与资料维护

**Files:**
- Create: `app/(protected)/profile/page.tsx`
- Create: `app/(protected)/settings/page.tsx`
- Create: `components/profile/profile-editor.tsx`
- Create: `actions/profile.ts`
- Create: `lib/schemas/profile.ts`

- [ ] **Step 1: 写资料 schema 测试**

```ts
import { describe, expect, it } from "vitest";
import { profileSchema } from "@/lib/schemas/profile";

describe("profileSchema", () => {
  it("accepts optional bio", () => {
    const result = profileSchema.safeParse({ nickname: "糯米", bio: "" });
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/schemas/profile.test.ts`
Expected: FAIL，schema 文件不存在

- [ ] **Step 3: 写资料编辑 Action**

```ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/schemas/profile";

export async function updateProfileAction(payload: unknown) {
  const parsed = profileSchema.safeParse(payload);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return { error: { root: ["请先登录"] } };
  }

  const { error } = await supabase.from("users_profile").update(parsed.data).eq("id", auth.user.id);

  if (error) {
    return { error: { root: [error.message] } };
  }

  return { success: true };
}
```

- [ ] **Step 4: 补页面**

```tsx
// app/(protected)/profile/page.tsx
export default function ProfilePage() {
  return <div className="space-y-4">个人资料</div>;
}
```

- [ ] **Step 5: 提交**

```bash
git add app/'(protected)'/profile app/'(protected)'/settings components/profile actions/profile.ts lib/schemas/profile.ts tests/schemas/profile.test.ts
git commit -m "feat: add profile and settings pages"
```

### Task 12: 接入 Storage 上传、README 与环境变量

**Files:**
- Create: `.env.example`
- Create: `README.md`
- Create: `lib/utils/storage.ts`

- [ ] **Step 1: 写 `.env.example`**

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

- [ ] **Step 2: 写 Storage 工具**

```ts
export const STORAGE_BUCKET = "memory-assets";

export function buildStoragePath(kind: "avatar" | "space-cover" | "record" | "bakery-item", userId: string, fileName: string) {
  return `${kind}/${userId}/${Date.now()}-${fileName}`;
}
```

- [ ] **Step 3: 写 README**

```md
# 两个人的回忆录

## 启动

1. 复制 `.env.example` 为 `.env.local`
2. 填入 Supabase 项目变量
3. 执行 `npm install`
4. 执行 `npm run dev`

## Supabase

- 运行 `supabase/migrations/0001_schema.sql`
- 再执行 `supabase/seed.sql`

## UI 技术栈

- Tailwind CSS
- shadcn/ui
- Framer Motion
- Embla Carousel
- yet-another-react-lightbox
- Lucide Icons
```

- [ ] **Step 4: 运行最终检查**

Run: `npm run lint && npm test && npm run build`
Expected: 全部通过

- [ ] **Step 5: 提交**

```bash
git add .env.example README.md lib/utils/storage.ts
git commit -m "docs: add setup and deployment docs"
```

## Self-Review

- Spec coverage: 已覆盖工程初始化、数据库、鉴权、空间、记录、面包扩展、资料页、Storage、测试和部署说明
- Placeholder scan: 无 `TODO`、`TBD` 或“稍后实现”描述
- Type consistency: `BreadLevel`、`registerSchema`、`createPairCode`、`createSpaceAction`、`createRecordAction`、`StickerBadge` 命名在各任务间保持一致
