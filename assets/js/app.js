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
  youtube:[
    {id:301,name:'YouTube Views',rate:80,min:100,max:50000,desc:'Worldwide views • Gradual delivery'},
    {id:302,name:'YouTube Likes',rate:55,min:50,max:10000,desc:'High quality likes'}
  ],
  facebook:[
    {id:101,name:'Facebook Page Followers',rate:45,min:100,max:10000,desc:'Stable delivery • Refill supported'},
    {id:102,name:'Facebook Post Reactions',rate:30,min:50,max:5000,desc:'Mixed reactions • Fast start'}
  ],
  instagram:[
    {id:201,name:'Instagram Followers',rate:60,min:100,max:10000,desc:'Global followers • Medium speed'},
    {id:202,name:'Instagram Likes',rate:25,min:50,max:20000,desc:'Fast likes • No refill'}
  ],
  tiktok:[
    {id:401,name:'TikTok Views',rate:18,min:100,max:100000,desc:'Very fast start'},
    {id:402,name:'TikTok Followers',rate:70,min:100,max:10000,desc:'Mixed global followers'}
  ],
  telegram:[
    {id:501,name:'Telegram Channel Members',rate:65,min:100,max:20000,desc:'Channel members • Gradual delivery'}
  ],
  twitter:[
    {id:601,name:'X (Twitter) Post Likes',rate:55,min:50,max:10000,desc:'Post engagement • Standard delivery'}
  ],
  linkedin:[
    {id:701,name:'LinkedIn Post Reactions',rate:95,min:25,max:5000,desc:'Professional network engagement'}
  ],
  discord:[
    {id:801,name:'Discord Server Members',rate:120,min:50,max:5000,desc:'Server members • Gradual delivery'}
  ],
  spotify:[
    {id:901,name:'Spotify Plays',rate:35,min:500,max:100000,desc:'Track plays • Gradual delivery'}
  ],
  twitch:[
    {id:1001,name:'Twitch Followers',rate:85,min:50,max:10000,desc:'Channel followers • Standard delivery'}
  ],
  soundcloud:[
    {id:1101,name:'SoundCloud Plays',rate:30,min:500,max:100000,desc:'Track plays • Standard delivery'}
  ],
  webtraffic:[
    {id:1201,name:'Website Traffic',rate:25,min:1000,max:100000,desc:'Website visits • Mixed sources'}
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

function renderServicesTable(){
  const tbody=document.querySelector('#servicesTable tbody');if(!tbody)return;
  tbody.innerHTML=allServices().map(s=>'<tr><td>'+s.id+'</td><td>'+s.name+'</td><td>৳'+s.rate+'</td><td>'+s.min+'</td><td>'+s.max+'</td></tr>').join('')
}
renderServicesTable();

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
// Amar Shop Large Platform Experience v3
const PLATFORM_PAGES=[
  {href:'dashboard.html',label:'Home',icon:'⌂',group:'Core',keywords:'home dashboard overview'},
  {href:'discover.html',label:'Discover',icon:'◈',group:'Explore',keywords:'discover browse popular services'},
  {href:'favorites.html',label:'Favorites',icon:'♡',group:'Explore',keywords:'favorites saved services'},
  {href:'wallet.html',label:'Wallet',icon:'৳',group:'Finance',keywords:'wallet balance funds'},
  {href:'transactions.html',label:'Transactions',icon:'⇄',group:'Finance',keywords:'transactions payments history'},
  {href:'activity.html',label:'Activity',icon:'◷',group:'Account',keywords:'activity history actions'},
  {href:'notifications.html',label:'Notifications',icon:'♢',group:'Account',keywords:'notifications alerts updates'},
  {href:'security.html',label:'Security',icon:'⌾',group:'Account',keywords:'security password sessions'},
  {href:'help-center.html',label:'Help Center',icon:'?',group:'Help',keywords:'help guides support'},
  {href:'faq.html',label:'FAQ',icon:'Q',group:'Help',keywords:'frequently asked questions'},
  {href:'status.html',label:'System Status',icon:'●',group:'Help',keywords:'status uptime systems'},
  {href:'about.html',label:'About',icon:'i',group:'Company',keywords:'about company platform'},
  {href:'contact.html',label:'Contact',icon:'✉',group:'Company',keywords:'contact email telegram'},
  {href:'terms.html',label:'Terms',icon:'§',group:'Company',keywords:'terms conditions policy'},
  {href:'privacy.html',label:'Privacy',icon:'◇',group:'Company',keywords:'privacy data'}
];

function esc(v){
  return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))
}
function currentPath(){return (location.pathname.split('/').pop()||'index.html').toLowerCase()}
function getFavorites(){return safeParse('favoriteServices',[]).map(String)}
function saveFavorites(v){localStorage.setItem('favoriteServices',JSON.stringify([...new Set(v.map(String))]))}
function toggleFavorite(id){
  const fav=getFavorites(),sid=String(id),next=fav.includes(sid)?fav.filter(x=>x!==sid):[...fav,sid];
  saveFavorites(next);return next.includes(sid)
}
function getNotifications(){
  const existing=safeParse('amarNotifications',null);
  if(existing)return existing;
  const seed=[
    {id:'n1',icon:'✨',title:'Welcome to Amar Shop',text:'Your account dashboard is ready to use.',time:'Today',read:false,href:'dashboard.html'},
    {id:'n2',icon:'⚡',title:'Fast order workflow',text:'Choose a platform and submit an order from New Order.',time:'Today',read:false,href:'index.html'},
    {id:'n3',icon:'🛟',title:'Support center',text:'Need help? Open the Help Center or Support page.',time:'Today',read:true,href:'help-center.html'}
  ];
  localStorage.setItem('amarNotifications',JSON.stringify(seed));return seed
}
function saveNotifications(v){localStorage.setItem('amarNotifications',JSON.stringify(v))}
function markNotificationsRead(){
  const n=getNotifications().map(x=>({...x,read:true}));saveNotifications(n);renderHeaderNotifications();renderNotificationsPage()
}
function addActivity(type,title,detail){
  const list=safeParse('amarActivity',[]);
  list.unshift({id:Date.now(),type,title,detail,time:new Date().toLocaleString()});
  localStorage.setItem('amarActivity',JSON.stringify(list.slice(0,100)))
}
function getActivity(){
  const own=safeParse('amarActivity',[]);
  const orderItems=demoOrders().map(o=>({id:'o'+o.id,type:'order',title:'Order #'+o.id,detail:o.service+' • '+o.status,time:o.created}));
  return [...own,...orderItems].sort((a,b)=>String(b.id).localeCompare(String(a.id)))
}
function platformEmoji(platform){
  return ({youtube:'▶️',facebook:'f',instagram:'◎',tiktok:'♪',telegram:'➤',twitter:'𝕏',linkedin:'in',discord:'◉',spotify:'◉',twitch:'◫',soundcloud:'☁',webtraffic:'↗'})[platform]||'★'
}
function serviceCard(s){
  const fav=getFavorites().includes(String(s.id));
  return '<article class="market-card" data-service-card="'+esc(s.id)+'">'+
    '<button class="fav-btn'+(fav?' active':'')+'" data-favorite-service="'+esc(s.id)+'" aria-label="Favorite">'+(fav?'♥':'♡')+'</button>'+
    '<div class="market-top"><div class="market-logo">'+esc(platformEmoji(s.platform))+'</div><div class="market-title"><b>'+esc(s.name)+'</b><small>'+esc(s.platform)+'</small></div></div>'+
    '<div class="market-rate">৳'+Number(s.rate).toFixed(2)+' <span>/ 1000</span></div>'+
    '<div class="muted" style="font-size:12px;line-height:1.5">'+esc(s.desc||'Service available')+'</div>'+
    '<div class="market-meta"><span class="meta-chip">Min '+esc(s.min)+'</span><span class="meta-chip">Max '+esc(s.max)+'</span><span class="meta-chip">ID '+esc(s.id)+'</span></div>'+
    '<div style="margin-top:13px"><a class="btn btn-primary" href="index.html?service='+encodeURIComponent(s.id)+'">Order Now</a></div>'+
  '</article>'
}
function renderDiscover(filter='all',query=''){
  const grid=document.getElementById('discoverGrid');if(!grid)return;
  const q=query.trim().toLowerCase();
  const list=allServices().filter(s=>(filter==='all'||s.platform===filter)&&(!q||[s.id,s.name,s.platform,s.desc].join(' ').toLowerCase().includes(q)));
  grid.innerHTML=list.length?list.map(serviceCard).join(''):'<div class="card empty-state" style="grid-column:1/-1"><div class="quick-icon">⌕</div><b>No services found</b><p class="muted">Try another platform or search term.</p></div>'
}
function renderFavorites(){
  const grid=document.getElementById('favoritesGrid');if(!grid)return;
  const ids=getFavorites(),list=allServices().filter(s=>ids.includes(String(s.id)));
  grid.innerHTML=list.length?list.map(serviceCard).join(''):'<div class="card empty-state" style="grid-column:1/-1"><div class="quick-icon">♡</div><b>No favorites yet</b><p class="muted">Save services from Discover to find them quickly here.</p><a class="btn btn-primary" href="discover.html">Discover Services</a></div>'
}
function renderTransactions(){
  const box=document.getElementById('transactionList');if(!box)return;
  const p=getDemoProfile(),s=getSettings(),orders=demoOrders();
  const tx=[{icon:'🎁',title:'Starting balance',note:'Account starting balance',amount:Number(p.balance??s.defaultBalance),kind:'in',time:'Account'}];
  orders.forEach(o=>tx.push({icon:'🛒',title:o.service,note:'Order #'+o.id,amount:-(parseFloat(String(o.charge).replace(/[^0-9.]/g,''))||0),kind:'out',time:o.created}));
  box.innerHTML=tx.map(t=>'<div class="transaction-item"><div class="tx-icon">'+t.icon+'</div><div class="tx-main"><b>'+esc(t.title)+'</b><small>'+esc(t.note)+' • '+esc(t.time)+'</small></div><div class="tx-amount '+t.kind+'">'+(t.amount>=0?'+':'-')+'৳'+Math.abs(t.amount).toFixed(2)+'</div></div>').join('')
}
function renderActivity(){
  const box=document.getElementById('activityList');if(!box)return;
  const list=getActivity();
  box.innerHTML=list.length?list.map(a=>'<div class="activity-item"><div class="activity-badge">'+(a.type==='order'?'🛒':'⚡')+'</div><div class="activity-body"><b>'+esc(a.title)+'</b><p>'+esc(a.detail||'')+'</p></div><span class="activity-time">'+esc(a.time||'')+'</span></div>').join(''):'<div class="empty">No recent activity.</div>'
}
function renderNotificationsPage(){
  const box=document.getElementById('notificationsList');if(!box)return;
  const list=getNotifications();
  box.innerHTML=list.map(n=>'<a class="notice-item'+(!n.read?' unread':'')+'" href="'+esc(n.href||'#')+'" data-notification-id="'+esc(n.id)+'"><div class="notice-icon">'+esc(n.icon)+'</div><div class="notice-copy"><b>'+esc(n.title)+'</b><div>'+esc(n.text)+'</div><small>'+esc(n.time)+'</small></div></a>').join('')
}
function renderHeaderNotifications(){
  const btn=document.getElementById('headerNotifications'),pop=document.getElementById('notificationPopover');
  const list=getNotifications(),unread=list.filter(n=>!n.read).length;
  if(btn){
    const dot=btn.querySelector('.notification-dot');
    if(dot){dot.textContent=unread;dot.style.display=unread?'grid':'none'}
  }
  if(pop){
    pop.innerHTML='<div class="popover-title"><span>Notifications</span><button class="btn btn-outline" id="markAllRead" style="min-height:30px;padding:6px 9px;font-size:10px">Mark read</button></div>'+
      list.slice(0,5).map(n=>'<a class="notice-item'+(!n.read?' unread':'')+'" href="'+esc(n.href||'#')+'"><div class="notice-icon">'+esc(n.icon)+'</div><div class="notice-copy"><b>'+esc(n.title)+'</b><div>'+esc(n.text)+'</div><small>'+esc(n.time)+'</small></div></a>').join('')+
      '<div style="padding:8px"><a class="btn btn-primary" style="display:block;text-align:center" href="notifications.html">View all</a></div>';
    const mark=pop.querySelector('#markAllRead');if(mark)mark.onclick=markNotificationsRead
  }
}
function searchItems(q){
  q=q.trim().toLowerCase();if(!q)return [];
  const pages=PLATFORM_PAGES.concat([
    {href:'index.html',label:'New Order',icon:'＋',keywords:'new order create buy'},
    {href:'orders.html',label:'Orders',icon:'▤',keywords:'orders history'},
    {href:'services.html',label:'Services',icon:'★',keywords:'services rates price'},
    {href:'addfunds.html',label:'Add Funds',icon:'৳',keywords:'add funds payment'}
  ]).filter(x=>(x.label+' '+x.keywords).toLowerCase().includes(q)).map(x=>({...x,type:'Page'}));
  const services=allServices().filter(s=>[s.id,s.name,s.platform,s.desc].join(' ').toLowerCase().includes(q)).slice(0,10).map(s=>({href:'index.html?service='+s.id,label:s.name,icon:platformEmoji(s.platform),keywords:'',type:'Service'}));
  return [...pages,...services].slice(0,15)
}
function showSearch(query=''){
  let overlay=document.getElementById('searchOverlay');
  if(!overlay){
    overlay=document.createElement('div');overlay.id='searchOverlay';overlay.className='search-overlay';
    overlay.innerHTML='<div class="search-modal"><div class="search-modal-head"><span style="font-size:20px">⌕</span><input id="globalSearchInput" placeholder="Search pages, services, tools..."><button class="btn btn-outline" id="closeSearch">Esc</button></div><div class="search-results" id="globalSearchResults"></div></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click',e=>{if(e.target===overlay)hideSearch()});
    overlay.querySelector('#closeSearch').onclick=hideSearch;
    overlay.querySelector('#globalSearchInput').addEventListener('input',e=>renderSearchResults(e.target.value))
  }
  overlay.classList.add('show');
  const input=overlay.querySelector('#globalSearchInput');input.value=query;setTimeout(()=>input.focus(),0);renderSearchResults(query)
}
function hideSearch(){const o=document.getElementById('searchOverlay');if(o)o.classList.remove('show')}
function renderSearchResults(q){
  const box=document.getElementById('globalSearchResults');if(!box)return;
  const items=searchItems(q);
  box.innerHTML=q?items.length?items.map(x=>'<a class="search-result" href="'+esc(x.href)+'"><div class="search-result-icon">'+esc(x.icon||'⌕')+'</div><div class="search-result-text"><b>'+esc(x.label)+'</b><small>'+esc(x.type||'Page')+'</small></div></a>').join(''):'<div class="empty">No results found.</div>':'<div class="empty">Search services, orders, wallet, help and more.</div>'
}

document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();showSearch()}
  if(e.key==='Escape')hideSearch()
});

document.addEventListener('click',e=>{
  const fav=e.target.closest('[data-favorite-service]');
  if(fav){
    e.preventDefault();
    const active=toggleFavorite(fav.dataset.favoriteService);
    fav.classList.toggle('active',active);fav.textContent=active?'♥':'♡';
    if(currentPath()==='favorites.html')renderFavorites();
    showToast(active?'Saved to favorites':'Removed from favorites');
    addActivity('favorite',active?'Service saved':'Favorite removed','Service ID '+fav.dataset.favoriteService)
  }
  const n=e.target.closest('[data-notification-id]');
  if(n){
    const id=n.dataset.notificationId;
    saveNotifications(getNotifications().map(x=>x.id===id?{...x,read:true}:x))
  }
});

document.addEventListener('DOMContentLoaded',()=>{
  const path=currentPath(),header=document.querySelector('.header'),headerLeft=header&&header.firstElementChild,headerActions=header&&header.querySelector('.header-actions');

  // Large sidebar navigation.
  const sideNav=document.querySelector('.sidebar .nav');
  if(sideNav&&!sideNav.querySelector('[data-platform-nav="1"]')){
    const anchor=[...sideNav.querySelectorAll('.nav-section')].find(x=>x.textContent.trim().toLowerCase()==='session');
    const frag=document.createDocumentFragment();
    ['Explore','Finance','Account','Help','Company'].forEach(group=>{
      const groupItems=PLATFORM_PAGES.filter(x=>x.group===group);
      if(!groupItems.length)return;
      const title=document.createElement('div');title.className='nav-section';title.textContent=group;title.dataset.platformNav='1';frag.appendChild(title);
      groupItems.forEach(x=>{
        const a=document.createElement('a');a.href=x.href;a.dataset.platformNav='1';a.innerHTML='<span style="display:inline-block;width:19px">'+x.icon+'</span>'+x.label;
        if(path===x.href)a.classList.add('active');frag.appendChild(a)
      })
    });
    if(anchor)sideNav.insertBefore(frag,anchor);else sideNav.appendChild(frag)
  }

  // Global search and account controls.
  if(headerLeft&&!headerLeft.querySelector('.header-search')){
    const search=document.createElement('div');search.className='header-search';
    search.innerHTML='<span class="search-ico">⌕</span><input aria-label="Search" placeholder="Search Amar Shop..." readonly><span class="search-kbd">⌘K</span>';
    search.onclick=()=>showSearch();headerLeft.appendChild(search)
  }
  if(headerActions&&!document.getElementById('headerNotifications')){
    const nb=document.createElement('button');nb.id='headerNotifications';nb.className='header-icon-btn';nb.type='button';nb.innerHTML='♢<span class="notification-dot"></span>';
    const profileBtn=document.createElement('a');profileBtn.className='profile-chip';profileBtn.href='account.html';profileBtn.innerHTML='<span class="profile-avatar">'+esc((profile.username||'C').slice(0,1).toUpperCase())+'</span><span>'+esc(profile.username||'Account')+'</span>';
    headerActions.insertBefore(nb,headerActions.firstChild);headerActions.appendChild(profileBtn);
    const pop=document.createElement('div');pop.id='notificationPopover';pop.className='header-popover';document.body.appendChild(pop);
    nb.onclick=()=>{pop.classList.toggle('show');renderHeaderNotifications()}
    document.addEventListener('click',ev=>{if(!pop.contains(ev.target)&&!nb.contains(ev.target))pop.classList.remove('show')})
  }
  renderHeaderNotifications();

  // App-style mobile nav.
  const bottom=document.querySelector('.mobile-bottom-nav');
  if(bottom){
    bottom.innerHTML='';
    [['dashboard.html','⌂','Home'],['discover.html','◈','Explore'],['index.html','＋','Order'],['wallet.html','৳','Wallet']].forEach(([href,ico,label])=>{
      const a=document.createElement('a');a.href=href;a.innerHTML='<span class="nav-ico">'+ico+'</span><span>'+label+'</span>';if(path===href)a.classList.add('active');bottom.appendChild(a)
    });
    const more=document.createElement('button');more.type='button';more.innerHTML='<span class="nav-ico">☰</span><span>Menu</span>';
    more.onclick=()=>{const s=document.querySelector('.sidebar');if(s)s.classList.add('open');document.body.classList.add('menu-open');const b=document.querySelector('.sidebar-backdrop');if(b)b.classList.add('show')};bottom.appendChild(more)
  }

  // Footer.
  const main=document.querySelector('main.page');
  if(main&&!main.querySelector('.site-footer')){
    const footer=document.createElement('footer');footer.className='site-footer';
    footer.innerHTML='<span>© '+new Date().getFullYear()+' '+esc(getSettings().siteName)+' • Social services platform</span><span class="footer-links"><a href="about.html">About</a><a href="help-center.html">Help</a><a href="status.html">Status</a><a href="terms.html">Terms</a><a href="privacy.html">Privacy</a></span>';
    main.appendChild(footer)
  }

  // Rich dashboard.
  if(path==='dashboard.html'&&main&&!main.querySelector('.hero-banner')){
    const hero=document.createElement('section');hero.className='hero-banner';hero.innerHTML='<h1>Everything you need in one place.</h1><p>Browse services, manage orders, track spending, save favorites and get support from your Amar Shop dashboard.</p><div class="hero-actions"><a class="btn btn-primary" href="index.html">Create Order</a><a class="btn btn-outline" href="discover.html">Discover Services</a></div>';
    main.insertBefore(hero,main.firstChild);
    const quick=document.createElement('section');quick.style.marginTop='16px';quick.innerHTML='<div class="quick-grid">'+[
      ['index.html','＋','New Order','Create a new order'],
      ['discover.html','◈','Discover','Browse all services'],
      ['favorites.html','♡','Favorites','Your saved services'],
      ['wallet.html','৳','Wallet','Balance and funds'],
      ['activity.html','◷','Activity','Recent actions'],
      ['help-center.html','?','Help Center','Guides and support']
    ].map(x=>'<a class="quick-card" href="'+x[0]+'"><div class="quick-icon">'+x[1]+'</div><b>'+x[2]+'</b><small>'+x[3]+'</small></a>').join('')+'</div>';
    hero.insertAdjacentElement('afterend',quick)
  }

  if(path==='discover.html'){
    renderDiscover();
    document.querySelectorAll('[data-discover-filter]').forEach(btn=>btn.onclick=()=>{
      document.querySelectorAll('[data-discover-filter]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
      renderDiscover(btn.dataset.discoverFilter,document.getElementById('discoverSearch')?.value||'')
    });
    const ds=document.getElementById('discoverSearch');if(ds)ds.oninput=()=>{const active=document.querySelector('[data-discover-filter].active');renderDiscover(active?.dataset.discoverFilter||'all',ds.value)}
  }
  if(path==='favorites.html')renderFavorites();
  if(path==='transactions.html'||path==='wallet.html')renderTransactions();
  if(path==='activity.html')renderActivity();
  if(path==='notifications.html')renderNotificationsPage();

  document.querySelectorAll('.faq-q').forEach(q=>q.onclick=()=>q.closest('.faq-item').classList.toggle('open'));

  const contactForm=document.getElementById('contactForm');
  if(contactForm)contactForm.onsubmit=e=>{e.preventDefault();addActivity('support','Contact message prepared',document.getElementById('contactSubject')?.value||'Message');showToast('Message saved in preview mode.');contactForm.reset()};

  const serviceParam=new URLSearchParams(location.search).get('service');
  if(path==='index.html'&&serviceParam&&svc){
    const found=allServices().find(s=>String(s.id)===String(serviceParam));
    if(found&&cat){cat.value=found.platform;updateServices();svc.value=String(found.id);updateInfo();setTimeout(()=>document.getElementById('orderForm')?.scrollIntoView({behavior:'smooth',block:'center'}),150)}
  }
});
// Amar Shop dashboard and support polish
document.addEventListener('DOMContentLoaded',()=>{
  const s=getSettings();
  document.querySelectorAll('[data-support-email]').forEach(el=>el.textContent=s.supportEmail||'Not configured');
  document.querySelectorAll('[data-support-telegram]').forEach(el=>el.textContent=s.supportTelegram||'Not configured');

  const popular=document.getElementById('dashboardPopular');
  if(popular) popular.innerHTML=allServices().slice(0,3).map(serviceCard).join('');

  const feed=document.getElementById('dashboardActivity');
  if(feed){
    const list=getActivity().slice(0,6);
    feed.innerHTML=list.length?list.map(a=>'<div class="activity-item"><div class="activity-badge">'+(a.type==='order'?'🛒':'⚡')+'</div><div class="activity-body"><b>'+esc(a.title)+'</b><p>'+esc(a.detail||'')+'</p></div><span class="activity-time">'+esc(a.time||'')+'</span></div>').join(''):'<div class="empty">Your recent activity will appear here.</div>'
  }

  setText('adminFavorites',getFavorites().length);
  setText('adminCustomServices',getCustomServices().length);
  setText('adminUnread',getNotifications().filter(n=>!n.read).length);
});
