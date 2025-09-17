import React from 'react';
import { useState, useEffect } from 'react';
import { drugData } from './constants/drugData';
import type { DrugInfo } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import DrugCard from './components/DrugCard';
import InteractionChecker from './components/InteractionChecker';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrugs, setFilteredDrugs] = useState<DrugInfo[]>(drugData);
  const [view, setView] = useState<'directory' | 'interactions'>('directory');

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase().trim();
    if (lowercasedFilter === '') {
      setFilteredDrugs(drugData);
    } else {
      const filtered = drugData.filter(drug => {
        return Object.values(drug).some(value =>
          typeof value === 'string' && value.toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredDrugs(filtered);
    }
  }, [searchTerm]);
  
  const renderContent = () => {
    switch (view) {
      case 'interactions':
        return <InteractionChecker />;
      case 'directory':
      default:
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-4">
              Directorio Médico
            </h1>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Encuentre información detallada sobre medicamentos de forma rápida y sencilla.
            </p>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {filteredDrugs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredDrugs.map((drug) => (
                  <DrugCard key={drug.name} drug={drug} />
                ))}
              </div>
            ) : (
              <div className="text-center mt-16">
                <h2 className="text-2xl font-semibold text-gray-700">No se encontraron resultados</h2>
                <p className="text-gray-500 mt-2">Intente ajustar sus términos de búsqueda.</p>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-sans">
      <Header view={view} setView={setView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;