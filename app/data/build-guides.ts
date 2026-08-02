export type BuildMode = "push" | "speed";
export type BuildParagon = "low" | "high";

export type GuideGear = {
  id: string;
  slot: string;
  name: string;
  image: string;
  quality: "set" | "legendary";
  effect: string;
  affixes: string[];
  acquisition: string[];
  warning?: string;
  gem?: { name: string; image: string };
};

export type GuideAbility = {
  id: string;
  name: string;
  rune?: string;
  image: string;
  logic: string;
};

export type GuidePower = {
  id: string;
  slot: string;
  name: string;
  image: string;
  effect: string;
  logic: string;
  acquisition: string;
};

export type GuideLink = {
  title: string;
  category: "damage" | "defense" | "resource" | "movement";
  steps: { id: string; label: string; detail: string }[];
  conclusion: string;
};

export type BuildGuide = {
  id: string;
  name: string;
  set: string;
  core: string;
  summary: string;
  difficulty: string;
  follower: "魔女" | "盗贼" | "圣殿骑士";
  followerReason: string;
  gear: GuideGear[];
  skills: GuideAbility[];
  passives: GuideAbility[];
  powers: GuidePower[];
  variants: Record<BuildMode | BuildParagon, { title: string; note: string; changes: string[] }>;
  links: GuideLink[];
  rotation: { title: string; action: string; reason: string }[];
  source: string;
};
