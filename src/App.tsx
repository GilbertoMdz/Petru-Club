// src/App.tsx
import { NavProvider } from "./app-nav/NavContext";
import Navigator from "./app-nav/Navigator";

export default function App() {
  return (
    <NavProvider>
      <Navigator />
    </NavProvider>
  );
}
