import React from 'react';
import SpotlightCard from './ui/SpotlightCard';
import AnimatedNumber from './ui/AnimatedNumber';
import TiltCard from './three/TiltCard';

/* ---------- Category icons (inline, theme-tinted) ---------- */
const icons = {
  code: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  layout: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v3H4V5zm0 5h9v9H5a1 1 0 01-1-1v-8zm11 0h5v8a1 1 0 01-1 1h-4v-9z" />
    </svg>
  ),
  server: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h14a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zm0 10h14a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4a1 1 0 011-1zm3-6h.01M8 17h.01" />
    </svg>
  ),
  database: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c4.418 0 8 1.343 8 3s-3.582 3-8 3-8-1.343-8-3 3.582-3 8-3zM4 8v8c0 1.657 3.582 3 8 3s8-1.343 8-3V8" />
    </svg>
  ),
  pen: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  tool: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
    </svg>
  ),
};

const SkillCategory = ({ title, icon, skills, delay }) => {
  return (
    <TiltCard
      data-aos="fade-up"
      data-aos-delay={delay}
      className="h-full group [perspective:1200px]"
    >
      {/* Animated glowing gradient border (always visible, brightens on hover) */}
      <div className="relative h-full rounded-3xl p-[1.5px] overflow-hidden">
        <div className="absolute inset-[-40%] opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(239,68,68,0.9)_60deg,transparent_140deg)] animate-[spin_5s_linear_infinite] pointer-events-none" />

        <SpotlightCard
          className="neu-card relative h-full rounded-3xl p-6 border border-red-500/10 group-hover:border-red-500/20 transition-all duration-500 [transform-style:preserve-3d]"
        >
          {/* Floating layer — icon + title lift toward the viewer on hover */}
          <div className="flex items-start justify-between gap-3 mb-5 transition-transform duration-500 [transform:translateZ(0px)] group-hover:[transform:translateZ(45px)]">
            <div className="flex items-center gap-3.5">
              <div className="neu-raised relative w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:text-red-400 transition-all duration-300">
                <span className="absolute inset-0 rounded-2xl bg-red-500/15 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">{icon}</span>
              </div>
              <h3 className="text-white text-base font-bold tracking-wide leading-tight group-hover:text-red-400 transition-colors duration-300">
                {title}
              </h3>
            </div>
            <span className="neu-inset shrink-0 text-[10px] font-mono text-gray-500 uppercase tracking-widest px-2.5 py-1 rounded-full group-hover:text-red-400/80 transition-all duration-300">
              {String(skills.length).padStart(2, '0')}
            </span>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-red-500/40 via-white/5 to-transparent mb-5 transition-transform duration-500 [transform:translateZ(0px)] group-hover:[transform:translateZ(25px)]" />

          {/* Chips lift on a nearer plane */}
          <div className="flex flex-wrap gap-2 transition-transform duration-500 [transform:translateZ(0px)] group-hover:[transform:translateZ(30px)]">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="neu-inset-chip px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300 hover:text-white cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </TiltCard>
  );
};

const Skills = () => {
  const stats = [
    { value: '6+', label: 'Languages' },
    { value: '12+', label: 'Frameworks & Tools' },
    { value: '400+', label: 'DSA Problems Solved' },
    { value: '3', label: 'Open-Source PRs' },
  ];

  const categories = [
    { title: 'Programming Languages', icon: icons.code, skills: ['C++', 'Python', 'Java', 'JavaScript (ES6+)', 'SQL'], delay: 100 },
    { title: 'Frontend Development', icon: icons.layout, skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'], delay: 150 },
    { title: 'Backend & Services', icon: icons.server, skills: ['Node.js', 'Express.js', 'Firebase', 'REST APIs'], delay: 200 },
    { title: 'Databases', icon: icons.database, skills: ['MongoDB', 'MySQL'], delay: 250 },
    { title: 'UI/UX Design', icon: icons.pen, skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Visual Design', 'Info Architecture'], delay: 300 },
    { title: 'Tools & Platforms', icon: icons.tool, skills: ['Git', 'GitHub', 'Postman', 'VS Code'], delay: 350 },
  ];

  const radarSkills = ['Docker', 'Redis'];

  return (
    <section id="skills" className="pt-28 pb-24 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-red-950/40 bg-[linear-gradient(160deg,#100408_0%,#0a0510_35%,#120606_70%,#0a0410_100%)]">

      {/* Background decoration — violet right, crimson left */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-violet-700/9 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full bg-red-700/9 blur-[130px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-40 bg-red-600/6 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-14">
          <div className="inline-block border border-red-500/20 rounded-full px-4 py-1.5 text-xs text-red-500 font-bold mb-4 tracking-widest uppercase bg-red-950/10">
            Expertise
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Technical Skills Matrix
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4" />
        </div>

        {/* Bento Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <SpotlightCard
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 80}
              spotlightColor="rgba(239,68,68,0.22)"
              className="neu-card rounded-2xl p-5 text-center border border-white/5 hover:border-red-500/20 transition-all duration-500"
            >
              <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">
                {stat.label}
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <SkillCategory key={idx} {...cat} />
          ))}

          {/* On Radar (Docker/Redis) Special Card */}
          <TiltCard
            data-aos="fade-up"
            data-aos-delay="400"
            className="h-full group [perspective:1200px]"
          >
            <div className="relative h-full rounded-3xl p-[1.5px] overflow-hidden">
              <div className="absolute inset-[-40%] opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(239,68,68,0.9)_60deg,transparent_140deg)] animate-[spin_5s_linear_infinite] pointer-events-none" />

              <SpotlightCard
                spotlightColor="rgba(239,68,68,0.24)"
                className="neu-card relative h-full rounded-3xl p-6 border border-red-500/15 group-hover:border-red-500/25 transition-all duration-500 overflow-hidden [transform-style:preserve-3d]"
              >
                <div className="flex items-center gap-3.5 mb-5 transition-transform duration-500 group-hover:[transform:translateZ(45px)]">
                  <div className="neu-raised w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-red-500">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  </div>
                  <h3 className="text-white text-base font-bold tracking-wide group-hover:text-red-400 transition-colors duration-300">
                    Skills On Radar
                  </h3>
                </div>

                <p className="text-xs text-gray-400 font-medium mb-6 leading-relaxed transition-transform duration-500 group-hover:[transform:translateZ(20px)]">
                  Actively diving into containerization and caching systems to build highly optimized, enterprise-ready web applications.
                </p>

                <div className="flex flex-wrap gap-2.5 transition-transform duration-500 group-hover:[transform:translateZ(30px)]">
                  {radarSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="neu-inset-chip flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-red-400 hover:text-white cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {skill}
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          </TiltCard>
        </div>

      </div>
    </section>
  );
};

export default Skills;
