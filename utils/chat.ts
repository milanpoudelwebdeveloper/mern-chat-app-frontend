import { IUser } from '../Context/ChatProvider'

export const isSameSender = (messages: any[], index: number, user: IUser) => {
  return (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === messages[index].sender._id &&
    messages[index].sender._id !== user._id
  )
}

export const isLastMessage = (messages: any[], index: number, user: IUser) => {
  return index <= messages.length - 1 && messages[index].sender._id !== user._id
}
