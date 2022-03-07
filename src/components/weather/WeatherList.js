import React from 'react';
import Weather from './Weather';
const WeatherList = ({ listData, removeWeather }) => {
  return (
    <>
      {listData.map(
        (weather) =>
          weather && (
            <Weather
              key={weather.zip}
              currentData={weather}
              showClose={true}
              removeData={removeWeather}
            />
          )
      )}
    </>
  );
};

export default WeatherList;
