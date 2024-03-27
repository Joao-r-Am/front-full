import styled from 'styled-components';

export const MovieContainer = styled.div`
  margin-top: 15px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }
`;
export const MovieBackdrop = styled.div`
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;
