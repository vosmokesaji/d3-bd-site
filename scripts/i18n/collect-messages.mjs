import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { snapshotData } from './snapshot-data.mjs';
const index={},sources={},messages={};
const previous=fs.existsSync("app/i18n/source-index.json")?JSON.parse(fs.readFileSync("app/i18n/source-index.json")):{};
const previousById=Object.fromEntries(Object.entries(previous).map(([source,id])=>[id,source]));
const mappings=JSON.parse(fs.readFileSync('app/i18n/term-mappings.json'));
const siteTerms=JSON.parse(fs.readFileSync('app/i18n/site-terms.json'));
const reviewedAliases=JSON.parse(fs.readFileSync('scripts/i18n/overrides.json')).aliases;
const manual=fs.existsSync('app/i18n/manual.json')?JSON.parse(fs.readFileSync('app/i18n/manual.json')):{};
const snapshots=await snapshotData();
const usedNames=new Set();
function collectEntityNames(v){
 if(!v||typeof v!=='object')return;
 if(v.image && !(typeof v.set==='string'&&v.core)) {
  const name=v.name||v.label;
  if(typeof name==='string'&&mappings.images[v.image])usedNames.add(name.split(/[：:]/)[0]);
 }
 Object.values(v).forEach(collectEntityNames);
}
collectEntityNames(snapshots);
const aliases=Object.entries(mappings.aliases).filter(([s,id])=>s !== '克里森船长' && /[\p{Script=Han}]/u.test(s) && (s.length>=4||usedNames.has(s)||(reviewedAliases[s] && /^(Items|ItemSets|Powers)\//.test(id))||id.startsWith('Bnet_Classes/')||id.startsWith('Pets/')||['智力','敏捷','体能','大秘境','小秘境'].includes(s))).sort((a,b)=>b[0].length-a[0].length);
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const termPattern=new RegExp(aliases.map(([s])=>escape(s)).join('|'),'gu');
const siteAliases=Object.entries(siteTerms).flatMap(([key,values])=>['zhCN','zhTW'].map(l=>[values[l],key])).sort((a,b)=>b[0].length-a[0].length);
const siteIndex=Object.fromEntries(siteAliases);
const sitePattern=new RegExp(siteAliases.map(([s])=>escape(s)).join('|'),'gu');
function encodeTerms(source){
 if(mappings.aliases[source])return `[[${mappings.aliases[source]}]]`;
 let text=source.replace(/(\d+(?:\.\d+)?)\s*([–—-])\s*(\d+(?:\.\d+)?)(万|萬|亿|億|码|碼)/g,'$1$4$2$3$4');
 text=text.replace(/(\d+(?:\.\d+)?)(万|萬|亿|億|码|碼)/g,(_,n,u)=>`[[Number/${n}/${/[万萬]/.test(u)?'wan':/[亿億]/.test(u)?'yi':'yard'}]]`);
 const outsideTokens=(value,fn)=>value.split(/(\[\[[\s\S]*?\]\])/g).map(part=>part.startsWith('[[')?part:fn(part)).join('');
 text=outsideTokens(text,part=>part.replace(termPattern,s=>`[[${mappings.aliases[s]}]]`));
 return outsideTokens(text,part=>part.replace(sitePattern,s=>`[[Site/${siteIndex[s]}]]`));
}

function add(s,file,force=false){
  s=s.trim().replace(/\s+/g,' ');
  if(!s || (!force && !/[\p{Script=Han}]/u.test(s)))return;
  const id='app.'+createHash('sha256').update(s).digest('hex').slice(0,16);
  index[s]=id;(sources[id]??=[]).push(file);
  messages[id]={source:s,template:encodeTerms(s).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'),...(manual[s]?{manual:manual[s]}:{})};
}
function scan(dir){for(const f of fs.readdirSync(dir)){if(f==='i18n')continue;const p=path.join(dir,f);if(fs.statSync(p).isDirectory())scan(p);else if(/\.tsx?$/.test(p)){
  const tree=ts.createSourceFile(p,fs.readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true,p.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  function visit(n){
    if(ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n)) { if(previousById[n.text]) add(previousById[n.text],p,true); else add(n.text,p); }
    if(ts.isJsxText(n))add(n.text,p,true);
    if(ts.isTemplateExpression(n))add(n.head.text+n.templateSpans.map((s,i)=>`{${i}}`+s.literal.text).join(''),p);
    ts.forEachChild(n,visit);
  }visit(tree);
}}}
scan('app');scan('components');
const skip=new Set(['id','key','image','imageSource','model','portrait','crest','source','sources','assetKey','category','group','classId','classes','followers','artisans','quality','slug','kind','icon','position','runeId','runeKey','seasonId','patch','platform','reference','url','href','color']);
function collect(v,file){if(typeof v==='string')add(v,file);else if(Array.isArray(v))v.forEach(x=>collect(x,file));else if(v&&typeof v==='object')for(const [k,x]of Object.entries(v))if(!skip.has(k))collect(x,file);}
collect(snapshots,'evaluated data factories');
for(const f of ['items','item-categories','skills'])collect(JSON.parse(fs.readFileSync(`public/d3/library/${f}.json`)),`public/d3/library/${f}.json`);
for(const s of Object.keys(manual))add(s,'app/i18n/manual.json',true);
fs.writeFileSync('app/i18n/source-index.json',JSON.stringify(index)+'\n');
fs.writeFileSync('docs/i18n/message-sources.json',JSON.stringify(Object.fromEntries(Object.entries(sources).map(([k,v])=>[k,[...new Set(v)]])),null,2)+'\n');
fs.writeFileSync('/tmp/d3-message-corpus.json',JSON.stringify(messages,null,2));
fs.writeFileSync('scripts/i18n/message-definitions.json',JSON.stringify(messages,null,2)+'\n');
console.log('Messages',Object.keys(messages).length,'characters',Object.values(messages).reduce((n,v)=>n+v.template.length,0));
