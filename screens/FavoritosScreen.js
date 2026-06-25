import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";

import { db } from "../services/firebaseConfig";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

export default function FavoritosScreen({ navigation }) {

  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  async function carregarFavoritos() {
    try {

      const querySnapshot = await getDocs(
        collection(db, "favoritos")
      );

      const lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setFavoritos(lista);

    } catch (error) {
      console.log(error);
    }
  }

  async function excluirFavorito(id) {
    try {

      await deleteDoc(
        doc(db, "favoritos", id)
      );

      carregarFavoritos();

      alert("Favorito removido!");

    } catch (error) {
      console.log(error);
    }
  }

  async function atualizarApelido(id, novoApelido) {
    try {

      await updateDoc(
        doc(db, "favoritos", id),
        {
          apelido: novoApelido,
        }
      );

      carregarFavoritos();

      alert("Apelido atualizado!");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Favoritos
      </Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.nome}>
              {item.apelido}
            </Text>

            <Image
              source={{ uri: item.imagem }}
              style={styles.imagemFavorito}
            />

            <Text style={styles.apelido}>
              Apelido: {item.apelido}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Novo apelido"
              onChangeText={(texto) => {
                item.novoApelido = texto;
              }}
            />

            <TouchableOpacity
              style={styles.btnSalvar}
              onPress={() =>
                atualizarApelido(
                  item.id,
                  item.novoApelido || item.apelido
                )
              }
            >
              <Text style={styles.txtBtn}>
                Salvar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnExcluir}
              onPress={() =>
                excluirFavorito(item.id)
              }
            >
              <Text style={styles.txtBtn}>
                Excluir
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0066ff",
    padding: 20,
  },

  titulo: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#164ea1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  nome: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  btnExcluir: {
    backgroundColor: "#cc0000",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },

  txtBtn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },

  apelido: {
    color: "white",
    marginTop: 5,
  },

  btnSalvar: {
    backgroundColor: "green",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },

  imagemFavorito: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 10,
  },
});