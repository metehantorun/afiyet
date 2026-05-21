// ============================================================
// UTILS LAYER — dateHelper.js
// Tarih ve hafta hesaplama yardımcıları.
// Hard-coded değer içermez; her şey dinamik hesaplanır (SRP).
// ============================================================

function getMondayOfCurrentWeek() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Paz, 1=Pzt...
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + daysToMonday);
  return monday;
}

function getWeekDayNumbers() {
  const monday = getMondayOfCurrentWeek();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
}

function getWeekRangeLabel() {
  const monday = getMondayOfCurrentWeek();
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return `${monday.getDate()}–${sunday.getDate()} ${TR_MONTHS[sunday.getMonth()]} ${sunday.getFullYear()}`;
}

function getTodayColumnIndex() {
  const dayOfWeek = new Date().getDay();
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1; 
}
