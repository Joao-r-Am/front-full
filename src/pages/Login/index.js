import React from 'react';
import { Title, Paragraph } from './styled';
import { Container } from '../../styles/GlobalStyles';
import { useDispatch } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch({
      type: 'BOTAO_CLICADO',
    });
  }

  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <Paragraph>Lorem ipsim sexum</Paragraph>
      <a href="www.pudim.com.br">PUDIM!!!!</a>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
