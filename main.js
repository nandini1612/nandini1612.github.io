/* ============================================================================
   main.js — renders the page from content.js and runs the command palette.
   You should not need to edit this to update your info; edit content.js.
   ========================================================================== */
(function () {
  "use strict";
  const C = window.CONTENT;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
    );
  const bind = (name) => $(`[data-bind="${name}"]`);

  /* ------------------------------------------------------------ ICONS --- */
  const ICONS = {
    github: '<svg viewBox="0 0 24 24" class="filled"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.8 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" class="filled"><path d="M20.4 3H3.6A.6.6 0 0 0 3 3.6v16.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6zM8.3 18.3H5.6V9.7h2.7v8.6zM6.9 8.5a1.6 1.6 0 1 1 0-3.1 1.6 1.6 0 0 1 0 3.1zm11.4 9.8h-2.7v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H9.9V9.7h2.6v1.2h.1a2.8 2.8 0 0 1 2.6-1.4c2.7 0 3.2 1.8 3.2 4.1v4.7z"/></svg>',
    medium: '<svg viewBox="0 0 24 24" class="filled"><path d="M13.5 12a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0zm7.1 0c0 3.4-.9 6.2-2 6.2s-2-2.8-2-6.2.9-6.2 2-6.2 2 2.8 2 6.2zm3.4 0c0 3-.3 5.5-.7 5.5s-.7-2.5-.7-5.5.3-5.5.7-5.5.7 2.5.7 5.5z"/></svg>',
    kaggle: '<svg viewBox="0 0 24 24" class="filled"><path d="M18.9 22a.5.5 0 0 1-.4.2h-2.9a.6.6 0 0 1-.5-.3l-4-5-1.1 1v4a.3.3 0 0 1-.3.3H7.3a.3.3 0 0 1-.3-.3V1.9a.3.3 0 0 1 .3-.3h2.4a.3.3 0 0 1 .3.3v12.4l5-5a.7.7 0 0 1 .5-.2h3a.3.3 0 0 1 .2.5l-5.3 5.1 5.4 6.8a.4.4 0 0 1-.2.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    external: '<svg viewBox="0 0 24 24"><path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>',
    code: '<svg viewBox="0 0 24 24"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
    hash: '<svg viewBox="0 0 24 24"><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/></svg>',
  };

  /* ============================ RENDER ================================== */
  function render() {
    const m = C.meta;

    // Titles / names
    bind("brandName").textContent = m.name;
    bind("footerName").textContent = `© ${new Date().getFullYear()} ${m.name}`;
    bind("heroName").textContent = m.name;
    bind("heroRole").textContent = m.role;
    bind("heroTagline").textContent = m.tagline;

    // Availability
    const av = bind("availability");
    if (m.availability && m.availability.show) av.textContent = m.availability.text;
    else av.remove();

    // Currently line
    const cur = bind("currently");
    if (m.currently) cur.innerHTML = `<span class="dot"></span><span><b>Now:</b> ${esc(m.currently)}</span>`;
    else cur.remove();

    // At-a-glance snapshot
    const snap = bind("snapshot");
    if (m.snapshot && m.snapshot.length) {
      snap.innerHTML = m.snapshot
        .map((s) => `<div class="snapshot__cell"><div class="snapshot__label">${esc(s.label)}</div><div class="snapshot__value">${esc(s.value)}</div></div>`)
        .join("");
    } else snap.remove();

    // Contact copy-email text
    const et = bind("emailText");
    if (et) et.textContent = m.email;

    // For-recruiters hire card
    const R = C.forRecruiters;
    if (R && R.show) {
      bind("hireHeading").textContent = R.heading;
      bind("hireNote").textContent = R.note;
      bind("hireItems").innerHTML = R.items
        .map((it) => `<div class="hire__cell"><div class="hire__label">${esc(it.label)}</div><div class="hire__value">${esc(it.value)}</div></div>`)
        .join("");
    } else {
      const s = document.getElementById("recruiters");
      if (s) s.remove();
    }

    // Demo copy
    const D = C.demo;
    if (D && D.show) {
      bind("demoHeading").textContent = D.heading;
      bind("demoCaption").textContent = D.caption;
    } else {
      const s = document.getElementById("demo");
      const nl = $('.nav__links a[href="#demo"]');
      if (s) s.remove();
      if (nl) nl.remove();
    }

    // Project filter chips — most-used tags first, capped so the bar stays scannable.
    const freq = {}, label = {};
    [...C.projects.featured, ...C.projects.more].forEach((p) =>
      (p.tags || []).forEach((t) => { const k = t.toLowerCase(); freq[k] = (freq[k] || 0) + 1; label[k] = t; })
    );
    const tagSet = Object.keys(freq).sort((a, b) => freq[b] - freq[a] || a.localeCompare(b)).slice(0, 14);
    bind("projectFilters").innerHTML =
      `<button class="filterbar__chip is-on" data-filter="*">All</button>` +
      tagSet.map((k) => `<button class="filterbar__chip" data-filter="${esc(k)}">${esc(label[k])}</button>`).join("");

    // Hero socials
    bind("heroSocials").innerHTML = C.socials
      .map(
        (s) =>
          `<a class="social" href="${esc(s.href)}" target="_blank" rel="noopener">${ICONS[s.icon] || ""}<span>${esc(s.label)}</span></a>`
      )
      .join("");

    // About
    bind("aboutLead").textContent = C.about.lead;
    bind("aboutParas").innerHTML = C.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
    bind("aboutFacts").innerHTML = (C.about.facts || [])
      .map((f) => `<div class="fact"><div class="fact__value">${esc(f.value)}</div><div class="fact__label">${esc(f.label)}</div></div>`)
      .join("");

    // Experience
    bind("experience").innerHTML = C.experience
      .map((x) => {
        const org = x.orgUrl
          ? `<a href="${esc(x.orgUrl)}" target="_blank" rel="noopener">${esc(x.org)}</a>`
          : esc(x.org);
        return `<article class="xp reveal">
          <div class="xp__top">
            <div>
              <div class="xp__role">${esc(x.role)}</div>
              <div class="xp__org">${org}</div>
            </div>
            <div class="xp__meta">${esc(x.period)}${x.location ? " · " + esc(x.location) : ""}</div>
          </div>
          <ul class="xp__bullets">${x.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          <div class="tags">${(x.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </article>`;
      })
      .join("");

    // Projects — featured
    bind("projectsFeatured").innerHTML = C.projects.featured
      .map((p, i) => {
        const links = (p.links || [])
          .map(
            (l) =>
              `<a class="project__link" href="${esc(l.href)}" target="_blank" rel="noopener">${ICONS.code}${esc(l.label)}</a>`
          )
          .join("");
        const detail = [
          ["Problem", p.problem],
          ["Approach", p.approach],
          ["Result", p.result],
        ]
          .filter(([, v]) => v)
          .map(([k, v]) => `<div class="par"><div class="par__label">${k}</div><div class="par__text">${esc(v)}</div></div>`)
          .join("");
        return `<article class="project reveal" data-project="${i}" data-tags="${esc((p.tags || []).join("|").toLowerCase())}">
          <div class="project__name">${esc(p.name)}</div>
          <p class="project__blurb">${esc(p.blurb)}</p>
          <button class="project__toggle" aria-expanded="false">Read the story ${ICONS.arrow.replace('viewBox="0 0 24 24"','viewBox="0 0 24 24" style="transform:rotate(90deg)"')}</button>
          <div class="project__detail"><div class="project__detail-inner">${detail}</div></div>
          <div class="project__foot">
            <div class="tags">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
            <div class="project__links">${links}</div>
          </div>
        </article>`;
      })
      .join("");

    // Projects — more
    bind("projectsMore").innerHTML = C.projects.more
      .map((p) => {
        const href = p.links && p.links[0] ? p.links[0].href : "#";
        return `<div class="more reveal" data-tags="${esc((p.tags || []).join("|").toLowerCase())}">
          <div class="more__top">
            <div class="more__name">${esc(p.name)}</div>
            <a class="more__link" href="${esc(href)}" target="_blank" rel="noopener" aria-label="Open ${esc(p.name)}">${ICONS.code}</a>
          </div>
          <p class="more__blurb">${esc(p.blurb)}</p>
          <div class="tags">${(p.tags || []).map((t) => `<span class="tag tag--muted">${esc(t)}</span>`).join("")}</div>
        </div>`;
      })
      .join("");

    // Skills
    bind("skills").innerHTML = C.skills
      .map(
        (g) =>
          `<div class="skillgroup reveal"><div class="skillgroup__title">${esc(g.group)}</div><div class="skillgroup__chips">${g.items
            .map((s) => `<span class="chip">${esc(s)}</span>`)
            .join("")}</div></div>`
      )
      .join("");

    // Writing
    bind("writingIntro").textContent = C.writing.intro || "";
    bind("writing").innerHTML = C.writing.posts
      .map(
        (a) =>
          `<a class="article reveal" href="${esc(a.href)}" target="_blank" rel="noopener">
            <span class="article__mark">›</span>
            <span>
              <span class="article__title">${esc(a.title)} ${ICONS.external}</span>
              <span class="article__summary">${esc(a.summary)}</span>
            </span>
          </a>`
      )
      .join("");

    // Beyond
    bind("beyond").innerHTML = C.beyond
      .map(
        (b) =>
          `<div class="beyond__item reveal"><div class="beyond__title">${esc(b.title)}</div><div class="beyond__desc">${esc(b.desc)}</div></div>`
      )
      .join("");

    // Contact
    bind("contactHeading").textContent = C.contact.heading;
    bind("contactText").textContent = C.contact.text;
    bind("contactActions").innerHTML =
      `<a class="btn btn--primary" href="mailto:${esc(m.email)}">${ICONS.mail}Email me</a>` +
      C.socials
        .filter((s) => s.icon !== "mail")
        .map((s) => `<a class="btn btn--ghost" href="${esc(s.href)}" target="_blank" rel="noopener">${ICONS[s.icon] || ""}${esc(s.label)}</a>`)
        .join("");
  }

  /* =================== INTERACTIONS: project expand ==================== */
  function wireProjects() {
    $$(".project__toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".project");
        const open = card.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
        btn.childNodes[0].nodeValue = open ? "Hide the story " : "Read the story ";
      });
    });
  }

  /* =================== Reveal on scroll ================================ */
  function wireReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    $$(".reveal").forEach((n) => io.observe(n));
  }

  /* =================== Sticky nav shadow =============================== */
  function wireNav() {
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* =================== Résumé preview modal ========================== */
  let resumeInit = false;
  function resumeList() {
    if (Array.isArray(C.meta.resumes) && C.meta.resumes.length) return C.meta.resumes;
    // legacy fallback (single résumé)
    return [{ id: "resume", label: "Résumé", url: C.meta.resumeUrl || "", preview: [].concat(C.meta.resumePreview || []) }];
  }
  function selectResume(idx) {
    const list = resumeList();
    const r = list[idx] || list[0];
    $$("#resumeTabs .resume__tab").forEach((t, i) => t.setAttribute("aria-selected", String(i === idx)));
    const view = $("#resumeView");
    const pages = [].concat(r.preview || []);
    const dl = $("#resumeDownload"), ot = $("#resumeOpenTab");
    if (r.url) {
      dl.href = r.url; dl.style.display = "";
      ot.href = r.url; ot.style.display = "";
    } else {
      dl.style.display = "none"; ot.style.display = "none";
    }
    // Render page image(s) — works in every browser, even those that download PDFs.
    if (pages.length) {
      view.innerHTML = pages
        .map((src, i) => `<img class="resume__img" src="${esc(src)}" alt="${esc(r.label)} résumé page ${i + 1}" loading="lazy" />`)
        .join("");
    } else {
      view.innerHTML = `<div class="resume__empty">This format hasn't been added yet.<span>Add its PDF to the project and set <code>url</code> + <code>preview</code> under <code>meta.resumes</code> in content.js.</span></div>`;
    }
  }
  function openResume() {
    const modal = $("#resume");
    if (!resumeInit) {
      const list = resumeList();
      const tabs = $("#resumeTabs");
      if (list.length > 1) {
        tabs.innerHTML = list
          .map((r, i) => `<button class="resume__tab" role="tab" data-i="${i}"${r.url ? "" : ' data-empty="1"'}>${esc(r.label)}</button>`)
          .join("");
        $$(".resume__tab", tabs).forEach((t) => t.addEventListener("click", () => selectResume(+t.dataset.i)));
      } else {
        tabs.style.display = "none";
      }
      selectResume(0);
      resumeInit = true;
    }
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeResume() {
    $("#resume").hidden = true;
    document.body.style.overflow = "";
  }
  function wireResume() {
    $("#resumeBtn").addEventListener("click", openResume);
    $$("[data-resume-close]").forEach((n) => n.addEventListener("click", closeResume));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("#resume").hidden) closeResume();
    });
  }

  /* =================== Copy email ==================================== */
  function wireCopyEmail() {
    const btn = $("#copyEmail");
    if (!btn) return;
    btn.addEventListener("click", () => {
      copyEmail();
      const original = btn.querySelector("span:first-child").textContent;
      btn.querySelector("span:first-child").textContent = "Copied to clipboard ✓";
      setTimeout(() => { btn.querySelector("span:first-child").textContent = original; }, 1600);
    });
  }

  /* =================== Email pills → copy ============================ */
  function wireMailtoCopy() {
    $$('a.social[href^="mailto:"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        copyEmail();
      });
      a.setAttribute("title", "Click to copy email");
    });
  }

  /* =================== Scroll spy + progress bar ===================== */
  function wireScrollSpy() {
    const bar = $("#progress");
    const links = $$(".nav__links a");
    const map = {};
    links.forEach((a) => (map[a.getAttribute("href").slice(1)] = a));
    const sections = Object.keys(map).map((id) => document.getElementById(id)).filter(Boolean);

    const onScroll = () => {
      // progress
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.width = Math.min(100, Math.max(0, scrolled * 100)) + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if ("IntersectionObserver" in window && sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              links.forEach((a) => a.classList.remove("is-active"));
              const active = map[e.target.id];
              if (active) active.classList.add("is-active");
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach((s) => spy.observe(s));
    }
  }

  /* =================== Theme toggle =================================== */
  function wireTheme() {
    const root = document.documentElement;
    const KEY = "portfolio-theme";
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    // Dark is the intended default — only switch if the visitor explicitly chose
    // light via the toggle before. System preference is intentionally ignored.
    root.setAttribute("data-theme", saved === "light" ? "light" : "dark");

    $("#themeToggle").addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }

  /* =================== COMMAND PALETTE ================================ */
  function buildCommands() {
    const cmds = [];
    // Navigation
    [
      ["About", "about"], ["Experience", "experience"], ["Projects", "projects"],
      ["Skills", "skills"], ["Writing", "writing"], ["Beyond the code", "beyond"], ["Contact", "contact"],
    ].forEach(([label, id]) =>
      cmds.push({ group: "Navigate", label, hint: "Section", icon: ICONS.hash, run: () => goTo(id) })
    );
    // Links
    C.socials.forEach((s) =>
      cmds.push({
        group: "Links",
        label: s.label,
        hint: s.handle || "Open",
        icon: ICONS[s.icon] || ICONS.external,
        run: () => window.open(s.href, s.icon === "mail" ? "_self" : "_blank"),
      })
    );
    cmds.push({ group: "Links", label: "View résumé", hint: "PDF preview", icon: ICONS.doc, run: () => openResume() });
    // Actions
    cmds.push({
      group: "Actions",
      label: "Copy email address",
      hint: C.meta.email,
      icon: ICONS.mail,
      run: () => copyEmail(),
    });
    cmds.push({
      group: "Actions",
      label: "Toggle light / dark theme",
      hint: "Appearance",
      icon: ICONS.hash,
      run: () => $("#themeToggle").click(),
    });
    return cmds;
  }

  function goTo(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function copyEmail() {
    const email = C.meta.email;
    const done = () => flash("Email copied ✓");
    if (navigator.clipboard) navigator.clipboard.writeText(email).then(done).catch(() => window.open("mailto:" + email));
    else window.open("mailto:" + email);
  }
  let flashTimer;
  function flash(msg) {
    let t = $("#toast");
    if (!t) {
      t = el("div");
      t.id = "toast";
      Object.assign(t.style, {
        position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
        background: "var(--accent)", color: "var(--accent-ink)", padding: "10px 18px", borderRadius: "10px",
        fontSize: "14px", fontWeight: "600", zIndex: "200", boxShadow: "var(--shadow)",
        transition: "opacity .25s, transform .25s", fontFamily: "var(--font-sans)",
      });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    t.style.transform = "translateX(-50%) translateY(0)";
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => {
      t.style.opacity = "0";
      t.style.transform = "translateX(-50%) translateY(8px)";
    }, 1600);
  }

  function wireCmdk() {
    const cmds = buildCommands();
    const overlay = $("#cmdk");
    const input = $("#cmdkInput");
    const list = $("#cmdkList");
    let filtered = [];
    let sel = 0;

    const open = () => {
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
      input.value = "";
      renderList("");
      requestAnimationFrame(() => input.focus());
    };
    const close = () => {
      overlay.hidden = true;
      document.body.style.overflow = "";
    };
    const isOpen = () => !overlay.hidden;

    function score(cmd, q) {
      const hay = (cmd.label + " " + cmd.group + " " + (cmd.hint || "")).toLowerCase();
      if (!q) return 1;
      if (hay.includes(q)) return 2;
      // subsequence match
      let i = 0;
      for (const ch of hay) if (ch === q[i]) i++;
      return i === q.length ? 1 : 0;
    }

    function renderList(q) {
      q = q.trim().toLowerCase();
      filtered = cmds
        .map((c) => ({ c, s: score(c, q) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.c);
      sel = 0;
      if (!filtered.length) {
        list.innerHTML = `<div class="cmdk__empty">No matches for “${esc(q)}”.</div>`;
        return;
      }
      let html = "";
      let lastGroup = null;
      filtered.forEach((c, i) => {
        if (c.group !== lastGroup) {
          html += `<div class="cmdk__group-label">${esc(c.group)}</div>`;
          lastGroup = c.group;
        }
        html += `<div class="cmdk__item" role="option" data-i="${i}" aria-selected="${i === 0}">
          <span class="cmdk__item-icon">${c.icon || ""}</span>
          <span class="cmdk__item-label">${esc(c.label)}</span>
          ${c.hint ? `<span class="cmdk__item-hint">${esc(c.hint)}</span>` : ""}
        </div>`;
      });
      list.innerHTML = html;
      $$(".cmdk__item", list).forEach((node) => {
        node.addEventListener("mousemove", () => setSel(+node.dataset.i));
        node.addEventListener("click", () => execute(+node.dataset.i));
      });
    }

    function setSel(i) {
      const items = $$(".cmdk__item", list);
      if (!items.length) return;
      sel = (i + items.length) % items.length;
      items.forEach((n, idx) => n.setAttribute("aria-selected", String(idx === sel)));
      items[sel].scrollIntoView({ block: "nearest" });
    }
    function execute(i) {
      const cmd = filtered[i != null ? i : sel];
      if (!cmd) return;
      close();
      setTimeout(() => cmd.run(), 60);
    }

    input.addEventListener("input", () => renderList(input.value));
    overlay.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSel(sel + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSel(sel - 1); }
      else if (e.key === "Enter") { e.preventDefault(); execute(); }
      else if (e.key === "Escape") { e.preventDefault(); close(); }
    });
    $$("[data-cmdk-close]", overlay).forEach((n) => n.addEventListener("click", close));

    // Global open shortcuts
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        isOpen() ? close() : open();
      } else if (e.key === "/" && !isOpen() && !/input|textarea/i.test(document.activeElement.tagName)) {
        e.preventDefault();
        open();
      }
    });
    $("#cmdkTrigger").addEventListener("click", open);
    $("#heroCmdk").addEventListener("click", open);
  }

  /* =================== Project filter =============================== */
  function wireFilter() {
    const bar = bind("projectFilters");
    if (!bar) return;
    const cards = $$(".project, .more");
    const empty = $("#filterEmpty");
    const apply = (f) => {
      let shown = 0;
      cards.forEach((c) => {
        const tags = (c.dataset.tags || "").split("|");
        const show = f === "*" || tags.includes(f);
        c.classList.toggle("is-hidden", !show);
        if (show) shown++;
      });
      $$(".subhead").forEach((h) => (h.style.display = f === "*" ? "" : "none"));
      if (empty) empty.hidden = shown !== 0;
    };
    bar.addEventListener("click", (e) => {
      const chip = e.target.closest(".filterbar__chip");
      if (!chip) return;
      $$(".filterbar__chip", bar).forEach((c) => c.classList.remove("is-on"));
      chip.classList.add("is-on");
      apply(chip.dataset.filter);
    });
    const reset = $("#filterReset");
    if (reset) reset.addEventListener("click", () => {
      $$(".filterbar__chip", bar).forEach((c) => c.classList.toggle("is-on", c.dataset.filter === "*"));
      apply("*");
    });
  }

  /* =================== vCard + copy details ========================= */
  function buildVCard() {
    const m = C.meta;
    const v = (C.forRecruiters && C.forRecruiters.vcard) || {};
    const gh = (C.socials.find((s) => s.icon === "github") || {}).href || "";
    const li = (C.socials.find((s) => s.icon === "linkedin") || {}).href || "";
    const lines = [
      "BEGIN:VCARD", "VERSION:3.0",
      `N:${m.name.split(" ").slice(-1)[0]};${m.name.split(" ").slice(0, -1).join(" ")};;;`,
      `FN:${m.name}`,
      v.title ? `TITLE:${v.title}` : "",
      v.org ? `ORG:${v.org}` : "",
      `EMAIL;TYPE=INTERNET:${m.email}`,
      v.phone ? `TEL;TYPE=CELL:${v.phone}` : "",
      m.location ? `ADR;TYPE=HOME:;;${m.location};;;;` : "",
      li ? `URL:${li}` : "",
      gh ? `URL:${gh}` : "",
      "END:VCARD",
    ].filter(Boolean);
    return lines.join("\r\n");
  }
  function wireVCard() {
    const btn = $("#vcardBtn");
    if (btn) btn.addEventListener("click", () => {
      const blob = new Blob([buildVCard()], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);
      const a = el("a");
      a.href = url;
      a.download = C.meta.name.replace(/\s+/g, "_") + ".vcf";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      flash("Contact card downloaded ✓");
    });
    const copyBtn = $("#copyDetailsBtn");
    if (copyBtn) copyBtn.addEventListener("click", () => {
      const m = C.meta;
      const R = C.forRecruiters || { items: [] };
      const text =
        `${m.name} — ${m.role}\n${m.email}\n` +
        C.socials.filter((s) => s.icon !== "mail").map((s) => `${s.label}: ${s.href}`).join("\n") +
        "\n\n" + R.items.map((it) => `${it.label}: ${it.value}`).join("\n");
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => flash("Details copied ✓")).catch(() => {});
      else flash("Copy not supported here");
    });
  }

  /* =================== Live GitHub activity ========================= */
  // Shows an aggregate summary (repo count, languages, latest commit) rather
  // than re-listing the repos already written up in Projects.
  function wireGitHub() {
    const G = C.github;
    const wrap = $("#ghfeed");
    if (!G || !G.show || !wrap) {
      const s = document.getElementById("github");
      if (s && !(G && G.show)) s.remove();
      return;
    }
    const LANG_COLORS = {
      "Python": "#3572A5", "Jupyter Notebook": "#DA5B0B", "JavaScript": "#e0b93a",
      "TypeScript": "#3178c6", "HTML": "#e34c26", "CSS": "#563d7c", "Java": "#b07219",
      "C": "#8a8a8a", "C++": "#f34b7d", "Go": "#00ADD8", "R": "#276DC3", "Shell": "#89e051",
    };
    const fallback = ["#8aa4b0", "#b4926a", "#9c8aa5", "#7fa8a0", "#c0a15a"];
    const colorFor = (l, i) => LANG_COLORS[l] || fallback[i % fallback.length];
    const ago = (d) => {
      const days = Math.round((Date.now() - new Date(d)) / 864e5);
      if (days < 1) return "today";
      if (days < 30) return days + (days === 1 ? " day ago" : " days ago");
      if (days < 365) { const m = Math.round(days / 30); return m + (m === 1 ? " month ago" : " months ago"); }
      const y = Math.round(days / 365); return y + (y === 1 ? " year ago" : " years ago");
    };
    const profile = `https://github.com/${encodeURIComponent(G.user)}`;

    fetch(`https://api.github.com/users/${encodeURIComponent(G.user)}/repos?per_page=100&sort=pushed`)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((repos) => {
        if (!Array.isArray(repos)) throw new Error("bad response");
        const list = repos.filter((r) => !r.fork && !r.archived);
        if (!list.length) {
          wrap.innerHTML = `<div class="ghfeed__error">No public repositories yet — <a href="${esc(profile)}" target="_blank" rel="noopener">visit GitHub →</a></div>`;
          return;
        }
        const stars = list.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        const langs = {};
        list.forEach((r) => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1; });
        const langArr = Object.entries(langs).sort((a, b) => b[1] - a[1]);
        const totalLang = langArr.reduce((s, [, n]) => s + n, 0) || 1;
        const recent = list.slice().sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))[0];

        const tiles = [
          [String(list.length), "public repositories"],
          [String(langArr.length), langArr.length === 1 ? "language" : "languages"],
          [ago(recent.pushed_at), "last commit"],
        ];
        if (stars > 0) tiles.push([String(stars), stars === 1 ? "star" : "stars"]);

        const bar = langArr.map(([l], i) =>
          `<span style="width:${((langs[l] / totalLang) * 100).toFixed(1)}%;background:${colorFor(l, i)}" title="${esc(l)}"></span>`
        ).join("");
        const legend = langArr.slice(0, 6).map(([l, n], i) =>
          `<span class="ghleg"><span class="ghleg__dot" style="background:${colorFor(l, i)}"></span>${esc(l)} <b>${Math.round((n / totalLang) * 100)}%</b></span>`
        ).join("");

        const recentDesc = (recent.description || "").trim();
        wrap.innerHTML = `
          <div class="ghstats">
            ${tiles.map(([v, l]) => `<div class="ghstat"><div class="ghstat__num">${esc(v)}</div><div class="ghstat__lbl">${esc(l)}</div></div>`).join("")}
          </div>
          <div class="ghlangs">
            <div class="ghlangs__bar">${bar}</div>
            <div class="ghlangs__legend">${legend}</div>
          </div>
          <div class="ghlatest">
            <span>Most recent commit: <a href="${esc(recent.html_url)}" target="_blank" rel="noopener">${esc(recent.name)}</a>${recentDesc ? " — " + esc(recentDesc.slice(0, 90)) : ""}</span>
            <a class="btn btn--ghost btn--sm" href="${esc(profile)}" target="_blank" rel="noopener">All repositories →</a>
          </div>`;
      })
      .catch(() => {
        wrap.innerHTML = `<div class="ghfeed__error">Couldn't load live activity right now — <a href="${esc(profile)}" target="_blank" rel="noopener">browse GitHub →</a></div>`;
      });
  }

  /* =================== Interactive GPS-drift demo =================== */
  function wireDemo() {
    const svg = $("#demoSvg");
    if (!svg || !(C.demo && C.demo.show)) return;
    const NS = "http://www.w3.org/2000/svg";
    const W = 640, H = 360, N = 90;
    // True path: a smooth curve across the stage.
    const truePts = [];
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const x = 50 + t * 540;
      const y = 180 + Math.sin(t * Math.PI * 1.6) * 70 + Math.sin(t * Math.PI * 4) * 12;
      truePts.push([x, y]);
    }
    // Deterministic pseudo-noise so the drift looks organic but stable.
    const noise = [];
    let s = 7;
    for (let i = 0; i < N; i++) { s = (s * 9301 + 49297) % 233280; noise.push(s / 233280 - 0.5); }

    const outageStart = Math.round(N * 0.32); // GPS lost at ~1/3 in
    function build(durSec) {
      const drift = (durSec - 1) / 11;        // 0..1
      const bad = [], good = [];
      let cum = 0;
      for (let i = 0; i < N; i++) {
        const [x, y] = truePts[i];
        if (i < outageStart) { bad.push([x, y]); good.push([x, y]); continue; }
        const k = (i - outageStart) / (N - outageStart); // 0..1 into outage
        cum += noise[i];
        // dead-reckoning error grows super-linearly with time & outage length
        const err = drift * (18 + 150 * k * k);
        const bx = x + cum * 6 * drift;
        const by = y + err + cum * 4 * drift;
        bad.push([bx, by]);
        // Model keeps ~70% of the deviation → ~30% RMSE reduction, in line with
        // the ~28% improvement measured in my DRDO work (kept honest on purpose).
        good.push([x + (bx - x) * 0.70, y + (by - y) * 0.70]);
      }
      return { bad, good };
    }
    function rmse(pts) {
      let sum = 0, n = 0;
      for (let i = outageStart; i < N; i++) {
        const dx = pts[i][0] - truePts[i][0], dy = pts[i][1] - truePts[i][1];
        sum += dx * dx + dy * dy; n++;
      }
      return Math.sqrt(sum / n);
    }
    const toPath = (pts) => "M" + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L");
    function line(cls, d, dash) {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", d); p.setAttribute("fill", "none");
      p.setAttribute("class", cls); if (dash) p.setAttribute("stroke-dasharray", dash);
      return p;
    }
    const cssVar = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

    function draw(durSec) {
      const { bad, good } = build(durSec);
      svg.innerHTML = "";
      // outage region marker
      const zx = truePts[outageStart][0];
      const rect = document.createElementNS(NS, "rect");
      rect.setAttribute("x", zx); rect.setAttribute("y", 8);
      rect.setAttribute("width", 590 - zx); rect.setAttribute("height", H - 16);
      rect.setAttribute("fill", cssVar("--accent-soft")); rect.setAttribute("rx", 8);
      svg.appendChild(rect);
      const lbl = document.createElementNS(NS, "text");
      lbl.setAttribute("x", zx + 8); lbl.setAttribute("y", 26);
      lbl.setAttribute("fill", cssVar("--text-3")); lbl.setAttribute("font-size", "11");
      lbl.setAttribute("font-family", "monospace"); lbl.textContent = "GPS outage";
      svg.appendChild(lbl);

      const trueEl = line("", toPath(truePts)); trueEl.setAttribute("stroke", cssVar("--text-3")); trueEl.setAttribute("stroke-width", "2.5"); trueEl.setAttribute("stroke-dasharray", "2 5"); svg.appendChild(trueEl);
      const badEl = line("", toPath(bad)); badEl.setAttribute("stroke", "#ef6a54"); badEl.setAttribute("stroke-width", "2.5"); svg.appendChild(badEl);
      const goodEl = line("", toPath(good)); goodEl.setAttribute("stroke", cssVar("--accent")); goodEl.setAttribute("stroke-width", "3"); svg.appendChild(goodEl);
      // endpoint dots
      [[bad[N - 1], "#ef6a54"], [good[N - 1], cssVar("--accent")]].forEach(([pt, col]) => {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", pt[0]); c.setAttribute("cy", pt[1]); c.setAttribute("r", 4.5); c.setAttribute("fill", col);
        svg.appendChild(c);
      });

      const rb = rmse(bad), rg = rmse(good);
      const scale = 0.42; // px → "meters" for a believable readout
      $("#demoRmseBad").textContent = (rb * scale).toFixed(1) + " m";
      $("#demoRmseGood").textContent = (rg * scale).toFixed(1) + " m";
      const cut = rb > 0 ? Math.round((1 - rg / rb) * 100) : 0;
      $("#demoDelta").innerHTML = `Model cuts drift error by <b>~${cut}%</b> across the outage.`;
      $("#demoDur").textContent = durSec.toFixed(1) + " s";
    }

    const slider = $("#demoSlider");
    draw(parseFloat(slider.value));
    slider.addEventListener("input", () => draw(parseFloat(slider.value)));
    // redraw on theme change so colors track the scheme
    $("#themeToggle").addEventListener("click", () => setTimeout(() => draw(parseFloat(slider.value)), 0));
  }

  /* =================== Open external links in a new tab ============== */
  // Any http(s) link opens in a new tab (so visitors never leave the page).
  // Internal #anchors and mailto: links are left alone.
  function externalizeLinks(root) {
    $$("a[href]", root || document).forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (/^https?:\/\//i.test(href)) {
        a.target = "_blank";
        a.rel = a.rel && /noopener/.test(a.rel) ? a.rel : "noopener noreferrer";
      }
    });
  }

  /* ============================ BOOT ================================== */
  document.addEventListener("DOMContentLoaded", () => {
    if (!C) { console.error("content.js not loaded"); return; }
    render();
    wireProjects();
    wireReveal();
    wireNav();
    wireTheme();
    wireCmdk();
    wireResume();
    wireCopyEmail();
    wireMailtoCopy();
    wireScrollSpy();
    wireFilter();
    wireVCard();
    wireGitHub();
    wireDemo();
    externalizeLinks(); // all http(s) links open in a new tab
  });
})();
