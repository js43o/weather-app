import palette from './palette';
import {
  BsSun,
  BsCloud,
  BsClouds,
  BsCloudSun,
  BsCloudFog,
  BsCloudRain,
  BsCloudSnow,
  BsCloudLightning,
  BsCloudLightningRain,
} from 'react-icons/bs';

// 온도 단위를 kelvin에서 celsius로 변환 및 소수점을 1개로 고정
export const kelToCel = (kelvin) => (kelvin - 273.15).toFixed(1);

// dt_txt 형식에서 date 및 time 추출
export const dtTxtToDateAndTime = (dt_txt) => ({
  date: {
    year: dt_txt.match(/\d{4}/g)[0],
    month: dt_txt.match(/\d{2}/g)[2],
    day: dt_txt.match(/\d{2}/g)[3],
  },
  time: {
    hour: dt_txt.match(/\d{2}/g)[4],
    minute: dt_txt.match(/\d{2}/g)[5],
    second: dt_txt.match(/\d{2}/g)[6],
  },
});

// 대소문자 casing 변환
export const toCasing = (str) =>
  str ? [str[0].toUpperCase(), str.slice(1).toLowerCase()].join('') : null;

// 최솟값과 최댓값 사이의 값으로 변환
export const cutRange = (number, min, max) =>
  Math.max(Math.min(number, max), min);

// 날씨 id를 description으로 변환
export const toDescription = (id) => {
  switch (true) {
    case /2[12]\d/.test(id):
      return '낙뢰';
    case /2[03]\d/.test(id):
      return '뇌우';
    case /3\d\d/.test(id):
      return '이슬비';
    case /5\d\d/.test(id):
      return '비';
    case /6\d\d/.test(id):
      return '눈';
    case /7[0124]1/.test(id):
      return '안개';
    case /7[356][12]/.test(id):
      return '황사';
    case /7[78]1/.test(id):
      return '돌풍';
    case /800/.test(id):
      return '맑음';
    case /80[1]/.test(id):
      return '구름조금';
    case /80[23]/.test(id):
      return '구름많음';
    case /804/.test(id):
      return '흐림';
    default:
      return null;
  }
};

// 날씨 id를 아이콘으로 변환
export const toIcon = (id) => {
  switch (true) {
    case /2[12]\d/.test(id):
      return <BsCloudLightning />;
    case /2[03]\d/.test(id):
      return <BsCloudLightningRain />;
    case /[35]\d\d/.test(id):
      return <BsCloudRain />;
    case /6\d\d/.test(id):
      return <BsCloudSnow />;
    case /7\d\d/.test(id):
      return <BsCloudFog />;
    case /800/.test(id):
      return <BsSun />;
    case /80[1]/.test(id):
      return <BsCloudSun />;
    case /80[23]/.test(id):
      return <BsCloud />;
    case /804/.test(id):
      return <BsClouds />;
    default:
      return null;
  }
};

// 날씨 id에 맞는 색상을 반환
export const toColor = (id) => {
  switch (true) {
    case /[2356]\d\d/.test(id):
      return palette.sky[400];
    case /7\d\d/.test(id):
    case /80[4]/.test(id):
      return palette.sky[300];
    case /80[23]/.test(id):
      return palette.sky[200];
    case /80[01]/.test(id):
      return palette.sky[100];
    default:
      return null;
  }
};
