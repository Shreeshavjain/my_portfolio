// /data/siteConfig.ts

// ─── PERSONAL ───────────────────────────────────────────────
export const person = {
  name: "Shreesha V Jain",
  firstName: "Shreesha",
  lastName: "V Jain.",
  role: "Full Stack Developer & AI/ML Engineer",
  bio: "Full Stack Developer & AI/ML Engineer building <full-stack>scalable web applications</full-stack> and working with <devops>Artificial Intelligence and Machine Learning</devops>.",
  email: "jainshreeshav@gmail.com",
  location: "Shimoga, Karnataka, India",
  timezone: "Asia/Kolkata",
  available: true,
  year: "2026",
} as const;

// ─── SOCIALS ────────────────────────────────────────────────
export const socials = {
  github: "https://github.com/Shreeshavjain",
  linkedin: "https://www.linkedin.com/in/shreesha-v-jain-b712a6382/",
  instagram: "https://www.instagram.com/jainshreeshav/?hl=en",
  twitter: "https://x.com",
  leetcode: "https://leetcode.com",
  email: `mailto:${person.email}`,
} as const;

// ─── RESUME ─────────────────────────────────────────────────
export const resume = {
  url: "https://drive.google.com/file/d/1xCRjIGB-hHnn6idYZWaBmDFM3_KIk7qM/view?usp=sharing",
} as const;

// ─── TECH STACK ─────────────────────────────────────────────
export interface TechItem {
  label: string;
  hoverColor: string;
}

export const techStack: { row1: TechItem[]; row2: TechItem[] } = {
  row1: [
    { label: "React", hoverColor: "#61DAFB" },
    { label: "Next.js", hoverColor: "#ffffff" },
    { label: "TypeScript", hoverColor: "#3178C6" },
    { label: "Tailwind", hoverColor: "#06B6D4" },
    { label: "Gemini API", hoverColor: "#8B5CF6" },
    { label: "PostgreSQL", hoverColor: "#336791" },
  ],
  row2: [
    { label: "Node.js", hoverColor: "#68A063" },
    { label: "Java", hoverColor: "#FFD43B" },
    { label: "MongoDB", hoverColor: "#00ED64" },
    { label: "Framer Motion", hoverColor: "#FF0080" },
    { label: "Docker", hoverColor: "#2496ED" },
    { label: "Prisma", hoverColor: "#DC382D" },
  ],
};

// ─── EXPERIENCE ──────────────────────────────────────────────
export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  current: boolean;
}

export const experiences: Experience[] = [
  {
    company: "Open for work",
    role: "Full Stack Developer",
    period: "Current",
    description:
      "Actively seeking new challenges in Software Engineering or System Architecture. Open to freelance projects, contract work, or full-time roles where I can build scalable, high-performance solutions.",
    current: true,
  },
  {
    company: "TechieBears Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "2024 — 2025",
    description:
      "Engineered high-performance web platforms with a focus on GSAP animations and IndexedDB for offline persistence. Managed the end-to-end SDLC using React, Node.js, and TypeScript to build responsive, robust systems.",
    current: false,
  },
];

// ─── EDUCATION ───────────────────────────────────────────────
export interface Education {
  degree: string[];
  institution: string;
  period: string;
  grade: string;
  location: string;
  status: "current" | "completed";
  color: "primary" | "blue" | "emerald" | "orange" | "muted";
}

export const education: Education[] = [
  {
    degree: ["B.Tech", "Artificial Intelligence & Machine Learning"],
    institution: "NMAM Institute of Technology, Nitte",
    period: "CURRENT • SEM 3",
    grade: "9.17 CGPA",
    location: "Nitte, Karnataka, India",
    status: "current",
    color: "primary",
  },
  {
    degree: ["PUC", "(12th Grade)"],
    institution: "PACE PU College, Tavarachatnahalli",
    period: "2025",
    grade: "88.67%",
    location: "Shivamogga, Karnataka, India",
    status: "completed",
    color: "blue",
  },
  {
    degree: ["SSLC", "(10th Grade)"],
    institution: "Sri Ramakrishna Vidyaniketan, Gopal",
    period: "2023",
    grade: "86.08%",
    location: "Shivamogga, Karnataka, India",
    status: "completed",
    color: "orange",
  }
];

// ─── PROJECTS ────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Genix AI SaaS Platform",
    description:
      "A comprehensive MERN AI platform offering content generation, image manipulation, and resume reviewing.",
    tags: ["MERN Stack", "AI Models", "SaaS", "Cloudinary"],
    link: "https://github.com/Vighnesh-Gaddam/Genix---generate-anything",
    repo: "https://github.com/Vighnesh-Gaddam/Genix---generate-anything",
  },
  {
    id: "2",
    title: "Restaurant Management System",
    description:
      "A freelance full-stack solution built in just one week. Features separate Client and Admin dashboards.",
    tags: ["MERN", "Freelance", "Tailwind CSS", "Cloudinary"],
    link: "https://restuarent-client-frontend.vercel.app/",
    repo: "https://github.com/Vighnesh-Gaddam/Restuarent-Admin-Frontend",
  },
  {
    id: "3",
    title: "Hirrd Job Portal",
    description:
      "A modern job platform connecting recruiters and candidates. Built with Clerk for enterprise-grade authentication.",
    tags: ["React JS", "Supabase", "Clerk Auth", "Shadcn UI"],
    link: "https://hirrdjobs.vercel.app/",
    repo: "https://github.com/Vighnesh-Gaddam/JobPortal",
  },
  {
    id: "4",
    title: "Homyz Real Estate",
    description:
      "Full-stack property marketplace featuring Auth0 security and Cloudinary image hosting.",
    tags: ["MongoDB", "Express", "Mantine UI", "Auth0"],
    link: "https://homyz-real-estate-project.vercel.app/",
    repo: "https://github.com/Vighnesh-Gaddam/Real-Estate-Project",
  },
  {
    id: "5",
    title: "Next.js & Prisma Learning Journal",
    description:
      "A technical documentation project tracking 26+ modules of Next.js mastery.",
    tags: ["Next.js", "Prisma", "Server Actions", "Documentation"],
    link: "https://github.com/Vighnesh-Gaddam/NextJS-daily-learning-journal",
    repo: "https://github.com/Vighnesh-Gaddam/NextJS-daily-learning-journal",
  },
];

// ─── TESTIMONIALS ────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rohit Miryala",
    role: "SDE",
    company: "TechieBears Pvt. Ltd.",
    text: "Shreesha worked with us on a full-stack platform and handled the UI side really well. The GSAP animations implemented were smooth and actually improved the feel of the product. Shreesha is very detail-oriented and easy to work with.",
  },
  {
    id: "2",
    name: "Srushtika Vallal",
    role: "College Student",
    company: "Freelance Client",
    text: "I had only 24 hours left and my project was just a basic frontend with static data. He turned it into a fully working project with everything needed. I was really stressed at first, but seeing it all come together properly at the end was a huge relief."
  },
  {
    id: "3",
    name: "Twinkle Hanwate",
    role: "College Student",
    company: "Freelance Client",
    text: "I had to get a project done within a week for college, and he helped me pull it off without stress. Everything was ready on time, looked clean, and worked properly. Really helped me meet my deadline.",
  },
  {
    id: "4",
    name: "Vishal Kirtyanya",
    role: "SDE",
    company: "Freelance Client",
    text: "I reached out to him for a bunch of small tasks and he got them done quickly without any back and forth. He understands what needs to be done and just executes it cleanly.",
  },
];

// ─── BLOG ────────────────────────────────────────────────────
export interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "How I Structure Full Stack Apps with Next.js and Prisma",
    description: "A practical breakdown of building scalable and maintainable full-stack applications using Next.js, Prisma, and TypeScript.",
    slug: "nextjs-prisma-production-architecture",
    date: "2026-04-04",
    readTime: "6 min",
    tags: ["Next.js", "Prisma", "TypeScript", "Full Stack", "Backend"],
    category: "fullstack",
  },
];

export interface BlogCategory {
  id: string;
  label: string;
}

export const blogCategories: BlogCategory[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "devops", label: "DevOps" },
  { id: "dsa", label: "DSA" },
  // { id: "system-design", label: "System Design" },
  // { id: "career", label: "Career" },
  // { id: "tools", label: "Tools" },
];

// ─── SEO / METADATA ──────────────────────────────────────────
export const seo = {
  url: "https://shreeshavjain-fawn.vercel.app/",
  siteName: "Shreesha V Jain Portfolio",
  ogImage: "https://shreeshavjain-fawn.vercel.app/og-image.png",
  twitterHandle: "",
  googleVerification: "cIA6t7lrm7bP85h9L0MiaI6I5a3yfqBvbs4De7nFfCs",
} as const;