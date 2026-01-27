"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Sparkles } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Cato Grasdal",
    position: "Senior Maritime Instructor & CEO",
    experience: "30+ Years",
    image: "/Cato Grasdal.jpeg",
    bio: "Cato Grasdal is a senior maritime professional with over 30 years of experience at sea, including two decades as a Ship's Captain in demanding offshore and seismic operations. A Master Mariner since 1995, Cato spent years commanding complex vessels for PGS (now TGS), playing a key role in the commissioning of major newbuilds like the Ramform Titan and Ramform Tethys. Since transitioning to a shore-based leadership role in 2022, Cato has focused on elevating operational safety and competence. This focus culminated recently when BVT Training saw the world in 2025, a year where Cato expanded his training programs globally, validating his methodologies across diverse international operations. As a qualified IMO Instructor (6.09 & 6.10), Cato specializes in human factors, stress management, and proactive decision-making. He has trained over 120 participants and was instrumental in developing the new HDPE workboat prototype. Cato's teaching philosophy is simple: he translates regulation into reality, aiming to build confidence and sound judgment, not just compliance.",
    achievements: ["Master Mariner", "IMO Instructor", "30+ Years Experience"]
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

        {/* Team Grid */}
        {true && (
        <div className="grid grid-cols-1 gap-6 lg:gap-8 mb-16 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all flex flex-col md:flex-row"
            >
              {/* Profile Image - Left Side */}
              <div className="relative w-full md:w-2/5 lg:w-2/5 h-64 md:h-120 overflow-hidden flex-shrink-0">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/50 to-transparent md:bg-gradient-to-t md:from-blue-950/90 md:via-blue-950/50 md:to-transparent"></div>
                
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

              {/* Content - Right Side */}
              <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-900 font-semibold mb-3 text-base lg:text-lg">{member.position}</p>
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-7">{member.bio}</p>
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
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
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
      </div>
    </section>
  );
}
