import { createClassGuide, createGenericReviewedGuide, GEMS, itemFile, jewelry, legendary, passive, power, setGear, skill, type ClassGuideSeed, type GearSeed } from "./class-build-factory";
import { validateReviewedBuildGuide, type BuildChoicePolicy, type BuildConfiguration, type BuildGuide, type BuildScenario, type GuideGear, type GuidePower, type ParagonGuide } from "./build-guides";

const mundunugu: GearSeed[] = [
  setGear("mund-head", "头部", "蒙嘟噜的头饰", "mundunugus-headdress-p68_unique_helm_set_04.png", "蒙嘟噜套部件；法力回复会提高魂灵弹幕伤害。", "魂灵弹幕"),
  setGear("mund-shoulders", "肩部", "蒙嘟噜的后裔", "mundunugus-descendant-p68_unique_shoulder_set_04.png", "蒙嘟噜套部件。", "魂灵弹幕"),
  setGear("mund-chest", "胸部", "蒙嘟噜的法袍", "mundunugus-robe-p68_unique_chest_set_04.png", "蒙嘟噜套部件。", "魂灵弹幕"),
  setGear("mund-gloves", "手部", "蒙嘟噜的节奏", "mundunugus-rhythm-p68_unique_gloves_set_04.png", "蒙嘟噜套部件。"),
  setGear("mund-pants", "腿部", "蒙嘟噜的装饰", "mundunugus-decoration-p68_unique_pants_set_04.png", "蒙嘟噜套部件。"),
  setGear("mund-boots", "脚部", "蒙嘟噜之舞", "mundunugus-dance-p68_unique_boots_set_04.png", "蒙嘟噜套部件；魂灵弹幕技能伤优先。", "魂灵弹幕"),
];

const arachyr: GearSeed[] = [
  setGear("arachyr-head", "头部", "亚拉基尔的面容", "arachyrs-visage-unique_helm_set_02_p3.png", "亚拉基尔套部件；蜘蛛女王蛛网提供攻防区域。", "尸蛛"),
  setGear("arachyr-shoulders", "肩部", "亚拉基尔的肩甲", "arachyrs-mantle-unique_shoulder_set_02_p3.png", "亚拉基尔套部件。", "尸蛛"),
  setGear("arachyr-chest", "胸部", "亚拉基尔的甲壳", "arachyrs-carapace-unique_chest_set_02_p3.png", "亚拉基尔套部件。", "尸蛛"),
  setGear("arachyr-gloves", "手部", "亚拉基尔的利爪", "arachyrs-claws-unique_gloves_set_02_p3.png", "亚拉基尔套部件。"),
  setGear("arachyr-pants", "腿部", "亚拉基尔的腿甲", "arachyrs-legs-unique_pants_set_02_p3.png", "亚拉基尔套部件。"),
  setGear("arachyr-boots", "脚部", "亚拉基尔的步伐", "arachyrs-stride-unique_boots_set_02_p3.png", "亚拉基尔套部件；尸蛛技能伤优先。", "尸蛛"),
];

const jade: GearSeed[] = [
  setGear("jade-head", "头部", "玉魂师的智慧", "jade-harvesters-wisdom-unique_helm_set_09_x1.png", "玉魂套部件；魂灵收割提前结算持续伤害。", "魂灵收割"),
  setGear("jade-shoulders", "肩部", "玉魂师的喜悦", "jade-harvesters-joy-unique_shoulder_set_09_x1.png", "玉魂套部件。", "蚀魂"),
  setGear("jade-chest", "胸部", "玉魂师的安宁", "jade-harvesters-peace-unique_chest_set_09_x1.png", "玉魂套部件。", "蚀魂"),
  setGear("jade-gloves", "手部", "玉魂师的仁慈", "jade-harvesters-mercy-unique_gloves_set_09_x1.png", "玉魂套部件。"),
  setGear("jade-pants", "腿部", "玉魂师的勇气", "jade-harvesters-courage-unique_pants_set_09_x1.png", "玉魂套部件。"),
  setGear("jade-boots", "脚部", "玉魂师的迅捷", "jade-harvesters-swiftness-unique_boots_set_09_x1.png", "玉魂套部件；蚀魂技能伤优先。", "蚀魂"),
];

const helltooth: GearSeed[] = [
  setGear("helltooth-head", "头部", "魔牙面具", "helltooth-mask-unique_helm_set_16_x1.png", "魔牙套部件；死亡之壁触发死疽与套装增伤。", "巨尸"),
  setGear("helltooth-shoulders", "肩部", "魔牙肩甲", "helltooth-mantle-unique_shoulder_set_16_x1.png", "魔牙套部件。", "巨尸"),
  setGear("helltooth-chest", "胸部", "魔牙外套", "helltooth-tunic-unique_chest_set_16_x1.png", "魔牙套部件。", "巨尸"),
  setGear("helltooth-gloves", "手部", "魔牙护手", "helltooth-gauntlets-unique_gloves_set_16_x1.png", "魔牙套部件。"),
  setGear("helltooth-pants", "腿部", "魔牙腿甲", "helltooth-leg-guards-unique_pants_set_16_x1.png", "魔牙套部件。"),
  setGear("helltooth-boots", "脚部", "魔牙胫甲", "helltooth-greaves-unique_boots_set_16_x1.png", "魔牙套部件；巨尸技能伤优先。", "巨尸"),
];

const zuni: GearSeed[] = [
  setGear("zuni-head", "头部", "祖尼玛萨的视界", "zunimassas-vision-unique_voodoomask_007_x1.png", "祖尼玛萨套部件；宠物攻击被角色法力消耗技能标记的目标。", "毒液吹箭"),
  setGear("zuni-chest", "胸部", "祖尼玛萨的骨髓", "zunimassas-marrow-unique_chest_016_x1.png", "祖尼玛萨套部件。", "毒液吹箭"),
  setGear("zuni-gloves", "手部", "祖尼玛萨的裹手", "zunimassas-finger-wraps-p2_unique_gloves_03.png", "祖尼玛萨套部件。"),
  setGear("zuni-pants", "腿部", "祖尼玛萨的衣物", "zunimassas-cloth-p2_unique_pants_04.png", "祖尼玛萨套部件。"),
  setGear("zuni-boots", "脚部", "祖尼玛萨的足迹", "zunimassas-trail-unique_boots_013_x1.png", "祖尼玛萨套部件；毒液吹箭技能伤优先。", "毒液吹箭"),
];

const commonPassives = [
  passive("grave-injustice", "魂灵归体", "附近敌人死亡时缩短冷却并恢复资源，密度越高循环越快。"),
  passive("confidence-ritual", "信心仪式", "近距离敌人受到更多伤害。"),
  passive("pierce-the-veil", "穿透迷雾", "提高伤害但增加法力消耗。"),
  passive("spirit-vessel", "魂灵归体", "致命伤害时保命并缩短灵行冷却。"),
];

const knife = (id: string, name: string, file: string, effect: string) => legendary(id, "主手", name, file, effect, { base: "祭祀刀" });
const mojo = (id: string, name: string, file: string, effect: string) => legendary(id, "副手", name, file, effect, { base: "咒物" });

const seeds: ClassGuideSeed[] = [
  {
    classKey: "witch-doctor", id: "mundunugu-barrage", name: "蒙嘟噜魂弹", set: "蒙嘟噜的法衣", core: "召出魂灵幻象 → 理发师统一结算", summary: "魂灵弹幕的幻象持续蓄积命中，理发师不立即造成伤害，而是在结束时把累积伤害统一爆发。", difficulty: "高操作 · 延迟结算", follower: "魔女", followerReason: "控场帮助魂灵幻象完整覆盖，冷却缩减支持灵行与收割。", element: "冰霜", coreSkill: "魂灵弹幕",
    gear: [...mundunugu, legendary("lakumba", "腕部", "拉昆巴的腕饰", "lakumbas-ornament-p72_unique_bracer_102.png", "魂灵收割层数提供减伤。", { element: "冰霜" }), legendary("witching-hour", "腰部", "巫异时刻", "the-witching-hour-unique_belt_009_x1.png", "攻速和暴击伤害提高弹幕结算。"), jewelry("squirt", "trapped"), jewelry("coe", "stricken"), jewelry("emptiness", "zei"), knife("barber", "理发师", "the-barber-p68_unique_dagger_003.png", "魂灵弹幕伤害不立即结算，而是蓄积后一次爆发。"), mojo("gazing-demise", "凝视死亡", "gazing-demise-p68_unique_mojo_003.png", "魂灵弹幕获得灵魂幻象符文并提高伤害。")],
    skills: [skill("spirit-barrage", "魂灵弹幕", "灵魂幻象", "主要伤害；幻象持续蓄积并由理发师统一结算。"), skill("locust-swarm", "虫群", "瘟疫虫群", "触发虚空之戒并传播持续伤害。"), skill("soul-harvest", "魂灵收割", "困魂压魄", "拉昆巴减伤和智力层数来源。"), skill("spirit-walk", "灵行", "灵魂漫步", "穿过敌人与危险区域。"), skill("piranhas", "食人鱼", "食人鱼旋风", "聚怪并使敌人易伤。"), skill("big-bad-voodoo", "巫毒狂舞", "鬼魂恩泽", "爆发区内提高攻速和伤害。")], passives: commonPassives,
    powers: [power("sacred-harvester", "武器", "神圣收割者", "sacred-harvester-p1_ceremonialdagger_norm_unique_01.png", "魂灵收割最大层数提高。", "拉昆巴腕饰的减伤层数也随之提高。"), power("frostburn", "防具", "霜燃", "frostburn-p41_unique_gloves_002.png", "提高冰霜伤害并冻结敌人。", "保护斯奎特并补控制。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "为功能腰带和腕部释放位置。", "第一幕/第四幕悬赏箱。"), power("ring-emptiness", "第4槽", "虚空之戒", "ring-of-emptiness-p42_unique_ring_haunt.png", "被虫群或蚀魂影响的敌人承受更多伤害。", "第39赛季第四槽保留全能法戒与虚空乘区。")],
    links: [{ title: "延迟爆炸发动机", category: "damage", conclusion: "看到伤害数字变少不是失效；理发师正在蓄积，幻象消失时才统一结算。", steps: [["spirit-barrage", "魂灵弹幕", "持续命中"], ["gazing-demise", "凝视死亡", "生成灵魂幻象"], ["barber", "理发师", "蓄积全部伤害"], ["coe", "元素窗口", "控制最终结算"]] }, { title: "虫群虚空乘区", category: "damage", conclusion: "爆发前先让虫群覆盖目标，否则虚空之戒没有增伤。", steps: [["locust-swarm", "虫群", "标记目标"], ["emptiness", "虚空之戒", "触发独立乘区"], ["spirit-barrage", "魂弹", "开始蓄积"]] }, { title: "收割减伤", category: "defense", conclusion: "进入战斗先叠满收割；层数掉落会同时失去智力与拉昆巴减伤。", steps: [["soul-harvest", "魂灵收割", "叠层"], ["sacred-harvester", "神圣收割者", "提高上限"], ["lakumba", "拉昆巴腕饰", "层数转减伤"]] }],
    rotation: [{ title: "叠满收割", action: "灵行进入怪群后使用魂灵收割。", reason: "建立拉昆巴减伤。" }, { title: "虫群标记", action: "让虫群覆盖精英和周围怪物。", reason: "启动虚空之戒。" }, { title: "食人鱼聚怪", action: "把目标拉入同一结算区域。", reason: "幻象覆盖越完整越好。" }, { title: "布置幻象", action: "围绕精英放置魂灵弹幕幻象。", reason: "理发师开始蓄积伤害。" }, { title: "等待结算", action: "不要过早离开或覆盖错误位置。", reason: "幻象结束时才统一爆发。" }], pushNote: "先完成虫群与收割，再围绕元素窗布置并等待幻象结算。", speedNote: "减少幻象等待，灵行穿图后短暂放置魂弹。", lowNote: "理发师和凝视死亡是发动机，优先升级祭祀刀与咒物。", highNote: "冰霜元素、范围伤、法力回复和结算时机决定上限。", source: "https://www.icy-veins.com/d3/witch-doctor-mundunugu-spirit-barrage-build",
  },
  {
    classKey: "witch-doctor", id: "arachyr-spiders", name: "亚拉基尔蜘蛛", set: "亚拉基尔的灵魂", core: "蜘蛛女王铺网 → 尸蛛持续撕咬", summary: "尸蛛召出蜘蛛女王并铺设蛛网，亚拉基尔在蛛网内提供攻防，蜘蛛女王之握与侍从宝石放大宠物。", difficulty: "中等 · 区域控制", follower: "魔女", followerReason: "额外控场让敌人停留在蛛网和尸蛛攻击区。", element: "物理", coreSkill: "尸蛛",
    gear: [...arachyr, legendary("lakumba", "腕部", "拉昆巴的腕饰", "lakumbas-ornament-p72_unique_bracer_102.png", "魂灵收割层数提供减伤。", { element: "物理" }), legendary("transcendence", "腰部", "超越之带", "belt-of-transcendence-p2_unique_belt_02.png", "消耗法力时召唤鬼娃，补充宠物数量。"), jewelry("traveler", "trapped"), jewelry("compass", "enforcer"), jewelry("emptiness", "stricken"), knife("spider-grasp", "蜘蛛女王之握", "the-spider-queens-grasp-p72_unique_ceremonialdagger_004.png", "提高尸蛛伤害，并使其攻击减速敌人。"), mojo("henri", "亨利的追寻", "henris-perquisition-p2_mojo_norm_unique_02.png", "首次受伤时获得减伤并魅惑攻击者。")],
    skills: [skill("corpse-spiders", "尸蛛", "育雏蛛后", "主要输出；蜘蛛女王铺网并持续攻击。"), skill("locust-swarm", "虫群", "瘟疫虫群", "触发虚空之戒。"), skill("soul-harvest", "魂灵收割", "困魂压魄", "叠智力与拉昆巴减伤。"), skill("spirit-walk", "灵行", "灵魂漫步", "安全进入收割范围。"), skill("piranhas", "食人鱼", "食人鱼旋风", "把敌人拉回蛛网。"), skill("horrify", "惧灵", "骇人仪容", "提高护甲并恐惧近身敌人。")], passives: [passive("creeping-death", "死亡蔓延", "虫群和蚀魂持续时间极大延长。"), passive("fetish-sycophants", "鬼娃跟班", "攻击时召唤鬼娃。"), ...commonPassives.slice(0, 2)],
    powers: [power("echoing-fury", "武器", "怒火回荡", "echoing-fury-p66_unique_mace_1h_001.png", "击杀后提高攻速与移速。", "尸蛛投掷和宠物攻击更快。"), power("tasker", "防具", "宠爱手套", "tasker-and-theo-unique_gloves_003_x1.png", "提高宠物攻速。", "尸蛛和鬼娃都获得收益。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "释放腰带与腕部位置。", "第一幕/第四幕悬赏箱。"), power("sacred-harvester", "第4槽", "神圣收割者", "sacred-harvester-p1_ceremonialdagger_norm_unique_01.png", "提高魂灵收割上限。", "第39赛季第四槽强化拉昆巴减伤。")],
    links: [{ title: "蛛网战区", category: "damage", conclusion: "角色和敌人都应留在蜘蛛女王蛛网附近，离开区域会丢失套装收益。", steps: [["corpse-spiders", "尸蛛", "召出蜘蛛女王"], ["arachyr-head", "亚拉基尔套", "蛛网内攻防"], ["piranhas", "食人鱼", "把敌人拉回战区"]] }, { title: "宠物攻速链", category: "damage", conclusion: "尸蛛被视为宠物，侍从、宠爱手套和攻击速度都会参与。", steps: [["spider-grasp", "蜘蛛女王之握", "尸蛛技能乘区"], ["tasker", "宠爱手套", "宠物攻速"], ["compass-rose", "侍从宝石", "镶嵌在罗盘玫瑰，提供宠物增伤"]] }, { title: "虫群虚空", category: "damage", conclusion: "每片新怪群先补虫群，再投掷尸蛛。", steps: [["locust-swarm", "虫群", "标记敌人"], ["emptiness", "虚空之戒", "独立乘区"], ["corpse-spiders", "尸蛛撕咬", "主要伤害"]] }],
    rotation: [{ title: "灵行收割", action: "进入怪群叠满魂灵收割。", reason: "建立拉昆巴防线。" }, { title: "虫群覆盖", action: "先让虫群传播。", reason: "启动虚空之戒。" }, { title: "投蛛铺网", action: "对精英持续投掷尸蛛。", reason: "蜘蛛女王建立套装战区。" }, { title: "食人鱼回拉", action: "敌人走出蛛网时用食人鱼聚回。", reason: "保持套装倍率与宠物命中。" }, { title: "保持远距", action: "灵行调整到蛛网边缘。", reason: "无尽之途站定增伤并减少受击。" }], pushNote: "以蜘蛛女王蛛网为战区，持续把精英拉回其中。", speedNote: "每组怪投一次蜘蛛女王后立即灵行转场。", lowNote: "蜘蛛女王之握与宠爱手套优先，普通高特效即可。", highNote: "宠物攻速、物理元素和范围伤决定上限。", source: "https://www.icy-veins.com/d3/witch-doctor-arachyr-corpse-spiders-build",
  },
  {
    classKey: "witch-doctor", id: "arachyr-chicken", name: "亚拉基尔愤怒鸡", set: "亚拉基尔 / 玛纳祖玛", core: "愤怒鸡高速移动 → 解除形态爆炸", summary: "玛纳祖玛套让愤怒鸡持续更久、移动更快并提高爆炸，亚拉基尔进一步放大生物技能。", difficulty: "低操作 · 极限速刷", follower: "魔女", followerReason: "冷却缩减帮助鸡形态循环，远程控场处理漏怪。", element: "毒素", coreSkill: "妖术",
    gear: [...arachyr, legendary("lakumba", "腕部", "拉昆巴的腕饰", "lakumbas-ornament-p72_unique_bracer_102.png", "魂灵收割层数提供减伤。", { element: "毒素" }), legendary("transcendence", "腰部", "超越之带", "belt-of-transcendence-p2_unique_belt_02.png", "消耗法力召唤鬼娃，辅助清理漏怪。"), jewelry("squirt", "trapped"), jewelry("focus", "powerful"), jewelry("restraint", "zei"), knife("manajuma-knife", "玛纳祖玛的雕刻刀", "manajumas-carving-knife-unique_ceremonialdagger_009_x1.png", "与血腥祭品组成玛纳祖玛套，强化愤怒鸡。"), mojo("manajuma-mojo", "玛纳祖玛的血腥祭品", "manajumas-gory-fetch-unique_mojo_010_x1.png", "延长鸡形态、提高移速并让爆炸伤害大增。")],
    skills: [skill("hex", "妖术", "愤怒鸡", "变鸡高速移动，主动解除时爆炸。"), skill("corpse-spiders", "尸蛛", "育雏蛛后", "触发亚拉基尔蛛网并清理残余。"), skill("soul-harvest", "魂灵收割", "困魂压魄", "叠拉昆巴减伤。"), skill("spirit-walk", "灵行", "灵魂漫步", "鸡形态空档的无敌位移。"), skill("piranhas", "食人鱼", "食人鱼旋风", "爆炸前聚怪。"), skill("locust-swarm", "虫群", "瘟疫虫群", "触发虚空之戒并清理残血。")], passives: [passive("fierce-loyalty", "凶残忠诚", "有宠物时提高移动速度。"), passive("grave-injustice", "墓葬不公", "击杀缩短妖术和灵行冷却。"), ...commonPassives.slice(1, 3)],
    powers: [power("echoing-fury", "武器", "怒火回荡", "echoing-fury-p66_unique_mace_1h_001.png", "击杀提高移速和攻速。", "速刷连续击杀维持高速。"), power("tasker", "防具", "宠爱手套", "tasker-and-theo-unique_gloves_003_x1.png", "提高宠物攻速。", "蜘蛛与鬼娃处理爆炸残余。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "为腰带和腕部释放位置。", "第一幕/第四幕悬赏箱。"), power("shukrani", "第4槽", "舒克拉尼的胜利", "shukranis-triumph-p72_unique_mojo_102.png", "灵行在未攻击时持续存在。", "第39赛季第四槽填补鸡形态间的转场空档。")],
    links: [{ title: "鸡形态爆炸", category: "movement", conclusion: "鸡形态既是移动也是爆发准备，接近精英后主动解除。", steps: [["hex", "愤怒鸡", "进入高速形态"], ["manajuma-knife", "玛纳祖玛刀", "套装一件"], ["manajuma-mojo", "血腥祭品", "延长加速并增伤"], ["piranhas", "聚怪后爆炸", "集中命中"]] }, { title: "击杀续航", category: "movement", conclusion: "连续击杀会同时刷新妖术、灵行和怒火回荡移速。", steps: [["hex", "鸡爆", "击杀怪群"], ["grave-injustice", "墓葬不公", "击杀缩冷却"], ["echoing-fury", "怒火回荡", "击杀加速"]] }, { title: "空档无敌", category: "defense", conclusion: "鸡形态结束后立刻灵行，舒克拉尼让无敌转场保持到下组怪。", steps: [["spirit-walk", "灵行", "鸡形态空档"], ["shukrani", "舒克拉尼", "未攻击持续"], ["soul-harvest", "收割", "到站叠减伤"]] }],
    rotation: [{ title: "叠收割", action: "进图先靠近怪群叠魂灵收割。", reason: "低巅峰需要拉昆巴减伤。" }, { title: "变鸡赶路", action: "开启愤怒鸡直奔精英。", reason: "玛纳祖玛提供极高移速。" }, { title: "食人鱼聚怪", action: "接近目标时聚拢敌人。", reason: "让鸡爆命中整组。" }, { title: "主动爆炸", action: "解除鸡形态。", reason: "玛纳祖玛与亚拉基尔共同放大。" }, { title: "灵行续跑", action: "冷却空档用灵行转场。", reason: "舒克拉尼保持无敌移动。" }], pushNote: "只适合中低层；高层需谨慎选择爆炸时机与精英词缀。", speedNote: "全程鸡形态和灵行交替，精英处一次爆炸。", lowNote: "优先升级祭祀刀与咒物，必须拿齐玛纳祖玛两件。", highNote: "毒素元素、冷却和移动路线决定速刷上限。", source: "https://www.icy-veins.com/d3/witch-doctor-arachyr-angry-chicken-build",
  },
  {
    classKey: "witch-doctor", id: "zuni-darts", name: "祖尼玛毒镖", set: "祖尼玛萨之魂", core: "角色吹箭 → 鬼娃同步射击", summary: "鬼娃头让所有鬼娃同步发射角色的毒镖，剃头师匕首让飞镖穿透，祖尼玛标记提供套装宠物乘区。", difficulty: "中等 · 宠物弹幕", follower: "魔女", followerReason: "远程控场帮助鬼娃弹幕完整穿透怪群。", element: "毒素", coreSkill: "毒液吹箭",
    gear: [zuni[0], legendary("aughild-shoulders", "肩部", "奥吉德的力量", "/d3/aughild-shoulders.png", "与奥吉德护腕组成精英攻防。", { quality: "set", method: ["悬赏图纸", "铁匠锻造", "不要黄装升级"] }), zuni[1], zuni[2], legendary("aughild-bracers", "腕部", "奥吉德的搜捕", "/d3/aughild-bracers.png", "奥吉德套装护腕。", { quality: "set", element: "毒素", method: ["悬赏图纸", "铁匠锻造", "不要黄装升级"] }), legendary("transcendence", "腰部", "超越之带", "belt-of-transcendence-p2_unique_belt_02.png", "消耗法力时持续召唤鬼娃。"), zuni[3], zuni[4], jewelry("squirt", "enforcer"), jewelry("focus", "trapped"), jewelry("restraint", "stricken"), knife("dagger-darts", "剃头师之匕", "the-dagger-of-darts-p65_ceremonialdagger_norm_unique_02.png", "角色和鬼娃的毒镖穿透并提高伤害。"), mojo("zuni-mojo", "祖尼玛萨的头骨串", "zunimassas-string-of-skulls-unique_mojo_011_x1.png", "祖尼玛套装副手，提供套装件数与宠物词缀。")],
    skills: [skill("poison-dart", "毒液吹箭", "脊刺毒镖", "角色射击会由全部鬼娃同步复制。"), skill("fetish-army", "鬼娃大军", "匕首军团", "主动召唤鬼娃并提供爆发。"), skill("piranhas", "食人鱼", "食人鱼旋风", "聚怪并触发祖尼玛法力消耗标记。"), skill("spirit-walk", "灵行", "灵魂漫步", "保持远距与躲避。"), skill("soul-harvest", "魂灵收割", "困魂压魄", "叠智力和减伤。"), skill("locust-swarm", "虫群", "瘟疫虫群", "触发虚空之戒。")], passives: [passive("fetish-sycophants", "鬼娃跟班", "攻击时召唤更多鬼娃。"), passive("pierce-the-veil", "穿透迷雾", "提高宠物与角色伤害。"), ...commonPassives.slice(0, 2)],
    powers: [power("echoing-fury", "武器", "怒火回荡", "echoing-fury-p66_unique_mace_1h_001.png", "击杀提高攻速。", "角色攻速会影响鬼娃毒镖频率。"), power("carnevil", "防具", "鬼娃面具", "carnevil-p65_unique_voodoomask_101_x1.png", "附近鬼娃同步发射角色的毒镖。", "构筑的复制发动机。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "让祖尼玛五件与奥吉德两件同时成立。", "第一幕/第四幕悬赏箱。"), power("emptiness", "第4槽", "虚空之戒", "ring-of-emptiness-p42_unique_ring_haunt.png", "虫群目标承受更多伤害。", "第39赛季第四槽保留双戒和虚空乘区。")],
    links: [{ title: "鬼娃同步毒镖", category: "damage", conclusion: "角色攻速和射角会被整支鬼娃队伍放大。", steps: [["poison-dart", "角色毒镖", "发出一次射击"], ["carnevil", "鬼娃面具", "鬼娃同步复制"], ["dagger-darts", "剃头师之匕", "所有飞镖穿透"], ["squirts", "侍从宝石", "镶嵌在斯奎特项链，提供宠物乘区"]] }, { title: "祖尼玛标记", category: "damage", conclusion: "必须用法力消耗技能命中目标，宠物才能获得祖尼玛六件倍率。", steps: [["piranhas", "食人鱼", "消耗法力标记"], ["zuni-head", "祖尼玛六件", "宠物攻击标记目标"], ["poison-dart", "毒镖弹幕", "集中穿透"]] }, { title: "鬼娃数量", category: "resource", conclusion: "超越之带和鬼娃跟班共同补满宠物数量。", steps: [["piranhas", "法力消耗", "触发腰带"], ["transcendence", "超越之带", "召唤鬼娃"], ["fetish-sycophants", "鬼娃跟班", "攻击再召唤"], ["fetish-army", "鬼娃大军", "主动补充"]] }],
    rotation: [{ title: "召满鬼娃", action: "进图开启鬼娃大军并持续施法。", reason: "宠物数量决定弹幕规模。" }, { title: "虫群覆盖", action: "让虫群传播到精英。", reason: "启动虚空之戒。" }, { title: "食人鱼标记", action: "把怪拉紧并触发祖尼玛六件。", reason: "宠物只对法力消耗技能标记目标获得倍率。" }, { title: "远距吹箭", action: "选择怪群长轴连续毒镖。", reason: "穿透飞镖命中越多目标越好。" }, { title: "灵行换角", action: "怪群转向时移动到新射线。", reason: "鬼娃弹幕需要正确射角。" }], pushNote: "把精英拉入长条密度，保持法力标记后沿长轴吹箭。", speedNote: "食人鱼标记后短按毒镖，灵行快速换组。", lowNote: "鬼娃面具和剃头师匕首是必需品，优先祭祀刀升级。", highNote: "毒素元素、攻击速度和范围伤决定弹幕上限。", source: "https://www.icy-veins.com/d3/witch-doctor-zunimassa-poison-dart-build",
  },
  {
    classKey: "witch-doctor", id: "jade-harvest", name: "玉魂收割", set: "玉魂师的战甲", core: "铺蚀魂虫群 → 收割提前结算", summary: "先让蚀魂和虫群覆盖怪群，玉魂六件的魂灵收割会把剩余持续伤害立即结算。", difficulty: "高操作 · 周期收割", follower: "魔女", followerReason: "控场能把怪群固定在收割半径，冷却帮助灵行与收割轮转。", element: "冰霜", coreSkill: "魂灵收割",
    gear: [...jade, legendary("lakumba", "腕部", "拉昆巴的腕饰", "lakumbas-ornament-p72_unique_bracer_102.png", "魂灵收割层数提供减伤。", { element: "冰霜" }), legendary("bakuli", "腰部", "巴库里丛林缠腰", "bakuli-jungle-wraps-p61_unique_belt_007.png", "虫群影响的敌人承受更多火蝠伤害；这里主要作为高词缀功能腰带。"), jewelry("traveler", "trapped"), jewelry("compass", "stricken"), jewelry("emptiness", "gogok"), knife("sacred-harvester", "神圣收割者", "sacred-harvester-p1_ceremonialdagger_norm_unique_01.png", "提高魂灵收割最大层数。"), mojo("vile-hive", "邪恶蜂巢", "vile-hive-p4_unique_mojo_001.png", "虫群获得瘟疫虫群符文并提高伤害。")],
    skills: [skill("haunt", "蚀魂", "剧毒之魂", "主要持续伤害之一，会自动跳向新目标。"), skill("locust-swarm", "虫群", "瘟疫虫群", "第二种持续伤害并触发虚空之戒。"), skill("soul-harvest", "魂灵收割", "魂灵凋零", "提前结算剩余持续伤害，是主要爆发。"), skill("spirit-walk", "灵行", "灵魂漫步", "进入收割半径并安全离场。"), skill("piranhas", "食人鱼", "食人鱼旋风", "聚怪与易伤。"), skill("horrify", "惧灵", "骇人仪容", "提高护甲并控制近身敌人。")], passives: [passive("creeping-death", "死亡蔓延", "蚀魂和虫群持续时间极大延长。"), ...commonPassives.slice(0, 3)],
    powers: [power("furnace", "武器", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "收割爆发优先处理精英。"), power("quetzalcoatl", "防具", "羽蛇神", "quetzalcoatl-unique_voodoomask_005_x1.png", "蚀魂和虫群用一半时间造成完整伤害。", "玉魂收割提前结算的总伤害被直接放大。"), power("unity", "首饰", "团结", "unity-unique_ring_010_x1.png", "与不死随从分摊伤害。", "贴身收割需要稳定减伤。"), power("coe", "第4槽", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "冰霜周期提高收割。", "第39赛季第四槽把结算压进元素窗。")],
    links: [{ title: "铺毒再收割", category: "damage", conclusion: "没有先铺满蚀魂和虫群，魂灵收割只是一记低伤技能。", steps: [["haunt", "蚀魂", "铺第一种持续伤"], ["locust-swarm", "虫群", "铺第二种持续伤"], ["soul-harvest", "魂灵收割", "提前结算剩余伤害"], ["jade-head", "玉魂六件", "放大结算"]] }, { title: "持续伤压缩", category: "damage", conclusion: "羽蛇神把相同总伤压进更短时间，玉魂提前结算因此更强。", steps: [["quetzalcoatl", "羽蛇神", "持续时间减半"], ["haunt", "蚀魂", "完整总伤"], ["soul-harvest", "收割", "一次取出总伤"]] }, { title: "收割攻防", category: "defense", conclusion: "同一个收割动作既结算伤害，也刷新智力和拉昆巴减伤。", steps: [["soul-harvest", "魂灵收割", "叠层"], ["sacred-harvester", "神圣收割者", "提高层数上限"], ["lakumba", "拉昆巴腕饰", "层数转减伤"]] }],
    rotation: [{ title: "虫群起手", action: "先让虫群传播到整组怪。", reason: "虚空之戒与持续伤来源。" }, { title: "补满蚀魂", action: "对未覆盖目标施放蚀魂。", reason: "玉魂结算需要两种持续伤。" }, { title: "食人鱼聚怪", action: "把精英和白怪拉紧。", reason: "收割半径有限。" }, { title: "灵行切入", action: "冰霜周期进入怪群中心。", reason: "安全到达收割位置。" }, { title: "魂灵收割", action: "在怪群中心使用收割后立即撤离。", reason: "一次结算剩余持续伤并刷新减伤。" }], pushNote: "铺满两种持续伤后，在冰霜周期灵行入场收割。", speedNote: "虫群自动传播，蚀魂补精英后立即收割。", lowNote: "羽蛇神和神圣收割者优先；没有两种持续伤不要硬收割。", highNote: "冰霜元素、范围伤、冷却与收割路线决定上限。", source: "https://www.icy-veins.com/d3/witch-doctor-jade-harvester-build",
  },
  {
    classKey: "witch-doctor", id: "helltooth-garg", name: "魔牙巨尸", set: "魔牙战装", core: "死亡之壁上死疽 → 巨尸持续输出", summary: "死亡之壁建立魔牙死疽区域和套装倍率，矮人之指让巨尸数量变少但单体伤害大幅提高。", difficulty: "中等 · 宠物站区", follower: "圣殿骑士", followerReason: "治疗与嘲讽帮助角色留在宠物战区附近。", element: "冰霜", coreSkill: "巨尸",
    gear: [...helltooth, legendary("lakumba", "腕部", "拉昆巴的腕饰", "lakumbas-ornament-p72_unique_bracer_102.png", "魂灵收割层数提供减伤。", { element: "冰霜" }), legendary("transcendence", "腰部", "超越之带", "belt-of-transcendence-p2_unique_belt_02.png", "消耗法力时召唤鬼娃，补充宠物输出。"), jewelry("traveler", "trapped"), jewelry("compass", "enforcer"), legendary("short-man", "手指", "矮人之指", "the-short-mans-finger-p61_unique_ring_01.png", "巨尸数量减少为三只，每只伤害大幅提高。", { gem: "stricken" }), knife("sacred-harvester", "神圣收割者", "sacred-harvester-p1_ceremonialdagger_norm_unique_01.png", "提高魂灵收割层数上限。"), mojo("henri", "亨利的追寻", "henris-perquisition-p2_mojo_norm_unique_02.png", "首次受伤时减伤并魅惑攻击者。")],
    skills: [skill("gargantuan", "巨尸", "狂怒巨尸", "主要宠物输出；矮人之指改为三只强化巨尸。"), skill("wall-of-death", "死亡之壁", "亡者之墙", "触发魔牙死疽与套装增伤。"), skill("piranhas", "食人鱼", "食人鱼旋风", "聚怪并让巨尸集中攻击。"), skill("soul-harvest", "魂灵收割", "困魂压魄", "拉昆巴减伤。"), skill("spirit-walk", "灵行", "灵魂漫步", "安全叠收割和换位。"), skill("summon-zombie-dogs", "召唤僵尸犬", "生命链接", "分担伤害并增加宠物体系。")], passives: [passive("midnight-feast", "午夜盛宴", "提高僵尸犬和巨尸伤害。"), passive("fierce-loyalty", "凶残忠诚", "有宠物时提高移动速度。"), ...commonPassives.slice(0, 2)],
    powers: [power("furnace", "武器", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "巨尸围杀精英时获得乘区。"), power("mask-jeram", "防具", "杰拉姆的面具", "mask-of-jeram-p61_unique_voodoomask_102_x1.png", "提高宠物伤害。", "巨尸、鬼娃和僵尸犬全部受益。"), power("unity", "首饰", "团结", "unity-unique_ring_010_x1.png", "与不死随从分摊伤害。", "宠物战区附近站位更稳。"), power("tasker", "第4槽", "宠爱手套", "tasker-and-theo-unique_gloves_003_x1.png", "提高宠物攻速。", "第39赛季第四槽让巨尸攻击更频繁。")],
    links: [{ title: "死疽启动", category: "damage", conclusion: "每组怪先放死亡之壁，否则巨尸没有魔牙六件倍率。", steps: [["wall-of-death", "死亡之壁", "铺设死疽"], ["helltooth-head", "魔牙六件", "死疽目标增伤"], ["gargantuan", "巨尸", "进入战区输出"]] }, { title: "三只强化巨尸", category: "damage", conclusion: "矮人之指、杰拉姆和宠爱手套分别提高单体倍率、宠物伤与攻速。", steps: [["short-man", "矮人之指", "三只强化巨尸"], ["mask-jeram", "杰拉姆面具", "宠物增伤"], ["tasker", "宠爱手套", "宠物攻速"], ["compass-rose", "侍从宝石", "镶嵌在罗盘玫瑰，提供宠物乘区"]] }, { title: "收割防线", category: "defense", conclusion: "灵行进入怪群叠满收割后，拉昆巴与团结共同覆盖。", steps: [["spirit-walk", "灵行", "安全贴近"], ["soul-harvest", "魂灵收割", "叠层"], ["lakumba", "拉昆巴", "层数减伤"], ["unity", "团结", "随从分摊"]] }],
    rotation: [{ title: "叠满收割", action: "灵行进入怪群使用魂灵收割。", reason: "建立拉昆巴减伤。" }, { title: "死亡之壁", action: "覆盖精英与周围怪物。", reason: "启动魔牙死疽和套装倍率。" }, { title: "食人鱼聚怪", action: "把敌人拉到巨尸身边。", reason: "避免宠物换目标走位。" }, { title: "等待巨尸", action: "保持在无尽之途站定状态。", reason: "宠物承担主要输出。" }, { title: "重铺战区", action: "怪群移动或死疽结束时补墙。", reason: "套装增伤不能断。" }], pushNote: "把精英留在死亡之壁死疽区，让三只巨尸持续围杀。", speedNote: "每组怪只放墙与食人鱼，巨尸清理后灵行转场。", lowNote: "矮人之指和杰拉姆面具优先，宠物套对低巅峰友好。", highNote: "宠物攻速、冰霜元素和范围伤决定上限。", source: "https://www.icy-veins.com/d3/witch-doctor-helltooth-gargantuan-build",
  },
  {
    classKey: "witch-doctor", id: "lod-barrage", name: "梦遗魂弹", set: "梦之遗礼", core: "远古散件 → 魂灵幻象延迟结算", summary: "散件版本保留凝视死亡与理发师的延迟结算发动机，用梦遗把每件远古装备转为攻防。", difficulty: "高装备门槛 · 延迟爆发", follower: "魔女", followerReason: "控场与冷却帮助幻象完整覆盖和灵行收割。", element: "冰霜", coreSkill: "魂灵弹幕",
    gear: [legendary("leoric", "头部", "李奥瑞克的王冠", "leorics-crown-unique_helm_002_p1.png", "放大钻石冷却缩减。"), legendary("mantle-channeling", "肩部", "导能披肩", "mantle-of-channeling-p4_unique_shoulder_103.png", "引导与持续施法时提供攻防。"), legendary("aquila", "胸部", "天鹰胸甲", "aquila-cuirass-p4_unique_chest_012.png", "高法力时获得减伤。"), legendary("frostburn", "手部", "霜燃", "frostburn-p41_unique_gloves_002.png", "冰霜增伤并冻结敌人。", { element: "冰霜" }), legendary("lakumba", "腕部", "拉昆巴的腕饰", "lakumbas-ornament-p72_unique_bracer_102.png", "魂灵收割层数提供减伤。", { element: "冰霜" }), legendary("transcendence", "腰部", "超越之带", "belt-of-transcendence-p2_unique_belt_02.png", "施法召唤鬼娃，辅助控制与输出。"), legendary("blackthorne", "腿部", "黑棘的战袍裤", "blackthornes-jousting-mail-unique_pants_013_x1.png", "单件散装，不得激活套装奖励。", { warning: "梦遗构筑不能激活任何两件套效果。" }), legendary("illusory", "脚部", "虚幻长靴", "illusory-boots-unique_boots_103_x1.png", "穿过敌人以便叠收割和布置幻象。"), jewelry("squirt", "lod"), jewelry("coe", "stricken"), jewelry("emptiness", "trapped"), knife("barber", "理发师", "the-barber-p68_unique_dagger_003.png", "魂灵弹幕伤害蓄积后统一结算。"), mojo("gazing-demise", "凝视死亡", "gazing-demise-p68_unique_mojo_003.png", "生成魂灵幻象并提高伤害。")],
    skills: [skill("spirit-barrage", "魂灵弹幕", "灵魂幻象", "主要延迟爆发。"), skill("locust-swarm", "虫群", "瘟疫虫群", "触发虚空之戒。"), skill("soul-harvest", "魂灵收割", "困魂压魄", "叠拉昆巴减伤。"), skill("spirit-walk", "灵行", "灵魂漫步", "穿怪与无敌换位。"), skill("piranhas", "食人鱼", "食人鱼旋风", "聚怪并易伤。"), skill("big-bad-voodoo", "巫毒狂舞", "鬼魂恩泽", "爆发区内提高攻速。")], passives: commonPassives,
    powers: [power("sacred-harvester", "武器", "神圣收割者", "sacred-harvester-p1_ceremonialdagger_norm_unique_01.png", "提高魂灵收割上限。", "强化拉昆巴防线。"), power("mask-jeram", "防具", "杰拉姆的面具", "mask-of-jeram-p61_unique_voodoomask_102_x1.png", "提高宠物伤害。", "魂灵幻象与召唤物获得收益。"), power("unity", "首饰", "团结", "unity-unique_ring_010_x1.png", "与不死随从分摊伤害。", "散件高层稳定减伤。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补足单体。")],
    links: [{ title: "梦遗散件", category: "damage", conclusion: "任何两件套奖励都会关闭梦遗；优先增加正确词缀的远古数量。", steps: [["squirts", "梦遗宝石", "镶嵌在项链"], ["blackthorne", "黑棘单件", "只穿一件"], ["aquila", "远古散件", "累计梦遗攻防"]] }, { title: "魂弹延迟结算", category: "damage", conclusion: "幻象布置后等待理发师结算，不要过早覆盖错误位置。", steps: [["spirit-barrage", "魂灵弹幕", "持续命中"], ["gazing-demise", "凝视死亡", "生成幻象"], ["barber", "理发师", "蓄积统一爆炸"], ["coe", "全能周期", "控制结算窗口"]] }, { title: "散件防线", category: "defense", conclusion: "高法力天鹰、收割拉昆巴和团结三层共同覆盖。", steps: [["aquila", "天鹰", "高法力减伤"], ["soul-harvest", "魂灵收割", "叠层"], ["lakumba", "拉昆巴", "层数减伤"], ["unity", "团结", "随从分摊"]] }],
    rotation: [{ title: "检查梦遗", action: "确认没有套装奖励激活。", reason: "否则梦遗失效。" }, { title: "灵行收割", action: "穿入怪群叠满收割。", reason: "建立拉昆巴防线。" }, { title: "虫群覆盖", action: "让虫群传播到精英。", reason: "触发虚空之戒。" }, { title: "食人鱼聚怪", action: "把目标拉入幻象区域。", reason: "保证蓄积完整命中。" }, { title: "布置并等待", action: "放置魂灵幻象后保持战区。", reason: "理发师在结束时统一结算。" }], pushNote: "让虫群、收割和聚怪完成后再布置幻象，等待正确结算。", speedNote: "减少等待时间，以灵行和短幻象快速清组。", lowNote: "梦遗等级与远古数量优先；理发师和凝视死亡不可缺。", highNote: "冰霜元素、范围伤、法力回复和结算节奏决定上限。", source: "https://www.icy-veins.com/d3/witch-doctor-legacy-of-dreams-spirit-barrage-build",
  },
];

const REVIEWED_AT = "2026-08-22";

function reviewGear(id: string, slot: string, name: string, file: string, effect: string, affixes: string[], acquisition: string[], gem?: GuideGear["gem"], warning?: string): GuideGear {
  return { id, slot, name, image: itemFile(file), quality: "legendary", effect, affixes, acquisition, gem, warning };
}

function reviewPower(id: string, slot: string, name: string, file: string, effect: string, logic: string, acquisition: string): GuidePower {
  return { id, slot, name, image: itemFile(file), effect, logic, acquisition };
}

const MUNDUNUGU_SOURCES = {
  icy: "https://www.icy-veins.com/d3/witch-doctor-mundunugu-spirit-barrage-build",
  icySpeed: "https://www.icy-veins.com/d3/mundunugu-spirit-barrage-witch-doctor-speed-farming-build",
  maxroll: "https://maxroll.gg/d3/guides/mundunugu-spirit-barrage-witch-doctor-guide",
};

const WITCH_DOCTOR_EXTRA_GEAR: GuideGear[] = [
  reviewGear("nemesis-bracers", "腕部", "复仇者护腕", "nemesis-bracers-unique_bracer_106_x1.png", "点击祭坛召唤精英，T16、蓝门和低层大秘境用来提高精英密度。", ["冰霜技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "速刷时替换拉昆巴"]),
  reviewGear("warzechian", "腕部", "沃兹克护腕", "warzechian-armguards-unique_bracer_101_x1.png", "破坏场景物件后获得移速，高巅峰悬赏和开阔图收益高。", ["冰霜技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "高巅峰速刷替换复仇者"]),
  reviewGear("goldwrap", "腰部", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后按金币数量提高护甲，T16金币链提供近乎无限坚韧。", ["智力", "体能", "生命%", "护甲"], ["血岩碎片赌博腰带", "黄装升级：70级普通腰带", "离开金币内容后失效"]),
  reviewGear("avarice-band", "手指", "贪婪之戒", "avarice-band-unique_ring_108_x1.png", "拾取金币后扩大拾取范围，连接囤宝者与金织带。", ["镶孔", "暴击几率", "暴击伤害", "范围伤害"], ["第三幕/第四幕悬赏宝箱", "世界掉落", "T16金币链替换虚空之戒或全能"], GEMS.hoarder),
  reviewGear("ingeom", "主手", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短冷却，速刷时让灵行、收割和巫毒狂舞更频繁。", ["高白字", "伤害%", "冷却缩减", "智力", "拉玛兰迪打孔"], ["黄装升级：70级单手剑", "世界掉落", "低层大秘境和T16替换理发师"]),
];

const WITCH_DOCTOR_EXTRA_POWERS: GuidePower[] = [
  reviewPower("ingeom", "武器", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短冷却。", "速刷时压缩灵行、收割和巫毒狂舞空窗。", "黄装升级：70级单手剑"),
  reviewPower("goldwrap", "防具", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后按金币数量提高护甲。", "配合囤宝者和贪婪之戒形成T16金币链。", "血岩赌博腰带或黄装升级70级腰带"),
  reviewPower("avarice-band", "首饰", "贪婪之戒", "avarice-band-unique_ring_108_x1.png", "拾取金币后扩大拾取范围。", "让金币链不需要贴脸捡金币也能维持。", "第三幕/第四幕悬赏宝箱"),
  reviewPower("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "冲层时补足理发师结算后的精英和首领单体。", "黄装升级：70级双手钉锤"),
  reviewPower("shukrani", "第4槽", "舒克拉尼的胜利", "shukranis-triumph-p72_unique_mojo_102.png", "灵行在未攻击时持续存在。", "高巅峰悬赏和蓝门用于安全长距离转场。", "黄装升级：70级咒物"),
];

const MUNDUNUGU_CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "mund-head", shoulders: "mund-shoulders", chest: "mund-chest", gloves: "mund-gloves", bracers: "lakumba", belt: "witching-hour",
    pants: "mund-pants", boots: "mund-boots", amulet: "squirts", ring1: "coe", ring2: "emptiness", weapon: "barber", offhand: "gazing-demise",
  },
  skills: [
    { id: "spirit-barrage", rune: "灵魂幻象" },
    { id: "locust-swarm", rune: "瘟疫虫群" },
    { id: "soul-harvest", rune: "困魂压魄" },
    { id: "spirit-walk", rune: "灵魂漫步" },
    { id: "piranhas", rune: "食人鱼旋风" },
    { id: "big-bad-voodoo", rune: "鬼魂恩泽" },
  ],
  passives: ["grave-injustice", "confidence-ritual", "pierce-the-veil", "spirit-vessel"],
  powers: { weapon: "sacred-harvester", armor: "frostburn", jewelry: "royal-grandeur", season: "ring-emptiness" },
  legendaryGems: { amulet: "困者之灾", ring1: "受罚者之灾", ring2: "贼神的复仇之石" },
  normalGems: { head: ["无瑕皇家钻石：冷却缩减"], chest: ["无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力"], pants: ["无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力"], weapon: ["无瑕皇家绿宝石：暴击伤害"] },
  follower: { id: "enchantress", items: ["不死烟熏香炉", "时光流韵", "复仇者护腕", "神目指环"], skills: ["时间缓流", "预知谐和", "能量护甲", "聚焦心智"] },
  statPriorities: {
    head: ["魂灵弹幕伤害", "暴击几率", "智力", "镶孔"], shoulders: ["魂灵弹幕伤害", "范围伤害", "冷却缩减", "智力"], gloves: ["暴击几率", "暴击伤害", "范围伤害", "冷却缩减"], bracers: ["冰霜技能伤害", "暴击几率", "智力", "体能"], weapon: ["高白字", "伤害%", "范围伤害", "冷却缩减", "拉玛兰迪打孔"], offhand: ["魂灵弹幕伤害", "暴击几率", "范围伤害", "法力回复"],
  },
  rotation: [
    { title: "叠满收割", action: "灵行进入怪群后使用魂灵收割。", reason: "建立拉昆巴减伤。" },
    { title: "虫群标记", action: "让虫群覆盖精英和周围怪物。", reason: "启动虚空之戒。" },
    { title: "食人鱼聚怪", action: "把目标拉入同一结算区域。", reason: "幻象覆盖越完整越好。" },
    { title: "布置幻象", action: "围绕精英放置魂灵弹幕幻象。", reason: "理发师开始蓄积伤害。" },
    { title: "等待结算", action: "不要过早离开或覆盖错误位置。", reason: "幻象结束时才统一爆发。" },
  ],
};

const MUNDUNUGU_SCENARIOS: BuildScenario[] = [
  { id: "push-low", label: "低巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "low", applicability: "supported", reason: "保留拉昆巴、霜燃和虚空乘区，低巅峰先保证收割层数与安全结算。", unchangedReason: "基础配置就是低巅峰冲层入口。", sourceRefs: [MUNDUNUGU_SOURCES.icy, MUNDUNUGU_SOURCES.maxroll], reviewedAt: REVIEWED_AT },
  { id: "push-high", label: "高巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "high", applicability: "supported", reason: "高巅峰把更多词缀让给范围伤、法力回复和冷却，并用焚炉第四槽补精英单体。", patch: { powers: { season: "furnace" }, statPriorities: { gloves: ["暴击几率", "暴击伤害", "范围伤害", "冷却缩减"], offhand: ["魂灵弹幕伤害", "暴击几率", "范围伤害", "法力回复"] } }, sourceRefs: [MUNDUNUGU_SOURCES.icy, MUNDUNUGU_SOURCES.maxroll], reviewedAt: REVIEWED_AT },
  { id: "speed-low", label: "低巅峰 T16 / 蓝门 / 低层大秘境", content: "nephalem-rift", paragonBand: "low", applicability: "supported", reason: "用复仇者、寅剑和强者宝石缩短冷却并提高精英密度，保留霜燃和部分坚韧。", patch: { gear: { bracers: "nemesis-bracers", ring2: "avarice-band", weapon: "ingeom" }, powers: { weapon: "sacred-harvester", season: "ingeom" }, legendaryGems: { ring1: "强者之灾", ring2: "囤宝者的恩惠" }, normalGems: { chest: ["无瑕皇家紫宝石：体能", "无瑕皇家黄宝石：智力", "无瑕皇家黄宝石：智力"] } }, sourceRefs: [MUNDUNUGU_SOURCES.icySpeed, MUNDUNUGU_SOURCES.maxroll], reviewedAt: REVIEWED_AT },
  { id: "speed-high", label: "高巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "high", applicability: "supported", reason: "伤害溢出后接入金织带、贪婪之戒、沃兹克和舒克拉尼，重点变成连续转场和金币护甲链。", patch: { gear: { bracers: "warzechian", belt: "goldwrap", ring2: "avarice-band", weapon: "ingeom" }, powers: { weapon: "ingeom", armor: "goldwrap", jewelry: "avarice-band", season: "shukrani" }, legendaryGems: { ring1: "强者之灾", ring2: "囤宝者的恩惠" } }, sourceRefs: [MUNDUNUGU_SOURCES.icySpeed, MUNDUNUGU_SOURCES.maxroll], reviewedAt: REVIEWED_AT },
];

const MUNDUNUGU_PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "面板25%", reason: "鞋子未带移速时先补满。" },
      { stat: "智力", target: "剩余全部", reason: "低巅峰最稳定的伤害与抗性来源。" },
      { stat: "体能", target: "被秒杀时临时投入", reason: "理发师延迟结算期间需要活到爆炸。" },
    ],
    offense: [
      { stat: "冷却缩减", target: "50点", reason: "灵行、收割、食人鱼和巫毒狂舞都依赖冷却。" },
      { stat: "暴击几率", target: "50点", reason: "补齐首饰和手套未成型阶段。" },
      { stat: "暴击伤害", target: "50点", reason: "和暴击几率配套。" },
      { stat: "攻击速度", target: "最后", reason: "收益不如结算相关词缀稳定。" },
    ],
    defense: [
      { stat: "护甲", target: "50点", reason: "智力职业优先补护甲。" },
      { stat: "生命%", target: "50点", reason: "低巅峰防止结算前暴毙。" },
      { stat: "全元素抗性", target: "随后", reason: "补装备缺口。" },
      { stat: "秒回", target: "最后", reason: "收益最低。" },
    ],
    utility: [
      { stat: "范围伤害", target: "冲层优先", reason: "理发师结算吃怪群密度。" },
      { stat: "减耗", target: "法力紧张时补", reason: "穿透迷雾和频繁魂弹会增加法力压力。" },
      { stat: "击回", target: "低巅峰可提前", reason: "布置幻象期间提高容错。" },
      { stat: "金币获取", target: "T16金币链最后", reason: "只服务金织带护甲链。" },
    ],
  },
  post800: [
    { priority: "智力", when: "核心词缀未齐前", reason: "稳定提高伤害和抗性。" },
    { priority: "冰霜元素、魂灵弹幕伤害、范围伤害", when: "大秘境冲层", reason: "直接影响理发师最终爆炸。" },
    { priority: "法力回复", when: "副手、武器和头部可洗出时", reason: "蒙嘟噜套按法力回复提高魂灵弹幕伤害。" },
    { priority: "冷却缩减", when: "灵行或收割断档", reason: "保证进场、收割和聚怪节奏。" },
  ],
  checkpoints: [
    { label: "成型入口", target: "理发师 + 凝视死亡", action: "先升级祭祀刀和咒物，缺任一件不要标记完成。" },
    { label: "低巅峰", target: "收割10层、拉昆巴不断", action: "宁可慢一点也不要空层布置幻象。" },
    { label: "高巅峰", target: "范围伤和法力回复成套", action: "智力词缀逐步让位给结算上限词缀。" },
  ],
};

const MUNDUNUGU_POLICIES: BuildChoicePolicy[] = [
  { key: "mundunugu-engine", targetType: "gear", targetId: "barber", label: "理发师 + 凝视死亡", status: "locked", reason: "理发师负责延迟蓄积，凝视死亡负责灵魂幻象；缺少任一件就不是完整魂弹BD。" },
  { key: "mundunugu-harvest", targetType: "gear", targetId: "lakumba", label: "收割防线", status: "conditional", reason: "冲层必须靠神圣收割者与拉昆巴叠满减伤，速刷才替换护腕。", alternatives: [{ id: "nemesis-bracers", label: "复仇者护腕", when: "T16和低层大秘境精英密度不足", gain: "开塔召唤精英并喂寅剑", cost: "失去拉昆巴减伤", scenarios: ["speed-low"] }, { id: "warzechian", label: "沃兹克护腕", when: "高巅峰悬赏和开阔图", gain: "破坏物件获得移速", cost: "失去复仇者精英密度", scenarios: ["speed-high"] }] },
  { key: "mundunugu-ring", targetType: "gear", targetId: "emptiness", label: "虚空之戒 / 贪婪之戒", status: "conditional", reason: "冲层需要虫群触发虚空乘区，T16金币链需要拾取范围。", alternatives: [{ id: "avarice-band", label: "贪婪之戒", when: "T16、蓝门和悬赏金币链", gain: "扩大拾取范围并维持金织带", cost: "失去虚空或元素周期伤害", scenarios: ["speed-low", "speed-high"] }] },
  { key: "mundunugu-season", targetType: "power", targetId: "ring-emptiness", label: "第39赛季第四槽", status: "conditional", reason: "冲层第四槽补乘区，速刷第四槽补冷却或转场。", alternatives: [{ id: "furnace", label: "焚炉", when: "高巅峰大秘境冲层", gain: "提高精英和首领伤害", cost: "没有虚空戒第四槽时需调整首饰", scenarios: ["push-high"] }, { id: "ingeom", label: "寅剑", when: "T16/低层大秘境", gain: "击杀精英后连续刷新冷却", cost: "失去冲层乘区", scenarios: ["speed-low"] }, { id: "shukrani", label: "舒克拉尼的胜利", when: "高巅峰悬赏和蓝门转场", gain: "未攻击时灵行持续", cost: "单体伤害下降", scenarios: ["speed-high"] }] },
  { key: "mundunugu-gems", targetType: "legendary-gem", targetId: "bane-of-the-stricken", label: "传奇宝石", status: "conditional", reason: "冲层首领需要受罚，速刷怪物血量低改用强者和囤宝者。", alternatives: [{ id: "bane-of-the-powerful", label: "强者之灾", when: "低层大秘境或T16", gain: "击杀精英后常驻增伤", cost: "首领叠层能力下降", scenarios: ["speed-low", "speed-high"] }, { id: "boon-of-the-hoarder", label: "囤宝者的恩惠", when: "T16金币链", gain: "掉金币并触发金织带", cost: "大秘境无金币时失效", scenarios: ["speed-low", "speed-high"] }] },
];

function completeWitchDoctorGuide(seed: ClassGuideSeed): BuildGuide {
  const guide = createGenericReviewedGuide(createClassGuide(seed));
  if (guide.id !== "mundunugu-barrage") return guide;
  for (const item of WITCH_DOCTOR_EXTRA_GEAR) {
    if (!guide.gear.some((existing) => existing.id === item.id)) guide.gear.push(item);
  }
  for (const item of WITCH_DOCTOR_EXTRA_POWERS) {
    if (!guide.powers.some((existing) => existing.id === item.id)) guide.powers.push(item);
  }
  guide.configurationBase = MUNDUNUGU_CONFIGURATION_BASE;
  guide.defaultScenarioId = "push-low";
  guide.scenarios = MUNDUNUGU_SCENARIOS;
  guide.paragonGuide = MUNDUNUGU_PARAGON;
  guide.choicePolicies = MUNDUNUGU_POLICIES;
  guide.reviewStatus = "fully-reviewed";
  guide.variantCompleteness = "complete";
  return guide;
}

export const WITCH_DOCTOR_BUILDS: Record<string, BuildGuide> = Object.fromEntries(seeds.map((seed) => {
  const guide = completeWitchDoctorGuide(seed);
  const errors = validateReviewedBuildGuide(guide);
  if (errors.length) throw new Error(`${guide.id} 校验失败：${errors.join("；")}`);
  return [guide.id, guide];
}));
