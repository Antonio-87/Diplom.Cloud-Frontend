import { useEffect, useRef, useState } from "react";
import useJsonFetch from "../hooks/useJsonFetch";
import { User } from "../interfaces/userInterface";
import { useNavigate, useParams } from "react-router-dom";

const userJson = [
  {
    id: 123456,
    login: "Anton",
    fullName: "Петров Петр Петрович",
    email: "aefzas@email.ru",
    files: 100,
    size: 1000,
    admin: true,
  },
];

const Admin = () => {
  const { userId } = useParams();
  const [statusAdmin, setStatusAdmin] = useState<boolean>();
  const navigate = useNavigate();
  const { data, loading, error } = useJsonFetch(
    `${process.env.REACT_APP_HOST}`
  );
  const users = useRef<User[]>(userJson);
  const admin = users.current?.find((user) => user.id === Number(userId));

  useEffect(() => {
    if (typeof data === "string") users.current = JSON.parse(data);
    if (error) console.log(error.message);
  }, [data, error, statusAdmin]);

  const statusChenge = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_HOST}users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ admin: statusAdmin }),
          }
        );
        if (response.ok) {
          console.log("Статус изменен!");
          statusAdmin ? setStatusAdmin(false) : setStatusAdmin(true);
        }
      } catch {
        new Error("Статус не зименен!");
      }
    };
    fetchData();
  };

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
        <table>
          <thead className="users-header">
            <tr className="titles">
              <th className="title-login">Login</th>
              <th className="title-status">Status admin</th>
              <th className="title-full-name">Full Name</th>
              <th className="title-email">Email</th>
              <th className="title-files">Files</th>
              <th className="title-size">Size</th>
            </tr>
          </thead>
          <tbody>
            {users.current?.map((user) => (
              <tr
                className="users-list"
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <td className="admin-login">{user.login} </td>
                <td className="admin-status">
                  {user.admin && <span className="check-admin">admin</span>}
                  <div className="status-chenge" onClick={() => statusChenge()}>
                    {user.admin ? "status off" : "status add"}
                  </div>
                </td>
                <td className="admin-full-name">{user.fullName}</td>
                <td className="admin-email">{user.email}</td>
                <td className="admin-files">{user.files}</td>
                <td className="admin-size">{user.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Admin;
