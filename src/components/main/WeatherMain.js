import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as utils from '../../utils/methods';
import palette from '../../utils/palette';
import { AiOutlineLoading } from 'react-icons/ai';
import { ImArrowUp } from 'react-icons/im';
import WeatherMainForecast from './WeatherCarousel';
import flex from '../../utils/styles';

const WeatherMainBlock = styled.div`
  ${flex('column')};
  flex-grow: 2;
  width: 65%;
  position: relative;
  border: 1px solid ${palette.grey[400]};
  border-radius: 0.25rem;
  background: ${(props) => props.color};
  color: ${(props) => props.color && 'white'};
  font-size: 2rem;
  transition: background 0.5s;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MainInfoBlock = styled.div`
  ${flex('column')};
  margin-bottom: 1rem;
  .city {
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

const rotateKeyframe = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const WindArrow = styled(ImArrowUp)`
  margin-right: 0.25rem;
  transform: rotate(${(props) => props.deg + 'deg'});
`;

const LoadingIndicator = styled(AiOutlineLoading)`
  color: ${palette.lightblue[200]};
  font-size: 3rem;
  animation: ${rotateKeyframe} 0.5s infinite linear;
`;

const WeatherMain = ({ loading, city }) => {
  if (loading)
    return (
      <WeatherMainBlock>
        <LoadingIndicator />
        Loading...
      </WeatherMainBlock>
    );

  if (!city) return <WeatherMainBlock>Select the city.</WeatherMainBlock>;

  return (
    <WeatherMainBlock color={utils.toColor(city.weather.id)}>
      <MainInfoBlock>
        <div className="city">{city.name}</div>
        <div className="icon">{utils.toIcon(city.weather.id)}</div>
        <div className="temp">{city.weather.tempCurrent} ℃</div>
        <div className="description kor">
          {utils.toDescription(city.weather.id)}
        </div>
      </MainInfoBlock>
      <SubInfoBlock>
        <SubInfoItemBlock>
          <div className="kor">습도</div>
          <div>{city.weather.humidity} %</div>
        </SubInfoItemBlock>
        <SubInfoItemBlock>
          <div className="kor">바람</div>
          <div>
            <WindArrow deg={city.weather.windDeg} />
            {city.weather.windSpeed} m/s
          </div>
        </SubInfoItemBlock>
        <SubInfoItemBlock>
          <div className="kor">기압</div>
          <div>{city.weather.pressure} hPa</div>
        </SubInfoItemBlock>
      </SubInfoBlock>
      <WeatherMainForecast city={city} />
    </WeatherMainBlock>
  );
};

export default React.memo(WeatherMain);
