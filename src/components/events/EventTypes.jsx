"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Presentation, Trophy, Shield, BookOpen, Radio, Wrench, Sparkles } from "lucide-react";
import Link from "next/link";
import { getActiveEventCategories, getEventCategoryStats } from "@/lib/api/eventCategory";
import { getAllEvents } from "@/lib/api/events";
import { Loader2 } from "lucide-react";

// Icon mapping for event categories
const iconMap = {
  'conference': Presentation,
  'conferences': Presentation,
  'workshop': Users,
  'workshops': Users,
  'seminar': BookOpen,
  'seminars': BookOpen,
  'training': Wrench,
  'meeting': Calendar,
  'competition': Trophy,
  'competitions': Trophy,
  'default': Sparkles
};

// Color mapping for event categories
const colorMap = {
  'blue': { gradient: "from-blue-500 to-blue-600", hover: "hover:shadow-blue-200", bullet: "from-blue-500 to-blue-600" },
  'green': { gradient: "from-green-500 to-green-600", hover: "hover:shadow-green-200", bullet: "from-green-500 to-green-600" },
  'yellow': { gradient: "from-yellow-500 to-yellow-600", hover: "hover:shadow-yellow-200", bullet: "from-yellow-500 to-yellow-600" },
  'orange': { gradient: "from-orange-500 to-orange-600", hover: "hover:shadow-orange-200", bullet: "from-orange-500 to-orange-600" },
  'red': { gradient: "from-red-500 to-red-600", hover: "hover:shadow-red-200", bullet: "from-red-500 to-red-600" },
  'purple': { gradient: "from-purple-500 to-purple-600", hover: "hover:shadow-purple-200", bullet: "from-purple-500 to-purple-600" },
  'indigo': { gradient: "from-indigo-500 to-indigo-600", hover: "hover:shadow-indigo-200", bullet: "from-indigo-500 to-indigo-600" },
  'pink': { gradient: "from-pink-500 to-pink-600", hover: "hover:shadow-pink-200", bullet: "from-pink-500 to-pink-600" },
  'teal': { gradient: "from-teal-500 to-teal-600", hover: "hover:shadow-teal-200", bullet: "from-teal-500 to-teal-600" },
};

// No default features - only show what's in the database

export default function EventTypes() {
  const [eventCategories, setEventCategories] = useState([]);
  const [eventCounts, setEventCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event categories and their counts from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch active event categories
        const categoriesResponse = await getActiveEventCategories();
        if (categoriesResponse.success && categoriesResponse.data) {
          const categories = categoriesResponse.data;
          
          // Fetch event counts for each category
          const counts = {};
          for (const category of categories) {
            try {
              const eventsResponse = await getAllEvents({
                eventType: category._id,
                limit: 1,
                page: 1
              });
              
              if (eventsResponse.success && eventsResponse.pagination) {
                counts[category._id] = eventsResponse.pagination.total || 0;
              } else {
                counts[category._id] = 0;
              }
            } catch (err) {
              console.error(`Error fetching count for category ${category.name}:`, err);
              counts[category._id] = 0;
            }
          }
          
          setEventCategories(categories);
          setEventCounts(counts);
        }
      } catch (err) {
        console.error('Error fetching event categories:', err);
        setError(err.message || 'Failed to load event types');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getIcon = (categoryName, slug) => {
    const name = (categoryName || slug || '').toLowerCase();
    for (const [key, Icon] of Object.entries(iconMap)) {
      if (name.includes(key)) {
        return Icon;
      }
    }
    return iconMap.default;
  };

  const getColor = (index) => {
    const colors = ['blue', 'green', 'orange', 'purple', 'indigo', 'pink', 'teal', 'yellow', 'red'];
    return colors[index % colors.length];
  };

  const getColorClasses = (color) => {
    const colorData = colorMap[color] || colorMap.blue;
    return colorData.gradient;
  };

  const getHoverClasses = (color) => {
    const colorData = colorMap[color] || colorMap.blue;
    return colorData.hover;
  };

  const getBulletClasses = (color) => {
    const colorData = colorMap[color] || colorMap.blue;
    return colorData.bullet;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading event types...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>Error loading event types: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (eventCategories.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>No event types available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Events We Host
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From large conferences to intimate workshops, we offer diverse event formats 
              to meet every learning and networking need in the BVT community.
            </p>
          </motion.div>
        </div>

        {/* Event Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventCategories.map((category, index) => {
            const Icon = getIcon(category.name, category.slug);
            const color = getColor(index);
            const eventCount = eventCounts[category._id] ?? 0;
            const displayCount = loading 
              ? '...' 
              : `${eventCount} ${eventCount === 1 ? 'Event' : 'Events'}`;
            
            // Use whatToExpect from category - only show if it exists
            const features = category.whatToExpect && Array.isArray(category.whatToExpect) && category.whatToExpect.length > 0
              ? category.whatToExpect.slice(0, 4)
              : [];
            
            return (
              <Link key={category._id || index} href={`/events/${category.slug || category._id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer relative flex flex-col h-full min-h-[5
                    300px] ${getHoverClasses(color)}`}
              >
                {/* Header */}
                  <div className={`bg-gradient-to-r ${getColorClasses(color)} p-6 text-white flex-shrink-0`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-12 h-12" />
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {displayCount}
                    </span>
                  </div>
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                      {category.description || 'Join us for this exciting event'}
                  </p>
                </div>

                {/* Features */}
                  <div className="p-6 flex-1 flex flex-col">
                    {features.length > 0 ? (
                      <>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What to Expect:</h4>
                        <ul className="space-y-3 flex-1">
                          {features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-gray-600">
                              <div className={`w-2 h-2 bg-gradient-to-r ${getBulletClasses(color)} rounded-full flex-shrink-0`}></div>
                              <span className="text-sm">{feature.trim()}</span>
                      </li>
                    ))}
                  </ul>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-400 text-sm italic">No expectations listed</p>
                      </div>
                    )}
                  
                  {/* Action Button */}
                    <div className={`w-full mt-6 bg-gradient-to-r ${getColorClasses(color)} text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity group-hover:scale-105 transform transition-transform text-center flex-shrink-0`}>
                      View {category.name}
                    </div>
                </div>

                {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${getColorClasses(color)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Host Your Own Event
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Have an idea for a BVT training event? Partner with us to create meaningful 
              experiences for the BVT community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Propose Event
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Partnership Info
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
