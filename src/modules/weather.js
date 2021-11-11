export const initialState = {
  loading: false,
  error: false,
  cities: [],
  currentCity: null,
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
    case 'LOAD_CITIES':
      return {
        ...state,
        cities: action.cities,
        currentCity: action.cities[0],
      };
    default:
      return state;
  }
};

export default reducer;
