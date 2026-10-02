export type Chat = {
  name: string;
  image?: string;
  lastMessage: string;
  lastOnline: string;
};
export type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO 8601 e.g. "2026-04-10T14:32:00Z"
  status: "sent" | "delivered" | "read";
};
