# ameerafi.github.io

Personal profile site — vanilla HTML, CSS and JavaScript. No framework, no build step,
no dependencies. Edit a file, push, it's live.

**Live:** https://ameerafi.github.io/

---

## Files

```
index.html            the whole page
css/style.css         all styling (design tokens at the top)
js/main.js            theme toggle, rail nav, tabs, pipeline
cv/index.html         standalone CV, print-styled to A4
assets/og-cover.png   social preview card (1200×630)
assets/portrait.jpg   your photo — not added yet
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

In the repo: **Settings → Pages → Source → GitHub Actions**. Every push to `main`
redeploys in about a minute.

## The design, briefly

The site is built out of one idea: a data pipeline.

- **Ingest → Model → Serve → Observe** is the animated diagram in the hero.
- The same four stages group the Toolkit section, so skills are organised by where
  they sit in the flow rather than alphabetically.
- The left rail is that pipeline again — your scroll position is the packet moving
  through it.

Two accent colours, each with a fixed meaning. Never swap them:

| Token      | Colour     | Means                                  |
|------------|------------|----------------------------------------|
| `--signal` | teal       | the machine side — data, tech, flow     |
| `--pulse`  | amber      | the human side — outcomes, impact, you  |

Type: **Archivo** for display (industrial, tightly tracked), **IBM Plex Sans** for
body, **IBM Plex Mono** for anything that is data — dates, metrics, labels, tags.

## Changing things

**Colours** — every value is a CSS custom property at the top of `css/style.css`,
in `:root` (dark) and `[data-theme="light"]`. Change them there and nowhere else.

**A new case study** — copy an existing `<article class="case">` block in
`index.html`, give it a new `id`, and add a matching `<button class="tab">`. The
JavaScript wires itself up automatically.

**The hero pipeline text** — the `COPY` object at the top of the pipeline section
in `js/main.js`.

## Still to fill in

- [x] Amazon and Databricks content, five case studies, CV, PDF
- [ ] `assets/portrait.jpg` — then add `<img class="portrait" src="assets/portrait.jpg" alt="Ameer Salman">`
      as the first child of `.contact-lead` in the Contact section
- [ ] LinkedIn — add a `.crow` row in Contact and a line in `cv/index.html`
- [ ] City instead of "India" (topbar, fact bar, CV) — recruiters filter by city
- [ ] Phone and certifications in `cv/index.html`
- [ ] Confirm exact job title: "Forward Deployed Engineer" is used throughout
- [ ] Notes/writing section — removed; restore from commit `1f68066` when a piece exists

## Content decisions on record

- **Customer names are withheld entirely**, and no industry is named either. The source docs name real
  accounts; those are confidential engagement details. The site says "an enterprise customer" throughout.
- **No internal references.** No PR or issue numbers, no internal tool names, no org-internal vocabulary
  ("field org", "field-managed"). Line-count metrics were dropped too — they carry little signal.
- **Figures are relative, not absolute, for the Amazon exception amounts.** Source numbers live in
  `~/Desktop/career/contribution-metrics.md`. Databricks figures ($180K, 8.1x, 10.19x) are stated directly
  since they are engagement outcomes rather than customer financials.
- **Internal system names generalised.** Translation table in
  `~/Desktop/career/amazon-career-summary.md` §9.
- **The SLA figure is the manager-attested one** — 36–40 hours to 30 minutes, from the promotion document,
  not the 48h to 15min version on an older resume.

## Type scale

Seven fixed steps plus four fluid ones. Stay on it.

| Size | Used for |
|---|---|
| 11.5px | chips, tab metrics |
| 12px | mono labels, eyebrows, section tags |
| 13.5px | metric labels |
| 15.5px | body copy, fact values, list items |
| 17px | section and case ledes, contact values |
| 21px | tenet and role headings |
| 23px | hero lede |
| fluid | case title, metric value, section title, display name |
