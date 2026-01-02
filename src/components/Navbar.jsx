"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, User, Menu, X, ChevronDown, Ship, LogOut, Settings, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import LanguageToggle from './LanguageToggle';
import { NotificationBell } from './notifications';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, student, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const videoRef = useRef(null);
  
  // Determine active tab based on pathname
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };
  
  // Check if any course-related page is active
  const isCoursesActive = pathname.startsWith('/courses');

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Video autoplay handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isUserMenuOpen]);

  return (
    <>
      {/* Video Header Background - Only on home page */}
      {pathname === '/' && !isScrolled && (
        <div className="relative w-full h-32 overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay={false}
            loop
            muted
            playsInline
          >
            <source src="/200993-914924518.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        </div>
      )}

      {/* Top Contact Bar - Enhanced with glassmorphism */}
      <div className={`relative ${pathname === '/' && !isScrolled ? 'bg-transparent' : 'bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950'} text-white py-2 px-3 ${pathname === '/' && !isScrolled ? 'absolute top-0 left-0 right-0 z-40 backdrop-blur-sm bg-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs gap-1.5">
          <div className="flex items-center space-x-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 hover:text-yellow-400 transition-colors cursor-pointer group"
            >
              <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-medium">256 214 203 215</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 hover:text-yellow-400 transition-colors cursor-pointer group"
            >
              <Mail className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-medium">info@bvttraining.com</span>
            </motion.div>
          </div>
          {isAuthenticated ? (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-yellow-400 font-medium"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Welcome, {student?.name || student?.email}</span>
            </motion.div>
          ) : (
            <Link href="/login">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 hover:text-yellow-400 transition-colors font-medium group"
              >
                <User className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                <span>Login / Register</span>
              </motion.div>
            </Link>
          )}
        </div>
      </div>

      {/* Main Navigation - Enhanced with glassmorphism and video background */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-2 border-b-2 border-blue-200' 
            : pathname === '/' 
              ? 'bg-white/80 backdrop-blur-xl py-2.5 border-b border-white/20'
              : 'bg-white py-2.5 border-b border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex justify-between items-center">
            {/* Logo - Enhanced with animation */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-md bg-white p-0.5">
                    <img 
                      src="/BVT_logo.png" 
                      alt="BVT Training Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </motion.div>
              <div>
                <span className="text-base font-bold bg-gradient-to-r from-blue-950 to-blue-700 bg-clip-text text-transparent block leading-none group-hover:from-blue-700 group-hover:to-blue-950 transition-all">
                  BVT Training
                </span>
                <span className="text-[10px] text-gray-500 font-medium">BVT Excellence</span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Enhanced with glassmorphism */}
            <nav className="hidden lg:flex items-center space-x-1.5">
              <Link href="/" className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 relative group overflow-hidden ${
                isActive('/') 
                  ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                  : 'text-gray-700 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
              }`}>
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles className={`w-3.5 h-3.5 ${isActive('/') ? 'text-yellow-600' : 'text-gray-400 group-hover:text-yellow-600'} transition-colors`} />
                  Home
                </span>
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full ${
                    isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <Link href="/about" className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 relative group overflow-hidden ${
                isActive('/about') 
                  ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                  : 'text-gray-700 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
              }`}>
                <span className="relative z-10">About</span>
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full ${
                    isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <Link href="/courses" className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 relative group overflow-hidden ${
                isActive('/courses') 
                  ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                  : 'text-gray-700 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
              }`}>
                <span className="relative z-10">Courses</span>
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full ${
                    isActive('/courses') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              {/* <div className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-blue-950 font-medium hover:bg-blue-50 rounded-lg transition-all flex items-center gap-1">
                  Programs
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </button> */}
                {/* Dropdown Menu */}
                {/* <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link href="/programs" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors">
                      All Programs
                    </Link>
                    <Link href="/programs?category=technical" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors">
                      Technical Training
                    </Link>
                    <Link href="/programs?category=leadership" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors">
                      Leadership Development
                    </Link>
                    <Link href="/programs?category=security" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors">
                      Security & Defense
                    </Link>
                  </div>
                </div>
              </div> */}
              <Link href="/events" className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 relative group overflow-hidden ${
                isActive('/events') 
                  ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                  : 'text-gray-700 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
              }`}>
                <span className="relative z-10">Events</span>
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full ${
                    isActive('/events') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <Link href="/contact" className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 relative group overflow-hidden ${
                isActive('/contact') 
                  ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                  : 'text-gray-700 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
              }`}>
                <span className="relative z-10">Contact</span>
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full ${
                    isActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              
              {/* Notification Bell - Only for authenticated users */}
              {isAuthenticated && (
                <div className="hidden md:block">
                  <NotificationBell />
                </div>
              )}
              {/* Language Toggle */}
              <div className="hidden md:block">
                <LanguageToggle />
              </div>
              
              {isAuthenticated ? (
                <div className="hidden md:block relative user-menu-container">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <User className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">{student?.name?.split(' ')[0] || 'User'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                  
                  {/* User Dropdown Menu - Enhanced */}
                  {isUserMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-1.5 w-48 bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-200/50 z-50 user-menu-container overflow-hidden"
                    >
                      <div className="py-1.5">
                        <div className="px-3.5 py-2 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                          <p className="text-xs font-bold text-gray-900">{student?.name || 'User'}</p>
                          <p className="text-[10px] text-gray-500 truncate mt-0.5">{student?.email}</p>
                        </div>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-3.5 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-950 transition-all duration-200 flex items-center gap-2 font-medium group/item"
                        >
                          <Settings className="w-3.5 h-3.5 group-hover/item:rotate-90 transition-transform" />
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3.5 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 transition-all duration-200 flex items-center gap-2 font-medium group/item cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5 group-hover/item:translate-x-1 transition-transform" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:block bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Enroll Now
                    </span>
                  </motion.button>
                </Link>
              )}
              
              {/* Mobile Menu Button - Enhanced */}
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all duration-300 shadow-md cursor-pointer"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-blue-950" />
                ) : (
                  <Menu className="w-5 h-5 text-blue-950" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu - Enhanced */}
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-3 pb-3 border-t-2 border-blue-200 pt-3 bg-gradient-to-b from-white to-blue-50/30 rounded-b-xl"
            >
              <div className="flex flex-col space-y-1.5">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3.5 py-2 text-sm rounded-lg font-semibold transition-all duration-300 ${
                    isActive('/') 
                      ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                      : 'text-gray-700 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles className={`w-3.5 h-3.5 ${isActive('/') ? 'text-yellow-600' : 'text-gray-400'}`} />
                    Home
                  </div>
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3.5 py-2 text-sm rounded-lg font-semibold transition-all duration-300 ${
                    isActive('/about') 
                      ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                      : 'text-gray-700 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
                  }`}
                >
                  About
                </Link>
                <div className="px-3.5 py-2">
                  <div className={`font-bold mb-2 text-base ${
                    isCoursesActive ? 'text-blue-950' : 'text-gray-700'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <Ship className="w-4 h-4" />
                      Courses
                    </div>
                  </div>
                  <div className="ml-3 space-y-1.5">
                    <Link 
                      href="/courses" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3.5 py-2 text-sm rounded-lg transition-all duration-300 ${
                        pathname === '/courses' || pathname.startsWith('/courses')
                          ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                          : 'text-gray-600 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                        All Courses
                      </div>
                    </Link>
                  </div>
                </div>
                <Link 
                  href="/events" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3.5 py-2 text-sm rounded-lg font-semibold transition-all duration-300 ${
                    isActive('/events') 
                      ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                      : 'text-gray-700 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
                  }`}
                >
                  Events
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3.5 py-2 text-sm rounded-lg font-semibold transition-all duration-300 ${
                    isActive('/contact') 
                      ? 'text-blue-950 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' 
                      : 'text-gray-700 hover:text-blue-950 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
                  }`}
                >
                  Contact
                </Link>
                
                {/* Mobile Language Toggle */}
                <div className="px-3.5 py-2">
                  <LanguageToggle />
                </div>
                
                {/* Mobile Notification Bell */}
                {isAuthenticated && (
                  <div className="px-3.5 py-2 flex items-center gap-2">
                    <NotificationBell />
                    <span className="text-sm text-gray-600">Notifications</span>
                  </div>
                )}
                
                {isAuthenticated ? (
                  <div className="mt-1.5 space-y-2 px-3.5">
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:shadow-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </motion.button>
                    </Link>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-bold hover:from-gray-300 hover:to-gray-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      className="mt-1.5 mx-3.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:shadow-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      Enroll Now
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
}
