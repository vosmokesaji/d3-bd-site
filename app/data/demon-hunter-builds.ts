import { createClassGuide, createGenericReviewedGuide, jewelry, legendary, passive, power, setGear, skill, type ClassGuideSeed, type GearSeed } from "./class-build-factory";
import { validateReviewedBuildGuide, type BuildChoicePolicy, type BuildConfiguration, type BuildGuide, type BuildScenario, type ParagonGuide } from "./build-guides";

const god: GearSeed[] = [
  setGear("god-head", "头部", "反乌托邦护目镜", "dystopian-goggles-p69_unique_helm_set_06.png", "恐惧之地机轮甲部件；主要技能叠动能，扫射自动释放。", "追踪箭"),
  setGear("god-shoulders", "肩部", "机械肩甲", "mechanical-pauldrons-p69_unique_shoulder_set_06.png", "恐惧之地机轮甲部件。", "追踪箭"),
  setGear("god-chest", "胸部", "电镀背心", "galvanized-vest-p69_unique_chest_set_06.png", "恐惧之地机轮甲部件。", "追踪箭"),
  setGear("god-gloves", "手部", "气动机械臂甲", "gas-powered-automail-forearm-p69_unique_gloves_set_06.png", "恐惧之地机轮甲部件；双暴与范围伤优先。"),
  setGear("god-pants", "腿部", "冷阴极长裤", "cold-cathode-trousers-p69_unique_pants_set_06.png", "恐惧之地机轮甲部件。"),
  setGear("god-boots", "脚部", "老式古董靴", "antique-vintage-boots-p69_unique_boots_set_06.png", "恐惧之地机轮甲部件；追踪箭技能伤优先。", "追踪箭"),
];

const marauder: GearSeed[] = [
  setGear("marauder-head", "头部", "掠夺者面甲", "marauders-visage-unique_helm_set_07_x1.png", "掠夺套装部件；箭塔数量同时提高技能伤害。", "集束箭"),
  setGear("marauder-shoulders", "肩部", "掠夺者脊骨", "marauders-spines-unique_shoulder_set_07_x1.png", "掠夺套装部件。", "箭塔"),
  setGear("marauder-chest", "胸部", "掠夺者甲壳", "marauders-carapace-unique_chest_set_07_x1.png", "掠夺套装部件。", "集束箭"),
  setGear("marauder-gloves", "手部", "掠夺者手套", "marauders-gloves-unique_gloves_set_07_x1.png", "掠夺套装部件。"),
  setGear("marauder-pants", "腿部", "掠夺者护腿", "marauders-encasement-unique_pants_set_07_x1.png", "掠夺套装部件。"),
  setGear("marauder-boots", "脚部", "掠夺者足靴", "marauders-treads-unique_boots_set_07_x1.png", "掠夺套装部件；集束箭技能伤优先。", "集束箭"),
];

const ue: GearSeed[] = [
  setGear("ue-head", "头部", "诅咒面容", "accursed-visage-unique_helm_set_03_p2.png", "不洁套装部件；戒律上限直接参与六件倍率。", "多重射击"),
  setGear("ue-shoulders", "肩部", "亵渎肩甲", "unsanctified-shoulders-unique_shoulder_set_03_p2.png", "不洁套装部件。", "多重射击"),
  setGear("ue-chest", "胸部", "狱火牢笼", "cage-of-the-hellborn-unique_chest_set_03_p2.png", "不洁套装部件；次要词缀戒律上限必须保留。", "多重射击"),
  setGear("ue-gloves", "手部", "恶魔之握", "fiendish-grips-unique_gloves_set_03_p2.png", "不洁套装部件。"),
  setGear("ue-pants", "腿部", "邪秽腿甲", "unholy-plates-unique_pants_set_03_p2.png", "不洁套装部件。"),
  setGear("ue-boots", "脚部", "地狱行者", "hell-walkers-unique_boots_set_03_p2.png", "不洁套装部件；多重射击技能伤优先。", "多重射击"),
];

const shadow: GearSeed[] = [
  setGear("shadow-head", "头部", "暗影面具", "the-shadows-mask-unique_helm_set_14_x1.png", "暗影装束部件；暗影飞刀对首个敌人获得巨大倍率。", "暗影飞刀"),
  setGear("shadow-shoulders", "肩部", "暗影重负", "the-shadows-burden-unique_shoulder_set_14_x1.png", "暗影装束部件。", "暗影飞刀"),
  setGear("shadow-chest", "胸部", "暗影灾星", "the-shadows-bane-unique_chest_set_14_x1.png", "暗影装束部件。", "暗影飞刀"),
  setGear("shadow-gloves", "手部", "暗影之握", "the-shadows-grasp-unique_gloves_set_14_x1.png", "暗影装束部件。"),
  setGear("shadow-pants", "腿部", "暗影缠绕", "the-shadows-coil-unique_pants_set_14_x1.png", "暗影装束部件。"),
  setGear("shadow-boots", "脚部", "暗影之踵", "the-shadows-heels-unique_boots_set_14_x1.png", "暗影装束部件；暗影飞刀技能伤优先。", "暗影飞刀"),
];

const natalya: GearSeed[] = [
  setGear("nat-head", "头部", "娜塔亚的视界", "natalyas-sight-unique_helm_009_x1.png", "娜塔亚套装部件；尖刺陷阱放置与引爆建立套装倍率。", "尖刺陷阱"),
  setGear("nat-chest", "胸部", "娜塔亚的拥抱", "natalyas-embrace-unique_cloak_006_x1.png", "娜塔亚套装部件。", "尖刺陷阱"),
  setGear("nat-gloves", "手部", "娜塔亚的触碰", "natalyas-touch-p2_unique_gloves_01.png", "娜塔亚套装部件。"),
  setGear("nat-pants", "腿部", "娜塔亚的护腿", "natalyas-leggings-p2_unique_pants_01.png", "娜塔亚套装部件。"),
  setGear("nat-boots", "脚部", "娜塔亚的血足迹", "natalyas-bloody-footprints-unique_boots_011_x1.png", "娜塔亚套装部件；尖刺陷阱技能伤优先。", "尖刺陷阱"),
];

const commonPassives = [
  passive("cull-the-weak", "恃强凌弱", "对减速或冰冷敌人增伤，与困者之灾形成稳定乘区。"),
  passive("ambush", "伏击", "对高生命敌人增伤，加快每组怪的起手。"),
  passive("awareness", "濒死本能", "受到致命伤害时保命。"),
  passive("archery", "箭术专精", "按武器类型提供攻速、暴击或伤害。"),
];

const weapon = (id: string, name: string, file: string, effect: string, base: string) => legendary(id, "主手", name, file, effect, { base });
const offhand = (id: string, name: string, file: string, effect: string, base = "箭袋") => legendary(id, "副手", name, file, effect, { base });

const godSeed: ClassGuideSeed = {
    classKey: "demon-hunter", id: "god-hungering", name: "恐惧冰吞", set: "恐惧之地机轮甲", core: "追踪箭叠动能 → 扫射自动发射", summary: "主动追踪箭叠到20层动能，随后扫射高速移动并自动释放追踪箭完成穿透清场。", difficulty: "低操作 · 高机动", follower: "盗贼", followerReason: "暴击增益和远程控场适合边移动边清怪。", element: "冰霜", coreSkill: "追踪箭",
    gear: [...god, legendary("wraps-clarity", "腕部", "明澈裹腕", "wraps-of-clarity-p61_unique_bracer_103.png", "憎恨生成技能命中后获得减伤。", { element: "冰霜" }), legendary("hunter-wrath", "腰部", "猎手之怒", "hunters-wrath-p69_unique_belt_005.png", "提高主要技能攻速与伤害，是追踪箭核心乘区。", { skill: "追踪箭" }), jewelry("squirt", "simplicity"), jewelry("focus", "taeguk"), jewelry("restraint", "stricken"), weapon("fortress", "堡垒弩机", "fortress-ballista-p4_unique_handxbow_02.png", "攻击叠加护盾，帮助保护斯奎特层数。", "单手弩"), offhand("dawn", "黎明", "dawn-p4_unique_handxbow_001.png", "大幅缩短复仇冷却，使其能够常驻。", "单手弩"), weapon("yang", "杨的反曲弓", "yangs-recurve-p61_unique_bow_104_x1.png", "大幅降低资源消耗，速刷减耗让烟雾弹位移不断憎恨。", "弓"), offhand("ninth-cirri-worn", "希瑞的第九箭袋", "the-ninth-cirri-satchel-p69_unique_quiver_101.png", "追踪箭必定穿透并提高伤害，穿戴时搭配杨弓或重炮。"), weapon("vallas-worn", "维拉的遗赠", "vallas-bequest-p43_unique_handxbow_005.png", "扫射投射物穿透敌人，冲层进度阶段补档并提高追踪箭触发频率。", "单手弩")],
    skills: [skill("hungering-arrow", "追踪箭", "吞噬箭", "主要伤害；穿透次数会继续提高下一次命中。"), skill("strafe", "扫射", "寒冰足迹", "移动并触发恐惧四件自动释放追踪箭。"), skill("vengeance", "复仇", "黑暗之心", "常驻增伤、回能和减伤。"), skill("preparation", "蓄势待发", "惩罚", "纪律转憎恨，填补长距离扫射消耗。"), skill("smoke-screen", "烟雾弹", "烟幕弥漫", "无敌穿过危险地板。"), skill("companion", "战宠", "野猪战宠", "提供全抗并主动嘲讽。")], passives: commonPassives,
    powers: [power("ninth-cirri", "武器", "希瑞的第九箭袋", "the-ninth-cirri-satchel-p69_unique_quiver_101.png", "追踪箭必定穿透并提高伤害。", "吞噬箭穿透成长由概率变成稳定循环。"), power("depth-diggers", "防具", "深渊挖掘裤", "depth-diggers-unique_pants_006_p1.png", "提高产生资源的主要技能伤害。", "追踪箭属于生成技能，获得独立乘区。"), power("dawn-cube", "武器", "黎明", "dawn-p4_unique_handxbow_001.png", "大幅缩短复仇冷却。", "速刷穿戴杨弓或重炮时，萃取黎明实现复仇常驻。"), power("coe-power", "首饰", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "对应元素周期提供独立爆发乘区。", "冲层在冰霜周期集中补追踪箭。"), power("elusive", "首饰", "残影之戒", "elusive-ring-p4_unique_ring_02.png", "使用烟雾弹或翻滚后获得减伤。", "与明澈裹腕组成移动中的双层防线。"), power("ingeom", "第4槽", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短技能冷却。", "速刷击杀精英后进入下一段近乎无空档的扫射窗口。"), power("vallas", "第4槽", "维拉的遗赠", "vallas-bequest-p43_unique_handxbow_005.png", "扫射投射物穿透敌人。", "第39赛季第四槽改善自动射击触发频率，冲层补档、速刷清屏。")],
    links: [{ title: "扫射自动吞噬箭", category: "damage", conclusion: "扫射是载体，词缀与宝石都应服务追踪箭。", steps: [["hungering-arrow", "追踪箭", "手动叠动能"], ["god-head", "恐惧四件", "扫射自动释放"], ["strafe", "扫射", "移动触发"], ["ninth-cirri", "第九箭袋", "稳定穿透增伤"]] }, { title: "主要技能乘区", category: "damage", conclusion: "腰带、裤子和吞噬箭穿透共同构成主要输出。", steps: [["hunter-wrath", "猎手之怒", "攻速与技能伤"], ["depth-diggers", "深渊挖掘裤", "生成技能乘区"], ["hungering-arrow", "吞噬箭", "穿透后成长"]] }, { title: "移动防御链", category: "defense", conclusion: "每隔数秒手动追踪箭和烟雾弹，才能同时维持动能与两层减伤。", steps: [["hungering-arrow", "手动追踪箭", "触发明澈"], ["wraps-clarity", "明澈裹腕", "生成技能减伤"], ["smoke-screen", "烟雾弹", "触发残影"], ["elusive", "残影之戒", "主动减伤"]] }],
    rotation: [{ title: "叠满动能", action: "进图手动释放追踪箭直到20层。", reason: "层数决定扫射移动速度与自动射击强度。" }, { title: "开启复仇", action: "保持复仇黑暗之心常驻。", reason: "黎明压缩冷却并提供减伤。" }, { title: "持续扫射", action: "围绕怪群弧形扫射。", reason: "恐惧套自动发射追踪箭。" }, { title: "定期补箭", action: "动能下降前手动射一次追踪箭。", reason: "续层并刷新明澈裹腕。" }, { title: "烟雾穿险", action: "经过地板伤害时使用烟雾弹。", reason: "无敌并刷新残影减伤。" }], pushNote: "冲层用盾枪或维拉与黎明双持，冰霜周期集中补追踪箭维持20层。", speedNote: "杨弓减耗配合烟雾弹位移，囤宝者金币移速与寅剑压缩转场。", lowNote: "第九箭袋、猎手之怒和深渊挖掘裤优先级最高。", highNote: "冰霜元素、范围伤与复仇冷却断点决定上限。", source: "https://www.icy-veins.com/d3/demon-hunter-hungering-arrow-build-with-god",
  };

const seeds: ClassGuideSeed[] = [
  {
    classKey: "demon-hunter", id: "marauder-sentry", name: "掠夺集束塔", set: "掠夺者的化身", core: "布置箭塔 → 集束箭同步齐射", summary: "先放满箭塔建立套装倍率，再由角色与所有箭塔同步释放集束箭覆盖高密度怪群。", difficulty: "高操作 · 阵地部署", follower: "魔女", followerReason: "控场与冷却缩减帮助在箭塔覆盖区稳定输出。", element: "冰霜", coreSkill: "集束箭",
    gear: [...marauder, legendary("wraps-clarity", "腕部", "明澈裹腕", "wraps-of-clarity-p61_unique_bracer_103.png", "生成技能命中后获得减伤。", { element: "冰霜" }), legendary("zoey", "腰部", "佐伊的秘密", "zoeys-secret-p4_unique_belt_04.png", "每种激活战宠提供独立减伤。"), jewelry("traveler", "trapped"), jewelry("compass", "enforcer"), jewelry("coe", "stricken"), weapon("manticore", "蝎尾狮", "manticore-p61_unique_xbow_001.png", "降低集束箭消耗并提高伤害。", "双手弩"), offhand("bombardier", "炮手弹药包", "bombardiers-rucksack-p72_unique_quiver_102.png", "允许额外部署两座箭塔并提高箭塔伤害。")],
    skills: [skill("sentry", "箭塔", "极地哨站", "先放满数量；每座箭塔提高套装倍率并同步攻击。"), skill("cluster-arrow", "集束箭", "集束炸弹", "主要输出，由角色和所有箭塔同步释放。"), skill("evasive-fire", "闪避射击", "凝神射击", "回憎恨并触发明澈裹腕。"), skill("companion", "战宠", "恶狼战宠", "掠夺二件召出全部战宠，主动提供爆发增伤。"), skill("vault", "翻滚", "翻滚高手", "在箭塔战区间移动。"), skill("vengeance", "复仇", "黑暗之心", "提高伤害并提供减伤。")], passives: [passive("custom-engineering", "器械调校", "提高箭塔上限并延长持续时间。"), passive("ballistics", "弹道学", "提高导弹伤害并额外发射追踪导弹。"), ...commonPassives.slice(0, 2)],
    powers: [power("dawn", "武器", "黎明", "dawn-p4_unique_handxbow_001.png", "缩短复仇冷却。", "配合装备冷却实现复仇常驻。"), power("visage-gunes", "防具", "古内斯之面", "visage-of-gunes-p4_unique_helm_103.png", "复仇获得黑暗之心减伤符文。", "不占技能符文即可获得常驻减伤。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "为佐伊腰带和功能部位释放位置。", "第一幕/第四幕悬赏箱。"), power("frostburn", "第4槽", "霜燃", "frostburn-p41_unique_gloves_002.png", "提高冰霜伤害并冻结敌人。", "第39赛季第四槽为集束箭补控制与元素乘区。")],
    links: [{ title: "箭塔同步齐射", category: "damage", conclusion: "先放塔再射击；少一座塔就同时少套装倍率和一次同步攻击。", steps: [["sentry", "箭塔", "部署战区"], ["bombardier", "炮手弹药包", "增加两座塔"], ["marauder-head", "掠夺六件", "箭塔同步技能"], ["cluster-arrow", "集束箭", "多源齐射"]] }, { title: "战宠减伤", category: "defense", conclusion: "掠夺二件召出全部战宠，佐伊把宠物数量直接转成减伤。", steps: [["companion", "全部战宠", "套装自动召唤"], ["zoey", "佐伊腰带", "每种战宠提供减伤"], ["compass-rose", "侍从宝石", "镶嵌在罗盘玫瑰，提供宠物增伤减伤"]] }, { title: "资源与明澈", category: "resource", conclusion: "每轮集束箭之间补闪避射击，同时解决憎恨和减伤。", steps: [["evasive-fire", "闪避射击", "生成憎恨"], ["wraps-clarity", "明澈裹腕", "生成技能减伤"], ["manticore", "蝎尾狮", "降低集束箭消耗"]] }],
    rotation: [{ title: "部署五塔", action: "进入战区前放满箭塔。", reason: "数量决定套装倍率与同步次数。" }, { title: "开启复仇", action: "保持复仇常驻。", reason: "获得增伤、回能和古内斯减伤。" }, { title: "生成回能", action: "先用闪避射击命中怪群。", reason: "回复憎恨并刷新明澈。" }, { title: "集束齐射", action: "站在箭塔覆盖区连续集束箭。", reason: "所有箭塔同步施放。" }, { title: "狼吼爆发", action: "冰霜周期开启战宠主动。", reason: "把宠物增伤压进元素窗。" }], pushNote: "在狭窄高密度区域提前布满箭塔再开火。", speedNote: "减少固定战区停留，用翻滚和低消耗集束箭推进。", lowNote: "炮手弹药包、蝎尾狮和佐伊腰带先成型。", highNote: "箭塔数量、冰霜元素、范围伤和憎恨管理决定上限。", source: "https://www.icy-veins.com/d3/demon-hunter-marauder-cluster-arrow-build",
  },
  {
    classKey: "demon-hunter", id: "ue-multishot", name: "不洁多重射击", set: "邪秽之精", core: "保持戒律上限 → 远程多重射击", summary: "不洁六件按当前戒律放大伤害，杨弓减耗、亡者遗产补斩杀，形成远距离扇形清屏。", difficulty: "低操作 · 远程清屏", follower: "盗贼", followerReason: "暴击增益和远程控场适合站在屏幕边缘持续清屏。", element: "火焰", coreSkill: "多重射击",
    gear: [ue[0], ue[1], ue[2], ue[3], legendary("wraps-clarity", "腕部", "明澈裹腕", "wraps-of-clarity-p61_unique_bracer_103.png", "生成技能命中后获得减伤。", { element: "火焰" }), legendary("crimson-belt", "腰部", "克里森船长的丝带", "captain-crimsons-silk-girdle.png", "与船长腿甲形成冷却、减耗攻防转换。", { quality: "set", method: ["悬赏获取图纸", "铁匠锻造", "不要黄装升级"] }), legendary("crimson-pants", "腿部", "克里森船长的推裤", "captain-crimsons-thrust.png", "与船长腰带组成三件效果，把冷却与减耗转为攻防。", { quality: "set", method: ["悬赏获取图纸", "铁匠锻造腿甲", "不要黄装升级"] }), ue[5], jewelry("squirt", "trapped"), jewelry("focus", "zei"), jewelry("restraint", "stricken"), weapon("yang", "杨的反曲弓", "yangs-recurve-p61_unique_bow_104_x1.png", "大幅降低资源消耗并提高多重射击伤害。", "弓"), offhand("dead-man", "亡者遗产", "dead-mans-legacy-p61_unique_quiver_007.png", "多重射击对低生命敌人再次施放并提高伤害。")],
    skills: [skill("multishot", "多重射击", "多重火力", "主要清屏技能；亡者遗产补低生命斩杀。"), skill("evasive-fire", "闪避射击", "凝神射击", "生成憎恨、触发克己和明澈。"), skill("vault", "翻滚", "翻滚高手", "保持远距并触发残影。"), skill("vengeance", "复仇", "恨意迸发", "常驻回能与增伤。"), skill("preparation", "蓄势待发", "精力充沛", "提高戒律上限，直接放大不洁六件。"), skill("companion", "战宠", "恶狼战宠", "火焰周期主动增伤。")], passives: [passive("steady-aim", "稳固瞄准", "与敌人保持距离时增伤。"), passive("ballistics", "弹道学", "提高多重火力导弹伤害。"), ...commonPassives.slice(0, 2)],
    powers: [power("dawn", "武器", "黎明", "dawn-p4_unique_handxbow_001.png", "缩短复仇冷却。", "实现复仇常驻。"), power("visage-gunes", "防具", "古内斯之面", "visage-of-gunes-p4_unique_helm_103.png", "复仇获得黑暗之心减伤。", "远程输出也保留稳定坚韧。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "让不洁与船长套组合成立。", "第一幕/第四幕悬赏箱。"), power("coe", "第4槽", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "火焰周期提高多重射击。", "第39赛季第四槽提供爆发窗。")],
    links: [{ title: "戒律就是伤害", category: "resource", conclusion: "不要把戒律用空；翻滚次数会直接降低不洁六件伤害。", steps: [["preparation", "蓄势待发", "提高戒律上限"], ["ue-head", "不洁六件", "按当前戒律增伤"], ["vault", "翻滚", "只在必要时消耗"]] }, { title: "生成消耗双戒", category: "damage", conclusion: "每几秒补一次闪避射击，再连续多重保持双戒。", steps: [["evasive-fire", "闪避射击", "触发克己"], ["focus", "克己", "生成端增伤"], ["multishot", "多重射击", "触发守心"], ["restraint", "守心", "消耗端增伤"]] }, { title: "远距清屏", category: "damage", conclusion: "杨弓扩大续航，亡者遗产负责斩杀，远距同时启动贼神和稳固瞄准。", steps: [["yang", "杨弓", "减耗与技能伤"], ["multishot", "扇形清屏", "屏幕外命中"], ["dead-man", "亡者遗产", "低生命再射"], ["steady-aim", "稳固瞄准", "远距增伤"]] }],
    rotation: [{ title: "保持复仇", action: "进图开启复仇并保持常驻。", reason: "黎明和古内斯提供攻防。" }, { title: "生成起手", action: "用闪避射击命中一次。", reason: "触发克己和明澈。" }, { title: "远距清屏", action: "站在怪群外侧连续多重射击。", reason: "不洁、杨弓和亡者遗产共同放大。" }, { title: "节省戒律", action: "只在躲技能或转场时翻滚。", reason: "当前戒律直接参与套装伤害。" }, { title: "火焰狼吼", action: "火焰周期开启恶狼战宠。", reason: "集中爆发精英。" }], pushNote: "保持最大射程和高戒律，火焰周期集中多重射击。", speedNote: "扇形清屏后立即翻滚转场。", lowNote: "杨弓和亡者遗产先拿任意特效版本。", highNote: "戒律上限、火焰元素、范围伤和冷却共同决定上限。", source: "https://www.icy-veins.com/d3/demon-hunter-unhallowed-essence-multishot-build",
  },
  {
    classKey: "demon-hunter", id: "natalya-trap", name: "娜塔亚尖刺陷阱", set: "娜塔亚的复仇", core: "布置尖刺陷阱 → 生成技能引爆", summary: "按顺序布置不同符文陷阱，再用憎恨生成技能集中引爆；娜塔亚套把准备过程转成高额爆发。", difficulty: "高操作 · 顺序引爆", follower: "魔女", followerReason: "控场能把敌人固定在陷阱区，冷却缩减也有助于防御循环。", element: "闪电", coreSkill: "尖刺陷阱",
    gear: [natalya[0], legendary("aughild-shoulders", "肩部", "奥吉德的力量", "/d3/aughild-shoulders.png", "与奥吉德护腕组合，对精英增伤并减伤。", { quality: "set", method: ["悬赏获取图纸", "铁匠锻造", "不要黄装升级"] }), natalya[1], natalya[2], legendary("aughild-bracers", "腕部", "奥吉德的搜捕", "/d3/aughild-bracers.png", "奥吉德套装护腕，对精英攻防。", { quality: "set", element: "闪电", method: ["悬赏获取图纸", "铁匠锻造", "不要黄装升级"] }), legendary("omryn", "腰部", "奥姆林的锁链", "omryns-chain-p2_unique_belt_06.png", "翻滚落点自动布置铁蒺藜，提供控制。"), natalya[3], natalya[4], jewelry("squirt", "trapped"), jewelry("focus", "zei"), jewelry("restraint", "stricken"), weapon("chanon", "凯恩强弩", "chanon-bolter-p75_unique_xbow_101.png", "尖刺陷阱会吸引敌人，并可重复布置同一位置。", "双手弩"), weapon("demons-demise", "恶魔之亡", "the-demons-demise-p75_handxbow_norm_unique_03.png", "尖刺陷阱爆炸会在短暂延迟后再次爆炸。", "单手弩")],
    skills: [skill("spike-trap", "尖刺陷阱", "多重陷阱", "主要爆发；先布置再由生成技能引爆。"), skill("evasive-fire", "闪避射击", "凝神射击", "引爆陷阱并触发克己。"), skill("caltrops", "铁蒺藜", "锯齿尖刺", "减速敌人，帮助固定在陷阱区。"), skill("vault", "翻滚", "翻滚高手", "调整陷阱位置并由腰带自动布置铁蒺藜。"), skill("vengeance", "复仇", "黑暗之心", "常驻回能与减伤。"), skill("smoke-screen", "烟雾弹", "烟幕弥漫", "引爆准备期的无敌保命。")], passives: [passive("custom-engineering", "器械调校", "提高陷阱数量并延长持续时间。"), passive("numbing-traps", "麻醉陷阱", "被陷阱影响的敌人造成伤害降低。"), ...commonPassives.slice(0, 2)],
    powers: [power("dawn", "武器", "黎明", "dawn-p4_unique_handxbow_001.png", "缩短复仇冷却。", "让黑暗之心减伤常驻。"), power("tragoul-coils", "防具", "塔格奥腕甲", "tragoul-coils-p75_unique_bracer_spiketrap.png", "尖刺陷阱获得所有符文，并按布置顺序提高伤害。", "构筑的技能发动机与操作顺序来源。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "让娜塔亚五件与奥吉德两件同时成立。", "第一幕/第四幕悬赏箱。"), power("elusive", "第4槽", "残影之戒", "elusive-ring-p4_unique_ring_02.png", "翻滚或烟雾弹后获得减伤。", "第39赛季第四槽覆盖布置陷阱时的风险。")],
    links: [{ title: "布置再引爆", category: "damage", conclusion: "不要边放边乱爆；陷阱顺序与集中引爆决定整轮伤害。", steps: [["spike-trap", "尖刺陷阱", "按顺序布置"], ["tragoul-coils", "塔格奥腕甲", "全符文与顺序增伤"], ["evasive-fire", "闪避射击", "统一引爆"], ["demons-demise", "恶魔之亡", "延迟二次爆炸"]] }, { title: "吸怪入陷阱", category: "movement", conclusion: "强弩和铁蒺藜把敌人留在二次爆炸区域。", steps: [["chanon", "凯恩强弩", "陷阱吸引敌人"], ["vault", "翻滚", "调整落点"], ["omryn", "奥姆林腰带", "自动布置铁蒺藜"], ["caltrops", "减速区", "固定目标"]] }, { title: "双戒引爆", category: "resource", conclusion: "布置陷阱触发守心，引爆用生成技能触发克己。", steps: [["spike-trap", "布置陷阱", "消耗端"], ["restraint", "守心", "消耗增伤"], ["evasive-fire", "闪避射击", "生成端引爆"], ["focus", "克己", "生成增伤"]] }],
    rotation: [{ title: "选择战区", action: "在精英路径前方翻滚布置铁蒺藜。", reason: "先限制敌人移动。" }, { title: "按序放陷阱", action: "围绕同一中心快速布满尖刺陷阱。", reason: "塔格奥腕甲按顺序提高伤害。" }, { title: "吸怪集中", action: "等待凯恩强弩把敌人拉入陷阱。", reason: "保证两次爆炸都命中。" }, { title: "生成引爆", action: "用闪避射击统一引爆。", reason: "同时触发克己并回复憎恨。" }, { title: "烟雾撤离", action: "爆炸后用烟雾或翻滚换位。", reason: "刷新残影并准备下一组。" }], pushNote: "把完整陷阱序列叠在精英路径上，再统一引爆。", speedNote: "减少陷阱数量，翻滚自动控制后快速引爆。", lowNote: "塔格奥腕甲和恶魔之亡先萃取；武器底材不要混用。", highNote: "陷阱顺序、闪电元素和范围伤决定爆发上限。", source: "https://www.icy-veins.com/d3/demon-hunter-natalya-spike-trap-build",
  },
  {
    classKey: "demon-hunter", id: "shadow-impale", name: "暗影三刀", set: "暗影装束", core: "翻滚贴近 → 暗影飞刀点杀", summary: "暗影六件把暗影飞刀集中到首个命中目标，家妮匕首返还憎恨，圣力箭追加两枚飞刀。", difficulty: "中等 · 精英点杀", follower: "盗贼", followerReason: "暴击增益和远程控制适合快速锁定精英。", element: "冰霜", coreSkill: "暗影飞刀",
    gear: [...shadow, legendary("wraps-clarity", "腕部", "明澈裹腕", "wraps-of-clarity-p61_unique_bracer_103.png", "生成技能命中后获得减伤。", { element: "冰霜" }), legendary("chain-shadows", "腰部", "暗影腰带", "chain-of-shadows-p4_unique_belt_01.png", "暗影飞刀后短时间内翻滚不消耗戒律。"), jewelry("squirt", "trapped"), jewelry("focus", "zei"), jewelry("restraint", "stricken"), weapon("karlei", "家妮的锋芒", "karleis-point-p61_unique_dagger_101_x1.png", "飞刀命中已被命中的敌人时返还憎恨并提高伤害。", "匕首"), offhand("holy-point", "圣力箭", "holy-point-shot-p69_unique_quiver_004.png", "暗影飞刀额外投掷两枚并提高技能伤害。")],
    skills: [skill("impale", "暗影飞刀", "强力穿透", "主要点杀技能；暗影六件放大首个目标。"), skill("evasive-fire", "闪避射击", "凝神射击", "触发克己和明澈裹腕。"), skill("vault", "翻滚", "连续翻滚", "飞刀后由暗影腰带免除戒律消耗。"), skill("vengeance", "复仇", "黑暗之心", "常驻回能与减伤。"), skill("shadow-power", "暗影之力", "夜魔", "暗影四件获得全符文并永久存在。"), skill("companion", "战宠", "恶狼战宠", "冰霜周期主动增伤。")], passives: [passive("tactical-advantage", "战略优势", "翻滚后提高移动速度。"), passive("numbing-traps", "麻醉陷阱", "被减速敌人造成伤害降低。"), ...commonPassives.slice(0, 2)],
    powers: [power("dawn", "武器", "黎明", "dawn-p4_unique_handxbow_001.png", "缩短复仇冷却。", "实现复仇常驻。"), power("visage-gunes", "防具", "古内斯之面", "visage-of-gunes-p4_unique_helm_103.png", "复仇获得黑暗之心。", "常驻额外减伤。"), power("elusive", "首饰", "残影之戒", "elusive-ring-p4_unique_ring_02.png", "翻滚后获得减伤。", "每次免费翻滚都刷新防线。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽强化点杀定位。")],
    links: [{ title: "三枚飞刀点杀", category: "damage", conclusion: "要让三枚飞刀尽量命中同一高价值目标。", steps: [["impale", "暗影飞刀", "首个目标获套装倍率"], ["holy-point", "圣力箭", "额外两枚飞刀"], ["shadow-head", "暗影六件", "集中点杀"]] }, { title: "返憎恨追杀", category: "resource", conclusion: "连续攻击同一精英才能稳定返还憎恨。", steps: [["karlei", "家妮锋芒", "重复命中返憎恨"], ["impale", "持续飞刀", "锁定同一目标"], ["chain-shadows", "暗影腰带", "飞刀后免费翻滚"]] }, { title: "翻滚攻防", category: "defense", conclusion: "飞刀后立刻翻滚，移动、残影减伤和下一个射角同时完成。", steps: [["impale", "飞刀", "启动免费翻滚"], ["vault", "翻滚", "调整位置"], ["elusive", "残影之戒", "获得减伤"], ["tactical-advantage", "战略优势", "提高移速"]] }],
    rotation: [{ title: "开启复仇", action: "保持复仇黑暗之心常驻。", reason: "回能与减伤核心。" }, { title: "生成起手", action: "闪避射击命中精英。", reason: "触发克己和明澈。" }, { title: "锁定点杀", action: "连续暗影飞刀攻击同一目标。", reason: "家妮匕首需要重复命中返能。" }, { title: "飞刀后翻滚", action: "每次击杀或换角度时立即翻滚。", reason: "免费位移并刷新残影。" }, { title: "跳过杂兵", action: "只处理挡路或高价值目标。", reason: "暗影六件擅长单体而非大范围。" }], pushNote: "贴近精英确保三枚飞刀集中，持续锁定同一目标。", speedNote: "飞刀后免费翻滚串联精英，不为杂兵停留。", lowNote: "家妮匕首和圣力箭必须优先，普通高特效即可。", highNote: "冰霜元素、匕首白字和范围伤提高高层点杀效率。", source: "https://www.icy-veins.com/d3/demon-hunter-shadow-impale-build",
  },
  {
    classKey: "demon-hunter", id: "lod-rapid-fire", name: "梦遗连射", set: "梦之遗礼", core: "站定引导 → 连射层数爆发", summary: "用梦遗散件建立坚韧与火焰乘区，沃贾尼强袭弩随引导时间提高连射伤害，无罪追寻者移除消耗。", difficulty: "高装备门槛 · 站桩引导", follower: "魔女", followerReason: "控场和冷却缩减帮助安全站定并保持复仇。", element: "火焰", coreSkill: "连射",
    gear: [legendary("leoric", "头部", "李奥瑞克的王冠", "leorics-crown-unique_helm_002_p1.png", "放大钻石冷却缩减，使复仇更容易常驻。"), legendary("mantle-channeling", "肩部", "导能披肩", "mantle-of-channeling-p4_unique_shoulder_103.png", "引导连射时增伤并减伤。"), legendary("cindercoat", "胸部", "燃火外套", "cindercoat-unique_chest_006_x1.png", "提高火焰技能并降低火焰消耗。", { element: "火焰" }), legendary("stone-gauntlets", "手部", "岩石护手", "stone-gauntlets-p66_unique_gloves_007.png", "受击叠护甲；复仇常驻抵消控制副作用。"), legendary("wraps-clarity", "腕部", "明澈裹腕", "wraps-of-clarity-p61_unique_bracer_103.png", "生成技能命中后获得减伤。", { element: "火焰" }), legendary("hellcat", "腰部", "地狱猫腰带", "hellcat-waistguard-p43_unique_belt_005_x1.png", "手雷弹跳会提高爆炸伤害，连接连射手雷符文。"), legendary("depth-diggers", "腿部", "深渊挖掘裤", "depth-diggers-unique_pants_006_p1.png", "强化用于回能和减伤触发的生成技能。"), legendary("ice-climbers", "脚部", "攀冰者", "ice-climbers-unique_boots_008_x1.png", "免疫冰冻与定身，保障站桩引导。"), jewelry("squirt", "lod"), jewelry("coe", "stricken"), jewelry("elusive", "trapped"), weapon("wojahnni", "沃贾尼强袭弩", "wojahnni-assaulter-p65_unique_xbow_102.png", "引导连射时逐层提高技能伤害。", "双手弩"), offhand("sin-seekers", "无罪追寻者", "sin-seekers-p65_unique_quiver_001.png", "移除连射引导消耗并提高伤害。")],
    skills: [skill("rapid-fire", "连射", "轰击", "主要输出；站定引导叠满沃贾尼层数。"), skill("evasive-fire", "闪避射击", "凝神射击", "开火前刷新明澈裹腕。"), skill("vengeance", "复仇", "黑暗之心", "常驻减伤并抵消岩石护手负面。"), skill("smoke-screen", "烟雾弹", "烟幕弥漫", "危险时短暂无敌但会中断引导。"), skill("companion", "战宠", "恶狼战宠", "火焰周期主动增伤。"), skill("preparation", "蓄势待发", "未雨绸缪", "恢复戒律，支持烟雾弹。")], passives: [passive("grenadier", "掷弹高手", "提高轰击手雷伤害并扩大爆炸范围。"), passive("steady-aim", "稳固瞄准", "远离敌人时增伤。"), ...commonPassives.slice(0, 2)],
    powers: [power("dawn", "武器", "黎明", "dawn-p4_unique_handxbow_001.png", "缩短复仇冷却。", "复仇常驻才能安全使用岩石护手。"), power("visage-gunes", "防具", "古内斯之面", "visage-of-gunes-p4_unique_helm_103.png", "复仇获得黑暗之心减伤。", "站桩引导的核心防线。"), power("elusive", "首饰", "残影之戒", "elusive-ring-p4_unique_ring_02.png", "烟雾弹后获得减伤。", "进入站桩前先刷新。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补单体。")],
    links: [{ title: "引导层数", category: "damage", conclusion: "开始引导后尽量不要移动；层数重置是最大损失。", steps: [["rapid-fire", "连射", "持续引导"], ["wojahnni", "沃贾尼强弩", "随时间叠伤"], ["sin-seekers", "无罪追寻者", "移除消耗"], ["mantle-channeling", "导能披肩", "引导攻防"]] }, { title: "手雷弹跳", category: "damage", conclusion: "选择墙角或密集区域，让地狱猫弹跳完整命中。", steps: [["rapid-fire", "轰击符文", "发射手雷"], ["hellcat", "地狱猫腰带", "弹跳增伤"], ["grenadier", "掷弹高手", "提高范围与伤害"]] }, { title: "站桩防线", category: "defense", conclusion: "引导前依次刷新明澈、残影与复仇，再站定输出。", steps: [["evasive-fire", "闪避射击", "刷新明澈"], ["wraps-clarity", "明澈裹腕", "生成技能减伤"], ["smoke-screen", "烟雾弹", "刷新残影"], ["vengeance", "复仇", "黑暗之心减伤"]] }],
    rotation: [{ title: "检查梦遗", action: "确认没有激活任何两件套。", reason: "套装奖励会关闭梦遗。" }, { title: "刷新防线", action: "闪避射击后使用烟雾弹。", reason: "接通明澈和残影。" }, { title: "开启复仇", action: "确保复仇黑暗之心生效。", reason: "减伤并抵消岩石护手。" }, { title: "站定引导", action: "选好位置后持续连射。", reason: "沃贾尼层数随引导时间增加。" }, { title: "火焰狼吼", action: "火焰周期主动狼战宠。", reason: "把最高层数压进元素窗。" }], pushNote: "选择安全射角后长时间站定，避免沃贾尼层数重置。", speedNote: "降低站桩时间，用烟雾弹快速转移射角。", lowNote: "先升级双手弩和箭袋拿到沃贾尼与无罪追寻者。", highNote: "火焰元素、远古散件数量和引导站位决定上限。", source: "https://www.icy-veins.com/d3/demon-hunter-rapid-fire-build-with-lod",
  },
];

const GOD_SOURCES = {
  overview: "https://www.icy-veins.com/d3/demon-hunter-hungering-arrow-build-with-god",
  gear: "https://www.icy-veins.com/d3/demon-hunter-hungering-arrow-build-with-god#bis-gear-gems-paragon-points",
  maxroll: "https://maxroll.gg/d3/guides/god-ha-demon-hunter-guide",
  cnSpeed: "https://bbs.nga.cn/read.php?tid=44264360",
  cnGr: "https://www.9game.cn/news/5268802.html",
};

const GOD_PUSH_ROTATION = [
  { title: "叠满动能", action: "进图手动释放追踪箭直到20层。", reason: "层数决定扫射移速与自动射击强度。" },
  { title: "开启复仇", action: "保持复仇黑暗之心常驻。", reason: "黎明压缩冷却，提供增伤与减伤。" },
  { title: "弧形扫射", action: "围绕高密度怪群移动扫射。", reason: "恐惧套自动发射追踪箭穿透清场。" },
  { title: "冰霜补箭", action: "冰霜周期内集中手动追踪箭。", reason: "全能法戒元素窗与吞噬箭穿透叠加。" },
  { title: "烟雾保层", action: "危险阶段用烟雾弹穿险并刷新残影。", reason: "保护斯奎特层数并接通残影减伤。" },
];

const GOD_SPEED_SKILLS = [
  { id: "hungering-arrow", rune: "吞噬箭" }, { id: "strafe", rune: "暗影游移" }, { id: "vengeance", rune: "黑暗之心" },
  { id: "preparation", rune: "惩罚" }, { id: "smoke-screen", rune: "烟幕弥漫" }, { id: "companion", rune: "野猪战宠" },
];

const GOD_SPEED_ROTATION = [
  { title: "叠满动能", action: "进图快速叠满20层追踪箭。", reason: "动能同时提供增伤与大量移速。" },
  { title: "烟雾位移", action: "扫射配合烟雾弹飘忽穿图。", reason: "杨弓减耗让戒律支撑无限位移。" },
  { title: "自动清屏", action: "扫射自动发射追踪箭，不为零散怪停留。", reason: "第九箭袋穿透与吞噬箭成长覆盖全屏。" },
  { title: "击杀转场", action: "精英死亡后利用寅剑冷却立即转场。", reason: "击杀重置冷却，下一段扫射无空档。" },
  { title: "拾取金币", action: "沿路拾取金币保持囤宝者移速。", reason: "金币链为T16、蓝门与悬赏提供持续移速。" },
];

const GOD_CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "god-head", shoulders: "god-shoulders", chest: "god-chest", gloves: "god-gloves",
    bracers: "wraps-clarity", belt: "hunter-wrath", pants: "god-pants", boots: "god-boots",
    amulet: "squirts", ring1: "focus", ring2: "restraint", weapon: "fortress", offhand: "dawn",
  },
  skills: [
    { id: "hungering-arrow", rune: "吞噬箭" }, { id: "strafe", rune: "冰寒足迹" }, { id: "vengeance", rune: "黑暗之心" },
    { id: "preparation", rune: "惩罚" }, { id: "smoke-screen", rune: "烟幕弥漫" }, { id: "companion", rune: "野猪战宠" },
  ],
  passives: ["cull-the-weak", "ambush", "awareness", "archery"],
  powers: { weapon: "ninth-cirri", armor: "depth-diggers", jewelry: "coe-power", season: "elusive" },
  legendaryGems: { control: "simplicity", channeling: "taeguk", boss: "bane-of-the-stricken" },
  normalGems: {
    head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-diamond"),
    weapon: ["flawless-royal-emerald"],
  },
  follower: { id: "scoundrel", items: ["团结", "不死圣物"], skills: ["暴击增益", "攻速"] },
  statPriorities: {
    global: ["追踪箭技能伤", "冰霜元素伤", "双暴", "冷却缩减（复仇无缝）"],
    survival: ["钻石全抗", "斯奎特层数保护", "敏捷"],
  },
  rotation: GOD_PUSH_ROTATION,
};

const GOD_SCENARIOS: BuildScenario[] = [
  {
    id: "push-low", label: "低巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "low", applicability: "supported",
    reason: "低巅峰用盾枪（堡垒弩机）与黎明双持保护斯奎特层数，魔方第九箭袋、深渊挖掘裤、全能法戒与残影；受罚者针对首领叠伤。",
    sourceRefs: [GOD_SOURCES.overview, GOD_SOURCES.gear, GOD_SOURCES.cnGr], reviewedAt: "2026-08-16",
  },
  {
    id: "push-high", label: "高巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "high", applicability: "supported",
    reason: "高巅峰由巅峰承担主属性后，把盾枪换成维拉的遗赠，扫射穿透补档并提高追踪箭触发；词缀转向范围伤与攻速档位。",
    patch: {
      gear: { weapon: "vallas-worn" },
      statPriorities: { global: ["追踪箭技能伤", "冰霜元素伤", "范围伤≥100%", "攻速档位"], survival: ["钻石全抗", "斯奎特层数保护"], endgame: ["武器与手套补范围伤", "攻速避开8/6档"] },
    },
    sourceRefs: [GOD_SOURCES.overview, GOD_SOURCES.gear, GOD_SOURCES.cnGr], reviewedAt: "2026-08-16",
  },
  {
    id: "speed-low", label: "低巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "low", applicability: "supported",
    reason: "T16小秘境、蓝门（敌意幻象）与悬赏都掉金币且怪物密度高，恐惧冰吞扫射自动清屏；杨弓减耗让烟雾弹无限位移，囤宝者+贪婪提供金币移速，寅剑击杀精英后冷却重置。蓝门与T16共用配置，原因是掉金币、密度相近、无独立坚韧需求。",
    patch: {
      gear: { weapon: "yang", offhand: "ninth-cirri-worn" },
      powers: { weapon: "dawn-cube", jewelry: "elusive", season: "ingeom" },
      skills: GOD_SPEED_SKILLS,
      legendaryGems: { boss: "boon-of-the-hoarder" },
      follower: { items: ["贪婪之戒", "不死圣物"], skills: ["暴击增益", "攻速"] },
      statPriorities: { global: ["25%移速上限", "追踪箭技能伤", "冰霜元素伤", "戒律管理（杨弓减耗）"], survival: ["金币链覆盖", "钻石全抗", "敏捷"] },
      rotation: GOD_SPEED_ROTATION,
    },
    sourceRefs: [GOD_SOURCES.cnSpeed, GOD_SOURCES.maxroll], reviewedAt: "2026-08-16",
  },
  {
    id: "speed-high", label: "高巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "high", applicability: "supported",
    reason: "高巅峰伤害溢出后，第4槽从寅剑换成维拉的遗赠，用扫射穿透加快清屏；词缀转向范围伤与移速。",
    patch: {
      gear: { weapon: "yang", offhand: "ninth-cirri-worn" },
      powers: { weapon: "dawn-cube", jewelry: "elusive", season: "vallas" },
      skills: GOD_SPEED_SKILLS,
      legendaryGems: { boss: "boon-of-the-hoarder" },
      follower: { items: ["贪婪之戒", "不死圣物"], skills: ["暴击增益", "攻速"] },
      statPriorities: { global: ["25%移速上限", "追踪箭技能伤", "范围伤害", "冰霜元素伤"], survival: ["金币链覆盖", "钻石全抗"], endgame: ["词缀洗敏捷换范围伤", "伤害溢出后转扫射穿透"] },
      rotation: GOD_SPEED_ROTATION,
    },
    sourceRefs: [GOD_SOURCES.cnSpeed, GOD_SOURCES.maxroll], reviewedAt: "2026-08-16",
  },
];

const GOD_PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "二件套动能已给大量移速，仍补满25%上限。" },
      { stat: "敏捷", target: "其余点数", reason: "同时提高伤害和护甲，是默认投入。" },
      { stat: "体能", target: "生存不足时临时投入", reason: "恐惧冰吞坚韧较低，被秒时先换容错。" },
      { stat: "憎恨上限", target: "适量投入", reason: "提高扫射与追踪箭的资源池，冲层与速刷都有价值。" },
    ],
    offense: [
      { stat: "冷却缩减", target: "优先点满", reason: "先实现复仇无缝常驻，黎明配合更省词缀。" },
      { stat: "暴击几率", target: "第二点满", reason: "提升吞噬箭与飞弹/冰寒触发收益。" },
      { stat: "暴击伤害", target: "第三点满", reason: "与暴击几率共同成长。" },
      { stat: "攻击速度", target: "谨慎投入", reason: "攻速影响扫射档位，按武器类型调整，不要盲目点满。" },
    ],
    defense: [
      { stat: "全元素抗性", target: "优先点满", reason: "恐惧冰吞靠百分比回血，更依赖全抗扩有效生命。" },
      { stat: "生命%", target: "第二点满", reason: "配合护甲钻石扩大容错。" },
      { stat: "护甲", target: "第三点满", reason: "补充敏捷护甲。" },
      { stat: "生命恢复", target: "最后点满", reason: "至简之力已提供主要治疗。" },
    ],
    utility: [
      { stat: "能量消耗降低", target: "优先点满", reason: "降低扫射和烟雾弹的消耗压力。" },
      { stat: "范围伤害", target: "第二点满", reason: "吞噬箭穿透与范围伤在密集怪群收益高。" },
      { stat: "击中回复生命", target: "第三点满", reason: "扫射高频命中提供额外治疗。" },
      { stat: "金币拾取范围", target: "最后点满", reason: "主要服务T16、蓝门与悬赏金币链。" },
    ],
  },
  post800: [
    { priority: "敏捷", when: "默认与冲层", reason: "持续提供伤害和护甲。" },
    { priority: "体能", when: "大秘境被单次技能击杀", reason: "只补到能稳定承受当前层数，再继续敏捷。" },
  ],
  checkpoints: [
    { label: "刚到70级", target: "25%移速+冷却优先", action: "先让复仇无缝、动能层数不断。" },
    { label: "巅峰800", target: "四页关键项目点满", action: "钻石全抗和敏捷词缀承担生存与伤害。" },
    { label: "巅峰2000+", target: "范围伤、攻速档位与戒律", action: "敏捷由巅峰承担后，装备转向范围伤与扫射档位。" },
  ],
};

const GOD_CHOICE_POLICIES: BuildChoicePolicy[] = [
  { key: "god-core", targetType: "gear", targetId: "ninth-cirri", label: "恐惧六件、第九箭袋与吞噬箭", status: "locked", reason: "恐惧六件提供100倍独立增伤，扫射自动发射最后一次主要技能；第九箭袋让追踪箭必定穿透，吞噬箭穿透成长是主要输出来源。" },
  { key: "weapon-combo", targetType: "gear", targetId: "fortress", label: "武器组合", status: "conditional", reason: "冲层用盾枪保斯奎特或维拉补档，速刷用杨弓减耗实现无限位移；魔方武器在第九箭袋与黎明之间互换。", alternatives: [{ id: "vallas-worn", label: "维拉的遗赠", when: "高巅峰冲层，扫射需要穿透补档", gain: "扫射投射物穿透并提高追踪箭触发", cost: "失去盾枪的护盾保护", scenarios: ["push-high"] }, { id: "yang", label: "杨的反曲弓", when: "T16、蓝门与悬赏速刷", gain: "50%减耗支撑烟雾弹无限位移", cost: "白字低于双手弩，冲层不推荐", scenarios: ["speed-low", "speed-high"] }] },
  { key: "strafe-rune", targetType: "skill", targetId: "strafe", label: "扫射符文", status: "conditional", reason: "冲层用冰寒足迹提供减速与冰霜触发，速刷用暗影游移把扫射移速提高到普通穿戴速度。", alternatives: [{ id: "strafe-drift", label: "暗影游移", when: "T16、蓝门与悬赏速刷", gain: "扫射移速100%，赶路更快", cost: "失去冰寒足迹的减速", scenarios: ["speed-low", "speed-high"] }] },
  { key: "season-slot", targetType: "power", targetId: "elusive", label: "第39赛季第四槽", status: "conditional", reason: "冲层用残影之戒提供烟雾弹后减伤；速刷用寅剑击杀精英重置冷却，伤害溢出后可换维拉扫射穿透。", alternatives: [{ id: "ingeom", label: "寅剑", when: "T16、蓝门与悬赏速刷，精英密集", gain: "击杀精英后大幅缩短冷却", cost: "首领战或精英稀疏时收益下降", scenarios: ["speed-low"] }, { id: "vallas", label: "维拉的遗赠", when: "高巅峰速刷伤害已溢出", gain: "扫射穿透清屏更快", cost: "失去寅剑的冷却重置", scenarios: ["speed-high"] }] },
  { key: "jewelry-cube", targetType: "power", targetId: "coe-power", label: "首饰萃取", status: "conditional", reason: "冲层用全能法戒在冰霜周期集中爆发；速刷用残影之戒提供稳定减伤，保护斯奎特。", alternatives: [{ id: "elusive", label: "残影之戒", when: "速刷且坚韧不足", gain: "烟雾弹或翻滚后稳定减伤", cost: "失去元素爆发窗", scenarios: ["speed-low", "speed-high"] }] },
  { key: "third-gem", targetType: "legendary-gem", targetId: "bane-of-the-stricken", label: "第三颗传奇宝石", status: "conditional", reason: "至简之力与太极石是恐惧冰吞的核心双宝石；第三颗由内容决定，冲层用受罚者叠首领，速刷用囤宝者提供金币移速。", alternatives: [{ id: "boon-of-the-hoarder", label: "囤宝者的恩惠", when: "T16、蓝门与悬赏", gain: "金币与移动速度，配合贪婪之戒", cost: "大秘境不掉金币，无法工作", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-low", "speed-high"] }] },
  { key: "follower", targetType: "follower", targetId: "scoundrel", label: "随从选择", status: "flexible", reason: "盗贼固定提供暴击增益与远程控场；速刷随从戴贪婪之戒扩大拾取，冲层戴团结与不死圣物提容错。" },
];

const GOD_REVIEWED_GUIDE: BuildGuide = {
  ...createClassGuide(godSeed),
  configurationBase: GOD_CONFIGURATION_BASE,
  defaultMode: "push",
  defaultScenarioId: "push-low",
  scenarios: GOD_SCENARIOS,
  paragonGuide: GOD_PARAGON,
  choicePolicies: GOD_CHOICE_POLICIES,
  reviewStatus: "fully-reviewed",
  variantCompleteness: "complete",
};

const GOD_VALIDATION_ERRORS = validateReviewedBuildGuide(GOD_REVIEWED_GUIDE);
if (GOD_VALIDATION_ERRORS.length > 0) throw new Error(`恐惧冰吞配置校验失败：${GOD_VALIDATION_ERRORS.join("；")}`);

export const DEMON_HUNTER_BUILDS: Record<string, BuildGuide> = {
  ...Object.fromEntries(seeds.map((seed) => {
    const guide = createGenericReviewedGuide(createClassGuide(seed));
    return [guide.id, guide];
  })),
  [GOD_REVIEWED_GUIDE.id]: GOD_REVIEWED_GUIDE,
};
