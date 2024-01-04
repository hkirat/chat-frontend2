import { Chat } from "@/models/Chat";

interface ChatMessageTextProps {
  chat: Chat;
  isChatMine: boolean;
}
const ChatMessageText = (props: ChatMessageTextProps) => {
  const className = props.isChatMine
    ? "text-sm w-full text-right"
    : "text-sm w-full text-left";
  const displayName = props.isChatMine
    ? "Me"
    : props.chat.userName + " " + props.chat.userId.toString();
  return (
    <div className={className}>
      <strong>{displayName}: &nbsp;</strong>
      {props.chat.message}
    </div>
  );
};

export default ChatMessageText;
