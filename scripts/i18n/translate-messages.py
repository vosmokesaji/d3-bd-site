"""Development-only, user-authorized translation of site prose via googletrans 4.0.2.
Client text matches are excluded. Term references, interpolation parameters and
numeric literals are protected and checked as multisets. No runtime dependency.
"""
import argparse, asyncio, hashlib, json, pathlib, re
import httpx
from googletrans import Translator
parser=argparse.ArgumentParser();parser.add_argument('--proxy');parser.add_argument('--limit',type=int);parser.add_argument('--cache',default='/tmp/d3-translation-cache.json');args=parser.parse_args()
corpus=json.loads(pathlib.Path('scripts/i18n/message-definitions.json').read_text())
official=json.loads(pathlib.Path('app/i18n/client-texts.json').read_text())
existing=json.loads(pathlib.Path('app/i18n/enUS.json').read_text()) if pathlib.Path('app/i18n/enUS.json').exists() else {}
cachepath=pathlib.Path(args.cache);cache=json.loads(cachepath.read_text()) if cachepath.exists() else {}
protect=re.compile(r'\[\[[\s\S]+?\]\]|\{\d+\}|\d+(?:[.,]\d+)*(?:%)?')
markers=re.compile(r'D\s*3\s*R\s*O\s*W\s*(\d+)\s*END\s*',re.I)
def cachekey(text):return hashlib.sha256(text.encode()).hexdigest()
def mask(text):
    refs=[]
    def sub(m):refs.append(m[0]);return 'ZXQ'+str(len(refs)-1).zfill(4)+'XZ'
    return protect.sub(sub,text),refs

def unmask(text,refs):
    found=[]
    def sub(m):
        i=int(m[1]);found.append(i)
        if i>=len(refs):raise ValueError('unknown protected token')
        return refs[i]
    text=re.sub(r'Z\s*X\s*Q\s*(\d+)\s*X\s*Z',sub,text,flags=re.I)
    if sorted(found)!=list(range(len(refs))):raise ValueError('protected token mismatch')
    if re.search(r'[\u3400-\u9fff]',text):raise ValueError('untranslated source text')
    return text.strip()

def save():
    cachepath.write_text(json.dumps(cache,ensure_ascii=False))
    values={key:value for key,entry in corpus.items() if key not in official for value in [entry.get('manual',{}).get('enUS') or cache.get(cachekey(entry['template'])) or existing.get(key)] if value is not None}
    pathlib.Path('app/i18n/enUS.json').write_text(json.dumps(values,ensure_ascii=False,indent=2)+'\n')

async def main():
    pending=[]
    for key,entry in corpus.items():
        if key in official or entry.get('manual',{}).get('enUS') or (existing.get(key) and not re.search(r'[\u3400-\u9fff]',existing[key])):continue
        text=entry['template'];ck=cachekey(text)
        if ck in cache and not re.search(r'[\u3400-\u9fff]',mask(cache[ck])[0]):continue
        cache.pop(ck,None)
        masked,_=mask(text)
        if not re.search('[\u3400-\u9fff]',masked):cache[ck]=text
        else:pending.append(text)
    pending=list(dict.fromkeys(pending));batches=[];batch=[];length=0
    for text in pending:
        size=len(mask(text)[0])+25
        if length+size>2000 and batch:batches.append(batch);batch=[];length=0
        batch.append(text);length+=size
    if batch:batches.append(batch)
    if args.limit:batches=batches[:args.limit]
    print('Pending prose',len(pending),'batches',len(batches),flush=True)
    failures=[];semaphore=asyncio.Semaphore(3)
    async with Translator(proxy=args.proxy,timeout=httpx.Timeout(35),raise_exception=True,http2=False) as translator:
        async def request(batch):
            masked=[mask(text) for text in batch]
            payload='\n'.join('D3ROW'+str(i).zfill(4)+'END '+text for i,(text,_) in enumerate(masked))
            result=await translator.translate(payload,dest='en',src='auto')
            matches=list(markers.finditer(result.text))
            if [int(m[1]) for m in matches]!=list(range(len(batch))):raise ValueError('row boundary mismatch')
            return [unmask(result.text[m.end():matches[i+1].start() if i+1<len(matches) else len(result.text)],refs) for i,(m,(_,refs)) in enumerate(zip(matches,masked))]
        async def translate(batch):
            try:
                values=await request(batch)
                for text,value in zip(batch,values):cache[cachekey(text)]=value
            except Exception as error:
                if len(batch)>1:
                    mid=len(batch)//2;await translate(batch[:mid]);await translate(batch[mid:])
                else:failures.append({'source':batch[0],'reason':type(error).__name__})
        async def run(batch):
            async with semaphore:await translate(batch)
        for n,future in enumerate(asyncio.as_completed([run(b) for b in batches]),1):
            await future;save()
            if n%5==0 or n==len(batches):print('Batches',n,'/',len(batches),'failures',len(failures),flush=True)
    save();pathlib.Path('docs/i18n/translation-failures.json').write_text(json.dumps(failures,ensure_ascii=False,indent=2)+'\n')
    print('Finished; failed',len(failures),flush=True)
asyncio.run(main())
