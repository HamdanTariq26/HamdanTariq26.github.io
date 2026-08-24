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

  role: "AI Undergraduate — NUST, Balochistan Campus",

  headline: "I build intelligent systems that turn AI, computer vision, robotics, and machine learning into real-world autonomous solutions.",

  intro:
    "I'm an Artificial Intelligence undergraduate at NUST, Balochistan Campus. I enjoy building practical projects and exploring different areas of AI and engineering, from machine learning and computer vision to robotics and autonomous systems. My work ranges from developing learning models and vision-based applications to building systems that interact with the physical world.",

  photo: {
    src: "/images/hamdan-tariq.jpg",
    alt: "Hamdan Tariq",
    caption: "Hamdan Tariq",
  },

  about: [
    "I’m an Artificial Intelligence undergraduate at NUST, Balochistan Campus, passionate about building intelligent systems that can **perceive, learn, reason, and act**. My interests span artificial intelligence, machine learning, computer vision, robotics, and autonomous systems, with a strong focus on turning ideas into practical, working solutions.",

    "I learn best by building. Through my projects, I’ve worked with machine learning and deep learning models, computer vision, medical imaging, object detection, gesture recognition, and other perception-based systems. I enjoy going beyond simply training a model and exploring how AI can be integrated into complete systems that solve real problems.",

    "My work also extends into robotics and autonomy, where I’ve explored robotic control, embedded sensing, visual SLAM, 3D mapping, navigation, and drone-based systems. These experiences have helped me understand how perception, intelligence, and physical systems come together to create machines capable of operating and making decisions in the real world.",

    "I’m constantly looking to expand my skills through challenging projects and experimentation. Whether I’m developing an AI model, solving a computer vision problem, building a robotic system, or working toward autonomous behavior, my goal is the same: **to build intelligent systems that are useful, capable, and increasingly autonomous.**",
  ],
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

// Facts drawn from certificates directly provided.
export const experience: ExperienceItem[] = [
  {
    organization: "Educational Robotics Lab (ER Lab), NUST",
    partner: "in collaboration with ZEMT Innovations (powered by Vision Automations)",
    role: "Intern, Data Science",
    period: "Jun – Jul 2026",
    project: "Urban Guard",
    summary:
      "Worked in the Data Science track at NUST's Educational Robotics Lab on Urban Guard, an applied project run jointly with ZEMT Innovations. Gained practical experience in data pipelines, analysis, and applied AI within a real engineering project context.",
    supervisors: [
      "Dr. Farkhanda Afzal — Principal Investigator, ER Lab, NUST",
      "Dr. Hayat Ali Shah — Academic Supervisor, ZEMT Innovations",
    ],
    fileUrl: "/certificates/internship-data-science.pdf",
  },
  {
    organization: "Educational Robotics Lab (ER Lab), NUST",
    partner: "International programme with the Eureka Robotics Centre, Cardiff Metropolitan University",
    role: "Intern",
    period: "Jun – Aug 2026 (6 weeks)",
    summary:
      "Completed a 6-week internship at NUST's Educational Robotics Lab as part of an international collaboration with the Eureka Robotics Centre at Cardiff Metropolitan University. The programme provided exposure to robotics research, engineering practice, and international academic collaboration.",
    supervisors: [
      "Dr. Shadan Khan Khattak — Head of Department, Engineering, Eureka Robotics Centre, Cardiff Met",
      "Dr. Farkhanda Afzal — Project Lead (Pakistan), ER Lab, NUST",
    ],
    fileUrl: "/certificates/internship-robotics.pdf",
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
      "A ROS2 autonomous-navigation stack for a DJI Tello: monocular ORB-SLAM3 for real-time visual SLAM with a custom depth-estimation and scale-recovery pipeline, plus occupancy mapping and exploration planning layers in active development.",
    tags: ["ROS2", "ORB-SLAM3", "SLAM", "C++", "Python"],
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

export type OutreachItem = {
  id: string;
  title: string;
  type: "Technical Outreach";
  activity: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  signatories?: string[];
  fileUrl: string;
};

export const outreachActivities: OutreachItem[] = [
  {
    id: "aps-robotics",
    title: "Innovation & Creativity in Robotics",
    type: "Technical Outreach",
    activity: "Robotics Workshop / Technical Outreach Activity",
    organization: "Army Public School and College",
    location: "Humayun Road, Rawalpindi",
    period: "31 Jul 2026",
    summary:
      "Participated in a robotics workshop and technical outreach at Army Public School, introducing students to robotics and intelligent machines through live demonstrations, interactive sessions, and practical technology concepts.",
    signatories: [
      "Principal — Army Public School and College, Humayun Road, Rawalpindi",
    ],
    fileUrl: "/certificates/aps-robotics.pdf",
  },
];
