import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

const API = "http://192.168.1.31:4000/api/auth"; // backend

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (!name || !email || !password) return Alert.alert("Error", "Todos los campos son obligatorios");

    try {
      const res = await axios.post(`${API}/register`, { name, email, password });
      if (!res.data.ok) return Alert.alert("Error", res.data.error);
      Alert.alert("Éxito", "Usuario creado correctamente");
      navigation.goBack(); // volver al login
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Algo falló");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="Registrar" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
});
