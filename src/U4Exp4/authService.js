// authService.js - Authentication & Token Management Service with Interceptors

const TOKEN_KEY = "jobportal_jwt_token";
const USER_KEY = "jobportal_current_user";

// Helper to simulate JWT tokens
function generateMockJWT(user, expiresInMs = 15 * 60 * 1000) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: "applicant",
      exp: Date.now() + expiresInMs,
      iat: Date.now()
    })
  );
  const signature = btoa("mock_hmac_sha256_sig_" + Date.now());
  return `${header}.${payload}.${signature}`;
}

export function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
  } catch {
    return null;
  }
}

// Token Storage Helpers (Sub-clause b & e)
export const TokenStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getUser() {
    try {
      const u = localStorage.getItem(USER_KEY);
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// Registered default users
const USERS_DB = [
  {
    id: "USR-001",
    name: "Alex Morgan",
    email: "applicant@jobportal.com",
    password: "password123",
    role: "applicant"
  }
];

// Simulated delay
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Interceptor Registry for Logging
let requestLoggerCallback = null;
let sessionExpiredCallback = null;

export const setAuthListeners = ({ onRequest, onSessionExpired }) => {
  requestLoggerCallback = onRequest;
  sessionExpiredCallback = onSessionExpired;
};

/* =========================================================
   PROTECTED API CLIENT WITH INTERCEPTOR LOGIC (c, d, f)
========================================================= */

async function executeProtectedRequest(endpoint, method = "GET", body = null) {
  await delay(450);

  // c) Attach token from storage (Simulating Axios Request Interceptor)
  const token = TokenStorage.getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  console.group(
    `%c[U4-EXP4: AXIOS REQUEST INTERCEPTOR]%c ${method} ${endpoint}`,
    "background: #4f46e5; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
    "color: #4f46e5; font-weight: bold;"
  );
  if (token) {
    console.log("%c✓ Authorization Attached:%c Bearer " + token.slice(0, 30) + "...", "color: #10b981; font-weight: bold;", "color: #334155;");
  } else {
    console.warn("%c✗ No Bearer Token Attached (Unauthenticated request)", "color: #ef4444; font-weight: bold;");
  }
  console.log("Full Request Headers:", headers);
  console.groupEnd();

  if (requestLoggerCallback) {
    requestLoggerCallback({
      timestamp: new Date().toLocaleTimeString(),
      method,
      endpoint,
      tokenAttached: !!token,
      headers
    });
  }

  // f) Verify token validity / expiration (Simulating Server & Response Interceptor)
  if (!token) {
    console.error(
      "%c[U4-EXP4: AXIOS RESPONSE INTERCEPTOR 401 UNAUTHORIZED]%c Rejected: No token provided",
      "background: #dc2626; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #dc2626;"
    );
    const err = { response: { status: 401, data: "HTTP 401: Unauthorized - No Bearer token provided" } };
    if (sessionExpiredCallback) sessionExpiredCallback("No token found. Please log in.");
    throw err;
  }

  const decoded = parseJwt(token);
  if (!decoded || (decoded.exp && Date.now() > decoded.exp)) {
    // Token Expired!
    TokenStorage.clear();
    console.error(
      "%c[U4-EXP4: AXIOS RESPONSE INTERCEPTOR 401 TOKEN EXPIRED]%c Auto-logout triggered & token removed from storage",
      "background: #dc2626; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #dc2626;"
    );
    const err = { response: { status: 401, data: "HTTP 401: Unauthorized - Token expired or invalid" } };
    if (sessionExpiredCallback) sessionExpiredCallback("Your session has expired. You have been logged out.");
    throw err;
  }

  console.log(
    `%c[U4-EXP4: PROTECTED API 200 OK]%c Access granted to ${endpoint} for ${decoded.email}`,
    "background: #059669; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
    "color: #059669;"
  );

  // If token is valid, serve protected resources (Sub-clause d)
  return {
    status: 200,
    data: {
      success: true,
      authenticatedAs: decoded.email,
      endpoint,
      payload: body
    }
  };
}

/* =========================================================
   AUTHENTICATION API (a, b, c, d, e, f)
========================================================= */

export const AuthService = {
  // a) Applicant Login
  async login(email, password) {
    console.group(
      "%c[U4-EXP4: AUTH LOGIN API POST /api/auth/login]%c Authenticating...",
      "background: #1e1b4b; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #4f46e5; font-weight: bold;"
    );
    console.log("Credentials:", { email, password: "●●●●●●●●" });
    await delay(500);
    const user = USERS_DB.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      console.error("Login failed: Invalid credentials");
      console.groupEnd();
      throw new Error("HTTP 401: Invalid email or password credentials.");
    }

    // Generate JWT token (Sub-clause b)
    const token = generateMockJWT(user);
    TokenStorage.setToken(token);
    TokenStorage.setUser({ id: user.id, name: user.name, email: user.email, role: user.role });

    console.log("%c✓ Authenticated User:%c", "color: #10b981; font-weight: bold;", "", user);
    console.log("%c✓ Generated JWT Token:%c " + token, "color: #10b981; font-weight: bold;", "");
    console.log("%c✓ Decoded Token Payload:%c", "color: #10b981; font-weight: bold;", "", parseJwt(token));
    console.groupEnd();

    return { user, token };
  },

  // a) Register
  async register(name, email, password) {
    console.group(
      "%c[U4-EXP4: AUTH REGISTER POST /api/auth/register]%c Creating Account...",
      "background: #1e1b4b; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #4f46e5; font-weight: bold;"
    );
    await delay(500);
    const exists = USERS_DB.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      console.groupEnd();
      throw new Error("HTTP 409: An applicant account with this email already exists.");
    }

    const newUser = {
      id: "USR-" + Math.floor(100 + Math.random() * 900),
      name,
      email,
      password,
      role: "applicant"
    };
    USERS_DB.push(newUser);

    const token = generateMockJWT(newUser);
    TokenStorage.setToken(token);
    TokenStorage.setUser({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role });

    console.log("Account created & JWT issued:", { user: newUser, token });
    console.groupEnd();

    return { user: newUser, token };
  },

  // e) Logout and token removal
  logout() {
    console.log(
      "%c[U4-EXP4: AUTH LOGOUT]%c Token removed from localStorage and user logged out.",
      "background: #dc2626; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #dc2626; font-weight: bold;"
    );
    TokenStorage.clear();
  },

  // Test tool: Simulate token expiration
  corruptOrExpireToken() {
    const expiredToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleHBpcmVkIiwiZXhwIjoxMDAwfQ.invalid_signature";
    console.warn(
      "%c[U4-EXP4: TOKEN EXPIRED / CORRUPTED]%c Expired token written to localStorage. Next request will fail with 401.",
      "background: #b45309; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #b45309; font-weight: bold;"
    );
    TokenStorage.setToken(expiredToken);
  },

  // d) Protected Operations
  async getProtectedProfile() {
    return executeProtectedRequest("/api/protected/profile");
  },

  async submitProtectedApplication(jobId, data) {
    return executeProtectedRequest(`/api/protected/apply/${jobId}`, "POST", data);
  },

  async getProtectedSavedJobs() {
    return executeProtectedRequest("/api/protected/saved-jobs");
  },

  async getProtectedJobAlerts() {
    return executeProtectedRequest("/api/protected/alerts");
  }
};
