import { Chat } from "@/models/Chat";

interface ChatMessageTextProps {
  chat: Chat;
  userId: number;
}
const ChatMessageText = (props: ChatMessageTextProps) => {
  const isChatMine = props.userId === props.chat.userId;
  const className = isChatMine
    ? "text-sm w-full text-right"
    : "text-sm w-full text-left";
  const displayName = isChatMine
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
