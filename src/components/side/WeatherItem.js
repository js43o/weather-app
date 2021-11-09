import React from 'react';
import styled from 'styled-components';
import * as utils from '../../utils/methods';
import palette from '../../utils/palette';
import flex from './../../utils/styles';

const WeatherItemBlock = styled.li`
  ${flex('row', 'space-between')}
  padding: 0.5rem;
  border: 1px solid
    ${(props) => (props.isSelected ? palette.bluegrey[300] : palette.grey[200])};
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  margin-right: 1rem;
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

const WeatherItem = ({ city, isSelected, onSelectCity, onRemoveCity }) => {
  const name = city.name;
  const { id, tempMin, tempMax } = city.weather;

  const onClick = () => {
    onSelectCity(city);
  };

  const onPointerDown = () => {
    const timerId = setTimeout(() => {
      // eslint-disable-next-line
      const isRemove = confirm('삭제하시겠습니까?');
      if (isRemove) onRemoveCity(city);
    }, 500);
    document.onpointerup = () => {
      clearTimeout(timerId);
    };
  };

  return (
    <WeatherItemBlock
      isSelected={isSelected}
      onClick={onClick}
      onPointerDown={onPointerDown}
    >
      <InfoBlock>
        <div className="name">{name}</div>
        <div className="temp">
          {tempMin} / {tempMax} ℃
        </div>
        <div className="id">{id && utils.toDescription(id)}</div>
      </InfoBlock>
      <IconBlock>{utils.toIcon(id)}</IconBlock>
    </WeatherItemBlock>
  );
};

export default React.memo(WeatherItem);
