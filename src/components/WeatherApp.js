import React, { useReducer } from 'react';
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

  const onAddCity = async (str) => {
    const cityName = utils.toCasing(str);
    dispatch({ type: 'LOADING' });
    if (state.cities.find((city) => city.name === cityName)) return; // 이미 해당 도시가 존재함
    const { responseCurrent } = await getWeatherAPI(cityName);
    if (!responseCurrent) return; // 불러오기 실패

    console.log(responseCurrent);

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
  };

  const onSelectCity = (city) => {
    dispatch({
      type: 'SELECT_CITY',
      city,
    });
  };

  const onRemoveCity = (city) => {
    dispatch({
      type: 'REMOVE_CITY',
      city,
    });
  };

  return (
    <WeatherAppBlock>
      <WeatherMain city={state.currentCity} />
      <WeatherSide
        cities={state.cities}
        onAddCity={onAddCity}
        onSelectCity={onSelectCity}
        onRemoveCity={onRemoveCity}
      />
    </WeatherAppBlock>
  );
};

export default WeatherApp;
