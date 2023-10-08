import React, { useState, useEffect } from "react";
import WeatherDisplay from "../components/weatherDisplay";
import WeatherInput from "../components/weatherInput";
import "../styles/Homepage.css";

const HomePage = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "9f9ff65be2afed02483511e5d6aea5ad"; // Replace with your API key
  const handleSearch = async (cityName) => {
    setIsLoading(true);
    setError("");

    try {
      // Define the URL for fetching weather data
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      const currentWeatherData = data.list[0];
      const { weather } = data.list[0];
      const weatherType = weather[0].main;
      const forecastData = data.list.slice(0, 10);

      setCurrentWeather({
        cityName: data.city.name,
        date: currentWeatherData.dt_txt.split(" ")[0],
        temperature: (currentWeatherData.main.temp - 273.15).toFixed(2),
        windSpeed: currentWeatherData.wind.speed,
        humidity: currentWeatherData.main.humidity,
        weatherType,
      });

      setForecast(
        forecastData.map((item) => ({
          date: item.dt_txt.split(" ")[0],
          temperature: (item.main.temp - 273.15).toFixed(2),
          windSpeed: item.wind.speed,
          humidity: item.main.humidity,
        }))
      );
    } catch (error) {
      setError("City not found or an error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGetCurrentLocation = () => {
    console.log(navigator);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

          fetch(API_URL)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Unable to fetch current location");
              }
              return response.json();
            })
            .then((data) => {
              const cityName = data[0].name;
              handleSearch(cityName); // Call handleSearch with the obtained city name
            })
            .catch((error) => {
              setError("Unable to fetch current location");
            });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError("Geolocation request denied.");
          } else {
            setError("Geolocation request error.");
          }
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };
  useEffect(() => {
    // Load initial weather data for New York on app load
    handleSearch("New York");
  }, []);
  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <WeatherInput
        onSearch={handleSearch}
        onGetCurrentLocation={handleGetCurrentLocation}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <WeatherDisplay currentWeather={currentWeather} forecast={forecast} />
      )}
    </div>
  );
};

export default HomePage;
