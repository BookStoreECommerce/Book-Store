
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/MainLayoutComponents/Navbar/NavBar';
import Footer from '../Components/MainLayoutComponents/Footer/Footer';
import CustomizedDialogs from '../Components/Dialogs/AuthDialog/Dialog';

export default function Layout() {
    return (
        <>
            <NavBar/>
            <Outlet></Outlet>
            <CustomizedDialogs />
            <Footer />
        </>
    )
}
