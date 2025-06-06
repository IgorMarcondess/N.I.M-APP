import React, { createContext, useContext, useState, PropsWithChildren } from "react";

export type OcorrenciaType = {
  id: number;
  data: string;
  horario?: string;
  cidade: string;
  estado: string;
  ocorrencia: string;
  finalizado: boolean;
  resolucao?: string | null;
};

type OcorrenciaContextType = {
  ocorrenciaSelecionada: OcorrenciaType | null;
  setOcorrenciaSelecionada: (ocorrencia: OcorrenciaType) => void;
};

const OcorrenciaContext = createContext<OcorrenciaContextType | undefined>(undefined);

export const OcorrenciaProvider = ({ children }: PropsWithChildren) => {
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState<OcorrenciaType | null>(null);

  return (
    <OcorrenciaContext.Provider value={{ ocorrenciaSelecionada, setOcorrenciaSelecionada }}>
      {children}
    </OcorrenciaContext.Provider>
  );
};

export const useOcorrencia = () => {
  const context = useContext(OcorrenciaContext);
  if (!context) {
    throw new Error("useOcorrencia deve ser usado dentro de OcorrenciaProvider");
  }
  return context;
};
