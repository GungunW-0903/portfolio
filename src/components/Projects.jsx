import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import figmaDesign1 from '../assets/about/figma_design.png';
import figmaDesign2 from '../assets/about/dashboard_design.png';
import TiltCard from './three/TiltCard';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const ProjectCard = ({ project, onClick, station, aos = 'fade-up' }) => {
  const isFigma = project.id.startsWith('figma');

  return (
    <TiltCard
      data-aos={aos}
      onClick={onClick}
      className="bg-[#111111]/80 border border-gray-800 rounded-3xl p-6 hover:border-red-500/50 hover:shadow-[0_15px_40px_rgba(239,68,68,0.1)] transition-all duration-500 cursor-pointer group flex flex-col justify-between min-h-[360px] relative overflow-hidden backdrop-blur-md"
    >
      {/* Subtle background image preview for designs */}
      {project.image && (
        <div className="absolute inset-0 w-full h-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none z-0">
          <img 
            src={project.image} 
            alt="" 
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500" 
          />
        </div>
      )}

      <div className="relative z-10">
        {/* Project Icon / Tech Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-950/30 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform duration-300">
            {project.icon}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-gray-900">
              {project.timeline}
            </span>
            {station && (
              <span className="text-[9px] font-mono font-black text-red-500/80 uppercase tracking-[0.2em]">
                STN {String(station).padStart(2, '0')}
              </span>
            )}
          </div>
        </div>

        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-red-500 transition-colors duration-300">
          {project.name}
        </h3>

        <p className="text-gray-400 text-xs leading-relaxed line-clamp-4 font-medium">
          {project.description}
        </p>
      </div>

      <div className="relative z-10">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[9px] font-bold font-mono bg-black/50 text-red-400/80 border border-red-500/10 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[9px] font-bold font-mono bg-black/50 text-gray-500 px-2 py-0.5 rounded">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Read More HUD */}
        <div className="flex items-center text-xs text-red-500 font-bold uppercase tracking-wider gap-2 group-hover:translate-x-1 transition-transform">
          {isFigma ? 'Explore Design System' : 'Explore Architecture'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </TiltCard>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const timelineRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  // Scroll-driven railway: progress maps to the glowing track fill + train position.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const trainTop = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  const projectsData = [
    {
      id: "safeexit",
      name: "SafeExit (Women's Safety Platform)",
      timeline: "Recent Project",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "A comprehensive safety web platform designed specifically to aid and protect women during commutes, enabling real-time SOS transmissions, map navigations, and dynamic community-driven alert feeds.",
      problem: "Women often face major safety concerns during nighttime commutes. SafeExit was built to bridge the gap between emergency alerts, active location mapping, and community assistance directories to ensure help is just one click away.",
      features: [
        "One-Click SOS button that instantly alerts trusted contacts with user's live coordinates.",
        "Real-Time Location Tracking using WebSocket connections to broadcast safe transit paths.",
        "Crowdsourced Safety Route Planner highlighting route illumination and security levels.",
        "Fake Call Simulator dashboard to deter potential street threats.",
        "Helpline Directory compiling local emergency services and police stations."
      ],
      tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Google Maps API"],
      github: "https://github.com/GungunW-0903",
      architecture: `
      +------------------+
      |  React Frontend  |
      +--------+---------+
               |
        WebSocket / HTTP
               |
      +--------v---------+
      |  Node.js Server  +--------> Google Maps API
      +--------+---------+
               |
        Mongoose Schema
               |
      +--------v---------+
      |     MongoDB      |
      +------------------+
      `
    },
    {
      id: "airbnb",
      name: "Airbnb Rental Marketplace",
      timeline: "May - June 2025",
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
      id: "quickshow",
      name: "QuickShow - Movie Ticket Booking",
      timeline: "Dec 2025 - Present",
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
      github: "https://github.com/GungunW-0903",
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
      timeline: "GDSC Techsprint Hackathon",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "An AI-powered career growth platform focused on resume optimization, mock interviews, and skill assessments. Built for GDSC Techsprint, NIT Patna, ranking in the Top 10 national teams.",
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

  return (
    <section id="projects" className="bg-[#0a0a0a] pt-28 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-gray-950">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-block border border-red-500/20 rounded-full px-4 py-1.5 text-xs text-red-500 font-bold mb-4 tracking-widest uppercase bg-red-950/10">
            Showcase
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4" />
          <p className="text-gray-500 text-xs md:text-sm font-medium mt-4 tracking-wide">
            Scroll to ride the line — every station is a shipped project.
          </p>
        </div>

        {/* ---- Railway Timeline ---- */}
        <div ref={timelineRef} className="relative">

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
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-red-300 shadow-[0_0_14px_rgba(252,165,165,1)] animate-pulse" />
                  {/* Side buffers */}
                  <div className="absolute -left-1.5 top-2.5 w-1 h-6 rounded bg-[#1c1c1c] border border-gray-800" />
                  <div className="absolute -right-1.5 top-2.5 w-1 h-6 rounded bg-[#1c1c1c] border border-gray-800" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Station rows */}
          <div className="space-y-14 md:space-y-24 py-4">
            {projectsData.map((project, idx) => {
              const onLeft = idx % 2 === 0;
              return (
                <div key={idx} className="relative md:grid md:grid-cols-2 md:gap-20 md:items-center">

                  {/* Station node on the track */}
                  <motion.div
                    initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="absolute left-5 md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-7 h-7 rounded-full border border-red-500/40 animate-ping opacity-30" />
                      <span className="w-5 h-5 rounded-full bg-[#0a0a0a] border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)] flex items-center justify-center">
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
            <span className="ml-10 md:ml-0 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-600">
              — End of Line · More Shipping Soon —
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Detail Modal / Architecture HUD */}
      {selectedProject && (
        <div className="fixed inset-0 w-full h-full bg-black/80 z-[100000] flex justify-center items-center p-4 backdrop-blur-md transition-opacity duration-300">
          <div 
            data-aos="zoom-in"
            className="bg-[#111111] border border-gray-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative scrollbar-thin shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header info */}
            <div className="flex items-center gap-3 text-red-500 font-bold uppercase text-[10px] tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              {selectedProject.id.startsWith('figma') ? 'UI/UX Visual Explorer' : 'Architecture Explorer'}
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
            <div className="mb-6 border-l-2 border-red-600 pl-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2 text-red-500/95">
                {selectedProject.id.startsWith('figma') ? 'Design Challenge & Rationale' : 'Why was this built?'}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                {selectedProject.problem}
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
                {selectedProject.id.startsWith('figma') ? 'Key Design Details' : 'Key Features Included'}
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
            <div className="mb-8 bg-black/60 border border-gray-800 rounded-2xl p-4 font-mono text-[10px] md:text-xs text-red-400 overflow-x-auto">
              <div className="text-gray-500 mb-2 select-none uppercase font-bold tracking-widest text-[9px]">
                {selectedProject.id.startsWith('figma') ? 'Design Process System' : 'System Diagram Flow'}
              </div>
              <pre className="leading-snug">{selectedProject.architecture}</pre>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center gap-4 border-t border-gray-800 pt-6">
              <a 
                href={selectedProject.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition-all flex items-center gap-2 cursor-pointer"
              >
                {selectedProject.id.startsWith('figma') ? (
                  <svg className="w-4 h-4" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 19C19 13.5 14.5 9 9 9C3.5 9 0 13.5 0 19C0 24.5 3.5 29 9 29C14.5 29 19 24.5 19 19Z" fill="#F24E1E" />
                    <path d="M9 9C14.5 9 19 4.5 19 0H9C3.5 0 0 4.5 0 9" fill="#FF7262" />
                    <path d="M19 0H29C34.5 0 38 4.5 38 9C38 13.5 34.5 18 29 18H19V0Z" fill="#A259FF" />
                    <path d="M19 19H29C34.5 19 38 23.5 38 29C38 34.5 34.5 38 29 38C23.5 38 19 34.5 19 29V19Z" fill="#1ABCFE" />
                    <path d="M9 19C9 24.5 13.5 29 19 29V19H9Z" fill="#0ACF83" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                  </svg>
                )}
                {selectedProject.id.startsWith('figma') ? 'Open Figma Design' : 'View Repository'}
              </a>
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full bg-transparent border border-gray-600 text-gray-400 font-bold text-xs hover:bg-white/5 hover:text-white transition-all cursor-pointer"
              >
                Close Explorer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
