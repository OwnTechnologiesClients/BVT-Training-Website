"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from "framer-motion";
import { 
  Star, 
  Clock, 
  Users, 
  Calendar,
  MapPin,
  Share2,
  Loader2,
  ArrowLeft,
  User,
  Tag,
  DollarSign,
  Mail,
  Linkedin,
  Building,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  UtensilsCrossed
} from "lucide-react";
import { getEventById, getEventBySlug } from "@/lib/api/events";
import { getAllEvents } from "@/lib/api/events";
import EventCard from "@/components/events/EventCard";

// Map backend eventType to display names
const getEventTypeDisplayName = (type) => {
  // Handle different type formats: object, string, or null/undefined
  let typeValue = type;
  
  // If type is an object (populated from backend), extract the name
  if (type && typeof type === 'object') {
    typeValue = type.name || type.type || type._id || null;
  }
  
  // If still not a string, return default
  if (!typeValue || typeof typeValue !== 'string') {
    return 'Event';
  }
  
  const displayMap = {
    'conference': 'Conference',
    'workshop': 'Workshop',
    'seminar': 'Seminar',
    'training': 'Training',
    'meeting': 'Meeting',
    'conferences': 'Conference',
    'workshops': 'Workshop',
    'seminars': 'Seminar',
    'competitions': 'Competition',
    'drills-exercises': 'Drills & Exercises',
    'drills and exercise': 'Drills & Exercises',
    'tech-demonstrations': 'Tech Demonstration'
  };
  
  return displayMap[typeValue.toLowerCase()] || typeValue || 'Event';
};

export default function EventDetailsPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const eventSlug = resolvedParams?.slug;

  console.log('🔵 ========== EVENT DETAILS PAGE RENDERED ==========');
  console.log('🔵 Raw params:', params);
  console.log('🔵 Resolved params:', resolvedParams);
  console.log('🔵 Event slug extracted:', eventSlug);

  const [eventData, setEventData] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      console.log('🟢 useEffect - fetchEvent started');
      console.log('🟢 Event slug:', eventSlug);
      
      if (!eventSlug) {
        console.log('🟢 Skipping fetch - no eventSlug');
        setError('No event slug provided');
        setLoading(false);
        return;
      }

      try {
        console.log('🟢 Setting loading to true');
        setLoading(true);
        setError(null);
        
        console.log('🟢 ========== FETCHING EVENT ==========');
        console.log('🟢 Event slug:', eventSlug);
        
        const apiStartTime = Date.now();
        let response;
        
        // Check if eventSlug looks like an ObjectId (24 hex characters)
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(eventSlug);
        
        try {
          if (isObjectId) {
            // If it's an ObjectId, try fetching by ID first (fallback for old links)
            console.log('🟢 Event slug looks like ObjectId, trying getEventById...');
            response = await getEventById(eventSlug);
            console.log('🟢 getEventById returned successfully');
          } else {
            // Otherwise, try fetching by slug
            console.log('🟢 Calling getEventBySlug with:', eventSlug);
            response = await getEventBySlug(eventSlug);
            console.log('🟢 getEventBySlug returned successfully');
          }
        } catch (fetchError) {
          console.error('🔴 Event fetch error:', fetchError);
          // If slug fetch fails and it's not an ObjectId, try by ID as fallback
          if (!isObjectId) {
            console.log('🟢 Slug not found, trying as ID...');
            try {
              response = await getEventById(eventSlug);
              console.log('🟢 getEventById (fallback) returned successfully');
            } catch (idError) {
              console.error('🔴 Both slug and ID fetch failed:', idError);
              // Set a more user-friendly error message
              const errorMessage = fetchError.message || idError.message || 'Event not found';
              setError(errorMessage);
              setLoading(false);
              return;
            }
          } else {
            // Set error and stop loading
            const errorMessage = fetchError.message || 'Failed to load event';
            setError(errorMessage);
            setLoading(false);
            return;
          }
        }
        const apiEndTime = Date.now();
        
        console.log('🟢 ========== API RESPONSE RECEIVED ==========');
        console.log('🟢 Response time:', apiEndTime - apiStartTime, 'ms');
        console.log('🟢 Full response object:', response);
        console.log('🟢 Response type:', typeof response);
        console.log('🟢 Response keys:', response ? Object.keys(response) : 'null');
        console.log('🟢 Response.success:', response?.success);
        console.log('🟢 Response.message:', response?.message);
        console.log('🟢 Response.data:', response?.data);
        
        if (response) {
          console.log('🟢 Response stringified:', JSON.stringify(response, null, 2));
        }

        // Handle different response structures
        console.log('🟢 ========== PROCESSING RESPONSE ==========');
        let event = null;
        
        if (response) {
          console.log('🟢 Response exists, checking structure...');
          
          if (response.success) {
            console.log('🟢 Response.success is true');
            event = response.data || response;
            console.log('🟢 Event extracted:', event);
          } else if (response.data) {
            console.log('🟢 Response.success is false, but response.data exists');
            event = response.data;
          } else {
            console.log('🟢 Response exists but no success or data, using response directly');
            event = response;
          }
        } else {
          console.error('🔴 Response is null or undefined');
          setError('No response from server');
          setLoading(false);
          return;
        }
        
        console.log('🟢 ========== EVENT DATA EXTRACTED ==========');
        console.log('🟢 Event object:', event);
        console.log('🟢 Event title:', event?.title);
        console.log('🟢 Event _id:', event?._id);
        
        if (!event) {
          console.error('🔴 Event is null or undefined');
          setError('Event data is null');
          setLoading(false);
          return;
        }
        
        if (!event.title) {
          console.error('🔴 Event title is missing');
          console.error('🔴 Full event object:', JSON.stringify(event, null, 2));
          setError('Event data is invalid - missing title');
          setLoading(false);
          return;
        }
        
        console.log('🟢 ========== SETTING EVENT DATA ==========');
        setEventData(event);
        console.log('🟢 eventData state set successfully');
          
        // Fetch related events (same eventType or category)
        console.log('🟢 ========== FETCHING RELATED EVENTS ==========');
        console.log('🟢 Event type for related events:', event.eventType);
        
        // Only fetch related events if eventType is a valid string type
        const validEventTypes = ['conference', 'workshop', 'seminar', 'training', 'meeting'];
        const eventTypeForFilter = validEventTypes.includes(event.eventType) ? event.eventType : null;
        
        console.log('🟢 Valid event type for filter:', eventTypeForFilter);
        
        try {
          const relatedResponse = await getAllEvents({ 
            ...(eventTypeForFilter && { eventType: eventTypeForFilter }),
            limit: 5,
            page: 1
          });
          
          console.log('🟢 Related events response:', relatedResponse);
          
          if (relatedResponse.success && relatedResponse.data) {
            console.log('🟢 Processing related events...');
            const filtered = relatedResponse.data
              .filter(e => e._id !== event._id && e.id !== event.id)
              .slice(0, 3)
              .map(e => ({
                id: e._id || e.id,
                _id: e._id,
                title: e.title,
                description: e.description || '',
                date: e.startDate || e.date,
                endDate: e.endDate,
                time: e.startTime && e.endTime 
                  ? `${e.startTime} - ${e.endTime}`
                  : e.startTime || 'TBA',
                location: e.isOnline ? 'Online' : (e.location || 'TBA'),
                category: e.category?.name || e.eventType || 'Event',
                attendees: Array.isArray(e.attendees) ? e.attendees.length : 0,
                maxAttendees: e.maxAttendees || 1,
                price: e.cost === 0 || e.cost === null || e.cost === undefined ? 'Free' : `$${e.cost}`,
                originalPrice: null,
                image: e.eventImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
                badge: (e.status === 'ongoing' || e.status === 'completed') ? null : e.status,
                featured: false,
                rating: 4.5,
                totalRatings: 0
              }));
            
            console.log('🟢 Filtered related events:', filtered);
            setRelatedEvents(filtered);
          }
        } catch (err) {
          console.error('🔴 Error fetching related events:', err);
        }
      } catch (err) {
        console.error('🔴 ========== ERROR FETCHING EVENT ==========');
        console.error('🔴 Error object:', err);
        console.error('🔴 Error message:', err.message);
        setError(err.message || 'Failed to load event');
      } finally {
        console.log('🟢 ========== FETCH COMPLETE ==========');
        console.log('🟢 Setting loading to false');
        setLoading(false);
      }
    };

    console.log('🟢 Calling fetchEvent function');
    fetchEvent();
  }, [eventSlug]);

  // Loading state
  if (loading) {
    console.log('🟡 Rendering loading state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading event...</p>
          <p className="text-sm text-gray-400 mt-2">Event slug: {eventSlug}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !eventData) {
    console.log('🟡 Rendering error state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-2">{error || 'The event you are looking for does not exist.'}</p>
          <p className="text-sm text-gray-400 mb-6">Event slug: {eventSlug}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                Browse All Events
              </button>
            </Link>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'TBA';
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'TBA';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'TBA';
    return timeString;
  };

  const startDate = eventData.startDate ? formatDate(eventData.startDate) : 'TBA';
  const endDate = eventData.endDate ? formatDate(eventData.endDate) : null;
  const startTime = formatTime(eventData.startTime);
  const endTime = formatTime(eventData.endTime);
  const timeRange = startTime && endTime ? `${startTime} - ${endTime}` : startTime || 'TBA';

  // Get category and event type names
  const categoryName = eventData.category?.name || eventData.category || 'Uncategorized';
  const eventTypeName = getEventTypeDisplayName(eventData.eventType);
  
  // Get attendees info
  const attendeesCount = Array.isArray(eventData.attendees) ? eventData.attendees.length : 0;
  const maxAttendees = eventData.maxAttendees || 0;
  const isFull = maxAttendees > 0 && attendeesCount >= maxAttendees;
  const registrationOpen = !eventData.registrationDeadline || new Date(eventData.registrationDeadline) >= new Date();

  // Check if event is upcoming, ongoing, or past
  const now = new Date();
  const eventStart = eventData.startDate ? new Date(eventData.startDate) : null;
  const eventEnd = eventData.endDate ? new Date(eventData.endDate) : null;
  const isUpcoming = eventStart && !isNaN(eventStart.getTime()) && eventStart > now;
  const isOngoing = eventStart && eventEnd && !isNaN(eventStart.getTime()) && !isNaN(eventEnd.getTime()) && eventStart <= now && eventEnd >= now;
  const isPast = eventEnd && !isNaN(eventEnd.getTime()) && eventEnd < now;

  // Get status badge
  const getStatusBadge = () => {
    if (isPast) return { text: 'Past Event', color: 'bg-gray-500' };
    if (isOngoing) return { text: 'Ongoing', color: 'bg-green-500' };
    if (isFull) return { text: 'Fully Booked', color: 'bg-red-500' };
    if (!registrationOpen) return { text: 'Registration Closed', color: 'bg-yellow-500' };
    return { text: 'Upcoming', color: 'bg-blue-500' };
  };

  const statusBadge = getStatusBadge();

  console.log('🟢 ========== RENDERING EVENT DETAILS ==========');
  console.log('🟢 Event data available:', {
    title: eventData.title,
    _id: eventData._id,
    eventType: eventData.eventType
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Event Header */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-gray-50 p-8 rounded-2xl mb-8">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Link href="/events" className="hover:text-blue-900">Events</Link>
                    {eventData.eventType && (
                      <>
                        <span>/</span>
                        <Link 
                          href={`/events/${typeof eventData.eventType === 'object' ? eventData.eventType.slug || eventData.eventType._id : eventData.eventType}`} 
                          className="hover:text-blue-900"
                        >
                          {eventTypeName}
                        </Link>
                      </>
                    )}
                    <span>/</span>
                    <span className="text-blue-900">{eventData.title}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${statusBadge.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {statusBadge.text}
                    </div>
                    <div className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                      {categoryName}
                    </div>
                  </div>
                  
                  {/* Event Title */}
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {eventData.title}
                  </h1>

                  {/* Event Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-900" />
                      <div>
                        <span className="text-gray-500 block">Date</span>
                        <span className="font-medium text-gray-900">
                          {startDate}
                          {endDate && endDate !== startDate && ` - ${endDate}`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-900" />
                      <div>
                        <span className="text-gray-500 block">Time</span>
                        <span className="font-medium text-gray-900">{timeRange}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-900" />
                      <div>
                        <span className="text-gray-500 block">Location</span>
                        <span className="font-medium text-gray-900">
                          {eventData.isOnline ? 'Online Event' : (eventData.location || 'TBA')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-900" />
                      <div>
                        <span className="text-gray-500 block">Attendees</span>
                        <span className="font-medium text-gray-900">
                          {attendeesCount} {attendeesCount === 1 ? 'attendee' : 'attendees'}
                        </span>
                      </div>
                    </div>

                    {eventData.mealForAttendees && (
                      <div className="flex items-center gap-3">
                        <UtensilsCrossed className="w-5 h-5 text-blue-900" />
                        <div>
                          <span className="text-gray-500 block">Meal Service</span>
                          <span className="font-medium text-green-700 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Included
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === "info"
                        ? "text-blue-900 border-b-2 border-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Event Info
                  </button>
                  <button
                    onClick={() => setActiveTab("speakers")}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === "speakers"
                        ? "text-blue-900 border-b-2 border-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Speakers
                  </button>
                  <button
                    onClick={() => setActiveTab("agenda")}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === "agenda"
                        ? "text-blue-900 border-b-2 border-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Agenda
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "info" && (
                  <div className="space-y-12">
                    {/* About Event */}
                    <section id="about-event">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {eventData.description || 'No description available.'}
                      </p>
                    </section>

                    {/* Event Details */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
                      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                        <div className="flex items-start gap-4">
                          <Calendar className="w-5 h-5 text-blue-900 mt-1" />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Event Dates</h3>
                            <p className="text-gray-600">
                              {startDate}
                              {endDate && endDate !== startDate && ` to ${endDate}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <Clock className="w-5 h-5 text-blue-900 mt-1" />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Time</h3>
                            <p className="text-gray-600">{timeRange}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <MapPin className="w-5 h-5 text-blue-900 mt-1" />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                            <p className="text-gray-600">
                              {eventData.isOnline ? (
                                <>
                                  Online Event
                                  {eventData.onlineLink && (
                                    <a 
                                      href={eventData.onlineLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-900 hover:underline ml-2"
                                    >
                                      (Join Link)
                                    </a>
                                  )}
                                </>
                              ) : (
                                eventData.location || 'TBA'
                              )}
                            </p>
                          </div>
                        </div>

                        {eventData.registrationDeadline && (
                          <div className="flex items-start gap-4">
                            <AlertCircle className="w-5 h-5 text-blue-900 mt-1" />
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">Registration Deadline</h3>
                              <p className="text-gray-600">
                                {formatDate(eventData.registrationDeadline)}
                                {!registrationOpen && (
                                  <span className="text-red-600 ml-2">(Closed)</span>
                                )}
                              </p>
                            </div>
                          </div>
                        )}

                        {eventData.mealForAttendees && (
                          <div className="flex items-start gap-4">
                            <UtensilsCrossed className="w-5 h-5 text-blue-900 mt-1" />
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">Meal Service</h3>
                              <p className="text-gray-600">
                                <span className="inline-flex items-center gap-2 text-green-700 font-medium">
                                  <CheckCircle className="w-4 h-4" />
                                  Meal will be provided for all attendees
                                </span>
                              </p>
                            </div>
                          </div>
                        )}

                        {eventData.tags && eventData.tags.length > 0 && (
                          <div className="flex items-start gap-4">
                            <Tag className="w-5 h-5 text-blue-900 mt-1" />
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                              <div className="flex flex-wrap gap-2">
                                {eventData.tags.map((tag, index) => (
                                  <span 
                                    key={index}
                                    className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "speakers" && (
                  <div className="space-y-12">
                    {eventData.speakers && eventData.speakers.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {eventData.speakers.map((speaker, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                              <img 
                                src={speaker.photo || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'} 
                                alt={speaker.name}
                                className="w-20 h-20 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{speaker.name}</h3>
                                {speaker.title && (
                                  <p className="text-blue-900 font-medium mb-2">{speaker.title}</p>
                                )}
                                {speaker.company && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Building className="w-4 h-4" />
                                    <span>{speaker.company}</span>
                                  </div>
                                )}
                                {speaker.bio && (
                                  <p className="text-gray-600 text-sm mb-3">{speaker.bio}</p>
                                )}
                                {speaker.topics && (
                                  <p className="text-gray-500 text-sm mb-3">
                                    <span className="font-medium">Topics: </span>
                                    {speaker.topics}
                                  </p>
                                )}
                                <div className="flex items-center gap-3">
                                  {speaker.email && (
                                    <a 
                                      href={`mailto:${speaker.email}`}
                                      className="text-blue-900 hover:text-blue-700"
                                    >
                                      <Mail className="w-4 h-4" />
                                    </a>
                                  )}
                                  {speaker.linkedin && (
                                    <a 
                                      href={speaker.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-900 hover:text-blue-700"
                                    >
                                      <Linkedin className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No speakers announced yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "agenda" && (
                  <div className="space-y-12">
                    {eventData.agenda && eventData.agenda.length > 0 ? (
                      <div className="space-y-4">
                        {eventData.agenda.map((item, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="p-6">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  {item.time && (
                                    <div className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
                                      <Clock className="w-4 h-4" />
                                      {item.time}
                                      {item.duration && (
                                        <span className="text-gray-500 text-sm">({item.duration})</span>
                                      )}
                                    </div>
                                  )}
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                  {item.description && (
                                    <p className="text-gray-600 mb-2">{item.description}</p>
                                  )}
                                  {item.speaker && (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                      <User className="w-4 h-4" />
                                      <span>Speaker: {item.speaker}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Agenda will be announced soon.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Event Thumbnail */}
                    <div className="relative">
                      <img 
                        src={eventData.eventImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop'} 
                        alt={eventData.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                      {/* Register Button */}
                      {isUpcoming && registrationOpen && !isFull ? (
                        <button 
                          className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors mb-6 shadow-md"
                        >
                          Register Now
                        </button>
                      ) : isFull ? (
                        <button 
                          disabled
                          className="w-full bg-gray-400 text-white py-3 rounded-lg font-bold cursor-not-allowed mb-6"
                        >
                          Fully Booked
                        </button>
                      ) : !registrationOpen ? (
                        <button 
                          disabled
                          className="w-full bg-gray-400 text-white py-3 rounded-lg font-bold cursor-not-allowed mb-6"
                        >
                          Registration Closed
                        </button>
                      ) : null}

                      <div className="space-y-4 mb-6">
                        {eventData.cost !== undefined && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                              <DollarSign className="w-5 h-5 text-blue-900" />
                              <span className="text-gray-700 font-medium">Cost</span>
                            </div>
                            <span className="text-2xl font-bold text-blue-900">
                              {eventData.cost === 0 || eventData.cost === null ? 'Free' : `$${eventData.cost}`}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <Tag className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-700 font-medium">Type</span>
                          </div>
                          <span className="font-bold text-gray-900">{eventTypeName}</span>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-700 font-medium">Attendees</span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {attendeesCount} {attendeesCount === 1 ? 'attendee' : 'attendees'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">Share this event</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events - Full Width */}
      {relatedEvents.length > 0 && (
        <section id="related-events" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Events</h2>
              <p className="text-lg text-gray-500">Explore more events in this category</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEvents.map((event, index) => (
                <EventCard
                  key={event.id || event._id}
                  {...event}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
