import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RecruiterHub = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'r' || e.key === 'R') {
        if (!isOpen && !e.ctrlKey && !e.metaKey) {
          // Open recruiter hub
          window.dispatchEvent(new CustomEvent('toggle-recruiter-hub'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('wadhwagungun09@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100005] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto neu-card rounded-3xl border border-red-500/30 p-6 md:p-8 shadow-[0_25px_70px_rgba(239,68,68,0.25)] relative text-white"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              title="Close Recruiter Hub (Esc)"
            >
              ✕
            </button>

            {/* Header Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                AVAILABLE FOR HIRE
              </span>
              <span className="text-[11px] font-mono text-gray-400 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                Full-Time SDE & Summer '26 Internships
              </span>
              <span className="text-[10px] font-mono text-red-400 bg-red-950/40 px-2.5 py-1 rounded-full border border-red-500/20 ml-auto mr-10 hidden sm:inline-block">
                Press [Esc] to exit
              </span>
            </div>

            {/* Candidate Title Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                  Gungun Wadhwani
                  <span className="text-xs font-mono font-bold text-red-500 bg-red-950/50 px-2 py-0.5 rounded border border-red-500/30">
                    B.Tech CSE '28
                  </span>
                </h2>
                <p className="text-gray-400 text-xs md:text-sm font-medium mt-1">
                  Full Stack Software Engineer & UI/UX Designer • B.Tech Computer Science (CGPA: 8.75 / 10.0)
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Resume PDF
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white font-mono text-xs transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>
            </div>

            {/* Vital Statistics 4-Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div className="neu-inset p-3.5 rounded-2xl border border-white/5">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">DSA Solved</div>
                <div className="text-xl md:text-2xl font-black text-white font-mono mt-0.5">510+</div>
                <div className="text-[10px] text-amber-400 font-medium">190+ Med/Hard • LeetCode</div>
              </div>
              <div className="neu-inset p-3.5 rounded-2xl border border-white/5">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">National Rank</div>
                <div className="text-xl md:text-2xl font-black text-amber-400 font-mono mt-0.5">Top 5%</div>
                <div className="text-[10px] text-gray-400 font-medium">NPTEL Elite + Silver</div>
              </div>
              <div className="neu-inset p-3.5 rounded-2xl border border-white/5">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">GitHub Commits</div>
                <div className="text-xl md:text-2xl font-black text-red-400 font-mono mt-0.5">750+</div>
                <div className="text-[10px] text-gray-400 font-medium">33 Repos • GSSoC '26</div>
              </div>
              <div className="neu-inset p-3.5 rounded-2xl border border-white/5">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Academic CGPA</div>
                <div className="text-xl md:text-2xl font-black text-white font-mono mt-0.5">8.75 / 10</div>
                <div className="text-[10px] text-gray-400 font-medium">B.Tech Computer Science</div>
              </div>
            </div>

            {/* Why Hire Me: 3 Executive Selling Points */}
            <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 mb-3 flex items-center gap-2">
                <span>⚡</span> Why Gungun is an Immediate Asset to Your Engineering Team
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span> Production Full-Stack
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Built SafeExit (hostel ERP with QR-scan verification) deployed on production university infrastructure, CineSnap ticket booking with seat lock management, and Airbnb rental dashboards.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span> Algorithmic Consistency
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    510+ LeetCode problems solved with 100-Days streak badge. Elite Silver Medalist in NPTEL graph theory and networks (Top 5% across India).
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span> Agile & Collaborative
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Active open-source contributor with 5+ merged PRs in GSSoC '26. Web Development Cell engineer. Formal LOR from IIT Delhi for technical coordination.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Tech Stack Matrix */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mb-2.5">
                Primary Technologies & Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'C++', 'Python', 'Java', 'Tailwind CSS', 'REST APIs', 'JWT & Auth', 'Figma (UI/UX)', 'Git / GitHub', 'Docker'].map((tech) => (
                  <span key={tech} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Contact & Scheduling Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-400 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span>Based in India (IST UTC+5:30) • Open to relocation and remote worldwide</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="mailto:wadhwagungun09@gmail.com?subject=Interview%20Invitation%20for%20Gungun%20Wadhwani"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider text-center transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:scale-105"
                >
                  Schedule Interview
                </a>
                <a
                  href="https://www.linkedin.com/in/gungun-wadhwani-0903/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  LinkedIn
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RecruiterHub;
