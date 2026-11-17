import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { RootStackParamList } from './src/navigation';
import DetalhesScreen from './src/screens/DetalhesScreen';
import ListaScreen from './src/screens/ListaScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1d4ed8' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Lista" component={ListaScreen} options={{ title: 'TaskFlow' }} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Detalhes da tarefa' }} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
