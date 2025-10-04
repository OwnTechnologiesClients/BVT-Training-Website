import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Users, Award, BookOpen, Headphones } from "lucide-react";

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our training specialists",
      contact: "+1 (555) 123-4567",
      hours: "Mon-Fri: 8AM-6PM EST",
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses to your inquiries",
      contact: "info@navytraining.com",
      hours: "Response within 24 hours",
      color: "green"
    },
    {
      icon: Users,
      title: "Live Chat",
      description: "Instant support during business hours",
      contact: "Chat with us now",
      hours: "Mon-Fri: 9AM-5PM EST",
      color: "purple"
    },
    {
      icon: Headphones,
      title: "Emergency Support",
      description: "24/7 urgent training support",
      contact: "+1 (555) 911-TRAIN",
      hours: "Available 24/7",
      color: "red"
    }
  ];

  const departments = [
    {
      icon: BookOpen,
      title: "Program Information",
      description: "Questions about courses, schedules, and enrollment",
      contact: "programs@navytraining.com",
      color: "blue"
    },
    {
      icon: Award,
      title: "Certification Support",
      description: "Help with certifications and credentials",
      contact: "certifications@navytraining.com",
      color: "green"
    },
    {
      icon: Clock,
      title: "Technical Support",
      description: "Platform issues and technical assistance",
      contact: "support@navytraining.com",
      color: "purple"
    },
    {
      icon: Users,
      title: "Career Counseling",
      description: "Personalized career guidance and advice",
      contact: "counseling@navytraining.com",
      color: "orange"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      red: "from-red-500 to-red-600",
      orange: "from-orange-500 to-orange-600"
    };
    return colorMap[color] || "from-blue-500 to-blue-600";
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
              Multiple Ways to Connect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the communication method that works best for you. Our team is committed 
              to providing exceptional support for all your training needs.
            </p>
          </motion.div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${getColorClasses(method.color)} rounded-full mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                <div className="space-y-2">
                  <div className="font-semibold text-gray-900">{method.contact}</div>
                  <div className="text-sm text-gray-500">{method.hours}</div>
                </div>
                <button className={`mt-4 w-full bg-gradient-to-r ${getColorClasses(method.color)} text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity`}>
                  Contact Now
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Department Contacts */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Department Contacts
            </h3>
            <p className="text-gray-600">
              Get specialized support from the right department for faster assistance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${getColorClasses(dept.color)} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{dept.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{dept.description}</p>
                      <div className="text-blue-600 font-medium text-sm">{dept.contact}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Office Hours */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-lg font-semibold mb-1">Monday - Friday</div>
                <div className="text-blue-100">8:00 AM - 6:00 PM EST</div>
              </div>
              <div>
                <div className="text-lg font-semibold mb-1">Saturday</div>
                <div className="text-blue-100">9:00 AM - 4:00 PM EST</div>
              </div>
              <div>
                <div className="text-lg font-semibold mb-1">Sunday</div>
                <div className="text-blue-100">Emergency Support Only</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
