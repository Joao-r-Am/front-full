import React from 'react';
import { Title, Paragraph } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Login() {
  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <Paragraph>Lorem ipsim sexum</Paragraph>
      <a href="www.pudim.com.br">PUDIM!!!!</a>
      <button type="button">Enviar</button>
    </Container>
  );
}
