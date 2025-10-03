"use client";

import { useState, useCallback } from "react";
import {
  CoursesHero,
  CourseTabs,
  FeaturedCourses,
  MentorsSection,
  CourseCategories,
  CourseSearch
} from "@/components/courses";

export default function CoursesPage() {
  const [searchResults, setSearchResults] = useState(null);
  const [activeFilters, setActiveFilters] = useState(null);

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  const handleFilterChange = useCallback((filters) => {
    setActiveFilters(filters);
  }, []);

  return (
    <>
      <CoursesHero />
      <CourseSearch onSearchResults={handleSearchResults} onFilterChange={handleFilterChange} />
      <CourseTabs searchResults={searchResults} activeFilters={activeFilters} />
      <FeaturedCourses />
      <MentorsSection />
      <CourseCategories />
    </>
  );
}
