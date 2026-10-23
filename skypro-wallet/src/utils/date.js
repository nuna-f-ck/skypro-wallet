const DATE_PATTERN = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;

// "04.07.2024" -> Date. Если формат неверный или даты не существует — null
export function parseDateInput(value) {
  const match = DATE_PATTERN.exec(value.trim());
  if (!match) return null;

  const [day, month, year] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);

  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isRealDate ? date : null;
}

// Date -> "7-4-2024" (формат, который ждёт API: месяц-день-год)
export function toApiDate(date) {
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

// "2025-12-11T21:00:00.000Z" -> "12.12.2025"
export function formatDisplayDate(isoString) {
  return new Date(isoString).toLocaleDateString("ru-RU");
}