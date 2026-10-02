import { formatDistanceToNow } from "date-fns";

import Flex from "@/components/flex/Flex";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { type Chat } from "@/types/types";

import { messages } from "./MessagesSection";

export const chats: Chat[] = [
  {
    name: "Omar Farag",
    image: "https://github.com/shadcn.png",
    lastMessage: messages[messages.length - 1]?.content ?? "",
    lastOnline: "2026-04-08T12:00:00.000Z",
  },
  {
    name: "Ahmed Farag",
    image: "https://github.com/evilrabbit.png",
    lastMessage: messages[messages.length - 1]?.content ?? "",
    lastOnline: "2026-04-08T12:00:00.000Z",
  },
  {
    name: "Mack Alester",
    lastMessage: messages[messages.length - 1]?.content ?? "",
    lastOnline: "2026-04-08T12:00:00.000Z",
  },
  {
    name: "Sofia Uthman",
    image: "https://github.com/maxleiter.png",
    lastMessage: messages[messages.length - 1]?.content ?? "",
    lastOnline: "2026-04-08T12:00:00.000Z",
  },
  {
    name: "Ali Ahmed",
    image: "https://github.com/evilrabbit.png",
    lastMessage: messages[messages.length - 1]?.content ?? "",
    lastOnline: "2026-04-08T12:00:00.000Z",
  },
  {
    name: "Abdullah Mohamed",
    lastMessage: messages[messages.length - 1]?.content ?? "",
    lastOnline: "2026-04-08T12:00:00.000Z",
  },
  {
    name: "Joe Patrick",
    lastMessage: messages[messages.length - 1]?.content ?? "",
    lastOnline: "2026-04-08T12:00:00.000Z",
  },
  {
    name: "Mary Johnny",
    lastMessage: messages[messages.length - 1]?.content ?? "",
    lastOnline: "2026-04-08T12:00:00.000Z",
  },
];
const ContactsSection = () => {
  const isMobile = useIsMobile();
  const mobileChats = (
    <>
      {chats.map((chat, index) => (
        <a href="#" key={index}>
          <Avatar className="my-2">
            <AvatarImage src={chat.image} />
            <AvatarFallback>
              {chat.name
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((word) => word[0].toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
        </a>
      ))}
    </>
  );
  return (
    <div>
      {!isMobile && <p>Latest Chats</p>}
      <ScrollArea className="flex-1 min-h-0">
        <div className="pr-5 h-[85vh]">
          {isMobile
            ? mobileChats
            : chats.map((chat, index) => (
                <Item
                  key={index}
                  className="px-4 mt-2"
                  variant="outline"
                  asChild
                  size="sm"
                >
                  <a href="#">
                    <ItemContent className="flex flex-row gap-3 items-center">
                      <Avatar>
                        <AvatarImage src={chat.image} />
                        <AvatarFallback>
                          {chat.name
                            .trim()
                            .split(/\s+/)
                            .slice(0, 2)
                            .map((word) => word[0].toUpperCase())
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="w-0 flex-1 min-w-0">
                        <Flex className="justify-between">
                          <ItemTitle className="text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                            {chat.name}
                          </ItemTitle>
                          <p className="text-muted-foreground text-xs  overflow-hidden whitespace-nowrap text-ellipsis">
                            {formatDistanceToNow(new Date(chat.lastOnline), {
                              addSuffix: true,
                            })}
                          </p>
                        </Flex>
                        <ItemDescription className="overflow-hidden whitespace-nowrap text-ellipsis">
                          {chat.lastMessage}
                        </ItemDescription>
                      </div>
                    </ItemContent>
                  </a>
                </Item>
              ))}
          {}
        </div>
      </ScrollArea>
    </div>
  );
};
export default ContactsSection;
