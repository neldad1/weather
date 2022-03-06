import React from 'react';
import { ColFlexDiv, H1, Span } from './Weather.styled';

const Temperature = ({ tempData }) => {
  const { temp, temp_min, temp_max } = tempData;
  return (
    <ColFlexDiv>
      <H1>{Math.round(temp)}&#176;</H1>
      <Span>
        L:{Math.round(temp_min)}&#176; H:{Math.round(temp_max)}&#176;
      </Span>
    </ColFlexDiv>
  );
};

export default Temperature;
