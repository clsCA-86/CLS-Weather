const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
const forecastSection = document.getElementById('forecast'); 
const toggleUnit = document.getElementById('toggleUnit');

const apiKey = '7367c6e31dc6407795b213336241202'; // Replace with your WeatherAPI key
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
        <h2><strong style="color: red;">${location.name}, ${location.region}</strong></h2>
        <img src="${current.condition.icon}">
        <p><strong style="color: red;"> ${current.condition.text}</strong></p>
        <p><strong style="color: red; font-weight: bold;"><b>Temperature:</b> ${displayFahrenheit ? current.temp_f : current.temp_c} &deg;${displayFahrenheit ? 'F' : 'C'}</strong></p>
        <p><strong style="color: red; font-weight: bold;"><b>Humidity:</b> ${current.humidity}%</strong></p>
        <p><strong style="color: red; font-weight: bold;"><b>Wind:</b> ${current.wind_mph} mph ${current.wind_dir}</strong></p>
        <p><strong style="color: red; font-weight: bold;"><b>Feels Like:</b> ${displayFahrenheit ? current.feelslike_f : current.feelslike_c} &deg;${displayFahrenheit ? 'F' : 'C'}</strong></p>


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