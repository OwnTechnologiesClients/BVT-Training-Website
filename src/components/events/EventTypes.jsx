"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Presentation, Trophy, Shield, BookOpen, Radio, Wrench, Sparkles, ArrowRight, Award } from "lucide-react";
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
  'blue': { gradient: "from-blue-500 to-blue-600", bg: "from-blue-50 to-blue-100", hover: "hover:shadow-blue-200", bullet: "from-blue-500 to-blue-600" },
  'green': { gradient: "from-green-500 to-green-600", bg: "from-green-50 to-green-100", hover: "hover:shadow-green-200", bullet: "from-green-500 to-green-600" },
  'yellow': { gradient: "from-yellow-500 to-yellow-600", bg: "from-yellow-50 to-yellow-100", hover: "hover:shadow-yellow-200", bullet: "from-yellow-500 to-yellow-600" },
  'orange': { gradient: "from-orange-500 to-orange-600", bg: "from-orange-50 to-orange-100", hover: "hover:shadow-orange-200", bullet: "from-orange-500 to-orange-600" },
  'red': { gradient: "from-red-500 to-red-600", bg: "from-red-50 to-red-100", hover: "hover:shadow-red-200", bullet: "from-red-500 to-red-600" },
  'purple': { gradient: "from-purple-500 to-purple-600", bg: "from-purple-50 to-purple-100", hover: "hover:shadow-purple-200", bullet: "from-purple-500 to-purple-600" },
  'indigo': { gradient: "from-indigo-500 to-indigo-600", bg: "from-indigo-50 to-indigo-100", hover: "hover:shadow-indigo-200", bullet: "from-indigo-500 to-indigo-600" },
  'pink': { gradient: "from-pink-500 to-pink-600", bg: "from-pink-50 to-pink-100", hover: "hover:shadow-pink-200", bullet: "from-pink-500 to-pink-600" },
  'teal': { gradient: "from-teal-500 to-teal-600", bg: "from-teal-50 to-teal-100", hover: "hover:shadow-teal-200", bullet: "from-teal-500 to-teal-600" },
};

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

  const getBgClasses = (color) => {
    const colorData = colorMap[color] || colorMap.blue;
    return colorData.bg;
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
      <section className="py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p>Error loading event types: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (eventCategories.length === 0) {
    return (
      <section className="py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>No event types available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 lg:mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-blue-950" />
                </div>
              </motion.div>
              <div className="bg-blue-100 px-4 py-2 rounded-full border border-blue-200">
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Event Categories</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Types of Events We Host
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From large conferences to intimate workshops, we offer diverse event formats 
              to meet every learning and networking need in the BVT community.
            </p>
          </motion.div>

          {/* Event Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group relative bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all overflow-hidden cursor-pointer flex flex-col h-full min-h-[350px] ${getHoverClasses(color)}`}
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${getColorClasses(color)} p-6 lg:p-8 text-white flex-shrink-0 relative overflow-hidden`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-2 right-2 w-16 h-16 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="w-12 h-12 lg:w-14 lg:h-14" />
                          </motion.div>
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                            {displayCount}
                          </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-2">{category.name}</h3>
                        <p className="text-white/90 text-sm lg:text-base leading-relaxed line-clamp-2">
                          {category.description || 'Join us for this exciting event'}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="p-6 flex-1 flex flex-col">
                      {features.length > 0 ? (
                        <>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            What to Expect:
                          </h4>
                          <ul className="space-y-3 flex-1">
                            {features.map((feature, featureIndex) => (
                              <motion.li
                                key={featureIndex}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: featureIndex * 0.05 }}
                                className="flex items-center gap-3 text-gray-600"
                              >
                                <div className={`w-2 h-2 bg-gradient-to-r ${getBulletClasses(color)} rounded-full flex-shrink-0`}></div>
                                <span className="text-sm lg:text-base">{feature.trim()}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <div className="flex-1 flex items-center justify-center">
                          <p className="text-gray-400 text-sm italic">No expectations listed</p>
                        </div>
                      )}
                      
                      {/* Action Button */}
                      <motion.div
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full mt-6 bg-gradient-to-r ${getColorClasses(color)} text-white py-3 px-4 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg text-center flex items-center justify-center gap-2 flex-shrink-0`}
                      >
                        View {category.name}
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 lg:mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border-2 border-yellow-400/30">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Host Your Own Event</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                  Have an idea for a BVT training event? Partner with us to create meaningful 
                  experiences for the BVT community.
                </p>
                <div className="flex justify-center">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-8 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center gap-2"
                    >
                      Contact Us
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
