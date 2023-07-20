import { createEvent, createStore } from 'effector'

import type { ITopic, IUser } from '../../utils/constants'
import type { IFormData } from '../artickleForm/model'

export interface IArtickleFilterData {
  createdAt: string
  topic: ITopic | null
  author: IUser | null
}

export interface IComment {
  id: number
  author: IUser | null
  message: string
  createdAt: string
}
export interface IArtickle {
  id: number
  header: string
  body: string
  topic: ITopic | null
  author: IUser | null
  createdAt: string
  updatedAt?: string
  comments?: IComment[]
}

export const editArtickleFilters = createEvent<IArtickleFilterData>()

export const addArtickle = createEvent<IFormData>()
export const editArtickle = createEvent<{ artickleId: number } & IFormData>()
export const deleteArtickle = createEvent<number>()
export const addCommentToArtickle = createEvent<{ artickleId: number, text: string }>()

export const $artickleFilterData = createStore<IArtickleFilterData>({
  createdAt: '',
  topic: null,
  author: null
}).on(editArtickleFilters, (_state, payload) => payload)

export const $artickles = createStore<IArtickle[]>([
  {
    id: Math.random(),
    header: 'header1',
    body: 'body1',
    topic: {
      topicId: 1,
      topicName: 'topic1'
    },
    author: {
      userId: 100,
      userName: 'user1'
    },
    createdAt: new Date('2023-01-26').toDateString(),
    comments: [
      {
        id: Math.random(),
        author: {
          userId: 101,
          userName: 'user2'
        },
        message: '123',
        createdAt: new Date().toDateString()
      }
    ]
  },
  {
    id: Math.random(),
    header: 'header2',
    body: 'body2',
    topic: {
      topicId: 2,
      topicName: 'topic2'
    },
    author: {
      userId: 101,
      userName: 'user2'
    },
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString()
  }
])
  .on(addArtickle, (state, payload) => [
    ...state,
    { ...payload, id: Math.random(), createdAt: new Date().toDateString() }
  ])
  .on(editArtickle, (state, payload) =>
    state.map((artickle) =>
      artickle.id === payload.artickleId
        ? {
            ...artickle,
            ...payload,
            updatedAt: new Date().toDateString()
          }
        : artickle
    )
  )
  .on(deleteArtickle, (state, payload) =>
    state.filter((artickle) => artickle.id !== payload)
  )
  .on(addCommentToArtickle, (state, payload) =>
    state.map((artickle) =>
      artickle.id === payload.artickleId
        ? {
            ...artickle,
            comments:
              artickle.comments !== undefined
                ? [
                    ...artickle.comments,
                    {
                      id: Math.random(),
                      author: {
                        userId: 103,
                        userName: 'user4'
                      },
                      message: payload.text,
                      createdAt: new Date().toDateString()
                    }
                  ]
                : [
                    {
                      id: Math.random(),
                      author: {
                        userId: 103,
                        userName: 'user4'
                      },
                      message: payload.text,
                      createdAt: new Date().toDateString()
                    }
                  ]
          }
        : artickle
    )
  )
