"use client";

import { motion } from "framer-motion";
import { Ship, Anchor, Award, Users, Sparkles, ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const videoRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen max-h-screen overflow-hidden z-10 flex flex-col">
      {/* Video background with parallax effect */}
      <div className="absolute inset-0 w-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-110"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) scale(1.1)`,
            transition: 'transform 0.1s ease-out'
          }}
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

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-950/50 to-blue-950/80 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 left-20 w-96 h-96 border-2 border-yellow-500/20 rounded-full blur-sm"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-20 right-20 w-64 h-64 border-2 border-yellow-500/20 rounded-full blur-sm"
        />
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-yellow-500/10 rounded-full"
        />
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 z-20">
        {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
              x: [null, (Math.random() - 0.5) * 100]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Content - Adjusted to fit within viewport */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 z-30 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="relative w-full max-w-6xl">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
          >
            {/* Enhanced Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-yellow-600/30 to-yellow-500/20 backdrop-blur-md px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full border-2 border-yellow-500/50 shadow-lg"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400" />
              </motion.div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-yellow-400 uppercase tracking-wider">
                Navy Certified Training
              </span>
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-yellow-400 animate-pulse" />
            </motion.div>

            {/* Enhanced Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl !leading-tight font-extrabold text-white drop-shadow-2xl px-2"
            >
              Excel in Your{" "}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 relative inline-block"
                style={{
                  backgroundSize: "200% auto",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Naval Career
                <motion.div
                  className="absolute -bottom-0.5 sm:-bottom-1 md:-bottom-1.5 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.span>
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">with Professional Training</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg px-4"
            >
              Advance your career in the BVT forces with our comprehensive vocational 
              training courses. From technical skills to leadership development, we provide 
              the education you need to succeed.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 pt-1 sm:pt-2 md:pt-3"
            >
              <Link href="/courses">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(234, 179, 8, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-blue-950 px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-xl font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3 overflow-hidden cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <Ship className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 group-hover:rotate-12 transition-transform" />
                  <span className="relative z-10">Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/courses">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative border-2 border-yellow-500 bg-yellow-500/10 backdrop-blur-md text-yellow-400 px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-xl font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:bg-yellow-500/20 hover:border-yellow-400 transition-all duration-300 flex items-center gap-2 sm:gap-3 shadow-lg cursor-pointer"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-125 transition-transform" />
                  <span>Watch Video</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Enhanced Stats Row - More Compact */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 pt-2 sm:pt-3 md:pt-4 lg:pt-6 max-w-3xl mx-auto pb-2 sm:pb-4"
            >
              {[
                { icon: Users, value: "8,500+", label: "Active Trainees", color: "from-blue-400 to-blue-600" },
                { icon: Award, value: "400+", label: "Courses", color: "from-yellow-400 to-yellow-600" },
                { icon: Anchor, value: "95%", label: "Success Rate", color: "from-green-400 to-green-600" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="text-center group cursor-default"
                  >
                    <div className="relative inline-block mb-1 sm:mb-1.5 md:mb-2">
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                      <div className="relative bg-white/10 backdrop-blur-md p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl border border-white/20 group-hover:border-white/40 transition-all">
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 mx-auto group-hover:scale-110 transition-transform`} />
                      </div>
                    </div>
                    <motion.div 
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white mb-0.5 sm:mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-blue-200 font-semibold uppercase tracking-wider px-0.5 leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
