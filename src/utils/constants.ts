export interface ITopic {
  topicId: number
  topicName: string
}

export const topicList: ITopic[] = [
  {
    topicId: 1,
    topicName: 'topic1'
  },
  {
    topicId: 2,
    topicName: 'topic2'
  },
  {
    topicId: 3,
    topicName: 'topic3'
  },
  {
    topicId: 4,
    topicName: 'topic4'
  }
]

export interface IUser {
  userId: number
  userName: string
}

export const userList: IUser[] = [
  {
    userId: 100,
    userName: 'user1'
  },
  {
    userId: 101,
    userName: 'user2'
  },
  {
    userId: 102,
    userName: 'user3'
  },
  {
    userId: 103,
    userName: 'user4'
  }
]
