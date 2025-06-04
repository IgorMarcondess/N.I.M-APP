import axios from "axios";

export type Alerta = {
  id: number;
  data: string;
  horario?: string;
  cidade: string;
  estado: string;
  ocorrencia: string;
  finalizado: boolean;
  resolucao?: string | null;
};

export default async function GetAlertas() : Promise<Alerta[]> {
    
    try {
        const response = await axios.get("http://192.168.15.10:8080/alerta/todos");
        console.log('Dados', response.data)
        return response.data;
    } catch (error) {
            console.error("Erro ao buscar alertas:", error);
    throw error;
    }

}