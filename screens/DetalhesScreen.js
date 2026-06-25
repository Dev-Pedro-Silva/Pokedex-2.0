import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";

import { db } from "../services/firebaseConfig";

import {
  collection,
  addDoc
} from "firebase/firestore";

export default function DetalhesScreen({ route, navigation }) {
  const pokemon = route?.params?.pokemon;

  const scaleAnim = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  async function salvarFavorito() {
    try {

      await addDoc(
        collection(db, "favoritos"),
        {
          idPokemon: pokemon.id,
          nome: pokemon.nome,
          imagem: pokemon.imagem,
          apelido: pokemon.nome,
          tipo1: pokemon.tipo1,
          tipo2: pokemon.tipo2 || null,
        }
      );

      alert("Pokémon favoritado com sucesso!");

    } catch (error) {
      console.log(error);
      alert("Erro ao salvar favorito.");
    }
  }

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>
          Pokémon não encontrado.
        </Text>
      </View>
    );
  }

  const tiposImagens = {
    normal: require("../assets/tipos/tipo_normal.png"),
    fire: require("../assets/tipos/tipo_fogo.png"),
    water: require("../assets/tipos/tipo_agua.png"),
    electric: require("../assets/tipos/tipo_eletrico.png"),
    grass: require("../assets/tipos/tipo_grama.png"),
    ice: require("../assets/tipos/tipo_gelo.png"),
    fighting: require("../assets/tipos/tipo_lutador.png"),
    poison: require("../assets/tipos/tipo_venenoso.png"),
    ground: require("../assets/tipos/tipo_terra.png"),
    flying: require("../assets/tipos/tipo_voador.png"),
    psychic: require("../assets/tipos/tipo_pisiquico.png"),
    bug: require("../assets/tipos/tipo_inseto.png"),
    rock: require("../assets/tipos/tipo_pedra.png"),
    ghost: require("../assets/tipos/tipo_fantasma.png"),
    dragon: require("../assets/tipos/tipo_dragao.png"),
    dark: require("../assets/tipos/tipo_sombrio.png"),
    steel: require("../assets/tipos/tipo_aco.png"),
    fairy: require("../assets/tipos/tipo_fada.png"),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{pokemon.nome}</Text>

      <Animated.Image
        source={{ uri: pokemon.imagem }}
        style={[
          styles.imagem,
          {
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          },
        ]}
      />

      <Text style={styles.info}>
        Tipos
      </Text>

      <View style={styles.areaTipos}>

        <Image
          source={tiposImagens[pokemon.tipo1]}
          style={styles.tipoImg}
        />

        {pokemon.tipo2 && (
          <Image
            source={tiposImagens[pokemon.tipo2]}
            style={styles.tipoImg}
          />
        )}

      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={salvarFavorito}
      >
        <Text style={styles.txtBtn}>
          Favoritar Pokémon
        </Text>
      </TouchableOpacity>

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

  areaTipos: {
    flexDirection: "row",
    marginVertical: 15,
  },

  tipoImg: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
  },
});