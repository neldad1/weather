import React from 'react';
import Location from './Location';
import Temperature from './Temperature';
import { MainDiv, ColFlexDiv, FlexDiv, P, Icon } from './Weather.styled';

const Weather = ({ currentData }) => {
  if (!currentData || !currentData.main) {
    return <>No Data</>;
  }

  const { temp, temp_min, temp_max } = currentData.main;
  const { description, icon } = currentData.weather[0];

  const weatherDesc = description
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const imageUrl =
    icon.slice(-1) === 'n'
      ? 'weather/kai-pilger-Ef6iL87-vOA-unsplash.jpg'
      : 'weather/sam-marchand-XeqY9vC-APs-unsplash.jpg';

  return (
    <MainDiv imageUrl={imageUrl}>
      <Location name={currentData.name} />
      <FlexDiv>
        <Temperature temp={temp} min={temp_min} max={temp_max} />
        <ColFlexDiv>
          <Icon src={iconUrl} alt="weatherIcon" />
          <P>{weatherDesc}</P>
        </ColFlexDiv>
      </FlexDiv>
    </MainDiv>
  );
};

export default Weather;
