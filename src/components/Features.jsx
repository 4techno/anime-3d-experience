import React, { useState } from 'react';
import { Layers, Terminal, Sparkles, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

const chapters = [
  {
    id: 'api',
    badge: '01 / ARCHITECTURE',
    title: 'Intuitive 3D API',
    subtitle: 'Tween any object matrix, uniform, or geometry parameter with standard easing or spring physics.',
    geometry: 'torusKnot',
    wireframe: true,
    speed: 1.0,
    primaryColor: '#ff2a5f',
    secondaryColor: '#00f0ff',
    bullets: [
      'Per-property spring damping & stiffness',
      'Unified keyframe timeline orchestration',
      'Automatic memory & buffer geometry disposal'
    ],
    code: `// Animate 3D Torus with Spring Dynamics
astral.animate(torusMesh.rotation, {
  x: Math.PI * 2,
  y: Math.PI * 4,
  ease: 'spring(mass: 1, damping: 14, stiffness: 100)',
  duration: 2400,
  loop: true
});`
  },
  {
    id: 'instancing',
    badge: '02 / PERFORMANCE',
    title: 'Instanced Mesh Matrix',
    subtitle: 'Render tens of thousands of polyhedral nodes in a single draw call with GPU-accelerated transforms.',
    geometry: 'icosahedron',
    wireframe: false,
    speed: 1.4,
    primaryColor: '#00f0ff',
    secondaryColor: '#9d4edd',
    bullets: [
      'Direct matrix4 buffer writes bypassing CPU overhead',
      'Dynamic LOD (Level of Detail) downscaling',
      'Zero garbage collection spikes during animation'
    ],
    code: `// Instanced Matrix Transformation
const matrix = new THREE.Matrix4();
astral.stagger(instances, {
  duration: 1800,
  update: (instance, index, progress) => {
    matrix.setPosition(Math.sin(index) * 2, progress * 4, 0);
    mesh.setMatrixAt(index, matrix);
  }
});`
  },
  {
    id: 'wave',
    badge: '03 / SHADERS',
    title: 'Real-time Wave Distortion',
    subtitle: 'Deform mesh surfaces dynamically using trigonometric harmonic waves and procedural noise.',
    geometry: 'waveGrid',
    wireframe: true,
    speed: 1.8,
    primaryColor: '#ffaa00',
    secondaryColor: '#ff2a5f',
    bullets: [
      'Procedural simplex noise vertex displacements',
      'Interactive ripple origin mapped to cursor coordinates',
      'Real-time normal recalculation for realistic lighting'
    ],
    code: `// Sine Wave Displacer on Mesh Buffer
mesh.onUpdate((time) => {
  for (let i = 0; i < vertices.length; i++) {
    const z = Math.sin(vertices[i].x * 2 + time * 3) * 0.4;
    positionAttribute.setZ(i, z);
  }
  positionAttribute.needsUpdate = true;
});`
  },
  {
    id: 'poly',
    badge: '04 / DYNAMICS',
    title: 'Gravitational Clusters',
    subtitle: 'Simulate multi-body n-body gravitational attraction and orbital kinematics in 3D space.',
    geometry: 'dodecahedron',
    wireframe: true,
    speed: 1.6,
    primaryColor: '#10b981',
    secondaryColor: '#00f0ff',
    bullets: [
      'Point attractor vector field calculations',
      'Inertial dampening on mouse leave',
      'Multi-color gradient interpolation'
    ],
    code: `// Attractor Node Physics
const attractor = astral.createAttractor({ x: 0, y: 0, z: 0 });
attractor.bindToMouse({ smoothing: 0.1 });
nodes.forEach(node => attractor.applyForce(node));`
  }
];

export default function Features() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeChapter = chapters[activeIdx];

  return (
    <section id="features" className="py-24 px-6 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-[#ff2a5f] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a5f]"></span>
            <span>Feature Scrollytelling Stage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Orchestration without friction.
          </h2>
          <p className="text-neutral-400 text-lg">
            Experience the same fluid chapter navigation as animejs.com with synchronized 3D stage updates.
          </p>
        </div>

        {/* Chapter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {chapters.map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                activeIdx === idx
                  ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>0{idx + 1}.</span>
              <span>{chap.title}</span>
            </button>
          ))}
        </div>

        {/* Split Stage: Left Story/Code + Right 3D Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Narrative & Live Code Box */}
          <div className="lg:col-span-6 flex flex-col justify-between glass-panel p-8 rounded-3xl border border-white/10">
            <div>
              <div className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-2">
                {activeChapter.badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {activeChapter.title}
              </h3>
              <p className="text-neutral-300 text-base leading-relaxed mb-6">
                {activeChapter.subtitle}
              </p>

              {/* Feature bullet checklist */}
              <div className="space-y-2.5 mb-8">
                {activeChapter.bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Box */}
            <div className="rounded-2xl bg-black/80 border border-white/10 p-4 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-neutral-500">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <Terminal className="w-3.5 h-3.5 text-[#ff2a5f]" />
                  <span>main.js</span>
                </span>
                <span className="text-[11px] text-neutral-400">JavaScript / ES6</span>
              </div>
              <pre className="text-neutral-300 leading-relaxed">
                <code>{activeChapter.code}</code>
              </pre>
            </div>

            {/* Quick Next Chapter Trigger */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-neutral-500 font-mono">
                Stage {activeIdx + 1} of {chapters.length}
              </span>
              <button
                onClick={() => setActiveIdx((activeIdx + 1) % chapters.length)}
                className="flex items-center gap-1 text-xs font-mono text-white hover:text-[#00f0ff] transition"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic 3D Canvas Stage */}
          <div className="lg:col-span-6 min-h-[460px] rounded-3xl glass-panel border border-white/10 overflow-hidden relative flex flex-col justify-between">
            {/* Top Bar */}
            <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="text-xs font-mono text-white/90">
                  Active Scene: {activeChapter.geometry}
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Speed: {activeChapter.speed}x
              </span>
            </div>

            {/* Interactive Canvas */}
            <div className="relative flex-1 w-full h-full min-h-[380px]">
              <ThreeCanvas
                key={activeChapter.id}
                geometryType={activeChapter.geometry}
                wireframe={activeChapter.wireframe}
                speed={activeChapter.speed}
                particleCount={2000}
                primaryColor={activeChapter.primaryColor}
                secondaryColor={activeChapter.secondaryColor}
                interactive={true}
                className="w-full h-full absolute inset-0"
              />
            </div>

            {/* Bottom Controls Info */}
            <div className="p-3 bg-black/60 backdrop-blur border-t border-white/10 text-center text-xs font-mono text-neutral-400 z-20">
              Move your mouse across the canvas to steer camera & manipulate vertices
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
