import React, { useState, useMemo } from 'react';
import { drugData } from '../constants/drugData';
import type { DrugInfo } from '../types';

const InteractionChecker: React.FC = () => {
    const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
    const [results, setResults] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleDrugSelection = (drugName: string) => {
        setSelectedDrugs(prevSelected =>
            prevSelected.includes(drugName)
                ? prevSelected.filter(name => name !== drugName)
                : [...prevSelected, drugName]
        );
    };

    const handleCheckInteractions = () => {
        setResults([]);
        if (selectedDrugs.length < 2) {
            setMessage('Por favor, seleccione al menos dos medicamentos para comparar.');
            return;
        }

        setMessage('');
        const interactions: string[] = [];
        const checkedPairs = new Set<string>();

        const selectedDrugInfoMap = new Map<string, DrugInfo>();
        selectedDrugs.forEach(name => {
            const drug = drugData.find(d => d.name === name);
            if (drug) {
                selectedDrugInfoMap.set(name, drug);
            }
        });

        for (const drugNameA of selectedDrugs) {
            const drugA = selectedDrugInfoMap.get(drugNameA);
            if (!drugA || !drugA.incompatibility) continue;

            const incompatibleList = drugA.incompatibility.toLowerCase().split(',').map(s => s.trim());

            for (const drugNameB of selectedDrugs) {
                if (drugNameA === drugNameB) continue;

                // Check if drug B is in drug A's incompatibility list
                if (incompatibleList.includes(drugNameB.toLowerCase())) {
                    const pairKey = [drugNameA, drugNameB].sort().join('|');
                    if (!checkedPairs.has(pairKey)) {
                        interactions.push(`Se encontró incompatibilidad entre **${drugNameA}** y **${drugNameB}**.`);
                        checkedPairs.add(pairKey);
                    }
                }
            }
        }

        setResults(interactions);
        if (interactions.length === 0) {
            setMessage('No se encontraron incompatibilidades conocidas entre los medicamentos seleccionados.');
        }
    };
    
    const filteredDrugs = useMemo(() => 
        drugData.filter(drug => 
            drug.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]);

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Verificador de Interacciones</h1>
            <p className="text-center text-gray-600 mb-6">
                Seleccione dos o más medicamentos para verificar sus incompatibilidades.
            </p>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar medicamento para agregar..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50 mb-4">
                 {filteredDrugs.length > 0 ? filteredDrugs.map(drug => (
                    <div key={drug.name} className="flex items-center bg-white p-2 rounded-md shadow-sm">
                        <input
                            type="checkbox"
                            id={`drug-${drug.name}`}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedDrugs.includes(drug.name)}
                            onChange={() => handleDrugSelection(drug.name)}
                        />
                        <label htmlFor={`drug-${drug.name}`} className="ml-3 text-sm font-medium text-gray-700 select-none">
                            {drug.name}
                        </label>
                    </div>
                )) : <p className="text-center text-gray-500 py-4">No se encontraron medicamentos.</p>}
            </div>

            <button onClick={handleCheckInteractions} className="w-full mt-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                Verificar Interacciones ({selectedDrugs.length})
            </button>

            {(message || results.length > 0) && (
                 <div className="mt-8 p-6 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50 text-left">
                     <h3 className="text-xl font-bold mb-3 text-blue-900">Resultados del Verificador:</h3>
                     {message && <p className="text-gray-800">{message}</p>}
                     {results.length > 0 && (
                         <ul className="list-disc list-inside space-y-2">
                             {results.map((res, index) => (
                                 <li key={index} className="text-red-700" dangerouslySetInnerHTML={{ __html: res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                             ))}
                         </ul>
                     )}
                 </div>
            )}
        </div>
    );
};

export default InteractionChecker;
