import React, { useEffect, useState } from 'react';
import { Database, Sparkles, Activity, Check, RefreshCw } from 'lucide-react';

export default function PresetsSection({ onSelectPreset }) {
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState(null);

  const fetchPresets = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/presets');
      const data = await res.json();
      if (data.success) {
        setPresets(data.data);
      }
    } catch (err) {
      console.error('Error fetching presets:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setServerStatus(data);
    } catch (err) {
      console.error('Backend offline:', err);
    }
  };

  useEffect(() => {
    fetchPresets();
    fetchHealth();
  }, []);

  return (
    <section className="py-24 px-6 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-[#10b981] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
              <span>Backend Synchronized Presets</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              Cloud Geometry Repository
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Live presets retrieved in real-time from the Astral Express Backend API.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { fetchPresets(); fetchHealth(); }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh API</span>
            </button>
            {serverStatus && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Backend Online</span>
              </div>
            )}
          </div>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: preset.primaryColor }}
                    />
                    <div
                      className="w-3.5 h-3.5 rounded-full -ml-2 border border-[#08080c]"
                      style={{ backgroundColor: preset.secondaryColor }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {preset.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00f0ff] transition">
                  {preset.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {preset.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Primitive:</span>
                  <span className="text-white">{preset.geometry}</span>
                </div>
                <div className="flex justify-between">
                  <span>Speed / Particles:</span>
                  <span className="text-white">{preset.speed}x / {preset.particleCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wireframe:</span>
                  <span className="text-white">{preset.wireframe ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
