import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory store for 3D presets
let presets = [
  {
    id: 'quantum-torus',
    name: 'Quantum Torus',
    category: 'Geometry',
    geometry: 'torusKnot',
    wireframe: true,
    speed: 1.2,
    particleCount: 1200,
    primaryColor: '#ff2a5f',
    secondaryColor: '#00f0ff',
    bloom: 1.5,
    description: 'Self-intersecting topological knot with dynamic chromatic aberration.'
  },
  {
    id: 'cyber-lattice',
    name: 'Cybernetic Lattice',
    category: 'Instancing',
    geometry: 'icosahedron',
    wireframe: false,
    speed: 0.8,
    particleCount: 2400,
    primaryColor: '#00f0ff',
    secondaryColor: '#9d4edd',
    bloom: 1.8,
    description: 'Instanced matrix reacting to spatial spring forces and wave math.'
  },
  {
    id: 'stellar-ribbon',
    name: 'Stellar Ribbon Wave',
    category: 'Particle Fields',
    geometry: 'waveGrid',
    wireframe: true,
    speed: 1.5,
    particleCount: 3600,
    primaryColor: '#ffaa00',
    secondaryColor: '#ff2a5f',
    bloom: 2.0,
    description: 'Flowing harmonic noise field computing real-time simplex vertex displacements.'
  },
  {
    id: 'neural-cluster',
    name: 'Neural Cluster',
    category: 'Physics',
    geometry: 'dodecahedron',
    wireframe: true,
    speed: 2.0,
    particleCount: 1800,
    primaryColor: '#10b981',
    secondaryColor: '#00f0ff',
    bloom: 1.2,
    description: 'Attractor physics calculating gravitation between interconnected nodes.'
  }
];

let waitlist = [];

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    engine: 'ASTRAL 3D WebGL Engine v4.2',
    timestamp: new Date().toISOString(),
    fpsTarget: 60,
    activePresets: presets.length
  });
});

app.get('/api/presets', (req, res) => {
  res.json({ success: true, data: presets });
});

app.post('/api/presets', (req, res) => {
  const { name, geometry, wireframe, speed, particleCount, primaryColor, secondaryColor, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Preset name is required' });
  }

  const newPreset = {
    id: `preset-${Date.now()}`,
    name,
    category: 'Custom User',
    geometry: geometry || 'torusKnot',
    wireframe: Boolean(wireframe),
    speed: Number(speed) || 1.0,
    particleCount: Number(particleCount) || 1500,
    primaryColor: primaryColor || '#ff2a5f',
    secondaryColor: secondaryColor || '#00f0ff',
    bloom: 1.5,
    description: description || 'User-generated procedural 3D configuration.'
  };

  presets.unshift(newPreset);
  res.status(201).json({ success: true, data: newPreset });
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  waitlist.push({ email, joinedAt: new Date().toISOString() });
  res.json({ success: true, message: 'Welcome to the Astral 3D private beta!', count: waitlist.length });
});

app.get('/api/stats', (req, res) => {
  res.json({
    renderCycleMs: 16.4,
    drawCallsAverage: 18,
    memoryUsageMB: 42.8,
    instancedTriangles: 142800,
    connectedClients: 1
  });
});

app.listen(PORT, () => {
  console.log(`[ASTRAL BACKEND] 3D Animation Service listening at http://localhost:${PORT}`);
});
