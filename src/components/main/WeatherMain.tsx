import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherMainForecast from './WeatherCarousel';
import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading } from 'react-icons/ai';
import { ImArrowUp } from 'react-icons/im';
import { MdRefresh } from 'react-icons/md';
import * as utils from '../../utils/methods';
import palette from '../../utils/palette';
import flex from '../../utils/styles';
import { RootState } from 'modules';
import useRefreshCity from 'hooks/useRefreshCity';

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
  width: 90%;
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
  @media (max-width: 430px) {
    font-size: 0.75rem;
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

const WeatherMain = () => {
  const loading = useSelector((state: RootState) => state.weather.loading);
  const currentCity = useSelector(
    (state: RootState) => state.weather.currentCity,
  );
  const dispatch = useDispatch();
  const onRefreshCity = useRefreshCity();

  if (loading)
    return (
      <WeatherMainBlock>
        <LoadingIndicator />
        Loading...
      </WeatherMainBlock>
    );

  if (!currentCity)
    return <WeatherMainBlock>Select the city.</WeatherMainBlock>;

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
  } = currentCity;

  return (
    <WeatherMainBlock color={utils.toColor(id)}>
      <MainInfoBlock>
        <div className="recent">
          {utils.secToText(recentUpdate)}
          <RefreshButton onClick={() => dispatch(onRefreshCity(currentCity))} />
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
      <WeatherMainForecast />
    </WeatherMainBlock>
  );
};

export default React.memo(WeatherMain);
