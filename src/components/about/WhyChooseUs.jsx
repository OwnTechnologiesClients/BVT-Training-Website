"use client";

import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Clock, Shield, Target, Star } from "lucide-react";
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
    <section className="px-8 py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-4 h-4 text-blue-900" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The BVT Training Advantage
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Discover what makes BVT Training the premier choice for BVT vocational education 
            and career advancement in the maritime industry.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{reason.description}</p>

                {/* Benefits */}
                <div className="space-y-2">
                  {reason.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">What Our Graduates Say</h3>
            <p className="text-gray-600">Real testimonials from successful BVT Training graduates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-blue-900">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Naval Career Journey?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of successful graduates who have advanced their careers through BVT Training's 
                world-class programs. Your future in BVT excellence starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses" className="bg-yellow-600 text-blue-950 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow-lg flex items-center justify-center gap-2">
                  <Award className="w-5 h-5" />
                  Explore Courses
                </Link>
                <Link href="/contact" className="border-2 border-yellow-600 text-yellow-500 px-8 py-4 rounded-lg font-bold hover:bg-yellow-600 hover:text-blue-950 transition-colors flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
