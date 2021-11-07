import React, { useCallback, useReducer } from 'react';
import styled from 'styled-components';
import { getWeatherCurrent, getWeatherForecast } from '../modules/api';
import reducer, { initialState } from './../modules/weather';
import WeatherMain from './WeatherMain';
import WeatherSide from './WeatherSide';
import * as utils from '../utils/methods';

const WeatherAppBlock = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 1rem;
`;

const WeatherApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onAddCity = useCallback(
    async (str) => {
      const cityName = utils.toCasing(str);
      if (state.cities.find((city) => city.name === cityName)) return; // 이미 해당 도시가 존재함

      dispatch({ type: 'LOADING' });
      const { data: currentData, error: currentError } =
        await getWeatherCurrent(cityName);
      const { data: forecastData, error: forecastError } =
        await getWeatherForecast(cityName);

      if (!currentData && currentError) {
        dispatch({ type: 'ERROR', currentError });
        return;
      }

      if (!forecastData && forecastError) {
        dispatch({ type: 'ERROR', forecastError });
        return;
      }

      const forecast = forecastData.list.map((item) => ({
        dt_txt: item.dt_txt,
        date: utils.dtTxtToDateAndTime(item.dt_txt).date,
        time: utils.dtTxtToDateAndTime(item.dt_txt).time,
        id: item.weather[0].id,
        temp: item.main.temp,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        windDeg: item.wind.deg,
      }));

      const city = {
        name: cityName,
        weather: {
          id: currentData.weather[0].id,
          tempCurrent: utils.kelToCel(currentData.main.temp),
          tempMin: utils.kelToCel(currentData.main.temp_min),
          tempMax: utils.kelToCel(currentData.main.temp_max),
          humidity: currentData.main.humidity,
          pressure: currentData.main.pressure,
          windSpeed: currentData.wind.speed,
          windDeg: currentData.wind.deg,
        },
        forecast,
      };

      dispatch({
        type: 'ADD_CITY',
        city,
      });
    },
    [state.cities],
  );

  const onSelectCity = useCallback((city) => {
    dispatch({
      type: 'SELECT_CITY',
      city,
    });
  }, []);

  const onRemoveCity = useCallback(
    (city) => {
      const index = Math.max(state.cities.indexOf(city), 0);
      const adjacentCity = state.cities[index + 1]
        ? state.cities[index + 1]
        : index - 1 >= 0 && state.cities[index - 1]
        ? state.cities[index - 1]
        : null;
      dispatch({
        type: 'REMOVE_CITY',
        city,
        adjacentCity,
      });
    },
    [state.cities],
  );

  return (
    <WeatherAppBlock>
      <WeatherMain loading={state.loading} city={state.currentCity} />
      <WeatherSide
        cities={state.cities}
        currentCity={state.currentCity}
        onAddCity={onAddCity}
        onSelectCity={onSelectCity}
        onRemoveCity={onRemoveCity}
      />
    </WeatherAppBlock>
  );
};

export default WeatherApp;
