import React, { useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    let formsErrors = false;

    if (password.length < 6 || password.length > 255) {
      formsErrors = true;
      toast.error('A senha deve ter entre 6 a 255 caracteres');
    }

    if (!isEmail(login)) {
      formsErrors = true;
      toast.error('Email inválido');
    }

    if (formsErrors) return;

    try {
      await axios.post('/auth/register', { login, password });
      toast.success('Cadastro realizado com sucesso!');
      history.push('/');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    }
  }

  return (
    <Container>
      <h1>Crie sua Conta</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Seu Email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">Criar conta</button>
      </Form>
    </Container>
  );
}
