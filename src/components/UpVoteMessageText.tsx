import { Chat } from "@/models/Chat";
import { ChevronUp } from "lucide-react";

interface UpVoteMessageTextProps {
  chat: Chat;
  onUpVoteClick: (chat: Chat) => undefined;
  showDismissButton: boolean;
  onDispatchClick?: (chat: Chat) => undefined
}
const UpVoteMessageText = (props: UpVoteMessageTextProps) => {
  return (
    <div className="flex gap-1 justify-between justify-center">
      <div className="text-xs text-gray-400">Upvotes: {props.chat.votes}</div>
      {props.showDismissButton && (
        <button
          className="w-full flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
          onClick={() =>  props.onDispatchClick && props.onDispatchClick(props.chat)}
        >
          Dispatch
        </button>
      )}
      <div className="flex gap-2">
        <button
          className="text-xs text-gray-400"
          onClick={() => props.onUpVoteClick(props.chat)}
        >
          <ChevronUp />
        </button>
      </div>
    </div>
  );
};

export default UpVoteMessageText;
