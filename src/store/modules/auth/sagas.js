import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as action from './actions';
import * as type from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';
import { get } from 'lodash';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/auth/login', payload);
    yield put(action.loginSucesso({ ...response.data }));
    toast.success('Login realizado com sucesso!');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push(payload.prevPath);
  } catch (err) {
    toast.error('Usuário ou senha inválidos');
    yield put(action.loginFailure());
  }
}

function* persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(type.LOGIN_REQUEST, loginRequest),
  takeLatest(type.PERSIST_REHYDRATE, persistRehydrate),
]);
