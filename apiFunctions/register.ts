import axios from 'axios'

export interface IRegister {
  name: string
  email: string
  password: string
  pic: string
}

export const register = async (registerInfo: IRegister) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/register`,
    registerInfo
  )
}
