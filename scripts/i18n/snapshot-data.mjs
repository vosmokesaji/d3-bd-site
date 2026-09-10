// Development-only: evaluate the unchanged data factories, without importing the app router.
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
export async function snapshotData() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'd3-i18n-data-'));
  try {
    for (const file of fs.readdirSync('app/data').filter(x => x.endsWith('.ts'))) {
      const js = ts.transpileModule(fs.readFileSync(`app/data/${file}`, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText.replace(/from "(\.\/[^".]+)"/g, 'from "$1.js"');
      fs.writeFileSync(path.join(dir, file.replace(/\.ts$/, '.js')), js);
    }
    fs.writeFileSync(path.join(dir, 'package.json'), '{"type":"module"}');
    const all = {};
    for (const file of fs.readdirSync(dir).filter(x=>x.endsWith('.js'))) {
      const dataModule = await import(pathToFileURL(path.join(dir, file)).href);
      all[file] = JSON.parse(JSON.stringify(dataModule));
    }
    const source = fs.readFileSync('app/page.tsx','utf8');
    const prelude = source.slice(source.indexOf('const GEAR:'), source.indexOf('function getPositionGear'));
    const js = ts.transpileModule(prelude + '\nexport { GEAR, SKILLS, PASSIVES, CUBE_POWERS, ORIGINAL_EFFECTS, SOCKETS, BASE_ROWS, SPEED_ROWS };', {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
    // The prelude contains season-derived labels; import their existing definitions.
    fs.writeFileSync(path.join(dir,'home.js'), `import {CURRENT_SEASON,SEASON_LABEL,CUBE_SEASON_LABEL} from './season-config.js';\n${js}`);
    try {all.home = JSON.parse(JSON.stringify(await import(pathToFileURL(path.join(dir,'home.js')).href)));} catch(error) {console.warn('home snapshot:',error.message);}
    return all;
  } finally { fs.rmSync(dir, {recursive:true,force:true}); }
}
if (process.argv[1]?.endsWith('snapshot-data.mjs')) fs.writeFileSync('/tmp/d3-snapshot.json', JSON.stringify(await snapshotData(),null,2));
