export type ProjectPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectArchitecturePhase = {
  step: string;
  title: string;
  description: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type ProjectFeature = {
  title: string;
  description: string;
};

export type ProjectSection = {
  heading: string;
  paragraphs: string[];
};

export type ProjectDetail = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: "robotics" | "ml" | "vision" | "systems";
  categoryLabel: string;
  status: string;
  period: string;
  timeline: string;
  tags: string[];
  repoUrl?: string;
  repoStatus?: string;
  headline: string;
  // Short 1-liner for card
  description: string;
  // Full narrative
  overview: string[];
  // "Why This Project?" / Problem Statement
  problemStatement?: ProjectSection;
  // Deep-dive sections (e.g. How It Works)
  deepDiveSections?: ProjectSection[];
  architectureDiagram?: string;
  keyFeatures: ProjectFeature[];
  phases?: ProjectArchitecturePhase[];
  metrics?: ProjectMetric[];
  photos: ProjectPhoto[];
  accent: "gold" | "rose" | "teal";
};

export const projects: ProjectDetail[] = [
  {
    id: "autonomous-drone",
    index: "01",
    title: "Autonomous Drone",
    subtitle: "Vision-Based Autonomous Exploration on a Lightweight Quadrotor",
    category: "robotics",
    categoryLabel: "Robotics & Autonomy",
    status: "Research Build",
    period: "2026",
    timeline: "2026 · Active Research & Development",
    tags: ["ROS 2 Humble", "ORB-SLAM3", "Depth Anything V2", "Metric Scale Alignment", "OctoMap", "C++17", "Python 3", "DJI Tello"],
    repoUrl: "https://github.com/HamdanTariq26/Autonomous_drone",
    headline: "A vision-first aerial autonomy stack combining monocular visual SLAM, learned metric depth from Depth Anything V2 for active scale recovery, 3D occupancy mapping, and real-time flight control on a lightweight quadrotor.",
    description: "A ROS2 autonomous-navigation stack for a DJI Tello: monocular ORB-SLAM3 for real-time visual SLAM with a custom depth-estimation and scale-recovery pipeline, plus occupancy mapping and exploration planning layers in active development.",
    overview: [
      "Autonomous Drone is a robotics research project built around a Tello / Tello Talent quadrotor platform with a clear goal: develop a vision-first autonomy system for aerial exploration that works with low-cost hardware, without depending on expensive sensor arrays like multi-camera rigs or LiDAR units.",
      "A primary challenge of monocular vision is fundamental scale ambiguity: while monocular visual SLAM (ORB-SLAM3) computes camera motion and 3D landmark points with accurate relative proportions, a single camera cannot resolve absolute physical dimensions. The recovered trajectory is dimensionless—a 1-meter translation indoors and a 10-meter translation in an open field produce the same normalized SLAM geometry. Without resolving this scale ambiguity, true metric mapping and autonomous path planning are impossible.",
      "To overcome this without heavy sensor payloads, the system integrates Depth Anything V2, which outputs dense metric depth in real-world units directly from monocular RGB frames. The perception pipeline actively leverages these metric depth predictions to calculate the live scale factor, resolving the scale ambiguity of the ORB-SLAM3 trajectory. Additional hardware cues (such as an external Time-of-Flight sensor or drone telemetry) are strictly optional secondary sources. The resulting metric geometry feeds into a 3D volumetric occupancy grid and a frontier-based exploration planner.",
    ],
    problemStatement: {
      heading: "Why This Project?",
      paragraphs: [
        "The project explores how far autonomous aerial navigation can be taken using a small, lightweight drone and vision-based perception rather than depending on a large sensor stack.",
        "A monocular camera provides rich visual information at very low hardware cost and weight, but it introduces difficult problems: monocular scale ambiguity, visual drift, depth estimation from a single viewpoint, coordinate-frame consistency, sensor synchronization across asynchronous processes, real-time processing constraints in a resource-limited embedded environment, and reliable 3D mapping from an airborne platform that is itself constantly moving.",
        "This repository is built around solving those problems as a complete, integrated system. Every module is designed to be replaced or extended independently, so the research direction of any component can evolve without rebuilding the entire stack.",
      ],
    },
    deepDiveSections: [
      {
        heading: "Drone Interface — Physical Layer",
        paragraphs: [
          "The `drone_interface` layer completely isolates the physical Tello hardware from the rest of the autonomy stack. It manages the wireless connection, video acquisition with configurable resolution and bitrate, telemetry polling, command dispatch, and manual override control.",
          "Video is decoded from the Tello H.264 stream using PyAV with low-delay buffering options so the perception pipeline always operates on the most recent frame rather than stale buffered imagery.",
          "This isolation is intentional: any changes to the underlying quadrotor platform or its SDK do not propagate into the perception, mapping, or planning layers, keeping the system modular and future-replaceable.",
        ],
      },
      {
        heading: "Visual SLAM — ORB-SLAM3",
        paragraphs: [
          "Visual localization is handled by an ORB-SLAM3 integration running as a separate ROS 2 C++ process under `ros2_test/src/ros2_orb_slam3/`. Running SLAM as an independent process rather than embedding it in the Python application provides a clean architectural boundary: the main application subscribes to pose and keyframe topics over ROS 2 message passing.",
          "ORB-SLAM3 extracts Oriented FAST and Rotated BRIEF (ORB) features from incoming monocular frames, tracks feature correspondences across frames to estimate camera motion, and maintains a sparse 3D keyframe map of the environment. It also handles loop closure detection and relocalization when the drone revisits previously seen areas.",
          "Because ORB-SLAM3 operates on a single monocular stream, its recovered 6-DOF camera pose, keyframe points, and motion estimates are inherently scale-ambiguous. The shape and relative proportions of the trajectory are mathematically preserved, but the physical scale is unknown and must be recovered actively.",
        ],
      },
      {
        heading: "Dense Depth — Depth Anything V2",
        paragraphs: [
          "Where ORB-SLAM3 produces sparse feature geometry and a scale-ambiguous trajectory, Depth Anything V2 provides dense, per-pixel scene depth from every incoming RGB frame.",
          "Crucially, Depth Anything V2 outputs metric depth predictions in real-world physical units (meters). This dense metric prediction provides the essential reference needed to recover the true physical scale that monocular SLAM lacks.",
          "Fusing sparse feature geometry from SLAM with dense metric depth from Depth Anything V2 gives the system both reliable real-time tracking and an immediate, pixel-dense metric understanding of physical surfaces in the surrounding environment.",
        ],
      },
      {
        heading: "Active Metric Scale Recovery",
        paragraphs: [
          "Because monocular SLAM trajectories are inherently scale-ambiguous, the system cannot directly use raw SLAM coordinates for physical navigation—a 1-meter hallway gap would appear identical to a 10-meter doorway without an absolute scale reference.",
          "The system contains a dedicated scale-estimation pipeline under `tello_autonomy/perception/` with components including `scale_factor.py` and `scale_factor_manager.py`. The pipeline actively calculates the live scale factor by aligning the scale-ambiguous SLAM observations with Depth Anything V2's real-world metric depth outputs, computing the exact conversion multiplier to bring the SLAM trajectory into physical meters.",
          "While the pipeline can optionally integrate secondary sensor cues such as an external Time-of-Flight (ToF) sensor or onboard telemetry, these sensors are purely optional. The primary, active scale recovery is performed directly by the vision stack via Depth Anything V2. This allows downstream 3D occupancy mapping and frontier exploration planners to operate in true metric space with reliable physical obstacle clearance.",
        ],
      },
      {
        heading: "3D Occupancy Mapping & Exploration Planning",
        paragraphs: [
          "The metric 3D scene geometry is consumed by the occupancy mapping layer (`occupancy_map_cpp/`) to maintain a volumetric voxel grid of the environment. Each voxel tracks occupancy probability — free, occupied, or unknown — updated incrementally as new observations arrive.",
          "The exploration planner (`exploration_cpp/`) analyzes the occupancy map for frontiers: boundaries between known free space and unknown regions. It selects the highest-value unexplored frontier, generates a collision-free trajectory to reach it, and issues flight commands through the drone interface.",
          "A search module (`search_cpp/`) handles target-seeking behavior once the map is partially built. The entire planning stack communicates over the ROS 2 middleware layer, with message type definitions centralized in `tello_autonomy_msgs/`.",
        ],
      },
    ],
    architectureDiagram: `       DJI Tello Quadrotor
               │ (Wi-Fi H.264 Stream)
               ▼
     PyAV Low-Delay Decoder
               │
     ┌─────────┴─────────┐
     ▼                   ▼
 ORB-SLAM3       Depth Anything V2
(Scale-Ambiguous)  (Metric Depth)
     │                   │
     └─────────┬─────────┘
               ▼
    Active Scale Recovery
  (Calculates Scale Factor)
               ▼
  3D Volumetric Occupancy Grid
               ▼
  Frontier Exploration Planner`,
    keyFeatures: [
      {
        title: "Monocular Visual SLAM (ORB-SLAM3)",
        description: "Computes real-time 6-DOF camera pose and sparse 3D landmark maps from the drone's forward camera stream, maintaining loop closure detection and relocalization capability as a standalone ROS 2 C++ process.",
      },
      {
        title: "Learned Dense Depth Estimation (Depth Anything V2)",
        description: "Infers high-resolution dense depth maps in real-world metric units from monocular frames, providing complete surface coverage to fill the gaps between sparse SLAM feature points.",
      },
      {
        title: "Active Metric Scale Recovery (Depth Anything V2)",
        description: "Actively resolves monocular scale ambiguity by calculating a live scale factor from Depth Anything V2's real-world metric depth outputs, converting the dimensionless SLAM trajectory into physical meters (external ToF sensors remaining strictly optional).",
      },
      {
        title: "3D Volumetric Occupancy Mapping",
        description: "Maintains a probabilistic 3D voxel grid of the explored environment, incrementally updated from fused metric depth observations, enabling collision-aware path planning.",
      },
      {
        title: "Frontier-Based Autonomous Exploration",
        description: "Identifies boundaries between known free space and unmapped regions (frontiers), selects exploration targets by value, and generates collision-free trajectories for systematic area coverage.",
      },
      {
        title: "Isolated Drone Interface Layer",
        description: "Decouples all Tello-specific hardware communication — video decoding, telemetry, command dispatch — from the autonomy stack, allowing the platform to be swapped without touching perception or planning code.",
      },
      {
        title: "ROS 2 Humble Modular Architecture",
        description: "Each subsystem runs as an independent ROS 2 node communicating over typed message topics, making the architecture extensible and each component independently replaceable as the research evolves.",
      },
    ],
    photos: [
      {
        src: "/images/projects/autonomous-drone/autonomous-drone-1.png",
        alt: "Quadrotor during indoor flight testing",
        caption: "Lightweight quadrotor platform during experimental indoor flight testing",
      },
      {
        src: "/images/projects/autonomous-drone/autonomous-drone-2.png",
        alt: "Tello Talent hardware configuration and sensors",
        caption: "Quadrotor hardware showing onboard forward camera and optical flow sensor",
      },
      {
        src: "/images/projects/autonomous-drone/autonomous-drone-3.png",
        alt: "Bench testing and calibration environment",
        caption: "Bench testing, motor calibration, and telemetry response verification",
      },
      {
        src: "/images/projects/autonomous-drone/autonomous-drone-4.png",
        alt: "Controlled indoor testing arena",
        caption: "Indoor testing arena configured for visual trajectory and SLAM accuracy evaluation",
      },
      {
        src: "/images/projects/autonomous-drone/trajectory.png",
        alt: "3D visual SLAM estimated trajectory path",
        caption: "Estimated flight trajectory and 3D keyframe path reconstructed via ORB-SLAM3",
      },
      {
        src: "/images/projects/autonomous-drone/trajectory-2.png",
        alt: "Multi-axis trajectory telemetry over time",
        caption: "Multi-axis positional telemetry and coordinate frame tracking over the full flight sequence",
      },
    ],
    accent: "gold",
  },

  {
    id: "mri-synthesis",
    index: "02",
    title: "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation",
    subtitle: "Dual-Model Medical AI Pipeline for the BraTS 2020 Brain Tumor Challenge",
    category: "ml",
    categoryLabel: "Deep Learning & Medical Imaging",
    status: "Model Study",
    period: "2026",
    timeline: "2026 · Two-Person Research Project",
    tags: ["PyTorch", "Diffusion Models (DDPM)", "ResNet U-Net", "TPU v3-8", "DDIM Sampling", "BraTS 2020", "v-prediction", "Medical Imaging"],
    repoUrl: "https://github.com/HamdanTariq26/Conditional-Multimodal-MRI-Synthesis-and-Brain-Tumor-Segmentation",
    headline: "An end-to-end medical AI pipeline combining a ResNet-encoded U-Net for brain tumor segmentation with a conditional diffusion model that synthesizes all four clinical MRI modalities simultaneously from masks, trained on Google Cloud TPU v3-8.",
    description: "A two-model system combining a ResNet U-Net for multi-class brain tumor segmentation with a conditional diffusion model that synthesizes 4-modality MRI scans from masks. Led as a two-person project and trained on TPU.",
    overview: [
      "This project implements a dual-model medical deep learning system addressing two closely related clinical problems: automatically segmenting brain tumors across multiple anatomical sub-regions, and synthesizing missing or unavailable MRI scan modalities from existing data.",
      "Brain tumor diagnosis and treatment planning typically requires all four MRI sequences — T1, T2, T1 contrast-enhanced (T1ce), and FLAIR. In practice, some modalities are often missing due to patient movement artifacts, scanner failures, or clinical time constraints. A model that can accurately reconstruct missing modalities from available ones has direct clinical utility.",
      "We address both problems simultaneously: the segmentation model precisely delineates tumor boundaries used as conditioning masks, and the synthesis model generates clinically faithful, high-fidelity multi-sequence MRI volumes for any missing modality conditioned on those masks. Rather than generating superficial visual approximations, the diffusion model learns the true underlying tissue contrast distributions and pathological tissue characteristics across sequences. The project was developed as a two-person team and trained on Google Cloud TPU v3-8 infrastructure.",
    ],
    problemStatement: {
      heading: "Clinical Context & Research Motivation",
      paragraphs: [
        "Brain tumor segmentation is a critical step in clinical workflow, providing oncologists with precise tumor volumes for treatment planning, radiotherapy contouring, and treatment response monitoring. Manual delineation of MRI scans is extremely time-consuming and subject to inter-rater variability. Automated segmentation is therefore an important research target.",
        "Simultaneously, the availability of multiple MRI modalities is frequently incomplete in clinical practice. Acquiring all four sequences requires patients to remain motionless for an extended scan session, and technical failures affect individual sequences. A synthesis model that reconstructs any missing modality conditioned on available data reduces scan time, improves patient throughput, and enables downstream segmentation models to receive complete inputs even when raw data is incomplete.",
        "The BraTS 2020 (Brain Tumor Segmentation) Challenge provides a well-annotated benchmark of multi-institutional MRI scans, establishing standardized evaluation criteria for both segmentation accuracy and synthesis quality. Our pipeline targets both tasks on this dataset.",
      ],
    },
    deepDiveSections: [
      {
        heading: "Segmentation Architecture — ResNet-Encoded U-Net",
        paragraphs: [
          "The segmentation model uses a U-Net backbone with a Residual Encoder (ResNet) replacing the standard convolutional encoder. Residual connections in the encoder allow gradients to flow cleanly through deep network layers during backpropagation, preventing vanishing gradient problems and enabling the use of a significantly deeper feature extraction hierarchy.",
          "The decoder uses symmetric skip connections from the encoder to recover fine-grained spatial detail lost during downsampling — a standard U-Net design decision that is particularly important for precise tumor boundary delineation at voxel resolution.",
          "The model performs multi-class segmentation across three clinically defined sub-regions: Whole Tumor (WT) encompassing the complete lesion and surrounding edema, Tumor Core (TC) comprising the necrotic center and active tumor cells, and Enhancing Tumor (ET) identifying the actively proliferating region visible on contrast-enhanced T1 scans. These hierarchical regions correspond directly to clinical treatment zones.",
        ],
      },
      {
        heading: "Synthesis Architecture — Conditional DDPM",
        paragraphs: [
          "The synthesis model implements a Conditional Denoising Diffusion Probabilistic Model (DDPM) that iteratively denoises a Gaussian noise distribution conditioned on categorical tumor segmentation masks to synthesize clinically consistent, high-fidelity MRI volumes.",
          "Unlike unconditional diffusion models that sample freely from a learned distribution, our model conditions every denoising step on the pixel-wise tumor label map. This conditioning signal tells the network which anatomical tissue type occupies each spatial location, allowing it to generate modality-specific tissue contrast — for example, learning that necrotic regions appear dark on T1 but bright on FLAIR.",
          "The model simultaneously synthesizes T1, T2, T1ce, and FLAIR volumes as multi-channel outputs, learning the joint cross-modal appearance of brain tissue types in a single network. Accelerated inference uses Denoising Diffusion Implicit Models (DDIM) sampling with 50 steps and a v-prediction objective, significantly reducing generation time compared to the standard 1000-step DDPM schedule while maintaining output fidelity.",
        ],
      },
      {
        heading: "Engineering Challenge — CPU-EMA Weight Tracking on TPU",
        paragraphs: [
          "Training long diffusion model runs on Google Cloud TPU v3-8 hardware introduced a subtle but critical precision problem. TPUs natively operate in BFloat16 (bf16) floating-point format, which has the same exponent range as Float32 but only 7 mantissa bits instead of 23. This reduced mantissa precision causes significant underflow errors when accumulating Exponential Moving Average (EMA) weight updates across millions of training steps.",
          "EMA is a standard technique in diffusion model training that maintains a 'shadow' copy of model weights updated as a slowly decaying average of recent training weights. The EMA weights typically produce significantly better sample quality than the final training checkpoint. However, the bf16 underflow error on TPU was causing the EMA weights to diverge from their true values over the course of training.",
          "We solved this by engineering a CPU-EMA weight tracking mechanism: the shadow EMA weights are kept on host CPU RAM in full Float32 precision. After each training step, weights are pulled from the TPU device to CPU, the EMA update is applied in FP32, and the updated EMA is stored in CPU memory. This completely bypasses the bf16 underflow problem without sacrificing TPU compute throughput for the main training forward and backward passes.",
        ],
      },
      {
        heading: "Brain-Masked Normalization",
        paragraphs: [
          "MRI scans contain large regions of background (outside the skull) and non-brain tissue that contribute meaningless signal to the normalization statistics. Normalizing across the full volume causes background noise to dominate the statistics and compresses the true brain tissue intensity range.",
          "We implemented brain-masked Z-score normalization that computes mean and standard deviation only over foreground brain voxels identified by a binary brain mask. This ensures the network receives tissue intensities normalized within their true clinical range rather than diluted by background noise, significantly improving gradient signal quality during training.",
        ],
      },
    ],
    architectureDiagram: `       BraTS 2020 Multi-Modal Scans
                     │
      ┌──────────────┴──────────────┐
      ▼                             ▼
ResNet-Encoded U-Net          Conditional DDPM
(Multi-Class Segmentation)    (4-Modality Synthesis)
      │                             │
[WT / TC / ET Masks]       [T1, T2, T1ce, FLAIR]
      │                             │
      └──────────────┬──────────────┘
                     ▼
        CPU-EMA Weight Tracking
     (Solves TPU bf16 Underflow)`,
    metrics: [
      { label: "Enhancing Tumor (ET)", value: "0.86 Dice", detail: "Mean Dice score on BraTS 2020 validation volumes" },
      { label: "Whole Tumor (WT)", value: "0.80 Dice", detail: "Mean Dice across complete lesion and surrounding edema" },
      { label: "Tumor Core (TC)", value: "0.76 Dice", detail: "Mean Dice on necrotic center and active tumor core" },
      { label: "DDIM Sampling Speed", value: "50 Steps", detail: "Accelerated inference with v-prediction objective on TPU v3-8" },
    ],
    keyFeatures: [
      {
        title: "ResNet-Encoded U-Net Segmentation",
        description: "Deep residual encoder with symmetric decoder skip connections performs precise multi-class tumor boundary delineation across Whole Tumor (WT), Tumor Core (TC), and Enhancing Tumor (ET) sub-regions.",
      },
      {
        title: "Conditional DDPM — 4-Modality Synthesis",
        description: "Jointly synthesizes T1, T2, T1ce, and FLAIR volumes simultaneously conditioned on categorical segmentation masks, learning tissue-specific cross-modal appearance distributions.",
      },
      {
        title: "CPU-EMA Weight Tracking",
        description: "Solved TPU v3-8 BFloat16 underflow during EMA accumulation by maintaining shadow weights in full Float32 precision on host CPU RAM, bypassing hardware precision limitations.",
      },
      {
        title: "DDIM Sampling + v-Prediction Objective",
        description: "50-step DDIM inference with the v-prediction noise parameterization produces high-fidelity anatomical MRI synthesis significantly faster than the standard 1000-step DDPM schedule.",
      },
      {
        title: "Brain-Masked Normalization",
        description: "Z-score normalization computed exclusively over foreground brain tissue voxels using binary brain masks, preventing background noise from distorting the intensity normalization statistics.",
      },
      {
        title: "Multi-Institutional BraTS 2020 Benchmark",
        description: "Trained and evaluated on the BraTS 2020 dataset — a multi-institutional brain MRI benchmark with standardized tumor annotation protocols across four clinical imaging modalities.",
      },
    ],
    photos: [
      {
        src: "/images/projects/mri-synthesis/sample-brain-tumor-segmentation.png",
        alt: "Multi-class brain tumor segmentation outputs",
        caption: "Automated delineation of Whole Tumor (WT), Tumor Core (TC), and Enhancing Tumor (ET) sub-regions vs. ground truth",
      },
      {
        src: "/images/projects/mri-synthesis/sample-mri-generation.png",
        alt: "Synthesized T1, T2, T1ce, and FLAIR modalities",
        caption: "All four MRI modalities jointly synthesized from categorical tumor segmentation masks",
      },
      {
        src: "/images/projects/mri-synthesis/segmentation-learning-curves.png",
        alt: "Segmentation model training convergence curves",
        caption: "Training and validation Dice scores and loss curves for the ResNet U-Net segmentation model",
      },
      {
        src: "/images/projects/mri-synthesis/brats-learning-curves.png",
        alt: "Diffusion model generation loss progression",
        caption: "Denoising diffusion training loss curves demonstrating stable convergence on Google Cloud TPU v3-8",
      },
    ],
    accent: "rose",
  },

  {
    id: "gesture-drone",
    index: "03",
    title: "Gesture-Controlled Drone",
    subtitle: "Real-Time 3D Hand Gesture Recognition for Live DJI Tello Quadrotor Flight Control",
    category: "vision",
    categoryLabel: "Computer Vision & Edge AI",
    status: "Interactive Prototype",
    period: "2026",
    timeline: "2026 · Real-Time Vision System",
    tags: ["Computer Vision", "MediaPipe Hands", "TensorFlow", "Python", "Feature Engineering", "Temporal Smoothing", "DJI Tello", "DJITelloPy"],
    repoUrl: "https://github.com/HamdanTariq26/Gesture_Controlled_Drone",
    headline: "A real-time vision system mapping geometric 3D hand landmark features and joint angles to live quadrotor flight commands via a lightweight neural classifier with temporal majority voting.",
    description: "A real-time gesture-recognition pipeline controlling a DJI Tello in flight. Built on a self-collected dataset of 5,000+ hand-landmark samples, a feature-engineered classifier, and temporal smoothing for reliable control.",
    overview: [
      "This project implements a complete touchless control interface for a DJI Tello quadrotor using only static hand gestures captured through a standard webcam, without any specialized depth sensors or data gloves.",
      "The fundamental design decision was to avoid feeding raw RGB image frames into a heavy convolutional neural network. Instead, the pipeline extracts structured geometric hand representations — 21 three-dimensional landmarks from MediaPipe Hands, normalized for hand size and camera distance, augmented with 19 invariant joint angles — and classifies these compact feature vectors with a lightweight dense network. This approach is fast, generalizes across individuals, and requires no GPU for real-time inference.",
      "The dataset was independently collected and carefully curated across 8 distinct individuals to ensure the model generalizes across hand sizes, skin tones, and personal gesture variations rather than overfitting to a single person's hand proportions.",
    ],
    problemStatement: {
      heading: "Design Approach & Feature Engineering Philosophy",
      paragraphs: [
        "Controlling a drone with camera-based gestures requires reliable, consistent predictions even as hands shift position, change distance from the camera, appear at different angles, or transition between gestures. A model that works perfectly for one person but fails for another is not a usable control interface.",
        "Rather than training a convolutional model to recognize gestures directly from image pixels — which would require a massive dataset covering all possible hand appearances, lighting conditions, and backgrounds — we extract an abstract geometric representation from MediaPipe Hands that is inherently invariant to many of these confounds.",
        "The 82-dimensional feature vector encodes the geometric shape of the hand rather than its visual appearance: 63 normalized coordinate values describe where each joint is relative to the wrist and palm width, and 19 computed angle values describe how each finger is bent and spread. These features remain consistent across individuals and camera distances, allowing a simple dense network to learn gesture boundaries on a dataset that is feasible to collect manually.",
      ],
    },
    deepDiveSections: [
      {
        heading: "Landmark Extraction & Normalization",
        paragraphs: [
          "MediaPipe Hands detects 21 three-dimensional hand landmarks per frame: one per finger joint (4 per finger × 5 fingers = 20 joints) plus the wrist. Each landmark is represented as an (x, y, z) coordinate in image-space units.",
          "Raw image-space coordinates are useless for classification because they encode absolute hand position rather than gesture shape. A hand in the top-left of the frame and the same hand in the bottom-right produce completely different landmark coordinates despite performing the same gesture.",
          "The normalization step re-centers the coordinate system at the wrist landmark (subtracting wrist position from all points) and scales by palm width (the distance between wrist and middle finger base joint). This produces a representation where all coordinates are relative to the hand's own geometry, independent of where it appears in the frame and how far it is from the camera. Left-hand landmarks are mirrored to match right-hand training data.",
        ],
      },
      {
        heading: "Geometric Feature Engineering — 19 Joint Angles",
        paragraphs: [
          "In addition to the 63 normalized coordinate values, the pipeline computes 19 geometric angle features: 15 finger-bend angles (one per non-base finger joint, capturing how much each joint is flexed) and 4 finger-spread angles (the lateral opening between adjacent fingers).",
          "Joint angles are geometrically invariant to camera viewpoint rotation in a way that raw coordinates are not. If the same gesture is performed while rotating the hand 15 degrees clockwise, the raw coordinate values change significantly, but the joint angles describing how the fingers are bent remain almost identical. This invariance is precisely what allows the classifier to generalize.",
          "The full 82-dimensional feature vector (63 coordinates + 19 angles) is computed in real time for every frame and passed directly to the dense neural network classifier.",
        ],
      },
      {
        heading: "Dataset Collection — 5,259 Samples Across 8 Contributors",
        paragraphs: [
          "The gesture dataset was entirely independently collected and labeled. Rather than sourcing an existing hand gesture dataset, we recorded our own to ensure the labeling exactly matched our gesture definitions and flight command mapping.",
          "Crucially, the dataset includes recordings from 8 different individuals, explicitly chosen to introduce variation in hand size, finger length proportions, skin tone, and personal gesture execution style. A model trained on only one person's hand tends to overfit: it learns that specific hand's proportions rather than the abstract gesture shape.",
          "The 5,259 labeled samples store the 21 MediaPipe landmark coordinates along with the corresponding gesture label. Each gesture was recorded across multiple sessions and lighting conditions to improve robustness.",
        ],
      },
      {
        heading: "Temporal Smoothing & Hold-to-Confirm",
        paragraphs: [
          "Even a high-accuracy classifier produces occasional incorrect predictions on individual frames — caused by motion blur during hand transitions, partial occlusion, or brief MediaPipe tracking instability. If every per-frame prediction were translated directly into a drone command, a single spurious prediction during a gesture transition would trigger an unintended flight maneuver.",
          "Two mechanisms prevent this. First, a temporal majority voting buffer stores the classifier's predictions over the last 15 frames. The system only acts on the most frequently predicted class in that window — a single noisy frame cannot change the commanded gesture if the remaining 14 frames agree on something else.",
          "Second, a hold-to-confirm mechanism requires a gesture to be held steadily for a minimum time window before it is converted into an actual drone command. This prevents accidentally triggering a command while transitioning between two different gestures, even if both transitions cross through the correct gesture class briefly.",
        ],
      },
      {
        heading: "Flight Command Mapping",
        paragraphs: [
          "Confirmed gesture classifications are translated into DJI Tello flight commands via the DJITelloPy library's `send_rc_control` API, which accepts four continuous velocity parameters: left/right, forward/backward, up/down, and yaw rotation.",
          "Each gesture maps to a specific velocity vector or discrete action. For example, an open palm forward maps to forward flight, a closed fist maps to hover, a thumbs-up maps to ascent, and a specific spread-finger gesture maps to landing. The mapping is designed so that the gestures are visually intuitive and physically distinct enough to be classified reliably.",
          "All commands are transmitted over the Tello's Wi-Fi interface, meaning the entire perception-to-command pipeline runs on the host computer rather than onboard the drone.",
        ],
      },
    ],
    architectureDiagram: `     Standard Webcam Video Stream
                   │
                   ▼
         MediaPipe Hands (21 3D Landmarks)
                   │
                   ▼
     Geometric Feature Extraction
  (63 Normalized Coords + 19 Invariant Angles)
                   │
                   ▼
     Dense Neural Classifier (82-Dim Input)
                   │
                   ▼
      15-Frame Temporal Majority Vote
                   │
                   ▼
        DJITelloPy Flight Commands`,
    metrics: [
      { label: "Dataset Size", value: "5,259", detail: "Labeled hand landmark samples" },
      { label: "Contributors", value: "8 People", detail: "Varied hand sizes, skin tones, and gesture styles" },
      { label: "Feature Vector", value: "82 Dims", detail: "63 normalized coordinates + 19 invariant joint angles" },
      { label: "Smoothing Window", value: "15 Frames", detail: "Temporal majority vote preventing spurious commands" },
    ],
    keyFeatures: [
      {
        title: "MediaPipe 3D Landmark Extraction",
        description: "Extracts 21 3D hand landmark coordinates per frame, centered on the wrist and scaled by palm width to produce position- and scale-invariant hand geometry.",
      },
      {
        title: "Invariant Joint Angle Engineering",
        description: "Computes 15 finger-bend angles and 4 finger-spread angles that remain consistent across camera viewpoint changes and individual hand proportion differences.",
      },
      {
        title: "Lightweight Dense Neural Classifier",
        description: "128→64→23-class dense network with dropout trained on the 82-dimensional feature vector, achieving real-time inference speeds without GPU requirements.",
      },
      {
        title: "15-Frame Majority Vote Buffer",
        description: "Temporal smoothing over a rolling 15-frame prediction window filters out single-frame misclassifications caused by motion blur or brief tracking instability.",
      },
      {
        title: "Hold-to-Confirm Flight Safety",
        description: "Gestures must be held steadily for a minimum window before issuing commands, preventing accidental triggering during transitions between gestures.",
      },
      {
        title: "Multi-Individual Dataset Collection",
        description: "5,259 labeled samples from 8 diverse contributors, explicitly targeting generalization across hand sizes, skin tones, and personal gesture execution styles.",
      },
    ],
    photos: [
      {
        src: "/images/projects/gesture-drone/drone.png",
        alt: "DJI Tello quadrotor platform",
        caption: "DJI Tello quadrotor used as the target platform for real-time gesture-guided flight",
      },
      {
        src: "/images/projects/gesture-drone/forward-gesture.png",
        alt: "Forward flight command gesture",
        caption: "Forward flight gesture demonstration with MediaPipe 3D landmark overlay",
      },
      {
        src: "/images/projects/gesture-drone/up-gesture.png",
        alt: "Ascent control gesture",
        caption: "Upward ascent gesture mapped to positive vertical velocity in the command channel",
      },
      {
        src: "/images/projects/gesture-drone/360-gesture.png",
        alt: "360-degree yaw rotation gesture",
        caption: "Yaw rotation gesture triggering in-flight 360-degree spin maneuver",
      },
      {
        src: "/images/projects/gesture-drone/confusion-matrix.png",
        alt: "Classifier per-class confusion matrix",
        caption: "Confusion matrix showing per-class classification precision and recall across all gesture classes",
      },
      {
        src: "/images/projects/gesture-drone/training-history.png",
        alt: "Neural network training and validation history",
        caption: "Training and validation accuracy and loss curves demonstrating rapid, stable convergence",
      },
    ],
    accent: "teal",
  },

  {
    id: "robotic-hand",
    index: "04",
    title: "Gesture-Controlled Robotic Hand",
    subtitle: "Wearable Inertial Sensing Directly Mapped to 4-DOF Robotic Arm Actuation via Arduino",
    category: "robotics",
    categoryLabel: "Robotics & Embedded Systems",
    status: "Hardware Prototype",
    period: "2025",
    timeline: "2025 · Embedded Robotics",
    tags: ["Embedded Systems", "Arduino", "MPU6050", "I2C / Wire.h", "C++", "4-DOF Servo Control", "Real-Time Control"],
    repoUrl: "https://github.com/HamdanTariq26/Robotic-Hand",
    headline: "A wearable glove translating MPU6050 inertial tilt and orientation angles in real time into servo-level actuation across a 4-degree-of-freedom robotic manipulator arm.",
    description: "An MPU6050-driven glove that maps hand orientation to real-time servo control on a 4-DOF robotic arm — connecting embedded sensing directly to actuation.",
    overview: [
      "This project implements a direct, intuitive control interface between human hand motion and a robotic manipulator arm. A wearable glove fitted with an MPU6050 6-axis inertial measurement unit (IMU) translates the physical tilt and orientation of the user's hand into proportional servo motor commands on a four-degree-of-freedom robotic arm in real time.",
      "The system is entirely embedded — the Arduino microcontroller reads raw accelerometer data from the MPU6050 over I2C, converts the readings into angular orientation estimates, applies motion smoothing, and outputs servo PWM signals, all within a tight control loop running at embedded clock speeds.",
      "The design intentionally keeps the sensing-to-actuation pathway as direct as possible: tilting your wrist forward moves the arm forward, tilting it sideways rotates the base, and a button on the glove opens and closes the gripper end-effector. The goal was to explore how natural and immediate a human-robot interface can feel when the translation between intent and action is minimal.",
    ],
    problemStatement: {
      heading: "Sensing to Actuation — Closing the Loop Directly",
      paragraphs: [
        "Most robotic arm control interfaces require the operator to interact with a joystick, a keyboard interface, or a graphical control panel — all of which introduce an abstraction layer between the human's physical intuition and the machine's response.",
        "This project explores the other extreme: mapping body motion as directly as possible to robot motion. By strapping an inertial sensor directly to the hand, the user's natural wrist movements become the control signal. Tilting the wrist at 30 degrees commands the arm to a 30-degree position — no abstraction, no interface learning curve beyond understanding what each axis controls.",
        "The embedded control architecture was chosen deliberately to keep latency minimal. Running the sensing and control loop entirely on a microcontroller eliminates the roundtrip communication latency of a host-computer-based architecture, making the arm's response feel immediate.",
      ],
    },
    deepDiveSections: [
      {
        heading: "Hardware Architecture",
        paragraphs: [
          "The system consists of two interconnected components: the wearable sensor glove and the 4-DOF robotic arm. The glove mounts an MPU6050 6-axis IMU and a push button, connected to an Arduino Uno (or Nano) via standard jumper wires.",
          "The robotic arm is driven by four servo motors connected to separate PWM pins on the Arduino. An external power supply is strongly recommended for the servos, as the combined current draw of four servo motors under load exceeds what the Arduino's onboard 5V regulator can safely supply. The push button uses a digital input pin with an internal pull-up resistor.",
          "Pin assignments: Servo 1 (Forward/Backward) on pin 4, Servo 2 (Up/Down) on pin 3, Servo 3 (Gripper) on pin 2, Servo 4 (Left/Right) on pin 5, Button on pin 8, MPU6050 on SDA/SCL (A4/A5 on Arduino Uno).",
        ],
      },
      {
        heading: "IMU Data Processing & Orientation Estimation",
        paragraphs: [
          "The MPU6050 contains a 3-axis accelerometer and a 3-axis gyroscope. For static orientation estimation (the primary use case here), the accelerometer data is sufficient: gravity always points downward, so measuring its projection onto each axis provides the tilt angle of the sensor along X, Y, and Z.",
          "The firmware reads raw accelerometer values over I2C using the Wire.h library, then converts them into angular orientation estimates using trigonometric relationships. For the application's control range, the accelerometer alone provides adequate angular resolution without the drift compensation complexity of a full sensor fusion filter.",
          "Each angular reading is then mapped proportionally to a servo output range using the Arduino's built-in `map()` function, converting a measured angle range (e.g., -45° to +45°) into a servo pulse width range (typically 700–2300 µs).",
        ],
      },
      {
        heading: "Servo Smoothing & Jitter Filtering",
        paragraphs: [
          "Raw accelerometer readings contain high-frequency noise caused by small vibrations, electrical interference, and quantization error. If servo commands are updated directly from noisy IMU readings without filtering, the result is a constantly jittering arm that vibrates rapidly around its target position — mechanically stressful and visually unusable.",
          "The firmware applies software low-pass filtering to smooth the servo command signals before they are applied. Rather than commanding servos directly to the instantaneously computed target angle, the commanded position is moved incrementally toward the target at a bounded rate per control cycle.",
          "This approach serves two purposes: it eliminates jitter from high-frequency sensor noise, and it limits the rate of position change, preventing large sudden servo movements that could mechanically stress the arm joints or cause the arm to oscillate past its target.",
        ],
      },
      {
        heading: "4-DOF Kinematic Axes",
        paragraphs: [
          "The four axes of the robotic arm each map to a specific sensor input or user action. Servo 1 controls forward/backward reach (mapping from IMU pitch angle). Servo 2 controls up/down elevation (mapping from IMU roll angle). Servo 4 controls left/right base rotation (mapping from a third IMU axis). Servo 3 controls gripper open/close state (toggled by the push button each press).",
          "The gripper state is latching rather than held — a single button press toggles the gripper between open and closed states. This prevents the user from having to maintain continuous button pressure during object gripping tasks.",
        ],
      },
    ],
    architectureDiagram: `         Wearable Sensor Glove
                   │ (I2C / Wire.h)
                   ▼
        MPU6050 6-Axis IMU Sensor
                   │
                   ▼
    Arduino Uno/Nano Microcontroller
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
  Pitch/Roll Tilt    Push Button Latch
         │                   │
  Low-Pass Filter            │
         │                   │
         ▼                   ▼
  [Base / Elev / Reach]   [Gripper]
         └─────────┬─────────┘
                   ▼
       4-DOF Manipulator Arm`,
    keyFeatures: [
      {
        title: "Wearable MPU6050 Glove Interface",
        description: "6-axis IMU mounted on a wearable glove translates wrist tilt angles directly into proportional robotic joint positions — the most natural possible mapping between user intent and arm response.",
      },
      {
        title: "4-DOF Servo Actuation",
        description: "Four independently driven servo channels: Base rotation (Left/Right), Shoulder elevation (Up/Down), Elbow reach (Forward/Backward), and Gripper latch (open/close push button).",
      },
      {
        title: "I2C Sensor Communication",
        description: "MPU6050 communicates with the Arduino microcontroller over the I2C bus using the Wire.h library, providing 6-axis accelerometer and gyroscope readings at embedded clock speeds.",
      },
      {
        title: "Real-Time Servo Jitter Filtering",
        description: "Software low-pass smoothing and bounded rate-of-change limiting eliminates IMU noise-induced servo jitter, producing smooth, mechanically stable arm motion.",
      },
      {
        title: "Latching Gripper Button",
        description: "Push button toggles gripper state between open and closed, removing the need to hold the button continuously during object gripping tasks.",
      },
      {
        title: "Fully Embedded Control Loop",
        description: "Entire sensing, computation, and actuation pipeline runs on-chip on the Arduino microcontroller with minimal latency, producing arm responses that feel immediate.",
      },
    ],
    photos: [
      {
        src: "/images/projects/robotic-hand/hand-and-glove.png",
        alt: "Wearable MPU6050 glove and 4-DOF robotic arm side by side",
        caption: "The wearable MPU6050 sensor glove (left) alongside the 4-DOF robotic arm (right)",
      },
      {
        src: "/images/projects/robotic-hand/claw-open.png",
        alt: "Robotic arm end-effector gripper in the open position",
        caption: "End-effector gripper fully open — ready to acquire or release an object",
      },
      {
        src: "/images/projects/robotic-hand/claw-close.png",
        alt: "Robotic arm end-effector gripper gripping closed",
        caption: "End-effector gripper closed and engaged — holding an object at the fingertip joints",
      },
    ],
    accent: "gold",
  },

  {
    id: "animal-detection",
    index: "05",
    title: "Animal Detection & Tracking — Mixture of Experts",
    subtitle: "Dynamic Per-Frame Expert Routing for Robust Wildlife Video Detection",
    category: "vision",
    categoryLabel: "Computer Vision & Applied Deep Learning",
    status: "Open Source · Deployed Experiment",
    period: "2026",
    timeline: "2026 · Applied Vision Architecture",
    tags: ["Computer Vision", "RT-DETR-X", "YOLO11m", "Mixture of Experts", "Laplacian Variance Router", "BotSort Tracking", "Python", "Gradio"],
    repoStatus: "Open Source · Code release in progress",
    headline: "An open-source dual-expert wildlife vision pipeline using real-time Laplacian variance to dynamically route video frames between a Precision Expert and a Kinetic Expert, with BotSort multi-object tracking for persistent animal identity.",
    description: "Video-based detection across 52 animal classes, combining RT-DETR and YOLO through a mixture-of-experts approach for robust performance across varied conditions.",
    overview: [
      "Wildlife monitoring in natural habitat environments presents extreme visual challenges that a single detection model handles poorly. Clean, well-lit frames with stationary animals are visually simple; frames with fast-moving animals, motion blur, dense foliage occlusion, mist, or low light are visually complex and degraded. The optimal detection architecture for these two regime types is fundamentally different.",
      "This project implements a Mixture-of-Experts (MoE) detection pipeline that dynamically routes each individual video frame to the most appropriate specialist model based on real-time analysis of that frame's image quality. A Precision Expert handles clean, sharp, high-frequency frames where detailed feature extraction pays off. A Kinetic Expert handles degraded frames where robustness to blur, noise, and occlusion is the priority.",
      "Routing is performed by a lightweight frame-level quality estimator computing the Laplacian variance of each frame — a classical image sharpness metric that requires no neural inference and adds negligible latency. BotSort multi-object tracking maintains consistent animal identity labels across the sequence, preserving track continuity through the frame-to-frame routing switches.",
    ],
    problemStatement: {
      heading: "Why a Mixture of Experts for Wildlife Detection?",
      paragraphs: [
        "A natural habitat wildlife video contains wildly heterogeneous frame quality within a single sequence. An animal standing in the open mid-afternoon light produces frames that are sharp, high-resolution, and visually rich — ideal conditions for a large, high-capacity detection model to extract fine-grained features and produce precise bounding boxes.",
        "Seconds later, the same animal moves rapidly across the frame, introducing motion blur. Or it steps into shade, reducing contrast. Or it partially disappears behind vegetation. For these degraded frames, a large precision model often fails or produces unstable detections because its learned feature representations depend on high-frequency edge and texture detail that is simply absent in a blurred or occluded frame.",
        "Training a single model to be simultaneously optimal in both regimes is extremely difficult — the regularization and augmentation strategies that help in one regime often hurt in the other. A MoE architecture avoids this tradeoff by training specialists independently for each regime and selecting between them at inference time.",
      ],
    },
    deepDiveSections: [
      {
        heading: "Phase 01 — Dataset Curation: 53 → 52 Classes",
        paragraphs: [
          "The starting point is a multi-class wildlife detection dataset covering a broad taxonomy of animal species across diverse natural habitat environments. The dataset contains bounding box annotations with class labels.",
          "Dataset inspection revealed that one class — Butterfly — suffered from severe class imbalance, containing an overwhelming excess of instances compared to all other animal classes. This extreme sample disparity skewed the loss function and biased detection thresholds away from the remaining 52 wildlife classes (larger-bodied mammals and birds).",
          "To eliminate this severe class imbalance and ensure stable, unbiased training across the wildlife taxonomy, the Butterfly class was removed. All remaining class labels were continuously re-indexed from 0 to 51, establishing a clean, balanced 52-class dataset for both expert models.",
        ],
      },
      {
        heading: "Phase 02 — Precision Expert: RT-DETR-X on Clean Data",
        paragraphs: [
          "The Precision Expert is based on RT-DETR-X — the highest-capacity variant of the Real-Time Detection Transformer architecture. RT-DETR uses a hybrid CNN-transformer backbone and a DETR-style set-prediction decoder, providing excellent localization precision and handling complex scenes with multiple animals at varying scales.",
          "The Precision Expert is trained exclusively on clean, unaugmented dataset images. Standard data augmentation techniques (horizontal flip, color jitter, mosaic) are applied, but no degradation augmentations. The model is allowed to specialize in producing high-quality detections under favorable visual conditions.",
          "By restricting the Precision Expert's training distribution to clean frames, the model can concentrate its capacity on fine-grained species discrimination and precise bounding box regression rather than trying to also learn robustness to image degradation.",
        ],
      },
      {
        heading: "Phase 03 — Kinetic Expert: Trained on Chaos-Augmented Data",
        paragraphs: [
          "The Kinetic Expert is trained on a chaos-augmented version of the dataset designed to simulate the full range of challenging field conditions: synthetic motion blur (random directional Gaussian convolution kernels), simulated fog and haze (additive white layers with blending), random pixel-level noise injection, partial occlusion patches, and extreme exposure variation.",
          "Both RT-DETR and YOLO11m variants were evaluated as the Kinetic Expert backbone. YOLO11m offers faster inference with strong degradation robustness; RT-DETR provides more accurate localization under partial occlusion. The chaos augmentation training explicitly teaches this model to extract reliable detections from image data that would confuse or destabilize the Precision Expert.",
          "The Kinetic Expert therefore trades some peak performance on clean data for robustness under the difficult conditions it is specifically trained to handle.",
        ],
      },
      {
        heading: "Phase 04 — Frame-Level MoE Router: Laplacian Variance",
        paragraphs: [
          "The router component determines which expert receives each incoming frame. The routing metric is the Laplacian variance of the frame — a classical image sharpness measure computed by convolving the image with a Laplacian kernel and computing the variance of the resulting response values.",
          "Sharp, high-frequency frames (stationary animals in good light) produce high Laplacian variance values. Blurred, low-frequency, or noisy frames produce low values. A threshold on the Laplacian variance therefore cleanly separates the two regime types without any neural inference cost.",
          "This design choice is intentional: a neural gating network would add latency, require its own training data and labels, and introduce another model to maintain. The Laplacian variance router is zero-overhead, deterministic, and interpretable — you can inspect any individual routing decision by examining the frame's computed sharpness score.",
        ],
      },
      {
        heading: "Phase 05 — BotSort Multi-Object Tracking",
        paragraphs: [
          "Object detection is a per-frame operation: each frame produces a set of bounding boxes and class labels independently, with no intrinsic connection between a box in frame N and a box in frame N+1. For wildlife monitoring, maintaining consistent identity labels across a video sequence is essential — you want to know that animal #3 in frame 100 is the same individual as animal #3 in frame 200, even if it was temporarily occluded.",
          "BotSort is integrated as the tracking backend. It associates detected bounding boxes across frames using appearance similarity and Kalman-filter-based motion prediction to maintain persistent identity tracks. When an animal is temporarily lost due to occlusion or a difficult frame (one that the current router-selected expert struggles with), BotSort's Kalman predictor continues to estimate the track's position until a reliable detection re-associates with it.",
          "The frame-level routing switch between experts could theoretically cause track instability if the two experts produce slightly different bounding box positions for the same animal on consecutive frames. BotSort's assignment logic is robust to small positional shifts, maintaining track continuity through routing transitions.",
        ],
      },
      {
        heading: "Phase 06 — Interactive Gradio Application Deployment",
        paragraphs: [
          "The full pipeline — router, experts, tracking — is deployed as an interactive Gradio web application for real-time demonstration. Users can upload wildlife video clips or use live camera input and observe the system's detection outputs, track IDs, and routing decisions visualized as overlays on the video stream.",
          "The Gradio interface exposes the Laplacian variance threshold as an adjustable slider, allowing observers to see in real time how the routing behavior changes as the threshold is varied. Frames routed to the Precision Expert are annotated with one overlay style; frames routed to the Kinetic Expert are annotated differently, making the per-frame routing decisions directly visible.",
        ],
      },
    ],
    architectureDiagram: `             Video Frame Stream
                     │
                     ▼
          Laplacian Variance Filter
                     │
            ┌────────┴────────┐
      Variance ≥ τ      Variance < τ
     (Clean / Sharp)    (Blur / Motion / Fog)
            ▼                 ▼
     Precision Expert   Kinetic Expert
       (RT-DETR-X)        (YOLO11m)
            │                 │
            └────────┬────────┘
                     ▼
          BotSort Tracking Engine
       (Kalman Persistent Animal IDs)
                     ▼
        Gradio Live Demonstration`,
    phases: [
      {
        step: "01",
        title: "Curate 53-Class Dataset → 52 Classes",
        description: "Build a balanced 52-class wildlife dataset by removing the Butterfly class due to severe class imbalance (extreme over-representation), then continuously re-indexing all remaining labels.",
      },
      {
        step: "02",
        title: "Train Precision Expert (RT-DETR-X)",
        description: "Train the high-capacity RT-DETR-X model on clean, unaugmented structured images with standard augmentations only, specializing it for high-quality detection on favorable frames.",
      },
      {
        step: "03",
        title: "Train Kinetic Expert (RT-DETR / YOLO11m)",
        description: "Train the robustness-focused expert on a chaos-augmented dataset simulating motion blur, fog, occlusion patches, noise injection, and extreme exposure variations.",
      },
      {
        step: "04",
        title: "Implement Frame-Level MoE Router",
        description: "Design and implement the per-frame Laplacian variance sharpness router that routes each incoming video frame to the appropriate expert in real time without neural inference overhead.",
      },
      {
        step: "05",
        title: "Integrate BotSort Multi-Object Tracking",
        description: "Integrate BotSort tracking with Kalman-filter motion prediction to assign and maintain persistent animal identity labels across the full video sequence.",
      },
      {
        step: "06",
        title: "Deploy Interactive Gradio Application",
        description: "Package the full router + expert + tracking pipeline into an interactive Gradio application with visualized routing decisions, track ID overlays, and an adjustable threshold slider.",
      },
    ],
    keyFeatures: [
      {
        title: "53-Class → 52-Class Dataset Balancing",
        description: "Resolved severe class imbalance by removing the heavily over-represented Butterfly class and continuously re-indexing the remaining 52 wildlife categories for stable, unbiased training.",
      },
      {
        title: "Precision Expert: RT-DETR-X on Clean Data",
        description: "High-capacity transformer detection model trained on clean images to specialize in fine-grained species discrimination and precise bounding box regression under favorable conditions.",
      },
      {
        title: "Kinetic Expert: Chaos-Augmented Robustness",
        description: "Trained on a synthetically degraded dataset simulating motion blur, fog, occlusion, and noise to produce reliable detections under difficult field conditions.",
      },
      {
        title: "Zero-Overhead Laplacian Variance Router",
        description: "Classical image sharpness metric provides deterministic, interpretable, zero-latency per-frame expert routing without any neural gating network.",
      },
      {
        title: "BotSort Track Continuity",
        description: "Kalman-filter motion prediction maintains animal identity tracks through occlusions and routing switches, providing persistent individual IDs across the full video sequence.",
      },
      {
        title: "Interactive Gradio Demo with Live Routing Visualization",
        description: "Deployed application exposes routing decisions, detection overlays, and adjustable Laplacian threshold to make the entire MoE pipeline behavior directly observable.",
      },
    ],
    photos: [
      {
        src: "/images/projects/animal-detection/raw.png",
        alt: "Raw unprocessed wildlife habitat video frame",
        caption: "Raw high-resolution wildlife footage frame before any algorithmic processing",
      },
      {
        src: "/images/projects/animal-detection/detected.png",
        alt: "MoE detection with BotSort tracking ID overlays",
        caption: "Output frame with bounding boxes, species class labels, confidence scores, and BotSort persistent track IDs",
      },
    ],
    accent: "rose",
  },

  {
    id: "chat-me",
    index: "06",
    title: "Chat-Me",
    subtitle: "Asynchronous Multithreaded C++ LAN Chat Application with Chunked File Transfer",
    category: "systems",
    categoryLabel: "Systems & Network Programming",
    status: "Complete",
    period: "2025–2026",
    timeline: "2025–2026 · Systems & Networking",
    tags: ["C++17", "Boost.ASIO", "Asynchronous I/O", "Qt Desktop GUI", "Custom Packet Framing", "Multithreading", "UDP/TCP", "Chunked File Transfer"],
    repoUrl: "https://github.com/HamdanTariq26/Chat-Me",
    headline: "A high-performance C++ client-server messaging and binary file-transfer application built on asynchronous ASIO socket I/O, custom packet framing, and a native Qt desktop GUI.",
    description: "A LAN chat and file-transfer application in C++ with a Qt GUI, custom asynchronous UDP transport, peer auto-discovery, and chunked file transfer.",
    overview: [
      "Chat-Me is a C++ client-server application engineered for real-time text messaging and binary file transfer across local area networks. The project demonstrates core systems programming concepts — asynchronous socket I/O, concurrent connection management, custom wire protocol design, and multi-threaded resource sharing — implemented without relying on high-level networking libraries that abstract these details away.",
      "The networking foundation is built on modern asynchronous socket architecture using ASIO, implementing non-blocking I/O completion loops that allow the server to handle multiple simultaneous client connections without spawning a dedicated thread per client — a design that scales more gracefully than thread-per-connection architectures under load.",
      "The client side presents an intuitive graphical user interface developed in Qt, making the application usable by non-technical users while the underlying systems implementation provides hands-on experience with the full network stack from raw socket operations through serialization, buffering, and delivery.",
    ],
    problemStatement: {
      heading: "Learning Context & Implementation Approach",
      paragraphs: [
        "This project was developed as part of a university team assignment, with the core networking implementation done individually. The goal was to move beyond textbook networking theory and implement a working client-server system by applying concepts in real code.",
        "The networking foundation was built by working through the MMO Client/Server Framework tutorials by David Barr (javidx9), coding alongside the tutorial with active debugging and understanding of each component rather than copying code passively. The framework was then adapted and extended to support the specific requirements of LAN-based chat — multiple simultaneous client connections, user presence, and reliable binary file transfer.",
        "This approach of learning through implementation — understanding each architectural decision, debugging transport-layer issues, and adapting a general framework to a specific application — produced a working system alongside a genuine understanding of asynchronous networking internals.",
      ],
    },
    deepDiveSections: [
      {
        heading: "Asynchronous I/O Architecture",
        paragraphs: [
          "The core networking layer uses ASIO's asynchronous I/O model rather than blocking synchronous sockets. In a synchronous design, each network operation (accept, read, write) blocks the calling thread until it completes — requiring either a dedicated thread per connection or complex manual state machines. Under ASIO, operations are initiated asynchronously and completion callbacks are invoked by an I/O context event loop when the operation finishes.",
          "This allows the server to manage multiple simultaneous client connections from a small thread pool rather than spawning a thread per client. The main I/O loop runs in a background thread, processing completion events from all active connections. New connection accepts are posted back to the I/O context immediately after handling, keeping the server continuously receptive to incoming clients.",
          "The asynchronous design is particularly important for file transfer: a large file transfer that would block a synchronous thread for several seconds becomes a sequence of async chunk-write completions interleaved with regular message processing, preventing any single file transfer from degrading responsiveness for other connected clients.",
        ],
      },
      {
        heading: "Custom Packet Framing & Binary Serialization",
        paragraphs: [
          "TCP is a stream protocol — it delivers bytes in order but makes no guarantees about how many bytes arrive in a single read operation. A read of 1000 bytes might receive all 1000 at once, or 500 and then 500, or 237 and then 763 — depending on network conditions and the OS's TCP buffer behavior. Any application-layer protocol built on raw TCP must implement its own message framing to reconstruct complete messages from the byte stream.",
          "Chat-Me implements a custom packet framing protocol with a fixed-size header that encodes the message type ID and the length of the payload in bytes. The receive path reads the fixed-size header first, extracts the payload length, then reads exactly that many bytes as the message body. This guarantees that complete, well-formed messages are delivered to the application layer regardless of how TCP segments the byte stream.",
          "Message payloads are binary-serialized into compact byte arrays. The serialization format handles primitive types (integers, strings) and message-specific fields. Binary serialization is more efficient than text-based formats (JSON, XML) in terms of both payload size and parsing speed, appropriate for a high-throughput messaging application.",
        ],
      },
      {
        heading: "Chunked File Transfer",
        paragraphs: [
          "File transfer is implemented as a chunked streaming protocol layered on top of the same asynchronous message framework used for text messages. A file transfer session begins with a metadata message announcing the filename, total size, and transfer ID. The file content is then read from disk in fixed-size chunks and sent as a sequence of chunk messages, each tagged with the transfer ID and sequence number.",
          "The receiver reconstructs the file by writing incoming chunks to a temporary output buffer in sequence-number order, handling out-of-order delivery. A completion message signals successful transfer, triggering the receiver to finalize the output file.",
          "Transfer progress is tracked and exposed through the Qt UI as a progress indicator, giving the user visibility into large in-progress transfers. Error handling covers connection interruptions mid-transfer, malformed chunk sequences, and write failures on the receiver side.",
        ],
      },
      {
        heading: "Qt Desktop Client Interface",
        paragraphs: [
          "The client-side graphical interface is built in Qt, providing a native cross-platform desktop application. The main window displays the real-time chat message stream, a list of currently connected users, and controls for initiating file transfers.",
          "Qt's signal-slot mechanism connects the networking layer's asynchronous events to UI updates. When a new message arrives from the ASIO I/O thread, a queued connection signal safely marshals the update to the Qt main thread for rendering — preventing direct UI access from background threads, which would cause undefined behavior.",
          "The server runs as a command-line application with a terminal console that displays active connection events, client identifiers, message counts, and file transfer status, providing operational visibility without a GUI overhead.",
        ],
      },
    ],
    architectureDiagram: `         Qt Desktop Client (GUI)
                    │
                    ▼
       Custom Packet Framing Engine
      (Type ID + Payload Length Header)
                    │
                    ▼
        ASIO Non-Blocking Sockets
                    │
                    ▼
         Multithreaded C++ Server
      (Connection Pool + Chunked File I/O)`,
    keyFeatures: [
      {
        title: "ASIO Asynchronous Non-Blocking I/O",
        description: "Event-driven completion-handler architecture serves multiple simultaneous client connections from a small thread pool, avoiding the scalability limits of thread-per-connection designs.",
      },
      {
        title: "Custom Length-Prefixed Packet Framing",
        description: "Fixed-size header encoding message type and payload length correctly reconstructs complete application-layer messages regardless of TCP stream segmentation behavior.",
      },
      {
        title: "Binary Payload Serialization",
        description: "Compact binary serialization of message payloads provides better throughput and smaller wire sizes than text-based serialization formats.",
      },
      {
        title: "Chunked Streaming File Transfer",
        description: "Files are streamed in fixed-size chunks tagged with sequence numbers and transfer IDs, enabling progress tracking, out-of-order reassembly, and mid-transfer error recovery.",
      },
      {
        title: "Cross-Platform Qt Desktop Client",
        description: "Native Qt GUI with real-time message stream, connected user list, file transfer progress indicators, and safe signal-slot cross-thread UI updates.",
      },
      {
        title: "Server Connection Event Console",
        description: "Dedicated C++ server terminal displays active connections, client identifiers, message routing events, and file transfer status for operational monitoring.",
      },
    ],
    photos: [
      {
        src: "/images/projects/chat-me/chat-gui.png",
        alt: "Chat-Me primary client user interface",
        caption: "Main Qt client interface showing chat message history, connected users, and message input",
      },
      {
        src: "/images/projects/chat-me/chat-gui-2.png",
        alt: "Active conversation in Chat-Me client",
        caption: "Real-time message exchange and multi-user conversation display",
      },
      {
        src: "/images/projects/chat-me/multiclient-gui.png",
        alt: "Multiple simultaneous client connections",
        caption: "Multiple client sessions connected simultaneously via the local network server",
      },
      {
        src: "/images/projects/chat-me/server.png",
        alt: "C++ server terminal console",
        caption: "Backend C++ server console monitoring active connections, message routing, and file transfer events",
      },
    ],
    accent: "teal",
  },
  {
    id: "project-kisan",
    index: "07",
    title: "Project Kisan",
    subtitle: "AI-Powered Agricultural Assistant",
    category: "ml",
    categoryLabel: "AI Research & NLP",
    status: "Open Source · Research Demo",
    period: "2026",
    timeline: "2026",
    tags: [
      "Llama 3.2 3B Instruct",
      "Llama 3.1 8B Instruct",
      "LoRA / PEFT",
      "QLoRA (4-bit NF4)",
      "FAISS",
      "BGE CrossEncoder",
      "RAG",
      "FastAPI",
      "Gradio",
      "Qwen3-Embedding-0.6B",
      "DDGS Web Search",
    ],
    repoStatus: "Open Source · Code release in progress",
    headline:
      "An open-source hybrid conversational AI combining dual foundation models (fine-tuned Llama 3.2 3B and Llama 3.1 8B), FAISS-based RAG, live web search, and an LLM routing agent engineered to mitigate hallucinations and prevent incorrect agricultural guidance.",
    description:
      "Open-source conversational agricultural AI supporting fine-tuned Llama 3.2 3B and Llama 3.1 8B with multi-stage RAG, BGE reranking, live web search, and routing designed to minimize hallucinations and false advice.",
    overview: [
      "Project Kisan is an open-source intelligent agricultural assistant built around a hybrid inference architecture. In agricultural decision-making, standard language models frequently hallucinate facts, invent pesticide dosages, or state outdated guidance with unjustified confidence. Rather than relying blindly on unconstrained parametric memory, Project Kisan was designed with multi-layered safeguards to minimize hallucination and avoid incorrect information.",
      "The system dynamically decides — via an LLM-based routing agent — whether a query can be answered directly, requires retrieval from a curated internal knowledge base, or demands a live web search to verify time-sensitive or external facts. This ensures the model is grounded in relevant evidence rather than forced to guess.",
      "The inference architecture supports dual foundation models: a fine-tuned Meta Llama 3.2 3B Instruct model for fast, low-latency, and domain-adapted responses, and an optional Meta Llama 3.1 8B Instruct model for situations requiring deeper general reasoning, multi-step explanations, and comprehensive advisory generation.",
      "For domain adaptation, Llama 3.2 3B was fine-tuned with QLoRA (4-bit NF4, LoRA r=16 α=32) on the kisanVaani/agriculture-qa-english-only dataset using SFTTrainer with a 90/10 train/validation split. Fine-tuning ran to checkpoint-3500 with early stopping and was evaluated against domain validation loss.",
      "The retrieval pipeline acts as an active hallucination defense: FAISS vector search retrieves an initial candidate pool of 20 documents using Qwen3-Embedding-0.6B, which a BGE CrossEncoder (BAAI/bge-reranker-v2-m3) reranks down to the top 5 with a strict 0.5 minimum score threshold. Noisy, irrelevant passages that often trigger model hallucination are filtered out before reaching the prompt. For timely queries, DDGS discovers 15 live web results across diverse domains, cleaned via BeautifulSoup, and reranked to top 10 passages with domain diversity caps.",
      "The routing agent outputs a structured JSON tool-call deciding between `direct`, `rag_search`, and `web_search_tool`. When retrieved context is insufficient, the model is instructed to acknowledge uncertainty rather than fabricate unsupported answers. Responses stream token-by-token with transparent source attribution over a FastAPI Server-Sent Events endpoint.",
    ],
    problemStatement: {
      heading: "The Danger of Hallucinations and Incorrect Information in Agriculture",
      paragraphs: [
        "In agriculture, incorrect advice carries severe real-world consequences: misdiagnosing a crop pathogen, prescribing incorrect chemical concentrations, or recommending outdated practices can decimate seasonal yields. Unconstrained LLMs frequently hallucinate precise-sounding numbers, dates, and chemicals with false certainty.",
        "Project Kisan was engineered specifically to address this vulnerability. Rather than claiming infallible accuracy, the system incorporates architectural guardrails at every layer: two-stage neural reranking to eliminate misleading context, live web search for verified external facts, strict anti-hallucination prompting that penalizes fabricated dosages, and uncertainty acknowledgment when data is missing.",
      ],
    },
    deepDiveSections: [
      {
        heading: "Dual Foundation Models — Fine-Tuned 3B vs. Configurable 8B",
        paragraphs: [
          "Project Kisan implements a configurable foundation model architecture supporting both Meta Llama 3.2 3B Instruct and Meta Llama 3.1 8B Instruct. This design gives users and deployment environments the flexibility to balance computational efficiency against response depth.",
          "The fine-tuned 3B model (loaded from checkpoint-3500) delivers high-speed, domain-specialized responses with minimal GPU memory footprint, making it ideal for edge deployment, rapid chat turns, and high-throughput advisory environments.",
          "The 8B model (Meta Llama 3.1 8B Instruct) serves as an alternative high-capacity reasoning engine. It provides superior multi-step logical deduction, nuanced agronomic problem solving, and richer contextual synthesis when handling complex multi-factor queries such as disease interaction with climate conditions.",
        ],
      },
      {
        heading: "QLoRA Fine-Tuning — Domain Adaptation Pipeline",
        paragraphs: [
          "The base model — Llama 3.2 3B Instruct — was fine-tuned using QLoRA: 4-bit NF4 quantisation with double quantisation enabled to reduce memory footprint, combined with LoRA adapters at rank r=16 and scaling α=32 applied to all attention projection layers (q_proj, k_proj, v_proj, o_proj).",
          "Training used SFTTrainer from the TRL library on the kisanVaani/agriculture-qa-english-only dataset, converted into conversational message structures. The dataset was split 90/10 for training and validation with seed 42. Training ran with batch size 2, gradient accumulation 4 (effective batch size 8), learning rate 2e-4, gradient checkpointing, and an EarlyStoppingCallback (patience 2), converging at checkpoint-3500.",
          "The fine-tuned adapter was merged back into the base model weights for efficient single-model inference without runtime LoRA overhead.",
        ],
      },
      {
        heading: "FAISS RAG Pipeline — Two-Stage Retrieval for Hallucination Suppression",
        paragraphs: [
          "The RAG path uses Qwen3-Embedding-0.6B to embed both the knowledge base documents and incoming queries into a shared vector space. FAISS performs approximate nearest-neighbour search over the index, retrieving the top k=20 candidate chunks.",
          "A BGE CrossEncoder (BAAI/bge-reranker-v2-m3) reranker then scores each of the 20 candidates against the original query for semantic relevance, selecting the final top 5 passages with a minimum threshold of 0.5. These are concatenated into a structured context block and injected into the prompt.",
          "This two-stage design — broad retrieval then neural cross-encoder reranking — is specifically engineered to filter out weakly relevant context. Irrelevant context is one of the primary drivers of hallucinations in generative models; pruning it drastically reduces misleading generation.",
        ],
      },
      {
        heading: "Web Search System — Live Knowledge Verification & Domain Diversity",
        paragraphs: [
          "For queries that require current, externally verifiable information, the web search path uses DDGS (DuckDuckGo Search) to retrieve up to 15 results. The top URLs from diverse domains are fetched and cleaned via BeautifulSoup, extracting readable text from up to 5 pages while stripping scripts, navbars, and boilerplate.",
          "The extracted passages are chunked (chunk_size=1500, overlap=200) and reranked using the same BGE CrossEncoder, selecting up to 10 ranked web chunks with a cap of 3 chunks per domain. This prevents any single website from dominating the context window and introducing bias.",
          "To avoid generating incorrect guidance, the model is explicitly prompted to derive answers strictly from provided evidence, refrain from guessing unsupported chemical dosages or timing, and openly state when information is unavailable.",
        ],
      },
      {
        heading: "LLM Router Agent — Preventing Memory-Only Guesses",
        paragraphs: [
          "A lightweight LLM call acts as a meta-reasoning layer. Given the user's query, it outputs a structured JSON tool-call — one of `direct`, `rag_search`, or `web_search_tool` — along with an extracted search sub-query when retrieval is chosen.",
          "This design prevents the system from guessing from internal weights on factual or volatile subjects. The router identifies the nature of the query: general greetings or conversational prompts are handled directly, while technical agronomic queries and current market/weather events are routed to their respective retrieval pipelines.",
          "The implementation includes defensive JSON extraction and repairs to normalize malformed responses, dispatching safely to the registered tool executor.",
        ],
      },
      {
        heading: "Streaming FastAPI Backend — Production Serving & Verifiable Citations",
        paragraphs: [
          "The inference backend is built with FastAPI and exposes an SSE (Server-Sent Events) endpoint (`/api/chat/stream`) alongside a standard chat endpoint (`/api/chat`). Token generation from the Llama model is streamed token-by-token using `TextIteratorStreamer` running in a worker thread piped through an `asyncio.Queue`.",
          "A key transparency feature is source attribution: retrieved document titles, page numbers, and live web URLs are transmitted with the response so users can cross-verify advice rather than treating generated text as unquestioned fact.",
          "The full stack — embedding, FAISS, reranker, router, dual-model generation, and streaming API — runs as a single integrated service with clean modular boundaries.",
        ],
      },
    ],
    architectureDiagram: `USER QUERY
     │
     ▼
┌─────────────────────────────┐
│      LLM ROUTER AGENT       │
│  (Llama JSON Tool-Call)     │
│  direct / rag / web_search  │
└──────┬──────────┬───────────┘
       │          │            │
  direct      rag_search   web_search_tool
       │          │            │
       │    ┌─────┴──┐   ┌────┴─────┐
       │    │  FAISS  │   │  DDGS    │
       │    │ k=20    │   │ 15 URLs  │
       │    └────┬────┘   └────┬─────┘
       │         │              │
       │   BGE CrossEncoder  BGE CrossEncoder
       │    (top 5 chunks)  (top 10 passages)
       │         │              │
       └────┬────┴──────────────┘
            │    CONTEXT BLOCK
            ▼
┌───────────────────────────────────────┐
│         DUAL MODEL GENERATION         │
│  • Fine-tuned Llama 3.2 3B (QLoRA)    │
│    [Fast, specialized, checkpoint-3500]│
│  • Meta Llama 3.1 8B Instruct         │
│    [Deep multi-step reasoning & depth] │
└───────────────────┬───────────────────┘
                    │ SSE Token Stream
                    ▼
              FastAPI Backend
                    │
                    ▼
             Gradio Frontend`,
    keyFeatures: [
      {
        title: "Dual-Model Architecture (3B & 8B)",
        description:
          "Configurable inference pipeline supporting both a fast, QLoRA-fine-tuned Llama 3.2 3B for specialized responses, and Meta Llama 3.1 8B Instruct for tasks requiring deeper multi-step reasoning and detailed explanations.",
      },
      {
        title: "LLM Routing Agent",
        description:
          "A dedicated LLM call classifies each query and dispatches it — direct answer, RAG retrieval, or live web search — based on structured JSON tool-call output, avoiding brittle keyword heuristics.",
      },
      {
        title: "QLoRA Domain Fine-Tuning",
        description:
          "Llama 3.2 3B Instruct fine-tuned with 4-bit NF4 QLoRA (r=16, α=32) on the KisanVaani agricultural corpus using SFTTrainer, converging at checkpoint-3500 with a 90/10 data split.",
      },
      {
        title: "Two-Stage RAG Retrieval",
        description:
          "FAISS retrieves the top 20 candidate chunks using Qwen3-Embedding-0.6B, which a BGE CrossEncoder reranker then narrows to the top 5 for precision — maximising recall then filtering for relevance.",
      },
      {
        title: "Live Web Search Integration",
        description:
          "DDGS fetches 15 live results; up to 5 pages are scraped and cleaned via BeautifulSoup; BGE reranking selects the top 10 passages with domain diversity caps.",
      },
      {
        title: "SSE Token Streaming & API",
        description:
          "FastAPI streams Llama tokens over Server-Sent Events via TextIteratorStreamer and asyncio.Queue, delivering a responsive chat experience with real-time source attribution.",
      },
      {
        title: "Hallucination Defense & Guardrails",
        description:
          "Rather than assuming generative infallibility, the architecture incorporates multi-layered guardrails: neural CrossEncoder relevance filtering (threshold >= 0.5), uncertainty acknowledgment prompts, domain diversity caps, and explicit constraints against fabricating dosages.",
      },
    ],
    phases: [
      {
        step: "01",
        title: "Data Preparation",
        description:
          "kisanVaani agricultural QA dataset loaded and converted into conversational instruction templates. 90/10 train/validation split applied with fixed seed 42. PDF documents chunked and indexed in FAISS with Qwen3-Embedding-0.6B.",
      },
      {
        step: "02",
        title: "QLoRA Fine-Tuning",
        description:
          "Llama 3.2 3B Instruct quantised to 4-bit NF4 with double quantisation and BF16 computation. LoRA adapters (r=16, α=32) trained on attention projections via SFTTrainer with gradient checkpointing, selecting checkpoint-3500 via early stopping.",
      },
      {
        step: "03",
        title: "Dual-Model Inference Setup",
        description:
          "Integrated both the fine-tuned Llama 3.2 3B model for fast domain-specific answering and Meta Llama 3.1 8B Instruct for enhanced general reasoning, configurable based on query complexity.",
      },
      {
        step: "04",
        title: "RAG & Web Retrieval Modules",
        description:
          "FAISS vector store and BGE CrossEncoder (bge-reranker-v2-m3) assembled for two-stage document retrieval. DDGS web search with BeautifulSoup parsing and domain diversity caps implemented.",
      },
      {
        step: "05",
        title: "Router Agent & Backend",
        description:
          "LLM routing agent built to classify queries into direct, rag_search, or web_search_tool via JSON tool-calls. FastAPI SSE streaming backend assembled with asynchronous event queues and source attribution.",
      },
      {
        step: "06",
        title: "Frontend & Deployment",
        description:
          "Gradio frontend built for multi-turn conversation, source citation display, and routing-path inspection. Hosted in a GPU environment with ngrok secure tunnels and Kaggle Secrets credential management.",
      },
    ],
    metrics: [
      {
        label: "Foundation Models",
        value: "3B Fine-Tuned + 8B",
        detail: "Llama 3.2 3B (domain adapted) & Llama 3.1 8B (deep reasoning)",
      },
      {
        label: "LoRA Config",
        value: "r=16 / α=32",
        detail: "4-bit NF4 quantisation, double quantisation, BF16 compute",
      },
      {
        label: "Fine-Tune Checkpoint",
        value: "Step 3500",
        detail: "90 / 10 split on KisanVaani dataset with early stopping",
      },
      {
        label: "FAISS Recall",
        value: "top k=20",
        detail: "Narrowed to top 5 by BGE CrossEncoder reranker (>=0.5 score)",
      },
      {
        label: "Web Search",
        value: "15 results",
        detail: "5 diverse sites scraped → BGE reranked → top 10 passages",
      },
      {
        label: "Routing Paths",
        value: "3 paths",
        detail: "direct / rag_search / web_search_tool via JSON tool-call",
      },
    ],
    photos: [
      {
        src: "/images/projects/project-kisan/frontend.png",
        alt: "Project Kisan Gradio frontend interface",
        caption:
          "Gradio-based conversational frontend showing multi-turn chat, routing status, and live source attribution citations",
      },
      {
        src: "/images/projects/project-kisan/fine-tuned-model.png",
        alt: "Fine-tuned Llama 3.2 3B model output",
        caption:
          "Fine-tuned Llama 3.2 3B model (checkpoint-3500) answering agricultural disease queries with grounded web source citations",
      },
      {
        src: "/images/projects/project-kisan/8b-model.png",
        alt: "Meta Llama 3.1 8B Instruct inference evaluation",
        caption:
          "Meta Llama 3.1 8B Instruct running inside the Project Kisan interface, providing detailed multi-step reasoning and structured management strategies",
      },
      {
        src: "/images/projects/project-kisan/tool-execution-code.png",
        alt: "LLM router agent tool execution code",
        caption:
          "Router agent JSON tool-call dispatch logic — classifying queries into direct, rag_search, or web_search_tool paths with defensive parsing",
      },
    ],
    accent: "gold",
  },
];

export function getProjectById(id: string): ProjectDetail | undefined {
  return projects.find((p) => p.id === id);
}
