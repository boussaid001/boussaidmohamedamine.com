// ========================================
// Mobile Menu Toggle
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(11px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-11px)' 
        : 'none';
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Smooth Scrolling for Hero Buttons
// ========================================

const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Scroll to Top Button
// ========================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Navbar Background on Scroll
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
});

// ========================================
// Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll(
    '.trophy-card, .news-card, .about-card, .timeline-item, .project-card, .stat-card, .repo-card, .skill-category, .leadership-card, .contact-card'
);

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ========================================
// Typing Effect for Hero Title (Optional)
// ========================================

function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-title .highlight');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeEffect(heroTitle, originalText, 80);
// }

// ========================================
// Profile Image Fallback
// ========================================

const profileImage = document.getElementById('profileImage');

profileImage.addEventListener('error', () => {
    // Create a placeholder if image fails to load
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 80px;
        color: white;
        font-weight: bold;
        letter-spacing: 5px;
    `;
    placeholder.textContent = 'BMA';
    
    profileImage.parentElement.replaceChild(placeholder, profileImage);
});

// ========================================
// Dynamic Year for Footer
// ========================================

const updateFooterYear = () => {
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `&copy; ${currentYear} Boussaid Mohamed Amine. All rights reserved.`;
    }
};

updateFooterYear();

// ========================================
// Cursor Trail Effect (Optional)
// ========================================

class CursorTrail {
    constructor() {
        this.dots = [];
        this.maxDots = 20;
        this.init();
    }

    init() {
        // Create cursor dots
        for (let i = 0; i < this.maxDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: ${10 - i * 0.3}px;
                height: ${10 - i * 0.3}px;
                background: rgba(59, 130, 246, ${1 - i * 0.05});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                display: none;
            `;
            document.body.appendChild(dot);
            this.dots.push({ element: dot, x: 0, y: 0 });
        }

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.dots[0].x = e.clientX;
            this.dots[0].y = e.clientY;
            
            this.dots.forEach((dot, index) => {
                if (index > 0) {
                    dot.x += (this.dots[index - 1].x - dot.x) * 0.3;
                    dot.y += (this.dots[index - 1].y - dot.y) * 0.3;
                }
                
                dot.element.style.left = dot.x + 'px';
                dot.element.style.top = dot.y + 'px';
                dot.element.style.display = 'block';
            });
        });
    }
}

// Uncomment to enable cursor trail effect (only on desktop)
// if (window.innerWidth > 768) {
//     new CursorTrail();
// }

// ========================================
// Parallax Effect for Background Shapes
// ========================================

const bgShapes = document.querySelectorAll('.bg-shape');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    bgShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Project Cards Click Effect (only for non-anchor cards)
// ========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    // Only apply ripple effect to non-anchor cards (div elements, not links)
    if (card.tagName !== 'A') {
        card.addEventListener('click', function() {
            // Add a ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(59, 130, 246, 0.4);
                width: 20px;
                height: 20px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
});

// Add ripple animation to CSS
if (!document.querySelector('#ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(30);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Console Message
// ========================================

// ========================================
// Fetch GitHub Repositories
// ========================================

let allRepos = [];
let isExpanded = false;
const INITIAL_DISPLAY = 9;

async function fetchGitHubRepos() {
    const username = 'boussaid001';
    const reposContainer = document.getElementById('repos-container');
    const repoCount = document.getElementById('repo-count');
    const starsCount = document.getElementById('stars-count');
    const forksCount = document.getElementById('forks-count');
    
    try {
        // Fetch all repositories
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('GitHub API request failed');
        }
        
        const repos = await response.json();
        
        // Filter public repos and sort by stars
        allRepos = repos
            .filter(repo => !repo.private)
            .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
        
        // Calculate stats
        const totalStars = allRepos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const totalForks = allRepos.reduce((sum, repo) => sum + (repo.forks_count || 0), 3);
        
        // Update stats
        repoCount.textContent = allRepos.length;
        starsCount.textContent = totalStars;
        forksCount.textContent = totalForks;
        
        // Display initial repositories
        displayRepos(false);
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        reposContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load repositories. Please visit <a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: underline;">GitHub directly</a>.</p>
            </div>
        `;
        
        // Set fallback stats
        repoCount.textContent = '36';
        starsCount.textContent = '38';
        forksCount.textContent = '--';
    }
}

function displayRepos(showAll) {
    const reposContainer = document.getElementById('repos-container');
    reposContainer.innerHTML = '';
    
    if (allRepos.length === 0) {
        reposContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No public repositories found.</p>';
        return;
    }
    
    const reposToShow = showAll ? allRepos : allRepos.slice(0, INITIAL_DISPLAY);
    
    reposToShow.forEach(repo => {
        const repoCard = createRepoCard(repo);
        reposContainer.appendChild(repoCard);
    });
    
    // Update expand button
    updateExpandButton();
}

function updateExpandButton() {
    const expandBtn = document.getElementById('expand-repos-btn');
    if (!expandBtn) return;
    
    if (allRepos.length <= INITIAL_DISPLAY) {
        expandBtn.style.display = 'none';
    } else {
        expandBtn.style.display = 'inline-flex';
        if (isExpanded) {
            expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
        } else {
            expandBtn.innerHTML = `<i class="fas fa-chevron-down"></i> Show More (${allRepos.length - INITIAL_DISPLAY} more)`;
        }
    }
}

function toggleReposExpand() {
    isExpanded = !isExpanded;
    displayRepos(isExpanded);
    
    // Scroll to repos section if collapsing
    if (!isExpanded) {
        document.getElementById('github').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function createRepoCard(repo) {
    const card = document.createElement('a');
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'repo-card';
    
    const languageClass = repo.language ? `lang-${repo.language.toLowerCase().replace(/\s+/g, '-')}` : 'lang-default';
    const description = repo.description || 'No description provided';
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short',
        day: 'numeric'
    });
    
    let footerHTML = '<div class="repo-footer">';
    
    // Language
    if (repo.language) {
        footerHTML += `
            <div class="repo-language">
                <span class="language-dot ${languageClass}"></span>
                <span>${repo.language}</span>
            </div>
        `;
    }
    
    // Stars
    if (repo.stargazers_count > 0) {
        footerHTML += `
            <div class="repo-stars">
                <i class="fas fa-star"></i>
                <span>${repo.stargazers_count}</span>
            </div>
        `;
    }
    
    // Forks
    if (repo.forks_count > 0) {
        footerHTML += `
            <div class="repo-stars">
                <i class="fas fa-code-branch"></i>
                <span>${repo.forks_count}</span>
            </div>
        `;
    }
    
    // Updated date
    footerHTML += `<span class="repo-updated">Updated ${updatedDate}</span>`;
    footerHTML += '</div>';
    
    card.innerHTML = `
        <div class="repo-header">
            <i class="fas fa-book repo-icon"></i>
            <h3 class="repo-name">${repo.name}</h3>
        </div>
        <p class="repo-description">${description}</p>
        ${footerHTML}
    `;
    
    return card;
}

// Load GitHub repos when page loads
if (document.getElementById('repos-container')) {
    window.addEventListener('load', fetchGitHubRepos);
}

console.log('%c👨‍💻 Boussaid Mohamed Amine', 'font-size: 20px; color: #3b82f6; font-weight: bold;');
console.log('%cSoftware Engineering Student | Full-Stack Developer', 'font-size: 14px; color: #94a3b8;');
console.log('%cLooking for internship opportunities! 🚀', 'font-size: 14px; color: #10b981;');
console.log('%cEmail: mohamedamine.boussaid@polytechnicien.tn', 'font-size: 12px; color: #94a3b8;');

// ========================================
// Language Toggle Function
// ========================================

function toggleLanguage() {
    if (window.i18n && window.i18n.currentLang) {
        const newLang = window.i18n.currentLang === 'en' ? 'fr' : 'en';
        window.i18n.switchLanguage(newLang);
        document.getElementById('lang-label').textContent = newLang.toUpperCase();
    }
}

