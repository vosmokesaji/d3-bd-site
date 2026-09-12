import { createClassGuide, GEMS, itemFile, jewelry, legendary, passive, power, setGear, skill, type ClassGuideSeed, type GearSeed } from "./class-build-factory";
import { validateReviewedBuildGuide, type BuildChoicePolicy, type BuildConfiguration, type BuildConfigurationPatch, type BuildGuide, type BuildScenario, type GuideGear, type GuidePower, type ParagonGuide } from "./build-guides";

const firebird: GearSeed[] = [
  setGear("firebird-head", "头部", "火鸟之羽", "firebirds-plume-unique_helm_set_06_x1.png", "火鸟套部件；点燃目标后由非引导火焰技能触发燃烧伤害。", "爆炸冲击"),
  setGear("firebird-shoulders", "肩部", "火鸟之翼", "firebirds-pinions-unique_shoulder_set_06_x1.png", "火鸟套部件。", "爆炸冲击"),
  setGear("firebird-chest", "胸部", "火鸟之胸", "firebirds-breast-unique_chest_set_06_x1.png", "火鸟套部件。", "爆炸冲击"),
  setGear("firebird-gloves", "手部", "火鸟之爪", "firebirds-talons-unique_gloves_set_06_x1.png", "火鸟套部件。"),
  setGear("firebird-pants", "腿部", "火鸟之绒", "firebirds-down-unique_pants_set_06_x1.png", "火鸟套部件。"),
  setGear("firebird-boots", "脚部", "火鸟之足", "firebirds-tarsi-unique_boots_set_06_x1.png", "火鸟套部件；爆炸冲击技能伤优先。", "爆炸冲击"),
];

const delsere: GearSeed[] = [
  setGear("dmo-head", "头部", "遮蔽面具", "shrouded-mask-unique_helm_set_02_p2.png", "德尔西尼套部件；时间延缓内的敌人承受更高伤害。", "能量气旋"),
  setGear("dmo-shoulders", "肩部", "绝望肩甲", "dashing-pauldrons-of-despair-unique_shoulder_set_02_p2.png", "德尔西尼套部件。", "能量气旋"),
  setGear("dmo-chest", "胸部", "真理甲胄", "harness-of-truth-unique_chest_set_02_p2.png", "德尔西尼套部件。", "能量气旋"),
  setGear("dmo-gloves", "手部", "凶猛护手", "fierce-gauntlets-unique_gloves_set_02_p2.png", "德尔西尼套部件。"),
  setGear("dmo-pants", "腿部", "神秘护腿", "leg-guards-of-mystery-unique_pants_set_02_p2.png", "德尔西尼套部件。"),
  setGear("dmo-boots", "脚部", "命运行者", "striders-of-destiny-unique_boots_set_02_p2.png", "德尔西尼套部件；能量气旋技能伤优先。", "能量气旋"),
];

const vyr: GearSeed[] = [
  setGear("vyr-head", "头部", "维尔的无眼颅骨", "vyrs-sightless-skull-unique_helm_set_13_x1.png", "维尔套部件；御法者获得所有符文并按层数攻防。", "御法者"),
  setGear("vyr-shoulders", "肩部", "维尔的傲慢肩甲", "vyrs-proud-pauldrons-unique_shoulder_set_13_x1.png", "维尔套部件。", "御法者"),
  setGear("vyr-chest", "胸部", "维尔的惊人光环", "vyrs-astonishing-aura-unique_chest_set_13_x1.png", "维尔套部件。", "御法者"),
  setGear("vyr-gloves", "手部", "维尔的攫取护手", "vyrs-grasping-gauntlets-unique_gloves_set_13_x1.png", "维尔套部件。"),
  setGear("vyr-pants", "腿部", "维尔的华丽装束", "vyrs-fantastic-finery-unique_pants_set_13_x1.png", "维尔套部件。"),
  setGear("vyr-boots", "脚部", "维尔的昂扬姿态", "vyrs-swaggering-stance-unique_boots_set_13_x1.png", "维尔套部件；御法者技能伤优先。", "御法者"),
];

const typhon: GearSeed[] = [
  setGear("typhon-head", "头部", "提丰的额骨", "typhons-frons-p68_unique_helm_set_03.png", "提丰套部件；多头蛇头数同时提供伤害与减伤。", "多头蛇"),
  setGear("typhon-shoulders", "肩部", "提丰的胫骨", "typhons-tibia-p68_unique_shoulder_set_03.png", "提丰套部件。", "多头蛇"),
  setGear("typhon-chest", "胸部", "提丰的胸腔", "typhons-thorax-p68_unique_chest_set_03.png", "提丰套部件。", "多头蛇"),
  setGear("typhon-gloves", "手部", "提丰的利爪", "typhons-claws-p68_unique_gloves_set_03.png", "提丰套部件。"),
  setGear("typhon-pants", "腿部", "提丰的腹部", "typhons-abdomen-p68_unique_pants_set_03.png", "提丰套部件。"),
  setGear("typhon-boots", "脚部", "提丰的跗骨", "typhons-tarsus-p68_unique_boots_set_03.png", "提丰套部件；多头蛇技能伤优先。", "多头蛇"),
];

const commonPassives = [
  passive("elemental-exposure", "元素易伤", "不同元素攻击叠加目标易伤，四系构筑收益最高。"),
  passive("galvanizing-ward", "电化护盾", "一段时间未受伤后获得护盾，保护斯奎特。"),
  passive("audacity", "无畏", "近距离敌人承受更多伤害。"),
  passive("unstable-anomaly", "不稳异能", "受到致命伤害时保命。"),
];

const wand = (id: string, name: string, file: string, effect: string) => legendary(id, "主手", name, file, effect, { base: "魔杖" });
const source = (id: string, name: string, file: string, effect: string) => legendary(id, "副手", name, file, effect, { base: "魔法师副手" });

const seeds: ClassGuideSeed[] = [
  {
    classKey: "wizard", id: "tal-meteor", name: "塔拉夏陨石", set: "塔拉夏的法理", core: "四系叠层 → 陨石持续轰炸", summary: "轮流造成四种元素伤害维持塔拉夏层数，陨石由资源消耗与流星雨持续触发，头盔和靴子提供专属乘区。", difficulty: "中等 · 四系管理", follower: "魔女", followerReason: "冷却与控场帮助传送、防御技能和陨石战区稳定。", element: "奥术", coreSkill: "陨石术",
    gear: [legendary("mempo", "头部", "暮光头盔", "mempo-of-twilight-p74_unique_helm_006.png", "陨石获得流星雨符文并提高伤害。", { skill: "陨石术" }), legendary("aughild-shoulders", "肩部", "奥吉德的力量", "/d3/aughild-shoulders.png", "与奥吉德护腕组成精英攻防。", { quality: "set", method: ["悬赏图纸", "铁匠锻造", "不要黄装升级"] }), setGear("tal-chest", "胸部", "塔拉夏的无情追猎", "tal-rashas-relentless-pursuit-unique_chest_014_x1.png", "塔拉夏套部件；不同元素攻击叠层。", "陨石术"), setGear("tal-gloves", "手部", "塔拉夏的掌控", "tal-rashas-grasp-p2_unique_gloves_02.png", "塔拉夏套部件。"), legendary("aughild-bracers", "腕部", "奥吉德的搜捕", "/d3/aughild-bracers.png", "奥吉德套装护腕。", { quality: "set", element: "奥术", method: ["悬赏图纸", "铁匠锻造", "不要黄装升级"] }), setGear("tal-belt", "腰部", "塔拉夏的束带", "tal-rashas-brace-unique_belt_006_x1.png", "塔拉夏套部件。", "陨石术"), setGear("tal-pants", "腿部", "塔拉夏的步伐", "tal-rashas-stride-p2_unique_pants_03.png", "塔拉夏套部件。"), legendary("nilfur", "脚部", "尼芙尔的夸耀", "nilfurs-boast-p61_unique_boots_01.png", "提高陨石伤害，命中少量敌人时再次提高。", { skill: "陨石术" }), { ...setGear("tal-amulet", "颈部", "塔拉夏的誓言", "tal-rashas-allegiance-unique_amulet_007_x1.png", "塔拉夏套首饰部件。"), gem: "trapped" }, jewelry("coe", "stricken"), jewelry("karini", "zei"), legendary("smoldering-core", "主手", "焚炉核心", "the-smoldering-core-p74_unique_staff_103.png", "次要技能使陨石持续落在目标并提高伤害。", { base: "法杖" })],
    skills: [skill("meteor", "陨石术", "星之契约", "主要伤害；暮光头盔附加流星雨。"), skill("black-hole", "黑洞", "法术窃取", "聚怪并提供奥术元素。"), skill("familiar", "魔宠", "火焰魔宠", "提供火焰元素与常驻增伤。"), skill("storm-armor", "风暴护甲", "风暴之力", "提供闪电元素并触发卡里尼减伤。"), skill("teleport", "传送", "安全通道", "调整陨石落点与获得减伤。"), skill("magic-weapon", "魔法武器", "偏斜护盾", "攻击获得护盾，保护斯奎特与电化护盾。")], passives: commonPassives,
    powers: [power("grand-vizier", "武器", "大维兹尔之杖", "the-grand-vizier-p61_unique_staff_009.png", "降低陨石消耗并提高伤害。", "星之契约的资源与技能乘区。"), power("ashnagarr", "防具", "阿什纳加的血腕", "ashnagarrs-blood-bracer-p4_unique_bracer_004.png", "护盾强度翻倍。", "魔法武器偏斜和电化护盾都获益。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "让塔拉夏五件与奥吉德两件同时成立。", "第一幕/第四幕悬赏箱。"), power("squirts", "第4槽", "斯奎特的项链", "squirts-necklace-p66_unique_amulet_010.png", "未受伤时叠加伤害。", "第39赛季第四槽在塔拉夏项链占位时保留斯奎特乘区。")],
    links: [{ title: "四系叠层", category: "damage", conclusion: "火、冰、闪电、奥术必须持续轮换，少一系就少塔拉夏层数。", steps: [["familiar", "火焰魔宠", "火焰层"], ["storm-armor", "风暴护甲", "闪电层"], ["black-hole", "黑洞", "奥术层"], ["meteor", "陨石", "冰霜/奥术层与主伤"]] }, { title: "陨石专属乘区", category: "damage", conclusion: "暮光头盔、尼芙尔和大维兹尔分别提供多陨石、技能乘区和减耗。", steps: [["mempo", "暮光头盔", "附加流星雨"], ["nilfur", "尼芙尔", "陨石乘区"], ["grand-vizier", "大维兹尔", "减耗增伤"], ["meteor", "持续轰炸", "主要输出"]] }, { title: "护盾卡里尼", category: "defense", conclusion: "远处目标触发卡里尼，偏斜护盾与血腕保护斯奎特。", steps: [["storm-armor", "风暴护甲", "命中远处敌人"], ["karini", "卡里尼", "巨额减伤"], ["magic-weapon", "偏斜护盾", "攻击生成护盾"], ["ashnagarr", "血腕", "护盾翻倍"]] }],
    rotation: [{ title: "建立四系", action: "依次触发火、闪电、奥术与陨石元素。", reason: "叠满塔拉夏攻防。" }, { title: "保持卡里尼", action: "让风暴护甲命中远处敌人。", reason: "主要减伤不能断。" }, { title: "黑洞聚怪", action: "把精英与白怪拉到同一落点。", reason: "陨石需要密度和固定战区。" }, { title: "连续陨石", action: "资源充足时持续施放星之契约。", reason: "大维兹尔减耗并放大。" }, { title: "传送换位", action: "地板危险时用传送换角度。", reason: "保持护盾和斯奎特层数。" }], pushNote: "维持四系与卡里尼，把精英聚在焚炉核心持续落点中。", speedNote: "传送穿图，四系自动维持后连续落陨石。", lowNote: "暮光头盔、尼芙尔靴和大维兹尔优先。", highNote: "元素伤、范围伤、资源上限与护盾覆盖决定上限。", source: "https://www.icy-veins.com/d3/wizard-meteor-build-with-tal-rasha",
  },
  {
    classKey: "wizard", id: "lod-meteor", name: "梦遗陨石", set: "梦之遗礼", core: "远古散件 → 星之契约陨石", summary: "梦遗用远古散件换取攻防，保留暮光头盔、尼芙尔靴、大维兹尔和焚炉核心的陨石发动机。", difficulty: "高装备门槛 · 高上限", follower: "魔女", followerReason: "控场和冷却帮助护盾、传送与陨石战区。", element: "奥术", coreSkill: "陨石术",
    gear: [legendary("mempo", "头部", "暮光头盔", "mempo-of-twilight-p74_unique_helm_006.png", "陨石获得流星雨并提高伤害。", { skill: "陨石术" }), legendary("skeleton-king", "肩部", "骷髅王的肩铠", "pauldrons-of-the-skeleton-king-unique_shoulder_103_x1.png", "远古散件并提供保命机会。"), legendary("aquila", "胸部", "天鹰胸甲", "aquila-cuirass-p4_unique_chest_012.png", "高奥能时减伤。"), legendary("stone-gauntlets", "手部", "岩石护手", "stone-gauntlets-p66_unique_gloves_007.png", "受击叠护甲，传送和控制免疫管理负面。"), legendary("ashnagarr", "腕部", "阿什纳加的血腕", "ashnagarrs-blood-bracer-p4_unique_bracer_004.png", "护盾强度翻倍。", { element: "奥术" }), legendary("witching-hour", "腰部", "巫异时刻", "the-witching-hour-unique_belt_009_x1.png", "攻速与暴击伤害。"), legendary("blackthorne", "腿部", "黑棘的战袍裤", "blackthornes-jousting-mail-unique_pants_013_x1.png", "只穿一件，不得激活套装。", { warning: "梦遗构筑不能激活任何两件套效果。" }), legendary("nilfur", "脚部", "尼芙尔的夸耀", "nilfurs-boast-p61_unique_boots_01.png", "陨石技能乘区。", { skill: "陨石术" }), jewelry("squirt", "lod"), jewelry("coe", "stricken"), jewelry("karini", "trapped"), legendary("smoldering-core", "主手", "焚炉核心", "the-smoldering-core-p74_unique_staff_103.png", "陨石持续落向目标并叠加伤害。", { base: "法杖" })],
    skills: [skill("meteor", "陨石术", "星之契约", "主要爆发，消耗剩余奥能放大。"), skill("storm-armor", "风暴护甲", "风暴之力", "触发卡里尼并降低消耗。"), skill("magic-weapon", "魔法武器", "偏斜护盾", "攻击生成护盾。"), skill("teleport", "传送", "浩劫传送", "控制敌人并调整落点。"), skill("black-hole", "黑洞", "法术窃取", "聚怪和增伤。"), skill("familiar", "魔宠", "秘能回流", "提高资源恢复。")], passives: commonPassives,
    powers: [power("grand-vizier", "武器", "大维兹尔之杖", "the-grand-vizier-p61_unique_staff_009.png", "陨石减耗增伤。", "星之契约核心乘区。"), power("magefist", "防具", "法师之拳", "magefist-p41_unique_gloves_014.png", "提高火焰伤害。", "可按符文元素替换功能散件。"), power("unity", "首饰", "团结", "unity-unique_ring_010_x1.png", "与不死随从分摊伤害。", "梦遗高层稳定坚韧。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补单体。")],
    links: [{ title: "梦遗散件", category: "damage", conclusion: "远古数量与正确词缀比太古外观重要；任何两件套奖励都会关闭梦遗。", steps: [["squirts", "梦遗宝石", "镶嵌在项链"], ["blackthorne", "黑棘单件", "只穿一件"], ["aquila", "远古散件", "累计梦遗攻防"]] }, { title: "星之契约资源", category: "resource", conclusion: "奥能越高，星之契约单次越强；不要在低资源时连点。", steps: [["familiar", "秘能回流", "恢复奥能"], ["grand-vizier", "大维兹尔", "降低消耗"], ["meteor", "星之契约", "消耗剩余奥能放大"]] }, { title: "护盾防线", category: "defense", conclusion: "风暴护甲卡里尼、偏斜护盾和血腕共同保护斯奎特。", steps: [["storm-armor", "风暴护甲", "远距触发"], ["karini", "卡里尼", "巨额减伤"], ["magic-weapon", "偏斜护盾", "生成护盾"], ["ashnagarr", "血腕", "护盾翻倍"]] }],
    rotation: [{ title: "检查梦遗", action: "确认没有套装奖励激活。", reason: "否则梦遗失效。" }, { title: "保持卡里尼", action: "让风暴护甲命中远处敌人。", reason: "主要减伤。" }, { title: "聚怪控制", action: "黑洞和传送把目标固定在落点。", reason: "焚炉核心需要持续落向同一目标。" }, { title: "蓄满奥能", action: "等待奥能接近满值。", reason: "星之契约按资源放大。" }, { title: "元素陨石", action: "全能周期内连续投放陨石。", reason: "梦遗、尼芙尔和大维兹尔叠加。" }], pushNote: "满奥能后把星之契约压进元素周期，并保持固定落点。", speedNote: "减少蓄能等待，以传送和低消耗陨石推进。", lowNote: "先提升梦遗等级并增加远古数量。", highNote: "奥术元素、资源上限、范围伤和护盾覆盖决定上限。", source: "https://www.icy-veins.com/d3/wizard-lod-meteor-build",
  },
  {
    classKey: "wizard", id: "firebird-eb", name: "火鸟爆炸冲击", set: "火鸟的华服", core: "引导点燃 → 爆炸冲击触发燃烧", summary: "引导技能负责点燃，火鸟六件只由非引导火焰技能触发；沃尔魔杖让爆炸冲击多次爆炸。", difficulty: "中等 · 贴身触发", follower: "魔女", followerReason: "控场与冷却帮助爆炸冲击、传送和防御循环。", element: "火焰", coreSkill: "爆炸冲击",
    gear: [...firebird, legendary("ashnagarr", "腕部", "阿什纳加的血腕", "ashnagarrs-blood-bracer-p4_unique_bracer_004.png", "护盾强度翻倍。", { element: "火焰" }), legendary("shame-delsere", "腰部", "德尔西尼的耻辱", "the-shame-of-delsere-p4_unique_belt_02.png", "主要技能攻速提高并大量回奥能。"), jewelry("squirt", "trapped"), jewelry("focus", "taeguk"), jewelry("restraint", "stricken"), legendary("deathwish", "主手", "绝命", "deathwish-p61_unique_sword_1h_112_x1.png", "引导后提高所有伤害。", { base: "单手剑" }), source("firebird-eye", "火鸟之眼", "firebirds-eye-unique_orb_set_06_x1.png", "火鸟套装副手，提供套装件数和火焰词缀。")],
    skills: [skill("disintegrate", "瓦解射线", "混沌节点", "点燃敌人并启动绝命引导增伤；本身不是燃烧触发。"), skill("explosive-blast", "爆炸冲击", "连锁反应", "非引导火焰技能，触发火鸟燃烧。"), skill("spectral-blade", "幽光刃", "烈焰之刃", "回奥能并触发克己。"), skill("teleport", "传送", "安全通道", "贴近目标与减伤。"), skill("magic-weapon", "魔法武器", "偏斜护盾", "攻击生成护盾。"), skill("frost-nova", "冰霜新星", "冻骨之寒", "控制并触发无情猛袭。")], passives: commonPassives,
    powers: [power("wand-woh", "武器", "沃尔魔杖", "wand-of-woh-p61_unique_wand_101_x1.png", "爆炸冲击额外爆炸多次并提高伤害。", "一次按键产生多次火鸟触发。"), power("mantle-channeling", "防具", "导能披肩", "mantle-of-channeling-p4_unique_shoulder_103.png", "引导时增伤减伤。", "瓦解射线点燃阶段自然生效。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "为功能腰带与腕部释放位置。", "第一幕/第四幕悬赏箱。"), power("orb-depth", "第4槽", "无尽深渊法珠", "orb-of-infinite-depth-p61_unique_orb_004.png", "爆炸冲击命中后叠加增伤与减伤。", "第39赛季第四槽让每次爆炸同时建立攻防。")],
    links: [{ title: "点燃与触发分工", category: "damage", conclusion: "瓦解只负责点燃；真正触发火鸟燃烧的是爆炸冲击。", steps: [["disintegrate", "瓦解射线", "给敌人点燃"], ["firebird-head", "火鸟六件", "记录燃烧"], ["explosive-blast", "爆炸冲击", "非引导火焰触发"], ["wand-woh", "沃尔魔杖", "额外多次爆炸"]] }, { title: "引导后爆发", category: "damage", conclusion: "先短暂引导建立绝命，再贴身爆炸；不要只按爆炸不点燃。", steps: [["disintegrate", "短暂引导", "点燃并启动绝命"], ["deathwish", "绝命", "引导后增伤"], ["explosive-blast", "连锁反应", "集中触发"]] }, { title: "爆炸攻防", category: "defense", conclusion: "无尽深渊法珠让爆炸命中层数同时提高伤害与坚韧。", steps: [["explosive-blast", "爆炸命中", "叠层"], ["orb-depth", "无尽深渊", "层数攻防"], ["magic-weapon", "偏斜护盾", "保护斯奎特"], ["ashnagarr", "血腕", "护盾翻倍"]] }],
    rotation: [{ title: "幽光回能", action: "用幽光刃命中怪群。", reason: "触发克己并快速回奥能。" }, { title: "射线点燃", action: "短暂瓦解扫过全部目标。", reason: "建立火鸟燃烧与绝命。" }, { title: "传送贴近", action: "进入精英中心。", reason: "爆炸冲击是近身技能。" }, { title: "连续爆炸", action: "保持连锁反应命中。", reason: "沃尔和无尽深渊共同叠加。" }, { title: "重新点燃", action: "新怪进入或点燃消失时补射线。", reason: "未点燃目标不会触发火鸟。" }], pushNote: "短引导点燃后贴身连续爆炸，保持无尽深渊层数。", speedNote: "传送穿图，每组怪短射线加一次爆炸。", lowNote: "沃尔魔杖和无尽深渊法珠优先。", highNote: "火焰元素、范围伤、冷却与护盾覆盖决定上限。", source: "https://www.icy-veins.com/d3/wizard-firebird-explosive-blast-build",
  },
  {
    classKey: "wizard", id: "delsere-twister", name: "德尔西尼旋风", set: "德尔西尼的杰作", core: "时间延缓建区 → 能量气旋反复命中", summary: "时间延缓定义战区，扭曲之剑按气旋数量增伤，兰斯勒护腕自动聚怪，狭窄地形让气旋重复命中。", difficulty: "高操作 · 地形依赖", follower: "魔女", followerReason: "额外控场帮助敌人留在时间延缓和气旋反弹区。", element: "奥术", coreSkill: "能量气旋",
    gear: [...delsere, legendary("ranslor", "腕部", "兰斯勒的愚行", "ranslors-folly-p61_unique_bracer_108_x1.png", "能量气旋周期性拉拽附近敌人并提高伤害。", { element: "奥术", skill: "能量气旋" }), legendary("shame-delsere", "腰部", "德尔西尼的耻辱", "the-shame-of-delsere-p4_unique_belt_02.png", "主要技能快速回奥能。"), jewelry("traveler", "trapped"), jewelry("compass", "stricken"), jewelry("coe", "gogok"), legendary("twisted-sword", "主手", "扭曲之剑", "the-twisted-sword-p610_unique_sword_1h_107.png", "场上每个能量气旋提高技能伤害。", { base: "单手剑" }), source("orb-depth", "无尽深渊法珠", "orb-of-infinite-depth-p61_unique_orb_004.png", "爆炸冲击命中后提供增伤与减伤。")],
    skills: [skill("energy-twister", "能量气旋", "狂风笼罩", "主要输出；狭窄地形反复穿过目标。"), skill("slow-time", "时间延缓", "时空扭曲", "建立德尔西尼战区并让敌人易伤。"), skill("spectral-blade", "幽光刃", "防护之刃", "快速回奥能并获得护盾。"), skill("explosive-blast", "爆炸冲击", "连锁反应", "叠无尽深渊法珠攻防。"), skill("teleport", "传送", "浩劫传送", "调整到墙角和狭窄地形。"), skill("magic-weapon", "魔法武器", "偏斜护盾", "攻击获得护盾。")], passives: commonPassives,
    powers: [power("valthek", "武器", "沃尔塞克的训斥", "valtheks-rebuke-p610_unique_staff_102.png", "能量气旋直线前进并提高伤害。", "让气旋在墙角持续穿透。"), power("crown-primus", "防具", "至尊皇冠", "crown-of-the-primus-p74_unique_wizardhat_104.png", "时间延缓获得全部符文。", "战区同时提供攻速、减速与控制。"), power("zodiac", "首饰", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗技能命中缩短冷却。", "刷新传送与爆炸冲击。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补单体。")],
    links: [{ title: "时间延缓战区", category: "damage", conclusion: "敌人和角色都应围绕时间延缓作战，离开区域会丢失德尔西尼倍率。", steps: [["slow-time", "时间延缓", "建立战区"], ["crown-primus", "至尊皇冠", "获得全符文"], ["dmo-head", "德尔西尼六件", "战区目标增伤"]] }, { title: "气旋数量乘区", category: "damage", conclusion: "持续施放保持场上气旋数量，狭窄地形让每个气旋重复命中。", steps: [["energy-twister", "能量气旋", "持续生成"], ["twisted-sword", "扭曲之剑", "按场上数量增伤"], ["valthek", "沃尔塞克", "直线推进"], ["ranslor", "兰斯勒", "自动聚怪"]] }, { title: "爆炸攻防", category: "defense", conclusion: "进入战区先爆炸叠满法珠，再站定放气旋。", steps: [["explosive-blast", "爆炸冲击", "命中叠层"], ["orb-depth", "无尽深渊", "增伤减伤"], ["magic-weapon", "偏斜护盾", "护盾覆盖"]] }],
    rotation: [{ title: "选择地形", action: "优先在墙角、门口或狭窄走廊作战。", reason: "气旋能重复命中。" }, { title: "铺时间延缓", action: "覆盖精英与密度。", reason: "启动德尔西尼战区。" }, { title: "叠爆炸法珠", action: "贴近使用爆炸冲击。", reason: "建立攻防层数。" }, { title: "幽光回能", action: "奥能不足时快速幽光刃。", reason: "腰带高效回能。" }, { title: "持续气旋", action: "沿墙角连续施放能量气旋。", reason: "扭曲之剑按数量放大。" }], pushNote: "选择墙角和窄门建立时间延缓，让气旋反复穿过同一目标。", speedNote: "减少地形等待，时间延缓后快速投放数个气旋。", lowNote: "扭曲之剑、兰斯勒和沃尔塞克是核心三件。", highNote: "奥术元素、范围伤和地形选择决定上限。", source: "https://www.icy-veins.com/d3/wizard-energy-twister-build-with-delsere-set",
  },
  {
    classKey: "wizard", id: "vyr-archon", name: "维尔御法者", set: "维尔的神装", core: "变身外叠充能 → 御法者内外层重叠", summary: "变身外用技能给朵套充能，进入御法者叠维尔层数；尊者头巾让上一轮层数延续，形成双层重叠强势期。", difficulty: "高操作 · 双阶段循环", follower: "魔女", followerReason: "冷却缩减帮助御法者无缝循环，控场覆盖变身外脆弱期。", element: "闪电", coreSkill: "御法者",
    gear: [...vyr, legendary("ashnagarr", "腕部", "阿什纳加的血腕", "ashnagarrs-blood-bracer-p4_unique_bracer_004.png", "护盾强度翻倍。", { element: "闪电" }), legendary("fazula", "腰部", "法祖拉的不可信链环", "fazulas-improbable-chain-p4_unique_belt_07.png", "进入御法者时立即获得层数。", { skill: "御法者" }), jewelry("squirt", "trapped"), jewelry("coe", "stricken"), jewelry("karini", "gogok"), wand("chantodo-will", "迦陀朵的意志", "chantodos-will-unique_wand_012_x1.png", "与法器组成迦陀朵套；变身外攻击叠充能，变身时释放波动。"), source("chantodo-force", "迦陀朵的力量", "chantodos-force-unique_orb_011_x1.png", "迦陀朵套副手，变身波动随充能层数提高。")],
    skills: [skill("archon", "御法者", "传送", "主要变身阶段；维尔获得全部符文。"), skill("arcane-torrent", "奥术洪流", "静电放射", "变身外叠迦陀朵充能并触发黄道。"), skill("black-hole", "黑洞", "绝对零度", "变身外聚怪并增伤。"), skill("storm-armor", "风暴护甲", "风暴之力", "触发卡里尼减伤。"), skill("magic-weapon", "魔法武器", "偏斜护盾", "攻击生成护盾。"), skill("teleport", "传送", "安全通道", "变身外的保命位移。")], passives: [passive("evocation", "唤法", "缩短御法者冷却。"), passive("dominance", "主宰", "击杀获得护盾，保护斯奎特。"), ...commonPassives.slice(0, 2)],
    powers: [power("furnace", "武器", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "御法者波动优先处理精英。"), power("swami", "防具", "尊者", "the-swami-p3_unique_wizardhat_003.png", "御法者结束后保留层数一段时间。", "下一次变身初期与旧层数重叠。"), power("zodiac", "首饰", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗技能命中缩短冷却。", "奥术洪流快速刷新御法者。"), power("orb-depth", "第4槽", "无尽深渊法珠", "orb-of-infinite-depth-p61_unique_orb_004.png", "爆炸命中提供攻防。", "第39赛季第四槽强化变身外阶段。")],
    links: [{ title: "迦陀朵充能", category: "resource", conclusion: "变身前尽量叠满充能；空层进入御法者会失去大量波动伤害。", steps: [["arcane-torrent", "奥术洪流", "变身外攻击"], ["chantodo-will", "迦陀朵套", "积累充能"], ["archon", "进入御法者", "释放伤害波动"]] }, { title: "双层重叠", category: "damage", conclusion: "上一轮御法者层数尚未消失时再次变身，是整套最强窗口。", steps: [["archon", "御法者", "击杀叠维尔层数"], ["swami", "尊者", "退出后保留层数"], ["zodiac", "黄道戒", "快速刷新变身"], ["fazula", "法祖拉腰带", "新变身立即加层"]] }, { title: "远距卡里尼", category: "defense", conclusion: "变身内外都要让风暴护甲触发卡里尼，尤其是脆弱的变身外阶段。", steps: [["storm-armor", "风暴护甲", "命中远处敌人"], ["karini", "卡里尼", "巨额减伤"], ["magic-weapon", "偏斜护盾", "护盾覆盖"], ["ashnagarr", "血腕", "护盾翻倍"]] }],
    rotation: [{ title: "变身外充能", action: "奥术洪流持续命中直到迦陀朵接近满层。", reason: "决定变身波动伤害。" }, { title: "保持卡里尼", action: "确认风暴护甲命中远处目标。", reason: "脆弱期主要减伤。" }, { title: "进入御法者", action: "充能和冷却就绪后变身。", reason: "法祖拉立即提供起始层数。" }, { title: "高速叠层", action: "优先清白怪并贴近精英。", reason: "维尔层数随命中和击杀增长。" }, { title: "抢双层窗口", action: "退出后尽快用洪流刷新并再次变身。", reason: "尊者旧层与新层重叠最强。" }], pushNote: "控制变身外时间，尽快进入尊者旧层与新御法层重叠窗口。", speedNote: "低层不等满充能，御法者传送连续清图。", lowNote: "迦陀朵两件、尊者和法祖拉腰带缺一不可。", highNote: "冷却、攻速、闪电元素和双层重叠时机决定上限。", source: "https://www.icy-veins.com/d3/wizard-vyr-archon-build",
  },
  {
    classKey: "wizard", id: "typhon-hydra", name: "提丰多头蛇", set: "提丰的面纱", core: "放置双蛇 → 头数维持攻防", summary: "提丰套按多头蛇头数提供伤害与减伤，蛇影烁光让可召唤数量翻倍，执政官头盔使冰蛇定期施放冰霜新星。", difficulty: "低操作 · 稳健推进", follower: "魔女", followerReason: "额外控场让冰蛇持续命中并保护远程站位。", element: "冰霜", coreSkill: "多头蛇",
    gear: [...typhon, legendary("ashnagarr", "腕部", "阿什纳加的血腕", "ashnagarrs-blood-bracer-p4_unique_bracer_004.png", "护盾强度翻倍。", { element: "冰霜" }), legendary("shame-delsere", "腰部", "德尔西尼的耻辱", "the-shame-of-delsere-p4_unique_belt_02.png", "主要技能快速回奥能。"), jewelry("squirt", "enforcer"), jewelry("coe", "stricken"), jewelry("karini", "trapped"), wand("serpent-sparker", "蛇影烁光", "serpents-sparker-p68_unique_wand_102.png", "允许同时召唤两只多头蛇并提高伤害。"), source("winter-flurry", "寒流", "winter-flurry-p610_unique_orb_005.png", "暴风雪中的敌人受到多头蛇更多伤害。")],
    skills: [skill("hydra", "多头蛇", "冰霜多头蛇", "主要宠物输出；两只蛇的头数同时提供套装攻防。"), skill("blizzard", "暴风雪", "冰封之雪", "标记战区并触发寒流副手。"), skill("spectral-blade", "幽光刃", "防护之刃", "回奥能并生成护盾。"), skill("storm-armor", "风暴护甲", "风暴之力", "触发卡里尼减伤。"), skill("teleport", "传送", "安全通道", "调整蛇的攻击角度。"), skill("magic-weapon", "魔法武器", "偏斜护盾", "攻击生成护盾。")], passives: [passive("cold-blooded", "冷血", "冰冷或冻结敌人承受更多伤害。"), passive("elemental-exposure", "元素易伤", "多元素叠加易伤。"), ...commonPassives.slice(1, 3)],
    powers: [power("fragment-destiny", "武器", "命运碎片", "fragment-of-destiny-p610_unique_wand_010.png", "主要技能攻速提高，并按命中叠加多头蛇伤害。", "幽光刃负责快速叠满。"), power("magistrate", "防具", "执政官头盔", "the-magistrate-p68_unique_wizardhat_103.png", "多头蛇定期施放冰霜新星并提高伤害。", "控制敌人并保护提丰头数。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "为腕部和腰带释放位置。", "第一幕/第四幕悬赏箱。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补单体。")],
    links: [{ title: "蛇头就是攻防", category: "defense", conclusion: "蛇头被打掉会同时降低伤害与减伤，危险时先重召而不是继续站桩。", steps: [["hydra", "冰霜多头蛇", "提供蛇头"], ["serpent-sparker", "蛇影烁光", "召唤两只"], ["typhon-head", "提丰六件", "按头数增伤减伤"]] }, { title: "暴风雪标记", category: "damage", conclusion: "每片战区先铺暴风雪，再让两只蛇集中攻击。", steps: [["blizzard", "暴风雪", "覆盖目标"], ["winter-flurry", "寒流", "目标承受更多蛇伤"], ["hydra", "双蛇", "持续攻击"]] }, { title: "主要技能叠层", category: "resource", conclusion: "定期用幽光刃叠命运碎片，同时回能和刷新护盾。", steps: [["spectral-blade", "幽光刃", "快速命中"], ["fragment-destiny", "命运碎片", "叠多头蛇增伤"], ["magic-weapon", "偏斜护盾", "生成护盾"], ["ashnagarr", "血腕", "护盾翻倍"]] }],
    rotation: [{ title: "放置双蛇", action: "在精英附近安全位置召出两只蛇。", reason: "头数决定套装攻防。" }, { title: "铺暴风雪", action: "覆盖精英和蛇的攻击区域。", reason: "启动寒流乘区。" }, { title: "幽光叠层", action: "短时间连续幽光刃。", reason: "叠命运碎片并回奥能。" }, { title: "保持卡里尼", action: "让风暴护甲命中远处敌人。", reason: "主要减伤。" }, { title: "蛇头掉落重召", action: "发现坚韧或输出下降时重新放蛇。", reason: "提丰层数随蛇头减少。" }], pushNote: "维持两只满头冰蛇、暴风雪标记与命运碎片层数。", speedNote: "每组怪放双蛇和暴风雪后立即传送。", lowNote: "蛇影烁光、寒流和执政官头盔优先。", highNote: "宠物攻速、冰霜元素和护盾覆盖决定上限。", source: "https://www.icy-veins.com/d3/wizard-frost-hydra-build-with-typhon",
  },
  {
    classKey: "wizard", id: "lod-orb", name: "梦遗冰封球", set: "梦之遗礼", core: "三元宝珠叠层 → 控制冰封球爆点", summary: "用幽光刃叠三元宝珠，再让冰封球在目标位置达到最大爆炸半径；不稳权杖追加爆炸。", difficulty: "中等 · 距离控制", follower: "魔女", followerReason: "远程控场能固定冰封球爆点，并帮助保护斯奎特。", element: "冰霜", coreSkill: "秘法光球",
    gear: [legendary("andariel", "头部", "安达莉尔的仪容", "andariels-visage-unique_helm_003_p2.png", "可滚冰霜元素并提高攻速。", { element: "冰霜" }), legendary("skeleton-king", "肩部", "骷髅王的肩铠", "pauldrons-of-the-skeleton-king-unique_shoulder_103_x1.png", "远古散件与额外保命。"), legendary("aquila", "胸部", "天鹰胸甲", "aquila-cuirass-p4_unique_chest_012.png", "高奥能减伤。"), legendary("frostburn", "手部", "霜燃", "frostburn-p41_unique_gloves_002.png", "冰霜增伤并冻结。", { element: "冰霜" }), legendary("ashnagarr", "腕部", "阿什纳加的血腕", "ashnagarrs-blood-bracer-p4_unique_bracer_004.png", "护盾翻倍。", { element: "冰霜" }), legendary("witching-hour", "腰部", "巫异时刻", "the-witching-hour-unique_belt_009_x1.png", "攻速与暴击伤害。"), legendary("blackthorne", "腿部", "黑棘的战袍裤", "blackthornes-jousting-mail-unique_pants_013_x1.png", "只穿一件，不激活套装。", { warning: "梦遗构筑不能激活任何套装奖励。" }), legendary("illusory", "脚部", "虚幻长靴", "illusory-boots-unique_boots_103_x1.png", "穿过敌人调整冰封球射线。"), jewelry("squirt", "lod"), jewelry("coe", "stricken"), jewelry("karini", "trapped"), wand("unstable-scepter", "不稳权杖", "unstable-scepter-p61_wand_norm_unique_02.png", "秘法光球额外爆炸一次并提高伤害。"), source("triumvirate", "三元宝珠", "triumvirate-p61_unique_orb_003.png", "主要技能命中叠层，每层提高秘法光球伤害。")],
    skills: [skill("arcane-orb", "秘法光球", "冰封球", "主要输出；球体最大距离爆炸命中最高。"), skill("spectral-blade", "幽光刃", "防护之刃", "叠三元宝珠、回奥能并生成护盾。"), skill("storm-armor", "风暴护甲", "风暴之力", "触发卡里尼。"), skill("magic-weapon", "魔法武器", "偏斜护盾", "攻击生成护盾。"), skill("teleport", "传送", "安全通道", "调整与目标的固定距离。"), skill("black-hole", "黑洞", "绝对零度", "聚怪并提高冰霜伤害。")], passives: [passive("cold-blooded", "冷血", "冰冷敌人承受更多伤害。"), passive("power-hungry", "能量饥渴", "远距离敌人承受更多伤害。"), ...commonPassives.slice(1, 3)],
    powers: [power("wizardspike", "武器", "巫师之刺", "wizardspike-p610_unique_dagger_010.png", "攻击有机会释放冰封球并提高技能伤害。", "幽光刃叠层时也能补额外光球。"), power("frostburn", "防具", "霜燃", "frostburn-p41_unique_gloves_002.png", "提高冰霜并冻结敌人。", "固定目标在爆点。"), power("unity", "首饰", "团结", "unity-unique_ring_010_x1.png", "与不死随从分摊伤害。", "梦遗高层稳定减伤。"), power("aether-walker", "第4槽", "以太行者", "aether-walker-p1_wand_norm_unique_01.png", "传送移除冷却改为消耗奥能。", "第39赛季第四槽让距离调整更灵活。")],
    links: [{ title: "三元叠层", category: "resource", conclusion: "每轮冰封球前先用幽光刃叠满三层；直接开球会少巨大乘区。", steps: [["spectral-blade", "幽光刃", "快速命中"], ["triumvirate", "三元宝珠", "叠三层"], ["arcane-orb", "冰封球", "消耗层数爆发"]] }, { title: "爆点距离", category: "damage", conclusion: "冰封球飞到最大距离时爆炸最密集；贴脸或射过头都会掉命中。", steps: [["teleport", "传送", "调整距离"], ["black-hole", "黑洞", "固定目标"], ["arcane-orb", "冰封球", "最大距离爆炸"], ["unstable-scepter", "不稳权杖", "追加一次爆炸"]] }, { title: "远距护盾", category: "defense", conclusion: "保持远距同时启动能量饥渴、卡里尼和斯奎特。", steps: [["storm-armor", "风暴护甲", "远距触发"], ["karini", "卡里尼", "巨额减伤"], ["magic-weapon", "偏斜护盾", "生成护盾"], ["squirts", "斯奎特", "护盾保护层数"]] }],
    rotation: [{ title: "检查梦遗", action: "确认没有任何套装奖励。", reason: "否则梦遗失效。" }, { title: "保持卡里尼", action: "让风暴护甲命中远处敌人。", reason: "主要减伤。" }, { title: "黑洞聚怪", action: "把精英固定在预定爆点。", reason: "冰封球需要准确距离。" }, { title: "幽光三击", action: "叠满三元宝珠。", reason: "建立光球乘区与护盾。" }, { title: "控制爆点", action: "在固定距离连续发射冰封球。", reason: "不稳权杖追加爆炸并完整命中。" }], pushNote: "保持固定射程，让冰封球最大距离爆炸压在精英中心。", speedNote: "以太行者连续传送，每组怪幽光叠层后快速发球。", lowNote: "不稳权杖和三元宝珠优先，距离比装备品质更先练习。", highNote: "冰霜元素、奥能上限、范围伤和爆点控制决定上限。", source: "https://www.icy-veins.com/d3/wizard-frozen-orb-build-with-legacy-of-dreams",
  },
];

const REVIEWED_AT = "2026-08-22";

const WIZARD_REVIEW_SOURCES: Record<string, string[]> = Object.fromEntries(seeds.map((seed) => [
  seed.id,
  [seed.source],
]));

function reviewGear(id: string, slot: string, name: string, file: string, effect: string, affixes: string[], acquisition: string[], gem?: GuideGear["gem"], warning?: string): GuideGear {
  return { id, slot, name, image: itemFile(file), quality: "legendary", effect, affixes, acquisition, gem, warning };
}

function reviewPower(id: string, slot: string, name: string, file: string, effect: string, logic: string, acquisition: string): GuidePower {
  return { id, slot, name, image: itemFile(file), effect, logic, acquisition };
}

const WIZARD_EXTRA_GEAR: GuideGear[] = [
  reviewGear("nemesis-bracers", "腕部", "复仇者护腕", "nemesis-bracers-unique_bracer_106_x1.png", "点击祭坛召唤精英，T16、蓝门和低层大秘境用来提高精英密度。", ["元素技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "只在速刷时替换冲层护腕"]),
  reviewGear("goldwrap", "腰部", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后按金币数量提高护甲，T16金币链提供近乎无限坚韧。", ["智力", "体能", "生命%", "护甲"], ["血岩碎片赌博腰带", "黄装升级：70级普通腰带", "离开金币内容后不要保留"]),
  reviewGear("avarice-band", "手指", "贪婪之戒", "avarice-band-unique_ring_108_x1.png", "拾取金币后扩大拾取范围，连接囤宝者与金织带。", ["镶孔", "暴击几率", "暴击伤害", "范围伤害"], ["第三幕/第四幕悬赏宝箱", "世界掉落", "T16金币链替换全能或受罚戒指"], GEMS.hoarder),
  reviewGear("warzechian", "腕部", "沃兹克护腕", "warzechian-armguards-unique_bracer_101_x1.png", "破坏场景物件后获得移速，悬赏和开阔图速刷收益高。", ["元素技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "只在需要赶路时替换复仇者"]),
  reviewGear("ingeom", "主手", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短冷却，低层大秘境和T16用于连续传送/变身。", ["高白字", "伤害%", "冷却缩减", "智力", "拉玛兰迪打孔"], ["黄装升级：70级单手剑", "世界掉落", "速刷时替换冲层武器"]),
  reviewGear("aether-walker-worn", "主手", "以太行者", "aether-walker-p1_wand_norm_unique_01.png", "传送移除冷却改为消耗秘能，用于T16和悬赏持续赶路。", ["高白字", "伤害%", "冷却缩减", "智力", "拉玛兰迪打孔"], ["黄装升级：70级魔杖", "世界掉落", "只在伤害溢出时穿戴"]),
];

const WIZARD_EXTRA_POWERS: GuidePower[] = [
  reviewPower("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "冲层和低层大秘境用来补精英/首领单体。", "黄装升级：70级双手钉锤"),
  reviewPower("ingeom", "武器", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短冷却。", "速刷时缩短传送、御法者、防御技能或陨石战区重置时间。", "黄装升级：70级单手剑"),
  reviewPower("aether-walker", "武器", "以太行者", "aether-walker-p1_wand_norm_unique_01.png", "传送不再有冷却，改为消耗秘能。", "T16、蓝门和悬赏把机动性放在单体输出之前。", "黄装升级：70级魔杖"),
  reviewPower("goldwrap", "防具", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后按金币数量提高护甲。", "配合囤宝者与贪婪之戒形成金币链，离开金币环境立即失效。", "血岩赌博腰带或黄装升级70级腰带"),
  reviewPower("avarice-band", "首饰", "贪婪之戒", "avarice-band-unique_ring_108_x1.png", "拾取金币后扩大拾取范围。", "速刷时让囤宝者掉落的金币更稳定连接金织带护甲链。", "第三幕/第四幕悬赏宝箱"),
  reviewPower("messerschmidt", "第4槽", "梅塞施密特的劫掠者", "messerschmidts-reaver-p66_unique_axe_2h_011.png", "击杀敌人缩短一个技能的剩余冷却。", "高巅峰速刷用击杀冷却补充寅剑精英空窗。", "黄装升级：70级双手斧"),
];

const WIZARD_LOW_PARAGON: ParagonGuide["pre800"] = {
  core: [
    { stat: "移动速度", target: "面板25%", reason: "鞋子缺移速时先补满，剩余点数再进智力。" },
    { stat: "最大秘能", target: "陨石/光球至少+25，其他BD按手感补", reason: "资源型技能先保证一次完整爆发。" },
    { stat: "智力", target: "剩余全部", reason: "低巅峰同时提供伤害与抗性。" },
  ],
  offense: [
    { stat: "冷却缩减", target: "需要循环的BD先点满", reason: "御法者、爆炸冲击、防御技能和传送都依赖冷却。" },
    { stat: "暴击几率", target: "50点", reason: "首饰和手套未成型前稳定暴击期望。" },
    { stat: "暴击伤害", target: "50点", reason: "与暴击几率配套。" },
    { stat: "攻击速度", target: "最后", reason: "只在多头蛇、御法者和幽光叠层BD中提前。" },
  ],
  defense: [
    { stat: "护甲", target: "50点", reason: "智力职业天然抗性高，护甲收益更优先。" },
    { stat: "生命%", target: "50点", reason: "低巅峰防秒杀。" },
    { stat: "全元素抗性", target: "随后", reason: "补齐装备空缺。" },
    { stat: "秒回", target: "最后", reason: "收益最低。" },
  ],
  utility: [
    { stat: "范围伤害", target: "冲层优先", reason: "怪群结算直接提高上限。" },
    { stat: "减耗", target: "资源紧张BD优先", reason: "陨石、光球和以太行者传送都吃资源。" },
    { stat: "击回", target: "需要贴身时补", reason: "火鸟和德尔西尼可用来稳住近战阶段。" },
    { stat: "金币获取", target: "T16金币链最后", reason: "只影响金币护甲链和金币收益。" },
  ],
};

function wizardParagon(coreSkill: string, element: string): ParagonGuide {
  return {
    pre800: WIZARD_LOW_PARAGON,
    post800: [
      { priority: "智力", when: "所有词缀和卡德山未成型前", reason: "魔法师低中巅峰最稳定的伤害与抗性来源。" },
      { priority: `${element}元素伤与${coreSkill}技能伤`, when: "对应部位可洗出时", reason: "优先级高于单纯远古品质。" },
      { priority: "范围伤害", when: "大秘境冲层、怪群密度足够时", reason: "陨石、气旋、爆炸和光球都依赖密度收益。" },
      { priority: "冷却缩减 / 资源减耗", when: "循环或资源断档时", reason: "维尔先冷却，陨石和冰封球按资源上限与减耗取舍。" },
    ],
    checkpoints: [
      { label: "800巅峰前", target: "先满移动、冷却、护甲、范围伤", action: "坚韧不足就把核心多余点数放体能。" },
      { label: "1200-2000", target: "远古武器与关键特效", action: "普通远古错误词缀不要替换高特效核心件。" },
      { label: "2000+", target: "双暴、元素、范围伤、冷却/减耗成套", action: "智力词缀逐步让位给范围伤或攻速断点。" },
    ],
  };
}

const slotByName: Record<string, string> = {
  "头部": "head", "肩部": "shoulders", "胸部": "chest", "手部": "gloves", "腕部": "bracers", "腰部": "belt", "腿部": "pants", "脚部": "boots", "颈部": "amulet", "手指": "ring1", "主手": "weapon", "副手": "offhand",
};

function baseConfiguration(guide: BuildGuide): BuildConfiguration {
  const gear: Record<string, string> = {};
  for (const item of guide.gear) {
    const slot = slotByName[item.slot];
    if (!slot) continue;
    if (item.slot === "手指" && gear.ring1) gear.ring2 ??= item.id;
    else gear[slot] ??= item.id;
  }
  const [firstGem, secondGem, thirdGem] = guide.gear.flatMap((item) => item.gem?.name ?? []).slice(0, 3);
  return {
    gear,
    skills: guide.skills.map((item) => ({ id: item.id, rune: item.rune })),
    passives: guide.passives.map((item) => item.id),
    powers: Object.fromEntries(guide.powers.map((item) => [item.slot === "第4槽" ? "season" : item.slot === "武器" ? "weapon" : item.slot === "防具" ? "armor" : "jewelry", item.id])),
    legendaryGems: { amulet: firstGem, ring1: secondGem, ring2: thirdGem },
    normalGems: { head: ["无瑕皇家钻石：冷却缩减"], chest: ["无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力"], pants: ["无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力"], weapon: ["无瑕皇家绿宝石：暴击伤害"] },
    follower: { id: "enchantress", items: ["不死烟熏香炉", "时光流韵", "复仇者护腕", "神目指环"], skills: ["时间缓流", "预知谐和", "能量护甲", "聚焦心智"] },
    statPriorities: Object.fromEntries(Object.entries(gear).map(([slot, id]) => [slot, guide.gear.find((item) => item.id === id)?.affixes ?? []])),
    rotation: guide.rotation,
  };
}

function speedPatchFor(id: string, high: boolean): BuildConfigurationPatch {
  const commonSpeed = {
    legendaryGems: { ring2: high ? "囤宝者的恩惠" : "强者之灾" },
    normalGems: { chest: high ? ["无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力"] : ["无瑕皇家紫宝石：体能", "无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力"] },
  };
  const byBuild: Record<string, BuildConfigurationPatch> = {
    "tal-meteor": { ...commonSpeed, gear: { bracers: high ? "warzechian" : "nemesis-bracers", ring2: "avarice-band" }, powers: { weapon: "aether-walker", armor: "goldwrap", season: high ? "messerschmidt" : "squirts" } },
    "lod-meteor": { ...commonSpeed, gear: { bracers: "nemesis-bracers", ring2: "avarice-band" }, powers: { weapon: high ? "aether-walker" : "grand-vizier", jewelry: "avarice-band", season: high ? "messerschmidt" : "aether-walker" } },
    "firebird-eb": { ...commonSpeed, gear: { bracers: high ? "warzechian" : "nemesis-bracers", belt: "goldwrap", ring2: "avarice-band", weapon: "ingeom" }, powers: { weapon: "aether-walker", armor: high ? "orb-depth" : "goldwrap", season: high ? "messerschmidt" : "ingeom" } },
    "delsere-twister": { ...commonSpeed, gear: { bracers: "nemesis-bracers", ring2: "avarice-band" }, powers: { weapon: "aether-walker", armor: high ? "crown-primus" : "goldwrap", jewelry: "zodiac", season: high ? "messerschmidt" : "furnace" } },
    "vyr-archon": { ...commonSpeed, gear: { bracers: high ? "warzechian" : "nemesis-bracers", ring2: "avarice-band" }, powers: { weapon: "ingeom", armor: "swami", jewelry: "zodiac", season: high ? "messerschmidt" : "orb-depth" } },
    "typhon-hydra": { ...commonSpeed, gear: { bracers: "nemesis-bracers", ring2: "avarice-band" }, powers: { weapon: "aether-walker", armor: high ? "magistrate" : "goldwrap", season: high ? "messerschmidt" : "furnace" } },
    "lod-orb": { ...commonSpeed, gear: { bracers: "nemesis-bracers", ring2: "avarice-band" }, powers: { weapon: high ? "aether-walker" : "wizardspike", armor: high ? "frostburn" : "goldwrap", jewelry: "avarice-band" } },
  };
  return byBuild[id];
}

function pushHighPatchFor(id: string): BuildConfigurationPatch {
  const highGems = { chest: ["无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力"], pants: ["无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力"] };
  const generic: BuildConfigurationPatch = { normalGems: highGems, statPriorities: { weapon: ["高白字", "伤害%", "范围伤害", "冷却缩减 / 资源减耗", "拉玛兰迪打孔"], gloves: ["暴击几率", "暴击伤害", "范围伤害", "冷却缩减 / 攻速"] } };
  if (id === "lod-meteor") return { ...generic, powers: { jewelry: "unity", season: "furnace" } };
  if (id === "firebird-eb") return { ...generic, powers: { armor: "orb-depth", season: "furnace" }, legendaryGems: { ring2: "受罚者之灾" } };
  if (id === "vyr-archon") return { ...generic, powers: { season: "messerschmidt" } };
  if (id === "lod-orb") return { ...generic, powers: { jewelry: "unity" } };
  return generic;
}

function reviewedScenarios(guide: BuildGuide): BuildScenario[] {
  const sources = WIZARD_REVIEW_SOURCES[guide.id];
  return [
    { id: "push-low", label: "低巅峰大秘境冲层（来源待复核）", content: "greater-rift-push", paragonBand: "low", applicability: "unverified", reason: "已录入构筑专页，但尚未完成第二来源与 Nintendo Switch 验证。", unchangedReason: "基础配置是当前录入的低巅峰冲层入口。", sourceRefs: sources, reviewedAt: REVIEWED_AT },
    { id: "push-high", label: "高巅峰大秘境冲层（来源待复核）", content: "greater-rift-push", paragonBand: "high", applicability: "unverified", reason: "高巅峰规则来自批量整理，需逐套核对宝石、词缀阈值和第四槽。", patch: pushHighPatchFor(guide.id), sourceRefs: sources, reviewedAt: REVIEWED_AT },
    { id: "speed-low", label: "低层速刷（用途待拆分）", content: "nephalem-rift", paragonBand: "low", applicability: "unverified", reason: "当前把 T16、蓝门和低层大秘境合并，发布前必须拆分并补精确变体来源。", patch: speedPatchFor(guide.id, false), sourceRefs: sources, reviewedAt: REVIEWED_AT },
    { id: "speed-high", label: "金币内容速刷（用途待拆分）", content: "nephalem-rift", paragonBand: "high", applicability: "unverified", reason: "当前把 T16、蓝门和悬赏合并，发布前必须逐项确认金币链和移动配置。", patch: speedPatchFor(guide.id, true), sourceRefs: sources, reviewedAt: REVIEWED_AT },
  ];
}

function wizardPolicies(guide: BuildGuide): BuildChoicePolicy[] {
  const coreGem = guide.id.includes("hydra") ? "侍从宝石" : guide.id.includes("lod") ? "梦之遗礼" : "困者之灾";
  return [
    { key: `${guide.id}-core-engine`, targetType: "gear", targetId: guide.gear.find((item) => item.slot === "主手")?.id ?? "weapon", label: "主伤害发动机", status: "locked", reason: `${guide.name}的核心武器/副手/套装乘区不可随意替换；缺少它时只算过渡配装。` },
    { key: `${guide.id}-core-gem`, targetType: "legendary-gem", targetId: coreGem, label: "核心传奇宝石", status: "locked", reason: "冲层配置以该宝石承担主要独立乘区或散件激活条件。" },
    { key: `${guide.id}-speed-ring`, targetType: "gear", targetId: "coe", label: "第二戒指", status: "conditional", reason: "冲层需要元素周期或受罚者，T16需要金币拾取链。", alternatives: [{ id: "avarice-band", label: "贪婪之戒", when: "T16、蓝门或悬赏金币链", gain: "扩大拾取范围并维持金织带护甲", cost: "失去全能/受罚者的冲层伤害", scenarios: ["speed-low", "speed-high"] }] },
    { key: `${guide.id}-speed-bracer`, targetType: "gear", targetId: guide.gear.find((item) => item.slot === "腕部")?.id ?? "bracers", label: "护腕槽", status: "conditional", reason: "冲层护腕服务乘区或护盾，速刷护腕服务精英密度或赶路。", alternatives: [{ id: "nemesis-bracers", label: "复仇者护腕", when: "T16/低层大秘境需要更多精英", gain: "开塔召唤精英，加快进度和冷却触发", cost: "失去冲层护腕的乘区或护盾", scenarios: ["speed-low"] }, { id: "warzechian", label: "沃兹克护腕", when: "高巅峰悬赏和开阔图赶路", gain: "破坏物件获得移速", cost: "失去复仇者精英密度", scenarios: ["speed-high"] }] },
    { key: `${guide.id}-speed-power`, targetType: "power", targetId: "furnace", label: "第四槽/武器萃取", status: "conditional", reason: "冲层用精英伤或主技能乘区，速刷用寅剑、以太行者或梅斧缩短路程。", alternatives: [{ id: "ingeom", label: "寅剑", when: "低层大秘境和T16精英密度足够", gain: "击杀精英后连续刷新冷却", cost: "失去冲层乘区", scenarios: ["speed-low"] }, { id: "aether-walker", label: "以太行者", when: "悬赏、蓝门和需要跨图赶路", gain: "传送无冷却", cost: "秘能压力变高且单体下降", scenarios: ["speed-high"] }, { id: "goldwrap", label: "金织带", when: "T16金币链", gain: "金币护甲近乎无限", cost: "大秘境无金币时失效", scenarios: ["speed-low", "speed-high"] }] },
  ];
}

function completeWizardGuide(seed: ClassGuideSeed): BuildGuide {
  const guide = createClassGuide(seed);
  for (const item of WIZARD_EXTRA_GEAR) {
    if (!guide.gear.some((existing) => existing.id === item.id)) guide.gear.push(item);
  }
  for (const item of WIZARD_EXTRA_POWERS) {
    if (!guide.powers.some((existing) => existing.id === item.id)) guide.powers.push(item);
  }
  guide.configurationBase = baseConfiguration(guide);
  guide.defaultScenarioId = "push-low";
  guide.scenarios = reviewedScenarios(guide);
  guide.paragonGuide = wizardParagon(seed.coreSkill, seed.element);
  guide.choicePolicies = wizardPolicies(guide);
  guide.reviewStatus = "partial";
  guide.variantCompleteness = "documented-shared";
  guide.evidenceStatus = "source-checked";
  guide.platformStatus = "pc-derived";
  guide.dataProvenance = "batch-derived";
  guide.evidenceNote = "已录入单一 PC 构筑来源；用途拆分、第二来源和 Nintendo Switch 实测尚未完成。";
  return guide;
}

export const WIZARD_BUILDS: Record<string, BuildGuide> = Object.fromEntries(seeds.map((seed) => {
  const guide = completeWizardGuide(seed);
  const errors = validateReviewedBuildGuide(guide);
  if (errors.length) throw new Error(`${guide.id} 校验失败：${errors.join("；")}`);
  return [guide.id, guide];
}));
