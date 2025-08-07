import { Router } from "express";
import {
  sendMessageController
} from "../controllers/messageController.js";
import {
  scheduleMessageController,
  getScheduledMessagesController,
  cancelScheduledMessageController
} from "../controllers/scheduleController.js";

const router = Router();

// Send a message immediately
router.post("/send-message", sendMessageController);

// Schedule a message for later
router.post("/schedule-message", scheduleMessageController);

// List all scheduled messages
router.get("/scheduled-messages", getScheduledMessagesController);

// Cancel a scheduled message
router.post("/cancel-scheduled-message", cancelScheduledMessageController);

export default router;

