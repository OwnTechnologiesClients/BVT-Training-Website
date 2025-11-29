"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ChevronRight, Star, ChevronLeft, Sparkles, Award, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { SAMPLE_EVENTS } from "./EventCard";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function EventsTimeline({ selectedTimeframe, onTimeframeChange, events = [] }) {
  const scrollContainerRef = useRef(null);
  
  // Use provided events or fallback to SAMPLE_EVENTS
  const displayEvents = events.length > 0 ? events : SAMPLE_EVENTS;
  
  const timeframes = [
    { id: "upcoming", label: "Upcoming", count: displayEvents.filter(e => new Date(e.date || e.startDate) >= new Date()).length },
    { id: "this-month", label: "This Month", count: displayEvents.filter(e => {
      const eventDate = new Date(e.date || e.startDate);
      const now = new Date();
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
    }).length },
    { id: "past", label: "Past Events", count: displayEvents.filter(e => new Date(e.date || e.startDate) < new Date()).length }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getFilteredEvents = () => {
    if (events.length > 0) {
      return events;
    }

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

  const filteredEvents = getFilteredEvents();
  
  // Handle empty state
  if (filteredEvents.length === 0) {
    return (
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found in this timeframe.</p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

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
            className="text-center mb-12 lg:mb-16"
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
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Events Timeline</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Events Timeline
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our events in a chronological timeline format. See what's coming up, 
              what's happening this month, or browse past events.
            </p>
          </motion.div>

          {/* Timeframe Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {timeframes.map((timeframe) => (
              <motion.button
                key={timeframe.id}
                onClick={() => onTimeframeChange(timeframe.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-200 ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-gradient-to-r from-blue-900 to-blue-950 text-white shadow-lg border-2 border-yellow-400/30'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-yellow-400'
                }`}
              >
                {timeframe.label}
                <span className={`ml-2 px-2.5 py-1 rounded-full text-xs font-bold ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {timeframe.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Horizontal Timeline */}
          <div className="relative w-full">
            {/* Left Arrow Button */}
            <motion.button
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-xl rounded-full p-4 border-2 border-gray-200 hover:border-yellow-400 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-blue-900" />
            </motion.button>

            {/* Right Arrow Button */}
            <motion.button
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-xl rounded-full p-4 border-2 border-gray-200 hover:border-yellow-400 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-blue-900" />
            </motion.button>

            {/* Scroll Container */}
            <div ref={scrollContainerRef} className="overflow-x-auto overflow-y-visible pb-8 scrollbar-hide mx-16">
              <div className="inline-flex gap-8 relative pt-4 px-8 min-w-full">
                {/* Horizontal Timeline Line */}
                <div className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 pointer-events-none"></div>

                {/* Events */}
                {filteredEvents.map((event, index) => {
                  const dateInfo = formatDate(event.date || event.startDate || new Date());
                  const eventImage = getImageUrl(event.image || event.eventImage);
                  const eventSlug = event.slug || event.id || event._id;
                  
                  return (
                    <motion.div
                      key={event.id || event._id || index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative flex flex-col items-center flex-shrink-0"
                    >
                      {/* Date Display (Top) */}
                      <div className="mb-4">
                        <motion.div
                          whileHover={{ scale: 1.1, y: -5 }}
                          className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl shadow-xl p-4 text-center border-2 border-yellow-400/30 min-w-[90px]"
                        >
                          <div className="text-2xl font-bold text-yellow-400">{dateInfo.day}</div>
                          <div className="text-xs text-blue-200 font-medium">{dateInfo.month}</div>
                          <div className="text-xs text-blue-300">{dateInfo.year}</div>
                        </motion.div>
                      </div>

                      {/* Timeline Node */}
                      <div className="relative z-10 mb-4">
                        <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-4 border-white shadow-xl">
                          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-30"></div>
                        </div>
                      </div>

                      {/* Event Card */}
                      <div className="w-80 flex-shrink-0">
                        <motion.div
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="group bg-white rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-yellow-400 h-full"
                        >
                          {/* Event Image */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={eventImage}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            
                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              {event.badge && (
                                <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                  {event.badge}
                                </span>
                              )}
                              {event.featured && (
                                <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                  <Award className="w-3 h-3" />
                                  Featured
                                </span>
                              )}
                            </div>

                            {/* Category */}
                            <div className="absolute bottom-4 left-4">
                              <span className="bg-white/90 backdrop-blur-sm text-blue-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                {event.category || 'Event'}
                              </span>
                            </div>
                          </div>

                          {/* Event Content */}
                          <div className="p-5 lg:p-6">
                            {/* Title */}
                            <Link href={`/events/details/${eventSlug}`}>
                              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] hover:text-blue-900 transition-colors cursor-pointer">
                                {event.title}
                              </h3>
                            </Link>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                              {event.description}
                            </p>

                            {/* Event Details */}
                            <div className="space-y-2 mb-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                              <div className="flex items-center gap-2 text-xs text-gray-700">
                                <Clock className="w-4 h-4 text-blue-900" />
                                <span className="font-medium">{event.time || 'TBA'}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-700">
                                <MapPin className="w-4 h-4 text-blue-900" />
                                <span className="line-clamp-1 font-medium">{event.location || 'TBA'}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-700">
                                <Users className="w-4 h-4 text-blue-900" />
                                <span className="font-medium">{event.attendees || 0}/{event.maxAttendees || 0} attendees</span>
                              </div>
                            </div>

                            {/* Rating and Price */}
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                              <div className="flex items-center gap-1">
                                <div className="flex items-center gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(event.rating || 4.5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                  ))}
                                </div>
                                <span className="text-xs font-bold text-gray-900 ml-1">{event.rating || 4.5}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">{event.price || 'Free'}</div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <Link href={`/events/details/${eventSlug}`}>
                              <motion.button
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 py-3 px-4 rounded-xl text-sm font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2"
                              >
                                Register Now
                                <ArrowRight className="w-4 h-4" />
                              </motion.button>
                            </Link>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Scroll Hint */}
            {filteredEvents.length > 3 && (
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
      </div>
    </section>
  );
}
