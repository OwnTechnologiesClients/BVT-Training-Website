"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { SAMPLE_EVENTS } from "./EventCard";

export default function EventsTimeline({ selectedTimeframe, onTimeframeChange }) {
  const timeframes = [
    { id: "upcoming", label: "Upcoming", count: SAMPLE_EVENTS.filter(e => new Date(e.date) >= new Date()).length },
    { id: "this-month", label: "This Month", count: SAMPLE_EVENTS.filter(e => {
      const eventDate = new Date(e.date);
      const now = new Date();
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
    }).length },
    { id: "past", label: "Past Events", count: SAMPLE_EVENTS.filter(e => new Date(e.date) < new Date()).length }
  ];

  const getFilteredEvents = () => {
    const now = new Date();
    switch (selectedTimeframe) {
      case "upcoming":
        return SAMPLE_EVENTS.filter(e => new Date(e.date) >= now).sort((a, b) => new Date(a.date) - new Date(b.date));
      case "this-month":
        return SAMPLE_EVENTS.filter(e => {
          const eventDate = new Date(e.date);
          return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
      case "past":
        return SAMPLE_EVENTS.filter(e => new Date(e.date) < now).sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return SAMPLE_EVENTS;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  const events = getFilteredEvents();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Events Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our events in a chronological timeline format. See what's coming up, 
              what's happening this month, or browse past events.
            </p>
          </motion.div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.id}
              onClick={() => onTimeframeChange(timeframe.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedTimeframe === timeframe.id
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {timeframe.label}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                selectedTimeframe === timeframe.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {timeframe.count}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200"></div>

            {/* Events */}
            <div className="space-y-8">
              {events.map((event, index) => {
                const dateInfo = formatDate(event.date);
                const isLeft = index % 2 === 0;
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Timeline Node */}
                    <div className={`absolute left-8 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 ${isLeft ? 'transform -translate-x-2' : 'transform translate-x-2'}`}>
                      <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20"></div>
                    </div>

                    {/* Event Card */}
                    <div className={`w-5/12 ${isLeft ? 'ml-16 mr-auto' : 'mr-16 ml-auto'}`}>
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                        {/* Event Image */}
                        <div className="relative h-48">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            {event.badge && (
                              <span className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
                                {event.badge}
                              </span>
                            )}
                          </div>
                          <div className="absolute top-4 right-4">
                            {event.featured && (
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Event Content */}
                        <div className="p-6">
                          {/* Date Badge */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                              {event.category}
                            </div>
                            <div className="text-sm text-gray-500">{event.level}</div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                            {event.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {event.description}
                          </p>

                          {/* Event Details */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{dateInfo.weekday}, {dateInfo.month} {dateInfo.day}, {dateInfo.year}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees}/{event.maxAttendees} attendees</span>
                            </div>
                          </div>

                          {/* Rating and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(event.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{event.rating}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-blue-900">{event.price}</div>
                              {event.originalPrice && event.originalPrice !== "Free" && (
                                <div className="text-sm text-gray-400 line-through">{event.originalPrice}</div>
                              )}
                            </div>
                          </div>

                          {/* Action Button */}
                          <button className="w-full mt-4 bg-blue-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                            Register Now
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Date Display */}
                    <div className={`w-2/12 flex flex-col items-center ${isLeft ? 'ml-4' : 'mr-4'}`}>
                      <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-100">
                        <div className="text-2xl font-bold text-blue-900">{dateInfo.day}</div>
                        <div className="text-sm text-gray-600">{dateInfo.month}</div>
                        <div className="text-xs text-gray-500">{dateInfo.year}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Load More */}
        {events.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Load More Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
}


