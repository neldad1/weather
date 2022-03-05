import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.25em 3em;
`;

const Span = styled.span`
  font-size: 1em;
`;

const ZipInput = styled.input`
  background-color: transparent;
  border: 1px solid grey;
  border-radius: 0.25em;
  outline: none;
  font-size: 1em;
  height: 2em;
  width: 150px;
  width: 130px;
  padding-left: 1em;
`;

export { Form, Span, ZipInput };
