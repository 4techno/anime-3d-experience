import React, { useState } from 'react';
import { Box, Code2, Sparkles, Sliders, Layers, ChevronDown } from 'lucide-react';

export default function Header() {
  const [version] = useState('4.2.0 (Three.js)');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 px-6 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Version */}
        <div className="flex items-center gap-4">
          <a href="#intro" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff2a5f] to-[#00f0ff] p-[1px] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#08080c] rounded-lg flex items-center justify-center">
                <Box className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-xl tracking-tight text-white">ASTRAL</span>
              <span className="text-[#ff2a5f] font-mono text-sm font-bold">.3D</span>
            </div>
          </a>

          {/* Version badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
            <span>{version}</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-1">
          <a
            href="#intro"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition"
          >
            <Sparkles className="w-4 h-4 text-[#ff2a5f]" />
            <span>Overview</span>
          </a>
          <a
            href="#toolbox"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition"
          >
            <Layers className="w-4 h-4 text-[#00f0ff]" />
            <span>Toolbox</span>
          </a>
          <a
            href="#features"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition"
          >
            <Code2 className="w-4 h-4 text-[#ffaa00]" />
            <span>Features</span>
          </a>
          <a
            href="#playground"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition"
          >
            <Sliders className="w-4 h-4 text-[#9d4edd]" />
            <span>3D Studio</span>
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/juliangarnier/anime"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 hover:text-white transition"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href="#playground"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#ff2a5f] to-[#ff477e] hover:brightness-110 text-white text-xs font-semibold tracking-wide shadow-lg shadow-[#ff2a5f]/25 transition"
          >
            <span>Live Demo</span>
          </a>
        </div>

      </div>
    </header>
  );
}
