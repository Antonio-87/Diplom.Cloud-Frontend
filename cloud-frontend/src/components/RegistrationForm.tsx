import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../functions/validate";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setFullName,
  setLogin,
  setPassword,
} from "../slices/registrationSlice";
import { Registration } from "../interfaces/registrationInterface";
import { Request } from "../interfaces/requestInterface";
import { bodyRequest } from "../slices/requestsSlice";

const RegistrationForm = () => {
  // const [login, setLogin] = useState<string>("");
  // const [fullName, setFullName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const { login, fullName, email, password } = useSelector(
    (state: { registration: Registration }) => state.registration
  );
  const { data, loading, error, search } = useSelector(
    (state: { requests: Request }) => state.requests
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hendleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
      bodyRequest({
        url: `${process.env.REACT_APP_HOST}users`,
        options: {
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
        },
      })
    );

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`${process.env.REACT_APP_HOST}users`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         login: login,
    //         fullName: fullName,
    //         email: email,
    //         password: password,
    //       }),
    //     });
    //     if (response.ok) navigate("/authentication", { replace: true });
    //   } catch (e) {
    //     new Error(`No create user`);
    //   }
    // };
    // fetchData();

    // setLogin("");
    // setFullName("");
    // setEmail("");
    // setPassword("");
    if (error?.message === "304") alert("Логин занят!");
    if (!error) {
      dispatch(setLogin(""));
      dispatch(setFullName(""));
      dispatch(setEmail(""));
      dispatch(setPassword(""));
    }
  };

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error...</div>}
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
          value={login}
          onChange={(event) => dispatch(setLogin(event.target.value))}
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
          value={fullName}
          onChange={(event) => dispatch(setFullName(event.target.value))}
          placeholder="Введите полное имя"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="input email"
          value={email}
          onChange={(event) => dispatch(setEmail(event.target.value))}
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
          value={password}
          onChange={(event) => dispatch(setPassword(event.target.value))}
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
    </>
  );
};

export default RegistrationForm;
