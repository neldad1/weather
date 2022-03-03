import React from 'react';
import { LocationDiv, P, H2 } from './Weather.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Location = ({ name }) => {
  return (
    <LocationDiv>
      <FontAwesomeIcon icon={faLocationDot} />
      <P>&nbsp;</P>
      <H2>{name}</H2>
    </LocationDiv>
  );
};

export default Location;
