/**
 * MathMaster - Lógica de la Aplicación PWA
 * Manejo de estado, gamificación (XP, Niveles, Rachas), LocalStorage,
 * renderizado dinámico, notas personales, exportar/importar y Service Worker.
 */

// Estado global de la app
const STATE = {
  completedTopics: new Set(),
  topicNotes: {},
  streak: 1,
  lastActiveDate: null,
  currentView: 'curriculum', // 'curriculum' | 'path'
  searchQuery: '',
  theme: 'dark'
};

// Constantes de gamificación
const XP_PER_TOPIC = 15;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initTheme();
  initPWA();
  renderApp();
  setupEventListeners();
});

// Cargar estado de localStorage
function loadState() {
  try {
    const savedCompleted = localStorage.getItem('mathmaster_completed');
    if (savedCompleted) {
      STATE.completedTopics = new Set(JSON.parse(savedCompleted));
    }

    const savedNotes = localStorage.getItem('mathmaster_notes');
    if (savedNotes) {
      STATE.topicNotes = JSON.parse(savedNotes);
    }

    const savedTheme = localStorage.getItem('mathmaster_theme');
    if (savedTheme) {
      STATE.theme = savedTheme;
    }

    const lastActive = localStorage.getItem('mathmaster_last_active');
    const savedStreak = localStorage.getItem('mathmaster_streak');
    const today = new Date().toISOString().slice(0, 10);

    if (lastActive) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (lastActive === today) {
        STATE.streak = savedStreak ? parseInt(savedStreak, 10) : 1;
      } else if (lastActive === yesterday) {
        STATE.streak = savedStreak ? parseInt(savedStreak, 10) : 1;
      } else {
        STATE.streak = 1; // Racha reiniciada
      }
    } else {
      STATE.streak = 1;
    }

    STATE.lastActiveDate = today;
    localStorage.setItem('mathmaster_last_active', today);
    localStorage.setItem('mathmaster_streak', STATE.streak.toString());
  } catch (e) {
    console.error('Error cargando estado:', e);
  }
}

// Guardar estado en localStorage
function saveState() {
  try {
    localStorage.setItem('mathmaster_completed', JSON.stringify([...STATE.completedTopics]));
    localStorage.setItem('mathmaster_notes', JSON.stringify(STATE.topicNotes));
    localStorage.setItem('mathmaster_streak', STATE.streak.toString());
    localStorage.setItem('mathmaster_theme', STATE.theme);
  } catch (e) {
    console.error('Error guardando estado:', e);
  }
}

// Inicializar Tema Claro / Oscuro
function initTheme() {
  document.documentElement.setAttribute('data-theme', STATE.theme);
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.textContent = STATE.theme === 'dark' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  initTheme();
  saveState();
}

// Cálculos de estadísticas y niveles estilo Duolingo
function calculateStats() {
  let totalTopics = 0;
  MATH_CURRICULUM.forEach(mod => {
    mod.chapters.forEach(chap => {
      totalTopics += chap.topics.length;
    });
  });

  const completedCount = STATE.completedTopics.size;
  const percentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  const totalXp = completedCount * XP_PER_TOPIC;
  const level = Math.floor(totalXp / 100) + 1;

  return {
    totalTopics,
    completedCount,
    percentage,
    totalXp,
    level
  };
}

// Renderizado principal
function renderApp() {
  updateHeaderStats();
  renderHeroCard();
  if (STATE.currentView === 'curriculum') {
    renderCurriculumView();
  } else {
    renderPathView();
  }
}

// Actualizar barra superior (Racha, XP, Nivel)
function updateHeaderStats() {
  const stats = calculateStats();
  const streakEl = document.getElementById('stat-streak');
  const xpEl = document.getElementById('stat-xp');
  const levelEl = document.getElementById('stat-level');

  if (streakEl) streakEl.textContent = `${STATE.streak} d`;
  if (xpEl) xpEl.textContent = `${stats.totalXp} XP`;
  if (levelEl) levelEl.textContent = `Nvl ${stats.level}`;
}

// Renderizar Tarjeta Hero con la barra general
function renderHeroCard() {
  const stats = calculateStats();
  const titleEl = document.getElementById('hero-percentage');
  const fillEl = document.getElementById('hero-progress-fill');
  const countEl = document.getElementById('hero-topic-count');

  if (titleEl) titleEl.textContent = `${stats.percentage}% Completado`;
  if (fillEl) fillEl.style.width = `${stats.percentage}%`;
  if (countEl) countEl.textContent = `${stats.completedCount} de ${stats.totalTopics} temas dominados`;
}

// Renderizar Vista Temario Completo (Duolingo & Khan Academy)
function renderCurriculumView() {
  const container = document.getElementById('main-content-view');
  if (!container) return;

  const query = STATE.searchQuery.toLowerCase().trim();

  let html = `<div class="modules-container">`;

  MATH_CURRICULUM.forEach((module, modIndex) => {
    // Calcular progreso del módulo
    let modTotal = 0;
    let modCompleted = 0;
    module.chapters.forEach(chap => {
      chap.topics.forEach(top => {
        modTotal++;
        if (STATE.completedTopics.has(top.id)) modCompleted++;
      });
    });

    const modPercent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;

    // Filtrado de capítulos y temas si hay búsqueda activa
    let chaptersHtml = '';
    let hasMatchingTopics = false;

    module.chapters.forEach(chap => {
      let filteredTopics = chap.topics;
      if (query) {
        filteredTopics = chap.topics.filter(t => 
          t.title.toLowerCase().includes(query) || 
          chap.title.toLowerCase().includes(query) ||
          module.title.toLowerCase().includes(query)
        );
      }

      if (filteredTopics.length > 0) {
        hasMatchingTopics = true;
        const chapCompleted = filteredTopics.filter(t => STATE.completedTopics.has(t.id)).length;

        chaptersHtml += `
          <div class="chapter-box">
            <div class="chapter-header">
              <div class="chapter-title">
                <span>📘</span>
                <span>${chap.title}</span>
              </div>
              <span class="chapter-badge-count">${chapCompleted}/${filteredTopics.length}</span>
            </div>
            ${chap.note ? `<div class="chapter-note">💡 ${chap.note}</div>` : ''}
            ${chap.bibliography ? `<div class="chapter-biblio">📚 Bibliografía recomendada: ${chap.bibliography}</div>` : ''}
            <div class="topics-list">
              ${filteredTopics.map(topic => {
                const isDone = STATE.completedTopics.has(topic.id);
                const hasNote = Boolean(STATE.topicNotes[topic.id]);
                return `
                  <div class="topic-item ${isDone ? 'completed' : ''}" data-topic-id="${topic.id}">
                    <div class="topic-checkbox-circle" onclick="toggleTopic('${topic.id}', event)">
                      ${isDone ? '✓' : ''}
                    </div>
                    <div class="topic-name" onclick="toggleTopic('${topic.id}', event)">
                      ${topic.title}
                    </div>
                    <div class="topic-actions">
                      <button class="topic-notes-btn ${hasNote ? 'has-notes' : ''}" 
                              title="${hasNote ? 'Ver/editar nota' : 'Añadir nota'}"
                              onclick="openNoteModal('${topic.id}', '${escapeQuotes(topic.title)}', event)">
                        ${hasNote ? '📝' : '✏️'}
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }
    });

    if (!query || hasMatchingTopics) {
      html += `
        <div class="module-card" id="module-card-${module.id}" 
             style="--module-color-gradient: ${module.gradient}; --module-accent: ${module.color};">
          <div class="module-header" onclick="toggleCollapseModule('${module.id}')">
            <div class="module-header-left">
              <div class="module-badge-icon">${module.icon}</div>
              <div class="module-info-title">
                <h2>
                  <span class="module-roman">${module.number}</span>
                  <span>${module.title}</span>
                </h2>
                <p>${module.subtitle}</p>
              </div>
            </div>
            <div class="module-header-right">
              <span class="module-progress-pill">${modCompleted}/${modTotal} (${modPercent}%)</span>
              <span class="collapse-indicator" id="indicator-${module.id}">▾</span>
            </div>
          </div>
          <div class="module-body" id="body-${module.id}">
            <div class="module-meta-desc">${module.description}</div>
            <div class="chapters-grid">
              ${chaptersHtml}
            </div>
          </div>
        </div>
      `;
    }
  });

  html += `</div>`;
  container.innerHTML = html;
}

// Renderizar Vista Camino Gamificado (Estilo Mapa de Duolingo)
function renderPathView() {
  const container = document.getElementById('main-content-view');
  if (!container) return;

  let allChapters = [];
  MATH_CURRICULUM.forEach((mod) => {
    mod.chapters.forEach((chap) => {
      const total = chap.topics.length;
      const completed = chap.topics.filter(t => STATE.completedTopics.has(t.id)).length;
      allChapters.push({
        module: mod,
        chapter: chap,
        total,
        completed,
        isDone: total > 0 && completed === total
      });
    });
  });

  let html = `<div class="path-view-container">`;

  allChapters.forEach((item, index) => {
    // Efecto zig-zag suave de Duolingo
    const offset = Math.sin(index * 0.8) * 60;
    const isUnlocked = index === 0 || allChapters[index - 1].completed > 0;
    const isCompleted = item.isDone;

    html += `
      <div class="path-node-wrapper" style="transform: translateX(${offset}px)">
        <button class="path-node-button ${isCompleted ? 'completed' : (!isUnlocked ? 'locked' : '')}"
                style="background: ${isCompleted ? item.module.color : (!isUnlocked ? '' : item.module.color)};"
                onclick="focusChapterInCurriculum('${item.module.id}', '${item.chapter.id}')">
          ${isCompleted ? '⭐' : (isUnlocked ? item.module.icon : '🔒')}
        </button>
        ${index < allChapters.length - 1 ? `
          <div class="path-connector-line ${isCompleted ? 'active' : ''}" style="${isCompleted ? `background: ${item.module.color}` : ''}"></div>
        ` : ''}
        <div class="path-node-title">
          ${item.chapter.title}
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">
            ${item.completed} / ${item.total} temas
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// Cambiar estado de un tema (marcar / desmarcar)
function toggleTopic(topicId, event) {
  if (event) event.stopPropagation();

  const isCompletedNow = !STATE.completedTopics.has(topicId);

  if (isCompletedNow) {
    STATE.completedTopics.add(topicId);
    showCelebrationConfetti();
  } else {
    STATE.completedTopics.delete(topicId);
  }

  saveState();
  renderApp();
}

// Colapsar o expandir un módulo
function toggleCollapseModule(moduleId) {
  const card = document.getElementById(`module-card-${moduleId}`);
  if (card) {
    card.classList.toggle('collapsed');
  }
}

// Enfocar un capítulo en la vista completa desde el camino Duolingo
function focusChapterInCurriculum(moduleId, chapterId) {
  switchView('curriculum');
  setTimeout(() => {
    const card = document.getElementById(`module-card-${moduleId}`);
    if (card && card.classList.contains('collapsed')) {
      card.classList.remove('collapsed');
    }
    const elem = document.getElementById(`module-card-${moduleId}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

// Cambiar de vista (Temario vs Camino)
function switchView(viewName) {
  STATE.currentView = viewName;
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });
  renderApp();
}

// Modal de Notas
let currentActiveTopicId = null;

function openNoteModal(topicId, topicTitle, event) {
  if (event) event.stopPropagation();
  currentActiveTopicId = topicId;

  const modal = document.getElementById('note-modal');
  const titleEl = document.getElementById('note-modal-title');
  const textarea = document.getElementById('note-textarea');

  if (titleEl) titleEl.textContent = `Apunte: ${topicTitle}`;
  if (textarea) textarea.value = STATE.topicNotes[topicId] || '';

  if (modal) modal.classList.add('active');
}

function saveNote() {
  if (!currentActiveTopicId) return;
  const textarea = document.getElementById('note-textarea');
  const value = textarea ? textarea.value.trim() : '';

  if (value) {
    STATE.topicNotes[currentActiveTopicId] = value;
  } else {
    delete STATE.topicNotes[currentActiveTopicId];
  }

  saveState();
  closeNoteModal();
  renderApp();
}

function closeNoteModal() {
  const modal = document.getElementById('note-modal');
  if (modal) modal.classList.remove('active');
  currentActiveTopicId = null;
}

// Modal de Celebración / Confetti
function showCelebrationConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899']
    });
  }

  // Comprobar si se completó el 100% o hitos
  const stats = calculateStats();
  if (stats.percentage === 100) {
    openMilestoneModal("🎉 ¡TEMARIO COMPLETADO!", "¡Has dominado todos los temas matemáticos requeridos para Ciencias de la Computación! ¡Eres imparable!");
  }
}

function openMilestoneModal(title, text) {
  const modal = document.getElementById('celebration-modal');
  const titleEl = document.getElementById('celebration-title');
  const descEl = document.getElementById('celebration-desc');

  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = text;
  if (modal) modal.classList.add('active');
}

function closeCelebrationModal() {
  const modal = document.getElementById('celebration-modal');
  if (modal) modal.classList.remove('active');
}

// Exportar e Importar Progreso (JSON)
function exportProgress() {
  const data = {
    completedTopics: [...STATE.completedTopics],
    topicNotes: STATE.topicNotes,
    streak: STATE.streak,
    exportDate: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mathmaster-progreso-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importProgress() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (Array.isArray(data.completedTopics)) {
          STATE.completedTopics = new Set(data.completedTopics);
        }
        if (data.topicNotes && typeof data.topicNotes === 'object') {
          STATE.topicNotes = data.topicNotes;
        }
        if (data.streak) {
          STATE.streak = data.streak;
        }
        saveState();
        renderApp();
        alert('¡Progreso importado con éxito!');
      } catch (err) {
        alert('Archivo JSON no válido.');
      }
    };
    reader.readAsText(file);
  };

  input.click();
}

function resetProgress() {
  if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
    STATE.completedTopics.clear();
    STATE.topicNotes = {};
    saveState();
    renderApp();
  }
}

// Event Listeners generales
function setupEventListeners() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  const searchInput = document.getElementById('search-topics');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value;
      if (STATE.currentView === 'curriculum') {
        renderCurriculumView();
      }
    });
  }

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
    });
  });
}

// PWA: Registro del Service Worker y banner de instalación
let deferredPrompt = null;

function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('ServiceWorker registrado:', reg.scope))
        .catch(err => console.log('Error en ServiceWorker:', err));
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById('install-banner');
    if (banner) banner.style.display = 'flex';
  });
}

function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      const banner = document.getElementById('install-banner');
      if (banner) banner.style.display = 'none';
    }
    deferredPrompt = null;
  });
}

// Helper para escapar comillas simples en atributos html
function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
