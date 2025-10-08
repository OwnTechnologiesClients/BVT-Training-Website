"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Clock, Award, ChevronRight, CheckCircle, Star } from "lucide-react";
import { useState } from "react";
import { SAMPLE_PROGRAMS } from "./ProgramCard";

export default function LearningPaths({ selectedPath, onPathChange }) {
  const learningPaths = [
    {
      id: "technical",
      title: "Technical Excellence Path",
      description: "Master advanced technical skills in BVT engineering and systems",
      duration: "12-18 months",
      difficulty: "Advanced",
      programCount: 8,
      color: "blue",
      icon: "⚙️",
      outcomes: [
        "Advanced Naval Engineering Certification",
        "Systems Architecture Expertise",
        "Technical Leadership Skills",
        "Innovation & Problem Solving"
      ],
      programs: SAMPLE_PROGRAMS.filter(p => p.category === "Technical").slice(0, 4)
    },
    {
      id: "leadership",
      title: "Leadership Development Path",
      description: "Build essential leadership and management capabilities",
      duration: "8-12 months",
      difficulty: "Intermediate",
      programCount: 6,
      color: "green",
      icon: "👥",
      outcomes: [
        "Executive Leadership Certification",
        "Team Management Skills",
        "Strategic Planning Expertise",
        "Communication Excellence"
      ],
      programs: SAMPLE_PROGRAMS.filter(p => p.category === "Leadership").slice(0, 3)
    },
    {
      id: "security",
      title: "Security & Defense Path",
      description: "Specialize in maritime security and defense protocols",
      duration: "10-14 months",
      difficulty: "Advanced",
      programCount: 7,
      color: "red",
      icon: "🛡️",
      outcomes: [
        "Security Specialist Certification",
        "Defense Strategy Expertise",
        "Risk Assessment Skills",
        "Crisis Management"
      ],
      programs: SAMPLE_PROGRAMS.filter(p => p.category === "Security").slice(0, 4)
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      red: "from-red-500 to-red-600"
    };
    return colorMap[color] || "from-blue-500 to-blue-600";
  };

  const selectedPathData = learningPaths.find(path => path.id === selectedPath);

  return (
    <section className="py-16 bg-gray-50">
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
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow a structured learning journey designed by industry experts. Each path 
              provides a comprehensive curriculum leading to specialized expertise.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Learning Paths Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Available Paths</h3>
                <div className="space-y-4">
                  {learningPaths.map((path, index) => (
                    <button
                      key={path.id}
                      onClick={() => onPathChange(path.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                        selectedPath === path.id
                          ? `bg-gradient-to-r ${getColorClasses(path.color)} text-white shadow-lg`
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{path.icon}</span>
                        <div>
                          <h4 className="font-semibold">{path.title}</h4>
                          <p className="text-sm opacity-80">{path.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>{path.programCount} programs</span>
                        <span className="bg-white/20 px-2 py-1 rounded-full">
                          {path.difficulty}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Path Details */}
            <div className="lg:col-span-3">
              {selectedPathData && (
                <motion.div
                  key={selectedPath}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  {/* Path Header */}
                  <div className={`bg-gradient-to-r ${getColorClasses(selectedPathData.color)} p-8 text-white`}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{selectedPathData.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedPathData.title}</h3>
                        <p className="text-white/90">{selectedPathData.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Duration</span>
                        </div>
                        <div className="text-lg font-bold">{selectedPathData.duration}</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-sm font-medium">Programs</span>
                        </div>
                        <div className="text-lg font-bold">{selectedPathData.programCount} courses</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4" />
                          <span className="text-sm font-medium">Level</span>
                        </div>
                        <div className="text-lg font-bold">{selectedPathData.difficulty}</div>
                      </div>
                    </div>
                  </div>

                  {/* Path Content */}
                  <div className="p-8">
                    {/* Learning Outcomes */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">What You'll Achieve</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedPathData.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Programs in Path */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-6">Programs in This Path</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedPathData.programs.map((program, index) => (
                          <div key={program.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-1">{program.title}</h5>
                                <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
                              </div>
                              {program.badge && (
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                  {program.badge}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{program.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{program.students}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{program.rating}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-blue-900">{program.price}</div>
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                                View Details
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className={`flex-1 bg-gradient-to-r ${getColorClasses(selectedPathData.color)} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                          Start This Path
                        </button>
                        <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                          Download Path Guide
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
