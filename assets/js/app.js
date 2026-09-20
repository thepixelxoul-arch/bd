const body=document.body;
const sidebar=document.querySelector('.sidebar');
const menuBtn=document.querySelector('[data-menu-toggle]');

const DEFAULT_SETTINGS={
  siteName:'Amar Shop',
  announcement:'Fast, simple and reliable social media services.',
  ordersEnabled:true,
  registrationEnabled:true,
  defaultBalance:500,
  supportEmail:'support@example.com',
  supportTelegram:'@amarshop'
};

const DEFAULT_SERVICES={
  facebook:[
    {id:101,name:'Facebook Page Followers',rate:45,min:100,max:10000,desc:'Stable delivery • Refill supported'},
    {id:102,name:'Facebook Post Reactions',rate:30,min:50,max:5000,desc:'Mixed reactions • Fast start'}
  ],
  instagram:[
    {id:201,name:'Instagram Followers',rate:60,min:100,max:10000,desc:'Global followers • Medium speed'},
    {id:202,name:'Instagram Likes',rate:25,min:50,max:20000,desc:'Fast likes • No refill'}
  ],
  youtube:[
    {id:301,name:'YouTube Views',rate:80,min:100,max:50000,desc:'Worldwide views • Gradual delivery'},
    {id:302,name:'YouTube Likes',rate:55,min:50,max:10000,desc:'High quality likes'}
  ],
  tiktok:[
    {id:401,name:'TikTok Views',rate:18,min:100,max:100000,desc:'Very fast start'},
    {id:402,name:'TikTok Followers',rate:70,min:100,max:10000,desc:'Mixed global followers'}
  ]
};

function safeParse(key,fallback){
  try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch(e){return fallback}
}
function getSettings(){return {...DEFAULT_SETTINGS,...safeParse('siteSettings',{})}}
function saveSettings(v){localStorage.setItem('siteSettings',JSON.stringify({...getSettings(),...v}))}
function getDemoProfile(){return safeParse('demoProfile',{})}
function setDemoProfile(p){localStorage.setItem('demoProfile',JSON.stringify(p))}
function demoOrders(){return safeParse('demoOrders',[])}
function getCustomServices(){return safeParse('customServices',[])}
function showToast(msg){
  const el=document.createElement('div');el.className='toast';el.textContent=msg;
  document.body.appendChild(el);setTimeout(()=>el.remove(),2200)
}
function setText(id,v){const el=document.getElementById(id);if(el)el.textContent=v}
function allServices(){
  const flat=[];
  Object.entries(DEFAULT_SERVICES).forEach(([platform,list])=>list.forEach(s=>flat.push({...s,platform,custom:false})));
  getCustomServices().forEach(s=>flat.push({...s,custom:true}));
  return flat;
}
function servicesByPlatform(platform){return allServices().filter(s=>s.platform===platform)}

localStorage.removeItem('theme');
body.classList.remove('dark');
document.querySelectorAll('[data-theme-toggle]').forEach(el=>el.remove());

if(menuBtn)menuBtn.addEventListener('click',()=>sidebar&&sidebar.classList.toggle('open'));

const settings=getSettings();
document.querySelectorAll('.brand > div:last-child').forEach(el=>el.textContent=settings.siteName);
document.querySelectorAll('.mobile-brand > span:last-child').forEach(el=>el.textContent=settings.siteName);
document.title=document.title.replace(/Amar Shop/g,settings.siteName);

const profile=getDemoProfile();
document.querySelectorAll('[data-demo-username]').forEach(el=>{
  if(el.matches('input,textarea'))el.value=profile.username||'customer';
  else el.textContent=profile.username||'customer'
});
document.querySelectorAll('[data-demo-email]').forEach(el=>{
  if(el.matches('input,textarea'))el.value=profile.email||'customer@example.com';
  else el.textContent=profile.email||'customer@example.com'
});
document.querySelectorAll('[data-demo-balance]').forEach(el=>el.textContent='৳'+Number(profile.balance??settings.defaultBalance).toFixed(2));

const cat=document.getElementById('category');
const svc=document.getElementById('service');
const qty=document.getElementById('quantity');
const charge=document.getElementById('charge');

function currentService(){
  if(!svc)return null;
  return allServices().find(s=>String(s.id)===String(svc.value))
}
function calcCharge(){
  const s=currentService();if(!s||!qty||!charge)return;
  const q=Number(qty.value||0);
  charge.value=q?'৳'+((q/1000)*Number(s.rate)).toFixed(2):'৳0.00'
}
function updateInfo(){
  const s=currentService();if(!s)return;
  const map={
    serviceName:s.id+' - '+s.name,
    serviceStart:'0-30 minutes',
    serviceSpeed:'Varies by service',
    serviceRefill:String(s.desc).toLowerCase().includes('refill')?'Available':'N/A',
    serviceQuality:'Standard',
    serviceMinMax:s.min+' - '+s.max,
    serviceDesc:s.desc||'Service available'
  };
  Object.entries(map).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=v});
  calcCharge()
}
function updateServices(){
  if(!cat||!svc)return;
  const list=servicesByPlatform(cat.value);
  svc.innerHTML=list.map(s=>'<option value="'+s.id+'">'+s.id+' - '+s.name+'</option>').join('');
  updateInfo()
}
if(cat)cat.addEventListener('change',updateServices);
if(svc)svc.addEventListener('change',updateInfo);
if(qty)qty.addEventListener('input',calcCharge);
updateServices();

document.querySelectorAll('.platform').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.platform').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  if(btn.dataset.platform!=='all'&&cat){
    cat.value=btn.dataset.platform;
    cat.dispatchEvent(new Event('change'))
  }
}));

const orderForm=document.getElementById('orderForm');
if(orderForm){
  if(!settings.ordersEnabled){
    const b=orderForm.querySelector('button[type="submit"],button:not([type])');
    if(b){b.disabled=true;b.textContent='Orders temporarily unavailable'}
  }
  orderForm.addEventListener('submit',e=>{
    e.preventDefault();
    if(!settings.ordersEnabled){showToast('Orders are temporarily unavailable.');return}
    const link=document.getElementById('link').value.trim(),s=currentService(),q=Number(qty.value||0);
    if(!link||!s||q<s.min||q>s.max){showToast('Enter a valid link and quantity.');return}
    const orders=demoOrders();
    orders.unshift({id:Math.floor(Date.now()/1000),service:s.name,serviceId:s.id,link,qty:q,charge:charge.value,status:'Pending',created:new Date().toLocaleString()});
    localStorage.setItem('demoOrders',JSON.stringify(orders));
    showToast('Order submitted.');
    orderForm.reset();updateServices();renderOrders()
  })
}

function renderOrders(){
  const tbody=document.getElementById('ordersBody');if(!tbody)return;
  const orders=demoOrders();
  tbody.innerHTML=orders.length?orders.map(o=>'<tr><td>#'+o.id+'</td><td>'+o.service+'</td><td>'+o.qty+'</td><td>'+o.charge+'</td><td><span class="badge">'+o.status+'</span></td><td>'+o.created+'</td><td>'+(o.status==='Completed'?'—':'<button class="btn btn-outline" data-complete-order="'+o.id+'">Complete</button>')+'</td></tr>').join(''):'<tr><td colspan="7" class="muted">No orders yet.</td></tr>'
}
renderOrders();

document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-complete-order]');
  if(btn){
    const id=String(btn.dataset.completeOrder),orders=demoOrders(),found=orders.find(o=>String(o.id)===id);
    if(found){found.status='Completed';localStorage.setItem('demoOrders',JSON.stringify(orders));showToast('Order completed.');renderOrders()}
  }
});

const regForm=document.getElementById('registerForm');
if(regForm){
  if(!settings.registrationEnabled){
    regForm.innerHTML='<div class="alert">New registration is temporarily disabled.</div>'
  }else{
    regForm.addEventListener('submit',e=>{
      e.preventDefault();
      const username=document.getElementById('regUsername').value.trim();
      const email=document.getElementById('regEmail').value.trim();
      const password=document.getElementById('regPassword').value;
      if(!username||!email||password.length<6){showToast('Fill all fields and use at least 6 password characters.');return}
      setDemoProfile({username,email,password,balance:Number(settings.defaultBalance)});
      localStorage.setItem('demoSession','1');location.href='index.html'
    })
  }
}

const loginForm=document.getElementById('loginForm');
if(loginForm)loginForm.addEventListener('submit',e=>{
  e.preventDefault();
  const p=getDemoProfile(),login=document.getElementById('loginUser').value.trim(),password=document.getElementById('loginPassword').value;
  if((p.username===login||p.email===login)&&p.password===password){localStorage.setItem('demoSession','1');location.href='index.html'}
  else showToast('Account not found. Register first.')
});

document.querySelectorAll('[data-logout]').forEach(el=>el.addEventListener('click',e=>{
  e.preventDefault();localStorage.removeItem('demoSession');location.href='login.html'
}));

document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{
  const target=document.querySelector(btn.dataset.copy);if(!target)return;
  try{await navigator.clipboard.writeText(target.value||target.textContent);showToast('Copied')}catch(e){showToast('Copy failed')}
}));

const dashOrders=demoOrders();
const totalCost=dashOrders.reduce((sum,o)=>sum+(parseFloat(String(o.charge||'').replace(/[^0-9.]/g,''))||0),0);
setText('dashTotalOrders',dashOrders.length);
setText('dashTotalCost','৳'+totalCost.toFixed(2));
setText('dashPending',dashOrders.filter(o=>o.status==='Pending').length);
setText('dashCompleted',dashOrders.filter(o=>o.status==='Completed').length);

const massForm=document.getElementById('massOrderForm');
if(massForm)massForm.addEventListener('submit',e=>{
  e.preventDefault();
  if(!settings.ordersEnabled){showToast('Orders are temporarily unavailable.');return}
  const raw=document.getElementById('massOrders').value.trim();if(!raw){showToast('Add at least one line.');return}
  const lines=raw.split(/\n+/).map(x=>x.trim()).filter(Boolean),orders=demoOrders();let added=0;
  for(const line of lines){
    const [serviceId,link,qtyRaw]=line.split('|').map(x=>x&&x.trim()),qtyNum=Number(qtyRaw);
    const service=allServices().find(s=>String(s.id)===String(serviceId));
    if(service&&link&&qtyNum>=service.min&&qtyNum<=service.max){
      orders.unshift({id:Math.floor(Date.now()/1000)+added,service:service.name,serviceId:service.id,link,qty:qtyNum,charge:'৳'+((qtyNum/1000)*service.rate).toFixed(2),status:'Pending',created:new Date().toLocaleString()});added++
    }
  }
  localStorage.setItem('demoOrders',JSON.stringify(orders));showToast(added+' orders added.');document.getElementById('massOrders').value=''
});

const refillForm=document.getElementById('refillForm');
if(refillForm)refillForm.addEventListener('submit',e=>{
  e.preventDefault();const id=document.getElementById('refillOrderId').value.trim();
  if(!id){showToast('Enter an order ID.');return}
  const reqs=safeParse('demoRefills',[]);reqs.unshift({id,created:new Date().toLocaleString(),status:'Pending'});
  localStorage.setItem('demoRefills',JSON.stringify(reqs));showToast('Refill request submitted.');refillForm.reset()
});

const recentBody=document.getElementById('recentCompletedBody');
if(recentBody){
  const done=demoOrders().filter(o=>o.status==='Completed');
  recentBody.innerHTML=done.length?done.map(o=>'<tr><td>#'+o.id+'</td><td>'+o.service+'</td><td>'+o.qty+'</td><td>'+o.created+'</td></tr>').join(''):'<tr><td colspan="4"><div class="empty">No completed orders yet.</div></td></tr>'
}

const accountForm=document.getElementById('accountForm');
if(accountForm)accountForm.addEventListener('submit',e=>{
  e.preventDefault();const p=getDemoProfile();
  p.username=document.getElementById('accountUsername').value.trim()||p.username||'customer';
  p.email=document.getElementById('accountEmail').value.trim()||p.email||'customer@example.com';
  setDemoProfile(p);showToast('Account saved.');setTimeout(()=>location.reload(),450)
});

const serviceSearch=document.getElementById('serviceSearch');
if(serviceSearch)serviceSearch.addEventListener('input',()=>{
  const q=serviceSearch.value.trim().toLowerCase();
  document.querySelectorAll('#servicesTable tbody tr').forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q)?'':'none')
});

function appendCustomServicesToTable(){
  const tbody=document.querySelector('#servicesTable tbody');if(!tbody)return;
  getCustomServices().forEach(s=>{
    const tr=document.createElement('tr');
    tr.innerHTML='<td>'+s.id+'</td><td>'+s.name+'</td><td>৳'+s.rate+'</td><td>'+s.min+'</td><td>'+s.max+'</td>';
    tbody.appendChild(tr)
  })
}
appendCustomServicesToTable();

document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.header');
  const side=document.querySelector('.sidebar');
  const toggle=document.querySelector('[data-menu-toggle]');
  if(header){
    const left=header.firstElementChild;
    if(left){
      left.classList.add('header-left');
      if(!left.querySelector('.mobile-brand')){
        const brand=document.createElement('a');
        brand.href='index.html';brand.className='mobile-brand';
        brand.innerHTML='<span class="mini-logo">AS</span><span>'+getSettings().siteName+'</span>';
        left.appendChild(brand)
      }
    }
  }
  let backdrop=document.querySelector('.sidebar-backdrop');
  if(!backdrop){backdrop=document.createElement('div');backdrop.className='sidebar-backdrop';document.body.appendChild(backdrop)}
  function syncMenu(){const opened=side&&side.classList.contains('open');backdrop.classList.toggle('show',!!opened);document.body.classList.toggle('menu-open',!!opened)}
  function closeMenu(){if(side)side.classList.remove('open');syncMenu()}
  if(toggle)toggle.addEventListener('click',()=>setTimeout(syncMenu,0));
  backdrop.addEventListener('click',closeMenu);
  document.querySelectorAll('.sidebar .nav a').forEach(a=>a.addEventListener('click',()=>{if(window.innerWidth<=1100)closeMenu()}));
  window.addEventListener('resize',()=>{if(window.innerWidth>1100)closeMenu()});

  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const sideNav=document.querySelector('.sidebar .nav');
  if(sideNav && !sideNav.querySelector('a[href="admin.html"]')){
    const sessionHeading=[...sideNav.querySelectorAll('.nav-section')].find(x=>x.textContent.trim().toLowerCase()==='session');
    const adminLink=document.createElement('a');adminLink.href='admin.html';adminLink.textContent='Admin Panel';
    if(path==='admin.html')adminLink.classList.add('active');
    if(sessionHeading)sideNav.insertBefore(adminLink,sessionHeading);else sideNav.appendChild(adminLink)
  }

  if(document.querySelector('.content')&&!document.querySelector('.mobile-bottom-nav')){
    const bottom=document.createElement('nav');bottom.className='mobile-bottom-nav';
    [['index.html','⌂','Home'],['orders.html','▤','Orders'],['services.html','★','Services'],['addfunds.html','৳','Funds']].forEach(([href,ico,label])=>{
      const a=document.createElement('a');a.href=href;a.innerHTML='<span class="nav-ico">'+ico+'</span><span>'+label+'</span>';if(path===href)a.classList.add('active');bottom.appendChild(a)
    });
    const more=document.createElement('button');more.type='button';more.innerHTML='<span class="nav-ico">☰</span><span>Menu</span>';
    more.addEventListener('click',()=>{if(!side)return;side.classList.add('open');document.body.classList.add('menu-open');const b=document.querySelector('.sidebar-backdrop');if(b)b.classList.add('show')});
    bottom.appendChild(more);document.body.appendChild(bottom)
  }

  if(path==='index.html'&&settings.announcement){
    const main=document.querySelector('main.page');
    if(main&&!main.querySelector('.site-announcement')){
      const n=document.createElement('div');n.className='site-announcement';n.textContent=settings.announcement;main.prepend(n)
    }
  }

  if(path==='admin.html') initAdmin();
});

function initAdmin(){
  const s=getSettings(),p=getDemoProfile(),orders=demoOrders(),refills=safeParse('demoRefills',[]);
  const cost=orders.reduce((sum,o)=>sum+(parseFloat(String(o.charge||'').replace(/[^0-9.]/g,''))||0),0);
  setText('adminUsers',p.username||p.email?1:0);setText('adminOrders',orders.length);setText('adminRevenue','৳'+cost.toFixed(2));
  setText('adminPending',orders.filter(o=>o.status==='Pending').length);setText('adminRefills',refills.length);
  setText('adminUsername',p.username||'No customer');setText('adminEmail',p.email||'No email');
  const bal=document.getElementById('adminBalance');if(bal)bal.value=Number(p.balance??s.defaultBalance).toFixed(2);

  const map={siteName:s.siteName,siteAnnouncement:s.announcement,siteSupportEmail:s.supportEmail,siteSupportTelegram:s.supportTelegram,siteDefaultBalance:s.defaultBalance};
  Object.entries(map).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.value=v});
  const ordersToggle=document.getElementById('siteOrdersEnabled');if(ordersToggle)ordersToggle.checked=!!s.ordersEnabled;
  const regToggle=document.getElementById('siteRegistrationEnabled');if(regToggle)regToggle.checked=!!s.registrationEnabled;

  const tbody=document.getElementById('adminOrdersBody');
  if(tbody)tbody.innerHTML=orders.length?orders.map(o=>'<tr><td>#'+o.id+'</td><td>'+o.service+'</td><td>'+o.qty+'</td><td>'+o.charge+'</td><td><span class="badge">'+o.status+'</span></td><td><div class="admin-actions">'+(o.status==='Completed'?'':'<button class="btn btn-outline" data-admin-complete="'+o.id+'">Complete</button>')+'<button class="btn btn-outline" data-admin-delete="'+o.id+'">Delete</button></div></td></tr>').join(''):'<tr><td colspan="6"><div class="empty">No orders yet.</div></td></tr>';

  const settingsForm=document.getElementById('siteSettingsForm');
  if(settingsForm)settingsForm.addEventListener('submit',e=>{
    e.preventDefault();
    saveSettings({
      siteName:document.getElementById('siteName').value.trim()||'Amar Shop',
      announcement:document.getElementById('siteAnnouncement').value.trim(),
      supportEmail:document.getElementById('siteSupportEmail').value.trim(),
      supportTelegram:document.getElementById('siteSupportTelegram').value.trim(),
      defaultBalance:Math.max(0,Number(document.getElementById('siteDefaultBalance').value||0)),
      ordersEnabled:document.getElementById('siteOrdersEnabled').checked,
      registrationEnabled:document.getElementById('siteRegistrationEnabled').checked
    });
    showToast('Website settings saved.');setTimeout(()=>location.reload(),450)
  });

  const balanceForm=document.getElementById('adminBalanceForm');
  if(balanceForm)balanceForm.addEventListener('submit',e=>{
    e.preventDefault();const pr=getDemoProfile();pr.balance=Math.max(0,Number(document.getElementById('adminBalance').value||0));setDemoProfile(pr);showToast('Balance updated.');setTimeout(()=>location.reload(),400)
  });

  const clearBtn=document.getElementById('adminClearOrders');
  if(clearBtn)clearBtn.addEventListener('click',()=>{if(confirm('Clear all orders from this browser?')){localStorage.removeItem('demoOrders');showToast('Orders cleared.');setTimeout(()=>location.reload(),400)}});

  const exportBtn=document.getElementById('adminExportData');
  if(exportBtn)exportBtn.addEventListener('click',()=>{
    const payload={settings:getSettings(),profile:getDemoProfile(),services:getCustomServices(),orders:demoOrders(),refills:safeParse('demoRefills',[]),exportedAt:new Date().toISOString()};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='amar-shop-data.json';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast('Data exported.')
  });

  const sf=document.getElementById('adminServiceForm');
  if(sf)sf.addEventListener('submit',e=>{
    e.preventDefault();
    const list=getCustomServices();
    const id=Number(document.getElementById('adminServiceId').value);
    if(allServices().some(x=>Number(x.id)===id)){showToast('Service ID already exists.');return}
    list.push({
      id,
      platform:document.getElementById('adminServicePlatform').value,
      name:document.getElementById('adminServiceName').value.trim(),
      rate:Number(document.getElementById('adminServiceRate').value),
      min:Number(document.getElementById('adminServiceMin').value),
      max:Number(document.getElementById('adminServiceMax').value),
      desc:document.getElementById('adminServiceDesc').value.trim()||'Custom service'
    });
    localStorage.setItem('customServices',JSON.stringify(list));showToast('Service added.');setTimeout(()=>location.reload(),400)
  });
  renderAdminServices()
}

function renderAdminServices(){
  const box=document.getElementById('adminServiceList');if(!box)return;
  const list=getCustomServices();
  box.innerHTML=list.length?list.map(s=>'<div class="admin-row"><div class="meta"><b>#'+s.id+' '+s.name+'</b><small>'+s.platform+' • ৳'+s.rate+'/1000 • '+s.min+'-'+s.max+'</small></div><button class="btn btn-outline" data-delete-service="'+s.id+'">Delete</button></div>').join(''):'<div class="empty">No custom services added yet.</div>'
}

document.addEventListener('click',e=>{
  const complete=e.target.closest('[data-admin-complete]');
  if(complete){const id=String(complete.dataset.adminComplete),orders=demoOrders(),found=orders.find(o=>String(o.id)===id);if(found){found.status='Completed';localStorage.setItem('demoOrders',JSON.stringify(orders));showToast('Order completed.');setTimeout(()=>location.reload(),350)}}
  const del=e.target.closest('[data-admin-delete]');
  if(del){const id=String(del.dataset.adminDelete);localStorage.setItem('demoOrders',JSON.stringify(demoOrders().filter(o=>String(o.id)!==id)));showToast('Order deleted.');setTimeout(()=>location.reload(),350)}
  const ds=e.target.closest('[data-delete-service]');
  if(ds){const id=String(ds.dataset.deleteService);localStorage.setItem('customServices',JSON.stringify(getCustomServices().filter(s=>String(s.id)!==id)));showToast('Service deleted.');setTimeout(()=>location.reload(),350)}
});


// Official support/contact rendering
document.addEventListener('DOMContentLoaded',()=>{
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const s=getSettings();
  if(path==='tickets.html'){
    const cards=document.querySelectorAll('main.page .card');
    const supportCard=[...cards].find(card=>/Contact options/i.test(card.textContent));
    if(supportCard){
      const timeline=supportCard.querySelector('.timeline');
      if(timeline){
        timeline.innerHTML=
          '<div class="timeline-item"><b>Email Support</b><div class="muted">'+(s.supportEmail||'Not configured')+'</div></div>'+
          '<div class="timeline-item"><b>Telegram Support</b><div class="muted">'+(s.supportTelegram||'Not configured')+'</div></div>'+
          '<div class="timeline-item"><b>Support Status</b><div class="muted">Support center available</div></div>';
      }
    }
  }
});
