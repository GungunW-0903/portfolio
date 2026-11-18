import React, { useState, useEffect } from 'react';
import Magnetic from './ui/Magnetic';
import { toggleMute, getIsMuted, playBlip } from '../utils/audio';

const Navbar = ({ onOpenRecruiter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [muted, setMuted] = useState(() => getIsMuted());

  const handleToggleSound = () => {
    const newMuted = toggleMute();
    setMuted(newMuted);
    if (!newMuted) {
      playBlip(900, 0.05);
    }
  };

  // Handle scroll to make navbar more solid with backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const ids = ['home', 'about', 'skills', 'projects', 'opensource', 'coding', 'certificates', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const openPalette = () => {
    playBlip(700, 0.03);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
  };

  const handleRecruiterClick = () => {
    playBlip(880, 0.04);
    if (onOpenRecruiter) {
      onOpenRecruiter();
    } else {
      window.dispatchEvent(new CustomEvent('toggle-recruiter-hub'));
    }
  };

  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Open Source', 'Coding', 'Certificates', 'Contact'];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isOpen 
          ? 'bg-[#0f0408]/95 backdrop-blur-2xl py-4 border-b border-red-500/30'
          : isScrolled 
            ? 'bg-[#050505]/85 backdrop-blur-xl py-3 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]' 
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center">
        
        {/* Left Side: Logo/Name + Availability Pill */}
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            onClick={() => playBlip(600, 0.03)}
            className="text-white text-xl md:text-2xl font-black tracking-tight flex items-center gap-1 group"
          >
            <span>Gungun</span>
            <span className="text-red-500 group-hover:text-red-400 transition-colors">.W</span>
          </a>

          <button
            onClick={handleRecruiterClick}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-400 hover:text-white text-[11px] font-mono font-bold transition-all shadow-[0_0_12px_rgba(239,68,68,0.2)] hover:scale-105 cursor-pointer"
            title="Open 60-Second Recruiter Summary (Shortcut: Press R)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-white font-black">⚡ Recruiter Hub</span>
          </button>
        </div>

        {/* Center: Desktop Menu Links */}
        <div className="hidden xl:flex space-x-7 text-sm">
          {navLinks.map((link) => {
            const id = link.toLowerCase().replace(/\s+/g, '');
            const isActive = activeSection === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                onClick={() => playBlip(750, 0.02)}
                className={`font-medium relative py-1 transition-colors duration-200 ${
                  isActive ? 'text-red-500 font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 to-rose-400 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Side: Sound Toggle + Cmd-K + Resume + Hire Me */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              muted 
                ? 'border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20' 
                : 'border-red-500/40 text-red-400 bg-red-950/30 shadow-[0_0_10px_rgba(239,68,68,0.25)]'
            }`}
            title={muted ? "Enable futuristic acoustic UI clicks" : "Mute audio clicks"}
          >
            {muted ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Quick Palette Button */}
          <button
            onClick={openPalette}
            title="Open command palette (Ctrl+K)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-red-500/40 transition-all text-xs font-mono cursor-pointer"
          >
            <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <kbd className="text-[9px] tracking-wider text-gray-400">Ctrl K</kbd>
          </button>

          {/* Resume PDF */}
          <Magnetic strength={0.3}>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBlip(800, 0.04)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-500 transition-all shadow-[0_4px_16px_rgba(239,68,68,0.4)] hover:scale-105"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Resume
            </a>
          </Magnetic>

          {/* Hire Me CTA */}
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              onClick={() => playBlip(850, 0.04)}
              className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all backdrop-blur-md hover:scale-105"
            >
              Hire Me
            </a>
          </Magnetic>
        </div>

        {/* Mobile Hamburger & Recruiter Shortcut */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={handleRecruiterClick}
            className="px-2.5 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-white text-[10px] font-mono font-bold flex items-center gap-1"
          >
            <span>⚡ Hub</span>
          </button>
          <button 
            onClick={() => { playBlip(700, 0.03); setIsOpen(!isOpen); }}
            className="text-white p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Slide-Down Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] py-6 opacity-100 bg-[#0a0307]/95 border-b border-red-500/30 shadow-2xl backdrop-blur-2xl' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 space-y-3">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
              onClick={() => { playBlip(750, 0.02); setIsOpen(false); }}
              className="text-gray-200 hover:text-red-400 font-bold text-base border-b border-white/10 pb-2 transition-colors flex items-center justify-between"
            >
              <span>{link}</span>
              <span className="text-gray-600 text-xs">→</span>
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2.5">
            <button
              onClick={() => { setIsOpen(false); handleRecruiterClick(); }}
              className="w-full py-2.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs font-bold uppercase tracking-wider text-center"
            >
              ⚡ Open 60-Sec Recruiter Hub
            </button>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider text-center shadow-lg"
            >
              Download Resume (PDF)
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-wider text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
