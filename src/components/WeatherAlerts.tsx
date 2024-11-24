import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherAlertsProps {
  alerts?: WeatherData['alerts'];
}

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (!alerts?.alert?.length) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-yellow-400" />
        <h3 className="text-xl font-semibold text-white">Weather Alerts</h3>
      </div>
      <div className="space-y-4">
        {alerts.alert.map((alert, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-sm">
                {alert.severity}
              </span>
              <span className="text-white/70 text-sm">
                Until {new Date(alert.expires).toLocaleString()}
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">{alert.headline}</h4>
            <p className="text-white/70 text-sm">{alert.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}