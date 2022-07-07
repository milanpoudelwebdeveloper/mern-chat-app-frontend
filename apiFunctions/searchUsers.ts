import axios from 'axios'

export const searchUsers = async (userToken: string, keyword: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API}/allusers?keyword=${keyword}`,
    config
  )
}
