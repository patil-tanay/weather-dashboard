export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    precip_mm: number;
    wind_kph: number;
    wind_mph: number;
    wind_degree: number;
    wind_dir: string;
    gust_kph: number;
    gust_mph: number;
    feelslike_c: number;
    feelslike_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    heatindex_c: number;
    heatindex_f: number;
    uv: number;
    air_quality: {
      ['us-epa-index']: number;
      pm2_5: number;
      pm10: number;
      ['co']: number;
    };
    pressure_mb: number;
    vis_km: number;
    cloud: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          text: string;
          icon: string;
        };
        chance_of_rain: number;
        dewpoint_c: number;
        dewpoint_f: number;
        heatindex_c: number;
        heatindex_f: number;
        wind_kph: number;
        wind_mph: number;
        wind_degree: number;
        wind_dir: string;
        gust_kph: number;
        gust_mph: number;
      }>;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        daily_chance_of_rain: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
  alerts?: {
    alert: Array<{
      headline: string;
      severity: string;
      urgency: string;
      areas: string;
      category: string;
      desc: string;
      effective: string;
      expires: string;
    }>;
  };
}