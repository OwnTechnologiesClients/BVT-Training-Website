import { motion } from "framer-motion";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

export default function ProgramsStats() {
  const stats = [
    {
      icon: TrendingUp,
      value: "98%",
      label: "Career Advancement",
      description: "Graduates see career growth within 6 months"
    },
    {
      icon: Users,
      value: "15,000+",
      label: "Active Learners",
      description: "Currently enrolled in our programs"
    },
    {
      icon: Award,
      value: "500+",
      label: "Certifications",
      description: "Industry-recognized credentials awarded"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Learning Support",
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Programs?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our training programs are designed with naval professionals in mind, 
            combining practical skills with theoretical knowledge.
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


