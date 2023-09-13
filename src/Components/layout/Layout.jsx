
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import { Register } from '../Register/Register'


export default function Layout() {
    return (
        <>
            <NavBar/>
            <Register/>
            <Outlet></Outlet>
        </>
    )
}
