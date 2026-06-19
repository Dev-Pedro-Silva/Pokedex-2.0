import { View, Text, TouchableOpacity } from "react-native";

export default function DetalhesScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Tela de Detalhes</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white" }}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}