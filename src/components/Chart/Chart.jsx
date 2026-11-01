import { formatMoney } from "../../utils/formatMoney";
import "./Chart.css";

const DATA = [
  { name: "Еда", value: 21990, color: "#D9B6FF" },
  { name: "Транспорт", value: 11046, color: "#FFB53D" },
  { name: "Жильё", value: 0, color: "#6EE4FE" },
  { name: "Развлечения", value: 13050, color: "#B0AEFF" },
  { name: "Образование", value: 0, color: "#BCEC30" },
  { name: "Другое", value: 19106, color: "#FFB9B8" },
];

const MAX_BAR_HEIGHT = 240;

function formatDate(date) {
  return date
    .toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(" г.", "");
}

function Chart({ range }) {
  const total = DATA.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(...DATA.map((item) => item.value));

  return (
    <section className="card chart">
      <h2 className="chart__total">{formatMoney(total)}</h2>
      <p className="chart__period">
        Расходы за <b>{range.start && formatDate(range.start)}</b>
        {range.end && (
          <>
            {" — "}
            <b>{formatDate(range.end)}</b>
          </>
        )}
      </p>

      <div className="chart__plot">
        {DATA.map((item) => {
          const height = Math.max((item.value / max) * MAX_BAR_HEIGHT, 3);
          return (
            <div className="chart__col" key={item.name}>
              <span className="chart__value">{formatMoney(item.value)}</span>
              <div
                className="chart__bar"
                style={{ height, background: item.color }}
              />
              <span className="chart__name">{item.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Chart;
