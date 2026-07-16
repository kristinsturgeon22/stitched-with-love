const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function formToEmail(form){
  const data=new FormData(form);
  const formType=form.dataset.formType||'Website Request';
  const lines=[`New ${formType}`,''];
  for(const [key,value] of data.entries()){
    const label=key.replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase());
    lines.push(`${label}: ${value||'Not provided'}`);
  }
  lines.push('','This is a request only. No booking, yarn color, price, or order has been confirmed.');
  const subject=encodeURIComponent(`${formType} - ${data.get('name')||'Website visitor'}`);
  const body=encodeURIComponent(lines.join('\n'));
  window.location.href=`mailto:kristinsturgeon22@gmail.com?subject=${subject}&body=${body}`;
}

document.querySelectorAll('.request-form').forEach(form=>{
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    form.querySelector('.form-status').textContent='Your email app is opening with your request. Please press Send to deliver it to Kristin.';
    formToEmail(form);
  });
});
