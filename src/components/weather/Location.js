import React from 'react';
import { LocationDiv, WeatherH2 } from './Weather.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Location = ({ name }) => {
  return (
    <LocationDiv>
      <FontAwesomeIcon icon={faLocationDot} />
      <WeatherH2>{name}</WeatherH2>
    </LocationDiv>
  );
};

export default Location;
