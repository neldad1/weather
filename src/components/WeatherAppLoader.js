import React from 'react';
import ContentLoader from 'react-content-loader';

const WeatherAppLoader = ({ ...rest }) => (
  <ContentLoader height="250" width="350" viewBox="0 0 265 230" {...rest}>
    <rect x="15" y="15" rx="2" ry="2" width="350" height="25" />
    <rect x="15" y="50" rx="1" ry="1" width="350" height="150" />
  </ContentLoader>
);

export default WeatherAppLoader;
