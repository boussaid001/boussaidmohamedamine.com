// Traductions Françaises
const translationsFR = {
    // Navigation
    nav: {
        home: "Accueil",
        news: "Actualités",
        about: "À Propos",
        experience: "Expérience",
        projects: "Projets",
        github: "GitHub",
        skills: "Compétences",
        contact: "Contact"
    },

    // Hero Section
    hero: {
        title: "Salut, je suis",
        subtitle: "Étudiant en Ingénierie Logicielle",
        description: "Étudiant passionné en ingénierie logicielle avec de fortes compétences en résolution de problèmes et expertise en développement full-stack, déploiement cloud et intégration IA. Construction d'applications évolutives avec des architectures modernes.",
        contactBtn: "Me Contacter",
        viewProjectsBtn: "Voir les Projets",
        profile: {
            universityLabel: "Université",
            universityValue: "École Polytechnique de Sousse",
            locationLabel: "Lieu",
            locationValue: "Monastir, Tunisie",
            statusLabel: "Statut",
            statusValue: "En Recherche de Stage",
            cvButton: "Voir le Curriculum Vitae"
        }
    },

    // News Section
    news: {
        title: "Actualités et Réalisations Récentes",
        competitiveProg: {
            title: "2ème Place - Programmation Compétitive",
            description: "Obtenu la 2ème place à l'École Polytechnique de Sousse et classé 27ème en Tunisie dans la compétition de programmation compétitive !",
            date: "26 Octobre 2025",
            tag1: "Compétition",
            tag2: "Algorithmes"
        },
        smartMoney: {
            title: "SmartMoney.expert Pré-Production",
            description: "Plateforme SmartMoney lancée avec succès en pré-production ! Solution d'immigration et d'investissement canadienne maintenant en ligne.",
            date: "Octobre 2025",
            tag1: "En Ligne",
            tag2: "Projet"
        },
        earnBits: {
            title: "EarnBits.online En Développement",
            description: "Plateforme de publicité numérique et de récompenses activement en développement avec architecture de microservices et pipeline CI/CD.",
            date: "Octobre 2025",
            tag1: "Mode Dev",
            tag2: "Innovation"
        },
        jciWinner: {
            title: "Champion de Résolution de Problèmes JCI Khniss",
            description: "Premier prix dans la compétition de résolution de problèmes JCI Khniss, démontrant des compétences exceptionnelles en pensée analytique et créative !",
            date: "2023",
            tag1: "Vainqueur",
            tag2: "Résolution de Problèmes"
        },
        polycompetitive: {
            title: "3ème Place - École Polytechnique Tunisie",
            description: "Obtenu la 3ème place dans la compétition de programmation compétitive de l'École Polytechnique Tunisie, démontrant de solides compétences algorithmiques.",
            date: "Octobre 2024",
            tag1: "Bronze",
            tag2: "Classement"
        }
    },

    // About Section
    about: {
        title: "À Propos de Moi",
        education: {
            title: "Éducation",
            poly: "École Polytechnique de Sousse",
            polyDegree: "Ingénierie Logicielle",
            polyPeriod: "2023 - 2026",
            isimm: "Institut Supérieur de Mathématiques et d'Informatique Monastir",
            isimmDegree: "Licence en Informatique et Systèmes d'Information",
            isimmPeriod: "2020 - 2023"
        },
        certifications: {
            title: "Certifications",
            cisco: "Associé Cisco DevNet",
            ccna: "CCNA 1 & 2",
            scrum: "SFPC™ Fondamentaux Scrum",
            mongodb: "Certification MongoDB"
        },
        languages: {
            title: "Langues",
            arabic: "Arabe",
            arabicLevel: "Natif",
            french: "Français",
            frenchLevel: "DELF B2",
            english: "Anglais",
            englishLevel: "B2"
        }
    },

    // About Section details (for direct element updates)
    aboutDetails: {
        polyName: "École Polytechnique de Sousse",
        polyDegree: "Ingénierie Logicielle",
        isimmName: "Institut Supérieur de Mathématiques et d'Informatique Monastir",
        isimmDegree: "Licence en Informatique et Systèmes d'Information",
        certCisco: "Associé Cisco DevNet",
        certCcna: "CCNA 1 & 2",
        certScrum: "SFPC™ Fondamentaux Scrum",
        certMongodb: "Certification MongoDB"
    },

    // Experience Section
    experience: {
        title: "Expérience",
        altadigit: {
            company: "Stage d'Été - AltaDigit",
            duration: "Durée: 2 mois",
            bullet1: "Développé la plateforme SmartMoney: solution complète d'immigration et d'investissement canadienne",
            bullet2: "Implémenté la gestion immobilière, l'intégration des marchés financiers et des outils alimentés par l'IA",
            bullet3: "Déployé sur une infrastructure VPS avec des optimisations de niveau pré-production"
        },
        titc: {
            company: "Co-fondateur - TITC",
            duration: "Durée: 4 ans",
            bullet1: "Animé des podcasts d'événements en ligne et construit des initiatives communautaires IT à travers la Tunisie",
            bullet2: "Géré le design graphique et l'infrastructure IT pour l'engagement communautaire"
        },
        tudigisec: {
            company: "Stage d'Été - TUDIGISEC",
            duration: "Durée: 2 mois",
            bullet1: "Développé une plateforme de sécurité avec architecture multi-locataire",
            bullet2: "Contribué aux spécifications et à la conception architecturale conceptuelle"
        },
        tunisiancloud: {
            company: "Stage de Licence - Tunisian Cloud",
            duration: "Durée: 5 mois",
            bullet1: "Construit une plateforme de gestion de projets agile et prédictive",
            bullet2: "Créé des spécifications techniques et une documentation architecturale"
        }
    },

    // Projects Section
    projects: {
        title: "Projets en Vedette",
        smartMoney: {
            badge: "Plateforme en Ligne",
            type: "Plateforme d'Immigration et d'Investissement Canadienne",
            description: "Application web full-stack intégrée avec immobilier, marchés financiers, assistant financier IA et ressources d'immigration. Déployée sur VPS avec Nginx, chiffrement SSL/TLS et gestion de processus PM2."
        },
        earnBits: {
            badge: "Démo en Ligne",
            type: "Plateforme de Publicité Numérique et de Récompenses",
            description: "Architecture de microservices avec gestion de campagnes, enchères en temps réel, traitement des paiements et tableau de bord analytique. Déploiement containerisé avec pipeline CI/CD."
        },
        vahila: {
            type: "Plateforme E-commerce Microservices",
            description: "Architecture orientée événements implémentant les principes des systèmes distribués avec file d'attente de messages, mise en cache et communication gRPC."
        },
        youtube: {
            type: "Système de Réponse de Commentaires Alimenté par l'IA",
            description: "Réponse automatique intelligente avec analyse des sentiments utilisant GPT-4. Surveillance des commentaires en temps réel avec génération de réponses contextuelles."
        },
        dataflow: {
            type: "Plateforme de Traitement de Big Data",
            description: "Système de traitement distribué gérant des données à grande échelle avec analytique en temps réel, pipelines ETL et intégration de modèles ML."
        },
        teamflow: {
            type: "Gestion de Projets Agile et Prédictive",
            description: "Plateforme pour l'exécution agile, la collaboration et la gestion des ressources avec planification de sprint, suivi des tâches et diagrammes de Gantt."
        }
    },

    // GitHub Section
    github: {
        title: "Dépôts GitHub",
        repositories: "Dépôts",
        totalStars: "Étoiles Totales",
        totalForks: "Forks Totaux",
        loading: "Chargement des dépôts...",
        showMore: "Afficher Plus",
        showLess: "Afficher Moins",
        viewAll: "Voir Tout sur GitHub"
    },

    // Skills Section
    skills: {
        title: "Compétences Techniques",
        languages: "Langages",
        frontend: "Frontend",
        backend: "Backend",
        databases: "Bases de Données",
        cloud: "Cloud & DevOps",
        architecture: "Architecture",
        aiData: "IA & Données",
        softSkills: "Compétences Générales"
    },

    // Leadership Section
    leadership: {
        title: "Leadership & Communauté",
        ieee: {
            org: "Organisation IEEE",
            role: "Membre",
            period: "2024 - Présent"
        },
        acm: {
            org: "Club ACM EPS",
            role: "Membre",
            period: "2024 - 2025"
        },
        cpu: {
            org: "CPU ISIMM",
            role: "Graphiste",
            period: "2021 - 2023"
        },
        ycm: {
            org: "Young Creative Minds",
            role: "Vice-Président",
            period: "2019 - 2021"
        },
        interests: {
            title: "Domaines d'Intérêt",
            tag1: "Innovation Technologique",
            tag2: "Systèmes Distribués",
            tag3: "Architecture Cloud",
            tag4: "IA/Apprentissage Automatique",
            tag5: "Contribution Open Source"
        }
    },

    // Contact Section
    contact: {
        title: "Entrer en Contact",
        heading: "Travaillons ensemble !",
        description: "Je recherche actuellement des opportunités de stage. N'hésitez pas à me contacter si vous souhaitez discuter de collaborations ou projets potentiels.",
        email: "Email",
        phone: "Téléphone"
    },

    // Footer
    footer: {
        rights: "Tous droits réservés."
    },

    // Common
    common: {
        loading: "Chargement...",
        error: "Erreur",
        retry: "Réessayer"
    }
};
