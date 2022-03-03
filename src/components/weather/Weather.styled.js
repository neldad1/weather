import styled from 'styled-components';

const MainDiv = styled.div`
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: left;
  color: white;
  padding: 1em;
  margin: 1em auto;
`;

const H1 = styled.h1`
  font-size: 2.5em;
`;

const H2 = styled.h2`
  font-size: 1em;
`;

const ColFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LocationDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const P = styled.div`
  font-size: 1em;
`;

const Icon = styled.img`
  width: 6em;
  height: 6em;
`;

export { MainDiv, H1, H2, LocationDiv, ColFlexDiv, FlexDiv, P, Icon };
