import { ChevronUp } from "lucide-react";

interface UpVoteProps{
    chatIndex: number,
    onUpVoteClick:(chatIndex: number) => undefined
}
const UpVoteButton = (props: UpVoteProps) => {
  return (
    <div className="flex gap-2">
      <button id="up-vote-btn"
        className="text-gray-400"
        onClick={props.onUpVoteClick(props.chatIndex)}
      >
        <ChevronUp />
      </button>
    </div>
  );
};

export default UpVoteButton;
