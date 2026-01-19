# Test Task

A fast-paced reaction game built with React, TypeScript, and Vite. Test your reflexes by clicking on active squares before time runs out!

## 🎮 Demo

Live demo: [https://test-game-rust.vercel.app/](https://test-game-rust.vercel.app/)

## 🎯 Game Rules

- A random square lights up on a 10x10 grid
- Click the active square before the timer runs out to score a point
- If you miss, the computer scores a point
- First to reach 10 points wins!

## ✨ Features

- **Adjustable difficulty**: Set the reaction time window (in milliseconds)
- **Real-time scoring**: Track your score vs the computer
- **Visual feedback**: Different square states (active, success, failed, inactive)
- **Win condition**: Game ends when either player reaches 10 points
- **Fully responsive**: Optimized for all screen sizes down to 360px width

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Code Quality

Lint the code:

```bash
npm run lint
```

Format the code:

```bash
npm run format
```

## 📱 Responsive Design

The game is fully responsive and optimized for:

- Desktop screens
- Tablets
- Mobile devices (down to 360px width)

## 📁 Project Structure

```
src/
├── components/      # React components
│   ├── ControlsSection.tsx
│   ├── Grid.tsx
│   ├── Modal.tsx
│   └── ScoreDisplay.tsx
├── App.tsx          # Main application component
├── constants.ts     # Game constants
├── types.ts         # TypeScript type definitions
└── utils.ts         # Utility functions
```

## 🎨 Game States

- **Initial**: Game hasn't started yet
- **Running**: Game is in progress
- **Finished**: A player has reached the winning score
