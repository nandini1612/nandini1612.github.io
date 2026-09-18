# Nandini Saxena — Portfolio

A fast, single-page portfolio with a **⌘K / Ctrl+K command palette** for instant navigation.
No build step, no framework — just open it, and edit one file to update everything.

---

## How to view it

**Simplest:** double-click `index.html` — it opens in your browser.

The command palette, theme toggle, and project cards all work from the local file.

---

## How to edit your content

**Everything lives in one file: [`content.js`](content.js).**

Open it in any text editor (Notepad, VS Code…). It's plain, commented, and grouped
by section. Change the text between the quotes, save, and refresh the browser.

Common edits:

| Want to change…            | Edit this in `content.js`         |
|----------------------------|-----------------------------------|
| Name / tagline / role      | `meta`                            |
| The green "open to…" pill  | `meta.availability`               |
| GitHub / LinkedIn / etc.   | `socials`                         |
| About paragraphs & stats   | `about`                           |
| Jobs & internships         | `experience`                      |
| Projects (featured + more) | `projects`                        |
| Skill chips                | `skills`                          |
| Medium posts               | `writing`                         |
| Leadership / personal      | `beyond`                          |

**Add a project:** copy an existing `{ ... }` block inside `projects.featured`
(or `projects.more`), paste it, and change the values. Keep the commas.

**Link a real repo:** each project's `links` currently points to your GitHub
profile. Replace the `href` with the exact repo URL when you have it, e.g.
`"https://github.com/nandini1612/GateIO"`.

**Update your résumé:** the "View résumé" button opens an **in-page preview**
with tabs for multiple formats (Standard, Europass, Indian, US). Each is shown
as an image so it renders in every browser, even ones that auto-download PDFs,
with Download + Open-in-new-tab buttons.

Formats live in `content.js → meta.resumes`. Each entry is:

```js
{ id: "standard", label: "Standard", url: "resume.pdf", preview: ["resume-preview.png"] }
```

- **`url`** — the PDF that Open/Download point to (a local file, or a Google
  Drive link). Leave it `""` for a format you haven't made yet; the viewer shows
  a short "not added" note so you can drop the PDF in later.
- **`preview`** — the image page(s) shown inline (one per résumé page).

To add or change a format:
1. Put the PDF in this folder (e.g. `resume-us.pdf`).
2. Generate its preview image(s) — needs Python + `pip install pymupdf`:

   ```bash
   python make_resume_preview.py resume-us.pdf
   ```

   It writes `resume-us.png` (or `-1.png`, `-2.png`… for multi-page CVs).
3. Point that format's `url` and `preview` at the new files in `content.js`.

No Python? Export each page as a PNG/JPG any way you like, drop them in this
folder, and list them in `preview`.

---

## Recolor the whole site

The palette is **Butter · Azure · Espresso** (cream `#FEF0B6`, azure `#BBD3E0`,
espresso `#472F26`). It's defined at the very top of [`styles.css`](styles.css)
in two blocks:

- `:root { … }` — **dark mode** (espresso background, azure accents)
- `:root[data-theme="light"] { … }` — **light mode** (cream background, espresso text)

To shift the whole site, edit `--accent` (main brand color), `--accent-2`
(secondary), `--accent-ink` (text that sits on top of accent buttons), and the
`--bg` / `--surface` / `--text` neutrals in each block. Dark is the default; the
sun/moon button toggles light, and each visitor's choice is remembered.

---

## Publish it online (free)

The site is fully static, so any static host works. Easiest options:

- **GitHub Pages** — push this folder to a repo, then Settings → Pages → deploy from `main`.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop this folder onto their dashboard.

Once live, add the URL to your LinkedIn, résumé, and GitHub profile.

---

## Files

```
index.html    structure (sections + placeholders)
styles.css    all styling + light/dark themes
content.js    ← YOUR CONTENT. edit this.
main.js       renders the page + command palette (no need to touch)
resume.pdf    your résumé (linked from the hero)
```
