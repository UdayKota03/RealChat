import { useEffect } from "react";

import { useSocketContext } from "../context/SockectContext.jsx";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages , selectedConversation} = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			if (selectedConversation?.participants.includes(newMessage.senderId) || selectedConversation?.participants.includes(newMessage.receiverId)) {
				newMessage.shouldShake = true;
				const sound = new Audio(notificationSound);
				sound.play();
				setMessages([...messages, newMessage]);
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages,selectedConversation]);
};
export default useListenMessages;
