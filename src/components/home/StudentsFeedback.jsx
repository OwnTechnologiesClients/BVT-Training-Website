"use client";

import { motion } from "framer-motion";
import { Star, Quote, ThumbsUp } from "lucide-react";
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
    <section className="px-8 py-36 bg-white relative overflow-hidden">
      {/* Simple Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto relative z-10">
        <div className="mb-16 flex flex-col items-center w-full text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <ThumbsUp className="w-4 h-4 text-blue-900" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
              Success Stories
            </span>
          </div>
          <h2 className="mb-4 text-4xl md:text-5xl font-bold text-gray-900 max-w-3xl">
            What Our Trainees Are Saying
          </h2>
          <p className="mb-10 max-w-2xl text-lg text-gray-500">
            Our mission is to empower BVT personnel with the knowledge and skills
            they need to excel in their careers. Hear from our graduates about their
            training experience.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {FEEDBACKS.map((feedback, key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: key * 0.15, duration: 0.5 }}
              className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-blue-100"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-blue-900" />
              </div>

              <div className="relative">
                {/* Avatar with Border */}
                <div className="mb-6 relative inline-block">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-600 shadow-xl">
                    <img 
                      src={feedback.image}
                      alt={feedback.client}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status Badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Client Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {feedback.client}
                  </h3>
                  <p className="font-semibold text-sm text-blue-900">
                    {feedback.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {feedback.organization}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Feedback Text */}
                <p className="text-gray-600 leading-relaxed italic">
                  &ldquo;{feedback.feedback}&rdquo;
                </p>

                {/* Verified Badge */}
                <div className="mt-6 pt-4 border-t border-blue-100 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-900 flex items-center justify-center">
                    <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">Verified Graduate</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-900 to-blue-950 px-8 py-6 rounded-2xl shadow-xl">
            <div className="text-left">
              <p className="text-yellow-500 font-bold text-lg">Join 8,500+ Successful Graduates</p>
              <p className="text-blue-200 text-sm">Start your BVT training journey today</p>
            </div>
            <Link href="/courses">
            <button className="bg-yellow-600 text-blue-950 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors whitespace-nowrap">
                Explore Courses
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
