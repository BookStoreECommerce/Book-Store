
import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomizedDialogs from '../Dialog/Dialog'
import NavBar from '../Navbar/NavBar'


export default function Layout() {
    return (
        <>
            <NavBar/>
            <Outlet></Outlet>
            <CustomizedDialogs></CustomizedDialogs>
        </>
    )
}
