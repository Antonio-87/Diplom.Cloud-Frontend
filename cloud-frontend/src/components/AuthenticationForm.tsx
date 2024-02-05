import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../functions/validate";
import useJsonFetch from "../hooks/useJsonFetch";

interface User {
  login: string;
  fullName: string;
  email: string;
  password: string;
  admin: boolean;
}

const AuthenticationForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data, loading, error } = useJsonFetch(
    `${process.env.REACT_APP_HOST}`
  );
  const users = useRef<User[]>();

  useEffect(() => {
    if (typeof data === "string") users.current = JSON.parse(data);
  }, [data]);

  const hendleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = users.current?.find((user) => user.login === login);
    if (!user) {
      alert("Такого пользователя нет!");
      return;
    }
    user.admin === true
      ? navigate("/user", { replace: true })
      : navigate("/admin", { replace: true });
    setLogin("");
    setPassword("");
  };

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="loading">Error...</div>}
      <form
        className="form-registration"
        name="form-registaration"
        onSubmit={hendleSubmit}
      >
        <label htmlFor="login">Login</label>
        <span className="format">
          Формат: (только латинские буквы и цифры, первый символ — буква, длина
          от 4 до 20 символов)
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
        <button type="submit" className="button-submit">
          Войти
        </button>
      </form>
    </>
  );
};

export default AuthenticationForm;
