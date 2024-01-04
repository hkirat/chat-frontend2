import { RefObject } from "react";

interface ChatInputBoxProps {
    chatRef?: RefObject<HTMLInputElement>
    addChat?: () => void
}

const ChatInputBox = (props: ChatInputBoxProps) => {
  return (
    <div className="flex gap-2 p-2 border-t">
      <input
        type="text"
        className="bg-transparent text-white w-full"
        placeholder="Chat"
        ref={props.chatRef}
        onKeyDownCapture={(e) => {
          if (e.key === "Enter" && props.addChat) {
            props.addChat();
          }
        }}
      />
      <button
        className="w-full flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
        onClick={props.addChat}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInputBox
