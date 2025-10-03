"use client";

import { motion } from "framer-motion";
import { Users, Award, Star, BookOpen, TrendingUp } from "lucide-react";
import MentorCard from "./MentorCard";

const MENTORS_DATA = [
  {
    id: 1,
    name: "Admiral Sarah Mitchell",
    title: "Fleet Commander",
    specialization: "Naval Warfare & Strategy",
    experience: 25,
    rating: 4.9,
    studentsCount: 1250,
    coursesCount: 8,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "Distinguished naval officer with 25 years of experience in fleet operations, strategic planning, and combat leadership. Led multiple successful naval campaigns and trained thousands of officers.",
    achievements: [
      "Led Operation Ocean Shield (2018-2020)",
      "Commander of the 7th Fleet (2015-2018)",
      "Navy Cross recipient for valor in combat",
      "Author of 'Modern Naval Strategy' textbook"
    ],
    bestCourses: [
      { title: "Advanced Naval Warfare Strategies", duration: "16 weeks", students: 250, rating: 4.9 },
      { title: "Fleet Command Operations", duration: "12 weeks", students: 180, rating: 4.8 },
      { title: "Strategic Planning for Naval Officers", duration: "8 weeks", students: 200, rating: 4.7 }
    ],
    linkedin: "https://linkedin.com/in/sarah-mitchell",
    email: "sarah.mitchell@navy.mil"
  },
  {
    id: 2,
    name: "Commander James Rodriguez",
    title: "Submarine Commander",
    specialization: "Submarine Operations & Navigation",
    experience: 18,
    rating: 4.8,
    studentsCount: 890,
    coursesCount: 6,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Expert submarine commander with extensive experience in underwater operations, stealth tactics, and advanced navigation systems. Specialist in nuclear submarine operations.",
    achievements: [
      "Commanded USS Virginia-class submarine",
      "Completed 15 successful patrol missions",
      "Submarine Warfare Specialist certification",
      "Naval Institute Award for Excellence"
    ],
    bestCourses: [
      { title: "Submarine Command Operations", duration: "20 weeks", students: 85, rating: 4.8 },
      { title: "Advanced Underwater Navigation", duration: "14 weeks", students: 120, rating: 4.7 },
      { title: "Nuclear Submarine Systems", duration: "18 weeks", students: 95, rating: 4.9 }
    ],
    linkedin: "https://linkedin.com/in/james-rodriguez",
    email: "james.rodriguez@navy.mil"
  },
  {
    id: 3,
    name: "Captain Elena Chen",
    title: "Cyber Warfare Specialist",
    specialization: "Cyber Security & Digital Warfare",
    experience: 12,
    rating: 4.7,
    studentsCount: 650,
    coursesCount: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Pioneer in naval cyber security with expertise in network defense, digital warfare tactics, and information security protocols. Leads the Navy's cyber defense initiatives.",
    achievements: [
      "Established Navy Cyber Defense Center",
      "Developed cyber security protocols for fleet operations",
      "Navy Information Dominance Award recipient",
      "Ph.D. in Cybersecurity from MIT"
    ],
    bestCourses: [
      { title: "Cyber Defense for Naval Networks", duration: "12 weeks", students: 180, rating: 4.7 },
      { title: "Digital Warfare Tactics", duration: "16 weeks", students: 140, rating: 4.8 },
      { title: "Network Security Fundamentals", duration: "10 weeks", students: 220, rating: 4.6 }
    ],
    linkedin: "https://linkedin.com/in/elena-chen",
    email: "elena.chen@navy.mil"
  },
  {
    id: 4,
    name: "Vice Admiral Michael Thompson",
    title: "Leadership Development Director",
    specialization: "Leadership & Command Excellence",
    experience: 30,
    rating: 4.9,
    studentsCount: 2100,
    coursesCount: 10,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Veteran naval officer with three decades of leadership experience. Expert in organizational development, strategic planning, and executive leadership training for senior officers.",
    achievements: [
      "Chief of Naval Operations Staff (2018-2021)",
      "Commander of Naval Education and Training Command",
      "Distinguished Service Medal recipient",
      "Harvard Business School Executive Program graduate"
    ],
    bestCourses: [
      { title: "Leadership Excellence Program", duration: "18 weeks", students: 120, rating: 4.9 },
      { title: "Executive Command Principles", duration: "14 weeks", students: 95, rating: 4.8 },
      { title: "Strategic Decision Making", duration: "12 weeks", students: 150, rating: 4.7 }
    ],
    linkedin: "https://linkedin.com/in/michael-thompson",
    email: "michael.thompson@navy.mil"
  },
  {
    id: 5,
    name: "Captain Lisa Wang",
    title: "Aircraft Operations Commander",
    specialization: "Flight Operations & Carrier Management",
    experience: 16,
    rating: 4.8,
    studentsCount: 720,
    coursesCount: 7,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    bio: "Accomplished naval aviator and aircraft carrier operations expert. Specializes in flight deck management, aircraft handling procedures, and carrier-based operations.",
    achievements: [
      "Commanded Carrier Air Wing 17",
      "Over 3000 flight hours in naval aircraft",
      "Navy Air Medal with Combat Distinguishing Device",
      "Flight Operations Excellence Award"
    ],
    bestCourses: [
      { title: "Aircraft Carrier Flight Operations", duration: "14 weeks", students: 95, rating: 4.8 },
      { title: "Flight Deck Management", duration: "10 weeks", students: 110, rating: 4.7 },
      { title: "Naval Aviation Safety", duration: "8 weeks", students: 180, rating: 4.6 }
    ],
    linkedin: "https://linkedin.com/in/lisa-wang",
    email: "lisa.wang@navy.mil"
  },
  {
    id: 6,
    name: "Commander Robert Kim",
    title: "Marine Engineering Expert",
    specialization: "Marine Engineering & Systems",
    experience: 20,
    rating: 4.6,
    studentsCount: 580,
    coursesCount: 6,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    bio: "Senior marine engineer with expertise in ship propulsion systems, power generation, and mechanical systems. Leads technical training programs for engineering personnel.",
    achievements: [
      "Chief Engineer on multiple destroyers",
      "Marine Engineering Excellence Award",
      "Professional Engineer (PE) certification",
      "Advanced Nuclear Power School graduate"
    ],
    bestCourses: [
      { title: "Advanced Marine Engineering", duration: "16 weeks", students: 160, rating: 4.6 },
      { title: "Nuclear Power Systems", duration: "20 weeks", students: 85, rating: 4.8 },
      { title: "Ship Propulsion Technology", duration: "12 weeks", students: 140, rating: 4.5 }
    ],
    linkedin: "https://linkedin.com/in/robert-kim",
    email: "robert.kim@navy.mil"
  }
];

export default function MentorsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4 text-blue-900" />
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                Expert Instructors
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learn from Naval Experts
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our instructors are distinguished naval officers with decades of real-world experience. 
              Learn from the best and advance your career with proven strategies and techniques.
            </p>
          </div>
        </div>
      </div>

      {/* Mentor Stats - Full Width */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Users, value: "15+", label: "Expert Instructors" },
              { icon: Award, value: "200+", label: "Years Combined Experience" },
              { icon: Star, value: "4.8/5", label: "Average Instructor Rating" },
              { icon: BookOpen, value: "1,200+", label: "Courses Taught" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Mentors Grid - Full Width */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {MENTORS_DATA.map((mentor, index) => (
            <MentorCard key={mentor.id} mentor={mentor} index={index} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Learn from the Best?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of naval personnel who have advanced their careers through our expert-led training programs. 
              Start your journey with world-class instructors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Meet All Instructors
              </button>
              <button className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-900 hover:text-white transition-colors flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
