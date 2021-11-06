import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as utils from '../utils/methods';
import palette from './../utils/palette';
import { AiOutlineLoading } from 'react-icons/ai';

const WeatherMainBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 480px;
  flex-grow: 2;
  border: 1px solid ${palette.grey[500]};
  border-radius: 0.25rem;
  background: ${(props) => props.color};
  color: ${(props) => props.color && 'white'};
  font-size: 2rem;
  transition: background 0.5s;
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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled(AiOutlineLoading)`
  font-size: 3rem;
  animation: ${rotate} 0.5s infinite linear;
`;

const WeatherMain = ({ loading, city }) => {
  if (!city) return <WeatherMainBlock>Select the city.</WeatherMainBlock>;

  if (loading)
    return (
      <WeatherMainBlock color={utils.toColor(city.weather.id)}>
        <LoadingIndicator />
        Loading...
      </WeatherMainBlock>
    );

  return (
    <WeatherMainBlock color={utils.toColor(city.weather.id)}>
      <div className="city">{city.name}</div>
      <div className="icon">{utils.toIcon(city.weather.id)}</div>
      <div className="description">{utils.toDescription(city.weather.id)}</div>
      <div className="description">{city.weather.tempCurrent}℃</div>
    </WeatherMainBlock>
  );
};

export default React.memo(WeatherMain);
