import { Modal, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface PropsModalSucesso {
  visible: boolean;
}

export default function ModalSucesso({ visible }: PropsModalSucesso) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 justify-center items-center px-6">
        <View className="bg-white p-6 rounded-2xl w-full items-center space-y-4 shadow-lg">
          <Text className="text-[#264027] font-bold text-lg text-center">
            DADOS ENVIADOS COM{"\n"}SUCESSO
          </Text>

          <View className="rounded-full border-[3px] border-green-500 mt-4 p-2">
            <Icon name="check" size={50} color="limegreen" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
