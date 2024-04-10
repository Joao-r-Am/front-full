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

function* registerRequest({ payload }) {
  const { userId, login, password } = payload;
  try {
    if (userId) {
      yield call(axios.put, `/user/${userId}`, {
        login,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso');
      yield put(action.registerUpdatedSuccess({ login, password }));
    } else {
      yield call(axios.post, `/auth/register`, {
        login,
        password: password || undefined,
      });
      toast.success('Conta criada com sucesso');
      yield put(action.registerCreatedSuccess({ login, password }));
      history.push('/login');
    }
  } catch (err) {
    console.log(err.response);
    const errors = get(err, 'response.data.error', []);
    const status = get(err, 'response.status', 0);

    if (status === 401) {
      toast.warning('Você precisa fazer login novamente');
      yield put(action.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(action.registerFailure());
  }
}

export default all([
  takeLatest(type.LOGIN_REQUEST, loginRequest),
  takeLatest(type.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(type.REGISTER_REQUEST, registerRequest),
]);
