import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export type CurrentWeatherData = {
  weather: [
    {
      id: string;
    },
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
};

export type ForecastWeatherDataItem = {
  weather: [
    {
      id: string;
    },
  ];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  dt_txt: string;
};

type Response = {
  data: CurrentWeatherData | { list: Array<ForecastWeatherDataItem> } | null;
  error: Error | null;
};

async function processPromise(promise: Promise<Response>): Promise<Response> {
  try {
    const response = await promise;
    return {
      data: response.data,
      error: null,
    };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export const getCurrentWeather = async (cityName: string) => {
  const result = await processPromise(
    axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`,
    ),
  );
  return result;
};

export const getForecastWeather = async (cityName: string) => {
  const result = await processPromise(
    axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`,
    ),
  );
  return result;
};

export const getAllWeather = async (cityName: string) => {
  const resultCurrent = await getCurrentWeather(cityName);
  const resultForecast = await getForecastWeather(cityName);
  return { resultCurrent, resultForecast };
};
