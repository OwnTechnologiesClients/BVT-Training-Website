"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Award, Users, Briefcase } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Admiral James Mitchell",
    position: "Chief Executive Officer",
    department: "Executive Leadership",
    experience: "35+ Years",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    bio: "Former Chief of Naval Operations with extensive experience in maritime strategy and leadership development.",
    achievements: ["Former CNO", "Naval Academy Graduate", "35+ Years Service"]
  },
  {
    name: "Captain Sarah Martinez",
    position: "Chief Training Officer",
    department: "Training Operations",
    experience: "28+ Years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    bio: "Expert in BVT training methodologies with a focus on modern simulation and hands-on learning approaches.",
    achievements: ["Training Excellence Award", "28+ Years Experience", "Innovation Leader"]
  },
  {
    name: "Commander David Chen",
    position: "Director of Operations",
    department: "Operations",
    experience: "25+ Years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Specializes in maritime operations and safety protocols, ensuring the highest standards in all training programs.",
    achievements: ["Operations Expert", "Safety Specialist", "25+ Years Service"]
  },
  {
    name: "Lieutenant Commander Emily Rodriguez",
    position: "Head of Curriculum Development",
    department: "Academic Affairs",
    experience: "20+ Years",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    bio: "Leads curriculum innovation and ensures all programs meet the highest educational and professional standards.",
    achievements: ["Curriculum Innovation", "Academic Excellence", "20+ Years Teaching"]
  },
  {
    name: "Master Chief Robert Johnson",
    position: "Senior Instructor",
    department: "Technical Training",
    experience: "30+ Years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "Master craftsman and technical expert with unparalleled knowledge in marine engineering and systems operations.",
    achievements: ["Master Craftsman", "Technical Expert", "30+ Years Experience"]
  },
  {
    name: "Dr. Lisa Thompson",
    position: "Chief Medical Officer",
    department: "Health & Safety",
    experience: "22+ Years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    bio: "Ensures the health and safety of all trainees through comprehensive medical support and emergency response protocols.",
    achievements: ["Medical Expert", "Safety Champion", "22+ Years Service"]
  }
];

export default function LeadershipTeam() {
  return (
    <section id="leadership-team" className="px-8 py-20 bg-white">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Users className="w-4 h-4 text-blue-900" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
              Leadership Team
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Our leadership team brings together decades of BVT experience, educational expertise, 
            and a shared commitment to excellence in training the next generation of maritime professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all"
            >
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent"></div>
                
                {/* Experience Badge */}
                <div className="absolute top-4 right-4 bg-yellow-600 text-blue-950 px-3 py-1 rounded-full text-xs font-bold">
                  {member.experience}
                </div>

                {/* Department Badge */}
                <div className="absolute bottom-4 left-4 bg-blue-900/90 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                  {member.department}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-900 font-semibold mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {member.achievements.map((achievement, idx) => (
                      <span 
                        key={idx}
                        className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-blue-100 rounded-full transition-colors group">
                      <Mail className="w-4 h-4 text-gray-600 group-hover:text-blue-900" />
                    </button>
                    <button className="p-2 hover:bg-blue-100 rounded-full transition-colors group">
                      <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-blue-900" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Users, number: "6", label: "Leadership Team Members" },
            { icon: Award, number: "180+", label: "Combined Years Experience" },
            { icon: Briefcase, number: "15+", label: "Specialized Departments" },
            { icon: Award, number: "50+", label: "Awards & Recognitions" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-blue-950" />
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
