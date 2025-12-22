"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Clock, ExternalLink, Loader2 } from "lucide-react";
import { getMyRegisteredEvents } from "@/lib/api/events";
import { getImageUrl } from "@/lib/utils/imageUtils";

const MyEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMyRegisteredEvents();
      
      if (response.success) {
        setEvents(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch events');
      }
    } catch (err) {
      console.error('Error fetching registered events:', err);
      setError('Failed to load registered events');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return "N/A";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Registered Events</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Registered Events</h2>
        <div className="text-center py-8 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">My Registered Events</h2>
        {events.length > 0 && (
          <Link
            href="/events"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All Events
          </Link>
        )}
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No registered events yet</p>
          <Link
            href="/events"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {events.slice(0, 5).map((event) => {
            const eventId = event._id || event.id;
            const eventSlug = event.slug || eventId;
            const eventImage = getImageUrl(event.eventImage) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop';
            const categoryName = event.category?.name || event.category || 'Event';
            const eventTypeName = event.eventType?.name || event.eventType || 'Event';
            
            return (
              <Link
                key={eventId}
                href={`/events/details/${eventSlug}`}
                className="block group"
              >
                <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
                  {/* Event Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={eventImage}
                      alt={event.title}
                      className="w-24 h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop';
                      }}
                    />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{formatDate(event.startDate)}</span>
                        {event.endDate && event.endDate !== event.startDate && (
                          <span> - {formatDate(event.endDate)}</span>
                        )}
                      </div>
                      
                      {event.location && !event.isOnline && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      
                      {event.isOnline && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span>Online Event</span>
                        </div>
                      )}
                      
                      {event.startTime && event.endTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded">
                        {categoryName}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {eventTypeName}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 flex items-center">
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
          
          {events.length > 5 && (
            <div className="text-center pt-2">
              <Link
                href="/events"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All Registered Events ({events.length})
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEvents;

