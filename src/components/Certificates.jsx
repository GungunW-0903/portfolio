import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';
import TiltCard from './three/TiltCard';
import weForSheImg from '../assets/certificates/we_for_she_myntra.jpg';
import hackanovateImg from '../assets/certificates/hackanovate_7.jpg';
import gCloudImg from '../assets/certificates/google_cloud_study_jams.png';
import { playBlip } from '../utils/audio';

const certificatesData = [
  {
    id: "nptel-social-networks",
    title: "Social Networks — Top 5% National Topper",
    issuer: "NPTEL • IIT Ropar / IIT Madras",
    category: "academic",
    date: "Elite + Silver Medal",
    badge: "🏆 Top 5% National Topper",
    isTopHonor: true,
    accent: "gold",
    image: null,
    description: "Ranked in the Top 5% nationally across India in the 12-week NPTEL Computer Science examination on Social Networks. Mastered graph algorithms, network centrality, community detection, diffusion dynamics, and spectral clustering.",
    tags: ["Graph Algorithms", "Network Theory", "Top 5% India", "NPTEL Elite"],
    credentialUrl: null,
    pdfUrl: null
  },
  {
    id: "we-for-she",
    title: "WeForShe Hacker-ramp 2026",
    issuer: "Myntra / SheCommerce",
    category: "hackathons",
    date: "Sep 2026",
    badge: "National Hackathon",
    isTopHonor: false,
    accent: "crimson",
    image: weForSheImg,
    description: "Attempted and qualified the Online Assessment Round of WeForShe Hacker-ramp 2026 with Team CodedMuse, architecting innovative solutions to transform the future of fashion-tech.",
    tags: ["Online Assessment", "Fashion Tech", "Problem Solving", "Myntra"],
    credentialUrl: null,
    pdfUrl: null
  },
  {
    id: "hackanovate-7",
    title: "Hackanovate 7.0 (Certificate of Appreciation)",
    issuer: "ABESIT Group of Institutions",
    category: "hackathons",
    date: "April 2026",
    badge: "30-Hr Hybrid Hackathon",
    isTopHonor: false,
    accent: "crimson",
    image: hackanovateImg,
    description: "Competed in the 30-Hour International Hybrid Online Hackathon with Team TechChaos, developing functional prototypes, clean API integrations, and pitching under tight sprint deadlines.",
    tags: ["30-Hr Hackathon", "Team TechChaos", "Hybrid", "Prototype"],
    credentialUrl: null,
    pdfUrl: null
  },
  {
    id: "gcloud-study-jams",
    title: "Google Cloud Study Jams Campaign 2025",
    issuer: "Google Cloud Community India",
    category: "cloud",
    date: "Oct 2025",
    badge: "Cloud & GenAI Track",
    isTopHonor: false,
    accent: "cyan",
    image: gCloudImg,
    description: "Completed intensive practical pathways in Cloud Infrastructure, Generative AI Model Orchestration, and Modern Application Deployment on Google Cloud.",
    tags: ["Google Cloud", "Generative AI", "Cloud Architecture", "Hands-on Labs"],
    credentialUrl: "https://www.credly.com/users/gungun-wadhwani",
    pdfUrl: null
  },
  {
    id: "iit-delhi-lor",
    title: "Formal Letter of Recommendation (LOR)",
    issuer: "Entrepreneurship Development Cell (eDC), IIT Delhi",
    category: "leadership",
    date: "Dec 2025 - Feb 2026",
    badge: "Official LOR",
    isTopHonor: false,
    accent: "violet",
    image: null,
    description: "Awarded by Tanmay Sharma (Overall Coordinator, eDC IIT Delhi) commending outstanding communication, public relations, and ranking amongst the best Campus Ambassadors during BECon '26.",
    tags: ["Official LOR", "eDC IIT Delhi", "Ranked Best CA", "Public Relations"],
    credentialUrl: null,
    pdfUrl: `${import.meta.env.BASE_URL}certificates/iit_delhi_lor.pdf`
  },
  {
    id: "iit-delhi-ca",
    title: "BECon '26 Campus Ambassador Certificate",
    issuer: "eDC IIT Delhi",
    category: "leadership",
    date: "Dec 2025 - Feb 2026",
    badge: "Leadership Award",
    isTopHonor: false,
    accent: "violet",
    image: null,
    description: "Recognized for remarkable dedication, student leadership, and high impact during BECon '26, the Annual Business & Entrepreneurship Conclave of IIT Delhi.",
    tags: ["Campus Ambassador", "IIT Delhi", "Event Leadership", "Student Outreach"],
    credentialUrl: null,
    pdfUrl: `${import.meta.env.BASE_URL}certificates/iit_delhi_campus_ambassador.pdf`
  },
  {
    id: "adobe-hackathon",
    title: "Adobe Hackathon Participation",
    issuer: "Adobe",
    category: "hackathons",
    date: "Collegiate Hackathon",
    badge: "100% Attendance Honoree",
    isTopHonor: false,
    accent: "crimson",
    image: null,
    description: "Recognized for 100% attendance, active technical problem solving, and end-to-end team engagement across all milestone phases in Adobe's collegiate hackathon initiative.",
    tags: ["100% Attendance", "Adobe", "Technical Collaboration", "Product Thinking"],
    credentialUrl: null,
    pdfUrl: null
  },
  {
    id: "nptel-python",
    title: "The Joy of Computing Using Python",
    issuer: "NPTEL • IIT Madras",
    category: "academic",
    date: "Elite Coursework",
    badge: "NPTEL IIT Madras",
    isTopHonor: false,
    accent: "gold",
    image: null,
    description: "Comprehensive 12-week computer science certification covering algorithmic thinking, recursion, mathematical simulations, and Python system programming.",
    tags: ["Python", "Algorithms", "IIT Madras", "Elite"],
    credentialUrl: null,
    pdfUrl: null
  }
];

const categories = [
  { id: 'all', label: 'All Credentials', count: 8 },
  { id: 'academic', label: 'Academic & NPTEL (Top 5%)', count: 2 },
  { id: 'hackathons', label: 'Hackathons', count: 3 },
  { id: 'cloud', label: 'Cloud & GenAI', count: 1 },
  { id: 'leadership', label: 'Leadership & LOR', count: 2 }
];

const Certificates = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeModal, setActiveModal] = useState(null);

  const filteredCertificates = activeTab === 'all' 
    ? certificatesData 
    : certificatesData.filter(item => item.category === activeTab);

  const handleTabChange = (id) => {
    playBlip(750, 0.03);
    setActiveTab(id);
  };

  const openModal = (item) => {
    playBlip(880, 0.04);
    setActiveModal(item);
  };

  return (
    <section id="certificates" className="pt-28 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-red-950/40 bg-[linear-gradient(195deg,#0c0409_0%,#110515_40%,#09030b_100%)]">
      
      {/* Dynamic Animated Ambient Background Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[150px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-violet-700/14 blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[350px] h-[350px] rounded-full bg-amber-500/8 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-red-500/30 rounded-full px-4 py-1.5 text-xs text-red-500 font-bold mb-4 tracking-widest uppercase bg-red-950/20 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.15)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            Verified Honors & Milestones
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Certifications & Badges
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-violet-600 mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-gray-400 text-xs md:text-sm max-w-2xl mx-auto font-medium leading-relaxed">
            Proven engineering credentials across national hackathons, Top 5% NPTEL IIT honors, Google Cloud programs, and IIT Delhi leadership.
          </p>
        </div>

        {/* Credly Profile VIP Banner */}
        <div 
          data-aos="fade-up"
          className="neu-card relative overflow-hidden border border-red-500/20 rounded-3xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-red-500/50 transition-all duration-500 group shadow-[0_15px_40px_rgba(239,68,68,0.08)]"
        >
          {/* Shimmer gleam line on hover */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />

          <div className="flex items-center gap-5 relative z-10">
            <div className="neu-raised relative w-16 h-16 rounded-2xl flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_25px_rgba(239,68,68,0.25)] group-hover:scale-105 transition-transform duration-300">
              <span className="absolute inset-0 rounded-2xl bg-red-500/20 blur-md opacity-80 group-hover:opacity-100 transition-opacity" />
              <svg className="w-8 h-8 fill-current relative z-10" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-white text-base md:text-lg font-bold tracking-wide group-hover:text-red-400 transition-colors">
                  Credly Digital Credential Badges
                </h3>
                <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/40 px-2.5 py-0.5 rounded-full border border-red-500/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  Global Registry
                </span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm font-medium mt-1.5 leading-relaxed max-w-xl">
                Explore official tamper-proof digital badges verifying competencies in Cloud Engineering, Generative AI models, and computational foundations.
              </p>
            </div>
          </div>
          
          <a
            href="https://www.credly.com/users/gungun-wadhwani"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playBlip(880, 0.04)}
            className="neu-raised relative z-10 px-7 py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 border border-red-500/40 hover:border-red-500 hover:text-red-300 transition-all shadow-[0_4px_20px_rgba(239,68,68,0.3)] shrink-0 cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <span>Open Credly Registry</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Category Filter Pills */}
        <div data-aos="fade-up" className="flex items-center justify-center flex-wrap gap-2 md:gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive 
                    ? 'text-white shadow-[0_4px_20px_rgba(239,68,68,0.35)]' 
                    : 'text-gray-400 hover:text-white bg-black/40 border border-white/5 hover:border-white/20'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="certTabHighlight"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-rose-600 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-black/40 text-white' : 'bg-white/5 text-gray-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated Certificates Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCertificates.map((item, idx) => {
              const isGold = item.accent === 'gold';
              const isTop = item.isTopHonor;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="h-full"
                >
                  <TiltCard
                    className={`h-full relative rounded-3xl p-[1.5px] overflow-hidden group transition-all duration-500 hover:-translate-y-2 ${
                      isTop ? 'shadow-[0_0_35px_rgba(245,158,11,0.25)] animate-gold-pulse' : 'hover:shadow-[0_20px_45px_rgba(239,68,68,0.15)]'
                    }`}
                  >
                    {/* Rotating Cyber Laser Border on Hover */}
                    <div className={`absolute inset-[-40%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_5s_linear_infinite] pointer-events-none ${
                      isGold 
                        ? 'bg-[conic-gradient(from_0deg,transparent_0deg,rgba(245,158,11,0.9)_60deg,transparent_140deg)]'
                        : 'bg-[conic-gradient(from_0deg,transparent_0deg,rgba(239,68,68,0.9)_60deg,transparent_140deg)]'
                    }`} />

                    <SpotlightCard
                      className={`relative h-full rounded-3xl p-5 flex flex-col justify-between transition-all duration-500 [transform-style:preserve-3d] ${
                        isGold ? 'neu-gold-card border border-amber-500/30' : 'neu-card border border-white/5'
                      }`}
                    >
                      {/* Holographic Sheen on hover across entire card */}
                      <div className="absolute inset-0 holographic-sheen pointer-events-none z-20" />

                      <div>
                        {/* Visual Image / Holographic Crest Plate */}
                        <div 
                          onClick={() => (item.image || item.pdfUrl) && openModal(item)}
                          className={`relative w-full h-44 rounded-2xl overflow-hidden mb-5 border flex items-center justify-center group/plate ${
                            isGold ? 'border-amber-500/25 bg-[#0e0a03]' : 'border-white/5 bg-[#090909]'
                          } ${(item.image || item.pdfUrl) ? 'cursor-pointer' : ''}`}
                        >
                          {/* High-Tech Laser Scan Line sweeps down on card hover */}
                          <div className={isGold ? "laser-scanner-gold" : "laser-scanner-crimson"} />

                          {item.image ? (
                            <>
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                              {/* Hover Enlarge Callout */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-15">
                                <span className="px-3.5 py-1.5 rounded-full bg-red-600/95 text-white font-mono text-[10px] font-bold tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  Inspect High-Res
                                </span>
                              </div>
                            </>
                          ) : (
                            /* Holographic Crest Plate for Non-Image Certificates */
                            <div className={`w-full h-full p-5 flex flex-col justify-between relative overflow-hidden ${
                              isGold 
                                ? 'bg-gradient-to-br from-amber-950/40 via-black to-yellow-950/30' 
                                : 'bg-gradient-to-br from-red-950/25 via-black to-violet-950/30'
                            }`}>
                              <div className="flex justify-between items-start relative z-10">
                                <div className={`relative w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                                  isGold ? 'neu-gold-raised text-amber-400' : 'neu-raised text-red-500'
                                }`}>
                                  {isTop ? (
                                    <svg className="w-6 h-6 fill-current animate-bounce" style={{ animationDuration: '2.5s' }} viewBox="0 0 24 24">
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                  ) : item.pdfUrl ? (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                    </svg>
                                  ) : (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                                    </svg>
                                  )}
                                </div>

                                <span className={`text-[9px] font-mono font-black tracking-widest uppercase px-3 py-1 rounded-full border shadow-sm ${
                                  isGold 
                                    ? 'bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]' 
                                    : 'bg-red-950/40 text-red-400 border-red-500/30'
                                }`}>
                                  {item.badge}
                                </span>
                              </div>

                              <div className="relative z-10">
                                <div className={`text-[10px] font-mono uppercase tracking-widest ${
                                  isGold ? 'text-amber-400/90 font-bold' : 'text-gray-400'
                                }`}>
                                  {item.issuer}
                                </div>
                                <div className="text-white font-black text-sm line-clamp-2 mt-1 tracking-tight">
                                  {item.title}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Verification Watermark */}
                          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-gray-300 shadow-sm">
                            <span className={`w-1.5 h-1.5 rounded-full ${isGold ? 'bg-amber-400' : 'bg-red-500'} animate-ping`} />
                            <span className="font-bold tracking-wider">{isTop ? 'TOP 5% GOLD' : 'AUTHENTICATED'}</span>
                          </div>

                          {item.image && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="text-[9px] font-mono font-bold tracking-widest text-red-400 bg-black/85 px-3 py-1 rounded-full border border-red-500/40 backdrop-blur-md shadow-md">
                                {item.badge}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Metadata Row */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
                          <span className="truncate max-w-[180px]">{item.issuer}</span>
                          <span className={isGold ? 'text-amber-400 font-bold' : ''}>{item.date}</span>
                        </div>

                        <h3 className={`text-base font-bold mb-2 line-clamp-1 transition-colors ${
                          isGold ? 'text-amber-200 group-hover:text-amber-400' : 'text-white group-hover:text-red-400'
                        }`}>
                          {item.title}
                        </h3>

                        <p className="text-gray-400 text-xs font-medium leading-relaxed line-clamp-3 mb-4">
                          {item.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className={`text-[9px] font-mono px-2 py-0.5 rounded-md border transition-all duration-200 hover:scale-105 cursor-default ${
                                isGold 
                                  ? 'bg-amber-950/30 text-amber-300/90 border-amber-500/20 hover:border-amber-400/50 hover:bg-amber-950/60' 
                                  : 'bg-black/50 text-gray-400 border-white/5 hover:border-red-500/40 hover:text-red-300 hover:bg-red-950/30'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Row */}
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 relative z-10">
                        {item.image && (
                          <button
                            onClick={() => openModal(item)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-400 transition-all cursor-pointer group-hover:translate-x-1"
                          >
                            View High-Res
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        )}

                        {item.pdfUrl && (
                          <button
                            onClick={() => openModal(item)}
                            className="neu-raised inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white font-bold text-xs hover:text-red-400 transition-all border border-red-500/25 hover:border-red-500/50 cursor-pointer shadow-[0_4px_12px_rgba(239,68,68,0.2)] hover:scale-102"
                          >
                            Preview Official Document (PDF)
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}

                        {item.credentialUrl && !item.pdfUrl && (
                          <a
                            href={item.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playBlip(880, 0.04)}
                            className="neu-raised inline-flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl text-white font-bold text-xs hover:text-red-400 transition-all border border-red-500/25 hover:border-red-500/50 cursor-pointer hover:scale-105"
                          >
                            Verify Credly
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}

                        {isTop && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/35 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                            Elite + Silver
                          </span>
                        )}

                        {!item.image && !item.pdfUrl && !item.credentialUrl && !isTop && (
                          <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Verified Honor
                          </span>
                        )}
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox / PDF Document Modal */}
      <AnimatePresence>
        {activeModal && (
          <div 
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-[100003] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="neu-card border border-white/10 rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[92vh] overflow-y-auto relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest bg-red-950/40 px-3 py-1 rounded-full border border-red-500/25">
                    {activeModal.badge}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white mt-2">
                    {activeModal.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    Issued by {activeModal.issuer} • {activeModal.date}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 rounded-full neu-raised border border-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Image Preview */}
              {activeModal.image && (
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black mb-6 max-h-[60vh] flex items-center justify-center shadow-2xl">
                  <img 
                    src={activeModal.image} 
                    alt={activeModal.title} 
                    className="w-full h-full max-h-[60vh] object-contain select-none"
                  />
                </div>
              )}

              {/* PDF Preview Frame if PDF exists */}
              {activeModal.pdfUrl && (
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black mb-6 h-[55vh] flex items-center justify-center shadow-2xl">
                  <iframe
                    src={`${activeModal.pdfUrl}#toolbar=0`}
                    title={activeModal.title}
                    className="w-full h-full rounded-2xl"
                  />
                </div>
              )}

              <p className="text-gray-300 text-sm leading-relaxed font-medium mb-6">
                {activeModal.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
                {activeModal.pdfUrl && (
                  <a
                    href={activeModal.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(239,68,68,0.3)]"
                  >
                    Open PDF in New Window
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {activeModal.credentialUrl && (
                  <a
                    href={activeModal.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(239,68,68,0.3)]"
                  >
                    Verify on Credly
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 rounded-full bg-black/60 border border-gray-700 text-gray-300 font-bold text-xs hover:bg-white/5 hover:text-white transition-colors cursor-pointer ml-auto"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Certificates;
