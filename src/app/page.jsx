import {
  Hero,
  Stats,
  CourseCategories,
  ExploreCourses,
  Events,
  StudentsFeedback,
  TrustedCompanies
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <Stats /> */}
      <CourseCategories />
      <ExploreCourses />
      <Events />
      <StudentsFeedback />
      <TrustedCompanies />
    </>
  );
}
