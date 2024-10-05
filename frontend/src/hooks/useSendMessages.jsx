import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
<<<<<<< HEAD:frontend/src/hooks/useSendMessages.js
        `${process.env.REACT_APP_BACK_URL}/api/messages/send/${selectedConversation._id}`,
=======
        `/api/messages/send/${selectedConversation._id}`,
>>>>>>> parent of ee8b12e (axios links updated):frontend/src/hooks/useSendMessages.jsx
        {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("jwt"),
            "content-Type" : "application/json"
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();

      //     const {data} = await axios.post(`/api/messages/send/${selectedConversation._id}`, {
      //         message : message?message:"Null" ,
      //     },{
      // 		headers:{
      //             authorization : localStorage.getItem("jwt")
      //         },
      // });
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
