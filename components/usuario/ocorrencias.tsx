import { Text, TouchableOpacity, View, Modal, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import GetAlertaUser from "../../services/GET/getAlertasUser";
import { AlertaPorCpf } from "../../services/GET/getAlertasUser";
import { useUser } from "./userContext";
import axios from "axios";

export default function Ocorrencias() {
  const { user } = useUser();
  const [ocorrencias, setOcorrencias] = useState<AlertaPorCpf[]>([]);
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const carregarOcorrencias = async () => {
      if (!user?.cpfUser) return;

      try {
        const resposta = await GetAlertaUser(user.cpfUser);
        setOcorrencias(resposta);
        
      } catch (error) {
        console.error("Erro ao carregar ocorrências:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarOcorrencias();
  }, [user]);

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

  const ExcluirOcorrencia = async () => {
    try {
      await axios.delete(`http://192.168.15.10:8080/alerta/${idSelecionado}`);
      console.log(`Ocorrência com id ${idSelecionado} excluída com sucesso!`);

      setMostrarModal(false);
    } catch (error) {
      console.error("Erro ao excluir ocorrência:", error);
    }
  };


  return (
    <>
      {ocorrencias.map((data) => {
        const [endereco, cidade] = data.cidade.split("/");

        return (
          <View key={data.id} className="bg-[#F2F6F2] rounded-md border border-[#B9D6B8] p-4 shadow-sm items-center mb-4 w-[90%] h-[240px]">
            <Text className="font-bold">EENDEREÇO:</Text>
            <Text className="text-[#264027] font-medium mb-2 text-center">{endereco}</Text>

            <View className="flex-row mb-2">
              <Text className="font-bold">CIDADE: </Text>
              <Text className="text-[#264027] mr-4">{cidade}</Text>
              <Text className="font-bold">ESTADO: </Text>
              <Text className="text-[#264027]">{data.estado}</Text>
            </View>

            <Text className="font-bold mb-1">OBSERVAÇÃO:</Text>
            <Text className="text-center text-[#264027] font-medium mb-3">{data.ocorrencia}</Text>

            <TouchableOpacity className="border border-[#FC0000] rounded-full py-1 px-6"
              onPress={() => { setIdSelecionado(data.id); setMostrarModal(true);}}>

              <Text className="text-[#FC0000] font-bold">EXCLUIR OCORRÊNCIA</Text>
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
                Você tem ciência de que excluir esta ocorrência pode atrasar a identificação e o tratamento de casos realmente graves, certo?
              </Text>

              <View className="flex-row justify-between w-full">
                <TouchableOpacity className="flex-1 py-2 mr-2 items-center border border-green-600 rounded-md bg-white"
                  onPress={() => setMostrarModal(false)}>

                  <Text className="text-green-700 font-bold">VOLTAR</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 py-2 ml-2 items-center border border-red-600 rounded-md bg-white"
                  onPress={ExcluirOcorrencia}>
                  
                  <Text className="text-red-600 font-bold">EXCLUIR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
