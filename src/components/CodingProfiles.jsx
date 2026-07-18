import React from 'react';
import SpotlightCard from './ui/SpotlightCard';
import AnimatedNumber from './ui/AnimatedNumber';

const ProfileCard = ({ platform, icon, link, stats, delay }) => {
  return (
    <SpotlightCard
      data-aos="fade-up"
      data-aos-delay={delay}
      className="bg-[#111111]/90 border border-white/5 rounded-3xl p-6 transition-all duration-500 hover:border-red-500/50 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(239,68,68,0.10)] group flex flex-col justify-between min-h-[280px]"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-13 h-13 p-3 rounded-2xl bg-gradient-to-br from-red-600/20 to-black border border-red-500/20 flex items-center justify-center text-gray-300 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.08)]">
            {icon}
          </div>
          <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-red-500 uppercase bg-red-950/20 px-3 py-1 rounded-full border border-red-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Active
          </span>
        </div>

        <h3 className="text-white text-xl font-bold mb-5 group-hover:text-red-500 transition-colors duration-300">
          {platform}
        </h3>

        {/* Stats List */}
        <div className="space-y-2.5 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs font-semibold text-gray-400 border-b border-gray-800/40 pb-1.5">
              <span>{stat.label}</span>
              <AnimatedNumber value={stat.value} className="text-white font-black tabular-nums" />
            </div>
          ))}
        </div>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-black border border-gray-800 text-gray-300 font-bold text-xs hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300"
      >
        View Live Profile
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </SpotlightCard>
  );
};

const CodingProfiles = () => {
  const profiles = [
    {
      platform: "LeetCode",
      link: "https://leetcode.com/u/GungunW-0903/",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 00-.961.414l-9.8 9.8a1.374 1.374 0 000 1.94l9.8 9.8a1.374 1.374 0 001.94 0l9.8-9.8a1.374 1.374 0 000-1.94l-9.8-9.8a1.374 1.374 0 00-.979-.414zm0 2.748l8.4 8.4-8.4 8.4-8.4-8.4 8.4-8.4zm-1.4 3.5v2.8h2.8v-2.8h-2.8z"/>
        </svg>
      ),
      stats: [
        { label: "Problems Solved", value: "250+" },
        { label: "Contest Rating", value: "1480+" },
        { label: "DSA Badges Earned", value: "50 Days Badge" }
      ],
      hoverGlow: "hover:shadow-[0_15px_40px_rgba(239,68,68,0.06)]"
    },
    {
      platform: "GitHub",
      link: "https://github.com/GungunW-0903",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
        </svg>
      ),
      stats: [
        { label: "Total Repositories", value: "15+" },
        { label: "Yearly Contributions", value: "240+ Commits" },
        { label: "GSSoC Pull Requests", value: "2 Merged" }
      ],
      hoverGlow: "hover:shadow-[0_15px_40px_rgba(239,68,68,0.06)]"
    },
    {
      platform: "GeeksforGeeks",
      link: "https://leetcode.com/u/GungunW-0903/", // Placeholder or fallback
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      stats: [
        { label: "Problems Solved", value: "100+" },
        { label: "Overall Coding Score", value: "320+" },
        { label: "Languages Used", value: "C++, Java" }
      ],
      hoverGlow: "hover:shadow-[0_15px_40px_rgba(239,68,68,0.06)]"
    }
  ];

  return (
    <section id="coding" className="bg-[#0a0a0a] pt-28 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-gray-950">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-block border border-red-500/20 rounded-full px-4 py-1.5 text-xs text-red-500 font-bold mb-4 tracking-widest uppercase bg-red-950/10">
            Performance
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Coding Profiles
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4" />
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile, idx) => (
            <ProfileCard
              key={idx}
              platform={profile.platform}
              icon={profile.icon}
              link={profile.link}
              stats={profile.stats}
              delay={idx * 120}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CodingProfiles;
