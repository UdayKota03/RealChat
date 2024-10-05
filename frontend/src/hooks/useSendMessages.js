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
        `https://realchat-ey8v.onrender.com/api/messages/send/${selectedConversation._id}`,
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
