import React, { useState } from 'react';
import { Layers, Compass, Sparkles, Orbit, Flame, Cpu, Gauge, Move3d } from 'lucide-react';

const tools = [
  {
    title: 'Kinetic 3D Transforms',
    desc: 'Interpolate translation, rotation Euler/quaternions, and non-uniform scaling seamlessly.',
    tag: 'Transforms',
    icon: Move3d,
    color: '#ff2a5f'
  },
  {
    title: 'Instanced Mesh Clusters',
    desc: 'Render and orchestrate 10,000+ objects with a single draw call utilizing GPU instancing.',
    tag: 'WebGL',
    icon: Layers,
    color: '#00f0ff'
  },
  {
    title: 'Custom GLSL Shaders',
    desc: 'Inject fragment and vertex shader passes with uniform bindings updated at 60fps.',
    tag: 'Shaders',
    icon: Flame,
    color: '#ffaa00'
  },
  {
    title: 'Scroll-Observer Sync',
    desc: 'Lock 3D camera travel and object morphing directly to viewport scroll positions.',
    tag: 'Scroll',
    icon: Compass,
    color: '#9d4edd'
  },
  {
    title: 'Physics & Spring Easing',
    desc: 'Realistic mass, tension, and damping curves instead of flat linear interpolations.',
    tag: 'Dynamics',
    icon: Gauge,
    color: '#10b981'
  },
  {
    title: 'Spatial Particle Sim',
    desc: 'Noise-based vector fields and gravitational point attractors in full 3D coordinates.',
    tag: 'Particles',
    icon: Orbit,
    color: '#38bdf8'
  }
];

export default function Toolbox() {
  const [selectedTag, setSelectedTag] = useState('ALL');
  const tags = ['ALL', 'Transforms', 'WebGL', 'Shaders', 'Scroll', 'Dynamics', 'Particles'];

  const filteredTools = selectedTag === 'ALL' 
    ? tools 
    : tools.filter(t => t.tag === selectedTag);

  return (
    <section id="toolbox" className="py-24 px-6 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]"></span>
            <span>The Complete 3D Engine Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Break free from browser limits. <br />
            Animate space and matter.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            A cohesive suite of WebGL utilities, spring physics solvers, and timeline sequencers crafted for extreme visual fidelity.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedTag === tag
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl glass-panel hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Glow accent */}
                <div 
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: tool.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                      style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {tool.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>Latency &lt; 0.5ms</span>
                  <span className="text-white group-hover:translate-x-1 transition-transform">Details →</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
