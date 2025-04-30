export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | number;
  skills: string[];
  postedAt: string;
  applyLink: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  type: string; // full-time, part-time, contract, etc.
  experience: string; // 0-1 years, 1-3 years, 3-5 years, 5+ years
  aboutCompany?: string; // Optional field
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechGiant",
    location: "San Francisco, CA",
    salary: "150000-180000",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    postedAt: "2025-01-15T10:30:00Z",
    applyLink: "https://linkedin.com/jobs/view/1",
    description: "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications. You will work closely with designers and backend developers to implement features and ensure a seamless user experience.",
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with Next.js and server-side rendering",
      "Knowledge of state management libraries (Redux, Zustand, etc.)",
      "Experience with CSS frameworks like Tailwind CSS",
      "Familiarity with GraphQL and REST APIs",
      "Strong communication and collaboration skills"
    ],
    responsibilities: [
      "Develop and maintain frontend components and features",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, efficient, and maintainable code",
      "Optimize applications for maximum performance",
      "Participate in code reviews and architectural discussions",
      "Mentor junior developers"
    ],
    type: "full-time",
    experience: "5+ years"
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "130000-160000",
    skills: ["JavaScript", "Node.js", "React", "MongoDB", "AWS"],
    postedAt: "2025-01-18T14:45:00Z",
    applyLink: "https://linkedin.com/jobs/view/2",
    description: "StartupXYZ is seeking a talented Full Stack Developer to join our growing team. As a Full Stack Developer, you will work on all aspects of our web application, from the database to the user interface. You will collaborate with product managers, designers, and other developers to build and maintain features that delight our users.",
    requirements: [
      "3+ years of full stack development experience",
      "Proficiency in JavaScript, Node.js, and React",
      "Experience with MongoDB or other NoSQL databases",
      "Familiarity with AWS or other cloud platforms",
      "Knowledge of RESTful API design",
      "Understanding of CI/CD pipelines"
    ],
    responsibilities: [
      "Develop and maintain both frontend and backend components",
      "Design and implement database schemas",
      "Build and maintain RESTful APIs",
      "Deploy and manage applications in cloud environments",
      "Participate in agile development processes",
      "Troubleshoot and fix bugs and performance issues"
    ],
    type: "full-time",
    experience: "3-5 years"
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Remote",
    salary: "140000-170000",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Data Visualization"],
    postedAt: "2025-01-20T09:15:00Z",
    applyLink: "https://linkedin.com/jobs/view/3",
    description: "AI Innovations is looking for a Data Scientist to join our research team. You will work on developing and implementing machine learning models to solve complex business problems. You will analyze large datasets, extract insights, and create visualizations to communicate findings to stakeholders.",
    requirements: [
      "Master's or PhD in Computer Science, Statistics, or related field",
      "Strong programming skills in Python",
      "Experience with machine learning frameworks like TensorFlow or PyTorch",
      "Proficiency in SQL and data manipulation",
      "Knowledge of data visualization tools",
      "Understanding of statistical analysis"
    ],
    responsibilities: [
      "Develop and implement machine learning models",
      "Analyze large datasets to extract insights",
      "Create visualizations to communicate findings",
      "Collaborate with engineering teams to deploy models to production",
      "Stay up-to-date with latest research and techniques",
      "Present findings to stakeholders"
    ],
    type: "full-time",
    experience: "3-5 years"
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudSolutions",
    location: "Austin, TX",
    salary: "130000-160000",
    skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform", "Linux"],
    postedAt: "2025-01-22T11:30:00Z",
    applyLink: "https://linkedin.com/jobs/view/4",
    description: "CloudSolutions is seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You will be responsible for designing, implementing, and maintaining our CI/CD pipelines, infrastructure as code, and monitoring systems. You will work closely with development teams to ensure smooth deployments and optimal performance.",
    requirements: [
      "3+ years of experience in DevOps or Site Reliability Engineering",
      "Strong knowledge of Kubernetes and container orchestration",
      "Experience with AWS or other cloud providers",
      "Proficiency in infrastructure as code tools like Terraform",
      "Experience with CI/CD tools and methodologies",
      "Strong Linux administration skills"
    ],
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage and optimize cloud infrastructure",
      "Implement infrastructure as code practices",
      "Set up and maintain monitoring and alerting systems",
      "Troubleshoot and resolve infrastructure issues",
      "Collaborate with development teams to improve deployment processes"
    ],
    type: "full-time",
    experience: "3-5 years"
  },
  {
    id: "5",
    title: "Product Manager",
    company: "TechGiant",
    location: "Seattle, WA",
    salary: "160000-190000",
    skills: ["Product Management", "Agile", "User Research", "Data Analysis", "Roadmapping"],
    postedAt: "2025-01-25T15:00:00Z",
    applyLink: "https://linkedin.com/jobs/view/5",
    description: "TechGiant is looking for a Product Manager to lead the development of our flagship product. You will be responsible for defining the product vision, strategy, and roadmap. You will work closely with engineering, design, and marketing teams to deliver a product that meets user needs and business objectives.",
    requirements: [
      "5+ years of experience in product management",
      "Experience with agile development methodologies",
      "Strong analytical skills and data-driven decision making",
      "Excellent communication and presentation skills",
      "Ability to understand technical concepts and communicate with engineers",
      "Experience with user research and user-centered design"
    ],
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work with engineering teams to deliver features",
      "Analyze user feedback and market trends",
      "Conduct competitive analysis",
      "Communicate product plans to stakeholders"
    ],
    type: "full-time",
    experience: "5+ years"
  },
  {
    id: "6",
    title: "UX/UI Designer",
    company: "DesignWorks",
    location: "Los Angeles, CA",
    salary: "120000-150000",
    skills: ["UI Design", "UX Research", "Figma", "User Testing", "Prototyping"],
    postedAt: "2025-01-28T13:20:00Z",
    applyLink: "https://linkedin.com/jobs/view/6",
    description: "DesignWorks is seeking a talented UX/UI Designer to join our creative team. You will be responsible for designing intuitive and engaging user interfaces for web and mobile applications. You will conduct user research, create wireframes and prototypes, and collaborate with developers to implement your designs.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Strong portfolio showcasing user-centered design work",
      "Proficiency in design tools like Figma or Sketch",
      "Experience with user research and usability testing",
      "Knowledge of design systems and component libraries",
      "Understanding of accessibility standards"
    ],
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Develop and maintain design systems",
      "Collaborate with developers to implement designs",
      "Present design concepts to stakeholders"
    ],
    type: "full-time",
    experience: "3-5 years"
  },
  {
    id: "7",
    title: "Backend Developer",
    company: "StartupXYZ",
    location: "Chicago, IL",
    salary: "125000-155000",
    skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Kafka"],
    postedAt: "2025-01-30T10:10:00Z",
    applyLink: "https://linkedin.com/jobs/view/7",
    description: "StartupXYZ is looking for a Backend Developer to join our engineering team. You will be responsible for developing and maintaining our microservices architecture. You will design and implement APIs, optimize database performance, and ensure the scalability and reliability of our backend systems.",
    requirements: [
      "4+ years of experience in backend development",
      "Strong proficiency in Java and Spring Boot",
      "Experience with microservices architecture",
      "Knowledge of SQL and NoSQL databases",
      "Familiarity with message brokers like Kafka",
      "Understanding of RESTful API design principles"
    ],
    responsibilities: [
      "Design and implement backend services",
      "Develop and maintain RESTful APIs",
      "Optimize database queries and performance",
      "Ensure system scalability and reliability",
      "Participate in code reviews and technical discussions",
      "Troubleshoot and fix bugs and performance issues"
    ],
    type: "full-time",
    experience: "3-5 years"
  },
  {
    id: "8",
    title: "Mobile Developer (iOS)",
    company: "AppMakers",
    location: "San Diego, CA",
    salary: "130000-160000",
    skills: ["Swift", "iOS", "UIKit", "CoreData", "SwiftUI", "ARKit"],
    postedAt: "2025-02-02T09:45:00Z",
    applyLink: "https://linkedin.com/jobs/view/8",
    description: "AppMakers is seeking an experienced iOS Developer to join our mobile team. You will be responsible for developing and maintaining our iOS applications. You will implement new features, fix bugs, and ensure the performance and quality of our apps. You will work closely with designers and backend developers to deliver a seamless user experience.",
    requirements: [
      "3+ years of experience in iOS development",
      "Strong proficiency in Swift and UIKit",
      "Experience with CoreData and other iOS frameworks",
      "Knowledge of SwiftUI and modern iOS development practices",
      "Familiarity with RESTful APIs and JSON",
      "Understanding of App Store submission process"
    ],
    responsibilities: [
      "Develop and maintain iOS applications",
      "Implement new features and functionality",
      "Ensure app performance and quality",
      "Fix bugs and address technical debt",
      "Collaborate with designers and backend developers",
      "Participate in code reviews and technical discussions"
    ],
    type: "full-time",
    experience: "3-5 years"
  },
  {
    id: "9",
    title: "QA Engineer",
    company: "QualitySoft",
    location: "Denver, CO",
    salary: "110000-140000",
    skills: ["Test Automation", "Selenium", "Cypress", "API Testing", "JIRA", "Test Planning"],
    postedAt: "2025-02-05T14:30:00Z",
    applyLink: "https://linkedin.com/jobs/view/9",
    description: "QualitySoft is looking for a QA Engineer to join our quality assurance team. You will be responsible for ensuring the quality of our software products through manual and automated testing. You will design and implement test plans, write and execute test cases, and report bugs. You will work closely with developers and product managers to ensure that our products meet quality standards.",
    requirements: [
      "3+ years of experience in software quality assurance",
      "Experience with test automation frameworks like Selenium or Cypress",
      "Knowledge of API testing and tools like Postman",
      "Familiarity with defect tracking systems like JIRA",
      "Understanding of agile development methodologies",
      "Strong analytical and problem-solving skills"
    ],
    responsibilities: [
      "Design and implement test plans and test cases",
      "Execute manual and automated tests",
      "Identify, report, and track bugs",
      "Develop and maintain automated test scripts",
      "Participate in agile ceremonies and provide quality insights",
      "Collaborate with developers to resolve issues"
    ],
    type: "full-time",
    experience: "3-5 years"
  },
  {
    id: "10",
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    location: "Boston, MA",
    salary: "150000-180000",
    skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Deep Learning"],
    postedAt: "2025-02-08T11:20:00Z",
    applyLink: "https://linkedin.com/jobs/view/10",
    description: "AI Innovations is seeking a Machine Learning Engineer to join our AI research team. You will be responsible for developing and implementing machine learning models for various applications, including computer vision and natural language processing. You will work closely with data scientists and software engineers to deploy models to production and ensure their performance and reliability.",
    requirements: [
      "Master's or PhD in Computer Science, Machine Learning, or related field",
      "Strong programming skills in Python",
      "Experience with deep learning frameworks like TensorFlow or PyTorch",
      "Knowledge of computer vision or NLP techniques",
      "Familiarity with model deployment and MLOps practices",
      "Understanding of distributed computing and big data processing"
    ],
    responsibilities: [
      "Develop and implement machine learning models",
      "Collaborate with data scientists to prototype and validate models",
      "Work with software engineers to deploy models to production",
      "Optimize model performance and efficiency",
      "Stay up-to-date with latest research and techniques",
      "Present findings and results to stakeholders"
    ],
    type: "full-time",
    experience: "3-5 years"
  }
];