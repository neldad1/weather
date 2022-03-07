import React from 'react';
import { WeatherSpan } from './Weather.styled';

const DateTime = ({ timestamp }) => {
  const options = {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  };
  const date = new Intl.DateTimeFormat('en-US', options).format(
    timestamp * 1000
  );

  return <WeatherSpan>{date}</WeatherSpan>;
};

export default DateTime;
