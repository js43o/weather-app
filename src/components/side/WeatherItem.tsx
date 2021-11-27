import React, { useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../utils/palette';
import flex from '../../utils/styles';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import * as utils from '../../utils/methods';
import type { City } from '../../modules/weather';
import { RootState } from 'modules';
import useCityActions from 'hooks/useCityActions';
import { useSelector } from 'react-redux';

const WeatherItemBlock = styled.li<{ isSelected: boolean }>`
  ${flex('row', 'space-between')}
  flex-shrink: 0;
  border: 1px solid
    ${(props) => (props.isSelected ? palette.bluegrey[200] : palette.grey[200])};
  border-radius: 0.25rem;
  margin-top: 8px;
  margin-right: 1rem;
  min-width: 12rem;
  background: white;
  overflow: hidden;
  cursor: pointer;
  touch-action: none;
  transform: none;
  transition: transform 0.25s;
  &.grabbed {
    transform: scale(1.05);
  }
`;

const ContentsBlock = styled.div`
  ${flex('row', 'space-between')}
  flex-grow: 1;
  padding: 0.5rem;
  &:hover {
    opacity: 0.75;
  }
  &:active {
    opacity: 0.5;
  }
`;

const InfoBlock = styled.div`
  ${flex('column', 'auto', 'auto')}
  .name {
    font-weight: bold;
  }
  .id {
    font-size: 0.75rem;
  }
`;

const IconBlock = styled.div`
  ${flex()}
  font-size: 2rem;
`;

const ConfigBlock = styled.div`
  ${flex('column')}
  height: 100%;
  background: ${palette.grey[200]};
`;

const BookmarkBlock = styled.div`
  ${flex()}
  flex-grow: 1;
  padding: 0.5rem;
  &:hover {
    background: ${palette.yellow[400]};
  }
  &:active {
    background: ${palette.yellow[600]};
  }
`;

const RemovalBlock = styled.div`
  ${flex()}
  flex-grow: 1;
  padding: 0.5rem;
  &:hover {
    background: ${palette.red[200]};
  }
  &:active {
    background: ${palette.red[400]};
  }
`;

type WeatherItemProps = {
  city: City;
  isSelected: boolean;
};

const WeatherItem = ({ city, isSelected }: WeatherItemProps) => {
  const { cities } = useSelector((state: RootState) => state.weather);
  const { onSelectCity, onInsertCity, onRemoveCity, onToggleMarkCity } =
    useCityActions();
  const {
    name,
    weather: {
      id,
      temp: { min, max },
    },
  } = city;

  const onPointerDown = useCallback(
    (e_down: React.PointerEvent<HTMLDivElement>, city: City) => {
      // onHold event
      // eslint-disable-next-line
      let timerId = setTimeout(() => {
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
    [cities, onInsertCity, onSelectCity],
  );

  return (
    <WeatherItemBlock className="block" isSelected={isSelected}>
      <ContentsBlock onPointerDown={(e) => onPointerDown(e, city)}>
        <InfoBlock>
          <div className="name">{name}</div>
          <div className="temp">
            {min} / {max} ℃
          </div>
          <div className="id">{id && utils.toDescription(id)}</div>
        </InfoBlock>
        <IconBlock>{utils.toIcon(id)}</IconBlock>
      </ContentsBlock>
      <ConfigBlock>
        <BookmarkBlock onClick={() => onToggleMarkCity(city)}>
          {city.marked ? <BsStarFill /> : <BsStar />}
        </BookmarkBlock>
        <RemovalBlock onClick={() => onRemoveCity(city)}>
          <FaTrashAlt />
        </RemovalBlock>
      </ConfigBlock>
    </WeatherItemBlock>
  );
};

export default React.memo(WeatherItem);
