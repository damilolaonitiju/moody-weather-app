/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string }[];
  wind: {
    speed: number;
  };
}

function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [city, setCity] = useState<string>("");
  const API_KEY = "8af9ffef4d9d011a21e5531f942911a9";

  const defaultCities = [
    "London",
    "New York",
    "Tokyo",
  ];

  useEffect(() => {
    const fetchWeatherForDefaultCities = async () => {
      const promises = defaultCities.map((city) =>
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: { q: city, appid: API_KEY, units: "metric" },
          })
          .then((response) => response.data as WeatherData)
          .catch((error) => {
            console.error(`Error fetching weather for ${city}`, error);
            return null;
          })
      );
      const results = await Promise.all(promises);
      setWeatherData(
        results.filter((data): data is WeatherData => data !== null)
      );
    };
    fetchWeatherForDefaultCities();
  }, [API_KEY, defaultCities]);

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: { q: city, appid: API_KEY, units: "metric" },
        }
      );

      const existingCity = weatherData.find(
        (data) => data.name.toLowerCase() === city.toLowerCase()
      );
      if (!existingCity) {
        setWeatherData((prevData) => [
          ...prevData,
          response.data as WeatherData,
        ]);
      } else {
        alert(`${city} weather data is already displayed.`);
      }
    } catch (error) {
      console.error("Error fetching weather", error);
      alert(
        "Error fetching weather. Please check the city name and try again."
      );
    }
  };

  return (
    <div className="container">
      <div>
        <div className="weather-header">
          <h1>Moody</h1>
        </div>
        <div className="weather-input">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>
      </div>
            <div className="weather-cards">
        {weatherData.map((data, index) => (
          <div key={index} className="weather-card">
            <h3>Weather in {data.name}</h3>
            <p>Temperature: {data.main.temp} °C</p>
            <p>Condition: {data.weather[0].description}</p>
            <p>Humidity: {data.main.humidity} %</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
            <p>Pressure: {data.main.pressure} hPa</p>
          </div>
        ))}
      </div>

      <div className="weather-cards">
        {" "}
        <div className="weather-card">
          <h3>Weather in Lagos</h3>
          <p>Temperature: 27°C</p>
          <p>Condition: It is a cool refreshing weather</p>
          <p>Humidity: 10 %</p>
          <p>Wind Speed: 30 m/s</p>
          <p>Pressure: 5 hPa</p>
        </div>
        <div className="weather-card">
          <h3>Weather in Lagos</h3>
          <p>Temperature: 27°C</p>
          <p>Condition: It is a cool refreshing weather</p>
          <p>Humidity: 10 %</p>
          <p>Wind Speed: 30 m/s</p>
          <p>Pressure: 5 hPa</p>
        </div>
        <div className="weather-card">
          <h3>Weather in Lagos</h3>
          <p>Temperature: 27°C</p>
          <p>Condition: It is a cool refreshing weather</p>
          <p>Humidity: 10 %</p>
          <p>Wind Speed: 30 m/s</p>
          <p>Pressure: 5 hPa</p>
        </div>
        <div className="weather-card">
          <h3>Weather in Lagos</h3>
          <p>Temperature: 27°C</p>
          <p>Condition: It is a cool refreshing weather</p>
          <p>Humidity: 10 %</p>
          <p>Wind Speed: 30 m/s</p>
          <p>Pressure: 5 hPa</p>
        </div>
      </div>

    </div>
  );
}

export default Weather;
