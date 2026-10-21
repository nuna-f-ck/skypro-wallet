import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="auth-card">
      <h1 className="auth-card__title">Регистрация</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-input" type="text" placeholder="Имя" />
        <input className="auth-input" type="email" placeholder="Эл. почта" />
        <input className="auth-input" type="password" placeholder="Пароль" />
        <button className="auth-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="auth-card__footer">
        <span>Уже есть аккаунт?</span>
        <Link className="auth-card__link" to="/login">
          Войдите здесь
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
