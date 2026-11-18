import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import CommandPalette from './components/ui/CommandPalette';
import RecruiterHub from './components/ui/RecruiterHub';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import CodingProfiles from './components/CodingProfiles';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => {
      setIsRecruiterOpen(prev => !prev);
    };
    window.addEventListener('toggle-recruiter-hub', handleToggle);
    return () => window.removeEventListener('toggle-recruiter-hub', handleToggle);
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <RecruiterHub 
        isOpen={isRecruiterOpen} 
        onClose={() => setIsRecruiterOpen(false)} 
      />

      <Navbar onOpenRecruiter={() => setIsRecruiterOpen(true)} />
      <Hero onOpenRecruiter={() => setIsRecruiterOpen(true)} />
      <About />
      <Skills />
      <Projects />
      <OpenSource />
      <CodingProfiles />
      <Certificates />
      <Contact />
      <Footer />

      {/* Floating Recruiter Shortcut Trigger Pill in bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => setIsRecruiterOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/85 hover:bg-red-950/90 border border-red-500/40 text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(239,68,68,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Open Recruiter Snapshot (Shortcut: Press 'R')"
        >
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"></span>
          <span className="text-white group-hover:text-red-300 transition-colors">
            Recruiter Mode
          </span>
          <kbd className="text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-gray-400 group-hover:text-white">
            R
          </kbd>
        </button>
      </div>
    </>
  );
}

export default App;
