import React from "react";
import "../styles/WeatherDisplay.css";
const WeatherDisplay = ({ currentWeather, forecast }) => {
  const weatherIcons = {
    Clear: "/weblogo.png",
    Clouds: "/cloudy.png",
    Rain: "/rain.png",
    Fog: "/fog.png",
  };
  const currentImage =
    weatherIcons[currentWeather.weatherType] || "/weblogo.png";
  console.log(currentImage);

  return (
    <>
      <div className="weather-data">
        <div className="current-weather">
          <div className="details">
            <h2>
              {currentWeather.cityName} ({currentWeather.date})
            </h2>
            <div className="weathertypebox">
              <span className="item weatherimage">
                <img
                  src={currentImage}
                  alt="weatherimage"
                  className="weatherimage"
                />
              </span>
              <span className="item">{currentWeather.weatherType}</span>
            </div>
            <h6 className="tempreateContainer">
              <span className="tempItem">
                <img className="tempratureImage" src="/temperature.png" />
              </span>
              <span className="tempItem">
                Temp: {currentWeather.temperature}°C
              </span>
            </h6>
            <h6 className="tempreateContainer">
              <span className="tempItem">
                <img className="tempratureImage" src="/windy.png" />
              </span>
              <span className="tempItem">
                Wind: {currentWeather.windSpeed} M/S
              </span>
            </h6>
            <h6 className="tempreateContainer">
              <span className="tempItem">
                <img className="tempratureImage" src="/humidity.png" />
              </span>
              <span className="tempItem">
                Humidity: {currentWeather.humidity}%
              </span>
            </h6>
            <h6>Weather Type: {currentWeather.weatherType}</h6>
          </div>
        </div>
      </div>
      <div className="days_forecast">
        <h2>5-Day Forecast</h2>
        <div className="weather-cards">
          {forecast.map((day, index) => (
            <div className="card" key={index}>
              <h3>({day.date})</h3>
              <h6 className="tempreateContainer">
                <span className="tempItem">
                  <img className="tempratureImage" src="/temperature.png" />
                </span>
                <span className="tempItem">Temp: {day.temperature}°C</span>
              </h6>
              <h6 className="tempreateContainer">
                <span className="tempItem">
                  <img className="tempratureImage" src="/windy.png" />
                </span>
                <span className="tempItem">Wind: {day.windSpeed} M/S</span>
              </h6>
              <h6 className="tempreateContainer">
                <span className="tempItem">
                  <img className="tempratureImage" src="/humidity.png" />
                </span>
                <span className="tempItem">Humidity: {day.humidity}%</span>
              </h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeatherDisplay;
