import axios from "axios";

interface InfoMonitoramento {
  id: number;
  local: string;
  data: string;
  horario: string;
  temperatura: number;
  umidade: string;
  vento: number;
}

export default async function postMonitoramento(data: InfoMonitoramento): Promise<void> {

  try {
    const response = await axios.post("http://192.168.15.10:8080/sensor/criar", data);
    console.log(" Monitoramento enviado com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao enviar monitoramento:", error);
    throw error;
  }
}
