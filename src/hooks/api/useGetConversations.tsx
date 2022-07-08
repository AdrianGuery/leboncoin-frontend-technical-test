import axios from "axios";
import { useQuery } from "react-query";
import { Conversation } from "../../types/conversation";

const useGetConversations = (loggedUserId: number) => {
  return useQuery(
    "conversations",
    () => axios.get<Conversation[]>(`http://localhost:3005/conversations/${loggedUserId}`),
    {
      select: (data) => data.data,
      retry: 3,
    }
  )
}

export default useGetConversations;
