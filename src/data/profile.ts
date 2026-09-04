// Central source of truth for portfolio content.
// Update this file as new projects, experience, or corrections come in.

export const profile = {
  name: "Hamdan Tariq",
  location: "Quetta, Balochistan, Pakistan",
  email: "hamdantariqedu@gmail.com",
  github: "https://github.com/HamdanTariq26",
  linkedin: "https://www.linkedin.com/in/hamdan-tariq-89888736a",
  cv: "/cv.pdf",

  eyebrow: "Artificial Intelligence · Machine Learning · Computer Vision · Robotics · Autonomous Systems",

  role: "AI Undergraduate — NUST",

  headline: "I build intelligent systems that bring AI, computer vision, robotics, and machine learning into the real world.",

  intro:
    "I'm an Artificial Intelligence undergraduate at NUST, interested in building practical systems across machine learning, computer vision, robotics, and autonomous systems. My work spans learning models, vision-based applications, and intelligent systems that interact with the physical world.",

  photo: {
    src: "/images/hamdan-tariq.jpg",
    alt: "Hamdan Tariq",
    caption: "Hamdan Tariq",
  },

  about: {
    intro:
      "I'm an Artificial Intelligence undergraduate at NUST, focused on building intelligent systems that can perceive, learn, reason, and act.",
    interests: [
      "Artificial Intelligence & Machine Learning",
      "Computer Vision & Deep Learning",
      "Robotics & Autonomous Systems",
      "Medical Imaging & Object Detection",
      "Visual SLAM, Mapping & Navigation",
      "Drone-based and perception-driven systems",
    ],
    closing:
      "I learn best by building, experimenting, and turning ideas into working systems. My goal is to develop practical, capable, and increasingly autonomous intelligent systems that can solve real-world problems.",
  },
} as const;

export type ExperienceItem = {
  organization: string;
  partner?: string;
  role: string;
  period: string;
  location?: string;
  project?: string;
  summary: string;
  supervisors?: string[];
  fileUrl?: string;
};

export const experience: ExperienceItem[] = [
  {
    organization: "Educational Robotics Lab (ER Lab), NUST",
    partner: "International programme with the Eureka Robotics Centre, Cardiff Metropolitan University",
    role: "Intern, Robotics",
    period: "Jun – Aug 2026 (6 weeks)",
    summary:
      "Completed a 6-week internship at NUST's Educational Robotics Lab as part of an international collaboration with the Eureka Robotics Centre at Cardiff Metropolitan University. Gained exposure to robotics research, engineering practice, and academic collaboration.",
    supervisors: [
      "Dr. Shadan Khan Khattak — Head of Department, Engineering, Eureka Robotics Centre, Cardiff Met",
      "Dr. Farkhanda Afzal — Project Lead (Pakistan), ER Lab, NUST",
    ],
    fileUrl: "/certificates/internship-robotics.pdf",
  },
  {
    organization: "ZEMT Innovations",
    partner: "in collaboration with Educational Robotics Lab (ER Lab), NUST",
    role: "Intern, Data Science",
    period: "Jun – Jul 2026",
    project: "Urban Guard",
    summary:
      "Worked in the Data Science track on Urban Guard, an applied computer vision and AI project by ZEMT Innovations in collaboration with NUST's Educational Robotics Lab. Gained practical experience in data pipelines, analysis, and applied AI within a real engineering project context.",
    supervisors: [
      "Dr. Farkhanda Afzal — Principal Investigator, ER Lab, NUST",
      "Dr. Hayat Ali Shah — Academic Supervisor, ZEMT Innovations",
    ],
    fileUrl: "/certificates/internship-data-science.pdf",
  },
  {
    organization: "Al-Khwarizmi Robotics Lab",
    role: "Intern, Robotics",
    period: "Mar 2026 (2 Months)",
    location: "Quetta, Pakistan",
    summary:
      "Successfully completed a two-month internship on robotics at Al-Khwarizmi Robotics Lab, Quetta, under the leadership and direction of Engr. Hameed Khan (Founder & Director).",
    supervisors: [
      "Engr. Hameed Khan — Founder / Director, Al-Khwarizmi Robotics Lab Quetta",
    ],
    fileUrl: "/certificates/alkhwarizmi-robotics.jpeg",
  },
  {
    organization: "Alkhidmat Foundation Pakistan",
    role: "Intern, Volunteer Management Department",
    period: "Summer 2025 (6 Weeks)",
    project: "Alkhidmat Summer Internship Program 2025",
    summary:
      "Completed a 6-week hybrid internship under the Volunteer Management Department as part of the Alkhidmat Summer Internship Program 2025, receiving the program Achievement Award.",
    supervisors: [
      "Dr. Mushtaq Ahmad Mangat — Vice President, Alkhidmat Foundation Pakistan",
      "Muhammad Sannan Akbar — Head, Volunteer Management",
    ],
    fileUrl: "/certificates/alkhidmat-internship.jpeg",
  },
];

export type FocusItem = {
  label: string;
  period: string;
  description: string;
  tags: string[];
  href?: string;
};

export const focusItems: FocusItem[] = [
  {
    label: "Autonomous Drone",
    period: "2026",
    description:
      "A ROS2 autonomous-navigation stack for a DJI Tello: monocular ORB-SLAM3 visual SLAM with Depth Anything V2 for active metric scale recovery, plus 3D occupancy mapping and exploration planning layers in active development.",
    tags: ["ROS2", "ORB-SLAM3", "Depth Anything V2", "C++", "Python"],
    href: "https://github.com/HamdanTariq26/Autonomous_drone",
  },
  {
    label: "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation",
    period: "2026",
    description:
      "A two-model system combining a ResNet U-Net for multi-class brain tumor segmentation with a conditional diffusion model that synthesizes 4-modality MRI scans from masks. Led as a two-person project and trained on TPU.",
    tags: ["Deep Learning", "Diffusion Models", "PyTorch", "Medical Imaging"],
    href: "https://github.com/HamdanTariq26/Conditional-Multimodal-MRI-Synthesis-and-Brain-Tumor-Segmentation",
  },
  {
    label: "Gesture-Controlled Drone",
    period: "2026",
    description:
      "A real-time gesture-recognition pipeline controlling a DJI Tello in flight. Built on a self-collected dataset of 5,000+ hand-landmark samples, a feature-engineered classifier, and temporal smoothing for reliable control.",
    tags: ["Computer Vision", "MediaPipe", "Python", "Drones"],
    href: "https://github.com/HamdanTariq26/Gesture_Controlled_Drone",
  },
  {
    label: "Gesture-Controlled Robotic Hand",
    period: "2025",
    description:
      "An MPU6050-driven glove that maps hand orientation to real-time servo control on a 4-DOF robotic arm — connecting embedded sensing directly to actuation.",
    tags: ["Embedded Systems", "Arduino", "C++", "Robotics"],
    href: "https://github.com/HamdanTariq26/Robotic-Hand",
  },
  {
    label: "Animal Detection System",
    period: "2026",
    description:
      "Video-based detection across 52 animal classes, combining RT-DETR and YOLO through a mixture-of-experts approach for robust performance across varied conditions.",
    tags: ["Computer Vision", "RT-DETR", "YOLO", "Python"],
  },
  {
    label: "Chat-Me",
    period: "2025–2026",
    description:
      "A LAN chat and file-transfer application in C++ with a Qt GUI, custom asynchronous UDP transport, peer auto-discovery, and chunked file transfer.",
    tags: ["C++", "Qt", "Networking", "Systems"],
    href: "https://github.com/HamdanTariq26/Chat-Me",
  },
];

export type CertificationItem = {
  id: string;
  title: string;
  type: "Certification" | "Workshop / Technical Training";
  organization: string;
  partner?: string;
  period: string;
  hours?: string;
  summary: string;
  referenceId?: string;
  signatories?: string[];
  featured?: boolean;
  fileUrl: string;
};

export const certifications: CertificationItem[] = [
  {
    id: "hcia-ai",
    title: "Huawei Certified ICT Associate (HCIA-AI)",
    type: "Certification",
    organization: "Huawei & NUST School of Electrical Engineering & Computer Science (SEECS)",
    partner: "Huawei ICT Academy · HEC Pakistan",
    period: "03 Aug 2026 – 13 Aug 2026",
    hours: "16 instructional / lab hours",
    summary:
      "Formal certification training covering foundational principles of artificial intelligence, machine learning workflows, deep learning frameworks, and AI application architectures under the Huawei ICT Academy program.",
    signatories: [
      "Dr. Muhammad Daud Abdullah Asif — Course Instructor, Assistant Professor NUST-SEECS",
      "Mr. Ali Hassnain — Academy Admin / Instructor, Deputy Manager ICT Ops NUST-SEECS",
    ],
    featured: true,
    fileUrl: "/certificates/hcia-ai.pdf",
  },
  {
    id: "biomedical-bci",
    title: "Biomedical Instrumentation and Healthcare Control Systems in BCI",
    type: "Workshop / Technical Training",
    organization: "School of Mechanical & Manufacturing Engineering (SMME), NUST",
    partner: "In collaboration with Brock University, Canada",
    period: "10 Aug 2026 – 20 Aug 2026",
    hours: "2-week hands-on training",
    referenceId: "SMME/2026/0312",
    summary:
      "Completed a 2-week intensive workshop and hands-on training focusing on biomedical instrumentation, brain-computer interfaces (BCI), and control systems engineering applied to healthcare technology.",
    signatories: [
      "Dr. Mohsin Jamil — Associate Professor, Brock University, Canada",
      "Prof. Dr. Javaid Iqbal — Principal SMME, NUST",
    ],
    fileUrl: "/certificates/bci-workshop.pdf",
  },
];

export type OutreachPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export type OutreachModule = {
  title: string;
  description: string;
};

export type OutreachItem = {
  id: string;
  title: string;
  subtitle?: string;
  program?: string;
  type: string;
  organization: string;
  partner?: string;
  location: string;
  period: string;
  duration?: string;
  summary: string;
  fullStory: string[];
  highlights?: string[];
  modules?: OutreachModule[];
  demonstrations?: { name: string; description: string }[];
  supervisors?: string[];
  team?: string[];
  photos?: OutreachPhoto[];
  fileUrl?: string;
};

export const outreachActivities: OutreachItem[] = [
  {
    id: "namal-agritech",
    title: "From Above & Beyond: Drones, Computer Vision & Intelligent Systems in Agriculture",
    subtitle: "Demonstrating Autonomous Sensing, Aerial Profiling, and AI-Driven Decision Support for Smart Agriculture",
    program: "2nd Namal Agribusiness School 2026",
    type: "Applied Workshop · Smart Agriculture",
    organization: "Namal University, Mianwali & Educational Robotics Lab (NUST SEECS)",
    partner: "In collaboration with Nisar Aziz AgriTech Center, Eureka Robotics Centre & British Council",
    location: "Namal University, Mianwali, Punjab, Pakistan",
    period: "August 27–28, 2026",
    duration: "2-Day Workshop & Demonstration Session",
    summary:
      "Demonstrated applied drone, computer vision, and AI systems at the 2nd Namal Agribusiness School to explore how intelligent technologies can address productivity, water-stress assessment, and precision agriculture in rural communities.",
    fullStory: [
      "At the 2nd Namal Agribusiness School hosted by Namal University, Mianwali, the Educational Robotics Lab (NUST SEECS) presented a hands-on technical workshop titled 'From Above and Beyond: Drones, Computer Vision and Intelligent Systems in Agriculture.'",
      "The initiative was structured to bridge academic laboratory research with physical field applications, showcasing how autonomous robotics, multispectral computer vision, and machine learning models can move beyond the classroom to directly solve challenges faced by rural agricultural communities.",
      "As part of the NUST team under the supervision of Dr. Farkhanda Afzal, we presented three applied technological systems developed to make agriculture more data-driven, sustainable, and productive.",
      "The workshop brought together agricultural entrepreneurs, farmers, researchers, and university students, creating an active forum to demonstrate practical technologies and engage on how technology-driven precision farming can transform productivity in Pakistan."
    ],
    demonstrations: [
      {
        name: "PlantView — Plant, Tree & Disease Detection",
        description: "A computer vision pipeline designed for the aerial detection and mapping of trees and plants, along with the automated identification and diagnosis of their associated diseases from drone imagery."
      },
      {
        name: "Drone Swarm — Coordinated Agricultural Operations",
        description: "Multi-UAV coordination algorithms for wide-area coverage, synchronous flight planning, and scalable agricultural survey over large acreages."
      },
      {
        name: "Project Kisan — AI Agricultural Advisory Assistant",
        description: "An intelligent conversational advisory model providing accessible, localized agricultural insights and predictive guidance to farmers."
      }
    ],
    highlights: [
      "Crop health, vegetative indices, and multispectral vegetation monitoring.",
      "Water-stress detection and data-driven irrigation management.",
      "Precision spraying concepts and variable-rate chemical application.",
      "3D land topology, elevation, and soil mapping with aerial photogrammetry.",
      "Automated crop counting, density estimation, and yield prediction.",
      "AI-based agricultural decision support combining sensor data with local farming knowledge."
    ],
    supervisors: [
      "Dr. Farkhanda Afzal — Head of Educational Robotics Lab, NUST SEECS",
      "Dr. Shadan Khan Khattak — Eureka Robotics Centre, Cardiff Metropolitan University (UK)"
    ],
    team: [
      "Hamdan Tariq — BSAI-24, NUST",
      "Fahad Ali — BSCS-15E, NUST SEECS",
      "Farhad Khan — BSCS-15D, NUST SEECS"
    ],
    photos: [
      {
        src: "/images/outreach/namal-smart-agriculture-session.jpg",
        alt: "Live workshop presentation on smart agriculture at Namal University",
        caption: "Live interactive presentation on Drones, Computer Vision & Intelligent Systems in Agriculture"
      },
      {
        src: "/images/outreach/namal-team-showcase.jpg",
        alt: "NUST Educational Robotics Lab showcase setup at Namal",
        caption: "Demonstration setup featuring humanoid robots, drones, and aerial sensing hardware"
      },
      {
        src: "/images/outreach/namal-agribusiness-poster.jpg",
        alt: "2nd Namal Agribusiness School official poster",
        caption: "Official event schedule, thematic learning topics, and partner overview"
      }
    ]
  },
  {
    id: "gulhouse-robotics",
    title: "Taking Robotics Beyond the Lab: Inspiring Next-Gen Innovators",
    subtitle: "Hands-on Humanoid Robotics, Autonomous Demonstrations, and STEM Education for Rural School Students",
    program: "PIE Project · Educational Robotics Lab (NUST SEECS)",
    type: "School Robotics Workshop",
    organization: "Gulhouse International School System",
    partner: "Supported by Eureka Robotics Centre, Cardiff Metropolitan University & British Council",
    location: "Village Chowkhandi, District Talagang, Punjab, Pakistan",
    period: "August 2026",
    duration: "Hands-on Workshop & Live Demonstration",
    summary:
      "Conducted an interactive robotics workshop for students at Gulhouse International School System under the PIE Project, introducing young learners to robotics, humanoid platforms, and creative problem-solving.",
    fullStory: [
      "As part of the PIE (Pakistan-UK Education Partnership) Project, the Educational Robotics Lab (SEECS NUST) conducted a specialized robotics and STEM workshop for school students at Gulhouse International School System in Village Chowkhandi, District Talagang.",
      "The goal was to take cutting-edge robotics hardware out of advanced academic research labs and into community schools, providing young students with early, direct exposure to interactive robotics, autonomous machines, and engineering fundamentals.",
      "Along with fellow interns Fahad Ali and Farhad Khan, under the supervision of Dr. Farkhanda Afzal, we designed practical demonstration stations where students could see humanoid robot actuation up close, understand sensor feedback loops, and observe drone operations.",
      "The initiative directly aligns with Sustainable Development Goals (SDG 4: Quality Education, SDG 5: Gender Equality, SDG 9: Industry & Innovation, and SDG 17: Partnerships), empowering young minds to explore STEM pathways with confidence."
    ],
    modules: [
      {
        title: "Humanoid Robot Actuation & Movement",
        description: "Live demonstrations of servo actuation, degrees of freedom, and balancing with Alphamini and EZ-Robot JD platforms."
      },
      {
        title: "Sensory Perception & Human-Robot Interaction",
        description: "Explaining how cameras, ultrasonic sensors, and voice interfaces enable machines to recognize and respond to their environment."
      },
      {
        title: "Aerial Systems & Flight Dynamics",
        description: "Demonstrating multirotor flight mechanics, remote flight telemetry, and safety principles for drones."
      },
      {
        title: "Interactive Problem Solving",
        description: "Engaging students in creative thinking exercises on how robots can help humans solve everyday problems."
      }
    ],
    highlights: [
      "Hands-on humanoid robot demonstrations (Alphamini & EZ-Robot platforms).",
      "Interactive questions, tactile hardware interaction, and live coding demos for school learners.",
      "Fostering early confidence and interest in STEM, AI, and computer science in rural communities.",
      "Part of the international PIE Project in partnership with Cardiff Metropolitan University (UK)."
    ],
    supervisors: [
      "Dr. Farkhanda Afzal — Project Lead (Pakistan), Educational Robotics Lab, NUST SEECS",
      "Dr. Shadan Khan Khattak — Engineering Head, Eureka Robotics Centre, Cardiff Met (UK)"
    ],
    team: [
      "Hamdan Tariq — BSAI-24, NUST",
      "Fahad Ali — BSCS-15E, NUST SEECS",
      "Farhad Khan — BSCS-15D, NUST SEECS"
    ],
    photos: [
      {
        src: "/images/outreach/gulhouse-robotics-demo.jpg",
        alt: "Interactive humanoid robot demonstration with young students",
        caption: "Demonstrating humanoid robot balancing and actuation to students"
      },
      {
        src: "/images/outreach/gulhouse-workshop-team.jpg",
        alt: "Workshop team with students and faculty at Gulhouse School",
        caption: "Outreach team, school faculty, and students gathered at Gulhouse International School"
      }
    ]
  },
  {
    id: "aps-robotics",
    title: "Empowering the Next Generation through Robotics & AI",
    subtitle: "5-Day Special Robotics Training Workshop Introducing Humanoid Programming, Sensors, and Autonomous Systems",
    program: "PIE Project · Educational Robotics Lab (SEECS NUST)",
    type: "5-Day Intensive Robotics Workshop",
    organization: "Army Public School and College (APS Humayun Road)",
    partner: "Supported by STEMWomenPK, Eureka Robotics Centre, Cardiff Met & British Council",
    location: "Humayun Road, Rawalpindi, Pakistan",
    period: "31 Jul 2026",
    duration: "5-Day Special Training Workshop",
    summary:
      "Conducted an intensive 5-day hands-on robotics training workshop for students of APS Humayun Road, Rawalpindi. Guided students through humanoid robot programming, sensor integration, autonomous flight control, and team robotics challenges under the PIE Project.",
    fullStory: [
      "A 5-day special robotics training workshop was conducted for students of Army Public School and College, Humayun Road, Rawalpindi by internees of the Educational Robotics Lab (SEECS-NUST) under the supervision of Dr. Ayesha Maqbool.",
      "Organized under the umbrella of the PIE (Pakistan-UK Education Partnership) Project and in collaboration with STEMWomenPK and the Eureka Robotics Centre at Cardiff Metropolitan University, the workshop was focused on empowering young learners—especially girls—with practical, hands-on skills in robotics and artificial intelligence.",
      "Across the 5 days, students engaged in block-based algorithmic programming, robotic kinematics, live autonomous navigation experiments, and collaborative team engineering challenges.",
      "The workshop created a supportive and rigorous lab environment where students moved from basic computational logic to commanding humanoid robots and aerial vehicles."
    ],
    modules: [
      {
        title: "Introduction to Robotics & Machine Logic",
        description: "Core concepts of robotics, microcontrollers, signal inputs, and the transition from software code to physical actuation."
      },
      {
        title: "Humanoid Robot Programming",
        description: "Hands-on programming using visual/block-based coding (Scratch / VEX code) to orchestrate complex humanoid movement sequences and gestures."
      },
      {
        title: "Sensors & Interactive Systems",
        description: "Connecting ultrasonic, infrared, and tactile sensors to create interactive systems capable of real-time environmental feedback."
      },
      {
        title: "Autonomous Robotics & Path Following",
        description: "Implementing autonomous decision loops, obstacle detection, and foundational mapping logic."
      },
      {
        title: "Drone Flight Dynamics & Control",
        description: "Principles of multirotor aerodynamics, flight stability, remote telemetry, and autonomous waypoint navigation."
      },
      {
        title: "Team-based Robotics Challenges",
        description: "Collaborative design and programming competitions challenging student teams to solve real-world task scenarios."
      }
    ],
    highlights: [
      "5-day intensive curriculum covering hardware, software, sensors, and flight dynamics.",
      "Strong emphasis on empowering female students in STEM, robotics, and artificial intelligence.",
      "Hands-on computer lab sessions with direct humanoid robot and drone interaction.",
      "Formally recognized and verified with an official institutional Certificate of Participation."
    ],
    supervisors: [
      "Dr. Ayesha Maqbool — Associate Professor, NUST SEECS",
      "Dr. Shadan Khan Khattak — Eureka Robotics Centre, Cardiff Metropolitan University (UK)"
    ],
    team: [
      "Hamdan Tariq — Internee, Educational Robotics Lab, NUST",
      "Fahad Khan — Internee, Educational Robotics Lab, NUST",
      "Farhad Khan — Internee, Educational Robotics Lab, NUST",
      "Aaima — Internee, Educational Robotics Lab, NUST",
      "Educational Robotics Lab Intern Team, SEECS NUST"
    ],
    photos: [
      {
        src: "/images/outreach/aps-robotics-lab-session.jpg",
        alt: "Classroom and computer lab session with students at APS Humayun Road",
        caption: "Hands-on lab session with students working on block-based robot programming"
      },
      {
        src: "/images/outreach/aps-humanoid-robot-demo.jpg",
        alt: "Interactive humanoid robot demonstration during the APS workshop",
        caption: "Explaining humanoid kinematics and sensor integration during interactive demo"
      }
    ],
    fileUrl: "/certificates/aps-robotics.pdf"
  }
];
