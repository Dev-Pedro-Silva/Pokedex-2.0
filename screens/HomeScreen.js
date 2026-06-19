import { View, Text, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text>Home Screen</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate("Detalhes")}
      >
        <Text style={{ color: "white" }}>
          Ir para Detalhes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "green",
          padding: 10,
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate("Favoritos")}
      >
        <Text style={{ color: "white" }}>
          Ir para Favoritos
        </Text>
      </TouchableOpacity>
    </View>
  );
}