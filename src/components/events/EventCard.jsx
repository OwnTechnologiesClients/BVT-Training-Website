"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";

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
  priceNOK,
  priceUSD,
  originalPrice,
  originalPriceNOK,
  originalPriceUSD,
  image,
  badge,
  featured,
  rating,
  totalRatings,
  index = 0,
  compact = false
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const eventImage = image ? getImageUrl(image) : null;
  const eventSlug = slug || id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative bg-white ${compact ? 'rounded-xl shadow-md' : 'rounded-2xl lg:rounded-3xl shadow-lg'} border-2 border-gray-200 hover:border-yellow-400 ${compact ? 'hover:shadow-lg' : 'hover:shadow-2xl'} transition-all duration-300 overflow-hidden`}
    >
      {/* Badge */}
      {badge && (
        <div className={`absolute ${compact ? 'top-2 left-2' : 'top-4 left-4'} z-10`}>
          <span className={`bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 ${compact ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-full text-xs font-bold shadow-lg`}>
            {badge}
          </span>
        </div>
      )}

      {/* Featured Badge */}
      {featured && (
        <div className={`absolute ${compact ? 'top-2 right-2' : 'top-4 right-4'} z-10`}>
          <span className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white ${compact ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}>
            <Award className="w-3 h-3" />
            Featured
          </span>
        </div>
      )}

      {/* Event Image */}
      <div className={`relative ${compact ? 'h-40' : 'h-48 lg:h-56'} overflow-hidden`}>
        {eventImage ? (
          <img 
            src={eventImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              const placeholder = e.target.nextElementSibling;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`w-full h-full ${eventImage ? 'hidden' : 'flex'}`}>
          <ImagePlaceholder type="event" className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Category */}
        <div className={`absolute ${compact ? 'bottom-2 left-2' : 'bottom-4 left-4'}`}>
          <span className={`bg-white/90 backdrop-blur-sm text-blue-900 ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'} rounded-full font-bold shadow-lg`}>
            {category || 'Event'}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className={compact ? 'p-4' : 'p-5 lg:p-6'}>
        {/* Date and Time */}
        <div className={`flex items-center ${compact ? 'gap-2' : 'gap-4'} text-xs text-gray-600 ${compact ? 'mb-2' : 'mb-3'} ${compact ? 'p-1.5' : 'p-2'} bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg`}>
          <div className="flex items-center gap-1.5">
            <Calendar className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-blue-900`} />
            <span className="font-medium">{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-blue-900`} />
            <span className="font-medium">{time || 'TBA'}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/events/details/${eventSlug}`}>
          <h3 className={`${compact ? 'text-base lg:text-lg' : 'text-xl lg:text-2xl'} font-bold text-gray-900 ${compact ? 'mb-2' : 'mb-3'} line-clamp-2 group-hover:text-blue-900 transition-colors cursor-pointer`}>
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className={`text-gray-600 ${compact ? 'text-xs mb-2' : 'text-sm lg:text-base mb-4'} line-clamp-2 leading-relaxed`}>
          {description}
        </p>

        {/* Location */}
        <div className={`flex items-center gap-2 ${compact ? 'text-xs mb-2 p-1.5' : 'text-sm mb-4 p-2'} text-gray-600 bg-gray-50 rounded-lg`}>
          <MapPin className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-blue-900`} />
          <span className="font-medium line-clamp-1">{location || 'TBA'}</span>
        </div>

        {/* Attendance */}
        {maxAttendees && !compact && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <Users className="w-4 h-4 text-blue-900" />
            <span className="text-sm text-gray-700 font-medium">
              {attendees || 0} {attendees === 1 ? 'attendee' : 'attendees'}
            </span>
          </div>
        )}

        {/* Price */}
        <div className={`${compact ? 'mb-3 pb-3' : 'mb-4 pb-4'} border-b border-gray-200`}>
          {(() => {
            // Use priceNOK/priceUSD if available, otherwise fall back to price string (backward compatibility)
            let costNOK = priceNOK;
            let costUSD = priceUSD;
            
            // If price is a string like "kr 2999" or "$299", parse it
            if (!costNOK && !costUSD && price && typeof price === 'string') {
              if (price === 'Free') {
                return (
                  <div className="flex items-center gap-2">
                    <span className={`${compact ? 'text-base sm:text-lg' : 'text-base sm:text-lg lg:text-xl'} font-bold text-green-600`}>Free</span>
                  </div>
                );
              }
              // Try to extract from price string
              if (price.startsWith('kr ')) {
                costNOK = price.replace('kr ', '');
              } else if (price.startsWith('$')) {
                costUSD = price.replace('$', '');
                costNOK = (parseFloat(costUSD) * 10.5).toFixed(2);
              }
            }
            
            // If still no values, check if price is a number
            if (!costNOK && !costUSD && typeof price === 'number') {
              costUSD = price.toString();
              costNOK = (price * 10.5).toFixed(2);
            }
            
            if (!costNOK && !costUSD) {
              return (
                <div className="flex items-center gap-2">
                  <span className={`${compact ? 'text-base sm:text-lg' : 'text-base sm:text-lg lg:text-xl'} font-bold text-green-600`}>Free</span>
                </div>
              );
            }
            
            return (
              <div className="flex flex-col gap-1">
                {originalPriceNOK && parseFloat(originalPriceNOK) > parseFloat(costNOK || 0) && (
                  <div className="flex items-center gap-2">
                    <span className={`${compact ? 'text-sm' : 'text-base'} text-gray-400 line-through`}>
                      kr {originalPriceNOK}
                      {originalPriceUSD && <span className="ml-1">(${originalPriceUSD})</span>}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1.5 flex-wrap min-w-0">
                  <span className={`${compact ? 'text-base sm:text-lg' : 'text-base sm:text-lg lg:text-xl xl:text-2xl'} font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent truncate max-w-full`}>
                    kr {costNOK}
                  </span>
                  {costUSD && (
                    <span className={`${compact ? 'text-[10px] sm:text-xs' : 'text-[10px] sm:text-xs lg:text-sm'} text-gray-500 font-medium flex-shrink-0`}>(${costUSD})</span>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* CTA Button */}
        <Link href={`/events/details/${eventSlug}`}>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 ${compact ? 'px-4 py-2 rounded-lg text-xs' : 'px-6 py-3 rounded-xl text-sm'} font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2`}
          >
            View Details
            <ArrowRight className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
          </motion.button>
        </Link>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
}

