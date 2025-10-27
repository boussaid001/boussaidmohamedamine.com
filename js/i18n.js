// Internationalization System
let currentLang = localStorage.getItem('language') || 'en';
let translationsLoaded = false;

// Function to load translations
function loadTranslations(lang) {
    // If translations are already loaded, just apply them
    if (window.currentTranslations) {
        applyTranslations();
        updateLanguageLabel(lang);
        return;
    }

    // Remove old script if exists
    const oldScript = document.querySelector(`script[src*="commun.js"]`);
    if (oldScript) {
        oldScript.remove();
    }

    const script = document.createElement('script');
    script.src = `i18n/${lang}/commun.js`;
    script.onload = () => {
        window.currentTranslations = lang === 'en' ? translationsEN : translationsFR;
        translationsLoaded = true;
        applyTranslations();
        updateLanguageLabel(lang);
    };
    document.head.appendChild(script);
}

// Apply translations to the page
function applyTranslations() {
    const t = window.currentTranslations;
    if (!t) return;

    // Navigation
    updateText('#nav-home', t.nav.home);
    updateText('#nav-news', t.nav.news);
    updateText('#nav-about', t.nav.about);
    updateText('#nav-experience', t.nav.experience);
    updateText('#nav-projects', t.nav.projects);
    updateText('#nav-github', t.nav.github);
    updateText('#nav-skills', t.nav.skills);
    updateText('#nav-contact', t.nav.contact);

    // Hero Section
    updateText('#hero-title-prefix', t.hero.title);
    updateText('#hero-subtitle', t.hero.subtitle);
    updateText('#hero-description', t.hero.description);
    updateInnerHTML('#contact-me-btn', `<i class="fas fa-envelope"></i> ${t.hero.contactBtn}`);
    updateInnerHTML('#view-projects-btn', `<i class="fas fa-code"></i> ${t.hero.viewProjectsBtn}`);
    
    // Profile Info Card
    if (t.hero.profile) {
        updateText('#profile-university-label', t.hero.profile.universityLabel);
        updateText('#profile-university-value', t.hero.profile.universityValue);
        updateText('#profile-location-label', t.hero.profile.locationLabel);
        updateText('#profile-location-value', t.hero.profile.locationValue);
        updateText('#profile-status-label', t.hero.profile.statusLabel);
        updateText('#profile-status-value', t.hero.profile.statusValue);
        updateText('#cv-btn-text', t.hero.profile.cvButton);
    }

    // News Section
    updateText('#news-title', t.news.title);
    updateNewsCard('#news-card-1', t.news.competitiveProg);
    updateNewsCard('#news-card-2', t.news.smartMoney);
    updateNewsCard('#news-card-3', t.news.earnBits);
    updateNewsCard('#news-card-4', t.news.jciWinner);
    updateNewsCard('#news-card-5', t.news.polycompetitive);

    // About Section
    updateText('#about-title', t.about.title);
    updateText('#about-education-title', t.about.education.title);
    updateText('#about-cert-title', t.about.certifications.title);
    updateText('#about-lang-title', t.about.languages.title);
    
    // Education details
    if (t.aboutDetails) {
        updateText('#about-poly-name', t.aboutDetails.polyName);
        updateText('#about-poly-degree', t.aboutDetails.polyDegree);
        updateText('#about-isimm-name', t.aboutDetails.isimmName);
        updateText('#about-isimm-degree', t.aboutDetails.isimmDegree);
    }
    
    // Certifications
    if (t.aboutDetails) {
        updateText('#cert-cisco', t.aboutDetails.certCisco);
        updateText('#cert-ccna', t.aboutDetails.certCcna);
        updateText('#cert-scrum', t.aboutDetails.certScrum);
        updateText('#cert-mongodb', t.aboutDetails.certMongodb);
    }
    
    // Languages
    updateText('#lang-arabic', t.about.languages.arabic);
    updateText('#lang-arabic-level', t.about.languages.arabicLevel);
    updateText('#lang-french', t.about.languages.french);
    updateText('#lang-french-level', t.about.languages.frenchLevel);
    updateText('#lang-english', t.about.languages.english);
    updateText('#lang-english-level', t.about.languages.englishLevel);

    // Experience Section
    updateText('#experience-title', t.experience.title);
    
    // AltaDigit
    updateText('#exp-altadigit-title', t.experience.altadigit.company);
    updateText('#exp-altadigit-duration', t.experience.altadigit.duration);
    updateText('#exp-altadigit-b1', t.experience.altadigit.bullet1);
    updateText('#exp-altadigit-b2', t.experience.altadigit.bullet2);
    updateText('#exp-altadigit-b3', t.experience.altadigit.bullet3);
    
    // TITC
    updateText('#exp-titc-title', t.experience.titc.company);
    updateText('#exp-titc-duration', t.experience.titc.duration);
    updateText('#exp-titc-b1', t.experience.titc.bullet1);
    updateText('#exp-titc-b2', t.experience.titc.bullet2);
    
    // TUDIGISEC
    updateText('#exp-tudigisec-title', t.experience.tudigisec.company);
    updateText('#exp-tudigisec-duration', t.experience.tudigisec.duration);
    updateText('#exp-tudigisec-b1', t.experience.tudigisec.bullet1);
    updateText('#exp-tudigisec-b2', t.experience.tudigisec.bullet2);
    
    // Tunisian Cloud
    updateText('#exp-tunisiancloud-title', t.experience.tunisiancloud.company);
    updateText('#exp-tunisiancloud-duration', t.experience.tunisiancloud.duration);
    updateText('#exp-tunisiancloud-b1', t.experience.tunisiancloud.bullet1);
    updateText('#exp-tunisiancloud-b2', t.experience.tunisiancloud.bullet2);

    // Projects Section
    updateText('#projects-title', t.projects.title);
    
    // SmartMoney
    updateText('#badge-smartmoney', t.projects.smartMoney.badge);
    updateText('#type-smartmoney', t.projects.smartMoney.type);
    updateText('#desc-smartmoney', t.projects.smartMoney.description);
    
    // EarnBits
    updateText('#badge-earnbits', t.projects.earnBits.badge);
    updateText('#type-earnbits', t.projects.earnBits.type);
    updateText('#desc-earnbits', t.projects.earnBits.description);
    
    // Vahila
    updateText('#type-vahila', t.projects.vahila.type);
    updateText('#desc-vahila', t.projects.vahila.description);
    
    // YouTube Auto Responder
    updateText('#type-youtube', t.projects.youtube.type);
    updateText('#desc-youtube', t.projects.youtube.description);
    
    // DataFlow Analytics
    updateText('#type-dataflow', t.projects.dataflow.type);
    updateText('#desc-dataflow', t.projects.dataflow.description);
    
    // TeamFlow
    updateText('#type-teamflow', t.projects.teamflow.type);
    updateText('#desc-teamflow', t.projects.teamflow.description);

    // GitHub Section
    updateText('#github-title', t.github.title);
    updateText('#github-repos-label', t.github.repositories);
    updateText('#github-stars-label', t.github.totalStars);
    updateText('#github-forks-label', t.github.totalForks);
    updateText('#show-more-btn', t.github.showMore);
    updateText('#show-less-btn', t.github.showLess);
    updateText('#view-all-btn', t.github.viewAll);

    // Skills Section
    updateText('#skills-title', t.skills.title);

    // Leadership Section
    updateText('#leadership-title', t.leadership.title);
    
    // Leadership roles
    updateText('#leader-ieee-name', t.leadership.ieee.org);
    updateText('#leader-ieee-role', t.leadership.ieee.role);
    updateText('#leader-acm-name', t.leadership.acm.org);
    updateText('#leader-acm-role', t.leadership.acm.role);
    updateText('#leader-cpu-name', t.leadership.cpu.org);
    updateText('#leader-cpu-role', t.leadership.cpu.role);
    updateText('#leader-ycm-name', t.leadership.ycm.org);
    updateText('#leader-ycm-role', t.leadership.ycm.role);
    
    // Interests
    updateText('#interests-title', t.leadership.interests.title);
    
    // Interest tags (update innerHTML to preserve icons)
    const interest1 = document.querySelector('#interest-1 i');
    const interest2 = document.querySelector('#interest-2 i');
    const interest3 = document.querySelector('#interest-3 i');
    const interest4 = document.querySelector('#interest-4 i');
    const interest5 = document.querySelector('#interest-5 i');
    
    if (interest1) {
        updateInnerHTML('#interest-1', `<i class="${interest1.className}"></i> ${t.leadership.interests.tag1}`);
    }
    if (interest2) {
        updateInnerHTML('#interest-2', `<i class="${interest2.className}"></i> ${t.leadership.interests.tag2}`);
    }
    if (interest3) {
        updateInnerHTML('#interest-3', `<i class="${interest3.className}"></i> ${t.leadership.interests.tag3}`);
    }
    if (interest4) {
        updateInnerHTML('#interest-4', `<i class="${interest4.className}"></i> ${t.leadership.interests.tag4}`);
    }
    if (interest5) {
        updateInnerHTML('#interest-5', `<i class="${interest5.className}"></i> ${t.leadership.interests.tag5}`);
    }

    // Contact Section
    updateText('#contact-title', t.contact.title);
    updateText('#contact-heading', t.contact.heading);
    updateText('#contact-description', t.contact.description);
    updateText('#contact-email-label', t.contact.email);
    updateText('#contact-phone-label', t.contact.phone);

    // Footer
    updateText('#footer-rights', t.footer.rights);
}

// Helper function to update text content
function updateText(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text;
    }
}

// Helper function to update innerHTML
function updateInnerHTML(selector, html) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = html;
    }
}

// Helper function to update news cards
function updateNewsCard(selector, data) {
    const card = document.querySelector(selector);
    if (card && data) {
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        
        if (h3 && data.title) h3.textContent = data.title;
        if (p && data.description) p.textContent = data.description;
        
        // Update tags if they exist
        const tags = card.querySelectorAll('.news-tags span');
        if (tags.length >= 2 && data.tag1 && data.tag2) {
            const tag1Icon = tags[0].querySelector('i');
            const tag2Icon = tags[1].querySelector('i');
            
            if (tag1Icon) {
                tags[0].innerHTML = `<i class="${tag1Icon.className}"></i> ${data.tag1}`;
            } else {
                tags[0].textContent = data.tag1;
            }
            
            if (tag2Icon) {
                tags[1].innerHTML = `<i class="${tag2Icon.className}"></i> ${data.tag2}`;
            } else {
                tags[1].textContent = data.tag2;
            }
        }
        
        // Update date text
        const dateText = card.querySelector('.news-date-text');
        if (dateText && data.date) {
            dateText.textContent = data.date;
        }
    }
}

// Update language label
function updateLanguageLabel(lang) {
    const label = document.getElementById('lang-label');
    if (label) {
        label.textContent = lang.toUpperCase();
    }
}

// Switch language
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Remove old script if exists
    const oldScript = document.querySelector(`script[src*="commun.js"]`);
    if (oldScript) {
        oldScript.remove();
    }
    
    // Load the appropriate translation file
    const script = document.createElement('script');
    script.src = `i18n/${lang}/commun.js`;
    script.onload = () => {
        window.currentTranslations = lang === 'en' ? translationsEN : translationsFR;
        applyTranslations();
        updateLanguageLabel(lang);
    };
    document.head.appendChild(script);
}

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load translations with a slight delay to ensure DOM is ready
    setTimeout(() => {
        loadTranslations(currentLang);
    }, 50);
});

// Export for use in other scripts
window.i18n = {
    currentLang,
    switchLanguage,
    t: () => window.currentTranslations || translationsEN
};
