import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Ray",
  lastName: "Chen",
  name: `Ray Chen`,
  role: "Research Assistant @NYU Future Reality Lab",
  avatar: "/images/self.jpg",
  email: "chenruitao666666@outlook.com",
  location: "America/New_York", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/RayChen666",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/raychen666666/",
    essential: true,
  },
  /*
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/once_ui/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@once_ui",
    essential: true,
  },
  */
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "",
  },
  subline: (
    <></>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Ray is a second-year Master's student in Computer Science at NYU's Courant Institute, 
        specializing in XR research and development. His work focuses on end-to-end prototyping 
        of interactive XR experiences, with research interests at the intersection of robot 
        control, HCI, and Mixed Reality.

        Beyond work, Ray is a classical music enthusiast with four years of vocal training, 
        and a serious collector of fountain pens, watches, blu-ray discs, and Chinese antiques.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "NYU Future Reality Lab",
        timeframe: "April 2025 - Present (New York City, NY)",
        role: "Research Assistant (On-Site)",
        achievements: [
          <>
            Collaborated with Agile Robotics And Perception Lab (UC Berkeley) to 
            develop the WebXR user interface, 6-channel WebSocket (including odometry, 
            mpl path, final goal, etc) connecting to ROS2 backend for various sensor control 
            of swarm (5) drone navigation planner (full paper accepted by IEEE ICRA 2026 conference).
          </>,
          <>
            Prototyped a real-time AI chatbot integrated into an online meeting platform Bici, enabling 
            users to manipulate 3D scene animations via natural language commands; implemented structured 
            prompt engineering with Google Gemini Studio API to generate executable JSON control code. (work 
            result will be formatted to proposal submitting to NSF National Funding).
          </>,
          <>
            Designed and developed interactive WebXR-based VR lecture experiences for NYU graduate Virtual 
            Reality course (CSCI-GA 3033), using Node.js and a customized 3D computer graphics framework to 
            enable real-time, immersive interaction in both teaching and learning.
          </>
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          /*
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
          */
        ],
      },
      {
        company: "Spatial Front, Inc",
        timeframe: "July 2023 – August 2023 (Washington, D.C.)",
        role: "Data Engineer Intern in Quality Assurance (Remote)",
        achievements: [
          <>
            Performed Front End API tests in the GIS (Geographic Information System) developing environment 
            using Postman and Swagger UI. Compiled 20+ test cases and uploaded on Jira Platform to track display 
            issues of the web-interface of GIS software.
          </>,
          <>
            Utilized K-means Clustering to determine the performance of newly developed features in a company's 
            database system via Azure Studio and Docker. Discovered 10+ noisy data sets. Consulted with the manager 
            and updated the code to solve the issue.
          </>,
        ],
        images: [],
      },
      {
        company: "7thOnline, Inc",
        timeframe: "June 2022 – August 2022 (New York City, NY)",
        role: "Software Engineer Intern (On-Site)",
        achievements: [
          <>
            Assisted SaaS (Software as a Service) customer support team in adjusting functionalities of software 
            programs “Wholesale, DTC, and 7thOnline” to satisfy the needs of client companies. Increased the workflow 
            efficiency of clients by 15%.
          </>,
          <>
            Drafted feasibility reports on the optimization of the CBR (Case-Based Reasoning) and Clustering algorithm 
            with Dr. Saman Hong to improve the performance of current software, increased the prediction precision of 
            customer preference by 10%.
          </>,
          <>
            Compiled Java test cases to examine data visualization of the company’s unreleased application “7thLite” on 
            both PC and mobile platforms, wrote 20+ Bug Reports, and uploaded them to the debugging system to increase 
            the stability of the new software.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "New York University",
        description: <>Master of Science (M.S.) in Computer Science</>,
      },
      {
        name: "The Ohio State University",
        description: 
        <>Bachelor of Science (B.S.) in Mathematics & Minor in Computer Science</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Full-Stack Software Development",
        description: (
          <>End-to-end web-based software development & deployment</>
        ),
        tags: [
          {
            name: "HTML",
            icon: "html5",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Java",
            icon: "java",
          },
          {
            name: "FastAPI",
            icon: "fastapi",
          },
          {
            name: "Docker",
            icon: "docker",
          },
          {
            name: "MySQL",
            icon: "sql",
          },
        ],
      },
      
      {
        title: "LLM and Agent",
        description: (
          <>LLM prompt engineering with integration to agent design and tool calling</>
        ),
        tags: [
          {
            name: "Gemini API",
            icon: "gemini",
          },
          {
            name: "LangChain",
            icon: "langchain",
          },
        ],
      },

      {
        title: "WebXR Prototyping",
        description: (
          <>Proficient prototyping XR user experience for academic research & college education</>
        ),
        tags: [
          {
            name: "Three.js",
            icon: "threejs",
          },
          {
            name: "Node.js",
            icon: "nodejs",
          }
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },

      {
        title: "Machine Learning",
        description: (
          <>Project & internship experience in computer vision pipeline</>
        ),
        tags: [
          {
            name: "TensorFlow",
            icon: "tensorflow",
          },
          {
            name: "Colab",
            icon: "colab",
          },
          {
            name: "Mediapipe",
            icon: "mediapipe",
          },
          {
            name: "OpenCV",
            icon: "opencv",
          },
          {
            name: "PyTorch",
            icon: "pytorch",
          },
        ],
        images: [],
      },

      {
        title: "Research",
        description: (
          <>Begin learning for composing research paper</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
          {
            name: "LaTex",
            icon: "latex",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          /*
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          */
        ],
      },
      
      {
        title: "Others",
        description: (
          <>Perform end-to-end software testing in various platforms</>
        ),
        tags:[
          {
            name: "Linux",
            icon: "linux",
          },
          {
            name: "Postman",
            icon: "postman",
          },
          {
            name: "Jira",
            icon: "jira",
          },

          {
            name: "GitHub",
            icon: "github",
          },
        ],
        images: [],
      }
      
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  // title: `${person.firstName}'s Projects`,
  title: `PROJECTS`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
