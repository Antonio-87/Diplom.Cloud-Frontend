import { useEffect, useRef } from "react";
import useJsonFetch from "../hooks/useJsonFetch";
import { User } from "./AuthenticationForm";
import { useNavigate, useParams } from "react-router-dom";

// const user = [
//   {
//     id: 123456,
//     login: "Anton",
//     fullName: "Петров Петр Петрович",
//     email: "aefzas@email.ru",
//     admin: true,
//   },
// ];

const Admin = () => {
  const userId = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useJsonFetch(
    `${process.env.REACT_APP_HOST}`
  );
  const users = useRef<User[]>();
  const admin = users.current?.find((user) => user.id === Number(userId));

  useEffect(() => {
    if (typeof data === "string") users.current = JSON.parse(data);
    if (error) console.log(error.message);
  }, [data, error]);

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error...</div>}
      <header className="header-admin">Администратор: {admin?.login}</header>
      <main className="users">
        <ul className="users-list">
          {users.current?.map((user) => {
            return (
              <li
                className="item-user"
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <p className="login">
                  {user.login}{" "}
                  {user.admin && <span className="check-admin">admin</span>}
                </p>
                <p className="name">{user.fullName}</p>
                <p className="email">{user.email}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default Admin;
