import { Chat } from "@/models/Chat";
import ChatMessageText from "./ChatMessageText";
import UpVoteMessageText from "./UpVoteMessageText";
interface ChatMessageProps {
  chat: Chat;
  onUpVoteClick: (chat: Chat) => undefined;
  userId: number;
  showDismissButton: boolean
  onDispatchClick?: (chat: Chat) => undefined
}

const ChatMessage = (props: ChatMessageProps) => {
  const isChatMine = props.userId === props.chat.userId;

  return (
    <>
      <ChatMessageText chat={props.chat} isChatMine={isChatMine}/>      
      <UpVoteMessageText
        chat={props.chat}
        onUpVoteClick={props.onUpVoteClick}      
        showDismissButton={props.showDismissButton}
        onDispatchClick={props.onDispatchClick}
        isChatMine={isChatMine}
      />
    </>
  );
};

export default ChatMessage