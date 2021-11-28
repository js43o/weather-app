import { ActionType, createAction, createReducer } from 'typesafe-actions';
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
  dt: dt;
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

const LOADING = 'LOADING';
const ERROR = 'ERROR';
const ADD_CITY = 'ADD_CITY';
const SET_CITY = 'SET_CITY';
const SELECT_CITY = 'SELECT_CITY';
const REMOVE_CITY = 'REMOVE_CITY';
const TOGGLE_MARK = 'TOGGLE_MARK';
const SET_CITIES = 'SET_CITIES';

export const loading = createAction(LOADING)();
export const error = createAction(ERROR, (error: WeatherError | null) => ({
  error,
}))();
export const addCity = createAction(ADD_CITY, (city: City) => ({ city }))();
export const setCity = createAction(SET_CITY, (city: City) => ({ city }))();
export const selectCity = createAction(SELECT_CITY, (city: City) => ({
  city,
}))();
export const removeCity = createAction(
  REMOVE_CITY,
  (city: City, adjacentCity: City | null) => ({ city, adjacentCity }),
)();
export const toggleMark = createAction(
  TOGGLE_MARK,
  (city: City, marked: boolean) => ({
    city,
    marked,
  }),
)();
export const setCities = createAction(SET_CITIES, (cities: City[]) => ({
  cities,
}))();

type WeatherState = {
  loading: boolean;
  error: WeatherError | null;
  cities: City[];
  currentCity: City | null;
};

const actions = {
  loading,
  error,
  addCity,
  setCity,
  selectCity,
  removeCity,
  toggleMark,
  setCities,
};
export type WeatherAction = ActionType<typeof actions>;

const initialState: WeatherState = {
  loading: false,
  error: null,
  cities: [],
  currentCity: null,
};

const weather = createReducer<WeatherState, WeatherAction>(initialState, {
  [LOADING]: (state) => ({ ...state, loading: true, error: null }),
  [ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.error,
  }),
  [ADD_CITY]: (state, action) => ({
    ...state,
    loading: false,
    cities: state.cities.concat(action.payload.city),
    currentCity: action.payload.city,
  }),
  [SET_CITY]: (state, action) => ({
    ...state,
    loading: false,
    cities: state.cities.map((item) =>
      item.name === action.payload.city.name ? action.payload.city : item,
    ),
    currentCity: action.payload.city,
  }),
  [SELECT_CITY]: (state, action) => ({
    ...state,
    currentCity: action.payload.city,
  }),
  [REMOVE_CITY]: (state, action) => ({
    ...state,

    cities: state.cities.filter(
      (item) => item.name !== action.payload.city.name,
    ),
    currentCity:
      state.currentCity?.name === action.payload.city.name
        ? action.payload.adjacentCity
        : state.currentCity,
  }),
  [TOGGLE_MARK]: (state, action) => ({
    ...state,
    cities: state.cities.map((item) =>
      item.name === action.payload.city.name
        ? {
            ...item,
            marked: !item.marked,
          }
        : item,
    ),
  }),
  [SET_CITIES]: (state, action) => ({
    ...state,
    cities: action.payload.cities,
    currentCity: state.currentCity || action.payload.cities[0],
  }),
});

export default weather;
