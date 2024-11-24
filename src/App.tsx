import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HourlyForecast from './components/HourlyForecast';
import AstroInfo from './components/AstroInfo';
import WeatherMap from './components/WeatherMap';
import WeatherAlerts from './components/WeatherAlerts';
import WindInfo from './components/WindInfo';
import ComfortMetrics from './components/ComfortMetrics';
import ActivityRecommendations from './components/ActivityRecommendations';
import ShareWeather from './components/ShareWeather';
import FavoriteLocations from './components/FavoriteLocations';
import type { WeatherData } from './types/weather';

const API_KEY = '2768fada3ad34f1da5c73935242411';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useCelsius, setUseCelsius] = useState(true);

  const fetchWeather = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=yes&alerts=yes`
      );
      // console.log(response);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      () => {
        fetchWeather('London');
      }
    );
  }, []);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-violet-900 p-4 md:p-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <SearchBar onSearch={fetchWeather} />
            <div className="flex items-center gap-4">
              {weatherData && <ShareWeather data={weatherData} useCelsius={useCelsius} />}
              <button
                onClick={() => setUseCelsius(!useCelsius)}
                className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
              >
                Switch to °{useCelsius ? 'F' : 'C'}
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center text-white">
              <Loader2 className="animate-spin mr-2" />
              <span>Loading weather data...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/80 text-white px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {weatherData && !loading && (
            <>
              <WeatherAlerts alerts={weatherData.alerts} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <CurrentWeather data={weatherData} useCelsius={useCelsius} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WindInfo data={weatherData} useCelsius={useCelsius} />
                    <ComfortMetrics data={weatherData} useCelsius={useCelsius} />
                  </div>
                  <HourlyForecast data={weatherData} useCelsius={useCelsius} />
                  <Forecast data={weatherData} useCelsius={useCelsius} />
                </div>
                
                <div className="space-y-6">
                  <FavoriteLocations
                    currentLocation={{
                      name: weatherData.location.name,
                      lat: weatherData.location.lat,
                      lon: weatherData.location.lon,
                    }}
                    onSelectLocation={fetchWeather}
                  />
                  <WeatherMap
                    lat={weatherData.location.lat}
                    lon={weatherData.location.lon}
                    name={weatherData.location.name}
                  />
                  <AstroInfo data={weatherData} />
                  <ActivityRecommendations data={weatherData} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;