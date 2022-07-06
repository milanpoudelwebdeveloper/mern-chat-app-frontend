import axios from 'axios'

export const fetchChats = async (userToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.get(`http://localhost:8000/api/chats`, config)
}
