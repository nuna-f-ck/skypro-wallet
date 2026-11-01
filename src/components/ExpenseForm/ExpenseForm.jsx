import { useState } from "react";
import { CATEGORIES } from "../../constants/categories";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import "./ExpenseForm.css";

function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [sum, setSum] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // логика добавления расхода будет позже
  };

  return (
    <form className="card expense-form" onSubmit={handleSubmit}>
      <h2 className="card-title">Новый расход</h2>

      <label className="expense-form__label" htmlFor="description">
        Описание
      </label>
      <input
        id="description"
        className="expense-form__input"
        type="text"
        placeholder="Введите описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <span className="expense-form__label">Категория</span>
      <div className="expense-form__categories">
        {CATEGORIES.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`expense-form__chip${
              category === item.key ? " expense-form__chip--active" : ""
            }`}
            onClick={() => setCategory(item.key)}
          >
            <CategoryIcon name={item.key} />
            {item.label}
          </button>
        ))}
      </div>

      <label className="expense-form__label" htmlFor="date">
        Дата
      </label>
      <input
        id="date"
        className="expense-form__input"
        type="text"
        placeholder="Введите дату"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label className="expense-form__label" htmlFor="sum">
        Сумма
      </label>
      <input
        id="sum"
        className="expense-form__input"
        type="text"
        placeholder="Введите сумму"
        value={sum}
        onChange={(e) => setSum(e.target.value)}
      />

      <button className="expense-form__submit" type="submit">
        Добавить новый расход
      </button>
    </form>
  );
}

export default ExpenseForm;
