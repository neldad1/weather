import React, { useEffect, useState } from 'react';
import { Div } from './WeatherApp.styled';
import LocationForm from './components/LocationForm';
import Weather from './components/weather/Weather';
import WeatherAppLoader from './components/WeatherAppLoader';

const URL =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=';
const IPAPI_URL = 'https://ipinfo.io?token=';
const RESPONSE_OK = 200;
const COUNTRY_CODE_SZ = 2;
const MIN_ZIPLENGTH = 4;
const MAX_ZIPLENGTH = 10;

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState();
  const [geoPositionDone, setGeoPositionDone] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState();
  const [defaultLocation, setDefaultLocation] = useState({
    zip: '',
    country: '',
  });

  const sendAPIRequest = async (posOrZip) => {
    const apiKey = process.env.REACT_APP_OWMAP_API_KEY;
    const url = `${URL}${apiKey}&${posOrZip}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === RESPONSE_OK) {
          setWeatherData(data);
        } else {
          setZipCode('');
        }
      })
      .catch((err) => {
        throw new Error(`${err.cod} Message: ${err.message}`);
      });
  };

  const getIPAPI = () => {
    const token = process.env.REACT_APP_IPINFO_TOKEN;
    fetch(`${IPAPI_URL}${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.country.length === COUNTRY_CODE_SZ) {
          setDefaultLocation({ zip: data.postal, country: data.country });
          setCountryCode(data.country);
        }
      });
  };

  const getWeatherByZip = (zip, country) => {
    if (zip.length === 0) return;
    sendAPIRequest(`zip=${zip},${country}`);
  };

  const geoLocSuccess = (pos) => {
    sendAPIRequest(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
    setGeoPositionDone(true);
    getIPAPI();
  };

  const geoLocError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    setGeoPositionDone(true);
    getIPAPI();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoLocSuccess, geoLocError);
  }, []);

  useEffect(() => {
    if (weatherData && geoPositionDone) {
      return;
    }
    getWeatherByZip(defaultLocation.zip, defaultLocation.country);
  }, [defaultLocation]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (zipCode.length >= MIN_ZIPLENGTH && zipCode.length <= MAX_ZIPLENGTH) {
      getWeatherByZip(zipCode, countryCode);
    } else {
      setZipCode('');
    }
  };

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
