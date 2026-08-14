# 数据模型

## 1. 数据来源分层

项目把数据分为三类：

| 类型 | 存放位置 | 维护方式 |
| --- | --- | --- |
| 攻略数据 | `app/data/*.ts` | 人工校对，TypeScript 类型约束 |
| 官方资料镜像 | `public/d3/library/*.json` | Node 抓取脚本生成 |
| 图片与纹理 | `public/d3/**` | 官网下载或人工校对后本地保存 |

攻略数据回答“这件东西在 BD 中为什么有用”，官方资料回答“游戏里的原始物品是什么”。两者通过稳定 ID、图片文件名和少量映射表关联。

## 2. BD 目录模型

`app/data/site-catalog.ts` 中的 `BuildEntry` 用于列表页：

```ts
type BuildEntry = {
  id: string;
  classId: ClassId;
  name: string;
  set: string;
  core: string;
  image: string;
  role: "冲层" | "速刷" | "通用";
  difficulty: "低" | "中" | "高";
  summary: string;
  complete?: boolean;
};
```

`id` 同时是详情页 URL，例如 `tragoul-nova` 对应 `/builds/tragoul-nova`。新增构筑时，目录 ID 和职业模块中的 `BuildGuide.id` 必须完全一致。

## 3. BD 详情模型

`BuildGuide` 是统一详情页的输入：

```ts
type BuildGuide = {
  id: string;
  name: string;
  set: string;
  core: string;
  summary: string;
  difficulty: string;
  follower: "魔女" | "盗贼" | "圣殿骑士";
  followerReason: string;
  gear: GuideGear[];
  skills: GuideAbility[];
  passives: GuideAbility[];
  powers: GuidePower[];
  variants: Record<"push" | "speed" | "low" | "high", Variant>;
  variantProfiles: Record<"push-low" | "push-high" | "speed-low" | "speed-high", BuildVariantProfile>;
  variantCompleteness: "complete" | "documented-shared";
  seasonId: string;
  links: GuideLink[];
  rotation: RotationStep[];
  source: string;
};
```

### 3.1 装备

```ts
type GuideGear = {
  id: string;
  slot: string;
  name: string;
  image: string;
  quality: "set" | "legendary";
  effect: string;
  affixes: string[];
  acquisition: string[];
  warning?: string;
  gem?: { name: string; image: string };
};
```

- `effect`：该物品在本构筑中的职责，不应复制官方原特效。
- `affixes`：按优先级排列，数组第一项最重要。
- `acquisition`：必须写清黄装底材、血岩赌博部位、套装转换等定向方式。
- `warning`：记录常见误区，例如“圣教军盾”和普通盾牌属于不同升级池。
- `gem`：直接镶嵌显示在装备槽中。

### 3.2 技能与被动

```ts
type GuideAbility = {
  id: string;
  name: string;
  rune?: string;
  image: string;
  logic: string;
};
```

主动技能和被动共用结构。`id` 是联动图引用键，`logic` 说明该技能为何参与构筑，而不是只写游戏说明。

### 3.3 卡奈魔方

```ts
type GuidePower = {
  id: string;
  slot: string;
  name: string;
  image: string;
  effect: string;
  logic: string;
  acquisition: string;
};
```

`effect` 保存原始威能说明，`logic` 保存一句话构筑解释。

### 3.4 联动关系

```ts
type GuideLink = {
  title: string;
  category: "damage" | "defense" | "resource" | "movement";
  steps: { id: string; label: string; detail: string }[];
  conclusion: string;
};
```

`steps[].id` 必须引用现有装备、技能、被动或威能 ID。统一详情页会以 ID 建立同一条关系链，并在周围模块同步高亮。套装联动和皇家华戒关系由装备集自动补充。

### 3.5 配置差异

当前 `variants` 保存四种基础说明，`variantProfiles` 是兼容现有页面的过渡结构：

- `push`：大秘境冲层。
- `speed`：T16 或低层速刷。
- `low`：低巅峰配置。
- `high`：高巅峰配置。

每个 profile 包含 `gearOverrides`、`powerOverrides`、`skillOverrides`、`statPriorities`、`rotationOverrides` 和 `differenceReason`。只有经过人工校对并提供实际解析数据时，这些字段才能代表真实配置。复杂构筑还可提供：

- `resolveGear(mode, paragon)`
- `resolvePowers(mode, paragon)`
- `resolveRows(mode)`
- `resolveRotation(mode)`

没有定制数据时，`variantCompleteness` 为 `documented-shared`，页面继续使用同一套装备并提示差异待实装。后续将按 [BD 内容与界面重构路线](./bd-content-and-ui-roadmap.md) 迁移到真实玩法场景、完整配置、巅峰指导和可替换项模型。

## 4. 物品记录 Schema V3

`public/d3/library/items/detail/<id>.json` 的每条记录包含 `schemaVersion: 3`。核心结构如下：

```ts
type OfficialItem = {
  schemaVersion: 3;
  id: string;
  name: string;
  category: string;
  categoryName: string;
  group: "armor" | "weapons" | "other";
  quality: "common" | "crafted" | "legendary" | "set";
  crafted: boolean;
  requiredLevel: number | null;
  type: string;
  slot?: string;
  classes: string[];
  followers: string[];
  artisans: string[];
  armorWeapon?: string;
  properties: ItemProperties;
  legendaryPower?: string;
  set?: ItemSet;
  extras: string[];
  flavor?: string;
  imageSource: string;
  image: string;
  source: string;
};
```

### 4.1 属性分区

```ts
type ItemProperties = {
  primary: PropertyNode[];
  secondary: PropertyNode[];
  other: PropertyNode[];
};

type PropertyNode = Property | Choice;

type Property = {
  kind: "property";
  icon: "bullet" | "utility" | "none";
  text: string;
};

type Choice = {
  kind: "choice";
  count: number | null;
  label: string;
  options: Property[];
};
```

`choice.count` 表示官网列出的候选项数量。例如“7 魔法属性之一”的 `count` 是 7，`options.length` 也应为 7；它不表示同时选择七条。

### 4.2 套装结构

```ts
type ItemSet = {
  name: string | null;
  items: {
    id: string;
    name: string;
    source: string;
    current: boolean;
  }[];
  bonuses: {
    pieces: number;
    lines: Property[];
  }[];
};
```

- `items` 保存完整套装清单。
- 详情页当前物品必须恰好有一个 `current: true`。
- `bonuses` 按所需件数分档，每个效果单独保存为一行。
- 相同件数在官网出现多段时，抓取器会合并为同一档。

套装设计图可能具有 `quality: "set"`，但不是实际套装部件，因此没有 `set.items`。

## 5. 物品分类模型

`item-categories.json` 每条记录包含：

- 分类 ID、繁中名称和 `armor/weapons/other` 分组。
- 可用职业、追随者、工匠 ID。
- 对应简体中文显示名数组。
- 分类物品数量和官方来源 URL。

目录页利用这些字段完成职业、随从与工匠筛选，不需要扫描全部物品记录。

## 6. 其他资料 JSON

- `classes.json`：7 个职业资料。
- `skills.json`：163 个主动技能和 131 个被动技能，共 294 条。
- `gems.json`：177 条普通、传奇和等级变体宝石资料。
- `manifest.json`：生成时间、语言、来源和资料数量摘要。

目前页面主要直接消费物品 JSON；技能与宝石 JSON 更多承担素材索引和后续资料页扩展用途。

## 7. ID 规范

- BD ID：小写英文短横线，例如 `tal-meteor`。
- 攻略元素 ID：在同一 BD 内唯一，并可被联动图引用。
- 官方物品 ID：优先保留暴雪 URL 中的 ID，不能随意翻译或改写。
- 图片：官方资料统一使用 `/d3/library/items/<slug>.png` 或 `/d3/library/skills/<slug>.png`。
- 纸娃娃：`/d3/paperdolls/<classId>-<female|male>.jpg`。

修改 ID 会影响路由、联动、高亮和官方物品匹配，应视为数据迁移，而不是普通文案修改。
