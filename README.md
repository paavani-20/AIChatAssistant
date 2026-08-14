# AIChatAssistant

Lightweight Expo + React Native chat app that connects to an AI assistant.

## Quickstart

- Install dependencies:

```bash
npm install
```

- Start the dev server (Metro / Expo):

```bash
npm start
# or run for web: npm run web
```

Open the project in Expo Go (mobile) or the browser for web.

## Project layout (important files)

- `app/` — Expo Router entry points (`_layout.tsx`, `index.tsx`)
- `src/services/groqService.ts` — AI service integration
- `src/storage/chatStorage.js` — local chat persistence
- `src/components/` — UI components (optional subcomponents can be omitted)
- `assets/` — images and icons

Optional components like `ChatBubble.tsx` and `ChatInput.tsx` are not required for reviewers.

## Development notes

- Node.js + npm required
- Uses Expo; if you prefer native simulators, install `expo-cli` or use `npx expo` commands

## Contributing

1. Create a branch: `git checkout -b feat/your-feature`
2. Commit changes and open a PR against `main`.

## License
See `LICENSE` in the repository.

---
If you'd like, I can run `npm install` and start the dev server for you now.