import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>Skypro.Wallet</div>
      <nav>
        <NavLink to="/">Мои расходы</NavLink>
        <NavLink to="/analytics">Анализ расходов</NavLink>
      </nav>
      <button>Выйти</button>
    </header>
  );
}

export default Header;
