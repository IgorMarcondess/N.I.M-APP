import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/input";
import postCriarSensor from "../../services/POST/postCriarSensor";

const schema = z.object({
  local: z.string().min(1, "Local é obrigatório"),
  umidade: z.string().min(1, "Data é obrigatória"),
  temperatura: z.string().min(1, "Temperatura é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function FormMonitoramento() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      local: "",
      umidade: "",
      temperatura: "",
    },
  });

  const [loading, setLoading] = useState(false);

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
      Alert.alert("Sucesso", "Monitoramento enviado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o monitoramento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#264027] flex-1 items-center py-2 justify-center">
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingVertical: 32 }}>
        <View className="items-center justify-center w-full px-4">
          <Text className="text-white font-bold text-2xl mb-6">MONITORAMENTO</Text>

          <Text className="text-white font-semibold mb-1">LOCAL</Text>
          <Controller
            control={control}
            name="local"
            render={({ field: { onChange, value } }) => (
              <>
                <Input text="LOCAL" value={value} onChangeText={onChange} />
                {errors.local && <Text className="text-red-500 mb-2">{errors.local.message}</Text>}
              </>
            )}
          />

          <Text className="text-white font-semibold mb-1">DATA</Text>
          <Controller
            control={control}
            name="umidade"
            render={({ field: { onChange, value } }) => (
              <>
                <Input text="UMIDADE" value={value} onChangeText={onChange} keyboardType="numeric"/>
                {errors.data && <Text className="text-red-500 mb-2">{errors.data.message}</Text>}
              </>
            )}
          />

          <Text className="text-white font-semibold mb-1">TEMPERATURA</Text>
          <Controller
            control={control}
            name="temperatura"
            render={({ field: { onChange, value } }) => (
              <>
                <Input text="TEMPERATURA" value={value} onChangeText={onChange} keyboardType="numeric" />
                {errors.temperatura && <Text className="text-red-500 mb-2">{errors.temperatura.message}</Text>}
              </>
            )}
          />

          <TouchableOpacity
            className="bg-transparent border border-lime-400 rounded-full py-3 px-8 mt-10 items-center"
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold">ENVIAR</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
