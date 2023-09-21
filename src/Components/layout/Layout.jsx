
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'// import { Register } from '../Register/Register';
// import Login from '../Login/Login';
// import { RegisterVerify } from '../RegisterVerify/RegisterVerify';
import CustomizedDialogs from '../Dialog/Dialog';
import { useDispatch } from 'react-redux';
import { handleClickOpen } from '../../Redux/Slicies/dialogSlice';

export default function Layout() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleClickOpen({ name: "register-verify" }))
    }, [])
    

    return (
        <>
            <NavBar/>
            <Outlet></Outlet>
            <CustomizedDialogs />
            <Footer />
        </>
    )
}
