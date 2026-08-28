# ameerafi.github.io

Personal portfolio — vanilla HTML, CSS and JavaScript. No framework, no build step, no dependencies.
Edit a file, push, it's live.

**Live:** https://ameerafi.github.io/

---

## Files

```
index.html            the whole page
css/style.css         all styling — design tokens at the top
js/main.js            theme toggle, smooth scroll, nav state
cv/index.html         source for the resume PDF, print-styled to A4
assets/Ameer-Salman-CV.pdf   the downloadable resume
assets/portrait.jpg   hero avatar
assets/og-cover.png   social preview card (1200×630)
.github/workflows/    auto-deploy on push to main
```

## Run it locally

```bash
./serve.sh          # then open http://localhost:8000
```

## Deploy

Create a GitHub repo named exactly `ameerafi.github.io`, then:

```bash
git remote add origin git@github.com:ameerafi/ameerafi.github.io.git
git push -u origin main
```

In the repo: **Settings → Pages → Source → GitHub Actions**. Every push to `main` redeploys in about
a minute.

## Design

Full-width editorial grid. Shell caps at **1240px** with fluid padding; sections use asymmetric
grids rather than one narrow ribbon.

- **Hero** — tight single block: small circular avatar inline with the name, then headline,
  context line, bio and links. A soft accent glow sits behind.
- **Section heads** — number, title and a right-aligned note on one full-width baseline rule.
- **Featured Work** — 2×2 card grid; cards lift and take an accent border on hover.
- **Experience** — sticky left column (company, dates, role pill) against a wide bullet column.
- **Skills** — auto-fit grid of grouped pill sets, hairline-divided, with Education as the last cell.
- **Contact** — full-bleed band, oversized headline left, hover-indented link rows right.

**Type** — Inter for structure, JetBrains Mono for tags, metrics, dates and labels.

**Colour** — one indigo accent for links, active nav, role pills and metric callouts. Everything
else neutral slate.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#ffffff` | `#0b0f19` |
| `--surface` | `#f8fafc` | `#0f1524` |
| `--text` | `#0f172a` | `#f3f4f6` |
| `--muted` | `#52607a` | `#9ca3af` |
| `--border` | `#e3e8ef` | `#1f2937` |
| `--accent` | `#4f46e5` | `#818cf8` |

Theme follows the system setting and can be toggled; the choice persists in `localStorage`, applied
by an inline `<head>` script before first paint so there is no flash.

## Sections

Hero → Featured Projects & Frameworks → Work Experience → Technical Skills → Education → Contact.

## Regenerating the resume PDF

`cv/index.html` is the source. With the local server running:

```bash
python3 - <<'PY'
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    pg.goto("http://localhost:8000/cv/index.html", wait_until="load"); pg.wait_for_timeout(1500)
    pg.pdf(path="assets/Ameer-Salman-CV.pdf", format="A4", print_background=True,
           margin={"top":"11mm","bottom":"11mm","left":"12mm","right":"12mm"})
    b.close()
PY
```

## Still to fill in

- [ ] **LinkedIn URL** — three places: hero quick links, footer, and `cv/index.html`
- [ ] Certifications in `cv/index.html`, if any

## Content decisions on record

- **Customer names are withheld**, and no industry is named either.
- **No internal references** — no issue numbers, internal tool names, or org-internal vocabulary.
- **Dates** — Amazon Oct 2017 – Jul 2024, Databricks Jul 2024 – present. Confirmed directly; the
  source content files in `~/Desktop/career/` have stale template dates.
- **$20B+ audit exceptions is USD**, confirmed. Note that `Amazon DE Contents.md` says
  "₹20+ Billion (~$240M+)" — an ~83× difference. Be ready to explain scope and period.
- **48h → 15m** is the SLA figure used throughout. The Amazon promotion document states the same
  achievement as 36–40h → 30m. Both are ~99%; stay consistent.

## Source material

`~/Desktop/career/` holds the resume drafts, the consolidated content files, the full Amazon career
summary, the metric ledger, and `Ameer-Salman-Resume.md`.
