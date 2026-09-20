const STORE_DEFAULTS={name:'Amar Shop',tagline:'Everything you need, in one marketplace.',announcement:'Free delivery on selected products across Bangladesh.',supportEmail:'support@amarshop.example',supportPhone:'01XXXXXXXXX',freeShipping:1500,maintenance:false};
const CATEGORIES=[
  {id:'mobiles',name:'Mobiles',icon:'📱'},{id:'electronics',name:'Electronics',icon:'💻'},{id:'fashion',name:'Fashion',icon:'👕'},
  {id:'beauty',name:'Beauty',icon:'💄'},{id:'home',name:'Home & Living',icon:'🏠'},{id:'grocery',name:'Groceries',icon:'🛒'},
  {id:'appliances',name:'Appliances',icon:'🍳'},{id:'sports',name:'Sports',icon:'⚽'},{id:'books',name:'Books',icon:'📚'},
  {id:'kids',name:'Kids & Toys',icon:'🧸'},{id:'automotive',name:'Automotive',icon:'🚗'},{id:'pets',name:'Pet Supplies',icon:'🐾'}
];
const BASE_PRODUCTS=[
{id:1001,name:'Nova X5 5G Smartphone',cat:'mobiles',price:24990,old:28990,rating:4.8,sold:1240,stock:18,emoji:'📱',seller:'Amar Mobile Hub',tag:'Hot Deal',desc:'6.7-inch display, 8GB RAM, 256GB storage and fast charging.'},
{id:1002,name:'Aero Buds Pro Wireless Earbuds',cat:'electronics',price:2190,old:2990,rating:4.7,sold:3400,stock:62,emoji:'🎧',seller:'Tech Zone',tag:'Best Seller',desc:'Noise reduction, low-latency audio and compact charging case.'},
{id:1003,name:'Smart Watch Active 2',cat:'electronics',price:3290,old:4490,rating:4.6,sold:1890,stock:35,emoji:'⌚',seller:'Gadget Point',tag:'New',desc:'Fitness tracking, notification alerts and multi-day battery life.'},
{id:1004,name:'14-inch Slim Laptop i5 16GB',cat:'electronics',price:58990,old:63990,rating:4.9,sold:420,stock:9,emoji:'💻',seller:'Computer World',tag:'Official',desc:'Fast everyday laptop with 16GB RAM and 512GB SSD.'},
{id:1005,name:'Classic Cotton Panjabi',cat:'fashion',price:1290,old:1690,rating:4.7,sold:2280,stock:80,emoji:'🥻',seller:'Urban Wear',tag:'Popular',desc:'Comfortable premium cotton panjabi for everyday and festive use.'},
{id:1006,name:'Premium Running Shoes',cat:'fashion',price:1890,old:2490,rating:4.6,sold:1760,stock:44,emoji:'👟',seller:'Step Store',tag:'Flash Sale',desc:'Lightweight cushioned running shoes with breathable upper.'},
{id:1007,name:'Women Everyday Handbag',cat:'fashion',price:1450,old:1990,rating:4.5,sold:910,stock:29,emoji:'👜',seller:'Style Avenue',tag:'Trending',desc:'Structured everyday handbag with multiple compartments.'},
{id:1008,name:'Vitamin C Brightening Serum',cat:'beauty',price:690,old:890,rating:4.8,sold:4600,stock:120,emoji:'🧴',seller:'Glow Care',tag:'Top Rated',desc:'Lightweight daily serum for a brighter-looking skincare routine.'},
{id:1009,name:'Matte Lip Color Set',cat:'beauty',price:540,old:750,rating:4.5,sold:2100,stock:75,emoji:'💄',seller:'Beauty Basket',tag:'Value Pack',desc:'Long-lasting matte lip color set in wearable everyday shades.'},
{id:1010,name:'Soft Microfiber Bedsheet Set',cat:'home',price:1190,old:1590,rating:4.7,sold:1300,stock:37,emoji:'🛏️',seller:'Home Comfort',tag:'Home Pick',desc:'Soft microfiber bedsheet set with matching pillow covers.'},
{id:1011,name:'Modern Table Lamp',cat:'home',price:980,old:1290,rating:4.6,sold:680,stock:24,emoji:'💡',seller:'Decor House',tag:'Design Pick',desc:'Warm light table lamp for bedroom, desk or reading corner.'},
{id:1012,name:'Non-stick Cookware 5pc Set',cat:'appliances',price:3290,old:3990,rating:4.8,sold:980,stock:21,emoji:'🍳',seller:'Kitchen Pro',tag:'Kitchen Deal',desc:'Durable non-stick cookware set for everyday family cooking.'},
{id:1013,name:'1.5L Electric Kettle',cat:'appliances',price:1250,old:1590,rating:4.7,sold:2600,stock:50,emoji:'🫖',seller:'Appliance Mart',tag:'Fast Delivery',desc:'Quick-boil electric kettle with automatic shut-off.'},
{id:1014,name:'Premium Basmati Rice 5kg',cat:'grocery',price:980,old:1090,rating:4.9,sold:5400,stock:140,emoji:'🍚',seller:'Daily Grocery',tag:'Fresh Stock',desc:'Long-grain basmati rice packed for family meals.'},
{id:1015,name:'Healthy Mixed Nuts 500g',cat:'grocery',price:850,old:990,rating:4.8,sold:1500,stock:85,emoji:'🥜',seller:'Fresh Basket',tag:'Healthy Pick',desc:'Mixed nuts selection for snacking and breakfast.'},
{id:1016,name:'Training Football Size 5',cat:'sports',price:790,old:990,rating:4.6,sold:870,stock:33,emoji:'⚽',seller:'Sports Arena',tag:'Sports Pick',desc:'Durable size-5 football suitable for training and casual matches.'},
{id:1017,name:'Yoga Mat 8mm Comfort',cat:'sports',price:920,old:1190,rating:4.7,sold:760,stock:42,emoji:'🧘',seller:'Fit Store',tag:'Fitness',desc:'Comfortable non-slip yoga mat for home workouts and stretching.'},
{id:1018,name:'Bangla Fiction Bestseller',cat:'books',price:390,old:450,rating:4.9,sold:3200,stock:95,emoji:'📖',seller:'Book Corner',tag:'Bestseller',desc:'Popular Bangla fiction title for leisure reading.'},
{id:1019,name:'English Grammar Practice Book',cat:'books',price:320,old:380,rating:4.8,sold:2100,stock:110,emoji:'📘',seller:'Study House',tag:'Student Pick',desc:'Structured grammar exercises and practice for students.'},
{id:1020,name:'Creative Building Blocks 120pc',cat:'kids',price:990,old:1390,rating:4.7,sold:1150,stock:38,emoji:'🧱',seller:'Kids Planet',tag:'Educational',desc:'Colorful building blocks for creative play and learning.'},
{id:1021,name:'Remote Control Racing Car',cat:'kids',price:1590,old:1990,rating:4.6,sold:670,stock:17,emoji:'🏎️',seller:'Toy Box',tag:'Gift Pick',desc:'Rechargeable remote control racing car with responsive steering.'},
{id:1022,name:'Car Phone Holder',cat:'automotive',price:450,old:650,rating:4.5,sold:1900,stock:73,emoji:'🚘',seller:'Auto Gear',tag:'Useful',desc:'Adjustable dashboard phone holder for daily driving.'},
{id:1023,name:'Microfiber Car Cleaning Kit',cat:'automotive',price:650,old:850,rating:4.7,sold:890,stock:47,emoji:'🧽',seller:'Car Care BD',tag:'Car Care',desc:'Reusable microfiber cleaning kit for interior and exterior care.'},
{id:1024,name:'Premium Dry Cat Food 1kg',cat:'pets',price:790,old:890,rating:4.8,sold:1250,stock:68,emoji:'🐱',seller:'Pet Corner',tag:'Pet Favorite',desc:'Balanced dry cat food for adult cats.'}
];

function parse(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch(e){return fallback}}
function save(key,val){localStorage.setItem(key,JSON.stringify(val))}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function money(v){return '৳'+Number(v||0).toLocaleString('en-BD',{maximumFractionDigits:0})}
function store(){return {...STORE_DEFAULTS,...parse('shopSettings',{})}}
function profile(){return parse('shopProfile',{})}
function customProducts(){return parse('shopProducts',[])}
function products(){return [...BASE_PRODUCTS,...customProducts()]}
function cart(){return parse('shopCart',[])}
function wishlist(){return parse('shopWishlist',[]).map(String)}
function orders(){return parse('shopOrders',[])}
function toast(msg){const e=document.createElement('div');e.className='toast';e.textContent=msg;document.body.appendChild(e);setTimeout(()=>e.remove(),2200)}
function getProduct(id){return products().find(p=>String(p.id)===String(id))}
function discount(p){return p.old>p.price?Math.round((1-p.price/p.old)*100):0}
function cartCount(){return cart().reduce((n,x)=>n+Number(x.qty||0),0)}
function cartTotal(){return cart().reduce((sum,x)=>{const p=getProduct(x.id);return sum+(p?p.price*Number(x.qty||0):0)},0)}
function setCounts(){document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=cartCount());document.querySelectorAll('[data-wish-count]').forEach(e=>e.textContent=wishlist().length)}
function productCard(p){
 const fav=wishlist().includes(String(p.id));
 return '<article class="product-card">'+
 '<button class="wish-btn'+(fav?' active':'')+'" data-wish="'+p.id+'" aria-label="Wishlist">'+(fav?'♥':'♡')+'</button>'+
 '<a href="product.html?id='+p.id+'"><div class="product-visual"><span class="product-tag">'+esc(p.tag||'Deal')+'</span>'+esc(p.emoji||'📦')+'</div></a>'+
 '<div class="product-body"><a href="product.html?id='+p.id+'"><div class="product-title">'+esc(p.name)+'</div></a>'+
 '<div><span class="product-price">'+money(p.price)+'</span>'+(p.old?'<span class="product-old">'+money(p.old)+'</span>':'')+'</div>'+
 '<div class="rating">★ '+Number(p.rating||4.5).toFixed(1)+' <span class="sold">('+Number(p.sold||0).toLocaleString()+' sold)</span></div>'+
 '<div class="product-actions"><a class="btn btn-outline" href="product.html?id='+p.id+'">View</a><button class="btn btn-primary" data-add-cart="'+p.id+'">Add Cart</button></div></div></article>'
}
function renderProductGrid(id,list){const e=document.getElementById(id);if(e)e.innerHTML=list.length?list.map(productCard).join(''):'<div class="empty" style="grid-column:1/-1"><div class="empty-icon">📦</div>No products found.</div>'}
function addCart(id,qty=1){
 const p=getProduct(id);if(!p)return;
 const c=cart(),found=c.find(x=>String(x.id)===String(id));
 if(found)found.qty=Math.min(p.stock,Number(found.qty||0)+Number(qty||1));else c.push({id:p.id,qty:Math.min(p.stock,Math.max(1,Number(qty||1)))});
 save('shopCart',c);setCounts();toast('Added to cart')
}
function toggleWish(id){
 let w=wishlist(),sid=String(id);const add=!w.includes(sid);w=add?[...w,sid]:w.filter(x=>x!==sid);save('shopWishlist',w);setCounts();return add
}
function renderCategories(){
 document.querySelectorAll('[data-categories]').forEach(box=>box.innerHTML=CATEGORIES.map(c=>'<a class="category-card" href="shop.html?cat='+c.id+'"><div class="category-icon">'+c.icon+'</div><b>'+esc(c.name)+'</b></a>').join(''))
}
function renderHome(){
 if(!document.getElementById('homeFeatured'))return;
 renderCategories();
 const ps=products();
 renderProductGrid('homeFeatured',ps.slice(0,10));
 renderProductGrid('flashProducts',ps.filter(p=>discount(p)>=15).slice(0,5));
 renderProductGrid('newProducts',ps.slice().reverse().slice(0,10));
}
function renderShop(){
 const grid=document.getElementById('shopGrid');if(!grid)return;
 const params=new URLSearchParams(location.search),cat=params.get('cat')||'all',q=(params.get('q')||'').toLowerCase(),sort=params.get('sort')||'popular';
 const search=document.getElementById('shopSearch');if(search)search.value=params.get('q')||'';
 document.querySelectorAll('[data-cat-filter]').forEach(a=>a.classList.toggle('active',a.dataset.catFilter===cat));
 let list=products().filter(p=>(cat==='all'||p.cat===cat)&&(!q||[p.name,p.cat,p.seller,p.desc].join(' ').toLowerCase().includes(q)));
 if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);if(sort==='rating')list.sort((a,b)=>b.rating-a.rating);if(sort==='popular')list.sort((a,b)=>b.sold-a.sold);
 renderProductGrid('shopGrid',list);const count=document.getElementById('shopCount');if(count)count.textContent=list.length+' products';
 const sorter=document.getElementById('shopSort');if(sorter){sorter.value=sort;sorter.onchange=()=>{params.set('sort',sorter.value);location.search=params.toString()}}
 if(search)search.oninput=()=>{const val=search.value.trim();const p=new URLSearchParams(location.search);if(val)p.set('q',val);else p.delete('q');history.replaceState(null,'','?'+p.toString());renderShop()}
}
function renderProduct(){
 const box=document.getElementById('productDetail');if(!box)return;
 const id=new URLSearchParams(location.search).get('id'),p=getProduct(id)||products()[0],fav=wishlist().includes(String(p.id));
 document.title=p.name+' - '+store().name;
 box.innerHTML='<div class="detail-visual">'+esc(p.emoji)+'</div><div><div class="chip">'+esc(CATEGORIES.find(c=>c.id===p.cat)?.name||p.cat)+'</div><h1 class="detail-title">'+esc(p.name)+'</h1><div class="rating">★ '+p.rating+' <span class="sold">'+p.sold.toLocaleString()+' sold</span></div><div style="margin:15px 0"><span class="detail-price">'+money(p.price)+'</span><span class="detail-old">'+money(p.old)+'</span> <span class="chip">'+discount(p)+'% OFF</span></div><p style="color:var(--muted);line-height:1.7">'+esc(p.desc)+'</p><div class="detail-meta"><span class="chip">Seller: '+esc(p.seller)+'</span><span class="chip">Stock: '+p.stock+'</span><span class="chip">Cash on Delivery</span><span class="chip">7 Day Return</span></div><div class="qty-row" style="margin-top:20px"><b>Quantity</b><button class="qty-btn" data-qty-minus>−</button><input id="detailQty" class="qty-input" value="1" type="number" min="1" max="'+p.stock+'"><button class="qty-btn" data-qty-plus>+</button></div><div class="detail-actions"><button class="btn btn-primary" data-detail-cart="'+p.id+'">Add to Cart</button><button class="btn btn-outline" data-buy-now="'+p.id+'">Buy Now</button><button class="btn btn-outline" data-wish="'+p.id+'">'+(fav?'♥ Saved':'♡ Wishlist')+'</button></div><div class="card" style="margin-top:18px;box-shadow:none"><b>Delivery & Protection</b><p style="color:var(--muted);font-size:12px;line-height:1.6">Delivery cost and estimated arrival depend on location. Checkout currently runs as a frontend preview until a production backend and payment provider are connected.</p></div></div>';
 renderProductGrid('relatedProducts',products().filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,5))
}
function renderCart(){
 const list=document.getElementById('cartList');if(!list)return;const c=cart();
 if(!c.length){list.innerHTML='<div class="card empty"><div class="empty-icon">🛒</div><h3>Your cart is empty</h3><a class="btn btn-primary" href="shop.html">Start Shopping</a></div>'}
 else list.innerHTML=c.map(x=>{const p=getProduct(x.id);if(!p)return '';return '<div class="cart-item"><div class="cart-thumb">'+esc(p.emoji)+'</div><div><a class="cart-name" href="product.html?id='+p.id+'">'+esc(p.name)+'</a><div class="cart-sub">'+esc(p.seller)+'</div><div class="cart-price">'+money(p.price)+'</div><div class="qty-row" style="margin-top:8px"><button class="qty-btn" data-cart-dec="'+p.id+'">−</button><span>'+x.qty+'</span><button class="qty-btn" data-cart-inc="'+p.id+'">+</button><button class="btn btn-danger" data-cart-remove="'+p.id+'" style="min-height:34px;padding:6px 9px">Remove</button></div></div><div><b>'+money(p.price*x.qty)+'</b></div></div>'}).join('');
 renderCartSummary()
}
function renderCartSummary(){
 const subtotal=cartTotal(),s=store(),shipping=subtotal===0?0:(subtotal>=s.freeShipping?0:80),total=subtotal+shipping;
 document.querySelectorAll('[data-subtotal]').forEach(e=>e.textContent=money(subtotal));document.querySelectorAll('[data-shipping]').forEach(e=>e.textContent=shipping?money(shipping):'FREE');document.querySelectorAll('[data-cart-total]').forEach(e=>e.textContent=money(total))
}
function renderWishlist(){renderProductGrid('wishlistGrid',products().filter(p=>wishlist().includes(String(p.id))))}
function renderOrders(){
 const box=document.getElementById('ordersList');if(!box)return;const os=orders();
 box.innerHTML=os.length?os.map(o=>'<article class="order-card"><div class="order-top"><div><b>Order #'+o.id+'</b><div style="font-size:11px;color:var(--muted);margin-top:4px">'+esc(o.created)+'</div></div><span class="status '+String(o.status).toLowerCase()+'">'+esc(o.status)+'</span></div><div class="order-products">'+o.items.map(i=>{const p=getProduct(i.id);return '<div class="order-mini" title="'+esc(p?.name||'Product')+'">'+esc(p?.emoji||'📦')+'</div>'}).join('')+'</div><div style="display:flex;justify-content:space-between;gap:10px;margin-top:12px"><span>'+o.items.reduce((n,i)=>n+i.qty,0)+' items</span><b>'+money(o.total)+'</b></div></article>').join(''):'<div class="card empty"><div class="empty-icon">📦</div><h3>No orders yet</h3><a class="btn btn-primary" href="shop.html">Shop Now</a></div>'
}
function renderAccount(){
 const p=profile();document.querySelectorAll('[data-profile-name]').forEach(e=>e.value!==undefined?e.value=p.name||'':e.textContent=p.name||'Customer');document.querySelectorAll('[data-profile-email]').forEach(e=>e.value!==undefined?e.value=p.email||'':e.textContent=p.email||'Not set');document.querySelectorAll('[data-profile-phone]').forEach(e=>e.value!==undefined?e.value=p.phone||'':e.textContent=p.phone||'Not set');const city=document.getElementById('accCity'),address=document.getElementById('accAddress');if(city)city.value=p.city||'';if(address)address.value=p.address||''
}
function renderAdmin(){
 if(!document.getElementById('adminProducts'))return;
 const os=orders(),ps=products();document.getElementById('kpiProducts').textContent=ps.length;document.getElementById('kpiOrders').textContent=os.length;document.getElementById('kpiRevenue').textContent=money(os.reduce((s,o)=>s+Number(o.total||0),0));document.getElementById('kpiPending').textContent=os.filter(o=>o.status==='Processing'||o.status==='Pending').length;
 document.getElementById('adminProducts').innerHTML=ps.map(p=>'<tr><td>'+p.id+'</td><td>'+esc(p.emoji)+' '+esc(p.name)+'</td><td>'+esc(p.cat)+'</td><td>'+money(p.price)+'</td><td>'+p.stock+'</td><td>'+(p.custom?'<button class="btn btn-danger" data-admin-delete-product="'+p.id+'">Delete</button>':'Built-in')+'</td></tr>').join('');
 document.getElementById('adminOrders').innerHTML=os.length?os.map(o=>'<tr><td>#'+o.id+'</td><td>'+esc(o.customer?.name||'Customer')+'</td><td>'+o.items.reduce((n,i)=>n+i.qty,0)+'</td><td>'+money(o.total)+'</td><td>'+esc(o.status)+'</td><td><select class="form-control" data-order-status="'+o.id+'" style="height:36px"><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></td></tr>').join(''):'<tr><td colspan="6">No orders</td></tr>';
 document.querySelectorAll('[data-order-status]').forEach(s=>{const o=os.find(x=>String(x.id)===s.dataset.orderStatus);if(o)s.value=o.status;s.onchange=()=>{o.status=s.value;save('shopOrders',os);toast('Order status updated')}})
 const st=store();['adminStoreName','adminAnnouncement','adminSupportEmail','adminSupportPhone','adminFreeShipping'].forEach(id=>{const e=document.getElementById(id);if(!e)return;const map={adminStoreName:st.name,adminAnnouncement:st.announcement,adminSupportEmail:st.supportEmail,adminSupportPhone:st.supportPhone,adminFreeShipping:st.freeShipping};e.value=map[id]});document.getElementById('adminMaintenance').checked=!!st.maintenance
}
function updateHeader(){
 const s=store(),p=profile();document.querySelectorAll('[data-store-name]').forEach(e=>e.textContent=s.name);document.querySelectorAll('[data-announcement]').forEach(e=>e.textContent=s.announcement);document.querySelectorAll('[data-header-user]').forEach(e=>e.textContent=p.name||'Account');document.title=document.title.replace(/Amar Shop/g,s.name);setCounts()
}
function globalSearch(){
 const form=document.getElementById('globalSearch');if(!form)return;form.onsubmit=e=>{e.preventDefault();const q=form.querySelector('input').value.trim();location.href='shop.html'+(q?'?q='+encodeURIComponent(q):'')};const q=new URLSearchParams(location.search).get('q');if(q)form.querySelector('input').value=q
}
function checkoutInit(){
 const form=document.getElementById('checkoutForm');if(!form)return;if(store().maintenance){form.querySelector('button[type="submit"],button:not([type])')?.setAttribute('disabled','disabled');toast('Store maintenance mode is active');}const p=profile();['coName','coPhone','coEmail','coAddress','coCity'].forEach(id=>{const e=document.getElementById(id);if(!e)return;const map={coName:p.name||'',coPhone:p.phone||'',coEmail:p.email||'',coAddress:p.address||'',coCity:p.city||''};e.value=map[id]});renderCartSummary();const summary=document.getElementById('checkoutItems');if(summary)summary.innerHTML=cart().map(i=>{const pr=getProduct(i.id);return '<div class="summary-row"><span>'+esc(pr?.name||'Product')+' × '+i.qty+'</span><b>'+money((pr?.price||0)*i.qty)+'</b></div>'}).join('');
 form.onsubmit=e=>{e.preventDefault();if(!cart().length){toast('Cart is empty');return}const fd=new FormData(form),customer={name:fd.get('name'),phone:fd.get('phone'),email:fd.get('email'),address:fd.get('address'),city:fd.get('city')},payment=fd.get('payment'),subtotal=cartTotal(),shipping=subtotal>=store().freeShipping?0:80;const os=orders();os.unshift({id:Date.now().toString().slice(-9),created:new Date().toLocaleString(),status:'Processing',customer,payment,items:cart(),subtotal,shipping,total:subtotal+shipping});save('shopOrders',os);save('shopProfile',{...profile(),...customer});save('shopCart',[]);location.href='order-success.html?id='+os[0].id}
}
function successInit(){const id=new URLSearchParams(location.search).get('id'),o=orders().find(x=>String(x.id)===String(id));const e=document.getElementById('successOrder');if(e)e.textContent=o?'#'+o.id:'#—'}

document.addEventListener('click',e=>{
 const add=e.target.closest('[data-add-cart]');if(add){addCart(add.dataset.addCart);return}
 const wish=e.target.closest('[data-wish]');if(wish){const on=toggleWish(wish.dataset.wish);wish.classList.toggle('active',on);wish.textContent=on?'♥':'♡';if(wish.closest('.detail-actions'))wish.textContent=on?'♥ Saved':'♡ Wishlist';if(document.getElementById('wishlistGrid'))renderWishlist();return}
 const inc=e.target.closest('[data-cart-inc]'),dec=e.target.closest('[data-cart-dec]'),rem=e.target.closest('[data-cart-remove]');
 if(inc||dec||rem){const id=(inc||dec||rem).dataset.cartInc||(inc||dec||rem).dataset.cartDec||(inc||dec||rem).dataset.cartRemove;let c=cart(),x=c.find(i=>String(i.id)===String(id));if(rem)c=c.filter(i=>String(i.id)!==String(id));else if(x){x.qty=Math.max(1,x.qty+(inc?1:-1));const p=getProduct(id);if(p)x.qty=Math.min(x.qty,p.stock)}save('shopCart',c);setCounts();renderCart();return}
 const plus=e.target.closest('[data-qty-plus]'),minus=e.target.closest('[data-qty-minus]');if(plus||minus){const input=document.getElementById('detailQty');if(input)input.value=Math.max(1,Number(input.value||1)+(plus?1:-1));return}
 const dc=e.target.closest('[data-detail-cart]');if(dc){addCart(dc.dataset.detailCart,Number(document.getElementById('detailQty')?.value||1));return}
 const buy=e.target.closest('[data-buy-now]');if(buy){addCart(buy.dataset.buyNow,Number(document.getElementById('detailQty')?.value||1));location.href='checkout.html';return}
 const del=e.target.closest('[data-admin-delete-product]');if(del){save('shopProducts',customProducts().filter(p=>String(p.id)!==String(del.dataset.adminDeleteProduct)));toast('Product deleted');renderAdmin();return}
});

document.addEventListener('DOMContentLoaded',()=>{
 updateHeader();globalSearch();renderHome();renderShop();renderProduct();renderCart();renderWishlist();renderOrders();renderAccount();renderAdmin();checkoutInit();successInit();renderCategories();if(document.getElementById('dealsGrid'))renderProductGrid('dealsGrid',products().filter(p=>discount(p)>=10).sort((a,b)=>discount(b)-discount(a)));const st=store();document.querySelectorAll('[data-support-email]').forEach(e=>e.textContent=st.supportEmail);document.querySelectorAll('[data-support-phone]').forEach(e=>e.textContent=st.supportPhone);
 const login=document.getElementById('loginForm');if(login)login.onsubmit=e=>{e.preventDefault();const email=document.getElementById('loginEmail').value.trim(),pass=document.getElementById('loginPassword').value,p=profile();if((p.email===email||p.phone===email)&&p.password===pass){save('shopSession',{loggedIn:true});location.href='account.html'}else toast('Account not found or password is incorrect')};
 const reg=document.getElementById('registerForm');if(reg)reg.onsubmit=e=>{e.preventDefault();const name=document.getElementById('regName').value.trim(),email=document.getElementById('regEmail').value.trim(),phone=document.getElementById('regPhone').value.trim(),password=document.getElementById('regPassword').value;if(!name||!email||!phone||password.length<6){toast('Please complete all fields');return}save('shopProfile',{name,email,phone,password});save('shopSession',{loggedIn:true});location.href='account.html'};
 const account=document.getElementById('accountForm');if(account)account.onsubmit=e=>{e.preventDefault();save('shopProfile',{...profile(),name:document.getElementById('accName').value.trim(),email:document.getElementById('accEmail').value.trim(),phone:document.getElementById('accPhone').value.trim(),address:document.getElementById('accAddress').value.trim(),city:document.getElementById('accCity').value.trim()});toast('Profile saved');updateHeader()};
 const seller=document.getElementById('sellerProductForm');if(seller)seller.onsubmit=e=>{e.preventDefault();const fd=new FormData(seller),list=customProducts();const id=Date.now().toString().slice(-8);list.unshift({id:Number(id),name:fd.get('name'),cat:fd.get('cat'),price:Number(fd.get('price')),old:Number(fd.get('old')||0),rating:5,sold:0,stock:Number(fd.get('stock')),emoji:fd.get('emoji')||'📦',seller:fd.get('seller')||'Marketplace Seller',tag:'New Listing',desc:fd.get('desc')||'Marketplace product',custom:true});save('shopProducts',list);toast('Product listed');seller.reset()};
 const adminSettings=document.getElementById('adminSettingsForm');if(adminSettings)adminSettings.onsubmit=e=>{e.preventDefault();save('shopSettings',{name:document.getElementById('adminStoreName').value.trim()||'Amar Shop',announcement:document.getElementById('adminAnnouncement').value.trim(),supportEmail:document.getElementById('adminSupportEmail').value.trim(),supportPhone:document.getElementById('adminSupportPhone').value.trim(),freeShipping:Number(document.getElementById('adminFreeShipping').value||1500),maintenance:document.getElementById('adminMaintenance').checked});toast('Store settings saved');updateHeader()};
 const adminProduct=document.getElementById('adminProductForm');if(adminProduct)adminProduct.onsubmit=e=>{e.preventDefault();const fd=new FormData(adminProduct),list=customProducts();list.unshift({id:Number(Date.now().toString().slice(-8)),name:fd.get('name'),cat:fd.get('cat'),price:Number(fd.get('price')),old:Number(fd.get('old')||0),rating:5,sold:0,stock:Number(fd.get('stock')),emoji:fd.get('emoji')||'📦',seller:fd.get('seller')||store().name,tag:fd.get('tag')||'New',desc:fd.get('desc')||'Marketplace product',custom:true});save('shopProducts',list);toast('Product added');adminProduct.reset();renderAdmin()};
 const path=location.pathname.split('/').pop()||'index.html',s=store();if(s.maintenance&&!['admin.html','login.html'].includes(path)){const n=document.createElement('div');n.className='notice';n.textContent='Store maintenance is enabled. Shopping features may be temporarily limited.';document.querySelector('.page')?.prepend(n)}
});
// Amar Shop Advanced Marketplace v4
const COUPONS={
  AMAR100:{type:'fixed',value:100,min:1000,label:'৳100 off on ৳1,000+'},
  SAVE10:{type:'percent',value:10,max:500,min:2000,label:'10% off up to ৳500'},
  FREESHIP:{type:'shipping',value:0,min:500,label:'Free shipping on ৳500+'}
};
function activeCoupon(){return parse('shopCoupon',null)}
function couponValue(subtotal){
  const c=activeCoupon();if(!c||!COUPONS[c])return 0;
  const rule=COUPONS[c];if(subtotal<rule.min)return 0;
  if(rule.type==='fixed')return Math.min(rule.value,subtotal);
  if(rule.type==='percent')return Math.min(rule.max||Infinity,subtotal*rule.value/100);
  return 0
}
function shippingCost(subtotal){
  if(!subtotal)return 0;
  const c=activeCoupon(),rule=c&&COUPONS[c];
  if(rule&&rule.type==='shipping'&&subtotal>=rule.min)return 0;
  return subtotal>=store().freeShipping?0:80
}
function totalAfterDiscount(){
  const subtotal=cartTotal(),discount=couponValue(subtotal),shipping=shippingCost(subtotal);
  return Math.max(0,subtotal-discount)+shipping
}
function applyCoupon(code){
  code=String(code||'').trim().toUpperCase();
  const rule=COUPONS[code],subtotal=cartTotal();
  if(!rule){toast('Coupon code not found');return false}
  if(subtotal<rule.min){toast('Minimum order '+money(rule.min)+' required');return false}
  save('shopCoupon',code);toast('Coupon applied: '+code);renderCartSummary();return true
}
function renderCartSummary(){
  const subtotal=cartTotal(),discount=couponValue(subtotal),shipping=shippingCost(subtotal),total=Math.max(0,subtotal-discount)+shipping,s=store();
  document.querySelectorAll('[data-subtotal]').forEach(e=>e.textContent=money(subtotal));
  document.querySelectorAll('[data-shipping]').forEach(e=>e.textContent=shipping?money(shipping):'FREE');
  document.querySelectorAll('[data-discount]').forEach(e=>{e.textContent=discount?'-'+money(discount):money(0);e.closest('.summary-row')?.classList.toggle('discount-row',discount>0)});
  document.querySelectorAll('[data-cart-total]').forEach(e=>e.textContent=money(total));
  document.querySelectorAll('[data-coupon-code]').forEach(e=>e.value=activeCoupon()||'');
  document.querySelectorAll('[data-coupon-status]').forEach(e=>e.textContent=activeCoupon()?(COUPONS[activeCoupon()]?.label||'Coupon applied'):'');
  const remaining=Math.max(0,Number(s.freeShipping||1500)-subtotal),pct=Math.min(100,(subtotal/Math.max(1,Number(s.freeShipping||1500)))*100);
  document.querySelectorAll('[data-shipping-progress]').forEach(box=>{
    const msg=box.querySelector('[data-shipping-message]'),bar=box.querySelector('.shipping-bar span');
    if(msg)msg.textContent=remaining?('Add '+money(remaining)+' more for free shipping'):'You unlocked free shipping';
    if(bar)bar.style.width=pct+'%';
  })
}
function checkoutInit(){
  const form=document.getElementById('checkoutForm');if(!form)return;
  if(store().maintenance){form.querySelector('button[type="submit"],button:not([type])')?.setAttribute('disabled','disabled');toast('Store maintenance mode is active')}
  const p=profile();const map={coName:p.name||'',coPhone:p.phone||'',coEmail:p.email||'',coAddress:p.address||'',coCity:p.city||''};
  Object.entries(map).forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.value=v});
  renderCartSummary();
  const summary=document.getElementById('checkoutItems');
  if(summary)summary.innerHTML=cart().map(i=>{const pr=getProduct(i.id);return '<div class="summary-row"><span>'+esc(pr?.name||'Product')+' × '+i.qty+'</span><b>'+money((pr?.price||0)*i.qty)+'</b></div>'}).join('');
  form.onsubmit=e=>{
    e.preventDefault();if(!cart().length){toast('Cart is empty');return}
    const fd=new FormData(form),customer={name:fd.get('name'),phone:fd.get('phone'),email:fd.get('email'),address:fd.get('address'),city:fd.get('city')},payment=fd.get('payment');
    const subtotal=cartTotal(),discount=couponValue(subtotal),shipping=shippingCost(subtotal),coupon=activeCoupon();
    const os=orders();os.unshift({id:Date.now().toString().slice(-9),created:new Date().toLocaleString(),status:'Processing',customer,payment,items:cart(),subtotal,discount,shipping,coupon,total:Math.max(0,subtotal-discount)+shipping});
    save('shopOrders',os);save('shopProfile',{...profile(),...customer});save('shopCart',[]);localStorage.removeItem('shopCoupon');location.href='order-success.html?id='+os[0].id
  }
}
function saveRecentlyViewed(id){
  const p=getProduct(id);if(!p)return;
  let list=parse('recentlyViewed',[]).map(String).filter(x=>x!==String(id));list.unshift(String(id));save('recentlyViewed',list.slice(0,12))
}
function recentProducts(){return parse('recentlyViewed',[]).map(id=>getProduct(id)).filter(Boolean)}
function renderRecent(){
  document.querySelectorAll('[data-recent-products]').forEach(box=>{
    const list=recentProducts();
    box.innerHTML=list.length?list.slice(0,6).map(p=>'<a class="recent-card" href="product.html?id='+p.id+'"><div class="r-visual">'+esc(p.emoji)+'</div><b>'+esc(p.name)+'</b><small>'+money(p.price)+'</small></a>').join(''):'<div class="empty" style="grid-column:1/-1;padding:20px">Products you view will appear here.</div>'
  })
}
function setupSearchSuggestions(){
  const form=document.getElementById('globalSearch');if(!form)return;
  const input=form.querySelector('input');if(!input)return;
  let box=form.querySelector('.search-suggest');if(!box){box=document.createElement('div');box.className='search-suggest';form.appendChild(box)}
  function draw(){
    const q=input.value.trim().toLowerCase();
    if(!q){box.classList.remove('show');box.innerHTML='';return}
    const ps=products().filter(p=>[p.name,p.cat,p.seller].join(' ').toLowerCase().includes(q)).slice(0,6);
    const cs=CATEGORIES.filter(c=>c.name.toLowerCase().includes(q)).slice(0,2);
    const items=[
      ...cs.map(c=>({href:'shop.html?cat='+c.id,icon:c.icon,title:c.name,sub:'Category'})),
      ...ps.map(p=>({href:'product.html?id='+p.id,icon:p.emoji,title:p.name,sub:money(p.price)+' • '+p.seller}))
    ];
    box.innerHTML=items.length?items.map(x=>'<a class="suggest-item" href="'+x.href+'"><span class="suggest-icon">'+esc(x.icon)+'</span><span class="suggest-copy"><b>'+esc(x.title)+'</b><small>'+esc(x.sub)+'</small></span></a>').join(''):'<div class="suggest-item"><span class="suggest-icon">⌕</span><span class="suggest-copy"><b>No instant matches</b><small>Press Search to see results</small></span></div>';
    box.classList.add('show')
  }
  input.addEventListener('input',draw);input.addEventListener('focus',draw);
  document.addEventListener('click',e=>{if(!form.contains(e.target))box.classList.remove('show')})
}
function setupDynamicTimer(){
  document.querySelectorAll('.timer').forEach(t=>{
    const spans=t.querySelectorAll('span');if(spans.length<3)return;
    const update=()=>{const now=new Date(),end=new Date(now);end.setHours(23,59,59,999);let sec=Math.max(0,Math.floor((end-now)/1000));const h=Math.floor(sec/3600);sec%=3600;const m=Math.floor(sec/60),s=sec%60;spans[0].textContent=String(h).padStart(2,'0');spans[1].textContent=String(m).padStart(2,'0');spans[2].textContent=String(s).padStart(2,'0')};update();setInterval(update,1000)
  })
}
function setupAdvancedProduct(){
  const id=new URLSearchParams(location.search).get('id'),p=getProduct(id);if(!p)return;
  saveRecentlyViewed(p.id);renderRecent();
  const bar=document.querySelector('.product-mobile-bar');if(bar){
    bar.querySelector('[data-mobile-cart]')?.addEventListener('click',()=>addCart(p.id,Number(document.getElementById('detailQty')?.value||1)));
    bar.querySelector('[data-mobile-buy]')?.addEventListener('click',()=>{addCart(p.id,Number(document.getElementById('detailQty')?.value||1));location.href='checkout.html'})
  }
}
document.addEventListener('click',e=>{
  const copy=e.target.closest('[data-copy-voucher]');if(copy){navigator.clipboard?.writeText(copy.dataset.copyVoucher).catch(()=>{});toast('Voucher copied: '+copy.dataset.copyVoucher)}
  const apply=e.target.closest('[data-apply-coupon]');if(apply){const root=apply.closest('.summary-card')||document;const input=root.querySelector('[data-coupon-code]');applyCoupon(input?.value||'')}
  const remove=e.target.closest('[data-remove-coupon]');if(remove){localStorage.removeItem('shopCoupon');toast('Coupon removed');renderCartSummary()}
});
document.addEventListener('DOMContentLoaded',()=>{
  setupSearchSuggestions();setupDynamicTimer();renderRecent();setupAdvancedProduct();renderCartSummary();
  document.querySelectorAll('[data-coupon-code]').forEach(input=>input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();applyCoupon(input.value)}}))
});

// Mobile marketplace search
document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  if(header&&!header.querySelector('.mobile-search-box')){
    const box=document.createElement('div');box.className='mobile-search-box';
    box.innerHTML='<form id="mobileSearchForm"><span class="m-search-icon">⌕</span><input placeholder="Search products..."><button>→</button></form>';
    header.appendChild(box);
    const form=box.querySelector('form'),input=box.querySelector('input');
    form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();location.href='shop.html'+(q?'?q='+encodeURIComponent(q):'')});
    input.addEventListener('input',()=>{const desktop=document.querySelector('#globalSearch input');if(desktop)desktop.value=input.value});
  }
});
