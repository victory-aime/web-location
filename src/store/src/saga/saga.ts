import { all, fork } from "redux-saga/effects";
import { productSagas } from "../modules/products/saga";
import { userSaga } from "../modules/users/saga";

type SagaFunction = () => Generator;

function* rootSagaWithErrorHandling(saga: SagaFunction): Generator {
  try {
    yield saga();
  } catch (error) {
    console.error("Saga error:", error);
  }
}

export default function* rootSaga() {
  yield all([fork(rootSagaWithErrorHandling, productSagas)]);
  yield all([fork(rootSagaWithErrorHandling, userSaga)]);
}
