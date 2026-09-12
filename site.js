const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const valid=u=>u&&u!=="#"&&!u.includes("YOUR_")?u:"#";
const defaults={
 identity:{name:"Sadaf Ali",role:"Data Analyst",availability:"Available for opportunities",heroEyebrow:"DATA ANALYST · PYTHON · SQL · POWER BI",heroTitleLine1:"Turning data",heroTitleLine2:"into decisions.",heroLead:"I analyze data, uncover patterns, and build clear analytical solutions that help people make better decisions.",linkedin:"",github:"",email:"",resumeUrl:"resume.pdf",heroQuote:"Knowledge itself is power.",heroQuoteAuthor:"Francis Bacon"},
 about:{eyebrow:"01 / ABOUT",headingLine1:"Curious about the",headingLine2:"story behind data.",text:"Add your personal introduction here. Explain who you are, what you enjoy doing with data, and the kind of analytical problems you want to solve.",stats:[{value:"01",label:"Data-first mindset"},{value:"02",label:"Business thinking"},{value:"03",label:"Clear storytelling"}]},
 skills:{eyebrow:"02 / SKILLS",headingLine1:"Tools I use to",headingLine2:"solve problems.",groups:[]},
 experience:{eyebrow:"03 / EXPERIENCE",headingLine1:"Where I've",headingLine2:"worked.",items:[]},
 projects:{eyebrow:"04 / PROJECTS",headingLine1:"Selected",headingLine2:"work.",intro:"Projects are managed from the private admin dashboard."},
 education:{eyebrow:"05 / EDUCATION",headingLine1:"Academic",headingLine2:"foundation.",items:[]},
 contact:{eyebrow:"06 / CONTACT",headingLine1:"Let's build something",headingLine2:"meaningful.",text:"Have an opportunity, project, or question? I'd love to hear from you.",buttonLabel:"Start a conversation"},
 footer:{tagline:"SA. — Data Analyst",copyright:"All rights reserved."}
};
function merge(a,b){if(Array.isArray(a)||Array.isArray(b)) return b??a; if(a&&typeof a==='object'&&b&&typeof b==='object') return Object.keys({...a,...b}).reduce((o,k)=>{o[k]=merge(a[k],b[k]);return o},{}); return b??a;}
async function load(){
 document.getElementById("year").textContent=new Date().getFullYear();
 let content=defaults;
 const {data:settings}=await supabaseClient.from("site_content").select("content").eq("id",1).maybeSingle();
 if(settings?.content) content=merge(defaults,settings.content);
 const i=content.identity||defaults.identity;
 document.title=`${i.name||"Portfolio"} — ${i.role||"Data Analyst"}`;
 document.querySelector('meta[name="description"]')?.setAttribute("content",`${i.name||""} — ${i.role||"Data Analyst"} portfolio.`);
 document.querySelector('.status').innerHTML=`<i></i> ${esc(i.availability)}`;
 document.querySelector('.hero-copy .eyebrow').textContent=i.heroEyebrow||"";
 document.querySelector('.hero h1').innerHTML=`${esc(i.heroTitleLine1)}<br><em>${esc(i.heroTitleLine2)}</em>`;
 document.querySelector('.hero .lead').textContent=i.heroLead||"";
 const resume=document.querySelector('a[href="resume.pdf"]'); if(resume) resume.href=i.resumeUrl||"resume.pdf"; const quote=document.getElementById("heroQuote"); const quoteAuthor=document.getElementById("heroQuoteAuthor"); if(quote){quote.textContent=i.heroQuote||"Knowledge itself is power."; quoteAuthor.textContent=i.heroQuoteAuthor?`— ${i.heroQuoteAuthor}`:"— Francis Bacon";}
 document.getElementById("linkedinLink").href=valid(i.linkedin); document.getElementById("githubLink").href=valid(i.github);
 ["emailLink","contactEmail"].forEach(id=>document.getElementById(id).href=i.email?`mailto:${i.email}`:"#");
 document.getElementById("aboutText").textContent=content.about?.text||"";
 const about=content.about||{}; document.querySelector('#about .eyebrow').textContent=about.eyebrow||""; document.querySelector('#about h2').innerHTML=`${esc(about.headingLine1)}<br><span>${esc(about.headingLine2)}</span>`;
 document.querySelector('#about .mini-stats').innerHTML=(about.stats||[]).map(s=>`<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('');
 const sk=content.skills||{}; document.querySelector('#skills .eyebrow').textContent=sk.eyebrow||""; document.querySelector('#skills h2').innerHTML=`${esc(sk.headingLine1)}<br><span>${esc(sk.headingLine2)}</span>`;
 document.getElementById("skillsGrid").innerHTML=(sk.groups||[]).map((g,i)=>`<article class="skill-card"><span class="skill-index">${String(i+1).padStart(2,'0')}</span><h3>${esc(g.title)}</h3><div class="chips">${(g.items||[]).map(x=>`<span>${esc(x)}</span>`).join('')}</div></article>`).join('');
 const ex=content.experience||{}; document.querySelector('#experience .eyebrow').textContent=ex.eyebrow||""; document.querySelector('#experience h2').innerHTML=`${esc(ex.headingLine1)} <span>${esc(ex.headingLine2)}</span>`; document.getElementById('experienceGrid').innerHTML=(ex.items||[]).map(x=>`<article class="experience-row"><span class="exp-num">${esc(x.number)}</span><div><span class="period">${esc(x.period)}</span><h3>${esc(x.role)}</h3><h4>${esc(x.company)}</h4><p class="muted">${esc(x.description)}</p></div></article>`).join('');
 const pr=content.projects||{}; document.querySelector('#projects .eyebrow').textContent=pr.eyebrow||""; document.querySelector('#projects h2').innerHTML=`${esc(pr.headingLine1)} <span>${esc(pr.headingLine2)}</span>`; document.querySelector('#projects .project-heading .muted').textContent=pr.intro||"";
 const ed=content.education||{}; document.querySelector('#education .eyebrow').textContent=ed.eyebrow||""; document.querySelector('#education h2').innerHTML=`${esc(ed.headingLine1)} <span>${esc(ed.headingLine2)}</span>`; document.getElementById('educationGrid').innerHTML=(ed.items||[]).map(x=>`<div class="education-card"><div><span class="period">EDUCATION${x.period?` · ${esc(x.period)}`:''}</span><h3>${esc(x.degree)}</h3><p>${esc(x.field)}</p><strong>${esc(x.institution)}</strong><small>${esc(x.location)}</small></div><div class="degree-mark">${esc(x.degree)}</div></div>`).join('');
 const co=content.contact||{}; document.querySelector('#contact .eyebrow').textContent=co.eyebrow||""; document.querySelector('#contact h2').innerHTML=`${esc(co.headingLine1)}<br><span>${esc(co.headingLine2)}</span>`; document.querySelector('#contact .muted').textContent=co.text||""; document.getElementById('contactEmail').innerHTML=`${esc(co.buttonLabel||'Start a conversation')} <span>↗</span>`;
 document.querySelector('footer .footer > span:first-child').textContent=content.footer?.tagline||`${i.name||'SA.'} — ${i.role||'Data Analyst'}`; document.querySelector('footer .footer > span:nth-child(2)').innerHTML=`© <span id="year">${new Date().getFullYear()}</span> ${esc(content.footer?.copyright||'All rights reserved.')}`;
 const {data,error}=await supabaseClient.from("projects").select("*").order("sort_order",{ascending:true}).order("created_at",{ascending:true}); const grid=document.getElementById("projectsGrid"); if(error){grid.innerHTML=`<div class="empty">Unable to load projects.</div>`;return} if(!data?.length){grid.innerHTML=`<div class="empty"><strong>No projects yet.</strong><br>Your first project will appear here after you add it in Admin.</div>`;return}
 grid.innerHTML=data.map((p,i)=>`<article class="project-card">${p.image?`<img src="${esc(p.image)}" alt="" loading="lazy">`:`<div class="project-art"><span>PROJECT</span><strong>${String(i+1).padStart(2,'0')}</strong></div>`}<div class="project-body"><div class="project-top"><span class="eyebrow">PROJECT ${String(i+1).padStart(2,'0')}</span><span class="arrow">↗</span></div><h3>${esc(p.title)}</h3><h4>${esc(p.subtitle)}</h4><p class="muted">${esc(p.description)}</p><div class="chips">${(p.technologies||[]).map(t=>`<span>${esc(t)}</span>`).join('')}</div>${(p.results||[]).length?`<ul>${p.results.map(r=>`<li>${esc(r)}</li>`).join('')}</ul>`:''}<div class="project-links">${p.github?`<a href="${esc(p.github)}" target="_blank">GitHub ↗</a>`:''}${p.demo?`<a href="${esc(p.demo)}" target="_blank">Live Demo ↗</a>`:''}</div></div></article>`).join('');
}
load();
const header=document.getElementById('siteHeader'),menu=document.getElementById('menuBtn'),links=document.getElementById('navlinks'); if(menu){menu.onclick=()=>{const o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o)};links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'))} window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>20)); document.addEventListener('mousemove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')});
