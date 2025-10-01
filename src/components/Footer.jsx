"use client";

import React from 'react';
import { Phone, Mail, ChevronRight, Calendar, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="text-white bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* GET IN TOUCH */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white uppercase">
                GET IN TOUCH!
              </h3>
              <p className="text-sm mb-4 opacity-90 leading-relaxed">
                Fusce varius, dolor tempor interdum tristiquei bibendum.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">(702) 123-1478</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">info@company.com</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-800 hover:bg-yellow-600">
                  <span className="text-xs font-bold">f</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-800 hover:bg-yellow-600">
                  <span className="text-xs font-bold">Bē</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-800 hover:bg-yellow-600">
                  <span className="text-xs font-bold">in</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-800 hover:bg-yellow-600">
                  <span className="text-xs font-bold">p</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-800 hover:bg-yellow-600">
                  <span className="text-xs font-bold">yt</span>
                </a>
              </div>
            </div>

            {/* COMPANY INFO */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white uppercase">
                COMPANY INFO
              </h3>
              <ul className="space-y-2">
                {['About Us', 'Resource Center', 'Careers', 'Instructor', 'Become A Teacher'].map((item) => (
                  <li key={item}>
                    <a href="#" className="flex items-center space-x-2 text-sm hover:text-teal-200 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* USEFUL LINKS */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white uppercase">
                USEFUL LINKS
              </h3>
              <ul className="space-y-2">
                {['All Courses', 'Digital Marketing', 'Design & Branding', 'Storytelling & Voice Over', 'News & Blogs'].map((item) => (
                  <li key={item}>
                    <a href="#" className="flex items-center space-x-2 text-sm hover:text-teal-200 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* RECENT POST */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white uppercase">
                RECENT POST
              </h3>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="w-16 h-16 bg-gray-600 rounded flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=face" 
                      alt="Students studying" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1 leading-tight">
                      Importance of Arts Integrating
                    </h4>
                    <div className="flex items-center space-x-1 text-xs opacity-80">
                      <Calendar className="w-3 h-3" />
                      <span>20 April, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="w-16 h-16 bg-gray-600 rounded flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=face" 
                      alt="Students studying" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1 leading-tight">
                      Development Student Best Achievement
                    </h4>
                    <div className="flex items-center space-x-1 text-xs opacity-80">
                      <Calendar className="w-3 h-3" />
                      <span>20 April, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="py-4 border-t border-blue-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm opacity-80">
              Copyright © 2025 <span className="font-bold text-yellow-500">BVT Training</span>. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 z-50 bg-gradient-to-br from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 border-2 border-yellow-600"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 text-yellow-500" />
      </button>
    </>
  );
}
