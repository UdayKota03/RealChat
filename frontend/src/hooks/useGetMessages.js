import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
<<<<<<< HEAD
				const res = await fetch(`${process.env.REACT_APP_BACK_URL}/api/messages/${selectedConversation._id}`,{
=======
				const res = await fetch(`/api/messages/${selectedConversation._id}`,{
>>>>>>> parent of ee8b12e (axios links updated)
                    headers: {
                        authorization: localStorage.getItem("jwt"),
                    }
                });
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
