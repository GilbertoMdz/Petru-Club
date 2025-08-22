// src/app-nav/NavContext.tsx
import { createContext, useContext, useState } from "react";
import type { Screen } from "./nav.types";

type NavCtx = { 
  screen: Screen; 
  go: (s: Screen) => void; 
  back: () => void 
};

const Ctx = createContext<NavCtx | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Screen[]>(["hero"]); // empezamos en hero
  const screen = history[history.length - 1];

  const go = (s: Screen) => setHistory((h) => [...h, s]);
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));

  return (
    <Ctx.Provider value={{ screen, go, back }}>
      {children}
    </Ctx.Provider>
  );
}

export const useNav = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useNav must be used inside NavProvider");
  return ctx;
};
