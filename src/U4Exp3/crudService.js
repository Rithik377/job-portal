// Simulated REST CRUD Server Database for U4Exp3

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

let simulateFailure = false;
export const setCrudFailure = (val) => {
  simulateFailure = val;
};
export const getCrudFailure = () => simulateFailure;

// In-Memory Database for CRUD
let dbJobs = [
  {
    id: "JOB-301",
    title: "Senior Full Stack Architect",
    company: "Amazon Web Services",
    location: "Bangalore",
    salary: "₹28 - 36 LPA",
    type: "Full Time",
    category: "Software",
    openings: 3,
    description: "Architect cloud-native web portals handling 10M+ daily active sessions with sub-100ms response times."
  },
  {
    id: "JOB-302",
    title: "Cyber Security Operations Lead",
    company: "CrowdStrike",
    location: "Hyderabad",
    salary: "₹24 - 32 LPA",
    type: "Full Time",
    category: "Security",
    openings: 2,
    description: "Lead SOC threat hunting and build autonomous endpoint detection workflows."
  },
  {
    id: "JOB-303",
    title: "React Frontend Engineer",
    company: "Atlassian",
    location: "Bangalore",
    salary: "₹22 - 30 LPA",
    type: "Full Time",
    category: "Software",
    openings: 4,
    description: "Build delightful collaboration experiences within Jira and Confluence using modern React."
  },
  {
    id: "JOB-304",
    title: "Cloud DevOps Specialist",
    company: "Cisco Systems",
    location: "Chennai",
    salary: "₹18 - 25 LPA",
    type: "Full Time",
    category: "DevOps",
    openings: 2,
    description: "Automate Terraform CI/CD pipelines across hybrid multi-cloud data centers."
  }
];

let dbSavedJobs = ["JOB-301", "JOB-303"];

let dbApplications = [
  {
    id: "APP-7001",
    jobId: "JOB-301",
    jobTitle: "Senior Full Stack Architect",
    company: "Amazon Web Services",
    applicantName: "Jordan Reed",
    email: "jordan.reed@cloudtech.com",
    phone: "+91 91234 56789",
    experience: "4 Years",
    resumeName: "Jordan_Reed_Resume_2026.pdf",
    portfolioUrl: "https://github.com/jordan-cloud",
    status: "Under Review",
    appliedDate: "2026-10-10",
    candidateNotes: "Highlighted experience with high-load AWS deployments."
  }
];

let dbProfile = {
  name: "Jordan Reed",
  email: "jordan.reed@cloudtech.com",
  phone: "+91 91234 56789",
  location: "Bangalore, India",
  headline: "Senior Cloud & Full Stack Engineer | React & AWS Specialist",
  skills: "React, Node.js, AWS, Kubernetes, REST APIs, Microservices",
  bio: "Passionate engineer with 4+ years creating enterprise web applications and scalable cloud backends."
};

export const CrudAPI = {
  // a) Retrieve jobs using GET
  async getJobs(query = "") {
    console.log(
      `%c[U4-EXP3: HTTP GET /api/jobs]%c Query: "${query}"`,
      "background: #166534; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #166534; font-weight: bold;"
    );
    await delay(500);
    if (simulateFailure) {
      console.error(
        "%c[U4-EXP3: HTTP GET ERROR]%c Simulated 500 Failure",
        "background: #dc2626; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
        "color: #dc2626;"
      );
      throw new Error("GET /api/jobs failed: Simulated 500 Internal Server Error");
    }

    if (!query.trim()) {
      console.log("%c[U4-EXP3: HTTP GET 200 OK]%c All Jobs:", "color: #166534; font-weight: bold;", "", dbJobs);
      return [...dbJobs];
    }
    const q = query.toLowerCase().trim();
    const filtered = dbJobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
    );
    console.log("%c[U4-EXP3: HTTP GET 200 OK]%c Filtered Jobs:", "color: #166534; font-weight: bold;", "", filtered);
    return filtered;
  },

  // e) Retrieve saved jobs using GET
  async getSavedJobs() {
    console.log(
      "%c[U4-EXP3: HTTP GET /api/saved-jobs]%c Retrieving bookmarked jobs...",
      "background: #166534; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #166534; font-weight: bold;"
    );
    await delay(400);
    if (simulateFailure) throw new Error("GET /api/saved-jobs failed: Could not load bookmarked jobs");
    const saved = dbJobs.filter((j) => dbSavedJobs.includes(j.id));
    console.log("%c[U4-EXP3: HTTP GET 200 OK]%c Saved Jobs Data:", "color: #166534; font-weight: bold;", "", saved);
    return saved;
  },

  async toggleSaveJob(jobId) {
    await delay(300);
    if (simulateFailure) throw new Error("Operation failed: Could not modify saved jobs list");
    if (dbSavedJobs.includes(jobId)) {
      dbSavedJobs = dbSavedJobs.filter((id) => id !== jobId);
      console.log(`%c[U4-EXP3: HTTP DELETE /api/saved-jobs/${jobId}]%c Unsaved job`, "background: #dc2626; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;", "");
      return { saved: false, jobId };
    } else {
      dbSavedJobs.push(jobId);
      console.log(`%c[U4-EXP3: HTTP POST /api/saved-jobs]%c Saved job #${jobId}`, "background: #2563eb; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;", "");
      return { saved: true, jobId };
    }
  },

  // e) Retrieve application history using GET
  async getApplications() {
    console.log(
      "%c[U4-EXP3: HTTP GET /api/applications]%c Fetching submitted applications...",
      "background: #166534; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #166534; font-weight: bold;"
    );
    await delay(450);
    if (simulateFailure) throw new Error("GET /api/applications failed: Network request timed out");
    console.log("%c[U4-EXP3: HTTP GET 200 OK]%c Applications retrieved:", "color: #166534; font-weight: bold;", "", dbApplications);
    return [...dbApplications];
  },

  // b) Create a job application using POST
  async createApplication(data) {
    console.group(
      `%c[U4-EXP3: HTTP POST /api/applications]%c Submitting new application for: ${data.jobTitle}`,
      "background: #2563eb; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #2563eb; font-weight: bold;"
    );
    console.log("Payload:", data);
    await delay(600);
    if (simulateFailure) {
      console.error("POST failed: Simulated 500 error");
      console.groupEnd();
      throw new Error("POST /api/applications failed: Server rejected submission");
    }

    const newApp = {
      id: "APP-" + Math.floor(1000 + Math.random() * 9000),
      appliedDate: new Date().toISOString().slice(0, 10),
      status: "Submitted",
      ...data
    };
    dbApplications = [newApp, ...dbApplications];
    console.log("%c[HTTP 201 Created]%c Stored Application Record:", "color: #10b981; font-weight: bold;", "", newApp);
    console.groupEnd();
    return newApp;
  },

  // c) Update application information using PATCH
  async patchApplication(appId, updatePayload) {
    console.group(
      `%c[U4-EXP3: HTTP PATCH /api/applications/${appId}]%c Modifying application notes & status`,
      "background: #b45309; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #b45309; font-weight: bold;"
    );
    console.log("PATCH Delta:", updatePayload);
    await delay(500);
    if (simulateFailure) {
      console.error("PATCH failed: Simulated 500 error");
      console.groupEnd();
      throw new Error(`PATCH /api/applications/${appId} failed: Update rejected`);
    }

    const index = dbApplications.findIndex((a) => a.id === appId);
    if (index === -1) {
      console.groupEnd();
      throw new Error("Application not found");
    }

    dbApplications[index] = {
      ...dbApplications[index],
      ...updatePayload,
      lastUpdated: new Date().toLocaleTimeString()
    };
    console.log("%c[HTTP 200 OK]%c Updated Record:", "color: #10b981; font-weight: bold;", "", dbApplications[index]);
    console.groupEnd();
    return dbApplications[index];
  },

  // d) Withdraw an application using DELETE
  async deleteApplication(appId) {
    console.log(
      `%c[U4-EXP3: HTTP DELETE /api/applications/${appId}]%c Withdrawing application...`,
      "background: #dc2626; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #dc2626; font-weight: bold;"
    );
    await delay(500);
    if (simulateFailure) {
      console.error("DELETE failed: Simulated error");
      throw new Error(`DELETE /api/applications/${appId} failed: Deletion unauthorized`);
    }

    dbApplications = dbApplications.filter((a) => a.id !== appId);
    console.log(`%c[HTTP 204 No Content]%c Application #${appId} deleted successfully.`, "color: #166534; font-weight: bold;", "");
    return { success: true, deletedId: appId };
  },

  // c) Retrieve & Update profile information using GET & PUT
  async getProfile() {
    console.log(
      "%c[U4-EXP3: HTTP GET /api/profile]%c Loading profile entity...",
      "background: #166534; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #166534; font-weight: bold;"
    );
    await delay(400);
    if (simulateFailure) throw new Error("GET /api/profile failed: Failed to fetch profile details");
    console.log("%c[HTTP 200 OK]%c Profile Data:", "color: #166534; font-weight: bold;", "", dbProfile);
    return { ...dbProfile };
  },

  async putProfile(updatedProfile) {
    console.group(
      "%c[U4-EXP3: HTTP PUT /api/profile]%c Idempotent entity replacement",
      "background: #b45309; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #b45309; font-weight: bold;"
    );
    console.log("PUT Replacement Payload:", updatedProfile);
    await delay(600);
    if (simulateFailure) {
      console.error("PUT failed: Simulated error");
      console.groupEnd();
      throw new Error("PUT /api/profile failed: Validation error during update");
    }

    dbProfile = { ...dbProfile, ...updatedProfile };
    console.log("%c[HTTP 200 OK]%c Replaced Profile Entity:", "color: #10b981; font-weight: bold;", "", dbProfile);
    console.groupEnd();
    return { ...dbProfile };
  }
};
