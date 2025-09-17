
export interface DrugInfo {
  name: string;
  presentation: string;
  laboratory: string;
  indications: string;
  dose: string;
  maxDose: string;
  administrationRoute: string;
  storage: string;
  reconstitution?: string;
  dilution?: string;
  dilutionStandard?: string;
  compatibleIVFluids: string;
  stability: string;
  administrationSpeed: string;
  incompatibility: string;
  adverseEffects: string;
  observations?: string;
}
