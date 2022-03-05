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
  const [currLocWeather, setCurrLocWeather] = useState();
  const [weatherList, setWeatherList] = useState([]);
  const [geoPositionDone, setGeoPositionDone] = useState('fail');
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState();
  const [defaultLocation, setDefaultLocation] = useState();

  const getWeatherByZip = (zip, country) => {
    if (zip.length === 0) return;
    sendAPIRequest(`zip=${zip},${country}`, zip);
  };

  const sendAPIRequest = async (posOrZip, zip = zipCode) => {
    const apiKey = process.env.REACT_APP_OWMAP_API_KEY;
    const url = `${URL}${apiKey}&${posOrZip}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === RESPONSE_OK) {
          const weather = {
            zip,
            name: data.name,
            temp: data.main.temp,
            min: data.main.temp_min,
            max: data.main.temp_max,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            date: data.dt,
            timezone: data.timezone,
          };
          console.log(weather);
          if (zip === defaultLocation.zip) {
            setCurrLocWeather(weather);
            setZipCode('');
            return;
          }
          const tempList = [...weatherList];
          const index = getAllWeatherData().findIndex(
            (w) => w.zip === weather.zip
          );
          console.log(`${index}: ${weather.zip}`);
          if (index < 0) {
            console.log('PUSH', weather);
            tempList.push(weather);
            setWeatherList(tempList);
          } else {
            tempList[index] = weather;
            setWeatherList(tempList);
          }
        }
        setZipCode('');
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
          setCountryCode(data.country);
          setZipCode(data.postal);
          setDefaultLocation({ zip: data.postal, country: data.country });
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
    if (!Boolean(defaultLocation) || geoPositionDone === RESPONSE_OK) return;
    console.log(defaultLocation);
    getWeatherByZip(defaultLocation.zip, defaultLocation.country);
  }, [defaultLocation]);

  const addWeather = (event) => {
    event.preventDefault();
    if (zipCode.length >= MIN_ZIPLENGTH && zipCode.length <= MAX_ZIPLENGTH) {
      const weatherIndex = getAllWeatherData().findIndex(
        (w) => w.zip === zipCode
      );
      console.log(weatherIndex);
      if (weatherIndex < 0) getWeatherByZip(zipCode, countryCode);
    } else {
      setZipCode('');
    }
  };

  const removeWeather = (data) => {
    const tempList = weatherList.filter((weather) => weather !== data);
    setWeatherList(tempList);
  };

  const refreshWeather = () => {
    getWeatherByZip(defaultLocation.zip, defaultLocation.country);
    weatherList.map((weather) => getWeatherByZip(weather.zip, countryCode));
  };

  const getAllWeatherData = () => [...weatherList, currLocWeather];

  if (!Boolean(currLocWeather)) {
    return (
      <Div>
        <WeatherAppLoader />
      </Div>
    );
  }

  console.log(weatherList);

  const listData = weatherList.map((w, i) => {
    return (
      <Weather
        key={w.zip}
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
        onRefresh={refreshWeather}
      />
      {currLocWeather && (
        <Weather
          key={currLocWeather.zip}
          currentData={currLocWeather}
          showClose={false}
        />
      )}
      {weatherList && listData}
    </Div>
  );
};

export default WeatherApp;
