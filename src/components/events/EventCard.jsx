"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";

const SAMPLE_EVENTS = [
  // Past Events
  {
    id: 1,
    title: "Advanced Naval Warfare Conference 2024",
    description: "Join leading BVT experts for discussions on modern warfare strategies and technological advances.",
    date: "2024-03-15",
    time: "09:00 - 17:00",
    location: "Naval Base San Diego",
    category: "Conference",
    attendees: 300,
    maxAttendees: 300,
    price: "$299",
    originalPrice: "$399",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Completed",
    featured: false,
    rating: 4.8,
    totalRatings: 145
  },
  {
    id: 2,
    title: "Leadership Excellence Workshop",
    description: "Develop essential leadership skills for commanding BVT operations and managing teams.",
    date: "2024-05-22",
    time: "10:00 - 16:00",
    location: "Naval War College",
    category: "Workshop",
    attendees: 50,
    maxAttendees: 50,
    price: "$199",
    originalPrice: "$249",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Completed",
    featured: false,
    rating: 4.9,
    totalRatings: 48
  },
  {
    id: 3,
    title: "Maritime Security Symposium",
    description: "Explore the latest developments in maritime security protocols and defense strategies.",
    date: "2024-06-15",
    time: "08:30 - 18:00",
    location: "Maritime Security Center",
    category: "Symposium",
    attendees: 200,
    maxAttendees: 200,
    price: "$249",
    originalPrice: "$329",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Completed",
    featured: false,
    rating: 4.7,
    totalRatings: 182
  },
  {
    id: 4,
    title: "Navigation Technology Training",
    description: "Hands-on training with the latest navigation systems and GPS technologies.",
    date: "2024-07-12",
    time: "09:00 - 15:00",
    location: "Navigation Training Center",
    category: "Training",
    attendees: 35,
    maxAttendees: 35,
    price: "$149",
    originalPrice: "$199",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Completed",
    featured: false,
    rating: 4.6,
    totalRatings: 33
  },
  {
    id: 5,
    title: "Emergency Response Drill",
    description: "Practice emergency procedures and crisis management in realistic scenarios.",
    date: "2024-08-20",
    time: "07:00 - 19:00",
    location: "Training Ground Alpha",
    category: "Drill",
    attendees: 100,
    maxAttendees: 100,
    price: "Free",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Completed",
    featured: false,
    rating: 4.5,
    totalRatings: 97
  },
  {
    id: 6,
    title: "Submarine Operations Seminar",
    description: "Advanced training on submarine navigation, communication systems, and underwater operations.",
    date: "2024-09-10",
    time: "09:00 - 17:00",
    location: "Submarine Training Facility",
    category: "Seminar",
    attendees: 60,
    maxAttendees: 60,
    price: "$349",
    originalPrice: "$449",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Completed",
    featured: false,
    rating: 4.9,
    totalRatings: 58
  },
  {
    id: 7,
    title: "Tactical Command Workshop",
    description: "Master the art of tactical decision-making in high-pressure BVT combat scenarios.",
    date: "2025-01-18",
    time: "08:00 - 16:00",
    location: "Naval Tactical Center",
    category: "Workshop",
    attendees: 42,
    maxAttendees: 45,
    price: "$279",
    originalPrice: "$349",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Completed",
    featured: false,
    rating: 4.8,
    totalRatings: 40
  },
  {
    id: 8,
    title: "Fleet Operations Coordination",
    description: "Learn to coordinate complex fleet operations and multi-ship tactical maneuvers.",
    date: "2025-03-25",
    time: "09:00 - 18:00",
    location: "Fleet Command Center",
    category: "Training",
    attendees: 75,
    maxAttendees: 80,
    price: "$399",
    originalPrice: "$499",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Completed",
    featured: false,
    rating: 4.7,
    totalRatings: 72
  },
  {
    id: 9,
    title: "Maritime Law and Regulations Conference",
    description: "Comprehensive overview of international maritime law, regulations, and compliance.",
    date: "2025-05-14",
    time: "10:00 - 17:00",
    location: "Maritime Law Institute",
    category: "Conference",
    attendees: 150,
    maxAttendees: 150,
    price: "$199",
    originalPrice: "$249",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Completed",
    featured: false,
    rating: 4.6,
    totalRatings: 138
  },
  // Upcoming Events
  {
    id: 10,
    title: "Advanced Naval Radar Systems",
    description: "Deep dive into modern radar technology, signal processing, and target identification.",
    date: "2025-10-20",
    time: "09:00 - 16:00",
    location: "Radar Training Center",
    category: "Training",
    attendees: 28,
    maxAttendees: 40,
    price: "$249",
    originalPrice: "$299",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Limited Spots",
    featured: true,
    rating: 4.8,
    totalRatings: 15
  },
  {
    id: 11,
    title: "Naval Aviation Safety Conference 2025",
    description: "Annual conference focusing on aviation safety, maintenance protocols, and accident prevention.",
    date: "2025-11-08",
    time: "08:00 - 18:00",
    location: "Naval Air Station",
    category: "Conference",
    attendees: 180,
    maxAttendees: 250,
    price: "$349",
    originalPrice: "$449",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Popular",
    featured: true,
    rating: 4.9,
    totalRatings: 23
  },
  {
    id: 12,
    title: "Cybersecurity in Naval Operations",
    description: "Protect BVT systems from cyber threats with advanced security protocols and best practices.",
    date: "2025-11-22",
    time: "09:00 - 17:00",
    location: "Cyber Defense Center",
    category: "Workshop",
    attendees: 35,
    maxAttendees: 50,
    price: "$299",
    originalPrice: "$399",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "New",
    featured: true,
    rating: 4.7,
    totalRatings: 12
  },
  {
    id: 13,
    title: "Maritime Engineering Symposium",
    description: "Explore cutting-edge marine engineering technologies and propulsion systems.",
    date: "2025-12-05",
    time: "08:30 - 17:30",
    location: "Marine Engineering Institute",
    category: "Symposium",
    attendees: 95,
    maxAttendees: 150,
    price: "$279",
    originalPrice: "$349",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    featured: false,
    rating: 4.6,
    totalRatings: 8
  },
  {
    id: 14,
    title: "Naval Medical Emergency Training",
    description: "Critical medical skills for BVT personnel including trauma care and emergency procedures.",
    date: "2025-12-18",
    time: "07:00 - 19:00",
    location: "Naval Medical Center",
    category: "Training",
    attendees: 20,
    maxAttendees: 30,
    price: "$199",
    originalPrice: "$249",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Certification",
    featured: false,
    rating: 4.9,
    totalRatings: 5
  },
  {
    id: 15,
    title: "International Naval Cooperation Summit",
    description: "Foster international cooperation and discuss joint maritime operations and partnerships.",
    date: "2026-01-15",
    time: "09:00 - 18:00",
    location: "International Maritime Center",
    category: "Summit",
    attendees: 220,
    maxAttendees: 300,
    price: "$399",
    originalPrice: "$499",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    badge: "Early Bird",
    featured: true,
    rating: 4.8,
    totalRatings: 18
  }
];

export default function EventCard({ 
  id,
  slug,
  title, 
  description, 
  date, 
  time, 
  location, 
  category, 
  attendees, 
  maxAttendees,
  price,
  originalPrice,
  image,
  badge,
  featured,
  rating,
  totalRatings,
  index = 0
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const eventImage = getImageUrl(image);
  const eventSlug = slug || id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {badge}
          </span>
        </div>
      )}

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Award className="w-3 h-3" />
            Featured
          </span>
        </div>
      )}

      {/* Event Image */}
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <img 
          src={eventImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Category */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-blue-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            {category || 'Event'}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-5 lg:p-6">
        {/* Date and Time */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-900" />
            <span className="font-medium">{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-900" />
            <span className="font-medium">{time || 'TBA'}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/events/details/${eventSlug}`}>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm lg:text-base mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 p-2 bg-gray-50 rounded-lg">
          <MapPin className="w-4 h-4 text-blue-900" />
          <span className="font-medium">{location || 'TBA'}</span>
        </div>

        {/* Attendance */}
        {maxAttendees && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <Users className="w-4 h-4 text-blue-900" />
            <span className="text-sm text-gray-700 font-medium">
              {attendees || 0} {attendees === 1 ? 'attendee' : 'attendees'}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">{price || 'Free'}</span>
            {originalPrice && originalPrice !== "Free" && originalPrice !== price && (
              <span className="text-lg text-gray-400 line-through">{originalPrice}</span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/events/details/${eventSlug}`}>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-6 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
}

export { SAMPLE_EVENTS };
