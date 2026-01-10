"use client";

import { motion } from "framer-motion";
import { Clock, Users, Star, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ProgramCard({
  id,
  title,
  description,
  category,
  duration,
  students,
  rating,
  totalRatings,
  level,
  image,
  price,
  originalPrice,
  badge,
  index = 0
}) {
  const { isAuthenticated } = useAuth();
  
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

      {/* Program Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Program Content */}
      <div className="p-6">
        {/* Category & Level */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
          <span className="text-sm text-gray-500 font-medium">{level}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Program Details */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{students}</span>
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

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-900">{price}</span>
            {originalPrice && (
              <span className="text-lg text-gray-400 line-through">{originalPrice}</span>
            )}
          </div>
          <Link href={`/programs/${id}`}>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              View Details
            </button>
          </Link>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
        <div className="flex flex-col gap-3 px-6">
          <Link href={`/programs/${id}`} className="block">
            <button className="w-full bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
              View Details
            </button>
          </Link>
          <Link href={isAuthenticated ? "/programs" : "/login"}>
            <button className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg">
              Enroll Now
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}


