import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

export const getGroqResponse = async (
  message: string
): Promise<string> => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

   let text = response.data.choices[0].message.content;

// Remove markdown formatting
text = text.replace(/\*\*/g, "");
text = text.replace(/\#/g, "");
text = text.replace(/```/g, "");

return text;
  } catch (error: any) {
    console.log(error?.response?.data || error);

    return "Sorry, I couldn't process your request.";
  }
};