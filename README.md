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

- [ ] Real name, role, company, location (currently placeholders)
- [ ] `assets/portrait.jpg` — then swap the placeholder div in the Contact section
- [ ] LinkedIn URL (Contact section and `cv/index.html`)
- [ ] Phone number, degree, certifications in `cv/index.html`
- [ ] Real case studies — the three present are structural examples
- [ ] Notes section — currently three placeholder cards
- [ ] Regenerate `assets/og-cover.png` once the name and tagline are final
