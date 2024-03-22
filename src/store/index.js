import { createStore } from 'redux';

const initialState = {
  botaoClicado: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOTAO_CLICADO':
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
      break;

    default:
      return state;
      break;
  }
};

const store = createStore(reducer);

export default store;
