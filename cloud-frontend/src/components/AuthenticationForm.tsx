import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../functions/validateInput";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../interfaces/userInterface";

const AuthenticationForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const users = useRef<User[]>();

  useEffect(() => {
    // if (typeof data === "string") users.current = JSON.parse();
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
    setLogin("");
    setPassword("");
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
          Format: (only Latin letters and numbers, the first character is a
          letter, length from 4 to 20 characters)
        </span>
        <input
          type="text"
          id="login"
          className="input login"
          defaultValue={login}
          onChange={(event) => {
            setLogin(event.target.value);
          }}
          onInput={(input) => validate(input.currentTarget)}
          pattern="^(?=[a-zA-Z])([a-zA-Z0-9]{4,20})$"
          placeholder="Please enter your login"
          required
        />
        <label htmlFor="password">Password</label>
        <span className="format">
          Format: (at least 6 characters: at least one capital letter, one
          number and one special character)
        </span>
        <input
          type="text"
          id="password"
          className="input password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$"
          placeholder="Please enter your password"
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
            Exit
          </button>
          <button type="submit" className="button-submit-auth">
            Enter
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthenticationForm;
