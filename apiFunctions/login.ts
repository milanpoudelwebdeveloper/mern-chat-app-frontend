import axios from 'axios'

export interface ILogin {
  email: string
  password: string
}

export const login = async (loginInfo: ILogin) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, loginInfo)
}
