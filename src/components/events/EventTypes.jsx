"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Presentation, Trophy, Shield, BookOpen, Radio, Wrench } from "lucide-react";

export default function EventTypes() {
  const eventTypes = [
    {
      icon: Presentation,
      title: "Conferences",
      description: "Large-scale professional gatherings with keynote speakers and networking",
      count: "12 Events",
      color: "blue",
      features: ["Keynote Speakers", "Panel Discussions", "Networking Sessions", "Exhibition Hall"]
    },
    {
      icon: Users,
      title: "Workshops",
      description: "Hands-on training sessions with interactive learning experiences",
      count: "28 Events",
      color: "green",
      features: ["Interactive Learning", "Small Groups", "Practical Exercises", "Certificates"]
    },
    {
      icon: Trophy,
      title: "Competitions",
      description: "Skills competitions and challenges for naval professionals",
      count: "8 Events",
      color: "yellow",
      features: ["Skill Challenges", "Team Competitions", "Awards", "Recognition"]
    },
    {
      icon: Shield,
      title: "Drills & Exercises",
      description: "Emergency response and tactical training simulations",
      count: "15 Events",
      color: "red",
      features: ["Realistic Scenarios", "Emergency Response", "Team Coordination", "Debriefing"]
    },
    {
      icon: BookOpen,
      title: "Seminars",
      description: "Educational sessions on specific topics and best practices",
      count: "22 Events",
      color: "purple",
      features: ["Expert Speakers", "Case Studies", "Q&A Sessions", "Materials"]
    },
    {
      icon: Radio,
      title: "Tech Demonstrations",
      description: "Showcasing latest naval technology and equipment",
      count: "18 Events",
      color: "indigo",
      features: ["Live Demos", "Hands-on Testing", "Technical Q&A", "Innovation"]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      yellow: "from-yellow-500 to-yellow-600",
      red: "from-red-500 to-red-600",
      purple: "from-purple-500 to-purple-600",
      indigo: "from-indigo-500 to-indigo-600"
    };
    return colorMap[color] || "from-blue-500 to-blue-600";
  };

  const getHoverClasses = (color) => {
    const colorMap = {
      blue: "hover:shadow-blue-200",
      green: "hover:shadow-green-200",
      yellow: "hover:shadow-yellow-200",
      red: "hover:shadow-red-200",
      purple: "hover:shadow-purple-200",
      indigo: "hover:shadow-indigo-200"
    };
    return colorMap[color] || "hover:shadow-blue-200";
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Events We Host
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From large conferences to intimate workshops, we offer diverse event formats 
              to meet every learning and networking need in the naval community.
            </p>
          </motion.div>
        </div>

        {/* Event Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer ${getHoverClasses(type.color)}`}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${getColorClasses(type.color)} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-12 h-12" />
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {type.count}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{type.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>

                {/* Features */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What to Expect:</h4>
                  <ul className="space-y-3">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-gray-600">
                        <div className={`w-2 h-2 bg-gradient-to-r ${getColorClasses(type.color)} rounded-full flex-shrink-0`}></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Action Button */}
                  <button className={`w-full mt-6 bg-gradient-to-r ${getColorClasses(type.color)} text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity group-hover:scale-105 transform transition-transform`}>
                    View {type.title}
                  </button>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getColorClasses(type.color)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Host Your Own Event
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Have an idea for a naval training event? Partner with us to create meaningful 
              experiences for the naval community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Propose Event
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Partnership Info
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
