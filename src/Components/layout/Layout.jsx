
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/NavBar.jsx'
import  {Register}  from '../Register/Register.jsx'

export default function Layout() {
    return (
        <>
            <NavBar />
            <div className="container py-5">
                <Outlet></Outlet>
                <Register/>
            </div>
          

        </>
    )
}
