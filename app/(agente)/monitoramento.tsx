import { Text, TouchableOpacity, View, Modal, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export type Sensor = {
  id: number;
  local: string;
  data: string;
  horario: string;
  temperatura: number;
  umidade: number;
  vento: number;
};

export default function ListaSensores() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarSensores = async () => {
      try {
        const response = await axios.get("http://192.168.15.10:8080/sensor/todos");
        setSensores(response.data);
      } catch (error) {
        console.error("Erro ao buscar sensores:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarSensores();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#264027" />
        <Text className="mt-4 text-[#264027] font-semibold text-lg">Buscando sensores cadastrados...</Text>
          <TouchableOpacity className="border border-[#264027]  py-3 px-6 rounded-xl mt-5"
            onPress={() => router.back()} >
            <Text className="text-[#264027]  font-bold">VOLTAR</Text>
          </TouchableOpacity>
      </View>
    );
  }

  if (sensores.length === 0) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-[#264027] font-semibold text-xl text-center">Nenhum sensor cadastrado!</Text>
          <TouchableOpacity className="border border-[#264027]  py-3 px-6 rounded-xl mt-5"
            onPress={() => router.back()} >
            <Text className="text-[#264027]  font-bold">VOLTAR</Text>
          </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="items-center bg-[#264027] flex-1">
      {sensores.map((sensor) => {
        const [endereco, cidade] = sensor.local.split("/");
        return (
          <View key={sensor.id} className="bg-[#F2F6F2] rounded-md border border-[#B9D6B8] p-4 shadow-sm items-center mb-4 w-[90%] min-h-[150px]">
            <Text className="font-bold">ENDEREÇO:</Text>
            <Text className="text-[#264027] font-medium mb-2 text-center">{endereco}</Text>

            <Text className="font-bold mb-1">DATA E HORA:</Text>
            <Text className="text-[#264027] mb-1">{sensor.data} / {sensor.horario}</Text>

            <Text className="font-bold mb-1">DADOS:</Text>
            <Text className="text-center text-[#264027] font-medium mb-3">Temperatura: {sensor.temperatura}ºC | Umidade: {sensor.umidade}% 
            </Text>
          </View>
        );
      })}
    <TouchableOpacity className="border border-white  py-3 px-6 rounded-xl"
      onPress={() => router.back()} >

      <Text className="text-white  font-bold">VOLTAR</Text>
    </TouchableOpacity>
    </SafeAreaView>

  );
}
