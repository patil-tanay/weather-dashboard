import React from 'react';
import { Share2 } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface ShareWeatherProps {
  data: WeatherData;
  useCelsius: boolean;
}

export default function ShareWeather({ data, useCelsius }: ShareWeatherProps) {
  const shareText = `Current weather in ${data.location.name}: ${
    Math.round(useCelsius ? data.current.temp_c : data.current.temp_f)
  }°${useCelsius ? 'C' : 'F'}, ${
    data.current.condition.text
  }. Humidity: ${data.current.humidity}%, Wind: ${
    useCelsius ? data.current.wind_kph + ' km/h' : data.current.wind_mph + ' mph'
  }`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Weather Update',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('Weather information copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
    >
      <Share2 size={20} />
      Share Weather
    </button>
  );
}