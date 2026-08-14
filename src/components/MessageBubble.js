import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <View
      style={[
        styles.container,
        isUser
          ? styles.userContainer
          : styles.aiContainer
      ]}
    >
      <Text style={styles.text}>
        {message.text}
      </Text>

      <Text style={styles.time}>
        {message.time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },

  userContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6"
  },

  aiContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#EEE"
  },

  text: {
    fontSize: 16
  },

  time: {
    fontSize: 10,
    marginTop: 5
  }
});