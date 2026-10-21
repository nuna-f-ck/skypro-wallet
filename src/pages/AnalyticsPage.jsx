import { useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import Chart from "../components/Chart/Chart";
import "./AnalyticsPage.css";

function AnalyticsPage() {
  const [range, setRange] = useState({
    start: new Date(2024, 6, 29),
    end: new Date(2024, 7, 4),
  });

  return (
    <div>
      <h1 className="page-title">Анализ расходов</h1>
      <div className="analytics-grid">
        <Calendar range={range} onChange={setRange} />
        <Chart range={range} />
      </div>
    </div>
  );
}

export default AnalyticsPage;
