"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Users, Award, Clock } from "lucide-react";

export default function ContactFAQ() {
  const [openItems, setOpenItems] = useState(new Set());

  const faqCategories = [
    {
      icon: BookOpen,
      title: "Program Information",
      color: "blue",
      questions: [
        {
          question: "What types of training programs do you offer?",
          answer: "We offer comprehensive naval training programs including technical skills, leadership development, maritime security, navigation, safety protocols, strategic planning, communications, and equipment maintenance. Our programs range from beginner to advanced levels."
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
          answer: "Prerequisites vary by program. Most programs require basic naval knowledge, while advanced courses may require specific certifications or experience levels. We provide detailed requirements for each program."
        }
      ]
    },
    {
      icon: Users,
      title: "Enrollment & Support",
      color: "green",
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
      color: "purple",
      questions: [
        {
          question: "Do you provide industry-recognized certifications?",
          answer: "Yes, we offer industry-recognized certifications that are widely accepted in the naval and maritime sectors. Our certifications are accredited by relevant professional bodies and military organizations."
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
      color: "orange",
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

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600"
    };
    return colorMap[color] || "from-blue-500 to-blue-600";
  };

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
            <div className="inline-flex items-center gap-2 bg-blue-600/10 px-4 py-2 rounded-full border border-blue-600/20 mb-4">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Got Questions? We Have Answers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our training programs, enrollment process, 
              and support services.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                className="mb-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getColorClasses(category.color)} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openItems.has(key);
                    
                    return (
                      <div
                        key={questionIndex}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(categoryIndex, questionIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h4 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h4>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-4"
                          >
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Still Have Questions?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help 
                with any additional questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contact Support
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
