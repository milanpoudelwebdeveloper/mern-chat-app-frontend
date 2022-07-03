import { IUser } from '../Context/ChatProvider'

//for displaying the chats we display other person's names except ours
export const getSender = (loggedUser: IUser, users: IUser[]) => {
  return users.filter((user: IUser) => user._id !== loggedUser._id)[0].name
}
