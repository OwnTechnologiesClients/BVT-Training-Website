"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getEventBySlug } from "@/lib/api/events";
import { registerForEvent } from "@/lib/api/events";
import BillingPage from "@/components/billing/BillingPage";
import { Loader2 } from "lucide-react";
import { showError } from "@/lib/utils/sweetalert";

export default function EventBillingPage({ params }) {
  const router = useRouter();
  const { student, isAuthenticated } = useAuth();
  const { slug } = use(params);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/events/details/${slug}/billing`);
      return;
    }

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await getEventBySlug(slug);
        if (response.success && response.data) {
          setEvent(response.data);
        } else {
          showError('Error', 'Event not found');
          router.push('/events');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        showError('Error', 'Failed to load event details');
        router.push('/events');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchEvent();
    }
  }, [slug, isAuthenticated, router]);

  const handleRegistrationComplete = async () => {
    try {
      if (!event?._id) {
        throw new Error('Event ID not found');
      }

      // Register the student for the event
      const response = await registerForEvent(event._id);
      
      if (response.success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        throw new Error(response.message || 'Failed to register for event');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
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

  if (!event) {
    return null; // Error already handled in useEffect
  }

  return (
    <BillingPage
      type="event"
      item={event}
      onComplete={handleRegistrationComplete}
      onCancel={() => router.push(`/events/details/${slug}`)}
    />
  );
}

