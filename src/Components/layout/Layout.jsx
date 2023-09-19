
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'// import { Register } from '../Register/Register';
// import Login from '../Login/Login';
// import { RegisterVerify } from '../RegisterVerify/RegisterVerify';
import CustomizedDialogs from '../Dialog/Dialog';

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
