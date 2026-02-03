"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Phone, Mail, ChevronRight, ArrowUp, Facebook, Twitter, Linkedin, Youtube, Sparkles, Award, MapPin, Clock, Code2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show scroll-to-top button after scrolling past hero section (approximately 600px)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      // Show button after scrolling 600px (past hero section)
      setShowScrollTop(scrollPosition > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInstructorsClick = (e) => {
    e.preventDefault();
    if (pathname === '/courses') {
      // If already on courses page, update hash and scroll
      window.history.pushState(null, '', '/courses#instructors');
      setTimeout(() => {
        const element = document.getElementById('instructors');
        if (element) {
          const offsetTop = element.offsetTop - 100; // Account for header
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Navigate to courses page with hash
      router.push('/courses#instructors');
    }
  };

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <footer className="relative text-white bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        {/* Main Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-10 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* GET IN TOUCH - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {/* Header with Badge */}
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-blue-950" />
                  </div>
                  {isMounted && (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="absolute -top-0.5 -right-0.5"
                    >
                      <Award className="w-3 h-3 text-yellow-400" />
                    </motion.div>
                  )}
                </motion.div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                    GET IN TOUCH!
                  </h3>
                  <div className="h-0.5 w-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mt-0.5"></div>
                </div>
              </div>

              <p className="text-xs lg:text-sm mb-4 opacity-90 leading-relaxed max-w-lg">
                Excellence in Maritime Training. Providing comprehensive courses, events, and programs for professional development.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-2 mb-4">
                <motion.a
                  href="mailto:Cato.grasdal@gmail.com"
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center space-x-2 group bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:border-yellow-500/50 hover:bg-white/10 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs lg:text-sm group-hover:text-yellow-400 transition-colors">
                    Cato.grasdal@gmail.com
                  </span>
                </motion.a>
              </div>

              {/* Social Media Icons - Enhanced */}
              <div>
                <p className="text-xs font-semibold mb-2 text-yellow-400">Follow Us</p>
                <div className="flex space-x-2">
                  {[
                    { icon: Facebook, label: 'Facebook', href: '#' },
                    { icon: Twitter, label: 'Twitter', href: '#' },
                    { icon: Linkedin, label: 'LinkedIn', href: '#' },
                    { icon: Youtube, label: 'YouTube', href: '#' }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.1, rotate: [0, -10, 10, 0] }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-br from-blue-800/50 to-blue-900/50 hover:from-yellow-500 hover:to-yellow-600 border-2 border-white/20 hover:border-yellow-400 shadow-lg hover:shadow-yellow-500/50"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* QUICK LINKS - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-4">
                <h3 className="text-base lg:text-lg font-bold mb-1.5 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                  QUICK LINKS
                </h3>
                <div className="h-0.5 w-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              </div>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Courses', href: '/courses' },
                  { label: 'Events', href: '/events' },
                  { label: 'Contact', href: '/contact' }
                ].map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center space-x-2 text-xs lg:text-sm hover:text-yellow-400 transition-all bg-white/5 backdrop-blur-sm rounded-md p-1.5 border border-transparent hover:border-yellow-500/30"
                    >
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-yellow-500" />
                      </motion.div>
                      <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* COMPANY INFO - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-4">
                <h3 className="text-base lg:text-lg font-bold mb-1.5 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                  COMPANY INFO
                </h3>
                <div className="h-0.5 w-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              </div>
              <ul className="space-y-2">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact Us', href: '/contact' },
                  { label: 'Terms and Conditions', href: '/terms' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Instructors', href: '/courses#instructors', onClick: handleInstructorsClick }
                ].map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {item.onClick ? (
                      <a
                        href={item.href}
                        onClick={item.onClick}
                        className="group flex items-center space-x-2 text-xs lg:text-sm hover:text-yellow-400 transition-all bg-white/5 backdrop-blur-sm rounded-md p-1.5 border border-transparent hover:border-yellow-500/30"
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-yellow-500" />
                        </motion.div>
                        <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="group flex items-center space-x-2 text-xs lg:text-sm hover:text-yellow-400 transition-all bg-white/5 backdrop-blur-sm rounded-md p-1.5 border border-transparent hover:border-yellow-500/30"
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-yellow-500" />
                        </motion.div>
                        <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Copyright Bar - Enhanced */}
        <div className="relative z-10 py-4 border-t border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs lg:text-sm opacity-90"
              >
                Copyright © {currentYear}{' '}
                <span className="font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  BVT Training
                </span>
                . All Rights Reserved.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1.5 text-[10px] lg:text-xs opacity-80"
              >
                <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                <span>Maritime Excellence</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Built By Section */}
        <div className="relative z-10 py-3 border-t border-white/5 bg-gradient-to-r from-transparent via-white/3 to-transparent">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2"
            >
              <div className="flex items-center gap-1.5 text-[10px] lg:text-xs opacity-70">
                <Code2 className="w-3.5 h-3.5 text-yellow-400" />
                <span>Built with excellence by</span>
              </div>
              <motion.a
                href="https://owntechnologies.in"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 group"
              >
                <span className="font-bold text-xs lg:text-sm bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-yellow-500 transition-all">
                  OwnTechnologies.in
                </span>
                <ExternalLink className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
              </motion.a>
              <div className="text-[10px] lg:text-xs opacity-60">
                <span>|</span>
                <span className="ml-1.5">Premium Web Solutions & Digital Innovation</span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button - Enhanced */}
      {isMounted && showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-4 right-5 w-11 h-11 rounded-lg shadow-2xl flex items-center justify-center transition-all duration-300 z-50 bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 border-2 border-white/20 hover:border-white/40 cursor-pointer"
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowUp className="w-5 h-5 text-blue-950" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          ></motion.div>
        </motion.button>
      )}
    </>
  );
}
