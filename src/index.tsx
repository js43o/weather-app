import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherApp from './components/WeatherApp';

// prevent default events
document.ondragstart = () => false;
document.onselectstart = () => false;
document.oncontextmenu = () => false;

ReactDOM.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>,
  document.getElementById('root'),
);
