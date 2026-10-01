import {createHash} from 'node:crypto';
const labels={marke:'Marke',modell:'Modell',baujahr:'Baujahr',km:'Kilometerstand',kraftstoff:'Kraftstoff',getriebe:'Getriebe',karosserie:'Karosserie',fahrbereit:'Fahrbereit',hinweise:'Hinweise',wunschpreis:'Wunschpreis (€)',vorname:'Vorname',nachname:'Nachname',telefon:'Telefon',email:'E-Mail',plz:'PLZ',ort:'Ort',fahrzeugart:'Fahrzeugart',anfragegebiet:'Gebietsseite'};
export function validate(body){
 if(!body||typeof body!=='object'||!body.fields||typeof body.fields!=='object')throw new Error('Ungültige Anfrage.');
 const fields={};for(const key of Object.keys(labels)){const v=body.fields[key];if(v!==undefined){if(typeof v!=='string'||v.length>(key==='hinweise'?4000:150))throw new Error('Bitte prüfen Sie Ihre Angaben.');fields[key]=v.trim();}}
 for(const key of ['marke','modell','baujahr','km','kraftstoff','getriebe','karosserie','fahrbereit','vorname','nachname','telefon','plz','ort'])if(!fields[key])throw new Error('Bitte füllen Sie alle Pflichtfelder aus.');
 if(!/^\d{4}$/.test(fields.baujahr)||+fields.baujahr<1900||+fields.baujahr>new Date().getFullYear()+1||!/^\d+$/.test(fields.km)||!/^\d{5}$/.test(fields.plz)||!/[0-9]{5}/.test(fields.telefon.replace(/\D/g,'')))throw new Error('Bitte prüfen Sie Baujahr, Kilometerstand, PLZ und Telefon.');
 if(fields.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))throw new Error('Bitte prüfen Sie Ihre E-Mail-Adresse.');
 if(fields.wunschpreis&&!/^\d+$/.test(fields.wunschpreis))throw new Error('Bitte prüfen Sie Ihren Wunschpreis.');
 if(body.consent!==true)throw new Error('Bitte bestätigen Sie den Datenschutz.');
 if(!Array.isArray(body.photos)||body.photos.length>8)throw new Error('Bitte wählen Sie höchstens 8 Fotos aus.');
 let total=0;const photos=body.photos.map((p,i)=>{
  if(!p||typeof p.content!=='string'||p.content.length>300000||! /^[A-Za-z0-9+/]+={0,2}$/.test(p.content))throw new Error('Ein Foto konnte nicht verarbeitet werden.');
  const buf=Buffer.from(p.content,'base64');total+=buf.length;
  if(buf.length<4||buf[0]!==255||buf[1]!==216||buf[2]!==255)throw new Error('Bitte verwenden Sie gültige Fotos.');
  return {filename:'Fahrzeugfoto-'+(i+1)+'.jpg',content:p.content};
 });if(total>1800000)throw new Error('Die Fotos sind zu groß.');
 if(typeof body.requestId!=='string'||! /^[a-f0-9-]{36}$/.test(body.requestId))throw new Error('Bitte senden Sie die Anfrage erneut.');
 return {fields,photos};
}
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
 const {RESEND_API_KEY,MAIL_FROM,TURNSTILE_SECRET_KEY,SITE_ORIGIN}=process.env;
 if(!RESEND_API_KEY||!MAIL_FROM||!TURNSTILE_SECRET_KEY||!SITE_ORIGIN)return res.status(503).json({error:'Der Versand ist gerade nicht verfügbar. Bitte kontaktieren Sie uns per WhatsApp oder Telefon.'});
 if(req.headers.origin!==SITE_ORIGIN)return res.status(403).json({error:'Die Anfrage konnte nicht bestätigt werden.'});
 if(!req.headers['content-type']?.startsWith('application/json'))return res.status(415).json({error:'Ungültiges Format.'});
 if(Number(req.headers['content-length']||0)>2700000)return res.status(413).json({error:'Die Fotos sind zu groß.'});
 let body,data;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;data=validate(body);}catch(e){return res.status(400).json({error:e.message});}
 try{
  const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:TURNSTILE_SECRET_KEY,response:body.challengeToken||''}),signal:AbortSignal.timeout(10000)});
  const verification=await check.json();
  if(!verification.success||verification.hostname!==new URL(SITE_ORIGIN).hostname||verification.action!=='valuation')return res.status(403).json({error:'Bitte bestätigen Sie die Sicherheitsprüfung erneut.'});
  const text=['Neue Fahrzeuganfrage','',...Object.entries(data.fields).map(([key,value])=>labels[key]+': '+value),'','Datenschutz bestätigt.'].join('\n');
  const key=createHash('sha256').update(JSON.stringify({id:body.requestId,...data})).digest('hex');
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify({from:MAIL_FROM,to:['ae.automobile.nord@gmail.com'],...(data.fields.email?{reply_to:data.fields.email}:{}),subject:'Fahrzeuganfrage: '+data.fields.marke+' '+data.fields.modell,text,attachments:data.photos}),signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw new Error('Mail not accepted');
  const receipt=await response.json();if(!receipt.id)throw new Error('Missing receipt');
  return res.status(200).json({accepted:true});
 }catch{return res.status(502).json({error:'Ihre Anfrage konnte noch nicht bestätigt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per WhatsApp.'});}
}
