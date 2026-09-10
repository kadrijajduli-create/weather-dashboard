# Weather Dashboard 🌤️

A modern, interactive weather dashboard that fetches real-time weather data from the OpenWeatherMap API. Features include current weather display, hourly forecasts, 5-day forecasts, and integrated word-for-word translation (Birkenbihl method) for learning weather vocabulary in German.

## Features

✨ **Real-Time Weather Data**
- Current temperature, humidity, wind speed, pressure
- Weather description and "feels like" temperature
- UV index, visibility, sunrise/sunset times
- Weather icons for visual representation

⏰ **Forecasts**
- Hourly forecast for the next 24 hours
- 5-day daily forecast with high/low temperatures
- Interactive weather cards with hover effects

🔍 **Location Search**
- Search weather by city name
- Use current GPS location with "Use My Location" button
- Supports all major cities worldwide

📖 **Word-for-Word Translation (Birkenbihl Method)**
- Decode English weather descriptions into German
- Visual word pairing for language learning
- Perfect for learning weather vocabulary naturally

🎨 **Modern UI/UX**
- Responsive design (desktop, tablet, mobile)
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Intuitive interface

## Getting Started

### Prerequisites
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kadrijajduli-create/weather-dashboard.git
cd weather-dashboard
```

2. Open `index.html` in your web browser

3. Get a free API key:
   - Visit [openweathermap.org](https://openweathermap.org/api)
   - Sign up for a free account
   - Copy your API key from the API keys section

4. Enter your API key in the dashboard:
   - Click the API key input field
   - Paste your key
   - Click "Save API Key"

### Usage

1. **Search by City**: Type a city name and click "Search" or press Enter
2. **Use Location**: Click "📍 Use My Location" to get weather for your current location
3. **View Weather Details**: See comprehensive weather information including hourly and daily forecasts
4. **Learn with Translation**: 
   - English weather description auto-fills from the weather data
   - Add a German word-for-word translation
   - Click "Decode Translation" to see word pairs aligned

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: OpenWeatherMap API (Free tier)
- **Storage**: LocalStorage for API key
- **APIs Used**:
  - Current Weather API
  - OneCall API (for hourly and daily forecasts, UV index)

## File Structure

```
weather-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # JavaScript logic and API calls
└── README.md           # Documentation
```

## API Key Setup

### Free Tier Limitations
- Up to 60 calls per minute
- Historical weather data available
- No commercial use

### Getting an API Key

1. Go to [OpenWeatherMap Sign Up](https://home.openweathermap.org/users/register)
2. Create a free account
3. Go to [API Keys](https://home.openweathermap.org/api_keys)
4. Copy the default API key
5. Paste it in the dashboard's API key input field

## Features Explained

### Current Weather Display
Shows:
- City name and country
- Current temperature with "feels like" value
- Weather condition with icon
- Humidity, wind speed, pressure
- Visibility, UV index, sunrise time

### Hourly Forecast
- Next 24 hours displayed as cards
- Time, weather icon, temperature
- Hover effects for better interactivity

### Daily Forecast
- 5-day forecast
- High/low temperatures
- Weather conditions
- Responsive grid layout

### Birkenbihl Translation Method
- Input English weather description
- Provide German word-for-word translation
- Decode to see aligned word pairs
- Natural language learning approach

## Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Design

- Desktop: Full 2-column layout for weather details
- Tablet: Adjusted grid layout
- Mobile: Single column, optimized touch interactions

## Future Enhancements

- [ ] Multiple cities comparison
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Advanced weather charts
- [ ] Dark mode toggle
- [ ] Metric/Imperial unit toggle
- [ ] Export weather data as PDF
- [ ] Multi-language support for translations
- [ ] Saved locations/favorites
- [ ] Weather radar integration

## Troubleshooting

### "City not found"
- Check spelling of the city name
- Try using the full city name (e.g., "San Francisco" instead of "SF")
- Use "Use My Location" as an alternative

### "API key error"
- Verify your API key is correct
- Ensure it's copied completely without extra spaces
- Check that your OpenWeatherMap account is activated

### "Geolocation not working"
- Enable location access in browser settings
- Check that you're using HTTPS or localhost
- Some browsers require user permission

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## License

MIT License - see LICENSE file for details

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Birkenbihl method for language learning

## Support

For issues, questions, or suggestions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include screenshots if applicable

---

**Learn weather vocabulary naturally with the Birkenbihl method!** 🌍