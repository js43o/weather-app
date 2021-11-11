import React, { useState, useCallback } from 'react';
import WeatherInput from './WeatherInput';
import WeatherItem from './WeatherItem';
import styled from 'styled-components';
import { MdOutlineSearch } from 'react-icons/md';
import Button from '../../utils/button';
import palette from '../../utils/palette';
import flex from '../../utils/styles';

const WeatherSideBlock = styled.div`
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

const WeatherSide = ({
  loading,
  currentCity,
  cities,
  onAddCity,
  onSelectCity,
  onRemoveCity,
  onBookmarkCity,
}) => {
  const [open, setOpen] = useState(false);

  const onToggleOpen = useCallback(() => setOpen(!open), [open]);

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
        {cities.length ? (
          <WeatherList>
            {cities.map((city) => (
              <WeatherItem
                key={city.name}
                city={city}
                isSelected={currentCity.name === city.name}
                onSelectCity={onSelectCity}
                onRemoveCity={onRemoveCity}
                onBookmarkCity={onBookmarkCity}
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
