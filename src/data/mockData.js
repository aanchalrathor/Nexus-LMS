export const initialCourses = [
  {
    id: "cs-101",
    title: "Full-Stack Web Engineering with React & Node",
    category: "Development",
    level: "Intermediate",
    duration: "12 Weeks",
    lessonsCount: 42,
    rating: 4.9,
    reviewsCount: 328,
    instructor: {
      name: "Dr. Marcus Thorne",
      title: "Principal Engineer & Former MIT Fellow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    price: 499,
    enrolledCount: 1420,
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    description: "Master modern full-stack web architecture. Build scalable microservices, interactive React interfaces, and production-ready applications.",
    syllabus: [
      {
        title: "Module 1: Foundations & Architecture",
        duration: "3 hrs",
        lessons: [
          { id: "l1", title: "Course Introduction & Setup", duration: "14:20", completed: true, type: "video" },
          { id: "l2", title: "Modern ECMAScript & Asynchronous Flow", duration: "25:40", completed: true, type: "video" },
          { id: "l3", title: "Architecture Patterns: MVC to Clean Arch", duration: "32:15", completed: true, type: "video" },
          { id: "l4", title: "Module 1 Assessment Quiz", duration: "15:00", completed: true, type: "quiz" }
        ]
      },
      {
        title: "Module 2: State Management & Component Design",
        duration: "4.5 hrs",
        lessons: [
          { id: "l5", title: "Advanced React Hooks & Context APIs", duration: "28:10", completed: true, type: "video" },
          { id: "l6", title: "State Machines & Client Cache Patterns", duration: "35:00", completed: false, type: "video" },
          { id: "l7", title: "Component Composition & Design Tokens", duration: "22:45", completed: false, type: "video" },
          { id: "l8", title: "Portfolio Project Sprint #1", duration: "45:00", completed: false, type: "assignment" }
        ]
      },
      {
        title: "Module 3: Serverless Backend & Database Modeling",
        duration: "5 hrs",
        lessons: [
          { id: "l9", title: "PostgreSQL Schema Design & Indexing", duration: "40:10", completed: false, type: "video" },
          { id: "l10", title: "RESTful & GraphQL API Design", duration: "36:50", completed: false, type: "video" },
          { id: "l11", title: "Authentication: JWT, OAuth & Session Storage", duration: "42:15", completed: false, type: "video" }
        ]
      }
    ]
  },
  {
    id: "cs-102",
    title: "Applied Data Science & Machine Learning Systems",
    category: "Data Science",
    level: "Advanced",
    duration: "14 Weeks",
    lessonsCount: 56,
    rating: 4.85,
    reviewsCount: 215,
    instructor: {
      name: "Prof. Eleanor Vance",
      title: "Lead AI Researcher & Data Architect",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    price: 549,
    enrolledCount: 980,
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    description: "End-to-end predictive modeling, mathematical statistics, deep learning pipelines, and production machine learning deployment.",
    syllabus: [
      {
        title: "Module 1: Exploratory Data Analysis & Statistics",
        duration: "4 hrs",
        lessons: [
          { id: "ds1", title: "Probability Distributions & Hypothesis Testing", duration: "30:00", completed: true, type: "video" },
          { id: "ds2", title: "Feature Engineering & Data Cleansing", duration: "45:00", completed: false, type: "video" }
        ]
      }
    ]
  },
  {
    id: "cs-103",
    title: "Enterprise UX/UI Architecture & Design Systems",
    category: "Design",
    level: "Beginner to Intermediate",
    duration: "10 Weeks",
    lessonsCount: 38,
    rating: 4.92,
    reviewsCount: 402,
    instructor: {
      name: "Sarah Jenkins",
      title: "Staff Product Designer, Ex-Figma",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
    },
    price: 399,
    enrolledCount: 1650,
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
    description: "Design systematic enterprise products. Master typography scales, interaction design, tokenized component libraries, and usability testing.",
    syllabus: [
      {
        title: "Module 1: Design Principles & Cognitive Psychology",
        duration: "3 hrs",
        lessons: [
          { id: "ui1", title: "Mental Models & Affordances", duration: "20:00", completed: true, type: "video" },
          { id: "ui2", title: "Figma Variables & Token Architecture", duration: "35:00", completed: true, type: "video" }
        ]
      }
    ]
  },
  {
    id: "cs-104",
    title: "Cloud Infrastructure & Kubernetes DevOps Masterclass",
    category: "DevOps & Cloud",
    level: "Advanced",
    duration: "12 Weeks",
    lessonsCount: 44,
    rating: 4.79,
    reviewsCount: 180,
    instructor: {
      name: "David Chen",
      title: "Infrastructure Director & Cloud Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    price: 479,
    enrolledCount: 840,
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    description: "Configure resilient CI/CD delivery pipelines, Terraform IaC, multi-region Kubernetes clusters, and observability stacks.",
    syllabus: [
      {
        title: "Module 1: Containerization & Docker",
        duration: "3.5 hrs",
        lessons: [
          { id: "dev1", title: "Docker Internals and Image Optimization", duration: "25:00", completed: false, type: "video" }
        ]
      }
    ]
  },
  {
    id: "cs-105",
    title: "Strategic Product Management & Tech Leadership",
    category: "Business",
    level: "Intermediate",
    duration: "8 Weeks",
    lessonsCount: 30,
    rating: 4.88,
    reviewsCount: 290,
    instructor: {
      name: "Aria Montgomery",
      title: "VP of Product & Venture Advisor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    price: 429,
    enrolledCount: 1120,
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    description: "Turn user insights into high-impact roadmaps, align cross-functional engineering teams, and deliver measurable business outcomes.",
    syllabus: [
      {
        title: "Module 1: Market Validation & Strategy",
        duration: "2.5 hrs",
        lessons: [
          { id: "pm1", title: "Opportunity Solution Trees", duration: "24:00", completed: false, type: "video" }
        ]
      }
    ]
  },
  {
    id: "cs-106",
    title: "Generative AI Systems & LLM Application Engineering",
    category: "Data Science",
    level: "Advanced",
    duration: "10 Weeks",
    lessonsCount: 36,
    rating: 4.95,
    reviewsCount: 350,
    instructor: {
      name: "Dr. Marcus Thorne",
      title: "Principal Engineer & Former MIT Fellow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    price: 599,
    enrolledCount: 1890,
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    description: "Architect robust RAG systems, evaluate embeddings, fine-tune models, and deploy production-grade agentic workflows.",
    syllabus: [
      {
        title: "Module 1: LLM Foundations & Prompt Engineering",
        duration: "3 hrs",
        lessons: [
          { id: "ai1", title: "Vector Databases & Semantic Search", duration: "28:00", completed: false, type: "video" }
        ]
      }
    ]
  }
];

export const initialStudentData = {
  id: "std-9021",
  name: "Student",
  email: "student@nexuslms.edu",
  phone: "",
  role: "Student",
  title: "Scholar",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  bio: "Full-stack engineering scholar focused on scalable systems, distributed databases, and high-performance frontend interfaces.",
  location: "",
  timeZone: "Pacific Time (PT) - UTC-8",
  joinedDate: "October 2024",
  stats: {
    activeCourses: 3,
    completedCourses: 2,
    hoursLearned: 68.5,
    currentStreakDays: 14,
    assignmentsSubmitted: 9,
    certificatesEarned: 2
  },
  enrolledCourses: [
    {
      courseId: "cs-101",
      progress: 68,
      lastAccessed: "2 hours ago",
      currentLesson: "State Machines & Client Cache Patterns",
      currentLessonId: "l6",
      status: "In Progress"
    },
    {
      courseId: "cs-103",
      progress: 35,
      lastAccessed: "Yesterday",
      currentLesson: "Figma Variables & Token Architecture",
      currentLessonId: "ui2",
      status: "In Progress"
    },
    {
      courseId: "cs-102",
      progress: 15,
      lastAccessed: "4 days ago",
      currentLesson: "Feature Engineering & Data Cleansing",
      currentLessonId: "ds2",
      status: "In Progress"
    }
  ],
  upcomingClasses: [
    {
      id: "cls-1",
      title: "Live Mentorship: Microservices & Dockerized APIs",
      course: "Full-Stack Web Engineering",
      instructor: "Dr. Marcus Thorne",
      date: "Tomorrow",
      time: "4:00 PM - 5:30 PM EST",
      link: "#",
      type: "Live Workshop"
    },
    {
      id: "cls-2",
      title: "Office Hours: Enterprise Design Token Systems",
      course: "Enterprise UX/UI Architecture",
      instructor: "Sarah Jenkins",
      date: "Thursday",
      time: "2:00 PM - 3:00 PM EST",
      link: "#",
      type: "Q&A Session"
    },
    {
      id: "cls-3",
      title: "Sprint Review & Code Critique",
      course: "Applied Data Science",
      instructor: "Prof. Eleanor Vance",
      date: "Next Monday",
      time: "5:00 PM - 6:30 PM EST",
      link: "#",
      type: "Review"
    }
  ],
  recentActivity: [
    { id: "act-1", action: "Completed lesson", target: "Advanced React Hooks & Context APIs", timestamp: "3 hours ago", score: "100%" },
    { id: "act-2", action: "Submitted assignment", target: "Architecture Patterns Case Study", timestamp: "Yesterday at 6:45 PM", status: "Under Review" },
    { id: "act-3", action: "Scored 92% in quiz", target: "Module 1 Assessment Quiz", timestamp: "2 days ago", score: "92%" },
    { id: "act-4", action: "Downloaded resource", target: "Production Clean Architecture Checklist.pdf", timestamp: "4 days ago" }
  ]
};

export const initialAssignments = [
  {
    id: "asg-101",
    courseId: "cs-101",
    courseTitle: "Full-Stack Web Engineering with React & Node",
    title: "Portfolio Project Sprint #1: Full-Stack Authentication Microservice",
    dueDate: "October 15, 2026",
    dueStatus: "Due in 3 days",
    status: "Pending Submission",
    maxGrade: 100,
    currentGrade: null,
    description: "Design and implement a standalone Node/Express authentication microservice featuring JWT refresh token rotation, bcrypt password hashing, and rate limiting with Redis.",
    rubric: [
      "Secure token generation & verification (30 pts)",
      "Database schema & password hashing (25 pts)",
      "Error handling middleware & status codes (25 pts)",
      "Clean architectural documentation & tests (20 pts)"
    ]
  },
  {
    id: "asg-102",
    courseId: "cs-103",
    courseTitle: "Enterprise UX/UI Architecture & Design Systems",
    title: "Design System Tokenization & Accessibility Audit",
    dueDate: "October 02, 2026",
    dueStatus: "Submitted",
    status: "Graded",
    maxGrade: 100,
    currentGrade: 96,
    feedback: "Exceptional rigor in the semantic contrast ratios and WCAG AA compliance. Excellent documentation on spacing tokens.",
    description: "Audit an existing dashboard screen for accessibility compliance and create an extensible Figma token library with light/dark theme variables.",
    submissionDate: "September 28, 2026"
  },
  {
    id: "asg-103",
    courseId: "cs-102",
    courseTitle: "Applied Data Science & Machine Learning Systems",
    title: "Exploratory Data Analysis on Customer Churn Cohorts",
    dueDate: "October 22, 2026",
    dueStatus: "Upcoming",
    status: "In Progress",
    maxGrade: 100,
    currentGrade: null,
    description: "Clean the provided raw dataset (100k records), handle null values, execute Pearson correlation matrices, and visualize key predictors of churn.",
    rubric: [
      "Data wrangling & pipeline purity (35 pts)",
      "Statistical inference & charts (35 pts)",
      "Executive summary & actionable insights (30 pts)"
    ]
  }
];

export const initialQuizzes = {
  "l4": {
    id: "quiz-l4",
    title: "Module 1 Architecture & Clean Design Assessment",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Which layer in Clean Architecture contains enterprise-wide business rules and has NO dependencies on outer layers?",
        options: [
          "Frameworks & Drivers",
          "Interface Adapters / Controllers",
          "Entities / Domain Models",
          "Use Cases / Application Services"
        ],
        correct: 2,
        explanation: "Entities encapsulate the most general and high-level enterprise business rules. They know nothing about UI, database, or frameworks."
      },
      {
        id: 2,
        question: "In asynchronous JavaScript, what is the primary purpose of the microtask queue over the macrotask queue?",
        options: [
          "Handling browser rendering and layout calculations",
          "Executing resolved Promise callbacks before the next event loop tick",
          "Buffering DOM mouse click events",
          "Managing setTimeout and setInterval delays"
        ],
        correct: 1,
        explanation: "Promise reactions and queueMicrotask callbacks are resolved at the end of the current task before yielding to macrotasks."
      },
      {
        id: 3,
        question: "Why should refresh tokens be stored in httpOnly, secure cookies rather than browser localStorage?",
        options: [
          "localStorage cannot store strings longer than 128 characters",
          "httpOnly cookies cannot be read by malicious JavaScript, preventing XSS token theft",
          "Cookies automatically encrypt all payload data via TLS 1.3",
          "localStorage incurs higher CPU rendering cost"
        ],
        correct: 1,
        explanation: "httpOnly cookies mitigate the risk of Cross-Site Scripting (XSS) attacks by keeping authentication tokens inaccessible to client-side scripts."
      }
    ]
  }
};

export const initialCertificates = [
  {
    id: "NEX-9824-CS",
    courseTitle: "Modern Frontend Engineering & Design Systems",
    studentName: "Student Scholar",
    issuedDate: "August 18, 2026",
    grade: "Grade: A+ (Honors)",
    hours: "64 Academic Hours",
    instructor: "Sarah Jenkins & Dr. Marcus Thorne",
    verificationUrl: "https://verify.nexuslms.edu/cert/NEX-9824-CS",
    badge: "Verified Credential",
    description: "Has demonstrated comprehensive mastery in modular frontend architecture, component libraries, state management, and accessible user experiences."
  },
  {
    id: "NEX-7150-FS",
    courseTitle: "Relational Database Design & Scalable SQL",
    studentName: "Student Scholar",
    issuedDate: "May 10, 2026",
    grade: "Grade: A",
    hours: "48 Academic Hours",
    instructor: "David Chen",
    verificationUrl: "https://verify.nexuslms.edu/cert/NEX-7150-FS",
    badge: "Verified Credential",
    description: "Successfully designed multi-tenant relational schemas, query query optimization, indexing strategies, and ACID transaction isolation."
  }
];

export const initialInstructors = [
  {
    id: "inst-1",
    name: "Dr. Marcus Thorne",
    title: "Principal Engineer & Former MIT Fellow",
    department: "Software Engineering & Systems",
    email: "marcus.thorne@nexuslms.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 4.95,
    studentsTaught: 4820,
    coursesCount: 4,
    status: "Active",
    bio: "Marcus has spent 15 years designing distributed architectures and mentoring senior engineers across Silicon Valley."
  },
  {
    id: "inst-2",
    name: "Prof. Eleanor Vance",
    title: "Lead AI Researcher & Data Architect",
    department: "Data Science & Artificial Intelligence",
    email: "eleanor.vance@nexuslms.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 4.88,
    studentsTaught: 3120,
    coursesCount: 3,
    status: "Active",
    bio: "Author of 'Deep Statistical Foundations' and technical advisor to cutting-edge machine learning institutions."
  },
  {
    id: "inst-3",
    name: "Sarah Jenkins",
    title: "Staff Product Designer, Ex-Figma",
    department: "Human-Computer Interaction & Design",
    email: "sarah.jenkins@nexuslms.edu",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 4.92,
    studentsTaught: 2750,
    coursesCount: 2,
    status: "Active",
    bio: "Pioneered component design tokens and enterprise UI toolkits adopted by Fortune 500 digital product teams."
  },
  {
    id: "inst-4",
    name: "David Chen",
    title: "Infrastructure Director & Cloud Architect",
    department: "Cloud Computing & DevOps",
    email: "david.chen@nexuslms.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 4.82,
    studentsTaught: 1940,
    coursesCount: 2,
    status: "Active",
    bio: "Specialist in zero-downtime deployments, Kubernetes clusters, and cloud-native security controls."
  }
];

export const initialStudentsList = [
  { id: "std-101", name: "Alex Morgan", email: "alex.m@nexuslms.edu", enrolledCourses: 3, progress: 68, status: "Active", joinDate: "Oct 2024" },
  { id: "std-102", name: "Maya Chen", email: "maya.c@nexuslms.edu", enrolledCourses: 2, progress: 84, status: "Active", joinDate: "Nov 2024" },
  { id: "std-103", name: "Julian Sterling", email: "j.sterling@nexuslms.edu", enrolledCourses: 4, progress: 42, status: "Active", joinDate: "Jan 2025" },
  { id: "std-104", name: "Clara Beauchamp", email: "clara.b@nexuslms.edu", enrolledCourses: 1, progress: 95, status: "Active", joinDate: "Sep 2024" },
  { id: "std-105", name: "Kavya Patel", email: "kavya.patel@nexuslms.edu", enrolledCourses: 3, progress: 55, status: "Active", joinDate: "Dec 2024" },
  { id: "std-106", name: "Tariq Al-Mansoor", email: "tariq.m@nexuslms.edu", enrolledCourses: 2, progress: 30, status: "On Leave", joinDate: "Feb 2025" },
  { id: "std-107", name: "Hannah Lindqvist", email: "hannah.l@nexuslms.edu", enrolledCourses: 3, progress: 76, status: "Active", joinDate: "Jan 2025" },
  { id: "std-108", name: "Lucas Vance", email: "lucas.v@nexuslms.edu", enrolledCourses: 2, progress: 90, status: "Active", joinDate: "Aug 2024" }
];

export const initialGallery = [
  {
    id: "gal-1",
    title: "Advanced Software Architecture Capstone Presentations",
    category: "Campus Life",
    date: "September 2026",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    description: "Students demonstrating distributed microservice prototypes before tech leaders and alumni venture founders."
  },
  {
    id: "gal-2",
    title: "Annual 48-Hour Open Source Hackathon",
    category: "Hackathons",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    description: "Over 200 participants collaborated around the clock on real-world accessibility and open education tools."
  },
  {
    id: "gal-3",
    title: "UI/UX Design Studio Critiques & Usability Lab",
    category: "Workshops",
    date: "July 2026",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    description: "Live eye-tracking sessions and interactive design critiques hosted by visiting design directors."
  },
  {
    id: "gal-4",
    title: "Commencement & Honors Credential Ceremony",
    category: "Graduation",
    date: "June 2026",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    description: "Celebrating our 2026 graduating cohort stepping into senior engineering and leadership opportunities worldwide."
  },
  {
    id: "gal-5",
    title: "Cloud Infrastructure Lab & Hardware Benchmarking",
    category: "Campus Life",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    description: "Hands-on cluster networking, bare-metal server configuration, and high-throughput benchmarking."
  },
  {
    id: "gal-6",
    title: "AI Ethics & Generative Systems Seminar",
    category: "Masterclasses",
    date: "April 2026",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    description: "An in-depth panel on the responsible governance of synthetic media and ethical neural architectures."
  }
];

export const initialPlacements = {
  stats: {
    placementRate: "95.4%",
    averagePackage: "$114,000",
    highestPackage: "$185,000",
    hiringPartnersCount: "140+",
    placedStudentsCount: "1,850+"
  },
  partners: [
    { name: "Google", role: "Software Engineer", logoText: "Google" },
    { name: "Microsoft", role: "Cloud Solution Architect", logoText: "Microsoft" },
    { name: "Adobe", role: "UX Systems Designer", logoText: "Adobe" },
    { name: "Amazon AWS", role: "DevOps Specialist", logoText: "AWS" },
    { name: "Stripe", role: "Full-Stack Engineer", logoText: "Stripe" },
    { name: "Spotify", role: "Data Platform Engineer", logoText: "Spotify" },
    { name: "Datadog", role: "Site Reliability Engineer", logoText: "Datadog" },
    { name: "Airbnb", role: "Product Designer", logoText: "Airbnb" }
  ],
  stories: [
    {
      id: "plc-1",
      name: "Rohan Varma",
      course: "Full-Stack Web Engineering",
      company: "Stripe",
      role: "Software Development Engineer II",
      package: "$142,000 / yr",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      quote: "The rigorous code critiques and architecture projects at Nexus LMS transformed how I approach systems design. I cleared Stripe's interviews with absolute confidence."
    },
    {
      id: "plc-2",
      name: "Claire Zhang",
      course: "Enterprise UX/UI Architecture",
      company: "Adobe",
      role: "Design Systems Specialist",
      package: "$128,000 / yr",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      quote: "Nexus doesn't just teach software tools; they teach you how to build tokenized architectures that scale to millions of users."
    },
    {
      id: "plc-3",
      name: "Mateo Alvarez",
      course: "Cloud Infrastructure & Kubernetes",
      company: "Datadog",
      role: "Infrastructure Platform Engineer",
      package: "$150,000 / yr",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      quote: "Within three weeks of graduating, I had 3 competitive offers. The placement team gave personalized resume and technical screening coaching."
    }
  ]
};

export const initialMessages = [
  {
    id: "msg-thread-1",
    sender: "Dr. Marcus Thorne",
    role: "Lead Instructor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    unread: false,
    lastTime: "11:20 AM",
    messages: [
      { id: "m1", senderId: "inst-1", text: "Hi there! I reviewed your database indexing diagram in Sprint #1. Excellent approach using compound B-Tree indexes on tenantId.", time: "10:45 AM" },
      { id: "m2", senderId: "std-9021", text: "Thank you Dr. Thorne! Should I also consider partitioning the logs table by quarterly date range?", time: "11:02 AM" },
      { id: "m3", senderId: "inst-1", text: "Definitely. Quarterly range partitioning will keep vacuuming overhead low once you cross 10 million rows.", time: "11:20 AM" }
    ]
  },
  {
    id: "msg-thread-2",
    sender: "Sarah Jenkins",
    role: "Design Mentor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    unread: true,
    lastTime: "Yesterday",
    messages: [
      { id: "m4", senderId: "inst-3", text: "Hey, don't forget tomorrow's Office Hours at 2 PM. We'll be doing a teardown of typography contrast scales.", time: "Yesterday" }
    ]
  },
  {
    id: "msg-thread-3",
    sender: "Nexus Academic Support",
    role: "Advisor",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    unread: false,
    lastTime: "3 days ago",
    messages: [
      { id: "m5", senderId: "support", text: "Your enrollment confirmation for the upcoming Cloud Infrastructure capstone has been finalized. Let us know if you need any lab adjustments!", time: "3 days ago" }
    ]
  }
];

export const initialAdminData = {
  metrics: {
    totalStudents: 2845,
    activeCourses: 32,
    totalCourses: 48,
    grossRevenue: 148250,
    completionRate: "88.4%",
    avgStudentSatisfaction: 4.91
  },
  revenueMonthly: [
    { month: "Jan", revenue: 14200 },
    { month: "Feb", revenue: 16800 },
    { month: "Mar", revenue: 18900 },
    { month: "Apr", revenue: 21500 },
    { month: "May", revenue: 24200 },
    { month: "Jun", revenue: 26800 },
    { month: "Jul", revenue: 25900 }
  ],
  courseAnalytics: [
    { courseTitle: "Full-Stack Web Engineering", enrollments: 1420, completion: 82, rating: 4.9 },
    { courseTitle: "Applied Data Science & ML", enrollments: 980, completion: 74, rating: 4.85 },
    { courseTitle: "Enterprise UX/UI Architecture", enrollments: 1650, completion: 91, rating: 4.92 },
    { courseTitle: "Cloud & Kubernetes DevOps", enrollments: 840, completion: 69, rating: 4.79 },
    { courseTitle: "Strategic Product Management", enrollments: 1120, completion: 86, rating: 4.88 }
  ],
  transactions: [
    { id: "TXN-88219", student: "Alex Morgan", course: "Full-Stack Web Engineering", amount: 499, date: "Sep 28, 2026", status: "Completed", method: "Mastercard •••• 4242" },
    { id: "TXN-88218", student: "Clara Beauchamp", course: "Enterprise UX/UI", amount: 399, date: "Sep 27, 2026", status: "Completed", method: "Visa •••• 1098" },
    { id: "TXN-88217", student: "Julian Sterling", course: "Applied Data Science", amount: 549, date: "Sep 26, 2026", status: "Completed", method: "PayPal" },
    { id: "TXN-88216", student: "Hannah Lindqvist", course: "Full-Stack Web Engineering", amount: 499, date: "Sep 25, 2026", status: "Completed", method: "Apple Pay" },
    { id: "TXN-88215", student: "Lucas Vance", course: "Cloud DevOps", amount: 479, date: "Sep 24, 2026", status: "Completed", method: "Visa •••• 8821" }
  ],
  certificateTemplates: [
    { id: "tpl-1", name: "Professional Distinction Diploma", orientation: "Landscape", borderStyle: "Academic Gold Double-Border", font: "Playfair Display & Inter", activeUsage: 14 },
    { id: "tpl-2", name: "Executive Engineering Certificate", orientation: "Landscape", borderStyle: "Forest Green Minimalist", font: "Inter Geometric", activeUsage: 9 },
    { id: "tpl-3", name: "Practitioner Foundation Badge", orientation: "Landscape", borderStyle: "Ivory Parchment Classic", font: "Georgia Classic", activeUsage: 6 }
  ],
  categories: [
    { id: "cat-1", name: "Development", count: 18, description: "Full-stack, APIs, distributed systems and frontend" },
    { id: "cat-2", name: "Data Science & AI", count: 12, description: "Machine learning, LLMs, data analytics and visualization" },
    { id: "cat-3", name: "Design & UX", count: 9, description: "Design systems, usability, Figma, accessibility" },
    { id: "cat-4", name: "DevOps & Cloud", count: 7, description: "Kubernetes, CI/CD, AWS, Azure and Terraform" },
    { id: "cat-5", name: "Business & Leadership", count: 6, description: "Product strategy, roadmap delivery, technical management" }
  ],
  notifications: [
    { id: "notif-1", title: "Fall 2026 Capstone Admissions Open", audience: "All Students", date: "Sep 28, 2026", status: "Sent", reads: 1420 },
    { id: "notif-2", title: "Scheduled Platform Maintenance Window", audience: "All Users", date: "Sep 24, 2026", status: "Sent", reads: 2790 },
    { id: "notif-3", title: "New Instructor Onboarding: Sarah Jenkins", audience: "Faculty Only", date: "Sep 18, 2026", status: "Sent", reads: 42 }
  ]
};

export const sampleLessonContent = {
  id: "l6",
  courseId: "cs-101",
  courseTitle: "Full-Stack Web Engineering with React & Node",
  title: "State Machines & Client Cache Patterns",
  module: "Module 2: State Management & Component Design",
  duration: "35:00",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Safe placeholder embed
  notes: `
### Key Principles Covered in this Session:

1. **Finite State Machines (FSM)**:
   - Eliminating impossible UI states (e.g. \`isLoading: true\` and \`isSuccess: true\` simultaneously).
   - Modeling state transitions explicitly via deterministic events (\`FETCH\`, \`RESOLVE\`, \`REJECT\`, \`RETRY\`).

2. **Client Cache Invalidation Strategies**:
   - Cache-First vs. Network-First vs. Stale-While-Revalidate.
   - Cache keys hierarchy and optimistic UI updates with rollback semantics.

3. **Production Implementation Checklist**:
   - Always debounce search inputs (minimum 250ms).
   - Use AbortController signals to cancel in-flight queries on unmount.
   - Structure cache stores around normalized entity tables.
  `,
  resources: [
    { name: "Finite-State-Machine-CheatSheet.pdf", size: "1.4 MB", type: "PDF Document" },
    { name: "Client-Cache-Implementation-Code.zip", size: "3.8 MB", type: "Source Code Archive" },
    { name: "Production-Architecture-Diagram.svg", size: "520 KB", type: "Vector Diagram" }
  ],
  discussion: [
    {
      id: "disc-1",
      author: "Student",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      date: "3 hours ago",
      text: "When performing optimistic mutations on a nested comments thread, what is the best practice for temporary UUID collision handling?",
      replies: [
        {
          id: "disc-r1",
          author: "Dr. Marcus Thorne",
          badge: "Instructor",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          date: "1 hour ago",
          text: "Prefix temporary IDs with 'temp_' and swap them out transparently upon server acknowledgment response."
        }
      ]
    },
    {
      id: "disc-2",
      author: "Hannah Lindqvist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      date: "Yesterday",
      text: "The explanation of Stale-While-Revalidate with conditional ETags clarified so many caching bugs I was having at work!",
      replies: []
    }
  ]
};
