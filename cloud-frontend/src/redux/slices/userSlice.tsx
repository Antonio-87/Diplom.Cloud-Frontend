import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IRegistrUser,
  IUser,
  IUserState,
} from "../../interfaces/userInterface";

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
  search: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserRequest: (state, action: PayloadAction<IRegistrUser>) => {
      state.loading = true;
      state.error = null;
    },
    getUserFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    getUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    bodyUserRequest: (state, action: PayloadAction<IRegistrUser>) => {
      state.search = action.payload;
    },
  },
});

export const {
  getUserRequest,
  getUserFailure,
  getUserSuccess,
  bodyUserRequest,
} = userSlice.actions;
export default userSlice.reducer;
