import { formatMoney } from "../../utils/formatMoney";
import "./ExpensesTable.css";

const EXPENSES = [
  {
    id: 1,
    description: "Пятерочка",
    category: "Еда",
    date: "03.07.2024",
    sum: 3500,
  },
  {
    id: 2,
    description: "Яндекс Такси",
    category: "Транспорт",
    date: "03.07.2024",
    sum: 730,
  },
  {
    id: 3,
    description: "Аптека Вита",
    category: "Другое",
    date: "03.07.2024",
    sum: 1200,
  },
  {
    id: 4,
    description: "Бургер Кинг",
    category: "Еда",
    date: "03.07.2024",
    sum: 950,
  },
  {
    id: 5,
    description: "Деливери",
    category: "Еда",
    date: "02.07.2024",
    sum: 1320,
  },
  {
    id: 6,
    description: "Кофейня №1",
    category: "Еда",
    date: "02.07.2024",
    sum: 400,
  },
  {
    id: 7,
    description: "Бильярд",
    category: "Развлечения",
    date: "29.06.2024",
    sum: 600,
  },
  {
    id: 8,
    description: "Перекресток",
    category: "Еда",
    date: "29.06.2024",
    sum: 2360,
  },
  {
    id: 9,
    description: "Лукойл",
    category: "Транспорт",
    date: "29.06.2024",
    sum: 1000,
  },
  {
    id: 10,
    description: "Летуаль",
    category: "Другое",
    date: "29.06.2024",
    sum: 4300,
  },
  {
    id: 11,
    description: "Яндекс Такси",
    category: "Транспорт",
    date: "28.06.2024",
    sum: 320,
  },
  {
    id: 12,
    description: "Перекресток",
    category: "Еда",
    date: "28.06.2024",
    sum: 1360,
  },
  {
    id: 13,
    description: "Деливери",
    category: "Еда",
    date: "28.06.2024",
    sum: 2320,
  },
  {
    id: 14,
    description: "Вкусвилл",
    category: "Еда",
    date: "27.06.2024",
    sum: 1220,
  },
  {
    id: 15,
    description: "Кофейня №1",
    category: "Еда",
    date: "27.06.2024",
    sum: 920,
  },
  {
    id: 16,
    description: "Вкусвилл",
    category: "Еда",
    date: "26.06.2024",
    sum: 840,
  },
];

function TrashIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 1h4l.5 1H11v1.2H1V2h2.5L4 1Zm-2.2 3h8.4l-.6 7H2.4l-.6-7Z" />
    </svg>
  );
}

function ExpensesTable() {
  return (
    <section className="card expenses-table">
      <h2 className="card-title">Таблица расходов</h2>

      <div className="expenses-table__row expenses-table__row--head">
        <span>Описание</span>
        <span>Категория</span>
        <span>Дата</span>
        <span>Сумма</span>
        <span />
      </div>

      <div className="expenses-table__body scroll">
        {EXPENSES.map((item) => (
          <div className="expenses-table__row" key={item.id}>
            <span>{item.description}</span>
            <span>{item.category}</span>
            <span>{item.date}</span>
            <span>{formatMoney(item.sum)}</span>
            <button className="expenses-table__delete" aria-label="Удалить">
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExpensesTable;
