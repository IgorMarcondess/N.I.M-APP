import axios from "axios";

export type Usuario = {
  cpfUser: string;
  nomeUser: string;
  sobrenomeUser: string;
  telefoneUser: string;
  dataNascimentoUser: string;
  emailUser: string;
};

export default async function GetUsuarios(email: string): Promise<Usuario> {
  try {
    const response = await axios.get(`http://192.168.15.10:8080/usuario/email/${encodeURIComponent(email)}`);
    console.log("Usuários recebidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
}
