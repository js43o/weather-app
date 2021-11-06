import React, { useCallback, useReducer } from 'react';
import styled from 'styled-components';
import getWeatherAPI from '../modules/api';
import reducer, { initialState } from './../modules/weather';
import WeatherMain from './WeatherMain';
import WeatherSide from './WeatherSide';
import * as utils from '../utils/methods';

const WeatherAppBlock = styled.div`
  display: flex;
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
      const { responseCurrent, error } = await getWeatherAPI(cityName);

      if (!responseCurrent && error) {
        dispatch({ type: 'ERROR', error });
        return;
      }

      dispatch({
        type: 'ADD_CITY',
        city: {
          name: cityName,
          weather: {
            id: responseCurrent.weather[0].id,
            tempCurrent: utils.kelToCel(responseCurrent.main.temp),
            tempMin: utils.kelToCel(responseCurrent.main.temp_min),
            tempMax: utils.kelToCel(responseCurrent.main.temp_max),
            humidity: responseCurrent.main.humidity,
            pressure: responseCurrent.main.pressure,
            windSpeed: responseCurrent.wind.speed,
            windDeg: responseCurrent.wind.deg,
          },
        },
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
