"use client";

import * as React from "react";
import { Terminal } from "./Terminal";

type TerminalContextValue = {
  open: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
};

const TerminalContext = React.createContext<TerminalContextValue | null>(null);

export function useTerminal() {
  const ctx = React.useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminal must be used inside TerminalProvider");
  return ctx;
}

const SITE_ROOT_ID = "site-root";

/**
 * Owns "bot mode": the full-screen terminal that replaces the site. It is
 * linkable (/?bot), locks the page behind it, and returns focus on exit.
 */
export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const returnFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (new URLSearchParams(window.location.search).has("bot")) setOpen(true);
  }, []);

  const openTerminal = React.useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    window.history.replaceState(null, "", `${window.location.pathname}?bot${window.location.hash}`);
    setOpen(true);
  }, []);

  const closeTerminal = React.useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("bot");
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`,
    );
    setOpen(false);
  }, []);

  // While open, the site underneath is inert and the page can't scroll.
  React.useEffect(() => {
    if (!open) return;
    const root = document.getElementById(SITE_ROOT_ID);
    const prevOverflow = document.body.style.overflow;
    root?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    return () => {
      root?.removeAttribute("inert");
      document.body.style.overflow = prevOverflow;
      returnFocus.current?.focus?.();
    };
  }, [open]);

  const value = React.useMemo(
    () => ({ open, openTerminal, closeTerminal }),
    [open, openTerminal, closeTerminal],
  );

  return (
    <TerminalContext.Provider value={value}>
      <div id={SITE_ROOT_ID}>{children}</div>
      {open && <Terminal onExit={closeTerminal} />}
    </TerminalContext.Provider>
  );
}
