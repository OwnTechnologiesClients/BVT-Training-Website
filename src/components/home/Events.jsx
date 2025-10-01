"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Clock } from "lucide-react";

const EVENTS = [
  {
    title: "Naval Career Advancement Workshop",
    desc: "Discover pathways for advancement in your naval career with guidance from senior officers and career counselors.",
    buttonLabel: "Register Now",
    color: "from-blue-800 to-blue-950",
    date: "March 15, 2025",
    time: "09:00 AM",
    location: "Naval Training Center",
    seats: "45 seats left",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
  {
    title: "Maritime Technology Expo 2025",
    desc: "Explore the latest naval technologies, equipment demonstrations, and hands-on training opportunities.",
    buttonLabel: "Register Now",
    color: "from-blue-700 to-blue-900",
    date: "March 22, 2025",
    time: "10:00 AM",
    location: "Convention Hall A",
    seats: "120 seats left",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
  },
  {
    title: "Leadership in Naval Operations",
    desc: "Join our seminar with experienced commanders. Learn leadership strategies and best practices for maritime command.",
    buttonLabel: "Reserve Seat",
    color: "from-slate-700 to-slate-900",
    date: "April 5, 2025",
    time: "02:00 PM",
    location: "Command Training Room",
    seats: "30 seats left",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
  },
  {
    title: "Safety Standards & Emergency Response",
    desc: "Critical training on the latest safety protocols, emergency procedures, and crisis management at sea.",
    buttonLabel: "Reserve Seat",
    color: "from-indigo-800 to-indigo-950",
    date: "April 12, 2025",
    time: "11:00 AM",
    location: "Safety Training Facility",
    seats: "60 seats left",
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop"
  },
];

export default function Events() {
  return (
    <section className="py-20 px-8 bg-gray-50 relative overflow-hidden">
      {/* Simple Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto mb-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
          <Calendar className="w-4 h-4 text-blue-900" />
          <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
            Upcoming Events
          </span>
        </div>
        <h2 className="mb-4 text-4xl md:text-5xl font-bold text-gray-900">
          Events & Seminars
        </h2>
        <p className="mx-auto w-full px-4 font-normal text-lg text-gray-500 lg:w-6/12">
          Join our naval training events, workshops, and seminars designed to enhance 
          your professional development and career growth.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 relative z-10">
        {EVENTS.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all border border-gray-200 h-full flex flex-col"
          >
            {/* Event Image/Header */}
            <div className={`relative h-48 overflow-hidden`}>
              <img 
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg shadow-lg">
                <div className="text-2xl font-bold leading-none">{event.date.split(' ')[1].replace(',', '')}</div>
                <div className="text-xs font-semibold uppercase">{event.date.split(' ')[0]}</div>
              </div>

              {/* Seats Left Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-blue-900" />
                  <span className="text-xs font-bold text-blue-900">{event.seats}</span>
                </div>
              </div>

              {/* Center Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-8xl font-bold">
                  {idx + 1}
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6 flex-1 flex flex-col">
              <a
                href="#"
                className="text-gray-900 transition-colors hover:text-blue-900"
              >
                <h3 className="mb-3 text-xl font-bold leading-tight">
                  {event.title}
                </h3>
              </a>
              
              <p className="mb-6 font-normal text-gray-600 flex-1">
                {event.desc}
              </p>

              {/* Event Details */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-900" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-900" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-gradient-to-r from-blue-900 to-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 group">
                {event.buttonLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16 relative z-10">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white px-8 py-6 rounded-2xl shadow-xl border border-gray-200">
          <div className="text-left">
            <p className="text-blue-900 font-bold text-lg">Don't see an event for you?</p>
            <p className="text-gray-600 text-sm">Subscribe to get notified about future events</p>
          </div>
          <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors whitespace-nowrap shadow-lg">
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
}
