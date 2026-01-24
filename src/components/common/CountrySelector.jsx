"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, ChevronDown } from "lucide-react";

export default function CountrySelector({
  value,
  onChange,
  disabled = false,
  error = false,
  countriesList = [],
  loading = false,
  className = "",
  size = "md" // sm, md, lg
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Filter countries based on search term
  const filteredCountries = countriesList.filter((country) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return country.name?.toLowerCase().includes(search) || 
           country.code?.toLowerCase().includes(search);
  });

  // Get selected country for display
  const selectedCountry = countriesList.find((country) => country.name === value) || 
                         countriesList.find((country) => country.code === 'NO') || 
                         { code: 'NO', name: 'Norway' };

  const handleSelect = (country) => {
    onChange({ target: { name: "country", value: country.name } });
    setIsOpen(false);
    setSearchTerm("");
  };

  // Size classes
  const sizeClasses = {
    sm: "py-2 text-xs",
    md: "py-3 text-sm",
    lg: "py-4 text-base"
  };

  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled || loading || countriesList.length === 0}
        className={`
          flex items-center gap-2 w-full pl-10 pr-3 border rounded-xl bg-white/5 text-white 
          focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent 
          transition-all appearance-none
          ${sizeClasses[size]}
          ${error ? "border-red-500" : "border-white/30"}
          ${disabled || loading || countriesList.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-white/10"}
        `}
        title="Select country"
      >
        <MapPin className={`${iconSizeClasses[size]} text-blue-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`} />
        {loading ? (
          <span className="text-blue-300">Loading...</span>
        ) : countriesList.length === 0 ? (
          <span className="text-blue-300">No countries</span>
        ) : (
          <>
            <span className="flex-1 text-left truncate">{selectedCountry.name}</span>
            <ChevronDown className={`${iconSizeClasses[size]} text-blue-300 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && !loading && countriesList.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-white/20 rounded-xl shadow-xl overflow-hidden max-h-64 flex flex-col">
          {/* Search Input */}
          <div className="p-2 border-b border-white/10">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search country..."
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Country List */}
          <div className="overflow-y-auto max-h-48">
            {filteredCountries.length === 0 ? (
              <div className="px-4 py-3 text-sm text-blue-300 text-center">
                No countries found
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-white
                    hover:bg-white/10 transition-colors
                    ${value === country.name ? "bg-yellow-500/20 hover:bg-yellow-500/30" : ""}
                  `}
                >
                  <span className="flex-1 truncate">{country.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
