import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function MensagemAlerta({ mensagem }) {

  if (!mensagem) return null;

  return (
    <View style={styles.alerta}>
      <Text style={styles.texto}>
        {mensagem}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alerta: {
    position: "absolute",

    top: 20,

    alignSelf: "center",

    backgroundColor: "#222",

    paddingHorizontal: 20,
    paddingVertical: 12,

    borderRadius: 10,

    zIndex: 999,

    elevation: 10,
  },

  texto: {
    color: "white",
    fontWeight: "bold",
  },
});