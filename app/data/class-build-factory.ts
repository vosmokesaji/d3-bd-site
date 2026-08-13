import { completeBuildGuide, type BuildGuide, type BuildLoadout, type GuideAbility, type GuideGear, type GuideLink, type GuidePower } from "./build-guides";
import { CURRENT_SEASON } from "./season-config";
import { itemAsset, skillAsset } from "./assets";

export type ClassKey = "crusader" | "demon-hunter" | "monk" | "witch-doctor" | "wizard";

export type GemKey = "trapped" | "stricken" | "zei" | "lod" | "taeguk" | "simplicity" | "enforcer" | "gogok" | "powerful" | "wreath" | "hoarder";

export type GearSeed = {
  id: string;
  slot: string;
  name: string;
  file: string;
  effect: string;
  quality?: "set" | "legendary";
  skill?: string;
  element?: string;
  base?: string;
  method?: string[];
  warning?: string;
  gem?: GemKey;
};

export type AbilitySeed = {
  id: string;
  name: string;
  rune?: string;
  logic: string;
};

export type PowerSeed = {
  id: string;
  slot: string;
  name: string;
  file: string;
  effect: string;
  logic: string;
  method?: string;
};

export type LinkSeed = {
  title: string;
  category: GuideLink["category"];
  conclusion: string;
  steps: Array<[id: string, label: string, detail: string]>;
};

export type LoadoutSeed = {
  id: string;
  label: string;
  title: string;
  summary: string;
  bestFor: string;
  tradeoff: string;
  set?: string;
  core?: string;
  gear?: GearSeed[];
  skills?: AbilitySeed[];
  passives?: AbilitySeed[];
  powers?: PowerSeed[];
  links?: LinkSeed[];
  rotation?: BuildGuide["rotation"];
  powerSets?: BuildGuide["powerSets"];
  consoleNote?: string;
};

export type ClassGuideSeed = {
  classKey: ClassKey;
  id: string;
  name: string;
  set: string;
  core: string;
  summary: string;
  difficulty: string;
  follower: BuildGuide["follower"];
  followerReason: string;
  element: string;
  coreSkill: string;
  gear: GearSeed[];
  skills: AbilitySeed[];
  passives: AbilitySeed[];
  powers: PowerSeed[];
  links: LinkSeed[];
  rotation: BuildGuide["rotation"];
  pushNote: string;
  speedNote: string;
  lowNote: string;
  highNote: string;
  source: string;
  purpose?: BuildGuide["purpose"];
  supportedContent?: string[];
  defaultMode?: BuildGuide["defaultMode"];
  modeLabels?: BuildGuide["modeLabels"];
  consoleNote?: string;
  powerSets?: BuildGuide["powerSets"];
  defaultLoadoutId?: string;
  loadouts?: LoadoutSeed[];
};

export const GEMS: Record<GemKey, { name: string; image: string }> = {
  trapped: { name: "困者之灾", image: itemAsset("bane-of-the-trapped-unique_gem_002_x1.png") },
  stricken: { name: "受罚者之灾", image: itemAsset("bane-of-the-stricken-unique_gem_018_x1.png") },
  zei: { name: "贼神的复仇之石", image: itemAsset("zeis-stone-of-vengeance-unique_gem_012_x1.png") },
  lod: { name: "梦之遗礼", image: itemAsset("legacy-of-dreams-unique_gem_023_x1.png") },
  taeguk: { name: "太极石", image: itemAsset("taeguk-unique_gem_015_x1.png") },
  simplicity: { name: "至简之力", image: itemAsset("simplicitys-strength-unique_gem_013_x1.png") },
  enforcer: { name: "侍从宝石", image: itemAsset("enforcer-unique_gem_010_x1.png") },
  gogok: { name: "迅捷勾玉", image: itemAsset("gogok-of-swiftness-unique_gem_008_x1.png") },
  powerful: { name: "强者之灾", image: itemAsset("bane-of-the-powerful-unique_gem_001_x1.png") },
  wreath: { name: "闪电华冠", image: itemAsset("wreath-of-lightning-unique_gem_004_x1.png") },
  hoarder: { name: "囤宝者的恩惠", image: itemAsset("boon-of-the-hoarder-unique_gem_014_x1.png") },
};

export const itemFile = itemAsset;

export function setGear(id: string, slot: string, name: string, file: string, effect: string, skill?: string): GearSeed {
  return { id, slot, name, file, effect, quality: "set", skill };
}

export function legendary(id: string, slot: string, name: string, file: string, effect: string, extra: Partial<GearSeed> = {}): GearSeed {
  return { id, slot, name, file, effect, quality: "legendary", ...extra };
}

export function jewelry(kind: "squirt" | "traveler" | "compass" | "coe" | "focus" | "restraint" | "unity" | "karini" | "emptiness" | "elusive" | "zodiac", gem?: GemKey): GearSeed {
  const entries: Record<typeof kind, GearSeed> = {
    squirt: legendary("squirts", "颈部", "斯奎特的项链", "squirts-necklace-p66_unique_amulet_010.png", "未受伤时逐层提高伤害；护盾、走位和控场决定层数能否保住。", { gem }),
    traveler: legendary("travelers-pledge", "颈部", "旅者之誓", "the-travelers-pledge-unique_amulet_008_x1.png", "与罗盘玫瑰组成无尽之途；移动减伤，站定逐步转为增伤。", { gem }),
    compass: legendary("compass-rose", "手指", "罗盘玫瑰", "the-compass-rose-unique_ring_013_x1.png", "无尽之途戒指，按移动和站定状态自动切换攻防。", { gem }),
    coe: legendary("coe", "手指", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "对应元素周期提供独立爆发乘区。", { gem }),
    focus: legendary("focus", "手指", "克己", "focus-unique_ring_set_001_x1.png", "生成技能命中后启动意志壁垒的一半增伤。", { quality: "set", gem, warning: "必须和守心同时穿戴，并主动触发生成端。" }),
    restraint: legendary("restraint", "手指", "守心", "restraint-unique_ring_set_002_x1.png", "消耗技能命中后启动意志壁垒的另一半增伤。", { quality: "set", gem, warning: "必须和克己同时穿戴，并主动触发消耗端。" }),
    unity: legendary("unity", "手指", "团结", "unity-unique_ring_010_x1.png", "随从佩戴同名戒指且拥有不死饰品时，双方分摊伤害。", { gem, warning: "随从没有不死饰品时，团结会把随从承受的伤害反传给角色。" }),
    karini: legendary("karini", "手指", "卡里尼的光环", "halo-of-karini-p61_unique_ring_03.png", "风暴护甲命中远处敌人后获得巨额减伤。", { gem }),
    emptiness: legendary("emptiness", "手指", "虚空之戒", "ring-of-emptiness-p42_unique_ring_haunt.png", "敌人同时受到蚀魂或虫群影响时，角色与宠物伤害提高。", { gem }),
    elusive: legendary("elusive", "手指", "残影之戒", "elusive-ring-p4_unique_ring_02.png", "使用翻滚、暗影之力或烟雾弹后获得巨额减伤。", { gem }),
    zodiac: legendary("zodiac", "手指", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗资源的攻击命中时缩短一个冷却技能。", { gem }),
  };
  return entries[kind];
}

function affixesFor(seed: GearSeed, guide: ClassGuideSeed): string[] {
  const skill = seed.skill ?? guide.coreSkill;
  const mainAttribute = guide.classKey === "crusader"
    ? "力量"
    : guide.classKey === "demon-hunter" || guide.classKey === "monk"
      ? "敏捷"
      : "智力";
  switch (seed.slot) {
    case "头部": return [skill ? `${skill}伤害` : "暴击几率", "暴击几率", mainAttribute, "镶孔"];
    case "肩部": return [skill ? `${skill}伤害` : "范围伤害", "范围伤害", "冷却缩减", mainAttribute];
    case "胸部": return [skill ? `${skill}伤害` : "生命%", "3个镶孔", mainAttribute, "体能"];
    case "手部": return ["暴击几率", "暴击伤害", "范围伤害", "冷却缩减"];
    case "腕部": return [`${seed.element ?? guide.element}技能伤害`, "暴击几率", mainAttribute, "体能"];
    case "腰部": return [skill ? `${skill}伤害` : "生命%", mainAttribute, "体能", "生命%"];
    case "腿部": return ["2个镶孔", mainAttribute, "体能", "全元素抗性"];
    case "脚部": return [skill ? `${skill}伤害` : "全元素抗性", mainAttribute, "体能", "护甲"];
    case "颈部": return ["镶孔", `${seed.element ?? guide.element}技能伤害`, "暴击伤害", "暴击几率"];
    case "手指": return ["镶孔", "暴击几率", "暴击伤害", "范围伤害"];
    case "主手": return ["高白字", "伤害%", "范围伤害", "冷却缩减", "拉玛兰迪打孔"];
    case "副手": return [skill ? `${skill}伤害` : "暴击几率", "暴击几率", "范围伤害", "冷却缩减"];
    default: return [mainAttribute, "体能", "冷却缩减", "范围伤害"];
  }
}

function acquisitionFor(seed: GearSeed): string[] {
  if (seed.method) return seed.method;
  if (seed.quality === "set") return [`血岩碎片：赌博${seed.slot}`, "重复套装部件使用魔盒“套装转换”", "海德格赠礼或世界掉落补齐套装"];
  if (seed.slot === "主手" || seed.slot === "副手") return [`黄装升级：70级${seed.base ?? seed.slot}，必须选对底材`, "世界掉落与大秘境结算", "武器先看传奇特效，再追远古白字"];
  if (seed.slot === "手指" || seed.slot === "颈部") return [`黄装升级：70级${seed.slot === "手指" ? "戒指" : "项链"}`, "世界掉落与大秘境结算", "首饰池很大，先保镶孔和特效"];
  return [`血岩碎片：赌博${seed.slot}`, `黄装升级：70级${seed.slot}`, "世界掉落与大秘境结算"];
}

function makeGear(seed: GearSeed, guide: ClassGuideSeed): GuideGear {
  return {
    id: seed.id,
    slot: seed.slot,
    name: seed.name,
    image: itemFile(seed.file),
    quality: seed.quality ?? "legendary",
    effect: seed.effect,
    affixes: affixesFor(seed, guide),
    acquisition: acquisitionFor(seed),
    warning: seed.warning,
    gem: seed.gem ? GEMS[seed.gem] : undefined,
  };
}

function makeAbility(seed: AbilitySeed, classKey: ClassKey, passive = false): GuideAbility {
  return {
    id: seed.id,
    name: seed.name,
    rune: seed.rune,
    image: skillAsset(classKey, passive ? "passive" : "active", seed.id),
    logic: seed.logic,
  };
}

function makePower(seed: PowerSeed): GuidePower {
  return {
    id: seed.id,
    slot: seed.slot,
    name: seed.name,
    image: itemFile(seed.file),
    effect: seed.effect,
    logic: seed.logic,
    acquisition: seed.method ?? "黄装升级对应底材或世界掉落后，用卡奈魔方萃取。",
  };
}

function makeLoadout(seed: LoadoutSeed, guide: ClassGuideSeed): BuildLoadout {
  return {
    ...seed,
    gear: seed.gear?.map((gear) => makeGear(gear, guide)),
    skills: seed.skills?.map((skill) => makeAbility(skill, guide.classKey)),
    passives: seed.passives?.map((skill) => makeAbility(skill, guide.classKey, true)),
    powers: seed.powers?.map(makePower),
    links: seed.links?.map((link) => ({
      title: link.title,
      category: link.category,
      conclusion: link.conclusion,
      steps: link.steps.map(([id, label, detail]) => ({ id, label, detail })),
    })),
  };
}

export function createClassGuide(seed: ClassGuideSeed): BuildGuide {
  return completeBuildGuide({
    id: seed.id,
    name: seed.name,
    set: seed.set,
    core: seed.core,
    summary: seed.summary,
    difficulty: seed.difficulty,
    follower: seed.follower,
    followerReason: seed.followerReason,
    gear: seed.gear.map((gear) => makeGear(gear, seed)),
    skills: seed.skills.map((skill) => makeAbility(skill, seed.classKey)),
    passives: seed.passives.map((skill) => makeAbility(skill, seed.classKey, true)),
    powers: seed.powers.map(makePower),
    variants: {
      push: { title: seed.modeLabels?.push ?? "大秘境冲层", note: seed.pushNote, changes: ["保留完整减伤与元素爆发窗", "首领阶段使用受罚者之灾"] },
      speed: { title: seed.modeLabels?.speed ?? "T16 / 速刷", note: seed.speedNote, changes: ["以位移和击杀触发替代过量坚韧", "受罚者可换强者之灾或囤宝者"] },
      low: { title: "低巅峰 < 2000", note: seed.lowNote, changes: ["优先体能、抗性和稳定减伤", "普通传奇高特效优于错误词缀远古"] },
      high: { title: "高巅峰 2000+", note: seed.highNote, changes: ["武器、手套和肩部补范围伤", "卡德山只强化正确词缀底子"] },
    },
    links: seed.links.map((link) => ({
      title: link.title,
      category: link.category,
      conclusion: link.conclusion,
      steps: link.steps.map(([id, label, detail]) => ({ id, label, detail })),
    })),
    rotation: seed.rotation,
    source: seed.source,
    purpose: seed.purpose,
    supportedContent: seed.supportedContent,
    defaultMode: seed.defaultMode,
    modeLabels: seed.modeLabels,
    consoleNote: seed.consoleNote,
    powerSets: seed.powerSets,
    defaultLoadoutId: seed.defaultLoadoutId,
    loadouts: seed.loadouts?.map((loadout) => makeLoadout(loadout, seed)),
  }, CURRENT_SEASON.seasonId);
}

export const passive = (id: string, name: string, logic: string): AbilitySeed => ({ id, name, logic });
export const skill = (id: string, name: string, rune: string, logic: string): AbilitySeed => ({ id, name, rune, logic });
export const power = (id: string, slot: string, name: string, file: string, effect: string, logic: string, method?: string): PowerSeed => ({ id, slot, name, file, effect, logic, method });
