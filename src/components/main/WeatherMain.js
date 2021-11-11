import React from 'react';
import WeatherMainForecast from './WeatherCarousel';
import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading } from 'react-icons/ai';
import { ImArrowUp } from 'react-icons/im';
import * as utils from '../../utils/methods';
import palette from '../../utils/palette';
import flex from '../../utils/styles';

const WeatherMainBlock = styled.div`
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

const WindArrow = styled(ImArrowUp)`
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

const WeatherMain = ({ loading, city }) => {
  if (loading)
    return (
      <WeatherMainBlock>
        <LoadingIndicator />
        Loading...
      </WeatherMainBlock>
    );

  if (!city) return <WeatherMainBlock>Select the city.</WeatherMainBlock>;

  const {
    name,
    weather: {
      id,
      temp: { current },
      humidity,
      wind: { speed, deg },
      pressure,
    },
  } = city;

  return (
    <WeatherMainBlock color={utils.toColor(id)}>
      <MainInfoBlock>
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
