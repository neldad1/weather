import React from 'react';
import ContentLoader from 'react-content-loader';
import { Div } from '../WeatherApp.styled';

const WeatherAppLoader = () => {
  return (
    <Div>
      <ContentLoader height="250" width="350" viewBox="0 0 265 230">
        <rect x="15" y="15" rx="2" ry="2" width="350" height="25" />
        <rect x="15" y="50" rx="1" ry="1" width="350" height="90" />
      </ContentLoader>
    </Div>
  );
};

export default WeatherAppLoader;
