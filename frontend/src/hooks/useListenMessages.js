import { useEffect } from "react";

import { useSocketContext } from "../context/SockectContext.jsx";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages , selectedConversation} = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
		  // Check if the new message belongs to the selected conversation
		  if (
			newMessage.senderId === selectedConversation?._id || 
			newMessage.receiverId === selectedConversation?._id
		  ) {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		  }
		});
	
		return () => socket?.off("newMessage");
	  }, [socket, setMessages, messages, selectedConversation?._id]);
	};
export default useListenMessages;
