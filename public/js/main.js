function fillYears(id){const el=document.getElementById(id);if(!el)return;const now=new Date().getFullYear();for(let y=now;y>=1980;y--){const o=document.createElement('option');o.value=y;o.textContent=y;el.appendChild(o)}}fillYears('yearQuick');fillYears('yearFull');
const q=document.getElementById('quickForm');if(q)q.addEventListener('submit',e=>{e.preventDefault();const p=new URLSearchParams(window.vehicleFormData?window.vehicleFormData(q):new FormData(q));location.href='bewertung.html?'+p.toString()});

const vehicleToggle=document.querySelector('.vehicle-toggle');
const vehicleCards=document.getElementById('vehicle-cards');
if(vehicleToggle && vehicleCards){vehicleToggle.addEventListener('click',()=>{const expanded=vehicleToggle.getAttribute('aria-expanded')!=='true';vehicleToggle.setAttribute('aria-expanded',String(expanded));vehicleCards.classList.toggle('is-expanded',expanded);vehicleToggle.textContent=expanded?'Weniger Fahrzeugarten anzeigen −':'Alle 7 Fahrzeugarten anzeigen ＋';});}

// Only successfully loaded photos become visible cards, ordered by filename.
const purchasedSection=document.querySelector('.purchased-gallery');
const purchasedTrack=document.getElementById('purchased-track');
if(purchasedSection && purchasedTrack){
 const photos=new Map();
 const prev=purchasedSection.querySelector('[data-gallery-prev]');
 const next=purchasedSection.querySelector('[data-gallery-next]');
 const updateArrows=()=>{const max=purchasedTrack.scrollWidth-purchasedTrack.clientWidth;prev.disabled=purchasedTrack.scrollLeft<=2;next.disabled=purchasedTrack.scrollLeft>=max-2;};
 for(let number=1;number<=7;number++){
  const photo=new Image();photo.alt='Bereits angekauftes Fahrzeug – Foto '+number;photo.decoding='async';
  photo.onload=()=>{const card=document.createElement('figure');card.className='purchased-photo';card.append(photo);photos.set(number,card);const following=[...photos.keys()].sort((a,b)=>a-b).find(key=>key>number);purchasedTrack.insertBefore(card,following?photos.get(following):null);purchasedSection.hidden=false;requestAnimationFrame(updateArrows);};
  photo.onerror=()=>{};
  photo.src='assets/images/kunden-autos/'+number+'.jpg';
 }
 const move=direction=>{const card=purchasedTrack.querySelector('.purchased-photo');const distance=card?card.getBoundingClientRect().width+16:purchasedTrack.clientWidth;purchasedTrack.scrollBy({left:direction*distance,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 purchasedTrack.addEventListener('scroll',updateArrows,{passive:true});window.addEventListener('resize',updateArrows);
 purchasedTrack.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}});
}

const faqToggle=document.querySelector('.faq-toggle');
const faqQuestions=document.getElementById('faq-questions');
if(faqToggle && faqQuestions){faqToggle.addEventListener('click',()=>{const expanded=faqToggle.getAttribute('aria-expanded')!=='true';faqToggle.setAttribute('aria-expanded',String(expanded));faqQuestions.hidden=!expanded;faqToggle.textContent=expanded?'Fragen wieder ausblenden −':'Häufige Fragen ansehen ＋';});}

const siteHeader=document.querySelector('.site-header');
const headerMenu=document.querySelector('.header-menu');
if(siteHeader && headerMenu){
 const closeMenu=()=>{siteHeader.classList.remove('menu-open');headerMenu.setAttribute('aria-expanded','false');headerMenu.setAttribute('aria-label','Menü öffnen');};
 headerMenu.addEventListener('click',()=>{const open=headerMenu.getAttribute('aria-expanded')!=='true';siteHeader.classList.toggle('menu-open',open);headerMenu.setAttribute('aria-expanded',String(open));headerMenu.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');});
 siteHeader.querySelectorAll('.header-nav a').forEach(link=>link.addEventListener('click',closeMenu));
 document.addEventListener('keydown',event=>{if(event.key==='Escape' && headerMenu.getAttribute('aria-expanded')==='true'){closeMenu();headerMenu.focus();}});
 document.addEventListener('click',event=>{if(!siteHeader.contains(event.target))closeMenu();});
 window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu();});
}

fillYears('yearFooter');
const footerQuickForm=document.getElementById('footerQuickForm');
if(footerQuickForm){footerQuickForm.addEventListener('submit',event=>{event.preventDefault();const params=new URLSearchParams(window.vehicleFormData?window.vehicleFormData(footerQuickForm):new FormData(footerQuickForm));location.href='bewertung.html?'+params.toString();});}

