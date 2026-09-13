# BD 证据档案

这里存放逐套 BD 的研究、冲突裁决与 Nintendo Switch 验证记录。代码能通过结构或语义校验，不代表内容已经可发布；证据档案与 `docs/bd-review-audit.json` 必须同时满足发布门槛。

## 状态升级

`unverified → source-checked → cross-checked → switch-tested → published`

- `source-checked`：核对了精确主来源，但不能把同一发布者的多个页面当作独立双源。
- `cross-checked`：第二发布者与机制检查完成，冲突已有书面裁决。
- `switch-tested`：目标场景在 Nintendo Switch 上完成最小功能验证。
- `published`：核心字段、场景、平台、自动化、页面与独立复核全部通过。

任何状态只能逐套提升。通用工厂和批量补全函数不得提升证据状态。

## 当前档案

| BD | 状态 | 场景 | 结构化来源 | 证据结论 | 发布阻塞 |
| --- | --- | ---: | ---: | ---: | --- |
| [塔格奥死亡新星](./tragoul-nova.md) | `source-checked / pc-derived` | 6 | 6 | 10 | 技能/T16 冲突、Maxroll 正文未读取、Switch 未实测 |
| [梦遗轰击](./lod-bombardment.md) | `source-checked / platform-risk` | 3 | 6 | 14 | 技能/装备/宝石冲突、Maxroll 正文未读取、Switch 未实测 |

## 每套档案必填项

1. 身份、赛季、补丁、平台和单人/组队范围。
2. 用途矩阵；未知、不适用与不推荐必须分开。
3. 核心装备、技能、符文、被动、魔方、传奇宝石和普通宝石的结论级证据。
4. 成长替换的观察条件、收益、代价与证据，不使用全站统一巅峰断点。
5. 来源冲突及裁决过程。
6. Switch 角色基线、三次功能样本和截图/视频文件索引。
7. Schema、Semantics、Evidence、Presentation 与桌面/移动验收。

完整检索和验证步骤见 [BD 内容准确性审计、资料源评估与验证计划](../bd-accuracy-research-and-validation-plan.md#7-单套-bd-的研究与验证-sop)。
