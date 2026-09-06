"use client";

import { Fragment, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BUILD_CATALOG,
  CAMPAIGN_ACTS,
  CLASS_CATALOG,
  SEASON_START_STEPS,
  STARTER_CLASSES,
  type ClassId,
} from "./data/site-catalog";
import { NECROMANCER_BUILDS, type NecromancerGuide } from "./data/necromancer-builds";
import {
  diffBuildConfigurations,
  resolveBuildConfiguration,
  validateReviewedBuildGuide,
  type BuildChoicePolicy,
  type BuildConfiguration,
  type BuildScenario,
  type BuildVariantProfile,
  type ParagonGuide,
} from "./data/build-guides";
import { BARBARIAN_BUILDS } from "./data/barbarian-builds";
import { CRUSADER_BUILDS } from "./data/crusader-builds";
import { DEMON_HUNTER_BUILDS } from "./data/demon-hunter-builds";
import { MONK_BUILDS } from "./data/monk-builds";
import { WITCH_DOCTOR_BUILDS } from "./data/witch-doctor-builds";
import { WIZARD_BUILDS } from "./data/wizard-builds";
import { paperdollAsset } from "./data/assets";
import { FOLLOWERS, FOLLOWER_SKILLS } from "./data/followers";
import {
  CUBE_SEASON_LABEL,
  CURRENT_SEASON,
  SEASON_CATALOG,
  SEASON_LABEL,
  cubeSeasonLabel,
  seasonLabel,
  seasonPlatformLabel,
  type SeasonConfig,
} from "./data/season-config";
import { BuildAbilitiesPanel } from "../components/build/BuildAbilitiesPanel";
import { GearDetailPanel } from "../components/build/GearDetailPanel";
import { KanaiCubePanel } from "../components/build/KanaiCubePanel";
import { PaperdollGearSlot } from "../components/build/PaperdollGearSlot";
import type { GearSocket } from "../components/build/types";
import { FollowerShowcase } from "../components/followers/FollowerShowcase";
import { DiabloItemFrame, itemFrameShapeForSlot } from "../components/items/DiabloItemFrame";
import {
  BlizzardItemIcon,
  OfficialPropertySections,
  OfficialSetBlock,
  officialItemIconShape,
} from "../components/library/BlizzardItem";
import type {
  OfficialItemIndexRecord,
  OfficialItemRecord,
} from "../components/library/types";
import { SiteSettingsProvider, useSiteSettings } from "../components/settings/SiteSettings";

type Mode = "push" | "speed";
type Paragon = "low" | "high";
type GearQuality = "set" | "legendary";
type NodeKind = "skill" | "rune" | "passive" | "gear" | "power" | "set" | "effect" | "damage" | "defense" | "movement";

type Gear = {
  id: string;
  name: string;
  slot: string;
  image: string;
  quality: GearQuality;
  effect: string;
  affixes: string[];
  acquisition: string[];
  warning?: string;
  gem?: { name: string; image: string };
};

type Skill = {
  id: string;
  name: string;
  rune: string;
  runeId: string;
  runeKey: "a" | "b" | "c" | "d" | "e" | "none";
  image: string;
  effect: string;
  runeEffect: string;
};

type Passive = {
  id: string;
  name: string;
  image: string;
  effect: string;
};

type CubePower = {
  id: string;
  slot: string;
  name: string;
  image: string;
  original: string;
  summary: string;
};

type FlowNode = {
  id: string;
  label: string;
  detail: string;
  kind: NodeKind;
  image?: string;
};

type FlowRow = {
  id: string;
  category: "damage" | "defense" | "movement" | "set" | "royal";
  title: string;
  nodes: FlowNode[];
};

type FlowFilter = "all" | FlowRow["category"];

const GEAR: Record<string, Gear> = {
  "tragoul-helm": {
    id: "tragoul-helm",
    name: "塔格奥之容",
    slot: "头部",
    image: "/d3/tragoul-helm.png",
    quality: "set",
    effect: "塔格奥的化身套装部件。头部承担死亡新星技能伤与暴击率。",
    affixes: ["死亡新星伤害", "暴击几率", "智力", "体能"],
    acquisition: ["血岩碎片：赌头盔", "优先用重复的塔格奥部件做套装转换", "黄装升级：70级头盔，不如套装转换稳定"],
  },
  "tragoul-shoulders": {
    id: "tragoul-shoulders",
    name: "塔格奥之心",
    slot: "肩部",
    image: "/d3/tragoul-shoulders.png",
    quality: "set",
    effect: "高巅峰速刷使用第六件塔格奥，释放腰带与护腕槽位。",
    affixes: ["范围伤害", "智力", "体能", "生命%"],
    acquisition: ["血岩碎片：赌护肩，成本低", "重复套装转换", "不要单独重铸，先凑齐六件套"],
  },
  "tragoul-chest": {
    id: "tragoul-chest",
    name: "塔格奥之鳞",
    slot: "胸部",
    image: "/d3/tragoul-chest.png",
    quality: "set",
    effect: "套装防御核心，提供三孔与大量坚韧。",
    affixes: ["3个镶孔", "智力", "体能", "护甲"],
    acquisition: ["血岩碎片：赌胸甲", "有任意多余塔格奥部件时优先套装转换", "三孔可以在秘士处洗出"],
  },
  "tragoul-gloves": {
    id: "tragoul-gloves",
    name: "塔格奥之爪",
    slot: "手部",
    image: "/d3/tragoul-gloves.png",
    quality: "set",
    effect: "同时承担双暴与攻速；高巅峰时可把智力替换成范围伤害。",
    affixes: ["暴击几率", "暴击伤害", "攻击速度", "智力 → 高巅峰换范围伤"],
    acquisition: ["血岩碎片：优先赌手套", "重复套装转换", "双暴+攻速难成型，先保留三攻词缀"],
  },
  "tragoul-pants": {
    id: "tragoul-pants",
    name: "塔格奥之皮",
    slot: "腿部",
    image: "/d3/tragoul-pants.png",
    quality: "set",
    effect: "纯防御部件，以双孔和坚韧为主。",
    affixes: ["2个镶孔", "智力", "体能", "护甲"],
    acquisition: ["血岩碎片：赌裤子", "重复套装转换", "不需要追求进攻副词缀"],
  },
  "tragoul-boots": {
    id: "tragoul-boots",
    name: "塔格奥的刚毅胫甲",
    slot: "脚部",
    image: "/d3/tragoul-boots.png",
    quality: "set",
    effect: "鞋子可获得死亡新星技能伤，是重要输出槽。",
    affixes: ["死亡新星伤害", "智力", "体能", "护甲"],
    acquisition: ["血岩碎片：优先赌靴子", "重复套装转换", "移速由巅峰补足，鞋上不必强求"],
  },
  "aughild-shoulders": {
    id: "aughild-shoulders",
    name: "奥吉德的力量",
    slot: "肩部",
    image: "/d3/aughild-shoulders.png",
    quality: "set",
    effect: "与奥吉德护腕组成三件效果，对精英增伤并减免精英伤害。",
    affixes: ["范围伤害", "智力", "体能", "生命%"],
    acquisition: ["悬赏宝箱获取设计图", "铁匠直接锻造护肩", "反复锻造比重铸传奇更省材料"],
    warning: "这是锻造套装，不要用黄装升级寻找。",
  },
  "aughild-bracers": {
    id: "aughild-bracers",
    name: "奥吉德的搜捕",
    slot: "腕部",
    image: "/d3/aughild-bracers.png",
    quality: "set",
    effect: "与奥吉德肩配合；护腕必须拿到物理元素伤。",
    affixes: ["物理技能伤害", "暴击几率", "智力", "体能"],
    acquisition: ["悬赏宝箱获取设计图", "铁匠锻造护腕", "优先重做直到物理伤+暴击"],
    warning: "这是锻造套装，不进世界传奇掉落池。",
  },
  "guardian-bracers": {
    id: "guardian-bracers",
    name: "守护者护腕",
    slot: "腕部",
    image: "/d3/guardian-bracers.png",
    quality: "set",
    effect: "低巅峰用守护者三件效果翻倍装备上的智力与体能。",
    affixes: ["物理技能伤害", "暴击几率", "智力", "体能"],
    acquisition: ["悬赏宝箱获取设计图", "铁匠锻造护腕", "和守护者腰带一起穿"],
    warning: "约2000巅峰后逐渐被奥吉德替代。",
  },
  "guardian-belt": {
    id: "guardian-belt",
    name: "守护者腰带",
    slot: "腰部",
    image: "/d3/guardian-belt.png",
    quality: "set",
    effect: "低巅峰生存与主属性放大器，和护腕组成守护者三件效果。",
    affixes: ["智力", "体能", "生命%", "护甲"],
    acquisition: ["悬赏宝箱获取设计图", "铁匠锻造腰带", "设计图未掉落前持续完成悬赏"],
    warning: "不要拿普通腰带做黄装升级，它是锻造套装。",
  },
  dayntee: {
    id: "dayntee",
    name: "戴恩提的束腰",
    slot: "腰部",
    image: "/d3/dayntee.png",
    quality: "legendary",
    effect: "只要有敌人受到诅咒，获得最高50%额外减伤。",
    affixes: ["特效接近50%", "智力", "体能", "生命%", "护甲"],
    acquisition: ["血岩碎片：优先赌腰带，成本低", "黄装升级：70级普通腰带", "高巅峰冲层版本直接穿戴"],
  },
  "haunted-visions": {
    id: "haunted-visions",
    name: "鬼灵面容",
    slot: "颈部",
    image: "/d3/haunted-visions.png",
    quality: "legendary",
    effect: "血魂双分持续到死亡，并让分身复制死亡新星；这是整套BD的发动机之一。",
    affixes: ["镶孔", "暴击伤害", "暴击几率", "物理技能伤害"],
    acquisition: ["世界掉落与大秘境结算为主", "黄装升级：70级项链，池子很大", "不建议用血岩赌博项链，成本过高"],
    warning: "没有它时分身无法常驻，BD只能作为过渡玩法。",
  },
  krysbin: {
    id: "krysbin",
    name: "克里斯宾的审判",
    slot: "手指",
    image: "/d3/krysbin.png",
    quality: "legendary",
    effect: "对减速敌人最高增伤100%；其他控制状态使该增伤数值提高到三倍。",
    affixes: ["镶孔", "暴击几率", "暴击伤害", "攻击速度"],
    acquisition: ["世界掉落与大秘境结算为主", "血岩赌博戒指成本高，不建议前期强赌", "黄装升级：70级戒指，仅材料富余时"],
  },
  coe: {
    id: "coe",
    name: "全能法戒",
    slot: "手指",
    image: "/d3/coe.png",
    quality: "legendary",
    effect: "冲层时等待物理元素周期，把眩晕与新星爆发压进窗口。",
    affixes: ["镶孔", "暴击几率", "暴击伤害", "范围伤害"],
    acquisition: ["世界掉落与大秘境结算", "黄装升级：70级戒指", "戒指池很大，不建议前期血岩强赌"],
  },
  briggs: {
    id: "briggs",
    name: "布里格斯之怒",
    slot: "手指",
    image: "/d3/briggs.png",
    quality: "legendary",
    effect: "速刷时，虚弱诅咒会把敌人拖到身边，直接塞进血潮利刃的25码范围。",
    affixes: ["镶孔", "暴击几率", "暴击伤害", "攻击速度"],
    acquisition: ["世界掉落", "黄装升级：70级戒指", "速刷专用，不要为了它拆掉冲层全能法戒"],
  },
  "funerary-pick": {
    id: "funerary-pick",
    name: "葬镰",
    slot: "主手",
    image: "/d3/funerary-pick.png",
    quality: "legendary",
    effect: "鲜血虹吸多连两个目标；受虹吸影响的目标承受最高300%增伤，单体时翻倍。",
    affixes: ["高白字伤害", "范围伤害", "伤害%", "智力", "拉玛兰迪打孔"],
    acquisition: ["黄装升级：必须使用70级单手镰刀", "不要升级双手镰刀或普通单手武器", "死灵法师角色升级可缩小掉落池"],
    warning: "关键分类：单手镰刀。不是任意镰刀。",
  },
  "iron-rose": {
    id: "iron-rose",
    name: "铁玫瑰",
    slot: "副手",
    image: "/d3/iron-rose.png",
    quality: "legendary",
    effect: "鲜血虹吸100%触发免费鲜血新星；损失生命还能叠加新星伤害。",
    affixes: ["高伤害范围", "死亡新星伤害", "暴击几率", "范围伤害", "智力"],
    acquisition: ["黄装升级：必须使用70级死灵法器", "血岩碎片：赌博副手/死灵法器", "不要升级盾牌、法球或箭袋"],
    warning: "关键分类：死灵法器。普通副手不行。",
  },
  "mantle-channeling": {
    id: "mantle-channeling",
    name: "导能披肩",
    slot: "肩部",
    image: "/d3/mantle-channeling.png",
    quality: "legendary",
    effect: "引导鲜血虹吸时，最高25%增伤并获得25%减伤。",
    affixes: ["范围伤害", "智力", "体能", "生命%"],
    acquisition: ["血岩碎片：赌护肩，成本低", "黄装升级：70级护肩", "高巅峰冲层放入魔方防具槽"],
  },
  "goldwrap": {
    id: "goldwrap",
    name: "金织带",
    slot: "腰部",
    image: "/d3/goldwrap.png",
    quality: "legendary",
    effect: "拾取金币后获得等量护甲；与囤宝者宝石构成T16近乎不死链。",
    affixes: ["智力", "体能", "生命%", "护甲"],
    acquisition: ["血岩碎片：赌腰带", "黄装升级：70级腰带", "仅用于会掉金币的普通秘境"],
    warning: "大秘境不掉金币，冲层绝对不要穿。",
  },
  warzechian: {
    id: "warzechian",
    name: "沃兹克护腕",
    slot: "腕部",
    image: "/d3/warzechian.png",
    quality: "legendary",
    effect: "破坏物件后获得短时移速，适合T16连续赶路。",
    affixes: ["物理技能伤害", "暴击几率", "智力", "体能"],
    acquisition: ["血岩碎片：赌护腕", "黄装升级：70级护腕", "高巅峰速刷替换守护者护腕"],
  },
};

const SKILLS: Skill[] = [
  {
    id: "siphon-blood",
    name: "鲜血虹吸",
    rune: "全符文（塔格奥 2件）",
    runeId: "rune-siphon-all",
    runeKey: "none",
    image: "/d3/siphon-blood.png",
    effect: "引导动作本身就是触发器：启动铁玫瑰、葬镰和导能披肩。",
    runeEffect: "套装使鲜血虹吸获得全部符文：移速、伤害、减伤与恢复同时生效。",
  },
  {
    id: "death-nova",
    name: "死亡新星",
    rune: "鲜血新星",
    runeId: "rune-blood-nova",
    runeKey: "c",
    image: "/d3/death-nova.png",
    effect: "生命消耗型次要技能，吃到塔格奥六件、轮回镰刀与血潮利刃放大。",
    runeEffect: "将伤害转为物理并消耗生命；正因它是生命消耗技能，才进入塔格奥六件乘区。",
  },
  {
    id: "bone-armor",
    name: "骨甲",
    rune: "白骨脱臼",
    runeId: "rune-dislocation",
    runeKey: "b",
    image: "/d3/bone-armor.png",
    effect: "每命中一个敌人提供3%减伤，最多10层；符文眩晕触发克里斯宾强控倍率。",
    runeEffect: "命中时眩晕周围敌人2秒，把克里斯宾从减速档推到强控三倍档。",
  },
  {
    id: "frailty",
    name: "脆弱",
    rune: "脆弱光环",
    runeId: "rune-aura-frailty",
    runeKey: "a",
    image: "/d3/frailty.png",
    effect: "自动处决低生命敌人并维持诅咒，从而让戴恩提腰带常驻。",
    runeEffect: "变为近身自动施加的光环，同时启动咒怨之力、戴恩提与布里格斯。",
  },
  {
    id: "blood-rush",
    name: "鲜血穿行",
    rune: "全符文（塔格奥 2件）",
    runeId: "rune-blood-rush-all",
    runeKey: "none",
    image: "/d3/blood-rush.png",
    effect: "进场、聚怪与脱离危险的唯一位移；NS上会受自动锁定方向影响。",
    runeEffect: "套装同时提供护甲、尸体、双充能与生命消耗等符文收益。",
  },
  {
    id: "simulacrum",
    name: "血魂双分",
    rune: "鲜血与白骨",
    runeId: "rune-blood-and-bone",
    runeKey: "d",
    image: "/d3/simulacrum.png",
    effect: "分身复制次要技能死亡新星，是范围伤害的主要来源。",
    runeEffect: "额外创造一个分身；鬼灵面容让两个分身常驻并复制死亡新星。",
  },
];

const PASSIVES: Passive[] = [
  { id: "spreading-malediction", name: "咒怨之力", image: "/d3/spreading-malediction.png", effect: "每个受到诅咒的敌人都会提高你的伤害；怪群越密，脆弱光环的增伤越高。" },
  { id: "stand-alone", name: "孤魂死灵", image: "/d3/stand-alone.png", effect: "没有仆从时提高护甲；血魂双分不会破坏这条减伤。" },
  { id: "swift-harvesting", name: "迅捷收割", image: "/d3/swift-harvesting.png", effect: "提高鲜血虹吸攻击速度，等价于更快触发铁玫瑰免费新星。" },
  { id: "final-service", name: "绝命效忠", image: "/d3/final-service.png", effect: "致命伤害时保命并短暂无敌，给你刷新骨甲或位移离场的机会。" },
];

const ORIGINAL_EFFECTS: Record<string, string> = {
  "tragoul-helm": "塔格奥的化身：2件使鲜血虹吸与鲜血穿行获得全部符文；4件使满血时的技能治疗量加入最大生命，最高提高100%；6件使生命消耗技能伤害提高10000%，技能治疗量提高100%。",
  "tragoul-shoulders": "塔格奥的化身：2件获得全符文；4件叠加最大生命；6件使生命消耗技能伤害提高10000%。",
  "tragoul-chest": "塔格奥的化身：2件获得全符文；4件叠加最大生命；6件使生命消耗技能伤害提高10000%。",
  "tragoul-gloves": "塔格奥的化身：2件获得全符文；4件叠加最大生命；6件使生命消耗技能伤害提高10000%。",
  "tragoul-pants": "塔格奥的化身：2件获得全符文；4件叠加最大生命；6件使生命消耗技能伤害提高10000%。",
  "tragoul-boots": "塔格奥的化身：2件获得全符文；4件叠加最大生命；6件使生命消耗技能伤害提高10000%。",
  "aughild-shoulders": "奥吉德的权威：2件减伤15%、增伤30%；3件对精英再减伤30%并增伤30%。",
  "aughild-bracers": "奥吉德的权威：2件减伤15%、增伤30%；3件对精英再减伤30%并增伤30%。",
  "guardian-bracers": "守护者的危难：2件使装备提供的基础体能翻倍；3件使装备提供的基础主属性翻倍。",
  "guardian-belt": "守护者的危难：2件使装备提供的基础体能翻倍；3件使装备提供的基础主属性翻倍。",
  dayntee: "当有敌人受到你的诅咒时，你获得40%–50%额外伤害减免。",
  "haunted-visions": "血魂双分现在会永久持续，但每秒消耗最大生命；并使其复制死亡新星。",
  krysbin: "对减速敌人的伤害提高75%–100%；当敌人受到减速以外的控制时，该增伤数值提高到三倍。",
  coe: "每4秒使一种元素的伤害提高150%–200%，持续4秒，并按职业可用元素循环。",
  briggs: "未受诅咒的敌人被施加诅咒时，会被拉到目标位置。",
  "funerary-pick": "鲜血虹吸额外引导两个目标；受其影响的目标承受更高伤害，只有一个目标时该加成翻倍。",
  "iron-rose": "以鲜血虹吸攻击时100%几率释放一次免费的鲜血新星；累计损失生命会进一步提高死亡新星伤害。",
  "mantle-channeling": "引导鲜血虹吸等技能时，造成的伤害提高20%–25%，受到的伤害降低25%。",
  goldwrap: "拾取金币后，护甲值在5秒内提高等同于金币数量的数值。",
  warzechian: "摧毁可破坏物体时获得短暂移动速度加成。",
};

const SOCKETS: Record<string, { image: string; label: string }[]> = {
  "tragoul-helm": [{ image: "/d3/flawless-royal-amethyst.png", label: "无瑕皇家紫宝石：生命%" }],
  "tragoul-chest": Array.from({ length: 3 }, () => ({ image: "/d3/flawless-royal-topaz.png", label: "无瑕皇家黄宝石：智力" })),
  "tragoul-pants": Array.from({ length: 2 }, () => ({ image: "/d3/flawless-royal-topaz.png", label: "无瑕皇家黄宝石：智力" })),
  "funerary-pick": [{ image: "/d3/flawless-royal-emerald.png", label: "无瑕皇家绿宝石：暴击伤害" }],
  "haunted-visions": [{ image: "/d3/bane-trapped.png", label: "困者之灾" }],
  krysbin: [{ image: "/d3/zei.png", label: "贼神的复仇之石" }],
  coe: [{ image: "/d3/stricken.png", label: "受罚者之灾" }],
  briggs: [{ image: "/d3/boon-hoarder.png", label: "囤宝者的恩惠" }],
};

const CUBE_POWERS: Record<string, Omit<CubePower, "slot">> = {
  "bloodtide-blade": {
    id: "bloodtide-blade",
    name: "血潮利刃",
    image: "/d3/bloodtide-blade.png",
    original: "25码内每个敌人使死亡新星的伤害提高300%–400%，最多计算25个敌人。",
    summary: "把怪聚密不是手感问题，而是直接把新星推入最高密度乘区。",
  },
  dayntee: {
    id: "dayntee",
    name: "戴恩提的束腰",
    image: "/d3/dayntee.png",
    original: "当有敌人受到你的诅咒时，获得40%–50%额外伤害减免。",
    summary: "脆弱光环自动上诅咒，让腰带减伤无需额外操作。",
  },
  "mantle-channeling": {
    id: "mantle-channeling",
    name: "导能披肩",
    image: "/d3/mantle-channeling.png",
    original: "引导技能时造成的伤害提高20%–25%，受到的伤害降低25%。",
    summary: "鲜血虹吸一按住，增伤和减伤同时接通。",
  },
  "steuarts-greaves": {
    id: "steuarts-greaves",
    name: "斯图亚特的胫甲",
    image: "/d3/steuarts-greaves.png",
    original: "使用鲜血穿行后，移动速度提高75%–100%，持续10秒。",
    summary: "速刷时每次位移都会启动长时间高速移动。",
  },
  "royal-grandeur": {
    id: "royal-grandeur",
    name: "皇家华戒",
    image: "/d3/royal-grandeur.png",
    original: "使套装奖励所需的装备数量减少1件，最少仍需2件。",
    summary: "让塔格奥与守护者/奥吉德同时满足套装件数。",
  },
  "avarice-band": {
    id: "avarice-band",
    name: "贪婪之戒",
    image: "/d3/avarice-band.png",
    original: "拾取金币后，金币与生命球拾取范围提高1码，最多叠到30码。",
    summary: "把金币、进度球和金织带触发全部变成远距离自动拾取。",
  },
  "scythe-cycle": {
    id: "scythe-cycle",
    name: "轮回镰刀",
    image: "/d3/scythe-cycle.png",
    original: "骨甲生效时，次要技能伤害提高350%–400%，但每次施放会使骨甲剩余时间缩短4秒。",
    summary: "这是新星乘区，也是必须定时刷新骨甲的原因。",
  },
};

const SET_NODE: FlowNode = {
  id: "tragoul-6",
  label: "塔格奥 6件",
  detail: "生命消耗技能伤害提高10000%，技能治疗量提高100%。",
  kind: "set",
};

const BASE_ROWS: FlowRow[] = [
  {
    id: "nova-engine",
    category: "damage",
    title: "新星发动机",
    nodes: [
      { id: "siphon-blood", label: "鲜血虹吸", detail: "持续引导", kind: "skill", image: "/d3/siphon-blood.png" },
      { id: "swift-harvesting", label: "迅捷收割", detail: "提高虹吸触发频率", kind: "passive", image: "/d3/swift-harvesting.png" },
      { id: "iron-rose", label: "铁玫瑰", detail: "100%免费触发", kind: "gear", image: "/d3/iron-rose.png" },
      { id: "rune-blood-nova", label: "符文·鲜血新星", detail: "物理生命消耗技能", kind: "rune", image: "/d3/death-nova.png" },
      SET_NODE,
      { id: "nova-output", label: "核心伤害", detail: "持续环形AOE", kind: "damage" },
    ],
  },
  {
    id: "clone-engine",
    category: "damage",
    title: "分身复制",
    nodes: [
      { id: "simulacrum", label: "血魂双分", detail: "复制次要技能", kind: "skill", image: "/d3/simulacrum.png" },
      { id: "rune-blood-and-bone", label: "鲜血与白骨", detail: "额外创造一个分身", kind: "rune", image: "/d3/simulacrum.png" },
      { id: "haunted-visions", label: "鬼灵面容", detail: "分身永久存在", kind: "gear", image: "/d3/haunted-visions.png" },
      { id: "twin-cast", label: "双分施法", detail: "复制死亡新星", kind: "effect" },
      { id: "area-damage", label: "范围伤害", detail: "分身新星可触发", kind: "damage" },
      { id: "nova-output", label: "核心伤害", detail: "多重爆发", kind: "damage" },
    ],
  },
  {
    id: "density-engine",
    category: "damage",
    title: "密度乘区",
    nodes: [
      { id: "pack-density", label: "25码怪群", detail: "最多计算25个敌人", kind: "effect" },
      { id: "bloodtide-blade", label: "血潮利刃", detail: "每个敌人最高+400%", kind: "gear", image: "/d3/bloodtide-blade.png" },
      { id: "density-multiplier", label: "密度倍率", detail: "敌人越多，新星越强", kind: "damage" },
      { id: "iron-rose", label: "铁玫瑰", detail: "不断触发新星", kind: "gear", image: "/d3/iron-rose.png" },
      { id: "nova-output", label: "清场爆发", detail: "优先打大怪群", kind: "damage" },
    ],
  },
  {
    id: "cycle-engine",
    category: "damage",
    title: "赛季乘区",
    nodes: [
      { id: "bone-armor", label: "骨甲", detail: "必须保持生效", kind: "skill", image: "/d3/bone-armor.png" },
      { id: "scythe-cycle", label: "轮回镰刀", detail: `${SEASON_LABEL}${CURRENT_SEASON.cubeLabel}`, kind: "power", image: "/d3/scythe-cycle.png" },
      { id: "secondary-bonus", label: "次要技能+400%", detail: "新星是次要技能", kind: "damage" },
      { id: "duration-cost", label: "消耗骨甲时长", detail: "每次触发减少4秒", kind: "effect" },
      { id: "refresh-armor", label: "及时刷新", detail: "断骨甲就断乘区", kind: "defense" },
    ],
  },
  {
    id: "curse-defense",
    category: "defense",
    title: "诅咒减伤",
    nodes: [
      { id: "frailty", label: "脆弱", detail: "诅咒技能", kind: "skill", image: "/d3/frailty.png" },
      { id: "rune-aura-frailty", label: "符文·脆弱光环", detail: "靠近即自动诅咒", kind: "rune", image: "/d3/frailty.png" },
      { id: "cursed", label: "敌人受诅咒", detail: "持续满足条件", kind: "effect" },
      { id: "dayntee", label: "戴恩提束腰", detail: "最高50%额外减伤", kind: "power", image: "/d3/dayntee.png" },
      { id: "bone-armor", label: "骨甲10层", detail: "再提供30%减伤", kind: "skill", image: "/d3/bone-armor.png" },
      { id: "toughness", label: "站桩引导", detail: "维持虹吸与新星", kind: "defense" },
    ],
  },
  {
    id: "curse-damage",
    category: "damage",
    title: "诅咒密度增伤",
    nodes: [
      { id: "rune-aura-frailty", label: "脆弱光环", detail: "批量给近身敌人上诅咒", kind: "rune", image: "/d3/frailty.png" },
      { id: "spreading-malediction", label: "咒怨之力", detail: "每个受诅咒敌人增伤", kind: "passive", image: "/d3/spreading-malediction.png" },
      { id: "pack-density", label: "高密度怪群", detail: "同时叠乘区与被动", kind: "effect" },
      { id: "bloodtide-blade", label: "血潮利刃", detail: "25码密度乘区", kind: "power", image: "/d3/bloodtide-blade.png" },
      { id: "nova-output", label: "新星增伤", detail: "聚怪本身就是输出", kind: "damage" },
    ],
  },
  {
    id: "passive-defense",
    category: "defense",
    title: "被动保命",
    nodes: [
      { id: "stand-alone", label: "孤魂死灵", detail: "无仆从时提高护甲", kind: "passive", image: "/d3/stand-alone.png" },
      { id: "bone-armor", label: "骨甲10层", detail: "30%减伤", kind: "skill", image: "/d3/bone-armor.png" },
      { id: "final-service", label: "绝命效忠", detail: "致命伤害保命", kind: "passive", image: "/d3/final-service.png" },
      { id: "blood-rush", label: "鲜血穿行", detail: "无敌窗后位移脱场", kind: "skill", image: "/d3/blood-rush.png" },
      { id: "toughness", label: "重建循环", detail: "刷新骨甲继续输出", kind: "defense" },
    ],
  },
];

const PUSH_ROW: FlowRow = {
  id: "burst-window",
  category: "damage",
  title: "物理爆发窗",
  nodes: [
    { id: "coe", label: "全能法戒", detail: "等待物理周期", kind: "gear", image: "/d3/coe.png" },
    { id: "rune-dislocation", label: "白骨脱臼", detail: "物理周期内眩晕2秒", kind: "rune", image: "/d3/bone-armor.png" },
    { id: "hard-cc", label: "强控制", detail: "眩晕不是普通减速", kind: "effect" },
    { id: "krysbin", label: "克里斯宾", detail: "特效增伤数值×3", kind: "gear", image: "/d3/krysbin.png" },
    { id: "burst", label: "爆发收割", detail: "把新星压进窗口", kind: "damage" },
  ],
};

const SPEED_ROWS: FlowRow[] = [
  {
    id: "speed-pull",
    category: "movement",
    title: "自动聚怪",
    nodes: [
      { id: "frailty", label: "脆弱光环", detail: "路过自动上诅咒", kind: "skill", image: "/d3/frailty.png" },
      { id: "briggs", label: "布里格斯", detail: "把受诅咒敌人拉近", kind: "gear", image: "/d3/briggs.png" },
      { id: "tight-pack", label: "紧密怪堆", detail: "进入25码范围", kind: "effect" },
      { id: "bloodtide-blade", label: "血潮利刃", detail: "吃满密度倍率", kind: "power", image: "/d3/bloodtide-blade.png" },
      { id: "one-touch", label: "短按即走", detail: "无需等待元素周期", kind: "movement" },
    ],
  },
  {
    id: "gold-defense",
    category: "defense",
    title: "T16金币甲",
    nodes: [
      { id: "boon-hoarder", label: "囤宝者恩惠", detail: "击杀持续掉金币", kind: "gear", image: "/d3/boon-hoarder.png" },
      { id: "gold", label: "拾取金币", detail: "触发移速与护甲", kind: "effect" },
      { id: "goldwrap", label: "金织带", detail: "金币数量转化护甲", kind: "gear", image: "/d3/goldwrap.png" },
      { id: "warzechian", label: "沃兹克护腕", detail: "破坏物体提高移速", kind: "gear", image: "/d3/warzechian.png" },
      { id: "rush", label: "全程赶路", detail: "只停下来触发新星", kind: "movement" },
    ],
  },
];

const SLOT_ORDER = [
  ["head", "tragoul-helm"],
  ["shoulders", "shoulder"],
  ["chest", "tragoul-chest"],
  ["gloves", "tragoul-gloves"],
  ["bracers", "bracers"],
  ["belt", "belt"],
  ["pants", "tragoul-pants"],
  ["boots", "tragoul-boots"],
  ["amulet", "haunted-visions"],
  ["ring1", "krysbin"],
  ["ring2", "ring2"],
  ["weapon", "funerary-pick"],
  ["offhand", "iron-rose"],
] as const;

function getPositionGear(mode: Mode, paragon: Paragon) {
  return {
    shoulder: paragon === "low" ? "mantle-channeling" : mode === "push" ? "aughild-shoulders" : "tragoul-shoulders",
    bracers: paragon === "low" ? "guardian-bracers" : mode === "push" ? "aughild-bracers" : "warzechian",
    belt: paragon === "low" ? "guardian-belt" : mode === "push" ? "dayntee" : "goldwrap",
    ring2: mode === "push" ? "coe" : "briggs",
  };
}

function FlowNodeButton({
  node,
  dimmed,
  active,
  onSelect,
}: {
  node: FlowNode;
  dimmed: boolean;
  active: boolean;
  onSelect: (node: FlowNode) => void;
}) {
  return (
    <button
      className={`flow-node node-${node.kind} ${dimmed ? "dimmed" : ""} ${active ? "active" : ""}`}
      onClick={() => onSelect(node)}
      title={node.detail}
    >
      <span className="node-icon">
        {node.image ? <img src={node.image} alt="" /> : <span>{node.kind === "damage" ? "✦" : node.kind === "defense" ? "◆" : "◈"}</span>}
      </span>
      <span className="node-copy">
        <strong>{node.label}</strong>
        <small>{node.detail}</small>
      </span>
    </button>
  );
}

type ItemCategoryRecord = {
  id: string;
  name: string;
  group: "armor" | "weapons" | "other";
  classes: string[];
  followers: string[];
  artisans: string[];
  classNames: string[];
  followerNames: string[];
  artisanNames: string[];
  count: number;
};

function SiteHeader({ active }: { active?: "story" | "season" | "builds" | "library" }) {
  const { openSettings, season, setSeason } = useSiteSettings();
  const pathname = usePathname() || "/builds";
  const searchParams = useSearchParams();
  const requestedClass = searchParams.get("class") ?? searchParams.get("fromClass");
  const pathBuildId = pathname.startsWith("/builds/") ? pathname.split("/").filter(Boolean)[1] : null;
  const pathBuildClass = BUILD_CATALOG.find((build) => build.id === pathBuildId)?.classId;
  const buildsHref = active === "builds" && (isClassId(requestedClass) || pathBuildClass)
    ? `/builds?class=${isClassId(requestedClass) ? requestedClass : pathBuildClass}`
    : "/builds";
  return (
    <header className="site-header global-tabs">
      <a className="brand" href={buildsHref} aria-label="返回赛季全职业BD">
        <span className="brand-mark">III</span>
        <span><strong>圣休亚瑞秘典</strong><small>NEPHALEM ARCHIVE</small></span>
      </a>
      <nav aria-label="站点主导航">
        <a className={active === "story" ? "active" : ""} href="/story">剧情线路</a>
        <a className={active === "season" ? "active" : ""} href="/season-start">赛季开荒</a>
        <a className={active === "builds" ? "active" : ""} href={buildsHref}>赛季全职业BD</a>
        <a className={active === "library" ? "active" : ""} href="/library">物品</a>
      </nav>
      <label className="season-pill"><i /><select value={season.seasonId} onChange={(event) => setSeason(event.target.value)} aria-label="选择赛季主题">{SEASON_CATALOG.map((candidate) => <option key={candidate.seasonId} value={candidate.seasonId}>{seasonPlatformLabel(candidate)}{candidate.availability === "preview" ? "（预设）" : ""}</option>)}</select></label>
      <button className="settings-trigger" onClick={openSettings} aria-label="打开网站设置"><span>⚙</span> 网站设置</button>
    </header>
  );
}

function RoutePage({ active, title, eyebrow, children }: { active: "story" | "season" | "builds" | "library"; title: string; eyebrow: string; children: ReactNode }) {
  const { season } = useSiteSettings();
  return (
    <main className={`route-page route-${active}`}>
      <SiteHeader active={active} />
      <section className="route-masthead">
        <span>{eyebrow}</span><h1>{title}</h1>
      </section>
      <div className="route-content">{children}</div>
      <footer><div><span className="footer-mark">N</span><p><strong>圣休亚瑞秘典</strong><small>{season.platformLabel} · {seasonLabel(season)} · {season.modeLabel}</small></p></div><p>页面资料用于私人攻略整理。</p></footer>
    </main>
  );
}

function isClassId(value: string | null): value is ClassId {
  return CLASS_CATALOG.some((hero) => hero.id === value);
}

function BuildAtlas() {
  const searchParams = useSearchParams();
  const requestedClass = searchParams.get("class");
  const initialClass = isClassId(requestedClass) ? requestedClass : "necromancer";
  const [classId, setClassId] = useState<ClassId>(initialClass);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(() => BUILD_CATALOG.find((build) => build.classId === initialClass)?.id ?? "tragoul-nova");
  const visibleBuilds = BUILD_CATALOG.filter((build) => {
    const matchesClass = build.classId === classId;
    const haystack = `${build.name}${build.set}${build.core}`.toLowerCase();
    return matchesClass && haystack.includes(query.trim().toLowerCase());
  });
  const selected = BUILD_CATALOG.find((build) => build.id === selectedId) ?? visibleBuilds[0] ?? BUILD_CATALOG[0];
  const selectedClass = CLASS_CATALOG.find((hero) => hero.id === selected.classId) ?? CLASS_CATALOG[0];

  useEffect(() => {
    const nextClass = isClassId(requestedClass) ? requestedClass : null;
    if (nextClass && nextClass !== classId) {
      setClassId(nextClass);
      const first = BUILD_CATALOG.find((build) => build.classId === nextClass);
      if (first) setSelectedId(first.id);
    }
  }, [classId, requestedClass]);

  function updateClass(nextClass: ClassId) {
    setClassId(nextClass);
    const first = BUILD_CATALOG.find((build) => build.classId === nextClass);
    if (first) setSelectedId(first.id);
    window.history.replaceState(null, "", `/builds?class=${nextClass}`);
  }

  return (
    <section className="archive-section build-atlas" id="builds">
      <div className="archive-heading">
        <div><span>全职业 · 单人</span><h2>职业与主流 BD</h2></div>
        <p>七大职业的主流大秘境构筑之外，现已增加小秘境、蓝门与外观收集专用趣味 BD；全部复用同一套交互装备盘和联动系统。</p>
      </div>
      <div className="class-rail" role="tablist" aria-label="选择职业">
        {CLASS_CATALOG.map((hero) => (
          <button
            key={hero.id}
            className={classId === hero.id ? "active" : ""}
            onClick={() => {
              updateClass(hero.id);
            }}
          >
            <img src={hero.portrait} alt="" />
            <span><strong>{hero.name}</strong><small>{BUILD_CATALOG.filter((build) => build.classId === hero.id).length} 套主流 BD</small></span>
          </button>
        ))}
      </div>
      <div className="atlas-toolbar">
        <span>{CLASS_CATALOG.find((hero) => hero.id === classId)?.name}目录</span>
        <label><span>筛选</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="套装、技能或 BD 名" /></label>
      </div>
      <div className="atlas-body">
        <div className="build-card-grid">
          {visibleBuilds.map((build) => (
            <button
              key={build.id}
              className={`build-card ${selected.id === build.id ? "active" : ""}`}
              onMouseEnter={() => setSelectedId(build.id)}
              onFocus={() => setSelectedId(build.id)}
              onClick={() => { window.location.href = `/builds/${build.id}?fromClass=${classId}`; }}
            >
              <img src={build.image} alt="" />
              <span>
                <small>{build.set}</small>
                <strong>{build.name}</strong>
                <em>{build.core}</em>
                {build.content && <small>{build.content.join(" · ")}</small>}
              </span>
              <b className={build.complete ? "complete" : "indexed"}>{build.complete ? "完整" : "已入库"}</b>
            </button>
          ))}
        </div>
        <aside className="build-readout">
          <img className="build-readout-crest" src={selectedClass.crest} alt="" />
          <span>{selectedClass.name} · {selected.role}</span>
          <h3>{selected.name}</h3>
          <dl>
            <div><dt>核心</dt><dd>{selected.core}</dd></div>
            <div><dt>体系</dt><dd>{selected.set}</dd></div>
            <div><dt>操作</dt><dd>{selected.difficulty}</dd></div>
          </dl>
          <p>{selected.summary}</p>
          {selected.content && <p><strong>适用：</strong>{selected.content.join(" · ")}</p>}
          <a href={`/builds/${selected.id}?fromClass=${classId}`}>{selected.complete ? "打开完整装备与联动图" : "进入 BD 资料页"}</a>
          {!selected.complete && <small>装备库与技能库已接入；完整词缀和联动图正在按原型标准逐套校对。</small>}
        </aside>
      </div>
    </section>
  );
}

function SeasonStartGuide() {
  return (
    <section className="archive-section season-start" id="season-start">
      <div className="archive-heading">
        <div><span>0 → 70 → 六件套</span><h2>赛季开荒流程</h2></div>
        <p>以单人和 NS 操作为基准；关键节点写清底材类型，避免把材料浪费在错误的黄装或普通盾牌上。</p>
      </div>
      <div className="starter-layout">
        <div className="starter-timeline">
          {SEASON_START_STEPS.map((step, index) => (
            <article key={step.time}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span><small>{step.time}</small><strong>{step.title}</strong><p>{step.detail}</p></span>
            </article>
          ))}
        </div>
        <aside className="starter-ranking">
          <h3>单人开荒推荐</h3>
          <p>按练级速度、首套成型与容错综合排序。</p>
          {STARTER_CLASSES.map((entry) => {
            const hero = CLASS_CATALOG.find((candidate) => candidate.id === entry.classId)!;
            return (
              <article key={entry.classId}>
                <b>{entry.rank}</b><img src={hero.portrait} alt="" />
                <span><strong>{entry.title}</strong><small>{entry.note}</small></span>
              </article>
            );
          })}
          <div className="ns-caution"><strong>NS 提醒</strong><span>主机版主要差异集中在操作方式、本地/离线状态、赛季验证和组队生态；装备倍率、套装机制和大多数 BD 逻辑与 PC 一致。</span></div>
        </aside>
      </div>
    </section>
  );
}

function CampaignRoute() {
  const [selectedAct, setSelectedAct] = useState(0);
  const act = CAMPAIGN_ACTS[selectedAct];
  return (
    <section className="archive-section campaign-route" id="campaign">
      <div className="archive-heading">
        <div><span>剧情模式 · 五幕</span><h2>主线剧情线路图</h2></div>
        <p>选择幕章后查看完整任务顺序、经过区域、路线与通关目标；从新崔斯特姆一直追踪到混沌界要塞。</p>
      </div>
      <div className="act-selector" role="tablist" aria-label="选择剧情幕章">
        {CAMPAIGN_ACTS.map((act, actIndex) => (
          <button key={act.act} className={selectedAct === actIndex ? "active" : ""} style={{ "--act-color": act.color } as CSSProperties} onClick={() => setSelectedAct(actIndex)}>
            <b>{actIndex + 1}</b><span><small>{act.zone}</small><strong>{act.act}</strong></span><em>{act.quests.length} 条主线</em>
          </button>
        ))}
      </div>
      <div className="campaign-act-detail" style={{ "--act-color": act.color } as CSSProperties}>
        <aside>
          <span>{act.zone}</span><h3>{act.act}</h3><p>{act.story}</p>
          <div><small>幕末首领</small><strong>{act.boss}</strong></div>
          <ol>{act.quests.map((quest, index) => <li key={quest.name}><span>{String(index + 1).padStart(2, "0")}</span>{quest.name}</li>)}</ol>
        </aside>
        <div className="quest-route-list">
          {act.quests.map((quest, index) => (
            <article key={quest.name}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <div><span>{quest.area}</span><h4>{quest.name}</h4><p>{quest.route}</p><small><i />通关节点：{quest.objective}</small></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfficialLibrary() {
  const categories = useItemCategories();
  const [classFilter, setClassFilter] = useState("all");
  const [followerFilter, setFollowerFilter] = useState("all");
  const [artisanFilter, setArtisanFilter] = useState("all");
  const visible = categories.filter((category) =>
    (classFilter === "all" || category.classes.includes(classFilter))
    && (followerFilter === "all" || category.followers.includes(followerFilter))
    && (artisanFilter === "all" || category.artisans.includes(artisanFilter))
  );
  const grouped = [
    { id: "armor", name: "防具与副手", eyebrow: "ARMOR & OFF-HANDS" },
    { id: "weapons", name: "武器", eyebrow: "WEAPONS" },
    { id: "other", name: "其他物品", eyebrow: "OTHER ITEMS" },
  ] as const;
  return (
    <section className="archive-section official-library" id="library">
      <div className="archive-heading">
        <div><span>暴雪物品系统 · 本地镜像</span><h2>物品</h2></div>
        <p>55 个官方分类、2353 条物品记录与图标已保存在站内；列表和详情不再跳转暴雪官网。</p>
      </div>
      <div className="item-directory-filters">
        <label><span>按职业筛选</span><select value={classFilter} onChange={(event) => { setClassFilter(event.target.value); setFollowerFilter("all"); setArtisanFilter("all"); }}><option value="all">全部职业</option>{CLASS_CATALOG.map((hero) => <option value={hero.id} key={hero.id}>{hero.name}</option>)}</select></label>
        <label><span>追随者</span><select value={followerFilter} onChange={(event) => { setFollowerFilter(event.target.value); setClassFilter("all"); setArtisanFilter("all"); }}><option value="all">全部追随者</option><option value="enchantress">魔女</option><option value="scoundrel">盗贼</option><option value="templar">圣殿骑士</option></select></label>
        <label><span>工匠制作</span><select value={artisanFilter} onChange={(event) => { setArtisanFilter(event.target.value); setClassFilter("all"); setFollowerFilter("all"); }}><option value="all">全部工匠</option><option value="blacksmith">铁匠</option><option value="jeweler">珠宝匠</option><option value="mystic">秘术师</option></select></label>
        <button onClick={() => { setClassFilter("all"); setFollowerFilter("all"); setArtisanFilter("all"); }}>重置筛选</button>
      </div>
      <div className="item-directory-summary"><strong>{visible.reduce((sum, category) => sum + category.count, 0)}</strong><span>条物品 · {visible.length} 个可用分类</span></div>
      <div className="item-directory-groups">
        {grouped.map((group) => <section key={group.id}><header><span>{group.eyebrow}</span><h3>{group.name}</h3></header><div>{visible.filter((category) => category.group === group.id).map((category) => <a href={`/library/${category.id}`} key={category.id}><span><strong>{category.name}</strong><small>{category.count} 件物品</small></span><b>›</b></a>)}</div></section>)}
      </div>
    </section>
  );
}

function useLibraryRecords(category: string) {
  const [records, setRecords] = useState<OfficialItemRecord[]>([]);
  useEffect(() => {
    let active = true;
    fetch(`/d3/library/items/by-category/${encodeURIComponent(category)}.json`).then((response) => response.json()).then((data) => { if (active) setRecords(data); }).catch(() => undefined);
    return () => { active = false; };
  }, [category]);
  return records;
}

function useItemIndex() {
  const [records, setRecords] = useState<OfficialItemIndexRecord[]>([]);
  useEffect(() => {
    let active = true;
    fetch("/d3/library/items/asset-index.json").then((response) => response.json()).then((data) => { if (active) setRecords(data); }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  return records;
}

function useLibraryRecord(id: string) {
  const [record, setRecord] = useState<OfficialItemRecord | null>(null);
  useEffect(() => {
    let active = true;
    setRecord(null);
    if (!id) return () => { active = false; };
    fetch(`/d3/library/items/detail/${encodeURIComponent(id)}.json`).then((response) => response.json()).then((data) => { if (active) setRecord(data); }).catch(() => undefined);
    return () => { active = false; };
  }, [id]);
  return record;
}

function useItemCategories() {
  const [categories, setCategories] = useState<ItemCategoryRecord[]>([]);
  useEffect(() => {
    let active = true;
    fetch("/d3/library/item-categories.json").then((response) => response.json()).then((data) => { if (active) setCategories(data); }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  return categories;
}

function itemAssetKey(path = "") {
  return path.split("/").pop()?.replace(/\.[^.]+$/, "").toLowerCase() ?? "";
}

const OFFICIAL_ITEM_IDS_BY_GUIDE_ID: Record<string, string> = {
  "tragoul-helm": "tragouls-guise-P6_Necro_Set_2_Helm",
  "tragoul-shoulders": "tragouls-heart-P6_Necro_Set_2_Shoulders",
  "tragoul-chest": "tragouls-scales-P6_Necro_Set_2_Chest",
  "tragoul-gloves": "tragouls-claws-P6_Necro_Set_2_Gloves",
  "tragoul-pants": "tragouls-hide-P6_Necro_Set_2_Pants",
  "tragoul-boots": "tragouls-stalwart-greaves-P6_Necro_Set_2_Boots",
  "aughild-shoulders": "pauldrons::37",
  "aughild-bracers": "bracers::52",
  "guardian-bracers": "bracers::54",
  "guardian-belt": "belt::68",
  dayntee: "dayntees-binding-P61_Unique_Belt_01",
  "haunted-visions": "haunted-visions-P69_Unique_Amulet_02",
  krysbin: "krysbins-sentence-P6_Unique_Ring_03",
  coe: "convention-of-elements-P2_Unique_Ring_04",
  briggs: "briggs-wrath-P6_Unique_Ring_02",
  "funerary-pick": "funerary-pick-P74_Unique_Scythe1H_01",
  "iron-rose": "iron-rose-P74_Unique_Phylactery_04",
  "mantle-channeling": "mantle-of-channeling-P4_Unique_Shoulder_103",
  goldwrap: "goldwrap-Unique_Belt_010_x1",
  warzechian: "warzechian-armguards-Unique_Bracer_101_x1",
};

function findOfficialItem(records: OfficialItemRecord[], gear?: Gear) {
  if (!gear) return undefined;
  const assetKey = itemAssetKey(gear.image);
  return records.find((record) => itemAssetKey(record.image) === assetKey)
    ?? records.find((record) => record.id === OFFICIAL_ITEM_IDS_BY_GUIDE_ID[gear.id])
    ?? records.find((record) => record.id.toLowerCase() === gear.id.toLowerCase());
}

type BuildItemReference = {
  id: string;
  name: string;
  image: string;
  effect: string;
  kind: "装备" | "魔盒威能";
};

type RelatedBuildReference = {
  id: string;
  name: string;
  classId: ClassId;
  usages: string[];
};

function itemReferenceMatchesOfficial(record: OfficialItemRecord, reference: BuildItemReference) {
  const officialAssetKey = itemAssetKey(record.image);
  const referenceAssetKey = itemAssetKey(reference.image);
  return Boolean(officialAssetKey && referenceAssetKey && officialAssetKey === referenceAssetKey)
    || record.id === OFFICIAL_ITEM_IDS_BY_GUIDE_ID[reference.id]
    || record.id.toLowerCase() === reference.id.toLowerCase();
}

function relatedBuildsForOfficialItem(record: OfficialItemRecord): RelatedBuildReference[] {
  return ALL_BUILD_GUIDES.flatMap((guide) => {
    const catalog = BUILD_CATALOG.find((entry) => entry.id === guide.id);
    if (!catalog) return [];
    const references: BuildItemReference[] = [
      ...guide.gear.map((item) => ({ id: item.id, name: item.name, image: item.image, effect: item.effect, kind: "装备" as const })),
      ...guide.powers.map((power) => ({ id: power.id, name: power.name, image: power.image, effect: power.summary, kind: "魔盒威能" as const })),
    ];
    const usages = Array.from(new Set(references
      .filter((reference) => itemReferenceMatchesOfficial(record, reference))
      .map((reference) => reference.kind === "魔盒威能" ? `魔盒威能：${reference.effect}` : reference.effect)));
    if (usages.length === 0) return [];
    return [{
      id: guide.id,
      name: guide.name,
      classId: catalog.classId,
      usages,
    }];
  });
}

function LibraryCategory({ category }: { category: string }) {
  const records = useLibraryRecords(category);
  const categories = useItemCategories();
  const currentCategory = categories.find((entry) => entry.id === category);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "common" | "crafted" | "legendary" | "set">("all");
  const [levelSort, setLevelSort] = useState<"asc" | "desc">("asc");
  const filtered = records.filter((record) => record.category === category).filter((record) => {
    const matchesQuery = `${record.name}${record.type ?? ""}${record.legendaryPower ?? ""}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesType = typeFilter === "all" || (typeFilter === "crafted" ? record.crafted : record.quality === typeFilter);
    return matchesQuery && matchesType;
  }).sort((a, b) => {
    const first = a.requiredLevel ?? -1;
    const second = b.requiredLevel ?? -1;
    return levelSort === "asc" ? first - second : second - first;
  });

  return (
    <section className="archive-section library-category-page">
      <div className="archive-heading"><div><span>{currentCategory?.group === "weapons" ? "WEAPONS" : currentCategory?.group === "other" ? "OTHER ITEMS" : "ARMOR & OFF-HANDS"}</span><h2>{currentCategory?.name ?? category}</h2></div><p>当前显示 {filtered.length} 件；物品详情与原特效均来自本地官方镜像。</p></div>
      <div className="item-quality-tabs" role="tablist">{([['all', '全部'], ['common', '普通'], ['crafted', '制作'], ['legendary', '传奇'], ['set', '套装']] as const).map(([value, label]) => <button key={value} className={typeFilter === value ? "active" : ""} onClick={() => setTypeFilter(value)}>{label}</button>)}</div>
      <div className="library-category-toolbar">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索物品名称、类型或特效" />
        <button onClick={() => setLevelSort((current) => current === "asc" ? "desc" : "asc")}>需要等级 {levelSort === "asc" ? "↑" : "↓"}</button>
        <a href="/library">返回物品目录</a>
      </div>
      <div className="item-list-table"><header><span>物品详情</span><b>需要等级</b></header><div className="library-record-grid">
        {filtered.map((record) => (
          <a className={`item-record item-icon-shape-${officialItemIconShape(record.category)}`} key={record.id} href={`/library/${category}/${encodeURIComponent(record.id)}`}>
            <BlizzardItemIcon record={record} /><span><strong>{record.name}</strong><small>{record.type ?? record.categoryName ?? record.quality}</small>{record.legendaryPower && <em>{record.legendaryPower}</em>}</span><b>{record.requiredLevel ?? "—"}</b>
          </a>
        ))}
        {filtered.length === 0 && <p className="library-empty">资料加载中，或当前分类没有匹配结果。</p>}
      </div></div>
    </section>
  );
}

function LibraryRecordDetail({ category, id }: { category: string; id: string }) {
  const index = useItemIndex();
  const record = useLibraryRecord(id);
  const relatedBuilds = useMemo(() => record ? relatedBuildsForOfficialItem(record) : [], [record]);
  if (!record) return <section className="archive-section library-detail-page"><p className="library-empty">正在载入资料详情…</p></section>;
  return (
    <section className="archive-section library-detail-page">
      <a className="detail-back" href={`/library/${category}`}>← 返回列表</a>
      <div className={`library-detail-card quality-${record.quality}`}>
        <div className="library-detail-art"><BlizzardItemIcon record={record} size="lg" /></div>
        <article>
          <span>{record.categoryName ?? record.type ?? record.category}</span><h2>{record.name}</h2>
          <dl>
            <div><dt>物品类型</dt><dd>{record.type ?? record.categoryName ?? record.category}</dd></div>
            <div><dt>品质</dt><dd>{record.quality === "set" ? "套装" : record.quality === "legendary" ? "传奇" : record.crafted ? "工匠制作" : "普通"}</dd></div>
            <div><dt>需要等级</dt><dd>{record.requiredLevel ?? "—"}</dd></div>
            {record.className && <div><dt>所属职业</dt><dd>{record.className}</dd></div>}
            {record.craftedBy && <div><dt>制作工匠</dt><dd>{record.craftedBy}</dd></div>}
            {record.armorWeapon && <div><dt>基础数值</dt><dd>{record.armorWeapon}</dd></div>}
          </dl>
          <OfficialPropertySections record={record} />
          {!record.properties && record.legendaryPower && <section className="item-detail-effect"><p>{record.legendaryPower}</p></section>}
          {record.set && <OfficialSetBlock itemSet={record.set} records={index as OfficialItemRecord[]} />}
          {record.extras && record.extras.length > 0 && <section className="item-detail-extras">{record.extras.map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}</section>}
          {record.flavor && <blockquote>{record.flavor}</blockquote>}
          {relatedBuilds.length > 0 && (
            <section className="item-build-links" aria-label="使用该物品的 BD">
              <h3>相关 BD</h3>
              <div className="item-build-grid">
                {relatedBuilds.map((build) => (
                  <a key={build.id} className="item-build-card" href={`/builds/${build.id}?fromClass=${build.classId}`}>
                    <strong>{build.name}</strong>
                    {build.usages.map((usage) => <p key={usage}>{usage}</p>)}
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </section>
  );
}

type UnifiedBuildGuide = NecromancerGuide & {
  resolveGear?: (mode: Mode, paragon: Paragon) => Gear[];
  resolvePowers?: (mode: Mode, paragon: Paragon) => CubePower[];
  resolveRows?: (mode: Mode) => FlowRow[];
  resolveRotation?: (mode: Mode) => NecromancerGuide["rotation"];
  originalEffects?: Record<string, string>;
};

const ALL_BUILD_GUIDES: UnifiedBuildGuide[] = [
  ...Object.values(NECROMANCER_BUILDS),
  ...Object.values(BARBARIAN_BUILDS),
  ...Object.values(CRUSADER_BUILDS),
  ...Object.values(DEMON_HUNTER_BUILDS),
  ...Object.values(MONK_BUILDS),
  ...Object.values(WITCH_DOCTOR_BUILDS),
  ...Object.values(WIZARD_BUILDS),
] as UnifiedBuildGuide[];

const PAPERDOLL_SLOT_ORDER = [
  ["head", "头部"], ["shoulders", "肩部"], ["chest", "胸部"], ["gloves", "手部"],
  ["bracers", "腕部"], ["belt", "腰部"], ["pants", "腿部"], ["boots", "脚部"],
  ["amulet", "颈部"], ["ring1", "手指"], ["ring2", "手指"], ["weapon", "主手"], ["offhand", "副手"],
] as const;

function arrangeGuideGear(gear: Gear[]) {
  const used = new Set<string>();
  return PAPERDOLL_SLOT_ORDER.flatMap(([position, slot]) => {
    const item = gear.find((candidate) => candidate.slot === slot && !used.has(candidate.id));
    if (!item) return [];
    used.add(item.id);
    return [{ position, gear: item }];
  });
}

const CLASS_MAIN_ATTRIBUTE: Record<ClassId, "力量" | "敏捷" | "智力"> = {
  barbarian: "力量",
  crusader: "力量",
  "demon-hunter": "敏捷",
  monk: "敏捷",
  necromancer: "智力",
  "witch-doctor": "智力",
  wizard: "智力",
};

const CLASS_ARMOR_GEM: Record<ClassId, { image: string; label: string }> = {
  barbarian: { image: "/d3/flawless-royal-ruby.png", label: "无瑕皇家红宝石：力量" },
  crusader: { image: "/d3/flawless-royal-ruby.png", label: "无瑕皇家红宝石：力量" },
  "demon-hunter": { image: "/d3/flawless-royal-emerald.png", label: "无瑕皇家绿宝石：敏捷" },
  monk: { image: "/d3/flawless-royal-emerald.png", label: "无瑕皇家绿宝石：敏捷" },
  necromancer: { image: "/d3/flawless-royal-topaz.png", label: "无瑕皇家黄宝石：智力" },
  "witch-doctor": { image: "/d3/flawless-royal-topaz.png", label: "无瑕皇家黄宝石：智力" },
  wizard: { image: "/d3/flawless-royal-topaz.png", label: "无瑕皇家黄宝石：智力" },
};

const POWERFUL_GEM = {
  name: "强者之灾",
  image: "/d3/library/items/bane-of-the-powerful-unique_gem_001_x1.png",
};

const HOARDER_GEM = {
  name: "囤宝者的恩惠",
  image: "/d3/library/items/boon-of-the-hoarder-unique_gem_014_x1.png",
};

const CONFIGURATION_LEGENDARY_GEMS: Record<string, { name: string; image: string }> = {
  "bane-of-the-trapped": { name: "困者之灾", image: "/d3/library/items/bane-of-the-trapped-unique_gem_002_x1.png" },
  "bane-of-the-stricken": { name: "受罚者之灾", image: "/d3/library/items/bane-of-the-stricken-unique_gem_018_x1.png" },
  "bane-of-the-powerful": POWERFUL_GEM,
  taeguk: { name: "太极石", image: "/d3/library/items/taeguk-unique_gem_015_x1.png" },
  lod: { name: "梦之遗礼", image: "/d3/library/items/legacy-of-dreams-unique_gem_023_x1.png" },
  "boon-of-the-hoarder": HOARDER_GEM,
  simplicity: { name: "至简之力", image: "/d3/library/items/simplicitys-strength-unique_gem_013_x1.png" },
  gogok: { name: "迅捷勾玉", image: "/d3/library/items/gogok-of-swiftness-unique_gem_008_x1.png" },
  "wreath-of-lightning": { name: "闪电华冠", image: "/d3/library/items/wreath-of-lightning-unique_gem_004_x1.png" },
  zei: { name: "贼神的复仇之石", image: "/d3/library/items/zeis-stone-of-vengeance-unique_gem_012_x1.png" },
};

const CONFIGURATION_NORMAL_GEMS: Record<string, { image: string; label: string }> = {
  "flawless-royal-ruby": { image: "/d3/flawless-royal-ruby.png", label: "无瑕皇家红宝石：力量" },
  "flawless-royal-diamond": { image: "/d3/library/items/gem-190.png", label: "无瑕皇家白宝石：冷却/全抗" },
  "flawless-royal-emerald": { image: "/d3/flawless-royal-emerald.png", label: "无瑕皇家绿宝石：暴击伤害" },
  "flawless-royal-topaz": { image: "/d3/flawless-royal-topaz.png", label: "无瑕皇家黄宝石：智力" },
  "flawless-royal-amethyst": { image: "/d3/flawless-royal-amethyst.png", label: "无瑕皇家紫宝石：生命%" },
};

const DEFAULT_VARIANT_POWERS: Record<"push-low" | "speed-low" | "speed-high", CubePower> = {
  "push-low": {
    id: "variant-unity",
    slot: "第4槽",
    name: "团结",
    image: "/d3/library/items/unity-unique_ring_010_x1.png",
    original: "你和佩戴团结的盟友分摊承受的伤害。",
    summary: "低巅峰冲层时，与不死随从的团结组成稳定减伤。",
  },
  "speed-low": {
    id: "variant-goldwrap",
    slot: "第4槽",
    name: "金织带",
    image: "/d3/library/items/goldwrap-unique_belt_010_x1.png",
    original: "拾取金币后，护甲值在5秒内提高等同于金币数量的数值。",
    summary: "低巅峰速刷依靠金币建立高护甲，替代大秘境防御威能。",
  },
  "speed-high": {
    id: "variant-ingeom",
    slot: "第4槽",
    name: "寅剑",
    image: "/d3/library/items/ingeom-unique_sword_1h_113_x1.png",
    original: "击杀精英后，技能冷却时间在15秒内缩短8–10秒。",
    summary: "高巅峰速刷把多余坚韧换成冷却和连续位移。",
  },
};

function normalizeGuideAffixes(item: Gear, classId: ClassId, mode: Mode, paragon: Paragon) {
  const mainAttribute = CLASS_MAIN_ATTRIBUTE[classId];
  const base = item.affixes.map((affix) => affix.replaceAll("主属性", mainAttribute));
  const skillDamage = base.find((affix) => affix.includes("伤害") && affix !== "暴击伤害");
  const unique = (values: string[]) => [...new Set(values)].slice(0, Math.max(4, base.length));

  if (item.slot === "肩部") {
    return paragon === "low"
      ? unique([skillDamage ?? mainAttribute, mainAttribute, "体能", "冷却缩减", ...base])
      : unique([skillDamage ?? "范围伤害", "范围伤害", "冷却缩减", mainAttribute, ...base]);
  }
  if (item.slot === "手部") {
    return paragon === "low"
      ? unique(["暴击几率", "暴击伤害", mainAttribute, "体能", ...base])
      : unique(["暴击几率", "暴击伤害", "范围伤害", "冷却缩减", ...base]);
  }
  if (item.slot === "主手") {
    return paragon === "low"
      ? unique(["高白字", "伤害%", mainAttribute, "冷却缩减", ...base])
      : unique(["高白字", "伤害%", "范围伤害", "冷却缩减", ...base]);
  }
  if (mode === "speed" && item.slot === "脚部") {
    return unique(["移动速度", skillDamage ?? mainAttribute, mainAttribute, "体能", ...base]);
  }
  return base;
}

function resolveBuildVariantProfile(guide: UnifiedBuildGuide, mode: Mode, paragon: Paragon) {
  const profile = guide.variantProfiles?.[`${mode}-${paragon}`];
  return guide.variantCompleteness === "complete" ? profile : undefined;
}

function resolveDefaultVariantGear(guide: UnifiedBuildGuide, classId: ClassId, mode: Mode, paragon: Paragon, profile?: BuildVariantProfile): Gear[] {
  const gear = guide.gear.map((item) => ({
    ...item,
    affixes: normalizeGuideAffixes(item as Gear, classId, mode, paragon),
  })) as Gear[];
  if (!profile?.gearOverrides.movementBoots) return gear;
  const gemOverride = profile?.gearOverrides.legendaryGem;
  const speedGem = gemOverride === "boon-of-the-hoarder" || (!profile && paragon === "low") ? HOARDER_GEM : POWERFUL_GEM;

  const stricken = gear.find((item) => item.gem?.name === "受罚者之灾");
  if (stricken) return gear.map((item) => item.id === stricken.id ? { ...item, gem: speedGem } : item);

  const fallback = [...gear].reverse().find((item) => item.gem && item.gem.name !== "梦之遗礼");
  return fallback ? gear.map((item) => item.id === fallback.id ? { ...item, gem: speedGem } : item) : gear;
}

function resolveDefaultVariantPowers(guide: UnifiedBuildGuide, mode: Mode, paragon: Paragon, profile?: BuildVariantProfile): CubePower[] {
  const selectedPowerIds = guide.powerSets?.[mode];
  const powers = guide.powers.filter((power) => !selectedPowerIds || selectedPowerIds.includes(power.id)).map((power) => ({
    id: power.id,
    slot: power.slot,
    name: power.name,
    image: power.image,
    original: power.effect,
    summary: power.logic,
  }));
  if (selectedPowerIds) return powers;
  const replacementKey = profile?.powerOverrides.replaceLastWith;
  if (replacementKey === "none" || !replacementKey) return powers;
  const key = replacementKey === "unity" ? "push-low" : replacementKey === "goldwrap" ? "speed-low" : replacementKey === "ingeom" ? "speed-high" : `${mode}-${paragon}` as keyof typeof DEFAULT_VARIANT_POWERS;
  const replacement = DEFAULT_VARIANT_POWERS[key];
  if (!replacement) return powers;
  return [...powers.slice(0, Math.max(0, powers.length - 1)), replacement];
}

function guideSockets(gear: Gear, classId: ClassId, normalGems?: BuildConfiguration["normalGems"]) {
  if (gear.gem) return [{ image: gear.gem.image, label: gear.gem.name }];
  if (SOCKETS[gear.id]) return SOCKETS[gear.id];
  const configuredIds = gear.slot === "头部" ? normalGems?.head?.slice(0, 1)
    : gear.slot === "胸部" ? normalGems?.armor?.slice(0, 3)
      : gear.slot === "腿部" ? normalGems?.armor?.slice(0, 2)
        : gear.slot === "主手" || gear.slot === "副手" ? normalGems?.weapon?.slice(0, 1)
          : undefined;
  const configured = configuredIds?.flatMap((id) => CONFIGURATION_NORMAL_GEMS[id] ? [CONFIGURATION_NORMAL_GEMS[id]] : []);
  if (configured?.length) return configured;
  if (gear.slot === "头部") return [{ image: "/d3/flawless-royal-amethyst.png", label: "无瑕皇家紫宝石：生命%" }];
  if (gear.slot === "胸部") return Array.from({ length: 3 }, () => CLASS_ARMOR_GEM[classId]);
  if (gear.slot === "腿部") return Array.from({ length: 2 }, () => CLASS_ARMOR_GEM[classId]);
  if (gear.slot === "主手") return [{ image: "/d3/flawless-royal-emerald.png", label: "无瑕皇家绿宝石：暴击伤害" }];
  return [];
}

type EquipmentStatKey = "main" | "crit-chance" | "crit-damage" | "cooldown" | "area";

type EquipmentStatRow = {
  key: EquipmentStatKey;
  label: string;
  summary: string;
  targets: Map<string, string>;
};

const EQUIPMENT_STAT_MAX: Record<Exclude<EquipmentStatKey, "main">, Partial<Record<Gear["slot"], string>>> = {
  "crit-chance": {
    "头部": "最高 +6%",
    "手部": "最高 +10%",
    "腕部": "最高 +6%",
    "颈部": "最高 +10%",
    "手指": "最高 +6%",
    "副手": "最高 +10%",
  },
  "crit-damage": {
    "手部": "最高 +50%",
    "颈部": "最高 +100%",
    "手指": "最高 +50%",
  },
  cooldown: {
    "肩部": "最高 +8%",
    "手部": "最高 +8%",
    "颈部": "最高 +8%",
    "手指": "最高 +8%",
    "主手": "最高 +10%",
    "副手": "最高 +8%",
  },
  area: {
    "肩部": "最高 +20%",
    "手部": "最高 +20%",
    "手指": "最高 +20%",
    "主手": "最高 +24%",
    "副手": "最高 +20%",
  },
};

function equipmentStatRows(
  positions: { position: string; gear: Gear }[],
  classId: ClassId,
  paragon: Paragon,
): EquipmentStatRow[] {
  const mainAttribute = CLASS_MAIN_ATTRIBUTE[classId];
  const mainAttributeMaximum: Partial<Record<Gear["slot"], string>> = {
    "头部": "远古最高 +650",
    "肩部": "远古最高 +650",
    "胸部": "远古最高 +650",
    "手部": "远古最高 +1000",
    "腕部": "远古最高 +650",
    "腰部": "远古最高 +650",
    "腿部": "远古最高 +650",
    "脚部": "远古最高 +650",
    "颈部": "远古最高 +1000",
    "手指": "远古最高 +650",
    "主手": "远古最高 +1000",
    "副手": "远古最高 +1000",
  };
  const targetsFor = (key: EquipmentStatKey) => new Map(
    positions.flatMap(({ gear }) => {
      if (key === "main") {
        const maximum = mainAttributeMaximum[gear.slot];
        return maximum ? [[gear.id, maximum] as const] : [];
      }
      const maximum = EQUIPMENT_STAT_MAX[key][gear.slot];
      return maximum ? [[gear.id, maximum] as const] : [];
    }),
  );
  return [
    { key: "main", label: mainAttribute, summary: paragon === "low" ? "低巅峰优先保留" : "高巅峰可在进攻位洗掉", targets: targetsFor("main") },
    { key: "crit-chance", label: "暴击几率", summary: "按部位上限反查", targets: targetsFor("crit-chance") },
    { key: "crit-damage", label: "暴击伤害", summary: "手套、首饰可出", targets: targetsFor("crit-damage") },
    { key: "cooldown", label: "冷却缩减", summary: "按技能循环补足", targets: targetsFor("cooldown") },
    { key: "area", label: "范围伤害", summary: paragon === "high" ? "高巅峰重点补足" : "成型后再补", targets: targetsFor("area") },
  ];
}

function guideRows(guide: UnifiedBuildGuide, mode: Mode): FlowRow[] {
  return (guide.resolveRows?.(mode) ?? guide.links.map((link, rowIndex) => ({
    id: `${guide.id}-link-${rowIndex}`,
    category: link.category === "defense" ? "defense" : link.category === "movement" ? "movement" : "damage",
    title: link.title,
    nodes: [
      ...link.steps.map((step) => {
        const gear = guide.gear.find((item) => item.id === step.id);
        const skill = guide.skills.find((item) => item.id === step.id);
        const passive = guide.passives.find((item) => item.id === step.id);
        const power = guide.powers.find((item) => item.id === step.id);
        return {
          id: step.id,
          label: step.label,
          detail: step.detail,
          kind: gear ? "gear" : skill ? "skill" : passive ? "passive" : power ? "power" : "effect",
          image: gear?.image ?? skill?.image ?? passive?.image ?? power?.image,
        } as FlowNode;
      }),
      {
        id: `${guide.id}-result-${rowIndex}`,
        label: link.category === "defense" ? "减伤结果" : link.category === "movement" ? "速刷结果" : "增伤结果",
        detail: link.conclusion,
        kind: link.category === "defense" ? "defense" : link.category === "movement" ? "movement" : "damage",
      },
    ],
  })));
}

type SetFamily = { id: string; name: string; gear: Gear[]; royalEligible: boolean };

const SET_FAMILY_PATTERNS: { pattern: RegExp; name: string; royalEligible: boolean }[] = [
  { pattern: /\braiment-|god-raiment/i, name: "千飓战甲", royalEligible: true },
  { pattern: /\binna-|god-inna/i, name: "尹娜的真言", royalEligible: true },
  { pattern: /aughild/i, name: "奥吉德的权威", royalEligible: true },
  { pattern: /crimson|captain/i, name: "克里森船长的饰衣", royalEligible: true },
  { pattern: /guardian/i, name: "守护者的危难", royalEligible: true },
  { pattern: /focus|restraint/i, name: "意志壁垒", royalEligible: false },
  { pattern: /traveler|compass/i, name: "无尽之途", royalEligible: false },
  { pattern: /shenlong/i, name: "神龙之魂", royalEligible: false },
  { pattern: /chantodo/i, name: "迦陀朵的决心", royalEligible: false },
  { pattern: /danetta/i, name: "丹妮妲的憎恶", royalEligible: false },
  { pattern: /bulkathos|bul-kathos/i, name: "布尔凯索的誓言", royalEligible: false },
  { pattern: /jesseth/i, name: "杰瑟斯的武装", royalEligible: false },
  { pattern: /norvald/i, name: "诺瓦德的热忱", royalEligible: false },
  { pattern: /little-rogue|slanderer|istvan/i, name: "伊斯特凡的对剑", royalEligible: false },
];

function buildSetFamilies(guide: UnifiedBuildGuide, gear: Gear[]): SetFamily[] {
  const groups = new Map<string, SetFamily>();
  gear.filter((item) => item.quality === "set").forEach((item) => {
    const known = SET_FAMILY_PATTERNS.find(({ pattern }) => pattern.test(`${item.id} ${item.name}`));
    const name = known?.name ?? guide.set;
    const id = `set:${name}`;
    const family = groups.get(id) ?? { id, name, gear: [], royalEligible: known?.royalEligible ?? true };
    family.gear.push(item);
    groups.set(id, family);
  });
  return [...groups.values()].filter((family) => family.gear.length >= 2);
}

function buildAutomaticSetRows(families: SetFamily[], powers: CubePower[]): FlowRow[] {
  const rows: FlowRow[] = families.map((family) => ({
    id: `link-${family.id}`,
    category: "set",
    title: `${family.name} · 套装部件联动`,
    nodes: [
      { id: family.id, label: family.name, detail: `${family.gear.length} 件当前装备共同组成套装效果。`, kind: "set" },
      ...family.gear.map((item) => ({ id: item.id, label: item.name, detail: `${item.slot}套装部件`, kind: "gear" as const, image: item.image })),
    ],
  }));
  const royal = powers.find((power) => /royal-grandeur/i.test(power.id) || power.name.includes("皇家华戒"));
  const eligible = families.filter((family) => family.royalEligible);
  if (royal && eligible.length > 0) {
    rows.push({
      id: "link-royal-grandeur-sets",
      category: "royal",
      title: "皇家华戒 · 套装件数联动",
      nodes: [
        { id: royal.id, label: royal.name, detail: "套装至少需要3件时，使触发套装奖励所需件数减少1件。", kind: "power", image: royal.image },
        ...eligible.map((family) => ({ id: family.id, label: family.name, detail: "由皇家华戒减少1件需求。", kind: "set" as const })),
        { id: "royal-set-result", label: "多套装同时生效", detail: "用更少穿戴部件组合主套装与辅助套装。", kind: "effect" },
      ],
    });
  }
  return rows;
}

const TRAGOUL_PUSH_ROTATION: NecromancerGuide["rotation"] = [
  { title: "叠生命", action: "进图开启脆弱光环，利用治疗把塔格奥4件生命加成叠至300%。", reason: "分身继承召唤时的生命状态，所以必须先叠满。" },
  { title: "召分身", action: "生命叠满后开启血魂双分；死亡前不需要再次施放。", reason: "鬼灵面容让分身永久存在，并复制死亡新星。" },
  { title: "叠骨甲", action: "贴近10只敌人使用骨甲，确保减伤并保持轮回镰刀生效。", reason: "轮回镰刀放大次要技能，但会持续消耗骨甲时长。" },
  { title: "造爆发窗", action: "持续虹吸聚怪；全能法戒转到物理时，用白骨脱臼眩晕。", reason: "眩晕把克里斯宾从减速档推到强控制三倍档。" },
  { title: "虹吸到底", action: "面向精英或怪堆持续鲜血虹吸，让铁玫瑰与分身不断释放新星。", reason: "葬镰、铁玫瑰、血潮利刃和塔格奥六件同时放大这一步。" },
];

const TRAGOUL_SPEED_ROTATION: NecromancerGuide["rotation"] = [
  { title: "开局预热", action: "先叠满塔格奥4件生命，再召唤永久血魂双分。", reason: "否则后续新星与坚韧都会明显偏低。" },
  { title: "鲜血穿行", action: "连续位移寻找密集怪群，不为零散小怪停下。", reason: "血潮利刃需要25码内有足够敌人。" },
  { title: "自动聚怪", action: "脆弱光环经过怪群时，布里格斯会把敌人拖到身边。", reason: "聚得越紧，免费鲜血新星收益越高。" },
  { title: "短按虹吸", action: "面对怪堆短暂引导鲜血虹吸，看到新星触发后立刻赶路。", reason: "速刷不等待元素周期，时间比单次伤害更重要。" },
  { title: "吃金币链", action: "拾取金币维持金织带护甲，打碎物件触发沃兹克移速。", reason: "这条链只适用于T16；大秘境不掉金币。" },
];

const TRAGOUL_SOURCES = {
  overview: "https://www.icy-veins.com/d3/necromancer-death-nova-build-with-trag-oul",
  skills: "https://www.icy-veins.com/d3/trag-oul-death-nova-necromancer-skills-and-runes",
  gear: "https://www.icy-veins.com/d3/trag-oul-death-nova-necromancer-bis-gear-gems-paragon-points",
  speed: "https://www.icy-veins.com/d3/trag-oul-death-nova-necromancer-nephalem-rift-speed-farming-build",
};

const TRAGOUL_CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "tragoul-helm", shoulders: "mantle-channeling", chest: "tragoul-chest", gloves: "tragoul-gloves",
    bracers: "guardian-bracers", belt: "guardian-belt", pants: "tragoul-pants", boots: "tragoul-boots",
    amulet: "haunted-visions", ring1: "krysbin", ring2: "coe", weapon: "funerary-pick", offhand: "iron-rose",
  },
  skills: SKILLS.map((skill) => ({ id: skill.id, rune: skill.rune })),
  passives: PASSIVES.map((passive) => passive.id),
  powers: { weapon: "bloodtide-blade", armor: "dayntee", jewelry: "royal-grandeur", season: "scythe-cycle" },
  legendaryGems: { control: "bane-of-the-trapped", damage: "zei", boss: "bane-of-the-stricken" },
  normalGems: { head: ["flawless-royal-amethyst"], armor: Array(5).fill("flawless-royal-topaz"), weapon: ["flawless-royal-emerald"] },
  follower: {
    id: "enchantress",
    items: FOLLOWERS.enchantress.items.map((item) => item.name),
    skills: FOLLOWER_SKILLS.enchantress.map((skill) => skill.name),
  },
  statPriorities: {
    global: ["死亡新星技能伤", "物理元素伤", "暴击几率/暴击伤害", "范围伤害", "攻击速度达到1.67档位"],
    survival: ["生命值80万–90万", "护甲", "全元素抗性", "每秒生命恢复"],
  },
  rotation: TRAGOUL_PUSH_ROTATION,
};

const TRAGOUL_SCENARIOS: BuildScenario[] = [
  {
    id: "push-low", label: "低巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "low", applicability: "supported",
    reason: "守护者翻倍装备智力与体能，先补足低巅峰最缺的伤害和坚韧。", sourceRefs: [TRAGOUL_SOURCES.overview, TRAGOUL_SOURCES.gear], reviewedAt: "2026-08-14",
  },
  {
    id: "push-high", label: "高巅峰大秘境冲层", content: "greater-rift-push", paragonBand: "high", applicability: "supported",
    reason: "主属性由巅峰承担后，切换奥吉德与导能披肩萃取，提高精英战和范围伤害上限。",
    patch: {
      gear: { shoulders: "aughild-shoulders", bracers: "aughild-bracers", belt: "dayntee" },
      powers: { armor: "mantle-channeling" },
      statPriorities: { survival: ["生命值80万–90万", "护甲", "全元素抗性"], endgame: ["范围伤害≥120%", "攻击速度达到1.67档位", "移除装备上的多余智力"] },
    },
    sourceRefs: [TRAGOUL_SOURCES.overview, TRAGOUL_SOURCES.gear], reviewedAt: "2026-08-14",
  },
  {
    id: "speed-low", label: "低巅峰T16小秘境", content: "nephalem-rift", paragonBand: "low", applicability: "supported",
    reason: "保留守护者过渡，用布里格斯聚怪、斯图亚特提速和囤宝者金币链缩短单图时间。",
    patch: {
      gear: { ring2: "briggs" }, powers: { armor: "steuarts-greaves" },
      legendaryGems: { boss: "boon-of-the-hoarder" }, rotation: TRAGOUL_SPEED_ROTATION,
    },
    sourceRefs: [TRAGOUL_SOURCES.speed, TRAGOUL_SOURCES.gear], reviewedAt: "2026-08-14",
  },
  {
    id: "speed-high", label: "高巅峰T16小秘境", content: "nephalem-rift", paragonBand: "high", applicability: "supported",
    reason: "脱离守护者后穿回塔格奥肩，换金织带与沃兹克，并用贪婪之戒扩大金币拾取链。",
    patch: {
      gear: { shoulders: "tragoul-shoulders", bracers: "warzechian", belt: "goldwrap", ring2: "briggs" },
      powers: { armor: "steuarts-greaves", jewelry: "avarice-band" },
      legendaryGems: { boss: "boon-of-the-hoarder" }, rotation: TRAGOUL_SPEED_ROTATION,
      statPriorities: { survival: ["金币链启动前避免硬站", "护甲由金织带接管"], speed: ["移动速度25%上限", "拾取范围", "攻击速度达到1.67档位"] },
    },
    sourceRefs: [TRAGOUL_SOURCES.speed, TRAGOUL_SOURCES.gear], reviewedAt: "2026-08-14",
  },
];

const TRAGOUL_PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "先补到上限，不把超过上限的点浪费在这里。" },
      { stat: "智力", target: "其余点数", reason: "同时提高伤害和全抗，是低巅峰最稳定的收益。" },
      { stat: "体能", target: "按需补到80万–90万生命", reason: "冲层站不住时先达到生命池检查点。" },
      { stat: "最大精魂", target: "0点", reason: "铁玫瑰免费触发新星，这套不依赖精魂上限。" },
    ],
    offense: [
      { stat: "攻击速度", target: "优先点满", reason: "提高鲜血虹吸与铁玫瑰触发频率。" },
      { stat: "暴击伤害", target: "随后点满", reason: "与装备暴击几率共同放大新星。" },
      { stat: "暴击几率", target: "第三点满", reason: "保持暴击乘区稳定。" },
      { stat: "冷却缩减", target: "最后点满", reason: "主要服务骨甲与位移，优先级低于前三项。" },
    ],
    defense: [
      { stat: "护甲", target: "优先点满", reason: "智力职业天然全抗高，更缺护甲。" },
      { stat: "生命%", target: "随后点满", reason: "放大塔格奥生命池。" },
      { stat: "全元素抗性", target: "第三点满", reason: "补齐元素坚韧。" },
      { stat: "每秒生命恢复", target: "最后点满", reason: "作为持续引导时的恢复补充。" },
    ],
    utility: [
      { stat: "范围伤害", target: "优先点满", reason: "分身新星可以触发，是高密度怪群的重要乘区。" },
      { stat: "击中恢复生命", target: "随后点满", reason: "提高持续引导时的恢复稳定性。" },
      { stat: "能量消耗降低", target: "第三点满", reason: "收益有限，但仍高于拾取范围。" },
      { stat: "金币拾取范围", target: "最后点满", reason: "主要服务T16速刷。" },
    ],
  },
  post800: [
    { priority: "先补体能", when: "生命低于80万或推进层数时频繁猝死", reason: "把生命池补到80万–90万后再观察。" },
    { priority: "其余全部智力", when: "生命与减伤已经稳定", reason: "智力继续同时提高伤害与全抗。" },
    { priority: "换奥吉德", when: "约2000巅峰且不再依赖守护者坚韧", reason: "高巅峰让装备主属性翻倍的边际收益下降。" },
  ],
  checkpoints: [
    { label: "生命池", target: "80万–90万", action: "不足时先从巅峰智力挪到体能。" },
    { label: "攻击速度", target: "角色面板1.67", action: "未达档位时优先保留手套和首饰攻速。" },
    { label: "范围伤害", target: "冲层≥120%", action: "高巅峰从肩、手、戒指、武器和副手补足。" },
  ],
};

const TRAGOUL_CHOICES: BuildChoicePolicy[] = [
  { key: "core-engine", targetType: "gear", targetId: "haunted-visions,funerary-pick,iron-rose", label: "鬼灵面容 + 葬镰 + 铁玫瑰", status: "locked", reason: "永久双分、虹吸增伤与免费新星共同组成发动机，缺任意一件都不是完整形态。" },
  { key: "tragoul-six", targetType: "gear", targetId: "tragoul-six", label: "塔格奥六件效果", status: "locked", reason: "鲜血新星必须获得六件套的生命消耗技能倍率。" },
  { key: "core-skills", targetType: "skill", targetId: "siphon-blood,death-nova,simulacrum", label: "虹吸、新星与双分", status: "locked", reason: "三者分别负责触发、伤害与复制，不能替换。" },
  { key: "season-power", targetType: "power", targetId: "scythe-cycle", label: "轮回镰刀", status: "locked", reason: "赛季第四槽的核心次要技能乘区，必须保持骨甲生效。" },
  { key: "shoulder-package", targetType: "gear", targetId: "shoulders", label: "肩腕腰套装包", status: "conditional", reason: "巅峰水平决定守护者主属性是否仍比奥吉德精英乘区更值。", alternatives: [
    { id: "guardian-package", label: "导能披肩 + 守护者腕腰", when: "低巅峰或生命/坚韧未达标", gain: "翻倍装备智力和体能", cost: "放弃奥吉德精英增伤减伤", scenarios: ["push-low", "speed-low"] },
    { id: "aughild-package", label: "奥吉德肩腕 + 戴恩提", when: "约2000巅峰后进行大秘境冲层", gain: "精英增伤与精英减伤", cost: "失去守护者主属性翻倍", scenarios: ["push-high"] },
    { id: "gold-package", label: "塔格奥肩 + 沃兹克 + 金织带", when: "高巅峰单人T16且地图会掉金币", gain: "持续移速和金币护甲", cost: "离开小秘境后防御链失效", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-high"] },
  ] },
  { key: "second-ring", targetType: "gear", targetId: "ring2", label: "第二枚戒指", status: "conditional", reason: "冲层需要元素爆发窗，小秘境更需要自动聚怪。", alternatives: [
    { id: "coe", label: "全能法戒", when: "大秘境冲层", gain: "物理周期爆发", cost: "需要等待元素窗口", scenarios: ["push-low", "push-high"] },
    { id: "briggs", label: "布里格斯之怒", when: "T16小秘境速刷", gain: "诅咒时自动聚怪", cost: "失去元素周期乘区", scenarios: ["speed-low", "speed-high"] },
  ] },
  { key: "speed-gem", targetType: "legendary-gem", targetId: "boss", label: "第三颗传奇宝石", status: "conditional", reason: "首领战与金币速刷需要完全不同的收益。", alternatives: [
    { id: "bane-of-the-stricken", label: "受罚者之灾", when: "大秘境冲层", gain: "持续叠加首领伤害", cost: "清图阶段收益较慢", scenarios: ["push-low", "push-high"] },
    { id: "boon-of-the-hoarder", label: "囤宝者的恩惠", when: "T16小秘境", gain: "金币、移速与金织带护甲", cost: "大秘境完全不掉金币", incompatibleWith: ["greater-rift-push"], scenarios: ["speed-low", "speed-high"] },
  ] },
  { key: "follower", targetType: "follower", targetId: "enchantress", label: "随从选择", status: "flexible", reason: "成型首选魔女的攻速与冷却；开荒站不住时可暂用圣殿骑士治疗，但会损失输出循环收益。" },
];

function tragoulConfiguration(mode: Mode, paragon: Paragon) {
  const scenario = TRAGOUL_SCENARIOS.find((candidate) => candidate.id === `${mode}-${paragon}`);
  return resolveBuildConfiguration(TRAGOUL_CONFIGURATION_BASE, scenario?.patch);
}

const TRAGOUL_GUIDE: UnifiedBuildGuide = {
  id: "tragoul-nova",
  name: "塔格奥 · 死亡新星",
  set: "塔格奥的化身",
  core: "鲜血虹吸 → 铁玫瑰 → 死亡新星",
  summary: "让每一滴鲜血都成为一次爆炸。装备、技能与威能不是清单，而是一张可以追溯的因果图。",
  difficulty: "低操作 · 强 NS 适配",
  follower: "魔女",
  followerReason: FOLLOWERS.enchantress.note,
  gear: Object.values(GEAR),
  skills: SKILLS.map((skill) => ({ id: skill.id, name: skill.name, rune: skill.rune, image: skill.image, logic: `${skill.effect} ${skill.runeEffect}` })),
  passives: PASSIVES.map((passive) => ({ id: passive.id, name: passive.name, image: passive.image, logic: passive.effect })),
  powers: Object.values(CUBE_POWERS).map((power) => ({ ...power, slot: "威能", effect: power.original, logic: power.summary, acquisition: "使用卡奈魔方萃取对应传奇装备。" })),
  variants: {
    push: { title: "大秘境冲层", note: "围绕物理元素周期集中爆发", changes: ["全能法戒提供物理窗口", "强控触发克里斯宾三倍档"] },
    speed: { title: "T16 / 速刷", note: "聚怪、金币与位移串成一条清图链", changes: ["布里格斯自动聚怪", "金织带与沃兹克负责生存和机动"] },
    low: { title: "低巅峰 < 2000", note: "守护者过渡优先保证生存", changes: ["守护者翻倍装备智力与体能", "魔方戴恩提补充稳定减伤"] },
    high: { title: "高巅峰 2000+", note: "奥吉德或速刷散件释放输出上限", changes: ["冲层换奥吉德", "速刷换金币链"] },
  },
  links: [],
  rotation: TRAGOUL_PUSH_ROTATION,
  source: TRAGOUL_SOURCES.overview,
  configurationBase: TRAGOUL_CONFIGURATION_BASE,
  defaultScenarioId: "push-low",
  scenarios: TRAGOUL_SCENARIOS,
  paragonGuide: TRAGOUL_PARAGON,
  choicePolicies: TRAGOUL_CHOICES,
  reviewStatus: "fully-reviewed",
  variantCompleteness: "complete",
  originalEffects: ORIGINAL_EFFECTS,
  resolveGear: (mode, paragon) => {
    const configuration = tragoulConfiguration(mode, paragon);
    return SLOT_ORDER.map(([position]) => GEAR[configuration.gear[position]]);
  },
  resolvePowers: (mode, paragon) => {
    const configuration = tragoulConfiguration(mode, paragon);
    const labels: Record<string, string> = { weapon: "武器", armor: "防具", jewelry: "首饰", season: "第4槽" };
    return Object.entries(configuration.powers).map(([slot, id]) => ({ ...CUBE_POWERS[id], slot: labels[slot] ?? slot }));
  },
  resolveRows: (mode) => [...BASE_ROWS, ...(mode === "push" ? [PUSH_ROW] : SPEED_ROWS)],
  resolveRotation: (mode) => mode === "push" ? TRAGOUL_PUSH_ROTATION : TRAGOUL_SPEED_ROTATION,
};

const TRAGOUL_VALIDATION_ERRORS = validateReviewedBuildGuide(TRAGOUL_GUIDE);
if (TRAGOUL_VALIDATION_ERRORS.length > 0) throw new Error(`塔格奥配置校验失败：${TRAGOUL_VALIDATION_ERRORS.join("；")}`);

const CONFIGURATION_CATEGORY_LABELS: Record<string, string> = {
  gear: "装备", skills: "技能", passives: "被动", powers: "萃取", legendaryGems: "传奇宝石",
  normalGems: "普通宝石", follower: "随从", statPriorities: "属性目标", rotation: "实战循环",
};

function buildConfigurationValue(guide: UnifiedBuildGuide, value?: string) {
  if (!value) return "无";
  const item = guide.gear.find((candidate) => candidate.id === value);
  const power = guide.powers.find((candidate) => candidate.id === value);
  const skill = guide.skills.find((candidate) => value.startsWith(`${candidate.id}:`));
  const passive = guide.passives.find((candidate) => candidate.id === value);
  const known: Record<string, string> = {
    "bane-of-the-trapped": "困者之灾", zei: "贼神的复仇之石", "bane-of-the-stricken": "受罚者之灾",
    taeguk: "太极石", "boon-of-the-hoarder": "囤宝者的恩惠", "wreath-of-lightning": "闪电华冠", enchantress: "魔女",
  };
  return item?.name ?? power?.name ?? skill?.name ?? passive?.name ?? known[value] ?? value;
}

function sourceLabel(source: string, index: number) {
  try {
    const url = new URL(source);
    const host = url.hostname.replace(/^www\./, "");
    const path = url.pathname.split("/").filter(Boolean).at(-1)?.replace(/-/g, " ");
    return path ? `${host} · ${path}` : host;
  } catch {
    return `来源 ${index + 1}`;
  }
}

function BuildReviewPanel({
  guide,
  scenario,
  configuration,
}: {
  guide: UnifiedBuildGuide;
  scenario: BuildScenario;
  configuration: BuildConfiguration;
}) {
  const diffs = diffBuildConfigurations(guide.configurationBase!, configuration);
  const visibleDiffs = diffs.filter((diff) => ["gear", "skills", "passives", "powers", "legendaryGems"].includes(diff.category));
  const groupedParagon = guide.paragonGuide?.pre800;
  const policies = guide.choicePolicies ?? [];
  const policyGroups = [
    { status: "locked", label: "必须固定" },
    { status: "conditional", label: "条件替换" },
    { status: "flexible", label: "可自由调整" },
  ] as const;
  return (
    <section className="build-review-panel" aria-label="BD 场景评审结果">
      <header>
        <div><span>SCENARIO REVIEW</span><h2>{scenario.label}</h2></div>
        <p>{scenario.reason}</p>
        <b>已逐项校对</b>
      </header>
      <div className="build-review-grid">
        <article className="scenario-diff-card">
          <h3>配置差异</h3>
          {visibleDiffs.length === 0 ? <p className="review-baseline">这是四套配置的低巅峰冲层基线，其余场景都以它做显式差异。</p> : (
            <dl>{visibleDiffs.map((diff) => <div key={`${diff.category}-${diff.key}`}><dt>{CONFIGURATION_CATEGORY_LABELS[diff.category]} · {diff.key}</dt><dd><del>{buildConfigurationValue(guide, diff.before)}</del><span>→</span><strong>{buildConfigurationValue(guide, diff.after)}</strong></dd></div>)}</dl>
          )}
          {diffs.some((diff) => diff.category === "statPriorities") && <p className="review-change-note">属性目标也随场景更新，详见装备盘和下方检查点。</p>}
          {diffs.some((diff) => diff.category === "rotation") && <p className="review-change-note">实战循环已切换为小秘境短按虹吸与金币链。</p>}
          <div className="review-sources"><span>校对来源</span>{scenario.sourceRefs.map((source, index) => <a href={source} target="_blank" rel="noreferrer" key={source}>{sourceLabel(source, index)}</a>)}<small>{scenario.reviewedAt}</small></div>
        </article>

        <article className="paragon-guide-card">
          <h3>巅峰加点</h3>
          <div className="paragon-priority-grid">{groupedParagon && Object.entries(groupedParagon).map(([group, entries]) => <section key={group}><h4>{{ core: "核心", offense: "进攻", defense: "防御", utility: "通用" }[group as keyof typeof groupedParagon]}</h4><ol>{entries.map((entry) => <li key={entry.stat}><strong>{entry.stat}</strong><span>{entry.target}</span><small>{entry.reason}</small></li>)}</ol></section>)}</div>
          <div className="paragon-checkpoints">{guide.paragonGuide?.checkpoints.map((checkpoint) => <span key={checkpoint.label}><b>{checkpoint.label}</b><strong>{checkpoint.target}</strong><small>{checkpoint.action}</small></span>)}</div>
          {guide.paragonGuide && <div className="post-paragon"><b>800点以后</b>{guide.paragonGuide.post800.map((entry) => <p key={entry.priority}><strong>{entry.priority}</strong><span>{entry.when}：{entry.reason}</span></p>)}</div>}
        </article>

        <article className="choice-policy-card">
          <h3>固定与替换</h3>
          {policyGroups.map((group) => <section key={group.status}><h4>{group.label}</h4>{policies.filter((policy) => policy.status === group.status).map((policy) => <div className="choice-policy" key={policy.key}><strong>{policy.label}</strong><p>{policy.reason}</p>{policy.alternatives?.map((alternative) => <dl className={alternative.scenarios?.includes(scenario.id) ? "active" : ""} key={alternative.id}><dt>{alternative.label}{alternative.scenarios?.includes(scenario.id) && <b>当前</b>}</dt><dd><span>何时：{alternative.when}</span><span>收益：{alternative.gain}</span><span>代价：{alternative.cost}</span></dd></dl>)}</div>)}</section>)}
        </article>
      </div>
    </section>
  );
}

function BuildCommandDeck({
  guide,
  scenario,
  skills,
  passives,
  powers,
  season,
  paragon,
  activeNode,
  relatedIds,
  view = "overview",
  gear,
  sockets,
  officialItemHref,
  onViewChange,
  onNodeSelect,
  onPowerSelect,
}: {
  guide: UnifiedBuildGuide;
  scenario?: BuildScenario;
  skills: Array<Skill & { logic?: string }>;
  passives: Array<Passive & { logic?: string }>;
  powers: CubePower[];
  season: SeasonConfig;
  paragon: Paragon;
  activeNode: FlowNode | null;
  relatedIds: Set<string>;
  view?: "overview" | "gear";
  gear?: Gear;
  sockets: GearSocket[];
  officialItemHref?: string;
  onViewChange: (view: "overview" | "gear") => void;
  onNodeSelect: (node: FlowNode) => void;
  onPowerSelect: (power: CubePower) => void;
}) {
  const paragonPriorities = guide.paragonGuide?.pre800;
  const paragonGroups = [
    ["core", "核心"],
    ["offense", "进攻"],
    ["defense", "防御"],
    ["utility", "通用"],
  ] as const;
  return (
    <aside className="build-command-deck" aria-label="首屏构筑指挥台">
      <div className="command-deck-tabs" role="tablist" aria-label="首屏信息">
        <button id="command-tab-overview" role="tab" aria-selected={view === "overview"} aria-controls="command-panel-overview" className={view === "overview" ? "active" : ""} onClick={() => onViewChange("overview")}>构筑总览</button>
        <button id="command-tab-gear" role="tab" aria-selected={view === "gear"} aria-controls="command-panel-gear" className={view === "gear" ? "active" : ""} onClick={() => onViewChange("gear")}>装备作用</button>
      </div>

      {view === "overview" || !gear ? <div id="command-panel-overview" role="tabpanel" aria-labelledby="command-tab-overview">
        <header className="command-deck-intro">
          <span>BUILD COMMAND DECK</span>
          <strong>{scenario?.label ?? guide.name}</strong>
          <p>{scenario?.reason ?? guide.summary}</p>
        </header>

        <section className="command-deck-section command-skills" aria-label="技能配置摘要">
          <div className="command-deck-heading"><span>技能配置</span><small>点击可联动装备</small></div>
          <div className="command-skill-grid">
            {skills.slice(0, 6).map((skill) => {
              const related = Boolean(activeNode && relatedIds.has(skill.id));
              return <button key={skill.id} className={`${activeNode?.id === skill.id ? "active" : ""} ${related ? "related" : ""} ${activeNode && !related ? "dimmed" : ""}`} onClick={() => onNodeSelect({ id: skill.id, label: skill.name, detail: skill.logic ?? skill.effect, kind: "skill", image: skill.image })}>
                <img src={skill.image} alt="" /><span><strong>{skill.name}</strong><small>{skill.rune || "无符文"}</small></span>
              </button>;
            })}
          </div>
          <div className="command-passives">{passives.slice(0, 4).map((passive) => <button key={passive.id} className={`${activeNode?.id === passive.id ? "active" : ""} ${activeNode && relatedIds.has(passive.id) ? "related" : ""} ${activeNode && !relatedIds.has(passive.id) ? "dimmed" : ""}`} onClick={() => onNodeSelect({ id: passive.id, label: passive.name, detail: passive.logic ?? passive.effect, kind: "passive", image: passive.image })}><img src={passive.image} alt="" /><span>{passive.name}</span></button>)}</div>
        </section>

        <section className="command-deck-section command-cube" aria-label="卡奈魔方摘要">
          <div className="command-deck-heading"><span>{cubeSeasonLabel(season)}</span><small>{season.guideBaseline}</small></div>
          <div className="command-cube-grid">
            {powers.map((power) => {
              const related = Boolean(activeNode && relatedIds.has(power.id));
              return <button key={`${power.slot}-${power.id}`} className={`${activeNode?.id === power.id ? "active" : ""} ${related ? "related" : ""} ${activeNode && !related ? "dimmed" : ""}`} onClick={() => onPowerSelect(power)}>
                <img src={power.image} alt="" /><span><small>{power.slot}</small><strong>{power.name}</strong><em>{power.summary}</em></span>
              </button>;
            })}
          </div>
        </section>

        <section className="command-deck-section command-paragon" aria-label="巅峰加点摘要">
          <div className="command-deck-heading"><span>巅峰加点</span><small>{paragon === "low" ? "低巅峰优先级" : "800 点后投入"}</small></div>
          <div className="command-paragon-grid">
            {paragonGroups.map(([key, label]) => {
              const entry = paragonPriorities?.[key]?.[0];
              return <article key={key}><small>{label}</small><strong>{entry?.stat ?? "按生存阈值"}</strong><span>{entry?.target ?? guide.paragonGuide?.post800[0]?.priority ?? ""}</span></article>;
            })}
          </div>
        </section>
      </div> : <section id="command-panel-gear" className={`command-gear-view quality-${gear.quality}`} role="tabpanel" aria-labelledby="command-tab-gear">
        <header className="command-gear-title">
          <DiabloItemFrame image={gear.image} quality={gear.quality} shape={itemFrameShapeForSlot(gear.slot)} size="lg" fit="contain" sockets={sockets} label={gear.name} />
          <div><span>{gear.quality === "set" ? "套装物品" : "传奇物品"}</span><strong>{gear.name}</strong><small>{gear.slot} · 点击装备后锁定</small></div>
        </header>
        <section className="command-gear-role"><h3>这件装备在 BD 中的作用</h3><p>{gear.effect}</p></section>
        <div className="command-gear-facts">
          <section><h3>关键词缀</h3><ol>{gear.affixes.map((affix, index) => <li key={affix}><b>{index + 1}</b><span>{affix}</span></li>)}</ol></section>
          <section><h3>镶嵌</h3>{sockets.length > 0 ? <ul>{sockets.map((socket, index) => <li key={`${socket.label}-${index}`}><i className="command-gear-socket-icon"><img src={socket.image} alt="" /></i><span>{socket.label}</span></li>)}</ul> : <p>该部位没有固定镶嵌。</p>}</section>
        </div>
        {gear.warning && <p className="command-gear-warning"><b>避坑</b>{gear.warning}</p>}
        <div className="command-gear-actions"><button onClick={() => onViewChange("overview")}>返回构筑总览</button>{officialItemHref && <a href={officialItemHref}>打开完整物品详情</a>}</div>
      </section>}
    </aside>
  );
}

function UnifiedBuildDetail({ guide }: { guide: UnifiedBuildGuide }) {
  const { genders, season } = useSiteSettings();
  const itemIndex = useItemIndex();
  const catalogEntry = BUILD_CATALOG.find((entry) => entry.id === guide.id);
  const classId = catalogEntry?.classId ?? "necromancer";
  const hero = CLASS_CATALOG.find((entry) => entry.id === classId) ?? CLASS_CATALOG[4];
  const buildListHref = `/builds?class=${classId}`;
  const [mode, setMode] = useState<Mode>(guide.defaultMode ?? "push");
  const [paragon, setParagon] = useState<Paragon>("low");
  const [loadoutId, setLoadoutId] = useState(guide.defaultLoadoutId ?? guide.loadouts?.[0]?.id ?? "");
  const activeLoadout = guide.loadouts?.find((loadout) => loadout.id === loadoutId) ?? guide.loadouts?.[0];
  const activeGuide = useMemo(() => ({
    ...guide,
    set: activeLoadout?.set ?? guide.set,
    core: activeLoadout?.core ?? guide.core,
    gear: activeLoadout?.gear ?? guide.gear,
    skills: activeLoadout?.skills ?? guide.skills,
    passives: activeLoadout?.passives ?? guide.passives,
    powers: activeLoadout?.powers ?? guide.powers,
    links: activeLoadout?.links ?? guide.links,
    rotation: activeLoadout?.rotation ?? guide.rotation,
    powerSets: activeLoadout?.powerSets ?? guide.powerSets,
    consoleNote: activeLoadout?.consoleNote ?? guide.consoleNote,
  }) as UnifiedBuildGuide, [guide, activeLoadout]);
  const activeVariant = resolveBuildVariantProfile(activeGuide, mode, paragon);
  const activeScenario = activeGuide.scenarios?.find((scenario) => scenario.id === `${mode}-${paragon}`);
  const activeConfiguration = useMemo(() => activeGuide.configurationBase && activeScenario
    ? resolveBuildConfiguration(activeGuide.configurationBase, activeScenario.patch)
    : undefined, [activeGuide.configurationBase, activeScenario]);
  const gear = useMemo(
    () => {
      if (activeGuide.resolveGear) return activeGuide.resolveGear(mode, paragon);
      if (!activeConfiguration) return resolveDefaultVariantGear(activeGuide, classId, mode, paragon, activeVariant);
      const gemIds = Object.values(activeConfiguration.legendaryGems);
      let jewelryIndex = 0;
      return Object.values(activeConfiguration.gear).flatMap((id) => {
        const item = activeGuide.gear.find((candidate) => candidate.id === id);
        if (!item) return [];
        const gemId = item.slot === "颈部" || item.slot === "手指" ? gemIds[jewelryIndex++] : undefined;
        return [{
          ...item,
          gem: gemId ? CONFIGURATION_LEGENDARY_GEMS[gemId] ?? item.gem : item.gem,
          affixes: normalizeGuideAffixes(item as Gear, classId, mode, paragon),
        } as Gear];
      });
    },
    [activeGuide, activeConfiguration, classId, mode, paragon, activeVariant],
  );
  const positions = useMemo(() => arrangeGuideGear(gear as Gear[]), [gear]);
  const powers = useMemo(
    () => {
      if (activeGuide.resolvePowers) return activeGuide.resolvePowers(mode, paragon);
      if (!activeConfiguration) return resolveDefaultVariantPowers(activeGuide, mode, paragon, activeVariant);
      const labels: Record<string, string> = { weapon: "武器", armor: "防具", jewelry: "首饰", season: "第4槽" };
      return Object.entries(activeConfiguration.powers).flatMap(([slot, id]) => {
        const selected = activeGuide.powers.find((candidate) => candidate.id === id);
        return selected ? [{ id: selected.id, slot: labels[slot] ?? selected.slot, name: selected.name, image: selected.image, original: selected.effect, summary: selected.logic }] : [];
      });
    },
    [activeGuide, activeConfiguration, mode, paragon, activeVariant],
  );
  const displayedPowers = useMemo(
    () => season.cubeSlots === 3 ? powers.filter((power) => !["第4槽", "赛季槽", "赛季"].includes(power.slot)) : powers,
    [powers, season.cubeSlots],
  );
  const setFamilies = useMemo(() => buildSetFamilies(activeGuide, gear as Gear[]), [activeGuide, gear]);
  const rows = useMemo(
    () => [...guideRows(activeGuide, mode), ...buildAutomaticSetRows(setFamilies, powers)],
    [activeGuide, mode, setFamilies, powers],
  );
  const rotation = activeGuide.resolveRotation?.(mode) ?? activeConfiguration?.rotation ?? activeGuide.rotation;
  const scenarioSkills = useMemo(() => activeConfiguration?.skills.flatMap((configured) => {
    const skill = activeGuide.skills.find((candidate) => candidate.id === configured.id);
    return skill ? [{ ...skill, rune: configured.rune ?? skill.rune }] : [];
  }) ?? activeGuide.skills, [activeConfiguration, activeGuide.skills]);
  const scenarioPassives = useMemo(() => activeConfiguration?.passives.flatMap((id) => {
    const passive = activeGuide.passives.find((candidate) => candidate.id === id);
    return passive ? [passive] : [];
  }) ?? activeGuide.passives, [activeConfiguration, activeGuide.passives]);
  const [selectedGearId, setSelectedGearId] = useState(positions[0]?.gear.id ?? "");
  const [selectedPowerId, setSelectedPowerId] = useState(powers[0]?.id ?? "");
  const [commandView, setCommandView] = useState<"overview" | "gear">("overview");
  const [activeNode, setActiveNode] = useState<FlowNode | null>(null);
  const [selectedStat, setSelectedStat] = useState<EquipmentStatKey | null>("main");
  const [flowFilter, setFlowFilter] = useState<FlowFilter>("all");
  const selectedGear = (gear.find((item) => item.id === selectedGearId) ?? positions[0]?.gear ?? gear[0]) as Gear;
  const selectedPower = displayedPowers.find((power) => power.id === selectedPowerId) ?? displayedPowers[0];
  const selectedOfficialId = useMemo(() => findOfficialItem(itemIndex as OfficialItemRecord[], selectedGear)?.id ?? "", [itemIndex, selectedGear]);
  const selectedOfficialIndexItem = useMemo(() => itemIndex.find((record) => record.id === selectedOfficialId), [itemIndex, selectedOfficialId]);
  const selectedOfficialHref = selectedOfficialIndexItem?.category ? `/library/${selectedOfficialIndexItem.category}/${encodeURIComponent(selectedOfficialIndexItem.id)}` : "";
  const selectedSockets = selectedGear ? guideSockets(selectedGear, classId, activeConfiguration?.normalGems) : [];
  const statRows = useMemo(() => equipmentStatRows(positions, classId, paragon), [positions, classId, paragon]);
  const activeStat = statRows.find((stat) => stat.key === selectedStat);
  const relatedIds = useMemo(() => {
    if (!activeNode) return new Set<string>();
    const ids = new Set<string>([activeNode.id]);
    rows.filter((row) => row.nodes.some((node) => node.id === activeNode.id)).forEach((row) => row.nodes.forEach((node) => ids.add(node.id)));
    const royal = powers.find((power) => /royal-grandeur/i.test(power.id) || power.name.includes("皇家华戒"));
    const activeFamily = setFamilies.find((family) => family.id === activeNode.id || family.gear.some((item) => item.id === activeNode.id));
    if (activeFamily) {
      ids.add(activeFamily.id);
      activeFamily.gear.forEach((item) => ids.add(item.id));
      if (royal && activeFamily.royalEligible) ids.add(royal.id);
    }
    if (royal && activeNode.id === royal.id) {
      setFamilies.filter((family) => family.royalEligible).forEach((family) => {
        ids.add(family.id);
        family.gear.forEach((item) => ids.add(item.id));
      });
    }
    return ids;
  }, [activeNode, rows, powers, setFamilies]);
  const visibleRows = flowFilter === "all" ? rows : rows.filter((row) => row.category === flowFilter);
  const paperdollImage = paperdollAsset(classId, genders[classId]);

  useEffect(() => {
    if (!gear.some((item) => item.id === selectedGearId)) setSelectedGearId(positions[0]?.gear.id ?? gear[0]?.id ?? "");
  }, [gear, positions, selectedGearId]);
  useEffect(() => {
    if (!displayedPowers.some((power) => power.id === selectedPowerId)) setSelectedPowerId(displayedPowers[0]?.id ?? "");
  }, [displayedPowers, selectedPowerId]);

  const handleNodeSelect = (node: FlowNode) => {
    setSelectedStat(null);
    setActiveNode((current) => current?.id === node.id ? null : node);
    if (gear.some((item) => item.id === node.id)) setSelectedGearId(node.id);
    if (powers.some((power) => power.id === node.id)) setSelectedPowerId(node.id);
  };
  const showGearDetail = (id: string) => {
    if (!gear.some((item) => item.id === id)) return;
    setSelectedGearId(id);
    setCommandView("gear");
  };
  const focusGear = (id: string) => {
    const item = gear.find((candidate) => candidate.id === id);
    if (!item) return;
    setSelectedStat(null);
    showGearDetail(id);
    handleNodeSelect({ id, label: item.name, detail: item.effect, kind: "gear", image: item.image });
  };

  if (!selectedGear || !selectedPower) return <PendingBuildDetail buildId={guide.id} />;

  return (
    <main className="bd-detail-page unified-build-detail">
      <SiteHeader active="builds" />
      <section className="hero" id="top">
        <div className="breadcrumbs">{hero.name} <span>›</span> 单人BD <span>›</span> {guide.core}</div>
        <div className="hero-content">
          <div><div className="eyebrow"><span>{season.platformLabel} 专用校对</span><b>PATCH {season.patch}</b></div><h1>{guide.name}</h1><p>{guide.summary}</p></div>
          <div className="build-rating" aria-label="BD定位"><span><b>{catalogEntry?.role === "冲层" ? "S" : "A"}</b> {catalogEntry?.purpose ?? "单人强度"}</span><span><b>{catalogEntry?.difficulty ?? "中"}</b> 操作门槛</span><span><b>强</b> NS适配</span></div>
        </div>
      </section>

      <section className="variant-bar" aria-label="配置切换">
        {guide.loadouts && guide.loadouts.length > 1 && <><div className="variant-group"><span>套装方案</span>{guide.loadouts.map((loadout) => <button key={loadout.id} className={activeLoadout?.id === loadout.id ? "active" : ""} onClick={() => setLoadoutId(loadout.id)}>{loadout.label}</button>)}</div><div className="variant-divider" /></>}
        <div className="variant-group"><span>用途</span><button className={mode === "push" ? "active" : ""} onClick={() => setMode("push")}>{guide.modeLabels?.push ?? "大秘境冲层"}</button><button className={mode === "speed" ? "active" : ""} onClick={() => setMode("speed")}>{guide.modeLabels?.speed ?? "T16 / 速刷"}</button></div>
        <div className="variant-divider" />
        <div className="variant-group"><span>巅峰</span><button className={paragon === "low" ? "active" : ""} onClick={() => setParagon("low")}>低巅峰 &lt; 2000</button><button className={paragon === "high" ? "active" : ""} onClick={() => setParagon("high")}>高巅峰 2000+</button></div>
        <div className="variant-note"><strong>{activeLoadout ? `${activeLoadout.title} · ` : ""}{activeVariant?.title ?? `${guide.variants[mode].title} · ${guide.variants[paragon].title}`}</strong><span>{activeLoadout?.summary ?? activeVariant?.differenceReason ?? `${guide.variants[mode].note}；${guide.variants[paragon].note}`}</span></div>
      </section>

      {activeGuide.variantCompleteness === "documented-shared" && <section className="variant-audit-note" aria-label="BD 数据完整度">
        <strong>配置差异待实装</strong>
        <span>当前 BD 已保留用途与巅峰说明；装备、宝石、魔方和技能暂按同一套共用配置展示，避免自动替换成未经校对的配装。</span>
      </section>}

      {season.availability === "preview" && <section className="season-preview-note" aria-label="轮换预设说明"><strong>{season.label}</strong><span>{season.theme}</span></section>}

      {guide.loadouts && guide.loadouts.length > 1 && <section className="loadout-comparison" aria-label="配装方案怎么选">
        <header><span>配装选择</span><strong>两套都能无限疾风，区别在于谁负责杀怪</strong></header>
        <div>{guide.loadouts.map((loadout) => <button key={loadout.id} className={activeLoadout?.id === loadout.id ? "active" : ""} onClick={() => setLoadoutId(loadout.id)}><span>{loadout.label}</span><h3>{loadout.title}</h3><p>{loadout.summary}</p><dl><div><dt>推荐</dt><dd>{loadout.bestFor}</dd></div><div><dt>取舍</dt><dd>{loadout.tradeoff}</dd></div></dl></button>)}</div>
      </section>}

      <section className="workbench">
        <article className="panel loadout-panel">
          <div className="panel-heading"><div><span className="section-index">01</span><h2>装备盘</h2></div><small>点击装备查看 · 焦点跟随键盘</small></div>
          <div className="paperdoll-compact-stage">
          <div className="paperdoll" style={{ "--paperdoll-image": `url("${paperdollImage}")` } as CSSProperties}>
            <div className="paperdoll-lines" aria-hidden="true" />
            <div className="paperdoll-profile"><span>70级 · {hero.name} · {seasonLabel(season)}</span><strong>{guide.name}</strong><small>{activeLoadout ? `${activeLoadout.label} · ` : ""}{mode === "push" ? (guide.modeLabels?.push ?? "单人大秘境冲层") : (guide.modeLabels?.speed ?? "T16 / 大秘境速刷")} · {paragon === "low" ? "低巅峰配置" : "高巅峰配置"}</small></div>
            <div className="paperdoll-stats">
              <h3>装备加成 <small>点击反查词缀</small></h3>
              {statRows.map((stat) => (
                <button
                  key={stat.key}
                  className={selectedStat === stat.key ? "active" : ""}
                  onClick={() => {
                    setSelectedStat(stat.key);
                    setActiveNode(null);
                  }}
                  aria-pressed={selectedStat === stat.key}
                >
                  <i />
                  <span>{stat.label}</span>
                  <strong>{selectedStat === stat.key ? `${stat.targets.size} 件可出` : stat.summary}</strong>
                </button>
              ))}
              <p className="paperdoll-stat-hint">{activeStat ? `已高亮能获得“${activeStat.label}”的装备；装备名下显示该部位上限。` : "点击一项属性查看可出现该词缀的装备与上限。"}</p>
            </div>
            <div className="paperdoll-labels">
              {positions.map(({ position, gear: item }) => {
                const statMaximum = activeStat?.targets.get(item.id);
                return (
                  <button
                    key={`label-${position}`}
                    className={`paperdoll-label label-${position} quality-${item.quality} ${selectedGearId === item.id ? "selected" : ""} ${activeStat && statMaximum ? "stat-related" : ""} ${activeStat && !statMaximum ? "stat-dimmed" : ""}`}
                    onFocus={() => showGearDetail(item.id)}
                    onClick={() => focusGear(item.id)}
                  >
                    <strong>{item.name}</strong>
                    {statMaximum ? (
                      <span className="bonus-value">
                        <b className="value">{statMaximum.replace(/^远古最高\s*/, "").replace(/^最高\s*/, "")}</b>{" "}{activeStat?.label}
                      </span>
                    ) : <span>{item.affixes[0]}</span>}
                  </button>
                );
              })}
            </div>
            <div className="paperdoll-gear-zone">
              {positions.map(({ position, gear: item }) => {
                const statRelated = Boolean(activeStat?.targets.has(item.id));
                return (
                  <PaperdollGearSlot
                    key={position}
                    gear={item}
                    position={position}
                    selected={!activeStat && selectedGearId === item.id}
                    related={activeStat ? statRelated : Boolean(activeNode && relatedIds.has(item.id))}
                    dimmed={activeStat ? !statRelated : Boolean(activeNode && !relatedIds.has(item.id))}
                    sockets={guideSockets(item, classId, activeConfiguration?.normalGems)}
                    onSelect={focusGear}
                    onFocusSelect={showGearDetail}
                  />
                );
              })}
            </div>
          </div>
          </div>
        </article>

        <BuildCommandDeck
          guide={activeGuide}
          scenario={activeScenario}
          skills={scenarioSkills}
          passives={scenarioPassives}
          powers={displayedPowers}
          season={season}
          paragon={paragon}
          activeNode={activeNode}
          relatedIds={relatedIds}
          view={commandView}
          gear={selectedGear}
          sockets={selectedSockets}
          officialItemHref={selectedOfficialHref}
          onViewChange={setCommandView}
          onNodeSelect={handleNodeSelect}
          onPowerSelect={(power) => {
            setSelectedPowerId(power.id);
            handleNodeSelect({ id: power.id, label: power.name, detail: power.summary, kind: "power", image: power.image });
          }}
        />

        <article className="panel synergy-panel" id="synergy">
          <div className="panel-heading"><div><span className="section-index">04</span><h2>核心 BD 联动</h2></div><small>点击节点 · 周围装备、技能、被动与威能同步高亮</small></div>
          <div className="flow-toolbar">{[["all", "全部链路"], ["damage", "增伤"], ["defense", "减伤"], ["movement", "速刷"], ["set", "套装联动"], ["royal", "皇家华戒"]].map(([value, label]) => <button key={value} className={flowFilter === value ? "active" : ""} onClick={() => setFlowFilter(value as FlowFilter)}>{label}</button>)}{activeNode && <button className="clear-focus" onClick={() => setActiveNode(null)}>清除聚焦 ×</button>}</div>
          <div className="flow-legend"><span><i className="legend-skill" />技能</span><span><i className="legend-gear" />装备 / 威能</span><span><i className="legend-set" />套装</span><span><i className="legend-damage" />伤害结果</span><span><i className="legend-defense" />生存结果</span></div>
          <div className="flow-map">{visibleRows.map((row) => <div className="flow-chain" key={row.id}><div className="chain-title"><span>{row.title}</span><i /></div><div className="flow-row">{row.nodes.map((node, index) => <div className="flow-step" key={`${row.id}-${node.id}-${index}`}><FlowNodeButton node={node} active={activeNode?.id === node.id} dimmed={Boolean(activeNode && !relatedIds.has(node.id))} onSelect={handleNodeSelect} />{index < row.nodes.length - 1 && <span className="flow-arrow">→</span>}</div>)}</div></div>)}</div>
          <div className="focus-readout"><span>{activeNode ? "当前聚焦" : "阅读方式"}</span><strong>{activeNode?.label ?? "从左向右阅读每条因果链"}</strong><p>{activeNode?.detail ?? "选择任一节点，周围模块里的对应装备、技能、被动与威能会同步高亮。"}</p></div>
        </article>

        <aside className="panel combat-panel" id="rotation">
          <div className="panel-heading"><div><span className="section-index">06</span><h2>实战手法</h2></div><small>{season.guideBaseline}</small></div>
          <div className="combat-summary"><div><span>输出</span><i><b style={{ width: mode === "push" ? "92%" : "80%" }} /></i><em>{mode === "push" ? "92" : "80"}</em></div><div><span>坚韧</span><i><b style={{ width: paragon === "low" ? "90%" : "82%" }} /></i><em>{paragon === "low" ? "90" : "82"}</em></div><div><span>机动</span><i><b style={{ width: mode === "speed" ? "95%" : "64%" }} /></i><em>{mode === "speed" ? "95" : "64"}</em></div></div>
          <ol className="rotation-list">{rotation.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.action}</p><small><b>为什么：</b>{step.reason}</small></div></li>)}</ol>
          <div className="ns-note"><div className="switch-icon"><span>−</span><b>NS</b><span>+</span></div><div><strong>主机操作提醒</strong><p>{activeGuide.consoleNote ?? "锁定目标偏离怪群中心时，松开技能、调整摇杆方向后重新施放，比持续硬拉视角更稳定。"}</p></div></div>
        </aside>
      </section>

      <section className="lower-grid">
        <BuildAbilitiesPanel
          skills={scenarioSkills.map((skill) => ({ id: skill.id, name: skill.name, image: skill.image, logic: skill.logic, rune: skill.rune }))}
          passives={scenarioPassives.map((passive) => ({ id: passive.id, name: passive.name, image: passive.image, logic: passive.logic }))}
          activeNode={activeNode}
          relatedIds={relatedIds}
          onNodeSelect={handleNodeSelect}
        />

        <KanaiCubePanel
          powers={displayedPowers}
          selectedPower={selectedPower}
          activeNode={activeNode}
          relatedIds={relatedIds}
          seasonLabel={cubeSeasonLabel(season)}
          onPowerSelect={(power) => {
            setSelectedPowerId(power.id);
            handleNodeSelect({ id: power.id, label: power.name, detail: power.summary, kind: "power", image: power.image });
          }}
        />

        <article className="panel follower-panel" id="followers">
          <div className="panel-heading"><div><span className="section-index">05</span><h2>随从配装</h2></div><small>三名随从并列对比 · 首选项高亮</small></div>
          <FollowerShowcase recommendedFollower={guide.follower} recommendation={guide.followerReason} />
        </article>
      </section>

      {activeScenario && activeConfiguration && <BuildReviewPanel guide={activeGuide} scenario={activeScenario} configuration={activeConfiguration} />}

      <footer><div><span className="footer-mark">N</span><p><strong>圣休亚瑞秘典 · 数据驱动攻略</strong><small>{season.platformLabel} · {seasonLabel(season)} · 仅单人玩法</small></p></div><p><a href={buildListHref}>返回全职业 BD</a>{[...new Set(activeScenario?.sourceRefs ?? [guide.source])].map((source, index) => <Fragment key={source}> · <a href={source} target="_blank" rel="noreferrer">{sourceLabel(source, index)}</a></Fragment>)}</p></footer>
    </main>
  );
}

function PendingBuildDetail({ buildId }: { buildId: string }) {
  const build = BUILD_CATALOG.find((entry) => entry.id === buildId);
  if (!build) return <RoutePage active="builds" eyebrow="BUILD NOT FOUND" title="未找到该 BD"><section className="archive-section"><p className="library-empty">该 BD 不在当前赛季目录中。</p></section></RoutePage>;
  const hero = CLASS_CATALOG.find((entry) => entry.id === build.classId)!;
  return (
    <RoutePage active="builds" eyebrow={`${hero.name} · ${SEASON_LABEL}`} title={build.name}>
      <section className="archive-section pending-build-detail">
        <img src={hero.crest} alt="" /><article><span>{build.set}</span><h2>{build.name}</h2><p>{build.summary}</p><dl><div><dt>核心技能</dt><dd>{build.core}</dd></div><div><dt>主要用途</dt><dd>{build.role}</dd></div><div><dt>操作门槛</dt><dd>{build.difficulty}</dd></div></dl><div className="pending-notice"><strong>完整攻略校对中</strong><p>该页路由与资料库关联已建立；装备盘、低/高巅峰、速刷/冲层、词缀、定向获取、联动图与输出手法会按照塔格奥新星的标准逐项补齐。</p></div><a href={`/builds?class=${build.classId}`}>返回全职业 BD 列表</a></article>
      </section>
    </RoutePage>
  );
}

function HomeContent() {
  const pathname = usePathname() || "/builds";
  const [mode, setMode] = useState<Mode>("push");
  const [paragon, setParagon] = useState<Paragon>("low");
  const [selectedGearId, setSelectedGearId] = useState("iron-rose");
  const [selectedPowerId, setSelectedPowerId] = useState("bloodtide-blade");
  const [activeNode, setActiveNode] = useState<FlowNode | null>(null);
  const [flowFilter, setFlowFilter] = useState<FlowFilter>("all");

  const positions = useMemo(() => getPositionGear(mode, paragon), [mode, paragon]);
  const selectedGear = GEAR[selectedGearId] ?? GEAR["iron-rose"];
  const rows = useMemo(
    () => [...BASE_ROWS, ...(mode === "push" ? [PUSH_ROW] : SPEED_ROWS)],
    [mode],
  );
  const visibleRows = flowFilter === "all" ? rows : rows.filter((row) => row.category === flowFilter);
  const relatedIds = useMemo(() => {
    if (!activeNode) return new Set<string>();
    const ids = new Set<string>([activeNode.id]);
    rows
      .filter((row) => row.nodes.some((node) => node.id === activeNode.id))
      .forEach((row) => row.nodes.forEach((node) => ids.add(node.id)));
    return ids;
  }, [activeNode, rows]);

  const handleNodeSelect = (node: FlowNode) => {
    setActiveNode((current) => (current?.id === node.id ? null : node));
    if (GEAR[node.id]) setSelectedGearId(node.id);
    if (CUBE_POWERS[node.id]) setSelectedPowerId(node.id);
  };

  const handleGearSelect = (id: string) => {
    setSelectedGearId(id);
    setActiveNode({
      id,
      label: GEAR[id].name,
      detail: GEAR[id].effect,
      kind: "gear",
      image: GEAR[id].image,
    });
  };

  const rotation =
    mode === "push"
      ? [
          ["叠生命", "进图开启脆弱光环，利用治疗把塔格奥4件生命加成叠至300%。", "分身会继承召唤时的生命状态，所以要先叠满。"],
          ["召分身", "生命叠满后开启血魂双分；死亡前不需要再次施放。", "鬼灵面容让分身永久存在，并复制死亡新星。"],
          ["叠骨甲", "贴近10只敌人使用骨甲，确保30%减伤并保持轮回镰刀生效。", "轮回镰刀每次放大次要技能都会消耗骨甲时长。"],
          ["造爆发窗", "持续虹吸聚怪；全能法戒转到物理时，使用白骨脱臼眩晕。", "眩晕把克里斯宾从减速档推到强控制三倍档。"],
          ["虹吸到底", "面向精英或怪堆持续鲜血虹吸，让铁玫瑰与分身不断释放新星。", "葬镰、铁玫瑰、血潮利刃和塔格奥六件会同时放大这一步。"],
        ]
      : [
          ["开局预热", "先叠满塔格奥4件生命，再召唤永久血魂双分。", "这部分不能省，否则后续新星与坚韧都低。"],
          ["鲜血穿行", "连续位移寻找密集怪群，不为零散小怪停下。", "血潮利刃需要25码内有足够敌人。"],
          ["自动聚怪", "脆弱光环经过怪群时，布里格斯会把敌人拉到身边。", "聚得越紧，免费鲜血新星收益越高。"],
          ["短按虹吸", "面对怪堆短暂引导鲜血虹吸，看到新星触发后立刻继续赶路。", "速刷不等待全能法戒周期，时间比单次伤害更重要。"],
          ["吃金币链", "拾取金币维持金织带护甲，打碎物件触发沃兹克移速。", "这条链只适用于T16；大秘境不掉金币。"],
        ];

  const cubeIds =
    paragon === "low"
      ? [
          ["武器", "bloodtide-blade"],
          ["防具", mode === "push" ? "dayntee" : "steuarts-greaves"],
          ["首饰", "royal-grandeur"],
          ["第4槽", "scythe-cycle"],
        ]
      : mode === "push"
        ? [
            ["武器", "bloodtide-blade"],
            ["防具", "mantle-channeling"],
            ["首饰", "royal-grandeur"],
            ["第4槽", "scythe-cycle"],
          ]
        : [
            ["武器", "bloodtide-blade"],
            ["防具", "steuarts-greaves"],
            ["首饰", "avarice-band"],
            ["第4槽", "scythe-cycle"],
          ];
  const cube: CubePower[] = cubeIds.map(([slot, id]) => ({ ...CUBE_POWERS[id], slot }));
  const selectedPower = cube.find((power) => power.id === selectedPowerId) ?? cube[0];
  const selectedSockets = SOCKETS[selectedGear.id] ?? [];

  if (pathname === "/" || pathname === "/builds") {
    return <RoutePage active="builds" eyebrow="SEASON 39 · SOLO BUILDS" title="赛季全职业 BD"><BuildAtlas /></RoutePage>;
  }
  if (pathname === "/story") {
    return <RoutePage active="story" eyebrow="THE CAMPAIGN · ACT I–V" title="主线剧情线路"><CampaignRoute /></RoutePage>;
  }
  if (pathname === "/season-start") {
    return <RoutePage active="season" eyebrow="SEASON START · 0 TO 70" title="赛季开荒流程"><SeasonStartGuide /></RoutePage>;
  }
  if (pathname === "/library") {
    return <RoutePage active="library" eyebrow="OFFICIAL ITEM DATABASE" title="物品"><OfficialLibrary /></RoutePage>;
  }
  if (pathname.startsWith("/library/")) {
    const [, , category, encodedId] = pathname.split("/");
    return (
      <RoutePage active="library" eyebrow="OFFICIAL ITEM DATABASE" title={encodedId ? "物品详情" : "物品列表"}>
        {encodedId ? <LibraryRecordDetail category={category} id={decodeURIComponent(encodedId)} /> : <LibraryCategory category={category} />}
      </RoutePage>
    );
  }
  if (pathname.startsWith("/builds/")) {
    const buildId = pathname.split("/")[2];
    const guide = buildId === "tragoul-nova"
      ? TRAGOUL_GUIDE
      : NECROMANCER_BUILDS[buildId]
        ?? BARBARIAN_BUILDS[buildId]
        ?? CRUSADER_BUILDS[buildId]
        ?? DEMON_HUNTER_BUILDS[buildId]
        ?? MONK_BUILDS[buildId]
        ?? WITCH_DOCTOR_BUILDS[buildId]
        ?? WIZARD_BUILDS[buildId];
    if (guide) return <UnifiedBuildDetail guide={guide} />;
    return <PendingBuildDetail buildId={buildId} />;
  }

  return (
    <main className="bd-detail-page">
      <SiteHeader />

      <section className="hero" id="top">
        <div className="breadcrumbs">死灵法师 <span>›</span> 单人BD <span>›</span> 死亡新星</div>
        <div className="hero-content">
          <div>
            <div className="eyebrow"><span>{CURRENT_SEASON.platformLabel} 专用校对</span><b>PATCH {CURRENT_SEASON.patch}</b></div>
            <h1>塔格奥 <em>·</em> 死亡新星</h1>
            <p>让每一滴鲜血都成为一次爆炸。装备、技能与威能不再是清单，而是一张可以追溯的因果图。</p>
          </div>
          <div className="build-rating" aria-label="BD定位">
            <span><b>S</b> 单人强度</span>
            <span><b>低</b> 操作门槛</span>
            <span><b>强</b> NS适配</span>
          </div>
        </div>
      </section>

      <section className="variant-bar" aria-label="配置切换">
        <div className="variant-group">
          <span>用途</span>
          <button className={mode === "push" ? "active" : ""} onClick={() => setMode("push")} aria-pressed={mode === "push"}>
            大秘境冲层
          </button>
          <button className={mode === "speed" ? "active" : ""} onClick={() => setMode("speed")} aria-pressed={mode === "speed"}>
            T16 / 速刷
          </button>
        </div>
        <div className="variant-divider" />
        <div className="variant-group">
          <span>巅峰</span>
          <button className={paragon === "low" ? "active" : ""} onClick={() => setParagon("low")} aria-pressed={paragon === "low"}>
            低巅峰 &lt; 2000
          </button>
          <button className={paragon === "high" ? "active" : ""} onClick={() => setParagon("high")} aria-pressed={paragon === "high"}>
            高巅峰 2000+
          </button>
        </div>
        <div className="variant-note">
          <strong>{paragon === "low" ? "守护者过渡" : mode === "push" ? "奥吉德冲层" : "金币速刷"}</strong>
          <span>{paragon === "low" ? "翻倍装备智力与体能" : mode === "push" ? "提高精英伤害与减免" : "放弃多余坚韧换取机动"}</span>
        </div>
      </section>

      <section className="workbench" id="loadout">
        <article className="panel loadout-panel">
          <div className="panel-heading">
            <div>
              <span className="section-index">01</span>
              <h2>装备盘</h2>
            </div>
            <small>点击装备查看 · 焦点跟随键盘</small>
          </div>

          <div className="paperdoll">
            <div className="paperdoll-lines" aria-hidden="true" />
            <div className="paperdoll-profile" aria-label="当前配装概览">
              <span>70级 · 死灵法师 · {SEASON_LABEL}</span>
              <strong>塔格奥 · 死亡新星</strong>
              <small>{mode === "push" ? "单人大秘境冲层" : "T16 / 大秘境速刷"} · {paragon === "low" ? "低巅峰配置" : "高巅峰配置"}</small>
            </div>
            <div className="paperdoll-stats" aria-label="装备属性目标">
              <h3>装备加成</h3>
              <p><i />主属性 <strong>智力优先</strong></p>
              <p><i />暴击几率 <strong>≥ 50%</strong></p>
              <p><i />暴击伤害 <strong>≥ 400%</strong></p>
              <p><i />冷却缩减 <strong>≥ 50%</strong></p>
              <p><i />范围伤害 <strong>{paragon === "high" && mode === "push" ? "高巅峰补足" : "随装备补充"}</strong></p>
            </div>
            <div className="paperdoll-labels">
              {SLOT_ORDER.map(([position, key]) => {
                const resolvedId =
                  key === "shoulder" || key === "bracers" || key === "belt" || key === "ring2"
                    ? positions[key]
                    : key;
                const gear = GEAR[resolvedId];
                return (
                  <button
                    key={`label-${position}`}
                    className={`paperdoll-label label-${position} quality-${gear.quality} ${selectedGearId === gear.id ? "selected" : ""}`}
                    onFocus={() => setSelectedGearId(gear.id)}
                    onClick={() => handleGearSelect(gear.id)}
                  >
                    <strong>{gear.name}</strong>
                    <span>{gear.affixes[0]}</span>
                  </button>
                );
              })}
            </div>
            <div className="paperdoll-gear-zone">
              {SLOT_ORDER.map(([position, key]) => {
                const resolvedId =
                  key === "shoulder" || key === "bracers" || key === "belt" || key === "ring2"
                    ? positions[key]
                    : key;
                const gear = GEAR[resolvedId];
                return (
                  <PaperdollGearSlot
                    key={position}
                    gear={gear}
                    position={position}
                    selected={selectedGearId === gear.id}
                    related={Boolean(activeNode && relatedIds.has(gear.id))}
                    dimmed={Boolean(activeNode && !relatedIds.has(gear.id))}
                    sockets={SOCKETS[gear.id] ?? []}
                    onSelect={handleGearSelect}
                    onFocusSelect={setSelectedGearId}
                  />
                );
              })}
            </div>
          </div>

          <GearDetailPanel
            gear={selectedGear}
            sockets={selectedSockets}
            originalEffect={ORIGINAL_EFFECTS[selectedGear.id] ?? selectedGear.effect}
            socketNote={selectedGear.id === "tragoul-chest" ? "坚韧不足时可把黄宝石换成红宝石补护甲。" : undefined}
          />
        </article>

        <article className="panel synergy-panel" id="synergy">
          <div className="panel-heading">
            <div>
              <span className="section-index">04</span>
              <h2>核心 BD 联动</h2>
            </div>
            <small>点击节点 · 上方装备、技能、被动与威能同步高亮</small>
          </div>

          <div className="flow-toolbar">
            {[
              ["all", "全部链路"],
              ["damage", "增伤"],
              ["defense", "减伤"],
              ["movement", "速刷"],
              ["set", "套装联动"],
              ["royal", "皇家华戒"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={flowFilter === value ? "active" : ""}
                onClick={() => setFlowFilter(value as typeof flowFilter)}
              >
                {label}
              </button>
            ))}
            {activeNode && (
              <button className="clear-focus" onClick={() => setActiveNode(null)}>
                清除聚焦 ×
              </button>
            )}
          </div>

          <div className="flow-legend">
            <span><i className="legend-skill" />技能</span>
            <span><i className="legend-gear" />装备 / 威能</span>
            <span><i className="legend-set" />套装</span>
            <span><i className="legend-damage" />伤害结果</span>
            <span><i className="legend-defense" />生存结果</span>
          </div>

          <div className="flow-map">
            {visibleRows.map((row) => (
              <div className="flow-chain" key={row.id}>
                <div className="chain-title"><span>{row.title}</span><i /></div>
                <div className="flow-row">
                  {row.nodes.map((node, index) => (
                    <div className="flow-step" key={`${row.id}-${node.id}-${index}`}>
                      <FlowNodeButton
                        node={node}
                        active={activeNode?.id === node.id}
                        dimmed={Boolean(activeNode && !relatedIds.has(node.id))}
                        onSelect={handleNodeSelect}
                      />
                      {index < row.nodes.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="focus-readout">
            <span>{activeNode ? "当前聚焦" : "阅读方式"}</span>
            <strong>{activeNode?.label ?? "从左向右阅读每条因果链"}</strong>
            <p>{activeNode?.detail ?? "选择任一装备或技能，其他无关节点会淡出；相同节点可同时连接多条增伤与减伤链。"}</p>
          </div>
        </article>

        <aside className="panel combat-panel" id="rotation">
          <div className="panel-heading">
            <div>
              <span className="section-index">06</span>
              <h2>实战手法</h2>
            </div>
            <small>{CURRENT_SEASON.guideBaseline}</small>
          </div>

          <div className="combat-summary">
            <div><span>输出</span><i><b style={{ width: mode === "push" ? "94%" : "80%" }} /></i><em>{mode === "push" ? "94" : "80"}</em></div>
            <div><span>坚韧</span><i><b style={{ width: paragon === "low" ? "91%" : "82%" }} /></i><em>{paragon === "low" ? "91" : "82"}</em></div>
            <div><span>机动</span><i><b style={{ width: mode === "speed" ? "95%" : "62%" }} /></i><em>{mode === "speed" ? "95" : "62"}</em></div>
          </div>

          <ol className="rotation-list">
            {rotation.map(([title, action, reason], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{action}</p>
                  <small><b>为什么：</b>{reason}</small>
                </div>
              </li>
            ))}
          </ol>

          <div className="ns-note">
            <div className="switch-icon"><span>−</span><b>NS</b><span>+</span></div>
            <div>
              <strong>主机操作提醒</strong>
              <p>虹吸会自动锁定目标。面对怪堆中心再按住技能；若锁到边缘小怪，松开并重新调整摇杆方向，比硬拉视角更快。</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="lower-grid">
        <BuildAbilitiesPanel
          skills={SKILLS.map((skill) => ({ id: skill.id, name: skill.name, image: skill.image, logic: skill.effect, rune: skill.rune, runeId: skill.runeId, runeLogic: skill.runeEffect, runeKey: skill.runeKey }))}
          passives={PASSIVES.map((passive) => ({ id: passive.id, name: passive.name, image: passive.image, logic: passive.effect }))}
          activeNode={activeNode}
          relatedIds={relatedIds}
          onNodeSelect={handleNodeSelect}
        />

        <KanaiCubePanel
          powers={cube}
          selectedPower={selectedPower}
          activeNode={activeNode}
          relatedIds={relatedIds}
          seasonLabel={CUBE_SEASON_LABEL}
          onPowerSelect={(power) => {
            setSelectedPowerId(power.id);
            handleNodeSelect({ id: power.id, label: power.name, detail: power.summary, kind: "power", image: power.image });
          }}
        />

        <article className="panel follower-panel" id="followers">
          <div className="panel-heading">
            <div>
              <span className="section-index">05</span>
              <h2>随从配装</h2>
            </div>
            <small>三名随从并列对比 · 悬停装备查看用途</small>
          </div>
          <FollowerShowcase recommendedFollower={guide.follower} recommendation={guide.followerReason} />
        </article>

        <article className="panel gem-panel">
          <div className="panel-heading">
            <div>
              <span className="section-index">06</span>
              <h2>传奇宝石</h2>
            </div>
          </div>
          <div className="gem-list">
            {[
              ["困者之灾", "近身减速稳定触发自身增伤，也让克里斯宾进入减速档。", "/d3/bane-trapped.png"],
              [mode === "push" ? "贼神的复仇之石" : "囤宝者的恩惠", mode === "push" ? "即使贴身也有第一档独立增伤；保持合适距离收益更高。" : "掉落金币，连接金织带护甲与速刷移速。", mode === "push" ? "/d3/zei.png" : "/d3/bane-trapped.png"],
              [mode === "push" ? "受罚者之灾" : "强者之灾", mode === "push" ? "持续叠加首领伤害，补足死亡新星单体弱点。" : "击杀精英后获得稳定短时增伤。", "/d3/stricken.png"],
            ].map(([name, effect, image]) => (
              <div key={name}>
                <img src={image} alt="" />
                <span><strong>{name}</strong><small>{effect}</small></span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <footer>
        <div>
          <span className="footer-mark">N</span>
          <p><strong>圣休亚瑞秘典 · 私人原型</strong><small>{CURRENT_SEASON.platformLabel} · {SEASON_LABEL} · 仅单人玩法</small></p>
        </div>
        <p>游戏名称、图像与素材归 Blizzard Entertainment 所有。本页用于个人攻略整理。</p>
      </footer>
    </main>
  );
}

export default function Home() {
  return <SiteSettingsProvider><HomeContent /></SiteSettingsProvider>;
}
