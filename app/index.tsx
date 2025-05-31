import { Input } from "@/components/input";
import { useState } from "react";
import { Alert, ImageBackground, SafeAreaView, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";


const formSchema = z.object({
  email: z.string().nonempty("E-mail obrigatório").email("Formato de e-mail inválido"),
  senha: z.string().nonempty("Senha obrigatória")
});


type ValuesForm = z.infer<typeof formSchema>;

export default function Index() {
  const [isAgente, setIsAgente] = useState(true);
  const [loading, setLoading] = useState(false);

  
  const {control, handleSubmit, formState: { errors },} = useForm<ValuesForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const login = async (data: ValuesForm) => {
    const { email, senha } = data;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert("Sucesso", "Login realizado!");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={require("../assets/login_imagem_fundo.jpg")} className="flex-1 items-center justify-center">
        <View className="w-[90%] bg-white rounded-xl overflow-hidden shadow-lg justify-center">
          <View className="flex-row">
            <TouchableOpacity className={`flex-1 py-4 items-center ${ !isAgente ? "bg-[#6A994E]" : "bg-white" }`} onPress={() => setIsAgente(false)}>
              <Text className={`text-lg font-bold ${ !isAgente ? "text-white" : "text-black" }`}> USUÁRIO</Text>
            </TouchableOpacity>

            <TouchableOpacity className={`flex-1 py-4 items-center ${ isAgente ? "bg-[#6A994E]" : "bg-white" }`} onPress={() => setIsAgente(true)}>
              <Text className={`text-lg font-bold ${ isAgente ? "text-white" : "text-black"}`}>AGENTE</Text>
            </TouchableOpacity>
          </View>

          <View className="p-6 space-y-4">
            <View>
              <Text className="text-black font-semibold mb-1"> {isAgente ? "E-MAIL AGENTE" : "E-MAIL USUÁRIO"}</Text>
              
              <Controller control={control} name="email"
                render={({ field: { onChange, value } }) => (
                  <Input value={value} onChangeText={onChange} keyboardType="email-address" autoCapitalize="none" />
                )} />
              {errors.email && ( <Text className="text-red-500 mt-1"> {errors.email.message} </Text>)}
            </View>

            <View>
              <Text className="text-black font-semibold mb-1">SENHA</Text>

              <Controller control={control} name="senha"
                render={({ field: { onChange, value } }) => (
                  <Input value={value} onChangeText={onChange} keyboardType="default" autoCapitalize="none" secureTextEntry/>
                )}/>
              {errors.senha && ( <Text className="text-red-500 mt-1">{errors.senha.message} </Text>
              )}
            </View>

            <TouchableOpacity onPress={handleSubmit(login)} className="bg-[#6A994E] rounded-xl mt-4 py-3 items-center" >
              {loading ? ( <ActivityIndicator color="#fff" /> ) : ( <Text className="text-white font-bold">ENTRAR</Text> )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push("/(cadastro)/cadastro")}  className="bg-[#6A994E] rounded-xl mt-8 py-4 px-16 items-center">
          <Text className="text-white font-black">REGISTRAR-SE</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
