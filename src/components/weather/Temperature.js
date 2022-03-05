import React from 'react';
import { ColFlexDiv, H1, Span } from './Weather.styled';

const Temperature = ({ temp, min, max }) => {
  return (
    <ColFlexDiv>
      <H1>{Math.round(temp)}&#176;</H1>
      <Span>
        L:{Math.round(min)}&#176; H:{Math.round(max)}&#176;
      </Span>
    </ColFlexDiv>
  );
};

export default Temperature;
