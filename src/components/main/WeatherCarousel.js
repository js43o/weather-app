import React, { useRef } from 'react';
import styled from 'styled-components';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import * as utils from '../../utils/methods';
import flex from './../../utils/styles';

const WeatherCarouselBlock = styled.div`
  ${flex()}
  position: relative;
  width: 80%;
  margin-top: 1rem;
`;

const CarouselListBlock = styled.ul`
  ${flex('row', 'flex-start')}
  overflow-x: scroll;
`;

const CarouselItemBlock = styled.li`
  ${flex('column')}
  flex-shrink: 0;
  flex-basis: 8rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  max-width: 100%;
  font-size: 1rem;
  .icon {
    font-size: 2rem;
  }
  .description {
    font-size: 0.75rem;
  }
`;

const ArrowBlock = styled.div`
  ${flex()}
  right: ${(props) => (props.direction === 'prev' ? '' : 0)};
  height: 100%;
  padding: 1.5rem 0.5rem;
  border-radius: ${(props) =>
    props.direction === 'prev' ? '0.5rem 0 0 0.5rem' : '0 0.5rem 0.5rem 0'};
  background: rgba(255, 255, 255, 0);
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  &:active {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const WeatherCarousel = ({ city }) => {
  const scrollPos = useRef(0);
  const carousel = useRef(null);
  const timerId = useRef(null);

  const onScroll = () => (scrollPos.current = carousel.current.scrollLeft);

  const clearTimerId = () => {
    clearInterval(timerId.current);
  };

  const onPointerDown = (e, direction) => {
    timerId.current = setInterval(() => {
      if (
        (direction === 'next' &&
          scrollPos.current >=
            carousel.current.scrollWidth - carousel.current.clientWidth) ||
        (direction === 'prev' && scrollPos.current <= 0)
      )
        return;
      scrollPos.current = utils.cutRange(
        scrollPos.current + (direction === 'next' ? 12 : -12),
        0,
        carousel.current.scrollWidth - carousel.current.clientWidth,
      );
      carousel.current.scrollLeft = scrollPos.current;
    }, 16);

    document.onpointerup = () => clearTimerId();
  };
  return (
    <WeatherCarouselBlock>
      <ArrowBlock
        direction="prev"
        onPointerDown={(e) => onPointerDown(e, 'prev')}
        onPointerLeave={clearTimerId}
      >
        <MdNavigateBefore />
      </ArrowBlock>
      <CarouselListBlock onScroll={onScroll} ref={carousel}>
        {city.forecast.map((item) => (
          <CarouselItemBlock key={item.dt_txt}>
            <div className="date kor">
              {item.dt.date.day}일 {item.dt.time.hour}시
            </div>
            <div className="icon">{utils.toIcon(item.id)}</div>
            <div className="temp">{utils.kelToCel(item.temp.current)} ℃</div>
            <div className="description kor">
              {utils.toDescription(item.id)}
            </div>
          </CarouselItemBlock>
        ))}
      </CarouselListBlock>
      <ArrowBlock
        direction="next"
        onPointerDown={(e) => onPointerDown(e, 'next')}
        onPointerLeave={clearTimerId}
      >
        <MdNavigateNext />
      </ArrowBlock>
    </WeatherCarouselBlock>
  );
};

export default React.memo(WeatherCarousel);
