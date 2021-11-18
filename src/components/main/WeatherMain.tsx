import * as React from 'react';
import WeatherMainForecast from './WeatherCarousel';
import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading } from 'react-icons/ai';
import { ImArrowUp } from 'react-icons/im';
import { MdRefresh } from 'react-icons/md';
import * as utils from '../../utils/methods';
import palette from '../../utils/palette';
import flex from '../../utils/styles';
import type { City } from '../../modules/weather';

const WeatherMainBlock = styled.div<{ color?: string }>`
  ${flex('column')};
  flex-grow: 2;
  width: 60%;
  position: relative;
  border: 1px solid ${palette.grey[400]};
  border-radius: 0.25rem;
  background: ${(props) => props.color};
  color: ${(props) => props.color && 'white'};
  font-size: 2rem;
  transition: background 0.5s;
  overflow-y: scroll;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MainInfoBlock = styled.div`
  ${flex('column')};
  margin-bottom: 1rem;
  .recent {
    ${flex()};
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .city {
    ${flex()}
    font-weight: bold;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-size: 5rem;
  }
  .temp {
  }
  .description {
    font-size: 1.5rem;
  }
`;

const SubInfoBlock = styled.div`
  ${flex('row')};
  width: 80%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.25);
`;

const SubInfoItemBlock = styled.div`
  ${flex('column')};
  flex-grow: 1;
  flex-basis: 1rem;
  align-items: center;
  padding: 0.5rem;
  font-size: 1rem;
  & + & {
    border-left: 1px solid ${palette.grey[100]};
  }
  div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const WindArrow = styled(ImArrowUp)<{ deg: number }>`
  margin-right: 0.25rem;
  transform: rotate(${(props) => props.deg + 180 + 'deg'});
`;

const rotateKeyframe = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled(AiOutlineLoading)`
  color: ${palette.lightblue[200]};
  font-size: 3rem;
  animation: ${rotateKeyframe} 0.5s infinite linear;
`;

const RefreshButton = styled(MdRefresh)`
  margin-left: 0.25rem;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.25s;
  &:hover {
    opacity: 0.75;
  }
  &:active {
    opacity: 0.5;
    transform: rotate(180deg);
  }
`;

type WeatherMainProps = {
  loading: boolean;
  city: City | null;
  onRefreshCity: (city: City) => void;
};

const WeatherMain = ({ loading, city, onRefreshCity }: WeatherMainProps) => {
  if (loading)
    return (
      <WeatherMainBlock>
        <LoadingIndicator />
        Loading...
      </WeatherMainBlock>
    );

  if (!city) return <WeatherMainBlock>Select the city.</WeatherMainBlock>;

  const onClick = () => {
    onRefreshCity(city);
  };

  const {
    name,
    weather: {
      id,
      temp: { current },
      humidity,
      wind: { speed, deg },
      pressure,
    },
    recentUpdate,
  } = city;

  return (
    <WeatherMainBlock color={utils.toColor(id)}>
      <MainInfoBlock>
        <div className="recent">
          {utils.secToText(recentUpdate)}
          <RefreshButton onClick={onClick} />
        </div>
        <div className="city">{name}</div>
        <div className="icon">{utils.toIcon(id)}</div>
        <div className="temp">{current} ℃</div>
        <div className="description kor">{utils.toDescription(id)}</div>
      </MainInfoBlock>
      <SubInfoBlock>
        <SubInfoItemBlock>
          <div className="kor">습도</div>
          <div>{humidity} %</div>
        </SubInfoItemBlock>
        <SubInfoItemBlock>
          <div className="kor">바람</div>
          <div>
            <WindArrow deg={deg} />
            {speed} m/s
          </div>
        </SubInfoItemBlock>
        <SubInfoItemBlock>
          <div className="kor">기압</div>
          <div>{pressure} hPa</div>
        </SubInfoItemBlock>
      </SubInfoBlock>
      <WeatherMainForecast city={city} />
    </WeatherMainBlock>
  );
};

export default React.memo(WeatherMain);
