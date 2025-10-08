"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ChevronRight, Star, ChevronLeft } from "lucide-react";
import { useState, useRef } from "react";
import { SAMPLE_EVENTS } from "./EventCard";

export default function EventsTimeline({ selectedTimeframe, onTimeframeChange }) {
  const scrollContainerRef = useRef(null);
  
  const timeframes = [
    { id: "upcoming", label: "Upcoming", count: SAMPLE_EVENTS.filter(e => new Date(e.date) >= new Date()).length },
    { id: "this-month", label: "This Month", count: SAMPLE_EVENTS.filter(e => {
      const eventDate = new Date(e.date);
      const now = new Date();
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
    }).length },
    { id: "past", label: "Past Events", count: SAMPLE_EVENTS.filter(e => new Date(e.date) < new Date()).length }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Scroll by 400px
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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

        {/* Horizontal Timeline */}
        <div className="relative w-full">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 border border-gray-200 transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-blue-900" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 border border-gray-200 transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-blue-900" />
          </button>

          {/* Scroll Container */}
          <div ref={scrollContainerRef} className="overflow-x-auto overflow-y-visible pb-8 scrollbar-hide mx-12">
            <div className="inline-flex gap-8 relative pt-4 px-8 min-w-full">
              {/* Horizontal Timeline Line */}
              <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 pointer-events-none"></div>

              {/* Events */}
              {events.map((event, index) => {
                  const dateInfo = formatDate(event.date);
                  
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative flex flex-col items-center flex-shrink-0"
                    >
                      {/* Date Display (Top) */}
                      <div className="mb-4">
                        <div className="bg-white rounded-xl shadow-md p-3 text-center border border-gray-100 min-w-[80px]">
                          <div className="text-xl font-bold text-blue-900">{dateInfo.day}</div>
                          <div className="text-xs text-gray-600">{dateInfo.month}</div>
                          <div className="text-xs text-gray-500">{dateInfo.year}</div>
                        </div>
                      </div>

                      {/* Timeline Node */}
                      <div className="relative z-10 mb-4">
                        <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg">
                          <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20"></div>
                        </div>
                      </div>

                      {/* Event Card */}
                      <div className="w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                          {/* Event Image */}
                          <div className="relative h-44">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3">
                              {event.badge && (
                                <span className="bg-yellow-500 text-blue-900 px-2 py-1 rounded-full text-xs font-bold">
                                  {event.badge}
                                </span>
                              )}
                            </div>
                            <div className="absolute top-3 right-3">
                              {event.featured && (
                                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Event Content */}
                          <div className="p-5">
                            {/* Category Badge */}
                            <div className="flex items-center gap-2 mb-3">
                              <div className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full text-xs font-medium">
                                {event.category}
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                              {event.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                              {event.description}
                            </p>

                            {/* Event Details */}
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <MapPin className="w-3 h-3" />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Users className="w-3 h-3" />
                                <span>{event.attendees}/{event.maxAttendees} attendees</span>
                              </div>
                            </div>

                            {/* Rating and Price */}
                            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                              <div className="flex items-center gap-1">
                                <div className="flex items-center gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(event.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                  ))}
                                </div>
                                <span className="text-xs font-medium text-gray-900 ml-1">{event.rating}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-base font-bold text-blue-900">{event.price}</div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-blue-900 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                              Register Now
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>

          {/* Scroll Hint */}
          {events.length > 3 && (
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Use arrows to navigate through events
                <ChevronRight className="w-4 h-4" />
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


