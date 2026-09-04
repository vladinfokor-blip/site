const grid = document.getElementById('projectsGrid');
const filterButtons = [...document.querySelectorAll('#filters button')];
const dialog = document.getElementById('projectDialog');
let projectData = [];

function renderProjects(filter = 'all') {
  const visible = projectData.filter(project => filter === 'all' || project.category.includes(filter));
  grid.innerHTML = visible.map(project => `
    <article class="project" data-id="${project.id}">
      <img src="${project.cover}" alt="${project.title}">
      <div class="shade"></div>
      <div class="project-meta">
        <h3>${project.title}</h3>
        <p>${project.type || 'Мебель на заказ'} · ${project.city}</p>
      </div>
      <button class="round" aria-label="Открыть проект">→</button>
    </article>
  `).join('');
  [...grid.querySelectorAll('.project')].forEach(card => card.addEventListener('click', () => openProject(card.dataset.id)));
}

function openProject(id) {
  const project = projectData.find(item => item.id === id);
  if (!project) return;

  const gallery = document.getElementById('dialogGallery');
  gallery.innerHTML = (project.images || [project.cover]).map((src, index) => `
    <img src="${src}" alt="${project.title}${index ? ` — фото ${index + 1}` : ''}">
  `).join('');

  document.getElementById('dialogTitle').textContent = project.title;
  document.getElementById('dialogType').textContent = project.type || 'Мебель на заказ';
  document.getElementById('dialogCity').textContent = project.city || '—';
  document.getElementById('dialogMaterials').textContent = project.materials || 'Подбираются индивидуально';
  document.getElementById('dialogDescription').textContent = project.description || '';
  document.getElementById('dialogTask').textContent = project.task || '';

  const features = document.getElementById('dialogFeatures');
  features.innerHTML = (project.features || []).map(item => `<li>${item}</li>`).join('');

  dialog.showModal();
  dialog.scrollTop = 0;
}

async function loadProjects() {
  try {
    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Не удалось загрузить проекты');
    projectData = await response.json();
    renderProjects();
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p>Не удалось загрузить проекты. Попробуйте обновить страницу.</p>';
  }
}

filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects(btn.dataset.filter);
}));

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
document.getElementById('dialogCta').addEventListener('click', () => dialog.close());
document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('nav').classList.toggle('open'));
document.getElementById('leadForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('formNote').textContent = 'Заявка сохранена в демо-режиме. Следующим шагом подключим Telegram/CRM.';
  e.target.reset();
});

loadProjects();
