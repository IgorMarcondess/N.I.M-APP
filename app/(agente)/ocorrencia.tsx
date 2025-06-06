import React from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOcorrencia } from "../../components/ocorrenciaContext";
import { router } from "expo-router";
import axios from "axios";

const schema = z.object({
  resolucao: z.string().min(5, "A resolução deve ter pelo menos 5 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function FinalizarOcorrencia() {
  const { ocorrenciaSelecionada } = useOcorrencia();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      resolucao: "",
    },
  });

  const onSubmit = async (data: FormData) => {
      if (!ocorrenciaSelecionada) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#264027" />
          <Text>Carregando dados da ocorrência...</Text>
        </View>
      );
    }

      const dadosAtualizados = {
      id: ocorrenciaSelecionada.id,
      data: ocorrenciaSelecionada.data,
      horario: ocorrenciaSelecionada.horario,
      cidade: ocorrenciaSelecionada.cidade,
      estado: ocorrenciaSelecionada.estado,
      ocorrencia: ocorrenciaSelecionada.ocorrencia,
      resolucao: data.resolucao,
      finalizado: true,
    };

      try {
      const response = await axios.put( `http://192.168.15.10:8080/alerta/${ocorrenciaSelecionada.id}`, dadosAtualizados,);

      console.log("Ocorrência finalizada com sucesso!");
      router.push("/(agente)/telaPrincipal");
    } catch (error) {
      console.error("Erro ao finalizar ocorrência:", error);
    }

        router.push("/(agente)/telaPrincipal");
  };

    if (!ocorrenciaSelecionada) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#264027" />
          <Text>Carregando dados da ocorrência...</Text>
        </View>
      );
    }

  const [endereco, cidade] = ocorrenciaSelecionada.cidade.split("/");

  return (
    <SafeAreaView className="bg-[#264027] flex-1">
      <ScrollView contentContainerStyle={{ alignItems: "center", padding: 20 }}>
        <Text className="text-white text-2xl font-bold mb-16">DETALHES DA OCORRÊNCIA</Text>

        <Text className="text-white font-bold mb-2">LOCAL</Text>
        <TextInput value={endereco} editable={false} className="border border-white text-white rounded-md h-14 w-full px-3 py-2 mb-3" />

        <View className="flex-row w-full justify-between items-center mb-3">
          <View className="flex-1 mr-2 items-center">
            <Text className="text-white font-bold mb-2">CIDADE</Text>
            <TextInput value={cidade} editable={false} className="border border-white text-white w-full h-12 rounded-md px-3 py-2" />
          </View>
          <View className="flex-1 ml-2 items-center">
            <Text className="text-white font-bold mb-2">ESTADO</Text>
            <TextInput value={ocorrenciaSelecionada.estado} editable={false} className="border border-white text-white w-full h-12 rounded-md px-3 py-2" />
          </View>
        </View>

        <Text className="text-[#264027] font-semibold">TEMPERATURA</Text>
        <TextInput value={"27°C"} editable={false} className="border border-white rounded-md text-white w-full h-14 px-3 py-2 mb-3" />

        <Text className="text-white font-bold mb-2">DESCRIÇÃO</Text>
        <TextInput value={ocorrenciaSelecionada.ocorrencia} multiline editable={false} className="border border-white text-white rounded-md w-full px-3 py-2 mb-3 h-20" />

        <Text className="text-white font-bold mb-2">RESOLUÇÃO</Text>
        <Controller control={control} name="resolucao"
          render={({ field: { onChange, value } }) => (
            <TextInput className="border  border-white text-white rounded-md w-full h-20 px-3 py-2 mb-2"
              placeholder="Digite a resolução" value={value} onChangeText={onChange}/> 
              )}/>
        {errors.resolucao && <Text className="text-red-500 mb-2">{errors.resolucao.message}</Text>}

        <TouchableOpacity onPress={handleSubmit(onSubmit)} className="border border-lime-400 px-4 py-3 rounded-full w-full items-center mt-20 mb-3">
          <Text className="text-lime-400 font-bold">FINALIZAR OCORRÊNCIA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} className="border border-lime-400 px-4 py-3 rounded-full w-full mt-4 items-center">
          <Text className="text-lime-400 font-bold">VOLTAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
