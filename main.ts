/**
 * Roast Your Own Agent — u-mfnakmal-roast-your-own-agent-2d221bda
 *
 * Writes one original, single-line roast of my own AI agent to
 * /output/entry.txt (or $MAKEFUN_OUTPUT_DIR outside the grader).
 *
 * The roast is a fixed string baked into the code: no Date, no random,
 * no network, no environment input — both grader runs write the same
 * bytes. The program validates its own output before writing: exactly
 * one line, 1–200 Unicode code points, not only whitespace.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, playful and self-deprecating, never hateful.
// Setup is short, the punchline lands at the end.
const ROAST =
  "My agent treats every one-liner like a hostage negotiation: three drafts, two apologies, and the joke still walks free.";

const MAX_CODE_POINTS = 200;

function codePointLength(text: string): number {
  return [...text].length;
}

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const length = codePointLength(text);
  if (length < 1 || length > MAX_CODE_POINTS) {
    throw new Error(
      `entry must be 1–${MAX_CODE_POINTS} characters, got ${length}`,
    );
  }
}

function resolveOutputDir(): string {
  // The grader writes to /output; outside it, MAKEFUN_OUTPUT_DIR stands in.
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function main(): void {
  validateEntry(ROAST);
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), ROAST, "utf8");
}

main();
