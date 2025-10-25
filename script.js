document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeather = document.getElementById("get-weather");
    const cityName = document.getElementById("cityName");
    const cityTemperture = document.getElementById("temperature");
    const cityDescription = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const weatherInfo = document.getElementById("weatherInfo");

    const API_KEY = "524c1762d6ffd9b0a6e623ca3b002ce4";

    getWeather.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            console.error(error);
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    }

    function displayWeatherData(weatherData) {
        const { name, main, weather } = weatherData;
        cityName.textContent = name;
        cityTemperture.textContent = `Temperature: ${main.temp} °C`;
        cityDescription.textContent = `Weather: ${weather[0].description}`;
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});
