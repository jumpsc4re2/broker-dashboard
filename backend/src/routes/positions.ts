import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req, res) => {
  try {
    const positions = await prisma.position.findMany({
      orderBy: { createdAt: "desc" },
      include: { account: { select: { id: true, name: true, email: true } } },
    });
    res.json(positions);
  } catch (error) {
    console.error("Failed to fetch positions:", error);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

export default router;
