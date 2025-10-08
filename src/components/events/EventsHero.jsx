import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

export default function EventsHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-navy-900 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-yellow-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-600/30">
              <Calendar className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
                Naval Events & Training
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Join Our <span className="text-yellow-500">Upcoming Events</span> & Training Sessions
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest BVT training events, conferences, workshops, and networking 
              opportunities. Connect with fellow professionals and advance your career.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {[
                { icon: Calendar, value: "50+", label: "Events This Year" },
                { icon: Users, value: "2,500+", label: "Participants" },
                { icon: MapPin, value: "15+", label: "Locations" },
                { icon: Clock, value: "24/7", label: "Registration" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <Icon className="w-6 h-6 text-yellow-500 mb-2 mx-auto" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


