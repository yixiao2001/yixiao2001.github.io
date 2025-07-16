# Yi Xiao - Academic Homepage

A clean, modern academic homepage for Yi Xiao, Master student. This template provides a professional presentation of academic achievements, experience, and research.

## Features

- 🎨 Clean and professional design
- 📱 Fully responsive layout
- ⚡ Fast loading static pages
- 🔗 Smooth navigation
- 📊 Organized content sections
- 🌟 Hover effects and animations
- 🎯 Academic-focused layout

## Page Sections

1. **Home** - Personal introduction with name and title
2. **About Me** - Brief personal and academic description
3. **Publications** - List of academic papers and research
4. **Experience** - Professional and research experience
5. **Education** - Academic background and degrees
6. **Services** - Academic service activities and reviews
7. **Awards** - Recognition and achievements
8. **Contact Me** - Contact information and academic profiles

## File Structure

```
pages/
├── index.html          # Main page
├── styles.css          # Stylesheet
├── script.js          # JavaScript functionality
├── profile.jpg        # Profile photo placeholder
└── README.md          # Documentation
```

## Quick Start

1. Open `index.html` in your browser to preview the site
2. Customize the content according to your information
3. Replace the profile photo with your own image
4. Update contact information and links

## Customization Guide

### 1. Personal Information

Update the following in `index.html`:

- **Name**: Replace "Yi Xiao" with your name
- **Title**: Change "Master Student" to your current position
- **Institution**: Update university and department information
- **Research Interests**: Modify the research areas

### 2. About Section

Edit the personal description in the About Me section to reflect your background and current research focus.

### 3. Publications

Add your publications in the Publications section:

```html
<div class="publication-item">
    <div class="pub-year">Year</div>
    <div class="pub-content">
        <h4 class="pub-title">Paper Title</h4>
        <p class="pub-authors">Author List</p>
        <p class="pub-venue">Conference/Journal Name</p>
        <div class="pub-links">
            <a href="link" class="pub-link">PDF</a>
            <a href="link" class="pub-link">Code</a>
        </div>
    </div>
</div>
```

### 4. Experience

Update your professional experience:

```html
<div class="experience-item">
    <div class="exp-period">Date Range</div>
    <div class="exp-content">
        <h3>Position Title</h3>
        <h4>Institution/Company</h4>
        <p>Description of responsibilities and achievements</p>
    </div>
</div>
```

### 5. Education

Modify your educational background:

```html
<div class="education-item">
    <div class="edu-period">Date Range</div>
    <div class="edu-content">
        <h3>Degree</h3>
        <h4>University</h4>
        <p>Additional information (GPA, honors, etc.)</p>
    </div>
</div>
```

### 6. Services and Awards

Update the Services and Awards sections with your own academic service activities and recognitions.

### 7. Contact Information

Modify the contact details in the Contact Me section:

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <h4>Email</h4>
        <p>your.email@university.edu</p>
    </div>
</div>
```

Update social media and academic profile links as needed.

## Color Theme Customization

Modify color variables in the `:root` section of `styles.css`:

```css
:root {
    --primary-color: #2563eb;    /* Primary color */
    --secondary-color: #1e40af;  /* Secondary color */
    --accent-color: #3b82f6;     /* Accent color */
    --text-primary: #1f2937;     /* Primary text color */
    --text-secondary: #6b7280;   /* Secondary text color */
    /* Other color variables... */
}
```

## Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select main branch as source

### Netlify
1. Drag folder to Netlify deployment interface
2. Or connect GitHub repository for automatic deployment

### Traditional Hosting
1. Upload all files to website root directory
2. Ensure `index.html` is in the root directory

## Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

This template can be freely used and modified for academic purposes.

---

**Note**: This is a simplified academic homepage template designed specifically for Yi Xiao. Customize the content to match your personal academic profile and achievements.
