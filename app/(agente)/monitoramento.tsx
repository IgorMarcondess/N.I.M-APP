import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Monitoramento(){
    const latitude = -23.4326;
    const longitude = -46.6304;


    return(
        <>

        <SafeAreaView className="flex-1 bg-white items-center justify-start pt-10">
        <Text className="text-[#264027] text-2xl font-bold mb-4">SENSOR 3</Text>

        <View className="flex-row justify-between mb-4 gap-6 ">
          <View className='flex-row w-52 h-30'>
            <Text className=" text-[#264027] font-bold text-lg">CIDADE: </Text>
            <Text className="text-lg ">São Bernardo dos Campos</Text>
          </View>
          <View className='flex-row'>
            <Text className="text-[#264027]font-bold text-lg">ESTADO: </Text>
            <Text className="text-lg">São Paulo</Text>
          </View>
        </View>

        <View className="w-11/12 h-96 bg-gray-300 rounded-md overflow-hidden justify-center items-center mb-4">
            <MapView style={{ width: '100%', height: '100%' }}
            initialRegion={{ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}}>
            <Marker coordinate={{ latitude, longitude }} title="Sensor 3" />
            </MapView>
        </View>

        <View className="flex-row justify-around w-full px-10 mb-3">
            <View className="items-center">
            <Text className="font-bold text-xs">LATITUDE</Text>
            <Text className="text-xs">{latitude}</Text>
            </View>
            <View className="items-center">
            <Text className="font-bold text-xs">LONGITUDE</Text>
            <Text className="text-xs">{longitude}</Text>
            </View>
        </View>

        <View className="flex-row justify-around w-full px-10 mb-4">
            <Text className="text-[#264027] font-bold text-xl">TEMPERATURA: <Text className="font-normal text-green-900">28°C</Text></Text>
        </View>

        <View className="flex-row justify-around w-full px-10 mb-4">
            <Text className="text-[#264027] font-extrabold text-lg">VENTO: <Text className="font-normal">12 KM</Text></Text>
            <Text className="text-[#264027] font-extrabold text-lg">UMIDADE: <Text className="font-normal">80%</Text></Text>
        </View>

        <TouchableOpacity className="bg-green-900 px-10 py-2 rounded-full w-32 h-10 justify-center items-center mt-24">
            <Text className="text-white font-bold">Voltar</Text>
        </TouchableOpacity>
        </SafeAreaView>
            </>
    )
}