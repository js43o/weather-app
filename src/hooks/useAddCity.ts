import { RootState } from 'modules';
import { WeatherAction, addCity } from 'modules/weather';
import { useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import * as utils from '../utils/methods';
import useLoadWeatherData from './useLoadWeatherData';

export default function useAddcity() {
  const cities = useSelector((state: RootState) => state.weather.cities);
  const loadWeatherData = useLoadWeatherData();

  const onAddCity =
    (str: string): ThunkAction<void, RootState, null, WeatherAction> =>
    async (dispatch) => {
      const name = utils.toCasing(str);
      if (!name || cities.find((city) => city.name === name)) return;

      const { data, error } = await loadWeatherData(name);
      if (!data || error) return;

      dispatch(
        addCity({
          name,
          weather: data.weather,
          forecast: data.forecast,
          marked: false,
          recentUpdate: Date.now(),
        }),
      );
    };

  return onAddCity;
}
