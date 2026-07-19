import React, { useEffect, useState, Suspense, lazy } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import avatarImage from '../assets/about/image.png';
import Magnetic from './ui/Magnetic';

// Lazy-load the WebGL scene so the three.js bundle never blocks first paint.
const CrystalScene = lazy(() => import('./three/CrystalScene'));

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [subtitleText, setSubtitleText] = useState("");
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

  const playVoiceIntro = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenText);
      const voices = window.speechSynthesis.getVoices();
      
      const femaleVoice = voices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.toLowerCase().includes('google us english') || 
         v.name.toLowerCase().includes('female') || 
         v.name.toLowerCase().includes('zira') || 
         v.name.toLowerCase().includes('samantha') || 
         v.name.toLowerCase().includes('hazel') ||
         v.name.toLowerCase().includes('premium'))
      );

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

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[#070707] flex items-center justify-center">
      {/* Red/black landing gradient — deep crimson glow bleeding from the top + corners into black */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 75% 55% at 30% -12%, rgba(220, 38, 38, 0.35), transparent 60%),
            radial-gradient(ellipse 65% 60% at 100% 30%, rgba(124, 58, 237, 0.38), transparent 62%),
            radial-gradient(ellipse 55% 50% at -5% 85%, rgba(139, 92, 246, 0.25), transparent 60%),
            radial-gradient(ellipse 50% 45% at 85% 105%, rgba(190, 24, 93, 0.22), transparent 65%),
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

      {/* Subtle radial glow overlay — fades crystal edges, kept light so the duotone shows through */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#070707]/60 z-10 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-20 px-6 md:px-12 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12 pt-16">
        
        {/* Left Content - Name & Details */}
        <div className="flex flex-col items-start text-left max-w-2xl w-full">
          <div 
            data-aos="fade-right"
            className="inline-block border border-red-500/30 rounded-full px-4 py-1.5 text-xs text-red-500 font-bold mb-6 tracking-widest uppercase bg-red-950/20 backdrop-blur-sm"
          >
            Available for Collaboration
          </div>
          
          <h1 
            data-aos="fade-up"
            className="text-white text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tight leading-[1.05]"
          >
            Gungun <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-violet-400">Wadhwani</span>
          </h1>

          <h2 
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-gray-300 text-lg md:text-xl font-bold mb-6 tracking-wide"
          >
            DSA Enthusiast <span className="text-red-500">|</span> Full Stack Developer <span className="text-red-500">|</span> UI/UX Designer <span className="text-red-500">|</span> Open Source
          </h2>

          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md font-medium"
          >
            Building high-fidelity web applications, crafting clean scaling APIs, designing elegant interfaces, and contributing to open-source systems.
          </p>

          {/* Social Profiles Grid */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="300"
            className="flex items-center gap-6 mb-8"
          >
            <a 
              href="https://github.com/GungunW-0903" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
              title="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/gungun-wadhwani-0903/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
              title="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://leetcode.com/u/lkde5nkwCE/"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
              title="LeetCode"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.483 0a1.374 1.374 0 00-.961.414l-9.8 9.8a1.374 1.374 0 000 1.94l9.8 9.8a1.374 1.374 0 001.94 0l9.8-9.8a1.374 1.374 0 000-1.94l-9.8-9.8a1.374 1.374 0 00-.979-.414zm0 2.748l8.4 8.4-8.4 8.4-8.4-8.4 8.4-8.4zm-1.4 3.5v2.8h2.8v-2.8h-2.8z"/>
              </svg>
            </a>
          </div>

          {/* CTA Buttons */}
          <div 
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-row flex-wrap items-center gap-4 w-full"
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-block px-6 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-500 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(239,68,68,0.4)]"
              >
                View Projects
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-red-500/50 text-red-400 font-bold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Resume
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-block px-6 py-3 rounded-full bg-transparent border border-gray-600 text-gray-300 font-bold hover:bg-white/5 hover:text-white transition-all duration-300"
              >
                Get In Touch
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right Side - Interactive voice player avatar */}
        <div 
          data-aos="zoom-in"
          data-aos-delay="200"
          className="flex flex-col items-center justify-center shrink-0 w-full max-w-[420px] glass-card rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(239,68,68,0.1)] relative border-white/10 hover:border-red-500/40 transition-all duration-500 animate-float"
        >
          {/* Pulsing visualizer circle around avatar */}
          <div className="relative w-72 h-72 mb-6 flex justify-center items-center">
            
            {/* Visualizer background wave */}
            <div className={`absolute inset-0 rounded-full border-2 border-red-500/40 transition-all duration-500 ${
              isPlaying ? 'scale-110 animate-ping' : 'scale-100 opacity-20'
            }`} />

            {/* Glowing neon border */}
            <div className={`absolute inset-1 rounded-full border-2 border-red-500 flex justify-center items-center transition-shadow duration-500 ${
              isPlaying ? 'shadow-[0_0_35px_rgba(239,68,68,0.7)]' : 'shadow-[0_0_15px_rgba(239,68,68,0.2)]'
            }`}>
              
              {/* Profile Image container */}
              <div className="w-[250px] h-[250px] rounded-full overflow-hidden border-4 border-black bg-gray-900">
                <img 
                  src={avatarImage} 
                  alt="Gungun Wadhwani" 
                  className="w-full h-full object-cover select-none"
                />
              </div>
            </div>

            {/* Circular Play Button Overlaid */}
            <button 
              onClick={toggleVoice}
              className="absolute bottom-2 right-2 w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg border-2 border-black transform transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer"
              title={isPlaying ? "Mute Reel" : "Play Voice Reel"}
            >
              {isPlaying ? (
                // Pause/Stop Icon
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                // Play Icon
                <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Subtitle / Console HUD */}
          <div className="w-full min-h-[64px] bg-black/60 border border-gray-800 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-gray-400 flex flex-col justify-start items-start text-left">
            <div className="flex items-center gap-2 mb-1.5 text-[9px] text-red-500/80 font-bold uppercase tracking-widest">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
              {isPlaying ? "Transmitting Audio" : "Voice Console Ready"}
            </div>
            
            <p className="text-gray-300 font-medium">
              {subtitleText || "Click the play button to listen to my voice greeting and introduction."}
              {isPlaying && <span className="animate-pulse">_</span>}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
