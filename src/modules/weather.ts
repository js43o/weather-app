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

// 액션 타입 리터럴
const LOADING = 'LOADING' as const;
const ERROR = 'ERROR' as const;
const ADD_CITY = 'ADD_CITY' as const;
const SET_CITY = 'SET_CITY' as const;
const SELECT_CITY = 'SELECT_CITY' as const;
const REMOVE_CITY = 'REMOVE_CITY' as const;
const TOGGLE_MARK = 'TOGGLE_MARK' as const;
const SET_CITIES = 'SET_CITIES' as const;

// 액션 생성 함수
export const loading = () => ({ type: LOADING });
export const error = (error: WeatherError | null) => ({
  type: ERROR,
  payload: { error },
});
export const addCity = (city: City) => ({ type: ADD_CITY, payload: { city } });
export const setCity = (city: City) => ({ type: SET_CITY, payload: { city } });
export const selectCity = (city: City) => ({
  type: SELECT_CITY,
  payload: { city },
});
export const removeCity = (city: City, adjacentCity: City | null) => ({
  type: REMOVE_CITY,
  payload: { city, adjacentCity },
});
export const toggleMark = (city: City, marked: boolean) => ({
  type: TOGGLE_MARK,
  payload: { city, marked },
});
export const setCities = (cities: City[]) => ({
  type: SET_CITIES,
  payload: { cities },
});

// 상태 타입
type State = {
  loading: boolean;
  error: WeatherError | null;
  cities: City[];
  currentCity: City | null;
};

// 액션 타입
export type WeatherAction =
  | ReturnType<typeof loading>
  | ReturnType<typeof error>
  | ReturnType<typeof addCity>
  | ReturnType<typeof setCity>
  | ReturnType<typeof selectCity>
  | ReturnType<typeof removeCity>
  | ReturnType<typeof toggleMark>
  | ReturnType<typeof setCities>;

export const initialState: State = {
  loading: false,
  error: null,
  cities: [],
  currentCity: null,
};

const weather = (state: State = initialState, action: WeatherAction): State => {
  switch (action.type) {
    case 'LOADING': {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case 'ERROR': {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    }
    case 'ADD_CITY': {
      const { city } = action.payload;
      return {
        ...state,
        loading: false,
        cities: state.cities.concat(city),
        currentCity: city,
      };
    }
    case 'SET_CITY': {
      const { city } = action.payload;
      return {
        ...state,
        loading: false,
        cities: state.cities.map((item) =>
          item.name === city.name ? city : item,
        ),
        currentCity: city,
      };
    }
    case 'SELECT_CITY': {
      const { city } = action.payload;
      return {
        ...state,
        currentCity: city,
      };
    }
    case 'REMOVE_CITY': {
      const { city, adjacentCity } = action.payload;
      return {
        ...state,
        cities: state.cities.filter((item) => item.name !== city.name),
        currentCity:
          state.currentCity?.name === city.name
            ? adjacentCity
            : state.currentCity,
      };
    }
    case 'TOGGLE_MARK': {
      const { city } = action.payload;
      return {
        ...state,
        cities: state.cities.map((item) =>
          item.name === city.name
            ? {
                ...item,
                marked: !item.marked,
              }
            : item,
        ),
      };
    }
    case 'SET_CITIES': {
      const { cities } = action.payload;
      return {
        ...state,
        cities,
        currentCity: state.currentCity || cities[0],
      };
    }
    default:
      return state;
  }
};

export default weather;
