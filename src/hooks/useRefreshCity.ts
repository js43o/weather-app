import { City, setCity, WeatherAction } from 'modules/weather';
import useLoadWeatherData from './useLoadWeatherData';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'modules';

export default function useRefreshCity() {
  const loadWeatherData = useLoadWeatherData();

  const onRefreshCity =
    (city: City): ThunkAction<void, RootState, null, WeatherAction> =>
    async (dispatch) => {
      const { data, error } = await loadWeatherData(city.name);
      if (!data || error) return;

      dispatch(
        setCity({
          ...city,
          weather: data.weather,
          forecast: data.forecast,
          recentUpdate: Date.now(),
        }),
      );
    };

  return onRefreshCity;
}
