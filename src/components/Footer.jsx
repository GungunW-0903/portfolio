import React, { useState } from 'react';
import Magnetic from './ui/Magnetic';

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('wadhwagungun09@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const proofMetrics = [
    {
      value: "750+",
      label: "Yearly GitHub Commits",
      sub: "Daily Engineering Discipline",
      accent: "text-red-400"
    },
    {
      value: "510+",
      label: "LeetCode Solved",
      sub: "190+ Medium/Hard • 100 Days Badge",
      accent: "text-amber-400"
    },
    {
      value: "Top 5%",
      label: "National Topper",
      sub: "NPTEL Elite • IIT Ropar / Madras",
      accent: "text-yellow-400"
    },
    {
      value: "8.75",
      label: "CGPA / 10.0",
      sub: "B.Tech Computer Science '28",
      accent: "text-red-400"
    }
  ];

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About & Experience', href: '#about' },
    { label: 'Technical Skills', href: '#skills' },
    { label: 'Featured Projects', href: '#projects' },
    { label: 'Open Source', href: '#opensource' },
    { label: 'Coding Profiles', href: '#coding' },
    { label: 'Certificates & Honors', href: '#certificates' },
    { label: 'Direct Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/GungunW-0903',
      label: '33 Repositories',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/gungun-wadhwani-0903/',
      label: 'Professional Network',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'LeetCode',
      href: 'https://leetcode.com/u/lkde5nkwCE/',
      label: '510+ Problems Solved',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 00-.961.414l-9.8 9.8a1.374 1.374 0 000 1.94l9.8 9.8a1.374 1.374 0 001.94 0l9.8-9.8a1.374 1.374 0 000-1.94l-9.8-9.8a1.374 1.374 0 00-.979-.414zm0 2.748l8.4 8.4-8.4 8.4-8.4-8.4 8.4-8.4zm-1.4 3.5v2.8h2.8v-2.8h-2.8z"/>
        </svg>
      )
    },
    {
      name: 'Credly',
      href: 'https://www.credly.com/users/gungun-wadhwani',
      label: 'Verified Badges',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-[#050505] text-[#d4d4d4] pt-20 pb-12 px-6 md:px-12 w-full font-sans relative overflow-hidden border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-red-600/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-violet-700/8 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Recruiter Impact Deck: The Pitch & Quantitative Work Ethic */}
        <div className="neu-card border border-white/10 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Subtle Shimmer Sheen */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none opacity-40 animate-shimmer" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left 7 cols: Recruiter Pitch & Identity */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Available for Full-Time SDE Roles & Summer '26 Internships
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Engineering Scalable Systems with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">Technical Discipline & Speed</span>.
              </h2>

              <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed max-w-2xl">
                Computer Science undergraduate <span className="text-white font-semibold">(CGPA: 8.75)</span> with proven consistency across <span className="text-white font-semibold">510+ algorithmic problems</span> and <span className="text-white font-semibold">750+ yearly commits</span>. From architecting QR-secured outing platforms to building real-time state sync booking systems, I deliver production-ready software on schedule with zero compromise on code quality.
              </p>

              {/* Action Buttons Hub */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_20px_rgba(239,68,68,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download Full Resume (PDF)
                </a>

                <button
                  onClick={copyEmail}
                  className="px-5 py-3 rounded-full neu-raised border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? '✓ Email Address Copied!' : 'Copy Email Address'}</span>
                </button>

                <a
                  href="https://www.linkedin.com/in/gungun-wadhwani-0903/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full neu-raised border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* Right 5 cols: 2x2 Work Ethic & Metric Proof Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              {proofMetrics.map((item, idx) => (
                <div 
                  key={idx}
                  className="neu-inset rounded-2xl p-4 border border-white/5 hover:border-red-500/30 transition-all duration-300 group/metric"
                >
                  <div className={`text-2xl md:text-3xl font-black ${item.accent} font-mono tracking-tight group-hover/metric:scale-105 transition-transform duration-300`}>
                    {item.value}
                  </div>
                  <div className="text-white text-xs font-bold mt-1">
                    {item.label}
                  </div>
                  <div className="text-gray-500 text-[10px] font-mono mt-0.5 leading-tight">
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Directory & Coordinates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/10 text-xs">
          
          {/* Col 1: Professional Bio */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-black tracking-wide flex items-center gap-2">
              Gungun Wadhwani
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            </h3>
            <p className="text-gray-400 leading-relaxed font-medium">
              Full Stack Software Engineer & UI/UX Designer specialized in React, Next.js, Node.js, Express, and distributed database models.
            </p>
          </div>

          {/* Col 2: Navigation Sitemap */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-red-500 uppercase tracking-widest mb-4">
              // SITE DIRECTORY
            </h4>
            <div className="grid grid-cols-2 gap-2 text-gray-400 font-medium">
              {navLinks.slice(0, 4).map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white hover:translate-x-1 transition-all">
                  {link.label}
                </a>
              ))}
              {navLinks.slice(4).map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white hover:translate-x-1 transition-all">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Connect */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-red-500 uppercase tracking-widest mb-4">
              // GET IN TOUCH
            </h4>
            <div className="space-y-2 text-gray-400 font-medium">
              <p>
                <a href="mailto:wadhwagungun09@gmail.com" className="hover:text-white transition-colors underline underline-offset-4 decoration-red-500/40">
                  wadhwagungun09@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+918770958514" className="hover:text-white transition-colors">
                  +91 8770958514
                </a>
              </p>
            </div>
          </div>

          {/* Col 4: Verified Channels */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-red-500 uppercase tracking-widest mb-4">
              // VERIFIED PROFILES
            </h4>
            <div className="space-y-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-red-500/30 text-gray-300 hover:text-white transition-all text-xs group/link"
                >
                  <span className="flex items-center gap-2.5 font-semibold">
                    <span className="text-red-500">{item.icon}</span>
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 group-hover/link:text-red-400 transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Ambient Subtle Architectural Signature Watermark */}
        <div className="w-full flex flex-col justify-center items-center pt-10 pb-6 overflow-hidden relative select-none">
          <div className="text-[10vw] md:text-[8vw] font-black tracking-tighter lowercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/15 via-white/5 to-transparent hover:from-white/40 hover:via-red-500/30 hover:to-transparent transition-all duration-700 cursor-default">
            gungun.w
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600 -mt-2">
            Engineering Portfolio • Gungun Wadhwani
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-[11px] font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>ALL SYSTEMS OPERATIONAL • VERSION 2026.11</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Gungun Wadhwani. Handcrafted with React, Three.js & Tailwind.
          </div>

          <Magnetic strength={0.4}>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-white transition-all cursor-pointer shadow-inner hover:scale-105"
            >
              <span>Back to Top</span>
              <svg className="w-3.5 h-3.5 text-red-500 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </Magnetic>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
