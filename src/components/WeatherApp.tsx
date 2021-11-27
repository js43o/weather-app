import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules';
import WeatherMain from './main/WeatherMain';
import WeatherSide from './side/WeatherSide';
import { setCities } from 'modules/weather';

const WeatherAppBlock = styled.div`
  display: flex;
  height: 100%;
  padding: 1rem;
`;

const WeatherApp = () => {
  const cities = useSelector((state: RootState) => state.weather.cities);
  const dispatch = useDispatch();

  useEffect(() => {
    const json = localStorage.getItem('marked_cities');
    if (!json) return;

    const cities = JSON.parse(json);
    dispatch(setCities(cities));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'marked_cities',
      JSON.stringify(cities.filter((city) => city.marked)),
    );
  }, [cities]);

  return (
    <WeatherAppBlock>
      <WeatherMain />
      <WeatherSide />
    </WeatherAppBlock>
  );
};

export default WeatherApp;
