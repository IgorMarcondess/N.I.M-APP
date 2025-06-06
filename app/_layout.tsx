
import { Slot } from 'expo-router';
import 'react-native-reanimated';
import Tela from "./(agente)/ocorrencia"
import "../global.css";
import { UserProvider } from '../components/usuario/userContext';
import { OcorrenciaProvider } from '../components/ocorrenciaContext';


export default function RootLayoutNav() {


  return (
    <OcorrenciaProvider>
    <UserProvider>
      <Slot />
    </UserProvider>
    </OcorrenciaProvider>
  );
}
