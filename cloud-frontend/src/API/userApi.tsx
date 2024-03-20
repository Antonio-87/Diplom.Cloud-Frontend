import { IUser } from "../interfaces/userInterface";

type UserResult = IUser | Error;

const createUser = async (user: {
  login: string;
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
}): Promise<UserResult> => {
  try {
    const formData = new FormData();
    formData.append("username", user.login);
    formData.append("full_name", user.fullName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("repeat_password", user.repeatPassword);

    console.log(formData);

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}users/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(JSON.stringify(await response.json()));

    const data = await response.json();
    console.log(data);
    const userData: IUser = JSON.parse(data);
    for (const key of Object.keys(userData)) {
      if (!(key in userData)) {
        throw new Error("Data does not match the IUser interface");
      }
    }
    return userData;
  } catch (error) {
    return new Error("An error occurred during user creation");
  }
};

export { createUser };
