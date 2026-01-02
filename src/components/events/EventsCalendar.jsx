"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { SAMPLE_EVENTS } from "./EventCard";

export default function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return SAMPLE_EVENTS.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateEvents = getEventsForSelectedDate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-600/10 px-4 py-2 rounded-full border border-blue-600/20 mb-4">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Events Calendar
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Plan Your Training Schedule
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our upcoming events by date and plan your professional development journey.
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Calendar Header */}
                <div className="bg-blue-900 text-white p-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-bold">
                      {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-6">
                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {daysOfWeek.map(day => (
                      <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                      const dayEvents = getEventsForDate(day);
                      const isToday = day && day.toDateString() === new Date().toDateString();
                      const isSelected = selectedDate && day && day.toDateString() === selectedDate.toDateString();
                      
                      return (
                        <button
                          key={index}
                          onClick={() => day && setSelectedDate(day)}
                          className={`aspect-square p-2 text-sm rounded-lg transition-all duration-200 ${
                            !day
                              ? 'cursor-default'
                              : isSelected
                              ? 'bg-blue-900 text-white'
                              : isToday
                              ? 'bg-blue-100 text-blue-900 font-semibold'
                              : dayEvents.length > 0
                              ? 'bg-yellow-50 text-yellow-900 hover:bg-yellow-100'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {day && (
                            <>
                              <div className="font-medium">{day.getDate()}</div>
                              {dayEvents.length > 0 && (
                                <div className="text-xs mt-1">
                                  {dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}
                                </div>
                              )}
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Events for Selected Date */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {selectedDate ? (
                    <>Events for {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}</>
                  ) : (
                    'Select a date to view events'
                  )}
                </h3>

                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map(event => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                            {event.title}
                          </h4>
                          <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded text-xs font-medium ml-2">
                            {event.category}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-bold text-blue-900">{event.price}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : selectedDate ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No events scheduled for this date</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Click on a date to view events</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


