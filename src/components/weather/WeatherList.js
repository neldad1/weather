import React, { useState } from 'react';
import Weather from './Weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const WeatherList = (listData) => {
  //const [weatherList, setWeatherList] = useState();
  console.log('rendering list', listData);
  return (
    <>
      {listData &&
        listData.map((data, index) => (
          <Weather key={index} currentData={data} />
        ))}
    </>
  );
};

export default WeatherList;
