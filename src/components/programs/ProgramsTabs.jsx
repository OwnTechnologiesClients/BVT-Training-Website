"use client";

import { useState } from "react";
import ProgramCard, { SAMPLE_PROGRAMS } from "./ProgramCard";

export default function ProgramsTabs({ searchResults, activeFilters }) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Programs", count: SAMPLE_PROGRAMS.length },
    { id: "technical", label: "Technical", count: SAMPLE_PROGRAMS.filter(p => p.category === "Technical").length },
    { id: "leadership", label: "Leadership", count: SAMPLE_PROGRAMS.filter(p => p.category === "Leadership").length },
    { id: "security", label: "Security", count: SAMPLE_PROGRAMS.filter(p => p.category === "Security").length },
    { id: "navigation", label: "Navigation", count: SAMPLE_PROGRAMS.filter(p => p.category === "Navigation").length },
    { id: "safety", label: "Safety", count: SAMPLE_PROGRAMS.filter(p => p.category === "Safety").length }
  ];

  // Use search results if available, otherwise use filtered programs based on active tab
  const getDisplayPrograms = () => {
    if (searchResults) {
      return searchResults;
    }
    
    if (activeTab === "all") {
      return SAMPLE_PROGRAMS;
    }
    
    return SAMPLE_PROGRAMS.filter(program => 
      program.category.toLowerCase() === activeTab.toLowerCase()
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
            Explore our comprehensive range of training programs designed to advance your naval career.
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
