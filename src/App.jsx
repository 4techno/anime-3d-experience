import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Toolbox from './components/Toolbox';
import Features from './components/Features';
import Playground from './components/Playground';
import PresetsSection from './components/PresetsSection';
import Footer from './components/Footer';

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePresetSaved = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-[#ff2a5f] selection:text-white relative">
      {/* Top Header */}
      <Header />

      {/* Main Experience */}
      <main className="relative z-10">
        <Hero />
        <Toolbox />
        <Features />
        <Playground onPresetSaved={handlePresetSaved} />
        <PresetsSection key={refreshTrigger} />
      </main>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}
