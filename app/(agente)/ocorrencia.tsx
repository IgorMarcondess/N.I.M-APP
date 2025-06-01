import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Ocorrencia(){

    const [modalVisible, setModalVisible] = useState(false);
    const [descricao, setDescricao] = useState('');

    const latitude = -23.45678;
    const longitude = -46.56789;

    const handleFinalizar = () => {
      if (!descricao.trim()) {
        Alert.alert('Erro', 'Por favor, descreva a finalização do chamado.');
        return;
      }

      console.log('Solução da ocorrência: ', descricao);
      setModalVisible(false);
      setDescricao('');
      Alert.alert('Sucesso', 'Ocorrência finalizada com sucesso!');
    };

  return (
        <SafeAreaView className="flex-1 bg-white px-4 pt-8 items-center">
      <Text className="text-2xl font-bold text-green-900 mb-4 text-center">OCORRÊNCIA</Text>

      <View className='justify-center items-center'>
        <Text className="font-bold text-lg">SOLICITANTE:</Text>
        <Text className="text-lg mb-1">EDUARDO RODRIGUES ANDRADE</Text>

        <View className="flex-row justify-between mb-1 gap-6 ">
          <View className='flex-row w-52 h-30'>
            <Text className="font-bold text-lg">CIDADE: </Text>
            <Text className="text-lg ">São Bernardo dos Campos</Text>
          </View>
          <View className='flex-row'>
            <Text className="font-bold text-lg">ESTADO: </Text>
            <Text className="text-lg">São Paulo</Text>
          </View>
        </View>

        <Text className="font-bold mt-2 text-lg">OCORRÊNCIA:</Text>
        <Text className="text-lg mb-4">Queimada com fogo chegando perto das casa</Text>
      </View>

      <View className="rounded-xl overflow-hidden h-64 mb-4 w-full bg-gray-200">
        <MapView className="flex-1" initialRegion={{ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
          <Marker coordinate={{ latitude, longitude }} title="Local da ocorrência" />
        </MapView>
      </View>

      <View className="flex-row justify-center mb-6 px-2 gap-6">
        <Text className="text-center text-xs">LATITUDE{"\n"}{latitude}</Text>
        <Text className="text-center text-xs">LONGITUDE{"\n"}{longitude}</Text>
      </View>

      {/* BOTÃO PARA ABRIR O MODAL */}
      <TouchableOpacity className="border border-green-900 px-6 py-2 rounded-xl mb-3 items-center w-96 mt-6" onPress={() => setModalVisible(true)}>
        <Text className="text-green-900 font-bold">FINALIZAR OCORRÊNCIA</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-green-900 px-10 py-2 rounded-full w-44 h-12 justify-center items-center mt-36">
        <Text className="text-white font-bold">Voltar</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-opacity-10">
          <View className="bg-[#2F4F4F] w-11/12 rounded-xl p-6 items-center">
            <Text className="text-white text-xl font-bold mb-4">FINALIZAR OCORRÊNCIA?</Text>

            <TextInput placeholder="Descreva a finalização do chamado aqui!" placeholderTextColor="#999" multiline numberOfLines={4} 
            className="bg-white w-full rounded-lg p-3 text-black mb-4" value={descricao} onChangeText={setDescricao}/>

            <View className="flex-row justify-between w-full mt-2">
              <TouchableOpacity className="bg-white px-6 py-2 rounded-md w-1/2 mr-2" onPress={() => setModalVisible(false)} >
                <Text className="text-green-900 font-bold text-center">VOLTAR</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-white px-6 py-2 rounded-md w-1/2 ml-2" onPress={handleFinalizar} >
                <Text className="text-green-900 font-bold text-center">FINALIZAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}