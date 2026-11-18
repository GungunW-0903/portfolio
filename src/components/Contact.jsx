import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from './ui/Magnetic';
import { playBlip, playSuccessChime } from '../utils/audio';

const QUICK_TOPICS = [
  { id: 'sde', label: '💼 Full-Time SDE Role', template: 'Hi Gungun, we reviewed your engineering portfolio and would love to discuss a full-time Software Engineering opportunity with our team...' },
  { id: 'intern', label: '⚡ Summer Internship', template: 'Hi Gungun, we are looking for high-caliber engineering interns and would love to connect regarding a Summer 2026 internship role...' },
  { id: 'collab', label: '🚀 Project Collaboration', template: 'Hi Gungun, I came across your SafeExit / CineSnap projects and wanted to discuss a collaborative software build...' },
  { id: 'chat', label: '☕ Tech Discussion', template: 'Hi Gungun, loved your work and open-source contributions. Would love to connect and chat about tech!' }
];

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "35%"]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    topic: '',
    permission: true
  });
  const [notification, setNotification] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const selectQuickTopic = (topic) => {
    playBlip(750, 0.03);
    setFormData(prev => ({
      ...prev,
      topic: topic.label,
      message: prev.message.trim() ? prev.message : topic.template
    }));
  };

  const handleCopyEmail = () => {
    playSuccessChime();
    navigator.clipboard.writeText("wadhwagungun09@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() && !formData.message.trim()) {
      setNotification({
        type: 'error',
        title: 'Missing Details',
        text: 'Please enter your email and message so I can respond.'
      });
      return;
    }

    setIsSubmitting(true);
    playSuccessChime();
    const name = `${formData.firstName} ${formData.lastName}`.trim() || 'Recruiter / Collaborator';
    const topicText = formData.topic ? ` [${formData.topic}]` : '';
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}${topicText}`);
    const body = encodeURIComponent(
      `Hello Gungun,\n\nName: ${name}\nEmail: ${formData.email}\nTopic: ${formData.topic || 'General Inquiry'}\n\nMessage:\n${formData.message}\n\n---\nSent via Gungun Wadhwani's Portfolio Contact Portal.`
    );

    // Launch native mail client
    window.location.href = `mailto:wadhwagungun09@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setNotification({
        type: 'success',
        title: 'Dispatch Prepared & Mail Client Opened!',
        text: 'Your email draft has been generated. If your desktop email client did not pop up, click "Copy Direct Email" below to write anytime.'
      });
    }, 400);

    // Reset fields
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      topic: '',
      permission: true
    });
  };

  return (
    <section 
      ref={ref} 
      id="contact" 
      className="w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-red-950/40 bg-[linear-gradient(170deg,#090409_0%,#090909_30%,#130508_70%,#120824_100%)]"
    >
      {/* Background Animated Neon Glows */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] rounded-full bg-red-600/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-violet-700/12 blur-[150px] pointer-events-none" />

      {/* Huge Background Editorial Parallax Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-12 md:pt-8"
      >
        <h1 
          className="text-[26vw] leading-[0.72] font-black uppercase tracking-tighter select-none scale-y-[1.5] origin-top text-transparent opacity-90 transition-all duration-700"
          style={{ 
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.12)",
            textShadow: "0 0 60px rgba(239, 68, 68, 0.08)"
          }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div 
          data-aos="fade-up"
          className="relative w-full md:w-[88%] lg:w-[82%] p-8 sm:p-12 md:p-16 text-white flex flex-col justify-between rounded-tl-[2.5rem] md:rounded-tl-[3.5rem] bg-gradient-to-br from-[#ea2b2b] via-[#cf1c1c] to-[#991111] shadow-[0_-25px_80px_rgba(239,68,68,0.35)] border-t border-l border-white/25 backdrop-blur-2xl overflow-hidden"
        >
          {/* Subtle Cyberpunk diagonal shine background */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-black/25 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar: Section Title + Direct Channels */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/20">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] uppercase text-white/90 mb-2">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                Direct Communication Portal
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Let's Build Something Extraordinary.
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-white/80 mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-300" />
                <span>India • IST (UTC+5:30) • Active Status • Fast Response</span>
              </div>
            </div>

            {/* Direct Channel Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/30 hover:bg-black/50 border border-white/30 text-white text-xs font-mono font-bold transition-all cursor-pointer backdrop-blur-md shadow-inner hover:scale-105 active:scale-95"
                title="Copy direct email address"
              >
                <svg className="w-3.5 h-3.5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[11px]">wadhwagungun09@gmail.com</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                  copied ? 'bg-green-500 text-white' : 'bg-white/20 text-white'
                }`}>
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>

              <a
                href="https://www.linkedin.com/in/gungun-wadhwani-0903/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playBlip(800, 0.03)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-black/25 hover:bg-black/45 border border-white/25 text-white text-xs font-bold transition-all hover:scale-105"
                title="Open LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://wa.me/918770958514?text=Hi%20Gungun,%20I%20reviewed%20your%20portfolio%20and%20would%20love%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playBlip(800, 0.03)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-black/25 hover:bg-black/45 border border-white/25 text-white text-xs font-bold transition-all hover:scale-105"
                title="WhatsApp Direct Chat"
              >
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+918770958514"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-black/25 hover:bg-black/45 border border-white/25 text-white text-xs font-bold transition-all hover:scale-105"
                title="Direct Phone"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 8770958514</span>
              </a>
            </div>
          </div>

          {/* Quick Recruiter Intent Chips */}
          <div className="relative z-10 mb-8">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-3 flex items-center gap-2">
              <span>Quick Select Inquiry Purpose:</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {QUICK_TOPICS.map((topic) => {
                const isSelected = formData.topic === topic.label;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => selectQuickTopic(topic)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected 
                        ? 'bg-white text-[#d11c1c] shadow-[0_4px_16px_rgba(0,0,0,0.3)] scale-105' 
                        : 'bg-black/20 hover:bg-black/40 text-white/90 border border-white/20'
                    }`}
                  >
                    <span>{topic.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Notification Banner */}
          {notification && (
            <div className={`p-5 rounded-2xl mb-8 border flex items-start justify-between gap-4 animate-fade-in ${
              notification.type === 'success' 
                ? 'bg-black/50 border-white/50 text-white shadow-2xl' 
                : 'bg-black/60 border-yellow-300 text-yellow-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  {notification.type === 'success' ? '✓' : 'ℹ'}
                </div>
                <div>
                  <div className="font-bold text-sm tracking-wide">
                    {notification.title}
                  </div>
                  <div className="text-xs text-white/90 mt-1 leading-relaxed">
                    {notification.text}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotification(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 w-full">
              
              {/* Left Column - User Credentials */}
              <div className="flex flex-col gap-8">
                <div className="relative group">
                  <label htmlFor="firstName" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-white/80 mb-1">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Sarah" 
                    className="w-full bg-black/15 border-b-2 border-white/40 px-3 py-2.5 text-base focus:outline-none focus:border-white focus:bg-black/25 transition-all placeholder-white/50 font-medium rounded-t-lg"
                  />
                </div>

                <div className="relative group">
                  <label htmlFor="lastName" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-white/80 mb-1">
                    Last Name / Organization
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Connor (Google / Microsoft / Startup)" 
                    className="w-full bg-black/15 border-b-2 border-white/40 px-3 py-2.5 text-base focus:outline-none focus:border-white focus:bg-black/25 transition-all placeholder-white/50 font-medium rounded-t-lg"
                  />
                </div>

                <div className="relative group">
                  <label htmlFor="email" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-white/80 mb-1">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. recruiter@company.com" 
                    className="w-full bg-black/15 border-b-2 border-white/40 px-3 py-2.5 text-base focus:outline-none focus:border-white focus:bg-black/25 transition-all placeholder-white/50 font-medium rounded-t-lg"
                  />
                </div>
              </div>

              {/* Right Column - Message Body */}
              <div className="flex flex-col">
                <div className="relative h-full flex flex-col group">
                  <label htmlFor="message" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-white/80 mb-1">
                    Message / Opportunity Scope *
                  </label>
                  <textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your team, project, or role..." 
                    className="w-full h-full min-h-[160px] bg-black/15 border-b-2 border-white/40 p-3 text-base focus:outline-none focus:border-white focus:bg-black/25 transition-all placeholder-white/50 font-medium resize-none rounded-t-lg leading-relaxed"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-3 text-xs font-medium text-white/90">
                <input 
                  type="checkbox" 
                  id="permission" 
                  checked={formData.permission}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/40 bg-transparent text-white focus:ring-0 cursor-pointer" 
                  style={{ accentColor: "white" }}
                />
                <label htmlFor="permission" className="cursor-pointer select-none">
                  I consent to receiving a direct response regarding this professional opportunity.
                </label>
              </div>

              <Magnetic strength={0.4}>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-10 py-4 rounded-full bg-white text-[#d11c1c] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] cursor-pointer group whitespace-nowrap transform hover:scale-105 active:scale-95"
                >
                  <span>{isSubmitting ? 'Preparing Draft...' : 'Send Message'}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Magnetic>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
