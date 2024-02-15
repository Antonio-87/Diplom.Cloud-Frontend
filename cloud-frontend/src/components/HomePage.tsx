import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <main className="container-home">
        <p className="title-home">My Cloud</p>
        <div className="buttons-home">
          <Link className="button registration" to="/registration">
            Регистрация
          </Link>
          <Link className="button come" to="/authentication">
            Вход
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
