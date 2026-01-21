export const content = {
    profile: {
        name: "Anas Alshaer",
        title: "Software Engineer / Backend Developer",
        image: "/profile.png",
        bio: "Motivated Software Engineer with a strong academic background, I have extensive hands-on experience in developing robust back-end applications using C#, .NET, and Java. I am particularly skilled in building scalable systems using Spring Boot Microservices, with a solid understanding of database design, system architecture, and containerization using Docker. I am eager to apply problem-solving and teamwork skills to contribute to efficient, high-performance software solutions.",
        contact: {
            phone: "0533295739",
            email: "anasmn2011@hotmail.com",
            location: "Riyadh/Saudi Arabia",
            linkedin: "#",
            github: "#"
        }
    },
    skills: [
        "C#", ".NET", "Java", "Spring Boot", "Docker", "SQL Server", "Microservices", "Rest API", "Git/GitHub", "Postman"
    ],
    projects: [
        {
            title: "DVLD (Driver & Vehicle Licenses Department Project)",
            description: "I designed and implemented a comprehensive 3-tier backend system for managing citizen records and driver licensing data. The project focused on building a robust data access layer and implementing complex business logic using C#, .NET Framework, and ADO.NET. I designed the relational database schemas using SQL Server, ensuring data integrity and efficient querying. Throughout the development process, I applied advanced Object-Oriented Programming (OOP) principles to ensure the code remained maintainable, scalable, and organized for high-load administrative tasks."
        },
        {
            title: "Job Management System (Microservices Architecture)",
            description: "I developed a highly scalable and distributed backend application using Spring Boot Microservices, specifically focusing on transitioning a monolithic architecture into a decoupled system. The system consists of independent services for Job, Company, and Review management that collaborate to provide unified responses. For service orchestration, I utilized Eureka Server for dynamic service registration and discovery, while integrating RabbitMQ to handle asynchronous inter-service communication and reliable message queuing. To ensure high observability, I implemented distributed tracing with Zipkin and used Postman for comprehensive API request validation and testing. Finally, I fully containerized the application using Docker, managing the multi-container environment with Docker Compose and PostgreSQL for persistent data storage."
        },
        {
            title: "Bank Management System",
            description: "I built a C++ based console application designed to handle core banking transactions and secure financial data management. The system includes a wide range of features, including account management (adding, deleting, and updating users) and processing transactions such as transfers, withdrawals, and balance inquiries. To ensure the durability of user data across sessions, I implemented persistent data storage utilizing text files. This project was instrumental in strengthening my understanding of complex business logic implementation and manual data handling."
        }
    ]
};
