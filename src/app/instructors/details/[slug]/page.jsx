"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from "framer-motion";
import { 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  MapPin, 
  Mail,
  Calendar,
  Clock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  GraduationCap,
  Briefcase,
  Globe
} from "lucide-react";
import { getInstructorById, getInstructorBySlug } from "@/lib/api/instructors";
import { apiRequest } from "@/lib/api";
import { getImageUrl } from "@/lib/utils/imageUtils";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";

// Get department display name
const getDepartmentName = (dept) => {
  const deptMap = {
    'marine-engineering': 'Marine Engineering',
    'navigation': 'Navigation',
    'maritime-safety': 'Maritime Safety',
    'naval-operations': 'Naval Operations',
    'submarine-operations': 'Submarine Operations'
  };
  return deptMap[dept] || dept;
};

export default function InstructorDetailsPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const instructorSlug = resolvedParams?.slug;

  const [instructorData, setInstructorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  // Fetch instructor data
  useEffect(() => {
    const fetchInstructor = async () => {
      if (!instructorSlug) {
        setError('No instructor slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await getInstructorBySlug(instructorSlug);

        if (response && response.success && response.data) {
          setInstructorData(response.data);
        } else if (response && !response.success) {
          // If response exists but success is false
          setError(response.message || 'Instructor not found');
        } else {
          // If response is null or undefined
          setError('Instructor not found');
        }
      } catch (err) {
        console.error('Error fetching instructor:', err);
        // Handle different error types
        if (err.response?.status === 404) {
          setError('Instructor not found');
        } else if (err.message) {
          setError(err.message);
        } else {
          setError('Failed to load instructor. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [instructorSlug]);

  // Fetch courses when instructor data is loaded
  useEffect(() => {
    const fetchCourses = async () => {
      if (!instructorData?._id && !instructorData?.id) return;
      
      try {
        setCoursesLoading(true);
        const instructorId = instructorData._id || instructorData.id;
        const response = await apiRequest(`/courses/instructor/${instructorId}`, {
          method: 'GET',
        });
        
        if (response.success && response.data) {
          setCourses(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setCoursesLoading(false);
      }
    };

    if (instructorData) {
      fetchCourses();
    }
  }, [instructorData]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading instructor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !instructorData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Instructor Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The instructor you are looking for does not exist.'}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                Back to Courses
              </button>
            </Link>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get instructor name
  const instructorName = instructorData.userId 
    ? `${instructorData.userId.firstName || ''} ${instructorData.userId.lastName || ''}`.trim()
    : 'Instructor';
  
  const instructorImageUrl = instructorData.profilePic ? getImageUrl(instructorData.profilePic) : null;
  const rating = instructorData.rating || 5;
  const experience = instructorData.experience || 0;
  const department = instructorData.department || '';
  const specializations = instructorData.specializations || '';
  const bio = instructorData.bio || '';
  const achievements = instructorData.achievements || [];
  const certifications = instructorData.certifications || [];
  const locations = instructorData.locations || [];
  const languages = instructorData.languages || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Instructor Header */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-gray-50 p-8 rounded-2xl mb-8">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Link href="/courses" className="hover:text-blue-900">Courses</Link>
                    <span>/</span>
                    <Link href="/courses#instructors" className="hover:text-blue-900">Instructors</Link>
                    <span>/</span>
                    <span className="text-blue-900">{instructorName}</span>
                  </div>

                  {/* Back Button */}
                  <Link href="/courses" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Courses</span>
                  </Link>

                  {/* Department Badge */}
                  {department && (
                    <div className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {getDepartmentName(department)}
                    </div>
                  )}

                  {/* Instructor Title */}
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {instructorName}
                  </h1>

                  {/* Instructor Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                    {experience > 0 && (
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-blue-900" />
                        <div>
                          <span className="text-gray-500 block">Experience</span>
                          <span className="font-medium text-gray-900">{experience}+ years</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-blue-900" />
                      <div>
                        <span className="text-gray-500 block">Rating</span>
                        <span className="font-medium text-gray-900">{rating.toFixed(1)} / 5.0</span>
                      </div>
                    </div>

                    {specializations && (
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-blue-900" />
                        <div>
                          <span className="text-gray-500 block">Specializations</span>
                          <span className="font-medium text-gray-900">{specializations}</span>
                        </div>
                      </div>
                    )}

                    {instructorData.userId?.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-900" />
                        <div>
                          <span className="text-gray-500 block">Email</span>
                          <a href={`mailto:${instructorData.userId.email}`} className="font-medium text-blue-900 hover:underline">
                            {instructorData.userId.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === "about"
                        ? "text-blue-900 border-b-2 border-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    About
                  </button>
                  {achievements.length > 0 && (
                    <button
                      onClick={() => setActiveTab("achievements")}
                      className={`px-6 py-3 font-medium transition-colors ${
                        activeTab === "achievements"
                          ? "text-blue-900 border-b-2 border-blue-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Achievements
                    </button>
                  )}
                  {certifications.length > 0 && (
                    <button
                      onClick={() => setActiveTab("certifications")}
                      className={`px-6 py-3 font-medium transition-colors ${
                        activeTab === "certifications"
                          ? "text-blue-900 border-b-2 border-blue-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Certifications
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab("courses")}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === "courses"
                        ? "text-blue-900 border-b-2 border-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Courses {courses.length > 0 && `(${courses.length})`}
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "about" && (
                  <div className="space-y-12">
                    {/* Bio */}
                    {bio && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                          {bio}
                        </p>
                      </section>
                    )}


                    {/* Languages */}
                    {languages.length > 0 && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Languages</h2>
                        <div className="flex flex-wrap gap-3">
                          {languages.map((lang, index) => (
                            <div key={index} className="bg-blue-50 text-blue-900 px-4 py-2 rounded-lg">
                              <span className="font-medium">{lang.language}</span>
                              {lang.proficiency && (
                                <span className="text-sm text-blue-700 ml-2">({lang.proficiency})</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Locations */}
                    {locations.length > 0 && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Locations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {locations.map((location, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-900 mt-1" />
                                <div>
                                  <h3 className="font-semibold text-gray-900 mb-1">{location.name}</h3>
                                  <p className="text-gray-600 text-sm mb-2">{location.address}</p>
                                  {location.type && (
                                    <span className="inline-block bg-blue-100 text-blue-900 px-2 py-1 rounded text-xs">
                                      {location.type}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                )}

                {activeTab === "achievements" && achievements.length > 0 && (
                  <div className="space-y-12">
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
                      <div className="space-y-4">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                              <Award className="w-6 h-6 text-yellow-500 mt-1" />
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                                {achievement.description && (
                                  <p className="text-gray-600 mb-2">{achievement.description}</p>
                                )}
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                  {achievement.organization && (
                                    <span className="flex items-center gap-1">
                                      <Briefcase className="w-4 h-4" />
                                      {achievement.organization}
                                    </span>
                                  )}
                                  {achievement.date && (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      {new Date(achievement.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                      })}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "certifications" && certifications.length > 0 && (
                  <div className="space-y-12">
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h2>
                      <div className="space-y-4">
                        {certifications.map((cert, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                              <GraduationCap className="w-6 h-6 text-blue-900 mt-1" />
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                                <p className="text-gray-600 mb-2">Issued by: {cert.issuer}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                  {cert.date && (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      Issued: {new Date(cert.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                      })}
                                    </span>
                                  )}
                                  {cert.expiryDate && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                      })}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "courses" && (
                  <div className="space-y-12">
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses Taught</h2>
                      {coursesLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
                        </div>
                      ) : courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {courses.map((course) => (
                            <Link
                              key={course._id || course.id}
                              href={`/courses/${course.slug || course._id || course.id}`}
                              className="block"
                            >
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                              >
                                {course.image ? (
                                  <>
                                    <img
                                      src={getImageUrl(course.image)}
                                      alt={course.title}
                                      className="w-full h-48 object-cover"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        const placeholder = e.target.nextElementSibling;
                                        if (placeholder) placeholder.style.display = 'flex';
                                      }}
                                    />
                                    <div className="w-full h-48 hidden">
                                      <ImagePlaceholder type="course" className="w-full h-full" />
                                    </div>
                                  </>
                                ) : (
                                  <div className="w-full h-48">
                                    <ImagePlaceholder type="course" className="w-full h-full" />
                                  </div>
                                )}
                                <div className="p-4">
                                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {course.description}
                                  </p>
                                  <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-4 text-gray-500">
                                      {course.studentsCount !== undefined && (
                                        <span className="flex items-center gap-1">
                                          <Users className="w-4 h-4" />
                                          {course.studentsCount} students
                                        </span>
                                      )}
                                    </div>
                                    {course.category?.name && (
                                      <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded text-xs font-medium">
                                        {course.category.name}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
                          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No courses available for this instructor.</p>
                        </div>
                      )}
                    </section>
                  </div>
                )}
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Instructor Image */}
                    <div className="relative h-64">
                      {instructorImageUrl ? (
                        <img 
                          src={instructorImageUrl} 
                          alt={instructorName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const placeholder = e.target.nextElementSibling;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full ${instructorImageUrl ? 'hidden' : 'flex'}`}>
                        <ImagePlaceholder type="instructor" className="w-full h-full" iconClassName="w-16 h-16" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
            
                      </div>
                    </div>

                    {/* Instructor Details */}
                    <div className="p-6">
                      <div className="space-y-4 mb-6">
                        {department && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                              <Briefcase className="w-5 h-5 text-blue-900" />
                              <span className="text-gray-700 font-medium">Department</span>
                            </div>
                            <span className="font-bold text-gray-900">{getDepartmentName(department)}</span>
                          </div>
                        )}

                        {experience > 0 && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-blue-900" />
                              <span className="text-gray-700 font-medium">Experience</span>
                            </div>
                            <span className="font-bold text-gray-900">{experience}+ years</span>
                          </div>
                        )}

                        {specializations && (
                          <div className="py-2">
                            <div className="flex items-center gap-3 mb-2">
                              <GraduationCap className="w-5 h-5 text-blue-900" />
                              <span className="text-gray-700 font-medium">Specializations</span>
                            </div>
                            <p className="text-sm text-gray-600">{specializations}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

