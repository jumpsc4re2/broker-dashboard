import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req, res) => {
  try {
    const trades = await prisma.trade.findMany({
      orderBy: { createdAt: "desc" },
      include: { account: { select: { id: true, name: true, email: true } } },
    });
    res.json(trades);
  } catch (error) {
    console.error("Failed to fetch trades:", error);
    res.status(500).json({ error: "Failed to fetch trades" });
  }
});

export default router;
