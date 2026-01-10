"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getCourseBySlug } from "@/lib/api/courses";
import { enrollInCourse } from "@/lib/api/enrollment";
import BillingPage from "@/components/billing/BillingPage";
import { Loader2 } from "lucide-react";
import { showError } from "@/lib/utils/sweetalert";

export default function CourseBillingPage({ params }) {
  const router = useRouter();
  const { student, isAuthenticated } = useAuth();
  const { slug } = use(params);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/courses/${slug}/billing`);
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await getCourseBySlug(slug);
        if (response.success && response.data) {
          setCourse(response.data);
        } else {
          showError('Error', 'Course not found');
          router.push('/courses');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        showError('Error', 'Failed to load course details');
        router.push('/courses');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug, isAuthenticated, router]);

  const handlePurchaseComplete = async () => {
    try {
      if (!course?._id) {
        throw new Error('Course ID not found');
      }

      // Enroll the student in the course
      const response = await enrollInCourse(course._id);
      
      if (response.success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        throw new Error(response.message || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error; // Re-throw to let BillingPage handle the error display
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!course) {
    return null; // Error already handled in useEffect
  }

  return (
    <BillingPage
      type="course"
      item={course}
      onComplete={handlePurchaseComplete}
      onCancel={() => router.push(`/courses/${slug}`)}
    />
  );
}
