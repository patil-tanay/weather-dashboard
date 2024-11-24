import React from 'react';
import { Sunrise, Sunset, Moon } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface AstroInfoProps {
  data: WeatherData;
}

export default function AstroInfo({ data }: AstroInfoProps) {
  const today = data.forecast.forecastday[0];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full">
      <h3 className="text-xl font-semibold text-white mb-4">Sun & Moon</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <Sunrise className="text-yellow-300" />
          <div>
            <p className="text-sm text-white/70">Sunrise</p>
            <p className="text-lg font-semibold text-white">{today.astro.sunrise}</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <Sunset className="text-orange-300" />
          <div>
            <p className="text-sm text-white/70">Sunset</p>
            <p className="text-lg font-semibold text-white">{today.astro.sunset}</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
          <Moon className="text-blue-300" />
          <div>
            <p className="text-sm text-white/70">Moon Phase</p>
            <p className="text-lg font-semibold text-white">{today.astro.moon_phase}</p>
          </div>
        </div>
      </div>
    </div>
  );
}