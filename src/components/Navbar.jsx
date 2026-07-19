import React, { useState, useEffect } from 'react';
import Magnetic from './ui/Magnetic';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll to make navbar more solid
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
    const ids = ['home', 'about', 'skills', 'projects', 'opensource', 'coding', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
  };

  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Open Source', 'Coding', 'Contact'];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isOpen 
          ? 'bg-[#ff2a2a] py-4'
          : isScrolled 
            ? 'bg-transparent py-4' 
            : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Left Side: Logo/Name */}
        <div className="flex items-center">
          <a href="#" className="text-white text-2xl font-black tracking-tight">
            Gungun<span className="text-red-500">.W</span>
          </a>
        </div>

        {/* Center: Desktop Menu Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => {
            const id = link.toLowerCase().replace(/\s+/g, '');
            const isActive = activeSection === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                className={`font-medium relative group transition-colors duration-300 ${
                  isActive ? 'text-red-500' : 'text-white/80 hover:text-white'
                }`}
              >
                {link}
                {/* Underline: full when active, animates on hover otherwise */}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            );
          })}
        </div>

        {/* Right Side: Cmd-K hint + Resume + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={openPalette}
            title="Open command palette"
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-red-500/40 transition-all duration-300 text-xs font-mono cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <kbd className="text-[9px] tracking-wider">Ctrl K</kbd>
          </button>
          <Magnetic strength={0.4}>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-500 transition-all duration-300 shadow-[0_4px_18px_rgba(239,68,68,0.45)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Resume
            </a>
          </Magnetic>
          <Magnetic strength={0.5}>
            <a
              href="#contact"
              className="inline-block px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 backdrop-blur-md"
            >
              Hire Me
            </a>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
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
          isOpen ? 'max-h-96 py-4 opacity-100 bg-[#ff2a2a] shadow-2xl' : 'max-h-0 opacity-0 bg-transparent'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-black font-bold text-lg border-b border-white/20 pb-2 transition-colors"
            >
              {link}
            </a>
          ))}
          <div className="pt-4 pb-2 flex flex-col gap-3">
             <a
               href={`${import.meta.env.BASE_URL}resume.pdf`}
               target="_blank"
               rel="noopener noreferrer"
               onClick={() => setIsOpen(false)}
               className="inline-block px-6 py-3 rounded-full bg-black/20 border border-white/40 text-white font-black hover:bg-black hover:text-white transition-colors w-full text-center"
             >
               Download Resume
             </a>
             <a
               href="#contact"
               onClick={() => setIsOpen(false)}
               className="inline-block px-6 py-3 rounded-full bg-white text-[#ff2a2a] font-black hover:bg-black hover:text-white transition-colors w-full text-center shadow-lg"
             >
               Hire Me
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
