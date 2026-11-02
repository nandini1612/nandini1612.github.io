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
      "I work on machine learning for difficult data: sensor failure, concept drift, and synthetic-data integrity. Former ML intern at DRDO (DIAT).",
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

  /* ------------------------------------------------------- GPS OUTAGE ---- */
  // GateIO's results: the failure mode (simulated) beside the measured comparison.
  // How the model works is shown on the GateIO project card instead.
  demo: {
    show: true,
    heading: "Navigation when GPS drops",
    caption:
      "When GPS drops out, a drone has to estimate position from inertial data alone, and the simplest fallback, holding the last velocity, cannot follow a turn. Here is how far each method ends up after a 10-second outage.",
    visual: {
      dark: "assets/outage-sim-dark.svg",
      light: "assets/outage-sim-light.svg",
      alt: "Simulated GPS outage: after GPS is lost the aircraft turns, while holding the last velocity keeps going straight and drifts away.",
      label: "simulation",
    },
    story: {
      title: "Performance story",
      unit: "metres of drift · lower is better",
      note: "Mean endpoint drift after a 10 s outage, leave-one-flight-out on MARS-LVIG, 1,390 held-out sequences. GateIO-LSTM is about 7.5× closer than the tuned EKF, and roughly 10× closer on turns.",
      rows: [
        { label: "Tuned EKF",          value: 99.5 },
        { label: "Hold last velocity", value: 85.0 },
        { label: "RoNIN (learned)",    value: 40.1 },
        { label: "GateIO-TCN",         value: 23.4 },
        { label: "GateIO-LSTM",        value: 11.2, highlight: true },
      ],
    },
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
  // icon: one of  github | linkedin | medium | kaggle | orcid | mail  (add more in main.js if needed)
  socials: [
    { label: "GitHub",   icon: "github",   href: "https://github.com/nandini1612/",              handle: "nandini1612" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/nandini-saxena1111/", handle: "nandini-saxena1111" },
    { label: "Medium",   icon: "medium",   href: "https://medium.com/@nandinisaxenawork",         handle: "@nandinisaxenawork" },
    { label: "Kaggle",   icon: "kaggle",   href: "https://www.kaggle.com/nandinisaxenaaa",        handle: "nandinisaxenaaa" },
    { label: "ORCID",    icon: "orcid",    href: "https://orcid.org/0009-0006-6751-1528",         handle: "0009-0006-6751-1528" },
    { label: "Email",    icon: "mail",    href: "mailto:nandinisaxenawork@gmail.com",            handle: "nandinisaxenawork@gmail.com" },
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
        // Optional: a wide, two-column card with a how-it-works visual. Consecutive
        // spotlight cards alternate the visual's side automatically.
        spotlight: {
          kicker: "State estimation · Research",
          title: "GateIO",
          subtitle: "GPS-outage bridging for UAVs",
          summary:
            "When GPS drops out, a drone has to work out where it is from inertial data alone. GateIO predicts the change from the last known velocity, with a yaw-rate gate that holds course on straight flight and lets the model learn through turns.",
          // How it works, drawn from the GateIO README (scripts/make_figures.py → howitworks).
          visual: {
            dark: "assets/gateio-how-dark.svg",
            light: "assets/gateio-how-light.svg",
            alt: "GateIO pipeline: a 1-second IMU window goes through a token encoder and a causal LSTM to a residual head that predicts the velocity change; that change is added to the last GPS velocity and integrated to position. Below, the training-time yaw-rate gate: on straight flight a prior holds velocity, on turns the drift loss teaches the turn.",
            label: "illustration",
          },
          // Short feature tiles. Results live in the "Navigation when GPS drops" section.
          features: [
            "Residual head: zero means hold velocity",
            "Yaw-rate gate during training",
            "LSTM or TCN + attention backbone",
            "Leave-one-flight-out evaluation",
          ],
        },
        problem:
          "Small UAVs lose position during 10–30 s GPS dropouts, and inertial-only integration drifts quickly. A common evaluation habit — splitting train and test within the same flights — also leaks information and inflates reported accuracy.",
        approach:
          "A residual output head predicts the change from the last known GPS velocity, and a yaw-rate gate holds that velocity in straight flight while letting the drift loss train turning dynamics. Velocity is integrated to position. Two interchangeable backbones (LSTM and TCN + attention) were compared against a tuned EKF, constant-velocity hold, and RoNIN (a learned IMU velocity regressor) under leave-one-flight-out cross-validation with model selection on a held-out validation flight.",
        result:
          "Within-flight splits inflated accuracy about 3× and even flipped which backbone looked best. Under leave-one-flight-out evaluation on the MARS-LVIG aerial dataset (1,390 held-out 10 s outages across five flights), the LSTM reached 11.2 m mean endpoint drift, against 40.1 m for RoNIN, 85.0 m for constant velocity and 99.5 m for a tuned Extended Kalman Filter: about 7.5× better than the EKF, and around 10× better on turns. Open-source, with a preprint on Zenodo.",
        tags: ["PyTorch", "Sequence Models", "State Estimation", "Time-Series", "Research"],
        links: [
          { label: "Preprint", href: "https://doi.org/10.5281/zenodo.22853978" },
          { label: "Code", href: "https://github.com/nandini1612/gateio" },
        ],
      },
      {
        name: "Fraud Detection — System + Feature-Attribution Study",
        blurb: "A deployable fraud-detection service, and a study of whether feature importance reflects real predictive value.",
        spotlight: {
          kicker: "Explainable ML · Research",
          title: "Fraud Detection",
          subtitle: "A deployable service, and a study of which features matter",
          summary:
            "Importance charts said rolling “velocity” features mattered most. Ablations on time-ordered data said otherwise: the shared-entity graph features carry the signal. The served model scores one raw transaction and explains every decision.",
          visual: {
            dark: "assets/fraud-how-dark.svg",
            light: "assets/fraud-how-light.svg",
            alt: "A new transaction links to its card, address and email in a shared-entity graph, giving features such as how many cards used the same address. It is then scored by a sigmoid-calibrated LightGBM behind FastAPI, which returns a fraud probability of 0.9645 with SHAP contributions: card1_te +1.90, TransactionAmt +0.94, addr1_unique_cards +0.90.",
            label: "illustration",
          },
          features: [
            "Calibrated LightGBM behind FastAPI",
            "SHAP explanation per decision",
            "Prometheus metrics and PSI drift",
            "Capacity-matched ablations, Wilcoxon tests",
          ],
        },
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
        spotlight: {
          kicker: "Data engineering · ML",
          title: "CashPulse",
          subtitle: "Cash-flow forecasting and anomaly detection, deployed live",
          summary:
            "An end-to-end pipeline built twice: a SQLite quickstart and a Postgres, dbt, Airflow and Terraform cloud tier. The ML tasks only run once 18 data-quality tests pass, and the forecaster beats a naive baseline on every account.",
          visual: {
            dark: "assets/cashpulse-how-dark.svg",
            light: "assets/cashpulse-how-light.svg",
            alt: "CashPulse's Airflow DAG: raw Postgres tables, dbt staging, dbt analytics, then dbt test counting up to 18 of 18 before the ML tasks and the Streamlit dashboard run. Below, daily net cash flow with a dashed 30-day forecast and two flagged anomalies, a duplicate charge and a card-testing burst. Backtest MAE 130 dollars versus 524 for the naive baseline.",
            label: "illustration",
          },
          features: [
            "Forecast MAE $130 vs naive $524",
            "Isolation Forest anomaly flags",
            "18 dbt tests gate the DAG",
            "Per-login auth on a live demo",
          ],
        },
        problem:
          "People and small businesses managing several accounts lack a simple way to forecast cash flow, catch anomalous transactions, and see how much runway they have.",
        approach:
          "An end-to-end pipeline built twice to show both patterns: a local ETL tier (SQLite) and a cloud ELT tier (PostgreSQL, dbt, Airflow, Terraform on AWS). A Gradient Boosting regressor forecasts 30-day cash flow and an Isolation Forest flags anomalous transactions. In the cloud tier, an Airflow DAG runs the ML tasks only after 18 dbt data-quality tests pass. Results are served through a Streamlit dashboard with per-login access control (bcrypt, signed session cookies).",
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
        spotlight: {
          kicker: "Synthetic data · Research",
          title: "Verity",
          subtitle: "Constraint repair for synthetic tabular data",
          summary:
            "Synthetic rows can score well on utility and still be impossible. Verity detects them with per-schema rules and repairs them, bringing invalid rows to 0% for every generator. It also showed that a popular utility boost from k-NN repair is real data leaking in.",
          visual: {
            dark: "assets/verity-how-dark.svg",
            light: "assets/verity-how-light.svg",
            alt: "Verity's pipeline: generator, detector, repair loop, evaluation. A grid of 40 synthetic rows has 40 percent turn invalid at the detector, then all are fixed within three passes. An example row with pdays -1 and previous 3 is repaired to previous 0. Below, k-NN repair raises TSTR AUROC by 0.08 to 0.12 while canonical repair changes it by -0.07 to -0.01, both at 0 percent invalid, so the k-NN gain was leakage.",
            label: "illustration",
          },
          features: [
            "Generator-agnostic, no training",
            "Deterministic, k-NN and canonical repair",
            "Converges within three passes",
            "With Snigdha Sarkar · manuscript in prep",
          ],
        },
        problem:
          "Synthetic-data metrics score columns individually or in aggregate, so a generator can look strong on downstream utility while emitting rows that could never exist (for example, a customer 'never contacted' who was contacted three times). The baseline hierarchical framework names logical constraints but never implements them.",
        approach:
          "A generator-agnostic detect-and-repair stage between synthesis and evaluation: per-schema logical rules produce a violation rate, and three repair strategies fix violating rows (deterministic, k-NN projection onto real records, and canonical self-repair that injects no real data). A convergence loop re-checks until no violations remain. Evaluated on Adult and Bank Marketing across three generators, three repair modes and three seeds. Co-authored with Snigdha Sarkar, and packaged as Verity, a CLI and web app for any CSV.",
        result:
          "Invalid rows drop to exactly 0% for every generator (from 40%, 11% and 13%), converging in at most three passes. Repair costs no measurable utility on strong generators. On a weak generator, the apparent TSTR AUROC gain from k-NN repair (+0.08 to +0.12) disappears under canonical repair at the same validity, which shows that gain is leakage of real data, not better synthesis. Manuscript in preparation.",
        tags: ["Synthetic Data", "Constraints", "Tabular ML", "Research"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/hierarchical-synthetic-tabular-data-generation" }],
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
    ],
    // Compact list — one line each.
    more: [
      {
        name: "CancerScope — Breast Cancer Detection",
        blurb: "Full-stack app that classifies breast ultrasound images (BUSI dataset) as benign or malignant.",
        tags: ["Computer Vision", "Medical Imaging", "Full-stack"],
        links: [{ label: "Code", href: "https://github.com/nandini1612/cancerscope" }],
      },
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
    { group: "Languages",   items: ["Python", "SQL", "Java", "TypeScript", "JavaScript", "C"] },
    { group: "ML / DL frameworks", items: ["PyTorch", "scikit-learn", "LightGBM", "XGBoost", "HuggingFace Transformers"] },
    { group: "Models & methods", items: ["Sequence models (LSTM, TCN + attention)", "Gradient-boosted trees", "Anomaly detection (Isolation Forest)", "State estimation (EKF)", "Time-series forecasting (VAR, Prophet)", "Synthetic tabular data"] },
    { group: "Evaluation & interpretability", items: ["Temporal & leave-one-group-out CV", "Capacity-matched ablations", "Wilcoxon tests & bootstrap CIs", "Probability calibration", "SHAP"] },
    { group: "MLOps & serving", items: ["FastAPI", "Docker", "MLflow", "Prometheus", "Drift monitoring (PSI)", "GitHub Actions", "pytest"] },
    { group: "Data engineering", items: ["PostgreSQL", "PostGIS", "dbt", "Apache Airflow", "Terraform"] },
    { group: "Web & cloud", items: ["Flask", "Spring Boot", "React", "Vue.js", "Streamlit", "AWS", "GCP", "Git"] },
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
        summary: "A yaw-rate-gated residual model predicts UAV velocity from IMU data to bridge GPS outages. Under leave-one-flight-out evaluation it reaches 11.2 m endpoint drift over a 10 s outage, about 7.5× better than a tuned EKF.",
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
        summary: "A generator-agnostic constraint-repair stage that brings invalid synthetic rows to 0%, and a canonical-repair control showing that the utility gain from k-NN repair is real-data leakage.",
        links: [
          { label: "Code", href: "https://github.com/nandini1612/hierarchical-synthetic-tabular-data-generation" },
        ],
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
    { title: "Anchor & off-screen", desc: "I anchor events, make art and craft, read, and volunteer." },
  ],

  /* ----------------------------------------------------------- CONTACT ---- */
  contact: {
    heading: "Get in touch",
    text: "I am open to internships and research collaborations in machine learning and data science. Email is the best way to reach me; my profiles are linked below.",
  },
};

// Expose to the renderer. (Don't remove this line.)
window.CONTENT = CONTENT;
