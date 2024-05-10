import React, { useEffect, useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';

function WeatherApp() {
    const api_key = "69618f8191fb76ec06fc943518e26fac";
    const [weatherData, setWeatherData] = useState({
        icon: cloud_icon,
        temperature: '',
        humidity: '',
        windSpeed: '',
        location: ''
    });

    const search = async (city) => {
        if (!city) return;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            if (!data.main || !data.weather || !data.wind || !data.name) {
                throw new Error('Weather data is incomplete');
            }
            setWeatherData({
                icon: getWeatherIcon(data.weather[0].icon),
                temperature: Math.floor(data.main.temp) + "°C",
                humidity: data.main.humidity + "%",
                windSpeed: Math.floor(data.wind.speed) + " km/h",
                location: data.name
            });
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
        }
    };

    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
                return cloud_icon;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                return drizzle_icon;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            default:
                return cloud_icon;
        }
    };

    const handleSearch = () => {
        const city = document.getElementById("cityInput").value;
        search(city);
    };

    useEffect(() => {
        // Fetch weather data for default city when component mounts
        search('London'); // Example city
    }, []);

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" id="cityInput" placeholder='Enter city name' />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="weather-image">
                <img src={weatherData.icon} alt="weather icon" />
            </div>

            <div className="weather-temp">{weatherData.temperature}</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
