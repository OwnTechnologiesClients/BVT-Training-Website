"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Award, Ship, Anchor } from "lucide-react";

const TIMELINE = [
  {
    year: "1973",
    title: "Foundation",
    description: "BVT Training was established with a vision to provide world-class naval vocational training.",
    icon: Ship,
    color: "from-blue-600 to-blue-800"
  },
  {
    year: "1985",
    title: "Expansion",
    description: "Expanded to include advanced technical programs and leadership development courses.",
    icon: Users,
    color: "from-blue-700 to-blue-900"
  },
  {
    year: "1995",
    title: "Recognition",
    description: "Received official recognition from the US Navy for excellence in vocational training.",
    icon: Award,
    color: "from-blue-800 to-blue-950"
  },
  {
    year: "2005",
    title: "Innovation",
    description: "Introduced modern simulation technology and digital learning platforms.",
    icon: Anchor,
    color: "from-slate-700 to-slate-900"
  },
  {
    year: "2015",
    title: "Global Reach",
    description: "Extended training programs to international naval forces and maritime organizations.",
    icon: Ship,
    color: "from-indigo-700 to-indigo-900"
  },
  {
    year: "2025",
    title: "Future",
    description: "Continuing to lead in naval education with cutting-edge technology and methodologies.",
    icon: Award,
    color: "from-blue-900 to-blue-950"
  }
];

export default function OurStory() {
  return (
    <section className="px-8 py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Calendar className="w-4 h-4 text-blue-900" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
              Our Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Story Through the Decades
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            From humble beginnings in 1973 to becoming a global leader in naval vocational training, 
            our journey has been marked by continuous innovation, excellence, and dedication to our mission.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-yellow-500 to-blue-600 rounded-full"></div>

          <div className="space-y-12">
            {TIMELINE.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all group ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
                        <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{item.year}</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-6 h-6 bg-yellow-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative z-10">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Empty Space */}
                  <div className="w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white px-8 py-6 rounded-2xl shadow-xl border border-gray-200">
            <div className="text-left">
              <p className="text-blue-900 font-bold text-lg">Join Our Continuing Legacy</p>
              <p className="text-gray-600 text-sm">Be part of the next chapter in naval training excellence</p>
            </div>
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors whitespace-nowrap shadow-lg">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
