import axios from 'axios'

export const fetchChats = async (userToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/chats`, config)
}
