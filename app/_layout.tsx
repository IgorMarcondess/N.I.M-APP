
import { Slot } from 'expo-router';
import 'react-native-reanimated';
import Tela from "./(agente)/ocorrencia"
import "../global.css";
import { UserProvider } from '../components/usuario/userContext';


export default function RootLayoutNav() {


  return (
    <UserProvider>
      <Slot />
    </UserProvider>

  );
}
