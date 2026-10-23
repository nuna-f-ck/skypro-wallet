import { useEffect, useRef } from "react";
import "./Calendar.css";

const MONTHS_COUNT = 4;
const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

// Последние MONTHS_COUNT месяцев, включая текущий: [[год, месяц], ...]
// Месяцы с нуля: 6 = июль
function getMonths() {
  const today = new Date();
  return Array.from({ length: MONTHS_COUNT }, (_, i) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth() - (MONTHS_COUNT - 1 - i),
      1,
    );
    return [date.getFullYear(), date.getMonth()];
  });
}

const MONTHS = getMonths();

function getMonthTitle(year, month) {
  const name = new Date(year, month, 1).toLocaleDateString("ru-RU", {
    month: "long",
  });
  return `${name[0].toUpperCase()}${name.slice(1)} ${year}`;
}

function Calendar({ range, onChange }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  const isActive = (date) => {
    const t = date.getTime();
    const s = range.start?.getTime();
    const e = range.end?.getTime();
    if (s == null) return false;
    if (e == null) return t === s;
    return t >= s && t <= e;
  };

  const handleClick = (date) => {
    const { start, end } = range;
    if (!start || end) {
      onChange({ start: date, end: null });
    } else if (date < start) {
      onChange({ start: date, end: start });
    } else {
      onChange({ start, end: date });
    }
  };

  return (
    <section className="card calendar">
      <h2 className="card-title">Период</h2>

      <div className="calendar__weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar__scroll scroll" ref={scrollRef}>
        {MONTHS.map(([year, month]) => {
          const daysCount = new Date(year, month + 1, 0).getDate();
          const offset = (new Date(year, month, 1).getDay() + 6) % 7;

          return (
            <div key={`${year}-${month}`}>
              <h3 className="calendar__month">{getMonthTitle(year, month)}</h3>
              <div className="calendar__days">
                {Array.from({ length: offset }, (_, i) => (
                  <span key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysCount }, (_, i) => {
                  const date = new Date(year, month, i + 1);
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`calendar__day${
                        isActive(date) ? " calendar__day--active" : ""
                      }`}
                      onClick={() => handleClick(date)}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Calendar;