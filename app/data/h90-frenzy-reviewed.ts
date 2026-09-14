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
import { D3_ITEM_ROOT, D3_SKILL_ROOT } from "./assets";

const REVIEWED_AT = "2026-09-14";
const ITEM = `${D3_ITEM_ROOT}/`;
const SKILL = `${D3_SKILL_ROOT}/`;

const URLS = {
  overview: "https://www.icy-veins.com/d3/barbarian-frenzy-build-with-the-horde-of-the-ninety-savages-set",
  skills: "https://www.icy-veins.com/d3/frenzy-hotns-barbarian-skills-and-runes",
  gear: "https://www.icy-veins.com/d3/frenzy-hotns-barbarian-bis-gear-gems-paragon-points",
  grSpeed: "https://www.icy-veins.com/d3/frenzy-hotns-barbarian-greater-rift-speed-farming-build",
  t16: "https://www.icy-veins.com/d3/frenzy-hotns-barbarian-nephalem-rift-speed-farming-build",
  d3guides: "https://www.d3guides.de/de/build/barbar-horde-der-neunzig-wilden-raserei",
  season: "https://news.blizzard.com/en-gb/article/24287549/season-39-shades-of-the-nephalem-now-live",
  savages: "https://us.diablo3.blizzard.com/en-us/item/markings-of-savages-P68_Unique_Chest_Set_05",
  bastion: "https://us.diablo3.blizzard.com/en-us/item/bastions-revered-P68_Unique_Mighty_2H_004",
  undisputed: "https://us.diablo3.blizzard.com/en-us/item/the-undisputed-champion-P68_Unique_BarbBelt_006",
  oathkeeper: "https://us.diablo3.blizzard.com/en-us/item/oathkeeper-P4_Unique_Mighty_1H_104",
  chilanik: "https://us.diablo3.blizzard.com/en-us/item/chilaniks-chain-Unique_BarbBelt_101_x1",
} as const;

const SOURCES: BuildSource[] = [
  { id: "icy-h90-overview", url: URLS.overview, title: "Barbarian Frenzy Build with the Horde of the Ninety Savages Set", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-23", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push"], snapshot: "主入口把九十蛮列为单人GR推进，并链接独立GR速刷与T16变体；导航标签本身只显示冲层，和子页面覆盖范围不一致。" },
  { id: "icy-h90-skills", url: URLS.skills, title: "Frenzy HotNS Barbarian Skills and Runes", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-23", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push"], snapshot: "冲层技能表为怒气冲天、无情突袭、老兵之诫、惊魂余音、血溅十方与癫狂；四被动为狂暴、狂战盛怒、布尔凯索和无情暴虐。" },
  { id: "icy-h90-gear", url: URLS.gear, title: "Frenzy HotNS Barbarian BiS Gear, Gems, and Paragon Points", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-23", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push"], snapshot: "给出5九十蛮+2奥吉德、无尽之途、力量指环、宝石、巅峰与S39对剑+第四槽守誓者；护甲孔先红，只有坚韧阻碍推进时才换白，没有固定巅峰线。" },
  { id: "icy-h90-gr-speed", url: URLS.grSpeed, title: "Frenzy HotNS Barbarian Greater Rift Speed Farming Variation", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-23", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-speed"], snapshot: "独立GR速刷页使用斯奎特、力量指环、全能、寅剑+守誓者、火牛羚砂囊和S39回荡狂怒，并要求追精英、忽略零散怪。技能速查表与正文对战吼符文不一致。" },
  { id: "icy-h90-t16", url: URLS.t16, title: "Frenzy HotNS Barbarian Nephalem Rift Speed Farming Variation", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-23", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["nephalem-rift-t16", "bounty"], snapshot: "明确支持最高折磨的小秘境和悬赏；穿九十蛮肩与深渊挖掘裤、沃兹克、地狱火/时光、瑞秋、力量指环及寅剑+守誓者，魔方使用兵要、金织带/齐拉尼克、华戒和回荡狂怒。" },
  { id: "d3guides-h90", url: URLS.d3guides, title: "Horde der Neunzig Wilden Raserei — Barbar", publisher: "d3guides.de", author: "eRnstl", updatedAt: "2026-08-14", accessedAt: REVIEWED_AT, season: "39", platform: "pc", content: ["greater-rift-push", "greater-rift-speed", "nephalem-rift-t16"], snapshot: "S39页面提供冲层、速刷和T16三变体，能交叉确认用途，但具体技能、穿戴槽和第四魔方槽与Icy明显不同；其‘其余8孔全白’文字也与实际孔位数量不符。" },
  { id: "blizzard-season-39", url: URLS.season, title: "Season 39: Shades of the Nephalem — Now Live", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "cross-platform", snapshot: "官方确认第39赛季开放不受物品类型限制、但同类威能不能叠加的第四魔方槽。" },
  { id: "blizzard-savages", url: URLS.savages, title: "Horde of the Ninety Savages", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方套装页确认两件翻倍战吼并对恐惧、冰冻或眩晕目标增伤；四件按狂乱层数减伤；六件按层数提高狂乱伤害。" },
  { id: "blizzard-bastion", url: URLS.bastion, title: "Bastion's Revered", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品页确认狂乱可叠至10层，并按层数追加命中、向近距离目标连锁。" },
  { id: "blizzard-undisputed", url: URLS.undisputed, title: "The Undisputed Champion", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品页确认狂乱获得全部符文，并获得独立技能增伤。" },
  { id: "blizzard-oathkeeper", url: URLS.oathkeeper, title: "Oathkeeper", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品页确认主要技能攻击更快并造成更多伤害。" },
  { id: "blizzard-chilanik", url: URLS.chilanik, title: "Chilanik's Chain", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品页确认施放战吼后提供10秒移动速度；Icy将其列为更激进的T16魔方选项。" },
];

const BASE_GEAR_IDS = [
  "savages-head", "aughild-shoulders", "savages-chest", "savages-gloves", "aughild-bracers", "undisputed",
  "savages-pants", "savages-boots", "travelers-pledge", "compass-rose", "band-of-might", "slanderer", "little-rogue",
] as const;

const GEAR_OVERRIDES: Partial<Record<(typeof BASE_GEAR_IDS)[number], Partial<GuideGear>>> = {
  "savages-head": { affixes: ["力量", "镶孔", "暴击几率", "体能"] },
  "aughild-shoulders": { affixes: ["力量", "冷却缩减", "范围伤害", "体能"] },
  "savages-chest": { affixes: ["力量", "3个镶孔", "全元素抗性", "精英伤害减免"] },
  "savages-gloves": { affixes: ["力量 / 高巅峰按需换范围伤", "暴击几率", "暴击伤害", "冷却缩减"] },
  "aughild-bracers": { affixes: ["力量", "暴击几率", "冰霜技能伤害", "体能 / 击中回复生命"] },
  undisputed: { affixes: ["力量", "狂乱技能伤害", "体能", "全元素抗性"] },
  "savages-pants": { affixes: ["力量", "2个镶孔", "狂乱技能伤害", "体能"] },
  "savages-boots": { affixes: ["力量", "体能", "全元素抗性", "护甲"] },
  "travelers-pledge": { affixes: ["镶孔", "暴击伤害", "暴击几率", "冰霜技能伤害"] },
  "compass-rose": { affixes: ["镶孔", "暴击几率", "暴击伤害", "范围伤害"] },
  "band-of-might": { affixes: ["镶孔", "暴击几率", "暴击伤害", "范围伤害"] },
  slanderer: { affixes: ["高白字伤害", "伤害%", "冷却缩减", "范围伤害", "拉玛兰迪打孔"] },
  "little-rogue": { affixes: ["高白字伤害", "伤害%", "冷却缩减", "范围伤害", "拉玛兰迪打孔"] },
};

function reviewedGear(base: BuildGuide): GuideGear[] {
  const byId = new Map(base.gear.map((item) => [item.id, item]));
  const gear = BASE_GEAR_IDS.map((id) => {
    const item = byId.get(id);
    if (!item) throw new Error(`九十蛮狂乱缺少装备定义：${id}`);
    return { ...item, ...GEAR_OVERRIDES[id] };
  });
  gear.push(
    {
      id: "savages-shoulders", slot: "肩部", name: "九十蛮之刺", image: `${ITEM}spines-of-savages-p68_unique_shoulder_set_05.png`, quality: "set",
      effect: "九十蛮套装肩甲；T16穿六件套中的第五件，并由皇家华戒补成六件。",
      affixes: ["力量", "冷却缩减", "范围伤害", "体能"],
      acquisition: ["血岩碎片：赌博护肩", "重复九十蛮护甲可用套装转换", "只在脱下奥吉德肩的T16变体穿戴"],
    },
    {
      id: "squirts", slot: "颈部", name: "斯奎特的项链", image: `${ITEM}squirts-necklace-p66_unique_amulet_010.png`, quality: "legendary",
      effect: "未受伤时叠加增伤；GR速刷用火牛羚护盾帮助保持层数。",
      affixes: ["镶孔", "暴击伤害", "暴击几率", "冰霜技能伤害"],
      acquisition: ["世界掉落与大秘境结算", "黄装升级：70级项链", "先保镶孔，再追双暴与冰伤"],
      warning: "没有火牛羚护盾或持续受伤时会掉层，不是无条件双倍伤害。",
    },
    {
      id: "coe", slot: "手指", name: "全能法戒", image: `${ITEM}convention-of-elements-p2_unique_ring_04.png`, quality: "legendary",
      effect: "GR速刷保留冰霜周期爆发，用于快速击杀精英。",
      affixes: ["镶孔", "暴击几率", "暴击伤害", "范围伤害 / 均伤"],
      acquisition: ["世界掉落与大秘境结算", "黄装升级：70级戒指", "戒指池很大，先用正确特效版本"],
    },
    {
      id: "ingeom", slot: "主手", name: "寅剑", image: `${ITEM}ingeom-unique_sword_1h_113_x1.png`, quality: "legendary",
      effect: "击杀精英后大幅缩短技能冷却，使冲锋和狂战之怒在速刷中高频可用。",
      affixes: ["高白字伤害", "力量", "冷却缩减", "伤害% / 范围伤害", "拉玛兰迪打孔"],
      acquisition: ["黄装升级：70级单手剑", "世界掉落与大秘境结算", "精英击杀不断档时才有完整收益"],
    },
    {
      id: "oathkeeper-worn", slot: "副手", name: "守誓者", image: `${ITEM}oathkeeper-p4_unique_mighty_1h_104.png`, quality: "legendary",
      effect: "提高主要技能伤害与攻速，是狂乱速刷仍必须保留的武器乘区。",
      affixes: ["高白字伤害", "力量", "冷却缩减", "攻击速度", "拉玛兰迪打孔"],
      acquisition: ["黄装升级：70级单手重型武器", "世界掉落与大秘境结算", "速刷穿戴；冲层S39改为第四魔方槽"],
    },
    {
      id: "depth-diggers-worn", slot: "腿部", name: "深渊挖掘裤", image: `${ITEM}depth-diggers-unique_pants_006_p1.png`, quality: "legendary",
      effect: "直接穿戴主要技能乘区，释放T16防具魔方槽给金织带或齐拉尼克。",
      affixes: ["力量", "2个镶孔", "狂乱技能伤害", "体能"],
      acquisition: ["血岩碎片：赌博裤子", "黄装升级：70级裤子", "只在同时穿九十蛮肩并萃取皇家华戒时使用"],
      warning: "穿上后必须改穿九十蛮肩；不能沿用奥吉德肩，否则九十蛮六件会断。",
    },
    {
      id: "warzechian", slot: "腕部", name: "沃兹克护腕", image: `${ITEM}warzechian-armguards-unique_bracer_101_x1.png`, quality: "legendary",
      effect: "打碎可破坏物后短时加速，适合T16和悬赏连续赶路。",
      affixes: ["力量", "暴击几率", "对应狂乱元素伤害", "体能 / 击中回复生命"],
      acquisition: ["血岩碎片：赌博护腕", "黄装升级：70级护腕", "单人速刷穿戴；组队可改复仇者护腕"],
    },
    {
      id: "flavor-time", slot: "颈部", name: "时光流韵", image: `${ITEM}the-flavor-of-time-p66_unique_amulet_001.png`, quality: "legendary",
      effect: "延长塔效果；Icy列为T16组队选择，本项目用它表示有明确来源的可展示替代。",
      affixes: ["镶孔", "暴击伤害", "暴击几率", "对应狂乱元素伤害"],
      acquisition: ["世界掉落与大秘境结算", "黄装升级：70级项链", "单人最优通常是带合适被动的地狱火项链"],
      warning: "这是来源明确的组队替代；单人理想项链为地狱火项链，待补齐准确物品图后再切换默认展示。",
    },
    {
      id: "rechel", slot: "手指", name: "瑞秋的行窃之戒", image: `${ITEM}rechels-ring-of-larceny-unique_ring_104_x1.png`, quality: "legendary",
      effect: "恐惧敌人后获得短时移速；T16单人用武器恐惧命中副词缀触发。",
      affixes: ["镶孔", "暴击几率", "暴击伤害", "范围伤害 / 力量"],
      acquisition: ["世界掉落与大秘境结算", "黄装升级：70级戒指", "必须同时准备可靠的恐惧命中来源"],
      warning: "眩晕或冰冻不会触发这枚戒指；武器需要恐惧命中副词缀。",
    },
  );
  return gear;
}

const ACTIVE: GuideAbility[] = [
  { id: "frenzy", name: "狂乱", rune: "怒气冲天", image: `${SKILL}barbarian-active-frenzy.png`, logic: "主要伤害技能；无可争辩的勇士会同时赋予全部符文，当前符文只决定元素类型。" },
  { id: "furious-charge", name: "狂暴冲锋", rune: "无情突袭", image: `${SKILL}barbarian-active-furious-charge.png`, logic: "冲层用来追精英并刷新力量指环；GR速刷可在寅剑稳定后换寒冰冲撞立即触发套装控制条件。" },
  { id: "war-cry", name: "战吼", rune: "老兵之诫", image: `${SKILL}barbarian-active-war-cry.png`, logic: "套装两件翻倍战吼效果；GR速刷正文改赦免，T16仍用老兵之诫。" },
  { id: "threatening-shout", name: "威吓呐喊", rune: "惊魂余音", image: `${SKILL}barbarian-active-threatening-shout.png`, logic: "让目标承受更多伤害；T16为疾奔让位。" },
  { id: "battle-rage", name: "战斗怒火", rune: "血溅十方", image: `${SKILL}barbarian-active-battle-rage.png`, logic: "冲层与GR速刷把高攻速暴击转成怪群溅射；T16改凶残提高移速。" },
  { id: "wrath-of-the-berserker", name: "狂战之怒", rune: "癫狂", image: `${SKILL}barbarian-active-wrath-of-the-berserker.png`, logic: "冲层留给精英与危险窗口；速刷借寅剑提高覆盖率。" },
  { id: "sprint", name: "疾奔", rune: "奔跑健将", image: `${SKILL}barbarian-active-sprint.png`, logic: "T16与悬赏替代威吓呐喊，跨越没有目标可冲锋的空地。" },
];

const PASSIVES: GuideAbility[] = [
  { id: "rampage", name: "狂暴", image: `${SKILL}barbarian-passive-rampage.png`, logic: "连续击杀叠力量，密集战中同时提高伤害和护甲。" },
  { id: "berserker-rage", name: "狂战盛怒", image: `${SKILL}barbarian-passive-berserker-rage.png`, logic: "狂乱是生成技能，怒气接近满值时获得稳定增伤。" },
  { id: "boon-of-bulkathos", name: "布尔凯索的庇佑", image: `${SKILL}barbarian-passive-boon-of-bulkathos.png`, logic: "缩短狂战之怒冷却；三个场景都保留。" },
  { id: "ruthless", name: "无情暴虐", image: `${SKILL}barbarian-passive-ruthless.png`, logic: "冲层加快低生命精英和首领的收尾。" },
  { id: "brawler", name: "好斗勇者", image: `${SKILL}barbarian-passive-brawler.png`, logic: "GR速刷贴近多名敌人时提高伤害，取代首领向的无情暴虐。" },
  { id: "pound-of-flesh", name: "血肉铸就", image: `${SKILL}barbarian-passive-pound-of-flesh.png`, logic: "T16拾取生命球后提高移速，与扩大拾取范围的随从贪婪之戒配合。" },
];

function reviewedPowers(base: BuildGuide): GuidePower[] {
  const ids = new Set(["bastions", "depth-diggers", "royal-grandeur", "oathkeeper"]);
  const powers = base.powers.filter((item) => ids.has(item.id));
  powers.push(
    {
      id: "echoing-fury", slot: "第4槽", name: "回荡狂怒", image: `${ITEM}echoing-fury-p66_unique_mace_1h_001.png`,
      effect: "击杀后叠加攻速和移动速度。", logic: "S39速刷第四槽；依赖连续击杀，首领和断怪时会掉层。", acquisition: "黄装升级：70级单手锤后萃取",
    },
    {
      id: "goldwrap", slot: "防具", name: "金织带", image: `${ITEM}goldwrap-unique_belt_010_x1.png`,
      effect: "拾取金币后按金币量提高护甲。", logic: "只在会掉金币的T16与悬赏中，配合囤宝者和随从贪婪之戒形成防线。", acquisition: "血岩碎片赌博腰带或黄装升级70级腰带",
    },
    {
      id: "chilanik", slot: "防具", name: "齐拉尼克之链", image: `${ITEM}chilaniks-chain-unique_barbbelt_101_x1.png`,
      effect: "施放战吼后提供10秒移动速度。", logic: "伤害和生存已溢出时替代金织带；每10秒重放战吼维持。", acquisition: "血岩碎片赌博重型腰带或黄装升级70级重型腰带",
    },
  );
  return powers;
}

const PUSH_ROTATION: BuildConfiguration["rotation"] = [
  { title: "开启三吼", action: "先维持战吼、威吓呐喊和战斗怒火。", reason: "九十蛮两件翻倍战吼，威吓与战斗怒火也是输出条件。" },
  { title: "冲锋控敌", action: "冲向精英并确保力量指环减伤已刷新。", reason: "冲锋既是位移与减伤开关，也用眩晕/冰冻条件启动套装两件增伤。" },
  { title: "叠满狂乱", action: "优先持续攻击同一高生命目标，把狂乱叠至10层。", reason: "套装四件、六件与兵要护符都按狂乱层数工作。" },
  { title: "精英爆发", action: "在危险精英或需要快速收尾时开启狂战之怒。", reason: "冲层无法永久覆盖狂战，不能把它当常驻状态。" },
  { title: "舍弃散怪", action: "精英死亡后用冲锋转场，不为零散杂兵停留。", reason: "这套以单体追杀为强项，错误清图会浪费大秘境计时。" },
];

const GR_SPEED_ROTATION: BuildConfiguration["rotation"] = [
  { title: "先杀首组精英", action: "开场用无情突袭保证冲锋循环，尽快击杀第一组精英启动寅剑。", reason: "没有寅剑时直接用寒冰冲撞可能造成冲锋断档。" },
  { title: "维持三吼", action: "战吼、威吓呐喊和战斗怒火接近结束就补。", reason: "速刷仍依赖完整战吼增益，不是只换移速装备。" },
  { title: "冲锋触发", action: "寅剑稳定后用寒冰冲撞穿到精英身边。", reason: "冰冻会立即启动九十蛮两件控制目标增伤。" },
  { title: "斯奎特追杀", action: "火牛羚护盾存在时贴住精英快速狂乱，忽略零散怪。", reason: "护盾帮助保持斯奎特层数，玩法仍是精英连杀。" },
  { title: "击杀续档", action: "在寅剑和回荡狂怒结束前找到下一组精英。", reason: "两条速刷威能都依赖连续击杀，断档后速度会显著下降。" },
];

const T16_ROTATION: BuildConfiguration["rotation"] = [
  { title: "开启移速", action: "维持疾奔、战斗怒火和战吼。", reason: "疾奔与凶残负责常驻移速；战吼若改齐拉尼克还需每10秒刷新。" },
  { title: "恐惧触发", action: "用带恐惧命中副词缀的武器攻击沿路目标。", reason: "瑞秋只认恐惧，不会被狂乱自带的眩晕或冰冻替代。" },
  { title: "精英优先", action: "冲锋越过杂兵并快速击杀精英。", reason: "寅剑和回荡狂怒启动后，后续冲锋与狂战覆盖才稳定。" },
  { title: "金币防线", action: "保持拾取金币，让囤宝者、随从贪婪之戒和金织带连续生效。", reason: "这条防线只在会掉金币的内容成立，大秘境不能使用。" },
  { title: "空图疾奔", action: "没有目标可冲锋时，用奔跑健将连接下一处事件或精英。", reason: "这是悬赏比GR更需要的长距离转场工具。" },
];

const CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "savages-head", shoulders: "aughild-shoulders", chest: "savages-chest", gloves: "savages-gloves",
    bracers: "aughild-bracers", belt: "undisputed", pants: "savages-pants", boots: "savages-boots",
    amulet: "travelers-pledge", ring1: "compass-rose", ring2: "band-of-might", weapon: "slanderer", offhand: "little-rogue",
  },
  skills: [
    { id: "frenzy", rune: "怒气冲天" }, { id: "furious-charge", rune: "无情突袭" },
    { id: "war-cry", rune: "老兵之诫" }, { id: "threatening-shout", rune: "惊魂余音" },
    { id: "battle-rage", rune: "血溅十方" }, { id: "wrath-of-the-berserker", rune: "癫狂" },
  ],
  passives: ["rampage", "berserker-rage", "boon-of-bulkathos", "ruthless"],
  powers: { weapon: "bastions", armor: "depth-diggers", jewelry: "royal-grandeur", season: "oathkeeper" },
  legendaryGems: { control: "bane-of-the-trapped", primary: "simplicity", boss: "bane-of-the-stricken" },
  normalGems: {
    head: ["flawless-royal-diamond"],
    armor: Array(5).fill("flawless-royal-ruby"),
    weapon: ["flawless-royal-emerald", "flawless-royal-emerald"],
  },
  follower: {
    id: "scoundrel",
    items: ["不死圣物", "神目指环", "时光流韵", "复仇者护腕"],
    skills: ["夜幕遮蔽", "解剖学", "消失"],
  },
  statPriorities: {
    damage: ["冰霜技能伤害", "暴击几率与暴击伤害", "范围伤害", "狂乱技能伤害"],
    engine: ["冷却缩减", "力量指环刷新", "狂乱10层", "武器控制命中副词缀"],
    survival: ["全元素抗性", "生命%", "护甲", "击中回复生命"],
  },
  rotation: PUSH_ROTATION,
};

const SCENARIOS: BuildScenario[] = [
  {
    id: "gr-push", label: "单人 GR 冲层", content: "greater-rift-push", paragonBand: "any", applicability: "supported",
    reason: "Icy有完整S39冲层方案；d3guides也支持该用途，但其技能与第四槽属于另一套方案。当前不混拼，采用Icy的5+2、无尽之途、对剑和第四槽守誓者闭环。",
    unchangedReason: "基础配置就是当前选定的S39单人GR冲层方案。", configurationId: "h90-frenzy-gr-push",
    sourceRefs: [URLS.overview, URLS.skills, URLS.gear, URLS.d3guides, URLS.savages, URLS.bastion, URLS.undisputed, URLS.oathkeeper, URLS.season],
    sourceIds: ["icy-h90-overview", "icy-h90-skills", "icy-h90-gear", "d3guides-h90", "blizzard-savages", "blizzard-bastion", "blizzard-undisputed", "blizzard-oathkeeper", "blizzard-season-39"], reviewedAt: REVIEWED_AT,
  },
  {
    id: "gr-speed", label: "GR 速刷", content: "greater-rift-speed", paragonBand: "any", applicability: "supported",
    reason: "Icy有当前版本独立GR速刷页，d3guides也列出速刷变体；它不是把冲层装备原样复制，而是改斯奎特、全能、寅剑+守誓者、火牛羚和回荡狂怒。",
    patch: {
      gear: { amulet: "squirts", ring1: "band-of-might", ring2: "coe", weapon: "ingeom", offhand: "oathkeeper-worn" },
      skills: [
        { id: "frenzy", rune: "怒气冲天" }, { id: "furious-charge", rune: "寒冰冲撞" },
        { id: "war-cry", rune: "赦免" }, { id: "threatening-shout", rune: "惊魂余音" },
        { id: "battle-rage", rune: "血溅十方" }, { id: "wrath-of-the-berserker", rune: "癫狂" },
      ],
      passives: ["berserker-rage", "rampage", "boon-of-bulkathos", "brawler"],
      powers: { season: "echoing-fury" },
      legendaryGems: { control: "bane-of-the-trapped", primary: "simplicity", boss: "molten-wildebeest" },
      follower: { id: "enchantress", items: ["不死圣物", "神目指环", "时光流韵", "复仇者护腕"], skills: ["先知协调", "集中心智", "能量护盾"] },
      statPriorities: { speed: ["冷却缩减", "首组精英启动寅剑", "火牛羚护盾保护斯奎特", "回荡狂怒连续击杀"] },
      rotation: GR_SPEED_ROTATION,
    },
    configurationId: "h90-frenzy-gr-speed",
    sourceRefs: [URLS.grSpeed, URLS.d3guides, URLS.savages, URLS.oathkeeper, URLS.season],
    sourceIds: ["icy-h90-gr-speed", "d3guides-h90", "blizzard-savages", "blizzard-oathkeeper", "blizzard-season-39"], reviewedAt: REVIEWED_AT,
  },
  {
    id: "t16-rift", label: "T16 小秘境", content: "nephalem-rift-t16", paragonBand: "any", applicability: "supported",
    reason: "Icy和d3guides都提供T16变体；当前按Icy的单人路线穿九十蛮肩、深渊挖掘裤、沃兹克、瑞秋、力量指环与寅剑+守誓者，金币链由魔方金织带和随从贪婪之戒完成。",
    patch: {
      gear: { shoulders: "savages-shoulders", bracers: "warzechian", pants: "depth-diggers-worn", amulet: "flavor-time", ring1: "rechel", ring2: "band-of-might", weapon: "ingeom", offhand: "oathkeeper-worn" },
      skills: [
        { id: "frenzy", rune: "无情先锋" }, { id: "furious-charge", rune: "无情突袭" },
        { id: "war-cry", rune: "老兵之诫" }, { id: "sprint", rune: "奔跑健将" },
        { id: "battle-rage", rune: "凶残" }, { id: "wrath-of-the-berserker", rune: "癫狂" },
      ],
      passives: ["berserker-rage", "rampage", "boon-of-bulkathos", "pound-of-flesh"],
      powers: { weapon: "bastions", armor: "goldwrap", jewelry: "royal-grandeur", season: "echoing-fury" },
      legendaryGems: { gold: "boon-of-the-hoarder", primary: "simplicity", control: "bane-of-the-trapped" },
      follower: { id: "enchantress", items: ["不死圣物", "神目指环", "贪婪之戒", "复仇者护腕"], skills: ["先知协调", "集中心智", "能量护盾"] },
      statPriorities: { speed: ["武器恐惧命中触发瑞秋", "冷却缩减", "拾取范围", "精英连杀保持寅剑与回荡狂怒"] },
      rotation: T16_ROTATION,
    },
    configurationId: "h90-frenzy-t16-rift",
    sourceRefs: [URLS.t16, URLS.d3guides, URLS.savages, URLS.bastion, URLS.undisputed, URLS.oathkeeper, URLS.season],
    sourceIds: ["icy-h90-t16", "d3guides-h90", "blizzard-savages", "blizzard-bastion", "blizzard-undisputed", "blizzard-oathkeeper", "blizzard-season-39"], reviewedAt: REVIEWED_AT,
  },
  {
    id: "bounty", label: "悬赏", content: "bounty", paragonBand: "any", applicability: "viable",
    reason: "Icy明确说明同一普通难度变体可用于最高折磨悬赏；装备与T16相同，但单体追杀和寅剑依赖使它不是全职业最优悬赏选择。",
    sameAsScenarioId: "t16-rift", configurationId: "h90-frenzy-t16-rift",
    sourceRefs: [URLS.t16, URLS.chilanik], sourceIds: ["icy-h90-t16", "blizzard-chilanik"], reviewedAt: REVIEWED_AT,
  },
];

const PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "达到角色基础上限后停止投入。" },
      { stat: "力量", target: "第二", reason: "同时提高伤害与护甲。" },
      { stat: "体能", target: "按实际生存补", reason: "坚韧不足时可以补，但没有固定巅峰分界。" },
      { stat: "最大怒气", target: "跳过", reason: "狂乱是生成技能，构筑不按最大怒气增伤。" },
    ],
    offense: [
      { stat: "冷却缩减", target: "优先点满", reason: "缩短狂战之怒并帮助速刷技能周转。" },
      { stat: "暴击几率", target: "第二", reason: "提高单体输出和血溅十方触发。" },
      { stat: "暴击伤害", target: "第三", reason: "与暴击几率共同成长。" },
      { stat: "攻击速度", target: "最后", reason: "装备、狂乱层数与守誓者已提供大量攻速。" },
    ],
    defense: [
      { stat: "全元素抗性", target: "优先点满", reason: "力量职业天然护甲高，更缺全抗。" },
      { stat: "生命%", target: "第二", reason: "提高有效生命。" },
      { stat: "护甲", target: "第三", reason: "继续补充物理减伤。" },
      { stat: "生命恢复", target: "最后", reason: "作为持续恢复补充。" },
    ],
    utility: [
      { stat: "击中回复生命", target: "优先点满", reason: "狂乱高攻速能把击回转成稳定恢复。" },
      { stat: "范围伤害", target: "第二", reason: "改善兵要护符连锁后的怪群处理。" },
      { stat: "生命之球拾取范围", target: "第三", reason: "速刷帮助生命球与金币链覆盖。" },
      { stat: "能量消耗降低", target: "最后", reason: "主伤害技能不消耗怒气。" },
    ],
  },
  post800: [
    { priority: "力量", when: "当前层数能稳定执行完整循环", reason: "继续提高伤害和护甲。" },
    { priority: "体能", when: "力量指环已刷新仍会被常见伤害击杀", reason: "只补到能稳定追杀精英，再回力量。" },
    { priority: "装备功能词缀", when: "正确装备与生存已经成型", reason: "手套力量可按实际成长让给范围伤；冷却、双暴和元素伤按场景优化，不由2000巅峰自动触发。" },
  ],
  checkpoints: [
    { label: "狂乱层数", target: "10层", action: "先在高生命目标上叠满；频繁换怪会同时损失攻速、伤害和减伤。" },
    { label: "力量指环", target: "减伤无空窗", action: "用狂暴冲锋定时刷新；不要只把它当赶路技能。" },
    { label: "护甲宝石", target: "红宝石起步", action: "只有缺坚韧已经阻碍推进时才把胸腿换白宝石；来源明确说没有固定断点。" },
    { label: "速刷门槛", target: "首组精英能快速击杀", action: "寅剑和回荡狂怒无法稳定连锁时降低GR层数或回到冲层方案。" },
    { label: "瑞秋触发", target: "武器有恐惧命中", action: "没有恐惧副词缀时先别按瑞秋移速规划路线。" },
  ],
};

const POLICIES: BuildChoicePolicy[] = [
  { key: "h90-core", targetType: "gear", targetId: "undisputed", label: "狂乱三件发动机", status: "locked", reason: "九十蛮、无可争辩的勇士、兵要护符和守誓者共同把狂乱层数、全部符文、连锁与主要技能乘区接通；不是只凑六件套即可。" },
  { key: "h90-push-weapons", targetType: "gear", targetId: "slanderer", label: "S39冲层武器包", status: "locked", reason: "本赛季利用第四槽穿伊斯特凡对剑并萃取守誓者；非赛季的碧蓝怒火+守誓者不是当前默认。" },
  { key: "h90-gr-speed-package", targetType: "gear", targetId: "squirts", label: "GR速刷完整替换包", status: "conditional", reason: "只有目标层能快速连杀精英时，才同时换斯奎特、全能、寅剑+守誓者、火牛羚和回荡狂怒。", alternatives: [{ id: "gr-speed-package", label: "寅剑斯奎特速刷包", when: "首组精英能快速击杀并维持寅剑", gain: "更高机动、狂战覆盖与精英周转", cost: "失去无尽之途、对剑攻防和受罚者首领成长", scenarios: ["gr-speed"] }] },
  { key: "h90-charge-rune", targetType: "skill", targetId: "furious-charge", label: "GR速刷冲锋符文", status: "conditional", reason: "寒冰冲撞能立刻触发套装两件控制条件，但依赖寅剑保障冷却；启动不稳时改回无情突袭。", alternatives: [{ id: "merciless-assault", label: "无情突袭", when: "寅剑会断档或精英密度不稳定", gain: "命中足够目标时自行重置冲锋", cost: "失去寒冰冲撞的即时冻结触发", scenarios: ["gr-speed"] }] },
  { key: "h90-armor-gems", targetType: "normal-gem", targetId: "flawless-royal-ruby", label: "胸腿红白宝石", status: "conditional", reason: "默认红宝石；只有坚韧不足已经阻碍推进时才换白宝石。来源明确没有具体巅峰断点。", alternatives: [{ id: "flawless-royal-diamond", label: "无瑕皇家白宝石", when: "力量指环循环正确但仍因坚韧不足无法推进", gain: "提高全元素抗性", cost: "失去力量、伤害与部分护甲", scenarios: ["gr-push", "gr-speed", "t16-rift", "bounty"] }] },
  { key: "h90-t16-pants", targetType: "gear", targetId: "depth-diggers-worn", label: "T16套装槽重排", status: "locked", reason: "T16把深渊挖掘裤穿在身上并补九十蛮肩，才能释放防具魔方槽；只换裤子会断六件套。" },
  { key: "h90-gold-chain", targetType: "power", targetId: "goldwrap", label: "T16金币防线", status: "conditional", reason: "金织带只在会掉金币的T16和悬赏工作；伤害与生存明显溢出后才可换齐拉尼克追求移速。", alternatives: [{ id: "chilanik", label: "齐拉尼克之链", when: "T16/悬赏无需金织带也不会死亡，并能每10秒重放战吼", gain: "稳定的队伍移动速度", cost: "失去金币护甲，容错显著下降", incompatibleWith: ["greater-rift-push", "greater-rift-speed"], scenarios: ["t16-rift", "bounty"] }] },
  { key: "h90-rechel", targetType: "gear", targetId: "rechel", label: "瑞秋恐惧触发", status: "locked", reason: "瑞秋要求恐惧；九十蛮的冰冻和眩晕不能替代。T16武器必须有恐惧命中副词缀。" },
  { key: "h90-t16-amulet", targetType: "gear", targetId: "flavor-time", label: "T16项链展示边界", status: "flexible", reason: "Icy单人推荐合适被动的地狱火项链、组队推荐时光流韵。当前资源库缺准确地狱火成品图，因此展示有来源的时光流韵并显式保留这项差异。" },
  { key: "h90-follower", targetType: "follower", targetId: "scoundrel", label: "按用途切随从", status: "conditional", reason: "单人冲层用盗贼暴击窗口；GR速刷和T16用魔女的冷却与综合增益。", alternatives: [{ id: "enchantress", label: "魔女", when: "GR速刷、T16或悬赏", gain: "冷却缩减与综合攻防辅助", cost: "失去盗贼的暴击爆发窗口", scenarios: ["gr-speed", "t16-rift", "bounty"] }] },
  { key: "h90-content-boundary", targetType: "gear", targetId: "savages-head", label: "四个用途都有证据，不按巅峰复制", status: "locked", reason: "H90是‘不要武断删速刷’的反例：当前有GR冲层、GR速刷、T16和悬赏证据；四个按钮来自用途差异，不是低/高巅峰凑数。蓝门仍未单独开放。" },
];

const CLAIMS: EvidenceClaim[] = [
  { id: "h90-applicability", category: "applicability", path: "scenarios", conclusion: "九十蛮狂乱有GR冲层、GR速刷和T16方案；悬赏可复用T16方案。", sourceIds: ["icy-h90-overview", "icy-h90-gr-speed", "icy-h90-t16", "d3guides-h90"], status: "cross-checked", conflictNote: "Icy主导航只给H90标冲层，但同站当前版本维护独立GR速刷与T16/悬赏页面；用途判断以具体子页为准。" },
  { id: "h90-no-visions", category: "applicability", path: "scenarios", conclusion: "没有把T16方案自动外推为蓝门方案。", sourceIds: ["icy-h90-t16", "d3guides-h90"], status: "unverified", conflictNote: "两个来源都没有单独验证蓝门机制与配置。" },
  { id: "h90-set-engine", category: "gear", path: "choicePolicies.h90-core", conclusion: "套装两件、四件、六件分别建立战吼/控制目标、按层减伤和按层狂乱增伤。", sourceIds: ["blizzard-savages", "icy-h90-overview", "d3guides-h90"], status: "cross-checked" },
  { id: "h90-bastion-engine", category: "gear", path: "configurationBase.powers.weapon", conclusion: "兵要护符把狂乱上限提高到10层，并按层追加命中和近距离连锁。", sourceIds: ["blizzard-bastion", "icy-h90-gear", "d3guides-h90"], status: "cross-checked" },
  { id: "h90-undisputed-engine", category: "gear", path: "configurationBase.gear.belt", conclusion: "无可争辩的勇士提供全部狂乱符文与技能增伤，因此所选符文主要决定元素。", sourceIds: ["blizzard-undisputed", "icy-h90-skills", "d3guides-h90"], status: "cross-checked" },
  { id: "h90-oathkeeper-engine", category: "gear", path: "configurationBase.powers.season", conclusion: "守誓者的主要技能增伤与攻速必须在三个场景保留；冲层萃取，速刷穿戴。", sourceIds: ["blizzard-oathkeeper", "icy-h90-gear", "icy-h90-gr-speed", "icy-h90-t16"], status: "cross-checked" },
  { id: "h90-push-gear", category: "gear", path: "configurationBase.gear", conclusion: "S39冲层采用5九十蛮+2奥吉德、无尽之途、力量指环和伊斯特凡对剑。", sourceIds: ["icy-h90-gear", "d3guides-h90"], status: "unverified", conflictNote: "d3guides穿奥吉德胸+九十蛮肩，并使用碧蓝怒火+守誓者；当前采用Icy的S39第四槽专用配置，不混拼。" },
  { id: "h90-push-skills", category: "skills", path: "configurationBase.skills", conclusion: "冲层采用怒气冲天、无情突袭、老兵之诫、惊魂余音、血溅十方和癫狂。", sourceIds: ["icy-h90-skills", "d3guides-h90"], status: "unverified", conflictNote: "d3guides的四个主动符文不同；当前采用Icy完整技能表。项目旧版狂人、顽抗战吼和恫吓不是Icy当前冲层符文。" },
  { id: "h90-push-passives", category: "passives", path: "configurationBase.passives", conclusion: "冲层四被动为狂暴、狂战盛怒、布尔凯索的庇佑和无情暴虐。", sourceIds: ["icy-h90-skills", "d3guides-h90"], status: "cross-checked" },
  { id: "h90-push-powers", category: "powers", path: "configurationBase.powers", conclusion: "S39冲层四槽为兵要护符、深渊挖掘裤、皇家华戒和守誓者。", sourceIds: ["icy-h90-gear", "d3guides-h90", "blizzard-season-39"], status: "unverified", conflictNote: "前三槽双源一致；d3guides第四槽为全能法戒，Icy的S39对剑方案第四槽为守誓者。" },
  { id: "h90-push-gems", category: "legendary-gems", path: "configurationBase.legendaryGems", conclusion: "冲层使用困者、至简和受罚者。", sourceIds: ["icy-h90-gear", "d3guides-h90"], status: "cross-checked" },
  { id: "h90-gr-speed", category: "applicability", path: "scenarios.gr-speed", conclusion: "GR速刷是独立装备包：斯奎特、全能、寅剑+守誓者、火牛羚和S39回荡狂怒。", sourceIds: ["icy-h90-gr-speed", "d3guides-h90"], status: "unverified", conflictNote: "两站支持用途，但d3guides只列相对变更且与Icy具体配装不同；当前精确字段来自Icy。" },
  { id: "h90-gr-speed-war-cry", category: "skills", path: "scenarios.gr-speed.patch.skills", conclusion: "GR速刷采用赦免战吼。", sourceIds: ["icy-h90-gr-speed"], status: "single-source", conflictNote: "Icy同页顶部速查表显示老兵之诫，正文逐条说明却写赦免；当前按更具体的适配正文，保留页内冲突。" },
  { id: "h90-t16", category: "applicability", path: "scenarios.t16-rift", conclusion: "T16采用九十蛮肩、深渊挖掘裤、沃兹克、瑞秋、力量指环、寅剑+守誓者与金币链。", sourceIds: ["icy-h90-t16", "d3guides-h90"], status: "unverified", conflictNote: "两个来源支持T16，但d3guides的技能与魔方差异很大；当前具体字段来自Icy。" },
  { id: "h90-bounty", category: "applicability", path: "scenarios.bounty", conclusion: "Icy明确说同一普通难度方案可用于最高折磨悬赏。", sourceIds: ["icy-h90-t16"], status: "single-source" },
  { id: "h90-normal-gems", category: "normal-gems", path: "configurationBase.normalGems", conclusion: "默认头白、护甲红、双武器绿；坚韧阻碍推进时护甲才改白。", sourceIds: ["icy-h90-gear", "d3guides-h90"], status: "unverified", conflictNote: "Icy明确红宝石起步且无具体换白断点；d3guides直接写护甲白并出现‘其余8孔’数量矛盾，因此不采用自动全白。" },
  { id: "h90-paragon", category: "paragon", path: "paragonGuide.pre800", conclusion: "核心先移速再力量并按需体能；进攻先冷却；防御先全抗；功能先击回。", sourceIds: ["icy-h90-gear"], status: "single-source" },
  { id: "h90-no-paragon-copy", category: "stats", path: "paragonGuide.post800", conclusion: "没有证据支持2000巅峰自动换装备或全身白宝石；选择取决于用途、坚韧与词缀瓶颈。", sourceIds: ["icy-h90-gear", "d3guides-h90"], status: "unverified", conflictNote: "来源没有给固定2000巅峰线；Icy只说成长后在坚韧阻碍推进时换白。" },
  { id: "h90-follower", category: "platform", path: "configurationBase.follower", conclusion: "单人GR冲层用盗贼，GR速刷和T16用魔女。", sourceIds: ["icy-h90-overview", "icy-h90-gr-speed", "icy-h90-t16"], status: "single-source" },
  { id: "h90-switch", category: "platform", path: "platformStatus", conclusion: "Nintendo Switch的狂乱锁敌、冲锋落点、恐惧命中与随从发散尚未实测。", sourceIds: [], status: "unverified", conflictNote: "精确构筑来源均为PC页面；官方物品机制跨平台不等于主机操控已验证。" },
];

export function reviewH90FrenzyGuide(base: BuildGuide): BuildGuide {
  const reviewed: BuildGuide = {
    ...base,
    set: "九十蛮5件 + 奥吉德2件",
    core: "狂乱叠至10层 → 控制目标触发两件 → 精英追杀",
    summary: "H90不是‘只适合冲层’：当前资料有独立GR速刷和T16/悬赏方案，但每种用途都要换完整装备包。红宝石换白宝石按坚韧瓶颈，不按2000巅峰自动切。",
    difficulty: "中等 · 单体锁敌、冲锋续防与击杀链",
    follower: "盗贼",
    followerReason: "单人GR冲层用盗贼制造暴击窗口；GR速刷、T16和悬赏改魔女补冷却与综合增益。",
    gear: reviewedGear(base),
    skills: ACTIVE,
    passives: PASSIVES,
    powers: reviewedPowers(base),
    variants: {
      push: { title: "单人 GR 冲层", note: "5+2、无尽之途和S39对剑，追精英并保住力量指环。", changes: ["对剑 + 第四槽守誓者", "困者、至简、受罚者", "盗贼暴击窗口"] },
      speed: { title: "GR速刷 / T16 / 悬赏", note: "三种速度用途有来源，但GR速刷与普通难度不是同一套。", changes: ["GR：斯奎特 + 寅剑 + 火牛羚", "T16：穿深渊裤 + 沃兹克 + 金币链", "悬赏真实复用T16配置"] },
      low: { title: "装备成型阶段", note: "先凑狂乱发动机和力量指环，默认胸腿红宝石。", changes: ["九十蛮、勇士腰带、兵要、守誓者优先", "普通正确特效优于错误远古", "生存不足才按需补体能"] },
      high: { title: "实战优化阶段", note: "没有2000巅峰硬线；宝石、词缀和场景按瓶颈切换。", changes: ["坚韧阻碍推进才把护甲红换白", "手套力量可按需换范围伤", "速刷门槛看精英连杀，不看巅峰标签"] },
    },
    links: [
      { title: "狂乱10层发动机", category: "damage", conclusion: "九十蛮、无可争辩的勇士、兵要护符和守誓者共同工作；少一件都会同时损失层数、全符文、连锁或主要技能乘区。", steps: [{ id: "frenzy", label: "狂乱", detail: "持续攻击叠层" }, { id: "undisputed", label: "无可争辩的勇士", detail: "全部符文与技能增伤" }, { id: "bastions", label: "兵要护符", detail: "上限10层并连锁" }, { id: "oathkeeper", label: "守誓者", detail: "主要技能攻速与增伤" }] },
      { title: "控制与力量指环", category: "defense", conclusion: "冲锋既刷新力量指环，也让冰冻或眩晕目标吃到九十蛮两件增伤；狂乱层数再提供四件减伤。", steps: [{ id: "furious-charge", label: "狂暴冲锋", detail: "位移并触发控制" }, { id: "band-of-might", label: "力量指环", detail: "刷新核心减伤" }, { id: "savages-head", label: "九十蛮2/4件", detail: "控制目标增伤、按层减伤" }, { id: "frenzy", label: "狂乱10层", detail: "维持攻防上限" }] },
      { title: "T16金币与移速链", category: "movement", conclusion: "T16不是冲层装备换一颗囤宝者：要同时穿深渊裤、补九十蛮肩、换速刷首饰武器、技能、被动和四个魔方槽。", steps: [{ id: "boon-of-the-hoarder", label: "囤宝者", detail: "金币与移速" }, { id: "goldwrap", label: "金织带", detail: "金币转护甲" }, { id: "rechel", label: "瑞秋", detail: "恐惧命中转移速" }, { id: "ingeom", label: "寅剑", detail: "精英击杀缩冷却" }] },
    ],
    rotation: PUSH_ROTATION,
    source: URLS.overview,
    purpose: "greater-rift",
    supportedContent: ["单人GR冲层", "GR速刷", "T16小秘境", "悬赏"],
    defaultMode: "push",
    modeLabels: { push: "单人GR冲层", speed: "GR / T16 / 悬赏速刷" },
    pushNote: "S39穿伊斯特凡对剑，第四魔方槽保留守誓者；不与d3guides的非同套字段混拼。",
    speedNote: "GR速刷和T16是两套真实配置；悬赏与T16共用，不创建假差异。",
    lowNote: "默认胸腿红宝石；优先狂乱发动机与力量指环，不按巅峰复制配置。",
    highNote: "坚韧开始阻碍推进时才换白宝石；来源明确没有固定巅峰断点。",
    configurationBase: CONFIGURATION_BASE,
    defaultScenarioId: "gr-push",
    scenarios: SCENARIOS,
    paragonGuide: PARAGON,
    choicePolicies: POLICIES,
    reviewStatus: "fully-reviewed",
    variantCompleteness: "complete",
    evidenceStatus: "source-checked",
    platformStatus: "platform-risk",
    dataProvenance: "hand-authored",
    evidenceNote: "已按S39/2.7.8逐字段校对：修正项目旧版三个错误冲层符文，删除高/低巅峰四份复制，落地GR冲层、GR速刷、T16与悬赏真实配置，并把护甲红转白改成坚韧条件。Icy导航与子页、GR速刷战吼符文存在内部冲突；d3guides配装差异较大，Maxroll正文不可取证，Nintendo Switch仍待实机。",
    structuredSources: SOURCES,
    evidenceClaims: CLAIMS,
  };

  const errors = [
    ...validateReviewedBuildGuide(reviewed),
    ...validateBuildSemantics(reviewed),
    ...validateBuildEvidence(reviewed),
  ];
  if (errors.length > 0) throw new Error(`九十蛮狂乱配置校验失败：${[...new Set(errors)].join("；")}`);
  return reviewed;
}
