import GetAlertas from "@/services/GET/getAlertas";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, ActivityIndicator } from "react-native";

type Ocorrencia = {
  id: number;
  data: string;
  horario?: string;
  cidade: string;
  estado: string;
  ocorrencia: string;
  finalizado: boolean;
  resolucao?: string | null;
};

export default function Ocorrencias(){
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    async function fetchAlertas() {
      try {
        const data = await GetAlertas();
        setOcorrencias(data);
      } catch (error) {
        console.error("Erro ao carregar alertas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAlertas();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

    return(
      <>

        {ocorrencias.map((item) => (
            <TouchableOpacity
              key={item.cidade}
              className="bg-white rounded-xl p-4 mt-4 w-[90%] self-center items-center"
            >
              <Text className="font-bold">SOLICITANTE:</Text>
              <Text>{item.cidade}</Text>

              <View className="flex-row mt-2 mb-2">
                <Text className="font-bold">CIDADE: </Text>
                <Text>{item.cidade}</Text>

                <Text className="ml-4 font-bold">ESTADO: </Text>
                <Text>{item.estado}</Text>
              </View>

              <Text className="font-bold mt-2">OCORRÊNCIA:</Text>
              <Text>{item.ocorrencia}</Text>
            </TouchableOpacity>
          ))}

      </>
    )
}