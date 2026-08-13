"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CLASS_CATALOG, type ClassId } from "../../app/data/site-catalog";

export type HeroGender = "female" | "male";

const SETTINGS_KEY = "sanctuary-site-settings";
const SETTINGS_VERSION = 2;
const LEGACY_SETTINGS_KEYS = ["sanctuary-site-settings-v1"];

export const DEFAULT_HERO_GENDERS: Record<ClassId, HeroGender> = {
  barbarian: "female",
  crusader: "female",
  "demon-hunter": "female",
  monk: "female",
  necromancer: "female",
  "witch-doctor": "female",
  wizard: "female",
};

type StoredSiteSettings = {
  version: number;
  genders: Record<ClassId, HeroGender>;
};

type SiteSettingsValue = {
  genders: Record<ClassId, HeroGender>;
  openSettings: () => void;
  setClassGender: (classId: ClassId, gender: HeroGender) => void;
  setAllGenders: (gender: HeroGender) => void;
};

const SiteSettingsContext = createContext<SiteSettingsValue | null>(null);

function normalizeGenders(value?: Partial<Record<ClassId, HeroGender>>) {
  return Object.fromEntries(CLASS_CATALOG.map(({ id }) => [id, value?.[id] === "male" ? "male" : "female"])) as Record<ClassId, HeroGender>;
}

function parseStoredSettings(raw: string | null): StoredSiteSettings | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { version?: number; genders?: Partial<Record<ClassId, HeroGender>> };
    return { version: SETTINGS_VERSION, genders: normalizeGenders(parsed.genders) };
  } catch {
    return null;
  }
}

function readStoredSettings() {
  const current = parseStoredSettings(window.localStorage.getItem(SETTINGS_KEY));
  if (current) return current;
  for (const legacyKey of LEGACY_SETTINGS_KEYS) {
    const legacy = parseStoredSettings(window.localStorage.getItem(legacyKey));
    if (legacy) return legacy;
  }
  return { version: SETTINGS_VERSION, genders: DEFAULT_HERO_GENDERS } satisfies StoredSiteSettings;
}

function writeStoredSettings(genders: Record<ClassId, HeroGender>) {
  const settings = { version: SETTINGS_VERSION, genders } satisfies StoredSiteSettings;
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  LEGACY_SETTINGS_KEYS.forEach((key) => window.localStorage.removeItem(key));
}

export function useSiteSettings() {
  const value = useContext(SiteSettingsContext);
  if (!value) throw new Error("useSiteSettings must be used inside SiteSettingsProvider");
  return value;
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [genders, setGenders] = useState<Record<ClassId, HeroGender>>(DEFAULT_HERO_GENDERS);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredSettings();
    setGenders(stored.genders);
    writeStoredSettings(stored.genders);
    const syncAcrossTabs = (event: StorageEvent) => {
      if (event.key !== SETTINGS_KEY) return;
      const next = parseStoredSettings(event.newValue);
      if (next) setGenders(next.genders);
    };
    window.addEventListener("storage", syncAcrossTabs);
    return () => window.removeEventListener("storage", syncAcrossTabs);
  }, []);

  const saveGenders = (next: Record<ClassId, HeroGender>) => {
    setGenders(next);
    writeStoredSettings(next);
  };

  const value: SiteSettingsValue = {
    genders,
    openSettings: () => setSettingsOpen(true),
    setClassGender: (classId, gender) => saveGenders({ ...genders, [classId]: gender }),
    setAllGenders: (gender) => saveGenders(Object.fromEntries(CLASS_CATALOG.map((hero) => [hero.id, gender])) as Record<ClassId, HeroGender>),
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
      {settingsOpen && (
        <div className="site-settings-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSettingsOpen(false); }}>
          <section className="site-settings-dialog" role="dialog" aria-modal="true" aria-labelledby="site-settings-title">
            <header>
              <div><span>SITE SETTINGS</span><h2 id="site-settings-title">网站设置</h2></div>
              <button onClick={() => setSettingsOpen(false)} aria-label="关闭网站设置">×</button>
            </header>
            <div className="settings-all-genders">
              <span><strong>一键切换全部职业</strong><small>之后仍可单独覆盖某个职业</small></span>
              <div><button onClick={() => value.setAllGenders("female")}>全部女性</button><button onClick={() => value.setAllGenders("male")}>全部男性</button></div>
            </div>
            <div className="settings-class-genders">
              {CLASS_CATALOG.map((hero) => (
                <article key={hero.id}>
                  <img src={hero.portrait} alt="" />
                  <span><strong>{hero.name}</strong><small>BD 装备盘背景</small></span>
                  <div role="group" aria-label={`${hero.name}性别`}>
                    <button className={genders[hero.id] === "female" ? "active" : ""} onClick={() => value.setClassGender(hero.id, "female")}>女性</button>
                    <button className={genders[hero.id] === "male" ? "active" : ""} onClick={() => value.setClassGender(hero.id, "male")}>男性</button>
                  </div>
                </article>
              ))}
            </div>
            <footer><small>设置已版本化保存，并在同一浏览器的多个标签页间同步。</small><button onClick={() => setSettingsOpen(false)}>完成</button></footer>
          </section>
        </div>
      )}
    </SiteSettingsContext.Provider>
  );
}
