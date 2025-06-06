import axios from "axios";

export interface AlertaPorCpf {
  id: number;
  data: string;
  horario: string;
  cidade: string;
  estado: string;
  ocorrencia: string;
  finalizado: boolean;
  resolucao: string;
}


interface EmbeddedAlertaResponse {
  _embedded: {
    alertaList: AlertaPorCpf[];
  };
}

export default async function GetAlertaUser(cpf: string): Promise<AlertaPorCpf[]> {
  try {
    const response = await axios.get(`http://192.168.15.10:8080/alerta/todos/${encodeURIComponent(cpf)}`);

    //validação pois vem em mais de uma lista ent tive q realizar desta forma
    const lista = response.data._embedded?.alertaList ?? [];
    console.log("Lista correta:", lista);
    return lista;
  } catch (error) {
    console.error("Erro ao buscar alertas por CPF:", error);
    throw error;
  }
}
