import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req, res) => {
  try {
    const accounts = await prisma.account.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(accounts);
  } catch (error) {
    console.error("Failed to fetch accounts:", error);
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
});

export default router;
