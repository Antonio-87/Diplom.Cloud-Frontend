import { createSlice } from "@reduxjs/toolkit";
import { Request } from "../interfaces/requestInterface";

const initialState: Request = {
  data: [],
  loading: false,
  error: null,
  search: "",
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    searchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchUsersSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    bodyRequest: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  searchUsersRequest,
  searchUsersFailure,
  searchUsersSuccess,
  bodyRequest,
} = requestsSlice.actions;

export default requestsSlice.reducer;
