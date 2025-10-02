import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API = "http://192.168.1.31:4000/api/auth"; // backend

export default function LoginScreen({ navigation }) {
  const { setUser, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      if (!res.data.ok) return Alert.alert("Error", res.data.error);
      setToken(res.data.token);
      setUser(res.data.user);
      navigation.replace("Channels"); // o a la pantalla principal
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Algo falló");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="Entrar" onPress={login} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
});
