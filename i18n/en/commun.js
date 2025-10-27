// English Translations
const translationsEN = {
    // Navigation
    nav: {
        home: "Home",
        news: "News",
        about: "About",
        experience: "Experience",
        projects: "Projects",
        github: "GitHub",
        skills: "Skills",
        contact: "Contact"
    },

    // Hero Section
    hero: {
        title: "Hi, I'm",
        subtitle: "Software Engineering Student",
        description: "A passionate software engineering student with strong problem-solving abilities and expertise in full-stack development, cloud deployment, and AI integration. Building scalable applications with modern architectures.",
        contactBtn: "Contact Me",
        viewProjectsBtn: "View Projects",
        profile: {
            universityLabel: "University",
            universityValue: "Polytechnic Sousse",
            locationLabel: "Location",
            locationValue: "Monastir, Tunisia",
            statusLabel: "Status",
            statusValue: "Seeking Internship",
            cvButton: "View Curriculum Vitae"
        }
    },

    // News Section
    news: {
        title: "Recent News & Achievements",
        competitiveProg: {
            title: "2nd Place - Competitive Programming",
            description: "Secured 2nd place at Polytechnic Sousse and ranked 27th in Tunisia in the competitive programming competition!",
            date: "October 26, 2025",
            tag1: "Competition",
            tag2: "Algorithms"
        },
        smartMoney: {
            title: "SmartMoney.expert Pre-Production",
            description: "Successfully launched SmartMoney platform in pre-production! Canadian immigration and investment solution now live.",
            date: "October 2025",
            tag1: "Live",
            tag2: "Project"
        },
        earnBits: {
            title: "EarnBits.online In Development",
            description: "Digital advertising & rewards platform is actively under development with microservices architecture and CI/CD pipeline.",
            date: "October 2025",
            tag1: "Dev Mode",
            tag2: "Innovation"
        },
        jciWinner: {
            title: "JCI Khniss Problem Solving Champion",
            description: "First place winner in JCI Khniss Problem Solving competition, demonstrating exceptional analytical and creative thinking skills!",
            date: "2023",
            tag1: "Winner",
            tag2: "Problem Solving"
        },
        polycompetitive: {
            title: "3rd Place - Polytechnic Tunisia",
            description: "Achieved 3rd place in Polytechnic Tunisia competitive programming competition, showcasing strong algorithmic skills.",
            date: "October 2024",
            tag1: "Bronze",
            tag2: "Ranking"
        }
    },

    // About Section
    about: {
        title: "About Me",
        education: {
            title: "Education",
            poly: "Polytechnic Sousse",
            polyDegree: "Software Engineering",
            polyPeriod: "2023 - 2026",
            isimm: "Higher Institute Of Mathematics And Computer Science Monastir",
            isimmDegree: "Bachelor's in Computer Science and Information Systems",
            isimmPeriod: "2020 - 2023"
        },
        certifications: {
            title: "Certifications",
            cisco: "Cisco DevNet Associate",
            ccna: "CCNA 1 & 2",
            scrum: "SFPC™ Scrum Fundamentals",
            mongodb: "MongoDB Certification"
        },
        languages: {
            title: "Languages",
            arabic: "Arabic",
            arabicLevel: "Native",
            french: "French",
            frenchLevel: "DELF B2",
            english: "English",
            englishLevel: "B2"
        }
    },

    // About Section details (for direct element updates)
    aboutDetails: {
        polyName: "Polytechnic Sousse",
        polyDegree: "Software Engineering",
        isimmName: "Higher Institute Of Mathematics And Computer Science Monastir",
        isimmDegree: "Bachelor's in Computer Science and Information Systems",
        certCisco: "Cisco DevNet Associate",
        certCcna: "CCNA 1 & 2",
        certScrum: "SFPC™ Scrum Fundamentals",
        certMongodb: "MongoDB Certification"
    },

    // Experience Section
    experience: {
        title: "Experience",
        altadigit: {
            company: "Summer Internship - AltaDigit",
            duration: "Duration: 2 months",
            bullet1: "Developed SmartMoney platform: comprehensive Canadian immigration and investment solution",
            bullet2: "Implemented real estate management, financial markets integration, and AI-powered tools",
            bullet3: "Deployed on VPS infrastructure with pre-production grade optimizations"
        },
        titc: {
            company: "Co-founder - TITC",
            duration: "Duration: 4 years",
            bullet1: "Led online event podcasts and built IT community initiatives across Tunisia",
            bullet2: "Managed graphic design and IT infrastructure for community engagement"
        },
        tudigisec: {
            company: "Summer Internship - TUDIGISEC",
            duration: "Duration: 2 months",
            bullet1: "Developed security platform with multi-tenancy architecture",
            bullet2: "Contributed to specifications and conceptual architecture design"
        },
        tunisiancloud: {
            company: "Bachelor's Degree Internship - Tunisian Cloud",
            duration: "Duration: 5 months",
            bullet1: "Built agile and predictive project management platform",
            bullet2: "Created technical specifications and architectural documentation"
        }
    },

    // Projects Section
    projects: {
        title: "Featured Projects",
        smartMoney: {
            badge: "Live Platform",
            type: "Canadian Immigration & Investment Platform",
            description: "Full-stack web application integrated with real estate, financial markets, AI financial assistant, and immigration resources. Deployed on VPS with Nginx, SSL/TLS encryption, and PM2 process management."
        },
        earnBits: {
            badge: "Live Demo",
            type: "Digital Advertising & Rewards Platform",
            description: "Microservices architecture with campaign management, real-time bidding, payment processing, and analytics dashboard. Containerized deployment with CI/CD pipeline."
        },
        vahila: {
            type: "E-commerce Microservices Platform",
            description: "Event-driven architecture implementing distributed systems principles with message queuing, caching, and gRPC communication."
        },
        youtube: {
            type: "AI-Powered Comment Response System",
            description: "Intelligent auto-reply with sentiment analysis using GPT-4. Real-time comment monitoring with contextual response generation."
        },
        dataflow: {
            type: "Big Data Processing Platform",
            description: "Distributed processing system handling large-scale data with real-time analytics, ETL pipelines, and ML model integration."
        },
        teamflow: {
            type: "Agile & Predictive Project Management",
            description: "Platform for agile execution, collaboration, and resource management with sprint planning, task tracking, and Gantt charts."
        }
    },

    // GitHub Section
    github: {
        title: "GitHub Repositories",
        repositories: "Repositories",
        totalStars: "Total Stars",
        totalForks: "Total Forks",
        loading: "Loading repositories...",
        showMore: "Show More",
        showLess: "Show Less",
        viewAll: "View All on GitHub"
    },

    // Skills Section
    skills: {
        title: "Technical Skills",
        languages: "Languages",
        frontend: "Frontend",
        backend: "Backend",
        databases: "Databases",
        cloud: "Cloud & DevOps",
        architecture: "Architecture",
        aiData: "AI & Data",
        softSkills: "Soft Skills"
    },

    // Leadership Section
    leadership: {
        title: "Leadership & Community",
        ieee: {
            org: "IEEE Organization",
            role: "Member",
            period: "2024 - Present"
        },
        acm: {
            org: "ACM EPS Club",
            role: "Member",
            period: "2024 - 2025"
        },
        cpu: {
            org: "CPU ISIMM",
            role: "Graphic Designer",
            period: "2021 - 2023"
        },
        ycm: {
            org: "Young Creative Minds",
            role: "Vice President",
            period: "2019 - 2021"
        },
        interests: {
            title: "Areas of Interest",
            tag1: "Technology Innovation",
            tag2: "Distributed Systems",
            tag3: "Cloud Architecture",
            tag4: "AI/Machine Learning",
            tag5: "Open Source Contribution"
        }
    },

    // Contact Section
    contact: {
        title: "Get In Touch",
        heading: "Let's work together!",
        description: "I'm currently seeking internship opportunities. Feel free to reach out if you'd like to discuss potential collaborations or projects.",
        email: "Email",
        phone: "Phone"
    },

    // Footer
    footer: {
        rights: "All rights reserved."
    },

    // Common
    common: {
        loading: "Loading...",
        error: "Error",
        retry: "Retry"
    }
};
