import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      console.log('suseso :))))))');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
      break;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('ocorreu um erro :((((((((');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('fazendo a requisição');
      return state;
    }

    default:
      return state;
      break;
  }
}
