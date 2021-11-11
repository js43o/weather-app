import React from 'react';
import styled from 'styled-components';
import * as utils from '../../utils/methods';
import palette from '../../utils/palette';
import flex from './../../utils/styles';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

const WeatherItemBlock = styled.li`
  ${flex('row', 'space-between')}
  border: 1px solid
    ${(props) =>
    props.isSelected ? palette.bluegrey[300] : palette.grey[200]};
  border-radius: 0.25rem;
  margin-top: 0.5rem;
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

const WeatherItem = ({
  city,
  isSelected,
  isMarked,
  onSelectCity,
  onRemoveCity,
  onBookmarkCity,
}) => {
  const {
    name,
    weather: {
      id,
      temp: { min, max },
    },
  } = city;

  return (
    <WeatherItemBlock isSelected={isSelected}>
      <ContentsBlock onClick={() => onSelectCity(city)}>
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
        <BookmarkBlock onClick={() => onBookmarkCity(city)}>
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
