// services/POST/postCriarUsuario.ts
import axios from 'axios';

export interface UserData {
  cpfUser: string;
  nomeUser: string;
  sobrenomeUser: string;
  telefoneUser: string;
  dataNascimentoUser: string;
  emailUser: string;
}

export default async function CriarUsuario(data: UserData): Promise<void> {
  try {
    const response = await axios.post("http://192.168.15.10:8080/usuario/criar", data);
    console.log("Resposta da API:", response.data);
  } catch (error) {
    console.error("Erro ao enviar os dados:", error);
    throw error;
  }
}
