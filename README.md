# Yi Xiao - Personal Academic Homepage

A modern personal academic homepage with responsive design, dynamic content management, and real-time visitor analytics.

## Features

- **Refined Academic Design**: Clean light theme with a blue accent, profile photo, research-interest tags, and numbered sections
- **Responsive Layout**: Adapts to desktop, tablet, and mobile screens
- **Dynamic Content**: All content managed through `config.js`
- **Publications**: Venue / CCF / method badges, descriptions, DOI & code links, BibTeX copy support
- **Open Source Projects**: LogIntelligence organization project showcase
- **Visitor Analytics**: Global visit counters (total / today / last-7-days chart) powered by counterapi.dev
- **Smooth Interactions**: Scroll-reveal animations and scroll-spy navigation

## File Structure

- `index.html` - Main page structure
- `styles.css` - Stylesheets
- `script.js` - Rendering and interaction logic
- `analytics.html` / `analytics.js` - Visitor analytics dashboard
- `config.js` - Website configuration data
- `profile.jpg` - Personal avatar
- `README.md` - Documentation

## Usage

### 1. Update Content

Edit the data in `config.js`:

```javascript
const siteConfig = {
  "personal": { "name": "Your Name", ... },
  "about": [...],
  "publications": [...],
  "projects": {...},
  "experience": [...],
  "services": [...],
  "awards": [...]
};
```

### 2. Supported Content Types

- **Personal Information**: Name, title, email, links, research interests
- **About**: Introduction paragraphs
- **Publications**: Venue short name, CCF rank, method name, description, links, BibTeX
- **Projects**: GitHub organization and repository cards
- **Experience / Services / Awards**

### 3. Adding a New Publication

```javascript
{
  "year": "2026",
  "title": "Your Paper Title",
  "authors": "<strong>Yi Xiao</strong>, Collaborator Names",
  "venue": "Full venue name",
  "venue_short": "ICSE 2026",
  "ccf": "CCF A",
  "method": "MethodName",
  "description": "One-sentence summary.",
  "links": [
    {"name": "DOI", "url": "..."},
    {"name": "Code", "url": "..."}
  ],
  "bibtex": "@inproceedings{key,\n  ...\n}"
}
```

## Visitor Analytics

- Counts are stored in the public `yixiao-homepage` namespace on [counterapi.dev](https://counterapi.dev) — no signup required.
- The homepage increments a total counter (`main`) and a per-day counter (`d-YYYY-MM-DD`) once per browser session.
- `analytics.html` reads these counters (read-only) and renders totals plus a 7-day chart.
- Detailed reports (geography, sources, devices) are available in Google Analytics.

## Theme Customization

Edit the `:root` variables in `styles.css`:

```css
:root {
    --accent: #2563eb;       /* Primary accent */
    --bg: #f7f8fa;           /* Page background */
    --ink: #1a1d23;          /* Main text color */
    ...
}
```

## Deployment

Static site — upload all files to GitHub Pages, Netlify, Vercel, or any static hosting service.

## Technology Stack

- HTML5 / CSS3 (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (IntersectionObserver, fetch)
- Geist font family (Google Fonts)
- counterapi.dev for visitor counters
