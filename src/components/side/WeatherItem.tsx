import React from 'react';
import styled from 'styled-components';
import palette from '../../utils/palette';
import flex from '../../utils/styles';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import * as utils from '../../utils/methods';
import { City } from '../../modules/weather';

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
  onSelectCity: (city: City) => void;
  onRemoveCity: (city: City) => void;
  onToggleMarkCity: (city: City) => void;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>, city: City) => void;
};

const WeatherItem = ({
  city,
  isSelected,
  onRemoveCity,
  onToggleMarkCity,
  onPointerDown,
}: WeatherItemProps) => {
  const {
    name,
    weather: {
      id,
      temp: { min, max },
    },
  } = city;

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
