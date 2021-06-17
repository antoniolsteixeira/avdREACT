import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  flex-direction: column;
`;

export const Form = styled.form`
  width: 500px;
  margin: 30px auto 0;

  display: flex;
  flex-direction: column;

  input {
    border: 2px solid;
    margin-top: 2px;

    ::placeholder {
      color: #dc143c;
    }

    padding: 5px;
  }

  button {
    margin: 0 auto;
    margin-top: 10px;
    background-color: #dc143c;

    border-radius: 5px;

    border: 2px solid;

    width: 100px;
  }
`;

export const Cadastro = styled.div`
  margin: 0 auto;
  width: 500px;

  ul li {
    padding: 20px;
    display: flex;
    flex-direction: column;

    border: 2px solid black;

    background-color: #f8f8ff;

    color: #dc143c;

    margin-top: 10px;
  }

  input {
    width: 320px;
  }

  a {
    background: #dc143c;
    text-decoration: none;
    margin-top: 7px;

    width: 60px;
    padding: 5px;

    a:hover {
      background-color: #dc143c;
    }
  }

  div {
    display: flex;
    flex-direction: row;

    h1 {
      margin-left: 3px;
    }

    button {
      margin-top: -50px;
      margin-left: 350px;

      font-size: 13px;

      background-color: #dc143c;
      border-radius: 5px;
      border: 2px solid;
      width: 50px;

      & + button {
        margin-left: 10px;
      }
    }
  }
`;
