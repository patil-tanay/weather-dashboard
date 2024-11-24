import React from 'react';
import { Droplets, Thermometer, Wind, CloudRain, Sun, Eye, Gauge, CloudFog } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherData;
  useCelsius: boolean;
}

const getAirQualityText = (index: number) => {
  const levels = ['Good', 'Moderate', 'Unhealthy for sensitive groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
  return levels[index - 1] || 'Unknown';
};

export default function CurrentWeather({ data, useCelsius }: CurrentWeatherProps) {
  const todayForecast = data.forecast.forecastday[0];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">{data.location.name}</h2>
          <p className="text-white/70">{data.location.region}, {data.location.country}</p>
          <p className="text-white/70">{new Date(data.location.localtime).toLocaleString()}</p>
        </div>
        <img
          src={data.current.condition.icon}
          alt={data.current.condition.text}
          className="w-16 h-16"
        />
      </div>

      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-white mb-2">
          {Math.round(useCelsius ? data.current.temp_c : data.current.temp_f)}°{useCelsius ? 'C' : 'F'}
        </div>
        <p className="text-xl text-white/90">{data.current.condition.text}</p>
        <p className="text-white/70">
          Feels like {Math.round(useCelsius ? data.current.feelslike_c : data.current.feelslike_f)}°{useCelsius ? 'C' : 'F'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <Droplets className="text-blue-300" />
          <div>
            <p className="text-sm text-white/70">Humidity</p>
            <p className="text-lg font-semibold text-white">{data.current.humidity}%</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <CloudRain className="text-blue-300" />
          <div>
            <p className="text-sm text-white/70">Rain Chance</p>
            <p className="text-lg font-semibold text-white">{todayForecast.day.daily_chance_of_rain}%</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <Thermometer className="text-orange-300" />
          <div>
            <p className="text-sm text-white/70">Precipitation</p>
            <p className="text-lg font-semibold text-white">{data.current.precip_mm} mm</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <Wind className="text-green-300" />
          <div>
            <p className="text-sm text-white/70">Wind Speed</p>
            <p className="text-lg font-semibold text-white">
              {useCelsius ? `${Math.round(data.current.wind_kph)} km/h` : `${Math.round(data.current.wind_mph)} mph`}
            </p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <Sun className="text-yellow-300" />
          <div>
            <p className="text-sm text-white/70">UV Index</p>
            <p className="text-lg font-semibold text-white">{data.current.uv}</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <Eye className="text-purple-300" />
          <div>
            <p className="text-sm text-white/70">Visibility</p>
            <p className="text-lg font-semibold text-white">{data.current.vis_km} km</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <Gauge className="text-red-300" />
          <div>
            <p className="text-sm text-white/70">Pressure</p>
            <p className="text-lg font-semibold text-white">{data.current.pressure_mb} mb</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <CloudFog className="text-gray-300" />
          <div>
            <p className="text-sm text-white/70">Cloud Cover</p>
            <p className="text-lg font-semibold text-white">{data.current.cloud}%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white/5 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Air Quality</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-white/70">Status</p>
            <p className="text-lg font-semibold text-white">{getAirQualityText(data.current.air_quality['us-epa-index'])}</p>
          </div>
          <div>
            <p className="text-sm text-white/70">PM2.5</p>
            <p className="text-lg font-semibold text-white">{Math.round(data.current.air_quality.pm2_5)} µg/m³</p>
          </div>
        </div>
      </div>
    </div>
  );
}