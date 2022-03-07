import React from 'react';
import { Span } from './Weather.styled';

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

  return <Span>{date}</Span>;
};

export default DateTime;
