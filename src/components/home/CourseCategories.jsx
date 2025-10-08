"use client";

import { motion } from "framer-motion";
import { Globe, Mic, Puzzle, Heart } from "lucide-react";

const CATEGORIES = [
  {
    icon: Heart,
    title: "Technical & Engineering",
    desc: "150 Programs",
    color: "from-blue-800 to-blue-950",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
  },
  {
    icon: Puzzle,
    title: "Navigation & Operations",
    desc: "120 Programs",
    color: "from-blue-700 to-blue-900",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
  },
  {
    icon: Globe,
    title: "Safety & Security",
    desc: "95 Programs",
    color: "from-slate-700 to-slate-900",
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop"
  },
  {
    icon: Mic,
    title: "Leadership & Management",
    desc: "80 Programs",
    color: "from-indigo-800 to-indigo-950",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
];

export default function CourseCategories() {
  return (
    <section className="px-8 py-12">
      <div className="container mx-auto">
        <div className="mb-10 grid place-items-center text-center">
          <h2 className="my-3 text-4xl font-bold text-gray-900">
            Training Programs
          </h2>
          <p className="text-lg text-gray-500 lg:w-6/12">
            Comprehensive vocational training programs designed to enhance your BVT 
            career and develop essential skills for service excellence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Featured Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative grid h-full w-full place-items-center overflow-hidden rounded-xl text-center border-2 border-yellow-600/30 hover:border-yellow-600/50 transition-colors"
        >
          <img 
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=800&fit=crop"
            alt="Naval Basics Training"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 h-full w-full bg-blue-950/75" />
          <div className="relative w-full p-8">
            <p className="text-xs font-bold opacity-50 text-yellow-500 uppercase tracking-wide">
              Foundation Program
            </p>
            <h3 className="mt-9 text-3xl font-bold text-white">
              Naval Basics Training
            </h3>
            <p className="mt-4 mb-14 font-normal opacity-50 text-white">
              Start your journey with essential BVT skills and knowledge.
            </p>
            <button className="px-6 py-2 text-sm bg-yellow-600 text-blue-950 rounded-lg font-medium hover:bg-yellow-500 hover:scale-105 transition-all shadow-lg">
              Start Training
            </button>
          </div>
        </motion.div>

        {/* Category Cards Column 1 */}
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(0, 2).map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative grid min-h-[12rem] w-full overflow-hidden rounded-xl hover:scale-105 transition-transform`}
              >
                <img 
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 h-full w-full bg-black/70" />
                <div className="relative flex flex-col justify-between p-6">
                  <Icon className="h-8 w-8 text-white" />
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-white">
                      {category.title}
                    </h4>
                    <p className="text-xs font-bold opacity-50 text-white">
                      {category.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Category Cards Column 2 */}
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(2, 4).map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative grid min-h-[12rem] w-full overflow-hidden rounded-xl hover:scale-105 transition-transform`}
              >
                <img 
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 h-full w-full bg-black/70" />
                <div className="relative flex flex-col justify-between p-6">
                  <Icon className="h-8 w-8 text-white" />
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-white">
                      {category.title}
                    </h4>
                    <p className="text-xs font-bold opacity-50 text-white">
                      {category.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
