import styled from 'styled-components';
import * as colors from '../../config/colors';
export const Title = styled.h1`
  text-align: center;
`;

export const SecondTitle = styled.h2`
  text-align: center;
  margin-top: 5px;
`;

export const Form = styled.form`
  input {
    margin: 20px;
  }

  img {
    width: 180px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dashed ${colors.secondaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 10%;
  }

  textarea {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    resize: vertical;
    min-height: 150px;
    width: 100%;
  }

  textarea:focus {
    border-color: #007bff;
    outline: none;
  }

  /* Estilo para placeholder (texto temporário) */
  textarea::placeholder {
    color: #999; /* Cor do texto temporário */
  }

  button {
    display: flex;
    margin-left: 330px;
  }
`;

export const ReviewsList = styled.ul`
  li {
    list-style-type: none;
  }

  .user {
    margin: 5px;
  }
`;
