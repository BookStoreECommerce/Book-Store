import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/MainLayoutComponents/Navbar/NavBar';
import Footer from '../Components/MainLayoutComponents/Footer/Footer';
import CustomizedDialogs from '../Components/Dialogs/AuthDialog/Dialog';
import { useDispatch } from 'react-redux';
import { setHeight } from '../Redux/Slicies/appSlice';
import PolicyDialog from '../Components/Dialogs/PolicyDialog/PolicyDialog';

export default function Layout() {
    const navRef = useRef(null);
    const footerRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setHeight({footerH: footerRef.current.clientHeight, navH: navRef.current.clientHeight}));
    }, [dispatch]);

    return (
        <>
            <NavBar navRef={navRef}/>
            <Outlet></Outlet>
            <CustomizedDialogs />
            <PolicyDialog/>
            <Footer footerRef={footerRef}/>
        </>
    )
}
