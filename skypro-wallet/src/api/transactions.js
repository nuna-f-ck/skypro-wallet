import { toApiDate } from "../utils/date";

const API_URL = "https://wedev-api.sky.pro/api/transactions";

async function request(token, url, options = {}) {
  let response;
  try {
    response = await fetch(url, {
      ...options,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    throw new Error("Нет соединения с сервером. Повторите попытку позже.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.error || "Не удалось выполнить запрос");
    error.status = response.status;
    throw error;
  }

  return Array.isArray(data) ? data : (data?.transactions ?? []);
}

export function getTransactions(token) {
  return request(token, API_URL);
}

// Возвращает обновлённый список всех транзакций
export function createTransaction(token, transaction) {
  return request(token, API_URL, {
    method: "POST",
    body: JSON.stringify(transaction),
  });
}

// range = { start: Date, end: Date }
export function getTransactionsByPeriod(token, { start, end }) {
  return request(token, `${API_URL}/period`, {
    method: "POST",
    body: JSON.stringify({ start: toApiDate(start), end: toApiDate(end) }),
  });
}