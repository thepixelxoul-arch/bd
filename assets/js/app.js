const body=document.body,themeBtn=document.querySelector('[data-theme-toggle]'),sidebar=document.querySelector('.sidebar'),menuBtn=document.querySelector('[data-menu-toggle]');
if(localStorage.getItem('theme')==='dark')body.classList.add('dark');
if(themeBtn)themeBtn.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('theme',body.classList.contains('dark')?'dark':'light')});
if(menuBtn)menuBtn.addEventListener('click',()=>sidebar.classList.toggle('open'));

const services={
 facebook:[{id:101,name:'Facebook Page Followers',rate:45,min:100,max:10000,desc:'Stable delivery • Refill supported'},{id:102,name:'Facebook Post Reactions',rate:30,min:50,max:5000,desc:'Mixed reactions • Fast start'}],
 instagram:[{id:201,name:'Instagram Followers',rate:60,min:100,max:10000,desc:'Global followers • Medium speed'},{id:202,name:'Instagram Likes',rate:25,min:50,max:20000,desc:'Fast likes • No refill'}],
 youtube:[{id:301,name:'YouTube Views',rate:80,min:100,max:50000,desc:'Worldwide views • Gradual delivery'},{id:302,name:'YouTube Likes',rate:55,min:50,max:10000,desc:'High quality likes'}],
 tiktok:[{id:401,name:'TikTok Views',rate:18,min:100,max:100000,desc:'Very fast start'},{id:402,name:'TikTok Followers',rate:70,min:100,max:10000,desc:'Mixed global followers'}]
};
const cat=document.getElementById('category'),svc=document.getElementById('service'),qty=document.getElementById('quantity'),charge=document.getElementById('charge');
function currentService(){if(!cat||!svc)return null;return(services[cat.value]||[]).find(s=>String(s.id)===String(svc.value))}
function calcCharge(){const s=currentService();if(!s||!qty||!charge)return;const q=Number(qty.value||0);charge.value=q?'৳'+((q/1000)*s.rate).toFixed(2):'৳0.00'}
function updateInfo(){const s=currentService();if(!s)return;const map={serviceName:s.id+' - '+s.name,serviceStart:'0-30 minutes',serviceSpeed:'Varies by service',serviceRefill:s.desc.includes('Refill')?'Available':'N/A',serviceQuality:'Standard',serviceMinMax:s.min+' - '+s.max,serviceDesc:s.desc};Object.entries(map).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=v});calcCharge()}
function updateServices(){if(!cat||!svc)return;svc.innerHTML=(services[cat.value]||[]).map(s=>'<option value="'+s.id+'">'+s.id+' - '+s.name+'</option>').join('');updateInfo()}
if(cat)cat.addEventListener('change',updateServices);if(svc)svc.addEventListener('change',updateInfo);if(qty)qty.addEventListener('input',calcCharge);updateServices();
document.querySelectorAll('.platform').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.platform').forEach(x=>x.classList.remove('active'));btn.classList.add('active');if(btn.dataset.platform!=='all'&&cat){cat.value=btn.dataset.platform;cat.dispatchEvent(new Event('change'))}}));
const form=document.getElementById('orderForm');
if(form)form.addEventListener('submit',e=>{e.preventDefault();const link=document.getElementById('link').value.trim(),s=currentService(),q=Number(qty.value||0);if(!link||!s||q<s.min||q>s.max){alert('Please enter a valid link and quantity.');return}const orders=JSON.parse(localStorage.getItem('demoOrders')||'[]');orders.unshift({id:Math.floor(Date.now()/1000),service:s.name,qty:q,charge:charge.value,status:'Pending',created:new Date().toLocaleString()});localStorage.setItem('demoOrders',JSON.stringify(orders));alert('Demo order saved in this browser.');form.reset();updateServices()});
const tbody=document.getElementById('ordersBody');if(tbody){const orders=JSON.parse(localStorage.getItem('demoOrders')||'[]');tbody.innerHTML=orders.length?orders.map(o=>'<tr><td>#'+o.id+'</td><td>'+o.service+'</td><td>'+o.qty+'</td><td>'+o.charge+'</td><td><span class="badge">'+o.status+'</span></td><td>'+o.created+'</td><td>'+(o.status==='Completed'?'—':'<button class="btn btn-outline" data-complete-order="'+o.id+'">Complete</button>')+'</td></tr>').join(''):'<tr><td colspan="7" class="muted">No demo orders yet.</td></tr>'}
// Extended demo functionality
function showToast(msg){const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2200)}
function getDemoProfile(){try{return JSON.parse(localStorage.getItem('demoProfile')||'{}')}catch(e){return{}}}
function setDemoProfile(p){localStorage.setItem('demoProfile',JSON.stringify(p))}
function demoOrders(){try{return JSON.parse(localStorage.getItem('demoOrders')||'[]')}catch(e){return[]}}

const regForm=document.getElementById('registerForm');
if(regForm)regForm.addEventListener('submit',e=>{e.preventDefault();const username=document.getElementById('regUsername').value.trim(),email=document.getElementById('regEmail').value.trim(),password=document.getElementById('regPassword').value;if(!username||!email||password.length<6){showToast('Fill all fields and use at least 6 password characters.');return}setDemoProfile({username,email,password,balance:500});localStorage.setItem('demoSession','1');location.href='index.html'});

const loginForm=document.getElementById('loginForm');
if(loginForm)loginForm.addEventListener('submit',e=>{e.preventDefault();const p=getDemoProfile(),login=document.getElementById('loginUser').value.trim(),password=document.getElementById('loginPassword').value;if((p.username===login||p.email===login)&&p.password===password){localStorage.setItem('demoSession','1');location.href='index.html'}else{showToast('Demo account not found. Register first.')}});

document.querySelectorAll('[data-logout]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();localStorage.removeItem('demoSession');location.href='login.html'}));
document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{const target=document.querySelector(btn.dataset.copy);if(!target)return;try{await navigator.clipboard.writeText(target.value||target.textContent);showToast('Copied')}catch(e){showToast('Copy failed')}}));

const profile=getDemoProfile();
document.querySelectorAll('[data-demo-username]').forEach(el=>{if(el.matches('input,textarea'))el.value=profile.username||'demo_user';else el.textContent=profile.username||'demo_user'});
document.querySelectorAll('[data-demo-email]').forEach(el=>{if(el.matches('input,textarea'))el.value=profile.email||'demo@example.com';else el.textContent=profile.email||'demo@example.com'});
document.querySelectorAll('[data-demo-balance]').forEach(el=>el.textContent='৳'+Number(profile.balance??500).toFixed(2));

const dashOrders=demoOrders();
const totalCost=dashOrders.reduce((sum,o)=>sum+(parseFloat(String(o.charge||'').replace(/[^0-9.]/g,''))||0),0);
const setText=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};
setText('dashTotalOrders',dashOrders.length);setText('dashTotalCost','৳'+totalCost.toFixed(2));setText('dashPending',dashOrders.filter(o=>o.status==='Pending').length);setText('dashCompleted',dashOrders.filter(o=>o.status==='Completed').length);

const massForm=document.getElementById('massOrderForm');
if(massForm)massForm.addEventListener('submit',e=>{e.preventDefault();const raw=document.getElementById('massOrders').value.trim();if(!raw){showToast('Add at least one line.');return}const lines=raw.split(/\n+/).map(x=>x.trim()).filter(Boolean),orders=demoOrders();let added=0;for(const line of lines){const [serviceId,link,qtyRaw]=line.split('|').map(x=>x&&x.trim());const qtyNum=Number(qtyRaw);if(serviceId&&link&&qtyNum>0){orders.unshift({id:Math.floor(Date.now()/1000)+added,service:'Service '+serviceId,link,qty:qtyNum,charge:'৳0.00',status:'Pending',created:new Date().toLocaleString()});added++}}localStorage.setItem('demoOrders',JSON.stringify(orders));showToast(added+' demo orders added.');document.getElementById('massOrders').value=''});

const refillForm=document.getElementById('refillForm');
if(refillForm)refillForm.addEventListener('submit',e=>{e.preventDefault();const id=document.getElementById('refillOrderId').value.trim();if(!id){showToast('Enter an order ID.');return}const reqs=JSON.parse(localStorage.getItem('demoRefills')||'[]');reqs.unshift({id,created:new Date().toLocaleString(),status:'Pending'});localStorage.setItem('demoRefills',JSON.stringify(reqs));showToast('Refill request saved locally.');refillForm.reset()});

const recentBody=document.getElementById('recentCompletedBody');
if(recentBody){const done=dashOrders.filter(o=>o.status==='Completed');recentBody.innerHTML=done.length?done.map(o=>'<tr><td>#'+o.id+'</td><td>'+o.service+'</td><td>'+o.qty+'</td><td>'+o.created+'</td></tr>').join(''):'<tr><td colspan="4"><div class="empty">No completed demo orders yet.</div></td></tr>'}

const accountForm=document.getElementById('accountForm');
if(accountForm)accountForm.addEventListener('submit',e=>{e.preventDefault();const p=getDemoProfile();p.username=document.getElementById('accountUsername').value.trim()||p.username||'demo_user';p.email=document.getElementById('accountEmail').value.trim()||p.email||'demo@example.com';setDemoProfile(p);showToast('Demo profile saved.');setTimeout(()=>location.reload(),500)});

document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-complete-order]');
  if(!btn)return;
  const id=String(btn.dataset.completeOrder);
  const orders=demoOrders();
  const found=orders.find(o=>String(o.id)===id);
  if(found){found.status='Completed';localStorage.setItem('demoOrders',JSON.stringify(orders));showToast('Order marked completed.');setTimeout(()=>location.reload(),400)}
});

const serviceSearch=document.getElementById('serviceSearch');
if(serviceSearch)serviceSearch.addEventListener('input',()=>{
  const q=serviceSearch.value.trim().toLowerCase();
  document.querySelectorAll('#servicesTable tbody tr').forEach(row=>{row.style.display=row.textContent.toLowerCase().includes(q)?'':'none'})
});


// Amar Shop responsive navigation enhancements
document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.header');
  const side=document.querySelector('.sidebar');
  const toggle=document.querySelector('[data-menu-toggle]');
  const theme=document.querySelector('[data-theme-toggle]');

  if(header){
    const left=header.firstElementChild;
    if(left){
      left.classList.add('header-left');
      if(!left.querySelector('.mobile-brand')){
        const brand=document.createElement('a');
        brand.href='index.html';
        brand.className='mobile-brand';
        brand.innerHTML='<span class="mini-logo">AS</span><span>Amar Shop</span>';
        left.appendChild(brand);
      }
    }
  }

  let backdrop=document.querySelector('.sidebar-backdrop');
  if(!backdrop){
    backdrop=document.createElement('div');
    backdrop.className='sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  function syncMenu(){
    const opened=side&&side.classList.contains('open');
    backdrop.classList.toggle('show',!!opened);
    document.body.classList.toggle('menu-open',!!opened);
  }
  function closeMenu(){
    if(side)side.classList.remove('open');
    syncMenu();
  }

  if(toggle)toggle.addEventListener('click',()=>setTimeout(syncMenu,0));
  backdrop.addEventListener('click',closeMenu);
  document.querySelectorAll('.sidebar .nav a').forEach(a=>a.addEventListener('click',()=>{
    if(window.innerWidth<=1100)closeMenu();
  }));
  window.addEventListener('resize',()=>{if(window.innerWidth>1100)closeMenu()});

  function syncThemeLabel(){
    if(theme)theme.textContent=document.body.classList.contains('dark')?'☀️ Light':'🌙 Dark';
  }
  syncThemeLabel();
  if(theme)theme.addEventListener('click',()=>setTimeout(syncThemeLabel,0));
});
// Amar Shop mobile bottom nav + admin tools
document.addEventListener('DOMContentLoaded',()=>{
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const side=document.querySelector('.sidebar');
  const sideNav=document.querySelector('.sidebar .nav');

  // Add Admin Panel link to the sidebar on every dashboard page.
  if(sideNav && !sideNav.querySelector('a[href="admin.html"]')){
    const sessionHeading=[...sideNav.querySelectorAll('.nav-section')].find(x=>x.textContent.trim().toLowerCase()==='session');
    const adminLink=document.createElement('a');
    adminLink.href='admin.html';
    adminLink.textContent='Admin Panel';
    if(path==='admin.html') adminLink.classList.add('active');
    if(sessionHeading) sideNav.insertBefore(adminLink,sessionHeading);
    else sideNav.appendChild(adminLink);
  }

  // Bottom navigation for phones.
  if(document.querySelector('.content') && !document.querySelector('.mobile-bottom-nav')){
    const bottom=document.createElement('nav');
    bottom.className='mobile-bottom-nav';
    const items=[
      ['index.html','⌂','Home'],
      ['orders.html','▤','Orders'],
      ['services.html','★','Services'],
      ['addfunds.html','৳','Funds']
    ];
    items.forEach(([href,ico,label])=>{
      const a=document.createElement('a');
      a.href=href;
      a.innerHTML='<span class="nav-ico">'+ico+'</span><span>'+label+'</span>';
      if(path===href) a.classList.add('active');
      bottom.appendChild(a);
    });
    const more=document.createElement('button');
    more.type='button';
    more.innerHTML='<span class="nav-ico">☰</span><span>Menu</span>';
    more.addEventListener('click',()=>{
      if(!side)return;
      side.classList.add('open');
      document.body.classList.add('menu-open');
      const backdrop=document.querySelector('.sidebar-backdrop');
      if(backdrop) backdrop.classList.add('show');
    });
    bottom.appendChild(more);
    document.body.appendChild(bottom);
  }

  // Admin dashboard values.
  if(path==='admin.html'){
    const p=getDemoProfile();
    const orders=demoOrders();
    const refills=JSON.parse(localStorage.getItem('demoRefills')||'[]');
    const cost=orders.reduce((sum,o)=>sum+(parseFloat(String(o.charge||'').replace(/[^0-9.]/g,''))||0),0);
    setText('adminUsers',p.username||p.email?1:0);
    setText('adminOrders',orders.length);
    setText('adminRevenue','৳'+cost.toFixed(2));
    setText('adminPending',orders.filter(o=>o.status==='Pending').length);
    setText('adminRefills',refills.length);
    setText('adminUsername',p.username||'No demo user');
    setText('adminEmail',p.email||'No email');
    const bal=document.getElementById('adminBalance');
    if(bal) bal.value=Number(p.balance??500).toFixed(2);

    const tbody=document.getElementById('adminOrdersBody');
    if(tbody){
      tbody.innerHTML=orders.length?orders.map(o=>
        '<tr><td>#'+o.id+'</td><td>'+o.service+'</td><td>'+o.qty+'</td><td>'+o.charge+'</td><td><span class="badge">'+o.status+'</span></td><td><div class="admin-actions">'+
        (o.status==='Completed'?'':'<button class="btn btn-outline" data-admin-complete="'+o.id+'">Complete</button>')+
        '<button class="btn btn-outline" data-admin-delete="'+o.id+'">Delete</button></div></td></tr>'
      ).join(''):'<tr><td colspan="6"><div class="empty">No demo orders yet.</div></td></tr>';
    }

    const balanceForm=document.getElementById('adminBalanceForm');
    if(balanceForm) balanceForm.addEventListener('submit',e=>{
      e.preventDefault();
      const profile=getDemoProfile();
      profile.balance=Math.max(0,Number(document.getElementById('adminBalance').value||0));
      setDemoProfile(profile);
      showToast('Demo balance updated.');
      setTimeout(()=>location.reload(),450);
    });

    const clearBtn=document.getElementById('adminClearOrders');
    if(clearBtn) clearBtn.addEventListener('click',()=>{
      if(confirm('Clear all demo orders from this browser?')){
        localStorage.removeItem('demoOrders');
        showToast('Demo orders cleared.');
        setTimeout(()=>location.reload(),450);
      }
    });

    const exportBtn=document.getElementById('adminExportData');
    if(exportBtn) exportBtn.addEventListener('click',()=>{
      const payload={
        profile:getDemoProfile(),
        orders:demoOrders(),
        refills:JSON.parse(localStorage.getItem('demoRefills')||'[]'),
        exportedAt:new Date().toISOString()
      };
      const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;a.download='amar-shop-demo-data.json';
      document.body.appendChild(a);a.click();a.remove();
      URL.revokeObjectURL(url);
      showToast('Demo data exported.');
    });
  }
});

document.addEventListener('click',e=>{
  const complete=e.target.closest('[data-admin-complete]');
  if(complete){
    const id=String(complete.dataset.adminComplete);
    const orders=demoOrders();
    const found=orders.find(o=>String(o.id)===id);
    if(found){
      found.status='Completed';
      localStorage.setItem('demoOrders',JSON.stringify(orders));
      showToast('Order completed.');
      setTimeout(()=>location.reload(),350);
    }
  }
  const del=e.target.closest('[data-admin-delete]');
  if(del){
    const id=String(del.dataset.adminDelete);
    const orders=demoOrders().filter(o=>String(o.id)!==id);
    localStorage.setItem('demoOrders',JSON.stringify(orders));
    showToast('Order deleted.');
    setTimeout(()=>location.reload(),350);
  }
});
