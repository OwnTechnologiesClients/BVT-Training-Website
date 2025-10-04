"use client";

import { useState, useCallback } from "react";
import {
  CoursesHero,
  CourseSearch,
  CourseTabs,
  FeaturedCourses,
  MentorsSection,
  OfflineCourseCategories,
  OfflineCourseCard
} from "@/components/courses";
import {
  OFFLINE_HERO_CONTENT,
  OFFLINE_SEARCH_CONTENT,
  OFFLINE_COURSE_TABS,
  OFFLINE_COURSES_DATA,
  OFFLINE_FEATURED_COURSES,
  OFFLINE_MENTORS_DATA
} from "@/data/offlineCourses";

export default function OfflineCoursesPage() {
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
      <CoursesHero content={OFFLINE_HERO_CONTENT} />
      <CourseSearch 
        searchContent={OFFLINE_SEARCH_CONTENT}
        sampleCourses={OFFLINE_COURSES_DATA}
        onSearchResults={handleSearchResults} 
        onFilterChange={handleFilterChange} 
      />
      <CourseTabs 
        tabs={OFFLINE_COURSE_TABS}
        courses={OFFLINE_COURSES_DATA}
        searchResults={searchResults} 
        activeFilters={activeFilters}
        courseCardComponent={OfflineCourseCard}
      />
      <FeaturedCourses courses={OFFLINE_FEATURED_COURSES} />
      <MentorsSection mentors={OFFLINE_MENTORS_DATA} showLocations={true} />
      <OfflineCourseCategories />
    </>
  );
}