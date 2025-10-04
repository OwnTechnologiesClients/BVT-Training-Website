import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ExternalLink, Star } from "lucide-react";
import Link from "next/link";

const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Advanced Naval Warfare Conference 2024",
    description: "Join leading naval experts for discussions on modern warfare strategies and technological advances.",
    date: "2024-03-15",
    time: "09:00 - 17:00",
    location: "Naval Base San Diego",
    category: "Conference",
    attendees: 250,
    maxAttendees: 300,
    price: "$299",
    originalPrice: "$399",
    image: "/images/navy-ship.jpg",
    badge: "Popular",
    featured: true,
    rating: 4.8,
    totalRatings: 45
  },
  {
    id: 2,
    title: "Leadership Excellence Workshop",
    description: "Develop essential leadership skills for commanding naval operations and managing teams.",
    date: "2024-03-22",
    time: "10:00 - 16:00",
    location: "Naval War College",
    category: "Workshop",
    attendees: 45,
    maxAttendees: 50,
    price: "$199",
    originalPrice: "$249",
    image: "/images/navy-ship.jpg",
    badge: "Limited Spots",
    featured: true,
    rating: 4.9,
    totalRatings: 28
  },
  {
    id: 3,
    title: "Maritime Security Symposium",
    description: "Explore the latest developments in maritime security protocols and defense strategies.",
    date: "2024-04-05",
    time: "08:30 - 18:00",
    location: "Maritime Security Center",
    category: "Symposium",
    attendees: 180,
    maxAttendees: 200,
    price: "$249",
    originalPrice: "$329",
    image: "/images/navy-ship.jpg",
    badge: "Early Bird",
    featured: false,
    rating: 4.7,
    totalRatings: 32
  },
  {
    id: 4,
    title: "Navigation Technology Training",
    description: "Hands-on training with the latest navigation systems and GPS technologies.",
    date: "2024-04-12",
    time: "09:00 - 15:00",
    location: "Navigation Training Center",
    category: "Training",
    attendees: 30,
    maxAttendees: 35,
    price: "$149",
    originalPrice: "$199",
    image: "/images/navy-ship.jpg",
    featured: false,
    rating: 4.6,
    totalRatings: 19
  },
  {
    id: 5,
    title: "Emergency Response Drill",
    description: "Practice emergency procedures and crisis management in realistic scenarios.",
    date: "2024-04-20",
    time: "07:00 - 19:00",
    location: "Training Ground Alpha",
    category: "Drill",
    attendees: 75,
    maxAttendees: 100,
    price: "Free",
    image: "/images/navy-ship.jpg",
    badge: "Mandatory",
    featured: false,
    rating: 4.5,
    totalRatings: 67
  },
  {
    id: 6,
    title: "Communication Systems Update",
    description: "Learn about new communication protocols and system upgrades.",
    date: "2024-04-28",
    time: "10:00 - 14:00",
    location: "Communication Center",
    category: "Seminar",
    attendees: 40,
    maxAttendees: 60,
    price: "$99",
    originalPrice: "$149",
    image: "/images/navy-ship.jpg",
    featured: false,
    rating: 4.4,
    totalRatings: 23
  }
];

export default function EventCard({ 
  id,
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

  const getAttendancePercentage = () => {
    return Math.round((attendees / maxAttendees) * 100);
  };

  const getAttendanceColor = () => {
    const percentage = getAttendancePercentage();
    if (percentage >= 90) return "text-red-600 bg-red-50";
    if (percentage >= 75) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {attendees}/{maxAttendees} attendees
            </span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor()}`}>
            {getAttendancePercentage()}% full
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-900">{rating}</span>
          <span className="text-sm text-gray-500">({totalRatings})</span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-900">{price}</span>
            {originalPrice && originalPrice !== "Free" && (
              <span className="text-lg text-gray-400 line-through">{originalPrice}</span>
            )}
          </div>
          <Link href={`/events/${id}`}>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Details
            </button>
          </Link>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
        <div className="flex flex-col gap-3 px-6">
          <Link href={`/events/${id}`} className="block">
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
