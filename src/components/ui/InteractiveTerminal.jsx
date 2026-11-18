import React, { useState, useRef, useEffect } from 'react';
import { playBlip } from '../../utils/audio';

const INITIAL_HISTORY = [
  { type: 'system', text: "Gungun Wadhwani DevTerminal v2.6.4 [Type 'help' or click commands below]" },
  { type: 'system', text: "Target: Software Development Engineer | Full-Stack | Competitive Programmer" },
  { type: 'output', text: "Status: Online • B.Tech CSE '28 • LeetCode 510+ Solved • NPTEL Top 5%" }
];

const COMMANDS = {
  help: () => (
    <div className="space-y-1 text-gray-300">
      <div className="text-red-400 font-bold">Available Commands:</div>
      <div><span className="text-white font-mono font-bold">skills</span> - View primary technology matrix & frameworks</div>
      <div><span className="text-white font-mono font-bold">projects</span> - View shipped full-stack & production systems</div>
      <div><span className="text-white font-mono font-bold">stats</span> - View LeetCode, GitHub & academic metrics</div>
      <div><span className="text-white font-mono font-bold">hire</span> - 30-second executive pitch for engineering managers</div>
      <div><span className="text-white font-mono font-bold">contact</span> - Direct phone, email, and LinkedIn links</div>
      <div><span className="text-white font-mono font-bold">clear</span> - Clear terminal session output</div>
    </div>
  ),
  skills: () => (
    <div className="space-y-1.5 text-gray-300 text-xs font-mono">
      <div><span className="text-red-400 font-bold">[Languages]:</span> C++, Python, Java, JavaScript (ES6+), SQL</div>
      <div><span className="text-red-400 font-bold">[Frontend]:</span> React.js, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion</div>
      <div><span className="text-red-400 font-bold">[Backend]:</span> Node.js, Express.js, Firebase, RESTful Architecture, JWT</div>
      <div><span className="text-red-400 font-bold">[Databases]:</span> MongoDB (Mongoose), MySQL</div>
      <div><span className="text-red-400 font-bold">[Design & Tools]:</span> Figma, Docker, Postman, Git/GitHub, Vite</div>
    </div>
  ),
  projects: () => (
    <div className="space-y-2 text-xs font-mono">
      <div className="border-l-2 border-red-500 pl-2">
        <span className="text-white font-bold">1. SafeExit</span> (Next.js, Node.js, Express, MongoDB, QR Verification)
        <div className="text-gray-400">Hostel outing ERP with student/warden/guard RBAC and real-time gate scanner.</div>
      </div>
      <div className="border-l-2 border-red-500 pl-2">
        <span className="text-white font-bold">2. CineSnap</span> (React.js, Tailwind, Clerk Auth, REST APIs)
        <div className="text-gray-400">Real-time movie ticketing platform preventing race condition booking conflicts.</div>
      </div>
      <div className="border-l-2 border-red-500 pl-2">
        <span className="text-white font-bold">3. Velocity</span> (React.js, Firebase, Gemini/OpenAI API)
        <div className="text-gray-400">AI career growth platform — Top 10 National Finalist at GDSC Techsprint Hackathon.</div>
      </div>
    </div>
  ),
  stats: () => (
    <div className="space-y-1.5 text-xs font-mono">
      <div className="text-amber-400 font-bold">🏆 Competitive & Engineering Metrics:</div>
      <div>• LeetCode: <span className="text-white font-bold">510+ Problems</span> (190+ Medium/Hard, 100-Days Badge)</div>
      <div>• NPTEL Social Networks: <span className="text-amber-300 font-bold">Top 5% National Topper</span> (Elite + Silver)</div>
      <div>• GitHub Discipline: <span className="text-white font-bold">750+ Yearly Commits</span> across 33 repositories</div>
      <div>• Academic Record: <span className="text-white font-bold">8.75 / 10.0 CGPA</span> (B.Tech in Computer Science & Engineering)</div>
      <div>• Open Source: <span className="text-emerald-400 font-bold">5+ Merged PRs</span> in GSSoC 2026</div>
    </div>
  ),
  hire: () => (
    <div className="space-y-1.5 text-xs font-mono bg-red-950/30 p-2.5 rounded-lg border border-red-500/20 text-gray-200">
      <div className="text-red-400 font-bold uppercase tracking-wider">Executive Recruiter Summary:</div>
      <div>Gungun combines rigorous algorithmic thinking (510+ LeetCode) with production full-stack engineering (SafeExit live campus deployment) and polished UI/UX craftsmanship.</div>
      <div className="text-emerald-400 font-bold mt-1">Ready to join immediately for SDE Roles & Summer '26 Internships.</div>
    </div>
  ),
  contact: () => (
    <div className="space-y-1 text-xs font-mono text-gray-300">
      <div>Email: <a href="mailto:wadhwagungun09@gmail.com" className="text-red-400 hover:underline">wadhwagungun09@gmail.com</a></div>
      <div>Phone: <a href="tel:+918770958514" className="text-red-400 hover:underline">+91 8770958514</a></div>
      <div>LinkedIn: <a href="https://www.linkedin.com/in/gungun-wadhwani-0903/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">linkedin.com/in/gungun-wadhwani-0903</a></div>
      <div>GitHub: <a href="https://github.com/GungunW-0903" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">github.com/GungunW-0903</a></div>
    </div>
  )
};

const InteractiveTerminal = () => {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = (cmd) => {
    playBlip(750, 0.03);
    const cleaned = cmd.trim().toLowerCase();
    if (!cleaned) return;

    if (cleaned === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const commandFn = COMMANDS[cleaned];
    if (commandFn) {
      setHistory(prev => [
        ...prev,
        { type: 'command', text: `$ ${cleaned}` },
        { type: 'custom', content: commandFn() }
      ]);
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'command', text: `$ ${cleaned}` },
        { type: 'error', text: `Command not found: '${cleaned}'. Type 'help' to see valid commands.` }
      ]);
    }
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  return (
    <div className="neu-card rounded-3xl border border-red-500/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] font-mono text-left">
      {/* Terminal Title Bar */}
      <div className="bg-[#0e0e0e] border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          <span className="text-[11px] text-gray-400 font-bold ml-2">gungun@dev-terminal: ~</span>
        </div>
        <div className="text-[10px] text-gray-500 uppercase tracking-widest hidden sm:block">
          Interactive Bash Session
        </div>
      </div>

      {/* Quick Interactive Command Buttons */}
      <div className="bg-black/40 px-4 py-2 border-b border-white/5 flex flex-wrap gap-2 items-center text-[10px]">
        <span className="text-gray-500 mr-1">Quick Run:</span>
        {['skills', 'projects', 'stats', 'hire', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => runCommand(cmd)}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-300 border border-white/10 transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Output Body */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="p-5 max-h-[320px] overflow-y-auto space-y-2 text-xs text-gray-300 font-mono leading-relaxed bg-[#070707]/90 scrollbar-thin cursor-text"
      >
        {history.map((item, idx) => {
          if (item.type === 'system') {
            return (
              <div key={idx} className="text-gray-500 text-[11px]">
                {item.text}
              </div>
            );
          }
          if (item.type === 'command') {
            return (
              <div key={idx} className="text-red-400 font-bold">
                {item.text}
              </div>
            );
          }
          if (item.type === 'error') {
            return (
              <div key={idx} className="text-rose-400">
                {item.text}
              </div>
            );
          }
          if (item.type === 'custom') {
            return <div key={idx} className="py-1">{item.content}</div>;
          }
          return (
            <div key={idx} className="text-gray-300">
              {item.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Command Prompt Input */}
      <form onSubmit={handleSubmit} className="bg-black/60 border-t border-white/5 px-4 py-3 flex items-center gap-2">
        <span className="text-red-500 font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'skills', 'projects', 'stats', 'hire'..."
          className="w-full bg-transparent text-white focus:outline-none text-xs font-mono placeholder-gray-600"
        />
        <button
          type="submit"
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold uppercase transition-colors shrink-0 cursor-pointer"
        >
          Execute
        </button>
      </form>
    </div>
  );
};

export default InteractiveTerminal;
