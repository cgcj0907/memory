# 两个人的回忆录

一个基于 `Next.js App Router + Supabase` 的双人朋友回忆录应用，风格偏可爱、手账、剪贴簿和电子相册。

## 技术栈

- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn 风格源代码组件
- Framer Motion
- Lucide React
- React Hook Form + Zod
- Embla Carousel
- yet-another-react-lightbox
- Supabase Auth / Postgres / Storage

## 本地启动

1. 复制 `.env.example` 为 `.env.local`
2. 填入 Supabase 项目变量
3. 安装依赖

```bash
npm install
```

4. 启动开发环境

```bash
npm run dev
```

## Supabase 初始化

1. 在 Supabase SQL Editor 执行 `supabase/migrations/0001_schema.sql`
2. 再执行 `supabase/seed.sql`
3. 创建 Storage bucket：`memory-assets`

## 页面

- `/login`
- `/register`
- `/onboarding`
- `/`
- `/categories`
- `/records/new`
- `/records/[id]`
- `/records/[id]/edit`
- `/profile`
- `/settings`

## 说明

- 未配置 Supabase 时，首页会退回到本地 mock 数据展示，方便先看 UI
- 记录表单当前支持图片链接输入；接入 Storage 后可替换为真实上传流程
