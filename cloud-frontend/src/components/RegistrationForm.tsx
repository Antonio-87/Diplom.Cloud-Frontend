import { useEffect, useState } from "react";

type RegistrObj = {
  login: string;
  fullName: string;
  mail: string;
  password: string;
};

const RegistrationForm = () => {
  const [registr, setRegistr] = useState<RegistrObj>();
  const [login, setLogin] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {}, [registr]);

  const hendleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <form
      className="form-registration"
      name="form-registaration"
      onSubmit={hendleSubmit}
    >
      <label htmlFor="login">Login</label>
      <input
        type="text"
        id="login"
        className="input login"
        defaultValue={login}
        onChange={(event) => setLogin(event.target.value)}
        pattern="^(?=[a-zA-Z])([a-zA-Z0-9]{4,20})$"
        required
      />
      <label htmlFor="full-name">Полное Имя</label>
      <input
        type="text"
        id="full-name"
        className="input full-name"
        defaultValue={fullName}
        onChange={(event) => setFullName(event.target.value)}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className="input email"
        defaultValue={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        className="input password"
        defaultValue={password}
        onChange={(event) => setPassword(event.target.value)}
        pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$"
        required
      />
      <button type="submit" className="button-submit">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegistrationForm;
