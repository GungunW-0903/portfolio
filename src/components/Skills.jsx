import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';
import AnimatedNumber from './ui/AnimatedNumber';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

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

/* ---------- Animated proficiency meter ---------- */
const ProficiencyBar = ({ level }) => {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Proficiency</span>
        <span className="text-[10px] font-black text-red-500">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-black/60 overflow-hidden border border-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
          initial={{ width: reduced ? `${level}%` : 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

const SkillCategory = ({ title, icon, level, skills, delay }) => {
  return (
    <SpotlightCard
      data-aos="fade-up"
      data-aos-delay={delay}
      className="h-full bg-[#0e0e0e]/90 border border-white/5 rounded-3xl p-6 hover:border-red-500/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(239,68,68,0.10)] transition-all duration-500 group"
    >
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-red-600/25 to-red-950/20 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:text-red-400 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.08)]">
          {icon}
        </div>
        <h3 className="text-white text-base font-bold tracking-wide leading-tight group-hover:text-red-500 transition-colors duration-300">
          {title}
        </h3>
      </div>

      <ProficiencyBar level={level} />

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/50 border border-gray-800 text-gray-300 hover:border-red-500/40 hover:text-white hover:bg-red-950/20 transition-all duration-300 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </SpotlightCard>
  );
};

const Skills = () => {
  const stats = [
    { value: '6+', label: 'Languages' },
    { value: '12+', label: 'Frameworks & Tools' },
    { value: '250+', label: 'DSA Problems' },
    { value: '2', label: 'Open-Source PRs' },
  ];

  const categories = [
    { title: 'Programming Languages', icon: icons.code, level: 90, skills: ['C++', 'Python', 'Java', 'JavaScript (ES6+)', 'SQL'], delay: 100 },
    { title: 'Frontend Development', icon: icons.layout, level: 92, skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'], delay: 150 },
    { title: 'Backend & Services', icon: icons.server, level: 85, skills: ['Node.js', 'Express.js', 'Firebase', 'REST APIs'], delay: 200 },
    { title: 'Databases', icon: icons.database, level: 80, skills: ['MongoDB', 'MySQL'], delay: 250 },
    { title: 'UI/UX Design', icon: icons.pen, level: 88, skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Visual Design', 'Info Architecture'], delay: 300 },
    { title: 'Tools & Platforms', icon: icons.tool, level: 90, skills: ['Git', 'GitHub', 'Postman', 'VS Code'], delay: 350 },
  ];

  const radarSkills = ['Docker', 'Redis'];

  return (
    <section id="skills" className="bg-[#0a0a0a] pt-28 pb-24 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-gray-900">

      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />

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
              className="bg-gradient-to-br from-[#111111]/90 to-red-950/10 border border-white/5 rounded-2xl p-5 text-center hover:border-red-500/40 transition-all duration-500"
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
          <SpotlightCard
            data-aos="fade-up"
            data-aos-delay="400"
            spotlightColor="rgba(239,68,68,0.24)"
            className="h-full bg-gradient-to-br from-[#111111]/90 to-red-950/15 border border-red-500/20 rounded-3xl p-6 hover:border-red-500/50 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(239,68,68,0.15)] transition-all duration-500 group overflow-hidden"
          >
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              </div>
              <h3 className="text-white text-base font-bold tracking-wide group-hover:text-red-500 transition-colors duration-300">
                Skills On Radar
              </h3>
            </div>

            <p className="text-xs text-gray-400 font-medium mb-6 leading-relaxed">
              Actively diving into containerization and caching systems to build highly optimized, enterprise-ready web applications.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {radarSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-950/20 border border-red-500/30 text-red-400 hover:border-red-500 hover:text-white transition-all duration-300 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {skill}
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
};

export default Skills;
