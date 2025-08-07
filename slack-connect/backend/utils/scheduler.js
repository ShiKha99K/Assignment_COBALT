import { promises as fs } from "fs";
import path from "path";
import { getTokenForAnyWorkspace } from "../services/tokenService.js";
import { sendMessage } from "../services/slackService.js";
import { v4 as uuidv4 } from "uuid";

// JSON file path
const FILE = path.resolve("./data/scheduled_messages.json");

async function ensureFile() {
  try { await fs.access(FILE); }
  catch { await fs.writeFile(FILE, "[]"); }
}

export async function getAllScheduledMessages() {
  await ensureFile();
  const data = await fs.readFile(FILE, "utf8");
  return JSON.parse(data || "[]");
}

export async function saveScheduledMessage({ channel, text, sendAt }) {
  await ensureFile();
  const messages = await getAllScheduledMessages();
  messages.push({
    id: uuidv4(),
    channel,
    text,
    sendAt,
    status: "pending"
  });
  await fs.writeFile(FILE, JSON.stringify(messages, null, 2));
}

export async function cancelScheduledMessage(id) {
  const messages = await getAllScheduledMessages();
  const updated = messages.map(m =>
    m.id === id ? { ...m, status: "cancelled" } : m
  );
  await fs.writeFile(FILE, JSON.stringify(updated, null, 2));
}

// Run every 30s to send due messages
setInterval(async () => {
  const messages = await getAllScheduledMessages();
  const now = Date.now();
  for (let msg of messages) {
    if (msg.status === "pending" && new Date(msg.sendAt).getTime() <= now) {
      try {
        const token = await getTokenForAnyWorkspace();
        const result = await sendMessage(token, msg.channel, msg.text);
        if (result.ok) {
          msg.status = "sent";
          msg.sentAt = new Date().toISOString();
          console.log("Sent scheduled message:", msg);
        } else {
          msg.status = "failed";
          msg.error = result.error;
        }
      } catch (e) {
        msg.status = "failed";
        msg.error = e.message;
      }
    }
  }
  await fs.writeFile(FILE, JSON.stringify(messages, null, 2));
}, 30000);
