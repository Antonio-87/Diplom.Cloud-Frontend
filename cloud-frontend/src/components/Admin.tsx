import { useEffect, useRef } from "react";
import useJsonFetch from "../hooks/useJsonFetch";
import { User } from "./AuthenticationForm";
import { useNavigate, useParams } from "react-router-dom";

const userJson = [
  {
    id: 123456,
    login: "Anton",
    fullName: "Петров Петр Петрович",
    email: "aefzas@email.ru",
    admin: true,
  },
];

const Admin = () => {
  const userId = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useJsonFetch(
    `${process.env.REACT_APP_HOST}`
  );
  const users = useRef<User[]>(userJson);
  const admin = users.current?.find((user) => user.id === Number(userId));

  useEffect(() => {
    if (typeof data === "string") users.current = JSON.parse(data);
    if (error) console.log(error.message);
  }, [data, error]);

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error...</div>}
      <header className="header-admin">
        <p className="title">Администратор: {admin?.login}</p>
        <button
          className="button-exit-admin"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { replace: true });
          }}
        >
          Выход
        </button>
      </header>
      <main className="users">
        <table className="users-list">
          <thead>
            <tr>
              <th>Login</th>
              <th>Status admin</th>
              <th>Full Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.current?.map((user) => (
              <tr key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
                <td className="login">{user.login} </td>
                <td className="status">
                  {user.admin && <span className="check-admin">admin</span>}
                </td>
                <td className="full-name">{user.fullName}</td>
                <td className="email">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Admin;
