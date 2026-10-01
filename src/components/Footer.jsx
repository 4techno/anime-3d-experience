import React, { useState } from 'react';
import { Box, Send, Check, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message || 'Subscribed successfully!' });
        setEmail('');
      } else {
        setStatus({ type: 'error', msg: data.error || 'Subscription failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Unable to reach backend service.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#040406] py-16 px-6 text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        
        {/* Brand column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#ff2a5f] to-[#00f0ff] p-[1px]">
              <div className="w-full h-full bg-[#08080c] rounded-lg flex items-center justify-center">
                <Box className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">ASTRAL<span className="text-[#ff2a5f]">.3D</span></span>
          </div>
          <p className="text-sm max-w-sm leading-relaxed text-neutral-400">
            A next-generation Three.js and WebGL animation architecture inspired by Anime.js precision and aesthetic perfection.
          </p>

          {/* Waitlist form */}
          <form onSubmit={handleSubscribe} className="pt-2">
            <div className="text-xs font-mono uppercase text-white/70 mb-2">Join the Private Beta Engine</div>
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="developer@matrix.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff2a5f] transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>{loading ? 'Joining...' : 'Join'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {status && (
              <p className={`mt-2 text-xs font-mono ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                {status.msg}
              </p>
            )}
          </form>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-mono uppercase text-white tracking-wider">Engine</div>
          <ul className="space-y-2 text-xs">
            <li><a href="#intro" className="hover:text-white transition">Overview</a></li>
            <li><a href="#toolbox" className="hover:text-white transition">Toolbox</a></li>
            <li><a href="#features" className="hover:text-white transition">Scrollytelling</a></li>
            <li><a href="#playground" className="hover:text-white transition">3D Playground</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-mono uppercase text-white tracking-wider">Resources</div>
          <ul className="space-y-2 text-xs">
            <li><a href="https://animejs.com/documentation" target="_blank" rel="noreferrer" className="hover:text-white transition">Anime.js Docs</a></li>
            <li><a href="https://threejs.org" target="_blank" rel="noreferrer" className="hover:text-white transition">Three.js Guides</a></li>
            <li><a href="https://github.com/juliangarnier/anime" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub Repo</a></li>
            <li><a href="https://codepen.io" target="_blank" rel="noreferrer" className="hover:text-white transition">CodePen Demos</a></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-mono uppercase text-white tracking-wider">Telemetry</div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-1.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">Target FPS:</span>
              <span className="text-emerald-400">60 FPS Locked</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">API Gateway:</span>
              <span className="text-white">Express v4 / Node</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Renderer:</span>
              <span className="text-white">Three.js r174 WebGL2</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
        <div>
          Engineered with precision for WebGL, Three.js, and modern creative web standards.
        </div>
        <div className="flex items-center gap-1 mt-4 sm:mt-0">
          <span>Tribute to</span>
          <a href="https://animejs.com" target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white underline">animejs.com</a>
        </div>
      </div>
    </footer>
  );
}
