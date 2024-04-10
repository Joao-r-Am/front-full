import React, { useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const userId = useSelector((state) => state.auth.user.id);
  const userLogin = useSelector((state) => state.auth.user.login);
  const isLoading = useSelector((state) => state.auth.user.isLoading);
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!userId) return;

    setLogin(userLogin);
  }, [userId, userLogin]);

  async function handleSubmit(event) {
    event.preventDefault();
    let formsErrors = false;

    if (!userId && (password.length < 6 || password.length > 255)) {
      formsErrors = true;
      toast.error('A senha deve ter entre 6 a 255 caracteres');
    }

    if (isEmail(login)) {
      formsErrors = true;
      toast.error('Email inválido');
    }

    if (formsErrors) return;

    dispatch(actions.registerRequest({ login, password, userId }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{userId ? 'Edite seus dados' : 'Crie sua Conta'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
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

        <button type="submit">{userId ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}
