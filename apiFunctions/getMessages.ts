//fetching all messages of a chatroom between two users

import axios from 'axios'

export const fetchMessages = async (chatId: string, userToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API}/messages/${chatId}`,
    config
  )
}
