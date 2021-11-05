import React from 'react';
import styled from 'styled-components';
import * as utils from '../utils/methods';

const WeatherItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid #cccccc;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  &:active {
    opacity: 0.5;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-weight: bold;
  }
  .id {
    font-size: 0.75rem;
  }
`;

const IconBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const WeatherItem = ({ city, onSelectCity }) => {
  const name = city.name;
  const { id, tempMin, tempMax } = city.weather;
  const onClick = () => {
    onSelectCity(city);
  };

  return (
    <WeatherItemBlock onClick={onClick}>
      <InfoBlock>
        <div className="name">{name}</div>
        <div className="temp">
          {tempMin} / {tempMax} ℃
        </div>
        <div className="id">{id && utils.toDescription(id)}</div>
      </InfoBlock>
      <IconBlock>{utils.toIcon(id)}</IconBlock>
    </WeatherItemBlock>
  );
};

export default WeatherItem;
