# 开发与维护指南

## 1. 环境准备

- Node.js `>= 22.13.0`
- npm，使用仓库内现有 `package-lock.json`
- 不需要本地数据库即可运行当前功能

首次安装：

```bash
npm install
```

本地启动：

```bash
npm run dev -- --port 3001
```

生产构建：

```bash
npm run build
```

完整测试：

```bash
npm test
```

`npm test` 已包含构建步骤，不需要先单独执行 `npm run build`。

## 2. 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev -- --port 3001` | 本地开发服务器 |
| `npm run build` | 生成 vinext/Worker 产物 |
| `npm test` | 构建并运行全部回归测试 |
| `npm run lint` | ESLint 静态检查 |
| `npm run scrape:items` | 全量更新官方物品资料和图标 |
| `npm run db:generate` | 数据库启用后生成 Drizzle 迁移 |

## 3. 目录职责

```text
app/
├── page.tsx                 # 当前全站业务组件与路径分派
├── globals.css              # 当前全站视觉样式
├── layout.tsx               # 全站 HTML、SEO 和社交分享元数据
├── data/                    # BD、职业、剧情和开荒数据
└── <route>/page.tsx         # App Router 路由入口

scripts/
├── scrape-diablo-items.mjs  # 官方物品采集
└── inspect-diablo-item.mjs  # 单件解析检查

public/d3/                   # 所有游戏静态资料和视觉素材
tests/                       # 构建产物与数据回归测试
db/                          # 可选 Drizzle/D1 接口
worker/                      # Cloudflare Worker 入口
build/                       # Sites 构建插件
docs/                        # 中文项目文档
```

## 4. 增加一套 BD

### 4.1 增加目录项

在 `app/data/site-catalog.ts` 的 `BUILD_CATALOG` 中增加 `BuildEntry`：

- 选择稳定且唯一的 `id`。
- `classId` 必须是七职业之一。
- 填写套装、核心技能、用途、难度和列表摘要。
- `image` 优先使用 `/d3/library/skills/` 中的官方技能图标。

### 4.2 增加详情数据

在对应职业文件中增加构筑：

- `barbarian-builds.ts`
- `crusader-builds.ts`
- `demon-hunter-builds.ts`
- `monk-builds.ts`
- `necromancer-builds.ts`
- `witch-doctor-builds.ts`
- `wizard-builds.ts`

使用工厂职业应新增 `ClassGuideSeed`，再通过 `createClassGuide()` 生成 `BuildGuide`。需要高度定制的构筑可以直接提供完整 `BuildGuide` 或扩展 `UnifiedBuildGuide`。

### 4.3 装备数据要求

每件装备必须包含：

1. 稳定 ID、部位、名称和本地图标。
2. 在当前 BD 中承担的职责。
3. 按优先级排列的词缀。
4. 定向获取方式，底材必须具体到游戏物品类型。
5. 必要的避坑说明。
6. 镶嵌宝石（如果该槽位需要）。

装备 ID 最好与物品库 ID 或本地图标文件名可匹配；无法匹配时，在 `OFFICIAL_ITEM_IDS_BY_GUIDE_ID` 中增加显式映射。

### 4.4 配置差异要求

不能只修改标题。冲层/速刷、低/高巅峰存在真实变化时，应明确提供不同装备、威能、词缀、宝石或手法：

- 简单构筑可使用默认 variant 解析。
- 复杂构筑提供 `resolveGear`、`resolvePowers`、`resolveRows`、`resolveRotation`。

完成后手动确认四种组合：

- 冲层 + 低巅峰
- 冲层 + 高巅峰
- 速刷 + 低巅峰
- 速刷 + 高巅峰

### 4.5 联动关系要求

- 每个步骤的 `id` 必须指向真实元素。
- 关系应描述“触发 → 放大/减伤 → 最终结果”，不能只是把物品名字并排。
- 输出手法中的“为什么”应能追溯到同一套装备、技能或威能逻辑。
- 套装物品和皇家华戒关系由页面自动补充，不要重复制造同名节点。

## 5. 修改物品系统

### 5.1 数据层

先修改 `scripts/scrape-diablo-items.mjs`，再用单件缓存验证。不要直接手工批量编辑 `items.json`，否则下一次抓取会覆盖修改。

详见[数据采集与更新](./data-pipeline.md)。

### 5.2 UI 层

物品列表和详情必须复用 `BlizzardItemIcon`。新增属性类型时，应扩展 `OfficialPropertyList`，不要退回到把多行内容拼成一段字符串。

品质视觉规则：

- 普通/制作：棕色纹理与棕灰边框。
- 传奇：橙色纹理与金橙边框。
- 套装：绿色纹理与绿边框。
- 物品图片按原始尺寸居中裁切，不强制拉伸成正方形。

## 6. 修改纸娃娃和 BD UI

纸娃娃装备槽使用精确像素几何，测试会校验头盔、胸甲、腰带、戒指、武器等宽高。修改时注意：

- 不要把槽位改回百分比尺寸。
- 头、肩、手、护腕、鞋允许图片超出槽位；其他部位默认裁切。
- 宝石使用独立 socket 背景和居中定位。
- 选中状态只改变亮度/饱和度，不改变装备框尺寸。
- 词缀反查高亮必须保留装备能出的该属性上限文字。

七职业纸娃娃背景位于 `public/d3/paperdolls`，命名必须符合 `<classId>-female.jpg` 和 `<classId>-male.jpg`。

## 7. 网站设置

`SiteSettingsProvider` 保存每个职业的性别选择。修改设置结构时：

- 升级 `localStorage` key 版本，或为旧数据提供兼容转换。
- 保证缺失职业回退到女性默认值。
- 不要在服务端渲染时直接访问 `window`。

当前 key：`sanctuary-site-settings-v1`。

## 8. 测试规范

修改以下内容时必须同步增加或更新测试：

- 新增/删除 BD 或职业。
- 路由和页面标题。
- 纸娃娃槽位尺寸与位置。
- 宝石、符文、被动、魔方和联动图交互标记。
- 物品数量、分类数量或 Schema。
- 抓取器对嵌套词缀与套装档位的解析。

测试文件：`tests/rendered-html.test.mjs`。

测试通过标准：

```text
npm test
→ build complete
→ tests 通过
→ fail 0
```

## 9. 可选数据库与身份能力

当前不使用数据库。`db/schema.ts` 为空，`.openai/hosting.json` 的 `d1` 和 `r2` 为 `null`。

将来增加收藏、个人配置云同步或编辑后台时：

1. 在 `db/schema.ts` 建表。
2. 在 `.openai/hosting.json` 声明 D1 binding。
3. 使用 `db/index.ts` 的 `getDb()`。
4. 运行 `npm run db:generate` 并检查迁移。
5. 用户相关页面可复用 `app/chatgpt-auth.ts` 的身份读取和跳转助手。

不要为了只读攻略内容启用数据库。

## 10. 常见问题

### 本地 3001 拒绝连接

确认开发服务仍在运行：

```bash
npm run dev -- --port 3001
```

服务启动后终端应显示 `Local: http://localhost:3001/`。

### 页面显示“资料加载中”

检查：

- `public/d3/library/items.json` 是否存在且为合法 JSON。
- 请求路径中的 category 和 id 是否经过正确编码。
- 物品 ID 是否在 JSON 中存在。

### 物品属性少了一段

不要用普通正则直接截取外层 `<ul>`。使用现有平衡标签解析器，并通过单件详情缓存重现。

### 图片框形状错误

检查 `officialItemIconShape()` 的分类集合，以及图片是否为官网原始 64×64、64×128 或大胸甲比例。

### 修改 BD 后切换配置没有变化

确认该构筑是否只有 `variants` 文案，而没有不同的装备/威能解析；必要时实现对应 `resolve*` 函数。

## 11. 提交前检查清单

- 页面没有引用 `.cache` 或开发机绝对路径。
- 新增图片位于 `public/d3` 并使用站内绝对 URL。
- 新 BD 的目录 ID 与详情 ID 一致。
- 四种构筑组合均有合理差异。
- 联动节点 ID 都能找到目标。
- 物品 UI 使用结构化字段。
- `npm test` 全部通过。
- `.openai/hosting.json` 与实际 D1/R2 使用情况一致。

