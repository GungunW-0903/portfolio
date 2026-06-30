import React from 'react';
import TiltCard from './three/TiltCard';

const SkillCategory = ({ title, skills, delay }) => {
  return (
    <TiltCard
      data-aos="fade-up"
      data-aos-delay={delay}
      className="bg-[#111111]/80 border border-gray-800 rounded-3xl p-6 hover:border-red-500/50 hover:shadow-[0_10px_30px_rgba(239,68,68,0.08)] transition-all duration-500 group"
    >
      <h3 className="text-white text-lg font-bold mb-6 tracking-wide flex items-center gap-3 border-b border-gray-800 pb-3 group-hover:text-red-500 transition-colors duration-300">
        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        {title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/40 border border-gray-800 text-gray-300 hover:border-red-500/30 hover:text-white transition-all duration-300 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </TiltCard>
  );
};

const Skills = () => {
  const categories = [
    {
      title: "Programming Languages",
      skills: ["C++", "Python", "Java", "JavaScript (ES6+)", "SQL"],
      delay: 100
    },
    {
      title: "Frontend Development",
      skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
      delay: 200
    },
    {
      title: "Backend & Services",
      skills: ["Node.js", "Express.js", "Firebase", "REST APIs"],
      delay: 300
    },
    {
      title: "Databases",
      skills: ["MongoDB", "MySQL"],
      delay: 400
    },
    {
      title: "UI/UX Design",
      skills: ["Figma", "Wireframing", "Prototyping", "User Research", "Visual Design", "Info Architecture"],
      delay: 450
    },
    {
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "Postman", "VS Code"],
      delay: 500
    }
  ];

  const radarSkills = ["Docker", "Redis"];

  return (
    <section id="skills" className="bg-[#0a0a0a] pt-28 pb-24 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-gray-900">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-block border border-red-500/20 rounded-full px-4 py-1.5 text-xs text-red-500 font-bold mb-4 tracking-widest uppercase bg-red-950/10">
            Expertise
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Technical Skills Matrix
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, idx) => (
            <SkillCategory 
              key={idx} 
              title={cat.title} 
              skills={cat.skills} 
              delay={cat.delay} 
            />
          ))}

          {/* On Radar (Docker/Redis) Special Card */}
          <TiltCard
            data-aos="fade-up"
            data-aos-delay="600"
            className="bg-gradient-to-br from-[#111111]/80 to-red-950/10 border border-red-500/20 rounded-3xl p-6 hover:border-red-500/50 hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Pulsing beacon glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-red-600/10 blur-xl group-hover:bg-red-600/20 transition-all duration-500" />
            
            <h3 className="text-white text-lg font-bold mb-6 tracking-wide flex items-center gap-3 border-b border-gray-800 pb-3 group-hover:text-red-500 transition-colors duration-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              Skills On Radar
            </h3>
            
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
          </TiltCard>
        </div>

      </div>
    </section>
  );
};

export default Skills;
