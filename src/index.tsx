import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './modules';
import WeatherApp from './components/WeatherApp';
import { composeWithDevTools } from 'redux-devtools-extension';

// prevent default events
document.ondragstart = () => false;
document.onselectstart = () => false;
document.oncontextmenu = () => false;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <WeatherApp />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
