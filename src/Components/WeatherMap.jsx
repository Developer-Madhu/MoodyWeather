import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import i1 from 'leaflet/dist/images/marker-icon-2x.png'
import i2 from 'leaflet/dist/images/marker-icon.png'
import i3 from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: i1,
  iconUrl: i2,
  shadowUrl: i3,
});

// Import the getWeatherEmoji function from Homepage or create it here
const getWeatherEmoji = (weather) => {
  switch (weather.toLowerCase()) {
    case 'sunny':
      return '☀️';
    case 'rainy':
      return '☔';
    case 'stormy':
      return '⚡';
    case 'cloudy':
      return '☁️';
    case 'snowy':
      return '❄️';
    default:
      return '🌤️';
  }
};

const WeatherMap = ({ experiences }) => {
  // Default coordinates (center of US)
  const defaultPosition = [39.8283, -98.5795];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={4}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {experiences.map(experience => {
        if (experience.coordinates) {
          return (
            <Marker 
              key={experience.id} 
              position={experience.coordinates}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{experience.location}</h3>
                  <p>{experience.weather} {getWeatherEmoji(experience.weather)}</p>
                  <p>{experience.temperature} • {experience.humidity}</p>
                  <p className="text-sm mt-1">{experience.mood}</p>
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

export default WeatherMap; 