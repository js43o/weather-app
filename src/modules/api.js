import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const processPromise = async (promise) => {
  try {
    const response = await promise;
    return {
      data: response.data,
      error: null,
    };
  } catch (e) {
    alert('No search results.');
    return {
      data: null,
      error: e,
    };
  }
};

export const getWeatherCurrent = async (city) => {
  const result = await processPromise(
    axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    ),
  );
  return result;
};

export const getWeatherForecast = async (city) => {
  const result = await processPromise(
    axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
    ),
  );
  return result;
};
