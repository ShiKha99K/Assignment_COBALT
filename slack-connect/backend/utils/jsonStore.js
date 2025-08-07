import { promises as fs } from "fs";
const TOKENS_PATH = "./data/tokens.json";

async function ensureTokensFile() {
  try {
    await fs.access(TOKENS_PATH);
  } catch {
    await fs.writeFile(TOKENS_PATH, "{}");
  }
}

export async function readTokens() {
  await ensureTokensFile();
  const data = await fs.readFile(TOKENS_PATH, "utf8");
  return JSON.parse(data || "{}");
}

export async function writeTokens(tokens) {
  await fs.writeFile(TOKENS_PATH, JSON.stringify(tokens, null, 2));
}
