import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />
        <nav className="header__nav">
          <NavLink to="/" end className="header__link">
            Мои расходы
          </NavLink>
          <NavLink to="/analytics" className="header__link">
            Анализ расходов
          </NavLink>
        </nav>
        <button className="header__logout" onClick={() => navigate("/login")}>
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;
