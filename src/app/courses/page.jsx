"use client";

import { useState, useCallback } from "react";
import {
  CoursesHero,
  CourseSearch,
  CourseTabs,
  FeaturedCourses,
  MentorsSection,
  OnlineCourseCategories
} from "@/components/courses";
import {
  ONLINE_HERO_CONTENT,
  ONLINE_SEARCH_CONTENT,
  ONLINE_COURSE_TABS,
  ONLINE_COURSES_DATA,
  ONLINE_FEATURED_COURSES,
  ONLINE_MENTORS_DATA
} from "@/data/onlineCourses";

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
      <CoursesHero content={ONLINE_HERO_CONTENT} />
      <CourseSearch 
        searchContent={ONLINE_SEARCH_CONTENT}
        sampleCourses={ONLINE_COURSES_DATA}
        onSearchResults={handleSearchResults} 
        onFilterChange={handleFilterChange} 
      />
      <CourseTabs 
        tabs={ONLINE_COURSE_TABS}
        courses={ONLINE_COURSES_DATA}
        searchResults={searchResults} 
        activeFilters={activeFilters} 
      />
      <FeaturedCourses courses={ONLINE_FEATURED_COURSES} />
      <MentorsSection mentors={ONLINE_MENTORS_DATA} showLocations={false} />
      <OnlineCourseCategories />
    </>
  );
}
