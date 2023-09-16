
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import { Register } from '../Register/Register';
import Login from '../Login/Login';

export default function Layout() {
    return (
        <>
            <NavBar/>
            <Outlet></Outlet>
            <div >
                <Register></Register>
                <Login></Login>
            </div>
        </>
    )
}
