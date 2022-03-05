import React from 'react';
import { Span } from './Weather.styled';

const DateTime = ({ timestamp }) => {
  const date = new Date(timestamp * 1000).toUTCString();
  const day = date.slice(0, 3);
  const hr = date.slice(17, 19);
  const hour = hr < 12 ? hr : hr - 12;
  const minute = date.slice(20, 22);
  const amPm = hour < 12 ? 'AM' : 'PM';

  return (
    <Span>
      {day}, {hour}:{minute} {amPm}
    </Span>
  );
};

export default DateTime;
