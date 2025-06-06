import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Ocorrencias from "@/components/agente/ocorrencias";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useUser } from "../../components/usuario/userContext";

export default function TelaPrincipal() {
  const { user } = useUser()
  const [localizacao, setLocalizacao] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(true);

  useEffect(() => {
    const buscarLocalizacao = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permissão para acessar localização negada");
          setCarregandoLocalizacao(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocalizacao(loc);
      } catch (error) {
        setErrorMsg("Erro ao obter localização");
      } finally {
        setCarregandoLocalizacao(false);
      }
    };

    buscarLocalizacao();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#264027]">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <View className="bg-white rounded-xl items-center py-2 mb-3">
          <Text className="font-bold">{user?.nomeUser}</Text>
          <Text className="font-bold">CPF : {user?.cpfUser}</Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/(agente)/criarSensor")}
          className="bg-white border border-[#264027] py-3 px-10 rounded-xl mt-6 mb-6 self-center">
            
          <Text className="text-[#264027] font-bold">CRIAR SENSOR DE MONITORAMENTO</Text>
        </TouchableOpacity>

        <View className="overflow-hidden rounded-xl h-80 mb-3">
          {carregandoLocalizacao ? (
            <View className="flex-1 items-center justify-center bg-gray-300">
              <ActivityIndicator size="large" color="#264027" />
              <Text className="text-white font-semibold mt-2">Carregando localização...</Text>
            </View>
          ) : localizacao ? (
            <MapView
              style={{ width: "100%", height: "100%" }}
              region={{
                latitude: localizacao.coords.latitude,
                longitude: localizacao.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation>
              <Marker coordinate={{ latitude: localizacao.coords.latitude, longitude: localizacao.coords.longitude, }}
                title="Você está aqui"/>
            </MapView>
          ) : (
            <View className="flex-1 items-center justify-center bg-gray-300">
              <Text className="text-white font-semibold">{errorMsg || "Localização não disponível"}</Text>
            </View>
          )}
        </View>

        <View className="flex-row justify-center mb-6 px-2">
          <TouchableOpacity onPress={() => router.push("/(agente)/monitoramento")} 
          className="bg-white rounded-xl items-center justify-center w-[48%] h-32">
            <Icon name="tv" size={32} color="#264027" />
            <Text className="font-bold text-center mt-2 text-[#264027]">MONITORAMENTO</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center justify-center">
          <View className="bg-white h-12 py-2 rounded-xl w-52 mb-2 items-center justify-center">
            <Text className="font-bold">OCORRÊNCIAS</Text>
          </View>
        </View>

        <Ocorrencias />
      </ScrollView>
    </SafeAreaView>
  );
}
