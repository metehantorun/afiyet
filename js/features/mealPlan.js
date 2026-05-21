// ============================================================
// FEATURES LAYER — mealPlan.js
// Haftalık yemek planı yönetimi ve render.
// SRS: FR-18, FR-19
// ============================================================

// ── Render ──────────────────────────────────────────────────
function renderPlan(container) {
  const dayNumbers = getWeekDayNumbers();
  const todayIndex = getTodayColumnIndex();

  container.innerHTML = `
    <div class="section-header">
      <span class="section-title">📅 Haftalık Yemek Planı</span>
      <span style="font-size:13px;color:var(--text-muted)">${getWeekRangeLabel()}</span>
    </div>
    <div class="meal-plan-grid">
      ${DAY_KEYS.map((day, di) => renderDayColumn(day, di, dayNumbers[di], di === todayIndex)).join('')}
    </div>
    <div style="display:flex;gap:10px;margin-top:20px">
      <button class="btn-primary" style="max-width:240px" onclick="genShoppingFromPlan()">🛒 Alışveriş Listesi Oluştur</button>
      <button class="btn-primary" style="max-width:180px;background:var(--secondary)" onclick="clearPlan()">🗑 Planı Temizle</button>
    </div>
  `;
}

function renderDayColumn(day, dayIndex, dayNumber, isToday) {
  return `
    <div class="day-col">
      <div class="day-header">
        <div class="day-name">${DAY_LABELS[dayIndex]}</div>
        <div class="day-num ${isToday ? 'today' : ''}">${dayNumber}</div>
      </div>
      ${MEAL_TYPES.map(type => renderMealSlot(day, type)).join('')}
    </div>`;
}

function normalizeMealSlots(day, type) {
  let slots = mealPlan[day][type];
  if (!Array.isArray(slots)) slots = [slots, null, null];
  while (slots.length < 3) slots.push(null);
  mealPlan[day][type] = slots;
  return slots;
}

function renderMealSlot(day, type) {
  const slots = normalizeMealSlots(day, type);
  let html = `<div class="meal-slot"><div class="meal-type-lbl">${MEAL_LABELS[type]}</div>`;

  if (type === 'dinner') {
    slots.forEach((meal, i) => {
      html += renderDinnerSubSlot(day, type, i, meal);
    });
  } else {
    html += renderBreakfastLunchSlot(day, type, slots);
  }

  return html + '</div>';
}

function renderDinnerSubSlot(day, type, slotIndex, meal) {
  const hasMeal = meal && meal.n;
  return `
    <div class="sub-slot-row ${hasMeal ? 'filled' : ''}"
      onclick="openRecipeModal('${day}','${type}',${slotIndex})">
      <span class="sub-lbl">${DINNER_LABELS[slotIndex]}:</span>
      ${hasMeal
        ? `<span class="sub-val"><span class="em">${meal.e}</span> ${meal.n}</span>`
        : `<span class="sub-empty-small">＋</span>`}
    </div>`;
}

function renderBreakfastLunchSlot(day, type, slots) {
  const filledMeals = slots.filter(m => m && m.n);
  if (filledMeals.length === 0) {
    return `<div class="meal-empty-big" onclick="openRecipeModal('${day}','${type}',0)">＋</div>`;
  }
  const rows = filledMeals.map((meal, i) => `
    <div class="sub-slot-row filled" onclick="openRecipeModal('${day}','${type}',${i})">
      <span class="sub-val"><span class="em">${meal.e}</span> ${meal.n}</span>
    </div>`).join('');
  const addMore = filledMeals.length < 3
    ? `<div class="sub-slot-row add-more" onclick="openRecipeModal('${day}','${type}',${filledMeals.length})">
         <span class="sub-empty-small">＋</span>
       </div>` : '';
  return rows + addMore;
}

function clearPlan() {
  if (!confirm('Tüm haftalık yemek planı silinecek. Emin misiniz?')) return;
  DAY_KEYS.forEach(d => MEAL_TYPES.forEach(t => { mealPlan[d][t] = [null, null, null]; }));
  syncShoppingWithPantry();
  renderPlan(document.getElementById('mainContent'));
  showToast('🗑 Plan temizlendi');
}
