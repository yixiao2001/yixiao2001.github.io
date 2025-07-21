# Yi Xiao - Personal Academic Homepage

A modern personal academic homepage with responsive design and dynamic content management.

## Features

- **Modern Design**: Clean green theme with professional typography
- **Responsive Layout**: Adapts to various device screens
- **Dynamic Content**: All content managed through configuration files
- **BibTeX Support**: Display and copy paper citations
- **Smooth Animations**: Elegant page interaction effects

## File Structure

- `index.html` - Main page structure
- `styles.css` - Stylesheets
- `script.js` - JavaScript functionality
- `config.js` - Website configuration data
- `profile.jpg` - Personal avatar
- `README.md` - Documentation

## Usage

### 1. Direct Use
Double-click the `index.html` file to open the website in your browser.

### 2. Update Content
Simply edit the data in the `config.js` file:

```javascript
const siteConfig = {
  "personal": {
    "name": "Your Name",
    "title": "Your Position",
    ...
  },
  "publications": [...],
  "experience": [...],
  ...
};
```

### 3. Supported Content Types

- **Personal Information**: Name, title, email, links
- **About**: Introduction paragraphs
- **Publications**: With BibTeX citation support
- **Experience**: Internships, work experience
- **Education**: Academic background
- **Services**: Reviews, conference participation
- **Awards**: Awards and honors

## Adding New Publications

Add new entries to the `publications` array in `config.js`:

```javascript
{
  "year": "2025",
  "title": "Your Paper Title",
  "authors": "<strong>Yi Xiao</strong>, Collaborator Names",
  "venue": "Conference or Journal Name",
  "links": [
    {"name": "PDF", "url": "paper_link"},
    {"name": "Code", "url": "code_link"}
  ],
  "bibtex": "@inproceedings{citation_key,\n  author = {Authors},\n  title = {Title},\n  ...\n}"
}
```

## Theme Customization

To change theme colors, edit the `:root` variables in the `styles.css` file:

```css
:root {
    --primary-color: #2d5a27;  /* Primary color */
    --accent-color: #4a7c59;   /* Accent color */
    --text-color: #333;        /* Text color */
    ...
}
```

## Deployment

Upload all files to your web server. Supports:
- GitHub Pages
- Netlify
- Vercel
- Any static website hosting service

## Technology Stack

- HTML5
- CSS3 (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts

## Browser Compatibility

Supports all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
