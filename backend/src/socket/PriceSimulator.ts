import { WebSocket, WebSocketServer } from "ws";
import { Position, PrismaClient, TradeType } from "@prisma/client";

export interface PositionWithLiveData extends Position {
  currentPrice: number;
  pnl: number;
}

export interface PositionsUpdateMessage {
  type: "positions:update";
  payload: PositionWithLiveData[];
}

function randomFluctuation(): number {
  return (Math.random() - 0.5) * 0.002;
}

export function enrichPositionWithLiveData(position: Position): PositionWithLiveData {
  const currentPrice = position.openPrice + randomFluctuation();
  const priceDiff = currentPrice - position.openPrice;
  const rawPnl = priceDiff * position.volume * 1000;
  const pnl = position.type === TradeType.sell ? -rawPnl : rawPnl;

  return {
    ...position,
    currentPrice: Number(currentPrice.toFixed(5)),
    pnl: Number(pnl.toFixed(2)),
  };
}

export function enrichPositionsWithLiveData(positions: Position[]): PositionWithLiveData[] {
  return positions.map(enrichPositionWithLiveData);
}

export function setupPriceSimulator(wss: WebSocketServer, prisma: PrismaClient): void {
  wss.on("connection", (client: WebSocket) => {
    console.log("Client connected");

    const interval = setInterval(async () => {
      try {
        if (client.readyState !== WebSocket.OPEN) {
          return;
        }

        const positions = await prisma.position.findMany();
        const livePositions = enrichPositionsWithLiveData(positions);
        const message: PositionsUpdateMessage = {
          type: "positions:update",
          payload: livePositions,
        };

        client.send(JSON.stringify(message));
      } catch (error) {
        console.error("Failed to send position updates:", error);
      }
    }, 1000);

    client.on("close", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  });
}
