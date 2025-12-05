import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Clock } from "lucide-react";

export default function EventsStats() {
  const stats = [
    {
      icon: Calendar,
      value: "50+",
      label: "Events This Year",
      description: "Comprehensive training and networking events"
    },
    {
      icon: Users,
      value: "2,500+",
      label: "Total Participants",
      description: "Naval professionals from around the world"
    },
    {
      icon: MapPin,
      value: "15+",
      label: "Event Locations",
      description: "Strategic venues across BVT bases"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Registration Support",
      description: "Round-the-clock assistance available"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Be part of the largest BVT training community. Our events bring together 
            professionals from across the globe for knowledge sharing and networking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


