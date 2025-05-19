// Configuration file for environment variables
window.config = {
    OPENWEATHER_API_KEY: '0c286e13d68a43f9f57092b05b610fc6', // This should be moved to environment variables in production
    MAP_ZOOM_LEVEL: 10,
    DEFAULT_LOCATION: 'Delhi',
    CACHE_DURATION: 3600000, // 1 hour in milliseconds
    API_ENDPOINTS: {
        OPENWEATHER: 'https://api.openweathermap.org/data/2.5',
        GEOCODING: 'https://nominatim.openstreetmap.org'
    }
}; 