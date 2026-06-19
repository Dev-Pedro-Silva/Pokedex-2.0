import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import DetalhesScreen from "./screens/DetalhesScreen";
import FavoritosScreen from "./screens/FavoritosScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen}
        />

        <Stack.Screen
          name="Favoritos"
          component={FavoritosScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}