// services/GET/getMonitoramentos.ts
import axios from "axios";

export type Monitoramento = {
  id: number;
  local: string;
  umidade: number;
  temperatura: number;
  data: string;
  horario: string;
  vento: number;
};

export default async function getMonitoramentos(): Promise<Monitoramento[]> {
  try {
    const response = await axios.get("http://192.168.15.10:8080/monitoramento");
    console.log("Monitoramentos recebidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar monitoramentos:", error);
    throw error;
  }
}
