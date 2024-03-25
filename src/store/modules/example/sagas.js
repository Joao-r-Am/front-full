import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as action from './actions';
import * as type from '../types';

const requisicao = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 2000);
  });

function* exampleRequest() {
  try {
    yield call(requisicao);
    yield put(action.clicaBotaoSucesso());
  } catch (err) {
    toast.error('Erro :((((');
    yield put(action.clicaBotaoFailure());
  }
}

export default all([takeLatest(type.BOTAO_CLICADO_REQUEST, exampleRequest)]);
