import { all, fork } from "redux-saga/effects";
import { watchExist, watchJoin, watchLogin, watchModify } from "./userSaga";

// rootSaga를 만들어줘서 store에 추가해주어야 합니다.
export default function* rootSaga() {
  yield all([fork(watchLogin),fork(watchJoin),fork(watchExist),fork(watchModify)]);
}