import { GEMS, itemFile } from "./class-build-factory";
import { skillAsset } from "./assets";
import {
  validateBuildEvidence,
  validateBuildSemantics,
  validateReviewedBuildGuide,
  type BuildChoicePolicy,
  type BuildConfiguration,
  type BuildGuide,
  type BuildScenario,
  type BuildSource,
  type EvidenceClaim,
  type GuideAbility,
  type GuideGear,
  type GuidePower,
  type ParagonGuide,
} from "./build-guides";

const REVIEWED_AT = "2026-09-13";

const URLS = {
  overview: "https://www.icy-veins.com/d3/witch-doctor-zuni-carnevil-poison-dart-build",
  skills: "https://www.icy-veins.com/d3/zuni-carnevil-poison-dart-witch-doctor-skills-and-runes",
  gear: "https://www.icy-veins.com/d3/zuni-carnevil-poison-dart-witch-doctor-bis-gear-gems-paragon-points",
  speed: "https://www.icy-veins.com/d3/zuni-carnevil-poison-dart-witch-doctor-speed-farming-build",
  d3guides: "https://www.d3guides.de/de/build/hexendoktor-zunimassas-schlupfwinkel-giftpfeil",
  season: "https://www.d3guides.de/de/season-39",
  carnevil: "https://eu.diablo3.blizzard.com/zh-tw/item/carnevil-P65_Unique_VoodooMask_101_x1",
  zuni: "https://eu.diablo3.blizzard.com/zh-tw/item/zunimassas-string-of-skulls-Unique_Mojo_011_x1",
  dagger: "https://eu.diablo3.blizzard.com/zh-tw/item/the-dagger-of-darts-P65_CeremonialDagger_norm_unique_02",
} as const;

const SOURCES: BuildSource[] = [
  { id: "icy-zuni-overview", url: URLS.overview, title: "Witch Doctor Zuni Carnevil Poison Dart Build", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-25", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push"], snapshot: "将主构筑定义为单人GR推进，并单独指向普通小秘境速刷分支。" },
  { id: "icy-zuni-skills", url: URLS.skills, title: "Zuni Carnevil Poison Dart Witch Doctor Skills and Runes", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-25", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push"], snapshot: "详细技能、被动、十只同步鬼娃、标记循环和可选防御技能。" },
  { id: "icy-zuni-gear", url: URLS.gear, title: "Zuni Carnevil Poison Dart Witch Doctor BiS Gear, Gems, and Paragon Points", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-25", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push"], snapshot: "冲层装备、攻速断点、传奇宝石、普通宝石和巅峰；正文仍残留五只鬼娃旧文。" },
  { id: "icy-zuni-speed", url: URLS.speed, title: "Zuni Carnevil Poison Dart Witch Doctor Speed Farming Build", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-25", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["nephalem-rift-t16"], snapshot: "明确限定普通小秘境至最高折磨，并说明相对顶级速刷存在小缺点。" },
  { id: "d3guides-zuni", url: URLS.d3guides, title: "Zunimassas Schlupfwinkel Giftpfeil — Hexendoktor", publisher: "d3guides.de", author: "eRnstl", updatedAt: "2026-09-11", accessedAt: REVIEWED_AT, season: "39", platform: "pc", content: ["greater-rift-push", "nephalem-rift-t16"], snapshot: "S39 B档，列出GR冲层与速刷变体；肩腕、首饰、技能符文和普通宝石与Icy不同。" },
  { id: "d3guides-season-39", url: URLS.season, title: "Diablo 3 Saison 39", publisher: "d3guides.de", accessedAt: REVIEWED_AT, season: "39", platform: "cross-platform", snapshot: "确认第四魔方槽，并显示巫医海德格赠礼为魔牙而非祖尼玛。" },
  { id: "blizzard-carnevil", url: URLS.carnevil, title: "Carnevil", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "当前官方物品说明明确为最近的十只鬼娃同步发射强力毒镖。" },
  { id: "blizzard-zuni-set", url: URLS.zuni, title: "Zunimassa's String of Skulls", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方套装页列出二、四、六件效果，包括法力消耗技能命中后的8秒宠物增伤标记。" },
  { id: "blizzard-dagger-of-darts", url: URLS.dagger, title: "The Dagger of Darts", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品说明确认角色和鬼娃毒镖穿透并获得额外伤害。" },
];

function gear(id: string, slot: string, name: string, file: string, effect: string, affixes: string[], acquisition: string[], options: Partial<GuideGear> = {}): GuideGear {
  return { id, slot, name, image: itemFile(file), quality: "legendary", effect, affixes, acquisition, ...options };
}

function setGear(id: string, slot: string, name: string, file: string, effect: string, affixes: string[]): GuideGear {
  return gear(id, slot, name, file, effect, affixes, ["血岩碎片赌博对应部位", "重复套装部件使用魔盒套装转换", "世界掉落"], { quality: "set" });
}

function ability(id: string, name: string, rune: string | undefined, logic: string, kind: "active" | "passive" = "active"): GuideAbility {
  return { id, name, rune, logic, image: skillAsset("witch-doctor", kind, id) };
}

function cube(id: string, slot: string, name: string, file: string, effect: string, logic: string, acquisition: string): GuidePower {
  return { id, slot, name, image: itemFile(file), effect, logic, acquisition };
}

const PUSH_ROTATION: BuildConfiguration["rotation"] = [
  { title: "召出鬼娃", action: "进图先施放鬼娃大军，并持续吹箭触发鬼娃跟班。", reason: "鬼娃数量既决定十只同步射手是否齐全，也通过祖尼玛四件提高减伤。" },
  { title: "建立收割", action: "用灵魂行走接近怪群，施放困魂压魄后退回安全射线。", reason: "魂灵收割提供智力和护甲，但不值得为补层长期站在近战范围。" },
  { title: "法力标记", action: "用食人鱼旋风命中精英和准备集火的怪群。", reason: "祖尼玛六件只放大宠物对法力消耗技能命中过的目标，标记持续8秒。" },
  { title: "爆发站区", action: "高价值怪群或首领阶段开启震地狂舞。", reason: "巫毒狂舞的增伤和攻速用于关键输出窗口，不应在转场时浪费。" },
  { title: "沿长轴吹箭", action: "站在怪群长轴持续施放脊刺飞镖，并用灵魂行走修正射角。", reason: "角色与十只鬼娃的穿透飞镖需要尽量贯穿多个目标。" },
];

const SPEED_ROTATION: BuildConfiguration["rotation"] = [
  { title: "召出鬼娃", action: "进图施放鬼娃大军，沿路吹箭补足鬼娃跟班。", reason: "祖尼玛四件减伤与同步毒镖都依赖足够鬼娃。" },
  { title: "恐惧起速", action: "接近怪群时使用恐怖追猎，再用撞魂跨过空图。", reason: "两个技能把移动速度放在普通小秘境的主要路线段。" },
  { title: "收割提速", action: "安全时贴近施放灵魂耗竭，随后立即拉开。", reason: "速刷符文提供移动速度，不把收割当作必须冒险维持的冲层层数。" },
  { title: "聚怪标记", action: "用食人鱼旋风聚拢并标记精英，短时间集中吹箭。", reason: "即使怪物血量低，祖尼玛六件的法力标记仍然不能省略。" },
  { title: "保持金币链", action: "沿主路拾取金币并立刻转向下一组高密度怪。", reason: "囤宝者、金织带和随从贪婪之戒只在掉金币内容中形成攻防链。" },
];

const GEAR: GuideGear[] = [
  gear("zuni-carnevil", "头部", "邪毒狂欢", "carnevil-p65_unique_voodoomask_101_x1.png", "施放剧毒飞镖时，最近的10只鬼娃也会射出一枚强力飞镖。", ["暴击几率", "智力", "体能", "镶孔"], ["血岩碎片赌博巫毒面具", "黄装升级：70级巫毒面具", "特效固定，优先正确词缀"]),
  gear("zuni-skeleton-shoulders", "肩部", "骷髅王肩铠", "pauldrons-of-the-skeleton-king-unique_shoulder_103_x1.png", "受到致命伤害时有概率恢复生命；主要价值是自由肩部词缀。", ["鬼娃大军伤害", "范围伤害", "智力", "体能"], ["第一幕悬赏宝箱", "世界掉落", "先保鬼娃大军伤害"]),
  setGear("zuni-chest-reviewed", "胸部", "祖尼玛萨之髓", "zunimassas-marrow-unique_chest_016_x1.png", "祖尼玛套装部件；胸甲可提供鬼娃大军技能伤。", ["鬼娃大军伤害", "智力", "体能", "3个镶孔"]),
  setGear("zuni-gloves-reviewed", "手部", "祖尼玛萨之手", "zunimassas-finger-wraps-p2_unique_gloves_03.png", "祖尼玛套装部件；攻速是达到毒镖档位的关键词缀。", ["攻击速度", "暴击几率", "暴击伤害", "智力"]),
  gear("zuni-lakumba", "腕部", "拉昆巴的腕饰", "lakumbas-ornament-p72_unique_bracer_102.png", "魂灵收割层数提供减伤；冲层用于保护贴近收割的短窗口。", ["毒素技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "冲层优先保留"]),
  gear("zuni-witching-hour", "腰部", "行巫时刻", "the-witching-hour-unique_belt_009_x1.png", "自带攻速和暴击伤害，并可补剧毒飞镖技能伤。", ["剧毒飞镖伤害", "攻击速度", "暴击伤害", "智力"], ["血岩碎片赌博腰带", "黄装升级：70级普通腰带", "先满足攻速档位"]),
  gear("zuni-depth-diggers", "腿部", "深渊挖掘裤", "depth-diggers-unique_pants_006_p1.png", "放大主要技能伤害；剧毒飞镖是本构筑的角色与宠物伤害入口。", ["剧毒飞镖伤害", "智力", "体能", "2个镶孔"], ["血岩碎片赌博腿部", "黄装升级：70级腿部", "特效优先于远古外框"]),
  setGear("zuni-boots-reviewed", "脚部", "祖尼玛萨之途", "zunimassas-trail-unique_boots_013_x1.png", "祖尼玛套装部件；作为坚韧位，不伪造裤子或腰带才有的毒镖技能伤。", ["智力", "体能", "护甲", "全元素抗性"]),
  gear("zuni-travelers-pledge", "颈部", "旅者之誓", "the-travelers-pledge-unique_amulet_008_x1.png", "与罗盘玫瑰组成无尽之途；移动时减伤，站定吹箭时逐步增伤。", ["镶孔", "毒素技能伤害", "暴击伤害", "暴击几率"], ["黄装升级：70级项链", "世界掉落", "先保镶孔和双暴元素"], { gem: GEMS.simplicity }),
  gear("zuni-compass-rose", "手指", "罗盘玫瑰", "the-compass-rose-unique_ring_013_x1.png", "无尽之途戒指；需要攻速词缀帮助面板越过2.00攻速。", ["镶孔", "攻击速度", "暴击几率", "暴击伤害", "范围伤害"], ["黄装升级：70级戒指", "世界掉落", "优先攻速与镶孔"], { gem: GEMS.enforcer }),
  setGear("zuni-pox-reviewed", "手指", "祖尼玛萨之疾", "zunimassas-pox-unique_ring_012_x1.png", "第五件祖尼玛装备；配皇家华戒激活六件效果。", ["镶孔", "攻击速度", "暴击几率", "暴击伤害", "范围伤害"]),
  gear("zuni-dagger-of-darts", "主手", "箭镖匕刃", "the-dagger-of-darts-p65_ceremonialdagger_norm_unique_02.png", "角色和鬼娃的剧毒飞镖穿透目标，并获得额外伤害。", ["高白字", "伤害%", "攻击速度", "范围伤害", "智力", "拉玛兰迪打孔"], ["黄装升级：70级祭祀刀", "世界掉落", "优先高特效与7%攻速"], { hands: 1 }),
  setGear("zuni-mojo-reviewed", "副手", "祖尼玛萨的头骨串", "zunimassas-string-of-skulls-unique_mojo_011_x1.png", "祖尼玛套装副手；可提供鬼娃大军伤害与高暴击。", ["高伤害范围", "鬼娃大军伤害", "暴击几率", "范围伤害", "智力"]),
  gear("zuni-warzechian", "腕部", "沃兹克护腕", "warzechian-armguards-unique_bracer_101_x1.png", "破坏场景物件后获得移动速度，普通小秘境用于连续转场。", ["毒素技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "安全成型后替换拉昆巴"]),
  gear("zuni-nemesis", "腕部", "复仇者护腕", "nemesis-bracers-unique_bracer_106_x1.png", "点击祭坛召唤精英；组队或随从不能提供时才由角色穿戴。", ["毒素技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "不要与随从发散重复"]),
  gear("zuni-goldwrap", "腰部", "金织带", "goldwrap-unique_belt_010_x1.png", "拾取金币后按金币数量提高护甲；只在会掉金币的普通内容中可靠。", ["智力", "体能", "生命%", "护甲"], ["血岩碎片赌博腰带", "黄装升级：70级普通腰带", "离开金币内容后失效"]),
  gear("zuni-squirts", "颈部", "斯奎特的项链", "squirts-necklace-p66_unique_amulet_010.png", "未受伤时叠加增伤；金织带建立护甲后用于T16快速清场。", ["镶孔", "毒素技能伤害", "暴击伤害", "暴击几率"], ["黄装升级：70级项链", "世界掉落", "先保镶孔和双暴元素"], { gem: GEMS.simplicity }),
  gear("zuni-rechel", "手指", "瑞秋的行窃之戒", "rechels-ring-of-larceny-unique_ring_104_x1.png", "恐惧敌人后获得移动速度，与恐怖追猎联动。", ["镶孔", "攻击速度", "暴击几率", "暴击伤害"], ["黄装升级：70级戒指", "世界掉落", "速刷替换罗盘玫瑰"], { gem: GEMS.enforcer }),
];

const SKILLS: GuideAbility[] = [
  ability("poison-dart", "剧毒飞镖", "脊刺飞镖", "主要输出。脊刺符文负责法力回收；鬼娃复制的飞镖仍造成毒素伤害，不随角色符文改元素。"),
  ability("piranhas", "食人鱼", "食人鱼旋风", "聚怪、易伤并消耗法力命中，从而刷新祖尼玛六件的8秒标记。"),
  ability("big-bad-voodoo", "巫毒狂舞", "震地狂舞", "冲层关键怪群和首领阶段提供攻速与伤害爆发。"),
  ability("spirit-walk", "灵魂行走", "游魂", "冲层用于短暂无敌、穿怪和修正毒镖射线。"),
  ability("soul-harvest", "灵魂收割", "困魂压魄", "短暂贴近叠智力和护甲，并激活拉昆巴减伤。"),
  ability("fetish-army", "鬼娃大军", "利刃军团", "更多永久鬼娃提高同步射手供给，也按祖尼玛四件提高减伤。"),
  ability("horrify", "惧灵", "恐怖追猎", "T16用恐惧触发瑞秋之戒，并直接提供移动速度。"),
  ability("grave-injustice", "剥削死者", undefined, "附近敌人死亡时缩短冷却并恢复生命与法力；密度越高循环越顺。", "passive"),
  ability("pierce-the-veil", "穿透迷障", undefined, "提高全部伤害，但增加法力消耗；脊刺飞镖负责补回资源。", "passive"),
  ability("fetish-sycophants", "鬼娃跟班", undefined, "攻击时召唤额外鬼娃，补足同步射手与祖尼玛四件减伤。", "passive"),
  ability("spirit-vessel", "灵魂容器", undefined, "致命伤害时保命，并缩短灵魂行走冷却。", "passive"),
  ability("fierce-loyalty", "狂热忠诚", undefined, "有宠物时提高移动速度，属于普通小秘境效率被动。", "passive"),
  ability("gruesome-feast", "骇人盛宴", undefined, "拾取生命球后提高智力并恢复法力，T16高密度更容易维持。", "passive"),
];

const POWERS: GuidePower[] = [
  cube("zuni-echoing-fury", "武器", "怒火回荡", "echoing-fury-p66_unique_mace_1h_001.png", "击杀后提高攻击速度与移动速度。", "攻速推动角色与鬼娃毒镖频率，并帮助越过29帧档位。", "黄装升级：70级单手锤"),
  cube("zuni-mask-of-jeram", "防具", "杰拉姆的面具", "mask-of-jeram-p61_unique_voodoomask_102_x1.png", "提高宠物伤害。", "十只同步毒镖的鬼娃是宠物，完整获得该乘区。", "黄装升级：70级巫毒面具"),
  cube("zuni-royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求件数减少1。", "穿戴五件祖尼玛即可激活六件效果，释放头、肩、腕、腰和裤位。", "第一幕或第四幕悬赏宝箱"),
  cube("zuni-shukrani", "第4槽", "舒克拉尼的胜利", "shukranis-triumph-p72_unique_mojo_102.png", "未攻击且未接近敌人时，灵魂行走持续存在。", "第39赛季第四槽用于安全长距离调整和转场；进入输出后仍会结束。", "黄装升级：70级咒物"),
  cube("zuni-carnevil-power", "防具", "邪毒狂欢", "carnevil-p65_unique_voodoomask_101_x1.png", "最近的10只鬼娃同步发射强力剧毒飞镖。", "只有穿戴杰拉姆词缀显著更好时，才与杰拉姆互换穿戴和萃取。", "黄装升级：70级巫毒面具"),
];

const CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "zuni-carnevil", shoulders: "zuni-skeleton-shoulders", chest: "zuni-chest-reviewed", gloves: "zuni-gloves-reviewed",
    bracers: "zuni-lakumba", belt: "zuni-witching-hour", pants: "zuni-depth-diggers", boots: "zuni-boots-reviewed",
    amulet: "zuni-travelers-pledge", ring1: "zuni-compass-rose", ring2: "zuni-pox-reviewed", weapon: "zuni-dagger-of-darts", offhand: "zuni-mojo-reviewed",
  },
  skills: [
    { id: "poison-dart", rune: "脊刺飞镖" }, { id: "piranhas", rune: "食人鱼旋风" }, { id: "big-bad-voodoo", rune: "震地狂舞" },
    { id: "spirit-walk", rune: "游魂" }, { id: "soul-harvest", rune: "困魂压魄" }, { id: "fetish-army", rune: "利刃军团" },
  ],
  passives: ["grave-injustice", "pierce-the-veil", "fetish-sycophants", "spirit-vessel"],
  powers: { weapon: "zuni-echoing-fury", armor: "zuni-mask-of-jeram", jewelry: "zuni-royal-grandeur", season: "zuni-shukrani" },
  legendaryGems: { primary: "simplicity", pet: "enforcer", progression: "bane-of-the-trapped" },
  normalGems: { head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-topaz"), weapon: ["flawless-royal-emerald"] },
  follower: { id: "enchantress", items: ["烟熏香炉", "时光流韵", "复仇者护腕", "神目指环"], skills: ["时间缓流", "预言谐奏", "能量护甲", "心智集中"] },
  statPriorities: {
    breakpoint: ["先让面板攻击速度超过2.00", "武器、手套、腰带、两枚戒指各争取7%攻速", "不要为更高档位牺牲全部双暴与范围伤"],
    damage: ["毒素元素伤", "剧毒飞镖伤害：腰带、裤子", "鬼娃大军伤害：肩部、胸甲、副手", "范围伤害", "暴击几率与暴击伤害"],
    survival: ["智力职业优先护甲", "体能与生命%按实际推进补足", "拉昆巴层数不断", "不按固定巅峰更换宝石"],
  },
  rotation: PUSH_ROTATION,
};

const SPEED_PATCH: NonNullable<BuildScenario["patch"]> = {
  gear: { bracers: "zuni-warzechian", belt: "zuni-goldwrap", amulet: "zuni-squirts", ring1: "zuni-rechel" },
  skills: [
    { id: "poison-dart", rune: "脊刺飞镖" }, { id: "piranhas", rune: "食人鱼旋风" }, { id: "horrify", rune: "恐怖追猎" },
    { id: "spirit-walk", rune: "撞魂" }, { id: "soul-harvest", rune: "灵魂耗竭" }, { id: "fetish-army", rune: "利刃军团" },
  ],
  passives: ["fierce-loyalty", "grave-injustice", "fetish-sycophants", "gruesome-feast"],
  legendaryGems: { primary: "simplicity", pet: "enforcer", progression: "boon-of-the-hoarder" },
  normalGems: { head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-topaz"), weapon: ["flawless-royal-emerald"] },
  follower: { id: "enchantress", items: ["烟熏香炉", "时光流韵", "复仇者护腕", "贪婪之戒"], skills: ["时间缓流", "预言谐奏", "能量护甲", "心智集中"] },
  statPriorities: {
    breakpoint: ["面板攻击速度超过2.00", "装备+巅峰移动速度合计25%", "击杀后维持怒火回荡"],
    damage: ["毒素元素伤", "剧毒飞镖伤害", "攻击速度", "暴击几率与暴击伤害"],
    survival: ["先用拉昆巴确认能稳定清图", "金币链稳定后才换沃兹克与金织带", "离开掉金币内容立即切回冲层配置"],
  },
  rotation: SPEED_ROTATION,
};

const SCENARIOS: BuildScenario[] = [
  {
    id: "gr-push", label: "单人 GR 冲层 · 标准", content: "greater-rift-push", paragonBand: "any", applicability: "supported",
    reason: "Icy将主构筑明确定位为单人GR推进；不再按2000巅峰复制装备，只把宝石和词缀变化写成有触发条件的策略。",
    unchangedReason: "基础配置就是单人GR推进标准版。", configurationId: "zuni-darts-gr-push",
    sourceRefs: [URLS.overview, URLS.skills, URLS.gear, URLS.d3guides], sourceIds: ["icy-zuni-overview", "icy-zuni-skills", "icy-zuni-gear", "d3guides-zuni"], reviewedAt: REVIEWED_AT,
  },
  {
    id: "t16-rift", label: "T16 普通小秘境 · 可用但有小缺点", content: "nephalem-rift-t16", paragonBand: "any", applicability: "viable",
    reason: "专门速刷页只承诺普通小秘境至最高折磨，并明确承认相对顶级速刷有小缺点；因此不扩写成GR速刷、蓝门或悬赏。",
    patch: SPEED_PATCH, configurationId: "zuni-darts-t16", sourceRefs: [URLS.speed, URLS.d3guides], sourceIds: ["icy-zuni-speed", "d3guides-zuni"], reviewedAt: REVIEWED_AT,
  },
];

const PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "达到基础移速上限后停止投入。" },
      { stat: "智力", target: "默认投入", reason: "同时提高伤害与全抗。" },
      { stat: "体能", target: "被秒或无法完成收割时补", reason: "按实际生存缺口投入，不按固定巅峰数字。" },
      { stat: "最大法力", target: "0点", reason: "脊刺飞镖负责回蓝，最大法力不是核心收益。" },
    ],
    offense: [
      { stat: "攻击速度", target: "优先点满", reason: "先帮助面板越过2.00攻速的29帧档位。" },
      { stat: "暴击伤害", target: "第二", reason: "配合装备暴击几率提高毒镖伤害。" },
      { stat: "暴击几率", target: "第三", reason: "与暴击伤害配套。" },
      { stat: "冷却缩减", target: "最后", reason: "不如攻速和双暴直接，主要改善灵魂行走与巫毒狂舞。" },
    ],
    defense: [
      { stat: "护甲", target: "优先点满", reason: "智力已经提供全抗，护甲通常是短板。" },
      { stat: "生命%", target: "第二", reason: "提高被击中时的有效生命。" },
      { stat: "全元素抗性", target: "第三", reason: "补装备和智力未覆盖的缺口。" },
      { stat: "生命恢复", target: "最后", reason: "只作小额续航。" },
    ],
    utility: [
      { stat: "范围伤害", target: "优先点满", reason: "穿透毒镖在高密度怪群中获得额外收益。" },
      { stat: "生命之球拾取范围", target: "第二", reason: "改善主机拾取，并帮助骇人盛宴。" },
      { stat: "击中回复生命", target: "第三", reason: "高频吹箭提供稳定回复。" },
      { stat: "能量消耗降低", target: "最后", reason: "脊刺飞镖已解决主要法力压力。" },
    ],
  },
  post800: [
    { priority: "智力", when: "默认", reason: "仍是稳定伤害和抗性来源。" },
    { priority: "体能", when: "无法安全完成贴近收割或被精英技能秒杀", reason: "只补到能执行完整循环，再回智力。" },
    { priority: "范围伤害替换手套智力", when: "攻速档位、双暴与生存都已满足", reason: "这是条件化词缀升级，不是2000巅峰自动切换。" },
  ],
  checkpoints: [
    { label: "不是本季开荒赠礼", target: "先有五件祖尼玛、皇家华戒、邪毒狂欢与箭镖匕刃", action: "第39赛季巫医赠礼是魔牙；核心件不足时先用现有套装刷取，不把祖尼玛标为开荒即成型。" },
    { label: "发动机成型", target: "十只同步鬼娃、六件标记和穿透匕首", action: "确认食人鱼能刷新8秒标记，再检查鬼娃数量和射角。" },
    { label: "攻速第一档", target: "面板攻击速度超过2.00", action: "优先武器、手套、腰带和两枚戒指的7%攻速；达到29帧档后再评估继续堆攻速。" },
    { label: "坚韧转换", target: "黄宝石或红宝石", action: "默认黄宝石拿智力；只有实际坚韧阻止推进时才逐颗换红宝石补护甲，没有2000巅峰硬线。" },
  ],
};

const POLICIES: BuildChoicePolicy[] = [
  { key: "zuni-core-engine", targetType: "gear", targetId: "zuni-dagger-of-darts", label: "邪毒狂欢 + 箭镖匕刃", status: "locked", reason: "邪毒狂欢让最近十只鬼娃同步，箭镖匕刃让角色和鬼娃飞镖穿透并增伤；缺任一件都不是完整毒镖发动机。" },
  { key: "zuni-set-engine", targetType: "gear", targetId: "zuni-pox-reviewed", label: "祖尼玛五件 + 皇家华戒", status: "locked", reason: "五件穿戴配华戒才激活六件；食人鱼等法力消耗技能命中后，宠物对目标获得8秒套装增伤。" },
  { key: "zuni-ten-fetishes", targetType: "gear", targetId: "zuni-carnevil", label: "最近10只鬼娃", status: "locked", reason: "Blizzard当前物品页与Icy技能页都是10只；Icy装备页的5只属于未同步旧文，不能沿用，更不能写成全部鬼娃。" },
  { key: "zuni-mask-swap", targetType: "power", targetId: "zuni-mask-of-jeram", label: "邪毒狂欢 / 杰拉姆穿戴互换", status: "conditional", reason: "两件头部可按词缀质量互换穿戴与萃取，默认穿邪毒狂欢是因为其特效固定且更容易比较词缀。", alternatives: [{ id: "zuni-carnevil-power", label: "萃取邪毒狂欢", when: "穿戴杰拉姆的词缀显著更好", gain: "保留更好的头部词缀", cost: "必须确认两项威能仍同时存在", scenarios: ["gr-push", "t16-rift"] }] },
  { key: "zuni-third-gem", targetType: "legendary-gem", targetId: "bane-of-the-trapped", label: "第三颗传奇宝石", status: "conditional", reason: "至简之力和侍从宝石固定；多数推进与怪群用困者，只有最高冲层首领真正成为瓶颈时改受罚者。", alternatives: [{ id: "bane-of-the-stricken", label: "受罚者之灾", when: "最高冲层的守关者时间成为主要瓶颈", gain: "持续攻击同一首领可叠加伤害", cost: "清理普通怪群弱于困者", scenarios: ["gr-push"] }, { id: "boon-of-the-hoarder", label: "囤宝者的恩惠", when: "T16普通小秘境", gain: "金币、移速与金织带护甲链", cost: "大秘境不掉金币，完全失效", incompatibleWith: ["greater-rift-push"], scenarios: ["t16-rift"] }] },
  { key: "zuni-armor-gems", targetType: "normal-gem", targetId: "flawless-royal-topaz", label: "防具黄宝石 / 红宝石", status: "conditional", reason: "Icy默认智力黄宝石，并明确说坚韧不足再换护甲红宝石且没有固定断点；d3guides全红只能证明红宝石分支存在，不能证明2000巅峰硬切。", alternatives: [{ id: "flawless-royal-ruby", label: "无瑕皇家红宝石", when: "实际护甲不足，无法完成收割和站定吹箭", gain: "提高护甲", cost: "失去智力带来的伤害和全抗", scenarios: ["gr-push"] }] },
  { key: "zuni-speed-boundary", targetType: "gear", targetId: "zuni-goldwrap", label: "只创建T16普通小秘境速刷", status: "locked", reason: "精确来源没有给出GR速刷、蓝门、悬赏或幻化农场配置；金织带和囤宝者也依赖掉金币内容，因此不强行凑用途。" },
  { key: "zuni-speed-bracer", targetType: "gear", targetId: "zuni-lakumba", label: "拉昆巴 / 沃兹克 / 复仇者", status: "conditional", reason: "初入T16先保拉昆巴；确认金币链和伤害稳定后用沃兹克赶路；组队或随从不能发散复仇者时才由角色穿复仇者。", alternatives: [{ id: "zuni-warzechian", label: "沃兹克护腕", when: "T16生存稳定且场景物件密集", gain: "破坏物件后提高移速", cost: "失去拉昆巴减伤", scenarios: ["t16-rift"] }, { id: "zuni-nemesis", label: "复仇者护腕", when: "组队或随从不带复仇者", gain: "祭坛召唤更多精英", cost: "失去拉昆巴或沃兹克", scenarios: ["t16-rift"] }] },
  { key: "zuni-high-paragon-affix", targetType: "gear", targetId: "zuni-gloves-reviewed", label: "高成长词缀替换", status: "conditional", reason: "巅峰和卡德山提供足够智力、攻速档位与生存都达标后，手套智力才可换范围伤；没有统一的2000巅峰自动切线。", alternatives: [{ id: "area-damage-affix", label: "范围伤害词缀", when: "面板攻速超过2.00、双暴齐全且实战坚韧足够", gain: "提高高密度冲层上限", cost: "失去智力的伤害与全抗", scenarios: ["gr-push"] }] },
  { key: "zuni-follower", targetType: "follower", targetId: "enchantress", label: "魔女", status: "flexible", reason: "魔女的攻速和冷却支持档位与技能循环；T16让随从发散复仇者与贪婪之戒。Nintendo Switch技能映射和发散表现仍待实机确认。" },
];

const CLAIMS: EvidenceClaim[] = [
  { id: "zuni-activity-gr-push", category: "applicability", path: "scenarios.gr-push", conclusion: "单人GR推进是主用途。", sourceIds: ["icy-zuni-overview", "d3guides-zuni"], status: "cross-checked" },
  { id: "zuni-activity-t16", category: "applicability", path: "scenarios.t16-rift", conclusion: "T16普通小秘境可用，但Icy明确提示相对顶级速刷有小缺点。", sourceIds: ["icy-zuni-speed", "d3guides-zuni"], status: "cross-checked" },
  { id: "zuni-no-forced-activities", category: "applicability", path: "scenarios", conclusion: "不创建GR速刷、蓝门、悬赏或高低巅峰复制场景。", sourceIds: ["icy-zuni-overview", "icy-zuni-speed"], status: "single-source" },
  { id: "zuni-ten-fetishes", category: "gear", path: "gear.zuni-carnevil", conclusion: "当前效果是最近10只鬼娃同步，而不是5只或全部鬼娃。", sourceIds: ["blizzard-carnevil", "icy-zuni-skills", "icy-zuni-gear"], status: "cross-checked", conflictNote: "Icy装备页仍写5只；Blizzard当前物品页和Icy技能页写10只，因此按当前官方值采用10只。" },
  { id: "zuni-set-mark", category: "gear", path: "configurationBase.gear", conclusion: "五件祖尼玛配华戒激活六件；法力消耗命中提供8秒宠物增伤标记。", sourceIds: ["blizzard-zuni-set", "icy-zuni-gear", "d3guides-zuni"], status: "cross-checked" },
  { id: "zuni-dagger-pierce", category: "gear", path: "gear.zuni-dagger-of-darts", conclusion: "角色和鬼娃毒镖穿透并获得额外伤害。", sourceIds: ["blizzard-dagger-of-darts", "icy-zuni-gear", "d3guides-zuni"], status: "cross-checked" },
  { id: "zuni-push-gear-conflict", category: "gear", path: "configurationBase.gear", conclusion: "当前采用Icy的骷髅王肩、拉昆巴与无尽之途；d3guides采用奥吉德、斯奎特和全能法戒，完整装备未交叉一致。", sourceIds: ["icy-zuni-gear", "d3guides-zuni"], status: "unverified", conflictNote: "保留更完整解释词缀、断点和替换条件的Icy方案；第二方案作为差异记录，不混拼。" },
  { id: "zuni-push-skills-conflict", category: "skills", path: "configurationBase.skills", conclusion: "Icy与d3guides对爆发技能、位移符文和收割符文存在差异。", sourceIds: ["icy-zuni-skills", "d3guides-zuni"], status: "unverified", conflictNote: "当前采用Icy详细技能页；d3guides的火焰飞镖、惧灵和不同灵魂行走符文不混入。" },
  { id: "zuni-core-gems", category: "legendary-gems", path: "configurationBase.legendaryGems.primary,configurationBase.legendaryGems.pet", conclusion: "至简之力和侍从宝石是两颗固定核心宝石。", sourceIds: ["icy-zuni-gear", "d3guides-zuni"], status: "cross-checked" },
  { id: "zuni-third-gem", category: "legendary-gems", path: "choicePolicies.zuni-third-gem", conclusion: "多数推进采用困者，最高冲层首领瓶颈改受罚者。", sourceIds: ["icy-zuni-gear", "d3guides-zuni"], status: "unverified", conflictNote: "Icy正文区分困者与受罚者用途；d3guides直接使用受罚者。" },
  { id: "zuni-armor-gem-policy", category: "normal-gems", path: "choicePolicies.zuni-armor-gems", conclusion: "黄转红由实际护甲瓶颈触发，不存在2000巅峰硬切。", sourceIds: ["icy-zuni-gear", "d3guides-zuni"], status: "unverified", conflictNote: "Icy默认黄并按坚韧切红；d3guides直接全红，但未给固定巅峰断点。" },
  { id: "zuni-attack-speed", category: "stats", path: "configurationBase.statPriorities.breakpoint", conclusion: "第一目标是面板攻速超过2.00，对应29帧档位。", sourceIds: ["icy-zuni-gear"], status: "single-source" },
  { id: "zuni-season-start", category: "applicability", path: "paragonGuide.checkpoints", conclusion: "第39赛季巫医海德格赠礼是魔牙，祖尼玛不是直接开荒赠礼。", sourceIds: ["d3guides-season-39"], status: "single-source" },
  { id: "zuni-switch-runtime", category: "platform", path: "platformStatus", conclusion: "Nintendo Switch技能映射、宠物射线控制和随从发散尚未实机验证。", sourceIds: [], status: "unverified", conflictNote: "当前精确构筑来源是PC页；Blizzard物品机制页为跨平台，但不等于Switch手感验证。" },
];

export function reviewZuniDartsGuide(base: BuildGuide): BuildGuide {
  const reviewed: BuildGuide = {
    ...base,
    core: "法力标记 → 最近10只鬼娃同步穿透毒镖",
    summary: "邪毒狂欢只让最近10只鬼娃同步角色的剧毒飞镖，箭镖匕刃让这些飞镖穿透；食人鱼必须持续刷新祖尼玛六件的8秒宠物增伤标记。",
    follower: "魔女",
    followerReason: "攻速帮助跨越毒镖档位，冷却与远程控场支持灵魂行走和安全射线。",
    gear: GEAR,
    skills: SKILLS.filter((entry) => entry.image.includes("-active-")),
    passives: SKILLS.filter((entry) => entry.image.includes("-passive-")),
    powers: POWERS,
    links: [
      { title: "十只鬼娃同步", category: "damage", conclusion: "不是全部鬼娃：只有最近10只同步，但所有同步飞镖都会被箭镖匕刃强化并穿透。", steps: [{ id: "poison-dart", label: "角色飞镖", detail: "决定同步射击时机" }, { id: "zuni-carnevil", label: "邪毒狂欢", detail: "最近10只鬼娃同步" }, { id: "zuni-dagger-of-darts", label: "箭镖匕刃", detail: "角色与鬼娃飞镖穿透增伤" }] },
      { title: "祖尼玛8秒标记", category: "damage", conclusion: "只吹箭不能启动六件；每组高价值目标都要先被法力消耗技能命中。", steps: [{ id: "piranhas", label: "食人鱼旋风", detail: "消耗法力并聚怪" }, { id: "zuni-mojo-reviewed", label: "祖尼玛六件", detail: "标记目标8秒" }, { id: "poison-dart", label: "穿透毒镖", detail: "集中攻击标记目标" }] },
      { title: "29帧攻速入口", category: "damage", conclusion: "先让面板攻速超过2.00，再比较范围伤、双暴或更高攻速档；不要只看到高巅峰就自动换词缀。", steps: [{ id: "zuni-dagger-of-darts", label: "武器7%攻速", detail: "固定发动机上补攻速" }, { id: "zuni-gloves-reviewed", label: "手套7%攻速", detail: "与双暴共同保留" }, { id: "zuni-witching-hour", label: "腰带攻速", detail: "配合两枚戒指跨档" }, { id: "zuni-echoing-fury", label: "怒火回荡", detail: "击杀后继续加速" }] },
      { title: "鬼娃数量也是防线", category: "defense", conclusion: "祖尼玛四件按每只鬼娃提供减伤；进图未召军团或鬼娃死亡时，伤害与坚韧会一起下降。", steps: [{ id: "fetish-army", label: "鬼娃大军", detail: "建立永久鬼娃" }, { id: "fetish-sycophants", label: "鬼娃跟班", detail: "持续补充" }, { id: "zuni-pox-reviewed", label: "祖尼玛四件", detail: "每只鬼娃提高减伤" }] },
    ],
    rotation: PUSH_ROTATION,
    source: URLS.overview,
    purpose: "greater-rift",
    supportedContent: ["单人GR冲层", "T16普通小秘境"],
    defaultMode: "push",
    modeLabels: { push: "单人GR冲层", speed: "T16普通小秘境" },
    pushNote: "先召满鬼娃并用食人鱼刷新8秒标记，再沿怪群长轴吹箭；关键怪群开启震地狂舞。",
    speedNote: "仅按T16普通小秘境配置：恐怖追猎、撞魂、灵魂耗竭与金币链负责转场，不外推为GR速刷或悬赏。",
    lowNote: "不按低巅峰复制装备；核心件、六件标记、拉昆巴层数和2.00攻速入口优先。",
    highNote: "不按2000巅峰自动换宝石；生存与档位都满足后，才把手套智力等词缀让给范围伤。",
    configurationBase: CONFIGURATION_BASE,
    defaultScenarioId: "gr-push",
    scenarios: SCENARIOS,
    paragonGuide: PARAGON,
    choicePolicies: POLICIES,
    reviewStatus: "scenario-reviewed",
    variantCompleteness: "complete",
    evidenceStatus: "source-checked",
    platformStatus: "platform-risk",
    dataProvenance: "hand-authored",
    evidenceNote: "已完成第39赛季PC资料的字段级校对，纠正‘全部鬼娃’、错误匕首名称、混入虫群/虚空戒、奥吉德占位和高巅峰钻石模板；Icy内部5/10只旧文冲突已用Blizzard当前物品页消歧，但第二来源完整配装差异与Nintendo Switch实机验证仍未关闭。",
    structuredSources: SOURCES,
    evidenceClaims: CLAIMS,
  };

  const errors = [
    ...validateReviewedBuildGuide(reviewed),
    ...validateBuildSemantics(reviewed),
    ...validateBuildEvidence(reviewed),
  ];
  if (errors.length > 0) throw new Error(`祖尼玛毒镖配置校验失败：${[...new Set(errors)].join("；")}`);
  return reviewed;
}
