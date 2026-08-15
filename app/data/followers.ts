import type { DiabloItemQuality } from "../../components/items/DiabloItemFrame";

export type FollowerKey = "enchantress" | "scoundrel" | "templar";
export type FollowerSlotKey =
  | "head"
  | "shoulders"
  | "chest"
  | "gloves"
  | "bracers"
  | "belt"
  | "pants"
  | "boots"
  | "amulet"
  | "ring1"
  | "ring2"
  | "weapon"
  | "offhand"
  | "token";

export type FollowerItem = {
  name: string;
  image: string;
  slot: string;
  position: FollowerSlotKey;
  reason: string;
  quality?: DiabloItemQuality;
};

export type FollowerDefinition = {
  key: FollowerKey;
  name: string;
  role: string;
  note: string;
  model: string;
  emptySlotLabels: Partial<Record<FollowerSlotKey, string>>;
  items: FollowerItem[];
};

export const FOLLOWER_SLOT_ORDER: FollowerSlotKey[] = [
  "head",
  "shoulders",
  "chest",
  "gloves",
  "bracers",
  "belt",
  "pants",
  "boots",
  "amulet",
  "ring1",
  "ring2",
  "weapon",
  "offhand",
  "token",
];

const SHARED_ARMOR: FollowerItem[] = [
  { name: "破碎王冠", image: "/d3/broken-crown.png", slot: "头部", position: "head", reason: "额外掉落插入头盔的宝石" },
  { name: "归乡护肩", image: "/d3/homing-pads.png", slot: "肩部", position: "shoulders", reason: "传送回城时获得保护" },
  { name: "金皮", image: "/d3/goldskin.png", slot: "胸部", position: "chest", reason: "T16 额外掉金，触发金织带" },
  { name: "礼赞手套", image: "/d3/gloves-worship.png", slot: "手部", position: "gloves", reason: "神殿效果持续 10 分钟" },
  { name: "复仇者护腕", image: "/d3/nemesis-bracers.png", slot: "腕部", position: "bracers", reason: "点塔额外生成精英" },
  { name: "谢尔曼缠腰", image: "/d3/cord-sherma.png", slot: "腰部", position: "belt", reason: "范围致盲和减速" },
  { name: "凯恩法裤", image: "/d3/cains-habit.png", slot: "腿部", position: "pants", reason: "套装效果提高大秘境钥匙掉落", quality: "set" },
  { name: "贤者之旅", image: "/d3/sages-passage.png", slot: "脚部", position: "boots", reason: "套装效果提高死亡之息掉落", quality: "set" },
  { name: "时光流韵", image: "/d3/flavor-time.png", slot: "颈部", position: "amulet", reason: "塔效果持续时间翻倍" },
  { name: "神目指环", image: "/d3/oculus-ring.png", slot: "戒指", position: "ring1", reason: "击杀后生成地面增伤圈" },
  { name: "团结", image: "/d3/unity.png", slot: "戒指", position: "ring2", reason: "角色也佩戴团结时分摊伤害" },
];

export const FOLLOWERS: Record<FollowerKey, FollowerDefinition> = {
  enchantress: {
    key: "enchantress",
    name: "魔女",
    role: "冷却与攻速",
    note: "预知和谐缩短技能冷却，集中心智提高攻速；对持续引导和周期爆发构筑最直接。",
    model: "/d3/follower-enchantress-model.png",
    emptySlotLabels: { offhand: "副手" },
    items: [
      ...SHARED_ARMOR,
      { name: "盲信之沙", image: "/d3/sultan-blinding-sand.png", slot: "武器", position: "weapon", reason: "高几率致盲，补充控制" },
      { name: "烟熏香炉", image: "/d3/smoking-thurible.png", slot: "魔女法器", position: "token", reason: "随从不会死亡" },
    ],
  },
  scoundrel: {
    key: "scoundrel",
    name: "盗贼",
    role: "暴击增益",
    note: "适合需要额外暴击窗口的玩法；远程攻击也更容易维持他的增益覆盖。",
    model: "/d3/follower-scoundrel-model.png",
    emptySlotLabels: { offhand: "副手" },
    items: [
      ...SHARED_ARMOR,
      { name: "布里萨·多·凯南", image: "/d3/buriza.png", slot: "武器", position: "weapon", reason: "穿透并控制远处敌人" },
      { name: "骷髅钥匙", image: "/d3/skeleton-key.png", slot: "盗贼徽记", position: "token", reason: "随从不会死亡" },
    ],
  },
  templar: {
    key: "templar",
    name: "圣殿骑士",
    role: "治疗与保命",
    note: "更适合开荒期坚韧不足时使用；装备成型后再换成更匹配输出循环的随从。",
    model: "/d3/follower-templar-model.png",
    emptySlotLabels: {},
    items: [
      ...SHARED_ARMOR,
      { name: "雷霆之怒", image: "/d3/thunderfury.png", slot: "武器", position: "weapon", reason: "连锁减速，稳定控场" },
      { name: "折射成冰", image: "/d3/freeze-deflection.png", slot: "盾牌", position: "offhand", reason: "格挡时冻结攻击者" },
      { name: "附魔之恩", image: "/d3/enchanting-favor.png", slot: "圣殿骑士圣物", position: "token", reason: "随从不会死亡" },
    ],
  },
};

export const FOLLOWER_SKILLS: Record<FollowerKey, { name: string; image: string }[]> = {
  enchantress: [
    { name: "时空脉冲", image: "/d3/follower-skill-enchantress-temporal.png" },
    { name: "先知协调", image: "/d3/follower-skill-enchantress-harmony.png" },
    { name: "强固护盾", image: "/d3/follower-skill-enchantress-erosion.png" },
    { name: "命运失误", image: "/d3/follower-skill-enchantress-fate.png" },
  ],
  scoundrel: [
    { name: "致残射击", image: "/d3/follower-skill-scoundrel-crippling.png" },
    { name: "解剖", image: "/d3/follower-skill-scoundrel-anatomy.png" },
    { name: "多重射击", image: "/d3/follower-skill-scoundrel-multishot.png" },
    { name: "消失", image: "/d3/follower-skill-scoundrel-vanish.png" },
  ],
  templar: [
    { name: "治疗", image: "/d3/follower-skill-templar-heal.png" },
    { name: "忠诚", image: "/d3/follower-skill-templar-loyalty.png" },
    { name: "冲锋", image: "/d3/follower-skill-templar-charge.png" },
    { name: "守护者", image: "/d3/follower-skill-templar-guardian.png" },
  ],
};
