"use client";

import { useState, useEffect, use, useMemo, useRef, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Play, Clock, CheckCircle, Circle, Lock, Menu, X, Video, FileText, Award, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import VideoPlayer from "../../../../components/VideoPlayer";
import { FloatingQueryButton } from "@/components/queries";
import { useAuth } from "@/context/AuthContext";
import { useCourseEnrollment } from "@/hooks/useCourseEnrollment";
import { getCourseBySlug, getCourseStructure } from "@/lib/api/courses";
import { markLessonComplete } from "@/lib/api/enrollment";
import { getRequiredTests } from "@/lib/api/test";


export default function CourseLearningPage({ params }) {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;

  const [courseData, setCourseData] = useState(null);
  const [courseStructure, setCourseStructure] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [activeTab, setActiveTab] = useState("video");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessonTimer, setLessonTimer] = useState(0); // Timer in seconds for current lesson (1 minute = 60 seconds)
  const [timerCompleted, setTimerCompleted] = useState(false); // Whether timer has completed for current lesson
  const timerIntervalRef = useRef(null); // Reference to timer interval
  const locallyCompletedLessonsRef = useRef(new Set()); // Track lessons completed locally to prevent flickering
  const [requiredTests, setRequiredTests] = useState([]); // Required tests for current lesson/chapter
  const [loadingTests, setLoadingTests] = useState(false); // Loading state for tests

  // Get enrollment status - only check when courseData is available
  const courseId = courseData?._id || courseData?.id;
  const { isEnrolled, enrollment, loading: enrollmentLoading, updateEnrollment } = useCourseEnrollment(
    isAuthenticated && courseId ? courseId : null
  );

  // Check if course is offline - block access to learning page
  const isOffline = courseData?.isOnline === false;

  // Get completed lesson IDs for quick lookup
  // Prioritize courseStructure (immediate UI updates) over enrollment data to prevent flickering
  const completedLessonIds = useMemo(() => {
    const ids = new Set();
    
    // First, get from courseStructure (source of truth for UI)
    if (courseStructure?.modules) {
      courseStructure.modules.forEach(module => {
        module.lessons?.forEach(lesson => {
          if (lesson.isCompleted) {
            const lessonId = (lesson._id || lesson.id)?.toString();
            if (lessonId) {
              ids.add(lessonId);
            }
          }
        });
      });
    }
    
    // Also include locally completed lessons (from ref) - these take priority
    locallyCompletedLessonsRef.current.forEach(lessonId => {
      ids.add(lessonId);
    });
    
    // Then add from enrollment (for lessons completed before page load)
    // But only if not already in courseStructure or locally completed to prevent flickering
    enrollment?.lessonsCompleted?.forEach(lc => {
      const lessonId = lc.lessonId?.toString();
      if (lessonId && !ids.has(lessonId)) {
        // Only add if not already marked as completed in courseStructure or locally
        const alreadyInStructure = courseStructure?.modules?.some(module =>
          module.lessons?.some(lesson => {
            const lesId = (lesson._id || lesson.id)?.toString();
            return lesId === lessonId && lesson.isCompleted;
          })
        );
        if (!alreadyInStructure && !locallyCompletedLessonsRef.current.has(lessonId)) {
          ids.add(lessonId);
        }
      }
    });
    
    return ids;
  }, [courseStructure, enrollment?.lessonsCompleted]);

  // Convert completedLessonIds Set to a sorted array string for stable dependency checking
  const completedLessonIdsString = useMemo(() => {
    return Array.from(completedLessonIds).sort().join(',');
  }, [completedLessonIds]);

  // Function to mark lesson as completed
  const handleMarkLessonComplete = async (lessonId) => {
    if (!enrollment?._id || !lessonId) {
      return;
    }

    // Check if already completed
    const lessonIdStr = lessonId.toString();
    if (completedLessonIds.has(lessonIdStr)) {
      return; // Already completed
    }

    try {
      // Add to locally completed ref immediately to prevent flickering
      locallyCompletedLessonsRef.current.add(lessonIdStr);
      
      // Update local state FIRST (optimistic update) to prevent flickering
      setCourseStructure(prev => {
        if (!prev || !prev.modules) return prev;
        
        // Check if already marked as completed to avoid duplicate updates
        let alreadyCompleted = false;
        prev.modules.forEach(module => {
          module.lessons.forEach(lesson => {
            const lessonIdToCheck = (lesson._id || lesson.id)?.toString();
            if (lessonIdToCheck === lessonIdStr && lesson.isCompleted) {
              alreadyCompleted = true;
            }
          });
        });
        
        if (alreadyCompleted) {
          return prev; // Already updated, skip
        }
        
        // Build completed IDs set for lock calculation
        const currentCompletedIds = new Set();
        prev.modules.forEach(module => {
          module.lessons.forEach(lesson => {
            if (lesson.isCompleted) {
              const lesId = (lesson._id || lesson.id)?.toString();
              if (lesId) currentCompletedIds.add(lesId);
            }
          });
        });
        currentCompletedIds.add(lessonIdStr); // Add the newly completed lesson
        
        // Find current module (chapter) based on currentLessonId
        let currentModuleIndex = -1;
        if (currentLessonId) {
          prev.modules.forEach((module, idx) => {
            const hasCurrentLesson = module.lessons.some(lesson => {
              const lessonId = (lesson._id || lesson.id)?.toString();
              const currentId = currentLessonId?.toString();
              return lessonId === currentId;
            });
            if (hasCurrentLesson) {
              currentModuleIndex = idx;
            }
          });
        }
        
        return {
          ...prev,
          modules: prev.modules.map((module, moduleIndex) => {
            const isCurrentModule = moduleIndex === currentModuleIndex;
            
            // Update lessons and recalculate completion count
            const updatedLessons = module.lessons.map((lesson, lessonIndex) => {
              const lessonCopy = { ...lesson };
              
              // Mark as completed if it's the target lesson
              const lessonIdToCheck = (lesson._id || lesson.id)?.toString();
              if (lessonIdToCheck === lessonIdStr) {
                lessonCopy.isCompleted = true;
              }
              
              // Recalculate locks
              // All lessons in the first chapter are always unlocked
              if (moduleIndex === 0) {
                lessonCopy.isLocked = false;
              } else if (moduleIndex > 0) {
                // For other chapters, check if the last lesson of previous chapter is completed
                const previousModule = prev.modules[moduleIndex - 1];
                // Check if the last lesson of previous module is completed
                if (previousModule.lessons && previousModule.lessons.length > 0) {
                  const lastLesson = previousModule.lessons[previousModule.lessons.length - 1];
                  const lastLessonId = (lastLesson._id || lastLesson.id)?.toString();
                  lessonCopy.isLocked = !currentCompletedIds.has(lastLessonId);
              } else {
                  lessonCopy.isLocked = true;
                }
              } else {
                // All lessons in the same chapter are unlocked once previous chapter's last lesson is completed
                lessonCopy.isLocked = false;
              }
              
              return lessonCopy;
            });
            
            // Recalculate completed count for this module
            const completedCount = updatedLessons.filter(l => l.isCompleted).length;
            
            return {
              ...module,
              lessons: updatedLessons,
              completed: completedCount
            };
          })
        };
      });
      
      // Call API and update enrollment state with response data (no page refresh or extra API call)
      try {
        const response = await markLessonComplete(enrollment._id, lessonIdStr);
        if (response.success) {
          // Update enrollment state directly with the response data
          if (response.data?.enrollment) {
            updateEnrollment(response.data.enrollment);
          }
        }
      } catch (apiError) {
        // Error marking lesson complete
      }
    } catch (error) {
      // Don't show error to user - they can try again
    }
  };

  // Function to calculate if lesson is locked
  const isLessonLocked = (lesson, moduleIndex, lessonIndex, allModules) => {
    // All lessons in the first chapter are always unlocked
    if (moduleIndex === 0) {
      return false;
    }

    // For other chapters, check if the last lesson of previous chapter is completed
    // All lessons in the same chapter are accessible, but other chapters require previous chapter's last lesson
    if (moduleIndex > 0) {
      const previousModule = allModules[moduleIndex - 1];
      // Check if the last lesson of previous module is completed
      if (previousModule.lessons && previousModule.lessons.length > 0) {
        const lastLesson = previousModule.lessons[previousModule.lessons.length - 1];
        const lastLessonId = (lastLesson._id || lastLesson.id)?.toString();
        if (!completedLessonIds.has(lastLessonId)) {
          return true; // Lock all lessons in this chapter if last lesson of previous chapter not completed
        }
      }
    }

    // All lessons in the same chapter are unlocked once previous chapter's last lesson is completed
    return false;
  };

  // Handle video progress update - just track progress, no auto-completion
  const handleVideoProgress = useCallback((progressPercentage, currentTime, duration) => {
    // Just a placeholder - no action needed for timer-based completion
  }, []);

  // Check access and redirect if needed
  useEffect(() => {
    // Don't do anything while auth is still loading
    if (authLoading) {
      return;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/courses/${slug}/learn`)}`);
      return;
    }

    // Block access for offline courses
    if (courseData && isOffline) {
      router.push(`/courses/${slug}`);
      return;
    }
  }, [isAuthenticated, authLoading, isEnrolled, enrollmentLoading, router, slug, courseData, enrollment, isOffline]);

  // Fetch course data and structure
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        // First, get course basic info
        const courseResponse = await getCourseBySlug(slug);
        
        if (!courseResponse || !courseResponse.success || !courseResponse.data) {
          const errorMsg = courseResponse?.message || 'Course not found';
          throw new Error(errorMsg);
        }

        const course = courseResponse.data;
        setCourseData(course);
      } catch (err) {
        setError(err.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [slug]);

  // Fetch course structure separately once enrollment is confirmed
  useEffect(() => {
    const fetchCourseStructure = async () => {
      // Don't fetch if missing prerequisites
      if (!slug || !courseData || !isAuthenticated || enrollmentLoading) {
        return;
      }

      // Don't fetch structure if user is not enrolled - they'll be redirected anyway
      if (!isEnrolled) {
        return;
      }

      try {
        const courseId = courseData._id || courseData.id;
        if (!courseId) return;

        const structureResponse = await getCourseStructure(courseId);
        
        if (structureResponse.success && structureResponse.data) {
          const responseData = structureResponse.data;
          // Handle both response structures: data.structure.chapters or data.chapters
          const structure = responseData.structure || responseData;
              
              // Transform backend structure (Course → Chapters → Lessons → LessonContent)
              // to frontend format (Modules → Lessons)
              const transformedModules = [];
              
              if (structure.chapters && Array.isArray(structure.chapters) && structure.chapters.length > 0) {
                structure.chapters.forEach((chapter, chapterIndex) => {
                  const moduleId = chapter._id || `chapter-${chapterIndex}`;
                  const moduleLessons = [];

                  if (chapter.lessons && Array.isArray(chapter.lessons) && chapter.lessons.length > 0) {
                    chapter.lessons.forEach((lesson, lessonIndex) => {
                      const lessonId = lesson._id || `lesson-${lessonIndex}`;
                      
                      // Get lesson content
                      let videoSrc = null;
                      let textContent = null;

                      // Check for content in the new structure
                      if (lesson.content) {
                        // Video content - pass entire video object to support YouTube
                        if (lesson.content.video) {
                          videoSrc = lesson.content.video; // Pass the entire video object
                        }
                        
                        // Document content for text - extract HTML content directly
                        if (lesson.content.document && lesson.content.document.extractedText) {
                          // extractedText contains HTML from rich text editor - use it directly
                          textContent = lesson.content.document.extractedText;
                        } else if (lesson.content.description) {
                          // Fallback to description if no extractedText
                          textContent = lesson.content.description;
                        }
                      }
                      
                      // Fallback to lesson description if no content object
                      if (!textContent && lesson.description) {
                        textContent = lesson.description;
                      }

                      // Get duration - check multiple sources
                      let duration = lesson.duration || null;
                      // If duration is not in lesson.duration, try to get it from content.video.duration (in seconds)
                      if (!duration && lesson.content?.video?.duration) {
                        const totalSeconds = lesson.content.video.duration;
                        const minutes = Math.floor(totalSeconds / 60);
                        const seconds = totalSeconds % 60;
                        duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                      }
                      // Default to '0:00' if still no duration
                      if (!duration) {
                        duration = '0:00';
                      }

                      const lessonIdStr = lesson._id?.toString() || lessonId;
                      // Check both completedLessonIds and locally completed ref to prevent flickering
                      const isCompleted = completedLessonIds.has(lessonIdStr) || 
                                        locallyCompletedLessonsRef.current.has(lessonIdStr);

                      moduleLessons.push({
                        id: lessonId,
                        _id: lesson._id,
                        title: lesson.title,
                        duration: duration,
                        isCompleted: isCompleted,
                        type: lesson.type || 'video',
                        videoSrc: videoSrc,
                        textContent: textContent,
                        contentId: lesson.content?._id || null, // Store content ID for video refresh
                        isLocked: false // Will be calculated after all lessons are added
                      });
                    });
                  }

                  // Check if this chapter has completed lessons
                  const completedInChapter = moduleLessons.filter(l => l.isCompleted).length;

                  transformedModules.push({
                    id: moduleId,
                    _id: chapter._id,
                    title: chapter.title || `Chapter ${chapterIndex + 1}`,
                    completed: completedInChapter,
                    total: moduleLessons.length,
                    lessons: moduleLessons
                  });
                });
              }

              // Calculate locks for all lessons
              // Create a Set of completed lesson IDs from the transformed modules for lock calculation
              const currentCompletedIds = new Set();
              transformedModules.forEach(module => {
                module.lessons.forEach(lesson => {
                  if (lesson.isCompleted) {
                    const lessonId = (lesson._id || lesson.id)?.toString();
                    if (lessonId) {
                      currentCompletedIds.add(lessonId);
                    }
                  }
                });
              });
              
              // Also add enrollment completed lessons
              enrollment?.lessonsCompleted?.forEach(lc => {
                const lessonId = lc.lessonId?.toString();
                if (lessonId) {
                  currentCompletedIds.add(lessonId);
                }
              });
              
              // Also add locally completed lessons to prevent flickering
              locallyCompletedLessonsRef.current.forEach(lessonId => {
                currentCompletedIds.add(lessonId);
              });
              
              // Find current module (chapter) based on currentLessonId if available
              let currentModuleIndex = -1;
              if (currentLessonId) {
                transformedModules.forEach((module, idx) => {
                  const hasCurrentLesson = module.lessons.some(lesson => {
                    const lessonId = (lesson._id || lesson.id)?.toString();
                    const currentId = currentLessonId?.toString();
                    return lessonId === currentId;
                  });
                  if (hasCurrentLesson) {
                    currentModuleIndex = idx;
                  }
                });
              }

              transformedModules.forEach((module, moduleIndex) => {
                const isCurrentModule = moduleIndex === currentModuleIndex;
                
                module.lessons.forEach((lesson, lessonIndex) => {
                  // All lessons in the first chapter are always unlocked
                  if (moduleIndex === 0) {
                    lesson.isLocked = false;
                    return;
                  }

                  // For other chapters, check if the last lesson of previous chapter is completed
                  // All lessons in the same chapter are accessible, but other chapters require previous chapter's last lesson
                  if (moduleIndex > 0) {
                    const previousModule = transformedModules[moduleIndex - 1];
                    // Check if the last lesson of previous module is completed
                    if (previousModule.lessons && previousModule.lessons.length > 0) {
                      const lastLesson = previousModule.lessons[previousModule.lessons.length - 1];
                      const lastLessonId = (lastLesson._id || lastLesson.id)?.toString();
                      if (!currentCompletedIds.has(lastLessonId)) {
                        lesson.isLocked = true; // Lock all lessons in this chapter if last lesson of previous chapter not completed
                    return;
                  }
                    }
                  }

                  // All lessons in the same chapter are unlocked once previous chapter's last lesson is completed
                  lesson.isLocked = false;
                });
              });

              setCourseStructure({ modules: transformedModules });

              // Resume functionality: Find first incomplete lesson
              let firstIncompleteLesson = null;
              for (const module of transformedModules) {
                for (const lesson of module.lessons) {
                  const lessonIdStr = (lesson._id || lesson.id)?.toString();
                  if (!completedLessonIds.has(lessonIdStr) && !lesson.isLocked) {
                    firstIncompleteLesson = lesson;
                    break;
                  }
                }
                if (firstIncompleteLesson) break;
              }

              // Set current lesson: use first incomplete if exists, otherwise first lesson
              const lessonToSet = firstIncompleteLesson || 
                (transformedModules.length > 0 && transformedModules[0].lessons.length > 0 
                  ? transformedModules[0].lessons[0] 
                  : null);

              if (lessonToSet && !currentLessonId) {
                setCurrentLessonId(lessonToSet.id || lessonToSet._id);
                // Expand the module containing this lesson
                const moduleContainingLesson = transformedModules.find(m => 
                  m.lessons.some(l => (l.id || l._id) === (lessonToSet.id || lessonToSet._id))
                );
                if (moduleContainingLesson) {
                  setExpandedModules([moduleContainingLesson.id]);
                }
              }
            }
          } catch (err) {
            // Check if it's an enrollment/access error vs network error
            const errorMessage = err.message || '';
            const isAccessError = 
              errorMessage.includes('enrolled') ||
              errorMessage.includes('Access denied') ||
              errorMessage.includes('permission') ||
              errorMessage.includes('401') ||
              errorMessage.includes('403') ||
              errorMessage.includes('Unauthorized');
            
            // Handle access errors but don't redirect to billing
            // Billing redirects removed as requested
            if (isAccessError && !enrollmentLoading && !isEnrolled) {
              return;
            }
          }
        };

        fetchCourseStructure();
  }, [slug, courseData, isAuthenticated, isEnrolled, enrollmentLoading, enrollment, router]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Get modules from structure or fallback
  const modules = courseStructure?.modules || [];

  // Get all lessons in order
  const allLessons = modules.flatMap(module => module.lessons || []);
  const currentLesson = allLessons.find(lesson => 
    lesson.id === currentLessonId || lesson._id === currentLessonId
  );
  const currentIndex = allLessons.findIndex(lesson => 
    lesson.id === currentLessonId || lesson._id === currentLessonId
  );

  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(lesson => lesson.isCompleted).length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Helper function to manage chapter transitions
  const handleChapterTransition = (newLessonId) => {
    const newLesson = allLessons.find(l => l.id === newLessonId);
    if (!newLesson) return;

    // Find which module contains the new lesson
    const newModule = modules.find(module => 
      module.lessons?.some(lesson => 
        lesson.id === newLessonId || lesson._id === newLessonId
      )
    );

    // Find which module contains the current lesson
    const currentModule = modules.find(module => 
      module.lessons?.some(lesson => 
        lesson.id === currentLessonId || lesson._id === currentLessonId
      )
    );

    // If moving to a different module, collapse the old one and expand the new one
    if (currentModule && newModule && currentModule.id !== newModule.id) {
      setExpandedModules(prev => {
        const newExpanded = prev.filter(id => id !== currentModule.id);
        if (!newExpanded.includes(newModule.id)) {
          newExpanded.push(newModule.id);
        }
        return newExpanded;
      });
    }
    // If staying in the same module, just expand it if it's not already expanded
    else if (newModule && !expandedModules.includes(newModule.id)) {
      setExpandedModules(prev => [...prev, newModule.id]);
    }
  };

  // Fetch required tests when lesson changes
  useEffect(() => {
    const fetchRequiredTests = async () => {
      if (!courseId || !currentLessonId || !isEnrolled || !courseStructure?.modules) {
        setRequiredTests([]);
        return;
      }

      try {
        setLoadingTests(true);
        
        // Find current lesson from courseStructure instead of allLessons to avoid dependency issues
        let currentLesson = null;
        let chapterId = null;
        
        for (const module of courseStructure.modules) {
          const foundLesson = module.lessons?.find(l => {
            const lessonId = (l._id || l.id)?.toString();
            const currentId = currentLessonId?.toString();
            return lessonId === currentId;
          });
          
          if (foundLesson) {
            currentLesson = foundLesson;
            chapterId = (module._id || module.id)?.toString();
            break;
          }
        }

        if (!currentLesson) {
          setRequiredTests([]);
          return;
        }

        const lessonId = (currentLesson._id || currentLesson.id)?.toString();

        const response = await getRequiredTests(courseId, chapterId, lessonId);
        if (response.success && response.data) {
          setRequiredTests(response.data || []);
        } else {
          setRequiredTests([]);
        }
      } catch (error) {
        setRequiredTests([]);
      } finally {
        setLoadingTests(false);
      }
    };

    fetchRequiredTests();
  }, [courseId, currentLessonId, isEnrolled, courseStructure]);

  // Check if all required tests are completed
  const allRequiredTestsCompleted = useMemo(() => {
    if (requiredTests.length === 0) return true;
    return requiredTests.every(test => test.isCompleted);
  }, [requiredTests]);


  // Navigation functions
  const goToNextLesson = async () => {
    // Only proceed if timer is completed
    if (!timerCompleted) {
      return;
    }

    // Check if all required tests are completed
    if (!allRequiredTestsCompleted) {
      return;
    }

    // Don't proceed if it's the last lesson
    if (currentIndex >= allLessons.length - 1) {
      return;
    }

    // Mark current lesson as complete before moving to next
    if (currentLesson && currentLessonId) {
      const currentLessonIdStr = (currentLesson._id || currentLesson.id)?.toString();
      if (!completedLessonIds.has(currentLessonIdStr)) {
        await handleMarkLessonComplete(currentLessonIdStr);
      }
    }

    // Move to next lesson (even if it appears locked, we'll unlock it when we get there)
    const nextLesson = allLessons[currentIndex + 1];
    if (nextLesson) {
      handleChapterTransition(nextLesson.id);
      setCurrentLessonId(nextLesson.id);
    }
  };

  const goToPreviousLesson = () => {
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      handleChapterTransition(prevLesson.id);
      setCurrentLessonId(prevLesson.id);
    }
  };

  const selectLesson = (lessonId) => {
    const lesson = allLessons.find(l => l.id === lessonId || l._id === lessonId);
    if (lesson && !lesson.isLocked) {
      handleChapterTransition(lessonId);
      setCurrentLessonId(lessonId);
    }
  };

  // Set to first incomplete lesson if current lesson is not found
  // MUST be before any conditional returns to follow Rules of Hooks
  useEffect(() => {
    if (!currentLesson && allLessons.length > 0) {
      // Find first incomplete, unlocked lesson
      const firstIncomplete = allLessons.find(lesson => {
        const lessonIdStr = (lesson._id || lesson.id)?.toString();
        return !completedLessonIds.has(lessonIdStr) && !lesson.isLocked;
      });
      
      const lessonToSet = firstIncomplete || allLessons[0];
      setCurrentLessonId(lessonToSet.id || lessonToSet._id);
    }
  }, [allLessons.length, currentLesson, completedLessonIds]);

  // Recalculate locks whenever currentLessonId changes (e.g., when moving to a new chapter)
  useEffect(() => {
    if (!currentLessonId || !courseStructure?.modules) return;

    // Recalculate locks based on current lesson
    setCourseStructure(prev => {
      if (!prev || !prev.modules) return prev;

      // Build completed IDs set
      const currentCompletedIds = new Set();
      prev.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.isCompleted) {
            const lesId = (lesson._id || lesson.id)?.toString();
            if (lesId) currentCompletedIds.add(lesId);
          }
        });
      });
      
      // Also add locally completed lessons
      locallyCompletedLessonsRef.current.forEach(lessonId => {
        currentCompletedIds.add(lessonId);
      });
      
      // Also add enrollment completed lessons
      enrollment?.lessonsCompleted?.forEach(lc => {
        const lessonId = lc.lessonId?.toString();
        if (lessonId) {
          currentCompletedIds.add(lessonId);
        }
      });

      // Find current module (chapter) based on currentLessonId
      let currentModuleIndex = -1;
      prev.modules.forEach((module, idx) => {
        const hasCurrentLesson = module.lessons.some(lesson => {
          const lessonId = (lesson._id || lesson.id)?.toString();
          const currentId = currentLessonId?.toString();
          return lessonId === currentId;
        });
        if (hasCurrentLesson) {
          currentModuleIndex = idx;
        }
      });

      return {
        ...prev,
        modules: prev.modules.map((module, moduleIndex) => {
          const isCurrentModule = moduleIndex === currentModuleIndex;
          
          const updatedLessons = module.lessons.map((lesson, lessonIndex) => {
            const lessonCopy = { ...lesson };
            
            // Recalculate locks
            // All lessons in the first chapter are always unlocked
            if (moduleIndex === 0) {
              lessonCopy.isLocked = false;
            } else if (moduleIndex > 0) {
              // For other chapters, check if the last lesson of previous chapter is completed
              const previousModule = prev.modules[moduleIndex - 1];
              // Check if the last lesson of previous module is completed
              if (previousModule.lessons && previousModule.lessons.length > 0) {
                const lastLesson = previousModule.lessons[previousModule.lessons.length - 1];
                const lastLessonId = (lastLesson._id || lastLesson.id)?.toString();
                lessonCopy.isLocked = !currentCompletedIds.has(lastLessonId);
            } else {
                lessonCopy.isLocked = true;
              }
            } else {
              // All lessons in the same chapter are unlocked once previous chapter's last lesson is completed
              lessonCopy.isLocked = false;
            }
            
            return lessonCopy;
          });
          
          return {
            ...module,
            lessons: updatedLessons
          };
        })
      };
    });
  }, [currentLessonId, enrollment?.lessonsCompleted]);

  // Helper function to get timer completion key for localStorage
  const getTimerKey = (lessonId) => {
    if (!lessonId || !courseId) return null;
    return `lesson-timer-${courseId}-${lessonId}`;
  };

  // Helper function to check if timer was completed for a lesson
  const isTimerCompleted = (lessonId) => {
    const key = getTimerKey(lessonId);
    if (!key) return false;
    try {
      return localStorage.getItem(key) === 'completed';
    } catch (e) {
      return false;
    }
  };

  // Helper function to mark timer as completed
  const markTimerCompleted = (lessonId) => {
    const key = getTimerKey(lessonId);
    if (!key) return;
    try {
      localStorage.setItem(key, 'completed');
    } catch (e) {
      // Failed to save timer completion
    }
  };

  // Timer effect: Start 1-minute timer when lesson changes
  useEffect(() => {
    // Clear any existing timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // Reset timer when lesson changes
    if (currentLessonId && courseId) {
      const lessonIdStr = currentLessonId.toString();
      
      // Check if timer was already completed for this lesson
      const timerWasCompleted = isTimerCompleted(lessonIdStr);
      
      // Check if lesson itself is already completed (use completedLessonIds from current render)
      const lessonIsCompleted = completedLessonIds.has(lessonIdStr);
      
      if (timerWasCompleted || lessonIsCompleted) {
        // Timer already completed or lesson completed - skip timer
        setLessonTimer(60);
        setTimerCompleted(true);
        return; // Don't start timer
      }

      // Start fresh timer for this lesson
      setLessonTimer(0);
      setTimerCompleted(false);

      // Start timer countdown
      timerIntervalRef.current = setInterval(() => {
        setLessonTimer(prev => {
          const newTime = prev + 1;
          
          if (newTime >= 60) {
            // Timer completed (60 seconds = 1 minute)
            markTimerCompleted(lessonIdStr); // Save to localStorage
            setTimerCompleted(true); // Mark as completed in state
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
              timerIntervalRef.current = null;
            }
            return 60;
          }
          return newTime;
        });
      }, 1000); // Update every second
    }

    // Cleanup on unmount or lesson change
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [currentLessonId, courseId, completedLessonIdsString]); // Use stable string representation instead of Set

  // Error state - show early if course not found
  if (error && !courseData) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/courses">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Browse All Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Error state - show early if course not found (before loading checks)
  if (error && !courseData && !loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/courses">
              <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                Browse All Courses
              </button>
            </Link>
            {slug && (
              <Link href={`/courses/${slug}`}>
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                  Back to Course
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading || authLoading || enrollmentLoading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  // Access denied - not enrolled
  // Only show this if enrollment check is complete and user is definitely not enrolled
  if (isAuthenticated && !enrollmentLoading && !isEnrolled && courseData) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Lock className="w-16 h-16 text-blue-900 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to enroll in this course to access the content.</p>
          <div className="flex gap-4 justify-center">
            <Link href={`/courses/${slug}`}>
              <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                Back to Course
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If enrollment is still loading or we're waiting for structure, show loading
  // This prevents showing "No content" before we know if user is enrolled
  if (enrollmentLoading || (isEnrolled && !courseStructure && !error)) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  // No content available
  // Only show this if enrollment check is complete, structure has loaded,
  // user IS enrolled, and we truly have no modules/lessons
  if (!enrollmentLoading && isEnrolled && courseStructure && (!modules.length || !allLessons.length)) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Content Available</h2>
          <p className="text-gray-600 mb-6">This course doesn't have any content yet. Please check back later.</p>
          <Link href={`/courses/${slug}`}>
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Back to Course
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0 lg:w-80`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Course Content</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{completedLessons}/{totalLessons} lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0 sidebar-scroll">
          {modules.map((module) => (
            <div key={module.id} className="mb-4">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChevronRight 
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      expandedModules.includes(module.id) ? 'rotate-90' : ''
                    }`} 
                  />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{module.title}</div>
                    <div className="text-sm text-gray-500">{module.completed}/{module.total} completed</div>
                  </div>
                </div>
              </button>

              {/* Module Lessons */}
              {expandedModules.includes(module.id) && (
                <div className="mt-2 ml-4 space-y-1">
                  {module.lessons && module.lessons.length > 0 ? (
                    module.lessons.map((lesson) => {
                      const lessonId = lesson.id || lesson._id;
                      const isCurrent = lessonId === currentLessonId || lesson._id === currentLessonId;

                      return (
                        <div
                          key={lessonId}
                          onClick={() => selectLesson(lessonId)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            isCurrent
                              ? 'bg-blue-50 border border-blue-200' 
                              : lesson.isLocked 
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {/* Lesson Icon */}
                          <div className="flex-shrink-0">
                            {lesson.isLocked ? (
                              <Lock className="w-4 h-4 text-gray-400" />
                            ) : isCurrent ? (
                              <Play className="w-4 h-4 text-blue-600" />
                            ) : lesson.isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400" />
                            )}
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium ${
                              isCurrent ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {lesson.title}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              {lesson.duration && (
                                <>
                                  <Clock className="w-3 h-3" />
                                  <span>{lesson.duration}</span>
                                </>
                              )}
                              {lesson.type === 'quiz' && (
                                <span className="bg-yellow-100 text-yellow-800 px-1 rounded">Quiz</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">No lessons in this module yet.</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 max-w-none lg:ml-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Back to Dashboard</span>
              </Link>
            </div>
            {/* Tests Button */}
              <Link
                href={`/courses/${resolvedParams?.slug}/test`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
              >
                <Award className="w-4 h-4" />
                Tests
              </Link>
            </div>
          
          {/* Title Row */}
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-gray-900">
              {courseData?.title || "Course Learning"}
            </h1>
            {currentLesson && (
              <p className="text-sm text-gray-500 mt-1">
                {currentLesson.title}
              </p>
            )}
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "video"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Video className="w-4 h-4" />
              Video
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "text"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              Text
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0" style={{ height: 'calc(100vh - 180px)' }}>
          {activeTab === "video" ? (
            currentLesson?.videoSrc ? (
              <div className="w-full h-full bg-black">
                <VideoPlayer 
                  key={currentLessonId} // Force remount when lesson changes
                  videoSrc={currentLesson.videoSrc}
                  title={currentLesson.title || "Course Video"}
                  contentId={currentLesson.contentId} // Pass content ID for video refresh
                  onProgressUpdate={handleVideoProgress}
                  autoplay={false}
                  onVideoEnd={() => {
                    // Video ended - timer will handle completion when it reaches 1 minute
                    // No auto-completion on video end
                  }}
                  onVideoStart={() => {
                    // Video started - timer is already running
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No video available</p>
                  <p className="text-sm text-gray-400">This lesson doesn't have a video yet.</p>
                </div>
              </div>
            )
          ) : (
            <div className="w-full h-full bg-white overflow-y-auto sidebar-scroll">
              <div className="p-8 max-w-4xl mx-auto">
                {currentLesson?.textContent ? (
                  // Render HTML content directly from rich text editor
                  <div 
                    className="rich-text-content"
                    dangerouslySetInnerHTML={{ __html: currentLesson.textContent }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No text content available</p>
                      <p className="text-sm mt-2">This lesson doesn't have text content yet.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0 h-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={goToPreviousLesson}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 transition-colors ${
                  currentIndex === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Previous</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {currentIndex + 1} of {totalLessons}
              </div>
              
              {/* Timer Display - show on all lessons */}
              {(
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
                  timerCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <Clock className={`w-4 h-4 ${
                    timerCompleted ? 'text-green-600' : 'text-blue-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    timerCompleted ? 'text-green-900' : 'text-blue-900'
                  }`}>
                    {timerCompleted 
                      ? 'Ready' 
                      : `${Math.max(0, 60 - lessonTimer)}s`
                    }
                  </span>
                </div>
              )}
              
              {/* Show buttons based on lesson position and test requirements */}
              {currentIndex < totalLessons - 1 ? (
                <div className="flex items-center gap-3">
                  {/* Take Test button - shown when tests are required */}
                  {requiredTests.length > 0 && !allRequiredTestsCompleted && (
                    <Link
                      href={`/courses/${resolvedParams?.slug}/test`}
                      disabled={!timerCompleted}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                        !timerCompleted
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-orange-600 text-white hover:bg-orange-700'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      Take Test {requiredTests.filter(t => !t.isCompleted).length > 1 && `(${requiredTests.filter(t => !t.isCompleted).length})`}
                    </Link>
                  )}
                  
                  {/* Next Lesson button - automatically marks lesson as complete when clicked */}
                <button 
                  onClick={goToNextLesson}
                    disabled={!timerCompleted || !allRequiredTestsCompleted || loadingTests}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                      !timerCompleted || !allRequiredTestsCompleted || loadingTests
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-900 text-white hover:bg-blue-800'
                  }`}
                    title={!allRequiredTestsCompleted ? `Complete ${requiredTests.filter(t => !t.isCompleted).length} required test(s) to proceed` : ''}
                >
                    {loadingTests ? (
                      'Loading...'
                    ) : !timerCompleted ? (
                      `Next Lesson (${Math.max(0, 60 - lessonTimer)}s)`
                    ) : !allRequiredTestsCompleted ? (
                      `Complete Tests (${requiredTests.filter(t => !t.isCompleted).length})`
                    ) : (
                      'Next Lesson'
                    )}
                </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Complete button for last lesson */}
                  <button 
                    onClick={async () => {
                    if (currentLesson && currentLessonId) {
                      const currentLessonIdStr = (currentLesson._id || currentLesson.id)?.toString();
                      if (!completedLessonIds.has(currentLessonIdStr)) {
                        await handleMarkLessonComplete(currentLessonIdStr);
                        }
                      }
                    }}
                    disabled={!timerCompleted || completedLessonIds.has((currentLesson?._id || currentLesson?.id)?.toString())}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                      !timerCompleted || completedLessonIds.has((currentLesson?._id || currentLesson?.id)?.toString())
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {completedLessonIds.has((currentLesson?._id || currentLesson?.id)?.toString()) ? 'Completed' : 'Complete'}
                  </button>
                  
                  {/* Take Test button for last lesson - only show after course is 100% complete */}
                  {completedLessons === totalLessons && totalLessons > 0 && (
                    <Link
                      href={`/courses/${resolvedParams?.slug}/test`}
                      className="px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 bg-orange-600 text-white hover:bg-orange-700"
                >
                  <Award className="w-4 h-4" />
                      Take Test
                </Link>
              )}
                  
                  {/* Show timer for last lesson */}
                  {!timerCompleted && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg border bg-blue-50 border-blue-200">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        {Math.max(0, 60 - lessonTimer)}s
                      </span>
            </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Floating Query Button */}
      <FloatingQueryButton
        courseId={courseData?._id || courseData?.id || resolvedParams?.slug}
        courseTitle={courseData?.title || "Course"}
        lessonId={currentLessonId}
        lessonTitle={currentLesson?.title || "Current Lesson"}
      />
    </div>
  );
}
