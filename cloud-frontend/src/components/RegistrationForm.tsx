import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../functions/validate";

const RegistrationForm = () => {
  const [login, setLogin] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const hendleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_HOST}users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: login,
            fullName: fullName,
            email: email,
            password: password,
          }),
        });
        if (response.ok) navigate("/", { replace: true });
      } catch (e) {
        new Error(`No create user`);
      }
    };
    fetchData();

    setLogin("");
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      className="form-registration"
      name="form-registaration"
      onSubmit={hendleSubmit}
    >
      <label htmlFor="login">Login</label>
      <span className="format">
        Формат: (только латинские буквы и цифры, первый символ — буква, длина от
        4 до 20 символов)
      </span>
      <input
        type="text"
        id="login"
        className="input login"
        defaultValue={login}
        onChange={(event) => setLogin(event.target.value)}
        onInput={(input) => validate(input.currentTarget)}
        pattern="^(?=[a-zA-Z])([a-zA-Z0-9]{4,20})$"
        placeholder="Введите логин"
        required
      />
      <label htmlFor="full-name">Полное Имя</label>
      <span className="format">Формат: (Петров Петр Петрович)</span>
      <input
        type="text"
        id="full-name"
        className="input full-name"
        defaultValue={fullName}
        onChange={(event) => setFullName(event.target.value)}
        placeholder="Введите полное имя"
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className="input email"
        defaultValue={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Введите imail"
        required
      />
      <label htmlFor="password">Password</label>
      <span className="format">
        Формат: (не менее 6 символов: как минимум одна заглавная буква, одна
        цифра и один специальный символ)
      </span>
      <input
        type="text"
        id="password"
        className="input password"
        defaultValue={password}
        onChange={(event) => setPassword(event.target.value)}
        pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$"
        placeholder="Введите пароль"
        required
      />
      <div className="buttons-reg">
        <button
          className="button-exit"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { replace: true });
          }}
        >
          Выход
        </button>
        <button type="submit" className="button-submit-reg">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
