import React from 'react';
import { ColFlexDiv, WeatherH1, WeatherSpan } from './Weather.styled';

const Temperature = ({ tempData }) => {
  const { temp, temp_min, temp_max } = tempData;

  return (
    <ColFlexDiv>
      <WeatherH1>{Math.round(temp)}&#176;</WeatherH1>
      <WeatherSpan>
        L:{Math.round(temp_min)}&#176; H:{Math.round(temp_max)}&#176;
      </WeatherSpan>
    </ColFlexDiv>
  );
};

export default Temperature;
