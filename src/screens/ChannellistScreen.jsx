import React from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";

const dummyChannels = [
  { id: 1, name: "911" },
  { id: 2, name: "Bomberos" },
  { id: 3, name: "SEDENA" },
];

export default function ChannelistScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={dummyChannels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 15, borderBottomWidth: 1 }}
            onPress={() => navigation.navigate("Chat", { chatId: item.id })}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
