import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rawOutputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputDir = isAbsolute(rawOutputDir) ? rawOutputDir : resolve(scriptDir, rawOutputDir);
const entry = "I read the terms.";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
const writtenText = readFileSync(join(outputDir, "entry.txt"), "utf8");
const expectedLength = 17;
const expectedByteLength = 17;
const expectedMinWords = 1;
const expectedMaxWords = 5;
const actualLength = [...writtenText].length;
const actualByteLength = Buffer.byteLength(writtenText, "utf8");
const actualLines = writtenText.split(/\r\n|\r|\n/).length;
const actualWords = writtenText.trim() ? writtenText.trim().split(/\s+/).length : 0;
if (actualLength !== expectedLength || actualByteLength !== expectedByteLength || actualLines !== 1 || writtenText !== entry || actualWords < expectedMinWords || actualWords > expectedMaxWords) {
  throw new Error(`Entry self-check failed: length expected ${expectedLength}, actual ${actualLength}; byte length expected ${expectedByteLength}, actual ${actualByteLength}; lines expected 1, actual ${actualLines}; text expected ${JSON.stringify(entry)}, actual ${JSON.stringify(writtenText)}; words expected ${expectedMinWords}-${expectedMaxWords}, actual ${actualWords}`);
}
