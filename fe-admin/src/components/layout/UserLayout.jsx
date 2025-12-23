import React from 'react'
import AuthRoute from '../auth/AuthRoute'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserLayout = () => {
  const {admin} = useSelector((state)=> state.adminInfo)
  return (
    <>
    <AuthRoute>
         <div className="d-flex">
        <div className="sidebar text-white p-3" style={{ minWidth: "120px" }}>
          <Sidebar />
        </div>

         {/* main  */}
        <main className="user-main">
          <Outlet />
        </main>
      </div>
    </AuthRoute>
    </>
  )
}

export default UserLayout