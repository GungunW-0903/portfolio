import React, { useState } from 'react';
import stackImage from '../assets/about/image.png';
import reactImage from '../assets/about/react.png';
import nodeImage from '../assets/about/node.png';
import mongoImage from '../assets/about/mongodb.png';

const About = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'hobbies', label: 'Hobbies & Soft Skills' }
  ];

  return (
    <section id="about" className="pt-28 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-red-950/40 bg-[linear-gradient(170deg,#0c0409_0%,#0d0404_30%,#090410_65%,#0a0308_100%)]">

      {/* Background radial highlights — crimson left, violet right */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-900/12 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] rounded-full bg-violet-900/12 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        
        {/* Left Side: ID Badge */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
          
          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            {/* Lanyard string */}
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-red-900 transform -translate-x-1/2 shadow-inner z-0"></div>
            {/* Lanyard clip */}
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-600 rounded border border-gray-700 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.5)]"></div>
            
            {/* Badge Card */}
            <div className="glass-card w-full max-w-[280px] rounded-2xl p-3 shadow-[0_25px_50px_rgba(0,0,0,0.6)] relative z-20 transform transition-all duration-500 hover:scale-105 hover:border-red-500/30 animate-float-slow">
              {/* Cutout Hole */}
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-[#111] rounded-t-xl transform -translate-x-1/2 flex justify-center items-center border-t border-x border-white/5">
                <div className="w-8 h-2 bg-black/50 rounded-full shadow-inner"></div>
              </div>
              {/* Image Container */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-950 border border-white/5">
                <img 
                  src={stackImage} 
                  alt="Gungun Wadhwani Profile" 
                  className="w-full h-full object-cover select-none"
                />
              </div>
              {/* Badge Text HUD */}
              <div className="mt-3 text-center font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                Dev ID: GW-2026-FSD
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Info Content & Tabs */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0 relative z-20 w-full">
          
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 uppercase tracking-tight">Hello!</h2>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 mb-8 overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-6 text-sm font-bold tracking-wider uppercase border-b-2 transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id 
                    ? 'border-red-500 text-red-500 scale-105 font-black' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="min-h-[260px]">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <p className="text-lg font-semibold leading-relaxed text-gray-200 max-w-3xl">
                  Hi, I am <span className="text-red-500 text-xl font-black tracking-wide uppercase">Gungun Wadhwani</span>, a passionate Full Stack Developer and UI/UX Designer. I love crafting clean, highly performant, and responsive frontends combined with secure, scalable backend architectures and intuitive digital designs.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-400 max-w-3xl font-medium">
                  Currently in my 3rd year of Computer Science Engineering, my career goal is to solve challenging real-world problems through innovative software architectures and user-centered digital designs. I specialize in building web apps with JavaScript, React, Node.js, and SQL, and am actively diving deeper into scalable caching and container technologies like Redis and Docker.
                </p>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-white/5 hover:border-red-500/20 transition-all duration-300">
                  <div className="text-red-500 font-black text-[10px] uppercase tracking-wider mb-1">Open Source Contribution</div>
                  <h4 className="font-bold text-sm text-white mb-2">Selected for GSSoC 2026</h4>
                  <p className="text-xs text-gray-400 font-medium">Actively contributing to open-source software, making merged feature pull requests in career-focused web projects.</p>
                </div>
                
                <div className="glass-card p-5 rounded-2xl border border-white/5 hover:border-red-500/20 transition-all duration-300">
                  <div className="text-red-500 font-black text-[10px] uppercase tracking-wider mb-1">National-Level Hackathon</div>
                  <h4 className="font-bold text-sm text-white mb-2">Top 10 Rank - GDSC Techsprint</h4>
                  <p className="text-xs text-gray-400 font-medium">Ranked in the top 10 among national teams for building "Velocity", an AI-powered career growth platform with mock interview engines.</p>
                </div>

                <div className="glass-card p-5 rounded-2xl border border-white/5 hover:border-red-500/20 transition-all duration-300">
                  <div className="text-red-500 font-black text-[10px] uppercase tracking-wider mb-1">Leadership & Milestones</div>
                  <h4 className="font-bold text-sm text-white mb-2">Campus Ambassador - IIT Delhi</h4>
                  <p className="text-xs text-gray-400 font-medium">Awarded a Letter of Recommendation for outstanding leadership and event coordination capabilities.</p>
                </div>

                <div className="glass-card p-5 rounded-2xl border border-white/5 hover:border-red-500/20 transition-all duration-300">
                  <div className="text-red-500 font-black text-[10px] uppercase tracking-wider mb-1">Interdisciplinary Excellence</div>
                  <h4 className="font-bold text-sm text-white mb-2">Dance & Athletics Laurels</h4>
                  <p className="text-xs text-gray-400 font-medium">Secured 1st Prize in Group Dance at IIT Patna. Recipient of multiple athletic awards for 200m/400m sprints and basketball tournaments.</p>
                </div>
              </div>
            )}

            {activeTab === 'hobbies' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-medium">
                <div>
                  <h4 className="text-red-500 font-black text-xs uppercase tracking-widest mb-4">Interests & Hobbies</h4>
                  <ul className="space-y-2.5 text-gray-300 text-xs">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Performing Arts (Dancing & Anchoring)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Athletics (200m/400m Running, Basketball, Badminton)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Board games (Carrom)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Fine Arts (Drawing & Crafting)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-red-500 font-black text-xs uppercase tracking-widest mb-4">Soft Skills</h4>
                  <ul className="space-y-2.5 text-gray-300 text-xs">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Dynamic Teamwork & Collaboration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Effective Communication & Anchoring
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Leadership (Campus Ambassador role)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Critical Thinking & Time Management
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Technology stack quick icons */}
          <div className="flex items-center gap-10 mt-12">
            <img 
              data-aos="zoom-in" data-aos-delay="300"
              src={reactImage} 
              alt="React" 
              className="w-14 h-14 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl opacity-80" 
            />
            <img 
              data-aos="zoom-in" data-aos-delay="450"
              src={nodeImage} 
              alt="Node.js" 
              className="w-14 h-14 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl opacity-80" 
            />
            <img 
              data-aos="zoom-in" data-aos-delay="600"
              src={mongoImage} 
              alt="MongoDB" 
              className="w-14 h-14 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl opacity-80" 
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

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 md:right-20 text-red-500 opacity-5 animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
      <div className="absolute bottom-32 left-4 md:left-20 text-red-500 opacity-5 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </section>
  );
};

export default About;
