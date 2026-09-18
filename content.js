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
      "Extending my DRDO navigation research in GateIO, and building a computer-vision classifier for phenology data.",
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
      "An interactive illustration of the problem my DRDO / GateIO work addresses. Drag to extend the GPS outage: inertial dead-reckoning drifts away from the true path, while the sequence model recovers part of that error, roughly the ~28% RMSE reduction I measured.",
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
      "At DRDO I built transformer-based sequence models to reconstruct UAV trajectories during GPS outages. Outside research, I am Vice President of GDG BVP, where I lead technical programming for a 1500+ member developer community, and I write explanatory articles on Medium about topics I am studying.",
    ],
    // Small stat strip. Edit or remove any item.
    facts: [
      { value: "9.3/10", label: "CGPA · ≈1.3 German scale" },
      { value: "~28%",   label: "RMSE cut at DRDO" },
      { value: "1500+",  label: "Community led" },
      { value: "9+",     label: "ML projects" },
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
        name: "GateIO — Yaw-Rate-Gated Causal TCN",
        blurb: "Bridging GPS outages in UAV navigation.",
        problem:
          "When GPS is lost, a UAV relies on inertial-only navigation, where dead-reckoning error accumulates fastest through turns.",
        approach:
          "Extends my DRDO research by gating a causal temporal convolutional network with a yaw-rate signal, so the model uses turn dynamics where drift is largest.",
        result:
          "Builds on the DRDO model, which reduced trajectory RMSE by about 28% compared with classical dead-reckoning. The yaw-rate gate focuses on the turn segments that classical integration handles poorly.",
        tags: ["TCN", "PyTorch", "Navigation", "Research"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/gateio" }],
      },
      {
        name: "Synthetic Tabular Data — Validity vs. Utility",
        blurb: "Keeping generated tabular records logically valid without losing statistical utility.",
        problem:
          "Hierarchical tabular generators produce statistically faithful rows that often violate logical and business constraints, which makes the data unreliable for downstream use.",
        approach:
          "A constraint-repair extension that enforces logical and business rules on generated records while preserving the statistical utility of the original output.",
        result:
          "Separates logical validity from statistical utility: a repair layer that keeps synthetic tabular data logically valid without reducing its statistical usefulness.",
        tags: ["Synthetic Data", "Constraints", "Tabular ML"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/" }],
      },
      {
        name: "Phenological Mismatch Observatory",
        blurb: "Measuring how far species' seasonal timing has shifted.",
        problem:
          "Climate change shifts the timing of plant and animal life-cycle events, but this mismatch is difficult to quantify from noisy citizen-science data.",
        approach:
          "Combined iNaturalist and eBird observation data to compute phenology mismatch scores, then validated them against ground truth.",
        result:
          "Validated to 6.7-day / 2.5-day MAE against ground truth; now expanding into a computer-vision classifier for citizen-science photos.",
        tags: ["Geospatial", "CV", "Data Pipelines"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/phenological_mismatch" }],
      },
      {
        name: "AI Financial Crime Detector",
        blurb: "How fraud-detection models degrade as transaction patterns change.",
        problem:
          "Fraud detectors are trained on historical transactions, but laundering patterns change over time, so accuracy degrades.",
        approach:
          "Compared GNN and XGBoost fraud detection under concept drift on the Elliptic Bitcoin dataset, measuring how each degrades as transaction patterns change.",
        result:
          "Quantified the performance drop over time for both models, showing which approach stays more reliable as the data distribution shifts.",
        tags: ["GNN", "XGBoost", "Concept Drift", "Graph ML"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/fraud-detection-gnn" }],
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
    { group: "ML / DL",     items: ["PyTorch", "PyTorch Geometric", "TensorFlow", "HuggingFace Transformers", "scikit-learn", "XGBoost", "Statsmodels", "SHAP"] },
    { group: "Focus areas", items: ["Time-series forecasting", "Graph neural networks", "Sequence modeling", "Concept-drift analysis", "Computer vision", "Model explainability"] },
    { group: "Web & infrastructure", items: ["FastAPI", "Flask", "Spring Boot", "React", "Vue.js", "PostgreSQL", "PostGIS", "Git", "AWS", "GCP"] },
  ],

  /* ----------------------------------------------------------- WRITING ---- */
  // Published explainers. Add exact article URLs when you have them.
  writing: {
    intro: "I write explanatory articles on Medium about topics I am studying.",
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
