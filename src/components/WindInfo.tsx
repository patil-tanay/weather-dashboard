import React from 'react';
import { Wind as WindIcon, Navigation } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WindInfoProps {
  data: WeatherData;
  useCelsius: boolean;
}

export default function WindInfo({ data, useCelsius }: WindInfoProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full">
      <div className="flex items-center gap-2 mb-4">
        <WindIcon className="text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Wind Details</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70">Direction</p>
              <p className="text-2xl font-bold text-white">{data.current.wind_dir}</p>
            </div>
            <Navigation
              className="text-blue-300"
              style={{ transform: `rotate(${data.current.wind_degree}deg)` }}
            />
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-white/70">Wind Speed</p>
          <p className="text-2xl font-bold text-white">
            {useCelsius
              ? `${Math.round(data.current.wind_kph)} km/h`
              : `${Math.round(data.current.wind_mph)} mph`}
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-white/70">Wind Gust</p>
          <p className="text-2xl font-bold text-white">
            {useCelsius
              ? `${Math.round(data.current.gust_kph)} km/h`
              : `${Math.round(data.current.gust_mph)} mph`}
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-white/70">Feels Like</p>
          <p className="text-2xl font-bold text-white">
            {Math.round(useCelsius ? data.current.feelslike_c : data.current.feelslike_f)}°
            {useCelsius ? 'C' : 'F'}
          </p>
        </div>
      </div>
    </div>
  );
}