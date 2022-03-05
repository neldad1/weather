import React, { useEffect, useState } from 'react';
import { Div } from './WeatherApp.styled';
import LocationForm from './components/LocationForm';
import Weather from './components/weather/Weather';
import WeatherAppLoader from './components/WeatherAppLoader';
import './WeatherApp.css';
import WeatherList from './components/weather/WeatherList';

const URL =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=';
const IPAPI_URL = 'https://ipinfo.io?token=';
const RESPONSE_OK = 200;
const COUNTRY_CODE_SZ = 2;
const MIN_ZIPLENGTH = 4;
const MAX_ZIPLENGTH = 10;

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    name: '',
    temp: 0,
    min: 0,
    max: 0,
    icon: '',
    description: '',
    date: '',
    timezone: '',
  });
  const [weatherList, setWeatherList] = useState([]);
  const [geoPositionDone, setGeoPositionDone] = useState('fail');
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState();
  const [defaultLocation, setDefaultLocation] = useState({
    zip: '',
    country: '',
  });

  const getWeatherByZip = (zip, country) => {
    if (zip.length === 0) return;
    sendAPIRequest(`zip=${zip},${country}`);
  };

  const sendAPIRequest = async (posOrZip) => {
    const apiKey = process.env.REACT_APP_OWMAP_API_KEY;
    const url = `${URL}${apiKey}&${posOrZip}`;

    console.log('Fetching weather data...', url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === RESPONSE_OK) {
          const weather = {
            name: data.name,
            temp: data.main.temp,
            min: data.main.temp_min,
            max: data.main.temp_max,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            date: data.dt,
            timezone: data.timezone,
          };
          if (weatherData.name.length === 0) setWeatherData(weather);
          const tempList = [...weatherList];
          if (
            weatherList &&
            weatherList.findIndex((w) => w.name === weather.name) < 0
          ) {
            console.log('Push: ', weather);
            tempList.push(weather);
            setWeatherList(tempList);
          }
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

  const geoLocSuccess = (pos) => {
    sendAPIRequest(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
    setGeoPositionDone(RESPONSE_OK);
    getIPAPI();
  };

  const geoLocError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    getIPAPI();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoLocSuccess, geoLocError);
  }, []);

  useEffect(() => {
    if (geoPositionDone === RESPONSE_OK) return;
    getWeatherByZip(defaultLocation.zip, defaultLocation.country);
  }, [defaultLocation]);

  const addWeather = (event) => {
    event.preventDefault();
    if (zipCode.length >= MIN_ZIPLENGTH && zipCode.length <= MAX_ZIPLENGTH) {
      getWeatherByZip(zipCode, countryCode);
    } else {
      setZipCode('');
    }
  };

  const removeWeather = (data) => {
    const tempList = weatherList.filter((weather) => weather !== data);
    setWeatherList(tempList);
  };

  if (weatherData.name.length === 0) {
    return (
      <Div>
        <WeatherAppLoader />
      </Div>
    );
  }

  console.log('Render: ', weatherList);
  const listData = weatherList.map((w, i) => {
    if (i > 0)
      return (
        <Weather
          key={i}
          currentData={w}
          showClose={true}
          removeData={removeWeather}
        />
      );
  });

  return (
    <Div>
      <LocationForm
        zipCode={zipCode}
        countryCode={countryCode}
        setZipCode={setZipCode}
        onSubmit={addWeather}
      />
      {weatherData && <Weather currentData={weatherData} showClose={false} />}
      {weatherList && weatherList.length > 1 && listData}
    </Div>
  );
};

export default WeatherApp;
