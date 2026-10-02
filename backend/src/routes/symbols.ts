import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req, res) => {
  try {
    const symbols = await prisma.symbol.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(symbols);
  } catch (error) {
    console.error("Failed to fetch symbols:", error);
    res.status(500).json({ error: "Failed to fetch symbols" });
  }
});

export default router;
