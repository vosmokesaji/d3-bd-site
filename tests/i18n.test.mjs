import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { snapshotData } from '../scripts/i18n/snapshot-data.mjs';
const root=path.resolve('app/i18n');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'d3-i18n-test-'));
const js=ts.transpileModule(fs.readFileSync(path.join(root,'core.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/from '(\.\/[^']+\.json)'/g,(_,p)=>`from '${pathToFileURL(path.resolve(root,p)).href}' with {type:'json'}`);
fs.writeFileSync(path.join(dir,'core.mjs'),js);
const {createTranslator,resolveRuneKey,localeFromCookie,term}=await import(pathToFileURL(path.join(dir,'core.mjs')).href);
fs.rmSync(dir,{recursive:true,force:true});
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const terms=read('app/i18n/client-terms.json'),mappings=read('app/i18n/term-mappings.json'),index=read('app/i18n/source-index.json');
const locales=['zhCN','zhTW','enUS'];
const unsafe=/app\.[a-f0-9]{16}|\[\[|\{\d+\}|Script Formula|ZXQ\d+XZ|\{c[:_]|\b(?:undefined|null)\b/;

test('all registered messages resolve in every locale without raw keys, null or client syntax',()=>{
 for(const locale of locales){const {t}=createTranslator(locale);for(const [source,key]of Object.entries(index)){
  const params=Object.fromEntries([...source.matchAll(/\{(\d+)\}/g)].map(m=>[m[1],'123']));
  const text=t(key,params);
  assert.doesNotMatch(text,unsafe,`${locale}: ${source}`);
  assert.doesNotMatch(text,/译文待补齐|譯文待補齊|Translation pending/,`${locale}: ${source}`);
 }}
});

test('item and skill identity stays independent of region and legacy spellings',()=>{
 for(const item of read('public/d3/library/items.json'))for(const locale of locales){
  assert.equal(createTranslator(locale).entity(item),term(mappings.items[item.id],locale),item.id);
 }
 for(const skill of read('public/d3/library/skills.json'))for(const locale of locales){
  const tr=createTranslator(locale);assert.equal(tr.entity(skill),term(mappings.skills[skill.id],locale));
  for(const rune of skill.runes??[]){assert.equal(resolveRuneKey({...skill,rune:rune.name}),rune.key);assert.equal(tr.entity({...skill,rune:rune.name},'rune'),term(mappings.runes[skill.image][rune.key],locale));}
 }
 assert.equal(createTranslator('zhCN').tr('皇家華戒'),'皇家华戒');
 assert.equal(createTranslator('zhTW').tr('皇家华戒'),'皇家華戒');
 assert.equal(createTranslator('enUS').tr('皇家华戒'),'Ring of Royal Grandeur');
});

test('numeric stat overlays, search, and gem annotations use the selected terminology',()=>{
 const cn=createTranslator('zhCN'),tw=createTranslator('zhTW'),en=createTranslator('enUS');
 assert.equal(cn.tr('+1000 智力'),'+1000 智力');
 assert.equal(tw.tr('+10% 暴击率'),'+10% 爆擊機率');
 assert.equal(en.tr('+1000 智力'),'+1000 Intelligence');
 assert.equal(en.tr('+10% 暴击率'),'+10% Critical Hit Chance');
 const royal={id:'ring-of-royal-grandeur-P3_Unique_Ring_107',name:'皇家華戒'};
 assert.equal(en.matches('royal grandeur',royal),true);
 assert.equal(cn.matches('皇家华戒',royal),true);
 assert.equal(tw.matches('皇家華戒',royal),true);
 const gem=en.entity({name:'无瑕皇家黄宝石：智力 ×3',image:'/d3/flawless-royal-topaz.png'});
 assert.match(gem,/Flawless Royal Topaz.*Intelligence.*×3/);
});

test('build titles keep their own identity despite sharing skill artwork',async()=>{
 const data=await snapshotData();
 for(const build of data['site-catalog.js'].BUILD_CATALOG){
  for(const locale of locales)assert.equal(createTranslator(locale).entity(build),createTranslator(locale).tr(build.name));
  assert.notEqual(mappings.aliases[build.name],mappings.images[build.image],build.name);
 }
});

test('official descriptions reuse site numbers without evaluating formulas or importing another patch',()=>{
 const report=read('docs/i18n/client-text-matches.json');
 assert.ok(report.matched>2000);
 const bySource=Object.fromEntries(Object.values(report.entries).map(v=>[v.source,v]));
 const stat=bySource['+[626 - 750] 智力'];
 assert.equal(stat.ref,'AttributeDescriptions/Intelligence_Item');
 assert.match(stat.values.enUS,/626-750.*Intelligence/);
 for(const entry of Object.values(report.entries))for(const locale of locales){
  assert.doesNotMatch(entry.values[locale],unsafe,entry.ref);
  const numbers=text=>(text.match(/\d+(?:\.\d+)?/g)??[]).map(Number).sort((a,b)=>a-b);
  assert.deepEqual(numbers(entry.values[locale]),numbers(entry.source),entry.source);
 }
});

test('missing Chinese follower text is explicit and locale validation is strict',()=>{
 for(const locale of ['zhCN','zhTW']){
  assert.match(term('Powers/Scoundrel_Multishot_name',locale),/译名待核对|譯名待核對/);
  assert.match(term('Powers/Scoundrel_Multishot_name',locale),/Multishot/);
 }
 assert.equal(localeFromCookie(null),'zhCN');assert.equal(localeFromCookie('d3-locale=enUS'),'enUS');
 assert.equal(localeFromCookie('d3-locale=zhTW'),'zhTW');assert.equal(localeFromCookie('d3-locale=ar'),'zhCN');
 assert.equal(createTranslator('enUS').t('does.not.exist'),'Translation pending');
});

// Legacy rune letters must never override an exact name within the identified skill.
test('legacy rune letters cannot swap Dislocation for Limited Immunity',()=>{
 const skill={image:'/d3/bone-armor.png',rune:'白骨脱臼',runeKey:'b'};
 assert.equal(resolveRuneKey(skill),'c');
 assert.equal(createTranslator('zhCN').entity(skill,'rune'),'白骨脱臼');
 assert.equal(createTranslator('zhTW').entity(skill,'rune'),'分筋錯骨');
 assert.equal(createTranslator('enUS').entity(skill,'rune'),'Dislocation');
});
test('English catalog contains no untranslated Chinese and localized output is idempotent',()=>{
 for(const value of Object.values(read('app/i18n/enUS.json')))assert.doesNotMatch(value??'',/\p{Script=Han}/u);
 for(const locale of locales){const a=createTranslator(locale),b=createTranslator(locale);
  for(const source of ['赛季全职业 BD','主线剧情线路','赛季开荒流程']) assert.equal(b.tr(a.tr(source)),a.tr(source));
 }
});

test('legacy crafted-set assets retain the intended set identity',()=>{
 const en=createTranslator('enUS');
 assert.equal(en.entity({id:'guardian-bracers',image:'/d3/guardian-bracers.png',name:'守护者护腕'}),"Guardian's Aversion");
 assert.equal(en.entity({image:'/d3/sages-passage.png',name:'贤者之旅'}),"Sage's Passage");
 assert.equal(en.tr('复仇者'), 'Nemesis Bracers');
 assert.equal(en.tr('克己'),'Focus');
 assert.equal(en.tr('守心'),'Restraint');
});

test('Chinese quantity units preserve magnitude and English term boundaries',()=>{
 assert.equal(term('Number/80/wan','enUS'),'800,000');
 assert.equal(term('Number/90/wan','zhTW'),'90萬');
 assert.equal(term('Number/1.5/yi','enUS'),'150,000,000');
 assert.equal(term('Number/25/yard','enUS'),'25 yards');
});

test('protected references cannot be rewritten inside another reference',()=>{
 const definitions=read('scripts/i18n/message-definitions.json');
 for(const entry of Object.values(definitions)){
  assert.doesNotMatch(entry.template,/\[\[\[\[/,entry.source);
  for(const [,ref] of entry.template.matchAll(/\[\[([^\]]+)\]\]/g))assert.ok(terms[ref]||ref.startsWith('Site/')||/^Number\/\d+(?:\.\d+)?\/(wan|yi|yard)$/.test(ref),ref);
 }
 assert.equal(definitions[index['80万–90万']].template,'[[Number/80/wan]]–[[Number/90/wan]]');
});
