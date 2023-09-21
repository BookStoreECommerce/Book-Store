
import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/MainLayoutComponents/Navbar/NavBar';
import Footer from '../Components/MainLayoutComponents/Footer/Footer';
import CustomizedDialogs from '../Components/Dialogs/AuthDialog/Dialog';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { appState, setHeight } from '../Redux/Slicies/appSlice';

export default function Layout() {
    console.log('Layout')
    const navRef = useRef(null);
    const footerRef = useRef(null);
    const dispatch = useDispatch();
    const {footerH, navH, footerNoMargin} = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(setHeight({footerH: footerRef.current.clientHeight, navH: navRef.current.clientHeight}));
    }, [dispatch]);
    
    return (
        <Box
            sx={{
                width:"100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <NavBar navRef={navRef}/>
            <Box sx={{
                width: '100%',
                minHeight: `calc(100vh - ${footerH + navH}px)`
            }}>
            <Outlet></Outlet>
            </Box>
            <CustomizedDialogs />
            <Footer footerRef={footerRef}/>
        </Box>
    )
}
