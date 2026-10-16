# Job Portal Web Application (Scenario 10)

Comprehensive React web application developed for **Unit 4** and **Unit 5** laboratory experiments.

---

## 🚀 Getting Started in VS Code

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open in your browser:
   **[http://localhost:5173](http://localhost:5173)**

---

## 🔍 DevTools Console Output (Inspect Element)

During evaluation, open **Developer Tools** (`F12` or right-click -> **Inspect** -> **Console**). Every experiment outputs color-coded, structured logs:

* **Unit 4 Exp 1 (REST API):**
  * `[U4-EXP1: REST API GET /api/jobs]` with applied filter parameters
  * `[U4-EXP1: REST API 200 OK]` with fetched job records
  * `[U4-EXP1: DYNAMIC JOB DETAIL 200 OK]` on viewing individual job details
  * `[U4-EXP1: REST API ALERTS 200 OK]` & `[APPLICATIONS 200 OK]`
* **Unit 4 Exp 2 (Zustand & Middleware):**
  * `[U4-EXP2: ZUSTAND ACTION]` displaying action name, payload, previous state, and next state
  * `[U4-EXP2: ⚡ CACHE HIT]` displaying cached key, hit counter, and latency
  * `[U4-EXP2: 🌐 CACHE MISS]` when computing and caching new search queries (45s TTL)
* **Unit 4 Exp 3 (CRUD Operations):**
  * `[U4-EXP3: HTTP GET /api/jobs]` & `[HTTP GET /api/saved-jobs]`
  * `[U4-EXP3: HTTP POST /api/applications]` with application submission payload
  * `[U4-EXP3: HTTP PATCH /api/applications/:id]` with updated notes/status
  * `[U4-EXP3: HTTP DELETE /api/applications/:id]` when withdrawing applications
  * `[U4-EXP3: HTTP PUT /api/profile]` for complete profile replacement
* **Unit 4 Exp 4 (Authentication & Interceptors):**
  * `[U4-EXP4: AUTH LOGIN API POST /api/auth/login]` with credentials & issued JWT token
  * `[U4-EXP4: AXIOS REQUEST INTERCEPTOR]` attaching `Authorization: Bearer <token>`
  * `[U4-EXP4: AXIOS RESPONSE INTERCEPTOR 401]` on expired/corrupted token triggering auto-logout

---

## 📂 Experiment Structure & Routes

| Experiment | Title | Route | File Path |
| :--- | :--- | :--- | :--- |
| **Base App** | Unit 3 Exp 4 Base App | `/` or `/exp4` | `src/U3Exp4/U3Exp4.jsx` |
| **U4 Exp 1** | REST API Integration | `/u4-exp1` | `src/U4Exp1/U4Exp1.jsx` |
| **U4 Exp 2** | State Management & Middleware | `/u4-exp2` | `src/U4Exp2/U4Exp2.jsx` |
| **U4 Exp 3** | Job & Application CRUD | `/u4-exp3` | `src/U4Exp3/U4Exp3.jsx` |
| **U4 Exp 4** | Authentication & Token Management | `/u4-exp4` | `src/U4Exp4/U4Exp4.jsx` |
| **U5 Exp 1** | Component Testing (Jest / RTL) | `/u5-exp1` | `src/U5Exp1/U5Exp1.jsx` |
| **U5 Exp 2** | Optimization, PWA & Accessibility | `/u5-exp2` | `src/U5Exp2/U5Exp2.jsx` |
| **U5 Exp 3** | Deployment (Netlify, Vercel, GitHub Pages) | `/u5-exp3` | `src/U5Exp3/U5Exp3.jsx` |

Direct aliases (`src/UExp1.jsx`, `src/UExp2.jsx`, `src/UExp3.jsx`, `src/UExp4.jsx`) are also available.

---

## 🛠️ Build & Deploy

* Production Build:
  ```bash
  npm run build
  ```
* SPA routing configurations:
  * Netlify: `public/_redirects`
  * Vercel: `vercel.json`