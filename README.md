# 🌍 Diplomatic AI — 外交谈判模拟平台

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![DeepSeek](https://img.shields.io/badge/AI-DeepSeek-4f46e5)](https://deepseek.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

**Diplomatic AI** 是一个基于大语言模型的**外交谈判模拟与培训平台**。通过 AI 扮演对方谈判代表，结合真实历史案例、国家性格档案和实时策略分析，帮助用户在安全的虚拟环境中练习外交谈判技巧。

![平台预览](./public/preview.png)

---

## ✨ 核心功能

### 🤖 智能谈判模拟
- **双边与多边谈判**：支持 20+ 个现代及历史国家，每个国家都有独特的历史文化背景、性格特征和谈判风格。
- **AI 对方代表**：由 DeepSeek 大模型驱动，根据国家档案、议题进展和用户态度实时生成外交回应。
- **议程与状态追踪**：实时显示谈判势头、双方态度变化、突破可能性，并记录每个议题的收益。

### 🎓 三种难度模式
| 模式 | 特点 |
|------|------|
| **新手** | AI 自动代替用户发言，仅在关键决策点暂停让用户选择。 |
| **进阶** | AI 提供 4 种不同语气的外交回应选项，并附带语言艺术分析。 |
| **专家** | 完全自主发言，AI 仅提供实时策略建议和局势评估。 |

### 📚 丰富的外交知识库
- **40+ 历史案例**：包括戴维营协议、古巴导弹危机、英国脱欧谈判等，提供详细的背景、过程和经验教训。
- **时期适应**：支持冷战、后冷战、当代等多个历史时期，AI 的语言风格和策略会随时期自动调整。
- **自定义场景**：支持上传自定义谈判背景，AI 自动解析并生成模拟场景。

### 📹 表情与语气分析（可选）
- 通过摄像头实时捕捉面部表情，调用豆包视觉模型分析情绪状态，辅助用户了解自己在谈判中的表现。

### 📊 训练记录与分析
- 自动保存每次谈判的完整记录，包括对话历史、关键决策和最终结果。
- 生成详细的复盘报告，指出优势、不足和改进建议。

---

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 前端 | React 19, TypeScript, Tailwind CSS 4 |
| UI 组件 | shadcn/ui (Radix UI) |
| 动画 | Framer Motion |
| 表单 | React Hook Form + Zod |
| 图表 | Recharts |
| AI 服务 | DeepSeek API (对话) + 豆包视觉 API (情绪分析) |
| 数据存储 | LocalStorage (训练记录) + PostgreSQL (可选) |
| 包管理器 | pnpm |

---

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/Steve357h20/diplomago.git
cd 你的仓库名
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 配置环境变量
在项目根目录创建 `.env.local` 文件，填入以下内容：
```env
# DeepSeek API（对话模型）
DEEPSEEK_API_KEY=sk-your-deepseek-api-key

# 豆包视觉 API（可选，用于表情分析）
DOUBAO_VISION_API_KEY=your-doubao-api-key
DOUBAO_VISION_MODEL=your-doubao-model-id
```
> 如果不需要表情分析功能，可以留空，系统会自动降级为默认中性评估。

### 4. 启动开发服务器
```bash
pnpm dev
```
访问 `http://localhost:3000` 即可使用。

---

## 📦 构建与部署

### 本地生产构建
```bash
pnpm build
pnpm start
```

### 部署到 Vercel
1. 将项目推送到 GitHub。
2. 在 [Vercel](https://vercel.com) 中导入该仓库。
3. 在项目设置中添加与 `.env.local` 相同的环境变量。
4. 点击 Deploy，完成后即可通过 Vercel 提供的域名访问。

> ⚠️ **注意**：Vercel 免费版的 Serverless Function 超时时间为 10 秒。如果遇到超时错误，建议使用以下方案之一：
> - 优化 AI 提示词，降低 `max_tokens`。
> - 使用 [ngrok](https://ngrok.com) 将本地服务暴露到公网（无超时限制）。
> - 迁移到 [Railway](https://railway.app) 等超时限制更宽松的平台。

---

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── api/                # API 路由（对话、分析、生成等）
│   ├── configure/          # 双边谈判配置页
│   ├── negotiate/          # 双边谈判主界面
│   ├── multilateral/       # 多边谈判
│   ├── analysis/           # 结果分析页
│   ├── history/            # 训练记录页
│   └── cases/[id]/         # 历史案例详情页
├── components/             # React 组件
│   ├── ai-assistant/       # AI 助手悬浮球
│   ├── negotiation/        # 谈判对话气泡、议程面板
│   ├── sentiment/          # 摄像头表情分析
│   ├── config/             # 配置向导
│   └── ui/                 # shadcn/ui 基础组件
├── lib/                    # 业务逻辑与工具库
│   ├── deepseek.ts         # DeepSeek API 封装
│   ├── countries.ts        # 国家数据库
│   ├── case-database.ts    # 历史案例库
│   ├── training-records.ts # 训练记录管理
│   └── ...
└── types/                  # TypeScript 类型定义
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！如果你有任何建议或发现了 bug，请在 GitHub 上告诉我们。

---

## 📄 许可证

本项目基于 MIT 许可证开源。详情请参阅 [LICENSE](./LICENSE) 文件。

---

## 🙏 致谢

- [DeepSeek](https://deepseek.com/) 提供高质量的对话模型 API。
- [火山方舟](https://www.volcengine.com/product/ark) 提供豆包视觉模型 API。
- [shadcn/ui](https://ui.shadcn.com/) 提供优雅的组件库。
- 项目灵感来源于外交学、国际关系理论以及真实的外交谈判历史。
```

