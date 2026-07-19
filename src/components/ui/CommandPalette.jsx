import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Linear/Raycast-style command palette. Open with Ctrl/Cmd+K (or the navbar hint).
 * Fuzzy-filters actions; Enter runs the highlighted one; Esc closes.
 */
const ACTIONS = [
  { id: 'home', label: 'Go to Home', hint: 'Section', run: () => scrollToId('home') },
  { id: 'about', label: 'Go to About', hint: 'Section', run: () => scrollToId('about') },
  { id: 'skills', label: 'Go to Skills', hint: 'Section', run: () => scrollToId('skills') },
  { id: 'projects', label: 'Go to Projects', hint: 'Section', run: () => scrollToId('projects') },
  { id: 'opensource', label: 'Go to Open Source', hint: 'Section', run: () => scrollToId('opensource') },
  { id: 'coding', label: 'Go to Coding Profiles', hint: 'Section', run: () => scrollToId('coding') },
  { id: 'contact', label: 'Go to Contact', hint: 'Section', run: () => scrollToId('contact') },
  { id: 'resume', label: 'Download Resume', hint: 'PDF', run: () => window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank') },
  { id: 'email', label: 'Copy Email Address', hint: 'wadhwagungun09@gmail.com', run: () => navigator.clipboard?.writeText('wadhwagungun09@gmail.com') },
  { id: 'github', label: 'Open GitHub Profile', hint: 'External', run: () => window.open('https://github.com/GungunW-0903', '_blank') },
  { id: 'linkedin', label: 'Open LinkedIn', hint: 'External', run: () => window.open('https://www.linkedin.com/in/gungun-wadhwani-0903/', '_blank') },
  { id: 'leetcode', label: 'Open LeetCode', hint: 'External', run: () => window.open('https://leetcode.com/u/lkde5nkwCE/', '_blank') },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const filtered = ACTIONS.filter((a) =>
    (a.label + ' ' + a.hint).toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
    setCopied(false);
  }, []);

  const runAction = useCallback((action) => {
    action.run();
    if (action.id === 'email') {
      setCopied(true);
      setTimeout(close, 700);
    } else {
      close();
    }
  }, [close]);

  // Global shortcut: Ctrl/Cmd+K toggles, Esc closes
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((v) => Math.min(v + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((v) => Math.max(v - 1, 0));
    } else if (e.key === 'Enter' && filtered[active]) {
      runAction(filtered[active]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100002] flex items-start justify-center pt-[18vh] px-4 bg-black/70 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg neu-card rounded-2xl border border-red-500/15 overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.8)]"
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 border-b border-white/5">
              <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search..."
                className="w-full bg-transparent py-4 text-sm text-white placeholder-gray-500 focus:outline-none font-medium"
              />
              <kbd className="shrink-0 text-[9px] font-mono text-gray-500 border border-gray-800 rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[300px] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-xs text-gray-500 font-medium">No matching commands</div>
              )}
              {filtered.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => runAction(a)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors duration-100 ${
                    i === active ? 'bg-red-600/15 text-white' : 'text-gray-400'
                  }`}
                >
                  <span className="font-semibold">
                    {a.id === 'email' && copied ? '✓ Copied!' : a.label}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${i === active ? 'text-red-400' : 'text-gray-600'}`}>
                    {a.hint}
                  </span>
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/5 text-[9px] font-mono text-gray-600 uppercase tracking-wider">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span className="ml-auto text-red-500/70">Gungun.W Command</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
