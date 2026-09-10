// API Configuration
const API_BASE = 'https://api.openweathermap.org/data/2.5';
let API_KEY = localStorage.getItem('weatherApiKey') || '';

// DOM Elements
const apiKeyInput = document.getElementById('apiKey');
const saveApiKeyBtn = document.getElementById('saveApiKey');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const weatherContainer = document.getElementById('weatherContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const decodeWeatherBtn = document.getElementById('decodeWeatherBtn');
const englishWeatherInput = document.getElementById('englishWeather');
const germanWeatherInput = document.getElementById('germanWeather');
const decodedOutput = document.getElementById('decodedOutput');
const translationOutput = document.getElementById('translationOutput');

// Initialize
if (API_KEY) {
    apiKeyInput.value = API_KEY;
    document.querySelector('.api-setup').style.background = '#d4edda';
}

// Event Listeners
saveApiKeyBtn.addEventListener('click', saveApiKey);
searchBtn.addEventListener('click', () => searchCity(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCity(cityInput.value);
});
locationBtn.addEventListener('click', getLocationWeather);
decodeWeatherBtn.addEventListener('click', decodeWeatherTranslation);

// Save API Key
function saveApiKey() {
    const key = apiKeyInput.value.trim();
    if (!key) {
        showError('Please enter an API key');
        return;
    }
    API_KEY = key;
    localStorage.setItem('weatherApiKey', key);
    document.querySelector('.api-setup').style.background = '#d4edda';
    showSuccess('API key saved successfully!');
}

// Search for a city
async function searchCity(city) {
    if (!city.trim()) {
        showError('Please enter a city name');
        return;
    }
    if (!API_KEY) {
        showError('Please set your API key first');
        return;
    }
    
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE}/weather?q=${city}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        await displayWeather(data);
        cityInput.value = '';
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// Get weather by user's location
function getLocationWeather() {
    if (!API_KEY) {
        showError('Please set your API key first');
        return;
    }
    
    if (navigator.geolocation) {
        showLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`${API_BASE}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
                    if (!response.ok) throw new Error('Failed to get weather');
                    const data = await response.json();
                    await displayWeather(data);
                } catch (error) {
                    showError(error.message);
                } finally {
                    showLoading(false);
                }
            },
            () => {
                showError('Could not access your location');
                showLoading(false);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser');
    }
}

// Display weather data
async function displayWeather(data) {
    const { name, sys, main, weather, wind, visibility, clouds } = data;
    const { lat, lon } = data.coord;

    // Update current weather
    document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('weatherDescription').textContent = weather[0].main;
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('sunrise').textContent = formatTime(sys.sunrise);

    // Weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;

    // Populate English weather for translation
    const weatherText = `${weather[0].main}. Humidity ${main.humidity}%. Wind speed ${wind.speed}. Temperature ${Math.round(main.temp)} degrees.`;
    englishWeatherInput.value = weatherText;

    // Fetch additional data (hourly and UVI)
    try {
        const oneCallResponse = await fetch(`${API_BASE}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (oneCallResponse.ok) {
            const oneCallData = await oneCallResponse.json();
            document.getElementById('uvi').textContent = Math.round(oneCallData.current.uvi);
            displayHourlyForecast(oneCallData.hourly);
            displayDailyForecast(oneCallData.daily);
        }
    } catch (error) {
        console.error('Could not fetch additional data:', error);
    }

    weatherContainer.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

// Display hourly forecast
function displayHourlyForecast(hourlyData) {
    const forecastDiv = document.getElementById('hourlyForecast');
    forecastDiv.innerHTML = '';
    
    hourlyData.slice(0, 24).forEach(hour => {
        const date = new Date(hour.dt * 1000);
        const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
        
        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <div class="time">${timeString}</div>
            <img src="${iconUrl}" alt="Weather">
            <div class="temp">${Math.round(hour.temp)}°C</div>
        `;
        forecastDiv.appendChild(card);
    });
}

// Display daily forecast
function displayDailyForecast(dailyData) {
    const forecastDiv = document.getElementById('dailyForecast');
    forecastDiv.innerHTML = '';
    
    dailyData.slice(0, 5).forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleString('en-US', { weekday: 'short' });
        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        
        const card = document.createElement('div');
        card.className = 'daily-card';
        card.innerHTML = `
            <div class="day">${dayName}</div>
            <img src="${iconUrl}" alt="Weather">
            <div class="temps">
                <span class="max-temp">${Math.round(day.temp.max)}°</span>
                <span class="min-temp">${Math.round(day.temp.min)}°</span>
            </div>
            <div style="font-size: 0.9em; color: #7f8c8d;">${day.weather[0].main}</div>
        `;
        forecastDiv.appendChild(card);
    });
}

// Decode weather translation (Birkenbihl method)
function decodeWeatherTranslation() {
    const englishText = englishWeatherInput.value.trim();
    const germanText = germanWeatherInput.value.trim();
    const outputDiv = translationOutput;
    
    if (!englishText || !germanText) {
        showError('Please fill in both English and German text fields');
        return;
    }

    // Split into words
    const englishWords = englishText.split(/\s+/);
    const germanWords = germanText.split(/\s+/);

    outputDiv.innerHTML = '';

    // Create word pairs
    const maxLength = Math.max(englishWords.length, germanWords.length);
    
    for (let i = 0; i < maxLength; i++) {
        const wordPair = document.createElement('div');
        wordPair.className = 'word-pair';

        const englishWord = document.createElement('span');
        englishWord.className = 'foreign-word';
        englishWord.innerText = englishWords[i] || '—';

        const germanWord = document.createElement('span');
        germanWord.className = 'decoded-word';
        germanWord.innerText = germanWords[i] || '—';

        wordPair.appendChild(englishWord);
        wordPair.appendChild(germanWord);
        outputDiv.appendChild(wordPair);
    }

    decodedOutput.classList.remove('hidden');
}

// Utility Functions
function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function showLoading(show) {
    loadingSpinner.classList.toggle('hidden', !show);
}

function showError(message) {
    errorMessage.textContent = '❌ ' + message;
    errorMessage.classList.remove('hidden');
    weatherContainer.classList.add('hidden');
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = 'background: #d4edda; color: #155724; padding: 10px 20px; border-radius: 6px; margin: 10px 30px; border: 1px solid #c3e6cb;';
    successDiv.textContent = '✅ ' + message;
    document.querySelector('.api-setup').parentElement.insertBefore(successDiv, document.querySelector('.api-setup').nextSibling);
    setTimeout(() => successDiv.remove(), 3000);
}