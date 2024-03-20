import { jwtDecode } from "jwt-decode";

const fetchToken = async (
  username: string,
  password: string
  // remember: boolean
) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error(response.statusText);

  const result = await response.json();
  if (!result.access) throw new Error(result.statusText);

  // if (remember) {
  //   localStorage.setItem('jwtTokenRefresh', result.refresh)
  // }

  const detail = jwtDecode(result.access);

  console.log(detail);
};

export { fetchToken };
