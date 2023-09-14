
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'


export default function Layout() {
    return (
        <>
            <NavBar/>
        
                <Outlet></Outlet>
        <Footer/>

        </>
    )
}
