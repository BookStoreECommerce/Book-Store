
import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'
import CustomizedDialogs from '../Dialog/Dialog';
import { useDispatch } from 'react-redux';
import { setHeight } from '../../Redux/Slicies/appSlice';
import PolicyDialog from '../PolicyDialog/PolicyDialog.jsx';

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
