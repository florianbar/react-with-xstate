import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
`;

export const Button = styled.button`
  background-color: blue;
  color: #fff;
  border: none;
  padding: 0.5rem 0.75rem;

  :hover {
    cursor: pointer;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
`;
