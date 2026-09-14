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

const REVIEWED_AT = "2026-09-13";
const ITEM = `${D3_ITEM_ROOT}/`;
const SKILL = `${D3_SKILL_ROOT}/`;

const URLS = {
  overview: "https://www.icy-veins.com/d3/necromancer-rathma-army-of-the-dead-build",
  skills: "https://www.icy-veins.com/d3/rathma-army-of-the-dead-necromancer-skills-and-runes",
  gear: "https://www.icy-veins.com/d3/rathma-army-of-the-dead-necromancer-bis-gear-gems-paragon-points",
  grSpeed: "https://www.icy-veins.com/d3/rathma-army-of-the-dead-necromancer-greater-rift-speed-farming-build",
  t16: "https://www.icy-veins.com/d3/rathma-army-of-the-dead-necromancer-nephalem-rift-speed-farming-build",
  d3guidesPush: "https://www.d3guides.de/en/build/necromancer-bones-of-rathma-army-of-the-dead",
  d3guidesSpeed: "https://www.d3guides.de/en/build/necromancer-bones-of-rathma-army-of-the-dead?v=speed",
  d3guidesT16: "https://www.d3guides.de/en/build/necromancer-bones-of-rathma-army-of-the-dead?v=t16",
  season: "https://news.blizzard.com/en-gb/article/24287549/season-39-shades-of-the-nephalem-now-live",
  rathma: "https://us.diablo3.blizzard.com/en-us/item/rathmas-ossified-sabatons-P6_Necro_Set_1_Boots",
  jesseth: "https://us.diablo3.blizzard.com/en-us/item/jesseth-skullshield-P6_Unique_Shield_01",
  funerary: "https://us.diablo3.blizzard.com/en-us/item/funerary-pick-P74_Unique_Scythe1H_01",
  corroded: "https://us.diablo3.blizzard.com/en-us/item/tragouls-corroded-fang-P6_Unique_Scythe1H_02",
  cycle: "https://us.diablo3.blizzard.com/en-us/item/scythe-1h/",
  maxroll: "https://maxroll.gg/d3/guides/rathma-army-of-the-dead-necromancer-guide",
} as const;

const SOURCES: BuildSource[] = [
  { id: "icy-rathma-overview", url: URLS.overview, title: "Necromancer Army of the Dead Build With Rathma Set", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-24", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push", "greater-rift-speed", "nephalem-rift-t16"], snapshot: "页面把构筑标为单人GR冲层、GR速刷和小秘境速刷；三种用途都有独立说明。" },
  { id: "icy-rathma-skills", url: URLS.skills, title: "Rathma Army of the Dead Necromancer Skills and Runes", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-24", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push"], snapshot: "主方案使用鲜血虹吸、统御骷髅、骨甲、亡者大军、鲜血穿行和亡者复生；其拉斯玛二件文字仍写0.25秒，与官方0.50秒冲突。" },
  { id: "icy-rathma-gear", url: URLS.gear, title: "Rathma Army of the Dead Necromancer BiS Gear, Gems, and Paragon Points", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-24", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push"], snapshot: "给出5拉斯玛+2克里森、杰瑟斯、词缀、宝石、巅峰与魔女；S39第四槽误荐只增幅次要技能的轮回镰刀。" },
  { id: "icy-rathma-gr-speed", url: URLS.grSpeed, title: "Rathma Army of the Dead Greater Rift Speed Farming Variation", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-24", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-speed"], snapshot: "明确支持GR速刷，主体配装与技能接近主方案，但同样包含无效的S39轮回镰刀建议。" },
  { id: "icy-rathma-t16", url: URLS.t16, title: "Rathma Army of the Dead Nephalem Rift Speed Farming Variation", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-24", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["nephalem-rift-t16"], snapshot: "单人T16保留5+2并穿布里格斯，使用脆弱光环、亡魂风暴、梅塞施密特、命运誓约、华戒和斯图亚特；贪婪与复仇者由随从发散。" },
  { id: "d3guides-rathma-push", url: URLS.d3guidesPush, title: "Bones of Rathma Army of the Dead — GR push", publisher: "d3guides.de", author: "eRnstl", updatedAt: "2026-09-12", accessedAt: REVIEWED_AT, season: "39", platform: "pc", content: ["greater-rift-push"], snapshot: "完整冲层表使用衰老配塔格奥蚀牙，六技能、四被动、四魔方槽和三颗宝石互相满足触发条件。" },
  { id: "d3guides-rathma-speed", url: URLS.d3guidesSpeed, title: "Bones of Rathma Army of the Dead — Speed farming", publisher: "d3guides.de", author: "eRnstl", updatedAt: "2026-09-12", accessedAt: REVIEWED_AT, season: "39", platform: "pc", content: ["greater-rift-speed"], snapshot: "GR速刷保留5+2与杰瑟斯，改鲜血奔行并以精魂魄身和莱莲娜形成最大精魂增伤包。" },
  { id: "d3guides-rathma-t16", url: URLS.d3guidesT16, title: "Bones of Rathma Army of the Dead — Torment 16", publisher: "d3guides.de", author: "eRnstl", updatedAt: "2026-09-12", accessedAt: REVIEWED_AT, season: "39", platform: "pc", content: ["nephalem-rift-t16"], snapshot: "T16变体穿布里格斯，使用脆弱、亡魂风暴、梅斧、命运誓约、华戒和斯图亚特，并换强者与囤宝者。" },
  { id: "blizzard-season-39", url: URLS.season, title: "Season 39: Shades of the Nephalem — Now Live", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "cross-platform", snapshot: "确认第39赛季开放不受物品类型限制的第四魔方槽。" },
  { id: "blizzard-rathma", url: URLS.rathma, title: "Bones of Rathma", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方套装页：永久仆从每次造成伤害使亡者大军冷却缩短0.50秒；六件按永久仆从数量增幅亡者大军。" },
  { id: "blizzard-jesseth", url: URLS.jesseth, title: "Jesseth Arms", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方套装页确认命令骷髅攻击目标时，所有仆从伤害提高400%。" },
  { id: "blizzard-funerary", url: URLS.funerary, title: "Funerary Pick", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品页确认鲜血虹吸扩散目标承伤，单体加倍，力量转移增益会作用于全部技能。" },
  { id: "blizzard-corroded", url: URLS.corroded, title: "Trag'Oul's Corroded Fang", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品页确认额外增伤只作用于受诅咒目标，因此必须有可靠诅咒来源。" },
  { id: "blizzard-cycle", url: URLS.cycle, title: "Scythe of the Cycle", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品页将轮回镰刀限定为骨甲期间提高次要技能伤害；亡者大军不属于次要技能。" },
];

const GEAR_IDS = [
  "rathma-head", "rathma-shoulders", "rathma-chest", "rathma-gloves", "clena", "crimson-belt", "crimson-pants",
  "rathma-boots", "squirts", "krysbin", "coe", "jesseth-scythe", "jesseth-shield",
] as const;

const GEAR_OVERRIDES: Partial<Record<(typeof GEAR_IDS)[number], Partial<GuideGear>>> = {
  krysbin: { affixes: ["镶孔", "暴击几率", "攻击速度", "暴击伤害"] },
  coe: { affixes: ["镶孔", "暴击几率", "暴击伤害", "冷却缩减"] },
  "jesseth-scythe": { affixes: ["高白字伤害", "攻击速度", "最大精魂", "伤害% / 范围伤害", "拉玛兰迪打孔"] },
  "jesseth-shield": { affixes: ["智力", "冷却缩减", "暴击几率", "精英伤害", "最大精魂 / 资源消耗降低"] },
};

function reviewedGear(base: BuildGuide): GuideGear[] {
  const byId = new Map(base.gear.map((item) => [item.id, item]));
  const gear = GEAR_IDS.map((id) => {
    const item = byId.get(id);
    if (!item) throw new Error(`拉斯玛亡者大军缺少装备定义：${id}`);
    return { ...item, ...GEAR_OVERRIDES[id] };
  });
  gear.push({
    id: "briggs", slot: "手指", name: "布里格斯之怒", image: `${ITEM}briggs-wrath-p6_unique_ring_02.png`, quality: "legendary",
    effect: "对未受诅咒敌人施加诅咒时，将目标拉到一起。",
    affixes: ["镶孔", "暴击伤害", "暴击几率", "冷却缩减"],
    acquisition: ["世界掉落与大秘境结算", "黄装升级：70级戒指", "只用于T16单人速刷变体"],
    warning: "这是T16聚怪位，不要把随从发散的贪婪之戒误写成角色穿戴。",
  });
  return gear;
}

const ACTIVE: GuideAbility[] = [
  { id: "siphon-blood", name: "鲜血虹吸", rune: "纯净精魂", image: `${SKILL}necromancer-active-siphon-blood.png`, logic: "冲层与GR速刷用来回精魂并触发葬镰；d3guides当前表选择纯净精魂。" },
  { id: "command-skeletons", name: "号令骸骨", rune: "杀戮命令", image: `${SKILL}necromancer-active-command-skeletons.png`, logic: "指定精英并启动杰瑟斯两件；骷髅攻击也是拉斯玛冷却引擎。" },
  { id: "bone-armor", name: "骨甲", rune: "限制免疫", image: `${SKILL}necromancer-active-bone-armor.png`, logic: "维持骨甲减伤并在冲层方案中提供短暂免控窗口。" },
  { id: "army-of-the-dead", name: "亡者大军", rune: "死寒大军", image: `${SKILL}necromancer-active-army-of-the-dead.png`, logic: "唯一主伤害技能；T16改亡魂风暴边跑边清怪。" },
  { id: "decrepify", name: "衰老", rune: "相时而动", image: `${SKILL}necromancer-active-decrepify.png`, logic: "冲层主动覆盖诅咒，确保塔格奥蚀牙不是空威能，并提供移动速度。" },
  { id: "revive", name: "亡魂复生", rune: "炼狱", image: `${SKILL}necromancer-active-revive.png`, logic: "维持永久复生仆从，补足套装六件倍率和冷却触发数量。" },
  { id: "blood-rush", name: "鲜血奔行", rune: "鲜血禁闭", image: `${SKILL}necromancer-active-blood-rush.png`, logic: "GR速刷与T16的位移技能；T16同时触发斯图亚特移速。" },
  { id: "frailty", name: "脆弱", rune: "早夭", image: `${SKILL}necromancer-active-frailty.png`, logic: "T16替代衰老，负责处决并触发布里格斯聚怪。" },
];

const PASSIVES: GuideAbility[] = [
  { id: "rathmas-shield", name: "拉斯玛之盾", image: `${SKILL}necromancer-passive-rathmas-shield.png`, logic: "施放亡者大军后短暂免疫伤害，保护爆发动作。" },
  { id: "final-service", name: "绝命效忠", image: `${SKILL}necromancer-passive-final-service.png`, logic: "消耗仆从抵挡一次致命伤，为偏脆的构筑增加容错。" },
  { id: "spreading-malediction", name: "弱点加深", image: `${SKILL}necromancer-passive-spreading-malediction.png`, logic: "冲层按受诅咒敌人数量提高伤害，与主动衰老配套。" },
  { id: "grisly-tribute", name: "恐怖贡品", image: `${SKILL}necromancer-passive-grisly-tribute.png`, logic: "仆从命中时恢复生命，帮助维持生存。" },
  { id: "overwhelming-essence", name: "精魂魄身", image: `${SKILL}necromancer-passive-overwhelming-essence.png`, logic: "GR速刷提高最大精魂，与莱莲娜的影魂钩形成完整增伤条件。" },
  { id: "rigor-mortis", name: "死僵灾疫", image: `${SKILL}necromancer-passive-rigor-mortis.png`, logic: "GR速刷保留减速与控制覆盖。" },
  { id: "dark-reaping", name: "死神收割", image: `${SKILL}necromancer-passive-dark-reaping.png`, logic: "T16击杀回复生命与精魂，服务连续转场。" },
  { id: "blood-is-power", name: "鲜血之力", image: `${SKILL}necromancer-passive-blood-is-power.png`, logic: "T16通过生命消耗缩短技能冷却，配合快速击杀循环。" },
];

function reviewedPowers(base: BuildGuide): GuidePower[] {
  const ids = new Set(["funerary-pick", "fates-vow", "royal-grandeur", "corroded-fang", "messerschmidt", "steuarts-greaves"]);
  const powers = base.powers.filter((power) => ids.has(power.id));
  powers.push({
    id: "reilena", slot: "第4槽", name: "莱莲娜的影魂钩", image: `${ITEM}reilenas-shadowhook-p6_unique_scythe2h_03.png`,
    effect: "按最大精魂提高伤害。", logic: "只在GR速刷的最大精魂技能与被动组合中使用，不单独塞进其他场景。", acquisition: "黄装升级：70级双手镰刀",
  });
  return powers;
}

const PUSH_ROTATION: BuildConfiguration["rotation"] = [
  { title: "复生满编", action: "进图先用亡魂复生补足永久仆从，并等待骷髅到齐。", reason: "拉斯玛六件按永久仆从数放大亡者大军，仆从命中还会缩短冷却。" },
  { title: "衰老铺怪", action: "向准备作战的怪群施放衰老。", reason: "塔格奥蚀牙只增伤受诅咒目标；没有这一步第四槽等于没有工作。" },
  { title: "号令精英", action: "每个新精英先命令骷髅锁定。", reason: "号令骸骨触发杰瑟斯两件增伤，骷髅持续攻击同时刷新大军。" },
  { title: "虹吸核心", action: "对核心目标短暂引导鲜血虹吸。", reason: "葬镰让虹吸目标承受更多伤害，单体时收益加倍。" },
  { title: "安全下大军", action: "利用骨甲免控和拉斯玛之盾保护爆发，向密集怪群释放死寒大军。", reason: "当前所选完整方案不依赖项目旧版不存在的骨甲眩晕或物理元素窗叙述。" },
];

const GR_SPEED_ROTATION: BuildConfiguration["rotation"] = [
  { title: "复生满编", action: "开局先补足永久复生仆从。", reason: "速刷仍依赖仆从数量和命中次数刷新亡者大军。" },
  { title: "号令精英", action: "看到精英先命令骷髅攻击。", reason: "保持杰瑟斯增伤，并让骷髅持续压缩冷却。" },
  { title: "虹吸回魂", action: "对耐久目标短暂虹吸，其余时间保持移动。", reason: "葬镰负责目标承伤与精魂，莱莲娜按最大精魂提供场景增伤。" },
  { title: "大军清场", action: "亡者大军可用就对密集怪群释放，不等待项目旧版虚构的固定高巅峰切线。", reason: "GR速刷目标是稳定周转，而不是复制冲层元素等待。" },
  { title: "鲜血转场", action: "用鲜血奔行越过空地并寻找下一组精英。", reason: "该场景有明确位移技能，但没有金币、金织带或贪婪链。" },
];

const T16_ROTATION: BuildConfiguration["rotation"] = [
  { title: "复生满编", action: "开局先召齐永久仆从。", reason: "即使怪物较脆，仆从仍决定套装倍率和大军刷新。" },
  { title: "脆弱聚怪", action: "用脆弱给沿路怪群上诅咒，让布里格斯将它们拉拢。", reason: "这是角色穿戴的聚怪链；贪婪之戒与复仇者护腕应由单人随从发散。" },
  { title: "亡魂风暴", action: "进入怪群后释放亡魂风暴，继续向下一组移动。", reason: "T16使用跟随角色的符文，不采用冲层死寒大军。" },
  { title: "击杀刷新", action: "保持连续击杀，让梅塞施密特缩短亡者大军剩余冷却。", reason: "普通怪密度足够时，击杀重置比虹吸预热更适合小秘境。" },
  { title: "鲜血转场", action: "用鲜血奔行触发斯图亚特移速。", reason: "这套T16机动链不要求角色拆掉克里森套装去穿金织带。" },
];

const CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "rathma-head", shoulders: "rathma-shoulders", chest: "rathma-chest", gloves: "rathma-gloves",
    bracers: "clena", belt: "crimson-belt", pants: "crimson-pants", boots: "rathma-boots",
    amulet: "squirts", ring1: "krysbin", ring2: "coe", weapon: "jesseth-scythe", offhand: "jesseth-shield",
  },
  skills: [
    { id: "siphon-blood", rune: "纯净精魂" }, { id: "command-skeletons", rune: "杀戮命令" },
    { id: "bone-armor", rune: "限制免疫" }, { id: "army-of-the-dead", rune: "死寒大军" },
    { id: "decrepify", rune: "相时而动" }, { id: "revive", rune: "炼狱" },
  ],
  passives: ["rathmas-shield", "final-service", "spreading-malediction", "grisly-tribute"],
  powers: { weapon: "funerary-pick", armor: "fates-vow", jewelry: "royal-grandeur", season: "corroded-fang" },
  legendaryGems: { range: "zei", control: "bane-of-the-trapped", defense: "esoteric-alteration" },
  normalGems: { head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-topaz"), weapon: ["flawless-royal-emerald"] },
  follower: {
    id: "enchantress",
    items: ["不死圣物", "神目指环", "时光流韵", "复仇者护腕"],
    skills: ["先知协调", "集中心智", "能量护盾"],
  },
  statPriorities: {
    damage: ["冷却缩减", "范围伤害", "暴击伤害与暴击几率", "物理技能伤害"],
    engine: ["号令骸骨约1.6 APS断点", "武器与一枚戒指的攻击速度", "副手资源消耗降低"],
    survival: ["护甲", "生命%", "体能", "至少一条击中回复生命"],
  },
  rotation: PUSH_ROTATION,
};

const SCENARIOS: BuildScenario[] = [
  {
    id: "gr-push", label: "单人 GR 冲层", content: "greater-rift-push", paragonBand: "any", applicability: "supported",
    reason: "Icy与d3guides都支持GR冲层；当前采用d3guides这套字段内部自洽的衰老+塔格奥蚀牙配置，避免Icy第四槽轮回镰刀不增幅亡者大军的问题。",
    unchangedReason: "基础配置就是当前选定的完整单人GR冲层方案。", configurationId: "rathma-aotd-gr-push",
    sourceRefs: [URLS.overview, URLS.skills, URLS.gear, URLS.d3guidesPush, URLS.rathma, URLS.corroded],
    sourceIds: ["icy-rathma-overview", "icy-rathma-skills", "icy-rathma-gear", "d3guides-rathma-push", "blizzard-rathma", "blizzard-corroded"], reviewedAt: REVIEWED_AT,
  },
  {
    id: "gr-speed", label: "GR 速刷", content: "greater-rift-speed", paragonBand: "any", applicability: "supported",
    reason: "两个来源都明确支持GR速刷；当前采用d3guides完整的鲜血奔行+精魂魄身+莱莲娜组合，不沿用Icy无效的轮回镰刀第四槽。",
    patch: {
      skills: [
        { id: "siphon-blood", rune: "纯净精魂" }, { id: "command-skeletons", rune: "杀戮命令" },
        { id: "bone-armor", rune: "限制免疫" }, { id: "army-of-the-dead", rune: "死寒大军" },
        { id: "blood-rush", rune: "鲜血禁闭" }, { id: "revive", rune: "炼狱" },
      ],
      passives: ["overwhelming-essence", "final-service", "rigor-mortis", "grisly-tribute"],
      powers: { season: "reilena" },
      statPriorities: { speed: ["冷却缩减", "最大精魂", "鲜血奔行转场", "号令骸骨攻击速度"] },
      rotation: GR_SPEED_ROTATION,
    },
    configurationId: "rathma-aotd-gr-speed",
    sourceRefs: [URLS.overview, URLS.grSpeed, URLS.d3guidesSpeed, URLS.funerary, URLS.season],
    sourceIds: ["icy-rathma-overview", "icy-rathma-gr-speed", "d3guides-rathma-speed", "blizzard-funerary", "blizzard-season-39"], reviewedAt: REVIEWED_AT,
  },
  {
    id: "t16-rift", label: "T16 小秘境速刷", content: "nephalem-rift-t16", paragonBand: "any", applicability: "supported",
    reason: "Icy与d3guides的T16核心包一致：布里格斯、脆弱、亡魂风暴、梅塞施密特、斯图亚特、强者与囤宝者。保留5+2；角色不穿项目旧版的金织带、复仇者和贪婪之戒。",
    patch: {
      gear: { ring2: "briggs" },
      skills: [
        { id: "blood-rush", rune: "鲜血禁闭" }, { id: "command-skeletons", rune: "杀戮命令" },
        { id: "frailty", rune: "早夭" }, { id: "army-of-the-dead", rune: "亡魂风暴" },
        { id: "bone-armor", rune: "血骨相连" }, { id: "revive", rune: "炼狱" },
      ],
      passives: ["overwhelming-essence", "final-service", "dark-reaping", "blood-is-power"],
      powers: { weapon: "messerschmidt", season: "steuarts-greaves" },
      legendaryGems: { range: "bane-of-the-powerful", control: "boon-of-the-hoarder", defense: "bane-of-the-trapped" },
      follower: { items: ["不死圣物", "神目指环", "时光流韵", "复仇者护腕", "贪婪之戒"] },
      statPriorities: { speed: ["冷却缩减", "鲜血奔行触发斯图亚特", "拾取范围", "连续击杀刷新亡者大军"] },
      rotation: T16_ROTATION,
    },
    configurationId: "rathma-aotd-t16-rift",
    sourceRefs: [URLS.overview, URLS.t16, URLS.d3guidesT16, URLS.season],
    sourceIds: ["icy-rathma-overview", "icy-rathma-t16", "d3guides-rathma-t16", "blizzard-season-39"], reviewedAt: REVIEWED_AT,
  },
];

const PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "达到角色基础上限后停止投入。" },
      { stat: "智力", target: "第二", reason: "提高伤害和全元素抗性。" },
      { stat: "体能", target: "按实际生存补", reason: "Icy允许在偏脆时投入体能，不给固定巅峰线。" },
      { stat: "最大精魂", target: "最后", reason: "Icy主方案认为通常不需要；只有GR速刷莱莲娜组合才主动追求。" },
    ],
    offense: [
      { stat: "冷却缩减", target: "优先点满", reason: "亡者大军是主伤害技能。" },
      { stat: "攻击速度", target: "第二", reason: "帮助号令骸骨达到冷却触发断点。" },
      { stat: "暴击伤害", target: "第三", reason: "Icy当前巅峰表将其排在暴击几率之前。" },
      { stat: "暴击几率", target: "最后", reason: "仍是输出属性，但优先级低于冷却与攻速。" },
    ],
    defense: [
      { stat: "护甲", target: "优先点满", reason: "智力职业通常更缺护甲。" },
      { stat: "生命%", target: "第二", reason: "提高有效生命。" },
      { stat: "全元素抗性", target: "第三", reason: "智力本身已提供全抗。" },
      { stat: "生命恢复", target: "最后", reason: "作为持续恢复补充。" },
    ],
    utility: [
      { stat: "范围伤害", target: "优先点满", reason: "亡者大军打密集怪群时受益。" },
      { stat: "击中回复生命", target: "第二", reason: "偏脆构筑需要稳定恢复。" },
      { stat: "能量消耗降低", target: "第三", reason: "同时提高克里森减伤收益。" },
      { stat: "生命之球拾取范围", target: "最后", reason: "主要是便利属性，不决定场景资格。" },
    ],
  },
  post800: [
    { priority: "智力", when: "当前层数能稳定存活并完整释放亡者大军", reason: "继续提高伤害与全抗。" },
    { priority: "体能", when: "常见伤害会在爆发前击杀角色", reason: "只补到能稳定执行循环，再回到智力。" },
    { priority: "装备功能词缀", when: "已有正确装备与生存基础", reason: "冷却、范围伤与攻速按实战瓶颈优化，不由2000巅峰自动触发换装。" },
  ],
  checkpoints: [
    { label: "永久仆从", target: "骷髅与复生仆从满编", action: "死亡、换层或开局后先重建，再判断构筑伤害。" },
    { label: "号令骸骨攻速", target: "约1.6 APS", action: "先保杰瑟斯骨镰自带攻速，并在一枚戒指补攻速；不要无依据全身堆攻速。" },
    { label: "诅咒覆盖", target: "塔格奥蚀牙场景中的伤害目标已被衰老", action: "没有诅咒时先补衰老；不要把随从偶发诅咒当稳定触发。" },
    { label: "T16转场", target: "击杀能连续刷新大军", action: "若普通怪仍打不动，先回GR配置或降低难度，不要靠高巅峰标签硬切。" },
  ],
};

const POLICIES: BuildChoicePolicy[] = [
  { key: "rathma-sets", targetType: "gear", targetId: "rathma-head", label: "5拉斯玛 + 2克里森 + 华戒", status: "locked", reason: "三种场景都保留这套装备骨架；没有来源支持项目旧版因高低巅峰拆掉克里森。" },
  { key: "rathma-minions", targetType: "skill", targetId: "revive", label: "永久仆从发动机", status: "locked", reason: "拉斯玛二件按永久仆从命中缩短亡者大军冷却，六件按永久仆从数量提高其伤害；仆从不是可省略的装饰。" },
  { key: "rathma-jesseth", targetType: "gear", targetId: "jesseth-scythe", label: "号令骸骨 + 杰瑟斯两件", status: "locked", reason: "每组精英先号令骸骨，以获得杰瑟斯增伤并让骷髅持续攻击。" },
  { key: "rathma-push-fourth", targetType: "power", targetId: "corroded-fang", label: "冲层第四槽：塔格奥蚀牙", status: "locked", reason: "只有与主动衰老同场时才有效；旧项目保留蚀牙却没有诅咒技能，是明确的配置断链。" },
  { key: "rathma-gr-speed-fourth", targetType: "power", targetId: "corroded-fang", label: "GR速刷第四槽", status: "conditional", reason: "GR速刷不带诅咒，改用莱莲娜并同时带精魂魄身；这是完整组合，不是单件替换。", alternatives: [{ id: "reilena", label: "莱莲娜的影魂钩", when: "选择GR速刷场景，并使用精魂魄身提高最大精魂", gain: "把最大精魂转为通用增伤", cost: "失去塔格奥蚀牙，且不再具备冲层衰老覆盖", scenarios: ["gr-speed"] }] },
  { key: "rathma-t16-package", targetType: "power", targetId: "funerary-pick", label: "T16击杀与移速包", status: "conditional", reason: "T16同时更换布里格斯、技能、被动、武器槽、第四槽和两颗宝石；不能只换金织带或一颗宝石。", alternatives: [{ id: "messerschmidt", label: "梅塞施密特 + 斯图亚特", when: "T16小秘境怪物能被连续击杀", gain: "击杀刷新亡者大军并提高转场速度", cost: "失去虹吸葬镰与GR最大精魂乘区", incompatibleWith: ["greater-rift-push", "greater-rift-speed"], scenarios: ["t16-rift"] }] },
  { key: "rathma-t16-ring", targetType: "gear", targetId: "coe", label: "T16第二戒指", status: "conditional", reason: "角色用布里格斯聚怪；贪婪之戒和复仇者护腕由单人随从发散，不拆角色的5+2套装。", alternatives: [{ id: "briggs", label: "布里格斯之怒", when: "T16小秘境使用脆弱快速聚怪", gain: "给脆弱增加自动聚怪", cost: "失去全能法戒元素周期", scenarios: ["t16-rift"] }] },
  { key: "rathma-third-gem", targetType: "legendary-gem", targetId: "esoteric-alteration", label: "推进第三颗宝石", status: "flexible", reason: "当前完整方案采用转煞秘石提高容错；Icy使用迅捷勾玉+贼神，并把转煞列为防御替代。两套宝石不要拆开假装已交叉一致。" },
  { key: "rathma-follower", targetType: "follower", targetId: "enchantress", label: "单人魔女", status: "flexible", reason: "Icy明确推荐魔女的冷却、攻速和减伤；T16的贪婪与复仇者通过发散工作，Switch表现仍待实机验证。" },
  { key: "rathma-content-boundary", targetType: "gear", targetId: "clena", label: "只开放三种已证实场景", status: "locked", reason: "当前证据支持GR冲层、GR速刷和T16小秘境；没有把蓝门或悬赏单独验证为适配场景，因此不创建按钮。" },
];

const CLAIMS: EvidenceClaim[] = [
  { id: "rathma-applicability", category: "applicability", path: "scenarios", conclusion: "拉斯玛亡者大军有独立的GR冲层、GR速刷和T16小秘境方案。", sourceIds: ["icy-rathma-overview", "d3guides-rathma-push", "d3guides-rathma-speed", "d3guides-rathma-t16"], status: "cross-checked" },
  { id: "rathma-no-extra-content", category: "applicability", path: "scenarios", conclusion: "本轮不把T16小秘境自动外推为蓝门或悬赏方案。", sourceIds: ["icy-rathma-overview", "d3guides-rathma-t16"], status: "unverified", conflictNote: "两个来源只明确列GR与Nephalem Rift；缺少蓝门和悬赏逐项配置证据。" },
  { id: "rathma-set-engine", category: "gear", path: "choicePolicies.rathma-minions", conclusion: "永久仆从命中缩短亡者大军冷却，六件按永久仆从数量提高亡者大军伤害。", sourceIds: ["blizzard-rathma", "icy-rathma-gear", "d3guides-rathma-push"], status: "cross-checked", conflictNote: "Icy技能正文仍写每次0.25秒，官方与d3guides当前写0.50秒；数值以官方为准。" },
  { id: "rathma-jesseth-engine", category: "gear", path: "configurationBase.gear.weapon,configurationBase.gear.offhand", conclusion: "三种场景都使用杰瑟斯两件，并通过号令骸骨启动增伤。", sourceIds: ["blizzard-jesseth", "icy-rathma-gear", "d3guides-rathma-push"], status: "cross-checked" },
  { id: "rathma-core-gear", category: "gear", path: "configurationBase.gear", conclusion: "5拉斯玛、2克里森、希雷娜、斯奎特、克里斯宾、全能和杰瑟斯是GR基础装备。", sourceIds: ["icy-rathma-gear", "d3guides-rathma-push"], status: "cross-checked" },
  { id: "rathma-push-skills", category: "skills", path: "configurationBase.skills", conclusion: "冲层采用d3guides的纯净精魂、杀戮命令、限制免疫、死寒大军、相时而动和炼狱。", sourceIds: ["icy-rathma-skills", "d3guides-rathma-push"], status: "unverified", conflictNote: "Icy采用力量转移、狂怒者、白骨脱臼、死亡之谷、鲜血奔行和亡魂护体；当前选择字段闭环更完整的d3guides方案，不混拼。" },
  { id: "rathma-push-passives", category: "passives", path: "configurationBase.passives", conclusion: "冲层采用拉斯玛之盾、绝命效忠、弱点加深和恐怖贡品。", sourceIds: ["icy-rathma-skills", "d3guides-rathma-push"], status: "unverified", conflictNote: "两站只对绝命效忠、拉斯玛之盾和恐怖贡品一致；第四被动不同。" },
  { id: "rathma-push-powers", category: "powers", path: "configurationBase.powers", conclusion: "葬镰、命运誓约、华戒与塔格奥蚀牙组成冲层四槽，且蚀牙由主动衰老触发。", sourceIds: ["d3guides-rathma-push", "blizzard-funerary", "blizzard-corroded", "blizzard-season-39"], status: "cross-checked" },
  { id: "rathma-icy-cycle-error", category: "powers", path: "choicePolicies.rathma-push-fourth", conclusion: "Icy的S39轮回镰刀建议不适用于亡者大军，因此未采纳。", sourceIds: ["icy-rathma-gear", "blizzard-cycle"], status: "cross-checked", conflictNote: "Icy称它是亡者大军额外乘区；官方物品说明只增幅次要技能，而亡者大军属于复生技能。" },
  { id: "rathma-gr-speed", category: "applicability", path: "scenarios.gr-speed", conclusion: "GR速刷采用鲜血奔行、精魂魄身与莱莲娜的完整最大精魂变体。", sourceIds: ["icy-rathma-gr-speed", "d3guides-rathma-speed"], status: "unverified", conflictNote: "两站都支持该用途，但Icy保留主技能栏并误用轮回镰刀；当前精确配置来自d3guides。" },
  { id: "rathma-t16", category: "applicability", path: "scenarios.t16-rift", conclusion: "T16采用布里格斯、脆弱、亡魂风暴、梅塞施密特、斯图亚特、强者和囤宝者。", sourceIds: ["icy-rathma-t16", "d3guides-rathma-t16"], status: "cross-checked", conflictNote: "个别符文和被动仍有差异；所列核心场景包在两站一致。" },
  { id: "rathma-t16-gear", category: "gear", path: "scenarios.t16-rift.patch.gear", conclusion: "单人T16角色保留5+2并只把全能换成布里格斯；贪婪与复仇者由随从发散。", sourceIds: ["icy-rathma-t16", "d3guides-rathma-t16"], status: "cross-checked" },
  { id: "rathma-gems", category: "legendary-gems", path: "configurationBase.legendaryGems", conclusion: "推进宝石采用贼神、困者和转煞；Icy的勾玉+贼神方案记录为另一完整选择。", sourceIds: ["icy-rathma-gear", "d3guides-rathma-push"], status: "unverified", conflictNote: "两站只对困者与贼神一致；d3guides选转煞，Icy选勾玉并把转煞列为替代。" },
  { id: "rathma-normal-gems", category: "normal-gems", path: "configurationBase.normalGems", conclusion: "三种场景都使用头部白、护甲黄、武器绿。", sourceIds: ["icy-rathma-gear", "d3guides-rathma-push"], status: "cross-checked" },
  { id: "rathma-paragon", category: "paragon", path: "paragonGuide.pre800", conclusion: "核心先移速再智力并按需体能；进攻先冷却与攻速，防御先护甲，功能先范围伤与击回。", sourceIds: ["icy-rathma-gear"], status: "single-source" },
  { id: "rathma-no-paragon-copy", category: "stats", path: "paragonGuide.post800", conclusion: "没有证据支持2000巅峰自动换装备、宝石或场景；三种配置按用途切换。", sourceIds: ["icy-rathma-gear", "d3guides-rathma-push"], status: "unverified", conflictNote: "来源按内容、断点与生存描述选择，没有提供项目旧版2000巅峰分界。" },
  { id: "rathma-follower", category: "platform", path: "configurationBase.follower", conclusion: "单人GR使用魔女提供冷却、攻速和减伤；T16由随从发散复仇者与贪婪。", sourceIds: ["icy-rathma-gear", "icy-rathma-t16"], status: "single-source" },
  { id: "rathma-switch", category: "platform", path: "platformStatus", conclusion: "Nintendo Switch的号令骸骨选目标、亡者大军落点、鲜血奔行和随从发散尚未实测。", sourceIds: [], status: "unverified", conflictNote: "精确构筑来源都是PC页面；官方物品机制跨平台不等于主机操控已经验证。" },
];

export function reviewRathmaAotdGuide(base: BuildGuide): BuildGuide {
  const reviewed: BuildGuide = {
    ...base,
    set: "拉斯玛之骨 + 克里森船长",
    core: "永久仆从命中降冷却 → 号令骸骨启动杰瑟斯 → 亡者大军",
    summary: "这套确实同时支持GR冲层、GR速刷和T16，但三个场景使用各自闭环配置；不存在‘高巅峰自动换宝石、装备照抄’的依据。",
    difficulty: "中高 · 仆从满编、目标号令与冷却循环",
    follower: "魔女",
    followerReason: "单人GR用冷却、攻速和减伤服务亡者大军循环；T16再由随从发散复仇者护腕与贪婪之戒。",
    gear: reviewedGear(base),
    skills: ACTIVE,
    passives: PASSIVES,
    powers: reviewedPowers(base),
    variants: {
      push: { title: "单人 GR 冲层", note: "主动衰老保证塔格奥蚀牙生效，按完整冷却循环释放亡者大军。", changes: ["衰老 + 塔格奥蚀牙", "死寒大军", "贼神、困者、转煞"] },
      speed: { title: "GR速刷 / T16", note: "两种速刷不是同一套：GR走最大精魂，T16走击杀冷却和移速。", changes: ["GR：鲜血奔行 + 精魂魄身 + 莱莲娜", "T16：布里格斯 + 梅斧 + 斯图亚特", "没有角色穿戴金织带、复仇者或贪婪"] },
      low: { title: "装备未成型", note: "优先集齐5+2、杰瑟斯、希雷娜和命运誓约，不按巅峰复制另一套装备。", changes: ["先保关键威能和套装完整", "骷髅与复生仆从必须满编", "生存不足时用巅峰体能修正"] },
      high: { title: "装备优化阶段", note: "冷却、号令骸骨攻速和范围伤按实战瓶颈优化，没有2000巅峰硬线。", changes: ["号令骸骨约1.6 APS", "冷却优先于盲目堆范围伤", "增广继续使用智力"] },
    },
    links: [
      { title: "拉斯玛冷却与倍率", category: "resource", conclusion: "永久仆从既是亡者大军冷却引擎，也是六件伤害倍率计数器；开局必须先满编。", steps: [{ id: "revive", label: "亡魂复生", detail: "补足永久仆从" }, { id: "command-skeletons", label: "号令骸骨", detail: "骷髅持续命中" }, { id: "rathma-head", label: "拉斯玛2件", detail: "每次命中缩短0.50秒" }, { id: "army-of-the-dead", label: "亡者大军", detail: "六件按仆从数放大" }] },
      { title: "冲层诅咒闭环", category: "damage", conclusion: "塔格奥蚀牙只对受诅咒目标生效，所以冲层技能栏必须有稳定衰老；旧版无诅咒技能的配置不能成立。", steps: [{ id: "decrepify", label: "衰老", detail: "主动覆盖目标" }, { id: "corroded-fang", label: "塔格奥蚀牙", detail: "只增伤受诅咒敌人" }, { id: "command-skeletons", label: "号令骸骨", detail: "启动杰瑟斯" }, { id: "army-of-the-dead", label: "亡者大军", detail: "结算完整增伤" }] },
      { title: "T16完整切换包", category: "movement", conclusion: "小秘境需要同时更换技能、被动、戒指、两条威能和两颗宝石；高巅峰并不能把冲层方案自动变成速刷方案。", steps: [{ id: "frailty", label: "脆弱", detail: "布里格斯聚怪" }, { id: "messerschmidt", label: "梅塞施密特", detail: "击杀缩冷却" }, { id: "steuarts-greaves", label: "斯图亚特", detail: "鲜血奔行后移速" }, { id: "army-of-the-dead", label: "亡魂风暴", detail: "移动清怪" }] },
    ],
    rotation: PUSH_ROTATION,
    source: URLS.overview,
    purpose: "greater-rift",
    supportedContent: ["单人GR冲层", "GR速刷", "T16小秘境速刷"],
    defaultMode: "push",
    modeLabels: { push: "单人GR冲层", speed: "GR速刷 / T16" },
    pushNote: "采用衰老+塔格奥蚀牙的完整冲层闭环；不使用Icy当前无效的轮回镰刀第四槽。",
    speedNote: "GR速刷与T16是两套不同配置；前者走最大精魂，后者走击杀冷却、聚怪和移速。",
    lowNote: "先凑5拉斯玛+2克里森、杰瑟斯和核心威能；不用固定巅峰线换装。",
    highNote: "按冷却、约1.6 APS、范围伤和生存实测优化；高巅峰不会自动改变场景装备。",
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
    evidenceNote: "已按S39/2.7.8逐字段校对：删除高/低巅峰四份复制，修复塔格奥蚀牙没有诅咒技能的断链，移除角色误穿金织带/复仇者/贪婪的T16拼装，并落地三套真实用途配置。Icy的轮回镰刀第四槽与0.25秒旧数值均被官方资料否定；Maxroll正文受robots限制未计入证据，Nintendo Switch仍待实机。",
    structuredSources: SOURCES,
    evidenceClaims: CLAIMS,
  };

  const errors = [
    ...validateReviewedBuildGuide(reviewed),
    ...validateBuildSemantics(reviewed),
    ...validateBuildEvidence(reviewed),
  ];
  if (errors.length > 0) throw new Error(`拉斯玛亡者大军配置校验失败：${[...new Set(errors)].join("；")}`);
  return reviewed;
}
