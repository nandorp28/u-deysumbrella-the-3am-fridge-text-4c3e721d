// The 3AM Fridge Text — a smart fridge texts its owner at 3am.
// Writes the single line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Gate: 1-140 UTF-8 characters, single line, no leading/trailing whitespace.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "3:04 AM. You have opened me 11 times tonight and eaten nothing. I am not a museum. Take the leftovers or close me.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
}
if (LINE.trim() !== LINE || LINE.trim().length === 0) {
  throw new Error("entry must be a single line with no leading/trailing whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file holds exactly the validated line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
console.log(`Wrote ${chars.length} characters, 1 line`);
