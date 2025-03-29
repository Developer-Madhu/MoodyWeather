import React, { useState } from 'react';
import { motion } from 'framer-motion';

const mockExperiences = [
  {
    id: 1,
    user: "Sarah Johnson",
    location: "New York",
    weather: "Sunny",
    temperature: "72°F",
    mood: "Happy and energetic! ☀️",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    user: "Mike Chen",
    location: "Seattle",
    weather: "Rainy",
    temperature: "58°F",
    mood: "Cozy vibes with my coffee ☔",
    image: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800",
    timestamp: "4 hours ago"
  },
  {
    id: 3,
    user: "Emma Davis",
    location: "Miami",
    weather: "Stormy",
    temperature: "82°F",
    mood: "Watching the lightning show ⚡",
    image: "https://images.unsplash.com/photo-1501630834273-4b79f9ff9766?w=800",
    timestamp: "6 hours ago"
  }
];

const Homepage = () => {
  const [experiences, setExperiences] = useState(mockExperiences);
  const [newPost, setNewPost] = useState({
    mood: "",
    image: "",
    location: "",
    weather: "Sunny", // Default weather
    temperature: "70°F", // Default temperature
    user: "Current User" // Default user
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new experience
    const newExperience = {
      id: experiences.length + 1,
      ...newPost,
      timestamp: "Just now"
    };

    // Add new experience to the beginning of the list
    setExperiences([newExperience, ...experiences]);
    
    // Reset form
    setNewPost({
      mood: "",
      image: "",
      location: "",
      weather: "Sunny",
      temperature: "70°F",
      user: "Current User"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather Experiences</h1>
          <p className="text-gray-600">Share your weather moments with the world</p>
        </motion.div>

        {/* New Post Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How's the weather making you feel?
              </label>
              <input
                type="text"
                value={newPost.mood}
                onChange={(e) => setNewPost({ ...newPost, mood: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Rainy and cozy vibes today ☔"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={newPost.location}
                onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., New York"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={newPost.image}
                onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Paste image URL here"
              />
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
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={experience.image}
                  alt={experience.weather}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-xl font-semibold">{experience.location}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{experience.user}</span>
                  <span className="text-sm text-gray-500">{experience.timestamp}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{experience.weather === "Sunny" ? "☀️" : experience.weather === "Rainy" ? "☔" : "⚡"}</span>
                  <span className="text-gray-600">{experience.temperature}</span>
                </div>
                <p className="text-gray-700">{experience.mood}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
