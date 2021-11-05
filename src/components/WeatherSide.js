import React from 'react';
import styled from 'styled-components';
import WeatherInput from './WeatherInput';
import WeatherItem from './WeatherItem';

const WeatherSideBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  margin-left: 1rem;
`;

const WeatherList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden scroll;
`;

const NoCities = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const WeatherSide = ({ cities, onAddCity, onSelectCity, onRemoveCity }) => {
  return (
    <WeatherSideBlock>
      <WeatherInput onAddCity={onAddCity} />
      {cities.length ? (
        <WeatherList>
          {cities.map((city) => (
            <WeatherItem
              key={city.name}
              city={city}
              onSelectCity={onSelectCity}
              onRemoveCity={onRemoveCity}
            />
          ))}
        </WeatherList>
      ) : (
        <NoCities>No cities added.</NoCities>
      )}
    </WeatherSideBlock>
  );
};

export default WeatherSide;
