"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Phone, Mail, ChevronRight, ArrowUp, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <>
      <footer className="text-white bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* GET IN TOUCH */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white uppercase">
                GET IN TOUCH!
              </h3>
              <p className="text-sm mb-4 opacity-90 leading-relaxed">
                Excellence in Naval and Maritime Training. Providing comprehensive courses, events, and programs for professional development.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@bvttraining.com" className="text-sm hover:text-yellow-500 transition-colors">
                    info@bvttraining.com
                  </a>
                </div>
              </div>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-800 hover:bg-yellow-600" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-800 hover:bg-yellow-600" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-800 hover:bg-yellow-600" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-800 hover:bg-yellow-600" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white uppercase">
                QUICK LINKS
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Courses', href: '/courses' },
                  { label: 'Events', href: '/events' },
                  { label: 'Contact', href: '/contact' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="flex items-center space-x-2 text-sm hover:text-yellow-500 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY INFO */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white uppercase">
                COMPANY INFO
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="flex items-center space-x-2 text-sm hover:text-yellow-500 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="flex items-center space-x-2 text-sm hover:text-yellow-500 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    <span>Contact Us</span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="/courses#instructors" 
                    onClick={handleInstructorsClick}
                    className="flex items-center space-x-2 text-sm hover:text-yellow-500 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>Instructors</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="py-4 border-t border-blue-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm opacity-80">
              Copyright © {currentYear} <span className="font-bold text-yellow-500">BVT Training</span>. All Rights Reserved.
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
