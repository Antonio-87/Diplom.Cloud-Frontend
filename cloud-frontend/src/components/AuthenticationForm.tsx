import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../functions/validate";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setPassword } from "../slices/registrationSlice";
import { User } from "../interfaces/userInterface";
import { Registration } from "../interfaces/registrationInterface";
// import useJsonFetch from "../hooks/useJsonFetch";

const AuthenticationForm = () => {
  const navigate = useNavigate();
  const { login, password } = useSelector(
    (state: { registration: Registration }) => state.registration
  );
  const dispatch = useDispatch();
  // const [login, setLogin] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  // const { data, loading, error } = useJsonFetch(
  //   `${process.env.REACT_APP_HOST}`
  // );
  const data = [
    {
      id: 123456,
      login: "Anton",
      fullName: "Петров Петр Петрович",
      email: "aefzas@email.ru",
      password: "Da1_sd",
      admin: true,
    },
  ];
  const users = useRef<User[]>(data);

  useEffect(() => {
    if (typeof data === "string") users.current = JSON.parse(data);
    // if (error) console.log(error.message);
  }, []);

  const hendleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const user = users.current?.find((user) => user.login === login);
    if (!user) {
      alert("Такого пользователя нет!");
      return;
    }

    if (user && user.password !== password) {
      alert("Пароль не верный");
      return;
    }

    user.admin === true
      ? navigate(`/admin/${user.id}`, { replace: true })
      : navigate(`/user/${user.id}`, { replace: true });
    // setLogin("");
    // setPassword("");
    dispatch(setLogin(""));
    dispatch(setPassword(""));
  };

  return (
    <>
      {/* {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error...</div>} */}
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
          onChange={(event) => {
            dispatch(setLogin(event.target.value));
          }}
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
          value={password}
          onChange={(event) => {
            dispatch(setPassword(event.target.value));
          }}
          pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$"
          placeholder="Введите пароль"
          required
        />
        <div className="buttons-auth">
          <button
            className="button-exit"
            onClick={(e) => {
              e.preventDefault();
              navigate("/", { replace: true });
            }}
          >
            Выход
          </button>
          <button type="submit" className="button-submit-auth">
            Вход
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthenticationForm;
