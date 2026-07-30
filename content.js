/**
 * Single source of truth for CV data.
 * main.js reads this to publish schema.org structured data (so recruiters
 * searching Google see rich results). Update here when your CV changes.
 */
export const content = {
    profile: {
        name: "Anas Alshaer",
        title: "Backend Software Engineer",
        image: "/profile.png",
        headline: "Software Engineer | Back-end Developer | WAMY Academic Scholar",
        bio:
            "Motivated Software Engineer specializing in backend development, with strong hands-on experience in C#, .NET, and Java. Recipient of the Jaheziya (Readiness) Medal for Outstanding Performance in Software Engineering from the Education & Training Evaluation Commission (ETEC) and MCIT. Skilled in building scalable RESTful APIs, microservices architectures, and designing relational databases using SQL Server and PostgreSQL. Proficient with Docker, Git, and modern backend development practices, with a strong focus on clean code, performance, and maintainability.",
        contact: {
            phone: "+966533295739",
            email: "anasmn2011@hotmail.com",
            location: "Riyadh, Saudi Arabia",
            linkedin: "https://www.linkedin.com/in/anas-alshaer-728aa0266",
            github: "https://github.com/AnasAlshaer1"
        }
    },

    education: {
        degree: "Bachelor of Science in Software Engineering",
        school: "King Saud University",
        location: "Riyadh, Saudi Arabia",
        graduated: "June 2026",
        honors: "First Class Honors"
    },

    awards: [
        {
            title: "Jaheziya (Readiness) Medal for Outstanding Performance in Software Engineering",
            issuer: "Education & Training Evaluation Commission (ETEC) in collaboration with MCIT",
            date: "June 2026",
            description:
                "Awarded the national Jaheziya Medal for achieving outstanding performance on the standardized evaluation for Software Engineering graduates, validating competency in software architecture, system design and modern backend practices."
        },
        {
            title: "WAMY Academic Scholar",
            issuer: "World Assembly of Muslim Youth",
            description: "Academic scholarship supporting Software Engineering studies at King Saud University."
        }
    ],

    certifications: [
        { title: "Jaheziya Medal for Outstanding Performance in Software Engineering", issuer: "ETEC & MCIT", date: "2025 – 2026" },
        { title: "Leadership Accelerator Program", issuer: "Global Office of Senior Trainers Academy" },
        { title: "Database-SQL (Concepts and Practice)" },
        { title: "Use Generative AI for Software Development", issuer: "IBM SkillsBuild" }
    ],

    skills: [
        { group: "Languages & Core", items: ["C#", "Java", "C++", "T-SQL", "OOP"] },
        {
            group: "Backend & Architecture",
            items: [".NET Framework", "Spring Boot", "Microservices", "REST APIs"]
        },
        {
            group: "Data & Persistence",
            items: ["MS SQL Server", "PostgreSQL", "ADO.NET", "Database Design", "Query Optimization"]
        },
        { group: "Professional", items: ["Leadership", "Communication", "Problem Solving", "Code Review", "Agile Collaboration"] }
    ],

    languages: [
        { name: "Arabic", level: "Native proficiency" },
        { name: "English", level: "Professional working proficiency" }
    ],

    projects: [
        {
            title: "Mofwah — AI-Powered Voice Agent for Call Center Automation",
            period: "Sep 2025 — May 2026",
            role: "Backend Developer · 5-member team · King Saud University",
            featured: true,
            repo: null,
            summary:
                "A high-availability AI voice agent platform that automates 24/7 call center operations — inbound and outbound support, sales, and appointment scheduling — synchronizing with external CRM systems.",
            highlights: [
                "Architected a distributed Spring Boot microservices backend with independent Agent, Workflow, Phone and Campaign services.",
                "Decoupled telephony handshakes behind a Facade design pattern plus REST/Webhook architecture for seamless integration with local telecom providers.",
                "Implemented a financial and subscription engine with Stripe and webhook-driven state management, eliminating manual billing state tracking.",
                "Ensured production-grade reliability with Spring Cloud Gateway routing, Resilience4j fault tolerance and secure NAT-gateway egress to ElevenLabs and Twilio.",
                "Containerized with Docker and Docker Compose, backed by PostgreSQL for persistence and Redis for distributed caching; validated with Postman and JUnit."
            ],
            stack: ["Spring Boot", "Microservices", "Spring Cloud Gateway", "Resilience4j", "PostgreSQL", "Redis", "Docker", "Stripe", "Twilio", "ElevenLabs"]
        },
        {
            title: "DVLD — Driver & Vehicle License Management System",
            period: "Aug 2025 — Nov 2025",
            role: "Solo project",
            repo: "https://github.com/AnasAlshaer1/DVLD-Driver-License-Management-System-",
            summary:
                "A full-featured Driving & Vehicle License management system built on a strict 3-tier architecture separating the UI, business logic and data access layers.",
            highlights: [
                "Manages real-world DVLD operations: registering people and drivers, issuing and renewing licenses, processing applications and managing users with role-based access control.",
                "Designed the relational schema in SQL Server with integrity constraints and optimized querying.",
                "Built the data access layer with ADO.NET for efficient, secure communication with the database.",
                "Centralized business rules and validation in the business layer to keep operations consistent and correct."
            ],
            stack: ["C#", ".NET Framework", "ADO.NET", "SQL Server", "Windows Forms", "3-Tier Architecture"]
        },
        {
            title: "Job Management System — Microservices Architecture",
            period: "Dec 2025 — Jan 2026",
            role: "Solo project",
            repo: "https://github.com/AnasAlshaer1/Job-Management-System-Microservices-Architecture",
            summary:
                "A distributed backend where independent Job, Company and Review services collaborate to provide unified responses — a monolith deliberately decomposed into a resilient service mesh.",
            highlights: [
                "Eureka Server for dynamic service registration and discovery.",
                "RabbitMQ for asynchronous, reliable inter-service communication.",
                "Zipkin distributed tracing for end-to-end observability.",
                "Containerized with Docker and Docker Compose using PostgreSQL for persistent storage; APIs validated with Postman."
            ],
            stack: ["Spring Boot", "Eureka", "RabbitMQ", "Zipkin", "PostgreSQL", "Docker Compose", "Postman"]
        },
        {
            title: "Bank Management System",
            period: "Jun 2024 — Aug 2024",
            role: "Solo project",
            repo: "https://github.com/AnasAlshaer1/BankSystem",
            summary:
                "A C++ console application handling core banking transactions and secure financial data management.",
            highlights: [
                "Account management: adding, deleting and updating client records.",
                "Transaction processing: transfers, deposits, withdrawals and balance inquiries.",
                "Durable persistence across sessions using structured file storage."
            ],
            stack: ["C++", "OOP", "File I/O", "Data Structures"]
        }
    ]
};
