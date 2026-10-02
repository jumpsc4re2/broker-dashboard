import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req, res) => {
  try {
    const moderators = await prisma.moderator.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(moderators);
  } catch (error) {
    console.error("Failed to fetch moderators:", error);
    res.status(500).json({ error: "Failed to fetch moderators" });
  }
});

export default router;
