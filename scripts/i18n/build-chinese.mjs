// One-time maintenance helper. Requires the locally compiled convert-chinese.swift.
// Only site prose is converted; client translations always bypass conversion.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const messages=JSON.parse(fs.readFileSync('scripts/i18n/message-definitions.json'));
const official=JSON.parse(fs.readFileSync('app/i18n/client-texts.json'));
for(const locale of ['zhCN','zhTW']) {
 const input=Object.fromEntries(Object.entries(messages).filter(([key])=>!official[key]).map(([key,v])=>[key,v.template]));
 const values=JSON.parse(execFileSync(process.argv[2]||'/tmp/d3-convert-chinese',[locale],{input:JSON.stringify(input),maxBuffer:16*1024*1024}).toString());
 for(const [key,entry] of Object.entries(messages))if(!official[key]&&entry.manual?.[locale])values[key]=entry.manual[locale];
 fs.writeFileSync(`app/i18n/${locale}.json`,JSON.stringify(values,null,2)+'\n');
}
