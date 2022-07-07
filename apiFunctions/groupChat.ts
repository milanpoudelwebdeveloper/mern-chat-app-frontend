import axios from 'axios'

export const createGroupChat = async (
  userToken: string,
  groupData: {
    groupName: string
    users: any
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/groupChats`,
    groupData,
    config
  )
}

export const renameGroup = async (
  userToken: string,
  data: {
    chatId: string
    groupName: string
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API}/chatGroup/rename`,
    data,
    config
  )
}

export const addUsersToGroup = async (
  userToken: string,
  data: {
    chatId: string
    userId: string
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API}/chatGroup/addUsers`,
    data,
    config
  )
}

export const removeUserFromGrp = async (
  userToken: string,
  data: {
    chatId: string
    userId: string
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.put(
    '${process.env.NEXT_PUBLIC_API}/chatGroup/removeUser',
    data,
    config
  )
}

//a single user himself/herself wants to leave the group

export const leaveTheGroup = async (
  userToken: string,
  data: {
    chatId: string
    userId: string
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API}/chatGroup/leaveGroup`,
    data,
    config
  )
}
