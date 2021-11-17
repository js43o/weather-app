import React, { useState, useCallback, useRef } from 'react';
import WeatherInput from './WeatherInput';
import WeatherItem from './WeatherItem';
import styled from 'styled-components';
import { MdOutlineSearch } from 'react-icons/md';
import Button from '../../lib/Button';
import palette from '../../utils/palette';
import flex from '../../utils/styles';
import * as utils from '../../utils/methods';
import { City } from '../../modules/weather';

const WeatherSideBlock = styled.div<{ opened: boolean }>`
  ${flex('column', 'auto', 'auto')}
  flex-grow: 1;
  width: 30%;
  padding-left: 1rem;
  background: white;
  transition: right 0.25s;
  @media (max-width: 768px) {
    position: fixed;
    right: ${(props) => (props.opened ? '0rem' : '-16rem')};
    min-width: 16rem;
    max-width: 100%;
    height: calc(100% - 2rem);
    padding-right: 1rem;
    border-left: 1px solid ${palette.grey[400]};
  }
`;

const WeatherList = styled.div`
  ${flex('column', 'auto', 'auto')}
  height: 100%;
  overflow: hidden scroll;
`;

const NoCities = styled.div`
  ${flex('row')}
  height: 100%;
`;

const SearchBlock = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  border-left: 1px solid ${palette.grey[400]};
  border-bottom: 1px solid ${palette.grey[400]};
  border-radius: 0 0 0 0.5rem;
  visibility: hidden;
  @media (max-width: 768px) {
    visibility: visible;
  }
  &:active {
    color: ${palette.grey[400]};
  }
`;

type WeatherSideProps = {
  loading: boolean;
  currentCity: City | null;
  cities: City[];
  onAddCity: (str: string) => Promise<void>;
  onSelectCity: (city: City) => void;
  onRemoveCity: (city: City) => void;
  onInsertCity: (city: City, toIndex: number) => void;
  onToggleMarkCity: (city: City) => void;
};

const WeatherSide = ({
  loading,
  currentCity,
  cities,
  onAddCity,
  onSelectCity,
  onRemoveCity,
  onInsertCity,
  onToggleMarkCity,
}: WeatherSideProps) => {
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);

  const onToggleOpen = useCallback(() => setOpen(!open), [open]);

  const onPointerDown = (
    e_down: React.PointerEvent<HTMLDivElement>,
    city: City,
  ) => {
    // onHold event
    // eslint-disable-next-line
    let timerId = setTimeout(() => {
      const target = e_down.target as HTMLDivElement;
      const item = target.closest('.block');
      if (!(item instanceof HTMLLIElement)) return;

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
  };

  return (
    <>
      <SearchBlock onClick={onToggleOpen}>
        <MdOutlineSearch />
      </SearchBlock>
      <WeatherSideBlock opened={open}>
        <WeatherInput
          loading={loading}
          onAddCity={onAddCity}
          onToggleOpen={onToggleOpen}
        />
        {cities ? (
          <WeatherList ref={listRef}>
            {cities.map((city) => (
              <WeatherItem
                key={city.name}
                city={city}
                isSelected={
                  currentCity ? currentCity.name === city.name : false
                }
                onSelectCity={onSelectCity}
                onRemoveCity={onRemoveCity}
                onToggleMarkCity={onToggleMarkCity}
                onPointerDown={onPointerDown}
              />
            ))}
          </WeatherList>
        ) : (
          <NoCities>No cities added.</NoCities>
        )}
      </WeatherSideBlock>
    </>
  );
};

export default React.memo(WeatherSide);
