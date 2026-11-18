import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import stackImage from '../assets/about/image.png';
import reactImage from '../assets/about/react.png';
import nodeImage from '../assets/about/node.png';
import mongoImage from '../assets/about/mongodb.png';
import TiltCard from './three/TiltCard';
import { playBlip } from '../utils/audio';

const About = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education & Courses' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'hobbies', label: 'Soft Skills & Interests' }
  ];

  const handleTabChange = (id) => {
    playBlip(750, 0.03);
    setActiveTab(id);
  };

  return (
    <section id="about" className="pt-28 pb-36 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-red-950/40 bg-[linear-gradient(170deg,#0c0409_0%,#0d0404_30%,#100822_65%,#0a0308_100%)]">

      {/* Background radial highlights — crimson left, violet right */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-900/15 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] rounded-full bg-violet-900/18 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-14 items-start">
        
        {/* Left Side: ID Badge with realistic lanyard & 3D tilt */}
        <div className="flex flex-col items-center w-full md:w-[340px] shrink-0 mt-8 md:mt-0">
          
          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            {/* Lanyard string */}
            <div className="absolute -top-32 left-1/2 w-3.5 h-40 bg-gradient-to-b from-red-950 via-red-800 to-red-900 transform -translate-x-1/2 shadow-lg z-0 rounded-full" />
            {/* Lanyard clip */}
            <div className="absolute -top-6 left-1/2 w-7 h-12 bg-gradient-to-b from-gray-500 to-gray-800 rounded border border-gray-600 transform -translate-x-1/2 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400 shadow-inner" />
            </div>
            
            {/* Badge Card */}
            <TiltCard className="w-full max-w-[280px]">
              <div className="neu-card rounded-2xl p-3.5 shadow-[0_25px_50px_rgba(0,0,0,0.7)] relative z-20 border border-white/10 hover:border-red-500/50 transition-all duration-500 group">
                {/* Holographic Sheen */}
                <div className="absolute inset-0 holographic-sheen pointer-events-none z-30" />

                {/* Cutout Hole */}
                <div className="absolute -top-3 left-1/2 w-16 h-6 bg-[#111] rounded-t-xl transform -translate-x-1/2 flex justify-center items-center border-t border-x border-white/10">
                  <div className="w-8 h-2 bg-black rounded-full shadow-inner" />
                </div>

                {/* Image Container */}
                <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-950 border border-white/10 relative shadow-inner">
                  <img 
                    src={stackImage} 
                    alt="Gungun Wadhwani Profile" 
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Verified Watermark Pill */}
                  <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    <span>VERIFIED • B.TECH CSE '28</span>
                  </div>
                </div>

                {/* Badge Text HUD */}
                <div className="mt-3.5 text-center font-mono text-[10px] text-gray-400 uppercase tracking-widest flex flex-col items-center gap-0.5">
                  <span className="text-white font-bold tracking-wider text-xs">Gungun Wadhwani</span>
                  <span className="text-red-400 font-semibold text-[9px]">B.Tech CSE • CGPA: 8.75 / 10.0</span>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>

        {/* Right Side: Info Content & Animated Tabs */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white relative z-20 w-full">
          
          <div className="inline-block border border-red-500/20 rounded-full px-3.5 py-1 text-xs text-red-500 font-bold mb-3 tracking-widest uppercase bg-red-950/20">
            About The Engineer
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 uppercase tracking-tight">
            Engineering Background
          </h2>
          
          {/* Tab Navigation Pill Row */}
          <div className="flex border-b border-white/10 mb-8 overflow-x-auto whitespace-nowrap scrollbar-none gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative py-3 px-4 text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-red-400 font-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeAboutTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels with Smooth Animation */}
          <div className="min-h-[290px]">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div 
                  key="profile"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <p className="text-base sm:text-lg font-semibold leading-relaxed text-gray-200 max-w-3xl">
                    Hi, I am <span className="text-red-500 text-xl font-black tracking-wide uppercase">Gungun Wadhwani</span>, a Computer Science Engineering student <span className="text-white font-bold">(CGPA: 8.75 / 10.0)</span>, Full Stack Developer, and UI/UX Designer.
                  </p>
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-400 max-w-3xl font-medium">
                    I specialize in crafting high-performance, accessible, and responsive user experiences backed by reliable, scalable server architectures. Currently developing web applications with React.js, Next.js, Node.js, Express, and MongoDB, while practicing advanced Data Structures & Algorithms with over 510+ problems solved on LeetCode.
                  </p>

                  {/* Academic & Engineering Metrics 3-Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="neu-inset p-3.5 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Degree Program</div>
                      <div className="text-white font-bold text-xs mt-1">B.Tech CSE '28</div>
                    </div>
                    <div className="neu-inset p-3.5 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Academic CGPA</div>
                      <div className="text-red-400 font-bold text-xs mt-1">8.75 / 10.0</div>
                    </div>
                    <div className="neu-inset p-3.5 rounded-2xl border border-white/5 col-span-2 sm:col-span-1">
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Discipline</div>
                      <div className="text-white font-bold text-xs mt-1">Computer Science</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'experience' && (
                <motion.div 
                  key="experience"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="neu-card p-5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                          Web Developer
                          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">-25% Load Time</span>
                        </h4>
                        <div className="text-red-500 font-mono text-[11px] font-bold">Web Development Cell</div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 bg-black/40 px-2.5 py-1 rounded-full border border-white/5 shrink-0 self-start sm:self-auto">Jan 2025 - Present</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed mb-3">
                      Engineered responsive web applications and student portal modules using React.js, Node.js, and Tailwind CSS. Collaborated in an Agile team of 5 developers to build RESTful APIs, slash client load times by 25%, and elevate Lighthouse accessibility scores.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['React.js', 'Node.js', 'REST APIs', 'Tailwind CSS', 'Agile'].map((t) => (
                        <span key={t} className="text-[9px] font-mono bg-black/50 text-gray-400 px-2 py-0.5 rounded border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="neu-card p-5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                          Open-Source Contributor
                          <span className="text-[9px] font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">5+ Merged PRs</span>
                        </h4>
                        <div className="text-red-500 font-mono text-[11px] font-bold">GirlScript Summer of Code (GSSoC 2026)</div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 bg-black/40 px-2.5 py-1 rounded-full border border-white/5 shrink-0 self-start sm:self-auto">Jan 2026 - Present</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed mb-3">
                      Contributed to active open-source production repositories on GitHub, resolving critical UI bottlenecks, authoring 5+ merged Pull Requests, and implementing robust client-side validation middlewares.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['React.js', 'Framer Motion', 'Tailwind CSS', 'GitHub Actions', 'Code Review'].map((t) => (
                        <span key={t} className="text-[9px] font-mono bg-black/50 text-gray-400 px-2 py-0.5 rounded border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="neu-card p-5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                          Technical Outreach & PR Member
                          <span className="text-[9px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">500+ Attendees</span>
                        </h4>
                        <div className="text-red-500 font-mono text-[11px] font-bold">Robotics & Technical Club</div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 bg-black/40 px-2.5 py-1 rounded-full border border-white/5 shrink-0 self-start sm:self-auto">Aug 2024 - Present</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">
                      Spearheaded student outreach, event logistics, and technical hackathon promotions across institute events, engaging 500+ participants.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="neu-card p-6 rounded-2xl border border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <h4 className="font-bold text-base text-white">Bachelor of Technology (B.Tech)</h4>
                        <div className="text-red-400 font-mono text-xs font-semibold">Computer Science and Engineering • Class of 2028</div>
                      </div>
                      <span className="text-xs font-mono text-amber-400 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30 font-bold self-start sm:self-auto">
                        CGPA: 8.75 / 10.0
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed mt-2">
                      Consistent academic distinction with strong mastery in theoretical and applied computing foundations.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-3">
                      Core Computer Science Coursework
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {[
                        { name: "Data Structures & Algorithms", detail: "Arrays, Linked Lists, Trees, Graphs, DP, Sorting" },
                        { name: "Object-Oriented Programming (OOPs)", detail: "Encapsulation, Polymorphism, Inheritance, C++/Java" },
                        { name: "Database Management Systems (DBMS)", detail: "SQL, Normalization, Transactions, ACID, Indexing" },
                        { name: "Operating Systems (OS)", detail: "Process Management, Threads, Deadlocks, Memory Paging" },
                        { name: "Computer Networks (CN)", detail: "OSI & TCP/IP Stack, HTTP/S, Sockets, DNS" },
                        { name: "System Design & Web Architecture", detail: "REST APIs, Authentication, State Locks, Microservices" }
                      ].map((course, idx) => (
                        <div key={idx} className="neu-inset p-3 rounded-xl border border-white/5">
                          <div className="text-white font-bold text-xs">{course.name}</div>
                          <div className="text-gray-400 text-[11px] mt-0.5">{course.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div 
                  key="achievements"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="neu-gold-card p-5 rounded-2xl border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 sm:col-span-2">
                    <div className="text-amber-400 font-black text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>🏆</span> National Academic Distinction • Elite + Silver Medal
                    </div>
                    <h4 className="font-bold text-sm md:text-base text-white mb-1.5">Top 5% National Topper — NPTEL Social Networks</h4>
                    <p className="text-xs text-gray-300 font-medium leading-relaxed">Secured Elite + Silver Medal ranking among the Top 5% across India in NPTEL examination on Social Networks, graph theory, centrality metrics, and algorithmic cascades.</p>
                  </div>

                  <div className="neu-card p-5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
                    <div className="text-red-500 font-black text-[10px] uppercase tracking-wider mb-1">National Hackathon Finalist</div>
                    <h4 className="font-bold text-sm text-white mb-1.5">Top 10 Finalist - GDSC Techsprint</h4>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">Secured Top 10 national ranking out of 100+ competing engineering teams for building Velocity, an AI-powered career growth platform.</p>
                  </div>
                  
                  <div className="neu-card p-5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
                    <div className="text-red-500 font-black text-[10px] uppercase tracking-wider mb-1">National Innovation Round</div>
                    <h4 className="font-bold text-sm text-white mb-1.5">Smart India Hackathon (SIH)</h4>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">Shortlisted in the competitive internal technical selection round for solution architecture.</p>
                  </div>

                  <div className="neu-card p-5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
                    <div className="text-red-500 font-black text-[10px] uppercase tracking-wider mb-1">IIT Delhi Leadership LOR</div>
                    <h4 className="font-bold text-sm text-white mb-1.5">Campus Ambassador - eDC IIT Delhi</h4>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">Awarded a formal Letter of Recommendation by Tanmay Sharma (Overall Coordinator, IIT Delhi) for remarkable dedication during BECon '26.</p>
                  </div>

                  <div className="neu-card p-5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
                    <div className="text-red-500 font-black text-[10px] uppercase tracking-wider mb-1">Competitive Hackathons & Honors</div>
                    <h4 className="font-bold text-sm text-white mb-1.5">WeForShe Myntra, Hackanovate 7.0 & Adobe</h4>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">Attempted WeForShe Hacker-ramp 2026 (Myntra fashion-tech), competed in Hackanovate 7.0 (30-hr international hybrid hackathon, ABESIT), and 100% attendance in Adobe collegiate hackathons.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'hobbies' && (
                <motion.div 
                  key="hobbies"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-medium"
                >
                  <div className="neu-card p-5 rounded-2xl border border-white/5">
                    <h4 className="text-red-500 font-black text-xs uppercase tracking-widest mb-4">Interests & Hobbies</h4>
                    <ul className="space-y-3 text-gray-300 text-xs">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 shrink-0" />
                        <span>Performing Arts (Dancing & Anchoring - Secured 1st Prize in Inter-College Group Dance Competition)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 shrink-0" />
                        <span>Athletics (Recipient of awards for 200m/400m running, Basketball, Badminton)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 shrink-0" />
                        <span>Board games (Carrom tournaments)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 shrink-0" />
                        <span>Fine Arts (Drawing & Creative Crafting)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="neu-card p-5 rounded-2xl border border-white/5">
                    <h4 className="text-red-500 font-black text-xs uppercase tracking-widest mb-4">Soft Skills & Leadership</h4>
                    <ul className="space-y-3 text-gray-300 text-xs">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1 shrink-0" />
                        <span>Dynamic Teamwork & Agile Collaboration</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1 shrink-0" />
                        <span>Effective Public Communication & Event Anchoring</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1 shrink-0" />
                        <span>Student Leadership & Campus Ambassador Coordination</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1 shrink-0" />
                        <span>Analytical Problem Solving & Critical Thinking</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Technology stack quick logos */}
          <div className="flex items-center gap-8 mt-10 pt-4 border-t border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Core Foundations:</span>
            <img 
              data-aos="zoom-in" data-aos-delay="300"
              src={reactImage} 
              alt="React" 
              className="w-10 h-10 object-contain hover:scale-125 transition-transform duration-300 cursor-pointer drop-shadow-2xl opacity-80 hover:opacity-100" 
            />
            <img 
              data-aos="zoom-in" data-aos-delay="450"
              src={nodeImage} 
              alt="Node.js" 
              className="w-10 h-10 object-contain hover:scale-125 transition-transform duration-300 cursor-pointer drop-shadow-2xl opacity-80 hover:opacity-100" 
            />
            <img 
              data-aos="zoom-in" data-aos-delay="600"
              src={mongoImage} 
              alt="MongoDB" 
              className="w-10 h-10 object-contain hover:scale-125 transition-transform duration-300 cursor-pointer drop-shadow-2xl opacity-80 hover:opacity-100" 
            />
          </div>

        </div>
      </div>

      {/* Torn paper divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-[#0a0a0a]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default About;
