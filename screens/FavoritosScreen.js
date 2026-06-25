import React, { useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Animated
} from "react-native";

import { db } from "../services/firebaseConfig";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import MensagemAlerta from "../components/MensagemAlerta";


export default function FavoritosScreen({ navigation }) {

  const [mensagem, setMensagem] = useState("");

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  const slideAnim = useRef(
    new Animated.Value(50)
  ).current;

  const [favoritos, setFavoritos] = useState([]);

  const [editando, setEditando] = useState(null);
  const [novoApelido, setNovoApelido] = useState("");

  useEffect(() => {

    carregarFavoritos();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
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

      setMensagem("Favorito removido!");

      setTimeout(() => {
        setMensagem("");
      }, 2000);

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

      setMensagem("Apelido atualizado!");

      setTimeout(() => {
        setMensagem("");
      }, 2000);

    } catch (error) {
      console.log(error);

      setMensagem("Erro ao atualizar apelido.");

      setTimeout(() => {
        setMensagem("");
      }, 2000);
    }
  }

  function iniciarEdicao(item) {
    setEditando(item.id);
    setNovoApelido(item.apelido);
  }

  async function salvarEdicao(id) {

    if (!novoApelido.trim()) {
      setMensagem("Digite um apelido.");

      setTimeout(() => {
        setMensagem("");
      }, 2000);

      return;
    }

    await atualizarApelido(id, novoApelido);

    setEditando(null);
    setNovoApelido("");
  }

  return (
    <View style={styles.container}>

      <MensagemAlerta mensagem={mensagem} />

      <View style={styles.conteudo}>

        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.txtBtn}>
            ← Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Favoritos
        </Text>

        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Animated.View
              style={[
                styles.card,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim,
                    },
                  ],
                },
              ]}
            >

              <Image
                source={{ uri: item.imagem }}
                style={styles.imagemFavorito}
              />

              <Text style={styles.apelidoPrincipal}>
                {item.apelido}
              </Text>

              <Text style={styles.nomeOriginal}>
                {item.nome}
              </Text>

              {editando === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={novoApelido}
                    onChangeText={setNovoApelido}
                    placeholder="Novo apelido"
                  />

                  <TouchableOpacity
                    style={styles.btnSalvar}
                    onPress={() => salvarEdicao(item.id)}
                  >
                    <Text style={styles.txtBtn}>
                      Salvar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnCancelar}
                    onPress={() => setEditando(null)}
                  >
                    <Text style={styles.txtBtn}>
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.areaBotoes}>

                  <TouchableOpacity
                    style={styles.btnEditar}
                    onPress={() => iniciarEdicao(item)}
                  >
                    <Text style={styles.txtBtn}>
                      Editar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnExcluir}
                    onPress={() => excluirFavorito(item.id)}
                  >
                    <Text style={styles.txtBtn}>
                      Excluir
                    </Text>
                  </TouchableOpacity>

                </View>
              )}

            </Animated.View>
          )}
        />

      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  conteudo: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
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
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },

  nome: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  btnExcluir: {
    backgroundColor: "#cc0000",
    width: 120,
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
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

  areaBotoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  btnEditar: {
    backgroundColor: "#ff9800",
    width: 120,
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  btnCancelar: {
    backgroundColor: "#666",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  apelidoPrincipal: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },

  nomeOriginal: {
    color: "#d9d9d9",
    fontSize: 14,
    marginTop: 3,
  },

  btnVoltar: {
    backgroundColor: "#164ea1",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
});