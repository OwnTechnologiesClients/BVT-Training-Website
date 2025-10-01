"use client";

import React, { useState, useEffect } from 'react';
import { Phone, Mail, User, Search, Menu, X, ChevronDown, Ship } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Contact Bar - Not Sticky */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-2">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:text-yellow-500 transition-colors cursor-pointer">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">256 214 203 215</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-yellow-500 transition-colors cursor-pointer">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@bvttraining.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 hover:text-yellow-500 transition-colors cursor-pointer">
            <User className="w-4 h-4" />
            <span>Login / Register</span>
          </div>
        </div>
      </div>

      {/* Main Navigation - Sticky */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
            : 'bg-white py-4'
        } border-b border-gray-200`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-950 to-blue-800 rounded-lg flex items-center justify-center shadow-md group hover:shadow-xl transition-shadow">
                  <Ship className="w-7 h-7 text-yellow-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-blue-950 block leading-none">BVT Training</span>
                <span className="text-xs text-gray-500">Naval Excellence</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-950 font-medium hover:bg-blue-50 rounded-lg transition-all relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-950 font-medium hover:bg-blue-50 rounded-lg transition-all relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <div className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-blue-950 font-medium hover:bg-blue-50 rounded-lg transition-all flex items-center gap-1">
                  Courses
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </button>
              </div>
              <div className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-blue-950 font-medium hover:bg-blue-50 rounded-lg transition-all flex items-center gap-1">
                  Programs
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </button>
              </div>
              <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-950 font-medium hover:bg-blue-50 rounded-lg transition-all relative group">
                Events
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-950 font-medium hover:bg-blue-50 rounded-lg transition-all relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              <button className="hidden md:flex p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-950 group-hover:scale-110 transition-transform" />
              </button>
              <button className="hidden md:block bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg hover:scale-105 transition-all">
                Enroll Now
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-in slide-in-from-top">
              <div className="flex flex-col space-y-2">
                <a href="#" className="px-4 py-3 text-gray-700 hover:text-blue-950 hover:bg-blue-50 rounded-lg font-medium transition-all">
                  Home
                </a>
                <a href="#" className="px-4 py-3 text-gray-700 hover:text-blue-950 hover:bg-blue-50 rounded-lg font-medium transition-all">
                  About
                </a>
                <a href="#" className="px-4 py-3 text-gray-700 hover:text-blue-950 hover:bg-blue-50 rounded-lg font-medium transition-all">
                  Courses
                </a>
                <a href="#" className="px-4 py-3 text-gray-700 hover:text-blue-950 hover:bg-blue-50 rounded-lg font-medium transition-all">
                  Programs
                </a>
                <a href="#" className="px-4 py-3 text-gray-700 hover:text-blue-950 hover:bg-blue-50 rounded-lg font-medium transition-all">
                  Events
                </a>
                <a href="#" className="px-4 py-3 text-gray-700 hover:text-blue-950 hover:bg-blue-50 rounded-lg font-medium transition-all">
                  Contact
                </a>
                <button className="mt-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all">
                  Enroll Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
