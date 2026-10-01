# 🌌 Anime 3D Experience Platform

<div align="center">

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**An interactive WebGL 3D anime shader sandbox and dynamic particle playground built with React 19, Three.js, Tailwind CSS v4, and Express.**

[Explore Presets](#-preset-engine) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-endpoints)

</div>

---

## ⚡ Overview

**Anime 3D Experience** is an interactive 3D graphics workstation merging cybernetic anime visuals with real-time procedural Three.js mathematics. Users can dynamically sculpt topological geometry knots, manipulate simplex particle wave displacement grids, tune post-processing bloom intensity, and save custom shader configurations directly through a lightweight REST backend.

### ✨ Key Capabilities

- **Real-Time 3D Viewport (`ThreeCanvas`)**: GPU-accelerated rendering supporting complex mathematical geometries (Torus Knots, Instanced Icosahedrons, Simplex Wave Grids, and Dodecahedrons).
- **Interactive Control Suite (`Playground`)**: Full parameter tuning for particle count (up to 5,000+), orbital velocities, wireframe topologies, dual-tone chromatic color ramps, and glow bloom factors.
- **Dynamic Shader & Geometry Presets (`PresetsSection`)**: Pre-configured high-impact visual states (`Quantum Torus`, `Cybernetic Lattice`, `Stellar Ribbon Wave`, `Neural Cluster`) with instant recall.
- **Custom Preset Persistence**: Create, serialize, and store custom geometric configurations to the backend API in real time.
- **Cyber Anime Design System**: Styled with deep space dark aesthetics, neon magenta (`#ff2a5f`) and cyan (`#00f0ff`) accents, and responsive layout driven by Tailwind CSS v4.

---

## 🏗️ Architecture

```
anime-3d-experience/
├── public/                 # Static vector assets & icons
├── src/
│   ├── components/
│   │   ├── ThreeCanvas.jsx   # Three.js scene, camera, lights, meshes & render loop
│   │   ├── Playground.jsx    # Real-time parameter controllers & geometry modifiers
│   │   ├── PresetsSection.jsx# Preset cards, filter categories & instant application
│   │   ├── Toolbox.jsx       # Interactive tool toggles & shader presets
│   │   ├── Features.jsx      # Technical capability spotlights
│   │   ├── Hero.jsx          # Cyber-anime hero banner & visual hook
│   │   ├── Header.jsx        # Navigation bar & status indicator
│   │   └── Footer.jsx        # Telemetry info & developer links
│   ├── App.jsx             # Top-level state coordination & layout
│   ├── main.jsx            # React 19 root entrypoint
│   └── index.css           # Tailwind CSS v4 directives
├── server.js               # Express 5 backend REST API for presets
├── vite.config.js          # Vite 8 bundling & React plugin configuration
└── package.json            # Scripts & full-stack dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18+` (Recommended: `v20+` or `v26+`)
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/4techno/anime-3d-experience.git
cd anime-3d-experience

# Install dependencies
npm install
```

### Development

Run both the frontend client and the backend API concurrently with a single command:

```bash
npm run dev
```

Or run them individually:

```bash
# Start Vite frontend (http://localhost:5173)
npm run dev:frontend

# Start Express REST API (http://localhost:3001)
npm run dev:backend
```

### Production Build

```bash
# Compile and optimize client assets for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔌 API Endpoints

The Express server exposes lightweight REST endpoints for managing 3D configurations:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/presets` | Retrieve all available geometry presets |
| `POST` | `/api/presets` | Save a new custom geometry configuration |
| `DELETE` | `/api/presets/:id` | Remove a saved preset |

#### Preset Schema Example:
```json
{
  "id": "quantum-torus",
  "name": "Quantum Torus",
  "category": "Geometry",
  "geometry": "torusKnot",
  "wireframe": true,
  "speed": 1.2,
  "particleCount": 1200,
  "primaryColor": "#ff2a5f",
  "secondaryColor": "#00f0ff",
  "bloom": 1.5,
  "description": "Self-intersecting topological knot with dynamic chromatic aberration."
}
```

---

## 🛠️ Tech Stack

- **Core Framework**: [React 19](https://react.dev/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **Bundler & Tooling**: [Vite 8](https://vitejs.dev/) with [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend API**: [Express 5](https://expressjs.com/)
- **Process Orchestration**: [Concurrently](https://github.com/open-cli-tools/concurrently)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 👤 Author

**Mohammed Vashir**  
*Systems, Robotics & AI Architect · Full-Stack Engineer*

- **GitHub**: [@4techno](https://github.com/4techno)
- **Live Engineering Platform**: [4TECH](https://4tech-9cy.pages.dev)
- **LinkedIn**: [Mohammed Vashir](https://www.linkedin.com/in/mohammed-vashir-793b89378/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
