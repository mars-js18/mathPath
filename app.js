/**
 * MathMaster - Lógica de la Aplicación PWA
 * - Sin rachas (simplificado y libre de presión)
 * - Módulos replegados por defecto, desplegando únicamente el módulo activo donde te encuentras
 * - Acceso directo superior con botón "Ir ahora" al primer tema pendiente
 * - Ruta estilo Duolingo minimalista y ordenada verticalmente (sin amontonamientos)
 * - Persistencia local y soporte offline PWA
 */

const STATE = {
  completedTopics: new Set(),
  topicNotes: {},
  currentView: 'curriculum', // 'curriculum' | 'path'
  searchQuery: '',
  theme: 'dark'
};

const XP_PER_TOPIC = 15;

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initTheme();
  initPWA();
  renderApp();
  setupEventListeners();
});

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
  } catch (e) {
    console.error('Error cargando estado:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem('mathmaster_completed', JSON.stringify([...STATE.completedTopics]));
    localStorage.setItem('mathmaster_notes', JSON.stringify(STATE.topicNotes));
    localStorage.setItem('mathmaster_theme', STATE.theme);
  } catch (e) {
    console.error('Error guardando estado:', e);
  }
}

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

// Calcular estadísticas globales
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

// Detectar cuál es el tema actual en el que vas (el primer tema no completado)
function getCurrentProgressPoint() {
  for (const module of MATH_CURRICULUM) {
    for (const chapter of module.chapters) {
      for (const topic of chapter.topics) {
        if (!STATE.completedTopics.has(topic.id)) {
          return {
            moduleId: module.id,
            moduleTitle: module.title,
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            topicId: topic.id,
            topicTitle: topic.title,
            isAllCompleted: false
          };
        }
      }
    }
  }

  // Si completó todos
  const lastMod = MATH_CURRICULUM[MATH_CURRICULUM.length - 1];
  const lastChap = lastMod.chapters[lastMod.chapters.length - 1];
  const lastTopic = lastChap.topics[lastChap.topics.length - 1];
  return {
    moduleId: lastMod.id,
    moduleTitle: lastMod.title,
    chapterId: lastChap.id,
    chapterTitle: lastChap.title,
    topicId: lastTopic.id,
    topicTitle: "¡Felicidades! Has completado toda la ruta matemática",
    isAllCompleted: true
  };
}

// Renderizado principal
function renderApp() {
  updateHeaderStats();
  renderDiscreteProgress();
  renderFocusBanner();

  if (STATE.currentView === 'curriculum') {
    renderCurriculumView();
  } else {
    renderPathView();
  }
}

function updateHeaderStats() {
  const stats = calculateStats();
  const xpEl = document.getElementById('stat-xp');
  const levelEl = document.getElementById('stat-level');

  if (xpEl) xpEl.textContent = `${stats.totalXp} XP`;
  if (levelEl) levelEl.textContent = `Nvl ${stats.level}`;
}

// Barra de progreso discreta arriba
function renderDiscreteProgress() {
  const stats = calculateStats();
  const fillEl = document.getElementById('compact-fill');
  const percentEl = document.getElementById('compact-percentage');
  const countEl = document.getElementById('compact-count');

  if (fillEl) fillEl.style.width = `${stats.percentage}%`;
  if (percentEl) percentEl.textContent = `${stats.percentage}%`;
  if (countEl) countEl.textContent = `(${stats.completedCount} de ${stats.totalTopics} temas)`;
}

// Banner de acceso directo superior "Donde voy"
function renderFocusBanner() {
  const current = getCurrentProgressPoint();
  const titleEl = document.getElementById('focus-topic-name');
  if (titleEl) {
    if (current.isAllCompleted) {
      titleEl.textContent = current.topicTitle;
    } else {
      titleEl.innerHTML = `<strong>${current.moduleTitle}</strong> ➔ ${current.topicTitle}`;
    }
  }
}

// Acción de saltar directo al tema en el que voy
function jumpToCurrentTopic() {
  const current = getCurrentProgressPoint();
  if (current.isAllCompleted) return;

  if (STATE.currentView !== 'curriculum') {
    switchView('curriculum');
  }

  setTimeout(() => {
    // Abrir el módulo
    const card = document.getElementById(`module-card-${current.moduleId}`);
    if (card && card.classList.contains('collapsed')) {
      card.classList.remove('collapsed');
    }

    // Scroll al tema exacto y animación
    const topicEl = document.querySelector(`[data-topic-id="${current.topicId}"]`);
    if (topicEl) {
      topicEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      topicEl.classList.add('highlight-next');
      setTimeout(() => {
        topicEl.classList.remove('highlight-next');
      }, 2500);
    } else if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

// Renderizar Vista Temario Completo
// REGLA SOLICITADA: Todos los módulos replegados (collapsed) excepto en el que estás actualmente
function renderCurriculumView() {
  const container = document.getElementById('main-content-view');
  if (!container) return;

  const current = getCurrentProgressPoint();
  const query = STATE.searchQuery.toLowerCase().trim();

  let html = `<div class="modules-container">`;

  MATH_CURRICULUM.forEach((module) => {
    let modTotal = 0;
    let modCompleted = 0;
    module.chapters.forEach(chap => {
      chap.topics.forEach(top => {
        modTotal++;
        if (STATE.completedTopics.has(top.id)) modCompleted++;
      });
    });

    const modPercent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
    const isCurrentModule = (module.id === current.moduleId);

    // Solo se expande si es el módulo actual o si hay una búsqueda activa
    const isCollapsed = query ? false : !isCurrentModule;

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
            ${chap.bibliography ? `<div class="chapter-biblio">📚 Texto: ${chap.bibliography}</div>` : ''}
            <div class="topics-list">
              ${filteredTopics.map(topic => {
                const isDone = STATE.completedTopics.has(topic.id);
                const isNext = (topic.id === current.topicId);
                const hasNote = Boolean(STATE.topicNotes[topic.id]);

                return `
                  <div class="topic-item ${isDone ? 'completed' : ''} ${isNext ? 'highlight-next' : ''}" data-topic-id="${topic.id}">
                    <div class="topic-checkbox-circle" onclick="toggleTopic('${topic.id}', event)">
                      ${isDone ? '✓' : ''}
                    </div>
                    <div class="topic-name" onclick="toggleTopic('${topic.id}', event)">
                      ${topic.title}
                    </div>
                    <div class="topic-actions">
                      <button class="topic-notes-btn ${hasNote ? 'has-notes' : ''}" 
                              title="${hasNote ? 'Ver/editar apunte' : 'Añadir apunte'}"
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
        <div class="module-card ${isCollapsed ? 'collapsed' : ''} ${isCurrentModule ? 'is-current' : ''}" id="module-card-${module.id}" 
             style="--module-color-gradient: ${module.gradient}; --module-accent: ${module.color};">
          <div class="module-header" onclick="toggleCollapseModule('${module.id}')">
            <div class="module-header-left">
              <div class="module-badge-icon">${module.icon}</div>
              <div class="module-info-title">
                <h2>
                  <span class="module-roman">${module.number}</span>
                  <span>${module.title}</span>
                  ${isCurrentModule ? `<span class="current-tag-badge">Actual</span>` : ''}
                </h2>
                <p>${module.subtitle}</p>
              </div>
            </div>
            <div class="module-header-right">
              <span class="module-progress-pill">${modCompleted}/${modTotal} (${modPercent}%)</span>
              <span class="collapse-indicator">▾</span>
            </div>
          </div>
          <div class="module-body" id="body-${module.id}">
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

// Renderizar Vista Ruta Duolingo (Minimalista, limpia y vertical sin amontonamientos)
function renderPathView() {
  const container = document.getElementById('main-content-view');
  if (!container) return;

  const current = getCurrentProgressPoint();

  let html = `<div class="path-view-wrapper">`;

  MATH_CURRICULUM.forEach((mod) => {
    html += `
      <div class="path-section-block">
        <div class="path-section-header" style="background: ${mod.gradient};">
          <span>${mod.icon}</span>
          <span>${mod.number}. ${mod.title}</span>
        </div>
        <div class="path-items-vertical-list">
    `;

    mod.chapters.forEach((chap) => {
      const total = chap.topics.length;
      const completed = chap.topics.filter(t => STATE.completedTopics.has(t.id)).length;
      const isDone = total > 0 && completed === total;
      const isCurrentChapter = (chap.id === current.chapterId);

      html += `
        <div class="path-item-row ${isDone ? 'completed' : ''} ${isCurrentChapter ? 'active-now' : ''}" 
             onclick="focusChapterInCurriculum('${mod.id}', '${chap.id}')">
          <div class="path-circle-node">
            ${isDone ? '✓' : (isCurrentChapter ? '▶' : '•')}
          </div>
          <div class="path-card-preview">
            <div>
              <div class="path-card-title">${chap.title}</div>
              <div class="path-card-sub">${completed} de ${total} temas completados</div>
            </div>
            <span class="path-card-badge">${isDone ? 'Dominado' : (isCurrentChapter ? 'En curso' : 'Pendiente')}</span>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

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

function toggleCollapseModule(moduleId) {
  const card = document.getElementById(`module-card-${moduleId}`);
  if (card) {
    card.classList.toggle('collapsed');
  }
}

function focusChapterInCurriculum(moduleId, chapterId) {
  switchView('curriculum');
  setTimeout(() => {
    const card = document.getElementById(`module-card-${moduleId}`);
    if (card && card.classList.contains('collapsed')) {
      card.classList.remove('collapsed');
    }
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

function switchView(viewName) {
  STATE.currentView = viewName;
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });
  renderApp();
}

// Modal de notas
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

function showCelebrationConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899']
    });
  }

  const stats = calculateStats();
  if (stats.percentage === 100) {
    openMilestoneModal("🎉 ¡RUTA COMPLETADA!", "¡Has completado exitosamente todo el temario de matemáticas para Ciencias de la Computación!");
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

function exportProgress() {
  const data = {
    completedTopics: [...STATE.completedTopics],
    topicNotes: STATE.topicNotes,
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
  if (confirm('¿Reiniciar todo tu progreso de estudio?')) {
    STATE.completedTopics.clear();
    STATE.topicNotes = {};
    saveState();
    renderApp();
  }
}

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

let deferredPrompt = null;

function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('ServiceWorker activo:', reg.scope);

          // Forzar chequeo de actualización inmediata en cada apertura
          reg.update();

          // Si hay un nuevo service worker esperando o instalándose
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Notificar al usuario o recargar suavemente
                if (confirm('✨ Hay una nueva versión disponible. ¿Actualizar ahora?')) {
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch(err => console.log('Error ServiceWorker:', err));

      // Si el controlador del ServiceWorker cambia, recargar para ver la nueva versión
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
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

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
