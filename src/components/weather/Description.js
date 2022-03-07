import React from 'react';
import { FlexDiv, WeatherImg, WeatherSpan } from './Weather.styled';

const Description = ({ weatherDesc, weatherIcon }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  return (
    <FlexDiv>
      <WeatherImg src={iconUrl} alt="weatherIcon" />
      <WeatherSpan fontSz="1em">{weatherDesc}</WeatherSpan>
    </FlexDiv>
  );
};

export default Description;
