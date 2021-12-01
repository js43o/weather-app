import React, { useCallback } from 'react';
import { City } from 'modules/weather';
import * as utils from 'utils/methods';
import { useSelector } from 'react-redux';
import { RootState } from 'modules';
import useCityActions from './useCityActions';

const useDragItem = () => {
  const cities = useSelector((state: RootState) => state.weather.cities);
  const { onSelectCity, onInsertCity } = useCityActions();

  const onPointerDown = useCallback(
    (e_down: React.PointerEvent<HTMLDivElement>, city: City) => {
      // onHold event
      const timerId = setTimeout(() => {
        const target = e_down.target as HTMLDivElement;
        const item = target.closest('.block') as HTMLLIElement;

        const shiftY = e_down.clientY - item.getBoundingClientRect().top;
        const width = item.getBoundingClientRect().width;
        const height = item.getBoundingClientRect().height + 8;
        let y = e_down.clientY - shiftY - 8;

        item.classList.add('grabbed');
        item.style.position = 'fixed';
        item.style.top = `${y}px`;
        item.style.width = `${width}px`;

        document.onpointermove = (e_move) => {
          y = e_move.clientY - shiftY - 8;
          item.style.top = `${y}px`;
        };

        document.onpointerup = () => {
          const index = utils.cutRange(
            Math.floor(y / height),
            0,
            cities.length - 1,
          );

          if (index !== cities.indexOf(city)) onInsertCity(city, index);

          item.classList.remove('grabbed');
          item.style.position = '';
          item.style.top = '';
          item.style.width = '';

          document.onpointermove = null;
          document.onpointerup = null;
        };
      }, 500);
      // onClick event
      document.onpointerup = () => {
        clearTimeout(timerId);
        onSelectCity(city);
        document.onpointerup = null;
      };
    },
    [cities, onSelectCity, onInsertCity],
  );

  return onPointerDown;
};

export default useDragItem;
