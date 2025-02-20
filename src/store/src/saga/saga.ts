import { all, fork } from "redux-saga/effects";
import { authSagas } from "_/store/src/modules/auth/saga";
import { productSagas } from "../modules/products/saga";

type SagaFunction = () => Generator;

function* rootSagaWithErrorHandling(saga: SagaFunction): Generator {
  try {
    yield saga();
  } catch (error) {
    console.error("Saga error:", error);
  }
}

export default function* rootSaga() {
  yield all([
    fork(rootSagaWithErrorHandling, authSagas),
    fork(rootSagaWithErrorHandling, productSagas),
  ]);
}
