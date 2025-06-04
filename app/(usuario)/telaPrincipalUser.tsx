import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import * as Location from "expo-location";
import Ocorrencias from "@/components/usuario/ocorrencias";
import { useUser } from "../../components/usuario/userContext";

export default function TelaPrincipalUser() {
  const [nomeUsuario, setNomeUsuario] = useState("Fulano");
  const { user } = useUser()
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
      <SafeAreaView className="flex-1 bg-white px-6 py-10 items-center">
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <Text className="text-center text-xl font-bold mt-6 text-[#264027]">
            Bem-vindo {user?.nomeUser}!
          </Text>

          <TouchableOpacity
            className="bg-white border border-[#264027] py-3 px-10 rounded-xl mt-6 self-center"
            onPress={() => router.push("/")}
          >
            <Text className="text-[#264027] font-bold">CRIAR OCORRÊNCIA</Text>
          </TouchableOpacity>

          <View className="mt-8 border rounded-t-xl overflow-hidden h-96 w-96">
            <Text className="bg-gray-100 text-center py-2 font-semibold">LOCALIZAÇÃO ATUAL</Text>

            {localizacao ? (
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: localizacao.coords.latitude,
                  longitude: localizacao.coords.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                showsUserLocation
              >
                <Marker
                  coordinate={{
                    latitude: localizacao.coords.latitude,
                    longitude: localizacao.coords.longitude,
                  }}
                  title="Você está aqui"
                />
              </MapView>
            ) : (
              <View className="bg-gray-300 h-full items-center justify-center">
                <Text className="text-gray-700">
                  {errorMsg || "Carregando localização..."}
                </Text>
              </View>
            )}
          </View>

          <View className="bg-[#264027] py-3 px-6 rounded-xl mt-6 mb-8 self-center">
            <Text className="text-white font-bold">OCORRÊNCIAS</Text>
          </View>

          <Ocorrencias />
        </ScrollView>
      </SafeAreaView>
  );
}
