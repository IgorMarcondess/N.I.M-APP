import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { Input } from "../../components/input";
import postCriarSensor from "../../services/POST/postCriarSensor";
import ModalSucesso from "../../components/modalSucesso";

const schema = z.object({
  local: z.string().min(1, "Local é obrigatório"),
  umidade: z.string().min(1, "Data é obrigatória"),
  temperatura: z.string().min(1, "Temperatura é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function CriarSensor() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      local: "",
      umidade: "",
      temperatura: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  let id = 1;
  const gerarId = () => {
    return id++;
  };

  const onSubmit = async (data: FormData) => {
    const infoData = new Date();
    const horario = infoData.toTimeString().split(" ")[0];

    try {
      setLoading(true);
      const userData = {
        id: 2,
        local: data.local,
        data: "2025-06-01",
        horario: horario,
        temperatura: parseFloat(data.temperatura),
        umidade: data.umidade,
        vento: 0,
      };

      await postCriarSensor(userData);
      setMostrarModal(true);
      setTimeout(() => {
        router.push("/(agente)/telaPrincipal");
        setMostrarModal(false);
      }, 5000);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o monitoramento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#264027] flex-1 items-center justify-center">
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingVertical: 32 }}>
        <View className="items-center justify-center w-full">
          <Text className="text-white font-bold text-2xl mb-6">MONITORAMENTO</Text>

          <View className="w-[100%] mb-4">
            <Text className="text-white font-semibold mb-1">LOCAL</Text>
            <Controller control={control} name="local"
              render={({ field: { onChange, value } }) => (
                <>
                  <Input text="LOCAL" value={value} onChangeText={onChange} />
                  {errors.local && <Text className="text-red-500">{errors.local.message}</Text>}
                </>)}/>
          </View>

          <View className="w-[100%] mb-4">
            <Text className="text-white font-semibold mb-1">UMIDADE</Text>
            <Controller control={control} name="umidade"
              render={({ field: { onChange, value } }) => (
                <>
                  <Input text="UMIDADE (%)" value={value} onChangeText={onChange} keyboardType="numeric" />
                  {errors.umidade && <Text className="text-red-500">{errors.umidade.message}</Text>}
                </>
              )}/>
          </View>

          <View className="w-[100%] mb-4">
            <Text className="text-white font-semibold mb-1">TEMPERATURA</Text>
            <Controller control={control} name="temperatura"
              render={({ field: { onChange, value } }) => (
                <>
                  <Input text="TEMPERATURA (°C)" value={value} onChangeText={onChange} keyboardType="numeric" />
                  {errors.temperatura && <Text className="text-red-500">{errors.temperatura.message}</Text>}
                </>
              )}
            />
          </View>

          <View className="flex-row w-[90%] justify-between mt-10">
            <TouchableOpacity disabled={loading} className="flex-1 bg-transparent border border-lime-400 rounded-full py-3 mr-2 items-center">
              <Text className="text-white font-bold">VOLTAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={loading}
              className="flex-1 bg-transparent border border-lime-400 rounded-full py-3 ml-2 items-center">
              {loading ? ( <ActivityIndicator color="#fff" /> ) : ( <Text className="text-white font-bold">ENVIAR</Text>)}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {mostrarModal && <ModalSucesso visible={mostrarModal} />}
    </SafeAreaView>
  );
}
