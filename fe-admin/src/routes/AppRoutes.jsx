import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '../components/layout/DefaultLayout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import UserLayout from '../components/layout/UserLayout'
import Categories from '../pages/Categories'
import Reviews from '../pages/Reviews'
import Admins from '../pages/Admins'
import Customer from '../pages/Customer'
import Product from '../pages/Product'
import OrdersPage from '../pages/OrdersPage'
import ReviewLandingPage from '../pages/ReviewLandingPage'

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<DefaultLayout/>}>
        <Route index element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        </Route>

        <Route path='/admin' element={<UserLayout/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='orders' element={<OrdersPage/>}/>
          <Route path='categories' element={<Categories/>}/>
          <Route path='reviews' element={<Reviews/>}/>
          <Route path='reviews/:id' element={<ReviewLandingPage/>}/>
          <Route path='products' element={<Product/>}/>
          <Route path='admins' element={<Admins/>}/>
          <Route path='customer' element={<Customer/>}/>
        </Route>
    </Routes>
    </>
  )
}

export default AppRoutes