"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { profile } from "@/content/profile";
import { COMMAND_NAMES, completions, isAction, Run, runCommand, type Ctx } from "./commands";

type Entry = { id: number; cmd: string | null; node: React.ReactNode };

const QUICK = ["help", "about", "work", "capabilities", "experience", "kind-words", "books", "contact"];
const PROMPT = "visitor@pawel:~$";
const DESKTOP_INPUT = "(min-width: 640px) and (hover: hover) and (pointer: fine)";

function Banner({ ctx }: { ctx: Ctx }) {
  return (
    <div>
      <div className="text-[var(--fg)]">
        {profile.name}, {profile.tagline}
      </div>
      <div className="text-[var(--muted)]">{profile.location}</div>
      <div className="h-3" aria-hidden />
      <div>Hello, bot. Everything on the site is available from here.</div>
      <div>
        Type{" "}
        <Run ctx={ctx} cmd="help">
          help
        </Run>{" "}
        to see the commands, or{" "}
        <Run ctx={ctx} cmd="exit">
          exit
        </Run>{" "}
        to go back to the site.
      </div>
    </div>
  );
}

export function Terminal({ onExit }: { onExit: () => void }) {
  const { theme, setTheme } = useTheme();
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const [value, setValue] = React.useState("");
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = React.useState<{ height: number; top: number } | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const history = React.useRef<string[]>([]);
  const cursor = React.useRef(-1);
  const nextId = React.useRef(1);

  // Commands call back into the terminal through a stable ctx.
  const executeRef = React.useRef<(line: string) => void>(() => {});
  const themeRef = React.useRef({ theme, setTheme });
  themeRef.current = { theme, setTheme };
  const ctx = React.useMemo<Ctx>(
    () => ({
      run: (c) => executeRef.current(c),
      get theme() {
        return themeRef.current.theme;
      },
      setTheme: (t) => themeRef.current.setTheme(t),
    }),
    [],
  );

  const append = React.useCallback((cmd: string | null, node: React.ReactNode) => {
    setEntries((e) => [...e, { id: nextId.current++, cmd, node }]);
  }, []);

  executeRef.current = (raw: string) => {
    const line = raw.trim();
    if (!line) {
      append("", null);
      return;
    }
    history.current.push(line);
    cursor.current = -1;
    const result = runCommand(line, ctx);
    if (isAction(result)) {
      if (result.action === "exit") onExit();
      else setEntries([]);
      return;
    }
    append(line, result);
  };

  // Greeting on first open.
  const greeted = React.useRef(false);
  React.useEffect(() => {
    if (!greeted.current) {
      greeted.current = true;
      append(null, <Banner ctx={ctx} />);
    }
    if (window.matchMedia(DESKTOP_INPUT).matches) inputRef.current?.focus();
    else dialogRef.current?.focus({ preventScroll: true });
  }, [append, ctx]);

  // iOS keyboards shrink the visual viewport rather than the layout viewport.
  React.useEffect(() => {
    const visible = window.visualViewport;
    if (!visible) return;
    const update = () => setViewport({ height: visible.height, top: visible.offsetTop });
    update();
    visible.addEventListener("resize", update);
    visible.addEventListener("scroll", update);
    return () => {
      visible.removeEventListener("resize", update);
      visible.removeEventListener("scroll", update);
    };
  }, []);

  // Keep the latest output in view.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const submit = () => {
    executeRef.current(value);
    setValue("");
  };

  const complete = () => {
    const { prefix, options } = completions(value);
    if (options.length === 0) return;
    if (options.length === 1) {
      setValue(`${prefix}${options[0]} `);
      return;
    }
    let common = options[0];
    for (const o of options) while (!o.startsWith(common)) common = common.slice(0, -1);
    const typed = value.slice(prefix.length);
    if (common.length > typed.length) setValue(prefix + common);
    else append(value, <div className="text-[var(--muted)]">{options.join("   ")}</div>);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = history.current;
      if (h.length === 0) return;
      cursor.current = cursor.current === -1 ? h.length - 1 : Math.max(0, cursor.current - 1);
      setValue(h[cursor.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const h = history.current;
      if (cursor.current === -1) return;
      cursor.current += 1;
      if (cursor.current >= h.length) {
        cursor.current = -1;
        setValue("");
      } else setValue(h[cursor.current]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      append(`${value}^C`, null);
      setValue("");
    } else if (e.key === "Escape") {
      e.preventDefault();
      onExit();
    }
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal view of the site"
      className="fixed inset-x-0 top-0 z-[100] flex h-[100dvh] flex-col bg-[var(--bg)] font-mono text-[12px] leading-[1.55] text-[var(--fg)] outline-none [-webkit-text-size-adjust:100%] sm:text-[14px] sm:leading-[1.65]"
      style={viewport ? { height: viewport.height, top: viewport.top } : undefined}
      onClick={(event) => {
        if (
          window.matchMedia(DESKTOP_INPUT).matches &&
          !(event.target as HTMLElement).closest("button, a, input, label") &&
          !window.getSelection()?.toString()
        ) inputRef.current?.focus();
      }}
    >
      <div className="flex shrink-0 items-center justify-between border-b hairline px-4 py-2 text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)] sm:px-8 sm:py-3">
        <span>Bot mode</span>
        <button
          type="button"
          onClick={onExit}
          className="min-h-9 rounded-full border hairline px-3 py-1 transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]"
        >
          Exit <span aria-hidden>· Esc</span>
        </button>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 [overflow-wrap:anywhere] sm:px-8 sm:py-6"
      >
        <div className="mx-auto max-w-[92ch]">
          {entries.map((e) => (
            <div key={e.id} className="mb-5">
              {e.cmd !== null && (
                <div className="whitespace-pre-wrap break-words">
                  <span className="text-[var(--muted)]">{PROMPT}</span> {e.cmd}
                </div>
              )}
              {e.node && <div className="break-words">{e.node}</div>}
            </div>
          ))}

        </div>
      </div>

      <div className="shrink-0 border-t hairline px-4 py-2 sm:px-8 sm:py-3">
          <form
            className="mx-auto flex max-w-[92ch] items-center gap-2"
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <label htmlFor="terminal-input" className="whitespace-nowrap text-[var(--muted)] focus-within:text-[var(--fg)]">
              {PROMPT}
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="send"
              aria-label="Terminal command"
              placeholder="Type a command"
              className="min-h-9 min-w-0 flex-1 bg-transparent text-[16px] text-[var(--fg)] caret-[var(--fg)] outline-none placeholder:text-[var(--muted)] sm:text-[14px]"
            />
          </form>
      </div>

      <div className="max-h-[35%] shrink-0 overflow-y-auto border-t hairline px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-3">
        <div className="mx-auto flex max-w-[92ch] flex-wrap gap-2">
          {QUICK.filter((c) => COMMAND_NAMES.includes(c)).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => executeRef.current(c)}
              className="min-h-9 rounded-full border hairline px-3 py-1 text-[11px] text-[var(--muted)] transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)] sm:text-[12px]"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
