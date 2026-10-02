import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { PrismaClient } from "@prisma/client";
import accountsRouter from "./routes/accounts";
import positionsRouter from "./routes/positions";
import tradesRouter from "./routes/trades";
import moderatorsRouter from "./routes/moderators";
import currenciesRouter from "./routes/currencies";
import symbolsRouter from "./routes/symbols";
import { setupPriceSimulator } from "./socket/PriceSimulator";

const app = express();
const httpServer = createServer(app);
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.use("/api/accounts", accountsRouter);
app.use("/api/positions", positionsRouter);
app.use("/api/trades", tradesRouter);
app.use("/api/moderators", moderatorsRouter);
app.use("/api/currencies", currenciesRouter);
app.use("/api/symbols", symbolsRouter);

const wss = new WebSocketServer({ server: httpServer });
setupPriceSimulator(wss, prisma);

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
