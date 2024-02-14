const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
const forecastSection = document.getElementById('forecast'); 
const toggleUnit = document.getElementById('toggleUnit');

const apiKey = '7367c6e31dc6407795b213336241202'; // Replace with your WeatherAPI key
let displayFahrenheit = true;
let currentTemp = data.current.temp_c;
setInterval(() => {
  currentTemp += (Math.random() - 0.5); 
  document.querySelector('.temp').innerText = currentTemp;
}, 3000);

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    fetchWeatherData(location);
});

toggleUnit.addEventListener('click', () => {
    displayFahrenheit = !displayFahrenheit;
    fetchWeatherData(locationInput.value);
});

function fetchWeatherData(location) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            displayForecast(data.forecast.forecastday);
        })
        .catch(error => displayError(error));
}

function displayWeather(data) {
    const { location, current } = data; // Destructuring

    weatherInfo.innerHTML = `
        <h2>${location.name}, ${location.region}</h2>
        <img src="${current.condition.icon}">
        <p><strong>${current.condition.text}</strong></p>
        <p><strong>Temperature:</strong> ${displayFahrenheit ? current.temp_f : current.temp_c} &deg;${displayFahrenheit ? 'F' : 'C'}</p> 
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
        <p><strong>Wind:</strong> ${current.wind_mph} mph ${current.wind_dir}</p>
        <p><strong>Feels Like:</strong> ${displayFahrenheit ? current.feelslike_f : current.feelslike_c} &deg;${displayFahrenheit ? 'F' : 'C'}</p> 
    `;

    // ... (Background change code - no changes needed) ...
}


function displayForecast(forecastData) {
    forecastSection.innerHTML = ''; 

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

function displayError(error) {
    weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    forecastSection.innerHTML = '';
}
