# AI Chat Assistant

A React Native AI Chatbot built using Expo and Groq AI API.

## Overview

AI Chat Assistant is a mobile chatbot application that allows users to interact with an AI assistant through a clean and responsive chat interface. The application supports real-time AI responses, persistent chat history, loading indicators, and error handling.

This project was developed as part of the Mobile AI Chatbot Assignment.

---

## Features

### User-Friendly Chat Interface
- Clean chat layout
- User and AI message bubbles
- Auto-scrolling conversation view
- Responsive design for mobile devices

### AI Integration
- Integrated with Groq AI API
- Uses Llama 3.3 70B Versatile model
- Real-time conversational responses

### Chat History Persistence
- Stores conversations locally
- Messages remain available after app restart
- Implemented using AsyncStorage

### Loading Indicators
- Displays "AI is typing..." while waiting for responses

### Error Handling
- Handles API failures gracefully
- Displays fallback error messages when requests fail

### Additional Features
- Clear Chat button
- Message timestamps
- Mobile-first architecture
- Expo Router navigation support

---

## Tech Stack

### Frontend
- React Native
- Expo
- TypeScript

### AI Service
- Groq API
- Llama 3.3 70B Versatile

### Storage
- AsyncStorage

### Networking
- Axios

---

## Project Structure

```
AIChatAssistant/
│
├── assets/
│
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── explore.tsx
│   │
│   ├── services/
│   │   └── groqService.ts
│   │
│   └── storage/
│       └── chatStorage.js
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AIChatAssistant.git
cd AIChatAssistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Groq API Key

Open:

```text
src/services/groqService.ts
```

Replace:

```ts
const API_KEY = "YOUR_API_KEY";
```

with your Groq API key.

---

### 4. Start Application

```bash
npx expo start
```

or

```bash
npm start
```

---

### 5. Run on Device

#### Android

- Install Expo Go from Google Play Store
- Scan the QR code shown in the terminal

#### Web

Press:

```text
w
```

in Expo terminal.

---

## Third-Party Libraries Used

### Expo

Used for React Native development and cross-platform support.

### Axios

Used for HTTP requests to the AI API.

```bash
npm install axios
```

### AsyncStorage

Used for local chat history persistence.

```bash
npm install @react-native-async-storage/async-storage
```

### Groq AI API

Used to generate AI responses.

Official Website:

https://groq.com

---

## Architecture

The application follows a modular structure:

### UI Layer

- Chat Screen
- Message Components
- Input Components

### Service Layer

- Groq API communication
- Response processing

### Storage Layer

- Save messages
- Load messages
- Clear messages

---

## Future Improvements

- Dark Mode
- Voice Input
- Speech Output
- Multiple Chat Sessions
- Markdown Rendering
- User Authentication
- Cloud Chat Sync

---

## Author

Paavani K

BE Computer Science Engineering

Vivekananda College of Engineering & Technology (VCET)

---

## License

This project is for educational and assignment purposes.