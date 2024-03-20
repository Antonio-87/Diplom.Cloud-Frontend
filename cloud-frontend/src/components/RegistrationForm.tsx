import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../functions/validateInput";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { bodyUserRequest, getUserRequest } from "../redux/slices/userSlice";
const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  if (error) console.error(error);

  const hendleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Password mismatch!");
      return;
    }
    dispatch(
      bodyUserRequest({
        login: login,
        fullName: fullName,
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      })
    );

    // if (!error) {
    //   navigate("/authentication", { replace: true });
    //   setLogin("");
    //   setFullName("");
    //   setEmail("");
    //   setPassword("");
    // }
  };

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
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
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          onInput={(input) => validate(input.currentTarget)}
          pattern="^(?=[a-zA-Z])([a-zA-Z0-9]{4,20})$"
          placeholder="Please enter your login"
          required
        />
        <label htmlFor="full-name">Full name</label>
        <span className="format">Format: (Petrov Petr Petrovich)</span>
        <input
          type="text"
          id="full-name"
          className="input full-name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Please enter your full name"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="input email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Please enter your imail"
          required
        />
        <label htmlFor="password">Password</label>
        <span className="format">
          Format: (at least 6 characters: at least one capital letter, one
          number and one special character)
        </span>
        <input
          type="password"
          id="password"
          className="input password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onInput={(input) => validate(input.currentTarget)}
          pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$"
          placeholder="Please enter your password"
          required
        />
        <input
          type="password"
          id="repeat-password"
          className="input repeat-password"
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
          onInput={(input) => validate(input.currentTarget)}
          placeholder="Please repeat your password"
          required
        />
        <div className="buttons-reg">
          <button
            type="button"
            className="button-exit"
            onClick={(e) => {
              e.preventDefault();
              navigate("/", { replace: true });
            }}
          >
            Exit
          </button>
          <button type="submit" className="button-submit-reg">
            Registration
          </button>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
