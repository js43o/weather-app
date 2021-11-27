import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  City,
  removeCity,
  selectCity,
  setCities,
  toggleMark,
} from 'modules/weather';
import { RootState } from 'modules';

export default function useCityActions() {
  const { cities, currentCity } = useSelector(
    (state: RootState) => state.weather,
  );
  const dispatch = useDispatch();

  const onSelectCity = useCallback(
    (city: City) => {
      if (currentCity === city) return;
      dispatch(selectCity(city));
    },
    [currentCity],
  );

  const onRemoveCity = useCallback(
    (city: City) => {
      const index = Math.max(cities.indexOf(city), 0);
      const adjacentCity = cities[index + 1]
        ? cities[index + 1]
        : index - 1 >= 0 && cities[index - 1]
        ? cities[index - 1]
        : null;

      dispatch(removeCity(city, adjacentCity));
    },
    [cities],
  );

  const onInsertCity = useCallback(
    (city: City, toIndex: number) => {
      let modified = cities.filter((item) => item.name !== city.name);
      modified = [
        ...modified.slice(0, toIndex),
        city,
        ...modified.slice(toIndex),
      ];
      dispatch(setCities(modified));
    },
    [cities],
  );

  const onToggleMarkCity = useCallback((city: City) => {
    dispatch(toggleMark(city, !city.marked));
  }, []);

  return { onSelectCity, onRemoveCity, onInsertCity, onToggleMarkCity };
}
