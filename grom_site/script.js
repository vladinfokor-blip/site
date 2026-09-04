const filterButtons=[...document.querySelectorAll('#filters button')];
const projects=[...document.querySelectorAll('.project')];
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const f=btn.dataset.filter;
  projects.forEach(p=>p.style.display=(f==='all'||p.dataset.cat.split(' ').includes(f))?'block':'none');
}));
const dialog=document.getElementById('projectDialog'), img=document.getElementById('dialogImg'), title=document.getElementById('dialogTitle');
projects.forEach(p=>p.addEventListener('click',()=>{img.src=p.querySelector('img').src; title.textContent=p.dataset.title; dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.getElementById('dialogCta').addEventListener('click',()=>dialog.close());
document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
document.getElementById('leadForm').addEventListener('submit',(e)=>{e.preventDefault();document.getElementById('formNote').textContent='Заявка сохранена в демо-режиме. Следующим шагом подключим Telegram/CRM.';e.target.reset();});
