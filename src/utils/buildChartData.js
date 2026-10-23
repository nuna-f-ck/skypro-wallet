import { CATEGORIES } from "../constants/categories";

export function buildChartData(transactions) {
  const totals = {};

  for (const { category, sum } of transactions) {
    totals[category] = (totals[category] ?? 0) + sum;
  }

  return CATEGORIES.map(({ key, label, color }) => ({
    key,
    name: label,
    color,
    value: totals[key] ?? 0,
  }));
}
