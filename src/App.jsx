import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layouts/v1/Layout'
import User from './pages/Content/User/User'
import Commession from './pages/Content/User/Commession'
import AddCommession from './pages/Content/User/AddCommession'
import Login from './pages/Auth/Login'
import NoPage from './pages/StatusPages/NoPage'
import { useState } from 'react'

function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<User />} />
            <Route path='/commession' element={<Commession />} />
            <Route path='/addCommession' element={<AddCommession />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
