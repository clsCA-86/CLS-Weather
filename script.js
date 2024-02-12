const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
const forecastSection = document.getElementById('forecast'); // Assuming you added this in HTML
const toggleUnit = document.getElementById('toggleUnit');

// Replace 'YOUR_API_KEY' with your actual WeatherAPI key
const apiKey = '7367c6e31dc6407795b213336241202'; 

let displayFahrenheit = false;

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    fetchWeatherData(location);
});

toggleUnit.addEventListener('click', () => {
    displayFahrenheit = !displayFahrenheit;
    fetchWeatherData(locationInput.value);
});

function fetchWeatherData(location) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`; // Include forecast

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            displayForecast(data.forecast.forecastday);
        })
        .catch(error => displayError(error)); 
}

function displayWeather(data) {
    // ... (Most of the displayWeather code remains identical) ...

    // More detailed weather
    weatherInfo.innerHTML += `
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_mph} mph ${data.current.wind_dir}</p>
        <p><strong>Feels Like:</strong> ${displayFahrenheit ? data.current.feelslike_f : data.current.feelslike_c} &deg;${displayFahrenheit ? 'F' : 'C'}</p> 
    `;

    // Background change (example) - Same as before
    // ... 
}

function displayForecast(forecastData) {
    forecastSection.innerHTML = ''; // Clear previous forecast

    forecastData.forEach(day => {
        let temp = displayFahrenheit ? day.day.avgtemp_f : day.day.avgtemp_c;
        let unit = displayFahrenheit ? 'F' : 'C';
        
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item'); 
        forecastItem.innerHTML = `
            <h3>${new Date(day.date).toDateString()}</h3>
            <img src="${day.day.condition.icon}">
            <p> ${temp} &deg;${unit}</p> 
        `;
        forecastSection.appendChild(forecastItem);
    })
}