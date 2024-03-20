import type { ForkEffect } from "redux-saga/effects";
import { spawn } from "redux-saga/effects";
import { watchFilterUserRequestSaga, watchSearchUsersSaga } from "./userSaga";

export default function* rootSaga(): Generator<ForkEffect> {
  yield spawn(watchFilterUserRequestSaga);
  yield spawn(watchSearchUsersSaga);
}
