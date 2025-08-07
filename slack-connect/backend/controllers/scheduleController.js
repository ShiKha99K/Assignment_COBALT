import {
  saveScheduledMessage,
  getAllScheduledMessages,
  cancelScheduledMessage
} from "../utils/scheduler.js";

export const scheduleMessageController = async (req, res) => {
  const { channel, text, sendAt } = req.body;
  if (!channel || !text || !sendAt) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }
  await saveScheduledMessage({ channel, text, sendAt });
  res.json({ ok: true });
};

export const getScheduledMessagesController = async (req, res) => {
  const messages = await getAllScheduledMessages();
  res.json(messages);
};

export const cancelScheduledMessageController = async (req, res) => {
  const { id } = req.body;
  await cancelScheduledMessage(id);
  res.json({ ok: true });
};
