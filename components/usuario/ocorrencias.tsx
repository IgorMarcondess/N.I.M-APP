import { Text, TouchableOpacity, View, Modal } from "react-native";
import { useEffect, useState } from "react";
import GetAlertaUser from "../../services/GET/getAlertasUser";
import { AlertaPorCpf } from "../../services/GET/getAlertasUser";
import { useUser } from "./userContext";

export default function Ocorrencias() {
  const { user } = useUser();
  const [ocorrencias, setOcorrencias] = useState<AlertaPorCpf[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState<string | null>(null);

  useEffect(() => {
  const carregarOcorrencias = async () => {
    if (!user?.cpfUser) return;

    try {
      const resposta = await GetAlertaUser(user.cpfUser); // já vem como array direto
      setOcorrencias(resposta);
    } catch (error) {
      console.error("Erro ao carregar ocorrências:", error);
    } finally {
      setLoading(false);
    }
  };

  carregarOcorrencias();
  }, [user]);

   return (
    <>
      {ocorrencias.map((data) => {
        const [endereco, cidade] = data.cidade.split("/");

        return (
          <View
            key={data.id}
            className="bg-[#F2F6F2] rounded-md border border-[#B9D6B8] p-4 shadow-sm items-center mb-4 w-[90%] h-[200px]"
          >
            <Text className="font-bold">ENDEREÇO:</Text>
            <Text className="text-[#264027] font-medium mb-2 text-center">{endereco}</Text>

            <View className="flex-row mb-2">
              <Text className="font-bold">CIDADE: </Text>
              <Text className="text-[#264027] mr-4">{cidade}</Text>
              <Text className="font-bold">ESTADO: </Text>
              <Text className="text-[#264027]">{data.estado}</Text>
            </View>

            <Text className="font-bold mb-1">OBSERVAÇÃO:</Text>
            <Text className="text-center text-[#264027] font-medium mb-3">{data.ocorrencia}</Text>

            <TouchableOpacity
              className="border border-[#B9D6B8] rounded-full py-1 px-6"
              onPress={() => {
                setEnderecoSelecionado(endereco);
                setMostrarModal(true);
              }}
            >
              <Text className="text-[#8AC185] font-bold">EDITAR ENDEREÇO</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {mostrarModal && (
        <Modal transparent animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-[#F2F6F2] rounded-md border border-[#B9D6B8] p-6 w-[90%] items-center">
              <Text className="text-red-600 font-bold text-4xl mb-4">Atenção!</Text>
              <Text className="text-center text-[#264027] font-medium mb-8">
                Você está ciente de que alterar o endereço pode aumentar o tempo de resposta do agente para resolver a situação
              </Text>

              <View className="w-full h-10 border border-[#B9D6B8] rounded-full mb-4 justify-center px-4">
                <Text className="text-[#264027]">{enderecoSelecionado}</Text>
              </View>

              <View className="flex-row justify-between w-full">
                <TouchableOpacity
                  className="bg-white border border-[#B9D6B8] rounded-md flex-1 py-2 mr-2 items-center"
                  onPress={() => {
                    setEnderecoSelecionado(null);
                    setMostrarModal(false);
                  }}
                >
                  <Text className="text-[#264027] font-bold">VOLTAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-white border border-[#B9D6B8] rounded-md flex-1 py-2 mr-2 items-center"
                  onPress={() => {
                    console.log(`Alterado: ${enderecoSelecionado}`);
                    setEnderecoSelecionado(null);
                    setMostrarModal(false);
                  }}
                >
                  <Text className="text-[#264027] font-bold">ALTERAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
