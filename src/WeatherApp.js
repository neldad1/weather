import React, { useEffect, useState } from 'react';
import { Div } from './WeatherApp.styled';
import LocationForm from './components/LocationForm';
import Weather from './components/weather/Weather';
import WeatherAppLoader from './components/WeatherAppLoader';
import './WeatherApp.css';
import WeatherList from './components/weather/WeatherList';
import { message } from 'antd';
import 'antd/dist/antd.min.css';

const URL =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=';
const IPAPI_URL = 'https://ipinfo.io?token=';
const RESPONSE_OK = 200;
const RESPONSE_NOT_FOUND = 404;
const RESPONSE_NG = 'NG';
const COUNTRY_CODE_SZ = 2;
const MIN_ZIPLENGTH = 4;
const MAX_ZIPLENGTH = 10;

const errorZipCodeInput = (isValid) => {
  if (isValid) message.error('The zip code is not found in your country.');
  else message.error('The zip code is not valid.');
};

const networkRequest = async (query) => {
  const resp = await fetch(
    `${URL}${process.env.REACT_APP_OWMAP_API_KEY}&${query}`
  );
  const data = await resp.json();

  if (parseInt(data.cod) === RESPONSE_NOT_FOUND) errorZipCodeInput(true);

  return data.cod === RESPONSE_OK ? data : undefined;
};

const WeatherApp = () => {
  const [localWeather, setLocalWeather] = useState();
  const [weatherList, setWeatherList] = useState([]);
  const [geoPosition, setGeoPosition] = useState();
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState();
  const [defaultLocation, setDefaultLocation] = useState();

  const getWeatherByZip = async (
    zip,
    country = countryCode,
    isDefLoc = false
  ) => {
    const jsonResponse = await networkRequest(`zip=${zip},${country}`);
    if (jsonResponse) {
      if (isDefLoc) {
        setLocalWeather({ zip: zip, data: jsonResponse });
      } else {
        updateWeatherInList({ zip: zip, data: jsonResponse });
      }
    }
    setZipCode('');
  };

  const getWeatherByPosition = async (query) => {
    const jsonResponse = await networkRequest(query);
    if (jsonResponse) {
      setLocalWeather({ zip: '', data: jsonResponse });
    }
  };

  const getIPAPI = () => {
    const token = process.env.REACT_APP_IPINFO_TOKEN;
    fetch(`${IPAPI_URL}${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.country.length === COUNTRY_CODE_SZ) {
          setCountryCode(data.country);
          if (geoPosition === RESPONSE_NG) {
            setDefaultLocation({ zip: data.postal, country: data.country });
          }
        }
      });
  };

  const geoLocSuccess = (pos) => {
    const localPos = `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
    getWeatherByPosition(localPos);
    setGeoPosition(localPos);
  };

  const geoLocError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    setGeoPosition(RESPONSE_NG);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoLocSuccess, geoLocError);
  }, []);

  useEffect(() => {
    if (!Boolean(defaultLocation) || geoPosition !== RESPONSE_NG) return;

    getWeatherByZip(defaultLocation.zip, defaultLocation.country, true);
  }, [defaultLocation]);

  useEffect(() => {
    if (geoPosition) getIPAPI();
  }, [geoPosition]);

  const getIndexOfWeather = (zip) => {
    let index = getAllWeatherData().findIndex((w) => w.zip === zip);
    return index;
  };

  const addWeather = (event) => {
    event.preventDefault();
    if (zipCode.length >= MIN_ZIPLENGTH && zipCode.length <= MAX_ZIPLENGTH) {
      getWeatherByZip(zipCode);
    } else {
      errorZipCodeInput(false);
      setZipCode('');
    }
  };

  const removeWeather = (data) => {
    const tempList = weatherList.filter((weather) => weather !== data);
    setWeatherList(tempList);
  };

  const refreshAllWeather = () => {
    if (!defaultLocation) getWeatherByPosition(geoPosition);
    else getWeatherByZip(defaultLocation.zip, defaultLocation.country, true);

    weatherList.map((weather) => getWeatherByZip(weather.zip));
  };

  const updateWeatherInList = (weather) => {
    const tempList = [...weatherList];
    const weatherIndex = getIndexOfWeather(weather.zip);

    if (weatherIndex === -1) tempList.push(weather);
    else tempList[weatherIndex] = weather;

    setWeatherList(tempList);
  };

  const getAllWeatherData = () => [...weatherList, localWeather];

  if (!Boolean(localWeather)) {
    return <WeatherAppLoader />;
  }

  return (
    <Div>
      <LocationForm
        zipCode={zipCode}
        countryCode={countryCode}
        setZipCode={setZipCode}
        onSubmit={addWeather}
        onRefresh={refreshAllWeather}
      />
      {localWeather && (
        <Weather
          key={localWeather.zip}
          currentData={localWeather}
          showClose={false}
        />
      )}
      {weatherList && (
        <WeatherList listData={weatherList} removeWeather={removeWeather} />
      )}
    </Div>
  );
};

export default WeatherApp;
