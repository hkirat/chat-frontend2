'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
const userId = Math.floor(Math.random() * 10000);

type Chat = {
	message: string;
	votes: number;
	chatId: string;
};

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
			setChats(chats => [...chats, { message: chat, votes: 0, chatId: "asd" }]);
			sendChat(chat);
			chatRef.current.value = '';
		}
	};

	function sendUpvote(chatId: string) {
		socket?.send(JSON.stringify({
			type: "UPVOTE_MESSAGE",
			payload: {
				userId: userId, 
				roomId: "2",
				chatId
			}
		}));
	}

	function sendChat(message: string) {
		socket?.send(JSON.stringify({
			type: "SEND_MESSAGE",
			payload: {
				message,
				userId: userId, 
				roomId: "2",
			}
		}));
	}

	useEffect(() => {
		const ws = new WebSocket("wss://backend-ws.100xdevs.com", "echo-protocol");
		setSocket(ws);

        ws.onopen = function() {
            ws.send(JSON.stringify({
                type: "JOIN_ROOM",
                payload: {
                    name: "harkirat",
                    userId,
                    roomId: "2",
                }
            }));
        }

		ws.onmessage = function(event) {
            try {
                const {payload, type} = JSON.parse(event.data);

                if (type === "ADD_CHAT") {
					setChats(chats => [...chats, { message: payload.message, votes: payload.upvotes, chatId: payload.chatId }]);
                }

                if (type === "UPDATE_CHAT") {

					setChats(chats => chats.map(c => {
						if (c.chatId == payload.chatId) {
							return {
								...c,
								votes: payload.upvotes
							}
						}
						return c;
					}))
                }
            } catch(e) {
                console.error(e);
            }
        }
		return () => {
			ws.close();
		}
	}, []);

	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 space-y-4">
			<div className="text-center">Chat</div>
			<div className="flex border min-w-[900px] rounded-md">
				{/* All Chat */}
				<div className="text-center border-r w-full">
					<h1 className="p-2">All Chats</h1>
					<div className="border">
						<div className="flex flex-col max-h-96 overflow-auto min-h-96">
							{chats.map((chat, i) => (
								<div className="flex flex-col gap-1 px-2 py-1" key={i}>
									<div className="text-sm w-full text-left">{chat.message}</div>
									<div className="flex gap-1 justify-between">
										<div className="text-xs text-gray-400">
											Upvotes: {chat.votes}
										</div>
										<div className="flex gap-2">
											<button
												className="text-xs text-gray-400"
												onClick={() => {
													const newChats = [...chats];
													newChats[i].votes++;
													setChats(newChats);
													sendUpvote(chat.chatId);
												}}
											>
												<ChevronUp />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="flex gap-2 p-2 border-t">
							<input
								type="text"
								className="bg-transparent text-white w-full"
								placeholder="Chat"
								ref={chatRef}
							/>
							<button
								className="w-full flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
								onClick={addChat}
							>
								Send
							</button>
						</div>
					</div>
				</div>
				{/* Medium Upvotes */}
				<div className="text-center border-r w-full">
					<h1 className="p-2">Medium Priority Chats</h1>
					<div className="border-t">
						<div className="flex flex-col max-h-96 overflow-auto">
							{chats
								.filter(
									(chat) => chat.votes >= upVotes1 && chat.votes < upVotes2
								)
								.map((chat, i) => (
									<div className="flex flex-col gap-1 p-2" key={i}>
										<div className="text-sm w-full text-left">
											{chat.message}
										</div>
										<div className="flex gap-1 justify-between">
											<div className="text-xs text-gray-400">
												Upvotes: {chat.votes}
											</div>
											<div className="flex gap-2">
												<button
													className="text-xs text-gray-400"
													onClick={() => {
														const newChats = [...chats];
														newChats[i].votes++;
														setChats(newChats);
														sendUpvote(chat.chatId);
													}}
												>
													<ChevronUp />
												</button>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
				{/* High Upvotes */}
				<div className="text-center border-r w-full">
					<h1 className="p-2">High Priority Chats</h1>
					<div className="border-t">
						<div className="flex flex-col max-h-96 overflow-auto">
							{chats
								.filter((chat) => chat.votes >= upVotes2)
								.map((chat, i) => (
									<div className="flex flex-col gap-1 p-2" key={i}>
										<div className="text-sm w-full text-left">
											{chat.message}
										</div>
										<div className="flex gap-1 justify-between">
											<div className="text-xs text-gray-400">
												Upvotes: {chat.votes}
											</div>
											<div className="flex gap-2">
												<button
													className="text-xs text-gray-400"
													onClick={() => {
														const newChats = [...chats];
														newChats[i].votes++;
														setChats(newChats);
														sendUpvote(chat.chatId);
													}}
												>
													<ChevronUp />
												</button>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
