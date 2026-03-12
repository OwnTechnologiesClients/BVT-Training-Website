"use client";

import { useState, useEffect } from "react";
import { Download, Award, FileText, Loader2, Calendar, BookOpen } from "lucide-react";
import { getMyCertificates } from "@/lib/api/certificates";
import Link from "next/link";

export default function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await getMyCertificates();
      if (response.success) {
        setCertificates(response.data || []);
      } else {
        setError(response.message || "Failed to load certificates");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching certificates");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-blue-900 animate-spin mb-4" />
        <p className="text-gray-600">Loading your certificates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center">
        <p>{error}</p>
        <button 
          onClick={fetchCertificates}
          className="mt-2 text-red-800 font-bold underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-blue-900" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Certificates Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Once you complete a course and your instructor issues your certificate, it will appear here for you to download.
        </p>
        <Link 
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-black transition-all"
        >
          <BookOpen className="w-5 h-5" />
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Certificates</h2>
          <p className="text-gray-600">Download and share your achievements</p>
        </div>
        <div className="bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-sm font-bold">
          {certificates.length} {certificates.length === 1 ? 'Certificate' : 'Certificates'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div 
            key={cert._id}
            className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <div className="relative h-40 bg-gray-100 overflow-hidden">
              <img 
                src={cert.courseId?.thumbnail || cert.courseId?.image || "/course-placeholder.jpg"} 
                alt={cert.courseId?.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-white text-xs font-bold bg-blue-600/80 backdrop-blur-sm px-2 py-1 rounded">
                  <Award className="w-3 h-3" />
                  OFFICIAL
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-900 transition-colors">
                {cert.courseId?.title}
              </h3>
              
              <div className="flex flex-col gap-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Issued on {new Date(cert.issuedAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>PDF Certificate</span>
                </div>
              </div>

              <a 
                href={cert.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-blue-900 font-bold rounded-xl border border-blue-100 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all shadow-sm"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
