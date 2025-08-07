import { Router } from "express";
import { redirectToSlack, slackCallback } from "../controllers/authController.js";
const router = Router();

router.get("/slack", redirectToSlack);
router.get("/slack/callback", slackCallback);

export default router;
