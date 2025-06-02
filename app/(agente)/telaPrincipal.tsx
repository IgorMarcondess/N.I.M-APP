import { View, Text, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Ocorrencias from "@/components/agente/ocorrencias";
import { router } from "expo-router";
//import { Ocorrencias } from "@/components/Ocorrencias";

export default function TelaPrincipal(){

    const [localizacao, setLocalizacao] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const buscarLocalizacao = async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrorMsg("Permissão para acessar localização negada");
            return;
          }
    
          const loc = await Location.getCurrentPositionAsync({});
          setLocalizacao(loc);
        };
    
        buscarLocalizacao();
  }, []);


    return (
    <SafeAreaView className="flex-1 bg-[#264027]">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Nome + CPF */}
        <View className="bg-white rounded-xl items-center py-2 mb-3">
          <Text className="font-bold">Igor Gabriel Pereira</Text>
          <Text className="font-bold">CPF : 547.***.***-35</Text>
        </View>

       <View className="overflow-hidden rounded-xl h-80 mb-3">
          {localizacao ? (
            <MapView
              style={{ width: "100%", height: "100%" }}
              region={{
                latitude: localizacao.coords.latitude,
                longitude: localizacao.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation
            />
          ) : (
            <View className="bg-gray-300 flex-1 items-center justify-center">
              <Text className="text-white font-semibold">Carregando mapa...</Text>
            </View>
          )}
        </View>

        <View className="flex-row justify-between mb-6 px-2">
        <TouchableOpacity className="bg-white rounded-xl items-center justify-center w-[48%] h-32" onPress={() => router.push("/(agente)/ocorrencia")}>
            <Icon name="database" size={32} color="#264027" />
            <Text className="font-bold text-center mt-2 text-[#264027]">
            HISTÓRICO DE{"\n"}OCORRÊNCIAS
            </Text>
        </TouchableOpacity>

        <TouchableOpacity   onPress={() => router.push("/(agente)/monitoramento")}
      className="bg-white rounded-xl items-center justify-center w-[48%] h-32">
            <Icon name="tv" size={32} color="#264027" />
            <Text className="font-bold text-center mt-2 text-[#264027]">
            MONITORAMENTO
            </Text>
        </TouchableOpacity>
        </View>

        {/* Botões (não funcionais neste exemplo) */}
        <View className="items-center justify-center">
        <View className="bg-white h-12 py-2 rounded-xl w-52 mb-2 items-center justify-center">
          <Text className="font-bold">OCORRÊNCIAS</Text>
        </View>
        </View>

        {/* Ocorrências */}
        <Ocorrencias />


      </ScrollView>
    </SafeAreaView>
    )
}