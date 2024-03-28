import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import * as action from '../../store/modules/auth/actions';
import { get } from 'lodash';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    let formsErrors = false;

    if (password.length < 6 || password.length > 255) {
      formsErrors = true;
      toast.error('Senha inválida');
    }

    if (isEmail(login)) {
      formsErrors = true;
      toast.error('Email inválido');
    }

    if (formsErrors) return;

    dispatch(action.loginRequest({ login, password, prevPath }));
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Login"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
