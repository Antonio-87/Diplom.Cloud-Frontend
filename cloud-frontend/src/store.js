import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import registrationReducer from "./slices/registrationSlice";
import requestsReducer from "./slices/requestsSlice";
import saga from "./sages/index";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    requests: requestsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(saga);
