import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { getGroqResponse } from "../services/groqService";

import {
  saveMessages,
  loadMessages,
  clearMessages,
} from "../storage/chatStorage";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  time: string;
};

export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const stored = await loadMessages();

      if (stored.length > 0) {
        setMessages(stored);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    saveMessages(messages);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  }, [messages]);

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleClearChat = async () => {
    await clearMessages();
    setMessages([]);
  };

  const sendQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");

    try {
      setLoading(true);

      const reply = await getGroqResponse(
        currentMessage
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "ai",
        time: getTime(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Something went wrong.",
        sender: "ai",
        time: getTime(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            AI Chat Assistant
          </Text>

        </View>

        <TouchableOpacity
          onPress={handleClearChat}
        >
          <Text style={styles.clear}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      {/* Empty State */}

      {messages.length === 0 && (
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>
            👋 Hey!
          </Text>

          <Text style={styles.welcomeText}>
            Ask anything and get instant AI
            responses.
          </Text>

          <TouchableOpacity
            style={styles.suggestion}
            onPress={() =>
              sendQuickPrompt(
                "Explain Machine Learning"
              )
            }
          >
            <Text>
              Explain Machine Learning
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.suggestion}
            onPress={() =>
              sendQuickPrompt(
                "What is Generative AI?"
              )
            }
          >
            <Text>
              What is Generative AI?
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Messages */}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 15,
        }}
        renderItem={({ item }) => (
  <View
    style={{
      width: "100%",
      alignItems:
        item.sender === "user"
          ? "flex-end"
          : "flex-start",
    }}
  >
    <View
      style={[
        styles.bubble,
        item.sender === "user"
          ? styles.userBubble
          : styles.aiBubble,
      ]}
    >
      <Text
        style={{
          color:
            item.sender === "user"
              ? "white"
              : "black",
        }}
      >
        {item.text}
      </Text>

      <Text style={styles.time}>
        {item.time}
      </Text>
    </View>
  </View>
)}
      />

      {loading && (
        <Text style={styles.typing}>
          🤖 AI is thinking...
        </Text>
      )}

      {/* Input */}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask anything..."
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity
          disabled={loading}
          style={[
            styles.sendButton,
            loading && {
              opacity: 0.5,
            },
          ]}
          onPress={sendMessage}
        >
          <Text style={styles.sendText}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  header: {
    marginTop: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "gray",
    marginTop: 3,
  },

  clear: {
    color: "#EF4444",
    fontWeight: "bold",
  },

  welcome: {
    padding: 30,
    alignItems: "center",
  },

  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },

  welcomeText: {
    marginTop: 10,
    color: "gray",
    textAlign: "center",
  },

  suggestion: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    marginTop: 15,
    borderRadius: 12,
  },

  bubble: {
  maxWidth: "75%",
  padding: 12,
  borderRadius: 16,
  marginVertical: 6,
},

  aiBubble: {
  alignSelf: "flex-start",
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#E5E7EB",
  padding: 14,
  borderRadius: 18,
  maxWidth: "80%",
},

userBubble: {
  alignSelf: "flex-end",
  backgroundColor: "#2563EB",
  padding: 14,
  borderRadius: 18,
  maxWidth: "80%",
},

 time: {
  fontSize: 11,
  color: "#888",
  marginTop: 4,
},

  typing: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    color: "gray",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
  },

  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },

  sendButton: {
    backgroundColor: "#2563EB",
    marginLeft: 10,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  sendText: {
    color: "white",
    fontWeight: "bold",
  },
});