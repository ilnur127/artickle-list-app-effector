import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from './components/layouts/MainLayout/MainLayout'
import ArtickeList from './pages/artickleList/ArtickleList'
import ArtickleForm from './pages/artickleForm/ArtickleForm'

import './styles/index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ArtickeList />
  },
  {
    path: 'artickle/:artickleId',
    element: <ArtickleForm />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  </React.StrictMode>
)
