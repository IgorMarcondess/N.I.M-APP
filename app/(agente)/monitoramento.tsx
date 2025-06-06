import { Text, TouchableOpacity, View, Modal, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

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
      </View>
    );
  }

  if (sensores.length === 0) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-[#264027] font-semibold text-xl text-center">Nenhum sensor cadastrado!</Text>
      </View>
    );
  }

  return (
    <View className="items-center">
      {sensores.map((sensor) => {
        const [endereco, cidade] = sensor.local.split("/");
        return (
          <View key={sensor.id} className="bg-[#F2F6F2] rounded-md border border-[#B9D6B8] p-4 shadow-sm items-center mb-4 w-[90%] min-h-[230px]">
            <Text className="font-bold">ENDEREÇO:</Text>
            <Text className="text-[#264027] font-medium mb-2 text-center">{endereco}</Text>

            <View className="flex-row mb-2">
              <Text className="font-bold">CIDADE: </Text>
              <Text className="text-[#264027] mr-4">{cidade}</Text>
            </View>

            <Text className="font-bold mb-1">DATA E HORA:</Text>
            <Text className="text-[#264027] mb-1">{sensor.data} {sensor.horario}</Text>

            <Text className="font-bold mb-1">DADOS:</Text>
            <Text className="text-center text-[#264027] font-medium mb-3">
              Temperatura: {sensor.temperatura}ºC | Umidade: {sensor.umidade}% | Vento: {sensor.vento}km/h
            </Text>
          </View>
        );
      })}
    </View>
  );
}
