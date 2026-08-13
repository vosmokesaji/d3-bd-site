import type { ClassId } from "./site-catalog";

export const D3_ASSET_ROOT = "/d3";
export const D3_LIBRARY_ROOT = `${D3_ASSET_ROOT}/library`;
export const D3_ITEM_ROOT = `${D3_LIBRARY_ROOT}/items`;
export const D3_SKILL_ROOT = `${D3_LIBRARY_ROOT}/skills`;

export const d3Asset = (file: string) => file.startsWith("/") ? file : `${D3_ASSET_ROOT}/${file}`;
export const itemAsset = (file: string) => file.startsWith("/") ? file : `${D3_ITEM_ROOT}/${file}`;
export const skillAsset = (classId: ClassId, kind: "active" | "passive", id: string) => `${D3_SKILL_ROOT}/${classId}-${kind}-${id}.png`;
export const paperdollAsset = (classId: ClassId, gender: "female" | "male") => `${D3_ASSET_ROOT}/paperdolls/${classId}-${gender}.jpg`;
export const classPortraitAsset = (classId: ClassId) => `${D3_LIBRARY_ROOT}/classes/${classId}-portrait.png`;
export const classCrestAsset = (classId: ClassId) => `${D3_LIBRARY_ROOT}/classes/${classId}-crest.png`;
