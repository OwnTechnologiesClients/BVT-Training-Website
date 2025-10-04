"use client";

import { useState } from "react";
import EventCard, { SAMPLE_EVENTS } from "./EventCard";

export default function EventsTabs({ searchResults, activeFilters }) {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = [
    { id: "upcoming", label: "Upcoming Events", count: SAMPLE_EVENTS.filter(e => new Date(e.date) >= new Date()).length },
    { id: "featured", label: "Featured", count: SAMPLE_EVENTS.filter(e => e.featured).length },
    { id: "conference", label: "Conferences", count: SAMPLE_EVENTS.filter(e => e.category === "Conference").length },
    { id: "workshop", label: "Workshops", count: SAMPLE_EVENTS.filter(e => e.category === "Workshop").length },
    { id: "training", label: "Training", count: SAMPLE_EVENTS.filter(e => e.category === "Training").length },
    { id: "free", label: "Free Events", count: SAMPLE_EVENTS.filter(e => e.price === "Free").length }
  ];

  // Use search results if available, otherwise use filtered events based on active tab
  const getDisplayEvents = () => {
    if (searchResults) {
      return searchResults;
    }
    
    switch (activeTab) {
      case "upcoming":
        return SAMPLE_EVENTS.filter(event => new Date(event.date) >= new Date());
      case "featured":
        return SAMPLE_EVENTS.filter(event => event.featured);
      case "free":
        return SAMPLE_EVENTS.filter(event => event.price === "Free");
      default:
        return SAMPLE_EVENTS.filter(event => 
          event.category.toLowerCase() === activeTab.toLowerCase()
        );
    }
  };

  const displayEvents = getDisplayEvents();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find and register for upcoming naval training events, conferences, and workshops 
            that match your professional development goals.
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((event, index) => (
            <EventCard
              key={event.id}
              {...event}
              index={index}
            />
          ))}
        </div>

        {/* No Results */}
        {displayEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all events.</p>
          </div>
        )}

        {/* Load More Button */}
        {displayEvents.length > 0 && displayEvents.length >= 6 && (
          <div className="text-center mt-12">
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Load More Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
