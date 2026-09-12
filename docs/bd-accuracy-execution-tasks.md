# BD 准确性整改执行任务

## 1. 执行目标

本任务清单把 [BD 内容准确性审计、资料源评估与验证计划](./bd-accuracy-research-and-validation-plan.md) 转成可连续执行、可独立验收的工作项。最终目标不是让 51 套 BD 都显示“完整”，而是让每一个公开结论都能回答：适用于什么玩法、什么赛季和平台、来自哪里、是否交叉核对、是否经过 Nintendo Switch 验证。

状态约定：

- `TODO`：尚未开始。
- `DOING`：当前正在处理；全清单最多一个工作包处于该状态。
- `DONE`：代码、数据、测试和文档均达到该任务验收条件。
- `BLOCKED`：已尝试安全替代方案，仍需要外部设备、账号或用户决策。
- `DEFERRED`：有意延后，且不阻塞当前质量门。

内容状态与任务状态分开。BD 数据只有经过来源和实机门槛后才能成为 `published`，不能因为任务代码已经合并就自动发布。

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

### B02 扩展适用性 — `TODO`

新增：`recommended`、`viable`、`not-recommended`、`not-applicable`、`unverified`。迁移旧 `supported` 时不得自动变成 `recommended`。

验收：未知与不适用是两个不同状态；UI 和审计均能区分。

### B03 增加证据状态 — `TODO`

新增 `unverified/source-checked/cross-checked/switch-tested/published`，并定义单向升级规则。

验收：工厂不能直接生成 `published`；升级必须满足校验器要求。

### B04 增加平台状态 — `TODO`

新增 `switch-verified/console-sourced/pc-derived/platform-risk`，并记录平台说明。

验收：每套 BD 至少有一个平台状态；PC 来源不能被静默当作 NS 结论。

### B05 结构化来源 — `TODO`

新增 URL、标题、发布者、作者、更新时间、访问时间、赛季、补丁、平台、用途和快照字段。

验收：纯文本不能进入链接字段；分类首页不能满足交叉验证门槛。

### B06 结论级证据 — `TODO`

为装备、技能、宝石、威能、词缀、巅峰和场景适用性建立 `EvidenceClaim`。

验收：可以从任一 UI 结论反查来源，也可以从来源查到受影响字段。

### B07 配置复用 — `TODO`

新增 `configurationId` / `sameAsScenarioId`，允许经过验证的两个用途共用配置。

验收：共用配置显示理由，不制造空 patch 或假差异。

### B08 条件化成长建议 — `TODO`

用可观察条件替代固定 `<2000 / 2000+` 全局轴；保留 800 前四类巅峰顺序。

验收：成长建议包含触发条件、观察方法、变化、收益、代价和证据。

## 5. 工作包 C：G1 自动化与 UI

### C01 拆分四类校验器 — `TODO`

- Schema：对象是否完整、ID 是否存在。
- Semantics：LoD、荆棘、主属性、套装、宝石和内容机制。
- Evidence：来源、声明覆盖、版本、平台、冲突。
- Presentation：按钮、标签、场景可达性和状态展示。

验收：审计报告分别输出四类结果和可发布结论。

### C02 动态用途选择器 — `DONE`

实施：页面从 `guide.scenarios` 生成用途按钮，不再固定渲染 push/speed。

验收：只有冲层的 BD 不出现虚假速刷按钮；切换成长建议不会改变活动类型。

### C03 未验证和不推荐状态 — `TODO`

实施：未验证可查看但不可误认为推荐；不推荐显示原因和同职业替代 BD。

验收：屏幕阅读器、键盘、触控和颜色之外的文字标识均可识别状态。

### C04 来源面板 — `TODO`

实施：显示来源标题、发布者、版本、平台、访问日期和支持的结论；冲突来源并列展示。

验收：不存在无效 `href`，来源点击到精确页面。

### C05 回归测试 — `TODO`

覆盖：动态按钮、默认场景、URL 深链、场景共用、未验证警告、LoD、荆棘、职业主属性、来源 URL、桌面和移动端。

验收：构建、类型检查、数据测试和关键路由测试全部通过。

## 6. 工作包 D：G2 五套试点

每套均执行研究报告中的九步 SOP，并建立 `docs/bd-evidence/<id>.md`。

| 任务 | BD | 验证重点 | 状态 |
| --- | --- | --- | --- |
| D01 | `tragoul-nova` 塔格奥死亡新星 | 人工样板、成长断点、GR/T16 分离、证据迁移 | TODO |
| D02 | `lod-bombardment` 梦遗轰击 | LoD、荆棘、武器宝石、冲层/速刷 | TODO |
| D03 | `zuni-darts` 祖尼玛毒镖 | 宠物、攻速、智力宝石、条件化成长 | TODO |
| D04 | `h90-frenzy` 九十蛮狂乱 | 只有冲层或速刷不推荐的表达 | TODO |
| D05 | `firebird-eb` 火鸟爆炸冲击 | PC/主机分叉、火鸟气旋候选 | TODO |

试点统一验收：精确双源、冲突记录、核心字段 100% 覆盖、自动化全通过、页面 QA 完成。Switch 实机无法由当前开发环境代替时，任务只可到 `cross-checked`，实机项标记 `BLOCKED` 并给出最小验证清单。

## 7. 工作包 E：G3 S39 新手路径

暴雪 S39 七职业海德格赠礼按以下顺序处理：

| 任务 | 职业/BD | 新手交付重点 | 状态 |
| --- | --- | --- | --- |
| E01 | 野蛮人 `wastes-rend` | 两/四/六件过渡、旋风痛割发动机、首个稳定场景 | TODO |
| E02 | 圣教军 `roland-sweep` | 密度回怒、核心盾牌、近战生存 | TODO |
| E03 | 猎魔人 `ue-multishot` | 戒律乘区、杨弓/死者遗物、T16 与 GR 边界 | TODO |
| E04 | 武僧 `raiment-dash` | 千飓真实主技能身份、资源与位移边界 | TODO |
| E05 | 死灵 `rathma-aotd` | 仆从冷却发动机、蚀牙、亡者大军节奏 | TODO |
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

`lod-bombardment`、`zuni-darts`、`h90-frenzy` 已列入试点；`ue-multishot`、`raiment-dash`、`helltooth-garg` 已列入新手批次。

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
| 死灵 | `lod-nova`、`inarius-nova`、`masquerade-spear`、`pestilence-lance`、`lod-corpse-explosion` | TODO |
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

## 11. 当前执行游标

- 当前工作包：B — G1 数据与证据模型。
- 当前任务：B01 完成旧用途值迁移，并继续 B02–B07 的逐套数据迁移。
- 下一批次：完成 Presentation 校验与来源面板后，按 D01 塔格奥样板推进双源和结论级证据。
- 当前已知外部阻塞：Nintendo Switch 实机操作需要设备侧验证；在此之前可以完成代码、双源研究、数据交叉核对和测试。

## 12. 2026-09-12 执行记录

本轮已经完成 G0，并启动 G1 与 D01 的证据档案：

- 51 套 Schema 与现有 Semantics 校验通过，0 套达到 `published`。
- 23 套通用占位已降级，7 套批量魔法师已降级；页面不再把旧 `fully-reviewed` 当成内容准确证明。
- 四套 LoD 已补梦之遗礼；语义规则随后额外发现并修复了唤魔荆棘的武器绿宝石；荆棘武器绿宝石、跨职业力量和统一五钻石现由自动规则拦截。
- 用途按钮改为从每套 `scenarios` 动态生成，URL 使用 `scenario` 深链；旧 `mode/paragon` 只作为迁移兼容层。
- 已增加 Evidence、Platform、Provenance、Applicability、结构化来源与结论证据字段；尚未完成 51 套逐项迁移。
- 已建立 [塔格奥死亡新星证据档案](./bd-evidence/tragoul-nova.md)，当前仍为 `source-checked / pc-derived`，没有冒充双源或 Switch 实测。
- `npm run typecheck` 与 `npm test` 已通过；全量回归为 70 / 70。

当前机器可读基线以 [bd-review-audit.json](./bd-review-audit.json) 为准；全量回归以 `npm test` 与 `npm run audit:bd` 为准。
