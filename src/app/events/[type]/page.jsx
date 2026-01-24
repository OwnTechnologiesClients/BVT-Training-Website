"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle, ArrowLeft, Calendar, Sparkles, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import EventCard from "@/components/events/EventCard";
import { getAllEvents, mapEventTypeToBackend } from "@/lib/api/events";
import { getEventCategoryBySlug, getEventCategoryById } from "@/lib/api/eventCategory";

// Map backend eventType to display names
const getEventTypeDisplayName = (type) => {
  const displayMap = {
    'conferences': 'Conferences',
    'workshops': 'Workshops',
    'competitions': 'Competitions',
    'drills-exercises': 'Drills & Exercises',
    'seminars': 'Seminars',
    'tech-demonstrations': 'Tech Demonstrations',
    'conference': 'Conferences',
    'workshop': 'Workshops',
    'seminar': 'Seminars',
    'training': 'Training',
    'meeting': 'Meetings'
  };
  
  return displayMap[type?.toLowerCase()] || type;
};

// Get event type description
const getEventTypeDescription = (type) => {
  const descriptions = {
    'conferences': 'Large-scale professional gatherings with keynote speakers and networking opportunities.',
    'workshops': 'Hands-on training sessions with interactive learning experiences.',
    'competitions': 'Skills competitions and challenges for BVT professionals.',
    'drills-exercises': 'Emergency response and tactical training simulations.',
    'seminars': 'Educational sessions on specific topics and best practices.',
    'tech-demonstrations': 'Showcasing latest BVT technology and equipment.',
  };
  
  return descriptions[type?.toLowerCase()] || 'Explore our events in this category.';
};

export default function EventTypePage() {
  const params = useParams();
  const router = useRouter();
  const typeSlug = params.type;
  
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, determine if typeSlug is an ObjectId or a slug
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(typeSlug);
        let categoryData = null;
        
        try {
          let categoryResponse;
          if (isObjectId) {
            // If it's an ObjectId, fetch by ID
            categoryResponse = await getEventCategoryById(typeSlug);
          } else {
            // Otherwise, try to fetch by slug
            categoryResponse = await getEventCategoryBySlug(typeSlug);
          }
          
          if (categoryResponse.success && categoryResponse.data) {
            categoryData = categoryResponse.data;
            setCategory(categoryData);
            
            // If we fetched by ID and got a slug, redirect to the slug URL for better SEO
            if (isObjectId && categoryData.slug && categoryData.slug !== typeSlug) {
              router.replace(`/events/${categoryData.slug}`, { scroll: false });
              return; // Exit early to prevent double fetch
            }
          }
        } catch (err) {
          // Category not found, will try eventType mapping
          console.warn('Failed to fetch event category:', err);
        }

        // Build query params
        const queryParams = {
          page: 1,
          limit: 100,
          sort_column: 'startDate',
          sort_direction: 'asc'
        };

        // If category found, filter by category ID
        if (categoryData?._id) {
          queryParams.eventType = categoryData._id;
        } else {
          // Fallback: try to map slug to eventType enum (for backward compatibility)
          const backendType = mapEventTypeToBackend(typeSlug);
          queryParams.eventType = backendType;
        }

        const response = await getAllEvents(queryParams);

        if (response.success && response.data) {
          // Filter out draft events and transform backend data to match frontend EventCard format
          const transformedEvents = response.data
            .filter(event => event.status !== 'draft') // Exclude draft events
            .map(event => {
            const attendeesCount = Array.isArray(event.attendees) ? event.attendees.length : 0;
            const maxAttendees = event.maxAttendees || 1; // Default to 1 to avoid division by zero
            
            return {
              id: event._id || event.id,
              _id: event._id,
              slug: event.slug || event._id || event.id, // Use slug if available, fallback to _id
              title: event.title,
              description: event.description || '',
              date: event.startDate || event.date || new Date().toISOString(),
              endDate: event.endDate,
              time: event.startTime && event.endTime 
                ? `${event.startTime} - ${event.endTime}`
                : event.startTime || 'TBA',
              location: event.isOnline ? 'Online' : (event.location || 'TBA'),
              category: event.category?.name || event.eventType || 'Event',
              attendees: attendeesCount,
              maxAttendees: maxAttendees,
              price: null, // Will use priceNOK/priceUSD instead
              priceNOK: event.costNOK || (event.cost ? (parseFloat(event.cost) * 10.5).toFixed(2) : null),
              priceUSD: event.costUSD || event.cost || null,
              originalPrice: null,
              originalPriceNOK: null,
              originalPriceUSD: null,
              image: event.eventImage || null,
              badge: (event.status === 'ongoing' || event.status === 'completed') ? null : event.status,
              featured: false,
              rating: 4.5,
              totalRatings: 0
            };
          });

          setEvents(transformedEvents);
        } else {
          setError(response.message || 'Failed to load events');
        }
      } catch (err) {
        setError(err.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    if (typeSlug) {
      fetchEvents();
    }
  }, [typeSlug]);

  const displayName = category?.name || getEventTypeDisplayName(typeSlug);
  const description = category?.description || getEventTypeDescription(typeSlug);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading {displayName}...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && events.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Events</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              Retry
            </button>
            <Link
              href="/events"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - Enhanced */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white py-8 lg:py-10 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Animated Circles */}
        <div className="absolute top-5 left-10 w-16 h-16 border-2 border-yellow-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-5 right-20 w-12 h-12 border-2 border-yellow-400/20 rounded-full animate-pulse delay-1000"></div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors group text-base"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Events</span>
            </Link>
          </motion.div>

          {/* Title and Description - Enhanced */}
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-blue-950" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                <span className="text-sm font-semibold uppercase tracking-wide">Event Type</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
            >
              <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                {displayName}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-0.5 w-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-3"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg lg:text-xl text-blue-100 mb-4 leading-relaxed"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-4 py-12">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event, index) => {
              // Ensure the event has the correct ID for the link
              const eventId = event.id || event._id;
              return (
                <EventCard
                  key={eventId}
                  {...event}
                  id={eventId}
                  index={index}
                  compact={false}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Events Found
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no {displayName.toLowerCase()} available. Check back soon for new events!
              </p>
              <Link
                href="/events"
                className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                View All Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

