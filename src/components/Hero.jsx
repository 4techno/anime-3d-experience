import React, { useState } from 'react';
import { Copy, Check, ArrowDown, Activity, Cpu, Zap, Eye } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

export default function Hero({ onExplore }) {
  const [copied, setCopied] = useState(false);
  const [activeGeom, setActiveGeom] = useState('torusKnot');

  const copyCommand = () => {
    navigator.clipboard.writeText('npm i @astral/three-engine');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="intro" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden grid-bg">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#ff2a5f]/15 to-[#00f0ff]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Kinetic Typography & Actions */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff2a5f] animate-ping" />
            <span>WebGL 2.0 + Three.js Orchestration</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            All-in-one <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
              animation
            </span> <br />
            engine<span className="text-[#ff2a5f] animate-pulse">.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-neutral-400 font-normal max-w-lg mb-8 leading-relaxed">
            A fast, versatile, and high-performance WebGL & Three.js animation framework engineered to craft next-generation spatial web experiences.
          </p>

          {/* Action Row: NPM install + Explore button */}
          <div className="flex flex-wrap items-center gap-4 w-full mb-10">
            {/* Copyable NPM command */}
            <div 
              onClick={copyCommand}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 transition-all cursor-pointer group shadow-inner"
            >
              <span className="text-[#00f0ff] font-mono text-sm">$</span>
              <code className="text-sm font-mono text-neutral-200 group-hover:text-white">
                npm i @astral/three-engine
              </code>
              <button 
                type="button"
                className="ml-2 text-neutral-400 group-hover:text-white transition"
                title="Copy installation command"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <a
              href="#features"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition shadow-lg shadow-white/10"
            >
              <span>Explore Features</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>

          {/* Geometry Quick-Switchers */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10 w-full">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider mr-2">Morph Shape:</span>
            {[
              { id: 'torusKnot', label: 'Torus' },
              { id: 'icosahedron', label: 'Lattice' },
              { id: 'waveGrid', label: 'Wave Plane' },
              { id: 'dodecahedron', label: 'Polyhedron' }
            ].map(g => (
              <button
                key={g.id}
                onClick={() => setActiveGeom(g.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition ${
                  activeGeom === g.id
                    ? 'bg-[#ff2a5f] text-white font-bold'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Interactive 3D Canvas Stage */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          
          <div className="relative w-full aspect-square max-w-[540px] rounded-3xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl">
            <div className="w-full h-full bg-[#08080c]/90 rounded-[22px] overflow-hidden relative border border-white/10 flex flex-col justify-between">
              
              {/* Canvas Status bar */}
              <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-neutral-400">stage://render_viewport</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    60.0 FPS
                  </span>
                </div>
              </div>

              {/* Three.js Interactive Component */}
              <div className="relative flex-1 w-full min-h-[360px]">
                <ThreeCanvas
                  geometryType={activeGeom}
                  wireframe={true}
                  speed={1.0}
                  particleCount={1800}
                  primaryColor="#ff2a5f"
                  secondaryColor="#00f0ff"
                  interactive={true}
                  className="w-full h-full"
                />
              </div>

              {/* Canvas Bottom telemetry metrics */}
              <div className="p-3 bg-black/60 backdrop-blur border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400 z-20">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>Vertices: 7,680</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#ff2a5f]" />
                  <span>GPU Load: 12%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#ffaa00]" />
                  <span>Draw Calls: 18</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
