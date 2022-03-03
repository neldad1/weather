import React, { useEffect, useState } from 'react';
import { Div } from './About.styled';
import Weather from './Weather';

const COUNTRY_CODE = 'AU';
const MEL_LAT = -37.814;
const MEL_LON = 144.9633;
const URL = '//api.openweathermap.org/data/2.5/weather?';
const IPAPI_URL = 'http://ip-api.com/json';

const About = () => {
  const [position, setPosition] = useState({ lat: MEL_LAT, lon: MEL_LON });
  const [weatherData, setWeatherData] = useState();
  const [zipCode, setZipCode] = useState();
  const [countryCode, setCountryCode] = useState(COUNTRY_CODE);

  const sendAPIRequest = (pos) => {
    const apiKey = process.env.REACT_APP_OWMAP_API_KEY;
    const url = `${URL}${pos}&units=metric&appid=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  };

  const success = (pos) => {
    setPosition({ lat: pos.lat, lon: pos.long });
    sendAPIRequest(`lat=${position.lat}&lon=${position.lon}`);
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    sendAPIRequest(`lat=${position.lat}&lon=${position.lon}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    fetch(IPAPI_URL)
      .then((response) => response.json())
      .then((data) => {
        setCountryCode(data.countryCode);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (zipCode && zipCode.length >= 4 && zipCode.length <= 10) {
      sendAPIRequest(`zip=${zipCode},${countryCode}`);
    } else {
      sendAPIRequest(`lat=${MEL_LAT}&lon=${MEL_LON}`);
      setZipCode('');
    }
  };

  const placeholder = `Enter ${countryCode} zip code`;

  return (
    <Div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder={placeholder}
          type="number"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <input type="submit" value="Get the forecast!" />
      </form>
      <Weather currentData={weatherData} />
    </Div>
  );
};

export default About;
