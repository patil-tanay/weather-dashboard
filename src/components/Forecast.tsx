import React from 'react';
import type { WeatherData } from '../types/weather';

interface ForecastProps {
  data: WeatherData;
  useCelsius: boolean;
}

export default function Forecast({ data, useCelsius }: ForecastProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full">
      <h3 className="text-xl font-semibold text-white mb-4">7-Day Forecast</h3>
      <div className="space-y-4">
        {data.forecast.forecastday.map((day) => (
          <div key={day.date} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-10 h-10"
              />
              <div>
                <p className="text-white">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                </p>
                <p className="text-white/70 text-sm">{day.day.condition.text}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white">
                {Math.round(useCelsius ? day.day.maxtemp_c : day.day.maxtemp_f)}° / 
                {Math.round(useCelsius ? day.day.mintemp_c : day.day.mintemp_f)}°
              </p>
              <p className="text-white/70 text-sm">
                Rain: {day.day.daily_chance_of_rain}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}