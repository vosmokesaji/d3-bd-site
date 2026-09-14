# 拉斯玛亡者大军证据档案

- Build ID：`rathma-aotd`
- 基线：S39 / 2.7.8 / Nintendo Switch / Solo
- 当前证据状态：`source-checked`
- 当前平台状态：`platform-risk`
- 数据来源：人工逐字段校对
- 发布状态：不可发布；精确技能/宝石分歧、资料页内部错误、Maxroll 正文缺失和 Switch 实测尚未关闭

## 1. 本轮结论

用户关于“批量 BD 强行凑速刷、冲层、高低巅峰”的怀疑在这套上成立。旧数据不是简单地“高巅峰不需要换装备”，而是同时存在四类问题：

1. 把同一套内容复制为 `push-low`、`push-high`、`speed-low`、`speed-high`，但来源没有给 2000 巅峰硬分界。
2. 冲层第四魔方槽写塔格奥的蚀牙，技能栏却没有稳定诅咒；蚀牙只增伤受诅咒目标，触发链断裂。
3. T16 把金织带、复仇者护腕和贪婪之戒一起穿到角色身上，拆掉 5 拉斯玛 + 2 克里森骨架；当前单人资料实际让贪婪与复仇者从随从发散，角色只换布里格斯。
4. 速刷变化按“高/低巅峰”分配寅剑、梅斧或斯图亚特，没有完整技能、被动、宝石和魔方联动证据。

这套 BD 的确比梦遗新星更“通用”，但原因是两个独立资料站都提供了三个真实用途，而不是每套 BD 天生都应有四象限：

1. `gr-push`：单人 GR 冲层。
2. `gr-speed`：GR 速刷。
3. `t16-rift`：T16 普通小秘境速刷。

三者全部使用 `paragonBand: any`。成长强弱由巅峰、装备质量和实战瓶颈处理；活动切换由完整配置处理，两条轴不再混为一谈。

## 2. 已修正的确定性问题

| 旧数据 | 问题 | 当前裁决 |
| --- | --- | --- |
| 冲层使用塔格奥蚀牙，但无诅咒技能 | 官方蚀牙只对受诅咒目标增伤；随从偶发诅咒不能视为稳定覆盖 | 冲层技能栏加入主动衰老，与蚀牙绑定 |
| 低/高巅峰各一份冲层 | 两个来源都没有 2000 巅峰换整套配置的硬线 | 合并为 `gr-push / any` |
| 低/高巅峰各一份 T16 | T16 的配置差异来自活动目标，不来自巅峰标签 | 合并为 `t16-rift / any` |
| T16 角色穿金织带、复仇者、贪婪 | 会拆掉当前 5+2；Icy 单人表和 d3guides 当前表均保留 5+2、角色穿布里格斯 | 删除三件角色穿戴；复仇者与贪婪由随从发散 |
| T16 只换少数装备和一颗宝石 | 缺少脆弱聚怪、亡魂风暴、击杀减冷却、移速和被动链 | 一次切换技能、被动、第二戒、两条威能和两颗宝石 |
| GR 速刷继续使用蚀牙但移除诅咒 | 再次形成空威能 | 使用精魂魄身 + 莱莲娜的影魂钩完整最大精魂组合 |
| Icy S39 推荐轮回镰刀 | 官方说明只增幅次要技能；亡者大军属于复生技能 | 明确判为不可用，不进入任何拉斯玛场景 |
| Icy 技能页写二件减冷却 0.25 秒 | 官方当前套装页和 d3guides 当前页均为 0.50 秒 | 数值以 Blizzard 官方 0.50 秒为准 |

## 3. 来源登记

### 3.1 构筑来源

| ID | 发布者 | 页面 | 读取内容 | 裁决 |
| --- | --- | --- | --- | --- |
| `icy-rathma-overview` | Icy Veins / Deadset | [Rathma Army of the Dead](https://www.icy-veins.com/d3/necromancer-rathma-army-of-the-dead-build) | 单人冲层、GR 速刷、普通小秘境用途标签 | 接受用途范围 |
| `icy-rathma-skills` | Icy Veins / Deadset | [Skills and Runes](https://www.icy-veins.com/d3/rathma-army-of-the-dead-necromancer-skills-and-runes) | 主技能栏、被动、操作循环 | 作为完整方案 A；0.25 秒套装文字判旧 |
| `icy-rathma-gear` | Icy Veins / Deadset | [Gear, Gems and Paragon](https://www.icy-veins.com/d3/rathma-army-of-the-dead-necromancer-bis-gear-gems-paragon-points) | 5+2、杰瑟斯、词缀、宝石、巅峰、魔女、魔方 | 装备与成长主来源；S39 轮回镰刀判错 |
| `icy-rathma-gr-speed` | Icy Veins / Deadset | [Greater Rift Speed Farming](https://www.icy-veins.com/d3/rathma-army-of-the-dead-necromancer-greater-rift-speed-farming-build) | GR 速刷专页 | 接受用途；第四槽错误不接受 |
| `icy-rathma-t16` | Icy Veins / Deadset | [Nephalem Rift Speed Farming](https://www.icy-veins.com/d3/rathma-army-of-the-dead-necromancer-nephalem-rift-speed-farming-build) | 布里格斯、脆弱光环、亡魂风暴、梅斧、斯图亚特、随从发散 | 与第二来源共同确定 T16 核心包 |
| `d3guides-rathma-push` | d3guides.de / eRnstl | [GR Push](https://www.d3guides.de/en/build/necromancer-bones-of-rathma-army-of-the-dead) | 六技能、四被动、四槽、宝石和装备完整表 | 当前选定的冲层配置 |
| `d3guides-rathma-speed` | d3guides.de / eRnstl | [Speed Farming](https://www.d3guides.de/en/build/necromancer-bones-of-rathma-army-of-the-dead?v=speed) | 鲜血奔行、最大精魂被动与莱莲娜 | 当前选定的 GR 速刷配置 |
| `d3guides-rathma-t16` | d3guides.de / eRnstl | [Torment 16](https://www.d3guides.de/en/build/necromancer-bones-of-rathma-army-of-the-dead?v=t16) | 布里格斯、脆弱、亡魂风暴、梅斧、斯图亚特、强者与囤宝者 | 当前选定的 T16 配置 |

Icy 页面头部“最后更新”年份与 S39 更新记录并不稳定一致，d3guides 查询变体页底部的“configuration”摘要也会重复冲层内容。因此两站都只按实际读到的字段表登记，不能把整页标题或更新徽标直接升级成全表可信。

### 3.2 官方机制来源

| ID | 页面 | 结论 |
| --- | --- | --- |
| `blizzard-season-39` | [Season 39: Shades of the Nephalem](https://news.blizzard.com/en-gb/article/24287549/season-39-shades-of-the-nephalem-now-live) | 第 39 赛季开放不受物品类型限制的第四魔方槽 |
| `blizzard-rathma` | [Bones of Rathma](https://us.diablo3.blizzard.com/en-us/item/rathmas-ossified-sabatons-P6_Necro_Set_1_Boots) | 永久仆从每次造成伤害减大军冷却 0.50 秒；六件按仆从数增伤 |
| `blizzard-jesseth` | [Jesseth Arms](https://us.diablo3.blizzard.com/en-us/item/jesseth-skullshield-P6_Unique_Shield_01) | 号令骸骨攻击目标后，全体仆从获得 400% 增伤 |
| `blizzard-funerary` | [Funerary Pick](https://us.diablo3.blizzard.com/en-us/item/funerary-pick-P74_Unique_Scythe1H_01) | 虹吸扩散目标承伤、单体加倍；力量转移可扩展到全部技能 |
| `blizzard-corroded` | [Trag'Oul's Corroded Fang](https://us.diablo3.blizzard.com/en-us/item/tragouls-corroded-fang-P6_Unique_Scythe1H_02) | 额外增伤要求目标已受诅咒 |
| `blizzard-cycle` | [Scythe of the Cycle](https://us.diablo3.blizzard.com/en-us/item/scythe-1h/) | 只提高次要技能伤害；不能把亡者大军当受益技能 |

### 3.3 未进入证据集的 Maxroll

[Maxroll Rathma Army of the Dead](https://maxroll.gg/d3/guides/rathma-army-of-the-dead-necromancer-guide) 的精确 URL 已定位，但自动访问被 robots 拒绝，本轮没有读到正文，因此：

- 不能说 Maxroll 当前配置与任一方案相同。
- 不能把搜索摘要、旧记忆或 URL 本身算作第二来源。
- 也不能据此简单宣称“Maxroll 一定比 Icy 更好”。本轮可证明的是 Icy 存在两个明确错误，所以任何站点都必须字段级交叉验证。

## 4. 来源冲突与选择

### 4.1 Icy 的优点与明确错误

Icy 在这套上的优点是：用途分得清楚，5+2 装备、断点、词缀、巅峰和随从解释很完整，T16 页面也说明了单人与组队的装备差别。

但不能整页照抄：

- S39 第四槽写轮回镰刀，并声称能给亡者大军增加乘区；官方物品说明只覆盖次要技能，这是机制上不可能生效的推荐。
- 技能正文仍把拉斯玛二件写成每次 0.25 秒，而官方当前页为 0.50 秒。
- 装备宝石段还残留“挥舞死亡镰刀”的描述，与当前快捷栏鲜血虹吸不一致。

所以对“icy-veins 靠不靠谱”的更精确回答是：它适合作为结构清晰的主参考，但不是权威数据源，更不能因页面标了 S39 就跳过触发链和官方机制检查。

### 4.2 为什么当前精确配置选 d3guides

d3guides 当前冲层表中的塔格奥蚀牙有主动衰老触发；GR 速刷移除诅咒后，同时改精魂魄身与莱莲娜；T16 又完整改为布里格斯、脆弱、亡魂风暴、梅斧、斯图亚特和对应宝石。三套配置在“技能触发威能”这一层没有旧项目的断链。

这不等于 d3guides 整站更可靠。它的查询变体页也有重复旧摘要，Icy 与它的冲层符文、第四被动和第三宝石并不一致。当前做法是选择一套完整配置作为 UI 基线，并把所有不一致字段保持 `unverified`，而不是把两站看起来最强的单件拼在一起。

### 4.3 仍未解决的完整配置差异

| 字段 | Icy 当前主方案 | d3guides 当前冲层 | 状态 |
| --- | --- | --- | --- |
| 鲜血虹吸 | 力量转移 | 纯净精魂 | 未解决 |
| 号令骸骨 | 狂怒者 | 杀戮命令 | 未解决 |
| 骨甲 | 白骨脱臼 | 限制免疫 | 未解决 |
| 亡者大军 | 死亡之谷 | 死寒大军 | 未解决 |
| 第六技能 | 鲜血奔行 | 衰老 | 当前为保证蚀牙闭环选衰老 |
| 亡魂复生 | 亡魂护体 | 炼狱 | 未解决 |
| 第四被动 | 死僵灾疫 | 弱点加深 | 未解决 |
| 第三宝石 | 迅捷勾玉 + 贼神进攻组合，转煞可替代贼神 | 贼神 + 转煞 | 当前选转煞容错；未交叉一致 |
| 第四魔方槽 | 轮回镰刀 | 塔格奥蚀牙 | 官方机制否定轮回镰刀，当前选蚀牙 |

## 5. 用途矩阵

| 内容 | 状态 | 是否显示 | 依据与边界 |
| --- | --- | --- | --- |
| 单人 GR 冲层 | `supported` | 是 | 两站都明确支持；精确技能采用 d3guides 闭环配置 |
| GR 速刷 | `supported` | 是 | 两站均有用途证据；精确配置采用最大精魂 + 莱莲娜组合 |
| T16 普通小秘境 | `supported` | 是 | 两站核心包一致；角色保留 5+2，贪婪/复仇者从随从发散 |
| 敌意幻象 | `unverified` | 否 | 没有独立配置，不能从 T16 自动外推 |
| 悬赏 | `unverified` | 否 | 没有路线、Boss 单体和长距离移动验证 |
| 梦魇回响 | `unverified` | 否 | 没有精确用途来源 |
| 地精/外观农场 | `not-recommended` | 否 | 没有来源支持，且需先建立永久仆从，不应替代专门跑图 BD |

## 6. 当前三个完整配置

三个场景共同装备：5 件拉斯玛、克里森腰带与裤子、希雷娜的羁绊、斯奎特、克里斯宾、杰瑟斯骨镰与骨盾；华戒使拉斯玛六件和克里森三件同时激活。

### 6.1 `gr-push`

- 第二戒：全能法戒。
- 技能：鲜血虹吸·纯净精魂、号令骸骨·杀戮命令、骨甲·限制免疫、亡者大军·死寒大军、衰老·相时而动、亡魂复生·炼狱。
- 被动：拉斯玛之盾、绝命效忠、弱点加深、恐怖贡品。
- 魔方：葬镰、命运之誓、皇家华戒、塔格奥的蚀牙。
- 传奇宝石：贼神、困者、转煞。
- 普通宝石：头白、胸裤黄、武器绿。

### 6.2 `gr-speed`

装备与三颗宝石保持 GR 基础。技能用鲜血奔行替代衰老；被动改为精魂魄身、绝命效忠、死僵灾疫、恐怖贡品；第四槽从已经失去触发条件的蚀牙改为莱莲娜的影魂钩。

这里的关键不是“高巅峰”，而是最大精魂组合整体存在。若只换莱莲娜却没有最大精魂被动/词缀，或者保留蚀牙却没有诅咒，都是残缺配置。

### 6.3 `t16-rift`

- 第二戒：布里格斯之怒；角色仍保留 5+2。
- 技能：鲜血奔行·鲜血禁闭、号令骸骨·杀戮命令、脆弱·早夭、亡者大军·亡魂风暴、骨甲·血骨相连、亡魂复生·炼狱。
- 被动：精魂魄身、绝命效忠、死神收割、鲜血之力。
- 魔方：梅塞施密特、命运之誓、皇家华戒、斯图亚特的胫甲。
- 传奇宝石：强者、囤宝者、困者。
- 随从：魔女的复仇者护腕与贪婪之戒通过发散工作。

当前实现选择 d3guides 的具体符文/被动；Icy 使用脆弱光环、苦痛收割等细节。核心 T16 包虽已双源一致，具体符文分歧仍是证据阻塞。

## 7. 成长与断点验证

### 7.1 不再使用 2000 巅峰换装线

巅峰只解决主属性与生存，不决定活动配置。记录以下基线后再调整：

- 巅峰、主属性、生命、护甲、冷却缩减、号令骸骨面板 APS。
- 5+2、杰瑟斯、希雷娜、命运之誓是否完整。
- 永久骷髅与复生仆从是否满编。
- 三场总用时、死亡、精英平均耗时、守关者耗时、大军空窗。

判定顺序：

1. 开局伤害低：先检查仆从是否满编，不先改装备。
2. 大军空窗长：先检查仆从是否持续攻击、号令骸骨是否约 1.6 APS、冷却词缀是否保留。
3. 冲层爆发低：先检查目标是否已被衰老、号令骸骨是否已锁定；再检查葬镰虹吸覆盖。
4. 频繁暴毙：体能只补到能稳定完成一轮爆发；不能用“高巅峰”标签掩盖断骨甲或未满减伤层。
5. T16 不连贯：若普通怪不能连续击杀，先降难度或切回 GR 配置；梅斧的收益以击杀链为条件。

### 7.2 约 1.6 APS 怎么验证

Icy 给出号令骸骨约 1.6 APS 的目标，并说明杰瑟斯骨镰自带攻速，再从一枚戒指补攻速即可。验证时：

1. 保存无额外攻速、仅武器攻速、武器 + 一戒攻速三个配置。
2. 每个配置在同一层、同类高血量目标上记录三次大军从施放到重新可用的时间。
3. 确认 UI 面板和实际动画是否因 Switch 帧率/手柄号令延迟出现偏差。
4. 达到稳定刷新后停止继续堆攻速；把余下词缀留给冷却、暴击或范围伤。

如果只看到网页写“断点”而没有游戏内计时，证据仍是 `single-source`，不能升级为 Switch 已验证。

## 8. Nintendo Switch 最小实测单

三个场景分别保存完整装备、技能、被动、四槽、宝石和随从截图，并连续跑三场。额外检查：

- 号令骸骨是否能用手柄稳定锁定精英，而不是被附近小怪吸走。
- 死寒大军落点与方向是否能可靠控制。
- 鲜血奔行落点、穿怪和连续转场是否符合页面说明。
- 永久仆从在死亡、换层、回城后是否需要重建。
- 冲层衰老是否能稳定覆盖准备爆发的全部目标。
- T16 布里格斯聚怪、梅斧减冷却、斯图亚特移速是否逐项触发。
- 随从复仇者护腕和贪婪之戒是否确实发散；页面状态与游戏 Buff/行为一致。
- 每场记录总用时、死亡、大军平均空窗、精英与首领耗时，以及误锁目标次数。

完成后仍要分别判断：机制可触发、操作可执行、效率可接受。单纯“能通关”不足以把场景升级为推荐或发布。

## 9. 验收状态

- [x] 删除高/低巅峰四格复制
- [x] 建立三种真实用途场景
- [x] 修复塔格奥蚀牙无诅咒触发链
- [x] 修复 T16 角色错误拆 5+2 与金币装备混拼
- [x] 以 Blizzard 官方机制否定 Icy 轮回镰刀与 0.25 秒旧值
- [x] 装备、技能、被动、四魔方槽、宝石、随从与巅峰字段落入结构化证据
- [x] Schema、Semantics、Evidence 校验通过
- [ ] 人工读取 Maxroll 当前完整正文
- [ ] 冲层符文、第四被动和第三宝石冲突裁决
- [ ] T16 个别符文/被动差异裁决
- [ ] Nintendo Switch 三场景各三次功能样本
- [ ] 桌面、移动端和英文界面视觉复核
