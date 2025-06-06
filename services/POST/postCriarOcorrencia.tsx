import axios from "axios";


export interface InfoOcorrencia {
  id: number;
  data: string;
  horario: string;
  cidade: string;
  estado: string;
  ocorrencia: string;
  finalizado: boolean;
  resolucao: string;
}

export default async function CriarOcorrencia(data: InfoOcorrencia, cpfUser: string): Promise<void> {
  try {
    console.log(cpfUser)
    const response = await axios.post(`http://192.168.15.10:8080/alerta/criar/${cpfUser}`, data);

    //validação pois essa etapa esta dando mt B.O
    if (response.status === 200 || response.status === 201) {
      console.log("Ocorrência criada com sucesso:", response.data);
    } else {
      console.log("Erro inesperado ocorreu:", response.status, response.data);
    }
  } catch (error) {
    console.error("Erro ao criar ocorrência:", error);
    throw error;
  }
}
