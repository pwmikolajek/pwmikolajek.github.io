#!/usr/bin/env node
// Prints the /resume/ page to public/Pawel-Mikolajek-CV.pdf with headless Chrome.
// Run `npm run dev` first, then `npm run resume` (optionally pass another URL).
import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const url = process.argv[2] ?? "http://localhost:3000/resume/";
const out = fileURLToPath(new URL("../public/Pawel-Mikolajek-CV.pdf", import.meta.url));

const chrome = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].find((p) => p && existsSync(p));

if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH to a Chrome or Chromium binary.");
  process.exit(1);
}

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--print-to-pdf-no-header",
    "--virtual-time-budget=10000",
    `--print-to-pdf=${out}`,
    url,
  ],
  { stdio: "inherit" },
);

console.log(`Wrote ${out} (${Math.round(statSync(out).size / 1024)} KB) from ${url}`);
