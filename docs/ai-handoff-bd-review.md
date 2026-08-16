# BD 逐套校对 AI 交接手册

更新日期：2026-08-16

这是一份可独立使用的续作说明。接手者应以本文件记录的状态为起点，不依赖此前对话记忆。当前目标不是一次性批量补齐 51 套 BD，而是按照清单逐套研究、实现、验证、记录和提交，确保页面上的场景变化来自真实配置，而不是只改变说明文字。

## 1. 接手后先做什么

工作目录：

```text
/Users/linzhiqing/Documents/Codex/2026-07-31/sites-plugin-sites-openai-bundled
```

开始任何修改前依次执行：

```bash
git status --short
git log --oneline -10
npm test
```

必须遵守：

1. 先阅读本文件，再阅读 `docs/bd-content-and-ui-roadmap.md` 和目标 BD 的数据文件。
2. 一次只完整校对一套 BD，一套 BD 一个独立提交；不要通过工厂默认值批量制造虚假的场景差异。
3. 当前内容基准是 Nintendo Switch、简体中文、第 39 赛季、补丁 2.7.8。开始内容研究时先检查 `app/data/season-config.ts`，若赛季基准已经变化，应先单独评估影响。
4. 不要回退或覆盖用户已有的未提交改动。工作区不干净时，只提交本次实际修改的文件和代码块。
5. 已完成的通用视觉、随从纸娃娃和装备框工作只做回归维护，不在 BD 内容提交中顺手重构。
6. 研究资料可能随赛季变化，必须联网核对当前来源。优先使用官方补丁与机制资料，再交叉核对 Icy Veins、Maxroll 等当前构筑资料。

## 2. 当前准确状态

项目共有 51 套 BD。

| 状态 | 数量 | BD |
| --- | ---: | --- |
| 已完整校对 | 3 | `tragoul-nova`、`wastes-rend`、`pony-fist-farm` |
| 部分实装 | 1 | `god-monk` |
| 尚未逐套校对 | 47 | 见路线图第 9 节清单 |
| 仍需完成 | 48 | 1 套部分实装 + 47 套草稿 |

当前工作游标：路线图清单第 4 项 `god-hungering`。

建议后续顺序：

1. `god-hungering`：按清单顺序建立猎魔人第一个完整样板。
2. `god-monk`：把已有两套配装与真实用途、巅峰场景连接起来。
3. 继续按照 `docs/bd-content-and-ui-roadmap.md` 第 9 节顺序逐套推进。

已完成的基础设施：

- `app/data/build-guides.ts` 已提供完整配置、场景 patch、配置解析、真实 diff、巅峰指导、选择策略和评审校验器。
- 通用 BD 详情页已经能根据场景配置切换装备、普通/传奇宝石、技能、被动、卡奈魔方和实战循环。
- `components/items/DiabloItemFrame.tsx` 是装备框统一底层组件。
- 随从装备盘、空槽、技能区和多视口布局已经完成。
- 全站字号/行高 token 与关键视觉回归已经完成。
- 最近一次完整验证为 `npm test` 23 项全部通过。

已知部分实装的真实含义：

- `god-monk` 已有两套显式 `loadouts`，但配装选择没有与用途和巅峰场景建立统一关系，同一配装下的模式仍可能共用相同魔方配置。

最近相关提交：

```text
feat(bd): 完成跑马天拳多场景校对（提交哈希以 git log 为准）
80b78c6 docs(bd): 编写逐套校对 AI 交接手册
37a6c42 feat(bd): 完成荒原旋风痛割多场景校对
09f04ef fix(ui): 校正装备详情宝石与镶孔圆框
2d95d56 feat(follower): 完成随从纸娃娃与多视口布局
f34af94 fix(ui): 按镶孔数量校正装备宝石位置
b695aaf fix(ui): 修复装备框溢出与详情图缩放
2649e84 docs: 标记各阶段完成度与剩余工作
fa5663c refactor(ui): 统一装备框与文字基线
dcf5e20 feat(bd): 完成塔格奥多场景配置校对
8cfbfd0 feat(bd): 建立多场景配置数据契约
```

## 3. 关键代码入口

| 用途 | 文件 |
| --- | --- |
| 总路线、状态和 51 套顺序 | `docs/bd-content-and-ui-roadmap.md` |
| 本次交接状态和执行规范 | `docs/ai-handoff-bd-review.md` |
| 配置、场景、巅峰、选择策略类型 | `app/data/build-guides.ts` |
| 工厂数据生成逻辑 | `app/data/class-build-factory.ts` |
| 当前赛季基准 | `app/data/season-config.ts` |
| 全站 BD 目录 | `app/data/site-catalog.ts` |
| 野蛮人完整参考实现 | `app/data/barbarian-builds.ts` |
| 圣教军与下一套 BD | `app/data/crusader-builds.ts` |
| 武僧与部分实装样板 | `app/data/monk-builds.ts` |
| 死灵法师完整参考实现 | `app/data/necromancer-builds.ts` 与 `app/page.tsx` 中塔格奥数据 |
| 其他职业数据 | `app/data/*-builds.ts` |
| 通用 BD 详情运行时 | `app/page.tsx` |
| 通用装备框 | `components/items/DiabloItemFrame.tsx` |
| 路由和数据回归测试 | `tests/rendered-html.test.mjs` |
| 组件与布局测试 | `tests/components.test.mjs` |

`wastes-rend` 是当前最适合复制结构的参考。它证明了通用详情页可以由 `configurationBase + scenarios` 自动驱动所有主要类别。除非现有 patch 结构确实无法表达目标配置，否则不要为每套 BD 再写一组私有 `resolveGear`、`resolvePowers` 或 `resolveRotation`。

## 4. 什么才算一套 BD 完成

只有同时满足以下条件，才能把 `reviewStatus` 标为 `fully-reviewed`，并在文档中写“已校对”：

1. 已确认该 BD 真正适用的内容；不适用场景有明确的 `not-recommended` 或 `not-applicable` 原因。
2. 每个受支持场景都能解析为完整、合法的 `BuildConfiguration`。
3. 场景间的装备、技能、被动、威能、宝石、词缀或循环变化来自计算后的真实 diff。
4. 配置确实相同时填写 `unchangedReason`，说明为何经过校对后仍保持一致。
5. `paragonGuide` 覆盖 800 点前、800 点后和实战检查点，不能只写泛用的“先体能后主属性”。
6. `choicePolicies` 覆盖核心装备、技能、被动、威能和宝石的 `locked`、`conditional`、`flexible` 判断。
7. 每个可替换项都说明 `when`、`gain`、`cost`、互斥项和适用场景。
8. 所有场景引用的装备、技能、被动、威能和宝石 ID 都存在于该 BD 的基础数据中。
9. 套装联动、装备详情、技能链和实战循环引用的是当前场景实际使用的对象。
10. 每个场景保存资料来源、补丁基准和 `reviewedAt`。
11. `validateReviewedBuildGuide` 无错误，新增的目标路由测试通过。
12. 桌面和手机完成视觉检查，切换场景后页面内容、图片和布局都正确。

只完成其中一部分时，状态保持 `partial`，文档必须分别写明“已完成”和“剩余”。禁止用 `variantCompleteness: "complete"` 代替内容验收。

## 5. 单套 BD 的标准工作流

### 5.1 盘点现状

先定位目标数据、目录项和现有测试：

```bash
rg -n '目标-bd-id|目标中文名' app tests docs
```

列出当前装备、技能、符文、被动、威能、传奇宝石、普通宝石、随从、词缀和循环。打开 `/builds/<id>`，逐一切换现有用途与巅峰控件，确认哪些内容真的变化、哪些只是文案变化。

### 5.2 研究真实构筑

内容研究至少覆盖：

- 官方补丁或赛季机制，确认第 39 赛季额外魔方槽、物品改动和平台差异。
- 主构筑说明，确认核心发动机和不可替换项。
- 装备、技能、威能、宝石和巅峰页面，确认每个槽位与优先级。
- 冲层、速刷、T16、悬赏、敌意幻象等变体，确认它们是否真的共用配置。
- 至少两个来源交叉核对存在争议的槽位；来源冲突时在策略原因中保留判断。

不要凭记忆发明中文物品名或符文名。优先查本地物品库和技能数据，再用官方简体中文名称校正。所有实际采用的网页写入 `sourceRefs`，并记录校对日期。

### 5.3 设计场景

不要强迫所有 BD 都有四个真正不同的场景。当前页面的基础控件仍按 `${mode}-${paragon}` 查找 `push-low`、`push-high`、`speed-low`、`speed-high`；如果目标内容不能被这四格准确表达，应先扩展场景选择 UI 和数据类型，而不是把不同内容硬塞进同一格。

每个 `BuildScenario` 至少填写：

- `id`、`label`、`content`、`paragonBand`。
- `applicability` 与真实原因。
- 配置 `patch` 或经过校对后不变化的 `unchangedReason`。
- `sourceRefs`、补丁基准、`reviewedAt`。

`configurationBase` 必须是一套真实可玩的基准配置。冲层 BD 通常可使用低巅峰冲层；速刷专用 BD 可以使用低巅峰速刷，但 `defaultMode`、`defaultScenarioId` 和页面默认选项必须一致。

### 5.4 实现数据

所有场景可能使用的候选装备、技能、被动、威能和宝石，先加入目标 guide 的基础数组，保证校验器能识别引用 ID。然后依次实现：

1. `BuildConfiguration` 基准配置。
2. `BuildScenario[]` 与精确 patch。
3. `ParagonGuide`。
4. `BuildChoicePolicy[]`。
5. 来源和校对日期。
6. 评审状态与构建时校验。

推荐结构参考 `app/data/barbarian-builds.ts`：

```ts
const REVIEWED_GUIDE: BuildGuide = {
  ...completeBuildGuide(BASE_GUIDE, CURRENT_SEASON.seasonId),
  configurationBase: CONFIGURATION_BASE,
  defaultScenarioId: "push-low",
  scenarios: SCENARIOS,
  paragonGuide: PARAGON_GUIDE,
  choicePolicies: CHOICE_POLICIES,
  reviewStatus: "fully-reviewed",
  variantCompleteness: "complete",
};

const VALIDATION_ERRORS = validateReviewedBuildGuide(REVIEWED_GUIDE);
if (VALIDATION_ERRORS.length > 0) {
  throw new Error(`BD 校验失败：${VALIDATION_ERRORS.join("；")}`);
}
```

对于当前由 `ClassGuideSeed` 生成的 BD，有两种可接受做法：

- 扩展 `ClassGuideSeed`，让完整场景字段被工厂原样传递，但不能因此把其他 seed 自动标为已校对。
- 先调用 `createClassGuide(seed)`，再为目标 BD 合并完整评审字段，并在导出映射中仅替换该目标项。

`completeBuildGuide` 会根据旧的 `powerSets` 或 `loadouts` 推断 `partial`。完整 guide 应在调用之后显式覆盖 `reviewStatus` 和 `variantCompleteness`。迁移完成后，场景配置是运行时事实来源；旧 `powerSets` 只能作为兼容字段，不能与场景威能冲突。

### 5.5 检查运行时行为

完整 guide 的通用详情页应自动切换：

- 装备与镶孔宝石。
- 普通宝石和传奇宝石。
- 主动技能、符文和被动。
- 卡奈魔方威能。
- 词缀提示、套装/装备说明和实战循环。

同时检查：

- 场景中移除当前选中对象后，详情选中状态会回到有效对象。
- 页面不再显示“配置差异待实装”。
- 差异面板写出的变化能在纸娃娃、技能区或威能区实际看到。
- 链接和循环不会指向当前场景已移除的对象。

### 5.6 添加并运行测试

每完成一套 BD，在 `tests/rendered-html.test.mjs` 增加针对性测试，至少覆盖：

- 目标路由能渲染。
- 页面出现完整评审状态、巅峰指导和选择策略。
- 页面不出现“配置差异待实装”。
- 数据文件包含全部计划场景和关键替换对象。
- 数据文件执行 `validateReviewedBuildGuide(目标_GUIDE)`。

测试不能只用正则检查 `fully-reviewed` 字符串；必须同时验证实际渲染和关键场景数据。

完整验证：

```bash
npm test
git diff --check
```

当前基线是 22 项测试。新增一套 BD 的测试后，总数通常应增加；若减少，必须查明原因。

### 5.7 视觉验收

选择未占用端口启动开发服务器：

```bash
npm run dev -- --port 3003
```

至少检查桌面 `1600x1000` 和手机 `390x844`：

1. 逐个切换目标 BD 支持的用途和巅峰组合。
2. 对照记录确认装备名、技能、被动、威能和宝石真的变化。
3. 检查物品图片、品质框、镶孔宝石、详情选中态和链接无误。
4. 检查文字无重叠、无截断，页面没有意外横向溢出。
5. 固定比例纸娃娃在窄屏可以在自己的容器内横向滚动，但不能撑宽整个页面。

修改 UI 时保留桌面和手机截图作为验收依据；仅修改数据时仍需实际打开目标路由检查。

## 6. 已完成：跑马天拳

目标 ID：`pony-fist-farm`（2026-08-16 完成）

研究结论：

- 蓝门（敌意幻象）掉金币且怪物密度与 T16 相近，金币链（金织带 + 囤宝者 + 贪婪之戒）在蓝门照常生效；中文社区共识是跑马天拳“一套装备通刷一切（大米、小米、蓝门、悬赏）”。因此**不扩展 `BuildContent`**，蓝门并入 T16 速刷场景，场景原因写明共用条件。
- 大秘境（≤110 速刷）不掉金币，金币链失效，切回警戒腰带、天鹰减伤和乔丹+全能法戒的精英增伤，宝石用困者/贼神/强者，第 4 槽用焚炉。
- 第 39 赛季第四槽边界：速刷内容精英密集用寅剑（击杀重置冷却）；大秘境用焚炉（稳定精英增伤）；高巅峰尝试接近 110 层可换团结（随从必须戴团结与不死圣物）。
- 高巅峰差异：护甲宝石红宝石→钻石压缩冷却，词缀转向范围伤、移速与拾取。
- 四格场景够用，未扩展场景选择 UI。

四场景 diff（程序化计算，`diffBuildConfigurations`）：

- `speed-low`（基准）：T16 / 蓝门 / 悬赏低巅峰，金币链完整，贼神+囤宝者+迅捷勾玉。
- `speed-high`：传奇宝石、普通宝石、词缀变化（迅捷勾玉→闪电华冠、红宝石→钻石、移速拾取优先）。
- `push-low`：装备、威能、传奇宝石、随从、词缀、循环变化（警戒腰带、天鹰、乔丹+全能、焚炉、困者/贼神/强者、随从不戴贪婪）。
- `push-high`：在 push-low 基础上再换团结与钻石。

验证：`validateReviewedBuildGuide(PONY_REVIEWED_GUIDE)` 通过；`npm test` 23 项全部通过；路由 `/builds/pony-fist-farm` 渲染已逐项校对、巅峰、策略，无“配置差异待实装”；页面 50 张图片资源全部有效。桌面与手机 SSR 检查无布局错误（仅改数据，客户端场景切换由 diff 计算保证）。

## 6.1 下一套：恐惧冰吞

目标 ID：`god-hungering`

主要文件：

- `app/data/demon-hunter-builds.ts`
- `app/data/site-catalog.ts`
- `tests/rendered-html.test.mjs`
- 本文件与 `docs/bd-content-and-ui-roadmap.md`

当前已有内容：

- 恐惧之地战装（Gears of Dreadlands）、杨的反曲弓、维拉的遗赠（箭袋）等基础装备与文案。
- 追踪箭、扫射、蓄势待发、复仇、影轮翻、战术优势等技能。

必须补齐：

- T16、悬赏、蓝门与低层大秘境是否能合并场景的资料判断（高速通用 BD 模板）。
- 每个真实场景的完整装备、技能、被动、威能、宝石、普通宝石、词缀和循环。
- 低/高巅峰的生存、伤害、冷却和移动差异。
- 追踪箭符文、扫射符文与维拉遗赠的相互作用。
- 斯奎特、残影之戒、黄道、灾劫（魔方）等槽位的固定程度和替换条件。
- 第 39 赛季第四魔方槽中灾劫、全能法戒或残影的适用边界。
- 随从在速刷与冲层中的装备区别。

预期结果：

- 目标 guide 通过 `validateReviewedBuildGuide`。
- 路由切换展示真实配置差异。
- `reviewStatus` 为 `fully-reviewed`。
- 剩余 48 套更新为 47 套；下一工作游标更新为路线图第 5 项 `god-monk`。

## 7. 做完后如何记录

每次完成或暂停一套 BD，都必须更新文档，不能只依赖提交消息或聊天记录。

### 7.1 完整完成时

更新 `docs/bd-content-and-ui-roadmap.md`：

- 更新顶部日期。
- 更新阶段 4 的完整、部分和待校对数量。
- 把清单中该 BD 的状态改为“已校对”。
- 在阶段 4 完成记录中写明真实场景差异、资料基准、测试结果和视觉检查结果。
- 写明剩余套数和下一套 ID。

更新本文件第 2 节和第 9 节：

- 移动该 BD 到“已完整校对”。
- 更新完整、部分、草稿和剩余数量。
- 更新当前工作游标、最新测试数量和最新提交。
- 把下一套的专项说明补充到第 6 节，或新增对应小节。

### 7.2 只完成一部分时

不得标记“已校对”。在两份文档中写成：

```text
状态：部分
已完成：具体到类型、场景、组件或测试。
剩余：具体到尚未研究或实现的配置项。
阻塞：若有，写明资料冲突、代码限制或待确认问题。
下一步：接手者可以直接执行的第一个动作。
```

“已完成”不能写模糊的“数据基本补齐”；应写成例如“已完成 T16 低巅峰的装备、威能和宝石 patch，尚未完成悬赏技能差异与高巅峰巅峰策略”。

### 7.3 再次交接时

交接记录至少包含：

- 更新时间与当前工作游标。
- 最新提交哈希和提交主题。
- `git status --short` 是否干净；不干净时逐个列出文件及归属。
- 最近一次 `npm test` 的通过数和失败项。
- 正在运行的开发服务器端口；没有则写“无”。
- 当前 BD 已完成、剩余、阻塞和下一条可执行命令。

## 8. 提交规范

提交前执行：

```bash
git diff --check
git diff --stat
npm test
git status --short
```

只暂存本套 BD 相关文件。提交使用详细中文 Conventional Commit；一套 BD 一个提交，通用类型或 UI 扩展若影响多套 BD，可以先做独立基础提交。

推荐格式：

```text
feat(bd): 完成跑马天拳多场景校对

按第39赛季和2.7.8资料补齐敌意幻象、T16、悬赏与低层大秘境的适用性判断，
将装备、技能、被动、威能、宝石和循环接入完整场景配置。

增加800点前后巅峰指导与固定/条件替换策略，构建时执行评审校验，
并补充目标路由和关键场景回归测试。

同步路线图与AI交接手册，记录已完成内容、剩余48套及下一校对目标。

验证：npm test 全部通过；桌面1600x1000与手机390x844完成场景切换检查。
```

提交后检查：

```bash
git status --short
git log -1 --stat
```

不要修改旧提交，不要使用破坏性 Git 命令，不要把无关改动混入本次提交。

## 9. 持续交接台账

| 顺序 | BD | 状态 | 完成提交 | 已完成 | 剩余/下一步 |
| ---: | --- | --- | --- | --- | --- |
| 1 | `tragoul-nova` | 已校对 | `dcf5e20` | 四场景、巅峰、策略、校验与运行时样板 | 仅回归维护 |
| 2 | `wastes-rend` | 已校对 | `37a6c42` | 四场景与通用详情页全类别切换 | 仅回归维护 |
| 3 | `pony-fist-farm` | 已校对 | `feat(bd): 完成跑马天拳多场景校对` | 四场景、巅峰、策略、校验与金币链建模 | 仅回归维护 |
| 4 | `god-hungering` | 待校对 | 无 | 基础 guide | 下一校对目标，见第 6.1 节 |
| 5 | `god-monk` | 部分 | 尚无完成提交 | 两套显式 `loadouts` | 连接用途、巅峰和完整场景配置 |

其余顺序以 `docs/bd-content-and-ui-roadmap.md` 第 9 节为准。每完成一项，都要更新本台账；不要只修改路线图中的勾选框。

## 10. 禁止事项

- 禁止只改文案、只换一个宝石或威能，就宣称多场景配置完成。
- 禁止批量给工厂 seed 填通用场景并统一标记 `fully-reviewed`。
- 禁止没有巅峰指导、选择策略、来源和校验器就标记完成。
- 禁止把不适用内容伪造成受支持场景。
- 禁止把敌意幻象误当大秘境或小秘境，只为复用现有枚举。
- 禁止让旧 `powerSets`、`loadouts` 与新场景配置同时成为互相冲突的事实来源。
- 禁止凭记忆编造中文名称、符文、数值或赛季机制。
- 禁止只写检查状态字符串的测试，而不验证实际路由和场景对象。
- 禁止顺手重构无关页面、重生成物品索引或替换静态素材。
- 禁止覆盖用户未提交的改动，或使用 `git reset --hard`、`git checkout --` 等破坏性命令。

接手者的第一个具体任务是：从 `app/data/crusader-builds.ts` 的 `pony-fist-farm` 开始，先研究并列出蓝门、T16、悬赏和低层大秘境的逐项真实差异，再决定是否扩展 `BuildContent` 与场景选择 UI。研究结论落入数据和文档后，才进入完整实现。
