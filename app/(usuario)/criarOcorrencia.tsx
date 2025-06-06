import React, { useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";
import * as Location from "expo-location";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/input";
import { router } from "expo-router";
import CriarOcorrenciaAPI from "@/services/POST/postCriarOcorrencia";
import {useUser} from "../../components/usuario/userContext"

const cpfRegex = /^\d{11}$/;

const schema = z.object({
  endereco: z.string().min(1, "Endereço é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().min(1, "Estado é obrigatório"),
  observacao: z.string().min(10, "A observação deve ter pelo menos 10 caracteres"),
  cpf: z.string()
    .min(11, "CPF deve conter 11 dígitos")
    .regex(cpfRegex, "CPF inválido. Deve conter apenas números e ter 11 dígitos"),
});

type FormData = z.infer<typeof schema>;

export default function CriarOcorrencia() {
  const { user } = useUser()

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      endereco: "",
      cidade: "",
      estado: "",
      observacao: "",
      cpf: "",
    },
  });

  useEffect(() => {
    async function obterLocalizacaoEAtualizarCampos() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Permissão de localização não concedida");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const [info] = await Location.reverseGeocodeAsync(location.coords);

        if (info) {
          setValue("endereco", `${info.street || ""} ${info.name || ""}`.trim());
          setValue("cidade", info.city || "");
          setValue("estado", info.region || "");
        }
      } catch (error) {
        console.error("Erro ao obter localização:", error);
      }
    }

    obterLocalizacaoEAtualizarCampos();
  }, []);

  let id = 10;
  const gerarId = () => {
    return id++;
  };

  const onSubmit = async (data: FormData) => {
    const infoData = new Date();
    const horario = infoData.toTimeString().split(" ")[0];

   const userData = {
      id: 1,
      data: "2025-06-01",
      horario: horario,
      cidade: `${data.endereco}/${data.cidade}`,
      estado: data.estado,
      ocorrencia: data.observacao,
      finalizado: true,
      resolucao: "em analise",
    };

    try {
      if (!user?.cpfUser) {
        Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
        return;
      }
      
      await CriarOcorrenciaAPI(userData, user.cpfUser);
      console.log("Ocorrência enviada com sucesso!");
      Alert.alert("Sucesso", "Ocorrência registrada com sucesso.");
      router.push("/telaPrincipalUser");
    } catch (error) {
      console.error("Erro ao enviar ocorrência:", error);
      Alert.alert("Erro", "Não foi possível registrar a ocorrência.");
    }
  };

  return (
    <SafeAreaView className="bg-[#264027] flex-1 items-center py-8 justify-center">
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingVertical: 32 }}>
        <View className="items-center justify-center">
          <Text className="text-white font-bold text-2xl mb-6">ABRIR OCORRÊNCIA</Text>

          <Text className="text-white font-semibold mb-1">ENDEREÇO</Text>
          <Controller
            control={control}
            name="endereco"
            render={({ field: { onChange, value } }) => (
              <>
                <Input text="ENDEREÇO" value={value} onChangeText={onChange} />
                {errors.endereco && <Text className="text-red-500 mb-2">{errors.endereco.message}</Text>}
              </>
            )}
          />

          <Text className="text-white text-xl font-semibold mb-1">CIDADE</Text>
          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, value } }) => (
              <>
                <Input text="CIDADE" value={value} onChangeText={onChange} />
                {errors.cidade && <Text className="text-red-500 mb-2">{errors.cidade.message}</Text>}
              </>
            )}
          />

          <Text className="text-white text-xl font-semibold mb-1">ESTADO</Text>
          <Controller
            control={control}
            name="estado"
            render={({ field: { onChange, value } }) => (
              <>
                <Input text="ESTADO" value={value} onChangeText={onChange} />
                {errors.estado && <Text className="text-red-500 mb-2">{errors.estado.message}</Text>}
              </>
            )}
          />

          <Text className="text-white text-xl font-semibold mb-1">CPF</Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <>
                <Input text="CPF (apenas números)" value={value} onChangeText={onChange} keyboardType="numeric" />
                {errors.cpf && <Text className="text-red-500 mb-2">{errors.cpf.message}</Text>}
              </>
            )}
          />

          <Text className="text-white text-xl font-semibold mb-1">DESCRIÇÃO DO PROBLEMA</Text>
          <Controller
            control={control}
            name="observacao"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  multiline
                  numberOfLines={4}
                  text="Descreva o que está ocorrendo para que um analista consiga auxiliar"
                  value={value}
                  onChangeText={onChange}
                  styles="text-start h-full"
                />
                {errors.observacao && (
                  <Text className="text-red-500 mb-2 w-[90%] text-left">{errors.observacao.message}</Text>
                )}
              </>
            )}
          />

          <View className="flex-row w-[95%] justify-between mt-24">
            <TouchableOpacity className="flex-1 bg-transparent border border-lime-400 rounded-full py-3 ml-2 items-center"
              onPress={() => router.push("/(usuario)/telaPrincipalUser")}>
              <Text className="text-white font-bold">Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-transparent border border-lime-400 rounded-full py-3 ml-2 items-center"
              onPress={handleSubmit(onSubmit)}>
              <Text className="text-white font-bold">Finalizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
