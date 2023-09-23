import { Box, Button, Typography } from "@mui/material";
import NavBar from "../Navbar/NavBar";
import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../Footer/Footer";
import Styles from "./error.module.css"
import { useDispatch, useSelector } from "react-redux";
import { removeFooterMargin, setFooterMargin, setHeight } from "../../Redux/Slicies/appSlice";
import { useNavigate } from "react-router-dom";

const ErrorBoundry = () => {
    // const [navHeight, setNavHeight] = useState(0);
    // const [footerHeight, setFooterHeight] = useState(0);
    const navRef = useRef(null);
    const footerRef = useRef(null);
    const { footerH, navH, footerNoMargin } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const navigated = useNavigate()
    const navigateToHome = useCallback(() => navigated('/'), [])
    useEffect(() => {
        dispatch(setHeight({ footerH: footerRef.current.clientHeight, navH: navRef.current.clientHeight }));
        dispatch(removeFooterMargin());
        return () => dispatch(setFooterMargin())
    }, [])
    return (
        <>
            <NavBar navRef={navRef} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: `calc(100vh - ${navH + footerH}px)`,
                    width: '100%',
                    mt: `${navH}px`,
                    backgroundColor: (theme) => theme.palette.secondary.main,
                }}
            >
                <Typography variant="h1" sx={{ color: 'white', fontWeight: "bold", mt: 1, mb: 1 }}>
                    404
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', mt: 1, mb: 1 }}>
                    The page you’re looking for doesn’t exist.
                </Typography>
                <Button variant="contained" sx={{ mt: 1, mb: 1 }} onClick={navigateToHome}>Back Home</Button>
            </Box>
            <Footer footerRef={footerRef} />
        </>
    )
}
export default ErrorBoundry;