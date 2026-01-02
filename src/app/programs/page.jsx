"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import {
  ProgramsHero,
  LearningPaths,
  ProgramBenefits
} from "@/components/programs";
import { getAllPrograms } from "@/lib/api/programs";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPath, setSelectedPath] = useState("all");

  // Fetch programs from backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);

        const programsResponse = await getAllPrograms({ 
          page: 1, 
          limit: 100,
          status: 'active'
        });

        if (programsResponse.success && programsResponse.data) {
          // Transform backend data to match frontend format
          const transformedPrograms = programsResponse.data.map(program => ({
            id: program._id || program.id,
            _id: program._id,
            title: program.title,
            description: program.description || '',
            duration: program.duration || 'N/A',
            level: program.level || 'Beginner',
            category: program.category || 'General',
            image: program.image || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
            price: program.price || 0,
            modules: program.modules || [],
            skills: program.skills || [],
            certificate: program.certificate || false,
            director: program.director || 'Program Director',
            slug: program.slug || program._id || program.id
          }));

          setPrograms(transformedPrograms);

          // Set default selected path to first category if available
          if (transformedPrograms.length > 0) {
            const firstCategory = transformedPrograms[0].category;
            if (firstCategory) {
              setSelectedPath(firstCategory.toLowerCase().replace(/\s+/g, '-'));
            }
          }
        }
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError(err.message || 'Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handlePathChange = useCallback((path) => {
    setSelectedPath(path);
  }, []);

  // Filter programs based on selected path
  const filteredPrograms = programs.filter(program => {
    if (selectedPath === 'all') return true;
    const programCategory = program.category?.toLowerCase().replace(/\s+/g, '-') || '';
    return programCategory === selectedPath;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && programs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Programs</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProgramsHero />
      <LearningPaths 
        selectedPath={selectedPath} 
        onPathChange={handlePathChange}
        programs={filteredPrograms}
      />
      <ProgramBenefits />
    </>
  );
}
