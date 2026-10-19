import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="auth-card">
      <h1 className="auth-card__title">Вход</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-input" type="text" placeholder="Логин" />
        <input className="auth-input" type="password" placeholder="Пароль" />
        <button className="auth-button" type="submit">
          Войти
        </button>
      </form>
      <div className="auth-card__footer">
        <span>Нужно зарегистрироваться?</span>
        <Link className="auth-card__link" to="/register">
          Регистрируйтесь здесь
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
