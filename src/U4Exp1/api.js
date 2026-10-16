import axios from "axios";

// Base Job Database
export const INITIAL_JOBS = [
  {
    id: "JOB-101",
    title: "Senior Frontend Engineer",
    company: "Google Cloud",
    location: "Bangalore",
    salary: 2400000,
    salaryFormatted: "₹24 - 32 LPA",
    experience: "3-5 Years",
    type: "Full Time",
    category: "Software Development",
    skills: ["React", "TypeScript", "Redux", "Tailwind CSS", "Next.js"],
    logo: "G",
    description: "Architect and build high-performance cloud management consoles and real-time dashboard interfaces using React and modern frontend tech stack.",
    responsibilities: [
      "Develop ultra-responsive user interfaces for Cloud Console.",
      "Collaborate with UX designers and backend engineering teams.",
      "Optimize bundle size and core web vitals for global low-latency access."
    ],
    postedAt: "2 days ago",
    featured: true
  },
  {
    id: "JOB-102",
    title: "Backend API Developer",
    company: "Microsoft",
    location: "Hyderabad",
    salary: 2000000,
    salaryFormatted: "₹20 - 28 LPA",
    experience: "2-4 Years",
    type: "Full Time",
    category: "Backend Development",
    skills: ["Node.js", "Express", "Microservices", "PostgreSQL", "Docker"],
    logo: "M",
    description: "Design resilient REST and GraphQL APIs for Azure developer tooling, processing millions of events per minute.",
    responsibilities: [
      "Build scalable REST microservices with automated testing.",
      "Manage database migrations and query optimization.",
      "Ensure 99.99% service availability with robust error handling."
    ],
    postedAt: "1 day ago",
    featured: true
  },
  {
    id: "JOB-103",
    title: "Cyber Security Analyst",
    company: "Cisco Systems",
    location: "Bangalore",
    salary: 1800000,
    salaryFormatted: "₹18 - 25 LPA",
    experience: "1-3 Years",
    type: "Full Time",
    category: "Cyber Security",
    skills: ["SIEM", "Network Security", "Threat Modeling", "Wireshark", "SOC"],
    logo: "C",
    description: "Monitor real-time security events, triage threat alerts, and assist incident response for global enterprise clients.",
    responsibilities: [
      "Perform vulnerability assessments and penetration test triage.",
      "Analyze network packet traces to detect intrusion attempts.",
      "Draft comprehensive security incident post-mortem reports."
    ],
    postedAt: "3 days ago",
    featured: false
  },
  {
    id: "JOB-104",
    title: "Full Stack Engineer",
    company: "Flipkart",
    location: "Bangalore",
    salary: 1600000,
    salaryFormatted: "₹16 - 22 LPA",
    experience: "Fresher",
    type: "Full Time",
    category: "Software Development",
    skills: ["React", "Node.js", "MongoDB", "Redis", "Kafka"],
    logo: "F",
    description: "Deliver high-conversion checkout workflows and seller inventory management features for India's leading e-commerce platform.",
    responsibilities: [
      "Write clean, modular code across both client and server repositories.",
      "Integrate unified payments interface (UPI) and banking payment gateways.",
      "Monitor application performance during major shopping events."
    ],
    postedAt: "4 hours ago",
    featured: true
  },
  {
    id: "JOB-105",
    title: "DevOps & Cloud Engineer",
    company: "Amazon Web Services",
    location: "Chennai",
    salary: 2200000,
    salaryFormatted: "₹22 - 30 LPA",
    experience: "3-5 Years",
    type: "Full Time",
    category: "DevOps",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Linux"],
    logo: "A",
    description: "Automate multi-region infrastructure deployments and build rock-solid CI/CD pipelines for cloud-native applications.",
    responsibilities: [
      "Maintain Kubernetes clusters and manage container orchestration.",
      "Implement infrastructure as code (IaC) using Terraform.",
      "Enforce compliance and zero-trust security postures."
    ],
    postedAt: "Just now",
    featured: false
  },
  {
    id: "JOB-106",
    title: "Junior React Developer",
    company: "Zoho Corporation",
    location: "Chennai",
    salary: 800000,
    salaryFormatted: "₹8 - 12 LPA",
    experience: "Fresher",
    type: "Full Time",
    category: "Software Development",
    skills: ["React", "JavaScript", "HTML5", "CSS3", "Git"],
    logo: "Z",
    description: "Join the Zoho Mail & CRM frontend team to craft intuitive user experiences and responsive single-page applications.",
    responsibilities: [
      "Implement interactive React components from Figma wireframes.",
      "Conduct unit testing and cross-browser testing.",
      "Participate in daily agile stand-ups and code reviews."
    ],
    postedAt: "5 days ago",
    featured: false
  },
  {
    id: "JOB-107",
    title: "AI & Machine Learning Engineer",
    company: "TCS Innovation Labs",
    location: "Hyderabad",
    salary: 1500000,
    salaryFormatted: "₹15 - 21 LPA",
    experience: "1-3 Years",
    type: "Full Time",
    category: "Artificial Intelligence",
    skills: ["Python", "PyTorch", "NLP", "FastAPI", "Pandas"],
    logo: "T",
    description: "Build generative AI pipelines and fine-tune large language models for enterprise knowledge extraction.",
    responsibilities: [
      "Fine-tune open-source models using domain-specific datasets.",
      "Deploy inference endpoints with FastAPI and ONNX runtime.",
      "Evaluate model performance and accuracy metrics."
    ],
    postedAt: "1 day ago",
    featured: false
  },
  {
    id: "JOB-108",
    title: "QA Automation Engineer",
    company: "Wipro Digital",
    location: "Mumbai",
    salary: 1100000,
    salaryFormatted: "₹11 - 15 LPA",
    experience: "1-3 Years",
    type: "Full Time",
    category: "Quality Assurance",
    skills: ["Selenium", "Cypress", "JavaScript", "Jest", "Postman"],
    logo: "W",
    description: "Establish automated end-to-end testing frameworks and API test suites to guarantee software quality.",
    responsibilities: [
      "Write automated end-to-end tests using Cypress and Playwright.",
      "Perform regression testing prior to major production releases.",
      "Automate API regression tests via Postman Newman CLI."
    ],
    postedAt: "3 days ago",
    featured: false
  }
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-1",
    keyword: "Frontend Developer",
    location: "Bangalore",
    matchesCount: 14,
    frequency: "Daily Digest",
    active: true,
    created: "2026-10-01"
  },
  {
    id: "ALT-2",
    keyword: "React / TypeScript",
    location: "Chennai",
    matchesCount: 8,
    frequency: "Instant",
    active: true,
    created: "2026-10-08"
  },
  {
    id: "ALT-3",
    keyword: "Cyber Security Analyst",
    location: "Hyderabad",
    matchesCount: 5,
    frequency: "Weekly",
    active: false,
    created: "2026-10-10"
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: "APP-901",
    jobId: "JOB-101",
    jobTitle: "Senior Frontend Engineer",
    company: "Google Cloud",
    appliedDate: "2026-10-12",
    status: "Under Review",
    stage: "Technical Screening",
    notes: "Resume shortlisted by hiring committee."
  },
  {
    id: "APP-902",
    jobId: "JOB-104",
    jobTitle: "Full Stack Engineer",
    company: "Flipkart",
    appliedDate: "2026-10-14",
    status: "Interview Scheduled",
    stage: "System Design Round",
    notes: "Meeting on Friday at 3:00 PM IST."
  }
];

// In-memory simulated server state
let jobsDatabase = [...INITIAL_JOBS];
let alertsDatabase = [...INITIAL_ALERTS];
let applicationsDatabase = [...INITIAL_APPLICATIONS];

// Helper to simulate network latency with async/await
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulated failure toggle for testing error states
let forceError = false;
export const setForceApiError = (state) => {
  forceError = state;
};
export const getForceApiError = () => forceError;

/* =========================================================
   REST API CLIENT (Axios-based async/await)
========================================================= */

export const JobPortalAPI = {
  // a & b) Fetch jobs with multi-parameter filtering
  async getJobs(filters = {}) {
    console.log(
      "%c[U4-EXP1: REST API GET /api/jobs]%c Request initiated with filters:",
      "background: #4f46e5; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #4f46e5; font-weight: bold;",
      filters
    );
    await delay(600);
    if (forceError) {
      console.error(
        "%c[U4-EXP1: REST API 500 ERROR]%c Simulated Server Failure",
        "background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
        "color: #ef4444;"
      );
      throw new Error("HTTP 500: Internal Server Error - Simulated API Failure for testing error states.");
    }

    let results = [...jobsDatabase];

    if (filters.title && filters.title.trim()) {
      const q = filters.title.toLowerCase().trim();
      results = results.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filters.company && filters.company.trim()) {
      const c = filters.company.toLowerCase().trim();
      results = results.filter((j) => j.company.toLowerCase().includes(c));
    }

    if (filters.location && filters.location !== "All") {
      results = results.filter(
        (j) => j.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    if (filters.experience && filters.experience !== "All") {
      results = results.filter((j) => j.experience === filters.experience);
    }

    if (filters.minSalary) {
      results = results.filter((j) => j.salary >= Number(filters.minSalary));
    }

    console.log(
      `%c[U4-EXP1: REST API 200 OK]%c Fetched ${results.length} jobs matching criteria:`,
      "background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #10b981; font-weight: bold;",
      results
    );

    return {
      status: 200,
      statusText: "OK",
      data: results,
      total: results.length
    };
  },

  // c) Fetch individual job details dynamically
  async getJobById(jobId) {
    console.log(
      `%c[U4-EXP1: REST API GET /api/jobs/${jobId}]%c Fetching individual job metadata...`,
      "background: #0284c7; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #0284c7;"
    );
    await delay(450);
    if (forceError) {
      throw new Error(`HTTP 503: Service Unavailable - Could not fetch details for job #${jobId}`);
    }

    const job = jobsDatabase.find((j) => j.id === jobId);
    if (!job) {
      throw new Error(`HTTP 404: Job not found with ID ${jobId}`);
    }

    console.log(
      `%c[U4-EXP1: DYNAMIC JOB DETAIL 200 OK]%c Details for ${job.title} at ${job.company}:`,
      "background: #0284c7; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #0284c7;",
      job
    );

    return {
      status: 200,
      data: { ...job }
    };
  },

  // d) Retrieve job alerts using APIs
  async getJobAlerts() {
    console.log(
      "%c[U4-EXP1: REST API GET /api/alerts]%c Fetching active job alert triggers...",
      "background: #8b5cf6; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #8b5cf6;"
    );
    await delay(400);
    if (forceError) {
      throw new Error("HTTP 500: Failed to retrieve active job alerts.");
    }
    console.log(
      "%c[U4-EXP1: REST API ALERTS 200 OK]%c Alerts retrieved:",
      "background: #8b5cf6; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #8b5cf6;",
      alertsDatabase
    );
    return {
      status: 200,
      data: [...alertsDatabase]
    };
  },

  // d) Retrieve application information using APIs
  async getApplications() {
    console.log(
      "%c[U4-EXP1: REST API GET /api/applications]%c Fetching applicant history...",
      "background: #ec4899; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #ec4899;"
    );
    await delay(500);
    if (forceError) {
      throw new Error("HTTP 500: Failed to fetch applicant history.");
    }
    console.log(
      "%c[U4-EXP1: REST API APPLICATIONS 200 OK]%c Applications retrieved:",
      "background: #ec4899; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #ec4899;",
      applicationsDatabase
    );
    return {
      status: 200,
      data: [...applicationsDatabase]
    };
  }
};
