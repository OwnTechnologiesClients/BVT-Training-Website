"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Users, Award, Clock, Sparkles, ArrowRight } from "lucide-react";

export default function ContactFAQ() {
  const [openItems, setOpenItems] = useState(new Set());

  const faqCategories = [
    {
      icon: BookOpen,
      title: "Program Information",
      color: "from-blue-500 to-blue-600",
      questions: [
        {
          question: "What types of training programs do you offer?",
          answer: "We offer comprehensive BVT training programs including technical skills, leadership development, maritime security, navigation, safety protocols, strategic planning, communications, and equipment maintenance. Our programs range from beginner to advanced levels."
        },
        {
          question: "How long are the training programs?",
          answer: "Program duration varies depending on the type and complexity. Short courses range from 1-4 weeks, while comprehensive programs can last 8-16 weeks. We also offer intensive workshops and certification programs."
        },
        {
          question: "Do you offer online training options?",
          answer: "Yes, we provide both in-person and online training options. Our hybrid approach combines virtual learning with hands-on practical sessions to ensure comprehensive skill development."
        },
        {
          question: "What are the prerequisites for enrollment?",
          answer: "Prerequisites vary by program. Most programs require basic BVT knowledge, while advanced courses may require specific certifications or experience levels. We provide detailed requirements for each program."
        }
      ]
    },
    {
      icon: Users,
      title: "Enrollment & Support",
      color: "from-green-500 to-green-600",
      questions: [
        {
          question: "How do I enroll in a training program?",
          answer: "You can enroll through our website, by calling our enrollment hotline, or visiting one of our training centers. Our enrollment specialists will guide you through the process and help you choose the right program."
        },
        {
          question: "What payment options are available?",
          answer: "We accept various payment methods including credit cards, bank transfers, and military payment plans. We also offer flexible payment schedules and financial assistance programs for eligible candidates."
        },
        {
          question: "Is there a refund policy?",
          answer: "Yes, we offer a comprehensive refund policy. Full refunds are available up to 7 days before the program start date, with partial refunds available under certain circumstances. Contact our support team for details."
        },
        {
          question: "Can I transfer between programs?",
          answer: "Program transfers are possible under certain conditions. We evaluate each case individually and may allow transfers with appropriate adjustments to fees and scheduling."
        }
      ]
    },
    {
      icon: Award,
      title: "Certification & Career",
      color: "from-purple-500 to-purple-600",
      questions: [
        {
          question: "Do you provide industry-recognized certifications?",
          answer: "Yes, we offer industry-recognized certifications that are widely accepted in the BVT and maritime sectors. Our certifications are accredited by relevant professional bodies and military organizations."
        },
        {
          question: "How long are certifications valid?",
          answer: "Certification validity varies by type. Most certifications are valid for 2-5 years and require renewal through continuing education or recertification programs."
        },
        {
          question: "Do you offer career placement assistance?",
          answer: "We provide career counseling and job placement assistance to our graduates. Our career services team helps with resume building, interview preparation, and connecting with potential employers."
        },
        {
          question: "What career advancement opportunities are available?",
          answer: "Our training programs are designed to enhance career prospects. Graduates often see promotions, salary increases, and new job opportunities within 6-12 months of completing their programs."
        }
      ]
    },
    {
      icon: Clock,
      title: "Schedule & Logistics",
      color: "from-orange-500 to-orange-600",
      questions: [
        {
          question: "What are the typical class schedules?",
          answer: "Class schedules vary by program. We offer full-time, part-time, evening, and weekend options to accommodate different schedules. Most programs include both classroom instruction and practical training sessions."
        },
        {
          question: "Are there make-up sessions for missed classes?",
          answer: "Yes, we provide make-up sessions for missed classes. Students can attend alternative sessions, access recorded materials, or schedule one-on-one tutoring to catch up on missed content."
        },
        {
          question: "What facilities and equipment are available?",
          answer: "Our training centers feature state-of-the-art facilities including simulation labs, computer labs, practical training areas, and modern classrooms. All necessary equipment and materials are provided."
        },
        {
          question: "Is accommodation available for out-of-town students?",
          answer: "Yes, we offer accommodation options for students traveling from out of town. Our facilities include dormitory-style accommodations and assistance with nearby hotel arrangements."
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <section className="relative py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 lg:mb-10"
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
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">FAQ</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Got Questions?
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                We Have Answers
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our training programs, enrollment process, 
              and support services.
            </p>
          </motion.div>

          {/* FAQ Categories */}
          {faqCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                className="mb-8 lg:mb-12"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{category.title}</h3>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openItems.has(key);
                    
                    return (
                      <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: questionIndex * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        className="group bg-white rounded-xl lg:rounded-2xl shadow-lg border-2 border-gray-200 hover:border-yellow-400 overflow-hidden transition-all"
                      >
                        <motion.button
                          onClick={() => toggleItem(categoryIndex, questionIndex)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all"
                        >
                          <h4 className="text-base lg:text-lg font-bold text-gray-900 pr-4 flex-1">
                            {faq.question}
                          </h4>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className={`w-5 h-5 text-gray-500 ${isOpen ? 'text-yellow-600' : ''}`} />
                          </motion.div>
                        </motion.button>
                        
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-5"
                          >
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
                            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
