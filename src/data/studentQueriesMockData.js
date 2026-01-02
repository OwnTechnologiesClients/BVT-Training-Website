// Mock data for student queries
export const studentQueriesMockData = [
  {
    id: "query-001",
    studentId: "stu-001",
    studentName: "Lieutenant Marcus Allen",
    courseId: "crs-001",
    courseTitle: "Navigation Systems & GPS",
    lessonId: 1,
    lessonTitle: "Intro to BVT Training Course",
    subject: "Understanding GPS coordinates",
    messages: [
      {
        id: "msg-001",
        sender: "student",
        senderName: "Lieutenant Marcus Allen",
        content: "I'm having trouble understanding how GPS coordinates work in the context of naval navigation. Can you explain the difference between decimal degrees and degrees/minutes/seconds?",
        timestamp: "2025-11-10T10:30:00Z",
      },
      {
        id: "msg-002",
        sender: "instructor",
        senderName: "Commander Sarah Johnson",
        content: "Great question! GPS coordinates can be expressed in different formats. Decimal degrees (e.g., 36.1234°N, 76.5678°W) are easier for calculations, while degrees/minutes/seconds (e.g., 36°7'24\"N, 76°34'4\"W) are more traditional. In naval navigation, we often use both depending on the context. Would you like me to show you how to convert between them?",
        timestamp: "2025-11-10T11:15:00Z",
      },
      {
        id: "msg-003",
        sender: "student",
        senderName: "Lieutenant Marcus Allen",
        content: "Yes, that would be helpful! Also, which format is more commonly used in actual naval operations?",
        timestamp: "2025-11-10T14:20:00Z",
      },
    ],
    status: "open",
    createdAt: "2025-11-10T10:30:00Z",
    lastUpdated: "2025-11-10T14:20:00Z",
  },
  {
    id: "query-002",
    studentId: "stu-001",
    studentName: "Lieutenant Marcus Allen",
    courseId: "crs-001",
    courseTitle: "Navigation Systems & GPS",
    lessonId: 3,
    lessonTitle: "What is BVT Warfare",
    subject: "Tactical decision-making process",
    messages: [
      {
        id: "msg-004",
        sender: "student",
        senderName: "Lieutenant Marcus Allen",
        content: "In the tactical decision-making section, I'm confused about the priority order when multiple threats are present. How do we determine which threat to address first?",
        timestamp: "2025-11-08T09:15:00Z",
      },
      {
        id: "msg-005",
        sender: "instructor",
        senderName: "Commander Sarah Johnson",
        content: "Excellent question! Threat prioritization follows a systematic approach: 1) Immediate danger to personnel, 2) Threat to mission-critical systems, 3) Strategic objectives. We use a threat matrix that considers proximity, capability, and intent. I'll send you a detailed reference document.",
        timestamp: "2025-11-08T10:45:00Z",
      },
    ],
    status: "resolved",
    createdAt: "2025-11-08T09:15:00Z",
    lastUpdated: "2025-11-08T10:45:00Z",
  },
  {
    id: "query-003",
    studentId: "stu-002",
    studentName: "Ensign Priya Sharma",
    courseId: "crs-002",
    courseTitle: "Maritime Security Operations",
    lessonId: 5,
    lessonTitle: "Security Protocols",
    subject: "Access control procedures",
    messages: [
      {
        id: "msg-006",
        sender: "student",
        senderName: "Ensign Priya Sharma",
        content: "Can you clarify the difference between Level 1 and Level 2 security clearances? I'm not sure which procedures apply to each level.",
        timestamp: "2025-11-09T13:30:00Z",
      },
    ],
    status: "open",
    createdAt: "2025-11-09T13:30:00Z",
    lastUpdated: "2025-11-09T13:30:00Z",
  },
  {
    id: "query-004",
    studentId: "stu-003",
    studentName: "Lieutenant Commander Ethan Brooks",
    courseId: "crs-005",
    courseTitle: "Submarine Operations Masterclass",
    lessonId: 8,
    lessonTitle: "Navigation Fundamentals",
    subject: "Underwater navigation challenges",
    messages: [
      {
        id: "msg-007",
        sender: "student",
        senderName: "Lieutenant Commander Ethan Brooks",
        content: "How do we maintain accurate navigation when GPS signals are unavailable underwater? What backup systems should we rely on?",
        timestamp: "2025-11-07T16:00:00Z",
      },
      {
        id: "msg-008",
        sender: "instructor",
        senderName: "Commander Sarah Johnson",
        content: "Underwater navigation requires inertial navigation systems (INS) and dead reckoning. We also use sonar-based positioning and periodic surfacing for GPS updates. The key is maintaining continuous position awareness through multiple redundant systems.",
        timestamp: "2025-11-07T17:30:00Z",
      },
      {
        id: "msg-009",
        sender: "student",
        senderName: "Lieutenant Commander Ethan Brooks",
        content: "Thank you! That makes sense. Is there a specific protocol for when to surface for GPS updates during a mission?",
        timestamp: "2025-11-08T08:00:00Z",
      },
    ],
    status: "open",
    createdAt: "2025-11-07T16:00:00Z",
    lastUpdated: "2025-11-08T08:00:00Z",
  },
];

// Get queries for a specific student
export const getStudentQueries = (studentId) => {
  return studentQueriesMockData.filter((query) => query.studentId === studentId);
};

// Get query by ID
export const getQueryById = (queryId) => {
  return studentQueriesMockData.find((query) => query.id === queryId);
};

// Get queries for a specific course
export const getCourseQueries = (courseId) => {
  return studentQueriesMockData.filter((query) => query.courseId === courseId);
};

