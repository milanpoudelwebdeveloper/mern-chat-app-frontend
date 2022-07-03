//for displaying the chats we display other person's names except ours
export const getSender = (loggedUser: any, users: any) => {
  return users.filter((user: any) => user._id !== loggedUser._id)[0].name
}
