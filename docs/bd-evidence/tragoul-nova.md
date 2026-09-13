# 塔格奥死亡新星证据档案

- Build ID：`tragoul-nova`
- 基线：S39 / 2.7.8 / Nintendo Switch / Solo
- 当前证据状态：`source-checked`
- 当前平台状态：`pc-derived`
- 数据来源：人工编写样板
- 发布状态：不可发布；技能与 T16 配置冲突尚未裁决，且缺少 Switch 实测

## 1. 本轮结论

塔格奥死亡新星不是只有“冲层/速刷”两套配置。当前资料明确区分了 GR 冲层、GR 速刷和 T16 小秘境，项目原先把后两者合并是实质性错误。本轮已经把它拆成六个研究场景：奥吉德冲层一项有双源支持，守护者/奥吉德 GR 速刷两项标为 `viable`，守护者过渡冲层和两项 T16 因证据不足或冲突保持 `unverified`。

整体状态仍是 `source-checked`，不能因为部分装备结论已经双源一致就把整套 BD 提升为 `cross-checked`。技能符文、T16 第四魔方槽和 Switch 操作仍未通过。

## 2. 来源登记

| ID | 发布者 | 精确页面 | 更新/访问 | 支持范围 | 裁决 |
| --- | --- | --- | --- | --- | --- |
| `icy-overview` | Icy Veins / Deadset | [Trag'Oul Death Nova build](https://www.icy-veins.com/d3/necromancer-death-nova-build-with-trag-oul) | 2026-06-24 / 2026-09-12 | 构筑身份、GR 冲层基线、存在独立 GR/T16 变体 | 接受，PC 来源 |
| `icy-skills` | Icy Veins / Deadset | [Skills and Runes](https://www.icy-veins.com/d3/trag-oul-death-nova-necromancer-skills-and-runes) | 2026-06-24 / 2026-09-12 | 冲层技能、符文、被动 | 接受，但与第二来源有冲突 |
| `icy-gear` | Icy Veins / Deadset | [Gear, Gems and Paragon](https://www.icy-veins.com/d3/trag-oul-death-nova-necromancer-bis-gear-gems-paragon-points) | 2026-06-24 / 2026-09-12 | 冲层装备、魔方、宝石、词缀和成长检查点 | 接受，PC 来源 |
| `icy-gr-speed` | Icy Veins / Deadset | [Greater Rift Speed Farming](https://www.icy-veins.com/d3/trag-oul-death-nova-necromancer-greater-rift-speed-farming-build) | 2026-06-24 / 2026-09-12 | 独立 GR 速刷、守护者/奥吉德成长方案、强者之灾与斯图亚特 | 接受，页面只称表现合理，不能宣传为最快 |
| `icy-t16` | Icy Veins / Deadset | [Nephalem Rift Speed Farming](https://www.icy-veins.com/d3/trag-oul-death-nova-necromancer-nephalem-rift-speed-farming-build) | 2026-06-24 / 2026-09-12 | T16、金币链、布里格斯、囤宝者与强者 | 有条件接受；页面内部存在技能/第四槽歧义 |
| `d3guides-s39` | d3guides.de / eRnstl | [Trag'Ouls Avatar Todesnova](https://www.d3guides.de/de/build/totenbeschwoerer-tragouls-avatar-todesnova) | 2026-08-23 / 2026-09-12 | S39 冲层骨架、GR 速刷与 T16 变体存在性 | 仅做结论级交叉核对；不整页照抄 |

### 2.1 没有进入证据集的候选来源

- [Maxroll 精确指南 URL](https://maxroll.gg/d3/guides/tragoul-death-nova-necromancer-guide) 已定位，但机器访问被 robots 拒绝，登录浏览器直开也连续超时。本轮没有读到正文，因此不能把“Maxroll 也这样写”记为事实或双源证据；需人工打开并保存字段级摘录后再纳入。
- [DiabloBytes Death Nova](https://diablobytes.com/diablo-iii/builds/death-nova-necromancer/) 被拒绝。页面同时出现塔格奥 `10,000%` 与 `6,250%` 两个倍率，并把双手血潮利刃和副手铁玫瑰同时写成穿戴方案，存在规则上不可能成立的组合。它证明“两个域名”不等于“两个可靠来源”。

## 3. 来源内部与跨来源冲突

### 3.1 Icy Veins T16 页面内部歧义

Icy T16 默认展示的技能栏以吞噬和死亡之力服务转场，没有骨甲；同页 S39 第四槽说明却继续使用轮回镰刀，而该威能要求骨甲生效。页面还提到可改为骨甲并手动施放新星的替代方向，但没有把默认技能、被动与第四槽完整整理成一个无歧义配置。

裁决：两个 T16 场景保留为研究配置，但适用性必须是 `unverified`；完成游戏内装配与循环验证前不可显示为推荐。

### 3.2 Icy Veins 与 d3guides.de 的差异

两站一致支持的范围：五件塔格奥配奥吉德肩腕、戴恩提、葬镰、铁玫瑰、鬼灵面容、克里斯宾、全能法戒；冲层魔方为血潮利刃、导能披肩、皇家华戒和 S39 轮回镰刀；冲层传奇宝石为困者、贼神、受罚者；两站也都存在 GR 速刷和 T16 分支。

两站不一致的范围：多个技能符文；T16 戒指与金币链细节；守护者转奥吉德的具体成长条件。裁决是只把一致字段标为 `cross-checked`，不把整套指南一键升级。

## 4. 场景与用途裁决

| 场景 ID | 用途 | 当前适用性 | 配置结论 | 为什么不是更高状态 |
| --- | --- | --- | --- | --- |
| `push-low` | GR 冲层成长过渡 | `unverified` | 暂存守护者肩腰/护腕过渡骨架 | 精确冲层页只明确给出奥吉德；守护者是从 GR 速刷成长说明外推 |
| `push-high` | GR 冲层 | `supported` | 奥吉德肩腕、戴恩提、导能披肩萃取；困者/贼神/受罚者 | 装备、宝石、魔方双源一致；技能符文与 Switch 操作仍未通过 |
| `gr-speed-low` | GR 速刷 | `viable` | 守护者过渡，斯图亚特萃取，强者替代受罚者 | 资料明确“合理可用”，没有证据称同职业最优 |
| `gr-speed-high` | GR 速刷 | `viable` | 奥吉德与戴恩提，斯图亚特萃取，强者替代受罚者 | 同上；约 2000 巅峰只是参考条件，不是全局硬断点 |
| `speed-low` | T16 小秘境 | `unverified` | 守护者、布里格斯、囤宝者与强者 | Icy 页面第四槽/技能栏歧义，第二来源具体配置不同 |
| `speed-high` | T16 小秘境 | `unverified` | 六件塔格奥、沃兹克、金织带、布里格斯；单人随从带贪婪之戒 | 金币链有 Icy 支持，但第二来源不一致且缺 Switch 实测 |

敌意幻象、悬赏、梦魇回响、地精/外观没有精确用途证据，本轮不创建按钮，也不从 T16 自动外推。

## 5. 已落入代码的字段级证据

当前 `TRAGOUL_EVIDENCE_CLAIMS` 有 10 条结论：5 条已交叉核对，5 条仍是单源或未验证。

| 结论 | 状态 | 来源 |
| --- | --- | --- |
| 冲层核心装备骨架 | `cross-checked` | Icy overview/gear + d3guides.de |
| 冲层技能与符文 | `unverified` | Icy skills 与 d3guides.de 冲突 |
| 冲层四魔方槽 | `cross-checked` | Icy overview/gear + d3guides.de |
| 冲层传奇宝石 | `cross-checked` | Icy gear + d3guides.de |
| 生命、攻速、范围伤检查点 | `single-source` | Icy gear |
| GR 速刷适用性 | `cross-checked` | Icy GR speed + d3guides.de |
| GR 速刷完整成长配置 | `single-source` | 只有 Icy 明确写守护者转奥吉德条件 |
| T16 适用性与完整配置 | `unverified` | 两站存在冲突，Icy 页内也有歧义 |
| T16 传奇宝石 | `cross-checked` | Icy T16 + d3guides.de |
| Switch 操作 | `unverified` | 尚无主机来源或内部实测 |

## 6. 本轮纠正的项目问题

1. 新增真正的 GR 速刷场景，不再把 T16 金币链当成 GR 速刷。
2. T16 传奇宝石改为困者、囤宝者、强者；GR 速刷不携带囤宝者。
3. 单人高配 T16 将贪婪之戒交给随从，玩家第四槽改为斯奎特；避免玩家同时穿戴/萃取错误的金币戒逻辑。
4. 修复详情解析优先级：场景 `configurationBase + patch` 现在优先于旧 `resolveGear/resolvePowers/resolveRotation`，否则按钮虽然切换，展示仍会落回旧四格配置。
5. 低巅峰冲层不再因为“项目里有按钮”而自动获得支持状态。
6. 来源迁入结构化对象，并以结论为单位记录支持、冲突和发布阻塞。

## 7. Nintendo Switch 最小验证单

每个准备提升状态的场景分别记录：

- 角色巅峰、传奇宝石等级、远古件数、卡德山、面板生命与攻速截图。
- 装备、技能、符文、被动、四个魔方槽和随从截图。
- 连续三次完成目标内容，记录层数/难度、用时、死亡和首领所需物理周期。
- 验证鲜血虹吸触发、双分复制、骨甲/轮回镰刀覆盖、克里斯宾强控窗口。
- GR 速刷验证没有金币链，且首领超过 1–2 个物理周期时确实应降层。
- T16 分别实测“吞噬默认栏”和“骨甲+轮回镰刀”方案，裁决第四槽歧义；额外验证金币、囤宝者、金织带、贪婪之戒、布里格斯和沃兹克链路。
- 用手柄记录虹吸朝向、鲜血穿行落点、自动锁定和长时间引导体验。

当前开发环境不能替代实机步骤，所以最高只能推进到 `cross-checked`。

## 8. 验收状态

- [x] 主来源为精确构筑/变体页面
- [x] 第二独立来源按结论核对，而非整页背书
- [x] 记录并拒绝内部矛盾严重的候选来源
- [x] `structuredSources` / `evidenceClaims` 迁入代码
- [x] GR 速刷与 T16 拆分
- [x] Schema、Semantics、Evidence 校验通过
- [x] 未验证场景在 UI 显示文字状态
- [ ] Maxroll 正文人工摘录与页内一致性检查
- [ ] 技能冲突裁决
- [ ] T16 第四槽冲突裁决
- [ ] 成长建议完全改为可观察条件
- [ ] Nintendo Switch 三次功能样本
- [x] 桌面与移动端视觉复核：2026-09-13 在 1280 px 与 390×844 下检查六个用途按钮、证据状态、来源卡片和 T16 场景联动；页面无横向溢出、无缺译、无控制台错误
