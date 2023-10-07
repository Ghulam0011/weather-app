import React from 'react';
import '../styles/WeatherDisplay.css'
const WeatherDisplay = ({ currentWeather, forecast }) => {
  return (
    <div className="weather-data">
      <div className="current-weather">
        <div className="details">
          <h2>{currentWeather.cityName} ({currentWeather.date})</h2>
          <h6>Temperature: {currentWeather.temperature}°C</h6>
          <h6>Wind: {currentWeather.windSpeed} M/S</h6>
          <h6>Humidity: {currentWeather.humidity}%</h6>
        </div>
      </div>
      <div className="days-forecast">
        <h2>5-Day Forecast</h2>
        <ul className="weather-cards">
          {forecast.map((day, index) => (
            <li className="card" key={index}>
              <h3>({day.date})</h3>
              <h6>Temp: {day.temperature}°C</h6>
              <h6>Wind: {day.windSpeed} M/S</h6>
              <h6>Humidity: {day.humidity}%</h6>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherDisplay;
