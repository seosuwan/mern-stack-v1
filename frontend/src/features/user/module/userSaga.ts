import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  LoginPayload,
  UserDataPayload,
  loginRequest,
  loginFailure,
  loginSuccess,
  JoinPayload,
  joinSuccess,
  joinFailure,
  joinRequest,
  ExistPayload,
  existSuccess,
  existFailure,
  existRequest,
  ModifyPayload,
  modifySuccess,
  modifyFailure,
} from "features/user/reducer/userSlice";
import { userAPI  } from "features/user";
import { func } from "prop-types";

function* exist(action: PayloadAction<ExistPayload>){
  try{
    const result : UserDataPayload = yield call(
      userAPI.existAPI,
      action.payload
    );
    yield put(existSuccess(result));
    alert("가능한 아이디입니다.")
  } catch (error: any){
    yield put(existFailure(error))
    alert("쓸수없는 아이디입니다.")
  }
}


function* join( action: PayloadAction<JoinPayload>){
  try{
    const result : UserDataPayload = yield call(
      userAPI.joinAPI,
      action.payload
    );
    yield put(joinSuccess(result));
    window.location.href = 'users/login'
  } catch (error: any){
    // alert("아이디오류")
    yield put(joinFailure(error));
  }
}
function* login(action: PayloadAction<LoginPayload>) {
  try {
    alert("보냈지롱")
    // fork는 비동기 call은 동기
    // fork를 쓰면 불러온것들을 result에 넣어줘야 하는데 바로 다음코드가 실행됨
    // 블로그에 있는 코드로는 yield 생성기 에러 자꾸남.... => const result = yield call(userAPI.join, action.payload);
    const result: UserDataPayload = yield call(
      userAPI.loginAPI,
      action.payload
      );
      alert("보냈지롱2")
    //요청 성공시
    yield put(loginSuccess(result));
    // alert(JSON.stringify(result.data.user.username))
    window.localStorage.setItem('sessionUser', JSON.stringify(result.data.user.username))
    window.location.href= "/home"
  } catch (error: any) {
    alert(JSON.stringify(action.payload))
    alert("아이디 혹은 비밀번호가 틀렸습니다!")
    yield put(loginFailure(error));
  }
}
function* modify (action:PayloadAction<ModifyPayload>){
  try{
    const result : UserDataPayload = yield call(
      userAPI.modifyAPI,
      action.payload
    );
    yield put(modifySuccess(result));
  } catch (error: any){
    // alert("아이디오류")
    yield put(modifyFailure(error));
  }
}

// Watch 함수
export function* watchLogin() {
  yield takeLatest(loginRequest.type, login);
  // loginRequest에서의 type이 실행되면 login함수가 실행되는데
  // loginRequest의 action이 있으면 그 액션이 login함수의 인자로 들어갑니다.
}
export function* watchJoin(){
  yield takeLatest(joinRequest.type, join);
}
export function* watchExist(){
  yield takeLatest(existRequest.type, exist);
}
export function* watchModify(){
  yield takeLatest(existRequest.type, modify);
}