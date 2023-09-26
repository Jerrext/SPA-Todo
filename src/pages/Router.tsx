import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageContainer from './PageContainer/PageContainer'
import Projects from './Projects/Projects'

export enum RoutesList {
  Home = '/',
  Tasks = '/tasks',
  Default = '*',
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PageContainer />}>
          <Route index element={<Projects />} />
          <Route path={RoutesList.Tasks} element={<div></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
