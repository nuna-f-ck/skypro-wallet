import { useState } from "react";
import { CATEGORIES } from "../../constants/categories";
import { parseDateInput, toApiDate } from "../../utils/date";
import { parseSum, validateExpenseForm } from "../../utils/expenseValidation";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import "./ExpenseForm.css";

const INITIAL_VALUES = { description: "", category: "", date: "", sum: "" };

function ExpenseForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasError = Object.values(errors).some(Boolean);

  const updateField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
    setServerError("");
  };

  const handleChange = (e) => updateField(e.target.name, e.target.value);

  const getInputClass = (name) =>
    `expense-form__input${errors[name] ? " expense-form__input--error" : ""}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateExpenseForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        description: values.description.trim(),
        category: values.category,
        sum: parseSum(values.sum),
        date: toApiDate(parseDateInput(values.date)),
      });
      setValues(INITIAL_VALUES);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="card expense-form" onSubmit={handleSubmit} noValidate>
      <h2 className="card-title">Новый расход</h2>

      <label className="expense-form__label" htmlFor="description">
        Описание
        {errors.description && (
          <span className="expense-form__asterisk">*</span>
        )}
      </label>
      <input
        id="description"
        name="description"
        className={getInputClass("description")}
        type="text"
        placeholder="Введите описание"
        value={values.description}
        onChange={handleChange}
      />

      <span className="expense-form__label">
        Категория
        {errors.category && <span className="expense-form__asterisk">*</span>}
      </span>
      <div className="expense-form__categories">
        {CATEGORIES.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`expense-form__chip${
              values.category === item.key ? " expense-form__chip--active" : ""
            }`}
            onClick={() => updateField("category", item.key)}
          >
            <CategoryIcon name={item.key} />
            {item.label}
          </button>
        ))}
      </div>

      <label className="expense-form__label" htmlFor="date">
        Дата
        {errors.date && <span className="expense-form__asterisk">*</span>}
      </label>
      <input
        id="date"
        name="date"
        className={getInputClass("date")}
        type="text"
        placeholder="Введите дату"
        value={values.date}
        onChange={handleChange}
      />
      

      <label className="expense-form__label" htmlFor="sum">
        Сумма
        {errors.sum && <span className="expense-form__asterisk">*</span>}
      </label>
      <input
        id="sum"
        name="sum"
        className={getInputClass("sum")}
        type="text"
        placeholder="Введите сумму"
        value={values.sum}
        onChange={handleChange}
      />

      {serverError && <p className="expense-form__error">{serverError}</p>}

      <button
        className="expense-form__submit"
        type="submit"
        disabled={isSubmitting || hasError}
      >
        {isSubmitting ? "Добавляем..." : "Добавить новый расход"}
      </button>
    </form>
  );
}

export default ExpenseForm;