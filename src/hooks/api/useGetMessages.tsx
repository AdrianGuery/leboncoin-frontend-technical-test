import axios from "axios";
import { useQuery } from "react-query";
import { Message } from "../../types/message";

const useGetMessages = (conversationId: number) => {
  return useQuery(
    "messages",
    () => axios.get<Message[]>(`http://localhost:3005/messages/${conversationId}`),
    {
      select: (data) => data.data,
      retry: 1, 
      enabled: !!conversationId,
    }
  )
}

export default useGetMessages;
