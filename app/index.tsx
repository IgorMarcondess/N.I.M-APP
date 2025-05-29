import { Input } from "@/components/input";
import { useState } from "react";
import { ImageBackground, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [isAgente, setIsAgente] = useState(true); // true = AGENTE, false = USUÁRIO

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={require("../assets/login_imagem_fundo.jpg")} className="flex-1 justify-center items-center">
        <View className="w-[90%] bg-white rounded-xl overflow-hidden shadow-lg">
          
          <View className="flex-row">
            <TouchableOpacity className={`flex-1 py-4 items-center ${!isAgente ? "bg-green-500" : "bg-white"}`}
              onPress={() => setIsAgente(false)}>
              <Text className={`text-lg font-bold ${!isAgente ? "text-white" : "text-black"}`}>USUÁRIO</Text>
            </TouchableOpacity>

            <TouchableOpacity className={`flex-1 py-4 items-center ${isAgente ? "bg-green-500" : "bg-white"}`}
              onPress={() => setIsAgente(true)}>
              <Text className={`text-lg font-bold ${isAgente ? "text-white" : "text-black"}`}>AGENTE</Text>
            </TouchableOpacity>
          </View>

          <View className="p-6 space-y-4">
            <View className="items-center">
              <Text className="text-black font-semibold mb-1">{isAgente ? 'E-MAIL AGENTE' : 'E-MAIL USUÁRIO'}</Text>
              <Input />
            </View>

            <View className="items-center">
              <Text className="text-black font-semibold mb-1">SENHA</Text>
              <Input secureTextEntry />
            </View>

            <Pressable className="bg-green-500 rounded-xl mt-4 py-3 items-center">
              <Text className="text-white font-bold">ENTRAR</Text>
            </Pressable>
          </View>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}
