"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ChevronRight, ChevronLeft, Sparkles, Award, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";

export default function EventsTimeline({ selectedTimeframe, onTimeframeChange, events = [], hideMaxAttendees = false }) {
  const scrollContainerRef = useRef(null);
  
  // Use provided events (required prop - no fallback)
  const allEvents = events || [];
  
  // Helper function to filter events by timeframe
  const filterEventsByTimeframe = (eventsList, timeframe) => {
    const now = new Date();
    
    switch (timeframe) {
      case "upcoming":
        return eventsList.filter(e => {
          const eventDate = new Date(e.date || e.startDate);
          return eventDate >= now;
        });
      case "this-month":
        return eventsList.filter(e => {
          const eventDate = new Date(e.date || e.startDate);
          return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
        });
      case "past":
        return eventsList.filter(e => {
          const eventDate = new Date(e.date || e.startDate);
          return eventDate < now;
        });
      default:
        return eventsList;
    }
  };

  // Calculate counts based on all events (not filtered)
  const timeframes = [
    { 
      id: "upcoming", 
      label: "Upcoming", 
      count: filterEventsByTimeframe(allEvents, "upcoming").length 
    },
    { 
      id: "this-month", 
      label: "This Month", 
      count: filterEventsByTimeframe(allEvents, "this-month").length 
    },
    { 
      id: "past", 
      label: "Past Events", 
      count: filterEventsByTimeframe(allEvents, "past").length 
    }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      // On mobile scroll by one card width (container width) so one card shows at a time
      const scrollAmount = scrollContainerRef.current.clientWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Get filtered events based on selected timeframe
  const getFilteredEvents = () => {
    const filtered = filterEventsByTimeframe(allEvents, selectedTimeframe);

    // Sort events based on timeframe
    const now = new Date();
    if (selectedTimeframe === "upcoming" || selectedTimeframe === "this-month") {
      return filtered.sort((a, b) => {
        const dateA = new Date(a.date || a.startDate);
        const dateB = new Date(b.date || b.startDate);
        return dateA - dateB; // Ascending (earliest first)
      });
    } else if (selectedTimeframe === "past") {
      return filtered.sort((a, b) => {
        const dateA = new Date(a.date || a.startDate);
        const dateB = new Date(b.date || b.startDate);
        return dateB - dateA; // Descending (most recent first)
      });
    }
    
    return filtered;
  };

  const filteredEvents = getFilteredEvents();

  const emptyPlaceholderLabels = {
    upcoming: "No upcoming events",
    "this-month": "No events this month",
    past: "No past events"
  };
  const emptyPlaceholderLabel = emptyPlaceholderLabels[selectedTimeframe] || "No events in this timeframe";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  // Derive registration/lifecycle status for an event (for badge and button)
  const getEventStatus = (event) => {
    const now = new Date();
    const start = event.startDate || event.date ? new Date(event.startDate || event.date) : null;
    const end = event.endDate ? new Date(event.endDate) : start;
    const regDeadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;

    const registrationClosed = regDeadline ? regDeadline < now : false;
    const isEnded = end ? end < now : (start ? start < now : false);
    const isOngoing = start && end && now >= start && now <= end;

    if (isEnded) return { label: "Event Ended", type: "ended", canRegister: false };
    if (isOngoing) return { label: "Ongoing", type: "ongoing", canRegister: false };
    if (registrationClosed) return { label: "Registration Closed", type: "registration-closed", canRegister: false };
    return { label: null, type: "open", canRegister: true };
  };

  return (
    <section className="relative py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-x-hidden overflow-y-visible">
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
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Events Timeline</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
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

          {/* Timeframe Selector - always visible so user can switch filters */}
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

          {/* Empty state: show placeholder and keep section visible so filters (Upcoming, This Month, Past) stay visible */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 lg:py-16 bg-white/60 rounded-2xl border-2 border-gray-200 border-dashed">
              <Calendar className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-semibold text-lg mb-2">{emptyPlaceholderLabel}</p>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-4">
                Switch to another filter above to see events.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {timeframes.filter(t => t.count > 0).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onTimeframeChange(t.id)}
                    className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    {t.label} ({t.count})
                  </button>
                ))}
              </div>
            </div>
          ) : (
          /* Horizontal Timeline - one card visible on mobile, scroll to see others */
          <div className="relative w-full">
            {/* Left Arrow Button - smaller on mobile */}
            <motion.button
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-xl rounded-full p-2 sm:p-3 lg:p-4 border-2 border-gray-200 hover:border-yellow-400 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-900" />
            </motion.button>

            {/* Right Arrow Button */}
            <motion.button
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-xl rounded-full p-2 sm:p-3 lg:p-4 border-2 border-gray-200 hover:border-yellow-400 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-900" />
            </motion.button>

            {/* Scroll Container - horizontal padding so arrows don't cover cards; snap one card at a time */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-visible pb-8 scrollbar-hide pl-12 pr-12 sm:pl-14 sm:pr-14 lg:pl-16 lg:pr-16 snap-x snap-mandatory"
            >
              <div className="inline-flex gap-4 sm:gap-6 lg:gap-8 relative pt-4 min-w-full">
                {/* Horizontal Timeline Line - position responsive to card height */}
                <div className="absolute top-28 sm:top-32 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 pointer-events-none"></div>

                {/* Events */}
                {filteredEvents.map((event, index) => {
                  const dateInfo = formatDate(event.date || event.startDate || new Date());
                  const eventImage = (event.image || event.eventImage) ? getImageUrl(event.image || event.eventImage) : null;
                  const eventSlug = event.slug || event.id || event._id;
                  const eventStatus = getEventStatus(event);
                  
                  return (
                    <motion.div
                      key={event.id || event._id || index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative flex flex-col items-center flex-shrink-0 w-[calc(100vw-7rem)] min-w-[calc(100vw-7rem)] sm:min-w-[260px] sm:w-72 lg:min-w-[280px] lg:w-80 snap-center"
                    >
                      {/* Date Display (Top) - slightly smaller on mobile */}
                      <div className="mb-3 sm:mb-4">
                        <motion.div
                          whileHover={{ scale: 1.1, y: -5 }}
                          className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg sm:rounded-xl shadow-xl p-3 sm:p-4 text-center border-2 border-yellow-400/30 min-w-[80px] sm:min-w-[90px]"
                        >
                          <div className="text-xl sm:text-2xl font-bold text-yellow-400">{dateInfo.day}</div>
                          <div className="text-[10px] sm:text-xs text-blue-200 font-medium">{dateInfo.month}</div>
                          <div className="text-[10px] sm:text-xs text-blue-300">{dateInfo.year}</div>
                        </motion.div>
                      </div>

                      {/* Timeline Node - smaller on mobile */}
                      <div className="relative z-10 mb-3 sm:mb-4">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 sm:border-4 border-white shadow-xl">
                          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-30"></div>
                        </div>
                      </div>

                      {/* Event Card - full width of slot; min-w-0 so content doesn't overflow */}
                      <div className="w-full min-w-0 flex-shrink-0">
                        <motion.div
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="group bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-yellow-400 h-full min-w-0"
                        >
                          {/* Event Image */}
                          <div className="relative h-48 overflow-hidden">
                            {eventImage ? (
                              <img
                                src={eventImage}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const placeholder = e.target.nextElementSibling;
                                  if (placeholder) placeholder.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className={`w-full h-full ${eventImage ? 'hidden' : 'flex'}`}>
                              <ImagePlaceholder type="event" className="w-full h-full" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            
                            {/* Badges: status (Registration Closed / Ongoing / Event Ended) and optional featured */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              {eventStatus.label && (
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                                  eventStatus.type === "ended"
                                    ? "bg-gray-600 text-white"
                                    : eventStatus.type === "ongoing"
                                    ? "bg-green-600 text-white"
                                    : "bg-amber-600 text-white"
                                }`}>
                                  {eventStatus.label}
                                </span>
                              )}
                              {event.badge && !eventStatus.label && (
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

                          {/* Event Content - tighter padding on mobile so card fits */}
                          <div className="p-3 sm:p-4 lg:p-6">
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

                            {/* Event Details and Price */}
                            <div className="mb-4">
                              <div className="space-y-2 mb-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-2 text-xs text-gray-700">
                                  <Clock className="w-4 h-4 text-blue-900" />
                                  <span className="font-medium">{event.time || 'TBA'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700">
                                  <MapPin className="w-4 h-4 text-blue-900" />
                                  <span className="line-clamp-1 font-medium">{event.location || 'TBA'}</span>
                                </div>
                                {!hideMaxAttendees && (
                                  <div className="flex items-center gap-2 text-xs text-gray-700">
                                    <Users className="w-4 h-4 text-blue-900" />
                                    <span className="font-medium">{event.attendees} attendees</span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Price - Better positioned */}
                              <div className="flex items-center justify-between pt-3 border-t border-gray-200 gap-2 min-w-0">
                                <span className="text-[10px] sm:text-xs text-gray-500 font-medium flex-shrink-0">Price</span>
                                {(() => {
                                  const costNOK = event.priceNOK || (event.price && typeof event.price === 'string' && event.price.startsWith('kr ') ? event.price.replace('kr ', '') : null);
                                  const costUSD = event.priceUSD || (event.price && typeof event.price === 'string' && event.price.startsWith('$') ? event.price.replace('$', '') : null);
                                  
                                  if (!costNOK && !costUSD) {
                                    return <div className="text-sm sm:text-base lg:text-xl font-bold text-green-600">Free</div>;
                                  }
                                  
                                  return (
                                    <div className="flex items-baseline gap-1 flex-shrink min-w-0">
                                      <div className="text-sm sm:text-base lg:text-xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent truncate">
                                        kr {costNOK || (costUSD ? (parseFloat(costUSD) * 10.5).toFixed(2) : '0')}
                                      </div>
                                      {costUSD && (
                                        <div className="text-[10px] sm:text-xs text-gray-500 font-medium flex-shrink-0">(${costUSD})</div>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>

                            {/* Action Button - text and style by status */}
                            <Link href={`/events/details/${eventSlug}`} className="block">
                              <motion.button
                                whileHover={eventStatus.canRegister ? { scale: 1.05, x: 5 } : {}}
                                whileTap={eventStatus.canRegister ? { scale: 0.95 } : {}}
                                className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                                  eventStatus.canRegister
                                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 hover:from-yellow-400 hover:to-yellow-500"
                                    : "bg-gray-200 text-gray-600 cursor-default"
                                }`}
                              >
                                {eventStatus.canRegister
                                  ? "Register Now"
                                  : eventStatus.type === "ongoing"
                                  ? "Event in progress"
                                  : eventStatus.type === "ended"
                                  ? "View details"
                                  : "Registration closed"}
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
          )}
        </div>
      </div>
    </section>
  );
}
