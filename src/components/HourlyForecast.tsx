import React from 'react';
import type { WeatherData } from '../types/weather';

interface HourlyForecastProps {
  data: WeatherData;
  useCelsius: boolean;
}

export default function HourlyForecast({ data, useCelsius }: HourlyForecastProps) {
  const currentHour = new Date().getHours();
  const next24Hours = data.forecast.forecastday
    .slice(0, 2)
    .flatMap(day => day.hour)
    .slice(currentHour, currentHour + 24);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full">
      <h3 className="text-xl font-semibold text-white mb-4">Hourly Forecast</h3>
      <div className="overflow-x-auto">
        <div className="flex space-x-6 min-w-max">
          {next24Hours.map((hour, index) => (
            <div key={hour.time} className="flex flex-col items-center">
              <p className="text-white/70 text-sm">
                {index === 0 ? 'Now' : new Date(hour.time).getHours() + ':00'}
              </p>
              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                className="w-8 h-8 my-2"
              />
              <p className="text-white font-semibold">
                {Math.round(useCelsius ? hour.temp_c : hour.temp_f)}°
              </p>
              <p className="text-white/70 text-sm">{hour.chance_of_rain}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}