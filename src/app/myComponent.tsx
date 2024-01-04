"use client";

import ChatWindow from "@/components/ChatWindow";
import { Chat } from "@/models/Chat";
import { useEffect, useRef, useState } from "react";
const userId = Math.floor(Math.random() * 10000);

export default function MyComponent({
  initialChats,
  upVotes1 = 3,
  upVotes2 = 10,
}: {
  initialChats?: Chat[];
  upVotes1?: number;
  upVotes2?: number;
}) {
  const [chats, setChats] = useState(initialChats || []);
  const chatRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const addChat = () => {
    if (chatRef.current) {
      const chat = chatRef.current.value;
      if (!chat) return;
      sendChat(chat);
      receiveMessage();
      chatRef.current.value = "";
    }
  };

  function sendUpvote(chatId: string) {
    socket?.send(
      JSON.stringify({
        type: "UPVOTE_MESSAGE",
        payload: {
          userId: userId,
          roomId: "2",
          chatId,
        },
      })
    );
  }

  function sendChat(message: string) {
    socket?.send(
      JSON.stringify({
        type: "SEND_MESSAGE",
        payload: {
          message,
          userId: userId,
          roomId: "2",
        },
      })
    );
  }

  function sendDispatch(chatId: string) {
    socket?.send(
      JSON.stringify({
        type: "DISPATCH_MESSAGE",
        payload: {
          userId: userId,
          roomId: "2",
          chatId,
        },
      })
    );
  }

  let normalChats: Chat[] = [];
  let mediumChats: Chat[] = [];
  let highChats: Chat[] = [];

  if (chats.length > 0) {
    normalChats = chats.filter((chat) => chat.votes < upVotes1);
    mediumChats = chats.filter(
      (chat) => chat.votes >= upVotes1 && chat.votes < upVotes2
    );
    mediumChats = chats.filter(
      (chat) => chat.votes >= upVotes1 && chat.votes < upVotes2
    );
    highChats = chats.filter((chat) => chat.votes >= upVotes2);
  }

  const onUpVoteHandller = (chat: Chat) => {
    sendUpvote(chat.chatId);
    receiveMessage();
    return undefined;
  };

  const onUpDispatchHandller = (chat: Chat) => {
    sendDispatch(chat.chatId);
    receiveMessage();
    return undefined;
  };

  const receiveMessage = () => {
    if (socket) {
      socket.onmessage = function (event) {
        try {
          const { payload, type } = JSON.parse(event.data);

          if (type === "ADD_CHAT") {
            setChats((chats) => [
              ...chats,
              {
                message: payload.message,
                votes: payload.upvotes,
                chatId: payload.chatId,
                userName: payload.name,
                userId: payload.userId,
              },
            ]);
          }

          if (type === "UPDATE_CHAT") {
            setChats((chats) =>
              chats.map((c) => {
                if (c.chatId == payload.chatId) {
                  return {
                    ...c,
                    votes: payload.upvotes,
                  };
                }
                return c;
              })
            );
          }
        } catch (e) {
          console.error(e);
        }
      };
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/", "echo-protocol");
    setSocket(ws);

    ws.onopen = function () {
      ws.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          payload: {
            name: "harkirat",
            userId,
            roomId: "2",
          },
        })
      );
    };
    receiveMessage();

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 space-y-4">
      <div className="text-center">Chat</div>
      <div className="flex border min-w-[900px] rounded-md">
        {/* All Chat */}
        <ChatWindow
          title="All Chats"
          chats={normalChats}
          onUpVoteClick={onUpVoteHandller}
          userId={userId}
          showInputBox={true}
          chatRef={chatRef}
          addChat={addChat}
        />
        {/* Medium Upvotes */}
        <ChatWindow
          title="Medium Priority Chats"
          chats={mediumChats}
          onUpVoteClick={onUpVoteHandller}
          userId={userId}
          onDispatchClick={onUpDispatchHandller}
        />
        {/* High Upvotes */}
        <ChatWindow
          title="High Priority Chats"
          chats={highChats}
          onUpVoteClick={onUpVoteHandller}
          userId={userId}
          onDispatchClick={onUpDispatchHandller}
        />
      </div>
    </div>
  );
}