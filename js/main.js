/* ===== EDIT THESE ===== */
const CFG={email:"nmsauganda@gmail.com",wa:"256700000000",reg:10000,annual:20000};
const ROLES=[
["Chairperson / President","Yousif Kuku","Makerere University"],
["Vice Chairperson","Ibrahim Tutu","Kampala International University"],
["General Secretary","Adam Kafi","Kyambogo University"],
["Treasurer / Finance Secretary","Daniel Komi","Makerere University Business School"],
["Secretary for Academic Affairs","Musa Jaber","Kampala University"],
["Secretary for Culture & Sports","Amira Kodi","Cavendish University Uganda"],
["Secretary for Information / Publicity","Nadia Hamid","Victoria University"],
["Secretary for Gender / Welfare","Rahma Tia","Kampala International University"],
["Patron / Advisor","Hajja Fatima Kafi","Makerere University (Alumni)"]
].map(([role,name,uni],i)=>({role,name,uni,contact:"",photo:i+1}));
const EVENTS=[
["Cultural Day",10,"A woman in festive face paint and a flower crown beside candles","center 22%"],
["Freshers Welcome",11,"Two smiling friends in purple hoodies laughing together","center 30%"],
["Football Tournament",12,"A footballer in blue leaping to kick a ball in a stadium","center 35%"],
["Graduation Celebration",13,"Graduates in blue caps and gowns seated at a ceremony","center"],
["General Assembly",14,"Members at work together in a large hall","center 40%"]
].map(([t,img,alt,pos])=>({t,img,alt,pos,date:null,venue:"Venue to be announced"}));
/* to set a date: date:"2026-12-05T14:00" */
const IMGS=n=>typeof IMG!=="undefined"?IMG[n]:`images/${n}.jpeg`;
const $=id=>document.getElementById(id),fmt=n=>"UGX "+n.toLocaleString("en-UG");
const toast=t=>{const e=$("toast");e.textContent=t;e.classList.add("show");clearTimeout(toast.i);toast.i=setTimeout(()=>e.classList.remove("show"),2600)};
const ini=n=>n.split(/\s+/).map(w=>w[0]).join("").slice(0,2).toUpperCase();
const wa=m=>`https://wa.me/${CFG.wa}?text=${encodeURIComponent(m)}`;
$("roles").innerHTML=ROLES.map(r=>`<article class="card rv"><img class="av" src="${IMGS(r.photo)}" alt="Photo of the ${r.role}" width="120" height="120" loading="lazy" onerror="this.outerHTML='<div class=&quot;av&quot; aria-hidden=&quot;true&quot;>${ini(r.name)}</div>'"><h3>${r.name}</h3><p class="role">${r.role}</p><p>${r.uni}</p>${r.contact?`<p>${r.contact}</p>`:""}</article>`).join("");
const ics=e=>{const d=new Date(e.date),z=x=>x.toISOString().replace(/[-:]|\.\d{3}/g,""),end=new Date(+d+72e5);
 return "data:text/calendar;charset=utf8,"+encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:NUMSAU ${e.t}\nDTSTART:${z(d)}\nDTEND:${z(end)}\nLOCATION:${e.venue}\nEND:VEVENT\nEND:VCALENDAR`)};
$("evs").innerHTML=EVENTS.map(e=>{const d=e.date?new Date(e.date):null,past=d&&d<new Date();
 const badge=d?`<span class="dbadge"><b>${d.getDate()}</b>${d.toLocaleDateString("en-GB",{month:"short"})}</span>`:`<span class="dbadge tba">Date TBA</span>`;
 return `<article class="card ev rv"><figure><img src="${IMGS(e.img)}" alt="${e.alt}" style="object-position:${e.pos}" width="600" height="400" loading="lazy">${badge}<span class="est">${past?"Past event":"Upcoming"}</span></figure>
 <div class="evb"><h3>${e.t}</h3><p class="meta">${d?d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}):"Date to be announced"}</p><p class="meta">${e.venue}</p>
 <div class="row"><a class="btn sm" target="_blank" rel="noopener" href="${wa(`Hello NUMSAU, I would like details about the ${e.t}.`)}">Ask on WhatsApp</a>${d?`<a class="btn sm ghost dark" download="${e.t}.ics" href="${ics(e)}">Add to calendar</a>`:""}</div></div></article>`}).join("");
function calc(){const renew=document.querySelector("[name=type]:checked").value==="renew",d=Math.max(0,+$("don").value||0);
 $("fReg").textContent=renew?"Not needed":fmt(CFG.reg);$("fDon").textContent=fmt(d);$("fTot").textContent=fmt((renew?0:CFG.reg)+CFG.annual+d)}
document.querySelectorAll("[name=type]").forEach(r=>r.addEventListener("change",calc));$("don").addEventListener("input",calc);calc();
const okPhone=p=>/^\+?\d{9,13}$/.test(p.replace(/[\s-]/g,""));
const msg=()=>`Hello NUMSAU, I want to join.\nName: ${$("jn").value.trim()}\nPhone: ${$("jp").value.trim()}\nUniversity: ${$("ju").value}\nCourse and year: ${$("jc").value.trim()||"-"}\nEmail: ${$("je").value.trim()||"-"}`;
const valid=()=>{if(!$("jn").value.trim()||!okPhone($("jp").value)){$("jerr").textContent="Please enter your full name and a valid phone number.";return false}$("jerr").textContent="";return true};
$("join").addEventListener("submit",e=>{e.preventDefault();if(valid()){window.open(wa(msg()),"_blank","noopener");toast("Opening WhatsApp…")}});
$("mail").addEventListener("click",()=>{if(valid())location.href=`mailto:${CFG.email}?subject=${encodeURIComponent("NUMSAU membership")}&body=${encodeURIComponent(msg())}`});
$("nl").addEventListener("submit",e=>{e.preventDefault();const m=$("nlm").value.trim();if(!/^\S+@\S+\.\S+$/.test(m)){$("nlerr").textContent="Please enter a valid email address.";return}$("nlerr").textContent="";window.open(wa(`Hello NUMSAU, please add ${m} to the updates list.`),"_blank","noopener");e.target.reset()});
$("chips").addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c===b));document.querySelectorAll("#gal img").forEach(i=>i.hidden=b.dataset.c!=="all"&&i.dataset.c!==b.dataset.c)});
$("gal").addEventListener("click",e=>{if(e.target.tagName!=="IMG")return;$("lbi").src=e.target.src;$("lbi").alt=e.target.alt;$("lb").hidden=false});
$("lb").addEventListener("click",()=>$("lb").hidden=true);addEventListener("keydown",e=>{if(e.key==="Escape")$("lb").hidden=true});
const CH=["Admission letter","Passport or national ID","Immigration documents, if needed","Accommodation arranged","University registration and fees","Local SIM card","Join the NUMSAU WhatsApp group","Save emergency numbers: 999 or 112"];
let saved=[];try{saved=JSON.parse(localStorage.getItem("numsau_check"))||[]}catch(e){}
$("check").innerHTML=CH.map((c,i)=>`<li><label><input type="checkbox" data-i="${i}"${saved.includes(i)?" checked":""}><span>${c}</span></label></li>`).join("");
$("check").addEventListener("change",()=>{saved=[...document.querySelectorAll("#check input:checked")].map(x=>+x.dataset.i);try{localStorage.setItem("numsau_check",JSON.stringify(saved))}catch(e){}});
const nav=$("nav"),bg=$("burger");bg.addEventListener("click",()=>bg.setAttribute("aria-expanded",nav.classList.toggle("open")));
nav.addEventListener("click",e=>{if(e.target.tagName==="A"){nav.classList.remove("open");bg.setAttribute("aria-expanded","false")}});
addEventListener("scroll",()=>{const m=document.documentElement.scrollHeight-innerHeight;$("bar").style.width=(m>0?scrollY/m*100:0)+"%"},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;const t=x.target;t.classList.add("in");io.unobserve(t);if(t.dataset.n){const to=+t.dataset.n,s=performance.now(),f=n=>{const p=Math.min(1,(n-s)/900);t.textContent=Math.round(to*p);p<1&&requestAnimationFrame(f)};requestAnimationFrame(f)}}),{threshold:.2});
document.querySelectorAll(".rv,[data-n]").forEach(e=>io.observe(e));
const links=[...nav.querySelectorAll("a[href^='#']")],spy=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)links.forEach(l=>l.classList.toggle("cur",l.hash==="#"+x.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
links.forEach(l=>{const s=document.querySelector(l.hash);s&&spy.observe(s)});
$("yr").textContent=new Date().getFullYear();

/* dark mode */
const root=document.documentElement,tb=$("theme");
const setT=t=>{root.dataset.t=t;tb.textContent=t==="dark"?"Light":"Dark";tb.setAttribute("aria-pressed",t==="dark");try{localStorage.setItem("numsau_t",t)}catch(e){}};
let st=null;try{st=localStorage.getItem("numsau_t")}catch(e){}
setT(st||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));tb.addEventListener("click",()=>setT(root.dataset.t==="dark"?"light":"dark"));
/* site search */
const srch=$("srch"),sq=$("sq"),sres=$("sres");let idx=null;
const openS=()=>{if(!idx)idx=[...document.querySelectorAll("main section[id]")].map(s=>({id:s.id,title:(s.querySelector("h2")||{}).textContent||s.id,text:s.textContent.replace(/\s+/g," ")}));srch.hidden=false;sq.value="";showS("");sq.focus()};
const showS=q=>{q=q.trim().toLowerCase();const r=idx.filter(i=>!q||i.text.toLowerCase().includes(q)||i.title.toLowerCase().includes(q));
 sres.innerHTML=r.length?r.map(i=>{const k=q?i.text.toLowerCase().indexOf(q):-1,sn=k>=0?"…"+i.text.slice(Math.max(0,k-30),k+70)+"…":"";return `<li><a href="#${i.id}">${i.title}<small>${sn}</small></a></li>`}).join(""):"<li><p style='padding:10px'>No results. Try another word.</p></li>"};
$("sbtn").addEventListener("click",openS);$("sx").addEventListener("click",()=>srch.hidden=true);sq.addEventListener("input",()=>showS(sq.value));
srch.addEventListener("click",e=>{if(e.target===srch||e.target.closest("#sres a"))srch.hidden=true});
addEventListener("keydown",e=>{if(e.key==="Escape")srch.hidden=true;if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();openS()}});
/* get-involved links, back to top, share */
document.querySelectorAll("[data-wa]").forEach(a=>a.href=wa(a.dataset.wa));
const up=$("up");addEventListener("scroll",()=>up.hidden=scrollY<700,{passive:true});up.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
$("share").addEventListener("click",async()=>{try{if(navigator.share){await navigator.share({title:"NUMSAU",url:location.href});return}await navigator.clipboard.writeText(location.href);toast("Link copied")}catch(e){toast("Copy the link from your address bar")}});

/* collapsible menu, dropdown, smart header */
const ddb=$("ddb"),dd=ddb.parentElement,hdr=document.querySelector(".hdr");
const closeDD=()=>{dd.classList.remove("open");ddb.setAttribute("aria-expanded","false")};
ddb.addEventListener("click",e=>{e.stopPropagation();ddb.setAttribute("aria-expanded",dd.classList.toggle("open"))});
document.addEventListener("click",e=>{if(!dd.contains(e.target))closeDD()});
dd.querySelector(".ddm").addEventListener("click",e=>{if(e.target.tagName==="A")closeDD()});
addEventListener("keydown",e=>{if(e.key==="Escape"){closeDD();nav.classList.remove("open");bg.setAttribute("aria-expanded","false")}});
const ddl=[...dd.querySelectorAll(".ddm a")],spy2=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)ddb.classList.toggle("cur",ddl.some(l=>l.hash==="#"+x.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("main section[id]").forEach(s=>spy2.observe(s));
addEventListener("scroll",()=>hdr.classList.toggle("cmp",scrollY>80),{passive:true});
