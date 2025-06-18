# Task Dashboard

A modern task management dashboard built with Next.js 15, React 19, Redux Toolkit, Material UI, and TypeScript. This app allows you to create, update, delete, and organize tasks with a beautiful UI.

## Features

- Add, edit, and delete tasks
- Kanban board view
- Material UI design
- State management with Redux Toolkit
- TypeScript for type safety

## Prerequisites

- Node.js (v18 or newer recommended)
- npm (v9 or newer) or yarn or pnpm

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Linting

```bash
npm run lint
```

## Project Structure

```
app/                # Next.js app directory (routing, pages)
src/components/     # Reusable React components
src/store/          # Redux Toolkit store, slices, hooks
src/theme/          # Material UI theme
src/types/          # TypeScript types
src/utils/          # Utility functions
```

## State Management

- **Redux Toolkit** is used for state management (`src/store`).
- The store is configured in `src/store/index.ts`.
- The app is wrapped with `<Provider>` in `app/layout.tsx`.

## License

MIT (or specify your license)

# 🗂️ Task Management Dashboard

A feature-rich task management app built with **Next.js (App Router)**, **React 19**, **Redux Toolkit**, **Material-UI (MUI)**, **Tailwind CSS**, and **TypeScript**.

---

## 📘 Documentation

### 🏗️ Architectural Decisions

- **Next.js App Router + TypeScript:**  
  The App Router architecture was used for modular scalability and modern React capabilities (RSC, layouts, etc.).

- **Redux Toolkit:**  
  Used for global state management. Slices and hooks are organized in the `/store` directory with strongly typed actions and selectors.

- **Material-UI + Tailwind CSS:**

  - MUI handles components like `Dialog`, `DataGrid`, `Snackbar`, and `Card` for accessible and consistent UI.
  - Tailwind handles layout, spacing, and responsive design for speed and control.

- **Modular Folder Structure:**  
  Organized into `/src` with clear separation between `components/`, `store/`, `utils/`, and `types/`.

---

### 📌 Assumptions Made

- Tasks are stored in memory (Redux) and persist only during the session.
- The dashboard is for a single user with no authentication.
- No backend was implemented; all logic is client-side.
- Assumed a reasonable number of tasks (~100), so pagination and virtualization were not needed.
- **Redux persist is not implemented** but considered as a future improvement to store tasks in localStorage between sessions.

---

### ⚙️ Challenges Faced and Solutions Implemented

- **Problem:** Peer dependency conflicts with React 19.
- **Solution:** Dropped the package and used the native HTML5 Drag & Drop API instead.

#### 🧩 Redux `updateTask` logic not working

- **Problem:** The update function expected `{ id, updates }`, but the entire task object was being dispatched.
- **Solution:** The payload structure was fixed to match the expected shape using `updateTask({ id, updates })`.

#### 💾 State not persistent between refreshes

- **Problem:** All tasks disappeared on reload.
- **Solution (future):** Redux persist with localStorage was noted as an enhancement to be implemented later.

#### 🎨 MUI and Tailwind CSS conflict potential

- **Problem:** Conflicts when mixing utility classes with styled components.
- **Solution:** Clear rule: MUI handles component logic and interactive UI, while Tailwind is used for layout and spacing.

#### 🚧 TypeScript errors on drag and drop

- **Problem:** Implicit `any` types for `provided` and `snapshot` in DnD render props.
- **Solution:** Switched to native drag and drop to eliminate type dependency issues entirely.

---
