import React, { useCallback, useEffect, useReducer } from 'react';
import WeatherMain from './main/WeatherMain';
import WeatherSide from './side/WeatherSide';
import {
  CurrentWeatherData,
  ForecastWeatherDataItem,
  getAllWeather,
} from '../modules/api';
import reducer, {
  City,
  initialState,
  CurrentWeather,
  ForecastWeather,
} from '../modules/weather';
import styled from 'styled-components';
import * as utils from '../utils/methods';

const WeatherAppBlock = styled.div`
  display: flex;
  height: 100%;
  padding: 1rem;
`;

const WeatherApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadWeatherData = useCallback(async (name: string) => {
    dispatch({ type: 'LOADING' });

    const {
      resultCurrent: { data: currentData, error: currentError },
      resultForecast: { data: forecastData, error: forecastError },
    } = await getAllWeather(name);

    if (!currentData || !forecastData) {
      dispatch({ type: 'ERROR', error: { currentError, forecastError } });
      alert('No search results.');
      return {
        data: null,
        error: { currentError, forecastError },
      };
    }

    const current = currentData as CurrentWeatherData;
    const weather: CurrentWeather = {
      id: current.weather[0].id,
      temp: {
        current: utils.kelToCel(current.main.temp),
        min: utils.kelToCel(current.main.temp_min),
        max: utils.kelToCel(current.main.temp_max),
      },
      humidity: current.main.humidity,
      wind: {
        speed: current.wind.speed,
        deg: current.wind.deg,
      },
      pressure: current.main.pressure,
    };

    const forecast: ForecastWeather[] = (
      forecastData as { list: ForecastWeatherDataItem[] }
    ).list.map(
      (item: ForecastWeatherDataItem): ForecastWeather => ({
        dt_txt: item.dt_txt,
        dt: utils.dtTxtToDateAndTime(item.dt_txt),
        id: item.weather[0].id,
        temp: {
          current: item.main.temp,
        },
        humidity: item.main.humidity,
        wind: {
          speed: item.wind.speed,
          deg: item.wind.deg,
        },
      }),
    );

    return {
      data: {
        weather,
        forecast,
      },
      error: null,
    };
  }, []);

  const onAddCity = useCallback(
    async (str: string) => {
      const name = utils.toCasing(str);
      if (!name || state.cities.find((city) => city.name === name)) return;

      const { data, error } = await loadWeatherData(name);
      if (!data || error) return;

      dispatch({
        type: 'ADD_CITY',
        city: {
          name,
          weather: data.weather,
          forecast: data.forecast,
          marked: false,
          recentUpdate: Date.now(),
        },
      });
    },
    [state.cities, loadWeatherData],
  );

  const onRefreshCity = useCallback(
    async (city: City) => {
      const { data, error } = await loadWeatherData(city.name);
      if (!data || error) return;

      dispatch({
        type: 'SET_CITY',
        city: {
          ...city,
          weather: data.weather,
          forecast: data.forecast,
          recentUpdate: Date.now(),
        },
      });
    },
    [loadWeatherData],
  );

  const onSelectCity = useCallback((city: City) => {
    dispatch({
      type: 'SELECT_CITY',
      city,
    });
  }, []);

  const onRemoveCity = useCallback(
    (city: City) => {
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

  const onInsertCity = useCallback(
    (city: City, toIndex: number) => {
      let cities = state.cities.filter((item) => item.name !== city.name);
      cities = [...cities.slice(0, toIndex), city, ...cities.slice(toIndex)];
      dispatch({ type: 'SET_CITIES', cities });
    },
    [state.cities],
  );

  const onToggleMarkCity = useCallback((city: City) => {
    dispatch({
      type: 'TOGGLE_MARK',
      city,
      marked: !city.marked,
    });
  }, []);

  useEffect(() => {
    const json = localStorage.getItem('marked_cities');
    if (!json) return;

    const cities = JSON.parse(json);
    dispatch({ type: 'SET_CITIES', cities });
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'marked_cities',
      JSON.stringify(state.cities.filter((city) => city.marked)),
    );
  }, [state.cities]);

  return (
    <WeatherAppBlock>
      <WeatherMain
        loading={state.loading}
        city={state.currentCity}
        onRefreshCity={onRefreshCity}
      />
      <WeatherSide
        loading={state.loading}
        cities={state.cities}
        currentCity={state.currentCity}
        onAddCity={onAddCity}
        onSelectCity={onSelectCity}
        onRemoveCity={onRemoveCity}
        onToggleMarkCity={onToggleMarkCity}
        onInsertCity={onInsertCity}
      />
    </WeatherAppBlock>
  );
};

export default WeatherApp;
