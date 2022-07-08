
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useCreateConversation = ({ key }: { key: string }) => {
  const queryClient = useQueryClient()

  const create = (body: {
    recipientId: number,
    recipientNickname: string,
    senderId: number,
    senderNickname: string,
    lastMessageTimestamp: number
  }) => {
    return axios.post<{id: number}>(`http://localhost:3005/conversations/${body.recipientId}`, body)
  }

  return useMutation(create, {
    onSuccess: () => {
      console.log("success")
      queryClient.invalidateQueries(key)
    },
  })
}