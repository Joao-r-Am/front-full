import styled from 'styled-components';
import {
  primaryDarkColor,
  primaryColor,
  errorColor,
  successColor,
  secondaryColor,
} from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
  }

  .add__to__array {
    margin-bottom: 5px;
    margin-top: -10px;
    align-items: end;
    width: 120px;
    background-color: ${secondaryColor};
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 15px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 10%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
