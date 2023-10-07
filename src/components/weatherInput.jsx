import React, { useState } from 'react';
import '../styles/WeatherInput.css'
const WeatherInput = ({ onSearch, onGetCurrentLocation }) => {
  const [cityName, setCityName] = useState('');

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSearch = () => {
    if (cityName.trim() !== '') {
      onSearch(cityName);
    }
  };

  return (
    <div className="weather-input">
      <h3>Enter a City Name</h3>
      
      <input
        type="text"
        placeholder="E.g., New York, London, Tokyo"
        value={cityName}
        onChange={handleInputChange}
      />
      <button type='submit' onClick={handleSearch}>Search</button>
      <button type='submit' onClick={onGetCurrentLocation}>Use Current Location</button>
      
      <div className="separator"></div>
    </div>
  );
};

export default WeatherInput;
