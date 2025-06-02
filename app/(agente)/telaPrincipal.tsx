import { View, Text, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Ocorrencias from "@/components/agente/ocorrencias";
import { router } from "expo-router";
//import { Ocorrencias } from "@/components/Ocorrencias";

export default function TelaPrincipal(){

      const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permissão para acessar localização negada");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

   const region: Region = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : {
        latitude: -23.55052,
        longitude: -46.633308,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

    return (
    <SafeAreaView className="flex-1 bg-[#264027]">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Nome + CPF */}
        <View className="bg-white rounded-xl items-center py-2 mb-3">
          <Text className="font-bold">Igor Gabriel Pereira</Text>
          <Text className="font-bold">CPF : 547.***.***-35</Text>
        </View>

        {/* Mapa */}
        <View className="overflow-hidden rounded-xl h-80 mb-3">
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={region}
            showsUserLocation>
          </MapView>
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