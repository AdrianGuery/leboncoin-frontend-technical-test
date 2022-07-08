import axios from "axios";
import { useQuery } from "react-query";
import { User } from "../../types/user";

const useGetUser = (loggedUserId: number) => {
  return useQuery(
    "user",
    () => axios.get<User>(`http://localhost:3005/user/${loggedUserId}`),
    {
      select: (data) => data.data[0],
      retry: 3,
    }
  )
}

export default useGetUser;
