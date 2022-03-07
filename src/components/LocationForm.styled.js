import styled from 'styled-components';

const LocMainForm = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.25em 2em 1em 2em;
`;

const LocationSpan = styled.span`
  font-size: 1em;
`;

const LocationInput = styled.input`
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

export { LocMainForm, LocationSpan, LocationInput };
