"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Star, Clock } from "lucide-react";
import { useState } from "react";
import { SAMPLE_EVENTS } from "./EventCard";
import Link from "next/link";

export default function FeaturedEvents() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get featured events
  const featuredEvents = SAMPLE_EVENTS.filter(event => event.featured).slice(0, 3);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredEvents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredEvents.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
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
                Featured Events
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Don't Miss These Exclusive Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our most popular and highly-rated events featuring industry experts 
              and cutting-edge BVT training programs.
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredEvents.map((event, index) => (
                <div key={event.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8">
                    {/* Event Image */}
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-80 object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                          {event.badge}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="space-y-6">
                      <div>
                        <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                          {event.category}
                        </span>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {event.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-6">
                          {event.description}
                        </p>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Date</div>
                            <div className="font-semibold text-gray-900">{formatDate(event.date)}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Time</div>
                            <div className="font-semibold text-gray-900">{event.time}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="font-semibold text-gray-900">{event.location}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Attendees</div>
                            <div className="font-semibold text-gray-900">
                              {event.attendees}/{event.maxAttendees} registered
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < Math.floor(event.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-gray-900">{event.rating}</span>
                        <span className="text-gray-500">({event.totalRatings} reviews)</span>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-blue-900">{event.price}</div>
                          {event.originalPrice && (
                            <div className="text-lg text-gray-400 line-through">{event.originalPrice}</div>
                          )}
                        </div>
                        <div className="flex gap-3">
                          <Link href={`/events/${event.id}`}>
                            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                              View Details
                            </button>
                          </Link>
                          <button className="border-2 border-blue-900 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-colors">
                            Register Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {featuredEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-900 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <Link href="/events">
            <button className="bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg">
              View All Events
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}


