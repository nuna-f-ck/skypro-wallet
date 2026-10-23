import { useEffect, useMemo, useState } from "react";
import { getTransactionsByPeriod } from "../api/transactions";
import Calendar from "../components/Calendar/Calendar";
import Chart from "../components/Chart/Chart";
import { useAuth } from "../hooks/useAuth";
import { buildChartData } from "../utils/buildChartData";
import "./AnalyticsPage.css";

const DEFAULT_PERIOD_DAYS = 7;

// Последние DEFAULT_PERIOD_DAYS дней, включая сегодня
function getDefaultRange() {
  const end = new Date();
  end.setHours(0, 0, 0, 0);

  const start = new Date(end);
  start.setDate(end.getDate() - (DEFAULT_PERIOD_DAYS - 1));

  return { start, end };
}

function AnalyticsPage() {
  const { token, signOut } = useAuth();

  const [range, setRange] = useState(getDefaultRange);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleRangeChange = (nextRange) => {
    setRange(nextRange);
    if (nextRange.start && nextRange.end) {
      setIsLoading(true);
      setError("");
    }
  };

  useEffect(() => {
    if (!range.start || !range.end) return;

    let isIgnored = false;

    getTransactionsByPeriod(token, range)
      .then((data) => {
        if (!isIgnored) setTransactions(data);
      })
      .catch((err) => {
        if (isIgnored) return;
        if (err.status === 401) {
          signOut();
          return;
        }
        setError(err.message);
      })
      .finally(() => {
        if (!isIgnored) setIsLoading(false);
      });

    return () => {
      isIgnored = true;
    };
  }, [range, token, signOut]);

  const chartData = useMemo(() => buildChartData(transactions), [transactions]);

  return (
    <div>
      <h1 className="page-title">Анализ расходов</h1>
      <div className="analytics-grid">
        <Calendar range={range} onChange={handleRangeChange} />
        <Chart
          range={range}
          data={chartData}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

export default AnalyticsPage;