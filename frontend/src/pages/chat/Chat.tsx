import ContactsSection from "./ContactsSection";
import MessagesSection from "./MessagesSection";

const ChatPage = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] md:grid-cols-3 h-[85vh] w-full gap-0">
      <ContactsSection />
      <MessagesSection />
    </div>
  );
};
export default ChatPage;
