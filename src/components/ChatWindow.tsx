import { Chat } from "@/models/Chat";
import ChatMessage from "./ChatMessage";
import { RefObject } from "react";
import ChatInputBox from "./ChatInputBox";

interface ChatWindowProps {
  title: string;
  chats: Chat[];
  onUpVoteClick: (chat: Chat) => undefined;
  userId: number;
  showInputBox?: boolean;
  chatRef?: RefObject<HTMLInputElement>;
  addChat?: () => void;
  onDispatchClick?: (chat: Chat) => undefined;
}

const ChatWindow = (props: ChatWindowProps) => {
  const showDismissButton = props.showInputBox ? false : true;
  if (props.showInputBox) {
    return (
      <div className="text-center border-r w-full">
        <h1 className="p-2">{props.title}</h1>
        <div className="border">
          <div className="flex flex-col max-h-96 overflow-auto min-h-96">
            {props.chats.map((chat: Chat) => {
              return (
                <div
                  className="flex flex-col gap-1 px-2 py-1"
                  key={chat.chatId}
                >
                  <ChatMessage
                    chat={chat}
                    onUpVoteClick={props.onUpVoteClick}
                    userId={props.userId}
                    showDismissButton={showDismissButton}
                  />
                </div>
              );
            })}
          </div>
          <ChatInputBox chatRef={props.chatRef} addChat={props.addChat} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center border-r w-full">
        <h1 className="p-2">{props.title}</h1>
        <div className="border-t">
          <div className="flex flex-col max-h-96 overflow-auto">
            {props.chats.map((chat) => {
              return (
                <div className="flex flex-col gap-1 p-2" key={chat.chatId}>
                  <ChatMessage
                    chat={chat}
                    onUpVoteClick={props.onUpVoteClick}
                    userId={props.userId}
                    showDismissButton={showDismissButton}
                    onDispatchClick={props.onDispatchClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default ChatWindow;
