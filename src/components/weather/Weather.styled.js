import styled from 'styled-components';

const MainDiv = styled.div`
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: space-between;
  color: white;
  padding: 0.5em;
  margin: 0.25em auto;
  align-items: center;
  position: relative;
  border-radius: 0.2em;
  color: white;
`;

const H1 = styled.h1`
  font-size: 1.8em;
  margin: 0;
  color: inherit;
`;

const H2 = styled.h2`
  font-size: 1em;
  margin: 0;
  color: inherit;
`;

const ColFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: inherit;
`;

const LocationDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const P = styled.div`
  font-size: 0.9em;
  flex: 1;
  text-align: left;
  word-break: break-word;
  max-width: 98%;
  color: inherit;
`;

const Span = styled.div`
  font-size: 0.75em;
  text-align: left;
  color: inherit;
`;

const Icon = styled.img`
  width: 2em;
  height: 2em;
`;

export { MainDiv, H1, H2, LocationDiv, ColFlexDiv, FlexDiv, P, Icon, Span };
