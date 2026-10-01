import React, { useState } from 'react';
import { Sliders, Play, RotateCcw, Share2, Sparkles, Check, CloudUpload } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

const paletteOptions = [
  { primary: '#ff2a5f', secondary: '#00f0ff', name: 'Cyber Neon' },
  { primary: '#00f0ff', secondary: '#9d4edd', name: 'Electric Violet' },
  { primary: '#ffaa00', secondary: '#ff2a5f', name: 'Solar Flare' },
  { primary: '#10b981', secondary: '#00f0ff', name: 'Emerald Flux' },
  { primary: '#ffffff', secondary: '#ff2a5f', name: 'Monochrome Core' },
];

export default function Playground({ onPresetSaved }) {
  const [geometry, setGeometry] = useState('torusKnot');
  const [wireframe, setWireframe] = useState(true);
  const [speed, setSpeed] = useState(1.2);
  const [particleCount, setParticleCount] = useState(1800);
  const [primaryColor, setPrimaryColor] = useState('#ff2a5f');
  const [secondaryColor, setSecondaryColor] = useState('#00f0ff');
  const [presetName, setPresetName] = useState('My Custom Geometry');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleReset = () => {
    setGeometry('torusKnot');
    setWireframe(true);
    setSpeed(1.2);
    setParticleCount(1800);
    setPrimaryColor('#ff2a5f');
    setSecondaryColor('#00f0ff');
  };

  const handleSaveToBackend = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: presetName || 'Custom Astral Preset',
          geometry,
          wireframe,
          speed,
          particleCount,
          primaryColor,
          secondaryColor,
          description: `Generated via 3D Studio with ${geometry} & ${particleCount} particles.`
        })
      });
      if (res.ok) {
        setSavedSuccess(true);
        if (onPresetSaved) onPresetSaved();
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save preset to backend:', err);
    } finally {
      setSaving(false);
    }
  };

  const generatedCode = `// Generated Three.js & Astral Configuration
import { AstralScene } from '@astral/three-engine';

const scene = new AstralScene({
  target: '#canvas-container',
  geometry: '${geometry}',
  wireframe: ${wireframe},
  speed: ${speed},
  particles: ${particleCount},
  palette: {
    primary: '${primaryColor}',
    secondary: '${secondaryColor}'
  },
  physics: {
    springDamping: 14,
    stiffness: 90
  }
});

scene.play();`;

  return (
    <section id="playground" className="py-24 px-6 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-[#9d4edd] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9d4edd]"></span>
              <span>Live 3D WebGL Studio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              Interactive 3D Playground
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Fine-tune geometry vertices, particle densities, and color spectrums in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSaveToBackend}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9d4edd] to-[#ff2a5f] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#9d4edd]/20 transition disabled:opacity-50"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved to Backend!</span>
                </>
              ) : (
                <>
                  <CloudUpload className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save to Backend'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
            
            {/* Preset Name */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Preset Title
              </label>
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#9d4edd] transition"
              />
            </div>

            {/* Geometry Selector */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Geometry Primitive
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'icosahedron', label: 'Icosahedron' },
                  { id: 'waveGrid', label: 'Wave Plane' },
                  { id: 'dodecahedron', label: 'Dodecahedron' },
                  { id: 'sphere', label: 'Sphere Grid' }
                ].map(g => (
                  <button
                    key={g.id}
                    onClick={() => setGeometry(g.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition ${
                      geometry === g.id
                        ? 'bg-[#9d4edd] text-white font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wireframe toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-xs font-mono text-neutral-300">Wireframe Mesh</span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  wireframe ? 'bg-[#ff2a5f]' : 'bg-white/10'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    wireframe ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>Angular Speed</span>
                <span className="text-white font-bold">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-[#ff2a5f] cursor-pointer"
              />
            </div>

            {/* Particle Density Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>Particle Density</span>
                <span className="text-white font-bold">{particleCount}</span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="100"
                value={particleCount}
                onChange={(e) => setParticleCount(parseInt(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
            </div>

            {/* Color Palette Palettes */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Palette Themes
              </label>
              <div className="space-y-2">
                {paletteOptions.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrimaryColor(p.primary);
                      setSecondaryColor(p.secondary);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.primary }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.secondary }} />
                      <span className="text-xs font-mono text-white/80">{p.name}</span>
                    </div>
                    {primaryColor === p.primary && secondaryColor === p.secondary && (
                      <span className="text-[10px] font-mono text-[#00f0ff]">ACTIVE</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Center 3D Preview (Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="h-[480px] rounded-3xl glass-panel border border-white/10 overflow-hidden relative flex flex-col">
              
              <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9d4edd] animate-pulse" />
                  <span className="text-xs font-mono text-white font-medium">3D Viewport — Real-Time Render</span>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  Interactive Drag & Orbit Active
                </div>
              </div>

              <div className="relative flex-1 w-full h-full">
                <ThreeCanvas
                  geometryType={geometry}
                  wireframe={wireframe}
                  speed={speed}
                  particleCount={particleCount}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  interactive={true}
                  className="w-full h-full absolute inset-0"
                />
              </div>
            </div>

            {/* Generated Code Window */}
            <div className="rounded-2xl bg-black/80 border border-white/10 p-5 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-neutral-400">
                <span>Code Export (Vanilla JS / Three.js)</span>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedCode)}
                  className="text-xs text-[#00f0ff] hover:underline"
                >
                  Copy Snippet
                </button>
              </div>
              <pre className="text-neutral-300 leading-relaxed">
                <code>{generatedCode}</code>
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
