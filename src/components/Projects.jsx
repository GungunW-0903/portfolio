import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import safeExitImg from '../assets/projects/safeexit.jpg';
import cineSnapImg from '../assets/projects/cinesnap.jpg';
import airbnbImg from '../assets/projects/airbnb.jpg';
import velocityImg from '../assets/projects/velocity.jpg';
import figmaDesign1 from '../assets/about/figma_design.png';
import figmaDesign2 from '../assets/about/dashboard_design.png';
import TiltCard from './three/TiltCard';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { playBlip } from '../utils/audio';

const ProjectCard = ({ project, onClick, station, aos = 'fade-up' }) => {
  const isFigma = project.id.startsWith('figma');

  return (
    <TiltCard
      data-aos={aos}
      onClick={() => { playBlip(800, 0.03); onClick(); }}
      className="neu-card border border-white/5 rounded-3xl p-5 md:p-6 hover:border-red-500/50 hover:shadow-[0_22px_55px_rgba(239,68,68,0.18)] transition-all duration-500 cursor-pointer group flex flex-col justify-between min-h-[470px] relative overflow-hidden backdrop-blur-md"
    >
      {/* Visual UI Preview Frame */}
      {project.image && (
        <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 border border-white/10 bg-[#080808] shadow-inner group/img">
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105" 
          />
          {/* Subtle gradient vignette to blend with card surface */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-black/35 pointer-events-none" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            {station && (
              <span className="text-[10px] font-mono font-black text-red-400 uppercase tracking-widest bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-red-500/30 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
                STN {String(station).padStart(2, '0')}
              </span>
            )}
            <span className="text-[9px] font-mono font-bold text-gray-300 uppercase tracking-wider bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
              {project.categoryLabel}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="text-[10px] font-mono text-gray-300 font-semibold uppercase tracking-wider bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
              {project.timeline}
            </span>
          </div>

          {/* Hover inspect hint */}
          <div className="absolute bottom-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center gap-1 text-[10px] font-mono font-bold text-red-400 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-red-500/40 shadow-lg">
            <span>Explore Architecture</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          {/* Title and Icon row */}
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:border-red-500/50 transition-all duration-300 shrink-0">
              {project.icon}
            </div>
            <h3 className="text-white text-lg md:text-xl font-bold group-hover:text-red-400 transition-colors duration-300 line-clamp-1">
              {project.name}
            </h3>
          </div>

          <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3 font-medium mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span key={idx} className="text-[9px] font-bold font-mono bg-black/50 text-red-400/90 border border-red-500/15 px-2.5 py-1 rounded-md">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[9px] font-bold font-mono bg-black/50 text-gray-500 px-2 py-1 rounded-md">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5">
            <div className="flex items-center text-xs text-red-500 font-bold uppercase tracking-wider gap-1.5 group-hover:translate-x-1 transition-transform">
              {isFigma ? 'Design System' : 'Architecture'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { e.stopPropagation(); playBlip(850, 0.04); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-[10px] font-bold tracking-wider transition-all shadow-[0_2px_10px_rgba(239,68,68,0.3)] hover:scale-105 z-20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                  Live App
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {project.github && !project.live && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { e.stopPropagation(); playBlip(850, 0.04); }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-mono text-[10px] font-semibold transition-all"
                >
                  {isFigma ? 'Figma File' : 'Repo'}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const timelineRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  // Scroll-driven railway: progress maps to the glowing track fill + train position.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const trainTop = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const projectsData = [
    {
      id: "safeexit",
      name: "SafeExit - Hostel Outing Management",
      category: "production",
      categoryLabel: "Production ERP Module",
      timeline: "Recent Production Build",
      image: safeExitImg,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6.5-5.5L16 8m-8 2.5L5.5 8M12 14a2 2 0 100-4 2 2 0 000 4zm0 0v7m-7-3h14a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v11a1 1 0 001 1z" />
        </svg>
      ),
      description: "A full-stack hostel outing and complaint management system with role-based dashboards for students, wardens, and security guards — QR-verified exits, approval workflows, and complaint tracking.",
      problem: "Hostel outing registers are manual, slow, and easy to fake. SafeExit digitizes the entire workflow: students request outings, wardens approve or reject them, and security guards verify students at the gate by scanning a unique QR code — updating exit/return status in real time.",
      features: [
        "Role-Based Dashboards: Separate portals for students, wardens, and security guards with role-based access control.",
        "Secure Auth: JWT authentication with bcrypt password hashing.",
        "Outing Workflow: Students submit requests, wardens approve/reject, approved requests generate unique QR codes.",
        "QR Gate Verification: Guards scan QR codes to verify students and update exit/return status in real time.",
        "Complaint Module: Students raise hostel issues directly from their dashboard and track resolution status."
      ],
      tags: ["Next.js", "React", "Node.js", "Express", "MongoDB", "JWT", "QR Code"],
      github: "https://github.com/Mohnish27-dev/SafeExit",
      architecture: `
      +---------------------+
      |  Next.js Frontend   |
      | (Student/Warden/    |
      |  Guard dashboards)  |
      +--------+------------+
               |
         JWT-secured REST
               |
      +--------v------------+
      |  Express API Server +----> QR Generate/Scan
      +--------+------------+
               |
        Mongoose Models
        (users, outings,
         complaints)
               |
      +--------v------------+
      |      MongoDB        |
      +---------------------+
      `
    },
    {
      id: "airbnb",
      name: "Airbnb Rental Marketplace",
      category: "fullstack",
      categoryLabel: "MERN Architecture",
      timeline: "May - June 2025",
      image: airbnbImg,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      description: "A full-featured Airbnb-inspired property rental and booking dashboard. Designed to provide dynamic property listings creation, visual calendars, filtering by category, and detailed host reservation tracking.",
      problem: "Building a rental platform from scratch requires managing state synchronization, complex search inputs, and dynamic dates listings. The goal was to build a MERN solution with modern listings, search queries, and reservation models.",
      features: [
        "Property Management: Allow hosts to easily upload, edit, and delete detailed property listings.",
        "Interactive Date Selection: Custom calendar checking for unavailable slot ranges.",
        "Dynamic Filtering: Properties filtered by room counts, location indexes, price margins, and amenities.",
        "Admin Dashboard: Built-in host panel to review reservations, user approvals, and listing metrics."
      ],
      tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/GungunW-0903/Airbnb_project.git",
      architecture: `
      +---------------------------------+
      |        React Web Client         |
      +----------------+----------------+
                       |
               Axios REST calls
                       |
      +----------------v----------------+
      |  Express REST API Server (Node) |
      +----------------+----------------+
                       |
             MongoDB MERN Database
                       |
      +----------------v----------------+
      |       MongoDB Collections       |
      +---------------------------------+
      `
    },
    {
      id: "cinesnap",
      name: "CineSnap - Movie Ticket Booking",
      category: "fullstack",
      categoryLabel: "Real-Time Concurrency",
      timeline: "Dec 2025 - Present",
      image: cineSnapImg,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      ),
      description: "A premium movie ticketing platform with real-time seat selections, custom showtime configurations, and role-based permissions dashboard managed secure via CLERK.",
      problem: "Ticketing platforms face race conditions when multiple users book the same seats. QuickShow resolves this with real-time seat lock state mechanisms and provides role-based dashboard tools for theaters and customers.",
      features: [
        "Real-Time Seat Reservation: Visually choose seats in a grid, featuring real-time booking locks.",
        "Clerk Authentication: Integrated secure customer logins and administrative dashboard roles.",
        "Movie & Showtimes: Interactive movie search engine with nested showtime calendars.",
        "Tailwind Adaptive Design: Fully responsive grids with smooth transitions for mobile ticketing."
      ],
      tags: ["React", "Tailwind CSS", "Clerk Auth", "REST API", "State Lockers"],
      github: "https://github.com/GungunW-0903/CineSnap",
      live: "https://gungunw-0903.github.io/CineSnap/",
      architecture: `
      +-------------------------+      +-------------------+
      |     React UI Client     +------>    Clerk Auth     |
      +------------+------------+      +-------------------+
                   |
            REST API requests
                   |
      +------------v------------+
      |   Backend API Router    |
      +------------+------------+
                   |
            Database Controller
                   |
      +------------v------------+
      |      QuickShow DB       |
      +-------------------------+
      `
    },
    {
      id: "velocity",
      name: "Velocity - Career Growth Platform",
      category: "ai",
      categoryLabel: "GDSC Hackathon Top 10",
      timeline: "GDSC Techsprint Hackathon",
      image: velocityImg,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "An AI-powered career growth platform focused on resume optimization, mock interviews, and skill assessments. Built for GDSC Techsprint, ranking in the Top 10 national teams.",
      problem: "Recruitment preparation is fragmented. Velocity was created to combine AI-based resume audit tools, simulated mock interviews, and corporate fellowship challenges into one comprehensive student dashboard.",
      features: [
        "AI Resume Optimizer: Real-time candidate resume enhancement suggestions using AI models.",
        "AI Mock Interview: Dynamic custom interview questions simulated with AI scoring algorithms.",
        "Fellowship & Challenges: Corporate tasks module letting candidates compete for incentives.",
        "Job Tracker: Kanban dashboard tracking active application stages and interview rounds."
      ],
      tags: ["React", "JavaScript", "Firebase Services", "AI Integration"],
      github: "https://github.com/Mohnish27-dev/Velocity.git",
      architecture: `
      +-----------------------+
      |     React Frontend    |
      +-----------+-----------+
                  |
             Firebase SDK
                  |
      +-----------v-----------+
      |   Firebase Services   +-------> Gemini/OpenAI API
      +-----------+-----------+
                  |
            Firestore DB
                  |
      +-----------v-----------+
      |      Firestore DB     |
      +-----------------------+
      `
    },
    {
      id: "figma-design-1",
      name: "3D Neon Brand Identity Asset",
      category: "design",
      categoryLabel: "Figma 3D Vector",
      timeline: "Figma Design",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: "Designed a 3D glassmorphic brand asset using Figma's vector networks and multi-layered glow shadows. Formulated custom lighting angles and material properties to create a sleek neon sign effect.",
      problem: "Creating high-fidelity 3D-like visuals inside a 2D interface like Figma requires careful shadow stacking, specular lighting overlays, and vector paths layering.",
      features: [
        "Vector Networks: Designed clean bezier geometries for a seamless continuous flow.",
        "Neon Stacking: Layered 4 separate drop shadows with varying blur levels and opacity.",
        "Glassmorphism Backdrop: Configured realistic refraction using overlay blur filters.",
        "Brand Assetization: Clean component structure ready for quick export."
      ],
      tags: ["Figma", "Vector Networks", "Brand Identity", "Visual Design"],
      image: figmaDesign1,
      github: "https://www.figma.com/design/Tr1gsFCHio8GrJW3TWmukF/Untitled?node-id=0-1&t=Zi80rDR4PiB971Qq-1",
      architecture: `
      +-----------------------------------------+
      |  Figma Vector Geometry Mapping          |
      +-------------------+---------------------+
                          |
             Layer & Blend Mode Configuration
                          |
      +-------------------v---------------------+
      |  Stacked Neon Drop Shadow Layering      |
      +-------------------+---------------------+
                          |
             Backdrop Blur & Specular Lighting
                          |
      +-------------------v---------------------+
      |  Glassmorphic 3D Brand Logo Asset       |
      +-----------------------------------------+
      `
    },
    {
      id: "figma-design-2",
      name: "Obsidian Web App Dashboard",
      category: "design",
      categoryLabel: "SaaS Design System",
      timeline: "Figma Concept",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      ),
      description: "Designed a clean, glassmorphic analytics dashboard. Organized dark mode cards, data tables, and glowing charts with high visual hierarchy, ensuring simple user flows and modern SaaS aesthetics.",
      problem: "Designing dashboards requires balancing complex analytics data layouts with a high-end interface style, ensuring widgets have clear spacing and charts are readable.",
      features: [
        "Visual Hierarchy: Organized key metric widgets at the top with chart modules underneath.",
        "Color Harmony: Combined dark obsidian base (#030303) with glowing ruby accents.",
        "Interactive States: Designed hover states for cards, sidebar items, and button nodes.",
        "Grid Structure: Created a structured grid layout ensuring responsive scaling guides."
      ],
      tags: ["Figma", "SaaS Dashboard", "Wireframing", "UI Design"],
      image: figmaDesign2,
      github: "https://www.figma.com/design/18r3imEH6LQqG3yHUADzl3/Untitled?node-id=0-1&t=Zi80rDR4PiB971Qq-1",
      architecture: `
      +-----------------------------------------+
      |  Wireframe & Information Grid Layout    |
      +-------------------+---------------------+
                          |
             Typography & Icon System Mapping
                          |
      +-------------------v---------------------+
      |  Color Theme & Obsidian Material Styling|
      +-------------------+---------------------+
                          |
             Chart Component & Widget Layouts
                          |
      +-------------------v---------------------+
      |  High-Fidelity Dashboard Prototype      |
      +-----------------------------------------+
      `
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Projects', count: projectsData.length },
    { id: 'production', label: 'Production ERP', count: 1 },
    { id: 'fullstack', label: 'Full-Stack MERN', count: 2 },
    { id: 'ai', label: 'AI & Hackathon', count: 1 },
    { id: 'design', label: 'UI/UX & Figma', count: 2 }
  ];

  const filteredProjects = filterCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filterCategory);

  const handleFilter = (id) => {
    playBlip(750, 0.03);
    setFilterCategory(id);
  };

  return (
    <section id="projects" className="pt-28 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-red-950/40 bg-[linear-gradient(200deg,#0b040c_0%,#0c0c0c_30%,#130507_65%,#110924_100%)]">

      {/* Ambient glows along the rail line */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-[400px] h-[400px] rounded-full bg-violet-800/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[350px] h-[350px] rounded-full bg-red-800/10 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div data-aos="fade-up" className="text-center mb-12">
          <div className="inline-block border border-red-500/20 rounded-full px-4 py-1.5 text-xs text-red-500 font-bold mb-4 tracking-widest uppercase bg-red-950/10">
            Showcase
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Featured Engineering Projects
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 mb-3" />
          <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wide max-w-xl mx-auto">
            Scroll to ride the locomotive line — each stop is a tested, production-grade system or design milestone.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterOptions.map((opt) => {
              const isActive = filterCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleFilter(opt.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                      : 'bg-black/50 hover:bg-black/80 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/40 text-white' : 'bg-white/5 text-gray-500'}`}>
                    {opt.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Railway Timeline ---- */}
        <div ref={timelineRef} className="relative mt-8">

          {/* Track base: two rails + sleepers */}
          <div
            aria-hidden="true"
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 border-x-2 border-gray-800/80"
            style={{
              background:
                'repeating-linear-gradient(to bottom, transparent 0px, transparent 10px, rgba(64,64,64,0.5) 10px, rgba(64,64,64,0.5) 14px)',
            }}
          />

          {/* Glowing progress fill (electrified track behind the train) */}
          <motion.div
            aria-hidden="true"
            style={{ height: reducedMotion ? '100%' : trainTop }}
            className="absolute left-5 md:left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-red-600 via-red-500 to-red-400 shadow-[0_0_18px_rgba(239,68,68,0.8)]"
          />

          {/* The train — rides the track with scroll */}
          {!reducedMotion && (
            <motion.div
              aria-hidden="true"
              style={{ top: trainTop }}
              className="absolute left-5 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            >
              <div className="relative flex flex-col items-center">
                {/* Headlight beam sweeping ahead */}
                <div
                  className="absolute top-9 w-10 h-16 bg-gradient-to-b from-red-500/35 to-transparent"
                  style={{ clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)' }}
                />
                {/* Locomotive body (front view) */}
                <div className="relative w-9 h-11 rounded-xl bg-gradient-to-b from-[#2b2b2b] to-[#0d0d0d] border border-red-500/50 shadow-[0_0_28px_rgba(239,68,68,0.55)] flex flex-col items-center pt-1.5">
                  {/* Windshield */}
                  <div className="w-6 h-3 rounded-sm bg-gradient-to-b from-red-500/70 to-red-900/40 border border-red-400/40" />
                  {/* Headlight */}
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-red-300 shadow-[0_0_10px_rgba(252,165,165,0.9)]" />
                  {/* Side buffers */}
                  <div className="absolute -left-1.5 top-2.5 w-1 h-6 rounded bg-[#1c1c1c] border border-gray-800" />
                  <div className="absolute -right-1.5 top-2.5 w-1 h-6 rounded bg-[#1c1c1c] border border-gray-800" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Station rows */}
          <div className="space-y-14 md:space-y-24 py-4">
            {filteredProjects.map((project, idx) => {
              const onLeft = idx % 2 === 0;
              return (
                <div key={project.id} className="relative md:grid md:grid-cols-2 md:gap-20 md:items-center">

                  {/* Station node on the track */}
                  <motion.div
                    initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="absolute left-5 md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="w-5 h-5 rounded-full bg-[#0a0a0a] border-2 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      </span>
                    </div>
                  </motion.div>

                  {/* Platform connector from track to card */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-10 md:top-1/2 h-px bg-gradient-to-r from-red-500/60 to-transparent left-7 w-7 md:w-14 ${
                      onLeft
                        ? 'md:left-auto md:right-1/2 md:mr-2.5 md:bg-gradient-to-l'
                        : 'md:left-1/2 md:ml-2.5'
                    }`}
                  />

                  {/* Project card (alternates sides on desktop) */}
                  <div className={`pl-12 md:pl-0 ${onLeft ? 'md:pr-4' : 'md:col-start-2 md:pl-4'}`}>
                    <ProjectCard
                      project={project}
                      station={idx + 1}
                      aos={onLeft ? 'fade-right' : 'fade-left'}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminus marker */}
          <div className="relative flex justify-center mt-10 md:mt-14">
            <div className="absolute left-5 md:left-1/2 -translate-x-1/2 -top-4 w-6 h-1.5 rounded-full bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
            <span className="ml-10 md:ml-0 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500">
              — End of Railway Line · More Shipping Soon —
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Detail Modal / Architecture HUD */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 w-full h-full bg-black/85 z-[100000] flex justify-center items-center p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f0f0f] border border-red-500/30 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative scrollbar-thin shadow-[0_25px_70px_rgba(239,68,68,0.25)] text-left"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 cursor-pointer"
                title="Close (Esc)"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header info */}
              <div className="flex items-center gap-3 text-red-500 font-bold uppercase text-[10px] tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                {selectedProject.id.startsWith('figma') ? 'UI/UX Visual Design Deep Dive' : 'System Architecture & Engineering Explorer'}
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 pr-8">
                {selectedProject.name}
              </h3>

              {/* Design Mockup Image */}
              {selectedProject.image && (
                <div className="mb-6 rounded-2xl overflow-hidden border border-gray-800 aspect-video bg-black/40 shadow-inner max-w-full">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Problem Statement */}
              <div className="mb-6 border-l-2 border-red-600 pl-4 bg-red-950/15 p-3 rounded-r-xl">
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2 text-red-400">
                  {selectedProject.id.startsWith('figma') ? 'Design Challenge & Rationale' : 'Core Problem Solved'}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {selectedProject.problem}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
                  {selectedProject.id.startsWith('figma') ? 'Key Design Details' : 'Key Engineering Highlights'}
                </h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-medium leading-relaxed">
                      <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Flow Diagram */}
              <div className="mb-8 bg-black/80 border border-gray-800 rounded-2xl p-4 font-mono text-[10px] md:text-xs text-red-400 overflow-x-auto shadow-inner">
                <div className="text-gray-500 mb-2 select-none uppercase font-bold tracking-widest text-[9px]">
                  {selectedProject.id.startsWith('figma') ? 'Design Process System' : 'System Diagram Flow'}
                </div>
                <pre className="leading-snug">{selectedProject.architecture}</pre>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center gap-4 border-t border-gray-800 pt-6">
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playBlip(880, 0.04)}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs hover:from-red-500 hover:to-rose-500 transition-all flex items-center gap-2 cursor-pointer shadow-[0_4px_18px_rgba(239,68,68,0.4)] hover:scale-105"
                  >
                    <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                    Visit Live Application
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => playBlip(800, 0.04)}
                  className="px-5 py-2.5 rounded-full bg-black/80 border border-gray-700 text-white font-bold text-xs hover:border-red-500 hover:text-red-400 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {selectedProject.id.startsWith('figma') ? 'Open Figma Design' : 'View Repository'}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-full bg-transparent border border-gray-600 text-gray-400 font-bold text-xs hover:bg-white/5 hover:text-white transition-all cursor-pointer ml-auto"
                >
                  Close Explorer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
