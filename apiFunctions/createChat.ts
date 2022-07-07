//creating new chat room between two users
import axios from 'axios'
export const createChat = async (
  userToken: string,
  data: {
    userId: string
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/chat`, data, config)
}
