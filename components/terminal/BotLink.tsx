"use client";

import { SquareTerminal } from "lucide-react";
import { useTerminal } from "./TerminalProvider";

/** Header link that swaps the site for the terminal view. */
export function BotLink() {
  const { openTerminal } = useTerminal();
  return (
    <button
      type="button"
      onClick={openTerminal}
      aria-label="I’m a bot: open the terminal view"
      title="Terminal view"
      className="inline-flex h-9 items-center gap-2 rounded-full border hairline px-3 font-mono text-[12px] text-[var(--muted)] transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]"
    >
      <SquareTerminal size={14} aria-hidden />
      <span className="hidden sm:inline">I’m a bot</span>
    </button>
  );
}
