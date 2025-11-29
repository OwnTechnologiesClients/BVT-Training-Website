"use client";

import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Clock, Shield, Target, Star, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const REASONS = [
  {
    icon: Award,
    title: "Proven Excellence",
    description: "50+ years of delivering world-class BVT training with a 95% graduate success rate.",
    benefits: ["Established in 1973", "95% Success Rate", "Navy Certified"]
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from experienced BVT officers and industry professionals with decades of real-world experience.",
    benefits: ["120+ Expert Instructors", "Real-World Experience", "Navy Certified"]
  },
  {
    icon: Target,
    title: "Comprehensive Programs",
    description: "400+ specialized training programs covering all aspects of BVT operations and maritime careers.",
    benefits: ["400+ Programs", "All Specialties", "Career-Focused"]
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Industry-leading safety protocols and comprehensive support systems for all trainees.",
    benefits: ["Safety Excellence", "24/7 Support", "Risk Management"]
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Multiple learning formats including hands-on training, simulation, and digital platforms.",
    benefits: ["Multiple Formats", "Flexible Schedule", "Modern Technology"]
  },
  {
    icon: Star,
    title: "Career Advancement",
    description: "Proven track record of helping graduates advance their careers in BVT and maritime industries.",
    benefits: ["Career Support", "Industry Connections", "Success Stories"]
  }
];

const TESTIMONIALS = [
  {
    quote: "BVT Training transformed my career. The comprehensive programs and expert instruction prepared me perfectly for my role as a navigation specialist.",
    author: "Petty Officer Sarah Martinez",
    role: "Navigation Specialist",
    rating: 5
  },
  {
    quote: "The hands-on approach and real-world scenarios made all the difference. I felt confident and prepared from day one of my new position.",
    author: "Lieutenant David Chen",
    role: "Engineering Officer",
    rating: 5
  }
];

export default function WhyChooseUs() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-blue-950" />
              </div>
            </motion.div>
            <div className="bg-blue-100 px-4 py-2 rounded-full border border-blue-200">
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Why Choose Us</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              The BVT Training Advantage
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover what makes BVT Training the premier choice for BVT vocational education 
            and career advancement in the maritime industry.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-32 h-32 border-2 border-blue-600 rounded-full"></div>
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  >
                    <Icon className="w-8 h-8 lg:w-9 lg:h-9 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4 text-base lg:text-lg">{reason.description}</p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {reason.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm lg:text-base text-gray-600">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-8 lg:mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">What Our Graduates Say</h3>
            <p className="text-gray-600 text-base lg:text-lg">Real testimonials from successful BVT Training graduates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 leading-relaxed mb-4 italic text-base lg:text-lg">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm lg:text-base">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-base lg:text-lg">{testimonial.author}</div>
                    <div className="text-sm lg:text-base text-blue-900">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border-2 border-yellow-400/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Naval Career Journey?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                Join thousands of successful graduates who have advanced their careers through BVT Training's 
                world-class programs. Your future in BVT excellence starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/courses"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-8 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Explore Courses
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-yellow-600 text-yellow-500 px-8 py-4 rounded-xl font-bold hover:bg-yellow-600 hover:text-blue-950 transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
