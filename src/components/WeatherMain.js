import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as utils from '../utils/methods';
import palette from './../utils/palette';
import { AiOutlineLoading } from 'react-icons/ai';
import { ImArrowUp } from 'react-icons/im';

const WeatherMainBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65%;
  position: relative;
  border: 1px solid ${palette.grey[500]};
  border-radius: 0.25rem;
  background: ${(props) => props.color};
  color: ${(props) => props.color && 'white'};
  font-size: 2rem;
  transition: background 0.5s;
`;

const MainInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.25);
`;

const SubInfoItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  flex-basis: 1rem;
  align-items: center;
  padding: 0.5rem;
  font-size: 1rem;
  & + & {
    border-left: 1px solid ${palette.grey[100]};
  }
  div:first-child {
    font-weight: bold;
  }
  div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ForecastListBlock = styled.ul`
  display: flex;
  width: 80%;
  overflow-x: scroll;
`;

const ForecastItemBlock = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-basis: 8rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  max-width: 100%;
  font-size: 1rem;
  .icon {
    font-size: 2rem;
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
  font-size: 3rem;
  animation: ${rotateKeyframe} 0.5s infinite linear;
`;

const WeatherMain = ({ loading, city }) => {
  if (!city) return <WeatherMainBlock>Select the city.</WeatherMainBlock>;

  if (loading)
    return (
      <WeatherMainBlock color={utils.toColor(city.weather.id)}>
        <LoadingIndicator />
        Loading...
      </WeatherMainBlock>
    );

  return (
    <WeatherMainBlock color={utils.toColor(city.weather.id)}>
      <MainInfoBlock>
        <div className="city">{city.name}</div>
        <div className="icon">{utils.toIcon(city.weather.id)}</div>
        <div className="temp">{city.weather.tempCurrent} ℃</div>
        <div className="description">
          {utils.toDescription(city.weather.id)}
        </div>
      </MainInfoBlock>
      <SubInfoBlock>
        <SubInfoItemBlock>
          <div>습도</div>
          <div>{city.weather.humidity} %</div>
        </SubInfoItemBlock>
        <SubInfoItemBlock>
          <div>바람</div>
          <div>
            <WindArrow deg={city.weather.windDeg} />
            {city.weather.windSpeed} m/s
          </div>
        </SubInfoItemBlock>
        <SubInfoItemBlock>
          <div>기압</div>
          <div>{city.weather.pressure} hPa</div>
        </SubInfoItemBlock>
      </SubInfoBlock>
      <ForecastListBlock>
        {city.forecast.map((item) => (
          <ForecastItemBlock key={item.dt_txt}>
            <div className="date">
              {item.date.day}일 {item.time.hour}시
            </div>
            <div className="icon">{utils.toIcon(item.id)}</div>
            <div className="temp">{utils.kelToCel(item.temp)} ℃</div>
            <div className="description">{utils.toDescription(item.id)}</div>
          </ForecastItemBlock>
        ))}
      </ForecastListBlock>
    </WeatherMainBlock>
  );
};

export default React.memo(WeatherMain);
