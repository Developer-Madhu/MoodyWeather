import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiBell, FiMap, FiUser } from 'react-icons/fi';
import WeatherMap from './WeatherMap';

const mockExperiences = [
  {
    id: 1,
    user: "Priya Sharma",
    location: "Mumbai",
    coordinates: [19.0760, 72.8777], // Mumbai coordinates
    weather: "Sunny",
    temperature: "32°C",
    humidity: "75%",
    mood: "Enjoying the coastal breeze! ☀️",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800",
    timestamp: "2 hours ago",
    outfit: "Light cotton saree with sunglasses"
  },
  {
    id: 2,
    user: "Rahul Kumar",
    location: "Delhi",
    coordinates: [28.6139, 77.2090], // Delhi coordinates
    weather: "Cloudy",
    temperature: "28°C",
    humidity: "65%",
    mood: "Perfect weather for chai ☕",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
    timestamp: "4 hours ago",
    outfit: "Casual cotton kurta"
  },
  {
    id: 3,
    user: "Anjali Patel",
    location: "Bangalore",
    coordinates: [12.9716, 77.5946], // Bangalore coordinates
    weather: "Rainy",
    temperature: "24°C",
    humidity: "85%",
    mood: "Enjoying the pleasant monsoon! ☔",
    image: "https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&w=600",
    timestamp: "6 hours ago",
    outfit: "Light jacket with umbrella"
  },
  {
    id: 4,
    user: "Vikram Singh",
    location: "Jaipur",
    coordinates: [26.9124, 75.7873], // Jaipur coordinates
    weather: "Sunny",
    temperature: "35°C",
    humidity: "45%",
    mood: "Exploring the Pink City! 🏰",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    timestamp: "5 hours ago",
    outfit: "Traditional Rajasthani attire"
  },
  {
    id: 5,
    user: "Maya Reddy",
    location: "Chennai",
    coordinates: [13.0827, 80.2707], // Chennai coordinates
    weather: "Sunny",
    temperature: "33°C",
    humidity: "80%",
    mood: "Beach vibes at Marina! 🌊",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
    timestamp: "3 hours ago",
    outfit: "Light cotton dress with hat"
  }
];

const weatherAlerts = [
  {
    id: 1,
    type: "severe",
    message: "Severe thunderstorm warning in your area",
    timestamp: "10 minutes ago"
  },
  {
    id: 2,
    type: "moderate",
    message: "High humidity alert",
    timestamp: "1 hour ago"
  }
];

const weatherOptions = [
  { value: 'sunny', label: 'Sunny ☀️' },
  { value: 'rainy', label: 'Rainy ☔' },
  { value: 'cloudy', label: 'Cloudy ☁️' },
  { value: 'stormy', label: 'Stormy ⚡' },
  { value: 'snowy', label: 'Snowy ❄️' }
];

const getWeatherEmoji = (weather) => {
  const weatherType = weather.toLowerCase().trim();
  const weatherMap = {
    'sunny': '☀️',
    'rainy': '☔',
    'stormy': '⚡',
    'cloudy': '☁️',
    'snowy': '❄️'
  };
  return weatherMap[weatherType] || '🌤️';
};

const getMoodEmoji = (mood) => {
  if (mood.toLowerCase().includes('happy')) return '😊';
  if (mood.toLowerCase().includes('cozy')) return '🛋️';
  if (mood.toLowerCase().includes('energetic')) return '⚡';
  if (mood.toLowerCase().includes('storm')) return '⛈️';
  return '🌤️';
};

const getCoordinates = async (location) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    const data = await response.json();
    if (data && data[0]) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

const Homepage = () => {
  const [experiences, setExperiences] = useState(mockExperiences);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [newPost, setNewPost] = useState({
    user: "",
      mood: "",
      image: "",
      location: "",
      weather: "",
      temperature: "70°F",
      humidity: "65%",
      outfit: ""
    });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPost.user.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!weatherOptions.some(option => option.value === newPost.weather)) {
      alert('Please select a valid weather condition');
      return;
    }

    const coordinates = await getCoordinates(newPost.location);
    
    const newExperience = {
      id: experiences.length + 1,
      ...newPost,
      coordinates,
      timestamp: "Just now",
      outfit: generateOutfitSuggestion(newPost.temperature, newPost.humidity),
      weatherEmoji: getWeatherEmoji(newPost.weather),
      moodEmoji: getMoodEmoji(newPost.mood)
    };

    setExperiences([newExperience, ...experiences]);
    
    setNewPost({
      user: "",
      mood: "",
      image: "",
      location: "",
      weather: "",
      temperature: "70°F",
      humidity: "65%",
      outfit: ""
    });
  };

  const generateOutfitSuggestion = (temp, humidity) => {
    const tempNum = parseInt(temp);
    if (tempNum > 30) return "Light cotton clothes with sunscreen";
    if (tempNum > 20) return "Casual wear with light jacket";
    return "Light layers with rain protection";
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex flex-col">
            <h1 className={`text-5xl font-bold mb-2 relative ${
              isDarkMode 
                ? 'text-white' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600'
            }`}>
              Weather Experiences
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                className={`h-1 mt-2 rounded-full ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400'
                    : 'bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600'
                }`}
              />
            </h1>
            <p className={`text-lg ${
              isDarkMode 
                ? 'text-gray-300' 
                : 'text-gray-600'
            }`}>
              Share your weather moments with the world
              <span className="ml-2">✨</span>
            </p>
          </div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAlerts(!showAlerts)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                  : 'bg-white hover:bg-gray-100 shadow-md'
              }`}
            >
              <FiBell className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMap(!showMap)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                  : 'bg-white hover:bg-gray-100 shadow-md'
              }`}
            >
              <FiMap className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                  : 'bg-white hover:bg-gray-100 shadow-md'
              }`}
            >
              {isDarkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Weather Alerts Panel */}
        <AnimatePresence>
          {showAlerts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className={`rounded-xl shadow-lg p-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h2 className="text-xl font-semibold mb-4">Weather Alerts</h2>
                {weatherAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg mb-2 ${
                      alert.type === 'severe' 
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                    }`}
                  >
                    <p>{alert.message}</p>
                    <span className="text-sm">{alert.timestamp}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Map Panel */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className={`rounded-xl shadow-lg p-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h2 className="text-xl font-semibold mb-4">Weather Map</h2>
                <div className="h-96 rounded-lg overflow-hidden">
                  <WeatherMap experiences={experiences} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Post Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-1 rounded-xl shadow-lg p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  value={newPost.user}
                  onChange={(e) => setNewPost({ ...newPost, user: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">How's the weather making you feel?</label>
                <input
                  type="text"
                  value={newPost.mood}
                  onChange={(e) => setNewPost({ ...newPost, mood: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="e.g., Rainy and cozy vibes today ☔"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={newPost.location}
                  onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="e.g., New York"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Temperature</label>
                <input
                  type="text"
                  value={newPost.temperature}
                  onChange={(e) => setNewPost({ ...newPost, temperature: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="e.g., 72°F"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Humidity</label>
                <input
                  type="text"
                  value={newPost.humidity}
                  onChange={(e) => setNewPost({ ...newPost, humidity: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="e.g., 65%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  value={newPost.image}
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Paste image URL here"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weather</label>
                <select
                  value={newPost.weather}
                  onChange={(e) => setNewPost({ ...newPost, weather: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="" disabled>Select weather condition</option>
                  {weatherOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Share Experience
              </button>
            </form>
          </motion.div>

          {/* Experience Feed */}
          <div className="lg:col-span-2 space-y-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl shadow-lg overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="relative h-64">
                  <img
                    src={experience.image}
                    alt={experience.weather}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl drop-shadow-lg">{getWeatherEmoji(experience.weather)}</span>
                      <h3 className="text-white text-xl font-bold drop-shadow-lg">{experience.location}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <FiUser className="w-5 h-5 text-blue-700 dark:text-blue-200" />
                      </div>
                      <span style={{ color: isDarkMode ? 'white' : '#000000' }} className="font-semibold text-lg">
                        {experience.user}
                      </span>
                    </div>
                    <span style={{ color: isDarkMode ? 'white' : '#000000' }} className="text-sm font-medium">
                      {experience.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl">
                        {getWeatherEmoji(experience.weather)}
                      </span>
                      <span style={{ color: isDarkMode ? 'white' : '#000000' }} className="font-semibold">
                        {experience.weather.charAt(0).toUpperCase() + experience.weather.slice(1)}
                      </span>
                    </div>
                    <span style={{ color: isDarkMode ? 'white' : '#000000' }}>•</span>
                    <span style={{ color: isDarkMode ? 'white' : '#000000' }} className="font-semibold">
                      {experience.temperature}
                    </span>
                    <span style={{ color: isDarkMode ? 'white' : '#000000' }}>•</span>
                    <span style={{ color: isDarkMode ? 'white' : '#000000' }} className="font-semibold">
                      {experience.humidity}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getMoodEmoji(experience.mood)}</span>
                      <p style={{ color: isDarkMode ? 'white' : '#000000' }} className="text-lg font-semibold">
                        {experience.mood}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">👕</span>
                      <div>
                        <p style={{ color: isDarkMode ? 'white' : '#000000' }} className="font-semibold">
                          Outfit Suggestion
                        </p>
                        <p style={{ color: isDarkMode ? 'white' : '#000000' }} className="font-medium">
                          {experience.outfit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
