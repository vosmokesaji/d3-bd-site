# 梦遗轰击（`lod-bombardment`）证据档案

## 1. 结论摘要

- 当前状态：`source-checked / platform-risk`。已完成 S39、Patch 2.7.8 的 PC 资料核对、第二发布者对照、代码修正和自动化检查；技能栏、部分装备选择与 Nintendo Switch 实机表现仍未闭环，不能升级为 `published`。
- 真实用途不是固定四象限。当前证据只支持三项：单人 GR 冲层、T16 普通小秘境、悬赏。后两者共用同一个速刷配置；没有建立“GR 速刷”，也没有按 2000 巅峰上下复制两套配置。[Icy 总览](https://www.icy-veins.com/d3/crusader-legacy-of-dreams-bombardment-build)把主构筑定义为单人 GR 推进，[Icy 速刷页](https://www.icy-veins.com/d3/lod-bombardment-crusader-speed-farming-build)只覆盖普通秘境到最高折磨并特别提到悬赏。
- 旧数据不是“装备可能无需变化”，而是存在构筑级错误：冲层直接穿双手人世无常和盾牌，却没有天堂之力；传奇宝石缺博雅斯基的芯片；穿戴/萃取、技能、被动和首饰均与当前精确资料不一致。已改成冲层穿杀猪刀 + 阿卡拉特的顿悟、人世无常进魔方；T16/悬赏穿双手梅塞施密特 + 盾牌并显式携带天堂之力。[Icy 装备页](https://www.icy-veins.com/d3/lod-bombardment-crusader-bis-gear-gems-paragon-points)与[Icy 速刷页](https://www.icy-veins.com/d3/lod-bombardment-crusader-speed-farming-build)分别支持这两套武器包。
- 对用户判断的修正：双手武器和盾牌本身并非绝对不可能。圣教军使用“天堂之力”可以这样装备；旧数据的错误是缺少该被动，同时把冲层应萃取的人世无常直接穿在身上。速刷分支现在保留了合法的双手武器 + 盾牌组合。
- “高巅峰统一换钻石”没有证据。当前资料只说明防具红宝石用于伤害、白宝石用于坚韧，没有给出 2000 巅峰切线；明确的数字条件反而是 5000+ 巅峰、装备冷却齐全且能承担坚韧损失后，才考虑把阿卡拉特勇士改为集结号令。[Icy 装备页](https://www.icy-veins.com/d3/lod-bombardment-crusader-bis-gear-gems-paragon-points)与[Icy 技能页](https://www.icy-veins.com/d3/lod-bombardment-crusader-skills-and-runes)分别给出宝石取舍和高巅峰符文条件。

## 2. 核对范围与版本基线

| 字段 | 本轮范围 |
| --- | --- |
| BD | 圣教军梦之遗礼荆棘轰击 |
| 项目 ID | `lod-bombardment` |
| 赛季 | S39 |
| 补丁 | 2.7.8 |
| 模式 | 单人；多人配置未验证 |
| 来源平台 | PC 网页资料 |
| 目标平台 | Nintendo Switch |
| 访问日期 | 2026-09-13 |

[Icy 的四个精确页面](https://www.icy-veins.com/d3/crusader-legacy-of-dreams-bombardment-build)均显示 2026-06-23 更新并标注 S39 / Patch 2.7.8；[d3guides 构筑页](https://www.d3guides.de/de/build/kreuzritter-ohne-set-bombardement)显示 S39 版本并提供 GR Push、Speed、T16 变体。[d3guides S39 页面](https://www.d3guides.de/de/seasons/39)用于复核赛季主题和第四魔方槽。来源页面更新日期可能继续变化，后续复核必须重新记录访问时间，不能只沿用本文日期。

## 3. 来源登记与可信度

| ID | 来源 | 用途 | 本轮评价 |
| --- | --- | --- | --- |
| `icy-lod-bombardment-overview` | [Icy 总览](https://www.icy-veins.com/d3/crusader-legacy-of-dreams-bombardment-build) | 主用途、快捷配装、传奇宝石、S39 第四槽 | 当前且完整，但与同站技能正文存在技能栏冲突 |
| `icy-lod-bombardment-skills` | [Icy 技能与循环](https://www.icy-veins.com/d3/lod-bombardment-crusader-skills-and-runes) | 技能、符文、循环、冷却和 5000+ 条件 | 对操作解释最细；页面快捷栏和正文不一致 |
| `icy-lod-bombardment-gear` | [Icy 装备、宝石、巅峰](https://www.icy-veins.com/d3/lod-bombardment-crusader-bis-gear-gems-paragon-points) | 冲层装备、词缀、宝石、魔方 | 可作为字段级主来源；正文出现“骷髅法师技能伤”复制残留，不能整页无条件采信 |
| `icy-lod-bombardment-speed` | [Icy 速刷变体](https://www.icy-veins.com/d3/lod-bombardment-crusader-speed-farming-build) | T16、悬赏、金币链、速刷武器和技能 | 清楚限定普通秘境/悬赏；不能据此推导 GR 速刷 |
| `d3guides-lod-bombardment` | [d3guides 构筑页](https://www.d3guides.de/de/build/kreuzritter-ohne-set-bombardement) | 独立发布者交叉核对 | 确认 LoD、博雅斯基、黄宝石、人世无常与全能等核心；完整技能、武器、第三宝石和普通宝石与 Icy 不同 |
| `d3guides-season-39` | [d3guides S39](https://www.d3guides.de/de/seasons/39) | 赛季和第四槽基线 | 只支持赛季层，不支持具体装备结论 |

Maxroll 的候选精确页是 [LoN/LoD Bombardment Crusader Guide](https://maxroll.gg/d3/guides/lon-bombardment-crusader-guide)，但本轮自动化访问无法取得可核对正文，因此没有把搜索摘要、旧缓存或页面存在本身算作证据。后续如可正常读取，应把它加入第二来源裁决，而不是直接替换 Icy。

## 4. Icy Veins 与 Maxroll 的判断

本轮不能得出“Maxroll 一定比 Icy 更好”。更可靠的结论是：网站品牌不能代替字段级校对。

Icy 的优点是当前 S39 页面可访问、主构筑与速刷页分开、操作和条件写得较细；问题是同一发布者内部出现了第五技能冲突、鞋子叙述冲突和明显复制残留。四个 Icy 页面也仍属于同一个发布者，不能算四个独立来源。[技能页](https://www.icy-veins.com/d3/lod-bombardment-crusader-skills-and-runes)、[装备页](https://www.icy-veins.com/d3/lod-bombardment-crusader-bis-gear-gems-paragon-points)和[速刷页](https://www.icy-veins.com/d3/lod-bombardment-crusader-speed-farming-build)共同暴露了这一点。

Maxroll 很适合作为候选独立来源，但本轮无法读取候选页正文，所以不能评价其当前 S39 配装是否更新、是否仍适配第 39 赛季第四槽，也不能用“社区常推荐”替代验证。项目应采用以下来源制度：

1. 官方补丁/赛季说明负责版本和机制变化。
2. 当前赛季的精确构筑页负责具体配置，不接受职业首页、榜单标题或搜索摘要替代正文。
3. 核心结论至少由两个独立发布者交叉；同站多个子页只算一个发布者。
4. 来源冲突按字段记录，不做“整站胜出”的一次性裁决。
5. PC 来源最终要经过 Nintendo Switch 功能实测，才能给主机玩家发布级承诺。

因此，当前项目不应“从 Icy 全量迁到 Maxroll”，而应保留 Icy 作为可用主来源，优先补充可读取的 Maxroll 或其他独立来源，并把两站分歧显式暴露。

## 5. 用途矩阵

| 场景 | 结论 | 配置 | 证据 | 页面行为 |
| --- | --- | --- | --- | --- |
| 单人 GR 冲层 | `supported` | 标准冲层配置 | [Icy 总览](https://www.icy-veins.com/d3/crusader-legacy-of-dreams-bombardment-build)与[d3guides](https://www.d3guides.de/de/build/kreuzritter-ohne-set-bombardement)均列 GR Push | 默认场景 |
| GR 速刷 | 未建立 | 无 | [Icy 速刷页](https://www.icy-veins.com/d3/lod-bombardment-crusader-speed-farming-build)没有覆盖 GR | 不显示按钮，不拿金币链冒充 |
| T16 普通小秘境 | `viable` | 专门速刷配置 | [Icy 速刷页](https://www.icy-veins.com/d3/lod-bombardment-crusader-speed-farming-build)和[d3guides](https://www.d3guides.de/de/build/kreuzritter-ohne-set-bombardement)均提供普通速刷/T16 分支 | 显示“可用非最优” |
| 悬赏 | `viable` | 与 T16 显式共用 | [Icy 速刷页](https://www.icy-veins.com/d3/lod-bombardment-crusader-speed-farming-build)特别强调梅塞施密特带来的移动自由适合悬赏 | 独立用途按钮，共用配置 ID |
| 敌意幻象/蓝门 | 未验证 | 无 | 当前精确来源没有正文结论 | 暂不显示 |
| 回响梦魇 | 未验证 | 无 | 当前精确来源没有正文结论 | 暂不显示 |
| 组队 | 未验证 | 无 | 当前核对范围为单人 | 暂不显示 |

“能进去打”不等于“值得给新手推荐”。T16 与悬赏目前标为 `viable` 而非 `recommended`，因为来源证明它能完成这些活动，却没有证明它比同职业跑马天拳等专用速刷构筑更适合作为新手首选。

## 6. 修正后的配置

### 6.1 单人 GR 冲层

- 装备：李奥瑞克的王冠、唤魔师的重负、天鹰胸甲、岩石护手、力士护腕、宝藏腰带、黑棘的战袍裤、虚幻长靴、地狱火护符、乔丹之石、正义灯笼、杀猪刀、阿卡拉特的顿悟。
- 技能：惩罚/迅捷、火炮轰击/尖刺桶、天谴/聚能强吸、钢铁之肤/反伤之肤、正义律法/凋零之力、阿卡拉特勇士/先知化身。
- 被动：热忱、铁处女、统御者、宝石之力。
- 魔方：人世无常、杨先生的妖法裤、全能法戒、第 39 赛季第四槽焚炉。
- 传奇宝石：梦之遗礼、博雅斯基的芯片、受罚者之灾。
- 普通宝石：头部白宝石；防具默认红宝石，坚韧不足时逐颗换白；武器黄宝石。

以上默认方案采用[Icy 装备页](https://www.icy-veins.com/d3/lod-bombardment-crusader-bis-gear-gems-paragon-points)的完整冲层包。d3guides 对 LoD、博雅斯基、黄宝石、人世无常和全能有独立支持，但其武器、第三传奇宝石、防具槽和第四槽不同，因此这些差异仍保留在冲突表，不伪装成已达成共识。[d3guides 配置](https://www.d3guides.de/de/build/kreuzritter-ohne-set-bombardement)用于交叉核对而不是机械合并。

### 6.2 T16 普通小秘境 / 悬赏

在冲层基底上切换：

- 岩石护手 → 礼赞手套。
- 力士护腕 → 沃兹克臂甲。
- 杀猪刀 → 双手梅塞施密特的劫掠者，盾牌保留。
- 技能切为挑衅/抱头鼠窜、火炮轰击/尖刺桶、天谴/聚能强吸、战马冲锋/马不停蹄、希望律法/天使之翼、阿卡拉特勇士/集结号令。
- 被动切为天堂之力、铁处女、统御者、宝石之力；天堂之力是双手武器和盾牌同时穿戴的合法性条件。
- 魔方切为人世无常、金织带、瑞秋的行窃之戒、第 39 赛季第四槽寅剑。
- 第三传奇宝石切为囤宝者的恩惠；随从增加贪婪之戒，维持金币拾取链。

该分支来自[Icy 速刷页](https://www.icy-veins.com/d3/lod-bombardment-crusader-speed-farming-build)。金币链依赖怪物掉落金币，不得用于大秘境；这也是不能把该页面简称为“GR 速刷”的机制原因。

## 7. 成长与高低巅峰裁决

本 BD 不再生成 `push-low / push-high / speed-low / speed-high` 四份配置。巅峰只是角色资源的一部分，无法单独决定是否换装备、技能或宝石。

| 可观察条件 | 动作 | 收益 | 代价/注意 |
| --- | --- | --- | --- |
| 梦遗等级低、正确传奇件少、远古件不足 | 先用赠礼套装或已成型套装刷资源 | 更快建立稳定产能 | 暂缓转入梦遗轰击 |
| 冷却低于 61%，手动轰击无法稳定压进物理窗 | 优先冷却，保留先知化身 | 循环可执行、岩石护手副作用可控 | 暂缓范围伤或其他上限词缀 |
| 聚怪时被秒、无法活到物理爆发 | 力量巅峰临时转体能，防具红宝石逐颗换白 | 提高有效坚韧 | 损失力量带来的伤害与护甲 |
| 能稳定完成聚怪和爆发 | 保持防具红宝石 | 保留伤害与护甲 | 不需要因为跨过 2000 巅峰自动换白 |
| 5000+ 巅峰、装备冷却齐全、失去先知后仍能存活 | 实测集结号令 | 争取每个物理周期两次手动轰击 | 失去先知化身的额外防线 |

61%+ 冷却与 5000+ 的条件来自[Icy 技能页](https://www.icy-veins.com/d3/lod-bombardment-crusader-skills-and-runes)；红/白宝石的伤害/坚韧取舍来自[Icy 装备页](https://www.icy-veins.com/d3/lod-bombardment-crusader-bis-gear-gems-paragon-points)。这两个数字不能外推成全项目统一规则。

## 8. 证据矩阵与未决冲突

| 结论 | Icy | d3guides | 当前裁决 | 状态 |
| --- | --- | --- | --- | --- |
| 单人 GR 推进为主用途 | 支持 | 支持 | 保留默认 GR 冲层 | `cross-checked` |
| T16 普通速刷可用 | 支持 | 支持 | 标为 `viable`，不宣称最佳 | `cross-checked` |
| 悬赏适用 | 明确支持 | 未单列 | 显示独立用途，共用 T16 配置 | `single-source` |
| LoD + 博雅斯基是核心 | 支持 | 支持 | 固定 | `cross-checked` |
| 武器黄宝石 | 支持 | 支持 | 固定；页面显示为荆棘伤害，不再误标智力 | `cross-checked` |
| 第三传奇宝石 | 受罚者 | 困者 | 默认采用 Icy，等待实测/第三源 | `unverified` |
| 冲层武器组 | 杀猪刀 + 顿悟盾 | 寅剑 + 无形之墙 | 默认采用 Icy 完整专页组合 | `unverified` |
| 防具槽/第四槽 | 妖法裤 + 焚炉 | 岩石护手 + 梅塞施密特 | 默认采用 Icy S39 组合 | `unverified` |
| 冲层第 5 技能 | 快捷栏为盾闪，正文为正义律法 | 希望律法并带战马 | 暂采用解释更完整的正义律法正文 | `unverified` |
| 冲层鞋子 | 装备表为虚幻长靴；速刷正文暗示此前为攀冰者 | 另一套配置 | 暂保虚幻长靴并标注冲突 | `unverified` |
| 防具红/白宝石 | 红伤害、白坚韧 | 全白 | 按生存观察条件逐颗切换 | `unverified` |
| Switch 行为 | 无 | 无 | 等待实机 | `unverified` |

Icy 装备页残留与本构筑无关的“骷髅法师技能伤”文字，这是来源质量的直接反例：[Icy 装备页](https://www.icy-veins.com/d3/lod-bombardment-crusader-bis-gear-gems-paragon-points)可以支持明确字段，但不能由此假设同页所有文字都正确。

## 9. 自动化验证

已加入以下质量门：

1. `sameAsScenarioId` 真实解析共用配置，悬赏不再通过空 patch 假装与 T16 不同。
2. 场景校验检查共用目标不存在、自引用、循环和“既共用又打 patch”。
3. 语义校验检查：穿双手武器并保留副手时必须携带天堂之力。
4. 语义校验继续检查：LoD 构筑必须有梦之遗礼；荆棘构筑不得使用武器绿宝石。
5. 页面遇到 `paragonBand: any` 时保留人工词缀，不再运行旧的低/高巅峰通用改写器。
6. 普通宝石标签按槽位解释：武器黄宝石显示荆棘、头部白宝石显示冷却、防具白宝石显示全抗。
7. 审计断言只出现 `gr-push / t16-rift / bounty` 三个场景，且 T16 与悬赏解析后的差异完全相同。
8. 渲染回归断言三用途按钮、单人 GR 基线、Nintendo Switch“待验证”、无虚构梦遗套装联动、无旧四象限基线和无 GR 速刷入口。
9. 页面不再显示无来源支撑的 S/A 评级；首个状态项直接展示当前场景的适用性结论。

浏览器 QA（2026-09-13）：

- 桌面 1280 px：单人 GR、T16 和悬赏逐一切换；装备、技能、被动、魔方与 URL 同步，无页面横向溢出。
- 移动端 390×844：用途栏与页面宽度一致；装备纸娃娃保持内部布局但被容器约束，无文档级横向溢出。
- 全新页面加载无控制台错误；开发中曾出现的 Provider/HMR 日志来自 i18n 文件重生成时的热更新，重启后的干净页面未复现。
- `npm run typecheck`、生产构建和 74 / 74 项全量测试通过；机器审计中本构筑的 Schema、Semantics、Evidence 与 Presentation 错误均为 0。

执行命令：

```bash
npm run typecheck
npm test
node scripts/audit-bd-review.mjs --write
```

通过这些检查只代表数据结构和已编码规则一致，不代表来源冲突或 Switch 平台问题已经消失。

## 10. Nintendo Switch 最小实测清单

建议创建同一角色的两个军械库配置，使用同一套宝石等级和尽量接近的卡德山，避免混入角色差异。

### 10.1 冲层功能样本

每项至少做 3 次，记录秘境层数、完成时间、死亡次数、首领耗时和视频时间点：

1. 确认杀猪刀 + 顿悟盾能装备，梦遗图标有效，唤魔师肩与黑棘裤没有激活套装奖励。
2. 测试惩罚格挡是否稳定触发顿悟盾缩冷却。
3. 分别使用正义律法/凋零之力与盾闪/神圣裁决，记录生存、聚怪、力士触发和完整循环成功率。
4. 观察宝藏腰带自动轰击与物理全能周期；换层后验证药水校准是否可复现。
5. 比较受罚者与困者的首领阶段和总完成时间，角色、地图和层数尽量配对。
6. 比较虚幻长靴与攀冰者：聚怪穿模、控制风险、死亡和爆发丢失次数。

### 10.2 T16/悬赏功能样本

1. 确认携带天堂之力后，梅塞施密特 + 顿悟盾在 Switch 上可同时装备；卸下被动后应无法维持合法配置。
2. 确认挑衅/抱头鼠窜可触发瑞秋戒移速。
3. 确认普通秘境/悬赏金币可触发囤宝者、金织带，并由随从贪婪之戒扩大拾取范围。
4. 记录战马空档、精英击杀后的寅剑/梅塞施密特冷却、每幕悬赏总时间。
5. 进入大秘境做一次负向检查：金币链不应被当作 GR 速刷方案。

建议证据文件名：

```text
docs/bd-evidence/artifacts/lod-bombardment/
  switch-gr-push-run-01.mp4
  switch-gr-push-run-02.mp4
  switch-gr-push-run-03.mp4
  switch-t16-run-01.mp4
  switch-bounty-act-01.mp4
  results.csv
```

## 11. 发布门槛与下一步

当前唯一审计级发布阻塞为 `evidence:STATUS_SOURCE-CHECKED`，但内容层还有以下实质工作：

1. 读取可验证的 Maxroll 正文或找到第三个当前 S39 独立来源，裁决技能、鞋子、第三宝石和武器/魔方分歧。
2. 完成 Switch 最小实测，保存原始结果而非只写“手感正常”。
3. 核心冲突关闭后把相关 `EvidenceClaim` 升级为 `cross-checked` 或 `switch-tested`。
4. 只有当所有核心结论无 `single-source/unverified`、平台状态为 `switch-verified`、自动化与页面验收全部通过时，才允许升级为 `published`。

在此之前，页面可以展示这套 BD 和来源状态，但不得把它描述成“已完整验证”或向新手承诺所有平台、所有用途都最优。
