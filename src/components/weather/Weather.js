import React from 'react';
import Location from './Location';
import Temperature from './Temperature';
import { MainDiv, ColFlexDiv, P, Icon, FlexDiv } from './Weather.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DateTime from './DateTime';

const Weather = ({ currentData, showClose, removeData }) => {
  const { name, main, weather, dt, timezone } = currentData.data;

  const weatherDesc = weather[0].description
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  const icon = weather[0].icon;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const imageUrl =
    icon.slice(-1) === 'n'
      ? 'weather/kai-pilger-Ef6iL87-vOA-unsplash.jpg'
      : 'weather/sam-marchand-XeqY9vC-APs-unsplash.jpg';

  const timestamp = dt + timezone;

  /* return (
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
  ); */
  return (
    <MainDiv imageUrl={imageUrl}>
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
          <FlexDiv>
            <Icon src={iconUrl} alt="weatherIcon" />
            <P>{weatherDesc}</P>
          </FlexDiv>
          <DateTime timestamp={timestamp} />
        </ColFlexDiv>
        <Temperature tempData={main} />
      </FlexDiv>
    </MainDiv>
  );
};

export default Weather;
