import { Input } from "../../components/input";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router } from "expo-router";
import { auth } from "@/services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import ModalSucesso from "../../components/modalSucesso";
import CriarUsuario from "../../services/POST/postCriarUsuario";

export default function Cadastro() {
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    nome: z.string().nonempty("Nome obrigatório"),
    email: z.string().nonempty("E-mail obrigatório").email("Formato inválido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    telefone: z.string().nonempty("Telefone obrigatório"),
    identificador: z.string().nonempty("Nome obrigatório"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      identificador: "",
    },
  });

  const criacaoDeConta = async (data: any) => {
    setIsLoading(true);
    try {
      const infoUsuario = await createUserWithEmailAndPassword(auth, data.email, data.senha);
      const user = infoUsuario.user;
      console.log("Usuário criado:", user.uid);

      await CriarUsuario({
        cpfUser: data.identificador,
        nomeUser: data.nome,
        sobrenomeUser: "Sobrenome Fixo",
        telefoneUser: data.telefone,
        dataNascimentoUser: "2025-06-03",
        emailUser: data.email,
      });

      setIsModal(true);
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      let mensagem = "Erro ao criar conta.";
      if (error.code === "auth/email-already-in-use") {
        mensagem = "E-mail já está em uso.";
      }
      Alert.alert("Desculpa! Erro ao criar conta", mensagem);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-[#264027]">
        <View className="w-[90%] self-center mt-8 rounded-xl overflow-hidden">
          <Text className="text-white text-center text-xl font-bold mb-4">CRIAÇÃO DE CONTA</Text>

          <View className="items-center space-y-1">
            <Text className="text-white font-semibold mb-1 mt-4">NOME</Text>
            <Controller
              control={control}
              name="nome"
              render={({ field: { onChange, value } }) => (
                <Input value={value} onChangeText={onChange} text="Nome" />
              )}
            />
            {errors.nome && <Text className="text-red-500">{errors.nome.message}</Text>}

            <Text className="text-white font-semibold mb-1">E-MAIL</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  text="E-mail"
                  autoCapitalize="none"
                />
              )}
            />
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
            <Controller
              control={control}
              name="telefone"
              render={({ field: { onChange, value } }) => (
                <Input value={value} onChangeText={onChange} text="Telefone" keyboardType="phone-pad" />
              )}
            />
            {errors.telefone && <Text className="text-red-500">{errors.telefone.message}</Text>}

            <Text className="text-white font-semibold mb-1">CPF</Text>
            <Controller
              control={control}
              name="identificador"
              render={({ field: { onChange, value } }) => (
                <Input value={value} onChangeText={onChange} text="CPF" keyboardType="numeric" />
              )}
            />
            {errors.identificador && <Text className="text-red-500">{errors.identificador.message}</Text>}
          </View>

          <View className="flex-row justify-between mt-6 px-4">
            <TouchableOpacity
              className={`py-3 px-6 rounded-xl ${isLoading ? "bg-gray-300" : "bg-gray-400"}`}
              onPress={() => router.back()}
              disabled={isLoading}
            >
              <Text className="text-white font-bold">VOLTAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`py-3 px-6 rounded-xl ${isLoading ? "bg-lime-300" : "bg-[#6A994E]"}`}
              onPress={handleSubmit(criacaoDeConta)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold">REGISTRAR</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {isModal && <ModalSucesso visible={isModal} />}
      </SafeAreaView>
    </TouchableOpacity>
  );
}
