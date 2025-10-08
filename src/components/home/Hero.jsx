"use client";

import { motion } from "framer-motion";
import { Ship, Anchor, Award, Users } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible, play it
            video.play().catch(() => {
              // Handle autoplay restrictions silently
            });
          } else {
            // Video is not visible, pause it
            video.pause();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of video is visible
        rootMargin: '0px'
      }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden z-10">
      {/* Video background */}
      <div className="absolute inset-0 w-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay={false}
          loop
          muted
          playsInline
        >
          <source src="/200993-914924518.mp4" type="video/mp4" />
          <source src="/images/navy-ship.mp4" type="video/mp4" />
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-20">
        <div className="absolute top-20 left-20 w-96 h-96 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-yellow-500 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex justify-center items-center px-4 sm:px-6 lg:px-8 z-30">
        <div className="relative w-full max-w-6xl">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-600/30">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
                Navy Certified Training
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl !leading-tight font-bold text-white">
              Excel in Your <span className="text-yellow-500">Naval Career</span> with Professional Training
            </h1>
            
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              Advance your career in the BVT forces with our comprehensive vocational 
              training programs. From technical skills to leadership development, we provide 
              the education you need to succeed.
            </p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <button className="group bg-yellow-600 text-blue-950 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                <Ship className="w-5 h-5" />
                View All Programs
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="border-2 border-yellow-600 text-yellow-500 px-8 py-4 rounded-lg font-bold hover:bg-yellow-600 hover:text-blue-950 transition-all hover:scale-105 backdrop-blur-sm">
                Enrollment Info
              </button>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
              {[
                { icon: Users, value: "8,500+", label: "Active Trainees" },
                { icon: Award, value: "400+", label: "Programs" },
                { icon: Anchor, value: "95%", label: "Success Rate" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-6 h-6 text-yellow-500 mb-2 mx-auto" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
