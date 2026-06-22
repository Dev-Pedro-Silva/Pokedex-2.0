import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function DetalhesScreen({ route, navigation }) {
  const pokemon = route?.params?.pokemon;
  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>
          Pokémon não encontrado.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{pokemon.nome}</Text>

      <Image
        source={{ uri: pokemon.imagem }}
        style={styles.imagem}
      />

      <Text style={styles.info}>
        ID: {pokemon.id}
      </Text>

      <Text style={styles.info}>
        Tipo 1: {pokemon.tipo1}
      </Text>

      {pokemon.tipo2 && (
        <Text style={styles.info}>
          Tipo 2: {pokemon.tipo2}
        </Text>
      )}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.txtBtn}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0066ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  nome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  imagem: {
    width: 220,
    height: 220,
    marginBottom: 20,
    backgroundColor: "yellow",
    borderRadius: 110,
  },

  info: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "#164ea1",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  txtBtn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});