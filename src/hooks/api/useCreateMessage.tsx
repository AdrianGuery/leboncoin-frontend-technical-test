
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useCreateMessage = ({ key, id }: { key: string, id: number }) => {
  const queryClient = useQueryClient()

  const create = (params: any) => {
    return axios.post(`http://localhost:3005/messages/${id}`, params)
  }

  return useMutation(create, {
    onSuccess: () => {
      console.log("success")
      queryClient.invalidateQueries(key)
    },
  })
}