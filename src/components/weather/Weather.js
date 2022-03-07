import React from 'react';
import Location from './Location';
import Temperature from './Temperature';
import { WeatherDiv, ColFlexDiv, FlexDiv } from './Weather.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DateTime from './DateTime';
import Description from './Description';

const Weather = ({ currentData, showClose, removeData }) => {
  const { name, main, weather, dt, timezone } = currentData.data;

  const weatherDesc = weather[0].description
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  const icon = weather[0].icon;
  const imageUrl = icon.includes('n')
    ? 'weather/kai-pilger-Ef6iL87-vOA-unsplash.jpg'
    : 'weather/sam-marchand-XeqY9vC-APs-unsplash.jpg';

  const timestamp = dt + timezone;

  return (
    <WeatherDiv imageUrl={imageUrl}>
      {showClose && (
        <FontAwesomeIcon
          icon={faXmark}
          size="xs"
          className="close"
          onClick={() => removeData(currentData)}
        />
      )}
      <Location name={name} />
      <FlexDiv>
        <ColFlexDiv>
          <Description weatherDesc={weatherDesc} weatherIcon={icon} />
          <DateTime timestamp={timestamp} />
        </ColFlexDiv>
        <Temperature tempData={main} />
      </FlexDiv>
    </WeatherDiv>
  );
};

export default Weather;
