
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import CustomizedDialogs from '../Dialog/Dialog';

export default function Layout() {
    return (
        <>
            <NavBar/>
            <Outlet></Outlet>
            <CustomizedDialogs />
        </>
    )
}
