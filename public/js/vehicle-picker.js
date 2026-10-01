/* Shared local vehicle suggestions for every valuation card. */
(()=>{
 const catalog=window.vehicleCatalog||{};
 const other='__other__';
 const collator=new Intl.Collator('de',{numeric:true,sensitivity:'base'});
 const popular=['Audi','BMW','Citroën','Dacia','Fiat','Ford','Hyundai','Kia','Mazda','Mercedes-Benz','MINI','Nissan','Opel','Peugeot','Renault','SEAT','Škoda','Toyota','Volkswagen','Volvo'];
 const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
 const aliases={vw:'Volkswagen',mercedes:'Mercedes-Benz',benz:'Mercedes-Benz',mini:'MINI',skoda:'Škoda',citroen:'Citroën'};
 function canonicalBrand(value){return aliases[normalize(value)]||Object.keys(catalog).find(brand=>normalize(brand)===normalize(value))||value;}
 const pickers=new WeakMap();
 document.querySelectorAll('form').forEach((form,index)=>{
  const brand=form.elements.marke,oldModel=form.elements.modell;
  if(!brand||!oldModel)return;
  brand.replaceChildren(new Option('Marke wählen',''));
  function group(label,names){const el=document.createElement('optgroup');el.label=label;names.forEach(name=>el.append(new Option(name,name)));brand.append(el);}
  group('Häufig gewählte Marken',popular.filter(name=>catalog[name]));
  group('Weitere Marken A–Z',Object.keys(catalog).filter(name=>!popular.includes(name)).sort(collator.compare));
  brand.append(new Option('Andere Marke / selbst eingeben',other));
  const model=document.createElement('select');model.name='modell';model.required=oldModel.required;model.id='vehicle-model-'+index;oldModel.replaceWith(model);
  function manual(field,name,placeholder){const input=document.createElement('input');input.name=name;input.placeholder=placeholder;input.hidden=true;input.disabled=true;input.required=true;input.autocomplete='off';input.addEventListener('input',()=>input.setCustomValidity(input.value.trim()?'':'Bitte geben Sie einen Namen ein.'));input.setAttribute('aria-label',name==='marke_custom'?'Andere Marke eingeben':'Anderes Modell eingeben');field.parentElement.append(input);return input;}
  const brandText=manual(brand,'marke_custom','Ihre Marke eingeben');
  const modelText=manual(model,'modell_custom','Ihr Modell eingeben');
  function toggle(input,visible){input.hidden=!visible;input.disabled=!visible;input.setCustomValidity('');if(!visible)input.value='';}
  function fillModels(){
   model.replaceChildren(new Option(brand.value?'Modell wählen':'Zuerst Marke wählen',''));
   (catalog[brand.value]||[]).slice().sort(collator.compare).forEach(name=>model.append(new Option(name,name)));
   model.append(new Option('Anderes Modell / selbst eingeben',other));
   model.disabled=!brand.value;
   toggle(brandText,brand.value===other);toggle(modelText,false);
   if(brand.value===other){model.value=other;toggle(modelText,true);}
  }
  brand.addEventListener('change',fillModels);
  model.addEventListener('change',()=>toggle(modelText,model.value===other));
  fillModels();
  const set=(rawBrand,rawModel)=>{
   const selected=canonicalBrand(rawBrand);
   if(selected){brand.value=catalog[selected]?selected:other;fillModels();if(brand.value===other)brandText.value=rawBrand;}
   if(rawModel){const match=(catalog[brand.value]||[]).find(name=>normalize(name)===normalize(rawModel));model.value=match||other;toggle(modelText,!match);if(!match)modelText.value=rawModel;}
  };
  pickers.set(form,{set,values:()=>({marke:brand.value===other?brandText.value.trim():brand.value,modell:model.value===other?modelText.value.trim():model.value})});
 });
 window.VehiclePicker={set:(form,brand,model)=>pickers.get(form)?.set(brand,model),values:form=>pickers.get(form)?.values()||{marke:form.elements.marke?.value,modell:form.elements.modell?.value}};
 window.vehicleFormData=form=>{const data=new FormData(form);const values=window.VehiclePicker.values(form);data.set('marke',values.marke);data.set('modell',values.modell);data.delete('marke_custom');data.delete('modell_custom');return data;};
})();
