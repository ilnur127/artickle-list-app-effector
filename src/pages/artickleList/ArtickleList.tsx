import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore, useList } from 'effector-react'

import Select from 'react-select'

import { topicList, userList } from '../../utils/constants'
import { $artickleFilterData, $artickles, addCommentToArtickle, deleteArtickle, editArtickleFilters } from './model'

import type {
  IArtickle,
  IComment
} from './model'
import type { SingleValue } from 'react-select'
import type { ITopic, IUser } from '../../utils/constants'
import type { ChangeEvent } from 'react'

import classes from './artickleList.module.css'

interface ArtickleCommentBlockProps {
  artickleId: number
  comments: IComment[] | undefined
}
const ArtickleCommentBlock = ({
  artickleId,
  comments
}: ArtickleCommentBlockProps): JSX.Element => {
  const [textToComment, setTextToComment] = useState('')

  const saveComment = (): void => {
    addCommentToArtickle({ artickleId, text: textToComment })
    setTextToComment('')
  }
  return (
    <div className={classes.artickleItem__commentBlock}>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <div className={classes.artickleItem__commentItem_title}>
            <span className={classes.artickleItem__commentItem_username}>
              {comment.author?.userName}
            </span>
            <span className={classes.artickleItem__commentItem_date}>
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className={classes.artickleItem__commentItem_message}>
            {comment.message}
          </div>
        </div>
      ))}
      <div className={classes.artickleItem__commentBlock_newCommentBlock}>
        <textarea
          value={textToComment}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
            setTextToComment(e.target.value)
          }}
          placeholder="Напишите текст комментария"
        />
        <button onClick={saveComment}>Отправить</button>
      </div>
    </div>
  )
}

const ArtickleComponent = ({
  artickle
}: {
  artickle: IArtickle
}): JSX.Element => {
  const onDeleteArtickle = useCallback(() => {
    deleteArtickle(artickle.id)
  }, [artickle, deleteArtickle])

  return (
    <div className={classes.artickleItem}>
      <div className={classes.artickleItem__header}>
        <div>
          <span>{artickle.author?.userName}</span>
          <span className={classes.artickleItem__header_date}>
            {artickle.updatedAt !== '' && artickle.updatedAt !== undefined
              ? `Обновлено ${new Date(artickle.updatedAt).toLocaleDateString()}`
              : `Создано ${new Date(artickle.createdAt).toLocaleDateString()}`}
          </span>
        </div>
        <div className={classes.artickleItem__header_actions}>
          <Link to={`artickle/${artickle.id}`}>Редактировать</Link>
          <button onClick={onDeleteArtickle}>Удалить</button>
        </div>
      </div>
      <div className={classes.artickleItem__title}>
        <h4>{artickle.header}</h4>
        <div className={classes.artickleItem__title_topic}>
          {artickle.topic?.topicName}
        </div>
      </div>
      <div className={classes.artickleItem__text}>{artickle.body}</div>
      <ArtickleCommentBlock
        artickleId={artickle.id}
        comments={artickle.comments}
      />
    </div>
  )
}

const ArtickeList = (): JSX.Element => {
  const artickleFilterData = useStore($artickleFilterData)
  // const artickle = useStore($artickles)

  // const [searchValue, setSearchValue] = useState('')

  // const artickleFilterFunction = useCallback(
  //   (artickle: IArtickle) => {
  //     let pass = true
  //     if (
  //       filterData.author !== null &&
  //       artickle.author?.userId !== filterData.author.userId
  //     ) {
  //       pass = false
  //     }
  //     if (
  //       filterData.topic !== null &&
  //       artickle.topic?.topicId !== filterData.topic.topicId
  //     ) {
  //       pass = false
  //     }
  //     if (
  //       filterData.createdAt !== '' &&
  //       new Date(filterData.createdAt) > new Date(artickle.createdAt)
  //     ) {
  //       pass = false
  //     }
  //     return pass
  //   },
  //   [filterData]
  // )

  const artickleList = useList($artickles, (artickle) => (
    <ArtickleComponent key={artickle.id} artickle={artickle} />
  ))

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.filterControl}>
          <div className={classes.filterControl__item}>
            <label>Тема:</label>
            <Select
              options={topicList}
              value={artickleFilterData.topic}
              isClearable
              getOptionLabel={(option) => option.topicName}
              getOptionValue={(option) => option.topicId.toString()}
              placeholder="Выберете тему статьи"
              onChange={(option: SingleValue<ITopic>) =>
                editArtickleFilters({ ...artickleFilterData, topic: option })
              }
            />
          </div>
          <div className={classes.filterControl__item}>
            <label>Автор:</label>
            <Select
              options={userList}
              value={artickleFilterData.author}
              isClearable
              getOptionLabel={(option) => option.userName}
              getOptionValue={(option) => option.userId.toString()}
              placeholder="Выберете автора статьи"
              onChange={(option: SingleValue<IUser>) =>
                editArtickleFilters({ ...artickleFilterData, author: option })
              }
            />
          </div>
          <div className={classes.filterControl__item}>
            <label>Не позднее:</label>
            <input
              type="date"
              value={artickleFilterData.createdAt}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                editArtickleFilters({ ...artickleFilterData, createdAt: e.target.value })
              }
            />
          </div>
        </div>
        <input
          type="search"
          className={classes.header__search}
          placeholder="Поиск статей по заголовку или теме"
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            // setSearchValue(e.target.value)
          }}
        />
        <Link to="artickle/new" className={classes.header__button}>
          Добавить статью
        </Link>
      </div>
      <div className={classes.artickleList}>
        {artickleList}
          {/* .filter(artickleFilterFunction)
          .filter(
            (artickle) =>
              artickle.header.includes(searchValue) ||
              artickle.topic?.topicName.includes(searchValue)
          )
          .map((artickle) => (
            <ArtickleComponent key={artickle.id} artickle={artickle} />
          )) */}
      </div>
    </div>
  )
}

export default ArtickeList
