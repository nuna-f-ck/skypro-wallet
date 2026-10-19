import ExpensesTable from "../components/ExpensesTable/ExpensesTable";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";

function MainPage() {
  return (
    <div>
      <h1>Мои расходы</h1>
      <ExpensesTable />
      <ExpenseForm />
    </div>
  );
}

export default MainPage;
