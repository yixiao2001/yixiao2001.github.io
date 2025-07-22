// Data loading and rendering
let siteData = {};

// Load configuration data
async function loadSiteData() {
    // Directly use siteConfig variable from config.js
    siteData = siteConfig;
    renderSite();
}

// Render the entire site
function renderSite() {
    renderPersonal();
    renderAbout();
    renderPublications();
    renderExperience();
    renderEducation();
    renderServices();
    renderAwards();
}

// Render personal information
function renderPersonal() {
    const personal = siteData.personal;
    
    // Update hero section
    document.querySelector('.hero-title').textContent = personal.name;
    document.querySelector('.hero-subtitle').textContent = `${personal.title}, ${personal.affiliation}`;
    document.querySelector('.hero-description').innerHTML = personal.research_interests.join(' • ');
    
    // Update contact info
    const contactInfo = document.querySelector('.contact-info');
    contactInfo.innerHTML = `
        <span class="contact-link">
            <i class="fas fa-envelope"></i>
            <span>${personal.email}</span>
        </span>
        <span class="contact-separator">•</span>
        ${personal.links.map(link => `
            <a href="${link.url}" class="contact-link" target="_blank">
                <i class="${link.icon}"></i>
                <span>${link.name}</span>
            </a>
        `).join('<span class="contact-separator">•</span>')}
    `;
}

// Render about section
function renderAbout() {
    const aboutText = document.querySelector('.about-text');
    aboutText.innerHTML = siteData.about.map(paragraph => `<p>${paragraph.text}</p>`).join('');
}

// Render publications
function renderPublications() {
    const publicationsList = document.querySelector('.publications-list');
    publicationsList.innerHTML = siteData.publications.map((pub, index) => `
        <div class="publication-item item">
            <div class="pub-year">${pub.year}</div>
            <div class="pub-content">
                <h4 class="pub-title">${pub.title}</h4>
                <p class="pub-authors">${pub.authors}</p>
                <p class="pub-venue">${pub.venue}</p>
                <div class="pub-links">
                    ${pub.links.map(link => `<a href="${link.url}" class="pub-link">${link.name}</a>`).join('')}
                    <button class="pub-link cite-btn" onclick="toggleCitation('citation-${pub.year}-${index}')">Citation</button>
                </div>
                <div class="citation-block" id="citation-${pub.year}-${index}">
                    <div class="citation-header">
                        <span>BibTeX</span>
                        <button class="copy-btn" onclick="copyCitation('citation-${pub.year}-${index}')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <pre class="citation-code">${pub.bibtex}</pre>
                </div>
            </div>
        </div>
    `).join('');
}

// Render experience
function renderExperience() {
    const experienceList = document.querySelector('.experience-list');
    experienceList.innerHTML = siteData.experience.map(exp => `
        <div class="experience-item item">
            <div class="exp-period">${exp.period}</div>
            <div class="exp-content">
                <h3>${exp.position}</h3>
                <h4>${exp.organization}</h4>
                ${exp.description ? `<p>${exp.description}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Render education
function renderEducation() {
    const educationList = document.querySelector('.education-list');
    educationList.innerHTML = siteData.education.map(edu => `
        <div class="education-item item">
            <div class="edu-period">${edu.period}</div>
            <div class="edu-content">
                <h3>${edu.degree}</h3>
                <h4>${edu.institution}</h4>
                ${edu.description ? `<p>${edu.description}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Render services
function renderServices() {
    const servicesContent = document.querySelector('.services-content');
    servicesContent.innerHTML = siteData.services.map(service => `
        <div class="service-category">
            <h3>${service.category}</h3>
            <ul>
                ${service.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Render awards
function renderAwards() {
    const awardsList = document.querySelector('.awards-list');
    awardsList.innerHTML = siteData.awards.map(award => `
        <div class="award-item item">
            <div class="award-year">${award.year}</div>
            <div class="award-content">
                <h3>${award.title}</h3>
                <h4>${award.organization}</h4>
            </div>
        </div>
    `).join('');
}

// Mobile navigation menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Load site data first
    loadSiteData();

    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
});

// Citation functionality
function toggleCitation(citationId) {
    const citationBlock = document.getElementById(citationId);
    const isVisible = citationBlock.style.display === 'block';
    
    // Hide all other citation blocks
    document.querySelectorAll('.citation-block').forEach(block => {
        block.style.display = 'none';
    });
    
    // Toggle current citation block
    citationBlock.style.display = isVisible ? 'none' : 'block';
}

function copyCitation(citationId) {
    const citationBlock = document.getElementById(citationId);
    const codeText = citationBlock.querySelector('.citation-code').textContent;
    
    navigator.clipboard.writeText(codeText).then(function() {
        // Show feedback
        const copyBtn = citationBlock.querySelector('.copy-btn');
        const originalContent = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.color = 'var(--primary-color)';
        
        setTimeout(function() {
            copyBtn.innerHTML = originalContent;
            copyBtn.style.color = '';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy citation: ', err);
    });
}

// Smooth scroll to specific sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Visitor tracking and analytics
class VisitorTracker {
    constructor() {
        this.apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        this.init();
    }

    init() {
        this.trackVisitor();
        this.loadVisitorStats();
    }

    // Track current visitor
    async trackVisitor() {
        try {
            // Get visitor IP and location info
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            // Store visitor data (you can send this to your analytics service)
            this.storeVisitorData({
                ip: data.ip,
                country: data.country_name,
                city: data.city,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: document.referrer
            });
        } catch (error) {
            console.log('Visitor tracking failed:', error);
        }
    }

    // Store visitor data (implement your storage method)
    storeVisitorData(data) {
        // Option 1: Send to your backend API
        // fetch('/api/visitors', { method: 'POST', body: JSON.stringify(data) });
        
        // Option 2: Store in localStorage for demo purposes
        let visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
        visitors.push(data);
        localStorage.setItem('visitors', JSON.stringify(visitors));
        
        this.updateStats();
    }

    // Load and display visitor statistics
    loadVisitorStats() {
        // You can implement this to load stats from your backend
        // For demo, we'll use localStorage
        this.updateStats();
    }

    updateStats() {
        const visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
        const totalVisits = visitors.length;
        const uniqueCountries = new Set(visitors.map(v => v.country)).size;

        document.getElementById('visitor-count').textContent = totalVisits.toLocaleString();
        document.getElementById('visitor-countries').textContent = uniqueCountries;
    }

    // Method to get visitor map data
    getVisitorMapData() {
        const visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
        const countryStats = {};
        
        visitors.forEach(visitor => {
            if (visitor.country) {
                countryStats[visitor.country] = (countryStats[visitor.country] || 0) + 1;
            }
        });
        
        return countryStats;
    }
}

// Initialize visitor tracking when page loads
document.addEventListener('DOMContentLoaded', () => {
    new VisitorTracker();
});
