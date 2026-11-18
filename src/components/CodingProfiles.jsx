import React from 'react';
import SpotlightCard from './ui/SpotlightCard';
import AnimatedNumber from './ui/AnimatedNumber';
import { playBlip } from '../utils/audio';

const CodingProfiles = () => {
  // Simulated visual GitHub heatmap commit intensity values (0 to 3)
  const heatmapData = [
    1, 2, 3, 2, 1, 2, 3, 3, 2, 1, 2, 3, 2, 3, 1, 2, 3, 2, 3, 1, 2, 3, 2, 3,
    2, 3, 1, 2, 3, 2, 3, 1, 2, 3, 2, 1, 3, 2, 3, 2, 3, 1, 2, 3, 2, 3, 1, 2,
    3, 1, 2, 3, 2, 3, 1, 2, 3, 2, 3, 1, 2, 3, 2, 1, 2, 3, 2, 3, 1, 2, 3, 3,
    2, 3, 2, 1, 3, 2, 3, 2, 3, 1, 2, 3, 2, 3, 1, 2, 3, 2, 1, 2, 3, 2, 3, 2
  ];

  return (
    <section id="coding" className="pt-28 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-red-950/40 bg-[linear-gradient(215deg,#0d0406_0%,#120a26_40%,#100608_80%,#0e0720_100%)]">

      {/* Ambient glows — violet left, crimson right */}
      <div className="absolute top-20 left-0 w-[400px] h-[400px] rounded-full bg-violet-700/14 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[300px] bg-red-600/8 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-block border border-red-500/20 rounded-full px-4 py-1.5 text-xs text-red-500 font-bold mb-4 tracking-widest uppercase bg-red-950/10">
            Algorithmic Grit
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Coding Profiles & Problem Solving
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 mb-4" />
          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Daily commitment to data structures, graph theory, algorithmic cascades, and high-concurrency coding discipline.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: LeetCode */}
          <SpotlightCard
            data-aos="fade-up"
            data-aos-delay="100"
            className="neu-card border border-white/5 rounded-3xl p-6 transition-all duration-500 hover:border-red-500/50 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(239,68,68,0.14)] group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-5">
                <div className="neu-raised w-13 h-13 p-3 rounded-2xl flex items-center justify-center text-[#FFA116] group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,161,22,0.2)]">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M13.483 0a1.374 1.374 0 00-.961.414l-9.8 9.8a1.374 1.374 0 000 1.94l9.8 9.8a1.374 1.374 0 001.94 0l9.8-9.8a1.374 1.374 0 001.94 0l9.8-9.8a1.374 1.374 0 000-1.94l-9.8-9.8a1.374 1.374 0 00-.979-.414zm0 2.748l8.4 8.4-8.4 8.4-8.4-8.4 8.4-8.4zm-1.4 3.5v2.8h2.8v-2.8h-2.8z"/>
                  </svg>
                </div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-[#FFA116] uppercase bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFA116] shadow-[0_0_6px_rgba(255,161,22,0.8)]" />
                  510+ Solved
                </span>
              </div>

              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors duration-300">
                LeetCode Profile
              </h3>
              <p className="text-gray-400 text-xs mb-4">
                Advanced DSA mastery across dynamic programming, trees, graphs, and system constraints.
              </p>

              {/* Difficulty breakdown visualization */}
              <div className="space-y-1.5 mb-5 p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex justify-between text-[11px] font-mono text-gray-400">
                  <span className="text-emerald-400 font-bold">Easy: 320</span>
                  <span className="text-amber-400 font-bold">Medium: 169</span>
                  <span className="text-rose-400 font-bold">Hard: 21</span>
                </div>
                {/* Multi-segment progress bar */}
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-gray-800">
                  <div style={{ width: '63%' }} className="bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" title="Easy" />
                  <div style={{ width: '33%' }} className="bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" title="Medium" />
                  <div style={{ width: '4%' }} className="bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" title="Hard" />
                </div>
              </div>

              {/* Stats List */}
              <div className="space-y-2 mb-6">
                <div className="neu-inset px-3 py-2 rounded-xl flex justify-between items-center text-xs font-semibold text-gray-400 border border-white/5">
                  <span>100 Days Badge</span>
                  <span className="text-amber-400 font-black font-mono">Earned 2025</span>
                </div>
              </div>
            </div>

            <a
              href="https://leetcode.com/u/lkde5nkwCE/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBlip(880, 0.04)}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xs hover:from-amber-500 hover:to-amber-600 shadow-[0_4px_16px_rgba(245,158,11,0.3)] transition-all duration-300 transform group-hover:scale-[1.02]"
            >
              <span>View LeetCode Profile</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </SpotlightCard>

          {/* Card 2: GitHub */}
          <SpotlightCard
            data-aos="fade-up"
            data-aos-delay="200"
            className="neu-card border border-white/5 rounded-3xl p-6 transition-all duration-500 hover:border-red-500/50 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(239,68,68,0.14)] group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-5">
                <div className="neu-raised w-13 h-13 p-3 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                  </svg>
                </div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  750+ Commits
                </span>
              </div>

              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-red-400 transition-colors duration-300">
                GitHub Activity
              </h3>
              <p className="text-gray-400 text-xs mb-4">
                Disciplined daily commit habit, open-source pull requests, and multi-service repositories.
              </p>

              {/* Simulated Glowing Activity Heatmap Strip */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-5">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-2">
                  <span>Yearly Commit Cadence</span>
                  <span className="text-emerald-400 font-bold">Consistent</span>
                </div>
                <div className="grid grid-cols-12 gap-1.5">
                  {heatmapData.slice(0, 48).map((lvl, i) => (
                    <div
                      key={i}
                      className={`h-2.5 rounded-sm transition-all ${
                        lvl === 3 
                          ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]' 
                          : lvl === 2 
                            ? 'bg-emerald-600/80' 
                            : 'bg-emerald-950/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Stats List */}
              <div className="space-y-2 mb-6">
                <div className="neu-inset px-3 py-2 rounded-xl flex justify-between items-center text-xs font-semibold text-gray-400 border border-white/5">
                  <span>Total Repositories</span>
                  <AnimatedNumber value="33" className="text-white font-black font-mono" />
                </div>
                <div className="neu-inset px-3 py-2 rounded-xl flex justify-between items-center text-xs font-semibold text-gray-400 border border-white/5">
                  <span>GSSoC Merged PRs</span>
                  <span className="text-emerald-400 font-black font-mono">5+ Active</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/GungunW-0903"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBlip(880, 0.04)}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-xs hover:from-red-500 hover:to-rose-600 shadow-[0_4px_16px_rgba(239,68,68,0.35)] transition-all duration-300 transform group-hover:scale-[1.02]"
            >
              <span>View GitHub Repos</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </SpotlightCard>

          {/* Card 3: GeeksforGeeks */}
          <SpotlightCard
            data-aos="fade-up"
            data-aos-delay="300"
            className="neu-card border border-white/5 rounded-3xl p-6 transition-all duration-500 hover:border-red-500/50 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(239,68,68,0.14)] group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-5">
                <div className="neu-raised w-13 h-13 p-3 rounded-2xl flex items-center justify-center text-[#2F8D46] group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(47,141,70,0.2)]">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                  Score: 320+
                </span>
              </div>

              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                GeeksforGeeks
              </h3>
              <p className="text-gray-400 text-xs mb-4">
                Structured competitive coding practice in C++ and Java with strong algorithmic accuracy.
              </p>

              {/* Core Topic Chips */}
              <div className="flex flex-wrap gap-1.5 mb-5 p-3 rounded-xl bg-black/40 border border-white/5">
                {['Arrays & Strings', 'Recursion & Backtracking', 'Trees & BST', 'Dynamic Programming', 'Graph Theory'].map((topic, i) => (
                  <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/20">
                    {topic}
                  </span>
                ))}
              </div>

              {/* Stats List */}
              <div className="space-y-2 mb-6">
                <div className="neu-inset px-3 py-2 rounded-xl flex justify-between items-center text-xs font-semibold text-gray-400 border border-white/5">
                  <span>Problems Solved</span>
                  <AnimatedNumber value="100+" className="text-white font-black font-mono" />
                </div>
                <div className="neu-inset px-3 py-2 rounded-xl flex justify-between items-center text-xs font-semibold text-gray-400 border border-white/5">
                  <span>Languages Practiced</span>
                  <span className="text-white font-black font-mono">C++, Java</span>
                </div>
              </div>
            </div>

            <a
              href="https://www.geeksforgeeks.org/profile/wadhwanirwu7h?tab=activity"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBlip(880, 0.04)}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-bold text-xs hover:from-emerald-600 hover:to-teal-700 shadow-[0_4px_16px_rgba(16,185,129,0.3)] transition-all duration-300 transform group-hover:scale-[1.02]"
            >
              <span>View GFG Activity</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
};

export default CodingProfiles;
