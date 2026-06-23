import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";

import { db } from "../services/firebaseConfig";

import {
  collection,
  getDocs
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
              {item.nome}
            </Text>
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
});