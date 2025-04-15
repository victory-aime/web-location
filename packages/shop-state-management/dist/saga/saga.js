import { all, fork } from 'redux-saga/effects'
import { productSagas } from '../modules/products/saga'
function* rootSagaWithErrorHandling(saga) {
  try {
    yield saga()
  } catch (error) {
    console.error('Saga error:', error)
  }
}
export default function* rootSaga() {
  yield all([fork(rootSagaWithErrorHandling, productSagas)])
}
//# sourceMappingURL=saga.js.map
