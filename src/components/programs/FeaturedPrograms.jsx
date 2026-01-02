// "use client";

// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight, Star, Clock, Users, Award } from "lucide-react";
// import { useState } from "react";
// import { SAMPLE_PROGRAMS } from "./ProgramCard";
// import Link from "next/link";
// import { useAuth } from "@/context/AuthContext";

// export default function FeaturedPrograms() {
//   const { isAuthenticated } = useAuth();
//   const [currentIndex, setCurrentIndex] = useState(0);
  
//   // Get featured programs (first 4 with badges)
//   const featuredPrograms = SAMPLE_PROGRAMS.filter(program => program.badge).slice(0, 4);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === featuredPrograms.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? featuredPrograms.length - 1 : prevIndex - 1
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="inline-flex items-center gap-2 bg-blue-600/10 px-4 py-2 rounded-full border border-blue-600/20 mb-4">
//               <Award className="w-4 h-4 text-blue-600" />
//               <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
//                 Featured Programs
//               </span>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Most Popular Training Programs
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Discover our top-rated programs that have helped thousands of BVT professionals advance their careers.
//             </p>
//           </motion.div>
//         </div>

//         {/* Carousel */}
//         <div className="relative max-w-6xl mx-auto">
//           {/* Carousel Container */}
//           <div className="overflow-hidden rounded-2xl">
//             <div 
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//             >
//               {featuredPrograms.map((program, index) => (
//                 <div key={program.id} className="w-full flex-shrink-0">
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8">
//                     {/* Program Image */}
//                     <div className="relative">
//                       <img
//                         src={program.image}
//                         alt={program.title}
//                         className="w-full h-80 object-cover rounded-2xl shadow-lg"
//                       />
//                       <div className="absolute top-4 left-4">
//                         <span className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
//                           {program.badge}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Program Content */}
//                     <div className="space-y-6">
//                       <div>
//                         <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
//                           {program.category}
//                         </span>
//                         <h3 className="text-3xl font-bold text-gray-900 mb-4">
//                           {program.title}
//                         </h3>
//                         <p className="text-lg text-gray-600 mb-6">
//                           {program.description}
//                         </p>
//                       </div>

//                       {/* Program Stats */}
//                       <div className="grid grid-cols-3 gap-4 mb-6">
//                         <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
//                           <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
//                           <div className="text-sm text-gray-500">Duration</div>
//                           <div className="font-semibold text-gray-900">{program.duration}</div>
//                         </div>
//                         <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
//                           <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
//                           <div className="text-sm text-gray-500">Students</div>
//                           <div className="font-semibold text-gray-900">{program.students}</div>
//                         </div>
//                         <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
//                           <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
//                           <div className="text-sm text-gray-500">Rating</div>
//                           <div className="font-semibold text-gray-900">{program.rating}</div>
//                         </div>
//                       </div>

//                       {/* Price and CTA */}
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <div className="text-3xl font-bold text-blue-900">{program.price}</div>
//                           {program.originalPrice && (
//                             <div className="text-lg text-gray-400 line-through">{program.originalPrice}</div>
//                           )}
//                         </div>
//                         <div className="flex gap-3">
//                           <Link href={`/programs/${program.id}`}>
//                             <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
//                               View Details
//                             </button>
//                           </Link>
//                           <Link href={isAuthenticated ? "/programs" : "/login"}>
//                             <button className="border-2 border-blue-900 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-colors">
//                               Enroll Now
//                             </button>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 z-10"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 z-10"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           {/* Dots Indicator */}
//           <div className="flex justify-center mt-8 space-x-2">
//             {featuredPrograms.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-200 ${
//                   index === currentIndex
//                     ? 'bg-blue-900 w-8'
//                     : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* View All Programs Button */}
//         <div className="text-center mt-12">
//           <Link href="/programs">
//             <button className="bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg">
//               View All Programs
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


