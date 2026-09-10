/** Offline, opt-in extraction. The normal build never reads work/. */
import fs from 'node:fs';
import path from 'node:path';
import { snapshotData } from './snapshot-data.mjs';
const root = process.argv[2] || 'work/d3-client-i18n-2026-09-08';
const read = p => JSON.parse(fs.readFileSync(p,'utf8'));
const clients = {zhCN:read(`${root}/json/d3cn/zhCN.json`),zhTW:read(`${root}/json/d3/zhTW.json`),enUS:read(`${root}/json/d3/enUS.json`)};
const locales = Object.keys(clients);
const terms = {}, mappings = {items:{},skills:{},images:{},aliases:{},runes:{}}, evidence = {}, issues = [];
const overrides = fs.existsSync('scripts/i18n/overrides.json') ? read('scripts/i18n/overrides.json') : {images:{},aliases:{},runes:{}};
const lowerKeys = Object.fromEntries(['Items','Powers','AttributeDescriptions'].map(table => [table, Object.fromEntries(Object.keys(clients.enUS[table]).map(key=>[key.toLowerCase(),key]))]));
const unsafe = /[{}<>]|\[(?![\d .,–—%-]+\])|\b(?:PH|DNT|TEST|TEMP|NYI)\b|^\s*$/i;
function add(table,key,why){
  if(!key) return null;
  const id = `${table}/${key}`;
  const translations = Object.fromEntries(locales.map(locale=>[locale,clients[locale][table]?.[key] ?? null]));
  for(const locale of locales) if(translations[locale] && unsafe.test(translations[locale])) {issues.push({type:'unsafe-name',id,locale}); translations[locale]=null;}
  if(!terms[id]) {terms[id]=translations;evidence[id]=[]; for(const locale of locales)if(!translations[locale])issues.push({type:'missing-client-translation',id,locale});}
  if(!evidence[id].includes(why))evidence[id].push(why);
  return id;
}
const aliases = new Map();
function alias(text,id){if(!text||!id||text.length<2)return;const set=aliases.get(text)||new Set();set.add(id);aliases.set(text,set);}
function itemKey(record){
  const suffix=record.id?.split('-').at(-1)?.toLowerCase();
  if(lowerKeys.Items[suffix])return lowerKeys.Items[suffix];
  const stem=path.basename(record.imageSource||record.image||'','.png').toLowerCase();
  const keys=Object.keys(lowerKeys.Items).filter(k=>stem===k||stem.startsWith(k+'_')||stem.endsWith('-'+k)).sort((a,b)=>b.length-a.length);
  return keys.length?lowerKeys.Items[keys[0]]:null;
}
const library=read('public/d3/library/items.json');
for(const item of library){
  const key=itemKey(item),id=key?add('Items',key,`item:${item.id}`):null;
  if(id){mappings.items[item.id]=id;if(item.image)mappings.images[item.image]=id;alias(item.name,id);}
  else issues.push({type:'unmapped-item',id:item.id,name:item.name,image:item.image});
  if(item.set?.name){
    const candidates=Object.keys(clients.enUS.ItemSets).filter(k=>clients.zhTW.ItemSets[k]===item.set.name);
    const groups=new Set(candidates.map(k=>JSON.stringify(locales.map(l=>clients[l].ItemSets[k]))));
    if(groups.size===1){const setId=add('ItemSets',candidates[0],`set membership:${item.id}`);alias(item.set.name,setId);}
    else if(groups.size>1)issues.push({type:'ambiguous-set',item:item.id,name:item.set.name,candidates});
  }
}
for(const skill of read('public/d3/library/skills.json')){
  const icon=path.basename(skill.imageSource,'.png');
  const power=lowerKeys.Powers[`${icon}_name`.toLowerCase()];
  if(!power){issues.push({type:'unmapped-skill',id:skill.id,icon});continue;}
  const id=add('Powers',power,`skill:${skill.id}; icon:${icon}`);
  mappings.skills[skill.id]=id;mappings.images[skill.image]=id;alias(skill.name,id);
  const runes={};
  for(const rune of skill.runes||[]){
    const key=lowerKeys.AttributeDescriptions[`namerune_${rune.key}#${power.slice(0,-5)}`.toLowerCase()];
    if(key){const rid=add('AttributeDescriptions',key,`rune:${skill.id}:${rune.key}`);runes[rune.key]=rid;alias(rune.name,rid);}
    else issues.push({type:'unmapped-rune',id:skill.id,key:rune.key,name:rune.name});
  }
  mappings.runes[skill.image]=runes;
}
for(const [image,ref]of Object.entries(overrides.images||{}))mappings.images[image]=add(...ref.split('/'),`reviewed asset:${image}`);
for (const [image,id] of Object.entries(mappings.images)) { const original = Object.keys(mappings.runes).find(p=>mappings.images[p]===id); if(original && !mappings.runes[image]) mappings.runes[image]={...mappings.runes[original]}; }
for(const [text,ref]of Object.entries(overrides.aliases||{}))alias(text,add(...ref.split('/'),`reviewed alias:${text}`));
// Legacy guide names are linked through assets/business IDs, never a fuzzy name search.
const snapshots=await snapshotData();
const siteAliases=new Map();
function siteAlias(text,id,where){const records=siteAliases.get(text)||[];records.push({id,where});siteAliases.set(text,records);alias(text,id);}
function visit(v,where){if(!v||typeof v!=='object')return;if(Array.isArray(v)){v.forEach((x,i)=>visit(x,`${where}[${i}]`));return;}
  if(v.image && (v.name||v.label) && !(typeof v.set === "string" && v.core)){
    let id=mappings.images[v.image];
    if(!id){const key=itemKey({id:v.id,image:v.image});if(key){id=add('Items',key,`guide asset:${v.image}`);mappings.images[v.image]=id;}}
    if(id){if(v.name || (v.kind !== 'rune' && !/\d|符文|[+]/.test(v.label))) siteAlias((v.name||v.label).split(/[：:]/)[0],id,where);
      if(v.rune){const rs=mappings.runes[v.image]||{};const explicit=overrides.runes?.[`${v.image}|${v.rune}`];const choices=Object.entries(rs).filter(([k,rid])=>k.length===1 && locales.some(l=>terms[rid][l]===v.rune));
        const exactKey=choices.length===1?choices[0][0]:null;
        const key=exactKey||explicit||v.runeKey;
        if(exactKey && v.runeKey && exactKey!==v.runeKey) issues.push({type:'legacy-rune-key-conflict',where,image:v.image,rune:v.rune,oldKey:v.runeKey,resolvedKey:exactKey,ref:rs[exactKey],resolution:'Exact name inside the identified skill takes precedence; business IDs and guide choice retained.'});
        if(key && rs[key]){siteAlias(v.rune,rs[key],where);mappings.runes[v.image][`alias:${v.rune}`]=rs[key];}
        else if(!(v.rune.includes(' / ') && v.rune.split(' / ').every(part => overrides.runes?.[`${v.image}|${part}`] || Object.values(rs).some(rid=>locales.some(l=>terms[rid]?.[l]===part)))) && !/全符文|无符文|按需|任选|自选|任意|全部符文|自行选择/.test(v.rune)) issues.push({type:'unmapped-guide-rune',image:v.image,skill:v.name,rune:v.rune,where,options:rs});
      }
    }else if(!/normal-gem|portrait|crest/.test(v.image))issues.push({type:'unmapped-guide-entity',name:v.name||v.label,image:v.image,where});
  }
  Object.entries(v).forEach(([k,x])=>visit(x,`${where}.${k}`));
}
visit(snapshots,'data');
// Add all regional spellings only after entity identity has been established.
for(const [id,values]of Object.entries(terms))Object.values(values).forEach(value=>alias(value,id));
for(const [text,ids]of aliases){
  const list=[...ids];const groups=new Set(list.map(id=>JSON.stringify(terms[id])));
  if(groups.size===1)mappings.aliases[text]=list[0];
  else issues.push({type:'ambiguous-alias',text,candidates:list});
}
// Source-language spellings in site prose are disambiguated only when every
// identified site entity using that spelling points to the same official term.
// Library display names still resolve through their own item/skill IDs.
for(const [text,records] of siteAliases){
 const ids=[...new Set(records.map(r=>r.id))];
 if(ids.length===1){mappings.aliases[text]=ids[0];}
}
fs.writeFileSync('docs/i18n/site-alias-evidence.json',JSON.stringify(Object.fromEntries([...siteAliases].map(([text,records])=>[text,{resolved:[...new Set(records.map(r=>r.id))].length===1,records}])),null,2)+'\n');
// Explicit glossary entries take precedence over derived aliases; they are reviewed in overrides.json.
for(const [text,ref]of Object.entries(overrides.aliases||{}))mappings.aliases[text]=ref;
fs.mkdirSync('app/i18n',{recursive:true});
fs.writeFileSync('app/i18n/client-terms.json',JSON.stringify(terms,null,2)+'\n');
fs.writeFileSync('app/i18n/term-mappings.json',JSON.stringify(mappings,null,2)+'\n');
fs.writeFileSync('docs/i18n/client-evidence.json',JSON.stringify({sources:{zhCN:'d3cn PC 2.8.1.101167',zhTW:'d3 PC 2.8.0.99920',enUS:'d3 PC 2.8.0.99920'},switchVerified:false,entries:evidence},null,2)+'\n');
const unique=[...new Map(issues.map(i=>[JSON.stringify({...i,where:undefined}),i])).values()];
fs.writeFileSync('docs/i18n/review-queue.json',JSON.stringify(unique,null,2)+'\n');
console.log('terms',Object.keys(terms).length,'items',Object.keys(mappings.items).length,'skills',Object.keys(mappings.skills).length,'issues',Object.entries(Object.groupBy(unique,i=>i.type)).map(([k,v])=>[k,v.length]));
