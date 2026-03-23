# closingast

`closingast` 是一个面向个人/家庭使用的轻量私人衣橱系统，核心目标是：

- 用图片快速浏览已有衣物
- 支持手动录入、图片上传、商品链接录入入口
- 支持标题、颜色、季节、标签、备注搜索
- 在手机端以最轻的方式管理衣橱

当前仓库已经整理到 `V1 可用版`，适合本地或小规模部署使用。

## 当前功能

- 衣橱首页：图片流浏览、筛选、搜索
- 新增衣物：标题、类目、季节、颜色、标签、备注、图片上传、商品链接入口
- 详情页：查看图片、来源、备注，并支持删除
- 编辑页：支持修改标题、季节、颜色、备注等信息
- 我的页面：衣物总数、类目分布、颜色分布
- Discover 页面：轻量浏览最近衣物和整理入口
- Supabase 本地 schema / seed / 存储接入脚手架

## 技术栈

- Next.js App Router
- TypeScript
- Supabase
- Vitest + Testing Library
- Playwright

## 目录说明

- `app/`：页面与 API 路由
- `components/`：页面组件与表单组件
- `lib/`：数据查询、变更、展示层和 Supabase 接入
- `supabase/`：本地数据库 migration 和 seed
- `tests/`：单测与集成测试
- `docs/`：产品设计与实施文档

## 环境要求

本地运行需要：

- Node.js 20+
- npm 10+
- Docker Desktop
- Supabase CLI

如果没有安装 Supabase CLI，可以先执行：

```bash
brew install supabase/tap/supabase
```

## 环境变量

复制一份环境变量模板：

```bash
cp .env.example .env.local
```

然后执行：

```bash
supabase status
```

把下面 3 个值填进 `.env.local`：

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的本地 Publishable Key
SUPABASE_SERVICE_ROLE_KEY=你的本地 Secret Key
```

## 安装依赖

```bash
npm install
```

## 一键初始化

首次启动前，建议先初始化本地 Supabase：

```bash
npm run setup:local
```

这条命令会执行：

- `supabase start`
- `supabase db reset`

## 一键启动

本地完整启动命令：

```bash
npm run dev:local
```

这条命令会先启动并重置本地 Supabase，然后直接启动 Next.js 开发服务器。

启动后访问：

- 应用：`http://127.0.0.1:3000`
- Supabase Studio：`http://127.0.0.1:54323`

## 常用命令

```bash
# 启动本地数据库
supabase start

# 重置数据库并写入 seed
supabase db reset

# 查看本地 Supabase 配置
supabase status

# 启动前端
npm run dev -- --hostname 127.0.0.1 --port 3000

# 一键启动本地环境
npm run dev:local

# 运行测试
npm test

# 运行 e2e
npm run test:e2e -- tests/e2e/wardrobe.spec.ts
```

## 测试

运行全部单测和集成测试：

```bash
npm test
```

当前项目已经通过：

- `16` 个测试文件
- `19` 条测试

如果你要做浏览器级联调，可以额外运行：

```bash
npm run test:e2e -- tests/e2e/wardrobe.spec.ts
```

## 当前已知边界

- 商品链接导入目前只做了平台识别和安全降级
- 还没有真正抓取淘宝/京东商品图片、价格、标题
- 当前更适合作为个人衣橱系统使用，而不是完整电商同步系统

## 文档

- 设计文档：`docs/superpowers/specs/2026-03-20-light-wardrobe-design.md`
- 实施计划：`docs/superpowers/plans/2026-03-20-light-wardrobe-mvp.md`

## 推荐启动顺序

```bash
git clone <your-repo-url>
cd closingast
npm install
cp .env.example .env.local
supabase status
# 填写 .env.local
npm run dev:local
```
