import { createClassGuide, jewelry, legendary, passive, power, setGear, skill, type ClassGuideSeed, type GearSeed } from "./class-build-factory";
import { validateReviewedBuildGuide, type BuildChoicePolicy, type BuildConfiguration, type BuildGuide, type BuildScenario, type ParagonGuide } from "./build-guides";

const valor: GearSeed[] = [
  setGear("valor-head", "头部", "勇气冠冕", "crown-of-valor-p67_unique_helm_set_01.png", "勇气壁垒部件；天堂之拳叠层，同时强化天堂之怒。", "天堂之拳"),
  setGear("valor-shoulders", "肩部", "勇气肩铠", "spaulders-of-valor-p67_unique_shoulder_set_01.png", "勇气壁垒部件；保留套装层数与减伤。", "天堂之拳"),
  setGear("valor-chest", "胸部", "勇气战铠", "brigandine-of-valor-p67_unique_chest_set_01.png", "勇气壁垒部件；三孔负责主属性宝石。", "天堂之拳"),
  setGear("valor-gloves", "手部", "勇气护手", "gauntlets-of-valor-p67_unique_gloves_set_01.png", "勇气壁垒部件；双暴与范围伤决定输出上限。"),
  setGear("valor-pants", "腿部", "勇气腿甲", "chausses-of-valor-p67_unique_pants_set_01.png", "勇气壁垒部件；维持六件套。"),
  setGear("valor-boots", "脚部", "勇气胫甲", "greaves-of-valor-p67_unique_boots_set_01.png", "勇气壁垒部件；天堂之拳技能伤优先。", "天堂之拳"),
];

const akkhan: GearSeed[] = [
  setGear("akkhan-head", "头部", "阿克汉头盔", "helm-of-akkhan-unique_helm_set_10_x1.png", "阿克汉战甲部件；围绕阿卡拉特勇士常驻建立攻防。"),
  setGear("akkhan-shoulders", "肩部", "阿克汉肩甲", "pauldrons-of-akkhan-unique_shoulder_set_10_x1.png", "阿克汉战甲部件；冷却缩减优先。"),
  setGear("akkhan-chest", "胸部", "阿克汉胸甲", "breastplate-of-akkhan-unique_chest_set_10_x1.png", "阿克汉战甲部件；维持变身与套装倍率。"),
  setGear("akkhan-gloves", "手部", "阿克汉护手", "gauntlets-of-akkhan-unique_gloves_set_10_x1.png", "阿克汉战甲部件；双暴、范围伤和冷却。"),
  setGear("akkhan-pants", "腿部", "阿克汉腿甲", "cuisses-of-akkhan-unique_pants_set_10_x1.png", "阿克汉战甲部件。"),
  setGear("akkhan-boots", "脚部", "阿克汉战靴", "sabatons-of-akkhan-unique_boots_set_10_x1.png", "阿克汉战甲部件。"),
];

const roland: GearSeed[] = [
  setGear("roland-head", "头部", "罗兰面甲", "rolands-visage-unique_helm_set_01_p1.png", "罗兰套装部件；横扫攻击叠攻速并提供减伤。", "横扫攻击"),
  setGear("roland-shoulders", "肩部", "罗兰肩甲", "rolands-mantle-unique_shoulder_set_01_p1.png", "罗兰套装部件。", "横扫攻击"),
  setGear("roland-chest", "胸部", "罗兰胸甲", "rolands-bearing-unique_chest_set_01_p1.png", "罗兰套装部件。", "横扫攻击"),
  setGear("roland-gloves", "手部", "罗兰护手", "rolands-grasp-unique_gloves_set_01_p1.png", "罗兰套装部件；高攻速下双暴收益更高。"),
  setGear("roland-pants", "腿部", "罗兰腿甲", "rolands-determination-unique_pants_set_01_p1.png", "罗兰套装部件。"),
  setGear("roland-boots", "脚部", "罗兰战靴", "rolands-stride-unique_boots_set_01_p1.png", "罗兰套装部件；横扫技能伤优先。", "横扫攻击"),
];

const light: GearSeed[] = [
  setGear("light-head", "头部", "圣光之冠", "crown-of-the-light-unique_helm_set_03_p3.png", "圣光追寻者部件；落剑后祝福之锤获得巨大增伤。", "祝福之锤"),
  setGear("light-shoulders", "肩部", "圣光之山", "mountain-of-the-light-unique_shoulder_set_03_p3.png", "圣光追寻者部件。", "祝福之锤"),
  setGear("light-chest", "胸部", "圣光之心", "heart-of-the-light-unique_chest_set_03_p3.png", "圣光追寻者部件。", "祝福之锤"),
  setGear("light-gloves", "手部", "圣光之志", "will-of-the-light-unique_gloves_set_03_p3.png", "圣光追寻者部件。"),
  setGear("light-pants", "腿部", "圣光之塔", "towers-of-the-light-unique_pants_set_03_p3.png", "圣光追寻者部件。"),
  setGear("light-boots", "脚部", "圣光之基", "foundation-of-the-light-unique_boots_set_03_p3.png", "圣光追寻者部件；祝福之锤技能伤优先。", "祝福之锤"),
];

const commonPassives = [
  passive("finery", "宝石之力", "每颗镶嵌宝石提供力量，并按宝石数量提高坚韧。"),
  passive("fervor", "热忱", "单手武器时提高攻速并缩短冷却。"),
  passive("holy-cause", "神圣使命", "提高武器伤害，神圣伤害命中时恢复生命。"),
  passive("indestructible", "坚不可摧", "致命伤害时保命，给主机操作留下重建循环的时间。"),
];

const weapon = (id: string, name: string, file: string, effect: string, base = "连枷") => legendary(id, "主手", name, file, effect, { base });
const shield = (id: string, name: string, file: string, effect: string) => legendary(id, "副手", name, file, effect, { base: "圣教军盾", warning: "黄装升级必须使用“圣教军盾”，普通盾牌不会进入同一传奇池。" });

const seeds: ClassGuideSeed[] = [
  {
    classKey: "crusader", id: "valor-fist", name: "勇气天拳", set: "勇气壁垒", core: "战马冲锋 → 天堂之拳自动落雷", summary: "依靠战马高机动穿图，并用黑暗之光与正义腰带把天堂之拳扩展为持续清屏。", difficulty: "低操作 · 高速移动", follower: "魔女", followerReason: "冷却与远程控场让战马和阿卡拉特勇士更稳定。", element: "闪电", coreSkill: "天堂之拳",
    gear: [...valor, legendary("fury-bracer", "腕部", "愤怒护腕", "bracer-of-fury-p61_unique_bracer_104.png", "被致盲、定身或昏迷的敌人受到更多天堂之怒伤害；速刷主要保留词缀与元素位。", { element: "闪电" }), legendary("khasset", "腰部", "正义灯塔腰带", "khassetts-cord-of-righteousness-p42_crusader_foh_belt.png", "降低天堂之拳消耗并提供巨大技能增伤。", { skill: "天堂之拳" }), jewelry("squirt", "trapped"), jewelry("focus", "zei"), jewelry("restraint", "powerful"), weapon("darklight", "黑暗之光", "darklight-p67_unique_flail_1h_106.png", "天堂之拳额外施放两次并获得技能增伤。"), shield("steed-shield", "战马之盾", "shield-of-the-steed-p4_unique_shield_set_01_x1.png", "与冲锋连枷组成诺瓦德套，战马结束后获得爆发增伤。")],
    skills: [skill("fist-of-the-heavens", "天堂之拳", "雷霆裂隙", "主要清场技能；黑暗之光复制施放，腰带降低消耗。"), skill("steed-charge", "战马冲锋", "马不停蹄", "穿图和触发诺瓦德爆发窗。"), skill("akarats-champion", "阿卡拉特勇士", "先知化身", "增伤、回怒与护甲核心。"), skill("laws-of-valor", "勇气律法", "势不可挡", "爆发期提高攻速并降低消耗。"), skill("iron-skin", "钢铁之肤", "疾行之肤", "主动减伤并加速赶路。"), skill("provoke", "挑衅", "蓄电攻击", "回复圣怒并补充闪电伤害。")], passives: commonPassives,
    powers: [power("flail-charge", "武器", "冲锋连枷", "flail-of-the-charge-p4_unique_flail_2h_set_01_x1.png", "与战马盾组成诺瓦德套，延长战马并放大结束后的伤害。", "骑马赶路不再是纯位移，而是下一轮天拳的增伤准备。"), power("aquila", "防具", "天鹰胸甲", "aquila-cuirass-p4_unique_chest_012.png", "圣怒处于高位时获得减伤。", "正义腰带降低消耗，使天鹰更容易常驻。"), power("zodiac", "首饰", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗技能命中缩短冷却。", "天拳高频命中刷新战马、变身和钢铁之肤。"), power("coe", "第4槽", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "闪电周期提高天拳伤害。", "第39赛季第四槽补充元素爆发。")],
    links: [{ title: "骑马落雷链", category: "movement", conclusion: "移动本身就是下一轮输出准备。", steps: [["steed-charge", "战马冲锋", "高速穿过地图"], ["flail-charge", "诺瓦德连枷", "延长并建立增伤"], ["darklight", "黑暗之光", "复制天堂之拳"], ["fist-of-the-heavens", "天堂之拳", "落雷清场"]] }, { title: "圣怒稳定链", category: "resource", conclusion: "低消耗与回怒让输出和天鹰减伤同时成立。", steps: [["khasset", "正义腰带", "降低消耗"], ["provoke", "挑衅", "回复圣怒"], ["aquila", "天鹰胸甲", "高圣怒减伤"]] }, { title: "冷却循环", category: "defense", conclusion: "天拳不停命中，战马和变身就不会长时间断档。", steps: [["fist-of-the-heavens", "天拳高频命中", "触发黄道"], ["zodiac", "黄道戒", "缩短冷却"], ["akarats-champion", "阿卡拉特勇士", "常驻攻防"]] }],
    rotation: [{ title: "开变身", action: "开启阿卡拉特勇士和勇气律法。", reason: "先建立回怒、护甲和攻速。" }, { title: "骑马穿图", action: "战马冲锋直达精英和高密度区域。", reason: "诺瓦德套在结束后建立增伤窗。" }, { title: "落雷清场", action: "下马后连续施放天堂之拳。", reason: "黑暗之光和腰带在此共同放大。" }, { title: "保持高怒", action: "圣怒下降时用挑衅补满。", reason: "天鹰减伤与连续天拳都需要资源。" }, { title: "立即转场", action: "精英死亡后直接上马，不为零散怪停留。", reason: "速刷效率来自移动占比。" }], pushNote: "站在安全距离连续落雷并保住斯奎特。", speedNote: "诺瓦德战马与天拳串成不停车清图。", lowNote: "先做黑暗之光和正义腰带，六件套成型即可速刷。", highNote: "闪电元素、范围伤和冷却缩减决定高层效率。", source: "https://www.icy-veins.com/d3/crusader-fist-of-the-heavens-build-with-aegis-of-valor-set",
  },
  {
    classKey: "crusader", id: "valor-fury", name: "勇气天堂之怒", set: "勇气壁垒", core: "天堂之拳叠层 → 天堂之怒爆发", summary: "先用天堂之拳保持勇气层数，再在神圣周期用天堂之怒集中灼烧精英。", difficulty: "高操作 · 元素爆发", follower: "魔女", followerReason: "冷却缩减和远程控场能稳定变身与天堂之怒窗口。", element: "神圣", coreSkill: "天堂之怒",
    gear: [valor[0], valor[1], valor[2], valor[3], legendary("fury-bracer", "腕部", "愤怒护腕", "bracer-of-fury-p61_unique_bracer_104.png", "受控敌人承受的天堂之怒伤害大幅提高。", { element: "神圣", skill: "天堂之怒" }), legendary("crimson-belt", "腰部", "克里森船长的丝带", "captain-crimsons-silk-girdle.png", "与船长腿甲组合，冷却和减耗转为攻防。", { quality: "set", method: ["悬赏获取设计图", "铁匠锻造腰带", "不要用黄装升级"] }), legendary("crimson-pants", "腿部", "克里森船长的推裤", "captain-crimsons-thrust.png", "与船长腰带组成三件效果，把冷却与减耗转为攻防。", { quality: "set", method: ["悬赏获取设计图", "铁匠锻造腿甲", "不要用黄装升级"] }), valor[5], jewelry("traveler", "trapped"), jewelry("compass", "stricken"), jewelry("coe", "gogok"), weapon("fate-fell", "妖邪必败", "fate-of-the-fell-p61_unique_flail_2h_103_x1.png", "天堂之怒额外生成两道射线并提高伤害。", "双手连枷"), shield("shield-fury", "愤怒之盾", "shield-of-fury-p61_unique_shield_106_x1.png", "天堂之怒每次命中同一敌人都会继续叠加伤害。")],
    skills: [skill("fist-of-the-heavens", "天堂之拳", "裂隙", "用来维持勇气六件层数并触发资源循环。"), skill("heavens-fury", "天堂之怒", "天堂火光", "主要爆发；射线要持续压住同一高价值目标。"), skill("judgment", "审判", "定罪", "控制敌人并触发愤怒护腕。"), skill("akarats-champion", "阿卡拉特勇士", "先知化身", "常驻攻防核心。"), skill("iron-skin", "钢铁之肤", "钢铁闪光", "贴身引导射线前开启主动减伤。"), skill("laws-of-valor", "勇气律法", "势不可挡", "元素窗内提高攻速并降低消耗。")], passives: commonPassives,
    powers: [power("furnace", "武器", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高对精英伤害。", "天堂之怒最需要快速处理精英与首领。"), power("aquila", "防具", "天鹰胸甲", "aquila-cuirass-p4_unique_chest_012.png", "高圣怒时获得减伤。", "天拳与船长减耗帮助维持资源。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求件数减少1。", "让勇气与船长套同时成立。", "只来自第一幕/第四幕悬赏宝箱。"), power("zodiac", "第4槽", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗技能命中缩短冷却。", "第39赛季用于刷新变身、律法和钢铁之肤。")],
    links: [{ title: "叠层后爆发", category: "damage", conclusion: "天堂之拳是准备动作，天堂之怒才是主要伤害。", steps: [["fist-of-the-heavens", "天堂之拳", "维持勇气层数"], ["judgment", "审判", "控制并易伤"], ["fury-bracer", "愤怒护腕", "受控目标乘区"], ["heavens-fury", "天堂之怒", "集中射线爆发"]] }, { title: "射线越打越痛", category: "damage", conclusion: "不要频繁换目标，愤怒之盾需要对同一敌人叠层。", steps: [["fate-fell", "妖邪必败", "增加射线数量"], ["shield-fury", "愤怒之盾", "连续命中叠伤"], ["coe", "全能神圣", "元素窗集中输出"]] }, { title: "高资源防线", category: "defense", conclusion: "减耗既是续航，也是天鹰减伤的条件。", steps: [["crimson-belt", "船长套", "减耗转减伤"], ["fist-of-the-heavens", "天拳", "保持资源循环"], ["aquila", "天鹰", "高圣怒减伤"]] }],
    rotation: [{ title: "保持变身", action: "先开启阿卡拉特勇士。", reason: "勇气高层需要变身攻防。" }, { title: "天拳叠层", action: "对怪群施放天堂之拳。", reason: "维持套装层数并触发黄道。" }, { title: "审判控制", action: "神圣周期前用审判覆盖精英。", reason: "愤怒护腕只放大受控目标。" }, { title: "贴身射线", action: "开启钢铁之肤后连续天堂之怒。", reason: "妖邪必败与愤怒之盾需要持续压住目标。" }, { title: "重建循环", action: "元素窗结束后重新天拳叠层。", reason: "避免在低倍率阶段耗尽圣怒。" }], pushNote: "围绕神圣周期和审判控制集中射线。", speedNote: "降低等待元素窗的比例，天拳负责清杂兵。", lowNote: "妖邪必败、愤怒之盾和护腕三件特效优先。", highNote: "神圣元素、冷却、范围伤与盾牌高特效共同决定上限。", source: "https://www.icy-veins.com/d3/crusader-heavens-fury-build-with-aegis-of-valor-set",
  },
  {
    classKey: "crusader", id: "akkhan-condemn", name: "阿克汉天谴", set: "阿克汉战甲", core: "阿卡拉特勇士 → 天谴连环爆炸", summary: "维持阿卡拉特勇士常驻，预言之刃与弗莱德之怒让天谴无冷却且连锁引爆。", difficulty: "中等 · 贴身清场", follower: "魔女", followerReason: "冷却缩减帮助变身常驻，控场便于聚怪后连锁爆炸。", element: "神圣", coreSkill: "天谴",
    gear: [...akkhan, legendary("strongarm", "腕部", "力士护腕", "strongarm-bracers-unique_bracer_007_x1.png", "击退敌人后使其承受更多伤害；天谴吸怪符文可触发。", { element: "神圣" }), legendary("vigilante", "腰部", "警戒腰带", "vigilante-belt-p76_unique_belt_002.png", "提供冷却缩减，帮助阿卡拉特勇士常驻。"), jewelry("traveler", "trapped"), jewelry("compass", "stricken"), jewelry("coe", "gogok"), weapon("blade-prophecy", "预言之刃", "blade-of-prophecy-p61_unique_sword_2h_007_x1.png", "被天谴命中的敌人会触发额外爆炸。", "双手剑"), shield("frydehr", "弗莱德之怒", "frydehrs-wrath-p61_crushield_norm_unique_01.png", "移除天谴冷却，改为消耗圣怒并提高伤害。")],
    skills: [skill("condemn", "天谴", "真空吸引", "主要伤害与聚怪技能；盾牌移除冷却。"), skill("akarats-champion", "阿卡拉特勇士", "先知化身", "阿克汉套的攻防开关，必须常驻。"), skill("judgment", "审判", "定罪", "控制并提高敌人承受伤害。"), skill("provoke", "挑衅", "净化", "回复圣怒，支持连续天谴。"), skill("laws-of-valor", "勇气律法", "势不可挡", "降低爆发期圣怒消耗。"), skill("steed-charge", "战马冲锋", "马不停蹄", "转场与调整爆炸中心。")], passives: commonPassives,
    powers: [power("furnace", "武器", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "连锁天谴对精英收益最高。"), power("leoric", "防具", "李奥瑞克的王冠", "leorics-crown-unique_helm_002_p1.png", "放大头部钻石的冷却缩减。", "帮助阿卡拉特勇士无缝常驻。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "减少套装需求。", "为功能腰带和护腕释放位置。", "第一幕/第四幕悬赏宝箱。"), power("zodiac", "第4槽", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗技能命中缩短冷却。", "天谴高频命中刷新变身和律法。")],
    links: [{ title: "无冷却天谴", category: "resource", conclusion: "天谴从冷却技能变成圣怒消耗技能，挑衅和减耗必须跟上。", steps: [["frydehr", "弗莱德之怒", "移除冷却"], ["provoke", "挑衅", "回复圣怒"], ["condemn", "连续天谴", "不断吸怪爆炸"]] }, { title: "连锁爆炸", category: "damage", conclusion: "怪群越紧，预言之刃的额外爆炸互相覆盖越多。", steps: [["condemn", "真空吸引", "把敌人拉紧"], ["strongarm", "力士护腕", "击退触发易伤"], ["blade-prophecy", "预言之刃", "被命中目标追加爆炸"]] }, { title: "变身常驻", category: "defense", conclusion: "冷却断档会同时失去阿克汉增伤和减伤。", steps: [["vigilante", "警戒腰带", "提供冷却"], ["leoric", "李奥瑞克王冠", "放大钻石"], ["akarats-champion", "阿卡拉特勇士", "常驻攻防"]] }],
    rotation: [{ title: "开启变身", action: "进图先开阿卡拉特勇士。", reason: "阿克汉倍率依赖变身。" }, { title: "骑马聚怪", action: "用战马穿到精英和高密度处。", reason: "天谴需要密度放大连锁爆炸。" }, { title: "真空吸引", action: "连续施放天谴把怪拉紧。", reason: "触发力士并叠加预言爆炸。" }, { title: "补充圣怒", action: "资源下降时使用挑衅和律法。", reason: "弗莱德把天谴改成消耗技能。" }, { title: "不停命中", action: "变身接近结束时继续天谴。", reason: "黄道只有命中才缩短冷却。" }], pushNote: "把精英拖进高密度怪群，用额外爆炸叠加。", speedNote: "骑马串图，天谴短按清场。", lowNote: "先升级圣教军盾获取弗莱德，避免拿普通盾牌升级。", highNote: "冷却达标后转投神圣元素与范围伤。", source: "https://www.icy-veins.com/d3/crusader-akkhan-condemn-build",
  },
  {
    classKey: "crusader", id: "akkhan-phalanx", name: "阿克汉圣军", set: "阿克汉战甲", core: "永久变身 → 圣军弓手齐射", summary: "由阿克汉维持变身，卡萨头盔、永恒结合与无情斗阵把圣军弓手变成持续主力。", difficulty: "中等 · 宠物指挥", follower: "魔女", followerReason: "远程控场不会打散圣军火力，冷却也帮助变身常驻。", element: "物理", coreSkill: "圣军之阵",
    gear: [...akkhan, legendary("akkhan-manacles", "腕部", "阿克汉的镣铐", "akkhans-manacles-p4_unique_bracer_103.png", "祝福之盾首次命中获得增伤；本构筑主要作为物理词缀位。", { element: "物理" }), legendary("witching-hour", "腰部", "巫异时刻", "the-witching-hour-unique_belt_009_x1.png", "提供攻击速度与暴击伤害，宠物随角色攻速获益。"), jewelry("squirt", "enforcer"), jewelry("coe", "stricken"), legendary("eternal-union", "手指", "永恒结合", "eternal-union-p74_unique_ring_007.png", "大幅延长圣军之阵持续时间。", { gem: "trapped" }), weapon("baleful", "恶意残余", "baleful-remnant-unique_flail_2h_102_x1.png", "阿卡拉特勇士期间击杀敌人会召唤更多圣军化身。", "双手连枷"), shield("unrelenting", "无情斗阵", "unrelenting-phalanx-p1_crushield_norm_unique_02.png", "圣军之阵弓手数量翻倍。")],
    skills: [skill("phalanx", "圣军之阵", "弓手", "召唤弓手持续输出；盾牌让数量翻倍。"), skill("akarats-champion", "阿卡拉特勇士", "先知化身", "阿克汉套与恶意残余的启动条件。"), skill("judgment", "审判", "定罪", "控制敌人并放大宠物输出。"), skill("laws-of-valor", "勇气律法", "无敌信仰", "提高宠物攻击频率。"), skill("steed-charge", "战马冲锋", "马不停蹄", "转场并拉开安全距离。"), skill("provoke", "挑衅", "畏怯", "回复圣怒并降低敌人攻速。")], passives: [passive("lord-commander", "统御者", "提高圣军之阵伤害并缩短战马冷却。"), ...commonPassives.slice(0, 3)],
    powers: [power("furnace", "武器", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "宠物围杀精英时获得稳定乘区。"), power("tasker", "防具", "宠爱手套", "tasker-and-theo-unique_gloves_003_x1.png", "提高宠物攻击速度。", "圣军弓手射击频率直接提高。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求减少1。", "为宠物腰带和功能部位释放位置。", "第一幕/第四幕悬赏箱。"), power("warhelm", "第4槽", "卡萨的战盔", "warhelm-of-kassar-p4_unique_helm_102.png", "降低圣军之阵冷却并提高伤害。", "第39赛季第四槽把弓手专属头盔纳入核心。")],
    links: [{ title: "弓手数量链", category: "damage", conclusion: "数量、持续时间和攻速三项相乘，缺一项都会明显掉伤。", steps: [["phalanx", "圣军弓手", "基础宠物"], ["unrelenting", "无情斗阵", "数量翻倍"], ["eternal-union", "永恒结合", "延长持续"], ["tasker", "宠爱手套", "提高攻速"]] }, { title: "变身召军", category: "damage", conclusion: "阿卡拉特勇士期间击杀越快，额外化身越多。", steps: [["akarats-champion", "阿卡拉特勇士", "启动阿克汉"], ["baleful", "恶意残余", "击杀召唤化身"], ["warhelm", "卡萨战盔", "放大圣军"]] }, { title: "远程指挥", category: "defense", conclusion: "角色负责控制和走位，弓手负责持续输出。", steps: [["steed-charge", "战马", "调整位置"], ["judgment", "审判", "控制易伤"], ["squirts", "斯奎特", "远离伤害保层"]] }],
    rotation: [{ title: "开启变身", action: "先开阿卡拉特勇士。", reason: "阿克汉和恶意残余同时启动。" }, { title: "召满弓手", action: "在安全位置连续施放圣军之阵。", reason: "无情斗阵与永恒结合建立宠物规模。" }, { title: "审判精英", action: "控制高价值目标。", reason: "给弓手创造集中输出窗口。" }, { title: "保持距离", action: "骑马绕到怪群外侧。", reason: "保护斯奎特并避免宠物目标混乱。" }, { title: "补召唤", action: "弓手接近结束前重召。", reason: "避免宠物数量断层。" }], pushNote: "保持安全距离，让弓手围绕被审判的精英持续输出。", speedNote: "战马转场，弓手边走边清怪。", lowNote: "优先升级圣教军盾拿无情斗阵，再做卡萨头盔。", highNote: "宠物攻速、物理元素与范围伤决定上限。", source: "https://www.icy-veins.com/d3/crusader-akkhan-phalanx-build",
  },
  {
    classKey: "crusader", id: "invoker-thorns", name: "唤魔荆棘", set: "唤魔师的荆棘", core: "惩罚高速攻击 → 荆棘集中点杀", summary: "不依赖武器白字或暴击，以攻击速度把荆棘伤害快速打入精英和首领。", difficulty: "中等 · 单体点杀", follower: "圣殿骑士", followerReason: "治疗、回能和保命适合长时间贴身攻击。", element: "物理", coreSkill: "惩罚",
    gear: [setGear("invoker-head", "头部", "唤魔师王冠", "crown-of-the-invoker-unique_helm_set_12_x1.png", "唤魔套部件；惩罚和斩击提高荆棘。", "惩罚"), setGear("invoker-shoulders", "肩部", "唤魔师负担", "burden-of-the-invoker-unique_shoulder_set_12_x1.png", "唤魔套部件。"), legendary("heart-iron", "胸部", "钢铁之心", "heart-of-iron-p4_unique_chest_018.png", "把体能的一部分转为荆棘伤害。"), setGear("invoker-gloves", "手部", "唤魔师荣耀", "pride-of-the-invoker-unique_gloves_set_12_x1.png", "唤魔套部件；攻击速度优先。"), setGear("invoker-bracers", "腕部", "唤魔师镣铐", "shackles-of-the-invoker-unique_bracer_set_12_x1.png", "唤魔套部件；不需要元素伤和双暴，优先攻速坚韧。"), legendary("trove", "腰部", "宝藏腰带", "belt-of-the-trove-p610_unique_belt_008.png", "定期自动施放火炮轰击，提供额外荆棘爆发。"), setGear("invoker-pants", "腿部", "唤魔师新生", "renewal-of-the-invoker-unique_pants_set_12_x1.png", "唤魔套部件。"), setGear("invoker-boots", "脚部", "唤魔师热忱", "zeal-of-the-invoker-unique_boots_set_12_x1.png", "唤魔套部件。", "惩罚"), jewelry("traveler", "trapped"), jewelry("compass", "stricken"), legendary("justice-lantern", "手指", "正义灯笼", "justice-lantern-p4_unique_ring_03.png", "按格挡几率获得伤害减免。", { gem: "gogok" }), weapon("pig-sticker", "杀猪刀", "pig-sticker-unique_dagger_007_x1.png", "极快攻速与额外词缀使其成为荆棘点杀底材。", "匕首"), shield("akarat-awakening", "阿卡拉特的顿悟", "akarats-awakening-unique_crushield_104_x1.png", "格挡时缩短技能冷却。")],
    skills: [skill("punish", "惩罚", "迅捷", "主要攻击；叠套装攻速并提高格挡。"), skill("bombardment", "火炮轰击", "尖刺桶", "把荆棘转成范围爆发。"), skill("akarats-champion", "阿卡拉特勇士", "先知化身", "提供护甲与生存。"), skill("iron-skin", "钢铁之肤", "反伤之肤", "短时间大幅提高荆棘。"), skill("consecration", "奉献", "荆棘结界", "站桩区域内提高荆棘并恢复。"), skill("laws-of-justice", "正义律法", "坚不可摧", "提高抗性并覆盖危险阶段。")], passives: [passive("iron-maiden", "铁处女", "直接提高荆棘伤害。"), passive("hold-your-ground", "坚守阵地", "提高格挡几率，连接盾牌与灯笼减伤。"), passive("finery", "宝石之力", "宝石数量提高力量。"), passive("indestructible", "坚不可摧", "致命伤害保命。")],
    powers: [power("mortal-drama", "武器", "人世无常", "the-mortal-drama-p610_unique_flail_2h_101.png", "火炮轰击数量翻倍。", "宝藏腰带自动轰击也获得更多落点。"), power("aquila", "防具", "天鹰胸甲", "aquila-cuirass-p4_unique_chest_012.png", "高圣怒时减伤。", "惩罚生成圣怒而非消耗，天鹰稳定常驻。"), power("coe", "首饰", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "物理周期提高荆棘与轰击。", "把钢铁之肤和手动轰击压进物理窗。"), power("votoyias", "第4槽", "沃·托亚之刺", "votoyias-spiker-unique_shield_104_x1.png", "被挑衅的敌人承受双倍荆棘。", "第39赛季第四槽补足荆棘核心乘区。")],
    links: [{ title: "格挡减伤链", category: "defense", conclusion: "格挡同时刷新技能并通过灯笼转为减伤。", steps: [["punish", "惩罚", "提高格挡"], ["akarat-awakening", "顿悟盾", "格挡缩冷却"], ["justice-lantern", "正义灯笼", "格挡转减伤"]] }, { title: "荆棘点杀", category: "damage", conclusion: "这套不追双暴和武器白字，攻速与荆棘数值优先。", steps: [["iron-maiden", "铁处女", "基础荆棘"], ["heart-iron", "钢铁之心", "体能转荆棘"], ["punish", "高速惩罚", "把荆棘打入单体"]] }, { title: "轰击爆发", category: "damage", conclusion: "物理周期内开启反伤之肤，自动与手动轰击共同爆发。", steps: [["trove", "宝藏腰带", "自动轰击"], ["mortal-drama", "人世无常", "轰击数量翻倍"], ["iron-skin", "反伤之肤", "临时提高荆棘"], ["bombardment", "尖刺桶", "范围结算"]] }],
    rotation: [{ title: "惩罚起手", action: "贴近精英连续惩罚。", reason: "叠攻速和格挡。" }, { title: "保持变身", action: "开启阿卡拉特勇士。", reason: "提供护甲和容错。" }, { title: "物理预热", action: "物理周期前开启奉献和钢铁之肤。", reason: "提高荆棘基础值。" }, { title: "集中轰击", action: "对精英释放火炮轰击。", reason: "人世无常把落点翻倍。" }, { title: "持续点杀", action: "爆发后继续惩罚同一目标。", reason: "唤魔六件专长是单体。" }], pushNote: "围绕物理周期手动轰击，其余时间高速惩罚。", speedNote: "低层可用战马和自动轰击边走边清场。", lowNote: "体能、荆棘和攻速优先，完全不需要暴击词缀。", highNote: "精确堆叠攻速断点、冷却和物理元素。", source: "https://www.icy-veins.com/d3/crusader-thorns-build-with-invoker-set",
  },
  {
    classKey: "crusader", id: "roland-sweep", name: "罗兰横扫", set: "罗兰的传世甲", core: "横扫攻击叠攻速 → 拒绝盾增伤", summary: "连续横扫叠满罗兰攻速和减伤，拒绝盾按命中怪物数量不断放大下一次横扫。", difficulty: "中等 · 近战持续", follower: "圣殿骑士", followerReason: "治疗和回能适合长时间贴身横扫。", element: "闪电", coreSkill: "横扫攻击",
    gear: [...roland, legendary("drakon", "腕部", "德拉孔的训导", "drakons-lesson-p4_unique_bracer_110.png", "横扫命中少量敌人时提高伤害并返还圣怒。", { element: "闪电", skill: "横扫攻击" }), legendary("golden-flense", "腰部", "宝藏腰带", "belt-of-the-trove-p610_unique_belt_008.png", "提供被动轰击与额外清场；核心连枷特效放魔方。"), jewelry("traveler", "trapped"), jewelry("compass", "stricken"), jewelry("coe", "gogok"), weapon("swiftmount", "迅捷连枷", "swiftmount-unique_flail_1h_103_x1.png", "延长战马冲锋，速刷和调整站位更顺。"), shield("denial", "拒绝", "denial-p61_unique_shield_007.png", "横扫每命中一个敌人都会提高下一次横扫伤害。")],
    skills: [skill("sweep-attack", "横扫攻击", "电流扫击", "主要伤害，连续攻击叠罗兰攻速与减伤。"), skill("steed-charge", "战马冲锋", "马不停蹄", "转场和脱离危险地板。"), skill("akarats-champion", "阿卡拉特勇士", "先知化身", "提高坚韧与资源恢复。"), skill("iron-skin", "钢铁之肤", "钢铁闪光", "高密度贴身前开启减伤。"), skill("laws-of-valor", "勇气律法", "势不可挡", "攻速与减耗支持连续横扫。"), skill("provoke", "挑衅", "净化", "回复圣怒。")], passives: commonPassives,
    powers: [power("golden-flense", "武器", "黄金剥皮者", "golden-flense-p61_unique_flail_2h_104.png", "横扫每命中一个敌人都会返还圣怒并提高伤害。", "高密度把续航和输出同时推高。"), power("aquila", "防具", "天鹰胸甲", "aquila-cuirass-p4_unique_chest_012.png", "高圣怒减伤。", "黄金剥皮者回怒帮助常驻。"), power("zodiac", "首饰", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "横扫命中缩短冷却。", "刷新变身、律法和钢铁之肤。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补足单体。")],
    links: [{ title: "横扫叠层", category: "damage", conclusion: "进入战斗后不要停手，罗兰层数断掉会同时损失攻速与减伤。", steps: [["sweep-attack", "横扫攻击", "连续命中"], ["roland-head", "罗兰六件", "叠攻速与减伤"], ["denial", "拒绝盾", "按命中怪数放大下一击"]] }, { title: "密度回怒", category: "resource", conclusion: "怪越密，黄金剥皮者返怒越多，天鹰也越稳定。", steps: [["golden-flense", "黄金剥皮者", "按命中数返怒"], ["sweep-attack", "持续横扫", "消耗与回复平衡"], ["aquila", "天鹰", "高资源减伤"]] }, { title: "少目标护腕", category: "damage", conclusion: "清理精英残血和首领时，德拉孔护腕补足少目标伤害。", steps: [["drakon", "德拉孔护腕", "少目标增伤返怒"], ["coe", "闪电周期", "元素爆发"], ["sweep-attack", "横扫", "集中点杀"]] }],
    rotation: [{ title: "骑马进场", action: "冲到高密度精英处。", reason: "拒绝盾和连枷都需要命中数量。" }, { title: "开启防御", action: "开启变身和钢铁之肤。", reason: "贴身横扫前先建立坚韧。" }, { title: "连续横扫", action: "不要停手，尽快叠满罗兰层数。", reason: "攻速和减伤随层数增长。" }, { title: "闪电爆发", action: "闪电周期内把精英留在横扫中心。", reason: "元素与拒绝盾共同放大。" }, { title: "少目标点杀", action: "剩少量敌人时继续贴住目标。", reason: "德拉孔护腕在少目标时更强。" }], pushNote: "把精英拖进密度，持续横扫维持套装层数。", speedNote: "迅捷连枷延长战马，横扫只在精英处停留。", lowNote: "先升级圣教军盾获取拒绝，再做横扫连枷。", highNote: "攻速断点、闪电元素和范围伤共同决定上限。", source: "https://www.icy-veins.com/d3/crusader-sweep-attack-build-with-rolands-set",
  },
  {
    classKey: "crusader", id: "seeker-hammer", name: "圣光锤丁", set: "圣光追寻者", core: "天罚之剑落地 → 祝福之锤覆盖", summary: "天罚之剑既是位移也是圣光套减伤开关，乔安娜武器盾牌与锤击裤共同放大祝福之锤。", difficulty: "中等 · 战区覆盖", follower: "圣殿骑士", followerReason: "治疗和回能能覆盖落入怪群后持续锤击的风险。", element: "神圣", coreSkill: "祝福之锤",
    gear: [...light, legendary("gabriel", "腕部", "加百利的臂甲", "gabriels-vambraces-p3_unique_bracer_101.png", "祝福之锤命中少量敌人时返还圣怒。", { element: "神圣", skill: "祝福之锤" }), legendary("sacred-harness", "腰部", "神圣束带", "sacred-harness-p3_unique_belt_01.png", "天罚之剑落地自动施放审判，建立控制与易伤。"), jewelry("traveler", "trapped"), jewelry("compass", "stricken"), jewelry("coe", "gogok"), weapon("johanna-argument", "乔安娜的辩护", "johannas-argument-p1_flail1h_norm_unique_01.png", "提高祝福之锤攻速与伤害。"), shield("guard-johanna", "乔安娜的守卫", "guard-of-johanna-unique_shield_103_x1.png", "祝福之锤命中少量敌人时获得巨大增伤。")],
    skills: [skill("blessed-hammer", "祝福之锤", "无尽之锤", "主要输出；围绕角色持续旋转覆盖战区。"), skill("falling-sword", "天罚之剑", "急速降临", "位移、触发圣光套减伤，并由腰带自动审判。"), skill("akarats-champion", "阿卡拉特勇士", "先知化身", "提高坚韧和回怒。"), skill("provoke", "挑衅", "净化", "回复圣怒支持连续锤击。"), skill("laws-of-valor", "勇气律法", "势不可挡", "提高攻速并降低消耗。"), skill("iron-skin", "钢铁之肤", "钢铁闪光", "落地后覆盖危险阶段。")], passives: [passive("blunt", "钝器", "提高祝福之锤伤害。"), ...commonPassives.slice(0, 3)],
    powers: [power("faithful-memory", "武器", "忠贞回忆", "faithful-memory-p61_unique_sword_2h_012_x1.png", "天罚之剑命中敌人后按数量提高祝福之锤伤害。", "要求落地命中足够多敌人。"), power("hammer-jammers", "防具", "锤击裤", "hammer-jammers-p4_unique_pants_002.png", "被致盲、定身或昏迷的敌人承受更多祝福之锤伤害。", "神圣束带自动审判直接触发。"), power("zodiac", "首饰", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "锤击命中缩短冷却。", "刷新落剑、变身与律法。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽补足精英与首领。")],
    links: [{ title: "落剑建立战区", category: "movement", conclusion: "落剑不是赶路按钮，必须命中怪群才能同时拿到减伤与忠贞回忆层数。", steps: [["falling-sword", "天罚之剑", "落入高密度"], ["light-head", "圣光套", "落剑后减伤"], ["faithful-memory", "忠贞回忆", "按命中数放大祝福锤"]] }, { title: "自动审判增伤", category: "damage", conclusion: "落地一次同时完成控制和锤击裤增伤准备。", steps: [["sacred-harness", "神圣束带", "落地自动审判"], ["hammer-jammers", "锤击裤", "受控目标乘区"], ["blessed-hammer", "祝福之锤", "持续覆盖"]] }, { title: "少目标返怒", category: "resource", conclusion: "首领与残余精英阶段由护腕和盾牌共同补足单体。", steps: [["gabriel", "加百利臂甲", "少目标返怒"], ["guard-johanna", "乔安娜守卫", "少目标增伤"], ["johanna-argument", "乔安娜辩护", "攻速与技能伤"]] }],
    rotation: [{ title: "落剑进场", action: "瞄准精英与最多怪物落地。", reason: "建立减伤与忠贞回忆层数。" }, { title: "开启变身", action: "落地后开启阿卡拉特勇士。", reason: "提高坚韧与回怒。" }, { title: "持续锤击", action: "站在怪群中心连续施放祝福之锤。", reason: "旋转路径需要覆盖敌人。" }, { title: "补充资源", action: "圣怒下降时使用挑衅和律法。", reason: "保持黄道触发与锤击不停。" }, { title: "重跳刷新", action: "减伤或忠贞层数接近结束时重新落剑。", reason: "输出与生存都依赖落剑。" }], pushNote: "每次落剑尽量命中最多敌人，随后原地覆盖祝福锤。", speedNote: "落剑连续跨越地图，低层不等待元素周期。", lowNote: "乔安娜武器、盾牌和锤击裤是最先补齐的三件。", highNote: "神圣元素、范围伤与冷却缩减提高高层稳定性。", source: "https://www.icy-veins.com/d3/crusader-blessed-hammer-build-with-seeker-of-the-light-set",
  },
  {
    classKey: "crusader", id: "lod-bombardment", name: "梦遗轰击", set: "梦之遗礼", core: "荆棘叠加 → 尖刺桶火炮轰击", summary: "不激活任何套装，以远古散件、荆棘和人世无常把火炮轰击变成周期性范围爆发。", difficulty: "高装备门槛 · 周期爆发", follower: "圣殿骑士", followerReason: "治疗和保命帮助角色在轰击冷却间隔内拉怪。", element: "物理", coreSkill: "火炮轰击",
    gear: [legendary("leoric", "头部", "李奥瑞克的王冠", "leorics-crown-unique_helm_002_p1.png", "放大钻石冷却缩减，加快轰击循环。"), legendary("skeleton-king", "肩部", "骷髅王的肩铠", "pauldrons-of-the-skeleton-king-unique_shoulder_103_x1.png", "提供一次额外保命机会，远古版本计入梦遗。"), legendary("heart-iron", "胸部", "钢铁之心", "heart-of-iron-p4_unique_chest_018.png", "体能转化为荆棘。"), legendary("stone-gauntlets", "手部", "岩石护手", "stone-gauntlets-p66_unique_gloves_007.png", "受击提高护甲但降低移速；阿卡拉特勇士抵消负面。"), legendary("sanguinary", "腕部", "嗜血护腕", "sanguinary-vambraces-unique_bracer_105_x1.png", "被击中时有机会按荆棘造成范围伤害。", { element: "物理" }), legendary("trove", "腰部", "宝藏腰带", "belt-of-the-trove-p610_unique_belt_008.png", "定期自动火炮轰击。"), legendary("blackthorne-pants", "腿部", "黑棘的战袍裤", "blackthornes-jousting-mail-unique_pants_013_x1.png", "可滚物理元素的散件槽；只穿一件不会激活套装。", { warning: "梦遗允许穿套装品质单件，但绝不能激活任何两件套效果。" }), legendary("illusory", "脚部", "虚幻长靴", "illusory-boots-unique_boots_103_x1.png", "允许穿过敌人，方便把怪群拉成轰击区域。"), jewelry("squirt", "lod"), jewelry("coe", "stricken"), legendary("justice-lantern", "手指", "正义灯笼", "justice-lantern-p4_unique_ring_03.png", "格挡几率转减伤。", { gem: "trapped" }), weapon("mortal-drama", "人世无常", "the-mortal-drama-p610_unique_flail_2h_101.png", "火炮轰击落点数量翻倍。", "双手连枷"), shield("votoyias", "沃·托亚之刺", "votoyias-spiker-unique_shield_104_x1.png", "被挑衅敌人承受双倍荆棘伤害。")],
    skills: [skill("bombardment", "火炮轰击", "尖刺桶", "主要爆发，把荆棘转成范围伤害。"), skill("akarats-champion", "阿卡拉特勇士", "先知化身", "提供护甲并免疫岩石护手减速。"), skill("iron-skin", "钢铁之肤", "反伤之肤", "轰击前临时提高荆棘。"), skill("provoke", "挑衅", "蓄势待发", "让敌人触发沃·托亚双倍荆棘。"), skill("steed-charge", "战马冲锋", "马不停蹄", "拉怪和调整轰击位置。"), skill("laws-of-justice", "正义律法", "坚不可摧", "冷却间隔内提高坚韧。")], passives: [passive("iron-maiden", "铁处女", "直接提高荆棘。"), passive("lord-commander", "统御者", "缩短火炮轰击和战马冷却。"), passive("finery", "宝石之力", "宝石提高力量。"), passive("indestructible", "坚不可摧", "致命伤害保命。")],
    powers: [power("swiftmount", "武器", "迅捷连枷", "swiftmount-unique_flail_1h_103_x1.png", "延长战马冲锋。", "轰击冷却期间持续拉怪与转场。"), power("aquila", "防具", "天鹰胸甲", "aquila-cuirass-p4_unique_chest_012.png", "高圣怒减伤。", "构筑几乎不消耗圣怒，能稳定常驻。"), power("justice-lantern", "首饰", "正义灯笼", "justice-lantern-p4_unique_ring_03.png", "格挡转减伤。", "与盾牌格挡共同构成常驻坚韧。"), power("belt-trove", "第4槽", "宝藏腰带", "belt-of-the-trove-p610_unique_belt_008.png", "定期自动轰击。", "第39赛季可将高特效放魔方并穿戴高词缀替代腰带。")],
    links: [{ title: "荆棘转轰击", category: "damage", conclusion: "轰击伤害来自荆棘，不追武器白字与双暴。", steps: [["heart-iron", "钢铁之心", "体能转荆棘"], ["iron-skin", "反伤之肤", "临时提高荆棘"], ["bombardment", "尖刺桶", "按荆棘结算"], ["mortal-drama", "人世无常", "落点翻倍"]] }, { title: "挑衅双倍", category: "damage", conclusion: "每次物理爆发前必须先让目标处于挑衅状态。", steps: [["provoke", "挑衅", "标记敌人"], ["votoyias", "沃·托亚之刺", "双倍荆棘"], ["coe", "全能物理", "元素窗口"]] }, { title: "冷却间隔生存", category: "defense", conclusion: "战马拉怪、天鹰和岩石护手让角色安全等到下一轮。", steps: [["steed-charge", "战马", "拉怪转场"], ["aquila", "天鹰", "高资源减伤"], ["stone-gauntlets", "岩石护手", "受击叠护甲"], ["akarats-champion", "变身", "抵消减速"]] }],
    rotation: [{ title: "检查梦遗", action: "确认没有激活任何两件套。", reason: "套装奖励会关闭梦遗效果。" }, { title: "骑马拉怪", action: "把精英和杂兵聚到开阔区域。", reason: "轰击需要集中落点。" }, { title: "挑衅标记", action: "物理周期前挑衅精英。", reason: "沃·托亚让其承受双倍荆棘。" }, { title: "开启反伤", action: "开启钢铁之肤与变身。", reason: "提高荆棘并抵消岩石护手。" }, { title: "物理轰击", action: "释放尖刺桶火炮轰击。", reason: "梦遗、人世无常和全能在此叠加。" }], pushNote: "拉高密度后把挑衅、反伤之肤与轰击压进物理周期。", speedNote: "依靠自动轰击和战马清场，减少等待。", lowNote: "梦遗等级和每件远古散件数量比太古品质更重要。", highNote: "体能、荆棘、物理元素和冷却是最终属性轴。", source: "https://www.icy-veins.com/d3/crusader-bombardment-build-with-legacy-of-dreams-set",
  },
];

const ponySeed: ClassGuideSeed = {
    classKey: "crusader", id: "pony-fist-farm", name: "跑马天拳 · 全能速刷", set: "勇气壁垒 / 诺瓦德的热忱", core: "战马不停 → 天堂之拳全屏落雷", summary: "这不是冲榜配装，而是专门处理 T16 小秘境、悬赏、蓝门与 110 层以下大秘境的打工构筑：骑马负责穿图，下马后的诺瓦德增伤窗负责秒掉精英。", difficulty: "低操作 · 一键赶路", follower: "魔女", followerReason: "魔女的冷却、攻速和远程控制能缩短战马空档；小秘境让随从佩戴贪婪之戒扩展拾取范围。", element: "神圣", coreSkill: "天堂之拳",
    gear: [
      ...valor,
      legendary("pony-warzechian", "腕部", "沃兹克护腕", "warzechian-armguards-unique_bracer_101_x1.png", "打碎可破坏物后获得短暂移速；天堂之拳的大范围落雷会沿路自动触发。", { element: "神圣" }),
      legendary("pony-vigilante", "腰部", "警戒腰带", "vigilante-belt-p76_unique_belt_002.png", "提供额外冷却缩减，压低战马、变身和律法的空档。"),
      jewelry("squirt", "zei"),
      legendary("pony-soj", "手指", "乔丹之石", "stone-of-jordan-p69_unique_ring_019.png", "提供稳定元素伤与精英伤，不必等待全能法戒周期。", { gem: "powerful" }),
      legendary("pony-rechel", "手指", "瑞秋的行窃之戒", "rechels-ring-of-larceny-unique_ring_104_x1.png", "恐惧敌人后获得大幅移速；由挑衅的惊慌失措符文触发。", { gem: "stricken" }),
      legendary("norvald-flail", "主手", "冲锋连枷", "flail-of-the-charge-p4_unique_flail_2h_set_01_x1.png", "与战马之盾组成诺瓦德套：延长战马，并在结束后提供独立增伤窗。", { quality: "set", base: "双手连枷" }),
      legendary("norvald-shield", "副手", "战马之盾", "shield-of-the-steed-p4_unique_shield_set_01_x1.png", "诺瓦德套副手；让战马冲锋从纯位移变成下一轮落雷的准备动作。", { quality: "set", base: "圣教军盾", warning: "黄装升级必须用70级“圣教军盾”；普通盾牌不会产出战马之盾。" }),
      legendary("pony-goldwrap-gear", "腰部", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后按金币数量提高护甲；速刷内容由囤宝者制造金币，形成近乎无限的护甲。", { warning: "金织带护甲只对掉金币的 T16、蓝门与悬赏生效，大秘境不要使用。" }),
      legendary("pony-coe", "手指", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "对应元素周期提供独立爆发乘区；大秘境精英战把落雷压进神圣周期。", { gem: "powerful" }),
      legendary("pony-avarice", "手指", "贪婪之戒", "avarice-band-unique_ring_108_x1.png", "拾取金币后扩大拾取范围，连接囤宝者、金织带与随从的金币链。", { gem: "hoarder" }),
      legendary("pony-khasset", "腰部", "正义灯塔腰带", "khassetts-cord-of-righteousness-p42_crusader_foh_belt.png", "降低天堂之拳消耗并大幅提高技能伤害；追求天拳上限时替换警戒或金织带。", { skill: "天堂之拳" }),
    ],
    skills: [
      skill("fist-of-the-heavens", "天堂之拳", "天雷风暴", "主要清场技能；低层只需少量落点即可让闪电覆盖整屏。"),
      skill("steed-charge", "战马冲锋", "马不停蹄", "长距离赶路并触发诺瓦德套；精英前主动下马吃增伤窗。"),
      skill("laws-of-hope", "希望律法", "天使之翼", "短距离补速并无视碰撞，填补战马之间的空档。"),
      skill("iron-skin", "钢铁之肤", "疾行之肤", "提供主动减伤与额外移速，蓝门高波次时再开启。"),
      skill("provoke", "挑衅", "惊慌失措", "回复圣怒并恐惧敌人，从而触发瑞秋戒的移速。"),
      skill("akarats-champion", "阿卡拉特勇士", "先知化身", "提高伤害、回怒与护甲；冷却足够后尽量常驻。"),
    ],
    passives: [passive("heavenly-strength", "天堂之力", "允许双手连枷与盾牌同时装备，诺瓦德套成立的前提。"), passive("lord-commander", "统御者", "缩短战马冷却，让主要赶路按钮更连续。"), passive("long-arm-of-the-law", "律法无边", "延长希望律法主动效果，短距离移动更顺畅。"), passive("indestructible", "坚不可摧", "蓝门后段或主机误入地板时提供一次保命。")],
    powers: [
      power("pony-darklight", "武器", "黑暗之光", "darklight-p67_unique_flail_1h_106.png", "天堂之拳额外施放两次并获得技能增伤。", "一发落雷被复制成多发，是移动清屏的主要伤害发动机。", "黄装升级：70级单手连枷。"),
      power("pony-vigilante-power", "防具", "民兵腰带", "vigilante-belt-p76_unique_belt_002.png", "提供额外冷却缩减。", "缩短战马、变身、律法和钢铁之肤的共同空档。"),
      power("pony-aquila", "防具", "天鹰胸甲", "aquila-cuirass-p4_unique_chest_012.png", "圣怒处于高位时获得减伤。", "大秘境不掉金币，用天鹰提供稳定减伤；天拳与律法减耗帮助维持高位圣怒。"),
      power("pony-zodiac", "首饰", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗资源的攻击命中时缩短一个冷却技能。", "连续天拳把战马和变身重新推回可用状态。"),
      power("pony-ingeom", "第4槽", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短技能冷却。", "精英死亡后立刻进入下一段近乎无空档的骑马窗口；只在会连续刷精英的速刷内容使用。"),
      power("pony-furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高对精英的伤害。", "大秘境速刷用焚炉快速处理精英与首领，不依赖寅剑的击杀窗口。"),
      power("pony-unity", "第4槽", "团结", "unity-unique_ring_010_x1.png", "与佩戴团结的随从分摊伤害。", "高巅峰尝试接近110层时换团结提容错；随从必须佩戴团结与不死饰品，否则反噬。"),
    ],
    links: [
      { title: "骑马即输出准备", category: "movement", conclusion: "赶路不是损失输出：每次下马都带着诺瓦德增伤进入下一屏。", steps: [["steed-charge", "战马冲锋", "高速穿图"], ["norvald-flail", "冲锋连枷", "延长战马"], ["norvald-shield", "战马之盾", "结束后建立增伤"], ["fist-of-the-heavens", "天堂之拳", "落雷清屏"]] },
      { title: "恐惧加速链", category: "movement", conclusion: "战马空档用挑衅恐惧怪物，瑞秋戒接管下一段移动。", steps: [["provoke", "惊慌失措", "恐惧身边敌人"], ["pony-rechel", "瑞秋戒", "恐惧后提高移速"], ["laws-of-hope", "天使之翼", "穿怪补速"]] },
      { title: "精英刷新冷却", category: "resource", conclusion: "看到精英要主动击杀；寅剑与黄道会把整套技能重新点亮。", steps: [["fist-of-the-heavens", "天拳高频命中", "触发黄道"], ["pony-zodiac", "黄道戒", "逐次缩短冷却"], ["pony-ingeom", "寅剑", "击杀精英重置"], ["steed-charge", "下一次战马", "立即转场"]] },
      { title: "速刷金币防线", category: "defense", conclusion: "T16、蓝门与悬赏都掉金币，囤宝者、金织带与贪婪之戒共同提供移速和近乎无限护甲；只有大秘境不掉金币，才切回天鹰与精英增伤。", steps: [["pony-avarice", "贪婪之戒", "扩大拾取范围"], ["pony-goldwrap-gear", "金织带", "拾金叠护甲"], ["pony-warzechian", "沃兹克", "破坏物补移速"]] },
    ],
    rotation: [{ title: "开局预热", action: "开启阿卡拉特勇士与希望律法。", reason: "先建立回怒、护甲和短距离移速。" }, { title: "骑马找精英", action: "战马沿主路穿图，不为落单白怪停留。", reason: "效率来自把移动时间压到最低。" }, { title: "主动下马落雷", action: "接近精英时结束战马，连续放数次天堂之拳。", reason: "诺瓦德增伤、黑暗之光复制和勇气套同时生效。" }, { title: "制造下一段加速", action: "挑衅恐惧残怪，触发瑞秋戒后继续前进。", reason: "填补战马和寅剑之间的短空档。" }, { title: "按内容切配置", action: "T16、蓝门与悬赏保持金币链；大秘境切回天鹰减伤、乔丹与全能法戒和焚炉。", reason: "蓝门掉金币且密度与T16相近，金币链照常生效；只有大秘境不掉金币，需要换回稳定减伤和精英增伤。" }],
    pushNote: "大秘境不掉金币，用天鹰减伤、乔丹与全能法戒的精英增伤和焚炉替换金币链；110层以下以快速处理精英为准。", speedNote: "T16小秘境、蓝门与悬赏使用金织带、囤宝者和贪婪之戒组成金币链，配瑞秋戒与寅剑把赶路和冷却压到最低。", lowNote: "六件勇气、黑暗之光、诺瓦德两件与警戒/金织带特效优先；先能稳定骑马清屏，再追远古和正确词缀。", highNote: "伤害溢出后把宝石与词缀转向移速、冷却和拾取范围；高巅峰尝试接近110层时可换团结提容错。", source: "https://www.icy-veins.com/d3/aegis-of-valor-fist-of-the-heavens-crusader-speed-farming-build", purpose: "nephalem-rift", supportedContent: ["T16小秘境", "悬赏", "蓝门", "大秘境≤110"], defaultMode: "speed", modeLabels: { push: "大秘境≤110速刷", speed: "T16 / 蓝门 / 悬赏" }, consoleNote: "把战马放在最顺手的肩键；接近精英时主动松开，下马落雷后再骑。蓝门掉金币且密度与T16相近，金币链照常生效；高波次记得保留钢铁之肤和变身再深入。",
  };

const PONY_SOURCES = {
  overview: "https://www.icy-veins.com/d3/crusader-aegis-of-valor-fist-of-the-heavens-build",
  speed: "https://www.icy-veins.com/d3/aegis-of-valor-fist-of-the-heavens-crusader-speed-farming-build",
  gear: "https://www.icy-veins.com/d3/crusader-aegis-of-valor-fist-of-the-heavens-build#bis-gear-gems-paragon",
  cnAuto: "https://ol.3dmgame.com/gl/317434.html",
  cnAll: "https://m.3dmgame.com/ol/gl/301903.html",
};

const VALOR_FIST_SOURCES = {
  overview: "https://www.icy-veins.com/d3/crusader-aegis-of-valor-fist-of-the-heavens-build",
  skills: "https://www.icy-veins.com/d3/aegis-of-valor-fist-of-the-heavens-crusader-skills-and-runes",
  gear: "https://www.icy-veins.com/d3/crusader-aegis-of-valor-fist-of-the-heavens-build#bis-gear-gems-paragon",
  speed: "https://www.icy-veins.com/d3/aegis-of-valor-fist-of-the-heavens-crusader-speed-farming-build",
};

const VALOR_FIST_ROTATION = [
  { title: "保持变身", action: "进图先开阿卡拉特勇士，冷却快结束时靠黄道刷新。", reason: "先知化身提供护甲、回怒与容错，是低巅峰冲层的底线。" },
  { title: "骑马进密度", action: "用战马穿到精英或高密度怪群，结束战马后再开始落雷。", reason: "诺瓦德两件的主要增伤发生在战马结束后的窗口。" },
  { title: "压住天拳", action: "闪电周期和精英聚合时连续施放天堂之拳。", reason: "勇气六件、黑暗之光、正义灯塔腰带和斯奎特共同放大落雷。" },
  { title: "补资源与冷却", action: "圣怒下降时用挑衅，危险地板前开钢铁之肤。", reason: "高位圣怒维持天鹰减伤，黄道命中刷新战马与变身。" },
  { title: "转场控节奏", action: "精英死亡后立刻上马，不为残血白怪停留。", reason: "这套不是纯跑马速刷，效率来自在增伤窗内处理高价值目标。" },
];

const VALOR_FIST_SPEED_ROTATION = [
  { title: "开局预热", action: "开启阿卡拉特勇士和希望律法。", reason: "先把回怒、防御与短距离穿怪接通。" },
  { title: "骑马找精英", action: "沿主路战马穿图，破坏物顺路触发沃兹克。", reason: "速刷分支用移速、拾取范围和击杀冷却替代冲层等待。" },
  { title: "下马落雷", action: "精英附近结束战马，短按天堂之拳清屏。", reason: "诺瓦德增伤和黑暗之光复制足够处理T16、蓝门与低层大秘境。" },
  { title: "恐惧接速", action: "战马空档用挑衅恐惧敌人触发瑞秋戒。", reason: "填补寅剑击杀前后的移动断点。" },
  { title: "拾金续防", action: "保持金币拾取链，看到精英优先击杀。", reason: "囤宝者、贪婪之戒与金织带同时提供金币、拾取范围和护甲。" },
];

const VALOR_FIST_SEED = seeds.find((seed) => seed.id === "valor-fist")!;
const VALOR_FIST_BASE_GUIDE = createClassGuide({
  ...VALOR_FIST_SEED,
  gear: [
    ...VALOR_FIST_SEED.gear,
    legendary("valor-norvald-flail", "主手", "冲锋连枷", "flail-of-the-charge-p4_unique_flail_2h_set_01_x1.png", "与战马之盾组成诺瓦德两件：延长战马，并在战马结束后获得独立增伤。", { quality: "set", base: "双手连枷" }),
    legendary("valor-warzechian", "腕部", "沃兹克护腕", "warzechian-armguards-unique_bracer_101_x1.png", "打碎可破坏物后获得移速；天拳速刷会沿路自动触发。", { element: "闪电" }),
    legendary("valor-goldwrap", "腰部", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后按金币数量提高护甲；与囤宝者和贪婪之戒组成速刷防线。", { warning: "只适用于掉金币的T16、蓝门与悬赏；大秘境冲层不要使用。" }),
    legendary("valor-vigilante", "腰部", "警戒腰带", "vigilante-belt-p76_unique_belt_002.png", "提供冷却缩减，适合不用金币链但需要压缩战马空档的低层大秘境。"),
    legendary("valor-rechel", "手指", "瑞秋的行窃之戒", "rechels-ring-of-larceny-unique_ring_104_x1.png", "恐惧敌人后获得大幅移速，由挑衅的惊慌失措符文触发。", { gem: "powerful" }),
    legendary("valor-avarice", "手指", "贪婪之戒", "avarice-band-unique_ring_108_x1.png", "拾取金币后扩大拾取范围，帮助持续触发金织带和囤宝者。", { gem: "hoarder" }),
  ],
  skills: [
    ...VALOR_FIST_SEED.skills,
    skill("laws-of-hope", "希望律法", "天使之翼", "速刷补移速与穿怪，填补战马空档。"),
  ],
  passives: [
    ...VALOR_FIST_SEED.passives,
    passive("heavenly-strength", "天堂之力", "允许双手连枷与盾牌同时装备，是诺瓦德版本的必要被动。"),
    passive("lord-commander", "统御者", "缩短战马冲锋冷却，提高转场和诺瓦德窗口频率。"),
    passive("long-arm-of-the-law", "律法无边", "延长律法主动效果，速刷时让希望律法覆盖更多路程。"),
  ],
  powers: [
    ...VALOR_FIST_SEED.powers,
    power("valor-darklight-power", "武器", "黑暗之光", "darklight-p67_unique_flail_1h_106.png", "天堂之拳额外施放两次并提高伤害。", "诺瓦德版本穿双手连枷和盾牌，黑暗之光必须放入魔方。", "黄装升级：70级单手连枷。"),
    power("valor-vigilante-power", "防具", "警戒腰带", "vigilante-belt-p76_unique_belt_002.png", "提供额外冷却缩减。", "速刷时压缩战马、律法与变身空档。"),
    power("valor-ingeom", "第4槽", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短冷却。", "只在精英连续死亡的速刷内容使用。"),
  ],
  links: [
    { title: "正确的诺瓦德链", category: "movement", conclusion: "诺瓦德两件必须穿在身上：冲锋连枷放魔方不会激活套装。", steps: [["valor-norvald-flail", "冲锋连枷", "穿戴主手"], ["steed-shield", "战马之盾", "穿戴副手"], ["steed-charge", "战马结束", "建立增伤窗"], ["fist-of-the-heavens", "天堂之拳", "在窗口内落雷"]] },
    { title: "天拳复制链", category: "damage", conclusion: "黑暗之光在魔方提供复制次数，正义灯塔提供技能乘区和资源稳定。", steps: [["valor-darklight-power", "黑暗之光", "额外天拳"], ["khasset", "正义灯塔腰带", "减耗与增伤"], ["fury-bracer", "愤怒护腕", "保留闪电元素词缀"], ["coe", "全能闪电", "冲层爆发"]] },
    { title: "速刷金币链", category: "defense", conclusion: "T16、蓝门与悬赏才使用金币链；大秘境冲层回到天鹰和受罚者。", steps: [["valor-avarice", "贪婪之戒", "扩大拾取"], ["valor-goldwrap", "金织带", "拾金叠护甲"], ["boon-of-the-hoarder", "囤宝者", "制造金币"], ["valor-ingeom", "寅剑", "精英后刷新冷却"]] },
  ],
  rotation: VALOR_FIST_ROTATION,
});

const VALOR_FIST_CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "valor-head", shoulders: "valor-shoulders", chest: "valor-chest", gloves: "valor-gloves",
    bracers: "fury-bracer", belt: "khasset", pants: "valor-pants", boots: "valor-boots",
    amulet: "squirts", ring1: "focus", ring2: "restraint", weapon: "valor-norvald-flail", offhand: "steed-shield",
  },
  skills: [
    { id: "fist-of-the-heavens", rune: "雷霆裂隙" }, { id: "steed-charge", rune: "马不停蹄" },
    { id: "akarats-champion", rune: "先知化身" }, { id: "laws-of-valor", rune: "势不可挡" },
    { id: "iron-skin", rune: "疾行之肤" }, { id: "provoke", rune: "蓄电攻击" },
  ],
  passives: ["heavenly-strength", "lord-commander", "finery", "indestructible"],
  powers: { weapon: "valor-darklight-power", armor: "aquila", jewelry: "zodiac", season: "coe" },
  legendaryGems: { control: "bane-of-the-trapped", distance: "zei", boss: "bane-of-the-stricken" },
  normalGems: {
    head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-ruby"),
    weapon: ["flawless-royal-emerald"],
  },
  follower: { id: "enchantress", items: ["不死圣物"], skills: ["冷却增强", "充能"] },
  statPriorities: {
    global: ["天堂之拳技能伤", "闪电元素伤", "冷却缩减", "暴击几率/暴击伤害"],
    survival: ["天鹰减伤覆盖", "斯奎特护盾保持", "力量", "体能"],
    endgame: ["范围伤害", "精英伤", "减耗维持天鹰"],
  },
  rotation: VALOR_FIST_ROTATION,
};

const VALOR_FIST_SCENARIOS: BuildScenario[] = [
  {
    id: "push-low", label: "低巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "low", applicability: "supported",
    reason: "低巅峰冲层保留勇气六件、穿戴诺瓦德两件、萃取黑暗之光、正义灯塔腰带与天鹰减伤；受罚者补首领，红宝石补力量与护甲。",
    unchangedReason: "基础配置就是低巅峰冲层入口。",
    sourceRefs: [VALOR_FIST_SOURCES.overview, VALOR_FIST_SOURCES.skills, VALOR_FIST_SOURCES.gear], reviewedAt: "2026-08-22",
  },
  {
    id: "push-high", label: "高巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "high", applicability: "supported",
    reason: "高巅峰由巅峰提供主属性后，护甲宝石换钻石补全抗和冷却，保命被动换神圣使命，词缀更多让给范围伤与精英伤。",
    patch: {
      passives: ["heavenly-strength", "lord-commander", "finery", "holy-cause"],
      normalGems: { armor: Array(5).fill("flawless-royal-diamond") },
      statPriorities: { global: ["天堂之拳技能伤", "闪电元素伤", "范围伤害", "冷却缩减"], survival: ["全元素抗性", "斯奎特护盾保持"], endgame: ["精英伤", "减耗阈值", "装备力量可洗范围伤"] },
    },
    sourceRefs: [VALOR_FIST_SOURCES.overview, VALOR_FIST_SOURCES.gear], reviewedAt: "2026-08-22",
  },
  {
    id: "speed-low", label: "低巅峰 T16 / 蓝门 / 低层大秘境", content: "nephalem-rift", paragonBand: "low", applicability: "supported",
    reason: "速刷从克制站桩冲层改为移动清图：腕部换沃兹克、腰带换金织带、戒指换瑞秋与贪婪，萃取寅剑并用囤宝者建立金币链；低巅峰保留红宝石和坚不可摧。",
    patch: {
      gear: { bracers: "valor-warzechian", belt: "valor-goldwrap", ring1: "valor-rechel", ring2: "valor-avarice" },
      skills: [
        { id: "fist-of-the-heavens", rune: "天雷风暴" }, { id: "steed-charge", rune: "马不停蹄" },
        { id: "akarats-champion", rune: "先知化身" }, { id: "laws-of-hope", rune: "天使之翼" },
        { id: "iron-skin", rune: "疾行之肤" }, { id: "provoke", rune: "惊慌失措" },
      ],
      powers: { armor: "valor-vigilante-power", season: "valor-ingeom" },
      legendaryGems: { control: "zei", distance: "boon-of-the-hoarder", boss: "bane-of-the-powerful" },
      follower: { items: ["贪婪之戒", "不死圣物"], skills: ["冷却增强", "充能"] },
      statPriorities: { global: ["25%移速上限", "冷却缩减", "天堂之拳技能伤", "拾取范围"], survival: ["金币链覆盖", "力量", "体能"] },
      rotation: VALOR_FIST_SPEED_ROTATION,
    },
    sourceRefs: [VALOR_FIST_SOURCES.speed, VALOR_FIST_SOURCES.gear], reviewedAt: "2026-08-22",
  },
  {
    id: "speed-high", label: "高巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "high", applicability: "supported",
    reason: "高巅峰速刷伤害溢出后，宝石转闪电华冠补移速，护甲钻石压缩冷却；保留金币链和寅剑，目标变成连续骑马与拾取效率。",
    patch: {
      gear: { bracers: "valor-warzechian", belt: "valor-goldwrap", ring1: "valor-rechel", ring2: "valor-avarice" },
      skills: [
        { id: "fist-of-the-heavens", rune: "天雷风暴" }, { id: "steed-charge", rune: "马不停蹄" },
        { id: "akarats-champion", rune: "先知化身" }, { id: "laws-of-hope", rune: "天使之翼" },
        { id: "iron-skin", rune: "疾行之肤" }, { id: "provoke", rune: "惊慌失措" },
      ],
      passives: ["heavenly-strength", "lord-commander", "long-arm-of-the-law", "finery"],
      powers: { armor: "valor-vigilante-power", season: "valor-ingeom" },
      legendaryGems: { control: "zei", distance: "boon-of-the-hoarder", boss: "wreath-of-lightning" },
      normalGems: { armor: Array(5).fill("flawless-royal-diamond") },
      follower: { items: ["贪婪之戒", "不死圣物"], skills: ["冷却增强", "充能"] },
      statPriorities: { global: ["25%移速上限", "冷却缩减", "拾取范围", "范围伤害"], survival: ["金币链覆盖", "全元素抗性"], endgame: ["伤害溢出后不追受罚者层数", "优先连续转场"] },
      rotation: VALOR_FIST_SPEED_ROTATION,
    },
    sourceRefs: [VALOR_FIST_SOURCES.speed, VALOR_FIST_SOURCES.gear], reviewedAt: "2026-08-22",
  },
];

const VALOR_FIST_PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "先补到上限，速刷和冲层转场都吃收益。" },
      { stat: "力量", target: "其余点数", reason: "默认伤害与护甲来源。" },
      { stat: "体能", target: "被击杀时临时投入", reason: "低巅峰先保证不掉斯奎特和不被秒。" },
      { stat: "圣怒上限", target: "0点", reason: "正义灯塔、挑衅和减耗比上限更关键。" },
    ],
    offense: [
      { stat: "冷却缩减", target: "优先点满", reason: "缩短战马、阿卡拉特勇士、律法和钢铁之肤空档。" },
      { stat: "暴击几率", target: "第二点满", reason: "天拳高频命中先保证暴击触发密度。" },
      { stat: "暴击伤害", target: "第三点满", reason: "与暴击几率共同放大落雷。" },
      { stat: "攻击速度", target: "最后点满", reason: "收益低于冷却与双暴。" },
    ],
    defense: [
      { stat: "全元素抗性", target: "优先点满", reason: "力量职业护甲天然较高，先补短板。" },
      { stat: "生命%", target: "第二点满", reason: "扩大天鹰和主动减伤后的有效生命。" },
      { stat: "护甲", target: "第三点满", reason: "补充力量护甲。" },
      { stat: "生命恢复", target: "最后点满", reason: "只作小额续航。" },
    ],
    utility: [
      { stat: "能量消耗降低", target: "优先点满", reason: "稳定高圣怒，支撑天鹰减伤和连续落雷。" },
      { stat: "范围伤害", target: "第二点满", reason: "冲层和密度速刷都吃范围伤。" },
      { stat: "击中回复生命", target: "第三点满", reason: "天拳高频命中带来稳定恢复。" },
      { stat: "金币拾取范围", target: "最后点满", reason: "仅速刷金币链刚需，冲层收益低。" },
    ],
  },
  post800: [
    { priority: "力量", when: "默认", reason: "同时给伤害与护甲。" },
    { priority: "体能", when: "低巅峰冲层频繁破盾或被秒", reason: "补到能稳定维持斯奎特后回到力量。" },
  ],
  checkpoints: [
    { label: "刚成型", target: "冷却、减耗和红宝石", action: "先让变身、战马和天鹰尽量不断档。" },
    { label: "巅峰800", target: "四页关键项点满", action: "冲层保留受罚者，速刷开始换金币链。" },
    { label: "巅峰2000+", target: "范围伤、拾取与钻石", action: "冲层洗范围伤，速刷洗移速/拾取并用钻石压冷却。" },
  ],
};

const VALOR_FIST_CHOICE_POLICIES: BuildChoicePolicy[] = [
  { key: "valor-fist-core", targetType: "gear", targetId: "valor-norvald-flail", label: "勇气六件、诺瓦德两件与黑暗之光", status: "locked", reason: "勇气六件提供天堂之拳倍率，诺瓦德必须穿戴连枷和盾牌才会激活两件套；黑暗之光放魔方复制落雷。把冲锋连枷放魔方不会激活诺瓦德，是这次校对特别修正的点。" },
  { key: "passive-weapon-rule", targetType: "passive", targetId: "heavenly-strength", label: "天堂之力", status: "locked", reason: "穿双手连枷和圣教军盾必须携带天堂之力；因此原草稿里的热忱不适用于这套诺瓦德版本。" },
  { key: "belt-slot", targetType: "gear", targetId: "khasset", label: "腰带槽", status: "conditional", reason: "冲层用正义灯塔腰带提高天拳伤害与减耗；T16、蓝门、悬赏用金织带接金币链；需要更多冷却而不靠金币时才用警戒腰带。", alternatives: [{ id: "valor-goldwrap", label: "金织带", when: "T16、蓝门、悬赏和低层大秘境速刷", gain: "拾金后护甲极高", cost: "大秘境冲层不掉金币，特效失效", scenarios: ["speed-low", "speed-high"] }, { id: "valor-vigilante", label: "警戒腰带", when: "低层大秘境不想用金币链且冷却不足", gain: "稳定CDR", cost: "失去天拳增伤或金币护甲" }] },
  { key: "rings", targetType: "gear", targetId: "focus", label: "戒指组合", status: "conditional", reason: "冲层用克己守心保证高倍率；速刷换瑞秋戒和贪婪之戒，把恐惧移速、拾取范围和金币护甲串起来。", alternatives: [{ id: "valor-rechel", label: "瑞秋的行窃之戒", when: "速刷需要填补战马空档", gain: "挑衅恐惧后大幅移速", cost: "失去克己守心乘区", scenarios: ["speed-low", "speed-high"] }, { id: "valor-avarice", label: "贪婪之戒", when: "掉金币内容", gain: "扩大拾取范围并续金织带", cost: "大秘境冲层没有金币支持", scenarios: ["speed-low", "speed-high"] }] },
  { key: "fourth-cube", targetType: "power", targetId: "coe", label: "第39赛季第四槽", status: "conditional", reason: "冲层用全能法戒打闪电周期；速刷用寅剑在精英死亡后重置战马和变身；高巅峰若只追赶路可换闪电华冠宝石而不改寅剑。", alternatives: [{ id: "valor-ingeom", label: "寅剑", when: "T16、蓝门、悬赏与低层大秘境精英连续死亡", gain: "击杀精英后快速重置冷却", cost: "失去元素爆发窗", scenarios: ["speed-low", "speed-high"] }] },
  { key: "legendary-gems", targetType: "legendary-gem", targetId: "bane-of-the-stricken", label: "第三传奇宝石", status: "conditional", reason: "冲层首领用受罚者；低层速刷用强者提高精英后续；高巅峰速刷伤害溢出后换闪电华冠补移速。", alternatives: [{ id: "bane-of-the-powerful", label: "强者之灾", when: "低层大秘境和T16速刷", gain: "精英后稳定增伤减伤", cost: "首领战成长不如受罚者", scenarios: ["speed-low"] }, { id: "wreath-of-lightning", label: "闪电华冠", when: "高巅峰速刷伤害溢出", gain: "额外移动速度", cost: "失去强者或受罚者伤害", scenarios: ["speed-high"] }, { id: "boon-of-the-hoarder", label: "囤宝者的恩惠", when: "掉金币内容", gain: "启动金币链", cost: "大秘境不掉金币", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-low", "speed-high"] }] },
  { key: "follower", targetType: "follower", targetId: "enchantress", label: "随从", status: "flexible", reason: "魔女冷却和攻速最通用；速刷让随从戴贪婪之戒扩大金币链，冲层用不死圣物保证控场不断。" },
];

const PONY_SPEED_ROTATION = [
  { title: "开局预热", action: "开启阿卡拉特勇士与希望律法。", reason: "先建立回怒、护甲和短距离移速。" },
  { title: "骑马找精英", action: "战马沿主路穿图，不为落单白怪停留。", reason: "效率来自把移动时间压到最低。" },
  { title: "主动下马落雷", action: "接近精英时结束战马，连续放数次天堂之拳。", reason: "诺瓦德增伤、黑暗之光复制和勇气套同时生效。" },
  { title: "恐惧衔接", action: "挑衅恐惧残怪，触发瑞秋戒移速后继续前进。", reason: "填补战马和寅剑之间的短空档。" },
  { title: "拾取金币", action: "击杀后沿路拾取金币，保持贪婪与金织带护甲。", reason: "金币链同时提供移速、拾取范围和几乎无限的护甲。" },
];

const PONY_PUSH_ROTATION = [
  { title: "开局变身", action: "开启阿卡拉特勇士，再进入战斗。", reason: "先知化身的增伤、回怒与护甲先接通。" },
  { title: "骑马赶精英", action: "战马穿过怪群直达精英，少交技能在杂兵上。", reason: "110层以下速刷以精英处理为效率核心。" },
  { title: "下马落雷", action: "精英附近结束战马，把天堂之拳压进神圣周期。", reason: "全能法戒的神圣窗口与诺瓦德增伤叠加。" },
  { title: "保留资源", action: "圣怒下降时用挑衅补充，维持天鹰减伤。", reason: "大秘境没有金币护甲，稳定减伤依赖资源管理。" },
  { title: "处理首领", action: "首领阶段保持距离连续落雷，躲开地板。", reason: "保护斯奎特层数，并用焚炉或团结的精英乘区收尾。" },
];

const PONY_CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "valor-head", shoulders: "valor-shoulders", chest: "valor-chest", gloves: "valor-gloves",
    bracers: "pony-warzechian", belt: "pony-goldwrap-gear", pants: "valor-pants", boots: "valor-boots",
    amulet: "squirts", ring1: "pony-rechel", ring2: "pony-avarice", weapon: "norvald-flail", offhand: "norvald-shield",
  },
  skills: [
    { id: "fist-of-the-heavens", rune: "天雷风暴" }, { id: "steed-charge", rune: "马不停蹄" }, { id: "laws-of-hope", rune: "天使之翼" },
    { id: "iron-skin", rune: "疾行之肤" }, { id: "provoke", rune: "惊慌失措" }, { id: "akarats-champion", rune: "先知化身" },
  ],
  passives: ["heavenly-strength", "lord-commander", "long-arm-of-the-law", "indestructible"],
  powers: { weapon: "pony-darklight", armor: "pony-vigilante-power", jewelry: "pony-zodiac", season: "pony-ingeom" },
  legendaryGems: { control: "zei", channeling: "boon-of-the-hoarder", boss: "gogok" },
  normalGems: {
    head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-ruby"),
    weapon: ["flawless-royal-emerald"],
  },
  follower: { id: "enchantress", items: ["贪婪之戒", "不死圣物"], skills: ["冷却增强", "充能"] },
  statPriorities: {
    global: ["25%移速上限", "天堂之拳技能伤", "神圣元素伤", "冷却缩减"],
    survival: ["金币链覆盖", "力量", "体能"],
  },
  rotation: PONY_SPEED_ROTATION,
};

const PONY_SCENARIOS: BuildScenario[] = [
  {
    id: "speed-low", label: "低巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "low", applicability: "supported",
    reason: "T16小秘境、蓝门（敌意幻象）与悬赏都掉金币且密度相近，金织带+囤宝者+贪婪之戒的金币链有效，与 Icy Veins 速刷版一致共用一套配置；低巅峰保留红宝石与体能词缀。",
    sourceRefs: [PONY_SOURCES.speed, PONY_SOURCES.cnAuto, PONY_SOURCES.cnAll], reviewedAt: "2026-08-16",
  },
  {
    id: "speed-high", label: "高巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "high", applicability: "supported",
    reason: "高巅峰伤害溢出后，把迅捷勾玉换成闪电华冠补移速，护甲宝石换钻石压缩冷却，词缀转向移速、拾取与范围伤。",
    patch: {
      legendaryGems: { boss: "wreath-of-lightning" },
      normalGems: { armor: Array(5).fill("flawless-royal-diamond") },
      statPriorities: { global: ["25%移速上限", "冷却缩减", "天堂之拳技能伤", "范围伤害"], endgame: ["移速链完整", "词缀优先移速与拾取范围", "不为坚韧牺牲赶路"] },
    },
    sourceRefs: [PONY_SOURCES.speed, PONY_SOURCES.gear], reviewedAt: "2026-08-16",
  },
  {
    id: "push-low", label: "低巅峰大秘境≤110速刷", content: "greater-rift-speed", paragonBand: "low", applicability: "supported",
    reason: "大秘境不掉金币，金币链失效；改穿警戒腰带压缩冷却、萃取天鹰胸甲提供稳定减伤，戒指换乔丹与全能法戒，宝石用困者/贼神/强者，第4槽用焚炉快速处理精英。",
    patch: {
      gear: { belt: "pony-vigilante", ring1: "pony-soj", ring2: "pony-coe" },
      powers: { armor: "pony-aquila", season: "pony-furnace" },
      legendaryGems: { control: "bane-of-the-trapped", channeling: "zei", boss: "bane-of-the-powerful" },
      follower: { items: ["不死圣物"], skills: ["冷却增强", "充能"] },
      statPriorities: { global: ["天堂之拳技能伤", "神圣元素伤", "精英伤", "冷却缩减"], survival: ["天鹰减伤覆盖", "力量", "体能"] },
      rotation: PONY_PUSH_ROTATION,
    },
    sourceRefs: [PONY_SOURCES.gear, PONY_SOURCES.overview], reviewedAt: "2026-08-16",
  },
  {
    id: "push-high", label: "高巅峰大秘境≤110速刷", content: "greater-rift-speed", paragonBand: "high", applicability: "supported",
    reason: "高巅峰由巅峰承担主属性后，护甲宝石换钻石压缩冷却，第4槽换团结配合随从分摊伤害，应对接近110层的生存需求。",
    patch: {
      gear: { belt: "pony-vigilante", ring1: "pony-soj", ring2: "pony-coe" },
      powers: { armor: "pony-aquila", season: "pony-unity" },
      legendaryGems: { control: "bane-of-the-trapped", channeling: "zei", boss: "bane-of-the-powerful" },
      normalGems: { armor: Array(5).fill("flawless-royal-diamond") },
      follower: { items: ["团结", "不死圣物"], skills: ["冷却增强", "充能"] },
      statPriorities: { global: ["天堂之拳技能伤", "神圣元素伤", "冷却缩减", "范围伤害"], survival: ["团结分摊覆盖", "全元素抗性"], endgame: ["词缀洗力量换范围伤", "冷却达标后继续压缩"] },
      rotation: PONY_PUSH_ROTATION,
    },
    sourceRefs: [PONY_SOURCES.gear, PONY_SOURCES.overview], reviewedAt: "2026-08-16",
  },
];

const PONY_PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "超过25%的巅峰移速无效，先扣除鞋子现有词缀。" },
      { stat: "力量", target: "其余点数", reason: "同时提高伤害和护甲，是默认投入。" },
      { stat: "体能", target: "生存不足时临时投入", reason: "低巅峰被秒时先换容错，稳定后再归还力量。" },
      { stat: "圣怒上限", target: "0点", reason: "天拳消耗低，挑衅与减耗已能维持资源。" },
    ],
    offense: [
      { stat: "冷却缩减", target: "优先点满", reason: "先稳定战马、变身与律法的空档。" },
      { stat: "暴击几率", target: "第二点满", reason: "提升落雷与强者/困者宝石收益。" },
      { stat: "暴击伤害", target: "第三点满", reason: "与暴击几率共同成长。" },
      { stat: "攻击速度", target: "最后点满", reason: "收益低于前三项且不直接改变自动落雷。" },
    ],
    defense: [
      { stat: "全元素抗性", target: "优先点满", reason: "力量职业自带护甲，更缺全抗。" },
      { stat: "生命%", target: "第二点满", reason: "扩大减伤后的有效生命。" },
      { stat: "护甲", target: "第三点满", reason: "补充已有力量护甲。" },
      { stat: "生命恢复", target: "最后点满", reason: "只作持续恢复补充。" },
    ],
    utility: [
      { stat: "能量消耗降低", target: "优先点满", reason: "天鹰减伤与连续天拳都依赖高位圣怒。" },
      { stat: "范围伤害", target: "第二点满", reason: "落雷清屏受益于范围伤。" },
      { stat: "击中回复生命", target: "第三点满", reason: "连续命中时提供稳定治疗。" },
      { stat: "金币拾取范围", target: "最后点满", reason: "主要服务T16、蓝门与悬赏的金币链。" },
    ],
  },
  post800: [
    { priority: "力量", when: "默认与速刷", reason: "持续提供伤害和护甲。" },
    { priority: "体能", when: "大秘境被单次技能击杀", reason: "只补到能稳定承受当前层数，再继续力量。" },
  ],
  checkpoints: [
    { label: "刚到70级", target: "25%移速+冷却优先", action: "先让战马少空档、变身少断档。" },
    { label: "巅峰800", target: "四页关键项目点满", action: "红宝石和力量词缀承担伤害，保留体能。" },
    { label: "巅峰2000+", target: "范围伤、冷却与词缀", action: "力量由巅峰承担后，装备转向范围伤、冷却与移速拾取。" },
  ],
};

const PONY_CHOICE_POLICIES: BuildChoicePolicy[] = [
  { key: "valor-norvald-core", targetType: "gear", targetId: "norvald-flail", label: "勇气壁垒六件、诺瓦德两件与黑暗之光", status: "locked", reason: "六件勇气提供天堂之拳20,000%增伤，诺瓦德让战马结束提供独立增伤窗，黑暗之光把一发落雷复制成多发；三者缺一就不是完整跑马天拳。" },
  { key: "gold-chain", targetType: "gear", targetId: "pony-avarice", label: "金币链（金织带 + 囤宝者 + 贪婪之戒）", status: "conditional", reason: "T16、蓝门与悬赏都掉金币，金币链提供移速、拾取与近乎无限的护甲；大秘境不掉金币，必须换回天鹰减伤与精英增伤。", alternatives: [{ id: "pony-aquila", label: "天鹰胸甲减伤", when: "大秘境速刷", gain: "稳定减伤，不依赖金币", cost: "失去金币护甲与移速", scenarios: ["push-low", "push-high"] }] },
  { key: "belt-slot", targetType: "gear", targetId: "pony-goldwrap-gear", label: "腰带槽", status: "conditional", reason: "速刷内容用金织带建立金币护甲；大秘境不掉金币改穿警戒腰带压缩冷却；追求天拳上限可换正义灯塔腰带。", alternatives: [{ id: "pony-vigilante", label: "警戒腰带", when: "大秘境速刷，需要稳定冷却压缩战马与变身空档", gain: "不依赖金币的常驻CDR", cost: "失去金币护甲，由天鹰补减伤", scenarios: ["push-low", "push-high"] }, { id: "pony-khasset", label: "正义灯塔腰带", when: "追求天拳单发上限、放弃移速或金币链", gain: "天堂之拳减耗与大幅增伤", cost: "失去警戒CDR或金织带护甲", incompatibleWith: ["pony-goldwrap-gear"] }] },
  { key: "rings", targetType: "gear", targetId: "pony-rechel", label: "戒指组合", status: "conditional", reason: "速刷用瑞秋戒触发恐惧移速、贪婪之戒扩展金币拾取；大秘境改穿乔丹之石与全能法戒，把稳定精英伤和元素爆发还给角色。", alternatives: [{ id: "pony-soj", label: "乔丹之石", when: "大秘境速刷，需要稳定精英伤", gain: "稳定神圣元素与精英增伤", cost: "失去恐惧移速", scenarios: ["push-low", "push-high"] }, { id: "pony-coe", label: "全能法戒", when: "大秘境速刷且愿意等待神圣周期", gain: "元素爆发窗", cost: "需要等待元素，不等则收益下降", scenarios: ["push-low", "push-high"] }] },
  { key: "season-slot", targetType: "power", targetId: "pony-ingeom", label: "第39赛季第四槽", status: "conditional", reason: "速刷内容精英密集，寅剑击杀精英后重置冷却实现连续骑马；大秘境用焚炉稳定精英增伤，高巅峰尝试接近110层可换团结提容错。", alternatives: [{ id: "pony-furnace", label: "焚炉", when: "大秘境速刷快速处理精英与首领", gain: "稳定精英增伤", cost: "失去寅剑的击杀冷却重置", scenarios: ["push-low"] }, { id: "pony-unity", label: "团结", when: "高巅峰尝试接近110层，且随从佩戴团结与不死饰品", gain: "与随从分摊伤害", cost: "失去精英增伤或击杀冷却", scenarios: ["push-high"] }] },
  { key: "armor-cube", targetType: "power", targetId: "pony-vigilante-power", label: "防具萃取", status: "conditional", reason: "速刷萃取警戒腰带补CDR；大秘境萃取天鹰胸甲补稳定减伤。", alternatives: [{ id: "pony-aquila", label: "天鹰胸甲", when: "大秘境速刷", gain: "高位圣怒时稳定减伤", cost: "失去警戒腰带的CDR", scenarios: ["push-low", "push-high"] }] },
  { key: "third-gem", targetType: "legendary-gem", targetId: "gogok", label: "速刷传奇宝石", status: "conditional", reason: "内容决定金币移速、攻速冷却或伤害补强；大秘境还困者与强者，速刷还囤宝者。", alternatives: [{ id: "boon-of-the-hoarder", label: "囤宝者的恩惠", when: "T16、蓝门与悬赏", gain: "金币与移动速度，并启动金织带", cost: "大秘境不掉金币，无法工作", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-low", "speed-high"] }, { id: "wreath-of-lightning", label: "闪电华冠", when: "高巅峰速刷伤害已溢出", gain: "25级效果提供额外移动速度", cost: "失去迅捷勾玉的攻速冷却", scenarios: ["speed-high"] }, { id: "bane-of-the-powerful", label: "强者之灾", when: "大秘境速刷", gain: "击杀精英后稳定增伤", cost: "大秘境首领战收益下降", scenarios: ["push-low", "push-high"] }] },
  { key: "follower", targetType: "follower", targetId: "enchantress", label: "随从选择", status: "flexible", reason: "魔女固定提供冷却与远程控场；速刷随从戴贪婪之戒扩大拾取，大秘境戴不死圣物保命，高巅峰换团结与角色分摊。" },
];

const VALOR_FIST_REVIEWED_GUIDE: BuildGuide = {
  ...VALOR_FIST_BASE_GUIDE,
  configurationBase: VALOR_FIST_CONFIGURATION_BASE,
  defaultMode: "push",
  defaultScenarioId: "push-low",
  scenarios: VALOR_FIST_SCENARIOS,
  paragonGuide: VALOR_FIST_PARAGON,
  choicePolicies: VALOR_FIST_CHOICE_POLICIES,
  pushNote: "穿戴诺瓦德两件、萃取黑暗之光；围绕战马结束后的增伤窗和闪电周期打天堂之拳。",
  speedNote: "T16、蓝门和悬赏切金币链、瑞秋戒、沃兹克和寅剑；低层大秘境可用强者替受罚者。",
  lowNote: "先保证勇气六件、诺瓦德两件、黑暗之光、正义灯塔和天堂之力被动正确成立。",
  highNote: "高巅峰把护甲宝石换钻石，冲层追范围伤/精英伤，速刷追冷却、移速和拾取范围。",
  reviewStatus: "fully-reviewed",
  variantCompleteness: "complete",
};

const VALOR_FIST_VALIDATION_ERRORS = validateReviewedBuildGuide(VALOR_FIST_REVIEWED_GUIDE);
if (VALOR_FIST_VALIDATION_ERRORS.length > 0) throw new Error(`勇气天拳配置校验失败：${VALOR_FIST_VALIDATION_ERRORS.join("；")}`);

const VALOR_FURY_SOURCES = {
  overview: "https://www.icy-veins.com/d3/crusader-aegis-of-valor-heavens-fury-build",
  skills: "https://www.icy-veins.com/d3/aegis-of-valor-heavens-fury-crusader-skills-and-runes",
  gear: "https://www.icy-veins.com/d3/aegis-of-valor-heavens-fury-crusader-bis-gear-gems-paragon-points",
  speed: "https://www.icy-veins.com/d3/aegis-of-valor-heavens-fury-crusader-speed-farming-build",
  season: "https://www.icy-veins.com/forums/topic/87828-diablo-3-season-39-preview/",
};

const VALOR_FURY_ROTATION = [
  { title: "变身起手", action: "进图先开启阿卡拉特勇士，之后靠黄道和高冷却尽量常驻。", reason: "先知化身提供护甲、回怒和容错，断档会同时丢掉输出节奏与防线。" },
  { title: "天拳充能", action: "对高密度怪群施放天堂之拳，保持勇气六件层数和黄道刷新。", reason: "天堂之拳不是主伤害，但它维持套装、资源和冷却循环。" },
  { title: "控场定位", action: "神圣周期前用盾牌猛击致盲精英，并用战马调整到射线能持续命中的角度。", reason: "愤怒护腕只放大被目盲、定身或昏迷的目标，天堂之怒需要持续压住同一敌人。" },
  { title: "神圣射线", action: "神圣周期内连续施放天堂之怒，不要频繁换目标。", reason: "妖邪必败给三道射线，愤怒之盾对同一目标叠层，二者都惩罚断射线。" },
  { title: "重建窗口", action: "元素窗结束后回到天拳充能和走位，等下一轮神圣周期再爆发。", reason: "低倍率阶段保资源和冷却，比硬打空圣怒更稳定。" },
];

const VALOR_FURY_SPEED_ROTATION = [
  { title: "预热变身", action: "开启阿卡拉特勇士和希望律法，战马进第一组精英。", reason: "速刷把律法从攻速减耗改成移速穿怪，目标是缩短找怪时间。" },
  { title: "单屏天拳", action: "每屏点一两发天堂之拳维持勇气层数和回怒。", reason: "T16和低层大秘境不需要完整站桩循环，天拳足够补套装和清杂兵。" },
  { title: "下马射线", action: "精英前结束战马，用盾牌猛击致盲后短时间天堂之怒秒掉大目标。", reason: "诺瓦德增伤窗、愤怒护腕和愤怒之盾仍是处理精英的核心。" },
  { title: "拾金续防", action: "沿路拾取金币，保持贪婪之戒、金织带和囤宝者链路。", reason: "掉金币内容里金币链同时解决拾取范围、移速和坚韧。" },
  { title: "继续赶路", action: "精英死亡后立即战马转场，不为残血小怪等待神圣周期。", reason: "速刷收益来自连续移动和精英击杀，而不是完整元素窗。" },
];

const VALOR_FURY_SEED = seeds.find((seed) => seed.id === "valor-fury")!;
const VALOR_FURY_BASE_GUIDE = createClassGuide({
  ...VALOR_FURY_SEED,
  gear: [
    ...VALOR_FURY_SEED.gear,
    valor[4],
    legendary("fury-norvald-flail", "主手", "冲锋连枷", "flail-of-the-charge-p4_unique_flail_2h_set_01_x1.png", "与战马之盾组成诺瓦德两件，战马结束后提供天堂之怒爆发窗。", { quality: "set", base: "双手连枷" }),
    legendary("fury-steed-shield", "副手", "战马之盾", "shield-of-the-steed-p4_unique_shield_set_01_x1.png", "诺瓦德副手；第39赛季让愤怒之盾放第四魔方槽，因此这里穿戴战马盾。", { quality: "set", base: "圣教军盾", warning: "黄装升级必须用70级“圣教军盾”；普通盾牌不会产出战马之盾。" }),
    legendary("fury-gloves-worship", "手部", "礼赞手套", "gloves-of-worship-unique_gloves_103_x1.png", "延长祭坛效果；速刷用皇家华戒维持勇气六件后腾出的功能手套。"),
    legendary("fury-squirt", "颈部", "斯奎特的项链", "squirts-necklace-p66_unique_amulet_010.png", "伤害溢出速刷时用金币链和走位保护层数。", { gem: "trapped" }),
    legendary("fury-soj", "手指", "乔丹之石", "stone-of-jordan-p69_unique_ring_019.png", "提供稳定神圣元素伤和精英伤，速刷不等待全能周期。", { gem: "powerful" }),
    legendary("fury-avarice", "手指", "贪婪之戒", "avarice-band-unique_ring_108_x1.png", "拾金扩大拾取范围，连接囤宝者与金织带。", { gem: "hoarder" }),
    legendary("fury-goldwrap", "腰部", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后获得巨量护甲；T16、蓝门和悬赏生效，大秘境冲层不用。", { warning: "大秘境不掉金币，金织带防线会失效。" }),
  ],
  skills: [
    ...VALOR_FURY_SEED.skills,
    skill("shield-glare", "盾牌猛击", "神圣裁决", "致盲精英并放大其承受伤害，是愤怒护腕的可靠触发器。"),
    skill("steed-charge", "战马冲锋", "恢复", "调整站位、穿越危险地板，并触发诺瓦德爆发窗。"),
    skill("laws-of-hope", "希望律法", "天使之翼", "速刷提供移速和穿怪，替换冲层勇气律法。"),
  ],
  passives: [
    ...VALOR_FURY_SEED.passives,
    passive("heavenly-strength", "天堂之力", "允许双手连枷与盾牌同时装备，是第39赛季诺瓦德版本的必要被动。"),
    passive("long-arm-of-the-law", "律法无边", "延长律法主动效果；冲层延长减耗，速刷延长希望律法移速。"),
    passive("lord-commander", "统御者", "缩短战马冲锋冷却，提高诺瓦德窗口和转场频率。"),
  ],
  powers: [
    ...VALOR_FURY_SEED.powers,
    power("fury-fate-power", "武器", "妖邪必败", "fate-of-the-fell-p61_unique_flail_2h_103_x1.png", "天堂之怒额外生成两道射线并提高伤害。", "穿戴诺瓦德两件后，妖邪必败必须放入魔方来保留三射线核心。", "黄装升级：70级双手连枷。"),
    power("fury-shield-power", "第4槽", "愤怒之盾", "shield-of-fury-p61_unique_shield_106_x1.png", "天堂之怒持续命中同一敌人时叠加伤害。", "第39赛季第四槽让诺瓦德两件与愤怒之盾同时成立。", "黄装升级：70级圣教军盾。"),
    power("fury-warzechian-power", "防具", "沃兹克护腕", "warzechian-armguards-unique_bracer_101_x1.png", "破坏物后获得移速。", "天堂之怒和天堂之拳的范围伤会沿路稳定触发速刷移速。"),
    power("fury-nemesis-power", "防具", "复仇者护腕", "nemesis-bracers-unique_bracer_106_x1.png", "点击祭坛和水晶塔额外召唤精英。", "组队或随从不带复仇者时才自己萃取；单人优先让随从散发。"),
  ],
  links: [
    { title: "第39赛季诺瓦德链", category: "movement", conclusion: "第四魔方槽放愤怒之盾后，身上必须穿诺瓦德两件才有战马爆发窗。", steps: [["fury-norvald-flail", "冲锋连枷", "穿戴主手"], ["fury-steed-shield", "战马之盾", "穿戴副手"], ["steed-charge", "战马结束", "建立增伤"], ["heavens-fury", "天堂之怒", "在窗口内爆发"]] },
    { title: "圣光霰弹链", category: "damage", conclusion: "天堂之怒的主伤害来自三射线、控制乘区和同目标叠层。", steps: [["fate-fell", "妖邪必败", "三道射线"], ["shield-glare", "盾牌猛击", "致盲与易伤"], ["fury-bracer", "愤怒护腕", "放大受控目标"], ["fury-shield-power", "愤怒之盾", "同目标叠伤"]] },
    { title: "天拳维持链", category: "resource", conclusion: "天堂之拳负责套装层数、回怒和黄道冷却，不是这套的伤害终点。", steps: [["fist-of-the-heavens", "天堂之拳", "维持勇气层数"], ["zodiac", "黄道戒", "刷新冷却"], ["aquila", "天鹰胸甲", "高圣怒减伤"], ["akarats-champion", "阿卡拉特勇士", "常驻攻防"]] },
    { title: "速刷金币链", category: "defense", conclusion: "T16、蓝门与悬赏掉金币，囤宝者、贪婪之戒与金织带才同时成立。", steps: [["fury-avarice", "贪婪之戒", "扩大拾取"], ["fury-goldwrap", "金织带", "拾金叠护甲"], ["boon-of-the-hoarder", "囤宝者", "制造金币"], ["fury-warzechian-power", "沃兹克", "破坏物加速"]] },
  ],
  rotation: VALOR_FURY_ROTATION,
});

const VALOR_FURY_CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "valor-head", shoulders: "valor-shoulders", chest: "valor-chest", gloves: "valor-gloves",
    bracers: "fury-bracer", belt: "crimson-belt", pants: "crimson-pants", boots: "valor-boots",
    amulet: "travelers-pledge", ring1: "compass-rose", ring2: "coe", weapon: "fury-norvald-flail", offhand: "fury-steed-shield",
  },
  skills: [
    { id: "heavens-fury", rune: "天堂火光" }, { id: "fist-of-the-heavens", rune: "裂隙" },
    { id: "laws-of-valor", rune: "势不可挡" }, { id: "shield-glare", rune: "神圣裁决" },
    { id: "steed-charge", rune: "恢复" }, { id: "akarats-champion", rune: "先知化身" },
  ],
  passives: ["heavenly-strength", "holy-cause", "long-arm-of-the-law", "finery"],
  powers: { weapon: "fury-fate-power", armor: "aquila", jewelry: "royal-grandeur", season: "fury-shield-power" },
  legendaryGems: { control: "bane-of-the-trapped", cooldown: "gogok", boss: "bane-of-the-stricken" },
  normalGems: {
    head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-ruby"),
    weapon: ["flawless-royal-emerald"],
  },
  follower: { id: "enchantress", items: ["不死圣物", "复仇者护腕"], skills: ["冷却增强", "充能"] },
  statPriorities: {
    global: ["天堂之怒技能伤", "神圣元素伤", "冷却缩减", "范围伤害"],
    survival: ["天鹰减伤覆盖", "阿卡拉特勇士常驻", "力量", "体能"],
    endgame: ["愤怒之盾高特效", "妖邪必败高特效", "盾牌暴击/冷却/天堂之怒"],
  },
  rotation: VALOR_FURY_ROTATION,
};

const VALOR_FURY_SCENARIOS: BuildScenario[] = [
  {
    id: "push-low", label: "低巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "low", applicability: "supported",
    reason: "低巅峰冲层以诺瓦德穿戴、勇气五件+船长两件+皇家华戒、妖邪必败萃取和第四槽愤怒之盾为核心；红宝石补力量与护甲，受罚者处理首领。",
    unchangedReason: "基础配置就是低巅峰冲层入口。",
    sourceRefs: [VALOR_FURY_SOURCES.overview, VALOR_FURY_SOURCES.skills, VALOR_FURY_SOURCES.gear, VALOR_FURY_SOURCES.season], reviewedAt: "2026-08-22",
  },
  {
    id: "push-high", label: "高巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "high", applicability: "supported",
    reason: "高巅峰由巅峰承担主属性后，护甲宝石换钻石补抗性；词缀优先范围伤和高特效，操作上更严格围绕神圣周期与同目标叠层。",
    patch: {
      normalGems: { armor: Array(5).fill("flawless-royal-diamond") },
      statPriorities: { global: ["天堂之怒技能伤", "神圣元素伤", "范围伤害", "冷却缩减"], survival: ["全元素抗性", "神圣周期前保钢铁/变身空档"], endgame: ["装备力量可洗范围伤", "愤怒之盾接近满特效", "精英伤与减耗阈值"] },
    },
    sourceRefs: [VALOR_FURY_SOURCES.overview, VALOR_FURY_SOURCES.gear], reviewedAt: "2026-08-22",
  },
  {
    id: "speed-low", label: "低巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "low", applicability: "supported",
    reason: "掉金币内容伤害和坚韧门槛低，改用礼赞手套、金织带、斯奎特、乔丹、贪婪之戒和金币宝石；防具萃取沃兹克护腕，保留诺瓦德与愤怒之盾处理精英。",
    patch: {
      gear: { gloves: "fury-gloves-worship", belt: "fury-goldwrap", pants: "valor-pants", amulet: "fury-squirt", ring1: "fury-soj", ring2: "fury-avarice" },
      skills: [
        { id: "heavens-fury", rune: "天堂火光" }, { id: "fist-of-the-heavens", rune: "裂隙" },
        { id: "laws-of-hope", rune: "天使之翼" }, { id: "shield-glare", rune: "神圣裁决" },
        { id: "steed-charge", rune: "持久" }, { id: "akarats-champion", rune: "先知化身" },
      ],
      passives: ["heavenly-strength", "lord-commander", "long-arm-of-the-law", "finery"],
      powers: { armor: "fury-warzechian-power" },
      legendaryGems: { control: "bane-of-the-trapped", cooldown: "boon-of-the-hoarder", boss: "bane-of-the-powerful" },
      follower: { items: ["贪婪之戒", "复仇者护腕", "不死圣物"], skills: ["冷却增强", "充能"] },
      statPriorities: { global: ["25%移速上限", "拾取范围", "天堂之怒技能伤", "冷却缩减"], survival: ["金币链覆盖", "力量", "体能"], endgame: ["祭坛时间延长", "不等待完整神圣周期"] },
      rotation: VALOR_FURY_SPEED_ROTATION,
    },
    sourceRefs: [VALOR_FURY_SOURCES.speed, VALOR_FURY_SOURCES.season], reviewedAt: "2026-08-22",
  },
  {
    id: "speed-high", label: "高巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "high", applicability: "supported",
    reason: "高巅峰速刷伤害溢出后继续使用金币链和礼赞手套，第三宝石可换闪电华冠补移速；护甲钻石提高全抗，词缀转向移动、拾取和范围伤。",
    patch: {
      gear: { gloves: "fury-gloves-worship", belt: "fury-goldwrap", pants: "valor-pants", amulet: "fury-squirt", ring1: "fury-soj", ring2: "fury-avarice" },
      skills: [
        { id: "heavens-fury", rune: "天堂火光" }, { id: "fist-of-the-heavens", rune: "裂隙" },
        { id: "laws-of-hope", rune: "天使之翼" }, { id: "shield-glare", rune: "神圣裁决" },
        { id: "steed-charge", rune: "持久" }, { id: "akarats-champion", rune: "先知化身" },
      ],
      passives: ["heavenly-strength", "lord-commander", "long-arm-of-the-law", "finery"],
      powers: { armor: "fury-warzechian-power" },
      legendaryGems: { control: "bane-of-the-trapped", cooldown: "boon-of-the-hoarder", boss: "wreath-of-lightning" },
      normalGems: { armor: Array(5).fill("flawless-royal-diamond") },
      follower: { items: ["贪婪之戒", "复仇者护腕", "不死圣物"], skills: ["冷却增强", "充能"] },
      statPriorities: { global: ["25%移速上限", "拾取范围", "冷却缩减", "范围伤害"], survival: ["金币链覆盖", "全元素抗性"], endgame: ["伤害溢出后不追受罚者层数", "优先连续战马转场"] },
      rotation: VALOR_FURY_SPEED_ROTATION,
    },
    sourceRefs: [VALOR_FURY_SOURCES.speed, VALOR_FURY_SOURCES.gear], reviewedAt: "2026-08-22",
  },
];

const VALOR_FURY_PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "先扣除鞋子词缀，战马空档和站位调整都吃移速。" },
      { stat: "力量", target: "其余点数", reason: "同时提高天堂之怒伤害和护甲。" },
      { stat: "体能", target: "被秒或破盾时临时投入", reason: "低巅峰先保证能活到下一轮神圣周期。" },
      { stat: "圣怒上限", target: "0点", reason: "天拳回怒、船长减耗和律法比上限更关键。" },
    ],
    offense: [
      { stat: "冷却缩减", target: "优先点满", reason: "变身、战马、盾牌猛击和律法都依赖冷却覆盖。" },
      { stat: "暴击几率", target: "第二点满", reason: "天堂之怒和盾牌暴击词缀共同放大输出。" },
      { stat: "暴击伤害", target: "第三点满", reason: "与暴击几率成对成长。" },
      { stat: "攻击速度", target: "最后点满", reason: "收益低于冷却与双暴，且资源压力更明显。" },
    ],
    defense: [
      { stat: "全元素抗性", target: "优先点满", reason: "力量职业护甲高，先补抗性短板。" },
      { stat: "生命%", target: "第二点满", reason: "扩大天鹰和先知化身后的有效生命。" },
      { stat: "护甲", target: "第三点满", reason: "补充已有力量护甲。" },
      { stat: "生命恢复", target: "最后点满", reason: "只作小额续航。" },
    ],
    utility: [
      { stat: "能量消耗降低", target: "优先点满", reason: "连续天堂之怒和天鹰减伤都需要圣怒维持高位。" },
      { stat: "范围伤害", target: "第二点满", reason: "高密度冲层和精英周围溅射都有收益。" },
      { stat: "击中回复生命", target: "第三点满", reason: "射线和天拳命中频率高，提供稳定恢复。" },
      { stat: "金币拾取范围", target: "最后点满", reason: "只在金币链速刷中是关键效率属性。" },
    ],
  },
  post800: [
    { priority: "力量", when: "默认", reason: "持续提供伤害与护甲。" },
    { priority: "体能", when: "冲层无法稳定吃下一次精英技能", reason: "只补到能守住爆发窗，再继续力量。" },
  ],
  checkpoints: [
    { label: "刚成型", target: "诺瓦德两件、妖邪必败、愤怒之盾和愤怒护腕", action: "先确认第四槽愤怒之盾与穿戴诺瓦德同时成立。" },
    { label: "巅峰800", target: "冷却、减耗和受罚者", action: "变身不断档后开始围绕神圣周期和同目标叠层。" },
    { label: "巅峰2000+", target: "范围伤、钻石和高特效", action: "装备力量逐步让给范围伤，速刷转向拾取和移速。" },
  ],
};

const VALOR_FURY_CHOICE_POLICIES: BuildChoicePolicy[] = [
  { key: "valor-fury-core", targetType: "gear", targetId: "fury-norvald-flail", label: "勇气五件、船长两件、诺瓦德两件", status: "locked", reason: "第39赛季第四槽能放愤怒之盾，因此主手/副手穿诺瓦德两件，配皇家华戒维持勇气六件和船长三件；若改穿妖邪必败或愤怒之盾，会丢掉诺瓦德爆发窗。" },
  { key: "season-shield", targetType: "power", targetId: "fury-shield-power", label: "第四魔方槽愤怒之盾", status: "locked", reason: "愤怒之盾必须和妖邪必败、愤怒护腕同时存在，才能让天堂之怒对同一目标持续叠层；第39赛季第四槽正好解决穿戴诺瓦德后的盾牌冲突。" },
  { key: "control-skill", targetType: "skill", targetId: "shield-glare", label: "盾牌猛击", status: "locked", reason: "愤怒护腕只对目盲、定身或昏迷目标增伤；盾牌猛击神圣裁决既触发护腕也提供易伤，不能被纯防御技能随意替换。" },
  { key: "passive-weapon-rule", targetType: "passive", targetId: "heavenly-strength", label: "天堂之力", status: "locked", reason: "穿双手连枷和圣教军盾必须携带天堂之力；速刷页旧式热忱只适用于单手武器版本，不适用于本赛季诺瓦德版本。" },
  { key: "armor-cube", targetType: "power", targetId: "aquila", label: "防具萃取", status: "conditional", reason: "冲层用天鹰胸甲补稳定减伤；T16、蓝门和悬赏改沃兹克护腕提高移动速度；组队或随从不能散发复仇者时才用复仇者护腕。", alternatives: [{ id: "fury-warzechian-power", label: "沃兹克护腕", when: "掉金币速刷，需要破坏物移速", gain: "沿路自动加速", cost: "失去天鹰减伤", scenarios: ["speed-low", "speed-high"] }, { id: "fury-nemesis-power", label: "复仇者护腕", when: "组队或随从不带复仇者", gain: "更多精英和祭坛价值", cost: "失去天鹰或沃兹克", incompatibleWith: ["fury-warzechian-power"] }] },
  { key: "speed-jewelry", targetType: "gear", targetId: "travelers-pledge", label: "首饰组合", status: "conditional", reason: "冲层用无尽之途和全能法戒打站桩神圣周期；速刷换斯奎特、乔丹和贪婪之戒，追求稳定精英伤、拾取范围和移动效率。", alternatives: [{ id: "fury-squirt", label: "斯奎特的项链", when: "速刷伤害和金币护甲足以保层", gain: "更高常驻增伤", cost: "受击会掉层", scenarios: ["speed-low", "speed-high"] }, { id: "fury-soj", label: "乔丹之石", when: "速刷不等待全能周期", gain: "稳定元素伤和精英伤", cost: "失去全能爆发", scenarios: ["speed-low", "speed-high"] }, { id: "fury-avarice", label: "贪婪之戒", when: "掉金币内容", gain: "扩大拾取并续金织带", cost: "大秘境冲层无金币支持", scenarios: ["speed-low", "speed-high"] }] },
  { key: "speed-belt", targetType: "gear", targetId: "crimson-belt", label: "腰带槽", status: "conditional", reason: "冲层保船长腰带让冷却和减耗转攻防；掉金币速刷换金织带，配囤宝者和贪婪之戒把坚韧问题交给金币链。", alternatives: [{ id: "fury-goldwrap", label: "金织带", when: "T16、蓝门与悬赏", gain: "拾金后近乎无限护甲", cost: "失去船长三件攻防转换，大秘境无金币失效", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-low", "speed-high"] }] },
  { key: "third-gem", targetType: "legendary-gem", targetId: "bane-of-the-stricken", label: "传奇宝石", status: "conditional", reason: "冲层用受罚者处理首领；速刷改强者提高精英后续，伤害溢出后再用闪电华冠补移速，并用囤宝者启动金币链。", alternatives: [{ id: "bane-of-the-powerful", label: "强者之灾", when: "低层速刷仍需要稳定精英增伤", gain: "击杀精英后稳定增伤减伤", cost: "首领叠层弱于受罚者", scenarios: ["speed-low"] }, { id: "wreath-of-lightning", label: "闪电华冠", when: "高巅峰速刷伤害溢出", gain: "额外移动速度", cost: "失去强者增伤", scenarios: ["speed-high"] }, { id: "boon-of-the-hoarder", label: "囤宝者的恩惠", when: "掉金币内容", gain: "金币、移速和金织带护甲", cost: "大秘境不掉金币", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-low", "speed-high"] }] },
  { key: "follower", targetType: "follower", targetId: "enchantress", label: "随从", status: "flexible", reason: "魔女冷却、攻速和远程控制最契合天堂之怒；单人速刷让随从带复仇者护腕和贪婪之戒，冲层保不死圣物。" },
];

const VALOR_FURY_REVIEWED_GUIDE: BuildGuide = {
  ...VALOR_FURY_BASE_GUIDE,
  configurationBase: VALOR_FURY_CONFIGURATION_BASE,
  defaultMode: "push",
  defaultScenarioId: "push-low",
  scenarios: VALOR_FURY_SCENARIOS,
  paragonGuide: VALOR_FURY_PARAGON,
  choicePolicies: VALOR_FURY_CHOICE_POLICIES,
  pushNote: "穿戴诺瓦德两件、萃取妖邪必败和愤怒之盾；神圣周期前用盾牌猛击触发愤怒护腕，再用天堂之怒持续压同一目标。",
  speedNote: "T16、蓝门和悬赏换礼赞手套、金织带、斯奎特、乔丹、贪婪之戒、囤宝者和沃兹克；仍保留诺瓦德+愤怒之盾处理精英。",
  lowNote: "先确认勇气五件、船长两件、皇家华戒、诺瓦德两件、妖邪必败和愤怒之盾都同时成立。",
  highNote: "高巅峰冲层追范围伤、冷却、神圣元素和高特效盾牌；速刷把词缀转向拾取、移速和连续战马。",
  reviewStatus: "fully-reviewed",
  variantCompleteness: "complete",
};

const VALOR_FURY_VALIDATION_ERRORS = validateReviewedBuildGuide(VALOR_FURY_REVIEWED_GUIDE);
if (VALOR_FURY_VALIDATION_ERRORS.length > 0) throw new Error(`勇气天堂之怒配置校验失败：${VALOR_FURY_VALIDATION_ERRORS.join("；")}`);

const AKKHAN_CONDEMN_SOURCES = {
  overview: "https://www.icy-veins.com/d3/crusader-akkhan-condemn-build",
  skills: "https://www.icy-veins.com/d3/akkhan-condemn-crusader-skills-and-runes",
  gear: "https://www.icy-veins.com/d3/akkhan-condemn-crusader-bis-gear-gems-paragon-points",
  greaterRiftSpeed: "https://www.icy-veins.com/d3/akkhan-condemn-crusader-speed-farming-build",
  t16Speed: "https://www.icy-veins.com/d3/akkhan-condemn-crusader-nephalem-rift-speed-farming-build",
};

const AKKHAN_CONDEMN_PUSH_ROTATION = [
  { title: "维持变身", action: "进入战斗前开启阿卡拉特勇士，并在冷却结束前补开。", reason: "阿克汉套的攻防和圣怒回复都以变身为前提。" },
  { title: "召唤弓手", action: "先放圣军之阵：弓手，保持弓手数量和攻击不断。", reason: "弓手是触发天谴的执行者，不是可有可无的附带技能。" },
  { title: "标记怪群", action: "对精英与高密度怪群连续施放审判。", reason: "阿克汉让审判获得所有符文；被标记目标才会吃到弓手触发的天谴。" },
  { title: "维持律法", action: "在集中输出与圣怒压力出现时开启势不可挡。", reason: "天谴每次消耗40点圣怒，律法减耗使持续标记与爆炸不容易断。" },
  { title: "首领站位", action: "让弓手持续命中首领，并保持审判覆盖。", reason: "侍从宝石、困者与受罚者在长时间单目标阶段一起发挥作用。" },
];

const AKKHAN_CONDEMN_SPEED_ROTATION = [
  { title: "开变身上马", action: "开启阿卡拉特勇士和希望律法后用战马冲锋沿主路移动。", reason: "T16效率先看转场，阿卡拉特勇士与赛季寅剑负责压缩技能空档。" },
  { title: "主动天谴", action: "看见精英或密集怪时直接施放无情爆发天谴。", reason: "速刷不依赖圣军弓手标记，弗莱德之怒让自施天谴能连续清场。" },
  { title: "保持金币链", action: "沿路线拾取金币和血球，不为零散怪停留。", reason: "囤宝者、贪婪之戒与金织带把移速、拾取范围和护甲连成一条链。" },
  { title: "精英后转场", action: "精英死亡后立即继续骑马。", reason: "寅剑和麦剑缩短冷却，不能停在已清空的区域浪费窗口。" },
];

const AKKHAN_CONDEMN_SEED = seeds.find((seed) => seed.id === "akkhan-condemn")!;
const AKKHAN_CONDEMN_BASE_GUIDE = createClassGuide({
  ...AKKHAN_CONDEMN_SEED,
  core: "审判标记 → 圣军弓手触发天谴 → 预言之刃连爆",
  summary: "冲层以审判标记怪群，让圣军弓手连续触发天谴；速刷则改为自施天谴与金币链，不把两种玩法混成一套。",
  gear: [
    ...AKKHAN_CONDEMN_SEED.gear.filter(({ id }) => !["akkhan-head", "vigilante", "travelers-pledge", "compass-rose"].includes(id)),
    legendary("kassar-helm", "头部", "卡萨的战盔", "warhelm-of-kassar-p4_unique_helm_102.png", "显著降低圣军之阵冷却，保证弓手持续在场。", { skill: "圣军之阵" }),
    legendary("crimson-belt", "腰部", "克里森船长的丝带", "captain-crimsons-silk-girdle.png", "与船长腿甲组成套装，把冷却和减耗转化为攻防。", { quality: "set", method: ["悬赏获取设计图", "铁匠锻造腰带"] }),
    legendary("crimson-pants", "腿部", "克里森船长的推裤", "captain-crimsons-thrust.png", "与船长腰带组成套装；优先冷却、减耗与坚韧转换。", { quality: "set", method: ["悬赏获取设计图", "铁匠锻造腿甲"] }),
    legendary("akkhan-talisman", "颈部", "阿克汉护符", "talisman-of-akkhan-p43_akkhanset_amulet.png", "作为阿克汉套装部件，配皇家华戒让卡萨头盔和船长两件同时成立。", { quality: "set", element: "神圣" }),
    jewelry("focus", "trapped"),
    jewelry("restraint", "stricken"),
    shield("unrelenting", "无情斗阵", "unrelenting-phalanx-p1_crushield_norm_unique_02.png", "将圣军弓手数量翻倍；让审判标记后的天谴触发密度足够高。"),
    legendary("prides-fall", "头部", "傲慢之冠", "prides-fall-unique_helm_103_x1.png", "速刷未受伤时降低资源消耗，服务自施天谴。"),
    legendary("warzechian", "腕部", "沃兹克护腕", "warzechian-armguards-unique_bracer_101_x1.png", "破坏可破坏物后提高移动速度，T16赶路用。"),
    legendary("akkhan-avarice", "手指", "贪婪之戒", "avarice-band-unique_ring_108_x1.png", "拾取金币后扩大拾取范围，连接囤宝者与金织带。", { gem: "hoarder" }),
  ],
  skills: [
    skill("justice", "正义", "正义之剑", "冲层用生成技触发克己，并在圣怒紧张时补资源。"),
    skill("judgment", "审判", "全符文", "阿克汉套让审判附带所有符文；持续标记目标才会让弓手触发天谴。"),
    skill("laws-of-valor", "勇气律法", "势不可挡", "冲层降低天谴圣怒消耗，并为弓手触发窗口提供攻速。"),
    skill("laws-of-hope", "希望律法", "天使之翼", "速刷给战马和转场补移动能力。"),
    skill("phalanx", "圣军之阵", "弓手", "冲层核心：弓手攻击审判标记目标时触发天谴。"),
    skill("condemn", "天谴", "无情爆发", "冲层由弓手触发，T16改自施无情爆发清场。"),
    skill("akarats-champion", "阿卡拉特勇士", "先知化身", "阿克汉套的常驻攻防和回圣怒开关。"),
    skill("steed-charge", "战马冲锋", "耐力", "速刷转场与连续赶路。"),
    skill("iron-skin", "钢铁之肤", "闪光之肤", "T16自施天谴版本的主动减伤与位移补充。"),
  ],
  passives: [
    passive("heavenly-strength", "天堂之力", "双手武器与圣教军盾共存时必须携带，换单手前不要误删。"),
    passive("lord-commander", "圣骑军长", "缩短战马与圣军之阵冷却，并提高圣军之阵伤害。"),
    passive("long-arm-of-the-law", "律法无边", "延长律法持续时间，降低天谴连续消耗时的操作压力。"),
    passive("finery", "宝石之力", "每颗镶嵌宝石提供力量，并按宝石数量提高坚韧。"),
  ],
  powers: [
    power("frydehr-power", "武器", "弗莱德之怒", "frydehrs-wrath-p61_crushield_norm_unique_01.png", "移除天谴冷却并提高伤害；冲层穿无情斗阵时放入武器槽。", "让弓手触发的天谴不再受冷却限制。"),
    power("unrelenting-power", "武器", "无情斗阵", "unrelenting-phalanx-p1_crushield_norm_unique_02.png", "弓手数量翻倍；可与弗莱德之怒按远古特效优劣互换萃取位。", "两面盾牌必须同时生效，才具备完整触发密度与无冷却天谴。"),
    power("tasker", "防具", "塔斯克与西奥", "tasker-and-theo-unique_gloves_003_x1.png", "提高宠物攻击速度，直接提高弓手触发天谴的频率。", "冲层的防具槽优先保障弓手攻击频率。"),
    power("goldwrap-power", "防具", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后获得巨额护甲。", "只用于掉金币的T16、悬赏和蓝门，不用于大秘境。"),
    power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求件数减少1。", "让阿克汉、船长与卡萨头盔同时成立。", "第一幕/第四幕悬赏宝箱。"),
    power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "第39赛季第四槽让冲层不牺牲双盾与皇家华戒。"),
    power("ingeom", "武器", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短冷却。", "T16连续击杀时把战马和主动技能空档压到最低。"),
    power("messerschmidt", "第4槽", "麦西穆斯之镰", "messerschmidts-reaver-p66_unique_axe_2h_011.png", "击杀敌人缩短冷却。", "第39赛季速刷第四槽补充阿卡拉特勇士和战马覆盖。"),
  ],
  links: [
    { title: "标记触发链", category: "damage", conclusion: "审判不是单纯控制：它是弓手触发天谴的开关。", steps: [["judgment", "审判全符文", "持续标记高价值目标"], ["phalanx", "圣军弓手", "攻击被标记目标"], ["condemn", "天谴", "由弓手连续触发爆炸"], ["blade-prophecy", "预言之刃", "额外爆炸处理高密度"]] },
    { title: "双盾宠物链", category: "damage", conclusion: "弗莱德之怒和无情斗阵缺一不可：前者解除冷却，后者提高触发频率。", steps: [["frydehr-power", "弗莱德之怒", "天谴无冷却"], ["unrelenting", "无情斗阵", "弓手数量翻倍"], ["tasker", "塔斯克与西奥", "弓手攻击更快"], ["enforcer", "侍从宝石", "放大宠物伤害"]] },
    { title: "速刷金币链", category: "defense", conclusion: "金币链只在掉金币内容成立，进入大秘境必须拆掉。", steps: [["boon-of-the-hoarder", "囤宝者", "制造金币与移速"], ["akkhan-avarice", "贪婪之戒", "扩大拾取范围"], ["goldwrap-power", "金织带", "拾金叠护甲"], ["ingeom", "寅剑", "精英后刷新冷却"]] },
  ],
  rotation: AKKHAN_CONDEMN_PUSH_ROTATION,
  pushNote: "冲层核心是审判标记与弓手触发；不再沿用旧版真空吸怪、自施天谴和黄道冷却循环。",
  speedNote: "T16改自施无情爆发天谴，寅剑、麦剑和金币链负责连续转场；不保留弓手双盾组件。",
  lowNote: "先做阿克汉、船长、卡萨头盔、双盾和皇家华戒的组合，再补宠物攻速与传奇宝石等级。",
  highNote: "高巅峰仍先满足冷却和1.78攻速断点，再把剩余词缀转给范围伤、神圣元素与远古特效。",
});

const AKKHAN_CONDEMN_CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "kassar-helm", shoulders: "akkhan-shoulders", chest: "akkhan-chest", gloves: "akkhan-gloves",
    bracers: "strongarm", belt: "crimson-belt", pants: "crimson-pants", boots: "akkhan-boots",
    amulet: "akkhan-talisman", ring1: "focus", ring2: "restraint", weapon: "blade-prophecy", offhand: "unrelenting",
  },
  skills: [
    { id: "justice", rune: "正义之剑" }, { id: "judgment" }, { id: "laws-of-valor", rune: "势不可挡" },
    { id: "phalanx", rune: "弓手" }, { id: "condemn", rune: "无情爆发" }, { id: "akarats-champion", rune: "先知化身" },
  ],
  passives: ["heavenly-strength", "lord-commander", "long-arm-of-the-law", "finery"],
  powers: { weapon: "frydehr-power", armor: "tasker", jewelry: "royal-grandeur", season: "furnace" },
  legendaryGems: { control: "bane-of-the-trapped", pet: "enforcer", boss: "bane-of-the-stricken" },
  normalGems: { head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-ruby"), weapon: ["flawless-royal-emerald"] },
  follower: { id: "enchantress", items: ["不死圣物", "复仇者护腕"], skills: ["冷却增强", "攻速增强"] },
  statPriorities: {
    global: ["冷却缩减", "攻击速度至1.78", "神圣元素伤", "天谴伤害"],
    survival: ["力量", "体能", "全元素抗性"],
    endgame: ["范围伤害", "预言之刃高特效", "双暴"],
  },
  rotation: AKKHAN_CONDEMN_PUSH_ROTATION,
};

const AKKHAN_CONDEMN_SCENARIOS: BuildScenario[] = [
  {
    id: "push-low", label: "低巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "low", applicability: "supported",
    reason: "用卡萨头盔、5件阿克汉、船长两件和皇家华戒维持套装；审判标记后由弓手触发天谴，双盾和宠物攻速组件优先于旧版自施天谴套路。",
    sourceRefs: [AKKHAN_CONDEMN_SOURCES.overview, AKKHAN_CONDEMN_SOURCES.skills, AKKHAN_CONDEMN_SOURCES.gear], reviewedAt: "2026-08-29",
  },
  {
    id: "push-high", label: "高巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "high", applicability: "supported",
    reason: "高巅峰冲层仍使用相同核心配置；收益来自更高宝石、远古、巅峰力量与攻速/冷却断点，而不是伪造一套装备替换。",
    unchangedReason: "当前 2.7.8 配装对低、高巅峰共用双盾弓手框架；高巅峰只调整词缀、卡德山和巅峰分配。",
    sourceRefs: [AKKHAN_CONDEMN_SOURCES.skills, AKKHAN_CONDEMN_SOURCES.gear], reviewedAt: "2026-08-29",
  },
  {
    id: "speed-low", label: "低巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "low", applicability: "supported",
    reason: "T16改为自施无情爆发天谴，去掉弓手相关头盔、护腕和副手；寅剑、金织带、麦剑以及金币链服务连续转场。",
    patch: {
      gear: { head: "prides-fall", bracers: "warzechian", ring1: "akkhan-avarice", ring2: "coe", offhand: "frydehr" },
      skills: [{ id: "judgment" }, { id: "laws-of-hope", rune: "天使之翼" }, { id: "condemn", rune: "无情爆发" }, { id: "akarats-champion", rune: "先知化身" }, { id: "steed-charge", rune: "耐力" }, { id: "iron-skin", rune: "闪光之肤" }],
      powers: { weapon: "ingeom", armor: "goldwrap-power", season: "messerschmidt" },
      legendaryGems: { control: "bane-of-the-trapped", pet: "bane-of-the-powerful", boss: "boon-of-the-hoarder" },
      follower: { items: ["不死圣物", "复仇者护腕"], skills: ["冷却增强", "攻速增强"] },
      statPriorities: { global: ["25%移速上限", "冷却缩减", "拾取范围", "天谴伤害"], survival: ["金币链覆盖", "全元素抗性"], endgame: ["连续战马", "不为零散怪停留"] },
      rotation: AKKHAN_CONDEMN_SPEED_ROTATION,
    },
    sourceRefs: [AKKHAN_CONDEMN_SOURCES.t16Speed, AKKHAN_CONDEMN_SOURCES.greaterRiftSpeed], reviewedAt: "2026-08-29",
  },
  {
    id: "speed-high", label: "高巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "high", applicability: "supported",
    reason: "高巅峰伤害足够后，用钻石压缩冷却并把词缀继续转向移速、拾取和连续转场；核心金币链与自施天谴不变。",
    patch: {
      gear: { head: "prides-fall", bracers: "warzechian", ring1: "akkhan-avarice", ring2: "coe", offhand: "frydehr" },
      skills: [{ id: "judgment" }, { id: "laws-of-hope", rune: "天使之翼" }, { id: "condemn", rune: "无情爆发" }, { id: "akarats-champion", rune: "先知化身" }, { id: "steed-charge", rune: "耐力" }, { id: "iron-skin", rune: "闪光之肤" }],
      powers: { weapon: "ingeom", armor: "goldwrap-power", season: "messerschmidt" },
      legendaryGems: { control: "bane-of-the-trapped", pet: "bane-of-the-powerful", boss: "boon-of-the-hoarder" },
      normalGems: { armor: Array(5).fill("flawless-royal-diamond") },
      statPriorities: { global: ["25%移速上限", "冷却缩减", "拾取范围", "范围伤害"], survival: ["金币链覆盖", "全元素抗性"], endgame: ["连续战马", "移速与拾取优先"] },
      rotation: AKKHAN_CONDEMN_SPEED_ROTATION,
    },
    sourceRefs: [AKKHAN_CONDEMN_SOURCES.t16Speed, AKKHAN_CONDEMN_SOURCES.greaterRiftSpeed], reviewedAt: "2026-08-29",
  },
];

const AKKHAN_CONDEMN_PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "先扣除鞋子词缀；冲层和速刷都需要基础转场。" },
      { stat: "力量", target: "其余点数", reason: "同时提供伤害和护甲。" },
      { stat: "体能", target: "生存不足时临时投入", reason: "低巅峰先保住变身和远程标记循环。" },
      { stat: "圣怒上限", target: "0点", reason: "弗莱德天谴更依赖减耗、律法与正义补给，不依赖上限。" },
    ],
    offense: [
      { stat: "冷却缩减", target: "优先点满", reason: "阿卡拉特勇士、圣军之阵和律法都需要尽量少断档。" },
      { stat: "暴击伤害", target: "第二点满", reason: "与装备暴击几率共同放大天谴爆炸。" },
      { stat: "暴击几率", target: "第三点满", reason: "补足双暴平衡。" },
      { stat: "攻击速度", target: "最后点满", reason: "服务弓手攻击帧数；先用装备和律法满足1.78攻速目标。" },
    ],
    defense: [
      { stat: "全元素抗性", target: "优先点满", reason: "力量职业已有大量护甲，优先补全抗。" },
      { stat: "生命%", target: "第二点满", reason: "提高先知化身和主动减伤下的有效生命。" },
      { stat: "护甲", target: "第三点满", reason: "补充力量提供的护甲。" },
      { stat: "生命恢复", target: "最后点满", reason: "仅作稳定续航。" },
    ],
    utility: [
      { stat: "金币拾取范围", target: "速刷优先点满", reason: "T16金币链需要大范围拾取；冲层可后置。" },
      { stat: "能量消耗降低", target: "冲层第二点满", reason: "降低连续天谴与律法的圣怒压力。" },
      { stat: "击中回复生命", target: "第三点满", reason: "高频命中提供稳定恢复。" },
      { stat: "范围伤害", target: "最后点满", reason: "弓手触发的天谴不吃范围伤，不为它牺牲关键资源与冷却。" },
    ],
  },
  post800: [
    { priority: "力量", when: "默认", reason: "持续增加伤害与护甲。" },
    { priority: "体能", when: "冲层无法稳定承受精英技能", reason: "补到能持续标记和站位后继续投入力量。" },
  ],
  checkpoints: [
    { label: "刚成型", target: "阿克汉+船长+皇家华戒+双盾", action: "先确认卡萨头盔、阿克汉护符与套装件数一起生效。" },
    { label: "巅峰800", target: "冷却、宠物攻速和受罚者", action: "让变身、弓手和审判持续覆盖后再追伤害词缀。" },
    { label: "巅峰2000+", target: "1.78攻速、神圣元素和高特效", action: "速刷可换钻石与拾取，冲层不为范围伤破坏弓手天谴框架。" },
  ],
};

const AKKHAN_CONDEMN_CHOICE_POLICIES: BuildChoicePolicy[] = [
  { key: "akkhan-condemn-core", targetType: "gear", targetId: "kassar-helm", label: "阿克汉、船长、卡萨头盔与皇家华戒", status: "locked", reason: "卡萨头盔压圣军之阵冷却，阿克汉护符与皇家华戒补足套装件数，船长把冷却与减耗转为攻防；缺其中一项就不是当前冲层框架。" },
  { key: "judgment-phalanx", targetType: "skill", targetId: "judgment", label: "审判 + 圣军弓手", status: "locked", reason: "弓手只有攻击被审判标记的目标才会触发天谴；冲层不能把审判或弓手换成旧版真空、挑衅循环。" },
  { key: "double-shield", targetType: "power", targetId: "frydehr-power", label: "双盾位置", status: "conditional", reason: "冲层必须同时拥有弗莱德之怒与无情斗阵；默认穿无情斗阵、萃取弗莱德，若无情斗阵远古特效更好可反向互换。", alternatives: [{ id: "unrelenting-power", label: "萃取无情斗阵", when: "弗莱德之怒的穿戴词缀和远古底子更好", gain: "保住更优的穿戴副手底子", cost: "必须确认两面盾牌仍同时生效", scenarios: ["push-low", "push-high"] }] },
  { key: "pet-attack-speed", targetType: "power", targetId: "tasker", label: "塔斯克与西奥", status: "locked", reason: "冲层防具槽给宠物攻速，直接提高弓手触发天谴的频率；不要用旧版李奥瑞克王冠替代后还沿用弓手伤害预期。" },
  { key: "t16-self-cast", targetType: "gear", targetId: "frydehr", label: "T16自施天谴", status: "conditional", reason: "T16换傲慢之冠、沃兹克护腕、弗莱德之怒和金币链，主动施放无情爆发天谴；这与大秘境弓手触发是两套明确分开的配置。", alternatives: [{ id: "warzechian", label: "沃兹克护腕", when: "T16、蓝门与悬赏", gain: "破坏物移速", cost: "失去冲层的力士护腕乘区", scenarios: ["speed-low", "speed-high"] }, { id: "goldwrap-power", label: "金织带", when: "掉金币内容", gain: "金币护甲", cost: "大秘境不掉金币，不能使用", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-low", "speed-high"] }] },
  { key: "legendary-gems", targetType: "legendary-gem", targetId: "bane-of-the-stricken", label: "传奇宝石", status: "conditional", reason: "冲层用困者、侍从和受罚者处理宠物伤害与首领；T16以囤宝者和强者换取金币链、移速和精英后续。", alternatives: [{ id: "boon-of-the-hoarder", label: "囤宝者的恩惠", when: "T16、蓝门与悬赏", gain: "金币与移速并启动金织带", cost: "大秘境不掉金币", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-low", "speed-high"] }, { id: "bane-of-the-powerful", label: "强者之灾", when: "速刷仍需要精英后续伤害", gain: "精英后稳定增伤减伤", cost: "首领战不如受罚者", scenarios: ["speed-low", "speed-high"] }] },
  { key: "cooldown-myth", targetType: "gear", targetId: "blade-prophecy", label: "冷却与攻速阈值", status: "flexible", reason: "阿克汉重做后不再追旧版固定56%冷却阈值；装备尽量出冷却，并以武器高攻速、两条额外攻速、巅峰、律法和魔女接近1.78攻速。" },
];

const AKKHAN_CONDEMN_REVIEWED_GUIDE: BuildGuide = {
  ...AKKHAN_CONDEMN_BASE_GUIDE,
  configurationBase: AKKHAN_CONDEMN_CONFIGURATION_BASE,
  defaultMode: "push",
  defaultScenarioId: "push-low",
  scenarios: AKKHAN_CONDEMN_SCENARIOS,
  paragonGuide: AKKHAN_CONDEMN_PARAGON,
  choicePolicies: AKKHAN_CONDEMN_CHOICE_POLICIES,
  reviewStatus: "fully-reviewed",
  variantCompleteness: "complete",
};

const AKKHAN_CONDEMN_VALIDATION_ERRORS = validateReviewedBuildGuide(AKKHAN_CONDEMN_REVIEWED_GUIDE);
if (AKKHAN_CONDEMN_VALIDATION_ERRORS.length > 0) throw new Error(`阿克汉天谴配置校验失败：${AKKHAN_CONDEMN_VALIDATION_ERRORS.join("；")}`);

const AKKHAN_PHALANX_SOURCES = {
  overview: "https://www.icy-veins.com/d3/crusader-akkhan-condemn-build",
  skills: "https://www.icy-veins.com/d3/akkhan-condemn-crusader-skills-and-runes",
  gear: "https://www.icy-veins.com/d3/akkhan-condemn-crusader-bis-gear-gems-paragon-points",
  greaterRiftSpeed: "https://www.icy-veins.com/d3/akkhan-condemn-crusader-speed-farming-build",
  t16Speed: "https://www.icy-veins.com/d3/akkhan-condemn-crusader-nephalem-rift-speed-farming-build",
};

const AKKHAN_PHALANX_PUSH_ROTATION = [
  { title: "维持变身", action: "进场先开阿卡拉特勇士，并在冷却结束前补开。", reason: "阿克汉四件套会让弓手攻击缩短变身冷却，常驻变身同时提供增伤、减伤和圣怒恢复。" },
  { title: "召唤弓手", action: "冷却转好就施放圣军之阵：弓手。", reason: "卡萨的战盔和无情斗阵把弓手的持续时间、数量和冷却覆盖接起来。" },
  { title: "审判标记", action: "不断把审判铺在精英和密集怪群上。", reason: "阿克汉二件套让审判获得所有符文；四件套只会让弓手对被审判目标触发天谴。" },
  { title: "维持资源", action: "用正义补圣怒，在精英爆发前开启势不可挡。", reason: "生成技能维持克己守心，勇气律法的减耗又会通过船长套转成伤害和减伤。" },
  { title: "处理首领", action: "保持弓手和审判覆盖，围绕首领移动而不是停在原地。", reason: "困者、侍从与受罚者负责把持续的宠物触发伤害转成首领阶段的稳定输出。" },
];

const AKKHAN_PHALANX_SPEED_ROTATION = [
  { title: "开局加速", action: "开启阿卡拉特勇士与希望律法，长距离用战马冲锋。", reason: "低层大秘境优先缩短转场，弓手负责触发天谴而不是让角色站桩清每只白怪。" },
  { title: "铺审判", action: "移动中连续施放审判，再补召弓手。", reason: "审判会同时触发控制、困者和弓手的天谴条件。" },
  { title: "追随爆炸", action: "让弓手攻击标记目标，必要时手动补天谴。", reason: "低层大秘境仍保留宠物组件，重点是大范围覆盖而不是等待完整首领叠层。" },
  { title: "精英后转场", action: "精英死亡后立即继续骑马或用希望律法穿怪。", reason: "寅剑和梅塞施密特的击杀冷却要转化成下一组变身和移动技能。" },
];

const AKKHAN_PHALANX_T16_ROTATION = [
  { title: "开局变身", action: "开启阿卡拉特勇士与希望律法，保持不间断。", reason: "T16用金币链覆盖坚韧后，可以把变身符文和技能栏全部服务于连续清图。" },
  { title: "主动天谴", action: "遇到怪群直接施放天谴：无情爆发。", reason: "T16不等待弓手触发，把弗莱德之怒和预言之刃放到身上后由角色即时清场。" },
  { title: "召唤刷新", action: "冷却转好就补施圣军之阵：弓手。", reason: "即使不再依赖弓手输出，阿克汉四件套仍用弓手攻击刷新变身。" },
  { title: "金币转场", action: "用挑衅恐惧、希望律法和战马穿图，并沿路拾金。", reason: "囤宝者、贪婪之戒与金织带共同提供移速、拾取范围和护甲。" },
];

const AKKHAN_PHALANX_SEED = seeds.find((seed) => seed.id === "akkhan-phalanx")!;
const AKKHAN_PHALANX_BASE_GUIDE = createClassGuide({
  ...AKKHAN_PHALANX_SEED,
  core: "审判标记 → 圣军弓手触发天谴 → 变身常驻",
  summary: "以卡萨战盔、无情斗阵和宠物攻速维持弓手火力；大秘境冲层让弓手触发天谴，T16则把同一套发动机改成角色自施天谴。",
  gear: [
    ...AKKHAN_PHALANX_SEED.gear,
    legendary("kassar-helm", "头部", "卡萨的战盔", "warhelm-of-kassar-p4_unique_helm_102.png", "显著降低圣军之阵冷却，保证弓手持续在场。", { skill: "圣军之阵" }),
    legendary("strongarm", "腕部", "力士护腕", "strongarm-bracers-unique_bracer_007_x1.png", "被审判的敌人被推移后承受更多伤害，冲层由审判全符文触发。", { element: "物理" }),
    legendary("crimson-belt", "腰部", "克里森船长的丝带", "captain-crimsons-silk-girdle.png", "与船长腿甲组成套装，把冷却和减耗转为攻防。", { quality: "set" }),
    legendary("crimson-pants", "腿部", "克里森船长的推裤", "captain-crimsons-thrust.png", "与船长腰带组成套装，提供冷却、减耗和坚韧转换。", { quality: "set" }),
    legendary("akkhan-talisman", "颈部", "阿克汉护符", "talisman-of-akkhan-p43_akkhanset_amulet.png", "阿克汉套装部件，配皇家华戒让卡萨头盔和船长两件同时成立。", { quality: "set", element: "物理" }),
    jewelry("focus", "trapped"),
    jewelry("restraint", "stricken"),
    legendary("blade-prophecy", "主手", "预言之刃", "blade-of-prophecy-p61_unique_sword_2h_007_x1.png", "天谴初始爆炸命中至少两个目标时，会在目标位置额外触发两次天谴。", { base: "双手剑" }),
    legendary("frydehr", "副手", "弗莱德之怒", "frydehrs-wrath-p61_crushield_norm_unique_01.png", "移除天谴冷却并把天谴改为圣怒消耗技能；T16主动清场时穿戴。"),
    legendary("prides-fall", "头部", "傲慢之冠", "prides-fall-unique_helm_103_x1.png", "5秒未受伤后降低资源消耗，服务T16连续自施天谴。"),
    legendary("warzechian", "腕部", "沃兹克护腕", "warzechian-armguards-unique_bracer_101_x1.png", "破坏可破坏物后提高移动速度，T16和悬赏赶路用。"),
    legendary("akkhan-avarice", "手指", "贪婪之戒", "avarice-band-unique_ring_108_x1.png", "拾取金币后扩大拾取范围，连接囤宝者与金织带。", { gem: "hoarder" }),
    legendary("akkhan-soj", "手指", "乔丹之石", "stone-of-jordan-p69_unique_ring_019.png", "提供稳定的神圣元素与精英伤，低层速刷不需要等待全能法戒周期。", { gem: "powerful" }),
    legendary("akkhan-rechel", "手指", "瑞秋的行窃之戒", "rechels-ring-of-larceny-unique_ring_104_x1.png", "挑衅恐惧敌人后提供移速，填补战马和寅剑之间的移动空档。", { gem: "powerful" }),
  ],
  skills: [
    skill("justice", "正义", "正义之剑", "冲层生成圣怒并维持克己守心；远程剑气不会破坏弓手站位。"),
    skill("judgment", "审判", "全符文", "阿克汉二件套赋予所有符文，标记目标后弓手才会触发天谴。"),
    skill("laws-of-valor", "勇气律法", "势不可挡", "冲层降低圣怒消耗并提高弓手攻击频率。"),
    skill("laws-of-hope", "希望律法", "天使之翼", "速刷提高转场速度并穿过怪群。"),
    skill("phalanx", "圣军之阵", "弓手", "持续召唤弓手；攻速、数量和冷却是本套的三条主轴。"),
    skill("condemn", "天谴", "无情爆发", "冲层由弓手触发，T16改为角色手动爆炸清场。"),
    skill("akarats-champion", "阿卡拉特勇士", "先知化身", "阿克汉的常驻攻防与圣怒恢复开关。"),
    skill("steed-charge", "战马冲锋", "耐力", "低层大秘境和T16的长距离转场。"),
    skill("provoke", "挑衅", "惊慌失措", "速刷补圣怒并触发瑞秋戒恐惧移速。"),
    skill("iron-skin", "钢铁之肤", "闪光之肤", "T16穿过怪群时补碰撞免疫与短时防御。"),
  ],
  passives: [
    passive("heavenly-strength", "天堂之力", "双手剑与圣教军盾同时装备时的必要被动。"),
    passive("lord-commander", "统御者", "提高圣军之阵伤害并缩短弓手与战马冷却。"),
    passive("long-arm-of-the-law", "律法无边", "延长律法覆盖，减少资源和移动循环空档。"),
    passive("finery", "宝石之力", "由镶嵌宝石提高力量和坚韧。"),
    passive("indestructible", "坚不可摧", "T16金币链覆盖后可替换的容错被动。"),
  ],
  powers: [
    power("frydehr-power", "武器", "弗莱德之怒", "frydehrs-wrath-p61_crushield_norm_unique_01.png", "移除天谴冷却并提高天谴伤害。", "冲层把盾牌放入魔方，T16则穿在副手。"),
    power("tasker", "防具", "塔斯克与西奥", "tasker-and-theo-unique_gloves_003_x1.png", "提高宠物攻击速度。", "弓手攻速直接提高触发天谴的频率。"),
    power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求件数减少1。", "同时维持阿克汉六件和船长三件。", "第一幕或第四幕悬赏宝箱。"),
    power("goldwrap-power", "防具", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后按金币数量获得护甲。", "只在T16、蓝门和悬赏等掉金币内容使用。"),
    power("ingeom", "武器", "寅剑", "ingeom-unique_sword_1h_113_x1.png", "击杀精英后大幅缩短技能冷却。", "低层和T16精英连续死亡时刷新战马与变身。"),
    power("messerschmidt", "第4槽", "梅塞施密特的劫掠者", "messerschmidts-reaver-p66_unique_axe_2h_011.png", "击杀敌人缩短一个技能的冷却。", "第39赛季速刷槽用普通击杀压缩变身和战马空档。"),
    power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高精英伤害。", "大秘境冲层优先处理精英和首领。"),
  ],
  links: [
    { title: "弓手触发链", category: "damage", conclusion: "审判是触发条件，圣军弓手是执行者，天谴是结算结果。", steps: [["judgment", "审判全符文", "标记目标"], ["phalanx", "圣军弓手", "攻击标记目标"], ["condemn", "天谴", "触发范围爆炸"], ["enforcer", "侍从宝石", "放大宠物触发"]] },
    { title: "变身冷却链", category: "defense", conclusion: "卡萨战盔、弓手和宠物攻速共同让阿卡拉特勇士保持常驻。", steps: [["kassar-helm", "卡萨战盔", "压缩弓手冷却"], ["tasker", "塔斯克与西奥", "提高攻击频率"], ["akarats-champion", "阿卡拉特勇士", "提供攻防和资源"]] },
    { title: "金币速刷链", category: "movement", conclusion: "掉金币内容才同时使用金币护甲、金币宝石和拾取戒指。", steps: [["boon-of-the-hoarder", "囤宝者", "制造金币和移速"], ["akkhan-avarice", "贪婪之戒", "扩大拾取范围"], ["goldwrap-power", "金织带", "拾金叠护甲"], ["ingeom", "寅剑", "精英后刷新冷却"]] },
  ],
  rotation: AKKHAN_PHALANX_PUSH_ROTATION,
  pushNote: "冲层以审判标记为先，让弓手触发天谴；角色保持移动，用正义、律法和船长套维持圣怒。",
  speedNote: "低层大秘境保留弓手发动机；T16、蓝门和悬赏换成自施天谴、金织带和击杀冷却链。",
  lowNote: "先做卡萨战盔、无情斗阵、弗莱德之怒、皇家华戒与船长两件，再补宠物攻速和受罚者。",
  highNote: "高巅峰优先满足冷却和1.78攻速，再把装备力量换成范围伤、元素伤和更高特效；速刷才转钻石与拾取。",
});

const AKKHAN_PHALANX_CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "kassar-helm", shoulders: "akkhan-shoulders", chest: "akkhan-chest", gloves: "akkhan-gloves",
    bracers: "strongarm", belt: "crimson-belt", pants: "crimson-pants", boots: "akkhan-boots",
    amulet: "akkhan-talisman", ring1: "focus", ring2: "restraint", weapon: "blade-prophecy", offhand: "unrelenting",
  },
  skills: [
    { id: "justice", rune: "正义之剑" }, { id: "judgment" }, { id: "laws-of-valor", rune: "势不可挡" },
    { id: "phalanx", rune: "弓手" }, { id: "condemn", rune: "无情爆发" }, { id: "akarats-champion", rune: "先知化身" },
  ],
  passives: ["heavenly-strength", "lord-commander", "long-arm-of-the-law", "finery"],
  powers: { weapon: "frydehr-power", armor: "tasker", jewelry: "royal-grandeur", season: "furnace" },
  legendaryGems: { control: "bane-of-the-trapped", pet: "enforcer", boss: "bane-of-the-stricken" },
  normalGems: { head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-ruby"), weapon: ["flawless-royal-emerald"] },
  follower: { id: "enchantress", items: ["不死圣物", "复仇者护腕"], skills: ["冷却增强", "攻速增强"] },
  statPriorities: {
    global: ["冷却缩减", "攻击速度至1.78", "物理元素伤", "圣军之阵/天谴技能伤"],
    survival: ["全元素抗性", "70万–90万生命", "先知化身覆盖"],
    endgame: ["弓手持续时间", "受罚者首领叠层", "高特效无情斗阵"],
  },
  rotation: AKKHAN_PHALANX_PUSH_ROTATION,
};

const AKKHAN_PHALANX_SCENARIOS: BuildScenario[] = [
  {
    id: "push-low", label: "低巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "low", applicability: "supported",
    reason: "低巅峰冲层使用卡萨战盔、阿克汉五件、船长两件、皇家华戒、双盾逻辑和塔斯克；红宝石提供主属性与护甲，受罚者负责首领。",
    sourceRefs: [AKKHAN_PHALANX_SOURCES.overview, AKKHAN_PHALANX_SOURCES.skills, AKKHAN_PHALANX_SOURCES.gear], reviewedAt: "2026-09-12",
  },
  {
    id: "push-high", label: "高巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "high", applicability: "supported",
    reason: "高巅峰仍保留弓手触发天谴的核心配置，变化集中在巅峰、传奇宝石等级、远古特效、冷却和1.78攻速；不虚构一套不必要的换装。",
    patch: {
      normalGems: { armor: Array(5).fill("flawless-royal-diamond") },
      statPriorities: { global: ["冷却缩减", "攻击速度至1.78", "物理元素伤", "范围伤害"], survival: ["全元素抗性", "70万–90万生命", "变身不断档"], endgame: ["装备力量洗范围伤", "弓手高攻速", "无情斗阵与卡萨高特效"] },
    },
    sourceRefs: [AKKHAN_PHALANX_SOURCES.skills, AKKHAN_PHALANX_SOURCES.gear], reviewedAt: "2026-09-12",
  },
  {
    id: "speed-low", label: "低巅峰低层大秘境", content: "greater-rift-speed", paragonBand: "low", applicability: "supported",
    reason: "低层大秘境仍会等待弓手触发天谴，所以保留卡萨、塔斯克和无情斗阵；换希望律法、战马、寅剑与梅斧压缩转场，不使用大秘境不会触发的金币链。",
    patch: {
      gear: { ring1: "akkhan-soj", ring2: "coe" },
      skills: [{ id: "steed-charge", rune: "耐力" }, { id: "judgment" }, { id: "laws-of-hope", rune: "天使之翼" }, { id: "phalanx", rune: "弓手" }, { id: "condemn", rune: "无情爆发" }, { id: "akarats-champion", rune: "先知化身" }],
      powers: { weapon: "ingeom", season: "messerschmidt" },
      legendaryGems: { control: "bane-of-the-trapped", pet: "enforcer", boss: "bane-of-the-powerful" },
      follower: { items: ["不死圣物", "复仇者护腕"], skills: ["冷却增强", "攻速增强"] },
      statPriorities: { global: ["25%移速上限", "冷却缩减", "攻击速度至1.78", "天谴技能伤"], survival: ["全元素抗性", "力量", "体能"], endgame: ["连续骑马", "精英击杀触发寅剑", "不等待首领叠层"] },
      rotation: AKKHAN_PHALANX_SPEED_ROTATION,
    },
    sourceRefs: [AKKHAN_PHALANX_SOURCES.greaterRiftSpeed, AKKHAN_PHALANX_SOURCES.gear], reviewedAt: "2026-09-12",
  },
  {
    id: "speed-high", label: "高巅峰 T16 / 蓝门 / 悬赏", content: "nephalem-rift", paragonBand: "high", applicability: "supported",
    reason: "T16、蓝门与悬赏掉金币且伤害门槛较低，去掉弓手专用头盔和护腕，穿傲慢之冠、沃兹克和弗莱德之怒，改为角色自施天谴；囤宝者、贪婪之戒和金织带建立金币防线。",
    patch: {
      gear: { head: "prides-fall", bracers: "warzechian", ring1: "akkhan-soj", ring2: "akkhan-avarice", offhand: "frydehr" },
      skills: [{ id: "provoke", rune: "惊慌失措" }, { id: "condemn", rune: "无情爆发" }, { id: "laws-of-hope", rune: "天使之翼" }, { id: "phalanx", rune: "弓手" }, { id: "iron-skin", rune: "闪光之肤" }, { id: "akarats-champion", rune: "先知化身" }],
      passives: ["heavenly-strength", "indestructible", "long-arm-of-the-law", "finery"],
      powers: { weapon: "ingeom", armor: "goldwrap-power", season: "messerschmidt" },
      legendaryGems: { control: "bane-of-the-trapped", pet: "bane-of-the-powerful", boss: "boon-of-the-hoarder" },
      normalGems: { armor: Array(5).fill("flawless-royal-diamond") },
      follower: { items: ["贪婪之戒", "复仇者护腕", "不死圣物"], skills: ["冷却增强", "攻速增强"] },
      statPriorities: { global: ["25%移速上限", "冷却缩减", "拾取范围", "天谴技能伤"], survival: ["金币链覆盖", "全元素抗性"], endgame: ["连续战马", "破坏物移速", "伤害溢出后优先转场"] },
      rotation: AKKHAN_PHALANX_T16_ROTATION,
    },
    sourceRefs: [AKKHAN_PHALANX_SOURCES.t16Speed, AKKHAN_PHALANX_SOURCES.greaterRiftSpeed], reviewedAt: "2026-09-12",
  },
];

const AKKHAN_PHALANX_PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "速刷先到上限；冲层缺少专用位移时也能改善走位。" },
      { stat: "力量", target: "其余点数", reason: "同时提供弓手/天谴伤害与护甲。" },
      { stat: "体能", target: "被精英技能击杀时临时投入", reason: "低巅峰先保证有时间完成审判和补召唤。" },
      { stat: "最大圣怒", target: "0点", reason: "阿卡拉特、正义和律法足以支撑循环。" },
    ],
    offense: [
      { stat: "冷却缩减", target: "优先点满", reason: "弓手、阿卡拉特勇士、律法和战马都依赖冷却覆盖。" },
      { stat: "暴击伤害", target: "第二点满", reason: "天谴爆炸和宠物触发都受双暴收益影响。" },
      { stat: "暴击几率", target: "第三点满", reason: "补足与装备暴伤的比例。" },
      { stat: "攻击速度", target: "第四点满并配合装备接近1.78", reason: "18帧弓手断点需要巅峰、武器词缀、律法和魔女共同完成。" },
    ],
    defense: [
      { stat: "全元素抗性", target: "优先点满", reason: "力量已经提供护甲，先补全抗。" },
      { stat: "生命%", target: "第二点满", reason: "扩大先知化身和船长减伤后的有效生命。" },
      { stat: "护甲", target: "第三点满", reason: "补充力量提供的护甲。" },
      { stat: "生命恢复", target: "最后点满", reason: "仅作审判治疗之外的续航补充。" },
    ],
    utility: [
      { stat: "金币拾取范围", target: "速刷优先，冲层后置", reason: "只在T16/蓝门/悬赏金币链中是核心效率属性。" },
      { stat: "能量消耗降低", target: "冲层优先点满", reason: "降低审判、天谴和律法的圣怒压力，并转化为船长防御。" },
      { stat: "击中回复生命", target: "第三点满", reason: "弓手和天谴触发频率高，适合持续恢复。" },
      { stat: "范围伤害", target: "最后点满", reason: "弓手触发的天谴不依赖范围伤，不能挤掉冷却和减耗。" },
    ],
  },
  post800: [
    { priority: "力量", when: "默认", reason: "巅峰800后继续提供伤害和护甲。" },
    { priority: "体能", when: "冲层无法承受当前层精英技能", reason: "补到能稳定维持斯奎特或弓手站位，再回到力量。" },
    { priority: "攻速/冷却词缀", when: "高巅峰冲层", reason: "优先完成1.78攻速与足够冷却，不为虚假的固定CDR阈值牺牲更高伤害。" },
  ],
  checkpoints: [
    { label: "刚成型", target: "阿克汉、船长、卡萨、无情斗阵、弗莱德和皇家华戒", action: "确认五件阿克汉+两件船长与弓手触发链同时成立。" },
    { label: "巅峰800", target: "冷却、攻速、侍从与受罚者", action: "先让变身不断档，再围绕审判标记和弓手攻击处理精英。" },
    { label: "巅峰2000+", target: "1.78攻速、钻石、范围伤与金币链", action: "冲层装备逐步把力量让给终局词缀；T16再切钻石、金织带和拾取属性。" },
  ],
};

const AKKHAN_PHALANX_CHOICE_POLICIES: BuildChoicePolicy[] = [
  { key: "akkhan-phalanx-core", targetType: "gear", targetId: "kassar-helm", label: "阿克汉五件、船长两件与卡萨战盔", status: "locked", reason: "卡萨压缩圣军之阵冷却，阿克汉四件让弓手攻击刷新阿卡拉特勇士并触发被审判目标的天谴；皇家华戒和船长套把冷却/减耗转成攻防。" },
  { key: "judgment-bowmen", targetType: "skill", targetId: "judgment", label: "审判 + 圣军弓手", status: "locked", reason: "审判是弓手触发天谴的条件，弓手是阿克汉四件套的执行者；不能换成只会自施天谴的T16技能栏。" },
  { key: "pet-attack-speed", targetType: "power", targetId: "tasker", label: "塔斯克与西奥", status: "locked", reason: "宠物攻速直接提高弓手触发频率，并帮助靠弓手攻击刷新变身。" },
  { key: "shield-position", targetType: "gear", targetId: "unrelenting", label: "无情斗阵与弗莱德之怒", status: "conditional", reason: "冲层穿无情斗阵、魔方放弗莱德；T16反过来穿弗莱德并把无情斗阵移出主循环，因为角色自施天谴更快。", alternatives: [{ id: "frydehr", label: "穿戴弗莱德之怒", when: "T16、蓝门与悬赏需要手动天谴", gain: "即时无冷却天谴", cost: "失去弓手数量翻倍", scenarios: ["speed-high"] }, { id: "unrelenting", label: "穿戴无情斗阵", when: "大秘境冲层或低层大秘境依赖弓手", gain: "弓手数量翻倍、触发频率更高", cost: "角色不能直接使用弗莱德盾牌特效", scenarios: ["push-low", "push-high", "speed-low"] }] },
  { key: "season-slot", targetType: "power", targetId: "furnace", label: "第39赛季第四槽", status: "conditional", reason: "冲层用焚炉处理精英和首领；低层与T16把第四槽给梅塞施密特，用普通击杀压缩变身和战马冷却。", alternatives: [{ id: "messerschmidt", label: "梅塞施密特的劫掠者", when: "低层大秘境、T16、蓝门与悬赏精英/白怪连续死亡", gain: "击杀就能缩短技能冷却", cost: "失去冲层的精英伤", scenarios: ["speed-low", "speed-high"] }, { id: "furnace", label: "焚炉", when: "大秘境冲层首领和精英处理速度不足", gain: "稳定精英伤", cost: "失去击杀冷却", scenarios: ["push-low", "push-high"] }] },
  { key: "speed-gear", targetType: "gear", targetId: "strongarm", label: "速刷装备分支", status: "conditional", reason: "低层大秘境仍用弓手和审判，保留卡萨/塔斯克/无情斗阵；T16伤害溢出后换傲慢之冠、沃兹克、弗莱德和金币链。", alternatives: [{ id: "prides-fall", label: "傲慢之冠 + 金织带", when: "高巅峰T16、蓝门与悬赏", gain: "降低天谴消耗并用金币获得坚韧", cost: "不适合不掉金币的大秘境", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-high"] }, { id: "warzechian", label: "沃兹克护腕", when: "T16和悬赏地图有可破坏物", gain: "破坏物触发移动速度", cost: "失去冲层力士护腕乘区", scenarios: ["speed-high"] }] },
  { key: "legendary-gems", targetType: "legendary-gem", targetId: "enforcer", label: "传奇宝石", status: "conditional", reason: "冲层用困者、侍从和受罚者；低层大秘境把受罚者换强者；T16把侍从换囤宝者，并让金织带与贪婪之戒生效。", alternatives: [{ id: "bane-of-the-powerful", label: "强者之灾", when: "低层大秘境速刷", gain: "精英后稳定增伤减伤", cost: "首领叠层不如受罚者", scenarios: ["speed-low"] }, { id: "boon-of-the-hoarder", label: "囤宝者的恩惠", when: "T16、蓝门与悬赏", gain: "金币、移速并启动金织带", cost: "大秘境不掉金币", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-high"] }] },
  { key: "attack-speed-breakpoint", targetType: "gear", targetId: "blade-prophecy", label: "1.78攻速目标", status: "flexible", reason: "没有新的固定冷却断点；优先在武器、两件装备、巅峰、勇气律法和魔女攻速之间完成18帧弓手目标，再用剩余位置补暴击、冷却和元素伤。" },
  { key: "follower", targetType: "follower", targetId: "enchantress", label: "随从", status: "flexible", reason: "魔女的攻速和冷却增益最贴合弓手；冲层带不死圣物与复仇者护腕，T16再带贪婪之戒延伸金币拾取。" },
];

const AKKHAN_PHALANX_REVIEWED_GUIDE: BuildGuide = {
  ...AKKHAN_PHALANX_BASE_GUIDE,
  configurationBase: AKKHAN_PHALANX_CONFIGURATION_BASE,
  defaultMode: "push",
  defaultScenarioId: "push-low",
  scenarios: AKKHAN_PHALANX_SCENARIOS,
  paragonGuide: AKKHAN_PHALANX_PARAGON,
  choicePolicies: AKKHAN_PHALANX_CHOICE_POLICIES,
  reviewStatus: "fully-reviewed",
  variantCompleteness: "complete",
};

const AKKHAN_PHALANX_VALIDATION_ERRORS = validateReviewedBuildGuide(AKKHAN_PHALANX_REVIEWED_GUIDE);
if (AKKHAN_PHALANX_VALIDATION_ERRORS.length > 0) throw new Error(`阿克汉圣军配置校验失败：${AKKHAN_PHALANX_VALIDATION_ERRORS.join("；")}`);

const PONY_REVIEWED_GUIDE: BuildGuide = {
  ...createClassGuide(ponySeed),
  configurationBase: PONY_CONFIGURATION_BASE,
  defaultMode: "speed",
  defaultScenarioId: "speed-low",
  scenarios: PONY_SCENARIOS,
  paragonGuide: PONY_PARAGON,
  choicePolicies: PONY_CHOICE_POLICIES,
  reviewStatus: "fully-reviewed",
  variantCompleteness: "complete",
};

const PONY_VALIDATION_ERRORS = validateReviewedBuildGuide(PONY_REVIEWED_GUIDE);
if (PONY_VALIDATION_ERRORS.length > 0) throw new Error(`跑马天拳配置校验失败：${PONY_VALIDATION_ERRORS.join("；")}`);

export const CRUSADER_BUILDS: Record<string, BuildGuide> = {
  ...Object.fromEntries(seeds.map((seed) => {
    const guide = createClassGuide(seed);
    return [guide.id, guide];
  })),
  [VALOR_FURY_REVIEWED_GUIDE.id]: VALOR_FURY_REVIEWED_GUIDE,
  [VALOR_FIST_REVIEWED_GUIDE.id]: VALOR_FIST_REVIEWED_GUIDE,
  [AKKHAN_CONDEMN_REVIEWED_GUIDE.id]: AKKHAN_CONDEMN_REVIEWED_GUIDE,
  [AKKHAN_PHALANX_REVIEWED_GUIDE.id]: AKKHAN_PHALANX_REVIEWED_GUIDE,
  [PONY_REVIEWED_GUIDE.id]: PONY_REVIEWED_GUIDE,
};
