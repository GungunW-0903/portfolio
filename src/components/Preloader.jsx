import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playBlip, playSuccessChime } from '../utils/audio';

const BOOT_LOGS = [
  "SYSTEM: Booting engineering runtime environment...",
  "DSA: Synchronizing 510+ LeetCode algorithmic models...",
  "STACK: Mounting React 19, Node.js & microservices...",
  "WEBGL: Compiling interactive 3D crystal shaders...",
  "STATUS: All systems calibrated • Welcome, Recruiter!"
];

const PROOF_PILLS = [
  { label: "510+ LeetCode", color: "border-amber-500/30 text-amber-400 bg-amber-950/20" },
  { label: "750+ Commits", color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20" },
  { label: "Top 5% NPTEL", color: "border-yellow-500/30 text-yellow-400 bg-yellow-950/20" },
  { label: "8.75 CGPA", color: "border-rose-500/30 text-rose-400 bg-rose-950/20" }
];

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Smooth, dynamic loading curve simulation (0% -> 100%)
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear pacing: quick start, brief hesitation near 80%, smooth surge to 100%
      let increment;
      if (current < 35) increment = Math.floor(Math.random() * 5) + 3;
      else if (current < 75) increment = Math.floor(Math.random() * 4) + 2;
      else if (current < 92) increment = Math.floor(Math.random() * 3) + 1;
      else increment = Math.floor(Math.random() * 4) + 2;

      current = Math.min(100, current + increment);
      setProgress(current);

      // Rotate log messages in sync with progress
      if (current < 25) setLogIndex(0);
      else if (current < 50) setLogIndex(1);
      else if (current < 75) setLogIndex(2);
      else if (current < 95) setLogIndex(3);
      else setLogIndex(4);

      if (current >= 100) {
        clearInterval(interval);
        playSuccessChime();
        // Brief pause at 100% so user sees completion before curtains lift
        setTimeout(() => {
          setIsLoading(false);
        }, 450);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    playBlip(900, 0.04);
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[100000] w-full h-screen overflow-hidden flex items-center justify-center bg-[#070709] select-none"
        >
          {/* Top Shutter Curtain (Slides up on exit) */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.05 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#09050d] border-b border-red-500/20 z-0 pointer-events-none"
          />

          {/* Bottom Shutter Curtain (Slides down on exit) */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.05 }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#070709] border-t border-red-500/20 z-0 pointer-events-none"
          />

          {/* Luxury Ambient Lighting Glows */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(circle at 50% 45%, rgba(220, 38, 38, 0.22) 0%, transparent 60%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.18) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(190, 24, 93, 0.15) 0%, transparent 55%)
              `
            }}
          />

          {/* Subtle Cyberpunk Matrix Grid */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none z-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px'
            }}
          />

          {/* Central Animated Content Card */}
          <motion.div
            exit={{ opacity: 0, scale: 0.92, y: -25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl w-full"
          >
            {/* Holographic Spinning Badge */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center">
              {/* Outer Pulsing Laser Ring */}
              <div className="absolute inset-0 rounded-full border border-red-500/30 animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-1.5 rounded-full border border-dashed border-rose-500/40 animate-[spin_12s_linear_infinite_reverse]" />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-red-600/20 to-purple-900/30 backdrop-blur-md border border-red-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-300 to-red-400 font-mono">
                  GW
                </span>
              </div>
            </div>

            {/* Category / System Monogram */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-red-500/30 mb-4 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-red-400">
                ENGINEERING REPOSITORY • 2026.11
              </span>
            </motion.div>

            {/* Candidate Main Name */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none mb-3"
            >
              Gungun <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 drop-shadow-[0_0_40px_rgba(239,68,68,0.45)]">
                Wadhwani
              </span>
            </motion.h1>

            {/* Professional Role & Cohort Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-gray-300 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6"
            >
              Full Stack Software Engineer • B.Tech CSE '28
            </motion.p>

            {/* Recruiter Quantitative Proof Deck */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-lg"
            >
              {PROOF_PILLS.map((pill, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-wider ${pill.color} backdrop-blur-sm shadow-sm`}
                >
                  {pill.label}
                </span>
              ))}
            </motion.div>

            {/* Precision Laser Loading Bar & Percentage */}
            <div className="w-full max-w-sm sm:max-w-md space-y-2 mb-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  INITIALIZING RUNTIME
                </span>
                <span className="text-white font-black text-sm tracking-widest font-mono">
                  {String(progress).padStart(3, '0')}%
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-1.5 rounded-full bg-white/5 border border-white/10 overflow-hidden relative shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 relative rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]" />
                </motion.div>
              </div>
            </div>

            {/* Real-time Dynamic Console Log Stream */}
            <div className="h-5 flex items-center justify-center font-mono text-[11px] text-gray-400">
              <AnimatePresence mode="wait">
                <motion.span
                  key={logIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-red-400 font-semibold"
                >
                  {BOOT_LOGS[logIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Click to Skip Prompt */}
            <button
              onClick={handleSkip}
              className="mt-6 text-[10px] font-mono text-gray-600 hover:text-gray-300 transition-colors cursor-pointer uppercase tracking-widest flex items-center gap-1.5"
            >
              <span>Click anywhere to enter</span>
              <span>↵</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
