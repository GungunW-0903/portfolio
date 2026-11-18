import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import avatarImage from '../assets/about/image.png';
import Magnetic from './ui/Magnetic';
import { playBlip } from '../utils/audio';

// Lazy-load the WebGL scene so the three.js bundle never blocks first paint.
const CrystalScene = lazy(() => import('./three/CrystalScene'));

const ROLES = [
  "Full Stack Software Engineer",
  "DSA Specialist (510+ LeetCode Solved)",
  "B.Tech CSE '28 (CGPA: 8.75)",
  "UI/UX Designer & Systems Architect",
  "GSSoC '26 Open Source Contributor"
];

const Hero = ({ onOpenRecruiter }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [subtitleText, setSubtitleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  const fullText = "Hi, I am Gungun Wadhwani and I am a Full Stack Web Developer and UI/UX Designer.";
  const spokenText = "Hi, I am Gun Gun Wadh-wah-nee and I am a Full Stack Web Developer and UI U-X Designer.";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  // Pre-load voices so they are available immediately
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Role cycler interval
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const startTypingSubtitle = () => {
    setSubtitleText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setSubtitleText(prev => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 55); 
  };

  const getFemaleVoice = () => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.toLowerCase().includes('google us english') || 
       v.name.toLowerCase().includes('female') || 
       v.name.toLowerCase().includes('zira') || 
       v.name.toLowerCase().includes('samantha') || 
       v.name.toLowerCase().includes('hazel') ||
       v.name.toLowerCase().includes('premium'))
    );
  };

  const playVoiceIntro = () => {
    playBlip(800, 0.05);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenText);
      const femaleVoice = getFemaleVoice();

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      utterance.rate = 0.92; 
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setIsPlaying(true);
        startTypingSubtitle();
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setSubtitleText("");
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(true);
      startTypingSubtitle();
      setTimeout(() => {
        setIsPlaying(false);
      }, 4000);
    }
  };

  const stopVoiceIntro = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setSubtitleText("");
  };

  const toggleVoice = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      stopVoiceIntro();
    } else {
      playVoiceIntro();
    }
  };

  const handleRecruiterClick = () => {
    playBlip(880, 0.04);
    if (onOpenRecruiter) {
      onOpenRecruiter();
    } else {
      window.dispatchEvent(new CustomEvent('toggle-recruiter-hub'));
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-[#070707] flex items-center justify-center pt-24 pb-16">
      {/* Red/black landing gradient — deep crimson glow bleeding from top + corners into black */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 75% 55% at 30% -12%, rgba(220, 38, 38, 0.38), transparent 60%),
            radial-gradient(ellipse 65% 60% at 100% 30%, rgba(124, 58, 237, 0.40), transparent 62%),
            radial-gradient(ellipse 55% 50% at -5% 85%, rgba(139, 92, 246, 0.28), transparent 60%),
            radial-gradient(ellipse 50% 45% at 85% 105%, rgba(190, 24, 93, 0.25), transparent 65%),
            linear-gradient(140deg, #1a060d 0%, #12071f 45%, #0a0410 75%, #150822 100%)
          `,
        }}
      />

      {/* Background 3D Crystal Cluster */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Suspense fallback={null}>
          <CrystalScene />
        </Suspense>
      </div>

      {/* Subtle radial glow overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#070707]/60 z-10 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-20 px-6 md:px-12 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content - Name, Dynamic Role Flipper, Metrics & Actions */}
        <div className="flex flex-col items-start text-left max-w-2xl w-full">
          
          {/* Status Badges Row */}
          <div 
            data-aos="fade-right"
            className="flex flex-wrap items-center gap-2.5 mb-6"
          >
            <div className="inline-flex items-center gap-2 border border-red-500/30 rounded-full px-4 py-1.5 text-xs text-red-400 font-bold tracking-widest uppercase bg-red-950/30 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Available for Full-Time & Internships</span>
            </div>
            
            <button
              onClick={handleRecruiterClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-red-950/60 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <span className="text-red-400 font-bold">⚡ 60s Snapshot</span>
            </button>
          </div>
          
          {/* Main Name Heading */}
          <h1 
            data-aos="fade-up"
            className="text-white text-4xl sm:text-6xl md:text-7xl font-black mb-3 tracking-tight leading-[1.05]"
          >
            Gungun <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-violet-400 drop-shadow-[0_0_35px_rgba(239,68,68,0.35)]">
              Wadhwani
            </span>
          </h1>

          {/* Dynamic Animated Role Switcher */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="100"
            className="h-9 sm:h-10 mb-5 flex items-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-gray-200 text-lg sm:text-xl md:text-2xl font-bold tracking-wide flex items-center gap-2"
              >
                <span className="text-red-500 font-black">›</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                  {ROLES[roleIndex]}
                </span>
                <span className="w-1.5 h-5 bg-gradient-to-b from-red-500 to-rose-400 rounded-sm inline-block opacity-80" />
              </motion.div>
            </AnimatePresence>
          </div>

          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg font-medium"
          >
            B.Tech Computer Science student <strong className="text-white">(CGPA: 8.75)</strong> with <strong className="text-white">510+ LeetCode problems</strong> and <strong className="text-white">750+ yearly commits</strong>. Building high-concurrency web platforms, microservices, and design systems.
          </p>

          {/* Quantitative Recruiter Proof Pills */}
          <div 
            data-aos="fade-up"
            data-aos-delay="250"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mb-8"
          >
            <div className="neu-inset px-3 py-2 rounded-xl border border-white/5">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">LeetCode Solved</div>
              <div className="text-white font-black text-sm font-mono mt-0.5">510+</div>
            </div>
            <div className="neu-inset px-3 py-2 rounded-xl border border-white/5">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Academic CGPA</div>
              <div className="text-red-400 font-black text-sm font-mono mt-0.5">8.75 / 10</div>
            </div>
            <div className="neu-inset px-3 py-2 rounded-xl border border-white/5">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">GitHub Commits</div>
              <div className="text-white font-black text-sm font-mono mt-0.5">750+</div>
            </div>
            <div className="neu-inset px-3 py-2 rounded-xl border border-white/5">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">NPTEL Rank</div>
              <div className="text-amber-400 font-black text-sm font-mono mt-0.5">Top 5% India</div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="300"
            className="flex items-center gap-5 mb-8"
          >
            <a 
              href="https://github.com/GungunW-0903" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              title="GitHub Profile (33 Repositories)"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/gungun-wadhwani-0903/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#0A66C2] transition-colors duration-300 hover:scale-110 transform"
              title="LinkedIn Profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://leetcode.com/u/lkde5nkwCE/"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#FFA116] transition-colors duration-300 hover:scale-110 transform"
              title="LeetCode (510+ Solved)"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.483 0a1.374 1.374 0 00-.961.414l-9.8 9.8a1.374 1.374 0 000 1.94l9.8 9.8a1.374 1.374 0 001.94 0l9.8-9.8a1.374 1.374 0 000-1.94l-9.8-9.8a1.374 1.374 0 00-.979-.414zm0 2.748l8.4 8.4-8.4 8.4-8.4-8.4 8.4-8.4zm-1.4 3.5v2.8h2.8v-2.8h-2.8z"/>
              </svg>
            </a>
            <a 
              href="https://www.credly.com/users/gungun-wadhwani"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform"
              title="Credly Verified Badges"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </a>
          </div>

          {/* CTA Buttons */}
          <div 
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-row flex-wrap items-center gap-3.5 w-full"
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={() => playBlip(800, 0.04)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold hover:from-red-500 hover:to-rose-500 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(239,68,68,0.4)] text-sm"
              >
                <span>View Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playBlip(820, 0.04)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-red-500/50 text-red-400 font-bold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 text-sm hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Resume
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={handleRecruiterClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-red-950/40 border border-red-500/30 text-white font-bold text-sm hover:bg-red-900/60 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:scale-105"
              >
                <span>⚡ Recruiter Hub</span>
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={() => playBlip(850, 0.04)}
                className="inline-block px-5 py-3 rounded-full bg-transparent border border-gray-700 text-gray-300 font-bold text-sm hover:bg-white/5 hover:text-white hover:border-gray-500 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right Side - Interactive Voice Avatar Deck */}
        <div 
          data-aos="zoom-in"
          data-aos-delay="200"
          className="flex flex-col items-center justify-center shrink-0 w-full max-w-[420px] glass-card rounded-[2.5rem] p-7 shadow-[0_20px_50px_rgba(239,68,68,0.12)] relative border-white/10 hover:border-red-500/40 transition-all duration-500"
        >
          {/* Top Plate Header */}
          <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]' : 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]'}`} />
              {isPlaying ? "Transmitting Audio Greeting" : "Verified Identity Plate"}
            </span>
            <span className="text-[9px] font-mono text-gray-500 bg-black/40 px-2 py-0.5 rounded border border-white/5">
              B.Tech CSE '28
            </span>
          </div>

          {/* Pulsing visualizer circle around avatar */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-5 flex justify-center items-center">
            
            {/* Visualizer background wave */}
            <div className={`absolute inset-0 rounded-full border-2 border-red-500/40 transition-all duration-500 ${
              isPlaying ? 'scale-110 opacity-60' : 'scale-100 opacity-20'
            }`} />

            {/* Glowing neon border */}
            <div className={`absolute inset-1 rounded-full border-2 border-red-500 flex justify-center items-center transition-shadow duration-500 ${
              isPlaying ? 'shadow-[0_0_35px_rgba(239,68,68,0.7)]' : 'shadow-[0_0_15px_rgba(239,68,68,0.2)]'
            }`}>
              
              {/* Profile Image container */}
              <div className="w-[220px] h-[220px] sm:w-[245px] sm:h-[245px] rounded-full overflow-hidden border-4 border-black bg-gray-900">
                <img 
                  src={avatarImage} 
                  alt="Gungun Wadhwani" 
                  className="w-full h-full object-cover select-none"
                />
              </div>
            </div>

            {/* Circular Voice Play Button Overlaid */}
            <button 
              onClick={toggleVoice}
              className="absolute bottom-1 right-1 w-13 h-13 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg border-2 border-black transform transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer"
              title={isPlaying ? "Stop Voice Intro" : "Play Voice Greeting"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Equalizer Waveform Bars when voice is playing */}
          {isPlaying && (
            <div className="flex items-center justify-center gap-1.5 mb-3 h-5">
              {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.85, 0.45].map((scale, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [scale * 0.3, scale * 1.5, scale * 0.4] }}
                  transition={{ repeat: Infinity, duration: 0.6 + i * 0.08, ease: 'easeInOut' }}
                  className="w-1 bg-gradient-to-t from-red-600 to-rose-400 rounded-full h-full"
                />
              ))}
            </div>
          )}

          {/* Subtitle / Console HUD */}
          <div className="w-full min-h-[58px] bg-black/60 border border-gray-800 rounded-xl p-3.5 font-mono text-[11px] leading-relaxed text-gray-400 flex flex-col justify-start items-start text-left">
            <div className="flex items-center justify-between w-full mb-1 text-[9px] text-red-500/90 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]' : 'bg-gray-600'}`} />
                {isPlaying ? "Transmitting Audio" : "Voice Console Ready"}
              </span>
              <span className="text-gray-500">ENG-US</span>
            </div>
            
            <p className="text-gray-300 font-medium">
              {subtitleText || "Click the red button above to listen to my voice introduction greeting."}
              {isPlaying && <span className="text-red-500 font-black">_</span>}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
