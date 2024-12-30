document.getElementById('fetchWeatherButton').addEventListener('click',()=>{fetchWeather()});

document.addEventListener('DOMContentLoaded', function() {
    const lastLocation = localStorage.getItem('lastLocation');
    if (lastLocation) {
        fetchWeather(lastLocation);
    }
});

function fetchWeather(location = null) {
    const locationInput = document.getElementById('locationInput');
    const locationName = location || locationInput.value;

    if (!locationName) {
        alert('Please enter a location.');
        return;
    }

    const apiKey = '23820aa8d4554156bf551441243012';
    const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationName}`;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationName}&days=3`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            updateCurrentWeather(data);
            localStorage.setItem('lastLocation', locationName);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Could not fetch current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            updateForecast(data.forecast.forecastday);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Could not fetch forecast data. Please try again.');
        });
}

function updateCurrentWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherImage = document.getElementById('weatherImage');
    const { location, current } = data;

    weatherInfo.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <p>${current.condition.text}</p>
        <p>Temperature: ${current.temp_c}°C</p>
        <p>Humidity: ${current.humidity}%</p>
    `;

    const time = new Date(location.localtime);
    const hour = time.getHours();

    if (hour >= 6 && hour < 18) {
        // Daytime
        if (current.condition.text.toLowerCase().includes('cloud')) {
            weatherImage.src = 'cloudy-day.png';
            document.body.style.backgroundColor = '#87CEEB'; // Light blue
            document.getElementById("Title").style.color = '#000000' // Black
        } else {
            weatherImage.src = 'sunny.png';
            document.body.style.backgroundColor = '#FFD700'; // Yellow
            document.getElementById("Title").style.color = '#000000' // Black
        }
    } else {
        // Nighttime
        if (current.condition.text.toLowerCase().includes('cloud')) {
            weatherImage.src = 'cloudy-night.png';
            document.body.style.backgroundColor = '#2C3E50'; // Dark blue
            document.getElementById("Title").style.color = '#FFFFFF' // White
        } else {
            weatherImage.src = 'moon.png';
            document.body.style.backgroundColor = '#1C1C1C'; // Dark
            document.getElementById("Title").style.color = '#FFFFFF' // White
        }
    }
}

function updateForecast(forecastDays) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';  

    forecastDays.forEach(day => {
        const forecastDate = new Date(day.date);
        const dayName = forecastDate.toLocaleDateString(undefined, { weekday: 'long' });

        const card = document.createElement('div');
        card.className = 'col-md-4 forecast-card';

        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${dayName}</h5>
                    <p class="card-text">${day.day.condition.text}</p>
                    <p class="card-text">Max Temp: ${day.day.maxtemp_c}°C</p>
                    <p class="card-text">Min Temp: ${day.day.mintemp_c}°C</p>
                </div>
            </div>
        `;

        forecastContainer.appendChild(card);
    });
}
