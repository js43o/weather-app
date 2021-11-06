import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const getWeatherAPI = async (city) => {
  try {
    const promiseCurrent = axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    );
    const promiseForecast = axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
    );
    const response = await Promise.all([promiseCurrent, promiseForecast]);
    return {
      responseCurrent: response[0].data,
      responseForcase: response[1].data,
      error: null,
    };
  } catch (e) {
    alert('No search results.');
    return {
      responseCurrent: null,
      responseForcase: null,
      error: e,
    };
  }
};

export default getWeatherAPI;
