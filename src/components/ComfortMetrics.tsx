import React from 'react';
import { Droplets, Thermometer } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface ComfortMetricsProps {
  data: WeatherData;
  useCelsius: boolean;
}

export default function ComfortMetrics({ data, useCelsius }: ComfortMetricsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full">
      <div className="flex items-center gap-2 mb-4">
        <Thermometer className="text-orange-400" />
        <h3 className="text-xl font-semibold text-white">Comfort Metrics</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Droplets className="text-blue-300" />
            <div>
              <p className="text-white/70">Dew Point</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(useCelsius ? data.current.dewpoint_c : data.current.dewpoint_f)}°
                {useCelsius ? 'C' : 'F'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Thermometer className="text-red-300" />
            <div>
              <p className="text-white/70">Heat Index</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(useCelsius ? data.current.heatindex_c : data.current.heatindex_f)}°
                {useCelsius ? 'C' : 'F'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}