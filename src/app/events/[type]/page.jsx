"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import { getAllEvents, mapEventTypeToBackend } from "@/lib/api/events";
import { getEventCategoryBySlug } from "@/lib/api/eventCategory";

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

        // First, try to fetch the category by slug
        let categoryData = null;
        try {
          const categoryResponse = await getEventCategoryBySlug(typeSlug);
          if (categoryResponse.success && categoryResponse.data) {
            categoryData = categoryResponse.data;
            setCategory(categoryData);
          }
        } catch (err) {
          console.log('Category not found by slug, will try eventType mapping:', err);
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
              price: event.cost === 0 || event.cost === null || event.cost === undefined ? 'Free' : `$${event.cost}`,
              originalPrice: null,
              image: event.eventImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
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
        console.error('Error fetching events:', err);
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
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Events</span>
            </Link>
          </div>

          {/* Title and Description */}
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {displayName}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              {description}
            </p>
            <div className="flex items-center gap-4 text-blue-200">
              <span className="text-lg font-semibold">
                {events.length} {events.length === 1 ? 'Event' : 'Events'} Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-4 py-12">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => {
              // Ensure the event has the correct ID for the link
              const eventId = event.id || event._id;
              return (
                <EventCard
                  key={eventId}
                  {...event}
                  id={eventId}
                  index={index}
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

