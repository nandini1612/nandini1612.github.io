/* ============================================================================
   content.js  —  THE ONLY FILE YOU NEED TO EDIT
   ----------------------------------------------------------------------------
   Everything on the site is generated from the object below. Change the text,
   links, projects, or skills here and refresh the page — no other file needs
   touching. Keep the quotes and commas intact.

   Quick map:
     meta      → your name, tagline, headline links, availability badge
     socials   → the icon links (GitHub, LinkedIn, Medium, Kaggle, Email)
     about     → the About section paragraphs
     experience→ roles (newest first)
     projects  → featured (with problem/approach/result) + more (compact list)
     skills    → grouped skill chips
     writing   → Medium / blog posts
     beyond    → leadership, community, personal
   ========================================================================== */

const CONTENT = {

  /* -------------------------------------------------------------- META ---- */
  meta: {
    name: "Nandini Saxena",
    // Short role line shown under your name in the hero.
    role: "Machine Learning · Data Science",
    // One or two punchy lines. This is your positioning — keep it tight.
    tagline:
      "I work on machine learning for difficult data: sensor failure, concept drift, and synthetic-data integrity. Former research intern at DRDO.",
    location: "Pune, India",
    email: "nandinisaxenawork@gmail.com",
    // Résumé formats offered in the in-page viewer (first one is the default).
    // Each entry: label (tab text) · url (the PDF that Open/Download point to —
    // a local file OR a Google Drive link) · preview (image page(s) shown inline).
    // Leave url:"" for a format you haven't made yet; the viewer shows a short
    // "not uploaded" note for it, so you can add the PDF later.
    // Regenerate preview images with make_resume_preview.py after changing a PDF.
    // Drive link forms:  view →  https://drive.google.com/file/d/FILE_ID/view
    //                    download → https://drive.google.com/uc?export=download&id=FILE_ID
    resumes: [
      { id: "standard", label: "Standard (India / US)", url: "resume.pdf",         preview: ["resume-preview.png"] },
      { id: "europass", label: "Europass (EU)",         url: "resume-europass.pdf", preview: ["resume-europass-1.png", "resume-europass-2.png"] },
    ],
    // Primary résumé link used by the command palette and the contact vCard.
    resumeUrl: "resume.pdf",
    // Availability pill in the hero. Set show:false to hide it.
    availability: {
      show: true,
      text: "Open to ML / Data Science internships",
    },
    // One line on what you're doing right now — signals momentum. "" hides it.
    currently:
      "Preparing my GateIO preprint (GPS-outage bridging for UAVs) for submission to IEEE/ION PLANS 2027.",
    // Scannable "at a glance" facts for recruiters. Edit / add / remove freely.
    snapshot: [
      { label: "Based in", value: "Pune, India · open to relocate" },
      { label: "Studying", value: "Final-year BTech CSE · CGPA 9.3/10 (≈1.3 German scale)" },
      { label: "Looking for", value: "ML / Data Science internships" },
      { label: "Languages", value: "Hindi (native) · English C1 · German B1" },
    ],
  },

  /* --------------------------------------------------- FOR RECRUITERS ---- */
  // A no-friction summary + a "Save contact" (.vcf) button. show:false hides it.
  forRecruiters: {
    show: true,
    heading: "For recruiters",
    note: "Key details at a glance.",
    items: [
      { label: "Looking for",       value: "ML / Data Science internships & research" },
      { label: "Start window",      value: "Flexible, including early 2027" },
      { label: "Location",          value: "Pune, India · open to relocate · remote-friendly" },
      { label: "Work authorization",value: "Indian national · open to relocation & sponsorship" },
      { label: "Languages",         value: "Hindi (native) · English C1 · German B1" },
      { label: "Typical reply time",value: "Within a day" },
    ],
    // Used to build the downloadable vCard. Leave phone "" to omit it.
    vcard: { title: "Machine Learning / Data Science", org: "", phone: "" },
  },

  /* -------------------------------------------------------- LIVE DEMO ---- */
  demo: {
    show: true,
    heading: "Navigation when GPS drops",
    caption:
      "An interactive illustration of the problem GateIO addresses. Drag to extend the GPS outage: inertial dead-reckoning drifts away from the true path, while the model recovers most of that error. GateIO reaches 11.2 m drift over a 10-second outage — about 7.5× better than a tuned Kalman filter.",
  },

  /* --------------------------------------------------- FRAUD CHART -------- */
  // Visualizes the flagship fraud-study result. Toggle switches the bars between
  // "what SHAP importance says" and "what actually improves predictions".
  // Bar lengths are illustrative; the annotated numbers are measured.
  fraudViz: {
    show: true,
    heading: "One result from the fraud study",
    caption:
      "Velocity features top the importance chart, yet add no measurable predictive value once graph features are present. Toggle the view. Bar lengths are illustrative; the annotated numbers are measured.",
    families: [
      { name: "Velocity features",            importance: 92, contribution: 5,  impNote: "top-ranked (27–57% of SHAP)", contribNote: "+0.000 · not significant (p = 0.23)" },
      { name: "Graph / shared-entity features", importance: 34, contribution: 88, impNote: "mid-ranked",                 contribNote: "+0.031 AUPRC · significant (p = 0.002)" },
    ],
    links: [
      { label: "Read the preprint", href: "https://doi.org/10.5281/zenodo.22892826" },
    ],
  },

  /* ------------------------------------------------------- GITHUB FEED ---- */
  // Live "GitHub activity" summary — repo count, languages, and last commit,
  // read from the GitHub API (no key needed). show:false hides the section.
  github: {
    show: true,
    user: "nandini1612",
  },

  /* ----------------------------------------------------------- SOCIALS ---- */
  // icon: one of  github | linkedin | medium | kaggle | mail  (add more in main.js if needed)
  socials: [
    { label: "GitHub",   icon: "github",   href: "https://github.com/nandini1612/",              handle: "nandini1612" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/nandini-saxena1111/", handle: "nandini-saxena1111" },
    { label: "Medium",   icon: "medium",   href: "https://medium.com/@nandinisaxenawork",         handle: "@nandinisaxenawork" },
    { label: "Kaggle",   icon: "kaggle",   href: "https://www.kaggle.com/nandinisaxenaaa",        handle: "nandinisaxenaaa" },
    { label: "Email",    icon: "mail",     href: "mailto:nandinisaxenawork@gmail.com",            handle: "nandinisaxenawork@gmail.com" },
  ],

  /* ------------------------------------------------------------- ABOUT ---- */
  about: {
    // A short lead sentence rendered slightly larger.
    lead:
      "Final-year Computer Science student (CGPA 9.3/10). I work on machine learning for noisy, incomplete, and changing data.",
    paragraphs: [
      "My work so far has focused on machine learning under difficult conditions: navigation when GPS is unavailable, fraud detection when transaction patterns change over time, and synthetic data that must stay logically valid while preserving statistical utility. I am most interested in whether a model remains reliable when conditions shift, not only how it scores on a benchmark.",
      "In GateIO, a follow-on to my DRDO internship, I built a deep-learning system that keeps UAVs localized through GPS outages — reaching 11.2 m drift over a 10-second dropout, about 7.5× better than a tuned Kalman filter under a leakage-free evaluation. Outside research, I am Vice President of GDG BVP, where I lead technical programming for a 1500+ member developer community, and I write explanatory articles on Medium about topics I am studying.",
    ],
    // Small stat strip. Edit or remove any item.
    facts: [
      { value: "9.3/10", label: "CGPA · ≈1.3 German scale" },
      { value: "2",      label: "preprints on Zenodo" },
      { value: "7.5×",   label: "vs. tuned EKF · GateIO" },
      { value: "1500+",  label: "Community led" },
    ],
  },

  /* -------------------------------------------------------- EXPERIENCE ---- */
  experience: [
    {
      role: "Machine Learning Intern",
      org: "DIAT · DRDO, Ministry of Defence",
      orgUrl: "",
      period: "Jan 2026 – Apr 2026",
      location: "Pune, India",
      bullets: [
        "Built a transformer-based sequence model for UAV trajectory reconstruction during GPS outages from IMU sensor data, cutting trajectory RMSE by ~28% versus classical dead-reckoning integration.",
        "Designed the dead-reckoning pipeline end to end: noise filtering, bias correction, and drift modelling for inertial-only navigation under GPS denial.",
      ],
      tags: ["PyTorch", "Sequence Models", "Sensor Fusion", "Time-Series"],
    },
    {
      role: "Vice President",
      org: "Google Developer Groups (GDG) BVP Pune",
      orgUrl: "",
      period: "Jun 2025 – Present",
      location: "Pune, India",
      bullets: [
        "Lead a 12-person core team running technical programming for a 1500+ member developer community.",
        "Secured and manage 5+ industry partnerships for events, sponsorships, and speaker engagements.",
      ],
      tags: ["Leadership", "Community", "Partnerships"],
    },
    {
      role: "Software Development Engineer Intern",
      org: "MCarbon Tech",
      orgUrl: "",
      period: "Jun 2025 – Jul 2025",
      location: "Noida, India",
      bullets: [
        "Built a smart ticketing system on Spring Boot, Flask, and Vue.js, covering backend services, API integration, and frontend delivery.",
      ],
      tags: ["Spring Boot", "Flask", "Vue.js", "Full-stack"],
    },
  ],

  /* ---------------------------------------------------------- PROJECTS ---- */
  // Featured cards expand into Problem → Approach → Result.
  // For links, use the exact repo URL when you have it (replace the profile URL).
  projects: {
    featured: [
      {
        name: "GateIO — GPS-Outage Bridging for UAVs",
        blurb: "Keeping UAVs localized through GPS outages by predicting velocity from IMU data.",
        problem:
          "Small UAVs lose position during 10–30 s GPS dropouts, and inertial-only integration drifts quickly. A common evaluation habit — splitting train and test within the same flights — also leaks information and inflates reported accuracy.",
        approach:
          "A yaw-rate-gated residual model predicts GPS velocity from the onboard IMU and integrates it to position, holding the last velocity in straight flight and reacting through turns. Two backbones (an LSTM and a TCN + attention network) were compared under a leakage-free leave-one-flight-out protocol.",
        result:
          "Within-flight splits inflated accuracy about 3×. Under honest evaluation, the recurrent model reached 11.2 m mean drift over a 10 s outage on the MARS-LVIG aerial dataset — about 7.5× better than a tuned Extended Kalman Filter, and around 10× better on turns. Open-source, with a preprint on Zenodo.",
        tags: ["PyTorch", "Sequence Models", "State Estimation", "Research"],
        links: [
          { label: "Preprint", href: "https://doi.org/10.5281/zenodo.22853978" },
          { label: "Code", href: "https://github.com/nandini1612/gateio" },
        ],
      },
      {
        name: "Fraud Detection — System + Feature-Attribution Study",
        blurb: "A deployable fraud-detection service, and a study of whether feature importance reflects real predictive value.",
        problem:
          "Feature-importance charts are routinely used to decide which features matter. Velocity features top these charts in fraud detection — but do they actually improve predictions?",
        approach:
          "Built a calibrated LightGBM service on the IEEE-CIS dataset (590K transactions), served via FastAPI with per-prediction SHAP explanations, Prometheus metrics, PSI drift monitoring, Docker, and a 32-test suite. Then ran capacity-matched, temporally-split ablations with Wilcoxon tests and bootstrap intervals across four model families and three importance measures.",
        result:
          "Graph and shared-entity features are the significant driver (AUPRC 0.545 → 0.576, +0.031, p = 0.002). Velocity features rank high on SHAP (27–57%) yet add no significant value on two real datasets (p = 0.23 and 0.95) — importance is not contribution. A popular simulated benchmark rewards velocity only through a data-generation artifact. About 2.2M records across four datasets.",
        tags: ["LightGBM", "SHAP", "FastAPI", "MLOps", "Research"],
        links: [
          { label: "Preprint", href: "https://doi.org/10.5281/zenodo.22892826" },
          { label: "Code", href: "https://github.com/nandini1612/fraud-detection-gnn" },
        ],
      },
      {
        name: "CashPulse — Finance Health Monitor",
        blurb: "Cash-flow forecasting and anomaly detection for individuals and small businesses, deployed live.",
        problem:
          "People and small businesses managing several accounts lack a simple way to forecast cash flow, catch anomalous transactions, and see how much runway they have.",
        approach:
          "An end-to-end pipeline built twice to show both patterns: a local ETL tier (SQLite) and a cloud ELT tier (PostgreSQL, dbt, Airflow, Terraform on AWS). A Gradient Boosting regressor forecasts daily cash flow and an Isolation Forest flags anomalies, served through an authenticated Streamlit dashboard.",
        result:
          "Live, authenticated app. The forecaster beat a naive t-7 baseline on every account (for example, $130 vs $524 MAE), and ML outputs are written back as first-class tables for BI tools. 54 automated tests across two CI pipelines. Live demo login: demo / CashPulseDemo!26",
        tags: ["Data Engineering", "dbt", "Airflow", "scikit-learn", "Streamlit"],
        links: [
          { label: "Live demo", href: "https://finance-health-monitor.streamlit.app/" },
          { label: "Code", href: "https://github.com/nandini1612/finance-health-monitor" },
        ],
      },
      {
        name: "Synthetic Tabular Data — Validity vs. Utility",
        blurb: "Keeping generated tabular records logically valid without losing statistical utility.",
        problem:
          "Hierarchical tabular generators produce statistically faithful rows that often violate logical and business constraints, which makes the data unreliable for downstream use.",
        approach:
          "A constraint-repair extension that enforces logical and business rules on generated records while preserving the statistical utility of the original output.",
        result:
          "Separates logical validity from statistical utility: a repair layer that keeps synthetic tabular data logically valid without reducing its statistical usefulness. Written up as a manuscript in preparation.",
        tags: ["Synthetic Data", "Constraints", "Tabular ML"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/" }],
      },
      {
        name: "Phenological Mismatch Observatory",
        blurb: "Measuring how far species' seasonal timing has shifted.",
        problem:
          "Climate change shifts the timing of plant and animal life-cycle events, but this mismatch is difficult to quantify from noisy citizen-science data.",
        approach:
          "Combined iNaturalist and eBird observation data to compute phenology mismatch scores and trained a weakly-supervised phenology classifier.",
        result:
          "Validated against five years of independent ground-truth records — not a held-out split of the same dataset — reaching 6.7-day MAE.",
        tags: ["Geospatial", "Computer Vision", "Data Pipelines"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/phenological_mismatch" }],
      },
      {
        name: "CancerScope — Breast Cancer Detection",
        blurb: "Classifying breast ultrasound images as benign or malignant.",
        problem:
          "Breast ultrasound is widely used for screening, but reading it is operator-dependent, so a consistent automated second read can support triage.",
        approach:
          "A full-stack application that classifies breast ultrasound images as benign or malignant, trained on the BUSI dataset.",
        result:
          "An end-to-end tool: an image classifier trained on ultrasound scans, served behind a web interface for uploading and scoring images.",
        tags: ["Computer Vision", "Medical Imaging", "Classification", "Full-stack"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/cancerscope" }],
      },
    ],
    // Compact list — one line each.
    more: [
      {
        name: "Chicago Crime Analytics Platform",
        blurb:
          "Full-stack spatial-temporal analytics (Flask, React, PostGIS) over 50,000+ real records from the Chicago Data Portal, with SMA-based crime forecasting.",
        tags: ["Full-stack", "PostGIS", "Forecasting"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/chicago-crime-analytics" }],
      },
      {
        name: "Fashion Colour vs. Economic Trend Analysis",
        blurb: "VAR forecasting linking dominant fashion colours to economic indicators over time.",
        tags: ["VAR", "Time-Series"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/fashion-colour-vs-economic-indicators" }],
      },
      {
        name: "Conversational Analytics",
        blurb: "CSAT prediction with SHAP explainability to identify what drives customer satisfaction.",
        tags: ["NLP", "SHAP", "Explainability"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/conversational-analytics" }],
      },
      {
        name: "Neonatal EEG Seizure Detection",
        blurb: "Detecting seizures in neonatal EEG signals. In progress.",
        tags: ["Signals", "Healthcare ML", "WIP"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/neonatal-eeg-seizure" }],
      },
    ],
  },

  /* ------------------------------------------------------------ SKILLS ---- */
  skills: [
    { group: "Languages",   items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "C"] },
    { group: "ML / DL",     items: ["PyTorch", "LightGBM", "XGBoost", "scikit-learn", "HuggingFace Transformers", "SHAP"] },
    { group: "Focus areas", items: ["Time-series forecasting", "Sequence modeling (LSTM, TCN + attention)", "Anomaly detection", "Model interpretability", "Experiment design & statistical testing", "State estimation (EKF)"] },
    { group: "MLOps & data engineering", items: ["FastAPI", "Docker", "Prometheus", "MLflow", "Apache Airflow", "dbt", "Terraform"] },
    { group: "Web & cloud", items: ["Flask", "Spring Boot", "React", "Vue.js", "Streamlit", "PostgreSQL", "AWS", "GCP", "Git"] },
  ],

  /* ------------------------------------------------------------ PAPERS ---- */
  // Preprints and work in progress. Kept separate from the informal Medium notes.
  papers: {
    intro: "Preprints and work in progress.",
    items: [
      {
        title: "GateIO: Yaw-Rate-Gated Causal Deep Learning for UAV GPS-Outage Bridging",
        venue: "Preprint · Zenodo",
        status: "Preparing submission to IEEE/ION PLANS 2027",
        summary: "A yaw-rate-gated model predicts UAV velocity from IMU data to bridge GPS outages, evaluated with a leakage-free leave-one-flight-out protocol.",
        links: [
          { label: "Preprint (DOI)", href: "https://doi.org/10.5281/zenodo.22853978" },
          { label: "Code", href: "https://github.com/nandini1612/gateio" },
        ],
      },
      {
        title: "Importance Is Not Contribution: Velocity Features Are Redundant on Real Fraud Data but Rewarded by Simulated Benchmarks",
        venue: "Preprint · Zenodo",
        status: "",
        summary: "Shows that features topping importance charts can add no real predictive value, and that a common simulated fraud benchmark rewards them through a data-generation artifact.",
        links: [
          { label: "Preprint (DOI)", href: "https://doi.org/10.5281/zenodo.22892826" },
          { label: "Code", href: "https://github.com/nandini1612/fraud-detection-gnn" },
        ],
      },
      {
        title: "Disentangling Logical Validity from Statistical Utility in Synthetic Tabular Data",
        venue: "Manuscript in preparation",
        status: "",
        summary: "A constraint-repair approach that keeps generated tabular records logically valid while preserving their statistical utility.",
        links: [],
      },
    ],
  },

  /* ----------------------------------------------------------- WRITING ---- */
  // Informal Medium explainers — kept deliberately low-key so they don't read
  // as research (the peer-facing work lives in the Papers section above).
  writing: {
    intro: "Informal explainers I write on Medium while working through ideas — notes, not research.",
    profileUrl: "https://medium.com/@nandinisaxenawork",
    posts: [
      { title: "How Prophet models seasonality with sin and cos", summary: "How a forecast is decomposed into trend and seasonal components.", href: "https://medium.com/@nandinisaxenawork/when-time-looks-random-but-isnt-how-prophet-uses-sin-and-cos-to-model-seasonality-5c6efa723feb?sharedUserId=nandinisaxenawork" },
      { title: "When simpler models beat GNNs under temporal drift", summary: "A graph model versus a simpler baseline on Bitcoin fraud detection as the data shifts over time.", href: "https://medium.com/@nandinisaxenawork/when-simpler-models-beat-gnns-lessons-from-bitcoin-fraud-detection-under-temporal-drift-5b794484295a" },
      { title: "CNNs' inductive biases: why architecture matters", summary: "The assumptions convolutional networks make about spatial structure.", href: "https://medium.com/@nandinisaxenawork/cnns-inductive-biases-why-architecture-matters-a4bd552bdb01" },
      { title: "Markov chains: the math that predicts almost anything", summary: "An introduction to Markov chains and memoryless processes.", href: "https://medium.com/@nandinisaxenawork/markov-chains-the-math-that-predicts-almost-anything-2c5f10025a0c?sharedUserId=nandinisaxenawork" },
    ],
  },

  /* ------------------------------------------------------------ BEYOND ---- */
  // Leadership / community / personal — the human side.
  beyond: [
    { title: "Founder — OpportYouNity", desc: "A youth opportunity & mental-health platform connecting students to workshops, internships, and support." },
    { title: "Head of PR — Null Student Chapter", desc: "Ran outreach and communications for a student security & tech community." },
    { title: "SheFi Scholar", desc: "Selected for the SheFi program (2025–26)." },
    { title: "1000 Girls, 1000 Futures", desc: "Mentorship program of the New York Academy of Sciences." },
    { title: "Bharatanatyam dancer", desc: "Classical dancer of 10+ years; part of the RAQS college dance team." },
  ],

  /* ----------------------------------------------------------- CONTACT ---- */
  contact: {
    heading: "Get in touch",
    text: "I am open to internships and research collaborations in machine learning and data science. Email is the best way to reach me; my profiles are linked below.",
  },
};

// Expose to the renderer. (Don't remove this line.)
window.CONTENT = CONTENT;
