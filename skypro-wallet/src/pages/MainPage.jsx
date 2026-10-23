import ExpensesTable from "../components/ExpensesTable/ExpensesTable";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import { useTransactions } from "../hooks/useTransactions";
import "./MainPage.css";

function MainPage() {
  const { transactions, isLoading, error, addTransaction } = useTransactions();

  return (
    <div>
      <h1 className="page-title">Мои расходы</h1>
      <div className="main-grid">
        <ExpensesTable
          transactions={transactions}
          isLoading={isLoading}
          error={error}
        />
        <ExpenseForm onSubmit={addTransaction} />
      </div>
    </div>
  );
}

export default MainPage;