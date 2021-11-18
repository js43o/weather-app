import type { dt } from '../utils/methods';

export type CurrentWeather = {
  id: string;
  temp: {
    current: string;
    min: string;
    max: string;
  };
  humidity: number;
  wind: {
    speed: number;
    deg: number;
  };
  pressure: number;
};

export type ForecastWeather = {
  dt_txt: string;
  dt: dt | null;
  id: string;
  temp: {
    current: number;
  };
  humidity: number;
  wind: {
    speed: number;
    deg: number;
  };
};

export type City = {
  name: string;
  weather: CurrentWeather;
  forecast: ForecastWeather[];
  marked: boolean;
  recentUpdate: number;
};

export type WeatherError = {
  currentError: Error | null;
  forecastError: Error | null;
};

type State = {
  loading: boolean;
  error: WeatherError | null;
  cities: City[];
  currentCity: City | null;
};

type Action =
  | { type: 'LOADING' }
  | { type: 'ERROR'; error: WeatherError }
  | { type: 'ADD_CITY'; city: City }
  | { type: 'SET_CITY'; city: City }
  | { type: 'SELECT_CITY'; city: City }
  | { type: 'REMOVE_CITY'; city: City; adjacentCity: City | null }
  | { type: 'BOOKMARK_CITY'; city: City; marked: boolean }
  | { type: 'SET_CITIES'; cities: City[] };

export const initialState: State = {
  loading: false,
  error: null,
  cities: [],
  currentCity: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'ADD_CITY':
      return {
        ...state,
        loading: false,
        cities: state.cities.concat(action.city),
        currentCity: action.city,
      };
    case 'SET_CITY': {
      return {
        ...state,
        loading: false,
        cities: state.cities.map((city) =>
          city.name === action.city.name ? action.city : city,
        ),
        currentCity: action.city,
      };
    }
    case 'SELECT_CITY':
      return {
        ...state,
        currentCity: action.city,
      };
    case 'REMOVE_CITY':
      return {
        ...state,
        cities: state.cities.filter((city) => city.name !== action.city.name),
        currentCity:
          state.currentCity?.name === action.city.name
            ? action.adjacentCity
            : state.currentCity,
      };
    case 'BOOKMARK_CITY':
      return {
        ...state,
        cities: state.cities.map((city) =>
          city.name === action.city.name
            ? {
                ...city,
                marked: !city.marked,
              }
            : city,
        ),
      };
    case 'SET_CITIES':
      return {
        ...state,
        cities: action.cities,
        currentCity: state.currentCity || action.cities[0],
      };
    default:
      return state;
  }
};

export default reducer;
