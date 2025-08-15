# Next.js AI Chatbot

A customizable AI chatbot built with Next.js, featuring persona-based interactions and dynamic chat interfaces.

## Features

- **Persona-Based Chat**: Engage with AI personas tailored to specific roles or characters.
- **Dynamic Routing**: Each persona has a unique chat page (e.g., `/chat/[id]`).
- **Server-Side Persona Loading**: Personas are loaded from `.txt` files located in `src/lib/personas/`.
- **Image Support**: Display persona avatars alongside chat messages.
- **Tailwind CSS Styling**: Fully responsive and customizable UI.

## Project Structure

src/
├─ app/
│ └─ chat/
│ └─ [id]/page.tsx
├─ components/
│ └─ PersonaCard.tsx
├─ lib/
│ └─ personas/
│ ├─ hitesh.txt
│ └─ piyush.txt
│ └─ getPersona.server.ts
├─ public/
│ └─ images/
│ ├─ hitesh.jpg
│ └─ piyush.jpg
└─ styles/
└─ globals.css

# Setup Instructions

1. Clone the Repository
```bash
git clone https://github.com/Harshof16/Persona-AI-Chatbot.git
cd <project-directory>
```

2. Install Dependencies
```bash
npm install
```

3. Configure Tailwind CSS

Ensure your globals.css includes the following:
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In tailwind.config.js, set the content paths:
```bash
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Configure Next.js

In next.config.js, allow images from external domains:
```bash
module.exports = {
  images: {
    domains: ['i.ibb.co'],
  },
}
```

5. Add Persona Files

Create .txt files for each persona in the src/lib/personas/ directory. For example:
```bash
Name: Hitesh
Title: AI Specialist
Bio: Expert in machine learning and AI technologies.
AvatarUrl: https://i.ibb.co/XZtX7N84/hitesh.jpg
```

6. Run the Development Server
```bash
npm run dev
```

Visit http://localhost:3000 to interact with the chatbot.

## Customization

- **Personas**: Add or modify persona .txt files in the src/lib/personas/ directory.

- **Chat Interface**: Customize the chat UI in the components/ChatWindow.tsx file.

- **Styling**: Adjust styles in the styles/globals.css file.

