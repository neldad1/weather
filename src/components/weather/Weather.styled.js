import styled from 'styled-components';

const WeatherDiv = styled.div`
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  padding: 0.5em;
  margin: 0 1em 0.25em 1em;
  position: relative;
  border-radius: 0.2em;
  color: white;
`;

const WeatherH1 = styled.h1`
  font-size: 1.5em;
  margin: 0;
  color: inherit;
`;

const WeatherH2 = styled.h2`
  font-size: 1.25em;
  margin: 0 0.25em;
  color: inherit;
`;

const ColFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const LocationDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherSpan = styled.span`
  font-size: ${(props) => props.fontSz ?? '0.8em'};
  flex: 1;
  text-align: left;
`;

const WeatherImg = styled.img`
  width: 2em;
  height: 2em;
`;

export {
  WeatherDiv,
  WeatherH1,
  WeatherH2,
  LocationDiv,
  ColFlexDiv,
  FlexDiv,
  WeatherImg,
  WeatherSpan,
};
