# 两个人的回忆录 设计文档

## 1. 项目概述

`两个人的回忆录` 是一个面向两位朋友的共享回忆记录应用，形式类似一本可爱、治愈、温柔的电子相册。应用专注于记录两个人一起去过的地方、吃过的店、体验过的事情，以及其他值得收藏的共同片段。

首版产品以固定双人空间为核心模型，不支持多人扩展，不采用情侣语义，不强调社交互动，而是围绕“共同记录、共同整理、共同回看”构建完整体验。

## 2. 产品目标

### 2.1 目标

- 提供一个仅限两位朋友使用的共享空间，用于沉淀共同回忆
- 支持结构化记录不同类型的经历，并保留图片、标签、地点和时间信息
- 让记录、浏览、筛选、编辑和回顾的流程足够轻松、温柔、可爱
- 在移动端优先的前提下，保持桌面端可用与美观
- 以可直接部署到 Vercel 的完整工程形式交付

### 2.2 非目标

- 不做公开社交、评论、点赞、关注或动态流
- 不做多人协作空间
- 不做地图轨迹、IM 聊天、复杂通知系统
- 不做情侣绑定、纪念日恋爱化表达、爱意仪式化功能

## 3. 用户与使用场景

### 3.1 核心用户

- 两位固定成员
- 以朋友关系共同使用
- 通过邮箱账号登录
- 希望长期保存和整理共同经历

### 3.2 核心场景

- 第一次注册后创建共享空间，并将配对码发给另一位朋友
- 第二位成员注册后输入配对码加入该空间
- 两位成员共同记录餐厅、面包店、游玩地点和其他有意义的事情
- 在首页查看最近记录、统计概览和共同时间线
- 在分类页快速筛选某类回忆
- 在详情页回顾某次经历的图片、描述和标签
- 在用户中心和设置页维护个人资料与空间信息

## 4. 产品范围

### 4.1 必做功能

- 邮箱密码注册、登录、退出
- 注册邀请码校验，固定使用 `0907`
- 首次注册后自动创建用户资料
- 固定双人空间创建与加入
- 空间名与空间封面配置
- 四类记录的新增、编辑、删除、详情查看
- 分类筛选、关键词搜索、按时间排序
- 图片上传与预览
- 首页统计与时间线
- 用户资料维护
- Supabase Auth、Postgres、Storage、RLS

### 4.2 记录分类

- 面包店
- 餐厅
- 游玩的地方
- 其他有意义的事情

### 4.3 面包店特化能力

- 店名
- 店铺图片
- 买过的面包名称
- 每个面包独立上传图片
- 每个面包独立设置好吃等级

## 5. 设计原则

### 5.1 产品原则

- 优先保证完整闭环，而不是堆积高级功能
- 以共享空间为授权边界，而不是以记录创建者为授权边界
- 让记录表单足够统一，减少用户认知负担
- 保持首版结构可扩展，但不过度设计为多人平台

### 5.2 视觉原则

- 朋友感、收藏感、陪伴感
- 纯朋友手账风，带少女感、剪贴簿感、电子相册感
- 可爱、甜美、治愈，但不幼稚
- 使用奶油白、浅粉、马卡龙粉、樱花粉、浅紫、浅黄等配色
- 不使用商务蓝、深灰科技风或后台管理式视觉语气
- 大圆角、柔和阴影、漂浮卡片、轻盈动效、贴纸感标签
- 采用精致平衡型排版，保留 scrapbook 气质但避免页面过杂
- 移动端优先，大点击区域，滚动体验流畅

### 5.3 文案原则

- 强调“回忆、收藏、一起去过、一起吃过、慢慢记录”
- 不使用情侣化、暧昧化、恋爱纪念化表达
- 空状态与错误提示尽量柔和，不使用生硬系统语气

## 6. 技术方案

### 6.1 技术栈

- 前端：Next.js App Router
- 语言：TypeScript
- 样式：Tailwind CSS
- 基础组件库：shadcn/ui
- 动画：Framer Motion
- 图标：Lucide React
- 表单：React Hook Form + Zod
- 图片轮播：Embla Carousel
- 图片预览：yet-another-react-lightbox
- 后端与数据库：Supabase
- 鉴权：Supabase Auth
- 文件存储：Supabase Storage
- 部署：Vercel

### 6.2 方案选择

采用“以空间为中心的中等规范化方案”。

原因如下：

- 双人关系、权限和记录访问都天然围绕共享空间展开
- 能清楚表达“固定双人空间”的业务限制
- 比极简单表方案更适合做 RLS
- 比过度规范化方案更适合首版快速落地

## 7. 核心业务模型

### 7.1 共享空间模型

- 每个空间最多容纳两位成员
- 第一位注册用户可创建空间
- 空间创建成功后生成唯一配对码
- 第二位用户通过配对码加入空间
- 空间满员后禁止继续加入
- 空间成员都能编辑和删除空间内全部记录

### 7.2 账号与资料模型

- 账号使用 Supabase Auth 的邮箱密码注册登录
- `QQ 邮箱` 作为普通邮箱使用，不单独接入第三方登录
- 注册时必须校验邀请码 `0907`
- 注册成功后自动创建 `users_profile`
- 若昵称或头像缺失，首次进入后引导补全

### 7.3 记录模型

- 所有记录共享统一主表结构
- 面包店使用扩展表与子表承载特有字段
- 标签支持多个
- 每条记录至少包含一张封面图，可附加多张记录图
- 记录时间作为时间线与排序核心字段

## 8. 数据库设计

### 8.1 表：users_profile

用途：用户资料表，与 `auth.users` 一对一。

字段：

- `id` uuid primary key，引用 `auth.users.id`
- `email` text not null
- `nickname` text
- `avatar_path` text
- `bio` text
- `created_at` timestamptz not null default now()
- `updated_at` timestamptz not null default now()

索引建议：

- `users_profile_email_idx` on `email`

### 8.2 表：spaces

用途：双人共享空间。

字段：

- `id` uuid primary key default gen_random_uuid()
- `name` text not null
- `cover_image_path` text
- `pair_code` text not null unique
- `owner_user_id` uuid not null references `auth.users(id)`
- `created_at` timestamptz not null default now()
- `updated_at` timestamptz not null default now()

索引建议：

- unique index on `pair_code`
- index on `owner_user_id`

### 8.3 表：space_members

用途：空间成员关系表。

字段：

- `id` uuid primary key default gen_random_uuid()
- `space_id` uuid not null references `spaces(id)` on delete cascade
- `user_id` uuid not null references `auth.users(id)` on delete cascade
- `role` text not null default `'member'`
- `joined_at` timestamptz not null default now()

约束与索引：

- unique (`space_id`, `user_id`)
- index on `user_id`
- 通过约束函数或 RPC 逻辑保证每个 `space_id` 最多两位成员

### 8.4 表：categories

用途：记录分类表。

字段：

- `id` uuid primary key default gen_random_uuid()
- `slug` text not null unique
- `name` text not null
- `icon` text
- `sort_order` int not null default 0

初始化数据：

- `bakery`
- `restaurant`
- `place`
- `moment`

### 8.5 表：records

用途：记录主表。

字段：

- `id` uuid primary key default gen_random_uuid()
- `space_id` uuid not null references `spaces(id)` on delete cascade
- `category_id` uuid not null references `categories(id)`
- `title` text not null
- `event_time` timestamptz not null
- `location_text` text
- `description` text
- `tags` text[] not null default '{}'
- `cover_image_path` text
- `created_by` uuid not null references `auth.users(id)`
- `updated_by` uuid not null references `auth.users(id)`
- `created_at` timestamptz not null default now()
- `updated_at` timestamptz not null default now()

索引建议：

- `records_space_time_idx` on (`space_id`, `event_time` desc)
- `records_space_category_idx` on (`space_id`, `category_id`)
- `records_space_created_idx` on (`space_id`, `created_at` desc)
- GIN index on `tags`

### 8.6 表：record_images

用途：记录附图表。

字段：

- `id` uuid primary key default gen_random_uuid()
- `record_id` uuid not null references `records(id)` on delete cascade
- `storage_path` text not null
- `sort_order` int not null default 0
- `created_at` timestamptz not null default now()

索引建议：

- `record_images_record_idx` on `record_id`

### 8.7 表：bakery_records

用途：面包店扩展表，与记录主表一对一。

字段：

- `record_id` uuid primary key references `records(id)` on delete cascade
- `shop_name` text not null
- `shop_image_path` text
- `shop_note` text

### 8.8 表：bakery_items

用途：面包子项表。

字段：

- `id` uuid primary key default gen_random_uuid()
- `bakery_record_id` uuid not null references `bakery_records(record_id)` on delete cascade
- `name` text not null
- `image_path` text
- `taste_level` text not null
- `note` text
- `sort_order` int not null default 0
- `created_at` timestamptz not null default now()

约束建议：

- `taste_level` check in (`hang`, `top`, `legend`, `npc`, `bad`)

### 8.9 表：invite_codes

用途：邀请码规则表，用于注册门槛校验。

字段：

- `id` uuid primary key default gen_random_uuid()
- `code` text not null unique
- `type` text not null
- `is_active` boolean not null default true
- `max_uses` int
- `used_count` int not null default 0
- `expires_at` timestamptz
- `created_at` timestamptz not null default now()

初始化数据：

- `code = '0907'`
- `type = 'signup'`

## 9. RLS 与访问控制设计

### 9.1 users_profile

- 用户可读取自己的完整资料
- 用户可读取与自己同空间的另一位成员的基础资料
- 用户只能更新自己的资料

### 9.2 spaces

- 空间成员可读取对应空间
- 空间成员可更新空间名和封面
- 首版不开放空间删除

### 9.3 space_members

- 空间成员可读取本空间成员列表
- 插入不直接开放给前端
- 通过服务端 Action 或受控 RPC 执行加入空间逻辑

### 9.4 records / record_images / bakery_records / bakery_items

- 仅空间成员可读
- 仅空间成员可新增
- 仅空间成员可编辑
- 仅空间成员可删除
- 不按创建者区分写权限

### 9.5 invite_codes

- 不对普通前端开放全表读取
- 注册接口通过受控逻辑校验邀请码

### 9.6 Storage

建议使用单桶或多目录组织：

- `avatars/`
- `space-covers/`
- `records/`
- `bakery-items/`

访问控制建议：

- 头像可读范围可放宽到登录用户可读
- 空间封面与记录图仅允许空间成员读取
- 上传与删除均校验当前用户身份与空间归属

## 10. 页面结构

### 10.1 登录页

功能：

- 邮箱密码登录
- 跳转注册页
- 登录后进入首页或空间引导页

风格：

- 渐变背景
- 奶油白卡片
- 柔和按钮与图标
- 像手账封面页，而不是通用登录表单

### 10.2 注册页

功能：

- 输入邮箱、密码、确认密码、邀请码
- 先校验邀请码 `0907`
- 再执行 Supabase Auth 注册

### 10.3 空间引导页

功能：

- 创建回忆小屋
- 输入配对码加入朋友的小屋

创建空间字段：

- 空间名
- 空间封面

### 10.4 首页

内容区域：

- 空间封面与欢迎语
- 两位成员头像与昵称
- 统计概览
- 分类入口
- 最近记录
- 共同回忆时间线

视觉规则：

- 首页不做 dashboard 风格
- 更像回忆册封面页、朋友手账首页、照片拼贴墙
- 统计概览只作为小纸条卡片点缀，不作为主视觉中心
- 以大图、卡片、纸片块、贴纸标签和柔和留白营造氛围

### 10.5 分类列表页

功能：

- 按分类查看记录
- 关键词搜索
- 按时间排序
- 分页或无限滚动
- 空状态提示

视觉规则：

- 列表采用漂浮卡片设计
- 图片像贴在手账本上的照片卡
- 顶部筛选区做成软胶囊工具条
- 保持精致平衡型布局，而不是后台表格

### 10.6 记录详情页

功能：

- 查看主图、标题、时间、地点、描述、标签
- 图片预览
- 查看创建者与更新时间
- 若为面包店则额外展示店名、店铺图和面包清单

视觉规则：

- 主图区域使用轮播
- 图片统一带圆角、柔和阴影和轻微相框感
- 内容区像日记页或纸条块，而不是表单详情面板

### 10.7 新增记录页

功能：

- 统一记录表单
- 根据分类动态出现扩展字段
- 支持多图上传

视觉规则：

- 表单区采用 shadcn/ui 二次主题化
- 输入框像便签或奶油输入框
- 图片上传区像贴照片到相册

### 10.8 编辑记录页

功能：

- 详情回填
- 更新主记录与扩展内容
- 删除某些子项或图片

### 10.9 用户中心页

功能：

- 查看头像、昵称、邮箱
- 查看所属空间
- 查看基础统计

视觉规则：

- 头像区像拍立得小卡片
- 资料块像整理页而不是后台个人中心

### 10.10 设置页

功能：

- 修改昵称
- 上传或更换头像
- 修改密码
- 查看空间名、封面与配对码
- 退出登录

## 11. 核心组件设计

### 11.1 布局与导航

- `AppShell`：统一页面容器、头部和底部导航
- `BottomNav`：移动端底部导航
- `PageHeader`：统一返回、标题、操作按钮
- `AnimatedPage`：封装页面淡入上移动画

### 11.2 首页组件

- `SpaceHero`：空间头图、空间名、欢迎语、成员展示
- `StatCard`：统计概览卡片
- `CategoryEntryGrid`：分类入口
- `TimelineList`：共同回忆时间线
- `MemoryWallSection`：拼贴式最近记录区块

### 11.3 记录相关组件

- `RecordCard`：列表页与首页使用的记录卡片
- `RecordForm`：新增和编辑共用表单
- `TagInput`：标签输入
- `ImageUploader`：图片上传与预览
- `RecordImageGallery`：详情页图片墙
- `RecordCarousel`：基于 Embla 的详情主图轮播
- `RecordLightbox`：基于 Lightbox 的图片预览层

### 11.4 用户与空间组件

- `MemberAvatarGroup`：成员头像组
- `ProfileEditor`：资料编辑表单
- `SpaceSetupCard`：创建或加入空间入口

### 11.5 空状态与反馈组件

- `EmptyState`：空状态组件
- `ConfirmDialog`：删除确认
- `SoftToast`：轻提示组件
- `StickerBadge`：通用贴纸式标签和徽章容器

### 11.6 面包模块组件

- `BakerySectionEditor`：店铺信息表单
- `BakeryItemEditorList`：面包子项编辑器
- `BreadTasteBadge`：好吃等级展示组件

## 12. 面包好吃等级设计

### 12.1 映射关系

- `hang` -> `夯`
- `top` -> `顶级`
- `legend` -> `人上人`
- `npc` -> `NPC`
- `bad` -> `拉完了`

### 12.2 视觉表达

- `夯`：亮粉贴纸，带火花点缀
- `顶级`：浅紫金边，带小皇冠
- `人上人`：奶黄徽章，带星星
- `NPC`：低饱和灰蓝标签，带发呆感表情
- `拉完了`：灰粉或浅棕标签，带皱巴巴贴纸感

要求：

- 不使用五星评分
- 采用徽章、气泡、贴纸、糖果标签等形式
- 每个等级有明显不同的颜色与装饰元素

### 12.3 使用方式

- 列表页显示简洁徽章
- 详情页显示更完整的贴纸式评分
- 表单页使用单选卡片或可爱标签按钮选择
- 点击评分时可用 Framer Motion 做轻微弹跳反馈

## 13. 交互设计

### 13.1 动效

- 页面进入时淡入加上移
- 卡片 hover 时轻微浮起
- 按钮 hover 与点击时轻微缩放或弹跳
- Modal 使用 spring 动画
- 图片轮播切换平滑
- 评分贴纸选择时有微交互反馈

### 13.2 可用性

- 表单控件触控区域足够大
- 移动端优先单列布局
- 桌面端扩展为双栏或三栏
- 搜索、筛选、排序区域固定清晰
- 所有图片统一圆角与柔和遮罩
- 所有卡片统一使用大圆角和软阴影

### 13.3 空状态文案

示例：

- “这里还空空的，等你们放进第一段回忆。”
- “今天还没有新的收藏，要不要补一条一起去过的地方？”
- “这一类回忆暂时还没出现，等下一次出发吧。”

## 14. 前后端数据流

### 14.1 注册流

1. 用户提交邮箱、密码、确认密码、邀请码
2. 服务端校验邀请码是否为有效的 `0907`
3. 调用 Supabase Auth 注册
4. 注册成功后创建 `users_profile`
5. 根据是否已有空间，跳转到空间引导页或首页

### 14.2 创建空间流

1. 用户填写空间名并上传封面
2. 服务端生成唯一配对码
3. 创建 `spaces`
4. 自动插入 `space_members`
5. 返回首页并展示空间信息

### 14.3 加入空间流

1. 用户输入配对码
2. 服务端校验配对码是否存在
3. 校验空间人数是否少于 2
4. 将用户写入 `space_members`
5. 进入首页

### 14.4 新增记录流

1. 上传图片至 Storage
2. 创建 `records`
3. 创建 `record_images`
4. 若为面包店则创建 `bakery_records` 与 `bakery_items`
5. 返回详情页或列表页

### 14.5 编辑记录流

1. 拉取原始记录详情
2. 表单回填
3. 更新 `records`
4. 按需更新、删除或新增 `record_images`
5. 若为面包店则同步更新扩展表与子项表

### 14.6 列表查询流

- 通过 URL 查询参数驱动搜索、分类、排序、分页状态
- 服务端查询以 `space_id` 为根过滤条件
- 返回结构化数据供前端渲染

## 15. 表单校验与错误处理

### 15.1 校验

- 使用 `zod` 统一定义表单 schema
- 邮箱、密码、昵称、标题、分类、时间为重点必填项
- 面包店记录至少要求店名
- 若存在面包子项，则面包名称与评分必填
- 限制图片格式与大小

### 15.2 错误处理

- 邀请码错误：阻止注册并提示明确原因
- 配对码错误：提示不存在或空间已满
- 权限错误：直接拒绝并跳回可访问页面
- 上传失败：保留当前表单状态
- 页面级错误：使用 `error.tsx`
- 页面级加载：使用 `loading.tsx`

## 16. 工程目录建议

```text
memory/
  app/
    (auth)/
      login/
      register/
    (protected)/
      onboarding/
      page.tsx
      categories/
      records/
        new/
        [id]/
        [id]/edit/
      profile/
      settings/
    api/
    layout.tsx
    globals.css
  components/
    ui/
    layout/
    home/
    records/
    bakery/
    profile/
  actions/
    auth.ts
    spaces.ts
    records.ts
    profile.ts
  lib/
    supabase/
    schemas/
    constants/
    utils/
  types/
    database.ts
    app.ts
  public/
  supabase/
    migrations/
    seed.sql
  docs/
    superpowers/
      specs/
        2026-05-24-two-person-memoir-design.md
  .env.example
  package.json
  README.md
```

## 17. 测试与验收策略

### 17.1 自动化测试

- 优先测试纯函数、schema、映射关系和关键条件渲染
- 覆盖邀请码校验、配对码加入逻辑、面包评分映射

### 17.2 手动验收

- 注册并验证邀请码门槛
- 创建空间并生成配对码
- 第二位成员加入空间
- 新增、编辑、删除四类记录
- 上传头像、空间封面、记录图片、面包图片
- 验证首页统计、时间线、搜索和筛选
- 验证双人空间内权限是否正常

## 18. 部署与环境变量

### 18.1 环境变量

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 18.2 部署要求

- 项目适合直接部署到 Vercel
- Supabase 负责数据库、鉴权、文件存储
- 迁移 SQL 与种子数据应纳入项目目录

## 19. 风险与约束

- 当前目录不是 Git 仓库，设计文档可写入本地，但无法直接提交版本记录
- 首版 RLS 需认真验证，避免 Storage 与记录表权限不一致
- 图片上传链路涉及前端预览、Storage、数据库路径写入，需要完整联调
- 双人空间满员限制必须通过服务端逻辑严格保证

## 20. 最终结论

本项目首版采用以共享空间为核心的双人朋友回忆录方案。系统通过注册邀请码和空间配对码完成门槛控制，通过 Supabase Auth 和 RLS 实现安全访问，通过 Next.js App Router 提供移动端优先的可爱治愈型体验。该方案满足用户提出的页面、数据库、权限、部署和设计要求，同时保持结构清晰、可维护、可直接落地。
