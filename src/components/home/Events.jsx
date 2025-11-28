"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Clock, Loader2 } from "lucide-react";
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
    <section className="py-20 px-8 bg-gray-50 relative overflow-hidden">
      {/* Simple Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto mb-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
          <Calendar className="w-4 h-4 text-blue-900" />
          <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
            Upcoming Events
          </span>
        </div>
        <h2 className="mb-4 text-4xl md:text-5xl font-bold text-gray-900">
          Events & Seminars
        </h2>
        <p className="mx-auto w-full px-4 font-normal text-lg text-gray-500 lg:w-6/12">
          Join our BVT training events, workshops, and seminars designed to enhance 
          your professional development and career growth.
        </p>
      </div>

      {loading ? (
        <div className="container mx-auto flex items-center justify-center min-h-[400px] relative z-10">
          <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
        </div>
      ) : error && events.length === 0 ? (
        <div className="container mx-auto text-center relative z-10">
          <p className="text-red-600">Unable to load events. Please try again later.</p>
        </div>
      ) : events.length > 0 ? (
        <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 relative z-10">
          {events.map((event, idx) => {
            const seatsLeft = event.maxAttendees - event.registeredAttendees;
            const formattedDate = formatDate(event.eventDate);
            const formattedTime = formatTime(event.eventDate || event.eventTime);
            const dateParts = formattedDate.split(' ');
            const day = dateParts[1]?.replace(',', '') || '';
            const month = dateParts[0] || '';
            
            return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all border border-gray-200 h-full flex flex-col"
          >
            {/* Event Image/Header */}
            <div className={`relative h-48 overflow-hidden`}>
              <img 
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg shadow-lg">
                <div className="text-2xl font-bold leading-none">{day}</div>
                <div className="text-xs font-semibold uppercase">{month}</div>
              </div>
              
              {/* Center Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-8xl font-bold">
                  {idx + 1}
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6 flex-1 flex flex-col">
              <Link
                href={`/events/details/${event.slug}`}
                className="text-gray-900 transition-colors hover:text-blue-900"
              >
                <h3 className="mb-3 text-xl font-bold leading-tight">
                  {event.title}
                </h3>
              </Link>
              
              <p className="mb-6 font-normal text-gray-600 flex-1 line-clamp-3">
                {event.description || 'Join us for this exciting event!'}
              </p>

              {/* Event Details */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-900" />
                  <span>{event.eventTime || formattedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-900" />
                  <span>{event.location}</span>
                </div>
                {event.cost !== undefined && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold text-blue-900">
                      {event.cost === 0 ? 'Free' : `$${event.cost}`}
                    </span>
                  </div>
                )}
              </div>

              {/* Button */}
              <Link href={`/events/details/${event.slug}`}>
                <button className="w-full bg-gradient-to-r from-blue-900 to-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 group">
                  {event.buttonLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="container mx-auto text-center relative z-10">
          <p className="text-gray-600">No upcoming events at the moment.</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16 relative z-10">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white px-8 py-6 rounded-2xl shadow-xl border border-gray-200">
          <div className="text-left">
            <p className="text-blue-900 font-bold text-lg">Don't see an event for you?</p>
            <p className="text-gray-600 text-sm">View all upcoming events and seminars</p>
          </div>
          <Link href="/events">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors whitespace-nowrap shadow-lg">
              View All Events
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
