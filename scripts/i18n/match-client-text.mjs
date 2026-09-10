/** Exact full-text/template matching, not fuzzy translation or formula evaluation. */
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const root=process.argv[2]||'work/d3-client-i18n-2026-09-08';
const clients={zhCN:read(`${root}/json/d3cn/zhCN.json`),zhTW:read(`${root}/json/d3/zhTW.json`),enUS:read(`${root}/json/d3/enUS.json`)};
const locales=Object.keys(clients), corpus=read('scripts/i18n/message-definitions.json');
const tables=['AttributeDescriptions','ItemPassivePowerDescriptions','ItemFlavor','ItemDescriptions','ItemInstructions','ItemTypeNames','ItemSlots','ItemQuality','HeroDetails','SkillsUI','Powers','Bnet_Classes','LevelAreaNames','QuestLog'];
const clean=s=>s.replace(/\{\/?c(?:_[a-z_]+|:[a-f\d]+)?\}/gi,'').replace(/<br\s*\/?\s*>/gi,' ').replace(/<\/?(?:span|p|b|i|strong)(?:\s+[^<>]*)?>/gi,'').replace(/\|4([^:;]+):([^;]+);/g,'$2').trim();
const normalize=s=>s.replace(/[\s\u200b]+/g,'').replace(/[。.!！]+$/g,'').replaceAll('（','(').replaceAll('）',')').replaceAll('％','%').replaceAll('＋','+').replace(/[“”]/g,'"').replace(/[‘’]/g,"'");
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
// A balanced square-bracket expression containing a known placeholder represents an
// already-rendered numeric value. Capture that value from the site; never evaluate it.
const token=/\[(?:[^\[\]]*\{(?:value\d*|script formula \d+|s\d+)\}[^\[\]]*)\]|\{(?:value\d*|script formula \d+|s\d+)\}/gi;
function parse(raw){
 if(typeof raw!=='string'||!raw.trim())return null;
 const text=clean(raw),parts=[],slots=[];let cursor=0;
 for(const m of text.matchAll(token)){
   const key=m[0].replace(/[\s]/g,'').toLowerCase().replace(/\|[^\]]*/g,'').replace(/[^a-z\d*+\-/]/g,'');
   parts.push(text.slice(cursor,m.index),{key});slots.push(key);cursor=m.index+m[0].length;
 }
 parts.push(text.slice(cursor));
 if(parts.some(p=>typeof p==='string'&&/[{}<>]|\|\d|\b(?:DNT|PH|NYI)\b/.test(p)))return null;
 const regex=new RegExp('^'+parts.map(p=>typeof p==='string'?escape(normalize(p)):'([+\\-]?(?:\\[[\\d.,+–—%\\-]+\\]|[\\d.,]+))').join('')+'$');
 const fixed=parts.filter(p=>typeof p==='string').join('').match(/\d+(?:\.\d+)?/g)||[];
 return {text,parts,slots,regex,fixed};
}
const exact=new Map(),patterns=[];
for(const table of tables)for(const key of Object.keys(clients.enUS[table]||{})){
 const parsed=Object.fromEntries(locales.map(l=>[l,parse(clients[l][table]?.[key])]));
 if(locales.some(l=>!parsed[l]))continue;
 // Different literal numbers or formula identities signal version/content differences.
 if(new Set(locales.map(l=>JSON.stringify([...parsed[l].fixed].sort()))).size!==1)continue;
 if(new Set(locales.map(l=>JSON.stringify([...parsed[l].slots].sort()))).size!==1)continue;
 const candidate={ref:`${table}/${key}`,parsed};
 for(const lang of ['zhCN','zhTW']){
   const p=parsed[lang];
   if(!p.slots.length){const s=normalize(p.text);const list=exact.get(s)||[];list.push({...candidate,lang});exact.set(s,list);}
   else if(p.parts.filter(x=>typeof x==='string').join('').length>=3)patterns.push({...candidate,lang});
 }
}
function render(candidate,bindings){return Object.fromEntries(locales.map(locale=>[locale,candidate.parsed[locale].parts.map(p=>typeof p==='string'?p:bindings[p.key]).join('')]));}
const matches={},issues=[];
for(const [id,entry]of Object.entries(corpus)){
 const s=normalize(entry.source);let candidates=(exact.get(s)||[]).map(c=>({...c,bindings:{}}));
 if(!candidates.length&&/\d/.test(s))for(const c of patterns){const m=c.parsed[c.lang].regex.exec(s);if(m){const bindings={};let valid=true;c.parsed[c.lang].slots.forEach((k,i)=>{if(bindings[k]&&bindings[k]!==m[i+1])valid=false;bindings[k]=m[i+1];});if(valid)candidates.push({...c,bindings});}}
 if(!candidates.length)continue;
 const variants=new Map();for(const c of candidates){const values=render(c,c.bindings);const signature=JSON.stringify(locales.map(l=>normalize(values[l])));variants.set(signature,{source:entry.source,values,ref:c.ref,sourceLocale:c.lang,bindings:c.bindings,candidates:candidates.map(x=>x.ref)});}
 if(variants.size===1)matches[id]=[...variants.values()][0];
 else issues.push({id,source:entry.source,candidates:[...new Set(candidates.map(x=>x.ref))],reason:'Same rendered source, different localized meanings. No automatic selection.'});
}
// Item quality/type composition is specified by the client's FormatString.
for (const [id,entry] of Object.entries(corpus)) {
 if(matches[id]) continue;
 const variants=new Map();
 for(const language of ['zhCN','zhTW']) for(const [quality,q] of Object.entries(clients[language].ItemQuality)) {
  if(/[{}]/.test(q)||quality==='FormatString')continue;
  for(const [type,label] of Object.entries(clients[language].ItemTypeNames)) {
   const raw=clients[language].ItemQuality.FormatString.replace('{s1}',q).replace('{s2}',label);
   if(normalize(raw)!==normalize(entry.source))continue;
   const values=Object.fromEntries(locales.map(l=>[l,clients[l].ItemQuality.FormatString.replace('{s1}',clients[l].ItemQuality[quality]).replace('{s2}',clients[l].ItemTypeNames[type])]));
   if(Object.values(values).some(v=>/undefined|null|[{}]/.test(v)))continue;
   variants.set(JSON.stringify(values),{source:entry.source,values,ref:'ItemQuality/FormatString',sourceLocale:language,bindings:{s1:'ItemQuality/'+quality,s2:'ItemTypeNames/'+type},candidates:['ItemQuality/FormatString']});
  }
 }
 if(variants.size===1)matches[id]=[...variants.values()][0];
}
// The source mirror labels an armor rating with its item group (防具).
// Scope this correction to armorWeapon fields of armor items, preserving every number.
const armorRatings = new Set(read('public/d3/library/items.json').filter(item=>item.group==='armor').map(item=>item.armorWeapon?.trim().replace(/\s+/g,' ')).filter(Boolean));
for(const [id,entry] of Object.entries(corpus)) {
 if(!armorRatings.has(entry.source))continue;
 const rating=/^([\d., -]+) 防具$/.exec(entry.source)?.[1];
 if(!rating)continue;
 const ref='HeroDetails/Armor';
 const values=Object.fromEntries(locales.map(l=>[l,`${rating} ${clients[l].HeroDetails.Armor}`]));
 matches[id]={source:entry.source,values,ref,sourceLocale:'zhTW',bindings:{siteArmorRating:rating},candidates:[ref],method:'armorWeapon field + official armor-rating label; site numbers retained'};
}
fs.writeFileSync('scripts/i18n/client-message-matches.json',JSON.stringify(matches,null,2)+'\n');
fs.writeFileSync('app/i18n/client-texts.json',JSON.stringify(Object.fromEntries(Object.entries(matches).map(([id,x])=>[id,x.values])))+'\n');
fs.writeFileSync('docs/i18n/client-text-matches.json',JSON.stringify({policy:'Exact full-text or exact numeric-template match. Captured numeric strings are reused, formulas are never evaluated. All three clients must have identical literal numbers and placeholder identities.',matched:Object.keys(matches).length,byTable:Object.fromEntries(Object.entries(Object.groupBy(Object.values(matches),x=>x.ref.split('/')[0])).map(([k,v])=>[k,v.length])),entries:matches,ambiguous:issues},null,2)+'\n');
console.log('Official full-text matches',Object.keys(matches).length,'ambiguous',issues.length,'patterns',patterns.length);
