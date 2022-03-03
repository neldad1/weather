import React from 'react';
import { ColFlexDiv, H1, P } from './Weather.styled';

const Temperature = ({ temp, min, max }) => {
  return (
    <ColFlexDiv>
      <H1>{Math.round(temp)}&#176;</H1>
      <P>
        L:{Math.round(min)}&#176; H:{Math.round(max)}&#176;
      </P>
    </ColFlexDiv>
  );
};

export default Temperature;
