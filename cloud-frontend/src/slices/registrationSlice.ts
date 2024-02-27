import { createSlice } from "@reduxjs/toolkit";
import { Registration } from "../interfaces/registrationInterface";

const initialState: Registration = {
  login: "",
  fullName: "",
  email: "",
  password: "",
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setLogin, setFullName, setEmail, setPassword } =
  registrationSlice.actions;

export default registrationSlice.reducer;
