export type GearQuality = "set" | "legendary";

export type GearSocket = {
  image: string;
  label: string;
};

export type BuildGear = {
  id: string;
  name: string;
  slot: string;
  image: string;
  quality: GearQuality;
  effect: string;
  affixes: string[];
  acquisition: string[];
  warning?: string;
};

export type BuildFlowNode = {
  id: string;
  label: string;
  detail: string;
  kind: "skill" | "rune" | "passive" | "gear" | "power" | "set" | "effect" | "damage" | "defense" | "movement";
  image?: string;
};

export type AbilityCard = {
  id: string;
  name: string;
  image: string;
  logic: string;
  rune?: string;
  runeId?: string;
  runeLogic?: string;
  runeKey?: "a" | "b" | "c" | "d" | "e" | "none";
};

export type CubePowerCard = {
  id: string;
  slot: string;
  name: string;
  image: string;
  original: string;
  summary: string;
};
