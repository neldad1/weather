import React from 'react';
import { Span } from './Weather.styled';

const DateTime = ({ timestamp }) => {
  const date = new Date(timestamp * 1000).toUTCString();
  const day = date.slice(0, 3);
  const hr = date.slice(17, 19);
  const hour = hr < 12 ? hr : hr - 12;
  const minute = date.slice(20, 22);
  const amPm = hour < 12 ? 'AM' : 'PM';

  const options = {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  };
  const date1 = new Intl.DateTimeFormat('en-US', options).format(
    timestamp * 1000
  );

  console.log(date1);

  return (
    <Span>
      {day}, {hour}:{minute} {amPm}
    </Span>
  );
};

export default DateTime;
