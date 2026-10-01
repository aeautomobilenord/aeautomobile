/* Off until the mail provider, domain, and anti-spam keys are configured and tested. */
(() => {
 const form=document.getElementById('valuationForm');if(!form||form.dataset.delivery!=='enabled')return;
 const button=document.getElementById('submitBtn');
 button.textContent='Kostenloses Angebot anfragen →';
 document.querySelector('.photo-note').textContent='Fotos sind freiwillig. Ausgewählte Fotos senden wir zusammen mit Ihrer Anfrage.';
 const error=document.createElement('p');error.setAttribute('role','alert');error.hidden=true;form.querySelector('.wizard-actions').after(error);
 const challenge=document.createElement('div');form.querySelector('[data-step="4"]').append(challenge);
 let widget,token='',pending=false,requestId=crypto.randomUUID();
 const script=document.createElement('script');
 script.onerror=()=>{error.textContent='Die Sicherheitsprüfung konnte nicht geladen werden. Bitte laden Sie die Seite erneut oder schreiben Sie uns auf WhatsApp.';error.hidden=false;};script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;
 script.onload=()=>{widget=window.turnstile.render(challenge,{sitekey:form.dataset.challengeKey,size:'flexible',action:'valuation',callback:v=>{token=v;},'expired-callback':()=>{token='';},'error-callback':()=>{token='';}});};document.head.append(script);
 async function photo(file){
  if(!file.type.startsWith('image/')||file.size>25000000)throw new Error('Bitte verwenden Sie Fotos unter 25 MB.');
  const url=URL.createObjectURL(file);
  try{
   const img=new Image();img.src=url;await img.decode();
   let scale=Math.min(1,1400/Math.max(img.naturalWidth,img.naturalHeight));
   for(let attempt=0;attempt<5;attempt++){
    const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
    const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const content=canvas.toDataURL('image/jpeg',.75).split(',')[1];if(content.length<=280000)return {content};scale*=.7;
   }throw new Error('Das Foto ist zu groß. Bitte wählen Sie ein kleineres Foto.');
  }catch(e){if(e instanceof Error&&/Foto/.test(e.message))throw e;throw new Error('Ein Foto lässt sich nicht öffnen. Bitte verwenden Sie JPG, PNG oder WebP.');}
  finally{URL.revokeObjectURL(url);}
 }
 window.ValuationDelivery={async send(){
  if(pending)return;error.hidden=true;
  if(!token){error.textContent='Bitte bestätigen Sie zuerst die Sicherheitsprüfung.';error.hidden=false;return;}
  pending=true;button.disabled=true;button.textContent='Wird gesendet …';
  try{
   const fields={};for(const [key,value] of new FormData(form))if(typeof value==='string'&&key!=='datenschutz')fields[key]=value;
   Object.assign(fields,window.VehiclePicker.values(form));
   const params=new URLSearchParams(location.search);for(const key of ['fahrzeugart','anfragegebiet'])if(params.get(key))fields[key]=params.get(key).slice(0,100);
   const files=[...form.querySelectorAll('input[type=file]')].flatMap(el=>[...el.files]);if(files.length>8)throw new Error('Bitte wählen Sie höchstens 8 Fotos aus.');
   const photos=[];for(const file of files)photos.push(await photo(file));
   const response=await fetch('/api/valuation',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(45000),body:JSON.stringify({fields,photos,consent:form.elements.datenschutz.checked,challengeToken:token,requestId})});
   let receipt;try{receipt=await response.json();}catch{throw new Error('Der Versand ist gerade nicht erreichbar. Bitte schreiben Sie uns auf WhatsApp oder versuchen Sie es später erneut.');}if(!response.ok||receipt.accepted!==true)throw new Error(receipt.error||'Ihre Anfrage konnte noch nicht bestätigt werden.');
   const result=document.getElementById('success');result.querySelector('b').textContent='Vielen Dank für Ihre Anfrage!';result.querySelector('p').textContent='Ihre Anfrage wurde zum Versand angenommen. Wir melden uns persönlich bei Ihnen.';
   result.querySelector('.prepared-actions').hidden=true;result.querySelector('.prepared-actions').style.display='none';document.getElementById('attachmentNote').textContent=photos.length?'Ihre '+photos.length+' Fotos sind beigefügt.':'';result.classList.remove('hidden');result.scrollIntoView({behavior:'smooth',block:'center'});requestId=crypto.randomUUID();
  }catch(e){error.textContent=e.message||'Der Versand ist gerade nicht verfügbar. Bitte versuchen Sie es erneut.';error.hidden=false;}
  finally{pending=false;button.disabled=false;button.textContent='Kostenloses Angebot anfragen →';token='';if(widget!==undefined)window.turnstile.reset(widget);}
 }};
})();
