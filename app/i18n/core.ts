import clientTerms from './client-terms.json';
import siteTerms from './site-terms.json';
import clientTexts from './client-texts.json';
import termMappings from './term-mappings.json';
import sourceIndex from './source-index.json';
import zhCN from './zhCN.json';
import zhTW from './zhTW.json';
import enUS from './enUS.json';

export const LOCALES = ['zhCN', 'zhTW', 'enUS'] as const;
export type Locale = typeof LOCALES[number];
export const LANGUAGE_NAMES: Record<Locale, string> = { zhCN: '简体中文', zhTW: '繁體中文', enUS: 'English' };
export const HTML_LANG: Record<Locale, string> = { zhCN: 'zh-CN', zhTW: 'zh-TW', enUS: 'en-US' };
export function isLocale(value: unknown): value is Locale { return LOCALES.includes(value as Locale); }
export function localeFromCookie(cookie: string | null): Locale {
  const value = cookie?.match(/(?:^|;\s*)d3-locale=(zhCN|zhTW|enUS)(?:;|$)/)?.[1];
  return isLocale(value) ? value : 'zhCN';
}
const terms = clientTerms as Record<string, Record<Locale, string | null>>;
const mappings = termMappings as { items: Record<string,string>; skills: Record<string,string>; images: Record<string,string>; aliases: Record<string,string>; runes: Record<string,Record<string,string>> };
const index = sourceIndex as Record<string,string>;
const officialTexts = clientTexts as Record<string, Record<Locale,string>>;
const dictionaries: Record<Locale, Record<string,string | null>> = { zhCN, zhTW, enUS };
const pending = {zhCN:'译文待补齐',zhTW:'譯文待補齊',enUS:'Translation pending'};
const pendingRune = {zhCN:'符文待核对',zhTW:'符文待核對',enUS:'Rune mapping pending'};
const pendingName = {zhCN:'译名待核对',zhTW:'譯名待核對',enUS:'Name pending verification'};
const normalize = (value: string) => value.trim().replace(/\s+/g, ' ');
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const templates = Object.entries(index).filter(([source]) => /\{\d+\}/.test(source) && source.replace(/\{\d+\}/g,'').length >= 2).map(([source,id]) => {
  const slots: string[] = [];
  const pattern = source.split(/(\{\d+\})/g).map(part => /^\{\d+\}$/.test(part) ? (slots.push(part.slice(1,-1)), '([\\s\\S]*?)') : escape(part)).join('');
  return { id, slots, pattern: new RegExp('^'+pattern+'$'), specificity: source.replace(/\{\d+\}/g,'').length };
}).sort((a,b)=>b.specificity-a.specificity);

/** Names only. Formulas, markup, null and another Chinese region are never fallback text. */
export function term(id: string, locale: Locale): string {
  const number = /^Number\/(\d+(?:\.\d+)?)\/(wan|yi|yard)$/.exec(id);
  if(number){
    const [,literal,unit]=number;
    if(locale!=='enUS')return literal+({wan:locale==='zhTW'?'萬':'万',yi:locale==='zhTW'?'億':'亿',yard:locale==='zhTW'?'碼':'码'}[unit]);
    return unit==='yard'?`${literal} yards`:new Intl.NumberFormat('en-US',{maximumFractionDigits:8}).format(Number(literal)*(unit==='wan'?10000:100000000));
  }
  if(id.startsWith('Site/')) return (siteTerms as Record<string,Record<Locale,string>>)[id.slice(5)]?.[locale] ?? pending[locale];
  const value = terms[id]?.[locale];
  if (value && !/[{}<>]|\b(?:DNT|PH|NYI)\b/.test(value)) { localizedOutput[locale].add(normalize(value)); return value; }
  const english = terms[id]?.enUS;
  return `${pendingName[locale]}${english && !/[{}<>]/.test(english) ? ` (${english})` : ''}`;
}
export function resolveRuneKey(value: { image?: string; rune?: string; runeKey?: string }): string {
  const runes = mappings.runes[value.image ?? ''];
  if (!runes || !value.rune || /全符文|全部符文|无符文|按需|自选|任意/.test(value.rune)) return 'none';
  const ref = runes[`alias:${value.rune}`];
  const key = Object.keys(runes).find(key => key.length === 1 && (runes[key] === ref || LOCALES.some(locale => terms[runes[key]]?.[locale] === value.rune)));
  return key ?? 'none';
}
const localizedOutput: Record<Locale, Set<string>> = {zhCN: new Set(), zhTW: new Set(), enUS: new Set()};
export function createTranslator(locale: Locale) {
  const cache = new Map<string,string>();
  function render(value: string, params: Record<string,unknown>, depth: number): string {
    return value.replace(/\[\[([^\]]+)\]\]/g, (match,id:string,offset:number) => {
      const label=term(id,locale);
      if(locale!=='enUS')return label;
      const before=value[offset-1]??'',after=value[offset+match.length]??'';
      return `${/[A-Za-z0-9%\]]/.test(before)?' ':''}${label}${/[A-Za-z0-9\[]/.test(after)?' ':''}`;
    })
      .replace(/\{(\d+)\}/g, (_,key:string) => params[key] == null ? pending[locale] : translate(String(params[key]),depth+1)).replace(/ {2,}/g,' ').trim();
  }
  function t(id: string, params: Record<string,unknown> = {}, depth = 0): string {
    const value = officialTexts[id]?.[locale] ?? dictionaries[locale][id];
    if (!value || /ZXQ\d+XZ|Script Formula|\{(?:VALUE|c[:_])/.test(value)) return pending[locale];
    const result = render(value,params,depth);
    if(!result.includes(pending[locale])) localizedOutput[locale].add(normalize(result));
    return result;
  }
  function translate(source: string, depth = 0): string {
    if (!source || depth > 8) return source ? pending[locale] : '';
    const normalized = normalize(source);
    if(localizedOutput[locale].has(normalized)) return source;
    const cached=cache.get(normalized);if(cached!==undefined)return cached;
    if(mappings.aliases[normalized])return term(mappings.aliases[normalized],locale);
    const id=index[normalized];
    if(id){const result=t(id,{},depth);cache.set(normalized,result);return result;}
    const count = normalized.match(/^(.*?)(\s*×\s*\d+)$/);
    if(count) return `${translate(count[1],depth+1)}${count[2]}`;
    const sentences = normalized.split(/(?<=。)\s+/);
    if(sentences.length>1 && sentences.every(piece=>index[piece])) return sentences.map(piece=>translate(piece,depth+1)).join(' ');
    const stat = /^([+−-]?(?:\d+(?:\.\d+)?%?|\[[\d., +–—%-]+\]%?))\s*(.+)$/.exec(normalized);
    if(stat && mappings.aliases[stat[2]]) return `${stat[1]} ${term(mappings.aliases[stat[2]],locale)}`;
    for(const template of templates){const match=template.pattern.exec(normalized);if(match){const params=Object.fromEntries(template.slots.map((key,i)=>[key,match[i+1]]));const result=t(template.id,params,depth);if(!result.includes(pending[locale]))return result;}}
    // Joins in view models retain their separators; translate the independently registered pieces.
    for (const separator of [' · ', '\n', ' / ', ' → ', '；', '：', ': ']) {
      if(normalized.includes(separator)){
        const pieces=normalized.split(separator);
        if(pieces.every(piece=>!/[\p{Script=Han}]/u.test(piece)||index[normalize(piece)]||mappings.aliases[normalize(piece)]))return pieces.map(piece=>translate(piece,depth+1)).join(locale==='enUS'&&separator==='：'?': ':separator);
      }
    }
    if(/[\p{Script=Han}]|\[\[|\{[A-Za-z]/u.test(normalized))return pending[locale];
    return source;
  }
  /** Localize at the display boundary. IDs, routing, comparisons and source data stay unchanged. */
  function tr<T>(value: T): T {
    if(typeof value==='string')return translate(value) as T;
    if(Array.isArray(value))return value.map(tr) as T;
    return value;
  }
  function entity(value: unknown, field = 'name'): string {
    if(!value || typeof value !== 'object')return '';
    const record=value as {id?:string;image?:string;name?:string;rune?:string;runeKey?:string;[key:string]:unknown};
    const raw=record[field];if(typeof raw!=='string')return '';
    if (typeof record.set === "string" && record.core) return translate(raw);
    if(field==='rune'){
      const runes=mappings.runes[record.image??''];
      const ref=runes?.[`alias:${raw}`];
      if(ref)return term(ref,locale);
      const key=resolveRuneKey(record);if(key!=='none')return term(runes[key],locale);
      if(/全符文|全部符文|无符文|按需|自选|任意/.test(raw))return translate(raw);
      if(raw.includes(' / ')&&runes){return raw.split(' / ').map(part=>entity({...record,rune:part},'rune')).join(' / ');}
      return pendingRune[locale];
    }
    const ref=mappings.items[record.id??'']??mappings.skills[record.id??'']??mappings.images[record.image??''];
    if (!ref) return translate(raw);
    if (mappings.aliases[raw] === ref || LOCALES.some(l=>terms[ref]?.[l] === raw)) return term(ref,locale);
    const count = raw.match(/(\s*×\s*\d+)$/)?.[1] ?? '';
    const base = count ? raw.slice(0,-count.length) : raw;
    const annotation = base.match(/^([^：:]+)[：:](.+)$/);
    if (annotation && mappings.aliases[annotation[1]] === ref) return `${term(ref,locale)}${locale === 'enUS' ? ': ' : '：'}${translate(annotation[2])}${count}`;
    return term(ref,locale) + count;
  }
  function matches(query: string, ...values: unknown[]): boolean {
    const needle=normalize(query).toLocaleLowerCase(HTML_LANG[locale]);
    if(!needle)return true;
    return values.some(value=>{
      const text=typeof value==='string'?translate(value):entity(value);
      return text.toLocaleLowerCase(HTML_LANG[locale]).includes(needle);
    });
  }
  return { t, tr, entity, matches, locale };
}
