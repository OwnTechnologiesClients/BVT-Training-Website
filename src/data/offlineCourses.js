// Offline Course Content Data
export const OFFLINE_COURSE_TABS = [
  { id: "all", label: "All Workshops", count: 25 },
  { id: "featured", label: "Featured", count: 8 },
  { id: "technical", label: "Technical", count: 10 },
  { id: "leadership", label: "Leadership", count: 7 },
  { id: "security", label: "Security", count: 8 },
  { id: "certified", label: "Certified", count: 15 }
];

export const OFFLINE_COURSES_DATA = [
  {
    id: 1,
    title: "Advanced Naval Engineering Workshop",
    description: "Hands-on workshop covering advanced BVT engineering principles, system maintenance, and technical troubleshooting.",
    instructor: "Commander James Rodriguez",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop",
    duration: "5 days",
    students: 15,
    rating: 4.9,
    price: 2500,
    category: "Technical Training",
    isFeatured: true,
    location: "Mumbai Naval Base",
    startDate: "March 15, 2024",
    endDate: "March 19, 2024",
    skills: ["BVT Engineering", "System Maintenance", "Technical Troubleshooting", "Safety Protocols"]
  },
  {
    id: 2,
    title: "Leadership Excellence Bootcamp",
    description: "Intensive leadership training program focusing on command skills, decision-making, and team management.",
    instructor: "Vice Admiral Sarah Mitchell",
    instructorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    duration: "3 days",
    students: 20,
    rating: 4.8,
    price: 1800,
    category: "Leadership Development",
    isFeatured: true,
    location: "Delhi Training Center",
    startDate: "April 8, 2024",
    endDate: "April 10, 2024",
    skills: ["Leadership", "Command Skills", "Decision Making", "Team Management"]
  },
  {
    id: 3,
    title: "Maritime Security Operations",
    description: "Comprehensive training in maritime security protocols, threat assessment, and emergency response procedures.",
    instructor: "Captain Michael Thompson",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    duration: "7 days",
    students: 12,
    rating: 4.9,
    price: 3200,
    category: "Security & Defense",
    isFeatured: true,
    location: "Kochi Naval Academy",
    startDate: "May 20, 2024",
    endDate: "May 26, 2024",
    skills: ["Security Protocols", "Threat Assessment", "Emergency Response", "Crisis Management"]
  },
  {
    id: 4,
    title: "Submarine Operations Masterclass",
    description: "Specialized training in submarine operations, underwater navigation, and advanced submarine systems.",
    instructor: "Commander Lisa Chen",
    instructorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    duration: "6 days",
    students: 8,
    rating: 4.9,
    price: 2800,
    category: "Technical Training",
    isFeatured: false,
    location: "Visakhapatnam Naval Base",
    startDate: "June 12, 2024",
    endDate: "June 17, 2024",
    skills: ["Submarine Operations", "Underwater Navigation", "Advanced Systems", "Safety Procedures"]
  },
  {
    id: 5,
    title: "Fleet Command Excellence",
    description: "Advanced fleet command training covering strategic planning, resource management, and operational coordination.",
    instructor: "Admiral David Kumar",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    duration: "4 days",
    students: 18,
    rating: 4.8,
    price: 2200,
    category: "Leadership Development",
    isFeatured: true,
    location: "Goa Naval Command",
    startDate: "July 5, 2024",
    endDate: "July 8, 2024",
    skills: ["Fleet Command", "Strategic Planning", "Resource Management", "Operational Coordination"]
  },
  {
    id: 6,
    title: "Naval Intelligence Analysis",
    description: "Specialized training in BVT intelligence gathering, analysis techniques, and strategic intelligence operations.",
    instructor: "Lieutenant Commander Priya Sharma",
    instructorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    duration: "5 days",
    students: 14,
    rating: 4.7,
    price: 2400,
    category: "Security & Defense",
    isFeatured: false,
    location: "Pune Intelligence Center",
    startDate: "August 15, 2024",
    endDate: "August 19, 2024",
    skills: ["Intelligence Analysis", "Data Processing", "Strategic Intelligence", "Report Writing"]
  },
  {
    id: 7,
    title: "Weapons Systems Training",
    description: "Advanced weapons training with live equipment, targeting systems, and tactical operations.",
    instructor: "Captain Elena Petrova",
    instructorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    duration: "4 days",
    students: 16,
    rating: 4.8,
    price: 2600,
    category: "Security & Defense",
    isFeatured: false,
    location: "Weapons Training Facility",
    startDate: "September 10, 2024",
    endDate: "September 13, 2024",
    skills: ["Weapons Systems", "Targeting", "Tactical Operations", "Safety Protocols"]
  },
  {
    id: 8,
    title: "Communication Systems Workshop",
    description: "Hands-on training in BVT communication systems, radio operations, and signal procedures.",
    instructor: "Chief Petty Officer Lisa Wang",
    instructorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    duration: "3 days",
    students: 22,
    rating: 4.6,
    price: 1600,
    category: "Technical Training",
    isFeatured: false,
    location: "Communication Center",
    startDate: "October 5, 2024",
    endDate: "October 7, 2024",
    skills: ["Communication Systems", "Radio Operations", "Signal Procedures", "Network Security"]
  },
  {
    id: 9,
    title: "Crisis Management Training",
    description: "Intensive crisis management training with real-world scenarios and emergency response procedures.",
    instructor: "Commander Robert Kim",
    instructorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    duration: "6 days",
    students: 12,
    rating: 4.9,
    price: 3000,
    category: "Leadership Development",
    isFeatured: true,
    location: "Crisis Training Center",
    startDate: "November 8, 2024",
    endDate: "November 13, 2024",
    skills: ["Crisis Management", "Emergency Response", "Decision Making", "Team Coordination"]
  }
];

export const OFFLINE_FEATURED_COURSES = [
  {
    id: 1,
    title: "Advanced Naval Engineering Workshop",
    description: "Hands-on workshop covering advanced BVT engineering principles, system maintenance, and technical troubleshooting with real equipment.",
    instructor: "Commander James Rodriguez",
    duration: "5 days",
    studentsCount: 15,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=600&h=400&fit=crop",
    price: 2500,
    category: "Technical Training",
    badge: "Most Popular",
    location: "Mumbai Naval Base",
    startDate: "March 15, 2024",
    endDate: "March 19, 2024",
    level: "Advanced"
  },
  {
    id: 2,
    title: "Leadership Excellence Bootcamp",
    description: "Intensive leadership training program focusing on command skills, decision-making, and team management with real-world scenarios.",
    instructor: "Vice Admiral Sarah Mitchell",
    duration: "3 days",
    studentsCount: 20,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    price: 1800,
    category: "Leadership Development",
    badge: "Elite Training",
    location: "Delhi Training Center",
    startDate: "April 8, 2024",
    endDate: "April 10, 2024",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Maritime Security Operations",
    description: "Comprehensive training in maritime security protocols, threat assessment, and emergency response procedures with hands-on exercises.",
    instructor: "Captain Michael Thompson",
    duration: "7 days",
    studentsCount: 12,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    price: 3200,
    category: "Security & Defense",
    badge: "Specialized",
    location: "Kochi Naval Academy",
    startDate: "May 20, 2024",
    endDate: "May 26, 2024",
    level: "Advanced"
  },
  {
    id: 4,
    title: "Crisis Management Training",
    description: "Intensive crisis management training with real-world scenarios and emergency response procedures in controlled environments.",
    instructor: "Commander Robert Kim",
    duration: "6 days",
    studentsCount: 12,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
    price: 3000,
    category: "Leadership Development",
    badge: "Executive Level",
    location: "Crisis Training Center",
    startDate: "November 8, 2024",
    endDate: "November 13, 2024",
    level: "Advanced"
  },
  {
    id: 5,
    title: "Submarine Operations Masterclass",
    description: "Specialized training in submarine operations, underwater navigation, and advanced submarine systems with simulator training.",
    instructor: "Commander Lisa Chen",
    duration: "6 days",
    studentsCount: 8,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    price: 2800,
    category: "Technical Training",
    badge: "Elite Program",
    location: "Visakhapatnam Naval Base",
    startDate: "June 12, 2024",
    endDate: "June 17, 2024",
    level: "Advanced"
  }
];

export const OFFLINE_HERO_CONTENT = {
  title: "Elite Hands-On Naval Training",
  subtitle: "Master Real-World Skills in State-of-the-Art Training Facilities",
  description: "Experience intensive, immersive BVT training with cutting-edge equipment and world-class instructors. Our offline workshops provide unparalleled hands-on learning opportunities in strategically located facilities across India.",
  features: [
    { icon: "MapPin", text: "Multiple Locations" },
    { icon: "Users", text: "Small Class Sizes" },
    { icon: "Award", text: "Certified Instructors" },
    { icon: "Wrench", text: "Hands-on Equipment" }
  ],
  stats: [
    { number: "25+", label: "Workshop Programs" },
    { number: "6+", label: "Training Locations" },
    { number: "4.9/5", label: "Workshop Rating" },
    { number: "98%", label: "Success Rate" }
  ],
  cta: {
    primary: "Browse Workshops",
    secondary: "Schedule a Visit"
  },
  backgroundImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
  badges: [
    "Military-Grade Training Equipment",
    "Real-World Simulation Facilities",
    "Accommodation & Meals Included",
    "Post-Training Support Network"
  ]
};

export const OFFLINE_SEARCH_CONTENT = {
  placeholder: "Search workshops by name, instructor, location, or skills...",
  filters: [
    { id: "all", label: "All Workshops", count: 25 },
    { id: "technical", label: "Technical", count: 10 },
    { id: "leadership", label: "Leadership", count: 7 },
    { id: "security", label: "Security", count: 8 }
  ],
  locations: [
    "Mumbai Naval Base",
    "Delhi Training Center",
    "Kochi Naval Academy",
    "Visakhapatnam Naval Base",
    "Goa Naval Command",
    "Pune Intelligence Center"
  ],
  durationFilters: [
    "1-3 days",
    "4-5 days", 
    "6-7 days",
    "1+ weeks"
  ]
};

export const OFFLINE_MENTORS_DATA = [
  {
    id: 1,
    name: "Commander James Rodriguez",
    title: "Senior Naval Engineer",
    specialization: "Marine Engineering & Technical Systems",
    experience: 18,
    rating: 4.9,
    studentsCount: 450,
    workshopsCount: 12,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    availableLocations: ["Mumbai Naval Base", "Delhi Training Center", "Kochi Naval Academy"],
    bio: "Expert BVT engineer with 18 years of experience in marine engineering, system maintenance, and technical training. Specialist in hands-on workshop delivery.",
    achievements: [
      "Chief Engineer on multiple destroyers",
      "Marine Engineering Excellence Award",
      "Professional Engineer (PE) certification",
      "Advanced Nuclear Power School graduate"
    ],
    bestWorkshops: [
      { title: "Advanced Marine Engineering Workshop", duration: "5 days", students: 160, rating: 4.9 },
      { title: "Nuclear Power Systems Training", duration: "6 days", students: 85, rating: 4.8 },
      { title: "Ship Propulsion Technology", duration: "4 days", students: 140, rating: 4.7 }
    ]
  },
  {
    id: 2,
    name: "Vice Admiral Sarah Mitchell",
    title: "Leadership Development Director",
    specialization: "Leadership & Command Excellence",
    experience: 25,
    rating: 4.9,
    studentsCount: 850,
    workshopsCount: 15,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    availableLocations: ["Delhi Training Center", "Goa Naval Command", "Mumbai Naval Base"],
    bio: "Veteran BVT officer with 25 years of leadership experience. Expert in organizational development, strategic planning, and executive leadership training.",
    achievements: [
      "Chief of Naval Operations Staff (2018-2021)",
      "Commander of Naval Education and Training Command",
      "Distinguished Service Medal recipient",
      "Harvard Business School Executive Program graduate"
    ],
    bestWorkshops: [
      { title: "Leadership Excellence Bootcamp", duration: "3 days", students: 120, rating: 4.9 },
      { title: "Executive Command Principles", duration: "4 days", students: 95, rating: 4.8 },
      { title: "Strategic Decision Making", duration: "3 days", students: 150, rating: 4.7 }
    ]
  },
  {
    id: 3,
    name: "Captain Michael Thompson",
    title: "Security Operations Specialist",
    specialization: "Maritime Security & Defense",
    experience: 20,
    rating: 4.8,
    studentsCount: 320,
    workshopsCount: 8,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    availableLocations: ["Kochi Naval Academy", "Pune Intelligence Center", "Visakhapatnam Naval Base"],
    bio: "Specialized in maritime security operations with extensive experience in threat assessment, emergency response, and crisis management training.",
    achievements: [
      "Led multiple security operations",
      "Maritime Security Excellence Award",
      "Crisis Management Specialist certification",
      "Advanced Security Operations graduate"
    ],
    bestWorkshops: [
      { title: "Maritime Security Operations", duration: "7 days", students: 180, rating: 4.8 },
      { title: "Crisis Management Training", duration: "5 days", students: 140, rating: 4.7 },
      { title: "Threat Assessment Workshop", duration: "4 days", students: 220, rating: 4.6 }
    ]
  },
  {
    id: 4,
    name: "Commander Lisa Chen",
    title: "Submarine Operations Expert",
    specialization: "Submarine Operations & Navigation",
    experience: 15,
    rating: 4.9,
    studentsCount: 280,
    workshopsCount: 6,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    availableLocations: ["Visakhapatnam Naval Base", "Mumbai Naval Base"],
    bio: "Expert submarine commander with extensive experience in underwater operations, stealth tactics, and advanced navigation systems.",
    achievements: [
      "Commanded USS Virginia-class submarine",
      "Completed 15 successful patrol missions",
      "Submarine Warfare Specialist certification",
      "Naval Institute Award for Excellence"
    ],
    bestWorkshops: [
      { title: "Submarine Operations Masterclass", duration: "6 days", students: 85, rating: 4.9 },
      { title: "Advanced Underwater Navigation", duration: "5 days", students: 120, rating: 4.8 },
      { title: "Nuclear Submarine Systems", duration: "7 days", students: 95, rating: 4.7 }
    ]
  },
  {
    id: 5,
    name: "Lieutenant Commander Priya Sharma",
    title: "Intelligence Analysis Specialist",
    specialization: "Naval Intelligence & Analysis",
    experience: 12,
    rating: 4.7,
    studentsCount: 200,
    workshopsCount: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    availableLocations: ["Pune Intelligence Center", "Delhi Training Center"],
    bio: "Specialist in BVT intelligence gathering and analysis with expertise in data processing, strategic intelligence operations, and report writing.",
    achievements: [
      "Established Intelligence Analysis Center",
      "Developed intelligence protocols for fleet operations",
      "Navy Intelligence Excellence Award recipient",
      "M sc in Intelligence Studies"
    ],
    bestWorkshops: [
      { title: "Naval Intelligence Analysis", duration: "5 days", students: 140, rating: 4.7 },
      { title: "Strategic Intelligence Operations", duration: "4 days", students: 180, rating: 4.6 },
      { title: "Data Analysis Fundamentals", duration: "3 days", students: 220, rating: 4.5 }
    ]
  },
  {
    id: 6,
    name: "Captain Elena Petrova",
    title: "Weapons Systems Expert",
    specialization: "Naval Weapons & Tactical Operations",
    experience: 16,
    rating: 4.8,
    studentsCount: 180,
    workshopsCount: 4,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    availableLocations: ["Weapons Training Facility", "Kochi Naval Academy"],
    bio: "Expert in BVT weapons systems with extensive experience in targeting, tactical operations, and weapons training programs.",
    achievements: [
      "Weapons Systems Excellence Award",
      "Advanced Tactical Operations certification",
      "Led weapons training programs for 10+ years",
      "Naval Weapons Specialist certification"
    ],
    bestWorkshops: [
      { title: "Weapons Systems Training", duration: "4 days", students: 160, rating: 4.8 },
      { title: "Advanced Targeting Systems", duration: "3 days", students: 120, rating: 4.7 },
      { title: "Tactical Operations Workshop", duration: "5 days", students: 100, rating: 4.6 }
    ]
  }
];
