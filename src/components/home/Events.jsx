"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Clock, Loader2, Sparkles, Award, TrendingUp, Globe, Video } from "lucide-react";
import { getUpcomingEvents } from "@/lib/api/events";
import Link from "next/link";

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'TBA';
  const date = new Date(dateString);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// Format time helper
const formatTime = (dateString) => {
  if (!dateString) return 'TBA';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

// Get default image based on index
const getEventImage = (index) => {
  const images = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop"
  ];
  return images[index % images.length];
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUpcomingEvents({ 
          limit: 4
        });
        
        if (response.success && response.data) {
          // Filter out draft events
          const transformedEvents = response.data
            .filter(event => event.status !== 'draft') // Exclude draft events
            .map((event, index) => {
            // Calculate registered attendees count
            const registeredAttendees = Array.isArray(event.attendees) ? event.attendees.length : 0;
            const maxAttendees = event.maxAttendees || 100;
            
            // Format location
            let location = 'TBA';
            if (event.isOnline) {
              location = 'Online';
            } else if (event.location) {
              location = event.location;
            }
            
            // Format time
            let eventTime = 'TBA';
            if (event.startTime && event.endTime) {
              eventTime = `${event.startTime} - ${event.endTime}`;
            } else if (event.startTime) {
              eventTime = event.startTime;
            }
            
            return {
            id: event._id || event.id,
              _id: event._id,
            title: event.title || event.name,
            description: event.description || '',
              eventDate: event.startDate,
              endDate: event.endDate,
              eventTime: eventTime,
              location: location,
              maxAttendees: maxAttendees,
              registeredAttendees: registeredAttendees,
            image: event.eventImage || getEventImage(index),
              slug: event.slug || event._id || event.id, // Use slug if available, fallback to _id
              buttonLabel: "View Details",
              isOnline: event.isOnline || false,
              cost: event.cost || 0
            };
          });
          
          setEvents(transformedEvents);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-blue-50/50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/10 to-yellow-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 border-yellow-500/30 mb-6 shadow-lg"
          >
            <Calendar className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-700 uppercase tracking-wider">
              Upcoming Events
            </span>
            <Sparkles className="w-5 h-5 text-yellow-600 animate-pulse" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 bg-clip-text text-transparent mb-6">
            Events & Seminars
          </h2>
          <p className="text-lg md:text-xl text-gray-600 lg:w-6/12 max-w-3xl mx-auto leading-relaxed">
            Join our BVT training events, workshops, and seminars designed to enhance 
            your professional development and career growth.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="container mx-auto flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading Events...</p>
            </div>
          </div>
        ) : error && events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto text-center"
          >
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 inline-block">
              <p className="text-red-600 font-medium">Unable to load events. Please try again later.</p>
            </div>
          </motion.div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {events.map((event, idx) => {
              const seatsLeft = event.maxAttendees - event.registeredAttendees;
              const formattedDate = formatDate(event.eventDate);
              const formattedTime = formatTime(event.eventDate || event.eventTime);
              const dateParts = formattedDate.split(' ');
              const day = dateParts[1]?.replace(',', '') || '';
              const month = dateParts[0]?.substring(0, 3) || '';
              const seatsPercentage = Math.round((event.registeredAttendees / event.maxAttendees) * 100);
              
              return (
                <Link key={idx} href={`/events/details/${event.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ 
                      default: { delay: idx * 0.1, duration: 0.6, type: "spring" },
                      hover: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                    }}
                    className="group relative h-full bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-yellow-400/50"
                    style={{ willChange: 'transform' }}
                  >
                    {/* Event Image - Clear and Prominent */}
                    <div className="relative h-56 lg:h-64 overflow-hidden">
                      <img 
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover brightness-100 group-hover:brightness-110"
                        style={{ 
                          transform: 'scale(1)',
                          transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), brightness 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onError={(e) => {
                          e.target.src = getEventImage(idx);
                        }}
                      />
                      {/* Minimal overlay - only at bottom for text readability */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none"></div>

                      {/* Date Badge - Enhanced */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-4 left-4 bg-gradient-to-br from-yellow-500 to-yellow-400 px-4 py-3 rounded-xl border-2 border-white shadow-xl z-10"
                      >
                        <div className="text-2xl lg:text-3xl font-extrabold text-blue-950 leading-none">{day}</div>
                        <div className="text-xs font-bold text-blue-950 uppercase tracking-wider mt-1">{month}</div>
                      </motion.div>

                      {/* Online/Offline Badge */}
                      {event.isOnline ? (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 backdrop-blur-md px-3 py-1.5 rounded-lg border-2 border-white shadow-lg z-10">
                          <div className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-white" />
                            <span className="text-xs font-bold text-white uppercase">Online</span>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-700 to-gray-800 backdrop-blur-md px-3 py-1.5 rounded-lg border-2 border-white shadow-lg z-10">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-white" />
                            <span className="text-xs font-bold text-white uppercase">In-Person</span>
                          </div>
                        </div>
                      )}

                      {/* Seats Available Indicator */}
                      {seatsLeft > 0 && seatsLeft <= 10 && (
                        <div className="absolute bottom-4 left-4 bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30 shadow-lg z-10">
                          <span className="text-xs font-bold text-white">Only {seatsLeft} seats left!</span>
                        </div>
                      )}
                    </div>

                    {/* Event Content */}
                    <div className="p-6 lg:p-8 bg-gradient-to-b from-white to-blue-50/30">
                      {/* Event Title */}
                      <h3 className="mb-3 text-xl lg:text-2xl font-extrabold text-gray-900 leading-tight group-hover:text-blue-900 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {event.title}
                      </h3>
                      
                      {/* Event Description */}
                      <p className="mb-6 text-sm lg:text-base text-gray-600 line-clamp-3 leading-relaxed flex-1">
                        {event.description || 'Join us for this exciting event!'}
                      </p>

                      {/* Event Details - Enhanced */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm font-semibold text-blue-900">{event.eventTime || formattedTime}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                          {event.isOnline ? (
                            <Globe className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          ) : (
                            <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          )}
                          <span className="text-sm font-semibold text-gray-700 line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                            <Users className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                            <span className="text-sm font-semibold text-yellow-900">
                              {event.registeredAttendees}/{event.maxAttendees}
                            </span>
                          </div>
                          {event.cost !== undefined && (
                            <div className="bg-gradient-to-r from-green-50 to-green-100 px-3 py-2 rounded-lg border border-green-200">
                              <span className="text-sm font-bold text-green-700">
                                {event.cost === 0 ? 'FREE' : `$${event.cost}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar for Seats */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-600">Registration</span>
                          <span className="text-xs font-bold text-blue-600">{seatsPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${seatsPercentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
                          ></motion.div>
                        </div>
                      </div>

                      {/* CTA Button - Enhanced */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-6 py-3.5 rounded-xl font-bold hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all shadow-lg flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></span>
                        <span className="relative z-10 flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          <span>{event.buttonLabel}</span>
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </span>
                      </motion.div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 pointer-events-none overflow-hidden"
                    >
                      <motion.div
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      ></motion.div>
                    </motion.div>

                    {/* Decorative Corner Accent */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full"
                    ></motion.div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto text-center py-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border-2 border-gray-200 shadow-lg inline-block">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 font-medium">No upcoming events at the moment.</p>
            </div>
          </motion.div>
        )}

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl lg:rounded-3xl p-8 lg:p-12 border-2 border-blue-200 shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">
              Don't see an event for you?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Explore our complete calendar of upcoming events and seminars
            </p>
            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  <span>View All Events</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
