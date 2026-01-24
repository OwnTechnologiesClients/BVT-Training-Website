"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import {
  EventsHero,
  EventsTimeline,
  EventTypes
} from "@/components/events";
import { getAllEvents } from "@/lib/api/events";
import { getEventCategoryBySlug } from "@/lib/api/eventCategory";

function EventsContent() {
  const searchParams = useSearchParams();
  const themeSlug = searchParams.get('theme');
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventTypesLoaded, setEventTypesLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("upcoming");
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Handle EventTypes loading completion
  const handleEventTypesLoadComplete = useCallback(() => {
    setEventTypesLoaded(true);
  }, []);

  // Fetch theme category if theme slug is provided
  useEffect(() => {
    const fetchTheme = async () => {
      if (themeSlug) {
        try {
          const themeResponse = await getEventCategoryBySlug(themeSlug);
          if (themeResponse.success && themeResponse.data) {
            setSelectedTheme(themeResponse.data);
          }
        } catch (err) {
          // Theme fetch failed, continue without theme filter
        }
      } else {
        setSelectedTheme(null);
      }
    };

    fetchTheme();
  }, [themeSlug]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query params
        const queryParams = {
          page: 1, 
          limit: 100
        };

        // If theme is selected, filter by eventType (which is the EventCategory ID)
        if (selectedTheme?._id) {
          queryParams.eventType = selectedTheme._id;
        }

        const eventsResponse = await getAllEvents(queryParams);

        if (eventsResponse.success && eventsResponse.data) {
          // Filter out draft events and transform backend data to match frontend format
          const transformedEvents = eventsResponse.data
            .filter(event => event.status !== 'draft') // Exclude draft events
            .map(event => {
              const attendeesCount = Array.isArray(event.attendees) ? event.attendees.length : 0;
              const maxAttendees = event.maxAttendees || 0;
              
              return {
            id: event._id || event.id,
            _id: event._id,
                slug: event.slug || event._id || event.id, // Use slug if available, fallback to _id
            title: event.title,
            description: event.description || '',
            date: event.date || event.startDate,
            endDate: event.endDate,
                time: event.startTime && event.endTime 
                  ? `${event.startTime} - ${event.endTime}`
                  : event.startTime || 'TBA',
                location: event.isOnline ? 'Online' : (event.location || 'TBA'),
                category: event.category?.name || event.eventType?.name || 'Event',
                attendees: attendeesCount,
                maxAttendees: maxAttendees,
                price: null, // Will use priceNOK/priceUSD instead
                priceNOK: event.costNOK || (event.cost ? (parseFloat(event.cost) * 10.5).toFixed(2) : null),
                priceUSD: event.costUSD || event.cost || null,
                originalPrice: null,
                originalPriceNOK: null,
                originalPriceUSD: null,
            image: event.eventImage || event.image || null,
                badge: (event.status === 'ongoing' || event.status === 'completed') ? null : event.status,
                featured: false,
                rating: 4.5,
                totalRatings: 0
              };
            });

          setEvents(transformedEvents);
        }
      } catch (err) {
        setError(err.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedTheme]);

  const handleTimeframeChange = useCallback((timeframe) => {
    setSelectedTimeframe(timeframe);
  }, []);

  // Don't filter events here - let EventsTimeline handle filtering
  // This ensures counts match the displayed events
  const filteredEvents = events;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading events...</p>
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
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <EventsHero />
      <EventTypes onLoadComplete={handleEventTypesLoadComplete} />
      {selectedTheme && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-900 to-blue-950 border-b-2 border-yellow-400/30 py-6"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1">
                  Showing events for: <span className="text-yellow-400">{selectedTheme.name}</span>
                </h3>
                {selectedTheme.description && (
                  <p className="text-sm text-blue-200">{selectedTheme.description}</p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/events'}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-2 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                Clear filter
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
      {/* Only render Timeline after EventTypes has finished loading */}
      {eventTypesLoaded && (
        <EventsTimeline 
          selectedTimeframe={selectedTimeframe} 
          onTimeframeChange={handleTimeframeChange}
          events={filteredEvents}
          hideMaxAttendees={!!selectedTheme}
        />
      )}
    </>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    }>
      <EventsContent />
    </Suspense>
  );
}
