import {
  FaBriefcase,
  FaBootstrap,
  FaCss3Alt,
  FaEnvelope,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJsSquare,
  FaLinkedinIn,
  FaNodeJs,
  FaPhoneAlt,
  FaReact
} from "react-icons/fa";
import {
  SiExpress,
  SiFigma,
  SiMongodb,
  SiMysql,
  SiPython
} from "react-icons/si";

import busBookingImage from "../assets/bus-bookeing.png";
import ecommerceImage from "../assets/ecommerce.svg";
import socialMediaImage from "../assets/social-media.svg";

export const personalInfo = {
  name: "Abishek",
  brandName: "DevABISHEK",
  role: "MERN Stack Developer",
  location: "Tenkasi, Tamil Nadu",
  college: "JP College of Arts & Science",
  tagline: "Building responsive full-stack products with the MERN stack",
  heroDescription:
    "I build responsive and maintainable web applications with React.js, Node.js, Express.js, and MongoDB. My work focuses on turning practical product ideas into clean interfaces, reliable APIs, and smooth user experiences across devices.",
  aboutDescription:
    "I am a Bachelor of Science in Information Technology student and MERN stack developer with internship experience in responsive web application development. I enjoy building practical products, writing reusable frontend code, and structuring backend APIs and databases that are easy to maintain.",
  summary:
    "I combine strong academic basics with hands-on MERN projects, internship experience, and a practical approach to building clean, reliable web applications.",
  availability:
    "Open to internships, junior developer roles, and freelance opportunities focused on web development.",
  resumeHref: "/resume.pdf"
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export const skillItems = [
  { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
  { name: "CSS", icon: FaCss3Alt, color: "text-sky-500" },
  { name: "JavaScript", icon: FaJsSquare, color: "text-amber-400" },
  { name: "React", icon: FaReact, color: "text-cyan-400" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
  { name: "Express", icon: SiExpress, color: "text-slate-700 dark:text-slate-200" },
  { name: "MongoDB", icon: SiMongodb, color: "text-emerald-500" },
  { name: "MySQL", icon: SiMysql, color: "text-sky-400" },
  { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
  { name: "Bootstrap", icon: FaBootstrap, color: "text-violet-400" },
  { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
  { name: "Figma", icon: SiFigma, color: "text-[#F24E1E]" }
];

export const skillCategories = [
  {
    title: "Frontend Development",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design", "Bootstrap"]
  },
  {
    title: "Backend Development",
    items: ["Node.js", "Express", "Python", "RESTful APIs"]
  },
  {
    title: "Database & Tools",
    items: ["MongoDB", "MySQL", "Git"]
  },
  {
    title: "UI/UX Design",
    items: ["Figma", "Adobe Photoshop", "Wireframing", "User Interface Design", "User Experience"]
  }
];

export const education = {
  institution: "JP College of Arts & Science",
  degree: "Bachelor of Science in Information Technology",
  period: "2023 - 2026",
  cgpa: "7.5 CGPA",
  location: "Tenkasi, Tamil Nadu",
  coursework: [
    "Data Structures and Algorithms",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Object-Oriented Programming"
  ]
};

export const educationCards = [
  {
    title: "JP College of Arts & Science",
    subtitle: "Bachelor of Science in Information Technology",
    meta: "2023 - 2026 | CGPA: 7.5",
    icon: "college"
  },
  {
    title: "Core Coursework",
    subtitle: "DSA, DBMS, Operating Systems, Computer Networks, OOP",
    meta: "Academic focus areas",
    icon: "coursework"
  }
];

export const experience = [
  {
    company: "Qbatzclay",
    role: "Software Development Intern",
    period: "June 2025",
    duration: "Internship",
    location: "Tamil Nadu, India",
    icon: FaBriefcase,
    tech: ["React.js", "Bootstrap", "JavaScript", "Responsive UI"],
    points: [
      "Developed a responsive ticket booking web application using React.js and Bootstrap.",
      "Implemented dynamic booking forms and user account features for flight, train, bus, and car reservations.",
      "Designed reusable UI components and responsive layouts to improve usability and maintainability."
    ]
  },
  {
    company: "MoPower",
    role: "Data Entry Operator (Part-Time)",
    period: "Feb 2025 - Dec 2025",
    duration: "Part-Time",
    location: "Tamil Nadu, India",
    icon: FaBriefcase,
    tech: ["Data Entry", "Accuracy", "Confidentiality"],
    points: [
      "Balanced part-time professional work alongside academic responsibilities.",
      "Entered and organized large volumes of data with strong accuracy, confidentiality, and deadline discipline."
    ]
  }
];

export const projects = [
  {
    title: "BusBooker",
    description:
      "Built a full-stack bus ticket booking system with search, authentication, and reservation flows using the MERN stack.",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST API"],
    image: busBookingImage,
    liveDemo: "",
    github: "https://github.com/AbixDev-10/BusBooker.git"
  },
  {
    title: "E-commerce Web Application",
    description:
      "Developed a MERN-based e-commerce application with product listing, shopping cart, and order management functionality.",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    image: ecommerceImage,
    liveDemo: "",
    github: ""
  },
  {
    title: "JSON Refiner - Advanced Edition",
    description:
      "Created a Python utility that converts unstructured key-value text into structured JSON with automatic type inference and a Gradio interface.",
    techStack: ["Python", "Gradio", "JSON", "Type Inference"],
    image: socialMediaImage,
    liveDemo: "",
    github: "https://github.com/AbixDev-10/JSON_Refiner_Advanced_Edition.git"
  }
];

export const socialLinks = {
  github: "https://github.com/AbixDev-10",
  linkedin: "https://www.linkedin.com/in/abishek-s-3a2426345/"
};

export const contactCards = [
  {
    label: "Email",
    value: "abisheks2102004@gmail.com",
    icon: FaEnvelope,
    href: "mailto:abisheks2102004@gmail.com"
  },
  {
    label: "Phone",
    value: "6380734268",
    icon: FaPhoneAlt,
    href: "tel:+916380734268"
  },
  {
    label: "LinkedIn",
    value: socialLinks.linkedin,
    icon: FaLinkedinIn,
    href: socialLinks.linkedin
  },
  {
    label: "GitHub",
    value: socialLinks.github,
    icon: FaGithub,
    href: socialLinks.github
  }
];
