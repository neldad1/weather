import React, { useEffect, useState } from 'react';
import { Div } from './WeatherApp.styled';
import LocationForm from './components/LocationForm';
import Weather from './components/weather/Weather';
import WeatherAppLoader from './components/WeatherAppLoader';

const DEFAULT_COUNTRY_CODE = 'AU';
const URL =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=';
const IPAPI_URL = 'http://ip-api.com/json';
const RESPONSE_OK = 200;
const SUCCESS = 'success';
const MIN_ZIPLENGTH = 4;
const MAX_ZIPLENGTH = 10;

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState();
  // const [weatherList, setWeatherList] = useEffect([]);
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const sendAPIRequest = async (posOrZip) => {
    console.log(posOrZip);
    const apiKey = process.env.REACT_APP_OWMAP_API_KEY;
    const url = `${URL}${apiKey}&${posOrZip}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === RESPONSE_OK) {
          setWeatherData(data);
        } else {
          console.log('Reset input');
          setZipCode('');
        }
      })
      .catch((err) => {
        throw new Error(`${err.cod} Message: ${err.message}`);
      });
  };

  const getIPAPI = () => {
    fetch(IPAPI_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === SUCCESS) {
          setZipCode(data.zip);
          setCountryCode(data.countryCode);
        }
      });
  };

  const getWeatherByZip = () => {
    sendAPIRequest(`zip=${zipCode},${countryCode}`);
  };

  const geoLocSuccess = (pos) => {
    console.log(pos);
    sendAPIRequest(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
    getIPAPI();
  };

  const geoLocError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    getIPAPI();
  };

  useEffect(() => {
    getIPAPI();
    navigator.geolocation.getCurrentPosition(geoLocSuccess, geoLocError);
    console.log(`UseEffect`);
  }, []);

  useEffect(() => {
    getWeatherByZip();
  }, [countryCode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (zipCode.length >= MIN_ZIPLENGTH && zipCode.length <= MAX_ZIPLENGTH) {
      sendAPIRequest(`zip=${zipCode},${countryCode}`);
    } else {
      setZipCode('');
    }
  };
  console.log('Rendering');

  if (!weatherData) {
    return (
      <Div>
        <WeatherAppLoader />
      </Div>
    );
  }

  return (
    <Div>
      <LocationForm
        zipCode={zipCode}
        countryCode={countryCode}
        setZipCode={setZipCode}
        onSubmit={handleSubmit}
      />
      {weatherData && weatherData.main && <Weather currentData={weatherData} />}
    </Div>
  );
};

export default WeatherApp;
