import React from 'react';
import SpotlightCard from './ui/SpotlightCard';

const OpenSource = () => {
  const contributions = [
    {
      prNumber: "#3400",
      repo: "anurag3407/career-pilot",
      title: "Mono Elegant Theme UI/UX Implementation",
      status: "Merged",
      description: "Successfully designed and implemented a gorgeous mono-elegant theme to enhance the Career Pilot dashboard. Cleaned up styling, structured spacing, and resolved visual bottlenecks for placement-oriented users.",
      link: "https://github.com/anurag3407/career-pilot/pull/3400",
      tags: ["React.js", "Tailwind CSS", "UI Design"]
    },
    {
      prNumber: "#2384",
      repo: "anurag3407/career-pilot",
      title: "Layout Optimization & Dashboard Refactor",
      status: "Merged",
      description: "Refactored the dashboard grid layout to optimize mobile response rates and clean up outdated assets. Fixed component overlap errors on smaller devices and polished hover states.",
      link: "https://github.com/anurag3407/career-pilot/pull/2384",
      tags: ["React.js", "CSS3", "Responsive Grid"]
    },
    {
      prNumber: "#4363",
      repo: "anurag3407/career-pilot",
      title: "Train Journey Portfolio Template",
      status: "Merged",
      description: "Built a complete scroll-driven Train Journey portfolio template — parallax train-window view, animated project 'stations' on a rail timeline, interactive 3D CSS locomotive, split-flap hero boot sequence, and scroll-driven time-of-day sky transitions. Fully responsive with prefers-reduced-motion support.",
      link: "https://github.com/anurag3407/career-pilot/pull/4363",
      tags: ["React.js", "Framer Motion", "Tailwind CSS", "3D CSS"]
    }
  ];

  return (
    <section id="opensource" className="pt-28 pb-24 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-red-950/40 bg-[linear-gradient(150deg,#120a26_0%,#110507_40%,#0e0720_75%,#0d0405_100%)]">

      {/* Background neon glows — crimson + violet */}
      <div className="absolute top-1/2 left-0 w-[420px] h-[420px] rounded-full bg-red-600/8 blur-[110px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] rounded-full bg-violet-800/14 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-block border border-red-500/20 rounded-full px-4 py-1.5 text-xs text-red-500 font-bold mb-4 tracking-widest uppercase bg-red-950/10">
            Open Source
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            GSSoC 2026 Contributions
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4" />
        </div>

        {/* Intro Banner */}
        <div 
          data-aos="fade-up"
          className="bg-[#111111] border border-gray-800 rounded-3xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center gap-6 justify-between hover:border-red-500/30 transition-all duration-300"
        >
          <div className="text-left">
            <h3 className="text-white text-lg font-bold mb-2 tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              Selected Contributor - GirlScript Summer of Code
            </h3>
            <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
              Selected to participate in the prestigious GSSoC 2026 program, contributing to real-world codebases. Actively writing features, resolving bugs, and reviewing code in modern, collaborative environments.
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-5 py-2.5 rounded-full border border-red-500/30 text-red-500 font-bold text-xs uppercase tracking-widest bg-red-950/20">
              GSSoC '26 Active
            </span>
          </div>
        </div>

        {/* Pull Requests Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contributions.map((pr, idx) => (
            <SpotlightCard
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="bg-[#111111]/60 border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-red-500/50 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(239,68,68,0.10)] transition-all duration-500 group"
            >
              <div>
                {/* PR Status HUD */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-950/30 border border-purple-500/30 text-purple-400">
                      PR {pr.prNumber}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {pr.repo}
                    </span>
                  </div>
                  
                  {/* Status Indicator */}
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-950/20 border border-green-500/30 text-green-400">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                    {pr.status}
                  </span>
                </div>

                <h3 className="text-white text-lg font-bold mb-3 group-hover:text-red-500 transition-colors duration-300">
                  {pr.title}
                </h3>

                <p className="text-gray-400 text-xs leading-relaxed font-medium mb-6">
                  {pr.description}
                </p>
              </div>

              <div>
                {/* PR Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pr.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="text-[9px] font-bold font-mono bg-black/40 text-red-400/80 border border-red-500/10 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* PR Link Button */}
                <a 
                  href={pr.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-800 text-gray-300 font-bold text-xs hover:bg-white/5 hover:text-white transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM11 7v5h2V7h-2zm0 7v3h2v-3h-2z"/>
                  </svg>
                  View Pull Request
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OpenSource;
