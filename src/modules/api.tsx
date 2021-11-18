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
    console.log(response);

    const res: Response = {
      data: response.data,
      error: null,
    };
    return res;
  } catch (e) {
    if (e instanceof Error) {
      const res: Response = {
        data: null,
        error: e,
      };
      return res;
    }
    const res: Response = { data: null, error: null };
    return res;
  }
}

export const getWeatherCurrent = async (cityName: string) => {
  const result = await processPromise(
    axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`,
    ),
  );
  return result;
};

export const getWeatherForecast = async (cityName: string) => {
  const result = await processPromise(
    axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`,
    ),
  );
  return result;
};
