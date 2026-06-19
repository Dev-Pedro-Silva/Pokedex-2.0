import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [pokemon, setPokemon] = useState(null);
  const [id, setId] = useState(1);
  const [BuscarNome, setBuscarNome] = useState("");

  useEffect(() => {
    fetchPokemon();
  }, [id]);

  const tiposImagens = {
  normal: require("./assets/tipos/tipo_normal.png"),
  fire: require("./assets/tipos/tipo_fogo.png"),
  water: require("./assets/tipos/tipo_agua.png"),
  electric: require("./assets/tipos/tipo_eletrico.png"),
  grass: require("./assets/tipos/tipo_grama.png"),
  ice: require("./assets/tipos/tipo_gelo.png"),
  fighting: require("./assets/tipos/tipo_lutador.png"),
  poison: require("./assets/tipos/tipo_venenoso.png"),
  ground: require("./assets/tipos/tipo_terra.png"),
  flying: require("./assets/tipos/tipo_voador.png"),
  psychic: require("./assets/tipos/tipo_pisiquico.png"),
  bug: require("./assets/tipos/tipo_inseto.png"),
  rock: require("./assets/tipos/tipo_pedra.png"),
  ghost: require("./assets/tipos/tipo_fantasma.png"),
  dragon: require("./assets/tipos/tipo_dragao.png"),
  dark: require("./assets/tipos/tipo_sombrio.png"),
  steel: require("./assets/tipos/tipo_aco.png"),
  fairy: require("./assets/tipos/tipo_fada.png"),
};

  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      const poke = {
        id: data.id,
        nome: data.name.toUpperCase(),
        imagem: data.sprites.front_default,
        tipo1: data.types[0]?.type.name,
        tipo2: data.types[1]?.type.name,
      };
      setPokemon(poke);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarPorNome = async () => {
    try {
      const response = await fetch(
        `http://pokeapi.co/api/v2/pokemon/${BuscarNome.toLocaleLowerCase()}`,
      );

      const data = await response.json();

      const poke = {
        id: data.id,
        nome: data.name.toUpperCase(),
        imagem: data.sprites.front_default,
        tipo1: data.types[0]?.type.name,
        tipo2: data.types[1]?.type.name,
      };

      setPokemon(poke);
      setId(data.id);
    } catch (error) {
      console.log("Pokémon não encontrado");
    }
  };

  return (
    pokemon && (
        <ScrollView contentContainerStyle={styles.container}>

          <View style={styles.container}>
            <View style={styles.areaLogo}>
              <Image source={require("./assets/logo.png")} />
            </View>

            <View style={styles.areaImagem}>
              <Image source={{ uri: pokemon.imagem }} style={styles.imagemPoke} />
            </View>

            <View style={styles.areaDesc}>
              <View style={styles.areaId}>
                <Text style={styles.txtDesc}>ID: </Text>
                <Text style={styles.txtInfo}>{pokemon?.id}</Text>
              </View>

              <View style={styles.areaNome}>
                <Text style={styles.txtDesc}>Nome: </Text>
                <Text style={styles.txtInfo}>{pokemon?.nome}</Text>
              </View>

              <View style={styles.areaTipo}>
                <Text style={styles.txtTipo}>Tipo: </Text>
          
                {pokemon?.tipo1 && (
                  <Image
                    source={tiposImagens[pokemon?.tipo1]}
                    style={styles.imgTipo}
                  />
                )}
                {pokemon?.tipo2 && (
                  <Text style={styles.txtTipo}>Tipo 2: </Text>
                )}
                {pokemon?.tipo2 && (
                  <Image
                    source={tiposImagens[pokemon?.tipo2]}
                    style={styles.imgTipo}
                  />
                )}
              </View>
            </View>
          
            <View style={styles.areaMenu}>
              <View style={styles.areaBusca}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o nome do Pokemón"
                  value={BuscarNome}
                  onChangeText={setBuscarNome}
                />
                <TouchableOpacity style={styles.btn} onPress={buscarPorNome}>
                  <Text style={styles.txtBtn}>Buscar</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.areaBtn}>
                <TouchableOpacity style={styles.btn} onPress={() => setId(1)}>
                  <Text style={styles.txtBtn}>Voltar Início</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => id > 1 && setId(id - 1)}
                >
                  <Text style={styles.txtBtn}>Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => setId(id + 1)}>
                  <Text style={styles.txtBtn}>Próximo</Text>
                </TouchableOpacity>
              </View>
            </View>
            <StatusBar style="auto" />
          </View>
        </ScrollView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#0066ff",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 500,
    alignSelf: "center"
  },
  areaLogo: {
    marginTop: 20,
  },
  areaImagem: {
    marginVertical: 20,
  },
  areaDesc: {
    alignItems: "center",
    gap: 5,
    marginVertical: 20
  },
  txtDesc: {
    color: "white",
    alignSelf: "center",
  },
  areaId: {
    flexDirection: "row",
  },
  areaNome: {
    flexDirection: "row",
  },
  txtInfo:{
    fontSize: 20,
    fontWeight: "bold",
  },
  areaTipo: {
    flexDirection: "row",
  },
  txtTipo: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
  },
  imgTipo:{
    width: 70,
    height: 70
  },
  areaMenu:{
    marginVertical: 20,
    alignItems: "center",
    alignContent: "center"
  },
  areaBusca:{
    alignItems: "center",
    padding: 5
  },
  input: {
    backgroundColor: "rgb(73, 73, 73)",
    borderWidth: 1,
    width: 200,
    height: 40,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },
  areaBtn: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 5,
  },
  btn: {
    backgroundColor: "rgb(22, 78, 161)",
    padding: 10,
    borderRadius: 8,
    width: 110,
    alignItems: "center",
    alignSelf: "center",
  },
  txtBtn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imagemPoke: {
    width: 170,
    height: 170,
    borderStyle: 'solid',
    borderColor: 'rgb(28, 97, 201)',
    borderWidth: 5,
    borderRadius: 100,
    backgroundColor: "rgb(238, 255, 0)"
  },
});
