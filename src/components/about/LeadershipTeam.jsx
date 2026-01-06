"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Award, Users, Briefcase, Sparkles, CheckCircle2 } from "lucide-react";

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
    <section id="leadership-team" className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-gradient-to-br from-white via-blue-50/50 to-white overflow-hidden">
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
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Leadership Team</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              Meet Our Leadership
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our leadership team brings together decades of BVT experience, educational expertise, 
            and a shared commitment to excellence in training the next generation of maritime professionals.
          </p>
        </motion.div>

        {/* Team Grid - Commented out */}
        {false && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all"
            >
              {/* Profile Image */}
              <div className="relative h-64 lg:h-72 overflow-hidden">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/50 to-transparent"></div>
                
                {/* Experience Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                >
                  {member.experience}
                </motion.div>

                {/* Department Badge */}
                <div className="absolute bottom-4 left-4 bg-blue-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/20">
                  {member.department}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="mb-4">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-900 font-semibold mb-3 text-base lg:text-lg">{member.position}</p>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{member.bio}</p>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {member.achievements.map((achievement, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium border border-blue-200"
                      >
                        {achievement}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500 font-medium">Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-blue-100 rounded-full transition-colors group"
                    >
                      <Mail className="w-4 h-4 text-gray-600 group-hover:text-blue-900" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-blue-100 rounded-full transition-colors group"
                    >
                      <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-blue-900" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Placeholder Message */}
        <div className="text-center py-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-300"
          >
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-600">Leadership will come here</p>
          </motion.div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {[
            { icon: Users, number: "6", label: "Leadership Team Members", color: "from-blue-500 to-blue-600" },
            { icon: Award, number: "180+", label: "Combined Years Experience", color: "from-yellow-500 to-yellow-600" },
            { icon: Briefcase, number: "15+", label: "Specialized Departments", color: "from-green-500 to-green-600" },
            { icon: Award, number: "50+", label: "Awards & Recognitions", color: "from-purple-500 to-purple-600" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center p-4 lg:p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-1">{stat.number}</div>
                <div className="text-xs lg:text-sm text-gray-600 font-medium leading-tight">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
