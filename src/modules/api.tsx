import axios from 'axios';
import { City } from './weather';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

type Response = {
  data: any;
  error: Error | null;
};

const processPromise = async (promise: Promise<any>): Promise<Response> => {
  try {
    const response = await promise;
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
    } else {
      const res: Response = { data: null, error: null };
      return res;
    }
  }
};

export const getWeatherCurrent = async (city: City) => {
  const result = await processPromise(
    axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    ),
  );
  return result;
};

export const getWeatherForecast = async (city: City) => {
  const result = await processPromise(
    axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
    ),
  );
  return result;
};
