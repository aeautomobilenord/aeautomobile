const form=document.getElementById('valuationForm');
const steps=[...document.querySelectorAll('.form-step')];
const psteps=[...document.querySelectorAll('.pstep')];
const next=document.getElementById('nextBtn'),back=document.getElementById('backBtn'),submit=document.getElementById('submitBtn');
let current=0;
function show(){
 steps.forEach((step,index)=>step.classList.toggle('active',index===current));
 psteps.forEach((step,index)=>{step.classList.toggle('active',index<=current);if(index===current)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');});
 back.style.visibility=current===0?'hidden':'visible';next.classList.toggle('hidden',current===steps.length-1);submit.classList.toggle('hidden',current!==steps.length-1);
 window.scrollTo({top:0,behavior:'auto'});
}
function validStep(){for(const field of steps[current].querySelectorAll('input,select,textarea')){if(!field.checkValidity()){field.reportValidity();return false;}}return true;}
next.addEventListener('click',()=>{if(validStep()&&current<steps.length-1){current++;show();}});
back.addEventListener('click',()=>{if(current>0){current--;show();}});
const labels={marke:'Marke',modell:'Modell',baujahr:'Baujahr',km:'Kilometerstand',kraftstoff:'Kraftstoff',getriebe:'Getriebe',karosserie:'Karosserie',fahrbereit:'Fahrbereit',hinweise:'Hinweise zum Auto',wunschpreis:'Wunschpreis (€)',vorname:'Vorname',nachname:'Nachname',telefon:'Telefon',email:'E-Mail',plz:'PLZ',ort:'Ort'};
form.addEventListener('submit',async event=>{
 event.preventDefault();if(current<steps.length-1){next.click();return;}if(!validStep())return;
 if(window.ValuationDelivery){await window.ValuationDelivery.send();return;}
 const lines=['Hallo A&E Automobile,','ich möchte mein Auto anbieten und bitte um eine unverbindliche Einschätzung.',''];
 const intent=new URLSearchParams(location.search).get('fahrzeugart');if(intent)lines.push('Fahrzeugart: '+intent);
 const region=new URLSearchParams(location.search).get('anfragegebiet');if(region)lines.push('Anfrage über die Gebietsseite: '+region.slice(0,100));
 const vehicle=window.VehiclePicker.values(form);
 for(const [key,label] of Object.entries(labels)){const value=key in vehicle?vehicle[key]:form.elements[key]?.value.trim();if(value)lines.push(label+': '+value);}
 const files=[...form.querySelectorAll('input[type=file]')].flatMap(input=>[...input.files]).map(file=>file.name);
 if(files.length)lines.push('','Fotos zum Anhängen: '+files.join(', '));
 lines.push('','Vielen Dank!');
 document.getElementById('sendEmail').href='mailto:ae.automobile.nord@gmail.com?subject='+encodeURIComponent('Fahrzeuganfrage: '+vehicle.marke+' '+vehicle.modell)+'&body='+encodeURIComponent(lines.join('\n'));
 document.getElementById('sendWhatsApp').href='https://wa.me/491741977771?text='+encodeURIComponent(lines.join('\n'));
 document.getElementById('attachmentNote').textContent=files.length?'Bitte hängen Sie die ausgewählten Fotos selbst an Ihre E-Mail oder WhatsApp-Nachricht an: '+files.join(', '):'Sie können Ihrer Nachricht gerne noch Fotos hinzufügen.';
 const result=document.getElementById('success');result.classList.remove('hidden');result.scrollIntoView({behavior:'smooth',block:'center'});
});
form.querySelectorAll('input[type=file]').forEach(input=>{const note=document.createElement('span');note.className='upload-selected';note.setAttribute('aria-live','polite');input.parentElement.append(note);input.addEventListener('change',()=>{note.textContent=[...input.files].map(file=>file.name).join(', ');});});
const params=new URLSearchParams(location.search);
window.VehiclePicker.set(form,params.get('marke'),params.get('modell'));
['baujahr','km'].forEach(name=>{const el=form.elements[name];if(el&&params.get(name))el.value=params.get(name);});
if(params.get('marke')&&params.get('modell')&&params.get('baujahr')&&[...steps[0].querySelectorAll('input,select')].every(field=>field.checkValidity()))current=1;
show();
form.addEventListener('input',()=>document.getElementById('success').classList.add('hidden'));
form.addEventListener('change',()=>document.getElementById('success').classList.add('hidden'));

const intentDefaults={SUV:{karosserie:'SUV'},Transporter:{karosserie:'Transporter'}};
for(const [name,value] of Object.entries(intentDefaults[params.get('fahrzeugart')]||{})){if(form.elements[name]&&!form.elements[name].value)form.elements[name].value=value;}
