import styled, { createGlobalStyle } from 'styled-components';
import {
  primaryDarkColor,
  primaryColor,
  errorColor,
  successColor,
} from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

// opções gerais de componentes
export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0%;
    outline: none;
    box-sizing: border-box;
  }

  body{
    font-family: "Comic Sans MS", "Comic Sans", cursive;
    background-color: ${primaryDarkColor};
    color: ${primaryDarkColor};;
  }

  html, body, #root{
    height: 100%;
  }

  button{
    cursor: pointer;
    background: ${primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 300ms;
  }

  button:hover{
    filter: brightness(85%);
  }

  a{
    text-decoration: none;
    /* background-color: ${primaryColor}; */
  }

  ul{
    list-style: armenian;
  }

body .Toastify .Toastify__toast-container .Toastify__toast--success {
  background-color: ${successColor};
  color: #fff;
}

body .Toastify .Toastify__toast-container .Toastify__toast--error {
  background-color: ${errorColor};
  color: #fff;
}
`;

// componente main de todo o app
export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
