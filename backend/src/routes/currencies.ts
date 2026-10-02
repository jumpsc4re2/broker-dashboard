import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req, res) => {
  try {
    const currencies = await prisma.currency.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(currencies);
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
    res.status(500).json({ error: "Failed to fetch currencies" });
  }
});

export default router;
