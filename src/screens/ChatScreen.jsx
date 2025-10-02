import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";

export default function ChatScreen({ route }) {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text) return;
    const newMessage = { id: Date.now(), text };
    setMessages((prev) => [...prev, newMessage]);
    setText("");
    // aquí se integrara el socket / API
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Chat {chatId}</Text>
      <FlatList
        style={{ flex: 1 }}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 8, borderBottomWidth: 1 }}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Escribe un mensaje"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Enviar" onPress={sendMessage} />
    </View>
  );
}
