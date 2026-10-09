"""Read-only QA of fictional reports. Never requests client sessions or sends email."""
import argparse,base64,hashlib,io,json,time,urllib.request
from pathlib import Path
import fitz
from PIL import Image
from playwright.sync_api import sync_playwright

p=argparse.ArgumentParser()
p.add_argument('--base',required=True)
p.add_argument('--out',required=True)
p.add_argument('--expected-commit',default='')
args=p.parse_args()
base=args.base.rstrip('/')
out=Path(args.out);out.mkdir(parents=True,exist_ok=True)
audit={'base':base,'languages':[],'cases':[],'checks':[],'respondent_data_accessed':False,'emails_sent':False}
def get(path):
 with urllib.request.urlopen(base+path,timeout=90) as response:
  return response.read(),dict(response.headers)
def digest(data):return hashlib.sha256(data).hexdigest()

health=None
for i in range(60):
 try:
  health=json.loads(get('/health')[0])
  if health.get('ok'):
   if args.expected_commit and health.get('commit')!=args.expected_commit:
    time.sleep(3);continue
   break
 except Exception:pass
 time.sleep(3)
else:raise AssertionError('healthy service was not reachable')
page_count=health.get('reportPages') or health.get('reporting',{}).get('numberedPages',0)+health.get('reporting',{}).get('coverPages',0)
assert page_count==23,health
version=health.get('interpretationVersion') or health.get('reporting',{}).get('interpretationVersion')
assert version=='1.1.0',health
audit['health']=health

def check_pdf(data,png,label):
 document=fitz.open(stream=data,filetype='pdf')
 assert document.page_count==23,(label,document.page_count)
 actual_image=Image.open(io.BytesIO(png)).convert('RGB')
 ids=[]
 for index in [0,3]:
  images=document[index].get_images(full=True)
  options=[z for z in images if z[2:4]==(actual_image.width,actual_image.height)]
  assert len(options)==1,(label,index,'canonical compass missing/duplicate',options)
  obj=options[0][0];pix=fitz.Pixmap(document,obj)
  if pix.colorspace.n!=3 or pix.alpha:pix=fitz.Pixmap(fitz.csRGB,pix)
  image=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
  assert image.tobytes()==actual_image.tobytes(),(label,index,'PDF compass differs from browser PNG')
  rect=document[index].get_image_rects(obj)
  assert len(rect)==1 and document[index].rect.contains(rect[0]),(label,index,'Compass clipped')
  ids.append(obj)
 assert ids[0]==ids[1],(label,'multiple PDF compass objects')
 return {'pdf_pages':document.page_count,'pdf_sha256':digest(data),'shared_compass_xref':ids[0]}

with sync_playwright() as playwright:
 browser=playwright.chromium.launch()
 for language in ['en','cs','de']:
  raw,headers=get('/qa/specimen.json?language='+language)
  report=json.loads(raw)
  assert report.get('language')==language
  assert report.get('specimen') and report.get('interpretation',{}).get('version')=='1.1.0'
  assert len(report['pages'])==23
  compass=report['compass']
  png=base64.b64decode(compass['image'].split(',')[1])
  assert digest(png)==compass['sha256'],language
  raw_png,_=get('/qa/specimen.png?language='+language)
  assert raw_png==png
  raw_pdf,_=get('/qa/specimen.pdf?language='+language)
  (out/('Specimen_'+language.upper()+'.pdf')).write_bytes(raw_pdf)
  (out/('Compass_'+language.upper()+'.png')).write_bytes(png)
  pdf=check_pdf(raw_pdf,png,language)
  assert len([p for p in report['pages'] if p.get('interpretive')])==5
  audit['languages'].append({'language':language,'compass_sha256':compass['sha256'],**pdf})
  for device,width,height in [('desktop',1440,1100),('mobile',390,844)]:
   context=browser.new_context(viewport={'width':width,'height':height},accept_downloads=True)
   page=context.new_page();errors=[]
   page.on('pageerror',lambda e:errors.append(str(e)))
   page.goto(base+'/?qa=specimen&lang='+language,wait_until='networkidle',timeout=120000)
   element=page.locator('img.canonical-compass')
   element.wait_for(state='visible',timeout=60000)
   assert page.locator('.live-report-page').count()==23,(language,device,'incomplete browser report')
   assert element.get_attribute('data-compass-sha256')==compass['sha256']
   image=element.get_attribute('src')
   assert digest(base64.b64decode(image.split(',')[1]))==compass['sha256']
   bounds=element.bounding_box()
   assert bounds and bounds['width']>80 and bounds['x']>=-1 and bounds['x']+bounds['width']<=width+1,(language,device,'cropped compass',bounds)
   assert not errors,(language,device,errors)
   element.screenshot(path=str(out/(language+'-'+device+'-compass.png')))
   page.locator('.live-report-page').nth(13).screenshot(path=str(out/(language+'-'+device+'-portrait.png')))
   with page.expect_download(timeout=120000) as downloaded:
    page.locator('.live-report-toolbar button.acr-primary').first.click()
   file=downloaded.value;target=out/(language+'-'+device+'-download.pdf')
   file.save_as(str(target))
   assert check_pdf(target.read_bytes(),png,language+'-'+device)['pdf_pages']==23
   assert not errors,errors
   audit['checks'].append({'language':language,'device':device,'passed':True,'page_count':23})
   context.close()
 browser.close()
for name in ['mixed','established','exposed','unknown','not-applicable']:
 raw,_=get('/qa/specimen.json?language=en&case='+name)
 report=json.loads(raw);assert report['specimenCase']==name and len(report['pages'])==23
 audit['cases'].append(name)
audit['status']='PASS';audit['verified_at_utc']=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())
(out/'verification.json').write_text(json.dumps(audit,indent=2,ensure_ascii=False))
print(json.dumps(audit,indent=2,ensure_ascii=False))
