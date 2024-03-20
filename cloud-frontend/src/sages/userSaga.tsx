import { takeLatest, put, debounce, retry, call } from "redux-saga/effects";
import {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  bodyUserRequest,
} from "../redux/slices/userSlice";

import { PayloadAction } from "@reduxjs/toolkit";
import { IRegistrUser, IUser } from "../interfaces/userInterface";
import { createUser } from "../API/userApi";

function filterBodyUserRequest({
  type,
  payload,
}: {
  type: string;
  payload: string | IRegistrUser;
}) {
  if (typeof payload === "string") {
    return type === bodyUserRequest.type && payload.trim() !== "";
  }
  if (typeof payload === "object") {
    return (
      type === bodyUserRequest.type &&
      payload.login.trim() !== "" &&
      payload.fullName.trim() !== "" &&
      payload.email.trim() !== "" &&
      payload.password.trim() !== "" &&
      payload.repeatPassword.trim() !== ""
    );
  }
}

function* handleUserRequestSaga(action: PayloadAction<IRegistrUser>) {
  yield put(getUserRequest(action.payload));
}

function* watchFilterUserRequestSaga() {
  yield debounce(100, "*", function* (action: PayloadAction<IRegistrUser>) {
    const isValid = filterBodyUserRequest({
      type: bodyUserRequest.type,
      payload: action.payload,
    });
    if (isValid) {
      yield handleUserRequestSaga(action);
    }
  });
}

function* hendleUserRequest(action: PayloadAction<IRegistrUser>): Generator {
  try {
    const fetchUser = async (data: IRegistrUser) => {
      try {
        const result = await createUser(data);
        return result;
      } catch (error) {
        return error;
      }
    };
    // const retryCount = 3;
    const retryDelay = 1 * 1000;
    const data = yield retry(3, retryDelay, fetchUser, action.payload);

    yield put(getUserSuccess(data as IUser));
    return;
  } catch (e) {
    yield put(getUserFailure({ error: e as string }));
    return;
  }
}

function* watchSearchUsersSaga() {
  yield takeLatest(getUserRequest.type, hendleUserRequest);
}

export { watchFilterUserRequestSaga, watchSearchUsersSaga };
