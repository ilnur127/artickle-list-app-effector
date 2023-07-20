import React, { useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from 'effector-react'

import Select from 'react-select'

import {
  editArtickle,
  addArtickle,
  $artickles
} from '../artickleList/model'
import { topicList, userList } from '../../utils/constants'
import { $artickleForm, editArtickleForm } from './model'

import type { SingleValue } from 'react-select'
import type { ChangeEvent } from 'react'
import type { ITopic, IUser } from '../../utils/constants'
import type { IArtickle } from '../artickleList/model'

import classes from './artickleForm.module.css'

const HeaderComponent = ({ text }: { text: string }): JSX.Element => (
  <div className={classes.header}>
    <Link to="/">Назад</Link>
    <h2>{text}</h2>
  </div>
)

interface FieldsComponentProps {
  initialArtickleData?: IArtickle
}
const FieldsComponent = ({
  initialArtickleData
}: FieldsComponentProps): JSX.Element => {
  const navigate = useNavigate()

  const formData = useStore($artickleForm)

  const saveData = (): void => {
    if (initialArtickleData !== null && initialArtickleData !== undefined) {
      editArtickle({ artickleId: initialArtickleData.id, ...formData })
    } else {
      addArtickle(formData)
    }
    navigate('/')
  }

  useEffect(() => {
    if (initialArtickleData !== null && initialArtickleData !== undefined) {
      editArtickleForm({
        header: initialArtickleData.header,
        body: initialArtickleData.body,
        topic: initialArtickleData.topic,
        author: initialArtickleData.author
      })
    }
    return () => {
      editArtickleForm({
        header: '',
        body: '',
        topic: null,
        author: null
      })
    }
  }, [initialArtickleData])

  return (
    <div className={classes.formControl}>
      <div className={classes.formControl__item}>
        <label>Тема</label>
        <Select
          options={topicList}
          value={formData.topic}
          getOptionLabel={(option) => option.topicName}
          getOptionValue={(option) => option.topicId.toString()}
          placeholder="Выберете тему статьи"
          onChange={(option: SingleValue<ITopic>) =>
            editArtickleForm({ ...formData, topic: option })
          }
        />
      </div>
      <div className={classes.formControl__item}>
        <label>Заголовок</label>
        <input
          value={formData.header}
          className={classes.formControl__item_input}
          placeholder="Введите заголовок статьи"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            editArtickleForm({ ...formData, header: e.target.value })
          }
        />
      </div>
      <div className={classes.formControl__item}>
        <label>Текст</label>
        <textarea
          value={formData.body}
          className={classes.formControl__item_input}
          placeholder="Введите текст статьи"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            editArtickleForm({ ...formData, body: e.target.value })
          }
        />
      </div>
      <div className={classes.formControl__item}>
        <label>Автор</label>
        <Select
          options={userList}
          value={formData.author}
          getOptionLabel={(option) => option.userName}
          getOptionValue={(option) => option.userId.toString()}
          placeholder="Выберете автора статьи"
          onChange={(option: SingleValue<IUser>) =>
            editArtickleForm({ ...formData, author: option })
          }
        />
      </div>
      <button className={classes.formControl__item_button} onClick={saveData}>
        Сохранить
      </button>
    </div>
  )
}

const NewArtickle = (): JSX.Element => <FieldsComponent />

const EditArtickle = ({
  artickleId
}: {
  artickleId: string | undefined
}): JSX.Element => {
  const artickles = useStore($artickles)
  const artickle = useMemo(
    () => artickles.find((a) => a.id === Number(artickleId)),
    [artickles, artickleId]
  )
  return <FieldsComponent initialArtickleData={artickle} />
}

const ArtickleForm = (): JSX.Element => {
  const { artickleId } = useParams()

  return artickleId === 'new'
    ? (
    <>
      <HeaderComponent text="Добавление новой статьи" />
      <NewArtickle />
    </>)
    : (
    <>
      <HeaderComponent text="Изменение статьи" />
      <EditArtickle artickleId={artickleId} />
    </>)
}

export default ArtickleForm
