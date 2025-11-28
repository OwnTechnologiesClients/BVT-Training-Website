"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import {
  EventsHero,
  EventsTimeline,
  EventTypes
} from "@/components/events";
import { getAllEvents } from "@/lib/api/events";
import { getEventCategoryBySlug } from "@/lib/api/eventCategory";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const themeSlug = searchParams.get('theme');
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("upcoming");
  const [selectedTheme, setSelectedTheme] = useState(null);

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
          console.error('Error fetching theme:', err);
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
                price: event.cost === 0 || event.cost === null || event.cost === undefined ? 'Free' : `$${event.cost}`,
                originalPrice: null,
            image: event.eventImage || event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
                badge: (event.status === 'ongoing' || event.status === 'completed') ? null : event.status,
                featured: false,
                rating: 4.5,
                totalRatings: 0
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
  }, [selectedTheme]);

  const handleTimeframeChange = useCallback((timeframe) => {
    setSelectedTimeframe(timeframe);
  }, []);

  // Filter events based on timeframe
  const filteredEvents = events.filter(event => {
    if (selectedTimeframe === 'all') return true;
    if (selectedTimeframe === 'upcoming') {
      const eventDate = new Date(event.date || event.startDate);
      return eventDate >= new Date();
    }
    if (selectedTimeframe === 'past') {
      const eventDate = new Date(event.date || event.startDate);
      return eventDate < new Date();
    }
    return event.status === selectedTimeframe;
  });

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
      <EventTypes />
      {selectedTheme && (
        <div className="bg-blue-50 border-b border-blue-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Showing events for: <span className="text-blue-600">{selectedTheme.name}</span>
                </h3>
                {selectedTheme.description && (
                  <p className="text-sm text-gray-600 mt-1">{selectedTheme.description}</p>
                )}
              </div>
              <button
                onClick={() => window.location.href = '/events'}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
              >
                Clear filter
              </button>
            </div>
          </div>
        </div>
      )}
      <EventsTimeline 
        selectedTimeframe={selectedTimeframe} 
        onTimeframeChange={handleTimeframeChange}
        events={filteredEvents}
      />
    </>
  );
}
