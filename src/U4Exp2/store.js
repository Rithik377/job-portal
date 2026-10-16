import { create } from "zustand";

// Initial Seed Data
const DEFAULT_JOBS = [
  {
    id: "JOB-201",
    title: "Senior React Architect",
    company: "Meta",
    location: "Bangalore",
    salary: "₹35 - 45 LPA",
    experience: "5+ Years",
    skills: ["React", "Architecture", "Redux", "Zustand", "Performance"],
    type: "Full Time",
    description: "Design state management frameworks and enterprise UI components for global social platforms."
  },
  {
    id: "JOB-202",
    title: "Cloud Solutions Engineer",
    company: "Amazon Web Services",
    location: "Hyderabad",
    salary: "₹24 - 32 LPA",
    experience: "3-5 Years",
    skills: ["AWS", "Docker", "Kubernetes", "Node.js", "Serverless"],
    type: "Full Time",
    description: "Deploy scalable cloud architectures and consult with Fortune 500 engineering leaders."
  },
  {
    id: "JOB-203",
    title: "Frontend State Specialist",
    company: "Netflix",
    location: "Bangalore",
    salary: "₹30 - 40 LPA",
    experience: "3-5 Years",
    skills: ["React 19", "Zustand", "TypeScript", "WebSockets"],
    type: "Full Time",
    description: "Build ultra-low latency streaming client experiences with sophisticated client-side caching."
  },
  {
    id: "JOB-204",
    title: "Cyber Security Threat Responder",
    company: "Palo Alto Networks",
    location: "Chennai",
    salary: "₹20 - 28 LPA",
    experience: "2-4 Years",
    skills: ["Network Security", "Firewalls", "Python", "Incident Response"],
    type: "Full Time",
    description: "Defend against advanced persistent threats (APTs) and automate SOC operations."
  },
  {
    id: "JOB-205",
    title: "Junior Full Stack Developer",
    company: "Freshworks",
    location: "Chennai",
    salary: "₹9 - 14 LPA",
    experience: "Fresher",
    skills: ["JavaScript", "React", "Ruby on Rails", "REST API"],
    type: "Full Time",
    description: "Join customer engagement software teams to build responsive web portals."
  }
];

// e) CUSTOM MIDDLEWARE TO MONITOR APPLICATION ACTIONS
const actionLoggerMiddleware = (config) => (set, get, api) => {
  return config(
    (actionName, payload, nextStateOrFn) => {
      const prevState = get();
      // Apply the state mutation
      set(nextStateOrFn);

      // Log to live middleware action monitor (Sub-clause e)
      const logEntry = {
        id: "ACT-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
        action: actionName || "ANONYMOUS_ACTION",
        payload: payload || null,
        timestamp: new Date().toLocaleTimeString(),
        diffSummary: `Affected keys: ${Object.keys(
          typeof nextStateOrFn === "function" ? nextStateOrFn(prevState) : nextStateOrFn
        ).join(", ")}`
      };

      console.groupCollapsed(
        `%c[U4-EXP2: ZUSTAND ACTION] %c${actionName}`,
        "background: #7c3aed; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
        "color: #7c3aed; font-weight: bold;"
      );
      console.log("%cPrevious State:", "color: #64748b; font-weight: bold;", prevState);
      console.log("%cAction Payload:", "color: #0284c7; font-weight: bold;", payload);
      console.log("%cNext State:", "color: #10b981; font-weight: bold;", nextStateOrFn);
      console.groupEnd();

      // Keep up to 25 latest logs
      set((state) => ({
        actionLogs: [logEntry, ...(state.actionLogs || []).slice(0, 24)]
      }));
    },
    get,
    api
  );
};

// a & d) Create Global Store with Zustand
export const useJobPortalStore = create(
  actionLoggerMiddleware((setWithAction, get) => ({
    // b) Store State
    jobs: DEFAULT_JOBS,
    savedJobIds: ["JOB-201"], // initial saved job
    applications: [
      {
        id: "APP-501",
        jobId: "JOB-201",
        jobTitle: "Senior React Architect",
        company: "Meta",
        appliedAt: "2026-10-14 10:30 AM",
        status: "Applied",
        candidateNotes: "Submitted portfolio with Zustand state pattern"
      }
    ],
    alerts: [
      {
        id: "ALT-301",
        keyword: "React",
        location: "Bangalore",
        createdAt: "2026-10-12"
      }
    ],
    profile: {
      name: "Alex Morgan",
      email: "alex.morgan@developer.io",
      phone: "+91 98765 43210",
      headline: "Senior Frontend Engineer & State Management Specialist",
      experienceLevel: "3-5 Years",
      skills: ["React 19", "Zustand", "Redux", "TypeScript", "REST APIs"]
    },
    // f) Caching store for search queries
    cache: {}, // queryKey -> { data: [], timestamp: number, hits: number }
    lastQueryMetrics: { source: "Initial", responseTime: "0ms" },
    actionLogs: [
      {
        id: "INIT",
        action: "STORE_INITIALIZED",
        payload: { initialJobsCount: DEFAULT_JOBS.length },
        timestamp: new Date().toLocaleTimeString(),
        diffSummary: "Root store initialized with default jobs, profile, and alerts"
      }
    ],

    // c) Operations: Save & Remove Saved Jobs
    saveJob: (jobId) => {
      const state = get();
      if (!state.savedJobIds.includes(jobId)) {
        setWithAction(
          "SAVE_JOB",
          { jobId },
          (prev) => ({ savedJobIds: [...prev.savedJobIds, jobId] })
        );
      }
    },

    removeSavedJob: (jobId) => {
      setWithAction(
        "REMOVE_SAVED_JOB",
        { jobId },
        (prev) => ({ savedJobIds: prev.savedJobIds.filter((id) => id !== jobId) })
      );
    },

    // c) Operations: Apply & Withdraw
    applyJob: (jobId, candidateNotes = "") => {
      const state = get();
      const existing = state.applications.find((a) => a.jobId === jobId);
      if (existing) return;

      const job = state.jobs.find((j) => j.id === jobId);
      const newApp = {
        id: "APP-" + Date.now(),
        jobId,
        jobTitle: job ? job.title : "Unknown Job",
        company: job ? job.company : "Unknown Company",
        appliedAt: new Date().toLocaleString(),
        status: "Applied",
        candidateNotes: candidateNotes || "Applied via 1-Click State Store"
      };

      setWithAction(
        "APPLY_JOB",
        { newApp },
        (prev) => ({ applications: [newApp, ...prev.applications] })
      );
    },

    withdrawApplication: (appId) => {
      setWithAction(
        "WITHDRAW_APPLICATION",
        { applicationId: appId },
        (prev) => ({ applications: prev.applications.filter((a) => a.id !== appId) })
      );
    },

    // c) Operations: Alert Operations
    addAlert: (keyword, location) => {
      const newAlert = {
        id: "ALT-" + Date.now(),
        keyword: keyword.trim(),
        location: location.trim(),
        createdAt: new Date().toISOString().slice(0, 10)
      };

      setWithAction(
        "ADD_JOB_ALERT",
        { newAlert },
        (prev) => ({ alerts: [newAlert, ...prev.alerts] })
      );
    },

    removeAlert: (alertId) => {
      setWithAction(
        "REMOVE_JOB_ALERT",
        { alertId },
        (prev) => ({ alerts: prev.alerts.filter((a) => a.id !== alertId) })
      );
    },

    // b & c) Operations: Profile Information
    updateProfile: (updatedData) => {
      setWithAction(
        "UPDATE_PROFILE",
        { updatedData },
        (prev) => ({ profile: { ...prev.profile, ...updatedData } })
      );
    },

    // f) Cached Job Search Operation (TTL = 45 seconds)
    searchJobsWithCache: (query = "", location = "All") => {
      const startTime = performance.now();
      const normalizedKey = `${query.toLowerCase().trim()}|${location.toLowerCase().trim()}`;
      const state = get();
      const now = Date.now();
      const CACHE_TTL_MS = 45000; // 45 seconds TTL

      const cachedEntry = state.cache[normalizedKey];

      // Check if cache entry is valid and not expired
      if (cachedEntry && now - cachedEntry.timestamp < CACHE_TTL_MS) {
        // Cache HIT
        const updatedCache = {
          ...state.cache,
          [normalizedKey]: {
            ...cachedEntry,
            hits: cachedEntry.hits + 1
          }
        };

        const elapsed = (performance.now() - startTime).toFixed(2) + "ms";

        console.log(
          `%c[U4-EXP2: ⚡ CACHE HIT]%c Key: "${normalizedKey}" (Hits: ${cachedEntry.hits + 1}, Response time: ${elapsed})`,
          "background: #166534; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
          "color: #166534; font-weight: bold;",
          cachedEntry.data
        );

        setWithAction(
          "CACHE_HIT_SEARCH",
          { key: normalizedKey, hits: cachedEntry.hits + 1 },
          () => ({
            cache: updatedCache,
            lastQueryMetrics: { source: "CACHE HIT (Memory)", responseTime: elapsed }
          })
        );

        return cachedEntry.data;
      }

      // Cache MISS: Compute filtered results
      let results = [...state.jobs];
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        results = results.filter(
          (j) =>
            j.title.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q) ||
            j.skills.some((s) => s.toLowerCase().includes(q))
        );
      }

      if (location !== "All") {
        results = results.filter(
          (j) => j.location.toLowerCase() === location.toLowerCase()
        );
      }

      const elapsed = (performance.now() - startTime).toFixed(2) + "ms";

      console.log(
        `%c[U4-EXP2: 🌐 CACHE MISS]%c Evaluated & Caching Key: "${normalizedKey}" (${results.length} results, TTL: 45s)`,
        "background: #b45309; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
        "color: #b45309; font-weight: bold;",
        results
      );

      // Store in cache
      const newCache = {
        ...state.cache,
        [normalizedKey]: {
          data: results,
          timestamp: now,
          hits: 1
        }
      };

      setWithAction(
        "CACHE_MISS_SEARCH_SAVED",
        { key: normalizedKey, count: results.length },
        () => ({
          cache: newCache,
          lastQueryMetrics: { source: "CACHE MISS (Evaluated & Stored)", responseTime: elapsed }
        })
      );

      return results;
    },

    clearCache: () => {
      setWithAction(
        "CLEAR_CACHE",
        {},
        () => ({ cache: {}, lastQueryMetrics: { source: "Cache Cleared", responseTime: "0ms" } })
      );
    },

    clearActionLogs: () => {
      setWithAction(
        "CLEAR_ACTION_LOGS",
        {},
        () => ({ actionLogs: [] })
      );
    }
  }))
);
