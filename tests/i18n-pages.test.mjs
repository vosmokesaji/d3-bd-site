import assert from 'node:assert/strict';
import test from 'node:test';
import {snapshotData} from '../scripts/i18n/snapshot-data.mjs';
const {default:worker}=await import('../dist/server/index.js');
const data=await snapshotData();
const paths=['/builds','/story','/season-start','/library',...data['site-catalog.js'].BUILD_CATALOG.map(b=>'/builds/'+b.id)];
const textOnly=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
for(const locale of ['zhCN','zhTW','enUS'])test(`all main pages and 51 build details render with ${locale} terminology`,async()=>{
 const issues=[];
 for(const pathname of paths){
  const response=await worker.fetch(new Request('http://localhost'+pathname,{headers:{accept:'text/html',cookie:'d3-locale='+locale}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}});
  assert.equal(response.status,200,pathname);
  const html=await response.text();assert.match(html,new RegExp('lang="'+({zhCN:'zh-CN',zhTW:'zh-TW',enUS:'en-US'}[locale])+'"'),pathname);
  const text=textOnly(html)+' '+[...html.matchAll(/(?:title|alt|aria-label)="([^"]*)"/g)].map(m=>m[1]).join(' ');
  for(const m of text.matchAll(/.{0,70}(?:译文待补齐|譯文待補齊|Translation pending|app\.[a-f0-9]{16}|ZXQ\d+XZ|Script Formula|\[\[|\{\d+\}).{0,70}/g))issues.push({pathname,text:m[0]});
 }
 assert.deepEqual(issues,[]);
});
