export const initialState = {
  loading: false,
  cities: [],
  city: {
    name: '',
    weather: {
      id: null,
      tempCurrent: null,
      tempMin: null,
      tempMax: null,
      humidity: null,
      pressure: null,
      windSpeed: null,
      windDeg: null,
    },
    forecast: [],
  },
  currentCity: null,
  error: false,
};

const reducer = (state, action) => {
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
          state.currentCity.name === action.city.name
            ? action.adjacentCity
            : state.currentCity,
      };
    default:
      return state;
  }
};

export default reducer;
