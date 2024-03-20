import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <main className="container-home">
        <p className="title-home">My Cloud</p>
        <div className="buttons-home">
          <Link className="button registration" to="/registration">
            Registration
          </Link>
          <Link className="button come" to="/authentication">
            Enter
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
