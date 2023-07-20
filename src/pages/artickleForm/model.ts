import { createEvent, createStore } from 'effector'

import type { ITopic, IUser } from '../../utils/constants'

export interface IFormData {
  header: string
  body: string
  topic: ITopic | null
  author: IUser | null
}

export const editArtickleForm = createEvent<IFormData>()

export const $artickleForm = createStore<IFormData>({
  header: '',
  body: '',
  topic: null,
  author: null
}).on(editArtickleForm, (_state, payload) => payload)
