import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, ActivityIndicator } from "react-native";

type Ocorrencia = {
  solicitante: string;
  cidade: string;
  estado: string;
  ocorrencia: string;
};

export default function Ocorrencias(){
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMockData() {
      try {
        // Simula uma espera de 1 segundo
        await new Promise(resolve => setTimeout(resolve, 1000));

        const data: Ocorrencia[] = [
          {
            solicitante: "João Silva",
            cidade: "São Paulo",
            estado: "SP",
            ocorrencia: "Incêndio em residência na zona norte.",
          },
          {
            solicitante: "Maria Oliveira",
            cidade: "Rio de Janeiro",
            estado: "RJ",
            ocorrencia: "Acidente de trânsito com vítimas.",
          },
          {
            solicitante: "Carlos Lima",
            cidade: "Belo Horizonte",
            estado: "MG",
            ocorrencia: "Deslizamento de terra próximo a escola.",
          },
        ];

        setOcorrencias(data);
      } catch (error) {
        console.error("Erro ao simular ocorrências:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMockData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

    return(
      <>

        {ocorrencias.map((item) => (
            <TouchableOpacity
              key={item.solicitante}
              className="bg-white rounded-xl p-4 mt-4 w-[90%] self-center items-center"
            >
              <Text className="font-bold">SOLICITANTE:</Text>
              <Text>{item.solicitante}</Text>

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