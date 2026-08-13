import { createClassGuide, jewelry, legendary, passive, power, setGear, skill, type ClassGuideSeed, type GearSeed } from "./class-build-factory";
import type { BuildGuide } from "./build-guides";

const justice: GearSeed[] = [
  setGear("poj-head", "头部", "正义法令", "decree-of-justice-p67_unique_helm_set_02.png", "正义之师部件；劲风煞与风雷冲共同建立套装倍率。", "风雷冲"),
  setGear("poj-shoulders", "肩部", "正义之镜", "mirrors-of-justice-p67_unique_shoulder_set_02.png", "正义之师部件。", "风雷冲"),
  setGear("poj-chest", "胸部", "正义鳞甲", "lamellars-of-justice-p67_unique_chest_set_02.png", "正义之师部件。", "风雷冲"),
  setGear("poj-gloves", "手部", "正义护手", "bazubands-of-justice-p67_unique_gloves_set_02.png", "正义之师部件。"),
  setGear("poj-pants", "腿部", "正义群山", "mountains-of-justice-p67_unique_pants_set_02.png", "正义之师部件。"),
  setGear("poj-boots", "脚部", "正义编织", "weaves-of-justice-p67_unique_boots_set_02.png", "正义之师部件；风雷冲技能伤优先。", "风雷冲"),
];

const sunwuko: GearSeed[] = [
  setGear("sunwuko-head", "头部", "孙悟空的冠冕", "sunwukos-crown-unique_helm_set_11_x1.png", "猴王套部件；劲风煞层数换取伤害与减伤。"),
  setGear("sunwuko-shoulders", "肩部", "孙悟空的平衡", "sunwukos-balance-unique_shoulder_set_11_x1.png", "猴王套部件。"),
  setGear("sunwuko-chest", "胸部", "孙悟空的灵魂", "sunwukos-soul-unique_chest_set_11_x1.png", "猴王套部件。"),
  setGear("sunwuko-gloves", "手部", "孙悟空的护掌", "sunwukos-paws-unique_gloves_set_11_x1.png", "猴王套部件。"),
  setGear("sunwuko-pants", "腿部", "孙悟空的护腿", "sunwukos-leggings-unique_pants_set_11_x1.png", "猴王套部件。"),
];

const uliana: GearSeed[] = [
  setGear("uliana-head", "头部", "乌莲娜之魂", "ulianas-spirit-unique_helm_set_01_p3.png", "乌莲娜套部件；第三次生成攻击附加爆裂掌。", "爆裂掌"),
  setGear("uliana-shoulders", "肩部", "乌莲娜之力", "ulianas-strength-unique_shoulder_set_01_p3.png", "乌莲娜套部件。", "七相拳"),
  setGear("uliana-chest", "胸部", "乌莲娜之心", "ulianas-heart-unique_chest_set_01_p3.png", "乌莲娜套部件。", "爆裂掌"),
  setGear("uliana-gloves", "手部", "乌莲娜之怒", "ulianas-fury-unique_gloves_set_01_p3.png", "乌莲娜套部件。"),
  setGear("uliana-pants", "腿部", "乌莲娜之负", "ulianas-burden-unique_pants_set_01_p3.png", "乌莲娜套部件。"),
  setGear("uliana-boots", "脚部", "乌莲娜之命", "ulianas-destiny-unique_boots_set_01_p3.png", "乌莲娜套部件；爆裂掌技能伤优先。", "爆裂掌"),
];

const raiment: GearSeed[] = [
  setGear("raiment-head", "头部", "灼天之面", "mask-of-the-searing-sky-unique_helm_set_08_x1.png", "千飓战甲部件；生成技能和疾风击互相强化。", "疾风击"),
  setGear("raiment-shoulders", "肩部", "逆旅罪人肩甲", "mantle-of-the-upsidedown-sinners-unique_shoulder_set_08_x1.png", "千飓战甲部件。", "疾风击"),
  setGear("raiment-chest", "胸部", "奔涛之心", "heart-of-the-crashing-wave-unique_chest_set_08_x1.png", "千飓战甲部件。", "疾风击"),
  setGear("raiment-gloves", "手部", "雷霆之拳", "fists-of-thunder-unique_gloves_set_08_x1.png", "千飓战甲部件。"),
  setGear("raiment-pants", "腿部", "舞蛇鳞甲", "scales-of-the-dancing-serpent-unique_pants_set_08_x1.png", "千飓战甲部件。"),
  setGear("raiment-boots", "脚部", "八魔长靴", "eightdemon-boots-unique_boots_set_08_x1.png", "千飓战甲部件；疾风击技能伤优先。", "疾风击"),
];

const innaRaimentGodGear: GearSeed[] = [
  setGear("god-inna-head", "头部", "尹娜的光华", "innas-radiance-unique_spiritstone_009_x1.png", "尹娜套部件；混搭以五件实穿配合皇家华戒激活六件。", "幻身诀"),
  setGear("god-raiment-shoulders", "肩部", "逆旅罪人肩甲", "mantle-of-the-upsidedown-sinners-unique_shoulder_set_08_x1.png", "千飓套第一件；与另外两件实穿配合华戒激活四件疾风回充。", "疾风击"),
  setGear("god-inna-chest", "胸部", "尹娜的寰宇胸襟", "innas-vast-expanse-unique_chest_015_x1.png", "尹娜套部件；提供三孔与六件套幻身伤害基座。", "幻身诀"),
  setGear("god-raiment-gloves", "手部", "雷霆之拳", "fists-of-thunder-unique_gloves_set_08_x1.png", "千飓套第二件；承担双暴与冷却词缀。", "疾风击"),
  legendary("god-lesser-gods", "腕部", "小神之腕", "bindings-of-the-lesser-gods-p71_unique_bracer_108.png", "飓风破命中后，幻身对目标获得巨大增伤；负责T16和蓝门的清怪。", { element: "冰霜", skill: "幻身诀" }),
  setGear("god-inna-belt", "腰部", "尹娜的恩泽", "innas-favor-unique_belt_007_x1.png", "尹娜套部件；计入五件实穿。", "幻身诀"),
  setGear("god-inna-pants", "腿部", "尹娜的节制", "innas-temperance-unique_pants_008_x1.png", "尹娜套部件；两孔镶嵌敏捷宝石。", "幻身诀"),
  setGear("god-raiment-boots", "脚部", "八魔长靴", "eightdemon-boots-unique_boots_set_08_x1.png", "千飓套第三件；皇家华戒将三件实穿提升为四件效果。", "疾风击"),
  legendary("god-hybrid-squirt", "颈部", "斯奎特的项链", "squirts-necklace-p66_unique_amulet_010.png", "未受伤时叠加伤害；疾风击跑图时不要为维持层数刻意停手。", { gem: "wreath" }),
  jewelry("zodiac", "gogok"),
  legendary("god-hybrid-rechel", "手指", "瑞秋的行窃之戒", "rechels-ring-of-larceny-unique_ring_104_x1.png", "恐惧敌人后提高移速；由致盲闪的畏惧符文触发。", { gem: "powerful" }),
  setGear("god-inna-reach", "主手", "尹娜的审判", "innas-reach-unique_combatstaff_2h_001_x1.png", "尹娜套第五件，也是双手武器；用于凑齐尹娜六件并提高幻身伤害，因此不能同时穿戴寅剑。", "幻身诀"),
];

const innaRaimentGodSkills = [
  skill("dashing-strike", "疾风击", "迅银击", "千飓四件使疾风击消耗精气并返还充能；三次充能更适合连续跨屏。"),
  skill("cyclone-strike", "飓风破", "聚力爆破", "把怪物拉紧并触发小神之腕的幻身增伤。"),
  skill("mystic-ally", "幻身诀", "水幻身", "尹娜六件召出全部符文；主动水幻身负责清屏，风幻身被动同时帮助回精。"),
  skill("epiphany", "灵光悟", "明心禅", "持续回精，让消耗75精气的疾风击不易断档。"),
  skill("blinding-flash", "致盲闪", "畏惧之光", "制造恐惧触发瑞秋戒，并通过瑟夫之法立即回精。"),
  skill("mantra-of-conviction", "定罪真言", "震慑咒", "尹娜四件已常驻全部真言基础效果；技能栏用于提供额外移速。"),
];

const innaRaimentGodPowers = [
  power("god-hybrid-ingeom-power", "武器", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短技能冷却。", "尹娜双手杖必须穿戴，所以寅剑放入魔方；精英击杀后连续刷新灵光悟、致盲闪和幻身主动。", "黄装升级：70级单手剑。"),
  power("god-hybrid-seph", "防具", "瑟夫之法", "the-laws-of-seph-unique_spiritstone_101_x1.png", "使用致盲闪时立即恢复大量精气。", "与畏惧之光一键同时完成回精和瑞秋加速。", "黄装升级：70级武僧灵石。"),
  power("god-hybrid-royal", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装奖励所需件数减少1。", "三件千飓激活四件效果，五件尹娜激活六件效果；本方案不可替换。", "只来自第一幕/第四幕悬赏宝箱。"),
  power("god-hybrid-crudest", "第4槽", "粗糙至极靴", "the-crudest-boots-p71_unique_boots_010.png", "幻身诀召唤两个幻身，并强化幻身被动。", "把尹娜的幻身数量、伤害和风幻身回精一起翻倍。", "血岩碎片赌博靴子，低等级武僧更容易定向获取。"),
];

const commonPassives = [
  passive("beacon-of-ytar", "伊塔之辉", "缩短所有技能冷却，帮助灵光悟与防御技能轮转。"),
  passive("harmony", "天人合一", "单抗的一部分转化为全抗，词缀应尽量统一单抗。"),
  passive("relentless-assault", "无情猛袭", "对被致盲、冰冻或眩晕的敌人增伤。"),
  passive("near-death-experience", "濒死体验", "受到致命伤害时保命。"),
];

const fist = (id: string, name: string, file: string, effect: string) => legendary(id, "主手", name, file, effect, { base: "拳套" });
const offFist = (id: string, name: string, file: string, effect: string) => legendary(id, "副手", name, file, effect, { base: "拳套" });

const seeds: ClassGuideSeed[] = [
  {
    classKey: "monk", id: "inna-ally", name: "尹娜幻身", set: "尹娜的真言", core: "攻击叠幻身 → 主动幻身爆发", summary: "尹娜召出所有幻身符文，攻击叠加幻身数量，再由主动技能把整支幻身队伍同时爆发。", difficulty: "低操作 · 召唤爆发", follower: "魔女", followerReason: "冷却与控场帮助灵光悟、幻身主动和聚怪稳定循环。", element: "冰霜", coreSkill: "幻身诀",
    gear: [setGear("inna-head", "头部", "尹娜的光华", "innas-radiance-unique_spiritstone_009_x1.png", "尹娜套部件；所有真言与幻身符文同时生效。", "幻身诀"), legendary("aughild-shoulders", "肩部", "奥吉德的力量", "/d3/aughild-shoulders.png", "与奥吉德护腕组成精英攻防套。", { quality: "set", method: ["悬赏获取图纸", "铁匠锻造", "不要黄装升级"] }), setGear("inna-chest", "胸部", "尹娜的寰宇胸襟", "innas-vast-expanse-unique_chest_015_x1.png", "尹娜套部件。", "幻身诀"), setGear("inna-gloves", "手部", "尹娜的掌控", "innas-hold-p2_unique_gloves_04.png", "尹娜套部件。"), legendary("lesser-gods", "腕部", "小神之腕", "bindings-of-the-lesser-gods-p71_unique_bracer_108.png", "飓风破命中后，幻身对目标获得巨大增伤。", { element: "冰霜", skill: "幻身诀" }), setGear("inna-belt", "腰部", "尹娜的恩泽", "innas-favor-unique_belt_007_x1.png", "尹娜套部件。", "幻身诀"), setGear("inna-pants", "腿部", "尹娜的节制", "innas-temperance-unique_pants_008_x1.png", "尹娜套部件。"), legendary("crudest", "脚部", "粗糙至极靴", "the-crudest-boots-p71_unique_boots_010.png", "幻身数量翻倍，并强化幻身被动效果。", { skill: "幻身诀" }), jewelry("squirt", "enforcer"), jewelry("focus", "trapped"), jewelry("restraint", "stricken"), fist("shenlong-fist", "神龙之魂", "shenlongs-fist-of-legend-unique_fist_011_x1.png", "与猛袭组成神龙套，满精气后获得爆发并快速耗空精气。"), offFist("shenlong-assault", "神龙之猛袭", "shenlongs-relentless-assault-unique_fist_010_x1.png", "神龙套另一件；资源满值时启动攻防循环。")],
    skills: [skill("mystic-ally", "幻身诀", "水幻身", "主要爆发；主动时所有水幻身冲向目标。"), skill("cyclone-strike", "飓风破", "聚力爆破", "聚怪并触发小神之腕的幻身乘区。"), skill("way-of-the-hundred-fists", "百裂拳", "同化", "生成精气、叠幻身数量并触发克己。"), skill("dashing-strike", "疾风击", "迅银击", "调整位置并躲避地板。"), skill("epiphany", "灵光悟", "流沙覆", "回能、瞬移贴怪与减伤。"), skill("inner-sanctuary", "禅定", "禁地", "在爆发区域减伤并使敌人易伤。")], passives: commonPassives,
    powers: [power("flying-dragon", "武器", "翔龙", "flying-dragon-unique_combatstaff_2h_009_x1.png", "攻击时有机会使攻速翻倍。", "百裂拳更快叠幻身与神龙资源循环。"), power("tasker", "防具", "宠爱手套", "tasker-and-theo-unique_gloves_003_x1.png", "提高宠物攻击速度。", "所有幻身攻击频率提高。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "让尹娜五件与奥吉德两件同时成立。", "第一幕/第四幕悬赏箱。"), power("echoing-fury", "第4槽", "怒火回荡", "echoing-fury-p66_unique_mace_1h_001.png", "击杀后提高攻速与移速。", "第39赛季第四槽加快幻身叠加和清图。")],
    links: [{ title: "聚怪标记幻身", category: "damage", conclusion: "每轮幻身主动前必须先飓风破，让小神之腕乘区生效。", steps: [["cyclone-strike", "飓风破", "聚怪并标记"], ["lesser-gods", "小神之腕", "幻身对标记目标增伤"], ["mystic-ally", "水幻身主动", "全体冲击"]] }, { title: "幻身数量翻倍", category: "damage", conclusion: "攻击叠满尹娜幻身后再主动，粗糙靴将整队数量翻倍。", steps: [["way-of-the-hundred-fists", "百裂拳", "叠幻身数量"], ["inna-head", "尹娜六件", "召出全部符文"], ["crudest", "粗糙靴", "数量翻倍"], ["squirts", "侍从宝石", "镶嵌在斯奎特项链，提供宠物乘区"]] }, { title: "神龙资源窗", category: "resource", conclusion: "满精气启动神龙后立即爆发，精气耗空再重建。", steps: [["way-of-the-hundred-fists", "生成精气", "推向满值"], ["shenlong-fist", "神龙双拳", "满精气启动增伤"], ["mystic-ally", "幻身爆发", "消耗爆发窗"]] }],
    rotation: [{ title: "叠幻身", action: "用百裂拳攻击密集怪群。", reason: "生成精气并叠满尹娜幻身。" }, { title: "聚怪标记", action: "对精英使用飓风破。", reason: "触发小神之腕。" }, { title: "建立战区", action: "放下禁地并开启灵光悟。", reason: "同时提高生存和伤害。" }, { title: "满资源爆发", action: "精气满值时主动水幻身。", reason: "神龙与幻身乘区在此叠加。" }, { title: "耗空重建", action: "神龙耗空后继续百裂拳。", reason: "下一轮循环从资源重建开始。" }], pushNote: "等待幻身数量、神龙满精气和聚怪标记同时成立再爆发。", speedNote: "疾风击转场，水幻身主动到点即用。", lowNote: "粗糙靴和小神之腕可用低等级武僧赌博，优先拿到。", highNote: "宠物攻速、冰霜元素和范围伤决定高层上限。", source: "https://www.icy-veins.com/d3/monk-inna-mystic-ally-build",
  },
  {
    classKey: "monk", id: "poj-tempest", name: "正义风雷冲", set: "正义之师", core: "劲风煞常驻 → 风雷冲引导", summary: "正义套让劲风煞自动叠层并放大风雷冲，平衡杖、流云桥与凯撒回忆共同构成冰霜引导体系。", difficulty: "低操作 · 移动引导", follower: "魔女", followerReason: "控场能稳定触发凯撒回忆，冷却帮助灵光悟常驻。", element: "冰霜", coreSkill: "风雷冲",
    gear: [...justice, legendary("cesar", "腕部", "凯撒的回忆", "cesars-memento-p61_unique_bracer_107.png", "被致盲、冰冻或眩晕的敌人承受更多风雷冲伤害。", { element: "冰霜", skill: "风雷冲" }), legendary("kyoshiro-soul", "腰部", "京四郎之魂", "kyoshiros-soul-p4_unique_belt_05.png", "未命中敌人时自动叠劲风煞，避免转场掉层。"), jewelry("squirt", "trapped"), jewelry("coe", "taeguk"), jewelry("unity", "stricken"), fist("won-khim", "流云桥", "won-khim-lau-p67_unique_fist_006.png", "风雷冲自动施放飓风破并提高二者伤害。"), offFist("vengeful-wind", "复仇之风", "vengeful-wind-p67_fistweapon_norm_unique_02.png", "提高劲风煞最大层数并帮助正义套保持层数。")],
    skills: [skill("tempest-rush", "风雷冲", "冰风扫掠", "主要引导伤害；移动过程中叠太极石。"), skill("sweeping-wind", "劲风煞", "利刃风暴", "正义套的攻速、移速和减伤开关。"), skill("cyclone-strike", "飓风破", "寒冰爆破", "由流云桥自动施放并冻结敌人。"), skill("epiphany", "灵光悟", "流沙覆", "回能、瞬移和减伤。"), skill("mantra-of-salvation", "救赎真言", "迅捷身法", "提高全抗与闪避。"), skill("blinding-flash", "致盲闪", "信仰之光", "主动控制并触发凯撒护腕。")], passives: commonPassives,
    powers: [power("balance", "武器", "平衡", "balance-p61_unique_combatstaff_2h_001.png", "提高风雷冲伤害，命中少量敌人时必定暴击。", "放魔方获得满特效，并允许穿戴流云桥与复仇之风。"), power("mantle-channeling", "防具", "导能披肩", "mantle-of-channeling-p4_unique_shoulder_103.png", "引导时增伤并减伤。", "持续风雷冲自然常驻。"), power("zodiac", "首饰", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "资源消耗命中缩短冷却。", "刷新灵光悟和致盲闪。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补足单体。")],
    links: [{ title: "劲风煞驱动", category: "damage", conclusion: "劲风煞层数是正义套攻防基座，转场也不能掉。", steps: [["sweeping-wind", "劲风煞", "保持层数"], ["kyoshiro-soul", "京四郎腰带", "转场自动叠层"], ["vengeful-wind", "复仇之风", "提高最大层数"], ["tempest-rush", "风雷冲", "获得套装倍率"]] }, { title: "自动聚怪控制", category: "damage", conclusion: "流云桥让引导自动飓风破，冻结后凯撒乘区立即生效。", steps: [["tempest-rush", "风雷冲", "持续引导"], ["won-khim", "流云桥", "自动飓风破"], ["cyclone-strike", "寒冰爆破", "聚怪冻结"], ["cesar", "凯撒回忆", "受控目标增伤"]] }, { title: "引导攻防", category: "defense", conclusion: "不停引导同时维持太极与导能披肩攻防。", steps: [["tempest-rush", "风雷冲", "持续引导"], ["mantle-channeling", "导能披肩", "引导攻防"], ["epiphany", "灵光悟", "回能减伤"]] }],
    rotation: [{ title: "开启劲风煞", action: "进图立刻开启并叠满。", reason: "正义套所有倍率由此启动。" }, { title: "保持灵光悟", action: "冷却结束即开启。", reason: "解决精气与减伤。" }, { title: "持续引导", action: "围绕怪群小范围风雷冲。", reason: "自动飓风破并保持太极。" }, { title: "控制爆发", action: "冰霜周期使用致盲闪。", reason: "触发凯撒并集中元素伤。" }, { title: "不要停手", action: "换图也保持风雷冲。", reason: "中断会掉太极和引导防御。" }], pushNote: "冰霜周期用致盲闪锁住精英，持续引导不掉层。", speedNote: "京四郎维持劲风煞，风雷冲直接穿图。", lowNote: "流云桥、平衡与凯撒回忆是最先凑齐的三件。", highNote: "冰霜元素、范围伤和灵光悟冷却决定上限。", source: "https://www.icy-veins.com/d3/monk-tempest-rush-build-with-patterns-of-justice",
  },
  {
    classKey: "monk", id: "sunwuko-tempest", name: "猴王风雷冲", set: "孙悟空的戏法", core: "劲风煞护层 → 风雷冲冰爆", summary: "猴王套用劲风煞层数支付技能增伤，风雷冲持续叠层并在冰霜周期手动释放爆发。", difficulty: "高操作 · 手动冰爆", follower: "魔女", followerReason: "控场与冷却帮助冰霜爆发和灵光悟循环。", element: "冰霜", coreSkill: "风雷冲",
    gear: [...sunwuko, legendary("cesar", "腕部", "凯撒的回忆", "cesars-memento-p61_unique_bracer_107.png", "受控敌人承受更多风雷冲伤害。", { element: "冰霜", skill: "风雷冲" }), legendary("kyoshiro-soul", "腰部", "京四郎之魂", "kyoshiros-soul-p4_unique_belt_05.png", "转场时自动维持劲风煞层数。"), legendary("ice-climbers", "脚部", "攀冰者", "ice-climbers-unique_boots_008_x1.png", "免疫冰冻与定身，保护引导。"), { ...setGear("sunwuko-amulet", "颈部", "孙悟空的光华", "sunwukos-shines-unique_amulet_set_11_x1.png", "猴王套首饰部件；必须保镶孔。"), gem: "trapped" }, jewelry("coe", "taeguk"), jewelry("zodiac", "stricken"), fist("won-khim", "流云桥", "won-khim-lau-p67_unique_fist_006.png", "风雷冲自动飓风破并提高伤害。"), offFist("vengeful-wind", "复仇之风", "vengeful-wind-p67_fistweapon_norm_unique_02.png", "提高劲风煞最大层数。")],
    skills: [skill("tempest-rush", "风雷冲", "冰风扫掠", "持续引导叠层，在冰霜周期松开按键触发爆发。"), skill("sweeping-wind", "劲风煞", "利刃风暴", "猴王套的层数资源与减伤来源。"), skill("cyclone-strike", "飓风破", "寒冰爆破", "流云桥自动聚怪并触发凯撒。"), skill("epiphany", "灵光悟", "流沙覆", "回能与减伤。"), skill("blinding-flash", "致盲闪", "信仰之光", "冰霜窗控制和增伤。"), skill("mantra-of-salvation", "救赎真言", "迅捷身法", "全抗与闪避。")], passives: commonPassives,
    powers: [power("balance", "武器", "平衡", "balance-p61_unique_combatstaff_2h_001.png", "提高风雷冲伤害并在少目标时必暴。", "魔方取满特效，穿戴流云桥与复仇之风。"), power("mantle-channeling", "防具", "导能披肩", "mantle-of-channeling-p4_unique_shoulder_103.png", "引导时增伤减伤。", "风雷冲期间常驻。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "为攀冰者和功能腰带释放位置。", "第一幕/第四幕悬赏箱。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补单体。")],
    links: [{ title: "劲风煞支付", category: "resource", conclusion: "技能消耗猴王层数，京四郎与复仇之风负责让层数足够。", steps: [["sweeping-wind", "劲风煞", "套装层数"], ["kyoshiro-soul", "京四郎腰带", "转场维持"], ["vengeful-wind", "复仇之风", "提高上限"], ["tempest-rush", "风雷冲", "消耗层数获得增伤"]] }, { title: "冰爆释放", category: "damage", conclusion: "引导层数要留到冰霜周期再松手，不要随意中断。", steps: [["tempest-rush", "持续引导", "积累爆发"], ["cyclone-strike", "自动聚怪", "集中目标"], ["cesar", "凯撒回忆", "控制乘区"], ["coe", "全能冰霜", "松手爆发"]] }, { title: "引导防线", category: "defense", conclusion: "灵光悟、导能披肩和猴王减伤需同时覆盖。", steps: [["epiphany", "灵光悟", "回能减伤"], ["mantle-channeling", "导能披肩", "引导减伤"], ["sunwuko-head", "猴王套", "劲风煞层数减伤"]] }],
    rotation: [{ title: "叠满劲风煞", action: "进图先开启并等待层数。", reason: "猴王攻防基础。" }, { title: "持续引导", action: "风雷冲围绕怪群积累层数。", reason: "准备手动冰爆。" }, { title: "保持灵光悟", action: "进入高密度前开启。", reason: "回能与减伤。" }, { title: "冰霜控制", action: "冰霜周期用致盲闪聚住精英。", reason: "触发凯撒乘区。" }, { title: "松手冰爆", action: "元素窗内短暂松开风雷冲。", reason: "一次结算已积累的爆发。" }], pushNote: "保留引导层数到冰霜周期，控制后手动松开爆发。", speedNote: "不等待元素窗，风雷冲持续穿图。", lowNote: "先保证劲风煞不掉层，再练习冰爆节奏。", highNote: "冰霜元素、范围伤和引导层数管理决定上限。", source: "https://www.icy-veins.com/d3/monk-tempest-rush-build-with-sunwuko",
  },
  {
    classKey: "monk", id: "sunwuko-wol", name: "猴王敲钟", set: "孙悟空的戏法", core: "劲风煞维持 → 远程金钟破", summary: "劲风煞提供猴王套倍率，京四郎之刃、香炉与平托护腕把金钟破变成远程范围爆发。", difficulty: "中等 · 远程爆发", follower: "魔女", followerReason: "控场帮助金钟覆盖，冷却缩减支持灵光悟。", element: "火焰", coreSkill: "金钟破",
    gear: [...sunwuko, legendary("pinto", "腕部", "平托的骄傲", "pintos-pride-p4_unique_bracer_105.png", "金钟破减速敌人并提高技能伤害。", { element: "火焰", skill: "金钟破" }), legendary("kyoshiro-soul", "腰部", "京四郎之魂", "kyoshiros-soul-p4_unique_belt_05.png", "未命中敌人时自动叠劲风煞。"), legendary("crudest", "脚部", "粗糙至极靴", "the-crudest-boots-p71_unique_boots_010.png", "幻身数量翻倍，配合狂击复制金钟。"), { ...setGear("sunwuko-amulet", "颈部", "孙悟空的光华", "sunwukos-shines-unique_amulet_set_11_x1.png", "猴王套首饰部件。"), gem: "trapped" }, jewelry("focus", "zei"), jewelry("restraint", "stricken"), fist("kyoshiro-blade", "京四郎之刃", "kyoshiros-blade-p4_unique_fist_102.png", "金钟破命中少量敌人时获得巨大增伤。"), offFist("rabid-strike", "狂击", "rabid-strike-p71_unique_fist_003.png", "灵光悟期间幻身复制角色的精气消耗技能。")],
    skills: [skill("wave-of-light", "金钟破", "爆裂光波", "主要输出；幻身会通过狂击复制施放。"), skill("sweeping-wind", "劲风煞", "内力风暴", "维持猴王层数并帮助回能。"), skill("epiphany", "灵光悟", "流沙覆", "让狂击幻身复制金钟，并提供减伤。"), skill("mystic-ally", "幻身诀", "火幻身", "粗糙靴翻倍幻身数量，主动提供火焰爆发。"), skill("dashing-strike", "疾风击", "迅银击", "远距调整与闪避。"), skill("blinding-flash", "致盲闪", "信仰之光", "控制并触发无情猛袭。")], passives: [passive("exalted-soul", "超绝", "提高精气上限与回复。"), passive("seize-the-initiative", "先发制人", "攻击高生命敌人时提高攻速。"), ...commonPassives.slice(0, 2)],
    powers: [power("incense-torch", "武器", "大殿香烛", "incense-torch-of-the-grand-temple-p61_unique_combatstaff_2h_003_x1.png", "降低金钟破消耗并提高伤害。", "让连续敲钟的精气循环成立。"), power("bindings-lesser", "防具", "小神之腕", "bindings-of-the-lesser-gods-p71_unique_bracer_108.png", "飓风破后幻身增伤。", "幻身复制金钟时获得宠物乘区。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "为粗糙靴和功能部位释放位置。", "第一幕/第四幕悬赏箱。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽强化少目标。")],
    links: [{ title: "幻身复制金钟", category: "damage", conclusion: "灵光悟期间角色每次敲钟都会由幻身复制，粗糙靴再翻倍复制者数量。", steps: [["epiphany", "灵光悟", "启用幻身联动"], ["rabid-strike", "狂击", "幻身复制消耗技能"], ["crudest", "粗糙靴", "幻身数量翻倍"], ["wave-of-light", "金钟破", "多源施放"]] }, { title: "金钟专属乘区", category: "damage", conclusion: "香炉解决消耗，京四郎之刃和平托分别补单体与范围。", steps: [["incense-torch", "大殿香烛", "减耗与技能伤"], ["kyoshiro-blade", "京四郎之刃", "少目标增伤"], ["pinto", "平托护腕", "减速并增伤"], ["wave-of-light", "远程金钟", "覆盖战区"]] }, { title: "猴王层数", category: "resource", conclusion: "转场也要让京四郎维持劲风煞，否则下一钟没有套装倍率。", steps: [["sweeping-wind", "劲风煞", "套装层数"], ["kyoshiro-soul", "京四郎腰带", "自动补层"], ["sunwuko-head", "猴王套", "层数转攻防"]] }],
    rotation: [{ title: "开启劲风煞", action: "进图先叠满层数。", reason: "猴王倍率来源。" }, { title: "开启灵光悟", action: "精英战前开启。", reason: "狂击幻身开始复制金钟。" }, { title: "保持远距", action: "疾风击移动到怪群外侧。", reason: "保护斯奎特并利用贼神。" }, { title: "连续敲钟", action: "对精英与密度中心施放金钟破。", reason: "角色与幻身同步输出。" }, { title: "火幻身爆发", action: "火焰周期主动幻身。", reason: "把额外增伤压进元素窗。" }], pushNote: "灵光悟期间远程连续敲钟，优先覆盖精英和密度中心。", speedNote: "疾风击穿图，金钟破远程清屏。", lowNote: "京四郎之刃、香炉和平托护腕先成型。", highNote: "火焰元素、精气减耗与范围伤决定上限。", source: "https://www.icy-veins.com/d3/monk-wave-of-light-build-with-sunwuko-set",
  },
  {
    classKey: "monk", id: "lod-wol", name: "梦遗敲钟", set: "梦之遗礼", core: "远古散件 → 幻身复制金钟", summary: "以梦遗放大每件远古散件，保留狂击幻身复制金钟的发动机，装备门槛更高但上限更高。", difficulty: "高装备门槛 · 远程爆发", follower: "魔女", followerReason: "控场与冷却帮助灵光悟和远程金钟循环。", element: "火焰", coreSkill: "金钟破",
    gear: [legendary("leoric", "头部", "李奥瑞克的王冠", "leorics-crown-unique_helm_002_p1.png", "放大钻石冷却，帮助灵光悟常驻。"), legendary("lefebvre", "肩部", "勒斐伏尔的独白", "lefebvres-soliloquy-p4_unique_shoulder_101.png", "飓风破后获得减伤。"), legendary("cindercoat", "胸部", "燃火外套", "cindercoat-unique_chest_006_x1.png", "火焰增伤并降低消耗。", { element: "火焰" }), legendary("magefist", "手部", "法师之拳", "magefist-p41_unique_gloves_014.png", "提高火焰技能伤害。", { element: "火焰" }), legendary("pinto", "腕部", "平托的骄傲", "pintos-pride-p4_unique_bracer_105.png", "金钟破减速并增伤。", { element: "火焰", skill: "金钟破" }), legendary("witching-hour", "腰部", "巫异时刻", "the-witching-hour-unique_belt_009_x1.png", "提供攻速与暴击伤害。"), legendary("blackthorne", "腿部", "黑棘的战袍裤", "blackthornes-jousting-mail-unique_pants_013_x1.png", "可滚元素伤的散件槽；不要激活两件套。", { warning: "梦遗构筑不能激活任何套装奖励。" }), legendary("crudest", "脚部", "粗糙至极靴", "the-crudest-boots-p71_unique_boots_010.png", "幻身数量翻倍。"), jewelry("squirt", "lod"), jewelry("coe", "stricken"), jewelry("unity", "trapped"), fist("kyoshiro-blade", "京四郎之刃", "kyoshiros-blade-p4_unique_fist_102.png", "少目标金钟获得巨大增伤。"), offFist("rabid-strike", "狂击", "rabid-strike-p71_unique_fist_003.png", "灵光悟期间幻身复制金钟。")],
    skills: [skill("wave-of-light", "金钟破", "爆裂光波", "主要输出，由幻身复制。"), skill("epiphany", "灵光悟", "流沙覆", "启用狂击复制并提供减伤。"), skill("cyclone-strike", "飓风破", "聚力爆破", "触发勒斐伏尔减伤并聚怪。"), skill("mystic-ally", "幻身诀", "火幻身", "粗糙靴翻倍幻身，主动爆发。"), skill("dashing-strike", "疾风击", "迅银击", "保持远距和躲避。"), skill("blinding-flash", "致盲闪", "信仰之光", "控制并提高伤害。")], passives: [passive("exalted-soul", "超绝", "提高精气上限。"), passive("seize-the-initiative", "先发制人", "提高攻速。"), ...commonPassives.slice(0, 2)],
    powers: [power("incense-torch", "武器", "大殿香烛", "incense-torch-of-the-grand-temple-p61_unique_combatstaff_2h_003_x1.png", "金钟破减耗增伤。", "支撑连续爆发。"), power("bindings-lesser", "防具", "小神之腕", "bindings-of-the-lesser-gods-p71_unique_bracer_108.png", "飓风破后幻身增伤。", "复制金钟的幻身获得乘区。"), power("zodiac", "首饰", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗技能命中缩短冷却。", "刷新灵光悟与防御技能。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补单体。")],
    links: [{ title: "梦遗散件", category: "damage", conclusion: "每件远古都提高梦遗攻防，但任何两件套奖励都会让宝石失效。", steps: [["squirts", "梦遗宝石", "镶嵌在项链"], ["blackthorne", "黑棘单件", "只穿一件"], ["cindercoat", "远古散件", "累计梦遗攻防"]] }, { title: "幻身复制", category: "damage", conclusion: "灵光悟期间的每次金钟由翻倍幻身复制。", steps: [["epiphany", "灵光悟", "启用复制"], ["rabid-strike", "狂击", "幻身复制"], ["crudest", "粗糙靴", "幻身翻倍"], ["wave-of-light", "金钟破", "多源爆发"]] }, { title: "聚怪攻防", category: "defense", conclusion: "飓风破一次同时聚怪、触发肩膀减伤并标记小神之腕。", steps: [["cyclone-strike", "飓风破", "聚怪"], ["lefebvre", "勒斐伏尔", "获得减伤"], ["bindings-lesser", "小神之腕", "幻身增伤"]] }],
    rotation: [{ title: "检查梦遗", action: "确认没有激活两件套。", reason: "否则梦遗失效。" }, { title: "飓风聚怪", action: "对精英使用飓风破。", reason: "触发肩膀减伤和小神之腕。" }, { title: "开启灵光悟", action: "进入爆发前开启。", reason: "启用幻身复制。" }, { title: "远距敲钟", action: "站在安全距离连续金钟破。", reason: "保护斯奎特并由幻身复制。" }, { title: "火焰爆发", action: "火焰周期主动火幻身。", reason: "叠加元素与宠物爆发。" }], pushNote: "每轮先飓风标记，再开启灵光悟由幻身复制金钟。", speedNote: "疾风击转场，低层不等待全能周期。", lowNote: "梦遗等级和远古数量优先于追求太古。", highNote: "火焰元素、远古散件词缀和精气管理决定上限。", source: "https://www.icy-veins.com/d3/monk-wave-of-light-build-with-lod",
  },
  {
    classKey: "monk", id: "uliana-palm", name: "乌莲娜爆裂掌", set: "乌莲娜的谋略", core: "生成攻击上掌 → 七相拳引爆", summary: "生成技能自动附加爆裂掌，七相拳触发并引爆，狮爪翻倍打击次数，厄拳放大爆炸。", difficulty: "中等 · 连锁引爆", follower: "魔女", followerReason: "远程控场帮助把怪群聚紧，让爆裂掌连锁传播。", element: "冰霜", coreSkill: "爆裂掌",
    gear: [...uliana, legendary("gungdo", "腕部", "古帕萨护腕", "gungdo-gear-p610_unique_bracer_006.png", "爆裂掌爆炸会把爆裂掌传播给附近敌人。", { element: "冰霜", skill: "爆裂掌" }), legendary("binding-lost", "腰部", "失踪者的绑腰", "binding-of-the-lost-p61_unique_belt_03.png", "七相拳每一击提供减伤。", { skill: "七相拳" }), jewelry("traveler", "trapped"), jewelry("compass", "stricken"), jewelry("coe", "gogok"), fist("lion-claw", "狮爪", "lions-claw-p1_fistweapon_norm_unique_01.png", "七相拳额外攻击七次。"), offFist("azturrasq", "厄拳", "the-fist-of-azturrasq-p61_unique_fist_009_x1.png", "被爆裂掌击杀时，爆炸伤害大幅提高。")],
    skills: [skill("exploding-palm", "爆裂掌", "死到临头", "主要连锁伤害；乌莲娜两件可自动附加。"), skill("sevensided-strike", "七相拳", "连环攻击", "触发并引爆爆裂掌，狮爪翻倍攻击次数。"), skill("crippling-wave", "断筋诀", "海啸冲", "第三击自动上掌，并控制敌人。"), skill("cyclone-strike", "飓风破", "聚力爆破", "把怪群拉紧以传播爆裂掌。"), skill("epiphany", "灵光悟", "流沙覆", "回能、贴怪和减伤。"), skill("dashing-strike", "疾风击", "炫目光速", "转场并提高闪避。")], passives: [passive("mythic-rhythm", "神秘韵律", "生成技能第三击后提高下一次精气消耗技能。"), ...commonPassives.slice(0, 3)],
    powers: [power("flow-eternity", "武器", "永恒之悟", "the-flow-of-eternity-p41_unique_combatstaff_2h_005.png", "大幅缩短七相拳冷却并提高伤害。", "让引爆频率足以维持套装循环。"), power("spirit-guards", "防具", "灵魂守卫", "spirit-guards-p61_unique_bracer_109.png", "生成技能命中后获得减伤。", "断筋诀贴身上掌时建立防线。"), power("zodiac", "首饰", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗技能命中缩短冷却。", "七相拳和飓风破刷新灵光悟。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽帮助精英连锁起爆。")],
    links: [{ title: "上掌再引爆", category: "damage", conclusion: "先确认怪群已被上掌，再交七相拳；空七相没有爆炸。", steps: [["crippling-wave", "断筋诀第三击", "自动附加爆裂掌"], ["exploding-palm", "爆裂掌", "标记目标"], ["sevensided-strike", "七相拳", "触发引爆"], ["lion-claw", "狮爪", "打击次数翻倍"]] }, { title: "爆炸传播", category: "damage", conclusion: "第一具怪物爆炸后，古帕萨护腕会把掌印传遍密度。", steps: [["cyclone-strike", "飓风破", "拉紧怪群"], ["azturrasq", "厄拳", "提高爆炸"], ["gungdo", "古帕萨护腕", "爆炸传播"], ["exploding-palm", "连锁爆炸", "清空怪群"]] }, { title: "七相减伤", category: "defense", conclusion: "失踪者绑腰按七相拳命中数提供减伤，狮爪也会让防线更稳定。", steps: [["sevensided-strike", "七相拳", "多次命中"], ["lion-claw", "狮爪", "额外七击"], ["binding-lost", "失踪者绑腰", "按命中数减伤"]] }],
    rotation: [{ title: "聚怪", action: "用飓风破把精英和杂兵拉紧。", reason: "爆裂掌需要密度传播。" }, { title: "断筋上掌", action: "完成生成技能第三击。", reason: "乌莲娜两件自动附加爆裂掌。" }, { title: "开启灵光悟", action: "进入密度前开启。", reason: "减伤并解决精气。" }, { title: "七相引爆", action: "确认掌印后释放七相拳。", reason: "狮爪和厄拳共同放大。" }, { title: "跟随连锁", action: "第一轮爆炸后移动到下一片密度。", reason: "古帕萨传播会继续清场。" }], pushNote: "把精英拖进白怪密度，先上掌再七相拳制造连锁。", speedNote: "疾风击穿图，少量怪物只用断筋和七相。", lowNote: "狮爪、厄拳和古帕萨护腕是首要升级目标。", highNote: "冰霜元素、范围伤和七相冷却决定上限。", source: "https://www.icy-veins.com/d3/monk-uliana-exploding-palm-build",
  },
  {
    classKey: "monk", id: "raiment-dash", name: "千飓疾风击", set: "千飓战甲", core: "生成技能回精 → 疾风击往返", summary: "生成技能提高疾风击伤害并回复精气，疾风击本身消耗精气穿透目标，神龙满资源窗放大爆发。", difficulty: "高操作 · 位移输出", follower: "圣殿骑士", followerReason: "治疗和回能能覆盖高频冲入怪群的风险。", element: "冰霜", coreSkill: "疾风击",
    gear: [...raiment, legendary("spirit-guards", "腕部", "灵魂守卫", "spirit-guards-p61_unique_bracer_109.png", "生成技能命中后获得减伤。", { element: "冰霜" }), legendary("witching-hour", "腰部", "巫异时刻", "the-witching-hour-unique_belt_009_x1.png", "攻速与暴击伤害提高生成和疾风循环。"), jewelry("traveler", "trapped"), jewelry("compass", "stricken"), jewelry("coe", "gogok"), fist("shenlong-fist", "神龙之魂", "shenlongs-fist-of-legend-unique_fist_011_x1.png", "满精气启动神龙增伤并快速耗能。"), offFist("shenlong-assault", "神龙之猛袭", "shenlongs-relentless-assault-unique_fist_010_x1.png", "神龙套另一件。")],
    skills: [skill("dashing-strike", "疾风击", "光辉如炬", "主要输出与位移；必须穿过目标而非停在原地。"), skill("crippling-wave", "断筋诀", "海啸冲", "生成精气、触发千飓两件与灵魂守卫。"), skill("cyclone-strike", "飓风破", "聚力爆破", "把怪物拉到疾风击路径上。"), skill("epiphany", "灵光悟", "流沙覆", "回能与减伤。"), skill("blinding-flash", "致盲闪", "信仰之光", "控制并触发无情猛袭。"), skill("mantra-of-salvation", "救赎真言", "迅捷身法", "提高全抗与闪避。")], passives: [passive("alacrity", "敏锐", "提高生成技能攻速。"), passive("seize-the-initiative", "先发制人", "攻击高生命敌人时提高攻速。"), ...commonPassives.slice(0, 2)],
    powers: [power("flying-dragon", "武器", "翔龙", "flying-dragon-unique_combatstaff_2h_009_x1.png", "攻击时有机会使攻速翻倍。", "更快生成精气并启动神龙。"), power("depth-diggers", "防具", "深渊挖掘裤", "depth-diggers-unique_pants_006_p1.png", "提高生成技能伤害。", "断筋诀不仅回精，也是循环中的伤害部分。"), power("unity", "首饰", "团结", "unity-unique_ring_010_x1.png", "与不死随从分摊伤害。", "疾风击高频贴怪需要稳定减伤。"), power("crystal-fist", "第4槽", "水晶拳", "crystal-fist-p41_unique_fist_008.png", "疾风击后获得减伤。", "第39赛季第四槽让每次位移自动建立防线。")],
    links: [{ title: "生成与疾风交替", category: "resource", conclusion: "连续疾风会迅速耗空；每轮必须穿插生成攻击。", steps: [["crippling-wave", "断筋诀", "生成精气"], ["raiment-head", "千飓两件", "生成后放大疾风"], ["dashing-strike", "疾风击", "消耗精气输出"], ["spirit-guards", "灵魂守卫", "生成后减伤"]] }, { title: "神龙满精气窗", category: "damage", conclusion: "接近满精气时准备连续疾风，把神龙短暂增伤完整消耗。", steps: [["crippling-wave", "持续生成", "推向满精气"], ["shenlong-fist", "神龙双拳", "满精气启动"], ["dashing-strike", "连续疾风", "消耗爆发"]] }, { title: "位移防线", category: "defense", conclusion: "每次疾风击都会由水晶拳刷新减伤，但团结随从必须带不死饰品。", steps: [["dashing-strike", "疾风击", "穿过目标"], ["crystal-fist", "水晶拳", "位移后减伤"], ["unity", "团结", "随从分摊伤害"]] }],
    rotation: [{ title: "断筋生成", action: "对高密度完成数次断筋诀。", reason: "回精并刷新灵魂守卫。" }, { title: "飓风排线", action: "把怪物拉到同一直线。", reason: "疾风击需要穿过多个目标。" }, { title: "等待满精", action: "接近满精气时准备爆发。", reason: "神龙增伤即将启动。" }, { title: "往返疾风", action: "沿怪群长轴连续疾风击。", reason: "消耗神龙窗口并刷新水晶拳。" }, { title: "耗空重建", action: "精气下降后重新断筋诀。", reason: "避免资源见底后卡在怪群中。" }], pushNote: "聚怪排成直线，在神龙满精气窗沿长轴往返疾风。", speedNote: "疾风击连续穿图，生成攻击只补资源。", lowNote: "神龙双拳和水晶拳先成型，低巅峰保留更多坚韧。", highNote: "攻速断点、冰霜元素和资源上限决定操作上限。", source: "https://www.icy-veins.com/d3/monk-raiment-shenlong-generator-build-with-crippling-wave",
  },
  {
    classKey: "monk", id: "god-monk", name: "上帝僧 · 无限疾风", set: "千飓战甲 / 功能散件", core: "精气永动 → 疾风击跨屏搜索", summary: "上帝僧追求的不是冲层，而是把整张地图变成一条连续位移路线。千飓四件让疾风击消耗精气并返还充能，装备、技能和威能全部服务于回精、减耗、冷却和跑图。", difficulty: "中等 · 高频位移", follower: "魔女", followerReason: "冷却与攻速能改善灵光悟和回精循环；小秘境可让随从携带贪婪之戒与复仇者护腕。", element: "火焰", coreSkill: "疾风击",
    gear: [
      legendary("god-prides-fall", "头部", "骄矜必败", "prides-fall-unique_helm_103_x1.png", "5秒未受伤后，所有资源消耗降低30%；在空旷路线中显著延长连续疾风。", { method: ["只来自第三幕/第四幕悬赏宝箱", "优先保冷却和镶孔", "不要用黄装升级盲刷"] }),
      raiment[1], raiment[2], raiment[3],
      legendary("god-warzechian", "腕部", "沃兹克护腕", "warzechian-armguards-unique_bracer_101_x1.png", "破坏场景物件后获得短暂移速；疾风击沿路自动撞碎物件。", { element: "火焰" }),
      legendary("god-kyoshiro", "腰部", "京四郎之魂", "kyoshiros-soul-p4_unique_belt_05.png", "劲风煞未命中敌人时自动叠层，免去停车维护内力风暴。"),
      raiment[4], raiment[5],
      legendary("god-rondal", "颈部", "罗达尔的坠盒", "rondals-locket-unique_amulet_009_x1.png", "提供额外拾取距离，减少为了材料和血球回头。", { gem: "wreath" }),
      jewelry("zodiac", "gogok"),
      legendary("god-rechel", "手指", "瑞秋的行窃之戒", "rechels-ring-of-larceny-unique_ring_104_x1.png", "致盲闪制造恐惧后获得大幅移速，负责疾风间隙的地面赶路。", { gem: "powerful" }),
      legendary("god-ingeom", "主手", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短技能冷却，使灵光悟和致盲闪迅速刷新。", { base: "单手剑" }),
      offFist("god-fleshrake", "翔龙飞爪", "fleshrake-p41_unique_fist_007.png", "连续疾风击会叠加疾风击伤害，给T16和低层蓝门保留足够清怪能力。"),
    ],
    skills: [
      skill("dashing-strike", "疾风击", "光辉如炬", "核心位移和清怪技能；千飓四件使它消耗75精气但命中后返还充能。"),
      skill("epiphany", "灵光悟", "明心禅", "把灵光悟的精气回复提高到极限，是连续疾风的主发动机。"),
      skill("blinding-flash", "致盲闪", "充能之光", "配合瑟夫之法回满大量精气，并用控制触发瑞秋戒。"),
      skill("mystic-ally", "幻身诀", "风幻身", "被动提供精气回复，主动瞬间补充100点精气。"),
      skill("mantra-of-healing", "治疗真言", "循环呼吸", "被动持续回复精气；无需为了输出频繁主动施放。"),
      skill("sweeping-wind", "劲风煞", "内力风暴", "三层时持续回复精气，京四郎腰带在赶路时自动维持层数。"),
    ],
    passives: [passive("beacon-of-ytar", "伊塔之辉", "缩短所有冷却，提高灵光悟、致盲闪和幻身主动覆盖率。"), passive("exalted-soul", "超绝", "提高最大精气并增加每秒回复，扩大连续疾风的资源池。"), passive("chant-of-resonance", "共鸣颂歌", "学习真言时持续回精并降低真言主动消耗。"), passive("fleet-footed", "迅步", "直接提高移动速度，路线搜索不依赖战斗触发。")],
    powers: [
      power("god-burst", "武器", "怒涌", "burst-of-wrath-unique_axe_2h_103_x1.png", "击杀敌人或破坏物体时有机会恢复20%最大精气。", "疾风击沿路杀怪和撞碎物件，地图本身会不断给资源。", "只来自第三幕/第四幕悬赏宝箱。"),
      power("god-seph", "防具", "瑟夫之法", "the-laws-of-seph-unique_spiritstone_101_x1.png", "使用致盲闪时立即恢复大量精气。", "精气见底前按致盲闪，直接开启下一串疾风。", "黄装升级：70级武僧“灵石”。"),
      power("god-royal", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装奖励所需件数减少1。", "只穿五件千飓也能激活六件伤害，为骄矜必败释放头部位置。", "只来自第一幕/第四幕悬赏宝箱。"),
      power("god-messerschmidt", "第4槽", "梅塞施密特的劫掠者", "messerschmidts-reaver-p66_unique_axe_2h_011.png", "击杀敌人缩短一个技能的剩余冷却。", "沿路击杀继续刷新灵光悟、致盲闪和风幻身主动。"),
    ],
    links: [
      { title: "精气永动链", category: "resource", conclusion: "精气不是等自然回复：场景破坏、致盲闪、风幻身和被动回复轮流接管。", steps: [["dashing-strike", "疾风击", "消耗精气穿图"], ["god-burst", "怒涌", "杀怪破物回精"], ["blinding-flash", "致盲闪", "主动回精"], ["god-seph", "瑟夫之法", "大量恢复精气"], ["mystic-ally", "风幻身", "紧急补满资源"]] },
      { title: "千飓与华戒", category: "damage", conclusion: "五件千飓通过华戒激活六件倍率，才有能力处理T16和低层蓝门；纯外观路线可降低难度。", steps: [["god-royal", "皇家华戒", "套装需求-1"], ["raiment-shoulders", "千飓五件", "激活六件效果"], ["dashing-strike", "疾风击", "位移同时清怪"], ["god-fleshrake", "翔龙飞爪", "连续疾风叠伤"]] },
      { title: "场景就是加速器", category: "movement", conclusion: "不绕开罐子和木架；撞碎它们既触发沃兹克，也有机会触发怒涌。", steps: [["dashing-strike", "跨屏冲刺", "撞碎路径物件"], ["god-warzechian", "沃兹克", "破坏物提高移速"], ["god-burst", "怒涌", "破坏物有机会回精"], ["fleet-footed", "迅步", "稳定基础移速"]] },
      { title: "击杀刷新链", category: "resource", conclusion: "精英和白怪都不是负担：击杀会同时刷新寅剑、梅斧与黄道的冷却循环。", steps: [["god-ingeom", "寅剑", "精英击杀缩冷却"], ["god-messerschmidt", "梅斧", "任意击杀缩冷却"], ["zodiac", "黄道戒", "消耗技能命中缩冷却"], ["epiphany", "灵光悟", "高回复覆盖"]] },
    ],
    rotation: [{ title: "开局叠风", action: "开启劲风煞并达到三层，再开灵光悟。", reason: "内力风暴和京四郎腰带共同提供稳定回精。" }, { title: "疾风探图", action: "沿地图长轴连续疾风击，优先走能覆盖更多分叉的路线。", reason: "上帝僧的收益来自每小时检查更多地图，而不是清空每只怪。" }, { title: "精气半空就补", action: "依次使用致盲闪、风幻身主动，不要等完全见底。", reason: "NS手柄资源清空后容易卡在错误目标旁。" }, { title: "精英顺手击杀", action: "T16与蓝门模式停半秒处理精英。", reason: "寅剑和梅斧会换来更长的灵光悟与致盲闪覆盖。" }, { title: "外观路线及时重开", action: "检查完高价值区域后直接退出重开，不追零散怪和普通宝箱。", reason: "彩虹地精与宠物路线只计算单位时间内检查的地图数量。" }],
    pushNote: "T16小秘境和低层蓝门使用千飓六件倍率、翔龙飞爪与强者宝石保留清怪能力；若伤害不够就降层，不要牺牲回精硬撑。", speedNote: "彩虹地精、宠物与外观路线以极限位移为先；难度可以降到普通，地精刷新率不会因难度降低。", lowNote: "先拿千飓五件、皇家华戒、瑟夫之法和寅剑；回精循环成立比远古品质重要。", highNote: "高巅峰优先冷却、减耗、最大精气和拾取距离；伤害溢出后不必继续堆范围伤。", source: "https://www.diablofans.com/builds/82070-ultimate-rainbow-goblin-farming-monk", purpose: "nephalem-rift", supportedContent: ["T16小秘境", "低层蓝门", "彩虹地精", "宠物与外观路线"], defaultMode: "push", modeLabels: { push: "T16小秘境 / 低层蓝门", speed: "地精 / 外观路线" }, consoleNote: "不要按住疾风击不放：用摇杆指向屏幕边缘后短促连按，避免自动锁定把角色拉回怪群。精气到一半就按致盲闪或风幻身。", powerSets: { push: ["god-burst", "god-seph", "god-royal", "god-messerschmidt"], speed: ["god-burst", "god-seph", "god-royal", "god-messerschmidt"] }, defaultLoadoutId: "raiment-6", loadouts: [
      {
        id: "raiment-6", label: "千飓 6", title: "千飓五件＋华戒", summary: "疾风击自己承担清怪与跑图，装备和威能集中服务回精、减耗与击杀刷新。", bestFor: "低层蓝门、外观路线；想保留“疾风击就是输出”手感。", tradeoff: "单次清屏范围较小，T16高密度地图通常不如幻身混搭省心。",
      },
      {
        id: "inna-5-raiment-3", label: "千飓 3＋伊娜 5", title: "千飓四件＋尹娜六件", summary: "皇家华戒让三件千飓获得疾风击回充，同时让五件尹娜召出完整幻身；疾风负责赶路，水幻身负责清屏。", bestFor: "T16小秘境、悬赏、钥匙与幻境；优先追求效率和大范围清怪。", tradeoff: "更依赖皇家华戒、粗糙靴和小神之腕，疾风击本身不再是主要伤害来源。", set: "千飓战甲 3件 / 尹娜的真言 5件", core: "无限疾风赶路 → 水幻身清屏", gear: innaRaimentGodGear, skills: innaRaimentGodSkills, powers: innaRaimentGodPowers,
        passives: [passive("beacon-of-ytar", "伊塔之辉", "缩短灵光悟、致盲闪和幻身主动冷却。"), passive("exalted-soul", "超绝", "提高最大精气与每秒回复，扩大疾风击资源池。"), passive("chant-of-resonance", "共鸣颂歌", "真言在技能栏时继续提供回精和减耗。"), passive("fleet-footed", "迅步", "直接提高非战斗路线移动速度。")],
        links: [
          { title: "双套装同时生效", category: "damage", conclusion: "三件千飓负责无限疾风，五件尹娜负责幻身清屏；皇家华戒是整套构筑的连接器。", steps: [["god-hybrid-royal", "皇家华戒", "两套需求各减一件"], ["god-raiment-shoulders", "千飓三件", "激活四件疾风回充"], ["god-inna-head", "尹娜五件", "激活六件幻身"], ["dashing-strike", "疾风击", "连续跨屏赶路"], ["mystic-ally", "水幻身", "主动清屏"]] },
          { title: "一键回精加速", category: "resource", conclusion: "精气下降时按致盲闪，同时恢复资源并触发瑞秋移速。", steps: [["blinding-flash", "畏惧之光", "恐惧周围敌人"], ["god-hybrid-seph", "瑟夫之法", "立即恢复精气"], ["god-hybrid-rechel", "瑞秋戒", "恐惧触发移速"], ["dashing-strike", "疾风击", "继续跨屏"]] },
          { title: "幻身清屏链", category: "damage", conclusion: "接近精英时飓风破标记，再主动水幻身；不要停下来用疾风击磨血。", steps: [["cyclone-strike", "飓风破", "聚怪并标记"], ["god-lesser-gods", "小神之腕", "放大幻身伤害"], ["god-hybrid-crudest", "粗糙至极靴", "幻身数量翻倍"], ["mystic-ally", "水幻身", "大范围清屏"]] },
        ],
        rotation: [{ title: "疾风探图", action: "沿地图长轴连续使用疾风击。", reason: "千飓四件返还充能，移动不需要依赖命中。" }, { title: "半精补能", action: "精气降至一半时使用致盲闪。", reason: "瑟夫回精和瑞秋移速由同一次按键触发。" }, { title: "标记精英", action: "接近精英或高密度时使用飓风破。", reason: "小神之腕只放大被飓风破命中的目标。" }, { title: "幻身清屏", action: "标记后立即主动水幻身。", reason: "尹娜六件与粗糙靴使幻身成为主要伤害。" }, { title: "击杀后连冲", action: "寅剑生效后快速检查下一片区域。", reason: "短冷却窗口应转化为更多地图覆盖。" }],
        powerSets: { push: ["god-hybrid-ingeom-power", "god-hybrid-seph", "god-hybrid-royal", "god-hybrid-crudest"], speed: ["god-hybrid-ingeom-power", "god-hybrid-seph", "god-hybrid-royal", "god-hybrid-crudest"] }, consoleNote: "NS上把疾风击和幻身诀分开放在两个肩键：赶路短促连按疾风，看到精英先飓风破再按幻身；避免两个技能连续误触。",
      },
    ],
  },
];

export const MONK_BUILDS: Record<string, BuildGuide> = Object.fromEntries(seeds.map((seed) => {
  const guide = createClassGuide(seed);
  return [guide.id, guide];
}));
