import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
<<<<<<< HEAD
				const res = await axios(`${process.env.REACT_APP_BACK_URL}/api/users` , {
=======
				const res = await axios("http://localhost:8000/api/users" , {
>>>>>>> parent of ee8b12e (axios links updated)
					headers:{
						authorization : localStorage.getItem("jwt")
					}
				});

				const data = res.data;

				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
