
import React from 'react';
import type { DrugInfo } from '../types';

interface DrugCardProps {
  drug: DrugInfo;
}

const InfoRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="py-2 border-b border-blue-100 last:border-b-0">
      <h4 className="font-semibold text-blue-800">{label}</h4>
      <p className="text-gray-700 text-sm mt-1">{value}</p>
    </div>
  );
};

const DrugCard: React.FC<DrugCardProps> = ({ drug }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="px-6 py-4 bg-blue-600 text-white">
        <h3 className="text-xl font-bold">{drug.name}</h3>
      </div>
      <div className="p-6 space-y-2">
        <InfoRow label="Presentación" value={drug.presentation} />
        <InfoRow label="Laboratorio" value={drug.laboratory} />
        <InfoRow label="Indicaciones" value={drug.indications} />
        <InfoRow label="Dosis" value={drug.dose} />
        <InfoRow label="Dosis Máxima" value={drug.maxDose} />
        <InfoRow label="Vía de Administración" value={drug.administrationRoute} />
        <InfoRow label="Almacenamiento" value={drug.storage} />
        <InfoRow label="Reconstitución" value={drug.reconstitution} />
        <InfoRow label="Dilución" value={drug.dilution} />
        <InfoRow label="Estándar de Dilución" value={drug.dilutionStandard} />
        <InfoRow label="Sueros Compatibles" value={drug.compatibleIVFluids} />
        <InfoRow label="Estabilidad" value={drug.stability} />
        <InfoRow label="Velocidad de Administración" value={drug.administrationSpeed} />
        <InfoRow label="Incompatibilidad" value={drug.incompatibility} />
        <InfoRow label="Efectos Adversos" value={drug.adverseEffects} />
        <InfoRow label="Observaciones" value={drug.observations} />
      </div>
    </div>
  );
};

export default DrugCard;
