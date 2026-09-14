# BD 准确性整改执行任务

更新日期：2026-09-14

> **唯一执行入口**：后续执行模型只需要完整阅读本文件。研究背景保留在其他文档，但任务状态、执行顺序、恢复点、完成定义和续窗规则只在这里维护。不要同时从多份文档猜当前游标。

当前机器可恢复状态：

```text
CURRENT_CURSOR=D05 firebird-eb
CURRENT_ACTION=从 Maxroll 精确详情页开始做来源级校对；主模型已按用户要求停止继续校对
LAST_CLOSED=D04 h90-frenzy（source-checked / platform-risk）
BASELINE=51 total; 20 generic-placeholder; 7 batch-derived; 37 unverified; 13 source-checked; 1 cross-checked; 0 published
VALIDATION=typecheck + test:i18n + build + npm test + audit:bd
BROWSER_QA=当前安全限制下不可使用 localhost:3001；用 SSR 路由测试代替，并明确记录未做交互式 QA
SWITCH_QA=必须由真实 Nintendo Switch 完成；模型不得冒充
```

## 1. 执行目标

本任务清单把 [BD 内容准确性审计、资料源评估与验证计划](./bd-accuracy-research-and-validation-plan.md) 转成可连续执行、可独立验收的工作项。最终目标不是让 51 套 BD 都显示“完整”，而是让每一个公开结论都能回答：适用于什么玩法、什么赛季和平台、来自哪里、是否交叉核对、是否经过 Nintendo Switch 验证。

状态约定：

- `TODO`：尚未开始。
- `DOING`：已有落地进展但尚未满足完整验收；跨包试点可以同时处于该状态，当前执行游标仍只指定一个主任务。
- `SOURCE-CHECKED`：主来源、数据、证据文档和自动化已落地，但仍有第二来源冲突、Maxroll 访问或 Switch 实测阻塞；这是执行模型通常能够独立达到的收口状态。
- `CROSS-CHECKED`：至少两个独立发布者支持核心结论，冲突已逐项裁决，但仍可能等待 Switch。
- `SWITCH-BLOCKED`：来源与代码已收口，只剩真实设备验证；不应继续篡改数据来消除阻塞。
- `DONE`：代码、数据、测试和文档均达到该任务验收条件。
- `BLOCKED`：已尝试安全替代方案，仍需要外部设备、账号或用户决策。
- `DEFERRED`：有意延后，且不阻塞当前质量门。

内容状态与任务状态分开。BD 数据只有经过来源和实机门槛后才能成为 `published`，不能因为任务代码已经合并就自动发布。

### 可直接发给执行模型的提示词

```text
你接手“圣休亚瑞秘典”的 Diablo III BD 准确性校对。工作目录是：
/Users/linzhiqing/Documents/Codex/2026-07-31/sites-plugin-sites-openai-bundled

开始后只需要完整阅读 docs/bd-accuracy-execution-tasks.md；它是任务状态、执行方法和恢复点的唯一事实来源。不要继续阅读旧交接长文来猜进度。

从文档 CURRENT_CURSOR 指向的第一项开始，一次只完成一套 BD。优先把 Maxroll 的精确 BD 详情页作为字段清单和主构筑候选，再用 Blizzard 官方机制/赛季页与至少一个独立构筑来源交叉核对。Maxroll、Icy Veins 或任何网站都不是无条件权威；必须核对赛季、补丁、用途、平台、页面内部一致性和实际规则。自动工具若被 Maxroll robots/WAF 拒绝，只记录访问阻塞，不得使用搜索摘要、分类页、缓存拼接或臆测正文充当证据。

每套必须完整执行本文“单套 BD 机械执行 SOP”：盘点旧数据；建立真实用途矩阵；抄录完整基准和每个真实变体；写 structuredSources 与 EvidenceClaim；删除虚假的高/低巅峰复制；写条件化成长和 Switch 风险；更新证据档案；增加数据与 SSR 路由测试；完成 i18n；运行全部验证；更新本文对应 TODO、统计、执行记录和 CURRENT_CURSOR；最后只提交本套实际改动。Maxroll 中的最小构筑和组队变体先完整记录到证据档案，当前数据模型不能准确表达时不要硬塞进单人场景，留给 B09 的强模型架构验收。不要修改或提交用户已有的 package-lock.json 变更，不要发布网站，不要顺手重构 UI。

状态必须诚实：自动验证通过不等于内容准确；同一发布者的多个页面不算两个独立来源；未做 Switch 实测不能标 switch-tested/published；不能访问 Maxroll 时可停在 SOURCE-CHECKED，并把最小待办写清楚。

每个窗口只处理一套 BD。上下文开始变长时，不要半途切窗：先把当前 BD 的数据、证据、测试、审计和本文状态全部收口并提交，再把 CURRENT_CURSOR 改到下一套。新窗口重新使用这段提示词并只读本文，即可继续。若验证失败，修复后重跑；若确实需要用户设备、账号或选择，保留 BLOCKED/SWITCH-BLOCKED，不要伪造完成。

完成一套后继续下一套，直到本文 TODO 队列清空；最终停止并交给强模型验收。验收前不得自行把来源级结果升级为 published。
```

## 2. 当前质量门

| 质量门 | 状态 | 放行条件 |
| --- | --- | --- |
| G0：停止误导 | DONE | 不再声称 51/51 内容有效；已知致命错误不作为推荐展示；批量配置显式标记未验证 |
| G1：模型可表达真实情况 | DOING | 能表达动态用途、未验证、平台状态、结论级来源与共用配置 |
| G2：五套试点 | TODO | 五种代表机制均完成双源、语义检查、UI 和 Switch 功能记录 |
| G3：S39 新手路径 | TODO | 七职业赠礼套装从刚满 70 到首个稳定场景均可执行 |
| G4：51 套全量可信 | TODO | 所有公开场景证据覆盖 100%，所有平台风险有结论 |
| G5：持续维护 | TODO | 新赛季、来源变化和失效链接能自动产生复核任务 |

## 3. 工作包 A：G0 立即止损

### A01 建立真实状态基线 — `DONE`

实施：

1. 保留原审计统计，但将 `valid` 拆成“结构有效”和“内容可发布”。
2. 统计通用工厂指纹、来源域、用途、适用性和平台状态。
3. 报告中列出导致不可发布的具体原因，不只给总数。

验收：脚本不会再以 `51 fullyReviewed && 51 valid` 作为成功条件；当前仓库应明确报告不可发布项。

### A02 降级 23 套通用工厂 BD — `DONE`

实施：将 `createGenericReviewedGuide()` 改为生成 `draft`、`documented-shared`、`evidenceStatus: unverified`；通用场景不得标记为 `supported`。

验收：23 套不能在页面或审计中显示为已完整校对；每套均显示“配置是待复核占位数据”。

### A03 降级 7 套批量魔法师 BD — `DONE`

实施：保留已有结构和人工说明，但改成 `partial/source-checked`；删除分类首页和内部说明充当来源的做法；精确来源不足的场景设为未验证。

验收：7 套不会因为经过 `completeWizardGuide()` 自动成为 `fully-reviewed`。

### A04 修复四套 LoD 致命宝石错误 — `DONE`

范围：`lod-bombardment`、`lod-rapid-fire`、`lod-wol`、`lod-barrage`。

实施：基准配置必须包含梦之遗礼；在逐套来源未完成前，其他两颗只保留为占位/未验证，不宣称最优。

验收：语义测试保证 LoD/LoN 发动机存在；没有梦之遗礼时构建失败。

### A05 修复梦遗轰击武器绿宝石 — `DONE`

实施：改为荆棘黄宝石并增加荆棘规则。

验收：荆棘构筑使用武器绿宝石时报错；例外必须有显式理由和证据。

### A06 修复跨职业“力量”巅峰 — `DONE`

实施：工厂根据职业写入力量、敏捷或智力；尚未核对的加点继续标记未验证。

验收：猎魔人、武僧、死灵、巫医和法师不再出现错误力量加点；自动测试覆盖七职业映射。

### A07 移除统一高巅峰五钻石结论 — `DONE`

实施：通用工厂不得按 `2000+` 自动改五颗钻石；普通宝石只能来自构筑专属 patch 或条件化成长建议。

验收：智力职业不会再由工厂统一生成高巅峰钻石；祖尼玛毒镖回归测试覆盖该反例。

### A08 页面展示未验证警告 — `DONE`

实施：在标题区、表格视图和来源面板展示证据状态与平台状态；未验证场景不使用“支持/推荐”视觉语义。

验收：用户无需打开文档即可知道数据是否经过来源、交叉和 Switch 验证。

### A09 同步冲突文档 — `DONE`

实施：统一路线图、交接手册、技术债、项目差距、README 的当前数字和定义。

验收：同一提交中所有文档对总数、已验证数、待验证数保持一致。

## 4. 工作包 B：G1 数据与证据模型

### B01 扩展用途枚举 — `DOING`

新增并迁移：`greater-rift-push`、`greater-rift-speed`、`nephalem-rift-t16`、`visions-of-enmity`、`bounty`、`echoing-nightmare`、`goblin-or-cosmetic-farm`。

验收：T16、GR 速刷、悬赏和敌意幻象可以拥有不同配置；旧值有明确迁移函数。

### B02 扩展适用性 — `DOING`

新增：`recommended`、`viable`、`not-recommended`、`not-applicable`、`unverified`。迁移旧 `supported` 时不得自动变成 `recommended`。

验收：未知与不适用是两个不同状态；UI 和审计均能区分。

### B03 增加证据状态 — `DOING`

新增 `unverified/source-checked/cross-checked/switch-tested/published`，并定义单向升级规则。

验收：工厂不能直接生成 `published`；升级必须满足校验器要求。

### B04 增加平台状态 — `DOING`

新增 `switch-verified/console-sourced/pc-derived/platform-risk`，并记录平台说明。

验收：每套 BD 至少有一个平台状态；PC 来源不能被静默当作 NS 结论。

### B05 结构化来源 — `DOING`

新增 URL、标题、发布者、作者、更新时间、访问时间、赛季、补丁、平台、用途和快照字段。

验收：纯文本不能进入链接字段；分类首页不能满足交叉验证门槛。

### B06 结论级证据 — `DOING`

为装备、技能、宝石、威能、词缀、巅峰和场景适用性建立 `EvidenceClaim`。

验收：可以从任一 UI 结论反查来源，也可以从来源查到受影响字段。

### B07 配置复用 — `DONE`

新增 `configurationId` / `sameAsScenarioId`，允许经过验证的两个用途共用配置。

验收：`sameAsScenarioId` 已能解析目标配置并检查无效目标、自引用、循环和共用场景带 patch；梦遗轰击的悬赏与 T16 以同一 `configurationId` 通过回归测试，不制造空 patch 或假差异。

### B08 条件化成长建议 — `DOING`

用可观察条件替代固定 `<2000 / 2000+` 全局轴；保留 800 前四类巅峰顺序。

验收：成长建议包含触发条件、观察方法、变化、收益、代价和证据。

当前进展：塔格奥死亡新星、梦遗死亡新星、拉斯玛亡者大军和九十蛮狂乱已经删除固定 2000 巅峰切线，改用生存、目标层完成度、首领耗时、装备品质、词缀和击杀链条件；其余 BD 仍待逐套迁移。

### B09 最小构筑与组队维度 — `TODO · STRONG-MODEL`

Maxroll 暴露了当前模型缺失的两个高价值内容：刚能启动 BD 的最小构筑，以及单人冲层/速刷之外的组队职能与配置。它们不能继续被塞进现有 `BuildScenario.content` 或旧 `BuildLoadout` 后冒充单人配置。

在强模型完成数据结构与 UI 验收前，弱模型每校对一套都要把以下内容写进证据档案，但不直接创建无法表达的页面按钮：

- 最小可运行装备、可缺失项、第一批赌博/黄装升级目标和从赠礼/普通传奇过渡的顺序。
- 组队用途：经验队、推进队、清怪位、杀王位、辅助位；没有对应角色时明确不适用。
- 每个组队变体相对单人的装备、技能、被动、魔方、宝石、词缀和操作差异。

强模型验收任务：决定使用独立 `BuildStage`、`PartyRole` 与配置复用，还是扩展现有场景模型；避免把“成长阶段 × 活动 × 单人/组队”做成新的笛卡尔积。完成前不得把证据档案中的组队资料静默展示为 Switch 单人推荐。

## 5. 工作包 C：G1 自动化与 UI

### C01 拆分四类校验器 — `DOING`

- Schema：对象是否完整、ID 是否存在。
- Semantics：LoD、荆棘、主属性、套装、宝石和内容机制。
- Evidence：来源、声明覆盖、版本、平台、冲突。
- Presentation：按钮、标签、场景可达性和状态展示。

验收：审计报告分别输出四类结果和可发布结论。

### C02 动态用途选择器 — `DONE`

实施：页面从 `guide.scenarios` 生成用途按钮，不再固定渲染 push/speed。

验收：只有冲层的 BD 不出现虚假速刷按钮；切换成长建议不会改变活动类型。

### C03 未验证和不推荐状态 — `DOING`

实施：未验证可查看但不可误认为推荐；不推荐显示原因和同职业替代 BD。

验收：屏幕阅读器、键盘、触控和颜色之外的文字标识均可识别状态。

### C04 来源面板 — `DOING`

实施：显示来源标题、发布者、版本、平台、访问日期和支持的结论；冲突来源并列展示。

验收：不存在无效 `href`，来源点击到精确页面。

### C05 回归测试 — `DOING`

覆盖：动态按钮、默认场景、URL 深链、场景共用、未验证警告、LoD、荆棘、职业主属性、来源 URL、桌面和移动端。

验收：构建、类型检查、数据测试和关键路由测试全部通过。

## 6. 工作包 D：G2 五套试点

每套均执行研究报告中的九步 SOP，并建立 `docs/bd-evidence/<id>.md`。

| 任务 | BD | 验证重点 | 状态 |
| --- | --- | --- | --- |
| D01 | `tragoul-nova` 塔格奥死亡新星 | 人工样板、成长断点、GR/T16 分离、证据迁移 | DOING；代码与双源试点完成，冲突裁决和 Switch 实测未完成 |
| D02 | `lod-bombardment` 梦遗轰击 | LoD、荆棘、武器宝石、冲层/速刷 | SOURCE-CHECKED；代码、页面与浏览器 QA 完成，来源冲突和 Switch 实测仍阻止 `DONE` |
| D03 | `zuni-darts` 祖尼玛毒镖 | 宠物、攻速、智力宝石、条件化成长 | SOURCE-CHECKED；代码、证据档案与页面 QA 完成，配装冲突和 Switch 实测仍阻止 `DONE` |
| D04 | `h90-frenzy` 九十蛮狂乱 | 验证用途不能由门户标签武断裁决；真实分离冲层、GR 速刷、T16 与悬赏 | SOURCE-CHECKED；数据、证据档案、i18n 与全量自动化已收口，Maxroll、页内冲突和 Switch 待验 |
| D05 | `firebird-eb` 火鸟爆炸冲击 | PC/主机分叉、火鸟气旋候选 | TODO |

试点统一验收：精确双源、冲突记录、核心字段 100% 覆盖、自动化全通过、页面 QA 完成。Switch 实机无法由当前开发环境代替时，任务只可到 `cross-checked`，实机项标记 `BLOCKED` 并给出最小验证清单。

### 用户指定的近期校对优先级

在继续原顺序前，先按以下队列执行；完成第三项后恢复原任务顺序：

| 优先级 | BD | 当前状态 | 下一动作 |
| ---: | --- | --- | --- |
| 1 | `tragoul-nova` 塔格奥死亡新星 | `source-checked`；三用途与条件化成长已落地 | 等待 Maxroll 摘录、冲突裁决和 Switch 实测，不阻挡下一项 |
| 2 | `lod-nova` 梦遗死亡新星 | `source-checked`；两种 GR 用途、字段证据和条件化成长已落地 | 保留来源冲突、页面 QA 与 Switch 阻塞，不阻挡后续 |
| 3 | `rathma-aotd` 拉斯玛亡者大军 | `source-checked`；三用途、触发链和字段证据已落地 | 等待精确配置冲突裁决、Maxroll 摘录和 Switch 实测，不阻挡后续 |
| 4 | `h90-frenzy` 九十蛮狂乱 | `source-checked`；四用途、三套真实配置与条件化宝石已落地 | 等待 Maxroll 摘录、页内冲突裁决和 Switch 实测，不阻挡后续 |
| 后续 | 原执行顺序 | `TODO` | 从 D05 火鸟爆炸冲击继续 |

## 7. 工作包 E：G3 S39 新手路径

暴雪 S39 七职业海德格赠礼按以下顺序处理：

| 任务 | 职业/BD | 新手交付重点 | 状态 |
| --- | --- | --- | --- |
| E01 | 野蛮人 `wastes-rend` | 两/四/六件过渡、旋风痛割发动机、首个稳定场景 | TODO |
| E02 | 圣教军 `roland-sweep` | 密度回怒、核心盾牌、近战生存 | TODO |
| E03 | 猎魔人 `ue-multishot` | 戒律乘区、杨弓/死者遗物、T16 与 GR 边界 | TODO |
| E04 | 武僧 `raiment-dash` | 千飓真实主技能身份、资源与位移边界 | TODO |
| E05 | 死灵 `rathma-aotd` | 仆从冷却发动机、蚀牙、亡者大军节奏 | SOURCE-CHECKED；三用途和装备获取已落地，赛季开荒过渡与 Switch 实测待补 |
| E06 | 巫医 `helltooth-garg` | 死亡之壁、巨尸宠物、速刷适用性 | TODO |
| E07 | 法师 `tal-meteor` | 四系叠层、陨石资源、PC/主机操作 | TODO |

每套验收还需包含：第一件关键散件、赌博与黄装升级顺序、错误远古避坑、刚成型目标、推荐替代 BD。

## 8. 工作包 F：其余逐套复核

### 通用工厂高风险批次

| 职业 | BD | 任务状态 |
| --- | --- | --- |
| 野蛮人 | `earth-leapquake`、`ik-charge` | TODO |
| 圣教军 | `seeker-hammer` | TODO |
| 猎魔人 | `marauder-sentry`、`natalya-trap`、`shadow-impale`、`lod-rapid-fire` | TODO |
| 武僧 | `inna-ally`、`poj-tempest`、`sunwuko-tempest`、`sunwuko-wol`、`lod-wol`、`uliana-palm` | TODO |
| 巫医 | `arachyr-spiders`、`arachyr-chicken`、`jade-harvest`、`lod-barrage` | TODO |

`lod-bombardment`、`zuni-darts`、`h90-frenzy` 已完成来源级实现；`ue-multishot`、`raiment-dash`、`helltooth-garg` 已列入新手批次。

### 魔法师批量复核余项

| BD | 重点 | 状态 |
| --- | --- | --- |
| `lod-meteor` | LoD、资源、第四槽、GR/T16 | TODO |
| `delsere-twister` | 主机气旋机制、地形与范围伤 | TODO |
| `vyr-archon` | 御法者内外循环、冷却断点 | TODO |
| `typhon-hydra` | 宠物攻速、蛇头攻防、速刷 | TODO |
| `lod-orb` | LoD、爆点距离、以太行者 | TODO |

`firebird-eb` 已列入试点；`tal-meteor` 已列入新手批次。

### 其余非通用指纹数据

| 职业 | BD | 状态 |
| --- | --- | --- |
| 野蛮人 | `raekor-boulder`、`ik-hota`、`lod-hota` | TODO |
| 圣教军 | `pony-fist-farm`、`valor-fist`、`valor-fury`、`akkhan-condemn`、`akkhan-phalanx`、`invoker-thorns` | TODO |
| 猎魔人 | `god-hungering` | TODO |
| 武僧 | `god-monk` | TODO |
| 死灵 | `lod-nova` 已完成来源级迁移；`inarius-nova`、`masquerade-spear`、`pestilence-lance`、`lod-corpse-explosion` | `lod-nova` SOURCE-CHECKED；其余 TODO |
| 巫医 | `mundunugu-barrage` | TODO |

塔格奥与拉斯玛已进入前序批次。非通用指纹只表示实现方式不同，不能跳过来源和 Switch 复核。

## 9. 工作包 G：持续维护

| 任务 | 内容 | 状态 |
| --- | --- | --- |
| G01 | 赛季覆盖层与上一季冻结 | TODO |
| G02 | 来源更新时间晚于本项目时自动失效 | TODO |
| G03 | 定期链接检查与归档快照 | TODO |
| G04 | 版本/标题/正文矛盾报警 | TODO |
| G05 | 新赛季受影响字段清单 | TODO |
| G06 | Switch 实测证据索引与过期规则 | TODO |

## 10. 单任务完成定义

任何 BD 任务只有同时满足以下条件才能标记 `DONE`：

1. 用途矩阵完整，未知、不适用和不推荐没有被伪装成支持。
2. 核心装备、技能、符文、被动、威能和宝石有精确来源。
3. 至少两个独立来源核对争议字段；冲突有书面裁决。
4. 赛季、补丁、用途和平台一致。
5. 配置通过 Schema 与 Semantics 校验。
6. 来源通过 Evidence 校验，UI 通过 Presentation 校验。
7. 成长建议使用可观察条件，不只使用固定巅峰数字。
8. Nintendo Switch 风险有明确状态；未实测不得写 `switch-tested`。
9. 桌面和移动端关键路径已检查。
10. 任务状态、证据文档和汇总审计同步更新。

### 10.1 单套 BD 机械执行 SOP

以下顺序不可跳步。弱模型每次只处理一套，当前套完全收口后才移动游标。

1. **保护工作区**：执行 `git status --short`、`git log --oneline -10`。现有 `package-lock.json` 是用户改动，不修改、不暂存、不提交。记录目标 BD 当前数据文件、目录项、测试和证据档案位置。
2. **读取当前基线**：检查 `app/data/season-config.ts` 和 `docs/bd-review-audit.json` 中目标项。不要把旧 `fully-reviewed` 或测试通过当成内容准确。
3. **研究精确页面**：先找 Maxroll 的目标 BD 详情页，并逐节记录构筑总览、最小构筑、单人冲层、GR 速刷、T16/悬赏、组队、装备替代、技能、被动、魔方、宝石、词缀、巅峰、随从和操作。再查 Blizzard 官方赛季/物品机制页，以及 Icy Veins 或 d3guides 的精确变体页。分类首页、搜索摘要和同站多个页面不能冒充独立双源。
4. **建立用途矩阵**：逐项裁决 `greater-rift-push`、`greater-rift-speed`、`nephalem-rift-t16`、`visions-of-enmity`、`bounty`、`echoing-nightmare`、`goblin-or-cosmetic-farm`。只有精确证据支持的用途才创建按钮；真正共用时使用 `sameAsScenarioId`，没有证据时不强凑。
5. **抄录完整配置**：核对 13 个穿戴槽、6 个主动技能/符文、4 个被动、3/4 个魔方槽、3 颗传奇宝石、普通宝石、随从、词缀、获取优先级、最小构筑和操作循环。组队变体还要记录职能与完整差异。当前类型无法无损表达的最小构筑/组队内容先写证据档案并关联 B09，不准硬塞进单人用途。
6. **逐字段留证**：每个实际采用的页面写入 `structuredSources`；每个核心结论写 `EvidenceClaim`，路径必须能反查代码字段。记录来源支持、单源、冲突与裁决理由。相互冲突的整套配置不可拆散后混拼。
7. **成长条件化**：800 前可以写四类巅峰顺序；800 后必须用可观察条件描述“何时换、换什么、收益、代价”。禁止恢复 `push-low/push-high/speed-low/speed-high` 以及“2000+ 自动全白宝石”。
8. **实现与文档**：优先新增 `<build-id>-reviewed.ts` 包装旧基础数据，只替换目标 BD；同步目录摘要、缺失物品/宝石映射、`docs/bd-evidence/<build-id>.md` 和证据索引。不要让工厂自动提升其他 BD。
9. **i18n**：先执行 `node scripts/i18n/collect-messages.mjs`；新增英文必须人工补入 `app/i18n/manual.json`，再重新 collect。需要重建简繁中文时先执行 `swiftc scripts/i18n/convert-chinese.swift -o /tmp/d3-convert-chinese`，再执行 `node scripts/i18n/build-chinese.mjs`。只有确认所有新增英文已手工补齐后，才可运行 `/usr/bin/python3 scripts/i18n/translate-messages.py` 让它以 `Pending prose 0` 重建 `enUS.json`；未经明确授权，不得让该脚本把待翻译文本发送到第三方服务。
10. **针对性测试**：数据测试至少断言场景 ID、用途、适用性、真实替换包、关键不变量和不再出现旧四象限；SSR 路由测试至少断言用途按钮、关键装备/技能/宝石与风险文案。当前禁止使用 `localhost:3001` 做浏览器 QA；明确记录此项未完成。
11. **全量验证**：按顺序运行 `npm run typecheck`、`npm run test:i18n`、`npm run build`、`npm test`、`npm run audit:bd`、`git diff --check`。任一失败都不能更新为收口状态。审计脚本的占位/批量数量只能下降，不能回升。
12. **更新恢复点**：更新本文件顶部基线、对应任务行、当前游标和执行记录；审计 JSON 必须与测试期望一致。只暂存本套文件并提交。上下文过长时必须在这一步后开新窗口，不允许留下半套配置。

### 10.2 Maxroll 的使用原则与访问阻塞

用户的判断基本成立：Maxroll 的单页信息架构通常更贴近本项目需要，能把最小构筑、单人冲层、速度变体、组队、替代装备和操作说明放在同一指南内。因此从 D05 起，**Maxroll 精确 BD 详情页优先作为研究入口和字段完整性清单**。

但“更完整”不自动等于“每个字段更准确”。最终采用规则是：

1. Maxroll 负责提供整套候选方案和变体边界。
2. Blizzard 官方页面负责确认赛季规则、套装和物品机制。
3. Icy Veins、d3guides、当前天梯或可复现实战负责独立核对；只有不同发布者才算双源。
4. 任一来源都要核对更新时间、赛季、补丁、平台和页内一致性。发现旧赛季残段或不可能的装备组合时降低证据等级。
5. 当前自动网页读取器访问 [Maxroll D3 指南列表](https://maxroll.gg/d3/category/guides) 与 [塔格奥死亡新星详情](https://maxroll.gg/d3/guides/tragoul-death-nova-necromancer-guide) 时均收到 `robots.txt blocked / non-retryable`；此前交互浏览器直开还出现连续超时。因此此前“读不到”是采集通道被站点的机器人策略/页面交付链阻断，不是判断 Maxroll 内容差，也不是缺少页面 URL。
6. 允许的处理方式是：使用能正常显示页面的人工浏览器逐字段摘录，或让用户提供页面导出/截图/正文；自动通道仍失败时记录 `MAXROLL_ACCESS_BLOCKED`。禁止绕过 robots/WAF、引用搜索摘要或把“页面存在”写成“正文已核验”。

### 10.3 每套证据档案最小模板

每份 `docs/bd-evidence/<build-id>.md` 至少包含：身份/版本/平台、用途矩阵、最小构筑、每个公开用途的完整配置、组队边界、成长与条件替换、来源表、字段级证据、冲突裁决、自动验证结果、浏览器 QA 状态、Switch 三次功能样本清单。没有组队资料时明确写“未展示/待核验”，不要编造。

## 11. 当前执行游标

- 当前工作包：D — G2 五套试点。
- 当前任务：无。主模型按用户要求停止继续校对，并把机械工作交接给后续执行模型。
- 已完成游标：D04 `h90-frenzy` 已达到 `source-checked / platform-risk`；H90 现为 GR 冲层、GR 速刷、T16、悬赏四用途，悬赏真实复用 T16，旧四象限与固定高巅峰换白已删除。
- 下一恢复点：D05 `firebird-eb` 火鸟爆炸冲击。先验证 PC 与 Switch/主机火鸟气旋分叉，不默认沿用批量魔法师四场景。
- 当前已知外部阻塞：Nintendo Switch 实机操作需要设备侧验证；Maxroll 自动访问受 robots/页面交付限制；当前安全限制禁止使用 `localhost:3001` 做交互式浏览器 QA。

## 12. 2026-09-12 执行记录

本轮已经完成 G0，并启动 G1 与 D01 的证据档案：

- 51 套 Schema 与现有 Semantics 校验通过，0 套达到 `published`。
- 23 套通用占位已降级，7 套批量魔法师已降级；页面不再把旧 `fully-reviewed` 当成内容准确证明。
- 四套 LoD 已补梦之遗礼；语义规则随后额外发现并修复了唤魔荆棘的武器绿宝石；荆棘武器绿宝石、跨职业力量和统一五钻石现由自动规则拦截。
- 用途按钮改为从每套 `scenarios` 动态生成，URL 使用 `scenario` 深链；旧 `mode/paragon` 只作为迁移兼容层。
- 已增加 Evidence、Platform、Provenance、Applicability、结构化来源与结论证据字段；尚未完成 51 套逐项迁移。
- 已建立 [塔格奥死亡新星证据档案](./bd-evidence/tragoul-nova.md)，当前仍为 `source-checked / pc-derived`，没有冒充双源或 Switch 实测。
- `npm run typecheck` 与 `npm test` 已通过；全量回归为 71 / 71。

继续执行 D01 后新增：

- Icy Veins 的精确 GR 速刷页证实塔格奥存在独立 GR speed 变体；项目从四场景改为六场景，GR 速刷和 T16 不再共用“速刷”含义。
- d3guides.de S39 页面只在实际一致的字段上充当第二来源；冲层装备/魔方/宝石和 GR 速刷存在性完成交叉核对。
- Icy T16 页面出现“默认技能栏没有骨甲、S39 第四槽却说明轮回镰刀”的内部歧义；两项 T16 均保持 `unverified`。
- DiabloBytes 候选页因倍率自相矛盾和双手武器+副手的不可能组合被拒绝；证明双源门还必须检查来源质量。
- 塔格奥现有 6 个结构化来源、10 条结论证据，其中 5 条交叉核对、5 条仍未解决；页面显示场景适用性文字和来源元数据。
- 修复场景解析优先级，避免新 `configurationBase + patch` 被旧解析函数覆盖；修复 T16 宝石和单人贪婪之戒位置。
- 2026-09-13 完成桌面 1280 px 与移动端 390×844 视觉验收：六个用途按钮均显示适用性状态，金币链 T16 切换后装备、囤宝者和 URL 同步更新；无横向溢出、缺译或控制台错误。

当前机器可读基线以 [bd-review-audit.json](./bd-review-audit.json) 为准；全量回归以 `npm test` 与 `npm run audit:bd` 为准。

## 13. 2026-09-13 D02 梦遗轰击执行记录

- 建立 [梦遗轰击证据档案](./bd-evidence/lod-bombardment.md)，逐字段记录 Icy 四个精确页面、d3guides 构筑页和 S39 页面；Maxroll 候选页因正文不可读取而没有冒充证据。
- 删除无证据的固定四象限，只保留单人 GR 冲层、T16 普通小秘境和悬赏；悬赏通过 `sameAsScenarioId` 显式复用 T16 配置，没有空 patch。
- 冲层改为杀猪刀 + 阿卡拉特的顿悟，人世无常进魔方；T16/悬赏穿梅塞施密特 + 盾牌并携带天堂之力。校验器会拦截“双手武器 + 副手但缺天堂之力”。
- 传奇宝石改为梦遗 + 博雅斯基 + 受罚者，速刷第三颗换囤宝者；武器黄宝石保留，并修正页面把黄宝石误标成智力的问题。
- 取消 2000 巅峰硬切；防具红/白按实际坚韧决定，5000+ 集结号令保留为同时满足冷却和生存条件的策略。
- 页面不再把散件错误聚合为“梦之遗礼套装联动”，不再展示无证据的 S/A 评级；Nintendo Switch 在没有实测前明确显示“待验证”。
- 场景差异以当前 BD 的单人 GR 冲层配置为基线，不再引用旧的全局四象限模板；T16 与悬赏复用关系在页面和 URL 深链中均可见。
- 2026-09-13 完成桌面 1280 px 与移动端 390×844 浏览器验收：三用途切换、装备/技能/被动/魔方同步、无横向溢出，最新加载页面无控制台错误。

## 14. 2026-09-13 D03 祖尼玛毒镖执行记录

- 建立 [祖尼玛毒镖证据档案](./bd-evidence/zuni-darts.md)，逐字段记录 Icy 四个精确页面、d3guides 构筑与赛季页、Blizzard 三个当前物品/套装页；Maxroll 候选页不可读，未冒充证据。
- 删除无证据的四象限，只保留单人 GR 冲层和 T16 普通小秘境；没有把 T16 金币链改名成 GR 速刷、蓝门或悬赏。
- 纠正旧数据的“全部鬼娃”为最近 10 只，并以 Blizzard 当前物品页解决 Icy 装备页 5 只、技能页 10 只的内部旧文冲突。
- 将误写且会与 The Barber 混淆的“剃头师之匕”改为当前简体客户端名“箭镖匕刃”；移除混入的虫群、虚空之戒、超越之带、奥吉德与克己守心占位包。
- 冲层采用五件祖尼玛 + 皇家华戒、邪毒狂欢、箭镖匕刃、骷髅王肩、拉昆巴、行巫时刻、深渊挖掘裤和无尽之途；T16 独立切换沃兹克、金织带、斯奎特、瑞秋、移动技能与囤宝者。
- 普通宝石默认智力黄宝石，实际护甲不足时逐颗换红宝石；高成长手套智力换范围伤也改为满足攻速档、双暴和生存后的条件策略，不再使用 2000 巅峰硬线。
- 攻速只公开已核验的面板 `> 2.00` / 29 帧入口；更高档位在没有进一步证据和 Switch 实测前不扩写。
- 当前结构化来源 9 个、结论证据 14 条，其中 6 条跨发布者核对、8 条仍为单源或冲突；保持 `source-checked / platform-risk`。
- 2026-09-13 完成桌面 1280 px、移动端 390×844 与英文界面浏览器验收：只显示两个用途，T16 切换后 URL、装备、技能、被动和宝石同步；简中/英文均无横向溢出，英文无中文漏译或待翻译占位，最新页面无控制台错误。
- 浏览器验收发现英文移动端评审头部被长状态文字撑宽，已将窄屏评审头部改为单列并允许状态换行；复验 `clientWidth = scrollWidth = 390`。
- `npm run typecheck`、构建和 74 / 74 项全量测试通过；审计确认 D03 的 Schema、Semantics、Evidence 与 Presentation 均无错误，发布仍被 `source-checked` 证据等级阻止。
- D03 收口当时的审计快照为：51 套中 0 套 `published`、38 套 `unverified`、12 套 `source-checked`、1 套 `cross-checked`，21 套通用工厂占位；当前数字以文首基线为准。

## 15. 2026-09-13 梦遗死亡新星优先校对记录

- 建立 [梦遗死亡新星证据档案](./bd-evidence/lod-nova.md)，登记 Icy 三个精确页面、d3guides 完整构筑、S39 页面和 Blizzard 梦遗/铁玫瑰机制页；未读取的 Maxroll 只保留为候选。
- 删除 `push-low / push-high / speed-low / speed-high` 四象限，改为 `gr-progression` 与 `gr-speed` 两个 `paragonBand: any` 场景；两者均保守标记 `viable`。
- 不再创建 T16、蓝门和悬赏按钮。d3guides 的 T16 属于毒新星完整方案，与 Icy 物理方案差异过大，在没有完整裁决前不混拼。
- 修正头部白宝石、鲜血灌注、护肩非法死亡新星伤、进攻/功能巅峰顺序；普通传奇可启动，远古逐件翻倍，不再写“全远古准入”或 2000 巅峰自动切线。
- 旧寅剑、复仇者、斯图亚特、金织带、贪婪与囤宝者速刷包已从本 BD 运行时数据移除；低层 GR 只做来源明确的受罚者换强者。
- 当前 7 个结构化来源、15 条结论证据，其中 5 条跨发布者核对，10 条仍为单源或冲突；Schema、Semantics、Evidence 校验均无错误。

## 16. 2026-09-13 拉斯玛亡者大军优先校对记录

- 建立 [拉斯玛亡者大军证据档案](./bd-evidence/rathma-aotd.md)，登记 Icy 五个精确页面、d3guides 三个用途页面和 Blizzard 六项赛季/套装/物品机制；未读取的 Maxroll 不计入证据。
- 删除 `push-low / push-high / speed-low / speed-high` 四象限，改为 `gr-push`、`gr-speed`、`t16-rift` 三个 `paragonBand: any` 场景；用途由活动决定，不再由 2000 巅峰标签决定。
- 冲层采用衰老 + 塔格奥蚀牙的完整触发链，修复旧配置“有蚀牙、无诅咒技能”的确定性断链。
- GR 速刷使用鲜血奔行 + 精魂魄身 + 莱莲娜完整最大精魂组合；T16 使用布里格斯、脆弱、亡魂风暴、梅斧、斯图亚特、强者和囤宝者完整包。
- T16 角色继续穿 5 拉斯玛 + 2 克里森，只把全能法戒换布里格斯；删除角色误穿金织带、复仇者护腕和贪婪之戒，后两者改由单人随从发散。
- 官方物品页确认轮回镰刀只增幅次要技能，不能增幅复生类亡者大军；Icy S39 第四槽建议因此判错。Icy 技能页 0.25 秒旧值也被官方 0.50 秒否定。
- 当前 14 个结构化来源、18 条结论证据，其中 9 条跨发布者核对，9 条仍为单源或冲突；Schema、Semantics、Evidence 校验均无错误。
- 自动渲染、简繁中与英文完整性由测试覆盖；交互式浏览器验收受本任务安全策略限制，未冒充已完成，Nintendo Switch 仍待三场景各三次实测。

## 17. 2026-09-14 D04 九十蛮狂乱执行记录

- 建立 [九十蛮狂乱证据档案](./bd-evidence/h90-frenzy.md)，登记 Icy 五个精确构筑/变体页面、d3guides 当前三变体页面、S39 官方公告和五个 Blizzard 机制页；12 个结构化来源支撑 20 条结论证据。
- 研究推翻了原试点假设：Icy 门户只标 H90 冲层，但同一指南维护独立 GR 速刷与 T16/悬赏子页，d3guides 也有三变体。最终只展示有来源的单人 GR 冲层、GR 速刷、T16 和悬赏；敌意幻象没有被自动外推。
- 删除 `push-low / push-high / speed-low / speed-high`，四个用途全部使用 `paragonBand: any`；悬赏通过 `sameAsScenarioId` 复用 T16，避免伪造空差异。
- 冲层使用 5 九十蛮 + 2 奥吉德、无尽之途、力量指环、S39 伊斯特凡对剑与第四槽守誓者；修正旧数据中三个与当前 Icy 技能表不一致的符文。
- GR 速刷独立切换斯奎特、全能、寅剑 + 守誓者、火牛羚和回荡狂怒；T16 独立切换九十蛮肩、深渊挖掘裤、沃兹克、瑞秋、金币链、技能、被动和魔女。
- 护甲普通宝石默认 5 红，只有力量指环与狂乱减伤都正常、坚韧仍阻碍推进时才改白；来源没有 2000 巅峰硬线。双武器继续各用一颗绿宝石。
- Icy GR 速刷页的战吼速查表与正文冲突；d3guides 的冲层槽位、武器、符文和第四槽属于另一整套方案，且普通宝石孔数文字异常。当前不混拼，保持 `source-checked / platform-risk`。
- Maxroll 指南列表和塔格奥详情页在 2026-09-14 再次被自动读取通道明确报告 `robots.txt blocked / non-retryable`；没有把页面存在、搜索摘要或用户评价冒充正文证据。后续改为优先人工摘录 Maxroll 精确页。
- `npm run typecheck`、`npm run test:i18n`、构建、76 项全量测试、`npm run audit:bd` 与 `git diff --check` 全部通过。当前统计为 51 套、20 套通用占位、7 套批量魔法师、37 套 `unverified`、13 套 `source-checked`、1 套 `cross-checked`、0 套 `published`。
- 交互式浏览器 QA 因当前安全限制未做，SSR 路由已覆盖四用途、速刷装备包、条件化白宝石和旧按钮消失；Nintendo Switch 的锁敌、冲锋落点、恐惧触发、随从发散仍待实机。
