import {
  View,
  TextInput,
  Button
} from "react-native";

export default function ChatInput({
  text,
  setText,
  onSend
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10
      }}
    >
      <TextInput
        style={{
          flex: 1,
          borderWidth: 1,
          padding: 10,
          borderRadius: 10
        }}
        value={text}
        onChangeText={setText}
        placeholder="Type message..."
      />

      <Button
        title="Send"
        onPress={onSend}
      />
    </View>
  );
}