import { Text, TouchableOpacity, View, Modal, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import GetAlertas, { Alerta } from "../../services/GET/getAlertas";
import { useUser } from "../../components/usuario/userContext";
import { OcorrenciaType, useOcorrencia } from "../../components/ocorrenciaContext"; 
import { router } from "expo-router";

export default function Ocorrencias() {
  const { user } = useUser();
  const [ocorrencias, setOcorrencias] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const { setOcorrenciaSelecionada } = useOcorrencia();
  const [enderecoSelecionado, setEnderecoSelecionado] = useState<string | null>(null);

  useEffect(() => {
    const carregarOcorrencias = async () => {
      try {
        const resposta = await GetAlertas();
        setOcorrencias(resposta); 
      } catch (error) {
        console.error("Erro ao carregar ocorrências:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarOcorrencias();
  }, []);

    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#264027" />
          <Text className="mt-4 text-[#264027] font-semibold text-lg">Carregando ocorrências...</Text>
        </View>
      );
    }
  
    if (ocorrencias.length === 0) {
      return (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-[#264027] font-semibold text-xl text-center"> Nenhuma ocorrência foi aberta!</Text>
        </View>
      );
    }

  const abrirOcorrencias = (data: OcorrenciaType) => {
      setOcorrenciaSelecionada(data);
      router.push("/(agente)/ocorrencia")
  }

  return (
    <>
    <View className="items-center">
      {ocorrencias.map((data) => {
        const [endereco, cidade] = data.cidade.split("/");
        return (
          <TouchableOpacity key={data.id} onPress={() => abrirOcorrencias(data)}
            className="bg-[#F2F6F2] rounded-md border border-[#B9D6B8] p-4 shadow-sm items-center mb-4 w-[90%] min-h-[230px]">
              
            <Text className="font-bold">ENDEREÇO:</Text>
            <Text className="text-[#264027] font-medium mb-2 text-center">{endereco}</Text>

            <View className="flex-row mb-2">
              <Text className="font-bold">CIDADE: </Text>
              <Text className="text-[#264027] mr-4">{cidade}</Text>
              <Text className="font-bold">ESTADO: </Text>
              <Text className="text-[#264027]">{data.estado}</Text>
            </View>

            <Text className="font-bold mb-1">DATA E HORA:</Text>
            <Text className="text-[#264027] mb-1">{data.data} {data.horario || ""}</Text>

            <Text className="font-bold mb-1">OBSERVAÇÃO:</Text>
            <Text className="text-center text-[#264027] font-medium mb-3">{data.ocorrencia}</Text>

            <Text className="font-bold mb-1">STATUS:</Text>
            <Text className="text-[#264027] mb-3"> {data.finalizado ? "Finalizado" : "Em aberto"} {data.resolucao ? `– ${data.resolucao}` : ""}
            </Text>
          </TouchableOpacity>
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
                <TouchableOpacity onPress={() => { setEnderecoSelecionado(null); setMostrarModal(false);}}
                  className="bg-white border border-[#B9D6B8] rounded-md flex-1 py-2 mr-2 items-center">

                  <Text className="text-[#264027] font-bold">VOLTAR</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { console.log(`Alterado: ${enderecoSelecionado}`);setMostrarModal(false);}}
                  className="bg-white border border-[#B9D6B8] rounded-md flex-1 py-2 mr-2 items-center">
                  <Text className="text-[#264027] font-bold">ALTERAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      </View>
    </>
  );
}
