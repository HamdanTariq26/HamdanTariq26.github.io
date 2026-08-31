import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Radio,
  ScanLine,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';

const queryClient = new QueryClient();
const email = 'hamdantariqedu@gmail.com';
const githubUrl = 'https://github.com/HamdanTariq26';
const linkedinUrl = 'https://www.linkedin.com/in/hamdan-tariq-89888736a';

type ProjectCategory = 'all' | 'vision' | 'robotics' | 'ml' | 'systems';
type Project = {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  index: string;
  description: string;
  stack: string[];
  status: string;
  signal: string;
  detail: string;
  accent: 'gold' | 'rose' | 'teal';
};

const projects: Project[] = [
  {
    id: 'autonomous-drone',
    title: 'Autonomous Drone',
    category: 'robotics',
    index: '01',
    description: 'A perception-to-map autonomy stack for a drone navigating spaces it has never seen.',
    stack: ['ROS2', 'ORB-SLAM3', 'Occupancy mapping'],
    status: 'Research build',
    signal: 'PERCEPTION / 3D',
    detail: 'A ROS2-based autonomous flight system combining visual-inertial odometry, ORB-SLAM3 and occupancy mapping. The core question is how to turn uncertain visual observations into a map a vehicle can safely act on.',
    accent: 'gold',
  },
  {
    id: 'mri-synthesis',
    title: 'MRI Synthesis + Segmentation',
    category: 'ml',
    index: '02',
    description: 'Conditional multimodal MRI synthesis paired with brain tumor segmentation.',
    stack: ['PyTorch', 'Medical imaging', 'U-Net'],
    status: 'Model study',
    signal: 'HEALTH / MULTIMODAL',
    detail: 'A medical imaging investigation into conditional multimodal synthesis and brain tumor segmentation. The work explores how complementary MRI sequences can support robust, clinically legible model outputs.',
    accent: 'rose',
  },
  {
    id: 'gesture-drone',
    title: 'Gesture-Controlled Drone',
    category: 'vision',
    index: '03',
    description: 'Human gestures become flight commands through a real-time computer vision loop.',
    stack: ['Python', 'OpenCV', 'MediaPipe'],
    status: 'Interactive prototype',
    signal: 'VISION / CONTROL',
    detail: 'A gesture interface that translates hand signals into drone commands. The prototype is built around low-latency recognition and a clear command vocabulary, keeping the human in the loop.',
    accent: 'teal',
  },
  {
    id: 'robotic-hand',
    title: 'Gesture-Controlled Robotic Hand',
    category: 'robotics',
    index: '04',
    description: 'A camera-led hand interface for translating intent into physical movement.',
    stack: ['Arduino', 'C++', 'Computer vision'],
    status: 'Hardware prototype',
    signal: 'EMBODIED / INPUT',
    detail: 'A robotic hand controlled by observed gestures. It connects a visual input layer to servo actuation, creating a small but tangible study in latency, calibration and human-machine communication.',
    accent: 'gold',
  },
  {
    id: 'animal-detection',
    title: 'Animal Detection System',
    category: 'vision',
    index: '05',
    description: 'A detection pipeline for identifying animals in varied visual environments.',
    stack: ['YOLO', 'OpenCV', 'Python'],
    status: 'Deployed experiment',
    signal: 'VISION / DETECTION',
    detail: 'An object detection system focused on dependable animal recognition across changing scenes. The project emphasizes data preparation, confidence thresholds and what happens after a detection is made.',
    accent: 'rose',
  },
  {
    id: 'chat-me',
    title: 'Chat-Me',
    category: 'systems',
    index: '06',
    description: 'A C++ / Qt networking application that makes low-level communication feel human.',
    stack: ['C++', 'Qt', 'TCP/IP'],
    status: 'Complete',
    signal: 'SYSTEMS / NETWORK',
    detail: 'A desktop chat application built with C++ and Qt networking. It is a foundational systems project: sockets, state, interface feedback and the details that make a connection feel reliable.',
    accent: 'teal',
  },
];

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Capabilities', id: 'systems' },
  { label: 'Projects', id: 'work' },
  { label: 'Journey', id: 'journey' },
  { label: 'Contact', id: 'contact' },
];

function scrollToId(id: string, closeMenu?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  closeMenu?.();
}

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 40);
    return () => window.clearTimeout(timer);
  }, []);
  return <div className={`reveal ${visible ? 'is-visible' : ''} ${delay} ${className}`}>{children}</div>;
}

function Header({ activeSection }: { activeSection: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[hsl(var(--background)/.18)] bg-[hsl(var(--foreground)/.96)] text-[hsl(var(--background))] backdrop-blur-md" data-testid="site-header">
      <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button onClick={() => scrollToId('top', () => setMobileOpen(false))} className="group flex items-center gap-3 text-left" data-testid="button-home">
          <span className="grid h-9 w-9 place-items-center border border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] transition group-hover:bg-[hsl(var(--secondary))] group-hover:text-[hsl(var(--foreground))]">
            <span className="mono text-[10px] font-bold">HT</span>
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">Hamdan Tariq</span>
        </button>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation" data-testid="nav-primary">
          {navItems.map((item, index) => (
            <button key={item.id} onClick={() => scrollToId(item.id)} className={`group relative py-2 text-xs transition-colors ${activeSection === item.id ? 'text-[hsl(var(--background))]' : 'text-[hsl(var(--background)/.57)] hover:text-[hsl(var(--background))]'}`} data-testid={`link-nav-${item.id}`}>
              <span className="mono mr-1 text-[9px] text-[hsl(var(--secondary)/.8)]">0{index + 1}</span>{item.label}
              <span className={`absolute -bottom-[1px] left-0 h-px bg-[hsl(var(--secondary))] transition-all ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="/cv.pdf" target="_blank" rel="noreferrer" className="hidden items-center gap-2 border border-[hsl(var(--background)/.32)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[.12em] transition hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))] sm:flex" data-testid="link-header-cv">View CV <ExternalLink className="h-3 w-3" /></a>
          <button className="grid h-10 w-10 place-items-center lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-[hsl(var(--background)/.17)] bg-[hsl(var(--foreground))] px-5 py-5 lg:hidden" data-testid="nav-mobile">
          <div className="flex flex-col">
            {navItems.map((item, index) => <button key={item.id} onClick={() => scrollToId(item.id, () => setMobileOpen(false))} className="flex items-center justify-between border-b border-[hsl(var(--background)/.15)] py-4 text-left text-lg" data-testid={`link-mobile-${item.id}`}><span><span className="mono mr-3 text-[10px] text-[hsl(var(--secondary))]">0{index + 1}</span>{item.label}</span><ArrowUpRight className="h-4 w-4 text-[hsl(var(--secondary))]" /></button>)}
            <a href="/cv.pdf" target="_blank" rel="noreferrer" className="mt-5 flex items-center gap-2 text-sm text-[hsl(var(--secondary))]" data-testid="link-mobile-cv">Open curriculum vitae <ExternalLink className="h-4 w-4" /></a>
          </div>
        </div>
      )}
    </header>
  );
}

function OrbitGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[510px] overflow-hidden border border-[hsl(var(--background)/.2)] bg-[hsl(189_26%_20%)] p-5 text-[hsl(var(--background))] sm:p-8" data-testid="visual-perception-orbit">
      <div className="scanline pointer-events-none absolute inset-0" />
      <div className="absolute inset-5 border border-[hsl(var(--background)/.16)] sm:inset-8" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="eyebrow text-[hsl(var(--secondary))]">field log / 26.01</span>
          <span className="mono flex items-center gap-2 text-[10px] text-[hsl(var(--background)/.54)]"><CircleDot className="h-3 w-3 text-[hsl(var(--secondary))]" /> Quetta / PK</span>
        </div>
        <div className="relative mx-auto my-6 grid aspect-square w-[62%] place-items-center rounded-full border border-[hsl(var(--background)/.25)]">
          <div className="absolute inset-[12%] rounded-full border border-dashed border-[hsl(var(--secondary)/.75)]" />
          <div className="absolute inset-[29%] rounded-full border border-[hsl(var(--background)/.2)]" />
          <div className="absolute inset-[41%] rounded-full bg-[hsl(var(--secondary))] shadow-[0_0_0_18px_hsl(var(--secondary)/.09)]" />
          <div className="absolute h-px w-[150%] rotate-[-28deg] bg-[hsl(var(--accent))]" />
          <div className="absolute h-[150%] w-px rotate-[28deg] bg-[hsl(var(--background)/.15)]" />
          <BrainCircuit className="relative z-10 h-8 w-8 text-[hsl(var(--foreground))]" strokeWidth={1.25} />
          <span className="absolute -right-6 top-[16%] h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
          <span className="absolute -bottom-2 left-[19%] h-2 w-2 rounded-full bg-[hsl(var(--secondary))]" />
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-[hsl(var(--background)/.18)] pt-4">
          {[['INPUT', 'stereo + IMU'], ['MODEL', 'ORB-SLAM3'], ['OUTPUT', 'map / act']].map(([label, value]) => <div key={label}><p className="mono text-[8px] tracking-[.11em] text-[hsl(var(--background)/.45)]">{label}</p><p className="mt-1 text-[11px] text-[hsl(var(--background))]">{value}</p></div>)}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="dark-panel grid-texture relative flex min-h-[760px] items-center overflow-hidden pt-[76px]" data-testid="section-hero">
      <div className="pointer-events-none absolute -right-32 top-28 h-[430px] w-[430px] rounded-full border border-[hsl(var(--secondary)/.14)]" />
      <div className="pointer-events-none absolute -right-10 top-44 h-[270px] w-[270px] rounded-full border border-dashed border-[hsl(var(--accent)/.28)]" />
      <div className="mx-auto grid w-full max-w-[1480px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-12 lg:py-24">
        <div className="relative z-10">
          <Reveal><div className="eyebrow mb-8 flex items-center gap-3 text-[hsl(var(--secondary))]"><span className="h-px w-8 bg-[hsl(var(--secondary))]" /> AI undergraduate / NUST Balochistan</div></Reveal>
          <Reveal delay="delay-1"><h1 className="display max-w-[820px] text-[clamp(4.2rem,9.8vw,9.5rem)] leading-[.78] text-[hsl(var(--background))]" data-testid="text-hero-title">Systems<br /><em className="text-[hsl(var(--secondary))]">that sense.</em></h1></Reveal>
          <Reveal delay="delay-2"><p className="mt-10 max-w-[550px] text-lg leading-relaxed text-[hsl(var(--background)/.68)] sm:text-xl" data-testid="text-hero-intro">I’m Hamdan Tariq — I build practical AI systems where perception has to become a useful decision, a moving robot, or a clearer clinical image.</p></Reveal>
          <Reveal delay="delay-3"><div className="mt-10 flex flex-wrap items-center gap-4"><button onClick={() => scrollToId('work')} className="button-sheen group flex items-center gap-4 bg-[hsl(var(--secondary))] px-5 py-3.5 text-sm font-semibold text-[hsl(var(--foreground))] transition hover:-translate-y-0.5" data-testid="button-explore-work">See the work <ArrowDownRight className="relative z-10 h-4 w-4 transition group-hover:translate-y-1 group-hover:rotate-[-45deg]" /></button><a href="/cv.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-2 py-3 text-sm text-[hsl(var(--background)/.72)] transition hover:text-[hsl(var(--secondary))]" data-testid="link-hero-cv">Download CV <ArrowUpRight className="h-4 w-4" /></a></div></Reveal>
          <Reveal delay="delay-4"><div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[hsl(var(--background)/.18)] pt-4"><span className="mono text-[9px] text-[hsl(var(--background)/.5)]">BASED IN <b className="font-normal text-[hsl(var(--background))]">QUETTA, PK</b></span><span className="mono text-[9px] text-[hsl(var(--background)/.5)]">FOCUS <b className="font-normal text-[hsl(var(--background))]">VISION × AUTONOMY</b></span></div></Reveal>
        </div>
        <Reveal className="lg:justify-self-end" delay="delay-2"><OrbitGraphic /></Reveal>
      </div>
      <div className="absolute bottom-8 right-8 hidden items-center gap-3 lg:flex"><span className="mono text-[9px] tracking-[.18em] text-[hsl(var(--background)/.42)]">SCROLL TO EXPLORE</span><ArrowDown className="h-4 w-4 text-[hsl(var(--secondary))]" /></div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[hsl(var(--background))] px-5 py-24 sm:px-8 lg:px-12 lg:py-36" data-testid="section-about">
      <div className="mx-auto max-w-[1480px]">
        <Reveal><div className="section-rule flex items-center justify-between pt-4"><span className="eyebrow">01 / orientation</span><span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">QUETTA, PAKISTAN / NUST</span></div></Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <Reveal><div className="flex flex-col gap-8 sm:flex-row sm:items-end lg:block"><div className="portrait-frame relative w-28 shrink-0 bg-[hsl(var(--foreground))] sm:w-36 lg:mb-10" data-testid="portrait-card"><img src="/images/hamdan-tariq.jpg" alt="Hamdan Tariq, Artificial Intelligence undergraduate at NUST" className="h-40 w-full object-cover object-top grayscale-[.15] sm:h-48" data-testid="img-portrait" /><span className="absolute -bottom-6 left-0 mono text-[9px] text-[hsl(var(--muted-foreground))]">HAMDAN / 2026</span></div><h2 className="display max-w-[480px] text-6xl leading-[.85] sm:text-8xl" data-testid="text-about-heading">Curiosity,<br />with a <em className="text-[hsl(var(--accent))]">feedback loop.</em></h2></div></Reveal>
          <Reveal delay="delay-1"><div className="max-w-[760px]"><p className="text-2xl leading-snug tracking-tight sm:text-4xl" data-testid="text-about-lead">The best projects are not demos. They are small, legible systems that make a real decision easier.</p><p className="mt-8 max-w-[620px] text-base leading-relaxed text-[hsl(var(--muted-foreground))]">As an Artificial Intelligence undergraduate at NUST Balochistan Campus, I work across the boundary between a model and the world around it. I care about the messy middle: sparse data, imperfect sensors, limited compute, and people who need to trust the result.</p><button onClick={() => scrollToId('systems')} className="group mt-9 flex items-center gap-3 text-sm font-semibold" data-testid="button-about-systems">How I work <span className="grid h-7 w-7 place-items-center border border-[hsl(var(--foreground)/.3)] transition group-hover:bg-[hsl(var(--foreground))] group-hover:text-[hsl(var(--background))]"><ChevronRight className="h-3.5 w-3.5" /></span></button></div></Reveal>
        </div>
        <div className="mt-24 grid gap-8 border-y border-[hsl(var(--foreground)/.18)] py-7 sm:grid-cols-3 sm:gap-0">
          {[['01', 'Observe', 'Start with the environment, not the algorithm.'], ['02', 'Make legible', 'Choose baselines and metrics people can inspect.'], ['03', 'Put it in motion', 'Move from notebook to a system that can respond.']].map(([number, title, copy], index) => <Reveal key={number} delay={`delay-${index + 1}`}><div className={`sm:px-7 ${index < 2 ? 'border-b pb-7 sm:border-b-0 sm:border-r sm:pb-0' : ''}`} data-testid={`card-principle-${number}`}><span className="mono text-[10px] text-[hsl(var(--accent))]">{number}</span><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-2 max-w-[230px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{copy}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Systems() {
  const capabilities = [
    { icon: ScanLine, label: 'Computer vision', copy: 'Detection, segmentation, visual inspection, and the discipline of working with imperfect images.', tone: 'gold' },
    { icon: Network, label: 'Machine learning', copy: 'Multimodal modelling, evaluation, medical imaging, and interpretable baselines.', tone: 'rose' },
    { icon: Cpu, label: 'Robotics + autonomy', copy: 'ROS2, mapping, controls, sensor fusion, and systems that have to act in real time.', tone: 'teal' },
  ];
  return (
    <section id="systems" className="dark-panel px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-testid="section-systems">
      <div className="mx-auto max-w-[1480px]">
        <Reveal><div className="flex items-center justify-between"><span className="eyebrow text-[hsl(var(--secondary))]">02 / working range</span><span className="mono text-[10px] text-[hsl(var(--background)/.42)]">TOOLS ARE MEANS, NOT IDENTITY</span></div></Reveal>
        <Reveal delay="delay-1"><h2 className="display mt-12 max-w-[880px] text-6xl leading-[.82] text-[hsl(var(--background))] sm:text-8xl" data-testid="text-systems-heading">From raw signal<br />to <em className="text-[hsl(var(--secondary))]">useful action.</em></h2></Reveal>
        <div className="mt-20 grid gap-px border border-[hsl(var(--background)/.21)] bg-[hsl(var(--background)/.21)] md:grid-cols-3">
          {capabilities.map(({ icon: Icon, label, copy, tone }, index) => <Reveal key={label} delay={`delay-${index + 1}`}><div className="group relative h-full bg-[hsl(var(--foreground))] p-7 transition-colors hover:bg-[hsl(189_28%_18%)] lg:p-9" data-testid={`card-capability-${index}`}><div className={`mb-16 grid h-12 w-12 place-items-center ${tone === 'gold' ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]' : tone === 'rose' ? 'bg-[hsl(var(--accent))] text-[hsl(var(--background))]' : 'bg-[hsl(178_40%_45%)] text-[hsl(var(--foreground))]'}`}><Icon className="h-5 w-5" strokeWidth={1.6} /></div><h3 className="text-2xl font-semibold text-[hsl(var(--background))]">{label}</h3><p className="mt-3 max-w-[280px] text-sm leading-relaxed text-[hsl(var(--background)/.57)]">{copy}</p><span className="absolute bottom-8 right-8 text-[hsl(var(--background)/.35)] transition group-hover:translate-x-1 group-hover:text-[hsl(var(--secondary))]"><ArrowUpRight className="h-5 w-5" /></span></div></Reveal>)}
        </div>
        <Reveal delay="delay-2"><div className="mt-5 flex flex-wrap gap-2" data-testid="list-toolkit">{['Python', 'C++', 'PyTorch', 'OpenCV', 'ROS2', 'Qt', 'Linux', 'Git', 'ORB-SLAM3', 'Arduino'].map((tool) => <span key={tool} className="mono border border-[hsl(var(--background)/.22)] px-3 py-2 text-[10px] text-[hsl(var(--background)/.6)]" data-testid={`tag-tool-${tool.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{tool}</span>)}</div></Reveal>
      </div>
    </section>
  );
}

function ProjectArt({ project }: { project: Project }) {
  return <div className="project-art relative grid aspect-[1.4] place-items-center overflow-hidden border border-[hsl(var(--foreground)/.13)]" data-testid={`visual-project-${project.id}`}>
    {project.category === 'robotics' && <div className="relative h-32 w-32 rotate-45 border border-[hsl(var(--secondary)/.8)]"><div className="absolute -inset-6 rounded-full border border-dashed border-[hsl(var(--accent)/.8)]" /><div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--secondary))]" /><Radio className="absolute -bottom-9 -right-9 h-7 w-7 -rotate-45 text-[hsl(var(--background)/.75)]" strokeWidth={1} /></div>}
    {project.category === 'ml' && <div className="relative h-[68%] w-[72%]"><div className="absolute left-[12%] top-[58%] h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent))] shadow-[34px_-22px_0_hsl(var(--secondary)),68px_-7px_0_hsl(var(--accent)),102px_-38px_0_hsl(var(--background)),136px_-17px_0_hsl(var(--secondary))]" /><div className="absolute left-[14%] top-[59%] h-px w-[75%] rotate-[-18deg] bg-[hsl(var(--background)/.6)]" /><div className="absolute inset-x-0 top-1/2 h-px bg-[hsl(var(--background)/.2)]" /><div className="absolute inset-y-0 left-1/3 w-px bg-[hsl(var(--background)/.18)]" /><Code2 className="absolute bottom-0 right-0 h-7 w-7 text-[hsl(var(--background)/.55)]" strokeWidth={1} /></div>}
    {project.category === 'vision' && <div className="relative h-[55%] w-[56%] border-2 border-[hsl(var(--background)/.68)]"><span className="absolute -left-2 -top-2 h-5 w-5 border-l-2 border-t-2 border-[hsl(var(--accent))]" /><span className="absolute -bottom-2 -right-2 h-5 w-5 border-b-2 border-r-2 border-[hsl(var(--secondary))]" /><div className="absolute left-[38%] top-[34%] h-8 w-8 rounded-full bg-[hsl(var(--secondary))]" /><ScanLine className="absolute -right-7 -top-7 h-10 w-10 text-[hsl(var(--accent))]" strokeWidth={1} /></div>}
    {project.category === 'systems' && <div className="relative h-[60%] w-[68%] border border-[hsl(var(--background)/.55)] p-3"><div className="h-full border border-[hsl(var(--background)/.18)]"><div className="flex gap-1 border-b border-[hsl(var(--background)/.18)] p-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--secondary))]" /></div><div className="p-3"><div className="h-1 w-2/3 bg-[hsl(var(--background)/.65)]" /><div className="mt-3 h-1 w-1/2 bg-[hsl(var(--background)/.3)]" /><div className="mt-8 ml-auto h-5 w-1/3 border border-[hsl(var(--secondary)/.8)]" /></div></div></div>}
    <span className="absolute bottom-4 right-5 mono text-[9px] text-[hsl(var(--background)/.5)]">{project.signal}</span>
  </div>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const accent = project.accent === 'gold' ? 'bg-[hsl(var(--secondary))]' : project.accent === 'rose' ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(178_40%_45%)]';
  return <article className="group flex h-full flex-col border border-[hsl(var(--foreground)/.19)] bg-[hsl(var(--card))] transition duration-300 hover:-translate-y-1 hover:border-[hsl(var(--foreground)/.52)] hover:shadow-[14px_14px_0_hsl(var(--foreground)/.08)]" data-testid={`card-project-${project.id}`}><div className={`h-2 ${accent}`} /><div className="flex flex-1 flex-col p-5 sm:p-7"><div className="flex items-center justify-between"><span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">PROJECT / {project.index}</span><span className="mono text-[9px] text-[hsl(var(--muted-foreground))]">{project.status}</span></div><div className="my-7"><ProjectArt project={project} /></div><div className="mt-auto"><h3 className="display text-4xl leading-none" data-testid={`text-project-title-${project.id}`}>{project.title}</h3><p className="mt-3 max-w-[360px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="mono bg-[hsl(var(--muted))] px-2 py-1 text-[9px]" data-testid={`tag-project-${project.id}-${tech.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{tech}</span>)}</div></div><button onClick={() => onOpen(project)} className="group/link mt-7 flex items-center gap-2 self-start text-sm font-semibold" data-testid={`button-open-project-${project.id}`}>Read the brief <ArrowUpRight className="h-4 w-4 transition group-hover/link:translate-x-1 group-hover/link:-translate-y-1" /></button></div></article>;
}

function Work() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const visibleProjects = useMemo(() => projects.filter((project) => filter === 'all' || project.category === filter), [filter]);
  return <section id="work" className="bg-[hsl(var(--background))] px-5 py-24 sm:px-8 lg:px-12 lg:py-36" data-testid="section-work"><div className="mx-auto max-w-[1480px]"><Reveal><div className="section-rule flex items-center justify-between pt-4"><span className="eyebrow">03 / selected work</span><span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">SIX OPEN THREADS</span></div></Reveal><div className="mt-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><Reveal><h2 className="display max-w-[680px] text-6xl leading-[.8] sm:text-8xl" data-testid="text-work-heading">Small systems.<br /><em className="text-[hsl(var(--accent))]">Real constraints.</em></h2></Reveal><Reveal delay="delay-1"><div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects" data-testid="group-project-filters">{(['all', 'vision', 'robotics', 'ml', 'systems'] as ProjectCategory[]).map((item) => <button key={item} onClick={() => setFilter(item)} className={`mono border px-3 py-2 text-[10px] uppercase transition ${filter === item ? 'border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]' : 'border-[hsl(var(--foreground)/.25)] hover:border-[hsl(var(--foreground))]'}`} data-testid={`button-filter-${item}`}>{item}</button>)}</div></Reveal></div><div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="grid-projects">{visibleProjects.map((project, index) => <Reveal key={project.id} delay={`delay-${(index % 4) + 1}`}><ProjectCard project={project} onOpen={setSelected} /></Reveal>)}</div><Reveal delay="delay-2"><div className="mt-14 flex flex-col gap-4 border-t border-[hsl(var(--foreground)/.2)] pt-5 sm:flex-row sm:items-center sm:justify-between"><span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">More experiments are taking shape in the lab.</span><button onClick={() => scrollToId('contact')} className="flex items-center gap-2 self-start text-sm font-semibold" data-testid="button-request-work">Ask for the full project list <ArrowUpRight className="h-4 w-4" /></button></div></Reveal></div>{selected && <div className="fixed inset-0 z-[60] grid place-items-center bg-[hsl(var(--foreground)/.78)] p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${selected.title} project brief`} data-testid="dialog-project-brief"><div className="relative max-h-[90dvh] w-full max-w-[650px] overflow-y-auto border border-[hsl(var(--foreground))] bg-[hsl(var(--background))] p-7 shadow-[18px_18px_0_hsl(var(--secondary))] sm:p-10"><button onClick={() => setSelected(null)} className="absolute right-5 top-5 grid h-8 w-8 place-items-center border border-[hsl(var(--foreground)/.2)] transition hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]" aria-label="Close project brief" data-testid="button-close-project"><X className="h-4 w-4" /></button><span className="eyebrow text-[hsl(var(--accent))]">Project brief / {selected.index}</span><h3 className="display mt-7 max-w-[520px] text-6xl leading-[.8]" data-testid="text-selected-project">{selected.title}</h3><p className="mt-7 text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">{selected.detail}</p><div className="mt-8 border-y border-[hsl(var(--foreground)/.2)] py-5"><p className="eyebrow text-[hsl(var(--muted-foreground))]">Project signal</p><p className="mt-2 text-sm">{selected.signal} / {selected.status}</p></div><button onClick={() => { setSelected(null); scrollToId('contact'); }} className="mt-8 flex items-center gap-2 bg-[hsl(var(--foreground))] px-4 py-3 text-sm text-[hsl(var(--background))] transition hover:bg-[hsl(var(--accent))]" data-testid="button-discuss-project">Discuss this work <ArrowUpRight className="h-4 w-4" /></button></div></div>}</section>;
}

function Journey() {
  const timeline = [
    ['2026', 'NUST Educational Robotics Lab / ER Lab', 'Data Science and Robotics internships, with collaboration from Cardiff Metropolitan University’s Eureka Robotics Centre.'],
    ['2023 — now', 'BS Artificial Intelligence', 'National University of Sciences & Technology · Balochistan Campus, Quetta.'],
    ['Current signal', 'Research direction', 'Visual SLAM, autonomous systems, medical imaging, and perception-driven tools that connect a model to the physical world.'],
  ];
  return <section id="journey" className="bg-[hsl(var(--muted))] px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-testid="section-journey"><div className="mx-auto max-w-[1480px]"><Reveal><div className="flex items-center justify-between"><span className="eyebrow">04 / trajectory</span><span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">STILL IN PROGRESS</span></div></Reveal><div className="mt-14 grid gap-16 lg:grid-cols-[.78fr_1.22fr]"><Reveal><div><h2 className="display max-w-[520px] text-6xl leading-[.82] sm:text-8xl" data-testid="text-journey-heading">Learning in public,<br /><em className="text-[hsl(var(--accent))]">building in private.</em></h2><p className="mt-8 max-w-[390px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">The throughline is simple: understand the fundamentals, then test them against the world.</p></div></Reveal><Reveal delay="delay-1"><div className="border-t border-[hsl(var(--foreground)/.25)]">{timeline.map(([date, title, copy], index) => <div key={title} className="grid gap-4 border-b border-[hsl(var(--foreground)/.25)] py-7 sm:grid-cols-[150px_1fr_24px]"><span className="mono text-[10px] text-[hsl(var(--accent))]">{date}</span><div><h3 className="text-xl font-semibold" data-testid={`text-timeline-title-${index}`}>{title}</h3><p className="mt-2 max-w-[540px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{copy}</p></div><span className="hidden text-right mono text-[10px] text-[hsl(var(--muted-foreground))] sm:block">0{index + 1}</span></div>)}</div></Reveal></div></div></section>;
}

function Credentials() {
  return <section className="bg-[hsl(var(--background))] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="section-credentials"><div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[.55fr_1.45fr] lg:items-center"><Reveal><div><span className="eyebrow">05 / proof of work</span><h2 className="display mt-6 text-5xl leading-[.85] sm:text-6xl">The details<br />behind the <em className="text-[hsl(var(--accent))]">signal.</em></h2></div></Reveal><Reveal delay="delay-1"><div className="grid gap-4 sm:grid-cols-2"><div className="border border-[hsl(var(--foreground)/.2)] p-6 transition hover:-translate-y-1 hover:border-[hsl(var(--accent))]" data-testid="card-certification-hcia-ai"><Award className="h-6 w-6 text-[hsl(var(--accent))]" strokeWidth={1.4} /><span className="eyebrow mt-10 block text-[hsl(var(--muted-foreground))]">Certification</span><h3 className="mt-3 text-xl font-semibold">HCIA-AI</h3><p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Huawei Certified ICT Associate — Artificial Intelligence.</p></div><div className="border border-[hsl(var(--foreground)/.2)] p-6 transition hover:-translate-y-1 hover:border-[hsl(var(--secondary))]" data-testid="card-certification-bci"><ShieldCheck className="h-6 w-6 text-[hsl(var(--secondary))]" strokeWidth={1.4} /><span className="eyebrow mt-10 block text-[hsl(var(--muted-foreground))]">Workshop</span><h3 className="mt-3 text-xl font-semibold">BCI healthcare control systems</h3><p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">A workshop exploring brain-computer interfaces and healthcare control systems.</p></div></div></Reveal></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get('subject') || 'Project conversation'));
    const message = encodeURIComponent(`From: ${String(data.get('name') || '')}\n\n${String(data.get('message') || '')}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${message}`;
    setSent(true);
  };
  const copyEmail = async () => {
    try { await navigator.clipboard?.writeText(email); } finally { setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
  };
  return <section id="contact" className="dark-panel px-5 py-24 sm:px-8 lg:px-12 lg:py-36" data-testid="section-contact"><div className="mx-auto max-w-[1480px]"><Reveal><div className="flex items-center justify-between"><span className="eyebrow text-[hsl(var(--secondary))]">06 / open channel</span><span className="mono text-[10px] text-[hsl(var(--background)/.43)]">RESPONSE TIME: 1–3 DAYS</span></div></Reveal><div className="mt-14 grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-28"><Reveal><div><h2 className="display text-7xl leading-[.75] text-[hsl(var(--background))] sm:text-9xl" data-testid="text-contact-heading">Have a hard<br /><em className="text-[hsl(var(--secondary))]">problem?</em></h2><p className="mt-10 max-w-[430px] text-lg leading-relaxed text-[hsl(var(--background)/.65)]">I’m interested in research conversations, thoughtful engineering teams, and projects where the system has to work beyond the demo.</p><div className="mt-10 space-y-5"><button onClick={copyEmail} className="group flex items-center gap-3 text-sm text-[hsl(var(--background))] transition hover:text-[hsl(var(--secondary))]" data-testid="button-copy-email"><Mail className="h-4 w-4 text-[hsl(var(--secondary))]" /> {copied ? 'Copied to clipboard' : email} <Copy className="ml-1 h-3.5 w-3.5 opacity-50" /></button><div className="flex flex-wrap items-center gap-5"><a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[hsl(var(--background)/.68)] hover:text-[hsl(var(--secondary))]" data-testid="link-github"><Github className="h-4 w-4" /> GitHub <ExternalLink className="h-3 w-3 opacity-50" /></a><a href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[hsl(var(--background)/.68)] hover:text-[hsl(var(--secondary))]" data-testid="link-linkedin"><Linkedin className="h-4 w-4" /> LinkedIn <ExternalLink className="h-3 w-3 opacity-50" /></a></div></div></div></Reveal><Reveal delay="delay-1"><form onSubmit={submit} className="border border-[hsl(var(--background)/.24)] bg-[hsl(var(--background)/.05)] p-6 sm:p-8" data-testid="form-contact"><div className="mb-8 flex items-center justify-between"><span className="eyebrow text-[hsl(var(--background)/.55)]">New message</span><Terminal className="h-4 w-4 text-[hsl(var(--secondary))]" /></div><label className="block"><span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/.55)]">Your name</span><input required name="name" type="text" placeholder="How should I address you?" className="mt-3 w-full border-b border-[hsl(var(--background)/.25)] bg-transparent px-0 py-3 text-sm text-[hsl(var(--background))] outline-none placeholder:text-[hsl(var(--background)/.35)] focus:border-[hsl(var(--secondary))]" data-testid="input-contact-name" /></label><label className="mt-7 block"><span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/.55)]">Subject</span><input required name="subject" type="text" placeholder="Research, role, collaboration..." className="mt-3 w-full border-b border-[hsl(var(--background)/.25)] bg-transparent px-0 py-3 text-sm text-[hsl(var(--background))] outline-none placeholder:text-[hsl(var(--background)/.35)] focus:border-[hsl(var(--secondary))]" data-testid="input-contact-subject" /></label><label className="mt-7 block"><span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/.55)]">Message</span><textarea required name="message" rows={4} placeholder="Give me the useful context..." className="mt-3 w-full resize-none border-b border-[hsl(var(--background)/.25)] bg-transparent px-0 py-3 text-sm text-[hsl(var(--background))] outline-none placeholder:text-[hsl(var(--background)/.35)] focus:border-[hsl(var(--secondary))]" data-testid="textarea-contact-message" /></label><button type="submit" className="button-sheen mt-9 flex items-center gap-3 bg-[hsl(var(--secondary))] px-5 py-3.5 text-sm font-semibold text-[hsl(var(--foreground))] transition hover:-translate-y-0.5" data-testid="button-submit-contact">{sent ? <><Check className="relative z-10 h-4 w-4" /> <span className="relative z-10">Draft opened</span></> : <><span className="relative z-10">Send message</span> <Send className="relative z-10 h-4 w-4" /></>}</button></form></Reveal></div></div></section>;
}

function Footer() {
  return <footer className="dark-panel border-t border-[hsl(var(--background)/.15)] px-5 py-7 sm:px-8 lg:px-12" data-testid="site-footer"><div className="mx-auto flex max-w-[1480px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><span className="mono text-[10px] text-[hsl(var(--background)/.45)]">© 2026 Hamdan Tariq / built from first principles</span><div className="flex items-center gap-2 mono text-[10px] text-[hsl(var(--background)/.45)]"><MapPin className="h-3 w-3 text-[hsl(var(--secondary))]" /> Quetta, Pakistan <span className="mx-2">·</span> <span className="text-[hsl(var(--secondary))]">available for a good problem</span></div></div></footer>;
}

function Home() {
  const [activeSection, setActiveSection] = useState('top');
  useEffect(() => {
    const ids = ['top', ...navItems.map((item) => item.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.35, 0.65] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <div className="portfolio-shell grain min-h-[100dvh]" data-testid="portfolio-home"><Header activeSection={activeSection} /><main><Hero /><About /><Systems /><Work /><Journey /><Credentials /><Contact /></main><Footer /></div>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;