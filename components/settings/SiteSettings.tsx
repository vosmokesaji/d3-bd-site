"use client";

import { isLocale, LANGUAGE_NAMES, LOCALES, type Locale } from "../../app/i18n/core";
import { useI18n } from "../../app/i18n/I18nProvider";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CLASS_CATALOG, type ClassId } from "../../app/data/site-catalog";
import { CURRENT_SEASON, SEASON_CATALOG, seasonById, type SeasonConfig } from "../../app/data/season-config";

export type HeroGender = "female" | "male";

const SETTINGS_KEY = "sanctuary-site-settings";
const SETTINGS_VERSION = 4;
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
  seasonId: string;
  locale: Locale;
};

type SiteSettingsValue = {
  genders: Record<ClassId, HeroGender>;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  season: SeasonConfig;
  openSettings: () => void;
  setSeason: (seasonId: string) => void;
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
    const parsed = JSON.parse(raw) as { version?: number; genders?: Partial<Record<ClassId, HeroGender>>; seasonId?: string; locale?: unknown };
    return { version: SETTINGS_VERSION, genders: normalizeGenders(parsed.genders), seasonId: seasonById(parsed.seasonId).seasonId, locale: isLocale(parsed.locale) ? parsed.locale : "zhCN" };
  } catch {
    return null;
  }
}

function readStoredSettings(defaultLocale: Locale) {
  // Storage can be unavailable in private mode; keep the page usable.
  try {
  const current = parseStoredSettings(window.localStorage.getItem(SETTINGS_KEY));
  if (current) return current;
  for (const legacyKey of LEGACY_SETTINGS_KEYS) {
    const legacy = parseStoredSettings(window.localStorage.getItem(legacyKey));
    if (legacy) return legacy;
  }
  return { version: SETTINGS_VERSION, genders: DEFAULT_HERO_GENDERS, seasonId: CURRENT_SEASON.seasonId, locale: defaultLocale } satisfies StoredSiteSettings;
  } catch { return {version: SETTINGS_VERSION, genders: DEFAULT_HERO_GENDERS, seasonId: CURRENT_SEASON.seasonId, locale: defaultLocale}; }
}

function writeStoredSettings(genders: Record<ClassId, HeroGender>, seasonId: string, locale: Locale) {
  try {
  const settings = { version: SETTINGS_VERSION, genders, seasonId, locale } satisfies StoredSiteSettings;
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  LEGACY_SETTINGS_KEYS.forEach((key) => window.localStorage.removeItem(key));
  } catch { /* Preferences remain active for this page when storage is unavailable. */ }
}

export function useSiteSettings() {
  const value = useContext(SiteSettingsContext);
  if (!value) throw new Error("useSiteSettings must be used inside SiteSettingsProvider");
  return value;
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const { tr, t, entity, locale, setLocale } = useI18n();
  const [genders, setGenders] = useState<Record<ClassId, HeroGender>>(DEFAULT_HERO_GENDERS);
  const [seasonId, setSeasonId] = useState(CURRENT_SEASON.seasonId);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredSettings(locale);
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (isLocale(requested)) stored.locale = requested;
    setLocale(stored.locale);
    setGenders(stored.genders);
    setSeasonId(stored.seasonId);
    writeStoredSettings(stored.genders, stored.seasonId, stored.locale);
    const syncAcrossTabs = (event: StorageEvent) => {
      if (event.key !== SETTINGS_KEY) return;
      const next = parseStoredSettings(event.newValue);
      if (next) {
        setGenders(next.genders);
        setSeasonId(next.seasonId);
        setLocale(next.locale);
      }
    };
    window.addEventListener("storage", syncAcrossTabs);
    return () => window.removeEventListener("storage", syncAcrossTabs);
  }, []);

  const saveGenders = (next: Record<ClassId, HeroGender>) => {
    setGenders(next);
    writeStoredSettings(next, seasonId, locale);
  };

  const saveSeason = (nextSeasonId: string) => {
    const next = seasonById(nextSeasonId);
    setSeasonId(next.seasonId);
    writeStoredSettings(genders, next.seasonId, locale);
  };

  const value: SiteSettingsValue = {
    genders,
    locale,
    setLocale: (next) => { setLocale(next); writeStoredSettings(genders, seasonId, next); },
    season: seasonById(seasonId),
    openSettings: () => setSettingsOpen(true),
    setSeason: saveSeason,
    setClassGender: (classId, gender) => saveGenders({ ...genders, [classId]: gender }),
    setAllGenders: (gender) => saveGenders(Object.fromEntries(CLASS_CATALOG.map((hero) => [hero.id, gender])) as Record<ClassId, HeroGender>),
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {tr(children)}
      {settingsOpen && (
        <div className="site-settings-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSettingsOpen(false); }}>
          <section className="site-settings-dialog" role="dialog" aria-modal="true" aria-labelledby="site-settings-title">
            <header>
              <div><span>{t("app.234d97d9c6548031")}</span><h2 id="site-settings-title">{t("app.a7f3c0fcaeb4c7cb")}</h2></div>
              <button onClick={() => setSettingsOpen(false)} aria-label={tr("关闭网站设置")}>{t("app.8db71ed28b0f2f14")}</button>
            </header>
            <label className="settings-season-select settings-language-select">
              <span><strong>{tr("语言与游戏译名")}</strong><small>{tr("名称采用 PC 客户端译名；Switch 译名尚未核验。")}</small></span>
              <select value={locale} onChange={(event) => { if (isLocale(event.target.value)) value.setLocale(event.target.value); }} aria-label={tr("选择语言")}>
                {LOCALES.map((language) => <option key={language} value={language} lang={language === "zhCN" ? "zh-CN" : language === "zhTW" ? "zh-TW" : "en-US"}>{LANGUAGE_NAMES[language]}</option>)}
              </select>
            </label>
            <div className="settings-all-genders">
              <span><strong>{t("app.c939f9c52b26b58f")}</strong><small>{t("app.35722255b090d055")}</small></span>
              <div><button onClick={() => value.setAllGenders("female")}>{t("app.984abe4e432080f5")}</button><button onClick={() => value.setAllGenders("male")}>{t("app.69426546586a223c")}</button></div>
            </div>
            <label className="settings-season-select">
              <span><strong>{t("app.27e4ac189b46f36f")}</strong><small>{t("app.cf1f17287e7ce8a8")}</small></span>
              <select value={seasonId} onChange={(event) => value.setSeason(event.target.value)} aria-label={tr("选择赛季主题")}>
                {SEASON_CATALOG.map((season) => <option key={season.seasonId} value={season.seasonId}>{tr(season.label)}{tr(season.availability === "preview" ? "（预设）" : "")}</option>)}
              </select>
            </label>
            <div className="settings-class-genders">
              {CLASS_CATALOG.map((hero) => (
                <article key={hero.id}>
                  <img src={hero.portrait} alt="" />
                  <span><strong>{entity(hero, "name")}</strong><small>{t("app.dbe30d638249f49b")}</small></span>
                  <div role="group" aria-label={tr(`${hero.name}性别`)}>
                    <button className={genders[hero.id] === "female" ? "active" : ""} onClick={() => value.setClassGender(hero.id, "female")}>{t("app.6a7ffd13b8ffd8d6")}</button>
                    <button className={genders[hero.id] === "male" ? "active" : ""} onClick={() => value.setClassGender(hero.id, "male")}>{t("app.2fda6b57c855f91e")}</button>
                  </div>
                </article>
              ))}
            </div>
            <footer><small>{t("app.50688c6f2039681f")}</small><button onClick={() => setSettingsOpen(false)}>{t("app.c0b3fbff51ccc40b")}</button></footer>
          </section>
        </div>
      )}
    </SiteSettingsContext.Provider>
  );
}
