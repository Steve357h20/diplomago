# AI Diplomacy Simulator - 项目规范

## 1. Concept & Vision

**AI Diplomacy Simulator** 是一款外交谈判智能模拟平台，旨在通过AI技术辅助外交教育培训。平台模拟真实外交谈判场景，帮助学员在安全环境中练习谈判技巧，积累经验，最终形成最优谈判策略。

**核心体验**：如同拥有一位经验丰富的外交导师（派蒙风格AI助手）全程陪伴，从谈判准备到实战模拟，再到结果分析，提供全方位指导。

## 2. Design Language

### 美学方向
**主题**：国际外交会议厅 + 数字孪生
**意象**：古老外交图书馆的庄严感与现代科技感的融合 - 深色木纹质感的背景、金属质感的边框、柔和的聚光灯效果

### 色彩系统
```css
--primary: #C9A962;        /* 外交金色 - 主色调，象征庄严与权威 */
--primary-foreground: #1A1A1A;
--secondary: #2D3748;       /* 外交灰蓝 - 次要色调 */
--accent: #4A90A4;          /* 会议蓝 - 强调色 */
--background: #0F1419;      /* 深墨色背景 */
--surface: #1A2332;         /* 卡片表面 */
--surface-elevated: #243042; /* 悬浮表面 */
--text-primary: #F7F9FC;     /* 主要文字 */
--text-secondary: #A0AEC0;   /* 次要文字 */
--success: #48BB78;         /* 成功/获益 */
--warning: #ECC94B;         /* 警告/中性 */
--danger: #F56565;          /* 风险/损失 */
```

### 字体选择
- **标题字体**: "Cormorant Garamond", serif - 优雅、权威
- **正文字体**: "Inter", sans-serif - 清晰、可读
- **代码/数据**: "JetBrains Mono", monospace

### 动效哲学
- **出场动画**: 元素从底部淡入上升 (translateY: 20px → 0, opacity: 0 → 1)
- **交互反馈**: 按钮按下时轻微缩小 (scale: 0.98)，悬停时发光边框
- **对话气泡**: 打字机效果，模拟真实对话节奏
- **进度指示**: 平滑的进度条填充动画

## 3. Layout & Structure

### 页面结构
1. **首页 (/)** - 入口页面，导航入口
2. **双边谈判配置 (/configure)** - 双边谈判背景设置
3. **双边模拟谈判 (/negotiate)** - 双边对话界面
4. **多边谈判配置 (/multilateral/config)** - 多边谈判设置
5. **多边模拟谈判 (/multilateral/[id])** - 多边对话界面
6. **结果分析 (/analysis)** - 谈判结果与建议
7. **案例库 (/cases/[id])** - 历史案例详情

### 响应式策略
- **桌面端 (>1024px)**: 三栏布局（AI助手 | 主内容 | 状态面板）
- **平板端 (768-1024px)**: 双栏布局（AI助手 | 主内容）
- **移动端 (<768px)**: 单栏布局，底部固定AI助手

## 4. Features & Interactions

### 核心功能

#### 4.1 AI助手
- **形象**: 悬浮球体 + 发光轮廓 + 表情动画
- **功能**:
  - 欢迎引导
  - 背景信息收集
  - 实时策略建议
  - 情绪安抚与鼓励
- **交互**: 点击展开对话面板，支持语音输入

#### 4.2 场景配置
**必填信息**:
- 谈判主题（贸易协定/领土争端/和平协议等）
- 己方国家/组织
- 对方国家/组织
- 谈判目标（简要描述）

**可选信息**:
- 对方国家历史文化背景
- 对方谈判代表性格特征
- 历史相似案例参考
- 己方底线与筹码

#### 4.3 模拟谈判界面
**左侧面板**: AI对方谈判队
- 动态角色切换（主谈判手/顾问/观察员）
- 实时表情与语气分析
- 语速与态度指示

**中央面板**: 对话区
- 双方对话气泡
- 关键论点高亮
- 实时情绪指示

**右侧面板**: 状态分析
- 当前局势评估
- 己方获利率变化曲线
- 对方态度变化
- 建议行动提示

#### 4.4 表情语气分析
- WebRTC摄像头采集
- 实时微表情识别（紧张/放松/愤怒/怀疑）
- 语速与音量分析
- 置信度指示

#### 4.5 结果分析
- 谈判走向时间线
- 关键决策点回顾
- 获利率变化图
- 改进建议报告
- 相似历史案例对比

#### 4.6 多边谈判功能
**国家数据库（20+国家）**
- 每个国家有独特的**历史文化背景**决定谈判性格
- 5维性格评估：攻击性/灵活性/耐心/风险承受/民族主义
- 核心利益/重要利益/可交易利益分类
- 典型谈判策略和弱点分析

**多边配置 (/multilateral/config)**
- 预设场景快速开始（4种：贸易/安全/气候/制裁）
- 区域筛选选择国家
- 角色分配：你/对手/第三方
- 3种难度模式

**多边谈判界面 (/multilateral/[id])**
- 实时态势图（各方态度可视化）
- 多方对话（3+方同时，每个国家独立AI响应）
- 策略分析面板
- 每个国家独特的回应风格

**难度模式**
| 模式 | 语言 | 辅助 |
|------|------|------|
| 新手 | 通俗易懂 | 术语解释、策略提示 |
| 中等 | 混合 | 适度分析 |
| 专业 | 外交术语 | 历史案例、深度框架 |

**策略系统**
- 高案（理想结果）和底案（最低底线）
- 结果预测（4种情景概率）
- 筹码交换矩阵

### 交互细节
- **输入框**: 支持多行文本，实时字数统计，Ctrl+Enter发送
- **按钮**: 悬停发光，按下反馈，禁止双击重复提交
- **加载状态**: 打字机效果 + 脉冲动画
- **错误处理**: Toast提示 + 重试机制

## 5. Component Inventory

### 核心组件

#### 5.1 AIAssistant
- **状态**: idle | speaking | thinking | waiting
- **动画**: 呼吸光环 + 表情变化
- **声音**: 可选的TTS反馈

#### 5.2 NegotiationBubble
- **类型**: user | opponent | system
- **元素**: 头像、时间戳、内容、情绪标签
- **动画**: 渐入 + 打字机效果（AI回复）

#### 5.3 ConfigForm
- **验证**: 实时校验 + 错误提示
- **进度**: 分步指示器
- **保存**: 自动保存到localStorage

#### 5.4 SentimentGauge
- **类型**: 圆形仪表盘
- **刻度**: -100% ← 0% → +100%
- **颜色**: 红 → 黄 → 绿渐变

#### 5.5 CameraPanel
- **功能**: 实时预览、表情分析结果显示
- **权限**: 明确的权限请求UI
- **降级**: 无摄像头时的文字输入替代

#### 5.6 StrategyHint
- **位置**: 固定在对话区下方
- **内容**: 基于当前局势的策略建议
- **交互**: 可展开/收起

## 6. Technical Approach

### 框架与工具
- **框架**: Next.js 16 (App Router)
- **UI库**: shadcn/ui
- **样式**: Tailwind CSS 4
- **AI集成**: coze-coding-dev-sdk
- **状态管理**: React Context + useReducer
- **表单**: React Hook Form + Zod

### API设计

#### POST /api/chat
模拟谈判对话
```typescript
interface ChatRequest {
  message: string;
  context: NegotiationContext;
  sentiment?: SentimentData;
}
```

#### POST /api/analyze-sentiment
分析表情语气
```typescript
interface SentimentRequest {
  imageData: string; // base64
  audioData?: string; // base64
}
```

#### GET /api/negotiation-scenarios
获取预设谈判场景

#### POST /api/multilateral
多边谈判主对话（用户发送消息，获取所有AI方响应）
```typescript
interface MultilateralRequest {
  sessionId: string;
  userMessage: string;
  context: {
    topic: string;
    countries: Country[];
    userRole: 'user' | 'opponent' | 'third_party';
    history: MultilateralMessage[];
  };
}
```

#### POST /api/multilateral/strategy
多边谈判策略分析
```typescript
interface StrategyRequest {
  sessionId: string;
  context: MultilateralContext;
}
```

### 数据模型
```typescript
interface NegotiationSession {
  id: string;
  topic: string;
  parties: {
    self: Party;
    opponent: Party;
  };
  history: Message[];
  sentimentLog: SentimentEntry[];
  outcomePrediction: number; // -100 to 100
}
```

### AI模型选择
- **主对话**: doubao-seed-2-0-pro-260215 (复杂推理)
- **表情分析**: doubao-seed-1-6-vision-250815 (多模态)
- **战略分析**: deepseek-r1-250528 (深度思考)

### 多边谈判数据模型
```typescript
// 国家类型
interface Country {
  id: string;
  name: string;
  nameEn: string;
  region: string;
  flag: string;
  historyBackground: string;  // 历史文化背景
  personality: {
    aggression: number;       // 攻击性 1-10
    flexibility: number;     // 灵活性 1-10
    patience: number;         // 耐心 1-10
    riskTolerance: number;    // 风险承受 1-10
    nationalism: number;      // 民族主义 1-10
  };
  interests: {
    core: string[];          // 核心利益（不可交易）
    important: string[];     // 重要利益
    negotiable: string[];    // 可交易利益
  };
  strategies: string[];      // 典型谈判策略
  weaknesses: string[];      // 弱点
  responseStyles: {
    opposing: string;        // 对立时回复风格
    cooperating: string;     // 合作时回复风格
    proposing: string;       // 提出方案时回复风格
    neutral: string;         // 中性时回复风格
  };
}

// 多边谈判会话
interface MultilateralSession {
  id: string;
  topic: string;
  topicDetail: string;
  difficulty: 'beginner' | 'intermediate' | 'professional';
  countries: Country[];
  userCountryId: string;
  highGoal: string;          // 高案目标
  bottomLine: string;        // 底案底线
  history: MultilateralMessage[];
  attitudes: Record<string, number>; // 各方态度 -100~100
  outcomePrediction: {
    bestCase: number;        // 最佳情景概率
    goodCase: number;        // 良好情景概率
    neutralCase: number;     // 中性情景概率
    badCase: number;         // 不利情景概率
  };
}
```

## 7. File Structure

```
src/
├── app/
│   ├── page.tsx                    # 首页
│   ├── layout.tsx                  # 根布局
│   ├── configure/
│   │   └── page.tsx                # 场景配置
│   ├── negotiate/
│   │   └── page.tsx                # 模拟谈判
│   ├── analysis/
│   │   └── page.tsx                # 结果分析
│   ├── multilateral/
│   │   ├── config/
│   │   │   └── page.tsx            # 多边配置
│   │   └── [id]/
│   │       └── page.tsx            # 多边谈判
├── components/
│   ├── ai-assistant/
│   │   ├── AIAssistant.tsx
│   │   └── AssistantBubble.tsx
│   ├── negotiation/
│   │   ├── NegotiationBubble.tsx
│   │   ├── NegotiationPanel.tsx
│   │   └── StrategyHint.tsx
│   ├── sentiment/
│   │   ├── CameraPanel.tsx
│   │   └── SentimentGauge.tsx
│   ├── config/
│   │   └── ConfigWizard.tsx
│   └── multilateral/
│       ├── CountrySelector.tsx
│       ├── SituationMap.tsx
│       └── MultilateralPanel.tsx
├── hooks/
│   ├── useNegotiation.ts
│   ├── useMultilateral.ts
│   └── useSentiment.ts
├── lib/
│   ├── api.ts                      # API客户端
│   ├── countries.ts                # 国家数据库
│   ├── multilateral-types.ts       # 多边类型定义
│   └── negotiation-context.ts      # 谈判上下文
└── types/
    └── negotiation.ts
```

## 8. Accessibility

- 所有交互元素可键盘导航
- ARIA标签完整
- 颜色对比度符合WCAG AA标准
- 支持屏幕阅读器
- 减少动画偏好支持 (prefers-reduced-motion)
