# AGENTS.md — Portfolio

**Static personal portfolio site.** Vanilla HTML/CSS/JS — no build tools, no framework, no dependency management.

## Structure

- `index.html` — single-page app with tabbed sections (About, Resume, Client Work, AI Lab, Blog, Certifications, Contact)
- `assets/css/style.css` — all styles (~36 KB)
- `assets/js/script.js` — all JS (~11 KB), uses `data-*` attributes for DOM binding
- `assets/images/` — static image assets

## Conventions

- DOM selection uses `data-*` attributes (`[data-sidebar]`, `[data-nav-link]`, `[data-page]`, etc.)
- Tab navigation: `data-nav-link` buttons toggle `active` class on matching `data-page` articles
- The `downloadResume()` function is defined in `script.js` and called from an `onclick` attribute in `index.html`
- External dependencies loaded via CDN: Google Fonts (Playfair Display, Poppins), Ionicons 5.5.2
- Contact form posts to [formsubmit.co](https://formsubmit.co) — no backend required

## Deployment

No build step. Open `index.html` directly in a browser or serve with any static file server.

## Testing

No test suite. No linter, formatter, or type checker config.
