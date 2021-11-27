import { combineReducers } from 'redux';
import weather from './weather';

const rootReducer = combineReducers({
  weather,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
