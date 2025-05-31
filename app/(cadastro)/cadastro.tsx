import { Input } from "@/components/input";
import { useState } from "react";
import { Alert, ImageBackground, SafeAreaView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router } from "expo-router";


export default function Cadastro(){

    const formSchema = (isAgente: boolean) =>
        z.object({
        nome: z.string().nonempty("Nome obrigatório"),
        email: z.string().nonempty("E-mail obrigatório").email("Formato inválido"),
        senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
        telefone: z.string().nonempty("Telefone obrigatório"),
        identificador: isAgente ? z.string().regex(/^(M-|B-|IDF|CBM)/, "Formato da carteira inválido") : z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    });
    
    const [isAgente, setIsAgente] = useState(false);
    const schema = formSchema(isAgente);

    

    const { control, handleSubmit,
    formState: { errors },
    } = useForm({ resolver: zodResolver(schema),
        defaultValues: {
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        identificador: "",
        },
    });

    const handleCreate = async (data: any) => {
        console.log("Dados recebidos:", data);
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        // lógica de persistência aqui
    };

    return(
        <SafeAreaView className="flex-1 bg-[#264027]">
      <View className="w-[90%] self-center mt-8 rounded-xl overflow-hidden">
        <Text className="text-white text-center text-xl font-bold mb-4">CRIAÇÃO DE CONTA</Text>

        <View className="flex-row justify-center mb-4">
          <TouchableOpacity className={`px-6 py-2 rounded-xl mx-2 ${!isAgente ? "bg-white" : "bg-[#6A994E]"}`} onPress={() => setIsAgente(false)}>
            <Text className={`font-bold ${!isAgente ? "text-black" : "text-white"}`}>USUÁRIO</Text>
          </TouchableOpacity>

          <TouchableOpacity className={`px-6 py-2 rounded-xl mx-2 ${isAgente ? "bg-white" : "bg-[#6A994E]"}`} onPress={() => setIsAgente(true)}>
            <Text className={`font-bold ${isAgente ? "text-black" : "text-white"}`}>AGENTE</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center space-y-1">
          <Text className="text-white font-semibold mb-1 mt-4">NOME</Text>
          <Controller control={control} name="nome" 
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} text="Nome" />
          )}/>
          {errors.nome && <Text className="text-red-500">{errors.nome.message}</Text>}

          <Text className="text-white font-semibold mb-1">E-MAIL</Text>
          <Controller control={control} name="email"
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} keyboardType="email-address" text="E-mail" autoCapitalize="none" />
            )}/>
          {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

          <Text className="text-white font-semibold mb-1">SENHA</Text>
          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} text="Senha" secureTextEntry />
            )}
          />
          {errors.senha && <Text className="text-red-500">{errors.senha.message}</Text>}
          
          <Text className="text-white font-semibold mb-1">TELEFONE</Text>
          <Controller control={control} name="telefone"
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} text="Telefone" keyboardType="phone-pad" />
            )}/>
          {errors.telefone && <Text className="text-red-500">{errors.telefone.message}</Text>}
          
          <Text className="text-white font-semibold mb-1">{isAgente ? "Carteira Funcional" : "CPF"}</Text>
          <Controller control={control} name="identificador"
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} text={isAgente ? "Carteira Funcional" : "CPF"} keyboardType={isAgente ? "default" : "numeric"}/>
            )}/>
          {errors.identificador && <Text className="text-red-500">{errors.identificador.message}</Text>}
        </View>

        <View className="flex-row justify-between mt-6 px-4">
          <TouchableOpacity className="bg-gray-400 py-3 px-6 rounded-xl" onPress={() => router.back()}>
            <Text className="text-white font-bold">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#6A994E] py-3 px-6 rounded-xl" onPress={handleSubmit(handleCreate)}>
            <Text className="text-white font-bold">Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    )
}

