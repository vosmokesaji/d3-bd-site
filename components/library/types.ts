export type OfficialProperty = {
  kind: "property";
  icon: "bullet" | "utility" | "none";
  text: string;
};

export type OfficialPropertyChoice = {
  kind: "choice";
  count: number | null;
  label: string;
  options: OfficialProperty[];
};

export type OfficialPropertyNode = OfficialProperty | OfficialPropertyChoice;

export type OfficialItemSet = {
  name: string | null;
  items: { id: string; name: string; source: string; current: boolean }[];
  bonuses: { pieces: number; lines: OfficialProperty[] }[];
};

export type OfficialItemRecord = {
  schemaVersion?: number;
  id: string;
  name: string;
  image: string;
  source?: string;
  imageSource?: string;
  classId?: string;
  className?: string;
  kind?: "active" | "passive";
  category?: string;
  categoryName?: string;
  group?: "armor" | "weapons" | "other";
  quality?: "common" | "crafted" | "legendary" | "set";
  crafted?: boolean;
  requiredLevel?: number | null;
  type?: string;
  slot?: string;
  classes?: string[];
  followers?: string[];
  artisans?: string[];
  craftedBy?: string;
  armorWeapon?: string;
  properties?: {
    primary: OfficialPropertyNode[];
    secondary: OfficialPropertyNode[];
    other: OfficialPropertyNode[];
  };
  legendaryPower?: string;
  set?: OfficialItemSet;
  extras?: string[];
  flavor?: string;
  runes?: { key: string; name: string }[];
};

export type OfficialItemIndexRecord = Pick<OfficialItemRecord, "id" | "name" | "image" | "category"> & {
  assetKey: string;
  categoryName?: string;
  group?: "armor" | "weapons" | "other";
  quality?: "common" | "crafted" | "legendary" | "set";
  crafted?: boolean;
  requiredLevel?: number | null;
  type?: string;
  classes?: string[];
  followers?: string[];
  artisans?: string[];
  legendaryPower?: string;
};
