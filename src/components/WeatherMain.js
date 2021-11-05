import React from 'react';
import styled from 'styled-components';
import * as utils from '../utils/methods';

const WeatherMainBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 480px;
  flex-grow: 2;
  border: 1px solid #cccccc;
  border-radius: 0.25rem;
  font-size: 2rem;
  .city {
    font-weight: bold;
  }
  .icon {
    font-size: 5rem;
  }
  .description {
  }
  .temp {
  }
`;

const WeatherMain = ({ city }) => {
  return city ? (
    <WeatherMainBlock>
      <div className="city">{city.name}</div>
      <div className="icon">{utils.toIcon(city.weather.id)}</div>
      <div className="description">{utils.toDescription(city.weather.id)}</div>
      <div className="temp">{city.weather.tempCurrent} ℃</div>
    </WeatherMainBlock>
  ) : (
    <WeatherMainBlock>Select the city.</WeatherMainBlock>
  );
};

export default WeatherMain;
