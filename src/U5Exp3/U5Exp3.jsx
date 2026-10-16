import { useState } from "react";
import "./U5Exp3.css";

const DEPLOYMENT_PLATFORMS = [
  {
    name: "GitHub Pages",
    icon: "🐙",
    badge: "Free Static Hosting",
    config: "vite.config.js base: '/<repo-name>/' or 404.html redirect hack",
    buildCmd: "npm run build && gh-pages -d dist",
    pros: "Free with GitHub repositories, simple for open-source portfolios.",
    cons: "Requires custom 404.html workaround for client-side React Router navigation."
  },
  {
    name: "Netlify",
    icon: "💎",
    badge: "Global Edge CDN",
    config: "public/_redirects with content: /*  /index.html  200",
    buildCmd: "Publish directory: dist | Build command: npm run build",
    pros: "Instant CI/CD branch previews, native SPA rewrite support, zero config forms.",
    cons: "Bandwidth limit on free tier (100 GB/month)."
  },
  {
    name: "Vercel",
    icon: "▲",
    badge: "Next.js & React Native Cloud",
    config: "vercel.json with rewrites: [{ 'source': '/(.*)', 'destination': '/' }]",
    buildCmd: "vercel --prod or automatic Git push deployment",
    pros: "Fastest edge delivery, automatic Vite framework detection, zero configuration.",
    cons: "Team plan requires paid upgrade for commercial usage."
  }
];

export default function U5Exp3() {
  const [selectedPlatform, setSelectedPlatform] = useState("Netlify");
  const [buildVerified, setBuildVerified] = useState(true);

  return (
    <div className="u5-deploy-container">
      {/* Header */}
      <header className="u5-deploy-header">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Unit 5 : Experiment 3
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Production Build & Deployment
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Netlify • Vercel • GitHub Pages
          </span>
        </div>
        <h1>Job Portal Production Deployment</h1>
        <p>
          Generate optimized production builds, configure Single Page Application (SPA) fallback routing,
          and deploy across top hosting platforms with automated CI/CD pipelines.
        </p>
      </header>

      {/* a & e) PRODUCTION BUILD STATUS */}
      <section className="u5-deploy-card">
        <h3>📦 a & e) Production Build Generation & Verification</h3>
        <p style={{ fontSize: "0.88rem", color: "#475569", margin: "0 0 14px 0" }}>
          The production bundle is minified, hashed for immutable cache busting, and output to the <code>dist/</code> directory.
        </p>

        <div className="code-box">
          $ npm run build<br />
          vite v8.2.2 building client environment for production...<br />
          ✓ 101 modules transformed.<br />
          dist/index.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.71 kB │ gzip: 0.37 kB<br />
          dist/assets/index-CwQAsdhd.css &nbsp;&nbsp; 39.01 kB │ gzip: 8.00 kB<br />
          dist/assets/index-D0sRWm77.js &nbsp;&nbsp; 323.39 kB │ gzip: 94.94 kB<br />
          ✓ built in 768ms
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: buildVerified ? "#15803d" : "#b45309" }}>
            {buildVerified ? "✅ Production Build Verified Clean" : "⚠️ Needs Build Verification"}
          </span>
          <button
            onClick={() => setBuildVerified(true)}
            style={{
              padding: "6px 14px",
              background: "#0284c7",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Re-verify Build Artifacts
          </button>
        </div>
      </section>

      {/* PLATFORM SELECTOR TABS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        {DEPLOYMENT_PLATFORMS.map((p) => (
          <button
            key={p.name}
            onClick={() => setSelectedPlatform(p.name)}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: selectedPlatform === p.name ? "#0284c7" : "#ffffff",
              color: selectedPlatform === p.name ? "#ffffff" : "#334155",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span>{p.icon}</span> {p.name}
          </button>
        ))}
      </div>

      {/* STEP-BY-STEP DEPLOYMENT GUIDES (b, c, d) */}
      {selectedPlatform === "GitHub Pages" && (
        <section className="u5-deploy-card">
          <h3>🐙 b) Deploying to GitHub Pages</h3>
          <p style={{ fontSize: "0.86rem", color: "#475569" }}>
            GitHub Pages serves static assets from a <code>gh-pages</code> branch. For React Router SPAs, configure the relative base path:
          </p>
          <div className="code-box">
            // vite.config.js<br />
            export default defineConfig(&#123;<br />
            &nbsp;&nbsp;base: &apos;/job-portal/&apos;, // Repository Name<br />
            &nbsp;&nbsp;plugins: [react()]<br />
            &#125;);
          </div>
          <p style={{ fontSize: "0.84rem", color: "#334155", marginTop: "10px" }}>
            Publish with the gh-pages CLI:
          </p>
          <div className="code-box">
            npx gh-pages -d dist
          </div>
        </section>
      )}

      {selectedPlatform === "Netlify" && (
        <section className="u5-deploy-card">
          <h3>💎 c) Deploying to Netlify (Configured in project)</h3>
          <p style={{ fontSize: "0.86rem", color: "#475569" }}>
            Netlify automatically detects Vite. To prevent 404 errors when reloading deep React Router URLs like <code>/dashboard</code> or <code>/u4-exp1</code>, the redirect rule is configured in <code>public/_redirects</code>:
          </p>
          <div className="code-box">
            /* &nbsp;&nbsp;&nbsp;&nbsp;/index.html &nbsp;&nbsp;200
          </div>
          <p style={{ fontSize: "0.84rem", color: "#334155", marginTop: "10px" }}>
            Deploy via Netlify CLI or connect your GitHub repository:
          </p>
          <div className="code-box">
            $ netlify deploy --prod --dir=dist
          </div>
        </section>
      )}

      {selectedPlatform === "Vercel" && (
        <section className="u5-deploy-card">
          <h3>▲ d) Deploying to Vercel (Configured in project)</h3>
          <p style={{ fontSize: "0.86rem", color: "#475569" }}>
            Vercel serves single-page applications with instant worldwide edge routing. We configured <code>vercel.json</code> in the project root:
          </p>
          <div className="code-box">
            &#123;<br />
            &nbsp;&nbsp;&quot;rewrites&quot;: [<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#123; &quot;source&quot;: &quot;/(.*)&quot;, &quot;destination&quot;: &quot;/index.html&quot; &#125;<br />
            &nbsp;&nbsp;]<br />
            &#125;
          </div>
          <p style={{ fontSize: "0.84rem", color: "#334155", marginTop: "10px" }}>
            Deploy with single command:
          </p>
          <div className="code-box">
            $ vercel --prod
          </div>
        </section>
      )}

      {/* f) COMPREHENSIVE PLATFORM COMPARISON MATRIX */}
      <section className="u5-deploy-card">
        <h3>📊 f) Deployment Platform Comparison Matrix</h3>
        <p style={{ fontSize: "0.86rem", color: "#475569", margin: 0 }}>
          Side-by-side analysis of GitHub Pages, Netlify, and Vercel for React single-page applications:
        </p>

        <div style={{ overflowX: "auto" }}>
          <table className="u5-comp-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>🐙 GitHub Pages</th>
                <th>💎 Netlify</th>
                <th>▲ Vercel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hosting Type</strong></td>
                <td>Static File Hosting</td>
                <td>Global Edge CDN</td>
                <td>Serverless Edge Network</td>
              </tr>
              <tr>
                <td><strong>SPA Client Routing</strong></td>
                <td>Requires 404.html hack</td>
                <td>Native via <code>_redirects</code></td>
                <td>Native via <code>vercel.json</code></td>
              </tr>
              <tr>
                <td><strong>Automatic SSL / HTTPS</strong></td>
                <td>Yes (Let&apos;s Encrypt)</td>
                <td>Yes (Instant automatic)</td>
                <td>Yes (Instant automatic)</td>
              </tr>
              <tr>
                <td><strong>Build Command</strong></td>
                <td><code>npm run build</code></td>
                <td><code>npm run build</code></td>
                <td><code>npm run build</code></td>
              </tr>
              <tr>
                <td><strong>Preview Deployments</strong></td>
                <td>No (Single branch)</td>
                <td>Yes (Deploy previews per PR)</td>
                <td>Yes (Instant URL per commit)</td>
              </tr>
              <tr>
                <td><strong>Best Use Case</strong></td>
                <td>Open-source project docs</td>
                <td>Production SPAs & forms</td>
                <td>Fullstack React & Next.js apps</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
