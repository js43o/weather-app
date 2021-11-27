import {
  CurrentWeather,
  error,
  ForecastWeather,
  loading,
} from 'modules/weather';
import {
  CurrentWeatherData,
  ForecastWeatherDataItem,
  getAllWeather,
} from 'api';
import * as utils from 'utils/methods';
import { useDispatch } from 'react-redux';

export default function useLoadWeatherData() {
  const dispatch = useDispatch();

  const loadWeatherData = async (name: string) => {
    dispatch(loading());

    const {
      resultCurrent: { data: currentData, error: currentError },
      resultForecast: { data: forecastData, error: forecastError },
    } = await getAllWeather(name);

    if (!currentData || !forecastData) {
      dispatch(error({ currentError, forecastError }));
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
      (item): ForecastWeather => ({
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
  };

  return loadWeatherData;
}
