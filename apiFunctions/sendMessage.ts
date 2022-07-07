import axios from 'axios'

export const sendSingleMessage = async (
  userToken: string,
  messageData: {
    chatId: string
    content: string
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/message`,
    messageData,
    config
  )
}
