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
  return (
    <>
      <ChatMessageText chat={props.chat} userId={props.userId}/>      
      {props.chat.userId !== props.userId && <UpVoteMessageText
        chat={props.chat}
        onUpVoteClick={props.onUpVoteClick}      
        showDismissButton={props.showDismissButton}
        onDispatchClick={props.onDispatchClick}
      />}
    </>
  );
};

export default ChatMessage