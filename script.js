// Data loading and rendering
let siteData = {};
let activePubFilter = 'all';

// SVG icon definitions
const SVG_ICONS = {
    'Email': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    'Google Scholar': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    'GitHub': '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-3.795-.735-.54-1.38-1.335-1.755-1.335-1.755-1.08-.735.09-.72.09-.72 1.2.075 1.83 1.23 1.83 1.23 1.065 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
    'ORCID': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 9.5v6"/><circle cx="8" cy="7" r="0.6" fill="currentColor"/><path d="M11.5 9.5h2.5a2.5 2.5 0 0 1 0 5v1h-2.5v-6Z"/></svg>',
    'DBLP': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    'LinkedIn': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    'Copy': '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    'External': '<svg class="ext-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>',
    'Paper': '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>',
    'DOI': '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    'Code': '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    'BibTeX': '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>',
    'Award': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>'
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
    renderPublicationFilters();
    renderPublications();
    renderExperience();
    renderEducation();
    renderServices();
    renderAwards();
    initReveal();
    initScrollSpy();
}

// Copy email to clipboard and show inline toast
function copyEmail(email, el) {
    navigator.clipboard.writeText(email).then(function() {
        const badge = el.querySelector('.email-copy-badge');
        if (badge) {
            const prev = badge.innerHTML;
            badge.textContent = 'Copied!';
            badge.classList.add('copied');
            setTimeout(function() {
                badge.innerHTML = prev;
                badge.classList.remove('copied');
            }, 1500);
        }
    }).catch(function(err) {
        console.error('Copy failed: ', err);
    });
}

// Render personal information
function renderPersonal() {
    const personal = siteData.personal;

    document.querySelector('.hero-title').textContent = personal.name;
    document.querySelector('.hero-subtitle').innerHTML = `
        <span class="subtitle-role">${personal.title}</span>
        <span class="subtitle-inst">${personal.affiliation}</span>
    `;

    // Research interest tags
    document.getElementById('hero-tags').innerHTML = personal.research_interests
        .map(tag => `<span class="tag"><span class="tag-dot" aria-hidden="true"></span>${tag}</span>`).join('');

    // Contact links with SVG icons
    const contactInfo = document.getElementById('contact-info');
    const icon = (name) => SVG_ICONS[name] || '';

    const emailCard = `
        <button type="button" class="contact-link contact-link-email" aria-label="Copy email address ${personal.email}" onclick="copyEmail('${personal.email}', this)" title="Click to copy ${personal.email}">
            <span class="contact-link-left">
                ${icon('Email')}
                <span class="contact-email-text">${personal.email}</span>
            </span>
            <span class="email-copy-badge">${SVG_ICONS['Copy']}<span>Copy</span></span>
        </button>
    `;

    const socialLinks = personal.links.map(link => `
        <a href="${link.url}" class="contact-link" target="_blank" rel="noopener">
            <span class="contact-link-left">
                ${icon(link.name)}
                <span>${link.name}</span>
            </span>
            ${SVG_ICONS['External']}
        </a>
    `).join('');

    contactInfo.innerHTML = emailCard + socialLinks;
}

// Render about section
function renderAbout() {
    document.querySelector('.about-text').innerHTML =
        siteData.about.map(paragraph => `<p>${paragraph.text}</p>`).join('');

    const highlightsEl = document.getElementById('about-highlights');
    if (highlightsEl) {
        const pubCount = (siteData.publications || []).length;
        const ccfACount = (siteData.publications || []).filter(p => (p.ccf || '').includes('CCF A')).length;
        highlightsEl.innerHTML = `
            <div class="highlight-chip">
                <span class="highlight-val">${ccfACount} &times; CCF-A</span>
                <span class="highlight-lbl">ICSE &middot; FSE &middot; ASE</span>
            </div>
            <div class="highlight-chip">
                <span class="highlight-val">LogIntelligence</span>
                <span class="highlight-lbl">Open-Source Tools &amp; Benchmarks</span>
            </div>
            <div class="highlight-chip">
                <span class="highlight-val">Microsoft M365</span>
                <span class="highlight-lbl">Research Internship</span>
            </div>
        `;
    }
}

function isFirstAuthor(pub) {
    return typeof pub.authors === 'string' && pub.authors.trim().startsWith('<strong>Yi Xiao</strong>');
}

function renderPublicationFilters() {
    const filterContainer = document.getElementById('pub-filters');
    if (!filterContainer) return;

    const pubs = siteData.publications || [];
    const firstAuthorCount = pubs.filter(isFirstAuthor).length;
    const years = Array.from(new Set(pubs.map(p => p.year))).sort((a, b) => b.localeCompare(a));

    const filters = [
        { id: 'all', label: `All (${pubs.length})` },
        { id: 'first', label: `First Author (${firstAuthorCount})` },
        ...years.map(y => ({ id: `year-${y}`, label: y }))
    ];

    filterContainer.innerHTML = filters.map(f => `
        <button type="button" role="tab" class="pub-filter-btn${activePubFilter === f.id ? ' active' : ''}" aria-selected="${activePubFilter === f.id}" onclick="setPubFilter('${f.id}')">
            ${f.label}
        </button>
    `).join('');
}

function setPubFilter(filterId) {
    activePubFilter = filterId;
    renderPublicationFilters();
    renderPublications();
}

// Render publications
function renderPublications() {
    const publicationsList = document.querySelector('.publications-list');
    const allPubs = siteData.publications || [];

    const filtered = allPubs.map((pub, index) => ({ pub, index })).filter(({ pub }) => {
        if (activePubFilter === 'all') return true;
        if (activePubFilter === 'first') return isFirstAuthor(pub);
        if (activePubFilter.startsWith('year-')) return pub.year === activePubFilter.slice(5);
        return true;
    });

    publicationsList.innerHTML = filtered.map(({ pub, index }) => {
        const firstAuth = isFirstAuthor(pub);
        return `
        <article class="publication-item${firstAuth ? ' pub-first-author' : ''}">
            <div class="pub-header">
                <div class="pub-badges">
                    <span class="badge badge-venue">${pub.venue_short}</span>
                    ${pub.ccf ? `<span class="badge badge-ccf">${pub.ccf}</span>` : ''}
                    ${pub.method ? `<span class="badge badge-method">${pub.method}</span>` : ''}
                    ${firstAuth ? `<span class="badge badge-role">First Author</span>` : ''}
                </div>
                <span class="pub-year">${pub.year}</span>
            </div>
            <h3 class="pub-title">
                <a href="${pub.links[0].url}" target="_blank" rel="noopener">
                    <span>${pub.title}</span>
                    ${SVG_ICONS['External']}
                </a>
            </h3>
            <p class="pub-authors">${pub.authors}</p>
            <p class="pub-venue">${pub.venue}</p>
            ${pub.description ? `<p class="pub-desc">${pub.description}</p>` : ''}
            <div class="pub-links">
                ${pub.links.map(link => {
                    const linkIcon = SVG_ICONS[link.name] || SVG_ICONS['DOI'];
                    return `<a href="${link.url}" class="pub-link" target="_blank" rel="noopener">${linkIcon}<span>${link.name}</span></a>`;
                }).join('')}
                <button type="button" class="pub-link cite-btn" aria-expanded="false" aria-controls="citation-${index}" onclick="toggleCitation('citation-${index}')">
                    ${SVG_ICONS['BibTeX']}
                    <span>BibTeX</span>
                </button>
            </div>
            <div class="citation-block" id="citation-${index}">
                <div class="citation-header">
                    <span>BibTeX Citation</span>
                    <button type="button" class="copy-btn" onclick="copyCitation('citation-${index}')">${SVG_ICONS['Copy']}<span>Copy</span></button>
                </div>
                <pre class="citation-code">${pub.bibtex}</pre>
            </div>
        </article>
    `}).join('');

    // Open-source research org card
    const org = siteData.projects_org;
    const moreEl = document.getElementById('pubs-more');
    if (org && moreEl) {
        moreEl.innerHTML = `
            <a href="${org.url}" target="_blank" rel="noopener" class="org-banner">
                <div class="org-banner-left">
                    <span class="org-icon">${SVG_ICONS['GitHub']}</span>
                    <div class="org-text">
                        <strong>@${org.name} Open-Source Organization</strong>
                        <span>Explore more log parsing, anomaly detection, and LLM-for-SE benchmarks &amp; replication packages</span>
                    </div>
                </div>
                <span class="org-cta">Explore Repos &rarr;</span>
            </a>
        `;
    }
}

// Render experience
function renderExperience() {
    const el = document.querySelector('.experience-list');
    if (!el || !siteData.experience) return;
    el.innerHTML = siteData.experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-marker" aria-hidden="true"></div>
            <div class="timeline-meta">
                <span class="timeline-period">${exp.period}</span>
            </div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3>${exp.position}</h3>
                    <span class="timeline-org">${exp.organization}</span>
                </div>
                ${exp.description ? `<p>${exp.description}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Render education
function renderEducation() {
    const el = document.querySelector('.education-list');
    if (!el || !siteData.education) return;
    el.innerHTML = siteData.education.map(edu => `
        <div class="timeline-item">
            <div class="timeline-marker" aria-hidden="true"></div>
            <div class="timeline-meta">
                <span class="timeline-period">${edu.period}</span>
            </div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3>${edu.degree}</h3>
                    <span class="timeline-org">${edu.institution}</span>
                </div>
                ${edu.description ? `<p>${edu.description}</p>` : ''}
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
                ${service.items.map(item => `<li><span class="service-bullet" aria-hidden="true"></span><span>${item}</span></li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Render awards
function renderAwards() {
    document.querySelector('.awards-list').innerHTML = siteData.awards.map(award => `
        <div class="award-item">
            <div class="award-icon" aria-hidden="true">${SVG_ICONS['Award']}</div>
            <div class="award-content">
                <div class="award-top">
                    <h3>${award.title}</h3>
                    <span class="award-year">${award.year}</span>
                </div>
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
    }, { threshold: 0.01, rootMargin: '0px 0px 120px 0px' });
    els.forEach(el => observer.observe(el));
}

// Scroll-spy: highlight nav link of the current section
function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
    const sections = links
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function onScroll() {
        const pos = window.scrollY + 140;
        let current = sections[0] ? sections[0].id : null;
        sections.forEach(sec => {
            if (sec.offsetTop <= pos) current = sec.id;
        });
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 8);
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Theme toggle
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) {}
    });
}

// Mobile navigation & bootstrap
document.addEventListener('DOMContentLoaded', function() {
    loadSiteData();
    initTheme();

    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', String(navMenu.classList.contains('active')));
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                mobileMenu.focus();
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

// Citation functionality
function toggleCitation(citationId) {
    const citationBlock = document.getElementById(citationId);
    if (!citationBlock) return;
    const isVisible = citationBlock.classList.contains('open');

    document.querySelectorAll('.citation-block').forEach(block => {
        block.classList.remove('open');
    });

    if (!isVisible) {
        citationBlock.classList.add('open');
    }

    document.querySelectorAll('.cite-btn').forEach(button => {
        button.setAttribute('aria-expanded', String(!isVisible && button.getAttribute('aria-controls') === citationId));
    });
}

function copyCitation(citationId) {
    const citationBlock = document.getElementById(citationId);
    const codeText = citationBlock.querySelector('.citation-code').textContent;

    navigator.clipboard.writeText(codeText).then(function() {
        const copyBtn = citationBlock.querySelector('.copy-btn span');
        if (copyBtn) {
            const originalContent = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(function() {
                copyBtn.textContent = originalContent;
            }, 2000);
        }
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
            fetch(`${COUNTER_API}/main/`)
                .then(r => r.json())
                .then(data => { if (footerEl && data.count != null) footerEl.textContent = data.count.toLocaleString(); })
                .catch(() => {});
            return;
        }
        sessionStorage.setItem('visit-counted', '1');

        fetch(`${COUNTER_API}/main/up`)
            .then(r => r.json())
            .then(data => { if (footerEl && data.count != null) footerEl.textContent = data.count.toLocaleString(); })
            .catch(() => {});

        fetch(`${COUNTER_API}/${counterDateKey(new Date())}/up`).catch(() => {});
    } catch (e) {}
}

document.addEventListener('DOMContentLoaded', trackVisit);
