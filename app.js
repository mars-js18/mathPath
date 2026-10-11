/**
 * MathMaster - Lógica de la Aplicación PWA
 * - Todos los módulos aparecen replegados al inicio (ninguno se auto-despliega solo).
 * - "Continuar aprendiendo": salto directo y apertura automática del módulo al hacer clic en "Ir ahora".
 * - Título sin desbordamiento (truncado con puntos suspensivos y adaptable a pantallas de celular).
 * - Buscador integrado con botón de lupa en la barra superior.
 * - Pestaña/Modal de ajustes separada para exportar, importar y cambiar tema.
 * - Registro PWA y manejo de caché v3.
 */

const STATE = {
  completedTopics: new Set(),
  topicNotes: {},
  currentView: 'curriculum', // 'curriculum' | 'path'
  searchQuery: '',
  manuallyExpandedModules: new Set()
};

const XP_PER_TOPIC = 15;

document.addEventListener('DOMContentLoaded', () => {
  loadState();
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
  } catch (e) {
    console.error('Error cargando estado:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem('mathmaster_completed', JSON.stringify([...STATE.completedTopics]));
    localStorage.setItem('mathmaster_notes', JSON.stringify(STATE.topicNotes));
  } catch (e) {
    console.error('Error guardando estado:', e);
  }
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

// Detectar punto actual de progreso (primer tema pendiente)
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

  const lastMod = MATH_CURRICULUM[MATH_CURRICULUM.length - 1];
  const lastChap = lastMod.chapters[lastMod.chapters.length - 1];
  const lastTopic = lastChap.topics[lastChap.topics.length - 1];
  return {
    moduleId: lastMod.id,
    moduleTitle: lastMod.title,
    chapterId: lastChap.id,
    chapterTitle: lastChap.title,
    topicId: lastTopic.id,
    topicTitle: "¡Felicidades! Toda la ruta completada",
    isAllCompleted: true
  };
}

function renderApp() {
  renderInspiringProgress();
  renderFocusBanner();

  if (STATE.currentView === 'curriculum') {
    renderCurriculumView();
  } else {
    renderPathView();
  }
}

// Barra de progreso visualmente atractiva y motivadora
function renderInspiringProgress() {
  const stats = calculateStats();
  const fillEl = document.getElementById('hero-progress-fill');
  const percentEl = document.getElementById('hero-progress-percent');
  const subEl = document.getElementById('hero-progress-sub');
  const xpEl = document.getElementById('hero-progress-xp');

  if (fillEl) fillEl.style.width = `${stats.percentage}%`;
  if (percentEl) percentEl.textContent = `${stats.percentage}%`;
  if (subEl) subEl.textContent = `${stats.completedCount} de ${stats.totalTopics} temas dominados`;
  if (xpEl) xpEl.textContent = `${stats.totalXp} XP • Nvl ${stats.level}`;
}

// Banner de acceso directo "Continuar aprendiendo"
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

// Acción: Saltar directamente al tema en curso y abrirlo
function jumpToCurrentTopic(e) {
  if (e) e.stopPropagation();
  const current = getCurrentProgressPoint();
  if (current.isAllCompleted) return;

  // Cambiar a vista temario si estamos en ruta
  if (STATE.currentView !== 'curriculum') {
    switchView('curriculum');
  }

  // Registrar que este módulo debe estar abierto
  STATE.manuallyExpandedModules.add(current.moduleId);

  // Asegurar que el card esté desplegado
  const card = document.getElementById(`module-card-${current.moduleId}`);
  if (card) {
    card.classList.remove('collapsed');
  }

  // Desplazar y resaltar con animación visible
  setTimeout(() => {
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
  }, 120);
}

// REGLA: TODOS los módulos aparecen replegados al inicio a menos que el usuario los abra manualmente o haya búsqueda activa
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

    // Replegado por defecto SIEMPRE, a menos que el usuario lo haya abierto manualmente o haya búsqueda
    let isCollapsed = true;
    if (query) {
      isCollapsed = false;
    } else if (STATE.manuallyExpandedModules.has(module.id)) {
      isCollapsed = false;
    }

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

// Alternar colapsado de módulo
function toggleCollapseModule(moduleId) {
  const card = document.getElementById(`module-card-${moduleId}`);
  if (card) {
    const isNowCollapsed = card.classList.toggle('collapsed');
    if (isNowCollapsed) {
      STATE.manuallyExpandedModules.delete(moduleId);
    } else {
      STATE.manuallyExpandedModules.add(moduleId);
    }
  }
}

// Vista Ruta Vertical Limpia
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
            <div style="min-width: 0; flex: 1;">
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

function focusChapterInCurriculum(moduleId, chapterId) {
  switchView('curriculum');
  STATE.manuallyExpandedModules.add(moduleId);
  setTimeout(() => {
    const card = document.getElementById(`module-card-${moduleId}`);
    if (card) {
      card.classList.remove('collapsed');
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

// Barra de búsqueda con la lupa
function toggleSearchBar() {
  const container = document.getElementById('search-bar-container');
  const input = document.getElementById('search-topics');
  if (container) {
    const isActive = container.classList.toggle('active');
    if (isActive && input) {
      input.focus();
    } else if (!isActive && input) {
      input.value = '';
      STATE.searchQuery = '';
      if (STATE.currentView === 'curriculum') renderCurriculumView();
    }
  }
}

// Modal de ajustes
function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  initTheme();
  if (modal) modal.classList.add('active');
}

function closeSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) modal.classList.remove('active');
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
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899']
    });
  }

  const stats = calculateStats();
  if (stats.percentage === 100) {
    openMilestoneModal("🎉 ¡RUTA COMPLETADA!", "¡Has dominado todo el temario de matemáticas para Ciencias de la Computación!");
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
    STATE.manuallyExpandedModules.clear();
    saveState();
    renderApp();
  }
}

function setupEventListeners() {
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

function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('ServiceWorker activo:', reg.scope);
          reg.update();

          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                window.location.reload();
              }
            });
          });
        })
        .catch(err => console.log('Error ServiceWorker:', err));

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
