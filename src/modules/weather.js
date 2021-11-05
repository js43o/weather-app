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
  },
  currentCity: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
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
        cities: state.cities.filter((city) => city.name !== action.name),
        currentCity:
          state.currentCity.name === action.city.name
            ? null
            : state.currentCity,
      };
    default:
      return state;
  }
};

export default reducer;
