import React from 'react';
import { Bike, Umbrella, Sun, Wind } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface ActivityRecommendationsProps {
  data: WeatherData;
}

export default function ActivityRecommendations({ data }: ActivityRecommendationsProps) {
  const getActivities = () => {
    const activities = [];
    const { temp_c, uv, wind_kph, precip_mm } = data.current;

    if (temp_c >= 20 && temp_c <= 28 && uv < 6 && wind_kph < 20) {
      activities.push({
        name: 'Outdoor Sports',
        icon: <Bike className="text-green-400" />,
        recommendation: 'Great conditions for outdoor activities!',
      });
    }

    if (precip_mm > 0) {
      activities.push({
        name: 'Rain Protection',
        icon: <Umbrella className="text-blue-400" />,
        recommendation: 'Bring an umbrella or raincoat.',
      });
    }

    if (uv >= 6) {
      activities.push({
        name: 'Sun Protection',
        icon: <Sun className="text-yellow-400" />,
        recommendation: 'Use sunscreen and wear protective clothing.',
      });
    }

    if (wind_kph > 20) {
      activities.push({
        name: 'Wind Alert',
        icon: <Wind className="text-orange-400" />,
        recommendation: 'Strong winds may affect outdoor activities.',
      });
    }

    return activities;
  };

  const activities = getActivities();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full">
      <h3 className="text-xl font-semibold text-white mb-4">Activity Recommendations</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
            {activity.icon}
            <div>
              <p className="text-white font-semibold">{activity.name}</p>
              <p className="text-white/70 text-sm">{activity.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}