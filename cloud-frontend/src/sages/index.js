import { takeLatest, put, spawn, debounce, retry } from "redux-saga/effects";
import {
  searchUsersRequest,
  searchUsersSuccess,
  searchUsersFailure,
  bodyRequest,
} from "../slices/requestsSlice";
import { jsonFetch } from "../API/jsonFetch";

function filterBodyRequest({ type, payload }) {
  if (typeof payload === "string") {
    return type === bodyRequest.type && payload.trim() !== "";
  } else {
    return type === bodyRequest.type && payload.options.body.trim() !== "";
  }
}

function* handleBodyRequestSaga(action) {
  yield put(searchUsersRequest(action.payload));
}

function* watchBodyRequestSaga() {
  yield debounce(100, filterBodyRequest, handleBodyRequestSaga);
}

function* hendleSearchUsersRequest(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1 * 1000;
    const data = yield retry(retryCount, retryDelay, jsonFetch, action.payload);
    yield put(searchUsersSuccess(data));
  } catch (e) {
    yield put(searchUsersFailure(e.message));
  }
}

function* watchSearchUsersSaga() {
  yield takeLatest(searchUsersRequest.type, hendleSearchUsersRequest);
}

export default function* saga() {
  yield spawn(watchBodyRequestSaga);
  yield spawn(watchSearchUsersSaga);
}
