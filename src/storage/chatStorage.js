import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAT_KEY = "chat_history";

export const saveMessages = async (messages) => {
  try {
    await AsyncStorage.setItem(
      CHAT_KEY,
      JSON.stringify(messages)
    );
  } catch (error) {
    console.log("Save Error:", error);
  }
};

export const loadMessages = async () => {
  try {
    const data = await AsyncStorage.getItem(CHAT_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Load Error:", error);
    return [];
  }
};

export const clearMessages = async () => {
  try {
    await AsyncStorage.removeItem(CHAT_KEY);
  } catch (error) {
    console.log("Clear Error:", error);
  }
};