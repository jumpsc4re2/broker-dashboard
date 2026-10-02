import { useState } from "react";

import Flex from "@/components/flex/Flex";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { type Message } from "@/types/types";

export const messages: Message[] = [
  {
    id: "msg_1",
    senderId: "user_1",
    content: "Hey bro, are you free?",
    timestamp: "2026-04-10T14:30:00Z",
    status: "read",
  },
  {
    id: "msg_2",
    senderId: "user_2",
    content: "Yeah, what's up?",
    timestamp: "2026-04-10T14:30:20Z",
    status: "read",
  },
  {
    id: "msg_3",
    senderId: "user_1",
    content: "I'm working on the chat UI but something feels off",
    timestamp: "2026-04-10T14:31:10Z",
    status: "read",
  },
  {
    id: "msg_4",
    senderId: "user_2",
    content: "Alignment issue?",
    timestamp: "2026-04-10T14:31:30Z",
    status: "read",
  },
  {
    id: "msg_5",
    senderId: "user_1",
    content: "Yeah exactly 😅 messages not lining up properly",
    timestamp: "2026-04-10T14:32:00Z",
    status: "read",
  },
  {
    id: "msg_6",
    senderId: "user_2",
    content: "Check your flex + justify-end/start logic",
    timestamp: "2026-04-10T14:32:30Z",
    status: "read",
  },
  {
    id: "msg_7",
    senderId: "user_1",
    content: "I did, but still buggy when messages are long",
    timestamp: "2026-04-10T14:33:10Z",
    status: "read",
  },
  {
    id: "msg_8",
    senderId: "user_2",
    content: "Try adding max-width and word-break",
    timestamp: "2026-04-10T14:33:40Z",
    status: "read",
  },
  {
    id: "msg_9",
    senderId: "user_1",
    content: "Ohhh good idea, let me test",
    timestamp: "2026-04-10T14:34:00Z",
    status: "read",
  },
  {
    id: "msg_10",
    senderId: "user_1",
    content: "Yooo it worked 🔥",
    timestamp: "2026-04-10T14:35:10Z",
    status: "read",
  },
  {
    id: "msg_11",
    senderId: "user_2",
    content: "Told you 😎",
    timestamp: "2026-04-10T14:35:30Z",
    status: "read",
  },
  {
    id: "msg_12",
    senderId: "user_1",
    content: "Thanks man, you're a lifesaver",
    timestamp: "2026-04-10T14:36:00Z",
    status: "read",
  },
];
const currentUserID = "user_1";
const MessagesSection = () => {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Sending:", message);
    setMessage("");
  };

  return (
    <div className="md:col-span-2 rounded-lg flex flex-col h-full min-h-0 p-3 bg-primary/10">
      {/* Header */}
      <div>
        <Flex className="items-center gap-4">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>OF</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
          <div>
            <p>Omar Farag</p>
            <p className="text-xs text-muted-foreground">Online - Frontend Developer</p>
          </div>
        </Flex>
        <Separator className="mt-5" />
      </div>
      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0 px-5 pb-2">
        <div>
          {messages.map((message) => {
            const isMine = message.senderId === currentUserID;
            return (
              <div
                key={message.id}
                className={`flex mb-3 ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${isMine ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <Field orientation="horizontal">
        <Input
          className="border-primary/50"
          type="text"
          placeholder="Send message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </Field>
    </div>
  );
};
export default MessagesSection;
