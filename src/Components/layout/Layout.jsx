
import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'// import { Register } from '../Register/Register';
// import Login from '../Login/Login';
// import { RegisterVerify } from '../RegisterVerify/RegisterVerify';
import CustomizedDialogs from '../Dialog/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { setHeight } from '../../Redux/Slicies/appSlice';

export default function Layout() {
    const navRef = useRef(null);
    const footerRef = useRef(null);
    const dispatch = useDispatch();
    const {footerH, navH, footerNoMargin} = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(setHeight({footerH: footerRef.current.clientHeight, navH: navRef.current.clientHeight}));
    }, [dispatch]);

    return (
        <>
            <NavBar navRef={navRef}/>
            <Outlet></Outlet>
            <CustomizedDialogs />
            <Footer footerRef={footerRef}/>
        </>
    )
}
