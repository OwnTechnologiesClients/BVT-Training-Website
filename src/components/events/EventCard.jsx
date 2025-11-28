import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import Link from "next/link";

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
    image: "https://picsum.photos/seed/BVT1/800/600",
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
    image: "https://picsum.photos/seed/leadership2/800/600",
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
    image: "https://picsum.photos/seed/maritime3/800/600",
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
    image: "https://picsum.photos/seed/navigation4/800/600",
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
    image: "https://picsum.photos/seed/emergency5/800/600",
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
    image: "https://picsum.photos/seed/submarine6/800/600",
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
    image: "https://picsum.photos/seed/tactical7/800/600",
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
    image: "https://picsum.photos/seed/fleet8/800/600",
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
    image: "https://picsum.photos/seed/law9/800/600",
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
    image: "https://picsum.photos/seed/radar10/800/600",
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
    image: "https://picsum.photos/seed/aviation11/800/600",
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
    image: "https://picsum.photos/seed/cyber12/800/600",
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
    image: "https://picsum.photos/seed/engineering13/800/600",
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
    image: "https://picsum.photos/seed/medical14/800/600",
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
    image: "https://picsum.photos/seed/cooperation15/800/600",
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


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300 border border-gray-100 relative overflow-hidden"
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
            {badge}
          </span>
        </div>
      )}

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </span>
        </div>
      )}

      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Category */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Date and Time */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        {/* Attendance */}
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {attendees} {attendees === 1 ? 'attendee' : 'attendees'}
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-900">{price}</span>
            {originalPrice && originalPrice !== "Free" && (
              <span className="text-lg text-gray-400 line-through">{originalPrice}</span>
            )}
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
        <div className="flex flex-col gap-3 px-6">
          <Link href={`/events/details/${slug || id}`} className="block">
            <button className="w-full bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
              View Details
            </button>
          </Link>
          <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg">
            Register Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export { SAMPLE_EVENTS };


