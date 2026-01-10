"use client";

import { useState } from "react";
import ProgramCard from "./ProgramCard";

export default function ProgramsTabs({ programs = [], searchResults, activeFilters }) {
  const [activeTab, setActiveTab] = useState("all");

  // Calculate counts from actual programs
  const calculateCounts = () => {
    return {
      all: programs.length,
      technical: programs.filter(p => p.category?.toLowerCase() === "technical").length,
      leadership: programs.filter(p => p.category?.toLowerCase() === "leadership").length,
      security: programs.filter(p => p.category?.toLowerCase() === "security").length,
      navigation: programs.filter(p => p.category?.toLowerCase() === "navigation").length,
      safety: programs.filter(p => p.category?.toLowerCase() === "safety").length
    };
  };

  const counts = calculateCounts();

  const tabs = [
    { id: "all", label: "All Programs", count: counts.all },
    { id: "technical", label: "Technical", count: counts.technical },
    { id: "leadership", label: "Leadership", count: counts.leadership },
    { id: "security", label: "Security", count: counts.security },
    { id: "navigation", label: "Navigation", count: counts.navigation },
    { id: "safety", label: "Safety", count: counts.safety }
  ];

  // Use search results if available, otherwise use filtered programs based on active tab
  const getDisplayPrograms = () => {
    if (searchResults && searchResults.length > 0) {
      return searchResults;
    }
    
    if (activeTab === "all") {
      return programs;
    }
    
    return programs.filter(program => 
      program.category?.toLowerCase() === activeTab.toLowerCase()
    );
  };

  const displayPrograms = getDisplayPrograms();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of training programs designed to advance your BVT career.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPrograms.map((program, index) => (
            <ProgramCard
              key={program.id}
              {...program}
              index={index}
            />
          ))}
        </div>

        {/* No Results */}
        {displayPrograms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.573" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all programs.</p>
          </div>
        )}

        {/* Load More Button */}
        {displayPrograms.length > 0 && displayPrograms.length >= 6 && (
          <div className="text-center mt-12">
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Load More Programs
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
