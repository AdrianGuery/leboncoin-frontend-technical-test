import axios from "axios";
import { useQuery } from "react-query";
import { User } from "../../types/user";

const useGetUsers = () => {
  return useQuery(
    "messages",
    () => axios.get<User[]>(`http://localhost:3005/users/`),
    {
      select: (data) => data.data,
      retry: 1, 
    }
  )
}

export default useGetUsers;
