// Online Course Content Data
export const ONLINE_COURSE_TABS = [
  { id: "all", label: "All Courses", count: 400 },
  { id: "featured", label: "Featured", count: 45 },
  { id: "beginner", label: "Beginner", count: 120 },
  { id: "intermediate", label: "Intermediate", count: 180 },
  { id: "advanced", label: "Advanced", count: 100 },
  { id: "certified", label: "Certified", count: 85 }
];

export const ONLINE_COURSES_DATA = [
  {
    id: 1,
    title: "Marine Engineering Fundamentals",
    description: "Master the basics of marine engineering, from propulsion systems to electrical operations. Essential training for technical ratings.",
    instructor: "Commander Sarah Johnson",
    duration: "12 weeks",
    level: "Beginner",
    rating: 4.8,
    studentsCount: 150,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    price: 299,
    category: "Marine Engineering",
    isFeatured: true,
    location: "Online",
    lessons: 24,
    certificate: true
  },
  {
    id: 2,
    title: "Advanced Navigation Systems",
    description: "Learn modern navigation techniques, GPS systems, and chart plotting. Essential skills for deck officers and navigation specialists.",
    instructor: "Captain Michael Chen",
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.9,
    studentsCount: 120,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    price: 399,
    category: "Navigation",
    isFeatured: true,
    location: "Online",
    lessons: 16,
    certificate: true
  },
  {
    id: 3,
    title: "Maritime Safety & Security",
    description: "Comprehensive training in safety protocols, emergency response, and security measures for maritime operations.",
    instructor: "Lieutenant Commander David Rodriguez",
    duration: "16 weeks",
    level: "Advanced",
    rating: 4.7,
    studentsCount: 200,
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop",
    price: 499,
    category: "Safety & Security",
    isFeatured: false,
    location: "Online",
    lessons: 32,
    certificate: true
  },
  {
    id: 4,
    title: "Naval Communications",
    description: "Master naval communication systems, radio operations, and signal procedures essential for fleet operations.",
    instructor: "Chief Petty Officer Lisa Wang",
    duration: "10 weeks",
    level: "Beginner",
    rating: 4.6,
    studentsCount: 180,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    price: 199,
    category: "Communications",
    isFeatured: false,
    location: "Online",
    lessons: 20,
    certificate: true
  },
  {
    id: 5,
    title: "Leadership & Command",
    description: "Develop essential leadership skills, team management, and command principles for advancing your naval career.",
    instructor: "Admiral James Thompson",
    duration: "14 weeks",
    level: "Intermediate",
    rating: 4.9,
    studentsCount: 95,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    price: 599,
    category: "Leadership",
    isFeatured: true,
    location: "Online",
    lessons: 28,
    certificate: true
  },
  {
    id: 6,
    title: "Weapons Systems Operations",
    description: "Advanced training in naval weapons systems, targeting, and tactical operations for defense specialists.",
    instructor: "Captain Elena Petrova",
    duration: "20 weeks",
    level: "Advanced",
    rating: 4.8,
    studentsCount: 160,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    price: 699,
    category: "Weapons Systems",
    isFeatured: false,
    location: "Online",
    lessons: 40,
    certificate: true
  },
  {
    id: 7,
    title: "Submarine Operations",
    description: "Specialized training for submarine crew members, covering underwater navigation, systems operation, and emergency procedures.",
    instructor: "Commander Robert Kim",
    duration: "24 weeks",
    level: "Advanced",
    rating: 4.9,
    studentsCount: 75,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    price: 799,
    category: "Submarine Operations",
    isFeatured: true,
    location: "Online",
    lessons: 48,
    certificate: true
  },
  {
    id: 8,
    title: "Aircraft Carrier Operations",
    description: "Comprehensive training for aircraft carrier crew, including flight deck operations, aircraft handling, and logistics.",
    instructor: "Captain Maria Gonzalez",
    duration: "18 weeks",
    level: "Intermediate",
    rating: 4.7,
    studentsCount: 110,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    price: 549,
    category: "Aircraft Operations",
    isFeatured: false,
    location: "Online",
    lessons: 36,
    certificate: true
  },
  {
    id: 9,
    title: "Cyber Security in Naval Operations",
    description: "Modern cybersecurity training for naval personnel, covering threat detection, network security, and digital warfare.",
    instructor: "Lieutenant Alex Turner",
    duration: "12 weeks",
    level: "Intermediate",
    rating: 4.8,
    studentsCount: 140,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    price: 449,
    category: "Cyber Security",
    isFeatured: true,
    location: "Online",
    lessons: 24,
    certificate: true
  }
];

export const ONLINE_FEATURED_COURSES = [
  {
    id: 1,
    title: "Advanced Naval Warfare Strategies",
    description: "Master the art of naval warfare with cutting-edge strategies, tactical planning, and modern combat techniques.",
    instructor: "Admiral Sarah Mitchell",
    duration: "16 weeks",
    studentsCount: 250,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=600&h=400&fit=crop",
    price: 799,
    category: "Advanced Warfare",
    badge: "Most Popular",
    lessons: 32,
    certificate: true,
    level: "Advanced"
  },
  {
    id: 2,
    title: "Submarine Command Operations",
    description: "Comprehensive training for submarine commanders covering underwater navigation, crew management, and tactical operations.",
    instructor: "Commander James Rodriguez",
    duration: "20 weeks",
    studentsCount: 85,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    price: 999,
    category: "Submarine Operations",
    badge: "Elite Training",
    lessons: 40,
    certificate: true,
    level: "Advanced"
  },
  {
    id: 3,
    title: "Cyber Defense for Naval Networks",
    description: "Protect naval communications and systems from cyber threats with advanced security protocols and digital warfare techniques.",
    instructor: "Lieutenant Commander Elena Chen",
    duration: "12 weeks",
    studentsCount: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    price: 649,
    category: "Cyber Security",
    badge: "Hot Course",
    lessons: 24,
    certificate: true,
    level: "Intermediate"
  },
  {
    id: 4,
    title: "Leadership Excellence Program",
    description: "Develop exceptional leadership skills with our comprehensive program designed for senior naval officers and future commanders.",
    instructor: "Vice Admiral Michael Thompson",
    duration: "18 weeks",
    studentsCount: 120,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    price: 899,
    category: "Leadership",
    badge: "Executive Level",
    lessons: 36,
    certificate: true,
    level: "Advanced"
  },
  {
    id: 5,
    title: "Aircraft Carrier Flight Operations",
    description: "Master the complex world of aircraft carrier operations including flight deck management, aircraft handling, and logistics coordination.",
    instructor: "Captain Lisa Wang",
    duration: "14 weeks",
    studentsCount: 95,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    price: 749,
    category: "Flight Operations",
    badge: "Specialized",
    lessons: 28,
    certificate: true,
    level: "Intermediate"
  }
];

export const ONLINE_HERO_CONTENT = {
  title: "Master Naval Excellence Online",
  subtitle: "Transform Your Naval Career with World-Class Digital Training",
  description: "Join thousands of naval professionals who have advanced their careers through our comprehensive online training programs. Learn from distinguished instructors, access cutting-edge content, and earn recognized certifications - all from the comfort of your location.",
  features: [
    { icon: "Globe", text: "Learn from Anywhere" },
    { icon: "Clock", text: "Flexible Schedule" },
    { icon: "Users", text: "Expert Instructors" },
    { icon: "Award", text: "Certified Programs" }
  ],
  stats: [
    { number: "400+", label: "Online Courses" },
    { number: "15,000+", label: "Active Students" },
    { number: "4.8/5", label: "Average Rating" },
    { number: "95%", label: "Completion Rate" }
  ],
  cta: {
    primary: "Browse Online Courses",
    secondary: "View Free Demos"
  },
  backgroundImage: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=1920&h=1080&fit=crop",
  badges: [
    "Accredited by Naval Education Board",
    "Industry-Recognized Certifications",
    "24/7 Learning Support",
    "Mobile-Friendly Platform"
  ]
};

export const ONLINE_SEARCH_CONTENT = {
  placeholder: "Search courses by name, instructor, or skills...",
  filters: [
    { id: "all", label: "All Courses", count: 400 },
    { id: "beginner", label: "Beginner", count: 120 },
    { id: "intermediate", label: "Intermediate", count: 180 },
    { id: "advanced", label: "Advanced", count: 100 }
  ],
  categories: [
    "Marine Engineering",
    "Navigation",
    "Leadership",
    "Communications",
    "Safety & Security",
    "Weapons Systems"
  ],
  durationFilters: [
    "Under 4 weeks",
    "4-8 weeks", 
    "8-16 weeks",
    "16+ weeks"
  ]
};

export const ONLINE_MENTORS_DATA = [
  {
    id: 1,
    name: "Admiral Sarah Mitchell",
    title: "Fleet Commander",
    specialization: "Naval Warfare & Strategy",
    experience: 25,
    rating: 4.9,
    studentsCount: 1250,
    coursesCount: 8,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "Distinguished naval officer with 25 years of experience in fleet operations, strategic planning, and combat leadership. Led multiple successful naval campaigns and trained thousands of officers.",
    achievements: [
      "Led Operation Ocean Shield (2018-2020)",
      "Commander of the 7th Fleet (2015-2018)",
      "Navy Cross recipient for valor in combat",
      "Author of 'Modern Naval Strategy' textbook"
    ],
    bestCourses: [
      { title: "Advanced Naval Warfare Strategies", duration: "16 weeks", students: 250, rating: 4.9 },
      { title: "Fleet Command Operations", duration: "12 weeks", students: 180, rating: 4.8 },
      { title: "Strategic Planning for Naval Officers", duration: "8 weeks", students: 200, rating: 4.7 }
    ]
  },
  {
    id: 2,
    name: "Commander James Rodriguez",
    title: "Submarine Commander",
    specialization: "Submarine Operations & Navigation",
    experience: 18,
    rating: 4.8,
    studentsCount: 890,
    coursesCount: 6,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Expert submarine commander with extensive experience in underwater operations, stealth tactics, and advanced navigation systems. Specialist in nuclear submarine operations.",
    achievements: [
      "Commanded USS Virginia-class submarine",
      "Completed 15 successful patrol missions",
      "Submarine Warfare Specialist certification",
      "Naval Institute Award for Excellence"
    ],
    bestCourses: [
      { title: "Submarine Command Operations", duration: "20 weeks", students: 85, rating: 4.8 },
      { title: "Advanced Underwater Navigation", duration: "14 weeks", students: 120, rating: 4.7 },
      { title: "Nuclear Submarine Systems", duration: "18 weeks", students: 95, rating: 4.9 }
    ]
  },
  {
    id: 3,
    name: "Captain Elena Chen",
    title: "Cyber Warfare Specialist",
    specialization: "Cyber Security & Digital Warfare",
    experience: 12,
    rating: 4.7,
    studentsCount: 650,
    coursesCount: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Pioneer in naval cyber security with expertise in network defense, digital warfare tactics, and information security protocols. Leads the Navy's cyber defense initiatives.",
    achievements: [
      "Established Navy Cyber Defense Center",
      "Developed cyber security protocols for fleet operations",
      "Navy Information Dominance Award recipient",
      "Ph.D. in Cybersecurity from MIT"
    ],
    bestCourses: [
      { title: "Cyber Defense for Naval Networks", duration: "12 weeks", students: 180, rating: 4.7 },
      { title: "Digital Warfare Tactics", duration: "16 weeks", students: 140, rating: 4.8 },
      { title: "Network Security Fundamentals", duration: "10 weeks", students: 220, rating: 4.6 }
    ]
  },
  {
    id: 4,
    name: "Vice Admiral Michael Thompson",
    title: "Leadership Development Director",
    specialization: "Leadership & Command Excellence",
    experience: 30,
    rating: 4.9,
    studentsCount: 2100,
    coursesCount: 10,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Veteran naval officer with three decades of leadership experience. Expert in organizational development, strategic planning, and executive leadership training for senior officers.",
    achievements: [
      "Chief of Naval Operations Staff (2018-2021)",
      "Commander of Naval Education and Training Command",
      "Distinguished Service Medal recipient",
      "Harvard Business School Executive Program graduate"
    ],
    bestCourses: [
      { title: "Leadership Excellence Program", duration: "18 weeks", students: 120, rating: 4.9 },
      { title: "Executive Command Principles", duration: "14 weeks", students: 95, rating: 4.8 },
      { title: "Strategic Decision Making", duration: "12 weeks", students: 150, rating: 4.7 }
    ]
  },
  {
    id: 5,
    name: "Captain Lisa Wang",
    title: "Aircraft Operations Commander",
    specialization: "Flight Operations & Carrier Management",
    experience: 16,
    rating: 4.8,
    studentsCount: 720,
    coursesCount: 7,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    bio: "Accomplished naval aviator and aircraft carrier operations expert. Specializes in flight deck management, aircraft handling procedures, and carrier-based operations.",
    achievements: [
      "Commanded Carrier Air Wing 17",
      "Over 3000 flight hours in naval aircraft",
      "Navy Air Medal with Combat Distinguishing Device",
      "Flight Operations Excellence Award"
    ],
    bestCourses: [
      { title: "Aircraft Carrier Flight Operations", duration: "14 weeks", students: 95, rating: 4.8 },
      { title: "Flight Deck Management", duration: "10 weeks", students: 110, rating: 4.7 },
      { title: "Naval Aviation Safety", duration: "8 weeks", students: 180, rating: 4.6 }
    ]
  },
  {
    id: 6,
    name: "Commander Robert Kim",
    title: "Marine Engineering Expert",
    specialization: "Marine Engineering & Systems",
    experience: 20,
    rating: 4.6,
    studentsCount: 580,
    coursesCount: 6,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    bio: "Senior marine engineer with expertise in ship propulsion systems, power generation, and mechanical systems. Leads technical training programs for engineering personnel.",
    achievements: [
      "Chief Engineer on multiple destroyers",
      "Marine Engineering Excellence Award",
      "Professional Engineer (PE) certification",
      "Advanced Nuclear Power School graduate"
    ],
    bestCourses: [
      { title: "Advanced Marine Engineering", duration: "16 weeks", students: 160, rating: 4.6 },
      { title: "Nuclear Power Systems", duration: "20 weeks", students: 85, rating: 4.8 },
      { title: "Ship Propulsion Technology", duration: "12 weeks", students: 140, rating: 4.5 }
    ]
  }
];
