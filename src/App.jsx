import { useState } from 'react';
import Hero from './components/Hero';
import SageShowcase from './components/SageShowcase';
import SageDetailModal from './components/SageDetailModal';

function App() {
  const [selectedSage, setSelectedSage] = useState(null);

  return (
    <div className="min-h-screen bg-[var(--color-blue-deep)] text-[var(--color-text-light)]">
      <Hero />
      <SageShowcase onSageClick={setSelectedSage} />
      <SageDetailModal sage={selectedSage} onClose={() => setSelectedSage(null)} />
    </div>
  );
}

export default App;
