// Data loading and rendering
let siteData = {};

// SVG icon definitions for contact links
const SVG_ICONS = {
    'Email': '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M1.5 3.5L7 8L12.5 3.5" stroke="currentColor" stroke-width="1.2"/></svg>',
    'Google Scholar': '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M4.5 5.5l2.5-2 2.5 2" stroke="currentColor" stroke-width="1.2"/><path d="M5.5 5.5v3l1.5 1 1.5-1v-3" stroke="currentColor" stroke-width="1.2"/></svg>',
    'GitHub': '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 0C3.13 0 0 3.13 0 7c0 3.09 2 5.71 4.78 6.63.35.07.48-.15.48-.33 0-.17-.01-.71-.01-1.29-1.74.38-2.2-.75-2.2-.75-.28-.72-.69-.91-.69-.91-.57-.39.04-.38.04-.38.63.05.96.65.96.65.56.96 1.47.68 1.83.52.06-.41.22-.68.4-.84-1.4-.16-2.87-.7-2.87-3.12 0-.69.24-1.25.64-1.69-.06-.16-.28-.8.06-1.66 0 0 .52-.17 1.71.64A5.96 5.96 0 017 3.38c.53.01 1.06.07 1.56.21 1.19-.81 1.71-.64 1.71-.64.34.86.12 1.5.06 1.66.4.44.64 1 .64 1.69 0 2.42-1.47 2.96-2.87 3.12.23.2.43.58.43 1.17 0 .85-.01 1.53-.01 1.74 0 .19.13.4.49.33A7.016 7.016 0 0014 7c0-3.87-3.13-7-7-7z"/></svg>',
    'ORCID': '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2"/><circle cx="7" cy="5" r="2" stroke="currentColor" stroke-width="1.2"/><path d="M2.5 12c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke="currentColor" stroke-width="1.2"/></svg>',
    'DBLP': '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l5 6-5 6-5-6 5-6z" stroke="currentColor" stroke-width="1.2"/></svg>',
    'LinkedIn': '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M4 6v4" stroke="currentColor" stroke-width="1.2"/><circle cx="4" cy="4" r="0.5" fill="currentColor"/><path d="M6 6v4" stroke="currentColor" stroke-width="1.2"/><path d="M6 7.5c0-1 0.67-1.5 1.5-1.5s1.5 0.5 1.5 1.5V10" stroke="currentColor" stroke-width="1.2"/></svg>'
};

// Load configuration data
function loadSiteData() {
    siteData = siteConfig;
    renderSite();
}

// Render the entire site
function renderSite() {
    renderPersonal();
    renderAbout();
    renderPublications();
    renderExperience();
    renderServices();
    renderAwards();
    initReveal();
    initScrollSpy();
}

// Copy email to clipboard and show inline toast
function copyEmail(email, el) {
    navigator.clipboard.writeText(email).then(function() {
        var toast = el.querySelector('.toast-email');
        if (!toast) {
            toast = document.createElement('span');
            toast.className = 'toast-email';
            toast.textContent = 'Copied!';
            el.appendChild(toast);
        }
        toast.classList.remove('toast-email-exit');
        toast.classList.add('toast-email-show');
        setTimeout(function() {
            toast.classList.remove('toast-email-show');
            toast.classList.add('toast-email-exit');
        }, 1200);
    }).catch(function(err) {
        console.error('Copy failed: ', err);
    });
}

// Render personal information
function renderPersonal() {
    const personal = siteData.personal;

    document.querySelector('.hero-title').textContent = personal.name;
    document.querySelector('.hero-subtitle').textContent = `${personal.title}, ${personal.affiliation}`;

    // Research interest tags
    document.getElementById('hero-tags').innerHTML = personal.research_interests
        .map(tag => `<span class="tag">${tag}</span>`).join('');

    // Contact links with SVG icons
    const contactInfo = document.getElementById('contact-info');
    const icon = (name) => SVG_ICONS[name] || '';
    const allLinks = [
        { name: 'Email', url: `mailto:${personal.email}` },
        ...personal.links
    ];
    contactInfo.innerHTML = allLinks.map(link => {
        const isEmail = link.name === 'Email';
        return isEmail ? `
        <span class="contact-link contact-link-email" onclick="copyEmail('${personal.email}', this)" title="${personal.email}">
            ${icon(link.name)}
            <span>${link.name}</span>
        </span>
        ` : `
        <a href="${link.url}" class="contact-link" target="_blank" rel="noopener">
            ${icon(link.name)}
            <span>${link.name}</span>
        </a>
    `}).join('');
}

// Render about section
function renderAbout() {
    document.querySelector('.about-text').innerHTML =
        siteData.about.map(paragraph => `<p>${paragraph.text}</p>`).join('');
}

// Render publications
function renderPublications() {
    const publicationsList = document.querySelector('.publications-list');
    publicationsList.innerHTML = siteData.publications.map((pub, index) => `
        <div class="publication-item">
            <div class="pub-badges">
                <span class="badge badge-venue">${pub.venue_short}</span>
                <span class="badge badge-ccf">${pub.ccf}</span>
                ${pub.method ? `<span class="badge badge-method">${pub.method}</span>` : ''}
            </div>
            <h4 class="pub-title">${pub.title}</h4>
            <p class="pub-authors">${pub.authors}</p>
            <p class="pub-venue">${pub.venue}</p>
            ${pub.description ? `<p class="pub-desc">${pub.description}</p>` : ''}
            <div class="pub-links">
                ${pub.links.map(link => `<a href="${link.url}" class="pub-link" target="_blank" rel="noopener">${link.name}</a>`).join('')}
                <button class="pub-link cite-btn" onclick="toggleCitation('citation-${index}')">BibTeX</button>
            </div>
            <div class="citation-block" id="citation-${index}">
                <div class="citation-header">
                    <span>BibTeX</span>
                    <button class="copy-btn" onclick="copyCitation('citation-${index}')">Copy</button>
                </div>
                <pre class="citation-code">${pub.bibtex}</pre>
            </div>
        </div>
    `).join('');

    // Subtle link to the research org for more open-source tools
    const org = siteData.projects_org;
    if (org) {
        document.getElementById('pubs-more').innerHTML =
            `More open-source log analysis tools at <a href="${org.url}" target="_blank" rel="noopener">${org.name} &rarr;</a>`;
    }
}

// Render experience
function renderExperience() {
    document.querySelector('.experience-list').innerHTML = siteData.experience.map(exp => `
        <div class="experience-item">
            <div class="exp-period">${exp.period}</div>
            <div class="exp-content">
                <h3>${exp.position}</h3>
                <h4>${exp.organization}</h4>
                ${exp.description ? `<p>${exp.description}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Render services
function renderServices() {
    document.querySelector('.services-content').innerHTML = siteData.services.map(service => `
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
    document.querySelector('.awards-list').innerHTML = siteData.awards.map(award => `
        <div class="award-item">
            <div class="award-year">${award.year}</div>
            <div class="award-content">
                <h3>${award.title}</h3>
                <h4>${award.organization}</h4>
            </div>
        </div>
    `).join('');
}

// Scroll reveal animation
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    els.forEach(el => observer.observe(el));
}

// Scroll-spy: highlight nav link of the current section
function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
    const sections = links
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function onScroll() {
        const pos = window.scrollY + 120;
        let current = null;
        sections.forEach(sec => {
            if (sec.offsetTop <= pos) current = sec.id;
        });
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Mobile navigation & bootstrap
document.addEventListener('DOMContentLoaded', function() {
    loadSiteData();

    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
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

    document.querySelectorAll('.citation-block').forEach(block => {
        block.style.display = 'none';
    });

    citationBlock.style.display = isVisible ? 'none' : 'block';
}

function copyCitation(citationId) {
    const citationBlock = document.getElementById(citationId);
    const codeText = citationBlock.querySelector('.citation-code').textContent;

    navigator.clipboard.writeText(codeText).then(function() {
        const copyBtn = citationBlock.querySelector('.copy-btn');
        const originalContent = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(function() {
            copyBtn.textContent = originalContent;
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy citation: ', err);
    });
}

/* ============================================
   Visitor statistics (global, via counterapi.dev)
   - Increments a total counter and a per-day counter
   - Deduped per browser session so refreshes don't inflate counts
   ============================================ */
const COUNTER_NS = 'yixiao-homepage';
const COUNTER_API = `https://api.counterapi.dev/v1/${COUNTER_NS}`;

function counterDateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `d-${y}-${m}-${day}`;
}

function trackVisit() {
    const footerEl = document.getElementById('footer-visits');
    try {
        if (sessionStorage.getItem('visit-counted')) {
            // Already counted this session — just display current total
            fetch(`${COUNTER_API}/main/`)
                .then(r => r.json())
                .then(data => { if (footerEl && data.count != null) footerEl.textContent = data.count; })
                .catch(() => {});
            return;
        }
        sessionStorage.setItem('visit-counted', '1');

        fetch(`${COUNTER_API}/main/up`)
            .then(r => r.json())
            .then(data => { if (footerEl && data.count != null) footerEl.textContent = data.count; })
            .catch(() => {});

        fetch(`${COUNTER_API}/${counterDateKey(new Date())}/up`).catch(() => {});
    } catch (e) {}
}

document.addEventListener('DOMContentLoaded', trackVisit);
