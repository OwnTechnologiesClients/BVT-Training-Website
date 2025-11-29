"use client";

import { motion } from "framer-motion";
import { Star, Quote, ThumbsUp, Sparkles, Award, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const FEEDBACKS = [
  {
    feedback:
      "The training program transformed my career. The practical approach and expert instructors prepared me perfectly for my role in the Pacific Fleet.",
    client: "Petty Officer Sarah Martinez",
    title: "Navigation Specialist",
    organization: "Pacific Fleet",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
  },
  {
    feedback:
      "From basic training to advanced operations, BVT provided comprehensive education that exceeded my expectations. The hands-on experience was invaluable.",
    client: "Lieutenant David Chen",
    title: "Engineering Officer",
    organization: "Atlantic Command",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
  },
  {
    feedback:
      "The leadership program gave me the skills and confidence to advance to command positions. The mentorship and practical scenarios were exceptional.",
    client: "Chief Warrant Officer Michael Roberts",
    title: "Operations Chief",
    organization: "Naval Reserve",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop"
  },
];

export default function StudentsFeedback() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-blue-50/50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/10 to-yellow-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 border-yellow-500/30 mb-6 shadow-lg"
          >
            <ThumbsUp className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-700 uppercase tracking-wider">
              Success Stories
            </span>
            <Sparkles className="w-5 h-5 text-yellow-600 animate-pulse" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 bg-clip-text text-transparent mb-6">
            What Our Trainees Are Saying
          </h2>
          <p className="text-lg md:text-xl text-gray-600 lg:w-6/12 max-w-3xl mx-auto leading-relaxed">
            Our mission is to empower BVT personnel with the knowledge and skills
            they need to excel in their careers. Hear from our graduates about their
            training experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {FEEDBACKS.map((feedback, key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ 
                default: { delay: key * 0.15, duration: 0.6, type: "spring" },
                hover: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
              }}
              className="group relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-7 shadow-xl hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-yellow-400/50 overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-yellow-50 to-transparent rounded-tr-full opacity-30"></div>

              {/* Quote Icon - Enhanced */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: key * 0.15 + 0.2, duration: 0.5 }}
                className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity"
              >
                <Quote className="w-12 h-12 lg:w-14 lg:h-14 text-blue-900" />
              </motion.div>

              <div className="relative">
                {/* Avatar with Enhanced Border */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: [0, -3, 3, -3, 0] }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 relative inline-block"
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    {/* Avatar Border */}
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-[3px] border-yellow-500 shadow-lg">
                      <img 
                        src={feedback.image}
                        alt={feedback.client}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(feedback.client) + '&background=1e40af&color=fff&size=200';
                        }}
                      />
                    </div>
                    {/* Status Badge - Enhanced */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute -bottom-0.5 -right-0.5 w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-green-500 to-green-600 rounded-full border-[3px] border-white shadow-lg flex items-center justify-center z-10"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Client Info - Enhanced */}
                <div className="mb-4">
                  <h3 className="text-lg lg:text-xl font-extrabold text-gray-900 mb-1.5 group-hover:text-blue-900 transition-colors">
                    {feedback.client}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Award className="w-3.5 h-3.5 text-yellow-600" />
                    <p className="font-bold text-sm text-blue-900">
                      {feedback.title}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    {feedback.organization}
                  </p>
                </div>

                {/* Rating - Enhanced */}
                <div className="flex gap-1 mb-4">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: key * 0.15 + 0.3 + i * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                    >
                      <Star className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-500 text-yellow-500 drop-shadow-sm" />
                    </motion.div>
                  ))}
                </div>

                {/* Feedback Text - Enhanced */}
                <div className="relative mb-5">
                  <Quote className="absolute -top-1 -left-1 w-5 h-5 text-blue-200 opacity-40" />
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed italic pl-4 relative z-10 font-medium line-clamp-4">
                    {feedback.feedback}
                  </p>
                </div>

                {/* Verified Badge - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: key * 0.15 + 0.5, duration: 0.5 }}
                  className="pt-4 border-t border-blue-100 flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-md flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-xs lg:text-sm font-bold text-gray-900 block">Verified Graduate</span>
                    <span className="text-[10px] lg:text-xs text-gray-500">Certified BVT Training</span>
                  </div>
                </motion.div>
              </div>

              {/* Shine Effect on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none overflow-hidden"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                ></motion.div>
              </motion.div>

              {/* Decorative Corner Accent */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full"
              ></motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-2xl border-4 border-yellow-400/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 border-yellow-400/50 mb-6"
              >
                <TrendingUp className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                  Join Our Community
                </span>
              </motion.div>
              
              <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
                Join 8,500+ Successful Graduates
              </h3>
              <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your BVT training journey today and transform your career
              </p>
              
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(234, 179, 8, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-950 px-10 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 shadow-xl overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative z-10 flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    <span>Explore Courses</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
