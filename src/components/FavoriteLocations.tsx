import React, { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';

interface FavoriteLocation {
  name: string;
  lat: number;
  lon: number;
}

interface FavoriteLocationsProps {
  currentLocation: {
    name: string;
    lat: number;
    lon: number;
  };
  onSelectLocation: (location: string) => void;
}

export default function FavoriteLocations({
  currentLocation,
  onSelectLocation,
}: FavoriteLocationsProps) {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('weatherFavorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = () => {
    const newFavorites = favorites.some(fav => fav.name === currentLocation.name)
      ? favorites.filter(fav => fav.name !== currentLocation.name)
      : [...favorites, currentLocation];

    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (name: string) => {
    const newFavorites = favorites.filter(fav => fav.name !== name);
    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Favorite Locations</h3>
        <button
          onClick={toggleFavorite}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Star
            className={favorites.some(fav => fav.name === currentLocation.name)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-white/70'}
          />
        </button>
      </div>
      <div className="space-y-2">
        {favorites.map(location => (
          <div
            key={location.name}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
          >
            <button
              onClick={() => onSelectLocation(`${location.lat},${location.lon}`)}
              className="text-white hover:text-white/80 transition-colors text-left flex-1"
            >
              {location.name}
            </button>
            <button
              onClick={() => removeFavorite(location.name)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <Trash2 size={16} className="text-white/70" />
            </button>
          </div>
        ))}
        {favorites.length === 0 && (
          <p className="text-white/70 text-sm">No favorite locations yet</p>
        )}
      </div>
    </div>
  );
}