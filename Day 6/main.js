document.getElementById('fetchWeatherButton').addEventListener('click', ()=>{fetchWeather()});

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
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateDOM(data);
            localStorage.setItem('lastLocation', locationName);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not fetch weather data. Please try again.');
        });
}

function updateDOM(data) {
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
        } else {
            weatherImage.src = 'sunny.png';
            document.body.style.backgroundColor = '#FFD700'; // Yellow
        }
    } else {
        // Nighttime
        if (current.condition.text.toLowerCase().includes('cloud')) {
            weatherImage.src = 'cloudy-night.png';
            document.body.style.backgroundColor = '#2C3E50'; // Dark blue
        } else {
            weatherImage.src = 'moon.png';
            document.body.style.backgroundColor = '#1C1C1C'; // Dark
        }
    }
}
